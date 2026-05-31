import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { collection, doc, serverTimestamp, writeBatch } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import {
    CHAT_SPAM_DUPLICATE_COOLDOWN_MS,
    CHAT_SPAM_MAX_MESSAGES_PER_WINDOW,
    CHAT_SPAM_MIN_INTERVAL_MS,
    CHAT_SPAM_WINDOW_MS,
    buildPrivateChatId
} from '@/types/chat';

export function useChatSendMessage({
    uid,
    activeChatId,
    activePeerUid,
    onMessageSent
}: {
    uid: string;
    activeChatId: string;
    activePeerUid: string;
    onMessageSent?: (chatId: string) => void | Promise<void>;
}) {
    const [draft, setDraft] = useState('');
    const [sending, setSending] = useState(false);
    const [sendError, setSendError] = useState('');
    const sentAtRef = useRef<number[]>([]);
    const lastSentRef = useRef<{ text: string; at: number }>({ text: '', at: 0 });

    useEffect(() => {
        setDraft('');
        setSendError('');
        sentAtRef.current = [];
        lastSentRef.current = { text: '', at: 0 };
    }, [uid]);

    const clearComposer = useCallback(() => {
        setDraft('');
        setSendError('');
    }, []);

    const sendMessage = useCallback(
        async (event: FormEvent) => {
            event.preventDefault();
            if (!activePeerUid) return;
            const text = draft.trim();
            if (!text || sending) return;

            const nowMs = Date.now();
            const recentSends = sentAtRef.current.filter((value) => nowMs - value <= CHAT_SPAM_WINDOW_MS);
            sentAtRef.current = recentSends;

            const lastSendAt = recentSends[recentSends.length - 1] ?? 0;
            if (lastSendAt && nowMs - lastSendAt < CHAT_SPAM_MIN_INTERVAL_MS) {
                setSendError('Too fast. Wait a moment before sending another message.');
                return;
            }
            if (recentSends.length >= CHAT_SPAM_MAX_MESSAGES_PER_WINDOW) {
                setSendError('Message limit reached. Please try again in a moment.');
                return;
            }
            if (lastSentRef.current.text === text && nowMs - lastSentRef.current.at < CHAT_SPAM_DUPLICATE_COOLDOWN_MS) {
                setSendError('The same message was sent a moment ago.');
                return;
            }

            sentAtRef.current.push(nowMs);
            setSendError('');
            setSending(true);
            try {
                const chatId = activeChatId || buildPrivateChatId(uid, activePeerUid);
                const participants = [uid, activePeerUid].sort();
                const chatDocRef = doc(db, 'privateChats', chatId);
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
                await onMessageSent?.(chatId);
                lastSentRef.current = { text, at: Date.now() };
            } catch (error) {
                const message = (error as { message?: string }).message || 'Failed to send message.';
                setSendError(message);
                sentAtRef.current = sentAtRef.current.slice(0, -1);
            } finally {
                setSending(false);
            }
        },
        [activeChatId, activePeerUid, draft, onMessageSent, sending, uid]
    );

    return {
        draft,
        setDraft,
        sending,
        sendError,
        setSendError,
        sendMessage,
        clearComposer
    };
}
