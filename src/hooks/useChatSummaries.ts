import { useEffect, useMemo, useRef, useState } from 'react';
import { limit, onSnapshot, query, where, type Timestamp } from 'firebase/firestore';
import { privateChatsRef } from '@/firebase/refs';
import type { ChatSummary } from '@/types/chat';
import { pruneCachedMessages, resolveSnapshotTimeMs } from '@/utils/chatWidget';

export function useChatSummaries(uid: string) {
    const lastSummaryUpdatedAtMsRef = useRef<Record<string, number>>({});
    const [chatSummaries, setChatSummaries] = useState<ChatSummary[]>([]);

    useEffect(() => {
        lastSummaryUpdatedAtMsRef.current = {};
    }, [uid]);

    useEffect(() => {
        const chatsQuery = query(privateChatsRef, where('participants', 'array-contains', uid), limit(80));
        const unsubscribe = onSnapshot(chatsQuery, (snapshot) => {
            const nextSummaries = snapshot.docs
                .map((entry) => {
                    const data = entry.data() as Record<string, unknown>;
                    const updatedAt = data.updatedAt as Timestamp | undefined;
                    const previousUpdatedAtMs = lastSummaryUpdatedAtMsRef.current[entry.id] ?? 0;
                    const updatedAtMs = resolveSnapshotTimeMs(updatedAt, entry.metadata.hasPendingWrites, previousUpdatedAtMs);
                    if (updatedAtMs > 0) {
                        lastSummaryUpdatedAtMsRef.current[entry.id] = updatedAtMs;
                    }
                    return {
                        chatId: entry.id,
                        participants: ((data.participants as string[]) || []).filter(Boolean),
                        lastMessage: (data.lastMessage as string) || '',
                        lastMessageSenderUid: (data.lastMessageSenderUid as string) || '',
                        updatedAt,
                        updatedAtMs,
                        readBy: (data.readBy as Record<string, unknown> | undefined) ?? {}
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
    }, [chatSummaries, uid]);

    const chatSummaryById = useMemo(() => {
        const map = new Map<string, ChatSummary>();
        chatSummaries.forEach((entry) => map.set(entry.chatId, entry));
        return map;
    }, [chatSummaries]);

    return { chatSummaries, chatSummaryById };
}
