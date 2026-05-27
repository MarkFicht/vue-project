import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
    collection,
    doc,
    limit,
    onSnapshot,
    query,
    serverTimestamp,
    updateDoc,
    where,
    writeBatch,
    type Timestamp
} from 'firebase/firestore';
import { Bell, BellOff, ChevronDown, ChevronUp, MessageCircle, Send, X } from 'lucide-react';
import { db } from '@/firebaseConfig';
import { privateChatsRef, usersRef } from '@/firebase/refs';
import { usePresenceMap } from '@/hooks/usePresenceMap';
import { useChatMessages } from '@/hooks/useChatMessages';
import { useChatNotifications } from '@/hooks/useChatNotifications';
import { useChatTyping } from '@/hooks/useChatTyping';
import { useChatViewport } from '@/hooks/useChatViewport';
import { buildPrivateChatId } from '@/utils/chat';
import {
    buildChatRenderRows,
    formatChatTime,
    loadHiddenRecentChatIds,
    loadChatNotifyMuted,
    loadReadMap,
    pruneCachedMessages,
    saveHiddenRecentChatIds,
    saveReadMap,
    type ChatMessageLite,
    type ChatRenderRow
} from '@/utils/chatWidget';
import { UserFlag } from '@/components/UserFlag';
import '@/styles/chat-widget.css';

type ChatUser = {
    uid: string;
    displayName: string;
    email: string;
    countryCode?: string;
};

type PresenceFilterState = 'online' | 'away' | 'offline';

type ChatSummary = {
    chatId: string;
    participants: string[];
    lastMessage: string;
    lastMessageSenderUid: string;
    updatedAt?: Timestamp;
    updatedAtMs: number;
    readBy?: Record<string, Timestamp>;
};

const SPAM_WINDOW_MS = 10000;
const SPAM_MAX_MESSAGES_PER_WINDOW = 6;
const SPAM_MIN_INTERVAL_MS = 700;
const SPAM_DUPLICATE_COOLDOWN_MS = 8000;
const GROUP_WINDOW_MS = 120000;
const EMOJI_QUICK_PICK = ['😀', '😂', '🔥', '👍', '❤️', '😎', '🤝', '🎉'];
const getPeerUid = (participants: string[], uid: string) => participants.find((id) => id !== uid) || '';
const withUnreadSuffix = (label: string, unread: number) => (unread > 0 ? `${label} (${unread})` : label);

