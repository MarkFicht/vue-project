import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import type { ChatSummary, ChatUser } from '@/types/chat';
import { getPeerUid, withUnreadSuffix } from '@/types/chat';
import { formatChatTime, loadHiddenRecentChatIds, saveHiddenRecentChatIds } from '@/utils/chatWidget';
import { UserFlag } from '@/components/UserFlag';

type RecentConversation = ChatSummary & {
    otherUid: string;
    userInfo?: ChatUser;
};

export function ChatRecentList({
    uid,
    chatSummaries,
    usersById,
    activeUserId,
    activeChatId,
    unreadByChatId,
    unreadByUserId,
    onSelectConversation,
    onHideActiveConversation
}: {
    uid: string;
    chatSummaries: ChatSummary[];
    usersById: Map<string, ChatUser>;
    activeUserId: string;
    activeChatId: string;
    unreadByChatId: Record<string, number>;
    unreadByUserId: Map<string, number>;
    onSelectConversation: (peerUid: string, chatId: string) => void;
    onHideActiveConversation: () => void;
}) {
    const [hiddenRecentChatIds, setHiddenRecentChatIds] = useState<string[]>(() => loadHiddenRecentChatIds(uid));
    const [isRecentExpanded, setIsRecentExpanded] = useState(() => {
        if (typeof window === 'undefined') return true;
        return window.innerWidth > 767;
    });
    const [recentSwipeOffset, setRecentSwipeOffset] = useState<Record<string, number>>({});
    const recentTouchStartXRef = useRef(0);
    const activeSwipeRecentIdRef = useRef('');
    const blockedOpenRecentIdRef = useRef('');

    useEffect(() => {
        setHiddenRecentChatIds(loadHiddenRecentChatIds(uid));
    }, [uid]);

    useEffect(() => {
        const validChatIds = new Set(chatSummaries.map((entry) => entry.chatId));
        setHiddenRecentChatIds((prev) => {
            const filtered = prev.filter((chatId) => validChatIds.has(chatId));
            if (filtered.length === prev.length) return prev;
            saveHiddenRecentChatIds(uid, filtered);
            return filtered;
        });
    }, [chatSummaries, uid]);

    const recentConversations = useMemo<RecentConversation[]>(() => {
        return chatSummaries
            .map((summary) => {
                const otherUid = getPeerUid(summary.participants, uid);
                return {
                    ...summary,
                    otherUid,
                    userInfo: usersById.get(otherUid)
                };
            })
            .filter((entry) => entry.otherUid && !hiddenRecentChatIds.includes(entry.chatId))
            .slice(0, 8);
    }, [chatSummaries, hiddenRecentChatIds, uid, usersById]);

    const hiddenRecentConversations = useMemo<RecentConversation[]>(() => {
        return chatSummaries
            .map((summary) => {
                const otherUid = getPeerUid(summary.participants, uid);
                return {
                    ...summary,
                    otherUid,
                    userInfo: usersById.get(otherUid)
                };
            })
            .filter((entry) => entry.otherUid && hiddenRecentChatIds.includes(entry.chatId))
            .slice(0, 8);
    }, [chatSummaries, hiddenRecentChatIds, uid, usersById]);

    const hideRecentConversation = (chatId: string) => {
        if (!chatId) return;
        if (activeChatId === chatId) onHideActiveConversation();
        setHiddenRecentChatIds((prev) => {
            if (prev.includes(chatId)) return prev;
            const next = [...prev, chatId];
            saveHiddenRecentChatIds(uid, next);
            return next;
        });
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

    if (!chatSummaries.length) return null;

    return (
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
                                            onSelectConversation(entry.otherUid, entry.chatId);
                                        }}
                                    >
                                        <span className="chatRecentMain">
                                            <UserFlag code={entry.userInfo?.countryCode} className="text-sm" />
                                            <span className="chatRecentName">{withUnreadSuffix(label, unreadForUser)}</span>
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
    );
}
