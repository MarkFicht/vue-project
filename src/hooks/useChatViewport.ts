import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { isNearBottom, type ChatMessageLite } from '@/utils/chatWidget';

const scrollToBottom = (el: HTMLDivElement | null, behavior: ScrollBehavior = 'smooth') => {
    el?.scrollTo({ top: el.scrollHeight, behavior });
};

const afterPaint = (fn: () => void) => {
    let cancelled = false;
    const id = requestAnimationFrame(() => requestAnimationFrame(() => !cancelled && fn()));
    return () => {
        cancelled = true;
        cancelAnimationFrame(id);
    };
};

export function useChatViewport({
    uid,
    isOpen,
    activeChatId,
    messages,
    messagesReady,
    activeReadAtMs,
    onMarkAsRead
}: {
    uid: string;
    isOpen: boolean;
    activeChatId: string;
    messages: ChatMessageLite[];
    messagesReady: boolean;
    activeReadAtMs: number;
    onMarkAsRead: (chatId: string) => void;
}) {
    const scroll = useRef({
        tailId: '',
        initialDone: '',
        openReadAt: 0,
        userInteracted: false,
        pendingInteraction: false,
        markedRead: ''
    });
    const readAtMsRef = useRef(activeReadAtMs);
    readAtMsRef.current = activeReadAtMs;
    const messageRefs = useRef<Record<string, HTMLElement | null>>({});
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const messagesContainerRef = useRef<HTMLDivElement | null>(null);

    const resetScroll = (onChatSwitch = false) => {
        const s = scroll.current;
        if (onChatSwitch) {
            s.openReadAt = readAtMsRef.current;
            s.userInteracted = s.pendingInteraction;
            s.pendingInteraction = false;
        } else {
            s.openReadAt = 0;
            s.userInteracted = false;
            s.pendingInteraction = false;
        }
        s.initialDone = '';
        s.tailId = '';
        s.markedRead = '';
        messageRefs.current = {};
    };

    const maybeMarkActiveChatAsRead = useCallback(() => {
        const s = scroll.current;
        if (!isOpen || !activeChatId || !s.userInteracted || !isNearBottom(messagesContainerRef.current)) return;
        if (s.markedRead === activeChatId) return;
        const latestIncomingAt = messages.reduce(
            (latest, entry) => (entry.senderUid === uid ? latest : Math.max(latest, entry.createdAtMs || 0)),
            0
        );
        if (!latestIncomingAt) return;
        s.markedRead = activeChatId;
        onMarkAsRead(activeChatId);
    }, [activeChatId, isOpen, messages, onMarkAsRead, uid]);

    useEffect(() => resetScroll(), [uid]);
    useLayoutEffect(() => {
        if (isOpen && activeChatId) resetScroll(true);
    }, [activeChatId, isOpen]);

    useEffect(() => {
        const s = scroll.current;
        if (s.initialDone !== activeChatId) return;
        const tail = messages.at(-1);
        if (!tail) {
            s.tailId = '';
            return;
        }
        if (tail.senderUid !== uid) s.markedRead = '';
        if (s.tailId === tail.id) return;
        s.tailId = tail.id;
        if (tail.senderUid === uid || isNearBottom(messagesContainerRef.current)) {
            scrollToBottom(messagesContainerRef.current);
        }
    }, [activeChatId, messages, uid]);

    useEffect(() => {
        const s = scroll.current;
        if (!activeChatId || !messages.length || !messagesReady || s.initialDone === activeChatId) return;

        const readAt = s.openReadAt;
        const hasUnread = messages.some((m) => m.senderUid !== uid && m.createdAtMs > readAt);
        const targetId =
            hasUnread && readAt > 0
                ? [...messages].reverse().find((m) => m.createdAtMs > 0 && m.createdAtMs <= readAt)?.id
                : undefined;

        return afterPaint(() => {
            const tail = messages.at(-1);
            const targetEl = targetId ? messageRefs.current[targetId] : null;
            if (hasUnread && targetEl) {
                targetEl.scrollIntoView({ block: 'center', behavior: 'smooth' });
            } else {
                scrollToBottom(messagesContainerRef.current);
            }
            s.initialDone = activeChatId;
            s.tailId = tail?.id ?? '';
        });
    }, [activeChatId, messages, messagesReady, uid]);

    const registerConversationInteraction = useCallback(() => {
        scroll.current.pendingInteraction = true;
        scroll.current.userInteracted = true;
    }, []);

    const handleMessagesScroll = useCallback(() => {
        scroll.current.userInteracted = true;
        maybeMarkActiveChatAsRead();
    }, [maybeMarkActiveChatAsRead]);

    return {
        messageRefs,
        messagesEndRef,
        messagesContainerRef,
        registerConversationInteraction,
        handleMessagesScroll
    };
}
