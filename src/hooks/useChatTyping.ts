import { useCallback, useEffect, useRef, useState } from 'react';
import { collection, deleteDoc, doc, onSnapshot, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '@/firebaseConfig';

const TYPING_IDLE_MS = 1800;
const TYPING_EXPIRES_MS = 4000;

export function useChatTyping({
    uid,
    activeChatId,
    draft,
    isOpen,
    chatExists
}: {
    uid: string;
    activeChatId: string;
    draft: string;
    isOpen: boolean;
    chatExists: boolean;
}) {
    const [typingMap, setTypingMap] = useState<Record<string, number>>({});
    const typingTimeoutRef = useRef<number | null>(null);

    const clearTypingState = useCallback(
        async (chatId = activeChatId) => {
            if (typingTimeoutRef.current) {
                window.clearTimeout(typingTimeoutRef.current);
                typingTimeoutRef.current = null;
            }
            if (!chatId) return;
            try {
                await deleteDoc(doc(db, 'privateChats', chatId, 'typing', uid));
            } catch {
                // Best effort.
            }
        },
        [activeChatId, uid]
    );

    const pulseTypingState = useCallback(async () => {
        if (!activeChatId || !chatExists || !draft.trim()) return;
        await setDoc(
            doc(db, 'privateChats', activeChatId, 'typing', uid),
            {
                uid,
                expiresAt: Date.now() + TYPING_EXPIRES_MS,
                updatedAt: serverTimestamp()
            },
            { merge: true }
        );
    }, [activeChatId, chatExists, draft, uid]);

    useEffect(() => {
        if (!isOpen || !activeChatId || !chatExists) {
            setTypingMap({});
            return;
        }
        const typingRef = collection(db, 'privateChats', activeChatId, 'typing');
        const unsubscribe = onSnapshot(typingRef, (snapshot) => {
            const next: Record<string, number> = {};
            snapshot.docs.forEach((entry) => {
                const data = entry.data() as Record<string, unknown>;
                const writerUid = (data.uid as string) || entry.id;
                const expiresAt = (data.expiresAt as number) || 0;
                if (writerUid) next[writerUid] = expiresAt;
            });
            setTypingMap(next);
        });
        return () => {
            unsubscribe();
            void clearTypingState(activeChatId);
        };
    }, [activeChatId, chatExists, clearTypingState, isOpen]);

    useEffect(() => {
        if (!isOpen || !activeChatId || !chatExists) return;
        if (!draft.trim()) {
            void clearTypingState(activeChatId);
            return;
        }
        void pulseTypingState();
        if (typingTimeoutRef.current) window.clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = window.setTimeout(() => {
            void clearTypingState(activeChatId);
        }, TYPING_IDLE_MS);
    }, [activeChatId, chatExists, clearTypingState, draft, isOpen, pulseTypingState]);

    useEffect(() => {
        return () => {
            if (typingTimeoutRef.current) window.clearTimeout(typingTimeoutRef.current);
        };
    }, []);

    const resetTypingMap = useCallback(() => setTypingMap({}), []);
    return { typingMap, clearTypingState, resetTypingMap };
}
