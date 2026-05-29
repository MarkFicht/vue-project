import { useCallback, useEffect, useMemo, useState } from 'react';
import { doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { privateChatsRef } from '@/firebase/refs';
import type { ChatSummary } from '@/types/chat';
import { getPeerUid } from '@/types/chat';
import { getEffectiveReadAtMs, isChatUnreadForUser, timestampToMs } from '@/utils/chatWidget';

export function useChatReadState(
    uid: string,
    chatSummaries: ChatSummary[],
    chatSummaryById: Map<string, ChatSummary>
) {
    const [optimisticReadAtByChatId, setOptimisticReadAtByChatId] = useState<Record<string, number>>({});

    useEffect(() => {
        setOptimisticReadAtByChatId({});
    }, [uid]);

    useEffect(() => {
        setOptimisticReadAtByChatId((prev) => {
            let changed = false;
            const next = { ...prev };
            chatSummaries.forEach((summary) => {
                if (!summary.lastMessageSenderUid || summary.lastMessageSenderUid === uid) return;
                const optimisticAt = next[summary.chatId] ?? 0;
                if (optimisticAt > 0 && summary.updatedAtMs > optimisticAt) {
                    delete next[summary.chatId];
                    changed = true;
                }
            });
            return changed ? next : prev;
        });
    }, [chatSummaries, uid]);

    const markChatAsRead = useCallback(
        (chatId: string) => {
            if (!chatId) return;
            const summary = chatSummaryById.get(chatId);
            const optimisticAt = Math.max(Date.now(), summary?.updatedAtMs ?? 0);
            setOptimisticReadAtByChatId((prev) => {
                if ((prev[chatId] ?? 0) >= optimisticAt) return prev;
                return { ...prev, [chatId]: optimisticAt };
            });
            void updateDoc(doc(privateChatsRef, chatId), {
                [`readBy.${uid}`]: serverTimestamp()
            }).catch(() => {
                // Ignore transient write failures; next open will retry.
            });
        },
        [chatSummaryById, uid]
    );

    const unreadByChatId = useMemo(() => {
        const next: Record<string, number> = {};
        chatSummaries.forEach((summary) => {
            const optimisticAt = optimisticReadAtByChatId[summary.chatId] ?? 0;
            if (!isChatUnreadForUser(summary, uid, optimisticAt)) return;
            next[summary.chatId] = 1;
        });
        return next;
    }, [chatSummaries, optimisticReadAtByChatId, uid]);

    const unreadCount = useMemo(
        () => Object.values(unreadByChatId).reduce((acc, count) => acc + count, 0),
        [unreadByChatId]
    );

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

    const getActiveReadAtMs = useCallback(
        (chatId: string) => {
            const summary = chatSummaryById.get(chatId);
            if (!summary) return 0;
            return getEffectiveReadAtMs(summary, uid, optimisticReadAtByChatId[chatId] ?? 0);
        },
        [chatSummaryById, optimisticReadAtByChatId, uid]
    );

    const getPeerReadAtMs = useCallback(
        (chatId: string, peerUid: string) => {
            const summary = chatSummaryById.get(chatId);
            if (!summary || !peerUid) return 0;
            return timestampToMs(summary.readBy?.[peerUid]);
        },
        [chatSummaryById]
    );

    const isChatUnread = useCallback(
        (chatId: string) => {
            const summary = chatSummaryById.get(chatId);
            if (!summary) return false;
            return isChatUnreadForUser(summary, uid, optimisticReadAtByChatId[chatId] ?? 0);
        },
        [chatSummaryById, optimisticReadAtByChatId, uid]
    );

    return {
        markChatAsRead,
        unreadByChatId,
        unreadCount,
        unreadByUserId,
        getActiveReadAtMs,
        getPeerReadAtMs,
        isChatUnread
    };
}
