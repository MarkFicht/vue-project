import { create } from 'zustand';
import { doc, onSnapshot } from 'firebase/firestore';
import type IUser from '@/interfaces/User';
import { usersRef } from '@/firebase/refs';

type UserState = {
    fbUser: IUser;
    unsubscribe?: () => void;
    subFirebaseConnect: (uid: string) => void;
    unSubFirebaseConnect: () => void;
};

const emptyUser: IUser = {
    uid: '',
    displayName: '',
    email: '',
    game: '',
    readyToGame: false,
    timestamp: '',
    online: 'offline',
    status: 'offline',
    createdAt: '',
    updatedAt: '',
    lastSeenAt: '',
    schemaVersion: 1,
    soundMuted: false
};

export const useUserStore = create<UserState>((set, get) => ({
    fbUser: emptyUser,
    unsubscribe: undefined,
    subFirebaseConnect: (uid: string) => {
        get().unsubscribe?.();
        const unsubscribe = onSnapshot(doc(usersRef, uid), (snapshot) => {
            if (!snapshot.exists()) {
                return;
            }

            const data = snapshot.data() as IUser;
            set({
                fbUser: {
                    uid: data.uid,
                    displayName: data.displayName,
                    email: data.email,
                    readyToGame: data.readyToGame,
                    game: data.game,
                    online: data.online,
                    status: data.status,
                    timestamp: data.timestamp,
                    createdAt: data.createdAt,
                    updatedAt: data.updatedAt,
                    lastSeenAt: data.lastSeenAt,
                    schemaVersion: data.schemaVersion,
                    soundMuted: data.soundMuted
                }
            });
        });

        set({ unsubscribe });
    },
    unSubFirebaseConnect: () => {
        get().unsubscribe?.();
        set({ unsubscribe: undefined });
    }
}));