export function ChatWidget({ uid }: { uid: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const [users, setUsers] = useState<ChatUser[]>([]);
    const [chatSummaries, setChatSummaries] = useState<ChatSummary[]>([]);
    const [selectedChatId, setSelectedChatId] = useState('');
    const [selectionCleared, setSelectionCleared] = useState(false);
    const [activeUserId, setActiveUserId] = useState('');
    const [draft, setDraft] = useState('');
    const [sending, setSending] = useState(false);
    const [sendError, setSendError] = useState('');
    const [freshMessageIds, setFreshMessageIds] = useState<Record<string, true>>({});
    const [nowMs, setNowMs] = useState(() => Date.now());
    const [readMap, setReadMap] = useState<Record<string, number>>(() => loadReadMap(uid));
    const [unreadByChatId, setUnreadByChatId] = useState<Record<string, number>>({});
    const [chatNotifyMuted, setChatNotifyMuted] = useState(() => loadChatNotifyMuted(uid));
    const [hiddenRecentChatIds, setHiddenRecentChatIds] = useState<string[]>(() => loadHiddenRecentChatIds(uid));
    const [isRecentExpanded, setIsRecentExpanded] = useState(() => {
        if (typeof window === 'undefined') return true;
        return window.innerWidth > 767;
    });
    const [recentSwipeOffset, setRecentSwipeOffset] = useState<Record<string, number>>({});
    const sentAtRef = useRef<number[]>([]);
    const lastSentRef = useRef<{ text: string; at: number }>({ text: '', at: 0 });
    const seenMessageIdsRef = useRef<Set<string>>(new Set());
    const composerInputRef = useRef<HTMLInputElement | null>(null);
    const recentTouchStartXRef = useRef(0);
    const activeSwipeRecentIdRef = useRef('');
    const blockedOpenRecentIdRef = useRef('');
    const presenceMap = usePresenceMap();

    useEffect(() => {
        setReadMap(loadReadMap(uid));
        setChatNotifyMuted(loadChatNotifyMuted(uid));
        setHiddenRecentChatIds(loadHiddenRecentChatIds(uid));
        setSendError('');
        setFreshMessageIds({});
        setUnreadByChatId({});
        setNowMs(Date.now());
        setSelectedChatId('');
        setSelectionCleared(false);
        sentAtRef.current = [];
        lastSentRef.current = { text: '', at: 0 };
        seenMessageIdsRef.current = new Set();
    }, [uid]);

    useEffect(() => {
        const chatsQuery = query(privateChatsRef, where('participants', 'array-contains', uid), limit(80));
        const unsubscribe = onSnapshot(chatsQuery, (snapshot) => {
            const nextSummaries = snapshot.docs
                .map((entry) => {
                    const data = entry.data() as Record<string, unknown>;
                    const updatedAt = data.updatedAt as Timestamp | undefined;
                    return {
                        chatId: entry.id,
                        participants: ((data.participants as string[]) || []).filter(Boolean),
                        lastMessage: (data.lastMessage as string) || '',
                        lastMessageSenderUid: (data.lastMessageSenderUid as string) || '',
                        updatedAt,
                        updatedAtMs: updatedAt?.toMillis() ?? 0,
                        readBy: (data.readBy as Record<string, Timestamp> | undefined) ?? {}
                    };
                })
                .filter((entry) => entry.participants.includes(uid))
                .sort((a, b) => b.updatedAtMs - a.updatedAtMs);
            setChatSummaries(nextSummaries);
        });
        return () => unsubscribe();
    }, [uid]);

    useEffect(() => {
        const validChatIds = new Set(chatSummaries.map((entry) => entry.chatId));
        pruneCachedMessages(uid, validChatIds);

        setReadMap((prev) => {
            const filtered = Object.fromEntries(Object.entries(prev).filter(([chatId]) => validChatIds.has(chatId)));
            if (Object.keys(filtered).length === Object.keys(prev).length) return prev;
            saveReadMap(uid, filtered);
            return filtered;
        });

        setHiddenRecentChatIds((prev) => {
            const filtered = prev.filter((chatId) => validChatIds.has(chatId));
            if (filtered.length === prev.length) return prev;
            saveHiddenRecentChatIds(uid, filtered);
            return filtered;
        });
    }, [chatSummaries, uid]);

    useEffect(() => {
        if (!isOpen) {
            setUsers([]);
            return;
        }

        const usersQuery = query(usersRef, limit(120));
        const unsubscribe = onSnapshot(usersQuery, (snapshot) => {
            const nextUsers = snapshot.docs
                .map((entry) => entry.data() as Record<string, unknown>)
                .map((entry) => ({
                    uid: (entry.uid as string) || '',
                    displayName: (entry.displayName as string) || '',
                    email: (entry.email as string) || '',
                    countryCode: entry.countryCode as string | undefined
                }))
                .filter((entry) => entry.uid && entry.uid !== uid);
            setUsers(nextUsers);
        });

        return () => unsubscribe();
    }, [isOpen, uid]);

    const sortedUsers = useMemo(() => {
        return [...users].sort((a, b) => {
            const aName = a.displayName || a.email || a.uid;
            const bName = b.displayName || b.email || b.uid;
            return aName.localeCompare(bName);
        });
    }, [users]);

    const usersById = useMemo(() => {
        const map = new Map<string, ChatUser>();
        sortedUsers.forEach((entry) => {
            map.set(entry.uid, entry);
        });
        return map;
    }, [sortedUsers]);

    const activeUsers = useMemo(
        () => sortedUsers.filter((entry) => (presenceMap[entry.uid] ?? 'offline') !== 'offline'),
        [presenceMap, sortedUsers]
    );

    const chatSummaryById = useMemo(() => {
        const map = new Map<string, ChatSummary>();
        chatSummaries.forEach((entry) => map.set(entry.chatId, entry));
        return map;
    }, [chatSummaries]);

    useEffect(() => {
        if (selectedChatId) {
            const selectedExists = chatSummaryById.has(selectedChatId);
            if (!selectedExists) setSelectedChatId('');
            return;
        }
        if (selectionCleared) return;
        if (!sortedUsers.length) {
            setActiveUserId('');
            return;
        }

        const hasCurrent = sortedUsers.some((entry) => entry.uid === activeUserId);
        if (hasCurrent) return;

        if (activeUsers.length) {
            setActiveUserId(activeUsers[0].uid);
            return;
        }
        setActiveUserId(sortedUsers[0].uid);
    }, [activeUserId, activeUsers, chatSummaryById, selectedChatId, selectionCleared, sortedUsers]);

    const activeUser = useMemo(
        () => sortedUsers.find((entry) => entry.uid === activeUserId) ?? null,
        [activeUserId, sortedUsers]
    );

    const selectedSummary = useMemo(() => {
        if (!selectedChatId) return null;
        return chatSummaryById.get(selectedChatId) ?? null;
    }, [chatSummaryById, selectedChatId]);

    const activePeerUid = useMemo(() => {
        if (selectedSummary) {
            return selectedSummary.participants.find((id) => id !== uid) || '';
        }
        return activeUser?.uid || '';
    }, [selectedSummary, activeUser?.uid, uid]);

    const activePeerLabel = useMemo(() => {
        if (activeUser) return activeUser.displayName || activeUser.email || activeUser.uid;
        if (selectedSummary) {
            const peerUid = selectedSummary.participants.find((id) => id !== uid) || '';
            const fromMap = usersById.get(peerUid);
            if (fromMap) return fromMap.displayName || fromMap.email || fromMap.uid;
            return peerUid || 'Player';
        }
        return '';
    }, [activeUser, selectedSummary, uid, usersById]);

    const activeChatId = useMemo(() => {
        if (selectedSummary) return selectedSummary.chatId;
        if (!activePeerUid) return '';
        return buildPrivateChatId(uid, activePeerUid);
    }, [selectedSummary, activePeerUid, uid]);
    const activeChatSummary = useMemo(() => chatSummaryById.get(activeChatId) ?? null, [activeChatId, chatSummaryById]);
    const activePeerReadAtMs = useMemo(() => {
        if (!activeChatSummary || !activePeerUid) return 0;
        const peerReadAt = activeChatSummary.readBy?.[activePeerUid];
        return peerReadAt?.toMillis() ?? 0;
    }, [activeChatSummary, activePeerUid]);
    const { messages, hasMoreOlder, loadingOlder, loadOlderMessages } = useChatMessages({ uid, activeChatId, isOpen });

    const openChatFromNotification = useCallback(
        (chatId: string, senderUid: string) => {
            setIsOpen(true);
            setSelectionCleared(false);
            if (chatId) setSelectedChatId(chatId);
            if (senderUid) setActiveUserId(senderUid);
        },
        [setActiveUserId]
    );

    const { toggleChatAlerts } = useChatNotifications({
        uid,
        chatNotifyMuted,
        setChatNotifyMuted,
        chatSummaries,
        usersById,
        isOpen,
        activeChatId,
        openChat: openChatFromNotification
    });

    const { typingMap, clearTypingState, resetTypingMap } = useChatTyping({ uid, activeChatId, draft, isOpen });

    const openChatPanel = () => {
        setIsOpen(true);
        setSelectionCleared(true);
        setSelectedChatId('');
        setActiveUserId('');
        setDraft('');
        setSendError('');
    };

    const toggleConversation = (peerUid: string, explicitChatId?: string) => {
        const targetChatId = explicitChatId || buildPrivateChatId(uid, peerUid);
        const isSameChat = !!activeChatId && activeChatId === targetChatId;
        if (isSameChat) {
            setSelectedChatId('');
            setActiveUserId('');
            setDraft('');
            setSendError('');
            setSelectionCleared(true);
            return;
        }
        registerConversationInteraction();
        setSelectionCleared(false);
        setSelectedChatId(explicitChatId || '');
        setActiveUserId(peerUid);
    };

    const markChatAsRead = (chatId: string, readAtMs?: number) => {
        if (!chatId) return;
        const nextReadAt = readAtMs ?? Date.now();
        const prevReadAt = readMap[chatId] ?? 0;
        if (nextReadAt <= prevReadAt) return;
        setReadMap((prev) => {
            const next = { ...prev, [chatId]: nextReadAt };
            saveReadMap(uid, next);
            return next;
        });
        void updateDoc(doc(privateChatsRef, chatId), {
            [`readBy.${uid}`]: serverTimestamp()
        }).catch(() => {
            // Keep local read state even if cross-device receipt update fails.
        });
    };

    useEffect(() => {
        if (!chatSummaries.length) {
            setUnreadByChatId({});
            return;
        }

        const trackedSummaries = chatSummaries.filter((summary) => {
            const readAt = readMap[summary.chatId] ?? 0;
            return !!summary.lastMessageSenderUid && summary.lastMessageSenderUid !== uid && summary.updatedAtMs > readAt;
        });

        if (!trackedSummaries.length) {
            setUnreadByChatId({});
            return;
        }

        const trackedChatIds = new Set(trackedSummaries.map((summary) => summary.chatId));
        setUnreadByChatId((prev) =>
            Object.fromEntries(Object.entries(prev).filter(([chatId]) => trackedChatIds.has(chatId)))
        );

        const unsubscribers = trackedSummaries.map((summary) => {
            const readAt = readMap[summary.chatId] ?? 0;
            const messagesRef = collection(db, 'privateChats', summary.chatId, 'messages');
            const unreadQuery = readAt > 0
                ? query(messagesRef, where('createdAt', '>', new Date(readAt)), limit(100))
                : query(messagesRef, limit(100));

            return onSnapshot(unreadQuery, (snapshot) => {
                const unreadCountForChat = snapshot.docs.reduce((acc, messageDoc) => {
                    const data = messageDoc.data() as Record<string, unknown>;
                    return data.senderUid === uid ? acc : acc + 1;
                }, 0);

                setUnreadByChatId((prev) => {
                    if (unreadCountForChat <= 0) {
                        if (!(summary.chatId in prev)) return prev;
                        const next = { ...prev };
                        delete next[summary.chatId];
                        return next;
                    }
                    if (prev[summary.chatId] === unreadCountForChat) return prev;
                    return { ...prev, [summary.chatId]: unreadCountForChat };
                });
            });
        });

        return () => {
            unsubscribers.forEach((unsubscribe) => unsubscribe());
        };
    }, [chatSummaries, readMap, uid]);

    useEffect(() => {
        const freshIds = messages
            .map((entry) => entry.id)
            .filter((id) => !seenMessageIdsRef.current.has(id));
        if (!freshIds.length) return;
        freshIds.forEach((id) => seenMessageIdsRef.current.add(id));
        setFreshMessageIds((prev) => {
            const next = { ...prev };
            freshIds.forEach((id) => {
                next[id] = true;
            });
            return next;
        });
        const timer = window.setTimeout(() => {
            setFreshMessageIds((prev) => {
                const next = { ...prev };
                freshIds.forEach((id) => {
                    delete next[id];
                });
                return next;
            });
        }, 420);
        return () => window.clearTimeout(timer);
    }, [messages]);

    useEffect(() => {
        const interval = window.setInterval(() => setNowMs(Date.now()), 30000);
        return () => window.clearInterval(interval);
    }, []);

    const sendMessage = async (event: FormEvent) => {
        event.preventDefault();
        if (!activePeerUid) return;
        const text = draft.trim();
        if (!text || sending) return;

        const nowMs = Date.now();
        const recentSends = sentAtRef.current.filter((value) => nowMs - value <= SPAM_WINDOW_MS);
        sentAtRef.current = recentSends;

        const lastSendAt = recentSends[recentSends.length - 1] ?? 0;
        if (lastSendAt && nowMs - lastSendAt < SPAM_MIN_INTERVAL_MS) {
            setSendError('Too fast. Wait a moment before sending another message.');
            return;
        }
        if (recentSends.length >= SPAM_MAX_MESSAGES_PER_WINDOW) {
            setSendError('Message limit reached. Please try again in a moment.');
            return;
        }
        if (lastSentRef.current.text === text && nowMs - lastSentRef.current.at < SPAM_DUPLICATE_COOLDOWN_MS) {
            setSendError('The same message was sent a moment ago.');
            return;
        }

        sentAtRef.current.push(nowMs);
        setSendError('');
        setSending(true);
        try {
            const chatId = activeChatId || buildPrivateChatId(uid, activePeerUid);
            const participants = [uid, activePeerUid].sort();
            const chatDocRef = doc(privateChatsRef, chatId);
            const newMessageRef = doc(collection(db, 'privateChats', chatId, 'messages'));
            const now = serverTimestamp();
            const batch = writeBatch(db);
            batch.set(
                chatDocRef,
                {
                    participants,
                    schemaVersion: 1,
                    createdAt: now,
                    lastMessage: text,
                    lastMessageSenderUid: uid,
                    updatedAt: now,
                    readBy: {
                        [uid]: now
                    }
                },
                { merge: true }
            );
            batch.set(newMessageRef, {
                senderUid: uid,
                text,
                createdAt: now
            });
            await batch.commit();
            setDraft('');
            await clearTypingState(chatId);
            lastSentRef.current = { text, at: Date.now() };
        } catch (error) {
            const message = (error as { message?: string }).message || 'Failed to send message.';
            setSendError(message);
            sentAtRef.current = sentAtRef.current.slice(0, -1);
        } finally {
            setSending(false);
        }
    };

    const hasUsers = activeUsers.length > 0;
    const hasConversations = chatSummaries.length > 0;
    const onlineCount = useMemo(
        () => activeUsers.filter((entry) => presenceMap[entry.uid] === 'online').length,
        [activeUsers, presenceMap]
    );
    const awayCount = activeUsers.length - onlineCount;
    const getPresenceState = (userId: string): PresenceFilterState => presenceMap[userId] ?? 'offline';
    const unreadCount = useMemo(() => {
        return Object.values(unreadByChatId).reduce((acc, count) => acc + count, 0);
    }, [unreadByChatId]);
    const unreadByUserId = useMemo(() => {
        const map = new Map<string, number>();
        chatSummaries.forEach((summary) => {
            const unreadForChat = unreadByChatId[summary.chatId] ?? 0;
            if (unreadForChat <= 0) return;
            const otherUid = getPeerUid(summary.participants, uid);
            if (!otherUid) return;
            map.set(otherUid, (map.get(otherUid) ?? 0) + unreadForChat);
        });
        return map;
    }, [chatSummaries, uid, unreadByChatId]);

    const recentConversations = useMemo(() => {
        return chatSummaries
            .map((summary) => {
                const otherUid = getPeerUid(summary.participants, uid);
                const userInfo = usersById.get(otherUid);
                return {
                    ...summary,
                    otherUid,
                    userInfo
                };
            })
            .filter((entry) => entry.otherUid && !hiddenRecentChatIds.includes(entry.chatId))
            .slice(0, 8);
    }, [chatSummaries, hiddenRecentChatIds, uid, usersById]);

    const hiddenRecentConversations = useMemo(() => {
        return chatSummaries
            .map((summary) => {
                const otherUid = getPeerUid(summary.participants, uid);
                const userInfo = usersById.get(otherUid);
                return {
                    ...summary,
                    otherUid,
                    userInfo
                };
            })
            .filter((entry) => entry.otherUid && hiddenRecentChatIds.includes(entry.chatId))
            .slice(0, 8);
    }, [chatSummaries, hiddenRecentChatIds, uid, usersById]);

    const hideRecentConversation = (chatId: string) => {
        if (!chatId) return;
        const isHidingActiveChat = activeChatId === chatId;
        setHiddenRecentChatIds((prev) => {
            if (prev.includes(chatId)) return prev;
            const next = [...prev, chatId];
            saveHiddenRecentChatIds(uid, next);
            return next;
        });
        if (isHidingActiveChat) {
            setSelectedChatId('');
            setActiveUserId('');
            setDraft('');
            setSendError('');
            setSelectionCleared(true);
        }
    };

    const restoreHiddenRecentConversations = () => {
        setHiddenRecentChatIds([]);
        saveHiddenRecentChatIds(uid, []);
    };

    const restoreHiddenRecentConversation = (chatId: string) => {
        if (!chatId) return;
        setHiddenRecentChatIds((prev) => {
            const next = prev.filter((id) => id !== chatId);
            saveHiddenRecentChatIds(uid, next);
            return next;
        });
    };

    const clearRecentSwipe = (chatId: string) => {
        setRecentSwipeOffset((prev) => {
            if (!(chatId in prev)) return prev;
            const next = { ...prev };
            delete next[chatId];
            return next;
        });
    };

    const handleRecentTouchStart = (chatId: string, event: React.TouchEvent<HTMLDivElement>) => {
        if (window.innerWidth > 767) return;
        recentTouchStartXRef.current = event.touches[0]?.clientX ?? 0;
        activeSwipeRecentIdRef.current = chatId;
    };

    const handleRecentTouchMove = (chatId: string, event: React.TouchEvent<HTMLDivElement>) => {
        if (window.innerWidth > 767) return;
        if (activeSwipeRecentIdRef.current !== chatId) return;
        const currentX = event.touches[0]?.clientX ?? recentTouchStartXRef.current;
        const delta = currentX - recentTouchStartXRef.current;
        const clamped = Math.max(Math.min(delta, 0), -76);
        setRecentSwipeOffset((prev) => (prev[chatId] === clamped ? prev : { ...prev, [chatId]: clamped }));
    };

    const handleRecentTouchEnd = (chatId: string) => {
        if (window.innerWidth > 767) return;
        if (activeSwipeRecentIdRef.current !== chatId) return;
        activeSwipeRecentIdRef.current = '';
        const offset = recentSwipeOffset[chatId] ?? 0;
        if (offset <= -44) {
            blockedOpenRecentIdRef.current = chatId;
            hideRecentConversation(chatId);
        }
        clearRecentSwipe(chatId);
    };

    const typingUserLabel = useMemo(() => {
        if (!activePeerUid) return '';
        const activeTypingUntil = typingMap[activePeerUid] ?? 0;
        if (activeTypingUntil <= nowMs) return '';
        return activePeerLabel || 'Player';
    }, [activePeerLabel, activePeerUid, nowMs, typingMap]);

    const chatRenderRows = useMemo<ChatRenderRow[]>(
        () => buildChatRenderRows(messages, freshMessageIds, nowMs, uid, GROUP_WINDOW_MS),
        [messages, freshMessageIds, nowMs, uid]
    );

    const { messageRefs, messagesEndRef, messagesContainerRef, registerConversationInteraction, handleMessagesScroll } =
        useChatViewport({
        uid,
        isOpen,
        activeChatId,
        messages,
        readMap,
        onMarkAsRead: (chatId, readAtMs) => markChatAsRead(chatId, readAtMs)
    });

    useEffect(() => {
        resetTypingMap();
    }, [resetTypingMap, uid]);

    useEffect(() => {
        if (!isOpen || !activeChatId) return;
        const raf = window.requestAnimationFrame(() => {
            composerInputRef.current?.focus({ preventScroll: true });
        });
        return () => window.cancelAnimationFrame(raf);
    }, [activeChatId, isOpen]);

    return (
        <aside className="chatWidgetRoot" aria-live="polite">
            {!isOpen && (
                <button
                    type="button"
                    className="chatFab"
                    onClick={openChatPanel}
                    aria-label="Open chat"
                    title="Open chat"
                >
                    <MessageCircle className="h-5 w-5" />
                    {unreadCount > 0 && <span className="chatUnreadBadge">{unreadCount > 99 ? '99+' : unreadCount}</span>}
                </button>
            )}

            <section className={`chatPanel ${isOpen ? 'chatPanelOpen' : ''}`}>
                <header className="chatPanelHeader">
                    <div className="chatPanelHeaderRow">
                        <div>
                            <p className="chatPanelTitle">Live chat</p>
                            <p className="chatPanelSubtitle">
                                Online: {onlineCount} | Away: {awayCount}
                            </p>
                        </div>
                        <div className="chatPanelHeaderControls">
                            <span className={`chatNotifyState ${chatNotifyMuted ? 'isMuted' : 'isEnabled'}`}>
                                <span className="chatNotifyStateLabel">Alerts:</span>
                                <span className="chatNotifyStateValue">{chatNotifyMuted ? 'OFF' : 'ON'}</span>
                            </span>
                            <button
                                type="button"
                                className="btn-secondary chatNotifyBtn"
                                onClick={() => void toggleChatAlerts()}
                                title={chatNotifyMuted ? 'Chat notifications are disabled' : 'Chat notifications are enabled'}
                                aria-label={chatNotifyMuted ? 'Enable chat notifications' : 'Disable chat notifications'}
                            >
                                {chatNotifyMuted ? <BellOff className="h-4 w-4" /> : <Bell className="h-4 w-4" />}
                            </button>
                            <button
                                type="button"
                                className="btn-secondary chatCloseBtn"
                                onClick={() => setIsOpen(false)}
                                title="Close chat"
                                aria-label="Close chat"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </header>

                {hasConversations && (
                    <div className="chatRecentWrap">
                        <div className="chatSectionHeader">
                            <p className="chatSectionLabel">Recent chats</p>
                            <div className="chatSectionActions">
                                {hiddenRecentChatIds.length > 0 && (
                                    <button
                                        type="button"
                                        className="chatRestoreRecentBtn"
                                        onClick={restoreHiddenRecentConversations}
                                        title="Restore hidden recent chats"
                                    >
                                        Restore all ({hiddenRecentChatIds.length})
                                    </button>
                                )}
                                <button
                                    type="button"
                                    className="chatRecentToggleBtn"
                                    onClick={() => setIsRecentExpanded((prev) => !prev)}
                                    aria-expanded={isRecentExpanded}
                                    title={isRecentExpanded ? 'Collapse recent chats' : 'Expand recent chats'}
                                >
                                    {isRecentExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                                    <span>{isRecentExpanded ? 'Collapse' : 'Expand'}</span>
                                </button>
                            </div>
                        </div>
                        {isRecentExpanded && (
                            <>
                                <div className="chatRecentList modalLikeScrollbar">
                                    {recentConversations.map((entry) => {
                                        const label = entry.userInfo?.displayName || entry.userInfo?.email || entry.otherUid;
                                        const unreadForChat = unreadByChatId[entry.chatId] ?? 0;
                                        const isUnread = unreadForChat > 0;
                                        const unreadForUser = unreadByUserId.get(entry.otherUid) ?? 0;
                                        return (
                                            <div
                                                key={entry.chatId}
                                                className={`chatRecentItem ${activeUserId === entry.otherUid ? 'chatRecentItemActive' : ''} ${
                                                    (recentSwipeOffset[entry.chatId] ?? 0) < 0 ? 'chatRecentItemSwiping' : ''
                                                }`}
                                                style={{ transform: `translateX(${recentSwipeOffset[entry.chatId] ?? 0}px)` }}
                                                onTouchStart={(event) => handleRecentTouchStart(entry.chatId, event)}
                                                onTouchMove={(event) => handleRecentTouchMove(entry.chatId, event)}
                                                onTouchEnd={() => handleRecentTouchEnd(entry.chatId)}
                                                onTouchCancel={() => handleRecentTouchEnd(entry.chatId)}
                                            >
                                                <button
                                                    type="button"
                                                    className="chatRecentOpenBtn"
                                                    onClick={() => {
                                                        if (blockedOpenRecentIdRef.current === entry.chatId) {
                                                            blockedOpenRecentIdRef.current = '';
                                                            return;
                                                        }
                                                        toggleConversation(entry.otherUid, entry.chatId);
                                                    }}
                                                >
                                                    <span className="chatRecentMain">
                                                        <UserFlag code={entry.userInfo?.countryCode} className="text-sm" />
                                                        <span className="chatRecentName">
                                                            {withUnreadSuffix(label, unreadForUser)}
                                                        </span>
                                                    </span>
                                                    <span className="chatRecentMeta">
                                                        {isUnread && <span className="chatRecentUnreadDot" />}
                                                        <span>{formatChatTime(entry.updatedAt, entry.updatedAtMs)}</span>
                                                    </span>
                                                </button>
                                                <button
                                                    type="button"
                                                    className="chatRecentCloseItemBtn"
                                                    onClick={() => hideRecentConversation(entry.chatId)}
                                                    aria-label={`Hide chat with ${label}`}
                                                    title="Hide from recent chats"
                                                >
                                                    <X className="h-3.5 w-3.5" />
                                                </button>
                                            </div>
                                        );
                                    })}
                                    {!recentConversations.length && hiddenRecentChatIds.length > 0 && (
                                        <p className="chatRecentEmptyHint">All recent chats are hidden.</p>
                                    )}
                                </div>
                                {!!hiddenRecentConversations.length && (
                                    <div className="chatHiddenRecentList modalLikeScrollbar">
                                        {hiddenRecentConversations.map((entry) => {
                                            const label = entry.userInfo?.displayName || entry.userInfo?.email || entry.otherUid;
                                            return (
                                                <button
                                                    key={`hidden-${entry.chatId}`}
                                                    type="button"
                                                    className="chatHiddenRecentItem"
                                                    onClick={() => restoreHiddenRecentConversation(entry.chatId)}
                                                    title={`Restore chat with ${label}`}
                                                >
                                                    <span className="chatHiddenRecentName">{label}</span>
                                                    <span className="chatHiddenRecentAction">Unhide</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                )}

                {!hasUsers && <p className="chatEmptyState">No active players (online/away).</p>}

                {hasUsers && (
                    <div className="chatUsersList modalLikeScrollbar">
                        {activeUsers.map((entry) => {
                            const label = entry.displayName || entry.email || entry.uid;
                            const presenceState = getPresenceState(entry.uid);
                            const unreadForUser = unreadByUserId.get(entry.uid) ?? 0;
                            return (
                                <button
                                    key={entry.uid}
                                    type="button"
                                    className={`chatUserItem ${activeUserId === entry.uid ? 'chatUserItemActive' : ''}`}
                                    onClick={() => toggleConversation(entry.uid)}
                                >
                                    <span
                                        className={`chatPresenceDot ${
                                            presenceState === 'online' ? 'chatPresenceDotOnline' : 'chatPresenceDotAway'
                                        }`}
                                    />
                                    <UserFlag code={entry.countryCode} className="text-sm" />
                                    <span className="chatUserName">{withUnreadSuffix(label, unreadForUser)}</span>
                                </button>
                            );
                        })}
                    </div>
                )}

                {!activeChatId && (
                    <p className="chatEmptyState">Select a chat from active players or from "Recent chats".</p>
                )}

                {activeChatId && (
                    <>
                        <div
                            ref={messagesContainerRef}
                            className="chatMessages modalLikeScrollbar"
                            onScroll={handleMessagesScroll}
                        >
                            {hasMoreOlder && (
                                <button
                                    type="button"
                                    className="btn-secondary chatLoadOlderBtn"
                                    onClick={loadOlderMessages}
                                    disabled={loadingOlder}
                                >
                                    {loadingOlder ? 'Loading...' : 'Load older'}
                                </button>
                            )}
                            {chatRenderRows.map((row) => {
                                if (row.kind === 'date') {
                                    return (
                                        <div key={row.key} className="chatDateDivider">
                                            <span>{row.label}</span>
                                        </div>
                                    );
                                }
                                return (
                                    <article
                                        key={row.key}
                                        className={`chatBubbleWrap ${row.isMine ? 'chatBubbleWrapMine' : ''}`}
                                    >
                                        <div
                                            className={`chatBubble ${row.isMine ? 'chatBubbleMine' : ''} ${
                                                row.groupTop ? 'chatBubbleGroupTop' : 'chatBubbleGroupMid'
                                            } ${row.groupBottom ? 'chatBubbleGroupBottom' : 'chatBubbleGroupMid'} ${
                                                row.isFresh ? 'chatBubbleEnter' : ''
                                            }`}
                                            ref={(node) => {
                                                messageRefs.current[row.message.id] = node;
                                            }}
                                        >
                                            <p>{row.message.text}</p>
                                            <div className="chatBubbleMeta">
                                                <time>{row.timeLabel}</time>
                                                {row.isMine && (
                                                    <span
                                                        className={`chatReadTick ${
                                                            row.message.createdAtMs > 0 && activePeerReadAtMs >= row.message.createdAtMs
                                                                ? 'isRead'
                                                                : 'isSent'
                                                        }`}
                                                        aria-label={
                                                            row.message.createdAtMs > 0 && activePeerReadAtMs >= row.message.createdAtMs
                                                                ? 'Read'
                                                                : 'Sent'
                                                        }
                                                        title={
                                                            row.message.createdAtMs > 0 && activePeerReadAtMs >= row.message.createdAtMs
                                                                ? 'Read'
                                                                : 'Sent'
                                                        }
                                                    >
                                                        {row.message.createdAtMs > 0 && activePeerReadAtMs >= row.message.createdAtMs
                                                            ? '✓✓'
                                                            : '✓'}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </article>
                                );
                            })}
                            {!chatRenderRows.length && (
                                <p className="chatEmptyState chatEmptyConversation">
                                    Start chatting with: {activePeerLabel || activePeerUid}
                                </p>
                            )}
                            {typingUserLabel && <p className="chatTypingIndicator">{typingUserLabel} is typing...</p>}
                            <div ref={messagesEndRef} />
                        </div>

                        <form className="chatComposer" onSubmit={sendMessage}>
                            <input
                                ref={composerInputRef}
                                className="input"
                                placeholder="Write a message..."
                                value={draft}
                                onChange={(event) => {
                                    setDraft(event.target.value);
                                    if (sendError) setSendError('');
                                }}
                                maxLength={500}
                            />
                            <button className="btn-primary chatSendBtn" type="submit" disabled={sending || !draft.trim()}>
                                <Send className="h-4 w-4" />
                            </button>
                        </form>
                        <div className="chatEmojiBar" aria-label="Quick emojis">
                            {EMOJI_QUICK_PICK.map((emoji) => (
                                <button
                                    key={emoji}
                                    type="button"
                                    className="chatEmojiBtn"
                                    onClick={() => setDraft((prev) => `${prev}${emoji}`)}
                                    title={`Insert ${emoji}`}
                                >
                                    {emoji}
                                </button>
                            ))}
                        </div>
                        {!!sendError && <p className="chatSendError">{sendError}</p>}
                    </>
                )}
            </section>
        </aside>
    );
}
