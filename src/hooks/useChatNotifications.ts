import { useCallback, useEffect, useRef } from 'react';
import { registerWebPushToken, subscribeToForegroundPush } from '@/utils/pushNotifications';
import { saveChatNotifyMuted } from '@/utils/chatWidget';
import { playUiSound } from '@/utils/sound';

type ChatSummaryLite = {
    chatId: string;
    participants: string[];
    lastMessage: string;
    lastMessageSenderUid: string;
    updatedAtMs: number;
};

type ChatUserLite = {
    displayName: string;
    email: string;
};

export function useChatNotifications({
    uid,
    chatNotifyMuted,
    setChatNotifyMuted,
    chatSummaries,
    usersById,
    isOpen,
    activeChatId,
    openChat
}: {
    uid: string;
    chatNotifyMuted: boolean;
    setChatNotifyMuted: (next: boolean) => void;
    chatSummaries: ChatSummaryLite[];
    usersById: Map<string, ChatUserLite>;
    isOpen: boolean;
    activeChatId: string;
    openChat: (chatId: string, senderUid: string) => void;
}) {
    const lastSummariesRef = useRef<Record<string, number>>({});
    const summariesReadyRef = useRef(false);
    const permissionPromptedRef = useRef(false);
    const lastIncomingSummarySoundRef = useRef('');

    useEffect(() => {
        lastSummariesRef.current = {};
        summariesReadyRef.current = false;
        permissionPromptedRef.current = false;
        lastIncomingSummarySoundRef.current = '';
    }, [uid]);

    useEffect(() => {
        if (chatNotifyMuted || typeof Notification === 'undefined') return;
        if (Notification.permission !== 'granted') return;
        void registerWebPushToken(uid);
    }, [chatNotifyMuted, uid]);

    useEffect(() => {
        let unsubscribe: (() => void) | undefined;
        if (chatNotifyMuted) return;

        void subscribeToForegroundPush((payload) => {
            const chatId = payload.data?.chatId || '';
            const senderUid = payload.data?.senderUid || '';
            const title = payload.notification?.title || payload.data?.title || 'New message';
            const body = payload.notification?.body || payload.data?.body || 'You have a new chat message.';
            const currentChatOpen = isOpen && activeChatId === chatId && document.visibilityState === 'visible';
            if (currentChatOpen) return;

            if (typeof Notification === 'undefined' || Notification.permission !== 'granted') return;
            const notification = new Notification(title, { body, tag: chatId || 'chat-foreground' });
            notification.onclick = () => {
                window.focus();
                openChat(chatId, senderUid);
                notification.close();
            };
        }).then((dispose) => {
            unsubscribe = dispose;
        });

        return () => unsubscribe?.();
    }, [activeChatId, chatNotifyMuted, isOpen, openChat]);

    useEffect(() => {
        const nextMap: Record<string, number> = {};
        let newestIncoming: ChatSummaryLite | null = null;

        chatSummaries.forEach((summary) => {
            nextMap[summary.chatId] = summary.updatedAtMs;
            const previousUpdatedAt = lastSummariesRef.current[summary.chatId] ?? 0;
            const isNewIncoming =
                summariesReadyRef.current &&
                summary.lastMessageSenderUid &&
                summary.lastMessageSenderUid !== uid &&
                summary.updatedAtMs > previousUpdatedAt;
            if (isNewIncoming && (!newestIncoming || summary.updatedAtMs > newestIncoming.updatedAtMs)) {
                newestIncoming = summary;
            }
        });

        lastSummariesRef.current = nextMap;
        if (!summariesReadyRef.current) {
            summariesReadyRef.current = true;
            return;
        }

        if (!newestIncoming || chatNotifyMuted || typeof Notification === 'undefined') return;
        const currentChatOpen = isOpen && activeChatId === newestIncoming.chatId && document.visibilityState === 'visible';
        if (currentChatOpen) return;

        const senderUid = newestIncoming.participants.find((id) => id !== uid) || '';
        const sender = usersById.get(senderUid);
        const title = sender?.displayName || sender?.email || 'New message';
        const body = newestIncoming.lastMessage || 'You have a new chat message.';
        const incomingSoundKey = `${newestIncoming.chatId}:${newestIncoming.updatedAtMs}`;

        if (lastIncomingSummarySoundRef.current !== incomingSoundKey) {
            lastIncomingSummarySoundRef.current = incomingSoundKey;
            playUiSound('notify');
        }

        if (Notification.permission === 'granted') {
            const notification = new Notification(title, { body, tag: newestIncoming.chatId });
            notification.onclick = () => {
                window.focus();
                openChat(newestIncoming.chatId, senderUid);
                notification.close();
            };
            return;
        }

        if (Notification.permission === 'default' && !permissionPromptedRef.current) {
            permissionPromptedRef.current = true;
            void Notification.requestPermission();
        }
    }, [activeChatId, chatNotifyMuted, chatSummaries, isOpen, openChat, uid, usersById]);

    const toggleChatAlerts = useCallback(async () => {
        const next = !chatNotifyMuted;
        setChatNotifyMuted(next);
        saveChatNotifyMuted(uid, next);
        if (!next) return;
        if (typeof Notification === 'undefined' || Notification.permission !== 'default' || permissionPromptedRef.current) return;
        permissionPromptedRef.current = true;
        const permission = await Notification.requestPermission();
        if (permission === 'granted') await registerWebPushToken(uid);
    }, [chatNotifyMuted, setChatNotifyMuted, uid]);

    return { toggleChatAlerts };
}
