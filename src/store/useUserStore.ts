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
    online: ''
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
                    timestamp: data.timestamp
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
