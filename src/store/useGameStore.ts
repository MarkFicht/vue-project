import { create } from 'zustand';
import { deleteDoc, deleteField, doc, onSnapshot, serverTimestamp, updateDoc } from 'firebase/firestore';
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
    duelLoaded: boolean;
    gemsLoaded: boolean;
    reflexLoaded: boolean;
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
    duelLoaded: false,
    gemsLoaded: false,
    reflexLoaded: false,
    unsubscribers: [],
    subFirebaseConnect: () => {
        get().unSubFirebaseConnect();
        set({ duelLoaded: false, gemsLoaded: false, reflexLoaded: false });
        const unsubscribers = [
            onSnapshot(gameStatusDuelRef, (snap) => {
                if (!snap.exists()) {
                    set({ duel: emptyGame, duelLoaded: true });
                    return;
                }
                const { isStarted, players } = snap.data();
                set({ duel: { isStarted, players }, duelLoaded: true });
            }),
            onSnapshot(gameStatusGemsRef, (snap) => {
                if (!snap.exists()) {
                    set({ gems: emptyGame, gemsLoaded: true });
                    return;
                }
                const { isStarted, players } = snap.data();
                set({ gems: { isStarted, players }, gemsLoaded: true });
            }),
            onSnapshot(gameStatusReflexRef, (snap) => {
                if (!snap.exists()) {
                    set({ reflex: emptyGame, reflexLoaded: true });
                    return;
                }
                const { isStarted, players } = snap.data();
                set({ reflex: { isStarted, players }, reflexLoaded: true });
            })
        ];
        set({ unsubscribers });
    },
    unSubFirebaseConnect: () => {
        get().unsubscribers.forEach((unsubscribe) => unsubscribe());
        set({
            duel: emptyGame,
            gems: emptyGame,
            reflex: emptyGame,
            duelLoaded: false,
            gemsLoaded: false,
            reflexLoaded: false,
            unsubscribers: []
        });
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
                    status: 'online',
                    online: deleteField(),
                    timestamp: serverTimestamp()
                });
            })
        );

        await deleteDoc(tableGameDuelRef);
    }
}));
