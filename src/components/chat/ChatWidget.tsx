import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useChatMessages } from '@/hooks/useChatMessages';
import { useChatNotifications } from '@/hooks/useChatNotifications';
import { useChatReadState } from '@/hooks/useChatReadState';
import { useChatSelection } from '@/hooks/useChatSelection';
import { useChatSendMessage } from '@/hooks/useChatSendMessage';
import { useChatSummaries } from '@/hooks/useChatSummaries';
import { useChatTyping } from '@/hooks/useChatTyping';
import { useChatUsers } from '@/hooks/useChatUsers';
import { useChatViewport } from '@/hooks/useChatViewport';
import { useFreshMessageIds } from '@/hooks/useFreshMessageIds';
import { buildPrivateChatId, CHAT_GROUP_WINDOW_MS } from '@/types/chat';
import { buildChatRenderRows, loadChatNotifyMuted } from '@/utils/chatWidget';
import { ChatConversation } from '@/components/chat/ChatConversation';
import { ChatFab } from '@/components/chat/ChatFab';
import { ChatPanelHeader } from '@/components/chat/ChatPanelHeader';
import { ChatRecentList } from '@/components/chat/ChatRecentList';
import { ChatUsersStrip } from '@/components/chat/ChatUsersStrip';
import '@/styles/chat-widget.css';

