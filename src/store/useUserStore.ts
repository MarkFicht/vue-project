import { create } from 'zustand';
import { doc, onSnapshot } from 'firebase/firestore';
import type IUser from '@/interfaces/User';
import { usersRef } from '@/firebase/refs';

type UserState = {
    fbUser: IUser;
    hasLoadedSnapshot: boolean;
    unsubscribe?: () => void;
    subFirebaseConnect: (uid: string) => void;
    unSubFirebaseConnect: () => void;
};

const emptyUser: IUser = {
    uid: '',
    displayName: '',
    displayNameKey: '',
    email: '',
    game: '',
    readyToGame: false,
    timestamp: '',
    status: 'offline',
    createdAt: '',
    updatedAt: '',
    lastSeenAt: '',
    schemaVersion: 1,
    soundMuted: false
};

export const useUserStore = create<UserState>((set, get) => ({
    fbUser: emptyUser,
    hasLoadedSnapshot: false,
    unsubscribe: undefined,
    subFirebaseConnect: (uid: string) => {
        set({ hasLoadedSnapshot: false });
        get().unsubscribe?.();
        const unsubscribe = onSnapshot(doc(usersRef, uid), (snapshot) => {
            if (!snapshot.exists()) {
                set({ hasLoadedSnapshot: true });
                return;
            }

            const data = snapshot.data() as IUser;
            set({
                fbUser: {
                    uid: data.uid,
                    displayName: data.displayName,
                    displayNameKey: data.displayNameKey,
                    email: data.email,
                    readyToGame: data.readyToGame,
                    game: data.game,
                    status: data.status,
                    timestamp: data.timestamp,
                    createdAt: data.createdAt,
                    updatedAt: data.updatedAt,
                    lastSeenAt: data.lastSeenAt,
                    schemaVersion: data.schemaVersion,
                    soundMuted: typeof data.soundMuted === 'boolean' ? data.soundMuted : false,
                    countryCode: data.countryCode
                },
                hasLoadedSnapshot: true
            });
        });

        set({ unsubscribe });
    },
    unSubFirebaseConnect: () => {
        get().unsubscribe?.();
        set({ fbUser: emptyUser, unsubscribe: undefined, hasLoadedSnapshot: false });
    }
}));
