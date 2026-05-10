import { create } from 'zustand';
import { deleteDoc, doc, onSnapshot, serverTimestamp, updateDoc } from 'firebase/firestore';
import type IUser from '@/interfaces/User';
import {
    gameStatusDuelRef,
    gameStatusGemsRef,
    gameStatusReflexRef,
    tableGameDuelRef,
    usersRef
} from '@/firebase/refs';

type GameCardInfo = {
    isStarted: boolean;
    players: IUser[];
};

type GameStoreState = {
    duel: GameCardInfo;
    gems: GameCardInfo;
    reflex: GameCardInfo;
    unsubscribers: Array<() => void>;
    subFirebaseConnect: () => void;
    unSubFirebaseConnect: () => void;
    deleteGameDuel: () => Promise<void>;
};

const emptyGame: GameCardInfo = {
    isStarted: false,
    players: []
};

export const useGameStore = create<GameStoreState>((set, get) => ({
    duel: emptyGame,
    gems: emptyGame,
    reflex: emptyGame,
    unsubscribers: [],
    subFirebaseConnect: () => {
        get().unSubFirebaseConnect();
        const unsubscribers = [
            onSnapshot(gameStatusDuelRef, (snap) => {
                if (!snap.exists()) return;
                const { isStarted, players } = snap.data();
                set({ duel: { isStarted, players } });
            }),
            onSnapshot(gameStatusGemsRef, (snap) => {
                if (!snap.exists()) return;
                const { isStarted, players } = snap.data();
                set({ gems: { isStarted, players } });
            }),
            onSnapshot(gameStatusReflexRef, (snap) => {
                if (!snap.exists()) return;
                const { isStarted, players } = snap.data();
                set({ reflex: { isStarted, players } });
            })
        ];
        set({ unsubscribers });
    },
    unSubFirebaseConnect: () => {
        get().unsubscribers.forEach((unsubscribe) => unsubscribe());
        set({ unsubscribers: [] });
    },
    deleteGameDuel: async () => {
        const players = get().duel.players;

        await updateDoc(gameStatusDuelRef, {
            isStarted: false,
            players: []
        });

        await Promise.all(
            players.map(async ({ uid, game }) => {
                if (game !== 'Duel') return;

                await updateDoc(doc(usersRef, uid), {
                    game: '',
                    readyToGame: false,
                    online: 'online',
                    timestamp: serverTimestamp()
                });
            })
        );

        await deleteDoc(tableGameDuelRef);
    }
}));