export function ChatWidget({ uid }: { uid: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const [nowMs, setNowMs] = useState(() => Date.now());
    const [chatNotifyMuted, setChatNotifyMuted] = useState(() => loadChatNotifyMuted(uid));
    const composerInputRef = useRef<HTMLInputElement | null>(null);
    const registerInteractionRef = useRef<() => void>(() => {});
    const clearTypingRef = useRef<(chatId: string) => Promise<void>>(async () => {});

    const { chatSummaries, chatSummaryById } = useChatSummaries(uid);
    const { usersById, activeUsers, presenceMap, onlineCount, awayCount, sortedUsers } = useChatUsers(uid, isOpen);
    const {
        markChatAsRead,
        unreadByChatId,
        unreadCount,
        unreadByUserId,
        getActiveReadAtMs,
        getPeerReadAtMs,
        isChatUnread
    } = useChatReadState(uid, chatSummaries, chatSummaryById);
    const {
        activeUserId,
        activePeerUid,
        activePeerLabel,
        activeChatId,
        setSelectionCleared,
        clearActiveConversation,
        openConversation,
        openFromNotification
    } = useChatSelection({
        uid,
        sortedUsers,
        activeUsers,
        usersById,
        chatSummaryById
    });

    const activeChatSummary = useMemo(() => chatSummaryById.get(activeChatId) ?? null, [activeChatId, chatSummaryById]);
    const chatExists = !!activeChatId && chatSummaryById.has(activeChatId);

    const { messages, hasMoreOlder, loadingOlder, loadOlderMessages, messagesReady } = useChatMessages({
        uid,
        activeChatId,
        isOpen,
        chatExists
    });
    const freshMessageIds = useFreshMessageIds(messages, uid);
    const { draft, setDraft, sending, sendError, setSendError, sendMessage, clearComposer } = useChatSendMessage({
        uid,
        activeChatId,
        activePeerUid,
        onMessageSent: (chatId) => clearTypingRef.current(chatId)
    });
    const { typingMap, clearTypingState, resetTypingMap } = useChatTyping({
        uid,
        activeChatId,
        draft,
        isOpen,
        chatExists
    });

    clearTypingRef.current = clearTypingState;

    const activeReadAtMs = useMemo(() => getActiveReadAtMs(activeChatId), [activeChatId, getActiveReadAtMs]);
    const activePeerReadAtMs = useMemo(
        () => getPeerReadAtMs(activeChatId, activePeerUid),
        [activeChatId, activePeerUid, getPeerReadAtMs]
    );

    const { messageRefs, messagesEndRef, messagesContainerRef, registerConversationInteraction, handleMessagesScroll } =
        useChatViewport({
            uid,
            isOpen,
            activeChatId,
            messages,
            messagesReady,
            activeReadAtMs,
            onMarkAsRead: markChatAsRead
        });

    registerInteractionRef.current = registerConversationInteraction;

    useEffect(() => {
        setChatNotifyMuted(loadChatNotifyMuted(uid));
    }, [uid]);

    useEffect(() => {
        resetTypingMap();
    }, [resetTypingMap, uid]);

    useEffect(() => {
        const interval = window.setInterval(() => setNowMs(Date.now()), 30000);
        return () => window.clearInterval(interval);
    }, []);

    useEffect(() => {
        if (!isOpen || !activeChatId) return;
        const raf = window.requestAnimationFrame(() => {
            composerInputRef.current?.focus({ preventScroll: true });
        });
        return () => window.cancelAnimationFrame(raf);
    }, [activeChatId, isOpen]);

    const openChatFromNotification = useCallback(
        (chatId: string, senderUid: string) => {
            setIsOpen(true);
            openFromNotification(chatId, senderUid);
        },
        [openFromNotification]
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

    const openChatPanel = () => {
        setIsOpen(true);
        setSelectionCleared(true);
        clearActiveConversation();
        clearComposer();
    };

    const toggleConversation = useCallback(
        (peerUid: string, explicitChatId?: string) => {
            const targetChatId = explicitChatId || buildPrivateChatId(uid, peerUid);
            if (activeChatId && activeChatId === targetChatId) {
                clearActiveConversation();
                clearComposer();
                return;
            }
            registerInteractionRef.current();
            openConversation(peerUid, explicitChatId);
            if (isChatUnread(targetChatId)) {
                markChatAsRead(targetChatId);
            }
        },
        [activeChatId, clearActiveConversation, clearComposer, isChatUnread, markChatAsRead, openConversation, uid]
    );

    const chatRenderRows = useMemo(
        () => buildChatRenderRows(messages, freshMessageIds, nowMs, uid, CHAT_GROUP_WINDOW_MS),
        [messages, freshMessageIds, nowMs, uid]
    );

    const typingUserLabel = useMemo(() => {
        if (!activePeerUid) return '';
        const activeTypingUntil = typingMap[activePeerUid] ?? 0;
        if (activeTypingUntil <= nowMs) return '';
        return activePeerLabel || 'Player';
    }, [activePeerLabel, activePeerUid, nowMs, typingMap]);

    return (
        <aside className="chatWidgetRoot" aria-live="polite">
            {!isOpen && <ChatFab unreadCount={unreadCount} onOpen={openChatPanel} />}

            <section className={`chatPanel ${isOpen ? 'chatPanelOpen' : ''}`}>
                <ChatPanelHeader
                    onlineCount={onlineCount}
                    awayCount={awayCount}
                    chatNotifyMuted={chatNotifyMuted}
                    onToggleAlerts={toggleChatAlerts}
                    onClose={() => setIsOpen(false)}
                />

                <ChatRecentList
                    uid={uid}
                    chatSummaries={chatSummaries}
                    usersById={usersById}
                    activeUserId={activeUserId}
                    activeChatId={activeChatId}
                    unreadByChatId={unreadByChatId}
                    unreadByUserId={unreadByUserId}
                    onSelectConversation={toggleConversation}
                    onHideActiveConversation={() => {
                        clearActiveConversation();
                        clearComposer();
                    }}
                />

                <ChatUsersStrip
                    activeUsers={activeUsers}
                    activeUserId={activeUserId}
                    presenceMap={presenceMap}
                    unreadByUserId={unreadByUserId}
                    onSelectUser={(peerUid) => toggleConversation(peerUid)}
                />

                {!activeChatId && (
                    <p className="chatEmptyState">Select a chat from active players or from "Recent chats".</p>
                )}

                {activeChatId && (
                    <ChatConversation
                        key={activeChatId}
                        activePeerLabel={activePeerLabel}
                        activePeerUid={activePeerUid}
                        activePeerReadAtMs={activePeerReadAtMs}
                        chatRenderRows={chatRenderRows}
                        hasMoreOlder={hasMoreOlder}
                        loadingOlder={loadingOlder}
                        typingUserLabel={typingUserLabel}
                        draft={draft}
                        sending={sending}
                        sendError={sendError}
                        composerInputRef={composerInputRef}
                        messagesContainerRef={messagesContainerRef}
                        messagesEndRef={messagesEndRef}
                        messageRefs={messageRefs}
                        onLoadOlder={loadOlderMessages}
                        onScroll={handleMessagesScroll}
                        onDraftChange={(value) => {
                            setDraft(value);
                            if (sendError) setSendError('');
                        }}
                        onSend={sendMessage}
                        onInsertEmoji={(emoji) => setDraft((prev) => `${prev}${emoji}`)}
                    />
                )}
            </section>
        </aside>
    );
}
