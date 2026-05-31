import { useEffect } from 'react';
import { onDisconnect, onValue, ref as rtdbRef, serverTimestamp as rtdbServerTimestamp, set } from 'firebase/database';
import { rtdb } from '@/firebaseConfig';

export type PresenceState = 'online' | 'away' | 'offline';

export function usePresence(uid?: string) {
    useEffect(() => {
        if (!uid) return;

        const resolveState = (): PresenceState =>
            document.visibilityState === 'visible' ? 'online' : 'away';

        const statusRef = rtdbRef(rtdb, `status/${uid}`);
        const connectedRef = rtdbRef(rtdb, '.info/connected');

        const writePresence = (state: PresenceState) => {
            return set(statusRef, {
                state,
                lastChanged: rtdbServerTimestamp()
            });
        };

        const unsubscribeConnected = onValue(connectedRef, async (snap) => {
            if (snap.val() !== true) return;
            await onDisconnect(statusRef).set({
                state: 'offline',
                lastChanged: rtdbServerTimestamp()
            });
            await writePresence(resolveState());
        });

        const onVisibility = () => {
            void writePresence(resolveState());
        };
        document.addEventListener('visibilitychange', onVisibility);

        return () => {
            unsubscribeConnected();
            document.removeEventListener('visibilitychange', onVisibility);
            void onDisconnect(statusRef).cancel();
            void writePresence('offline');
        };
    }, [uid]);
}
