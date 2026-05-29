import { useEffect, useMemo, useState } from 'react';
import { limit, onSnapshot, query } from 'firebase/firestore';
import { usersRef } from '@/firebase/refs';
import { usePresenceMap } from '@/hooks/usePresenceMap';
import type { ChatUser } from '@/types/chat';

export function useChatUsers(uid: string, isOpen: boolean) {
    const [users, setUsers] = useState<ChatUser[]>([]);
    const presenceMap = usePresenceMap();

    useEffect(() => {
        if (!isOpen) {
            setUsers([]);
            return;
        }

        const usersQuery = query(usersRef, limit(120));
        const unsubscribe = onSnapshot(usersQuery, (snapshot) => {
            const nextUsers = snapshot.docs
                .map((entry) => entry.data() as Record<string, unknown>)
                .map((entry) => ({
                    uid: (entry.uid as string) || '',
                    displayName: (entry.displayName as string) || '',
                    email: (entry.email as string) || '',
                    countryCode: entry.countryCode as string | undefined
                }))
                .filter((entry) => entry.uid && entry.uid !== uid);
            setUsers(nextUsers);
        });

        return () => unsubscribe();
    }, [isOpen, uid]);

    const sortedUsers = useMemo(() => {
        return [...users].sort((a, b) => {
            const aName = a.displayName || a.email || a.uid;
            const bName = b.displayName || b.email || b.uid;
            return aName.localeCompare(bName);
        });
    }, [users]);

    const usersById = useMemo(() => {
        const map = new Map<string, ChatUser>();
        sortedUsers.forEach((entry) => map.set(entry.uid, entry));
        return map;
    }, [sortedUsers]);

    const activeUsers = useMemo(
        () => sortedUsers.filter((entry) => (presenceMap[entry.uid] ?? 'offline') !== 'offline'),
        [presenceMap, sortedUsers]
    );

    const onlineCount = useMemo(
        () => activeUsers.filter((entry) => presenceMap[entry.uid] === 'online').length,
        [activeUsers, presenceMap]
    );

    return {
        sortedUsers,
        usersById,
        activeUsers,
        presenceMap,
        onlineCount,
        awayCount: activeUsers.length - onlineCount
    };
}
