import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
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
    resolveSnapshotTimeMs,
    type ChatMessageLite
} from '@/utils/chatWidget';

export function useChatMessages({
    uid,
    activeChatId,
    isOpen,
    chatExists
}: {
    uid: string;
    activeChatId: string;
    isOpen: boolean;
    chatExists: boolean;
}) {
    const [liveMessages, setLiveMessages] = useState<ChatMessageLite[]>([]);
    const [olderMessages, setOlderMessages] = useState<ChatMessageLite[]>([]);
    const [oldestCursor, setOldestCursor] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
    const [hasMoreOlder, setHasMoreOlder] = useState(false);
    const [loadingOlder, setLoadingOlder] = useState(false);
    const [messagesReady, setMessagesReady] = useState(false);
    const [loadedChatId, setLoadedChatId] = useState('');
    const activeChatIdRef = useRef(activeChatId);
    activeChatIdRef.current = activeChatId;

    const mapMessageDoc = useCallback((entry: QueryDocumentSnapshot<DocumentData>) => {
        const data = entry.data() as Record<string, unknown>;
        const createdAt = data.createdAt as Timestamp | undefined;
        return {
            id: entry.id,
            senderUid: (data.senderUid as string) || '',
            text: (data.text as string) || '',
            createdAt,
            createdAtMs: resolveSnapshotTimeMs(createdAt, entry.metadata.hasPendingWrites)
        };
    }, []);

    const resetMessageState = useCallback((ready: boolean) => {
        setOlderMessages([]);
        setOldestCursor(null);
        setHasMoreOlder(false);
        setLoadingOlder(false);
        setMessagesReady(ready);
    }, []);

    useLayoutEffect(() => {
        if (!isOpen || !activeChatId) {
            setLoadedChatId('');
            setLiveMessages([]);
            resetMessageState(false);
            return;
        }

        setLoadedChatId(activeChatId);
        if (!chatExists) {
            setLiveMessages([]);
            resetMessageState(true);
            return;
        }

        resetMessageState(false);
        const cachedMessages = hydrateCachedMessages(uid, activeChatId);
        setLiveMessages(cachedMessages);
        if (cachedMessages.length === CHAT_PAGE_SIZE) setHasMoreOlder(true);
        if (cachedMessages.length > 0) {
            requestAnimationFrame(() => {
                if (activeChatIdRef.current === activeChatId) setMessagesReady(true);
            });
        }
    }, [activeChatId, chatExists, isOpen, resetMessageState, uid]);

    useEffect(() => {
        if (!isOpen || !activeChatId || !chatExists) return;

        const messagesRef = collection(db, 'privateChats', activeChatId, 'messages');
        const messagesQuery = query(messagesRef, orderBy('createdAt', 'desc'), limit(CHAT_PAGE_SIZE));
        const subscribedChatId = activeChatId;
        const unsubscribe = onSnapshot(
            messagesQuery,
            (snapshot) => {
                if (activeChatIdRef.current !== subscribedChatId) return;
                const nextMessages = snapshot.docs.map(mapMessageDoc).reverse();
                setLiveMessages(nextMessages);
                setOldestCursor(snapshot.docs.length ? snapshot.docs[snapshot.docs.length - 1] : null);
                setHasMoreOlder(snapshot.docs.length === CHAT_PAGE_SIZE);
                setMessagesReady(true);
            },
            () => {
                clearCachedMessages(uid, activeChatId);
                setLiveMessages([]);
                resetMessageState(true);
            }
        );

        return () => unsubscribe();
    }, [activeChatId, chatExists, isOpen, mapMessageDoc, resetMessageState, uid]);

    const messages = useMemo(() => {
        if (loadedChatId !== activeChatId) return [];
        return mergeMessages([...olderMessages, ...liveMessages]);
    }, [activeChatId, loadedChatId, olderMessages, liveMessages]);

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

    return { messages, hasMoreOlder, loadingOlder, loadOlderMessages, messagesReady };
}
