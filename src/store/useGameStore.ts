import { create } from 'zustand';
import { onSnapshot } from 'firebase/firestore';
import type IUser from '@/interfaces/User';
import { gameStatusDuelRef, gameStatusGemsRef, gameStatusReflexRef } from '@/firebase/refs';
import { cleanupDuelGame } from '@/store/duelCleanup';

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
    deleteGameDuel: cleanupDuelGame
}));
