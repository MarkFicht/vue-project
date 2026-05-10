import { useEffect, useState } from 'react';
import { onValue, ref as rtdbRef } from 'firebase/database';
import { rtdb } from '@/firebaseConfig';
import type { PresenceState } from '@/hooks/usePresence';

export function usePresenceMap() {
    const [presenceMap, setPresenceMap] = useState<Record<string, PresenceState>>({});

    useEffect(() => {
        const statusRoot = rtdbRef(rtdb, 'status');
        const unsubscribe = onValue(statusRoot, (snap) => {
            const data = (snap.val() ?? {}) as Record<string, { state?: PresenceState }>;
            const next: Record<string, PresenceState> = {};
            Object.entries(data).forEach(([userId, value]) => {
                next[userId] = value?.state ?? 'offline';
            });
            setPresenceMap(next);
        });
        return () => unsubscribe();
    }, []);

    return presenceMap;
}
