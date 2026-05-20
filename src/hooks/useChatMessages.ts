import { useCallback, useEffect, useMemo, useState } from 'react';
import {
    collection,
    type DocumentData,
    getDocs,
    limit,
    onSnapshot,
    orderBy,
    type QueryDocumentSnapshot,
    query,
    startAfter,
    type Timestamp
} from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import {
    CHAT_PAGE_SIZE,
    clearCachedMessages,
    hydrateCachedMessages,
    mergeMessages,
    persistCachedMessages,
    type ChatMessageLite
} from '@/utils/chatWidget';

export function useChatMessages({
    uid,
    activeChatId,
    isOpen
}: {
    uid: string;
    activeChatId: string;
    isOpen: boolean;
}) {
    const [liveMessages, setLiveMessages] = useState<ChatMessageLite[]>([]);
    const [olderMessages, setOlderMessages] = useState<ChatMessageLite[]>([]);
    const [oldestCursor, setOldestCursor] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
    const [hasMoreOlder, setHasMoreOlder] = useState(false);
    const [loadingOlder, setLoadingOlder] = useState(false);

    const mapMessageDoc = useCallback((entry: QueryDocumentSnapshot<DocumentData>) => {
        const data = entry.data() as Record<string, unknown>;
        const createdAt = data.createdAt as Timestamp | undefined;
        const fallbackMs = entry.metadata.hasPendingWrites ? Date.now() : 0;
        return {
            id: entry.id,
            senderUid: (data.senderUid as string) || '',
            text: (data.text as string) || '',
            createdAt,
            createdAtMs: createdAt?.toMillis() ?? fallbackMs
        };
    }, []);

    useEffect(() => {
        if (!isOpen || !activeChatId) {
            setLiveMessages([]);
            setOlderMessages([]);
            setOldestCursor(null);
            setHasMoreOlder(false);
            setLoadingOlder(false);
            return;
        }

        setOlderMessages([]);
        setOldestCursor(null);
        setHasMoreOlder(false);
        setLoadingOlder(false);
        setLiveMessages(hydrateCachedMessages(uid, activeChatId));

        const messagesRef = collection(db, 'privateChats', activeChatId, 'messages');
        const messagesQuery = query(messagesRef, orderBy('createdAt', 'desc'), limit(CHAT_PAGE_SIZE));
        const unsubscribe = onSnapshot(
            messagesQuery,
            (snapshot) => {
                const nextMessages = snapshot.docs.map(mapMessageDoc).reverse();
                setLiveMessages(nextMessages);
                setOldestCursor(snapshot.docs.length ? snapshot.docs[snapshot.docs.length - 1] : null);
                setHasMoreOlder(snapshot.docs.length === CHAT_PAGE_SIZE);
            },
            () => {
                clearCachedMessages(uid, activeChatId);
                setLiveMessages([]);
                setOlderMessages([]);
                setOldestCursor(null);
                setHasMoreOlder(false);
            }
        );

        return () => unsubscribe();
    }, [activeChatId, isOpen, mapMessageDoc, uid]);

    const messages = useMemo(() => mergeMessages([...olderMessages, ...liveMessages]), [olderMessages, liveMessages]);

    useEffect(() => {
        if (!activeChatId) return;
        persistCachedMessages(uid, activeChatId, messages);
    }, [activeChatId, messages, uid]);

    const loadOlderMessages = useCallback(async () => {
        if (!activeChatId || !oldestCursor || !hasMoreOlder || loadingOlder) return;
        setLoadingOlder(true);
        try {
            const messagesRef = collection(db, 'privateChats', activeChatId, 'messages');
            const olderQuery = query(messagesRef, orderBy('createdAt', 'desc'), startAfter(oldestCursor), limit(CHAT_PAGE_SIZE));
            const olderSnap = await getDocs(olderQuery);
            const fetched = olderSnap.docs.map(mapMessageDoc).reverse();
            setOlderMessages((prev) => mergeMessages([...fetched, ...prev]));
            if (olderSnap.docs.length) setOldestCursor(olderSnap.docs[olderSnap.docs.length - 1]);
            setHasMoreOlder(olderSnap.docs.length === CHAT_PAGE_SIZE);
        } finally {
            setLoadingOlder(false);
        }
    }, [activeChatId, hasMoreOlder, loadingOlder, mapMessageDoc, oldestCursor]);

    return { messages, hasMoreOlder, loadingOlder, loadOlderMessages };
}
