import { useEffect, useRef, useState } from 'react';
import type { ChatMessageLite } from '@/utils/chatWidget';

export function useFreshMessageIds(messages: ChatMessageLite[], uid: string) {
    const [freshMessageIds, setFreshMessageIds] = useState<Record<string, true>>({});
    const seenMessageIdsRef = useRef<Set<string>>(new Set());

    useEffect(() => {
        seenMessageIdsRef.current = new Set();
        setFreshMessageIds({});
    }, [uid]);

    useEffect(() => {
        const freshIds = messages.map((entry) => entry.id).filter((id) => !seenMessageIdsRef.current.has(id));
        if (!freshIds.length) return;
        freshIds.forEach((id) => seenMessageIdsRef.current.add(id));
        setFreshMessageIds((prev) => {
            const next = { ...prev };
            freshIds.forEach((id) => {
                next[id] = true;
            });
            return next;
        });
        const timer = window.setTimeout(() => {
            setFreshMessageIds((prev) => {
                const next = { ...prev };
                freshIds.forEach((id) => {
                    delete next[id];
                });
                return next;
            });
        }, 420);
        return () => window.clearTimeout(timer);
    }, [messages]);

    return freshMessageIds;
}
