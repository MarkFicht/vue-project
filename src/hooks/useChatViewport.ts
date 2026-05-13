import { useCallback, useEffect, useRef } from 'react';
import { isNearBottom, type ChatMessageLite } from '@/utils/chatWidget';

export function useChatViewport({
    uid,
    isOpen,
    activeChatId,
    messages,
    readMap,
    onMarkAsRead
}: {
    uid: string;
    isOpen: boolean;
    activeChatId: string;
    messages: ChatMessageLite[];
    readMap: Record<string, number>;
    onMarkAsRead: (chatId: string, readAtMs: number) => void;
}) {
    const lastTailMessageIdRef = useRef('');
    const initialScrollChatIdRef = useRef('');
    const messageRefs = useRef<Record<string, HTMLDivElement | null>>({});
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const messagesContainerRef = useRef<HTMLDivElement | null>(null);

    const maybeMarkActiveChatAsRead = useCallback(() => {
        if (!isOpen || !activeChatId) return;
        if (!isNearBottom(messagesContainerRef.current)) return;
        const latestIncomingAt = messages.reduce((latest, entry) => {
            if (entry.senderUid === uid) return latest;
            return Math.max(latest, entry.createdAtMs || 0);
        }, 0);
        if (!latestIncomingAt) return;
        onMarkAsRead(activeChatId, latestIncomingAt);
    }, [activeChatId, isOpen, messages, onMarkAsRead, uid]);

    useEffect(() => {
        initialScrollChatIdRef.current = '';
        lastTailMessageIdRef.current = '';
        messageRefs.current = {};
    }, [uid]);

    useEffect(() => {
        if (!isOpen || !activeChatId) return;
        initialScrollChatIdRef.current = activeChatId;
    }, [activeChatId, isOpen]);

    useEffect(() => {
        const tailMessage = messages[messages.length - 1];
        if (!tailMessage) {
            lastTailMessageIdRef.current = '';
            return;
        }
        const prevTailMessageId = lastTailMessageIdRef.current;
        const tailChanged = prevTailMessageId !== tailMessage.id;
        lastTailMessageIdRef.current = tailMessage.id;
        if (!tailChanged) return;
        const shouldScroll = tailMessage.senderUid === uid || isNearBottom(messagesContainerRef.current);
        if (!shouldScroll) return;
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, [messages, uid]);

    useEffect(() => {
        if (!activeChatId || !messages.length) return;
        if (initialScrollChatIdRef.current !== activeChatId) return;

        const readAt = readMap[activeChatId] ?? 0;
        const hasUnread = messages.some((entry) => entry.senderUid !== uid && entry.createdAtMs > readAt);
        let targetId = '';
        if (hasUnread && readAt > 0) {
            for (let i = messages.length - 1; i >= 0; i -= 1) {
                const current = messages[i];
                if (current.createdAtMs > 0 && current.createdAtMs <= readAt) {
                    targetId = current.id;
                    break;
                }
            }
        }

        const raf = window.requestAnimationFrame(() => {
            if (hasUnread && targetId && messageRefs.current[targetId]) {
                messageRefs.current[targetId]?.scrollIntoView({ block: 'center', behavior: 'smooth' });
            } else {
                messagesEndRef.current?.scrollIntoView({ block: 'end', behavior: 'smooth' });
            }
            initialScrollChatIdRef.current = '';
        });
        return () => window.cancelAnimationFrame(raf);
    }, [activeChatId, messages, readMap, uid]);

    useEffect(() => {
        if (!isOpen) return;
        const raf = window.requestAnimationFrame(() => {
            maybeMarkActiveChatAsRead();
        });
        return () => window.cancelAnimationFrame(raf);
    }, [isOpen, activeChatId, messages, maybeMarkActiveChatAsRead]);

    return {
        messageRefs,
        messagesEndRef,
        messagesContainerRef,
        maybeMarkActiveChatAsRead
    };
}
