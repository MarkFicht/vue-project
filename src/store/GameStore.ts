import { defineStore } from 'pinia';
import db from '@/firebase/index';
import {
    collection,
    doc,
    updateDoc,
    deleteDoc,
    onSnapshot,
    serverTimestamp
} from 'firebase/firestore';
import type IUser from '@/interfaces/User';

const usersRef = collection(db, 'users');

const gameStatusRef = collection(db, 'gameStatus');
const gameStatusDuelRef = doc(gameStatusRef, 'Duel');

// --- Duel Game Ref
const gameDuelRef = collection(db, 'gameDuel');
const tableGameDuelRef = doc(gameDuelRef, 'table1');

let unSubFirebaseStatusDuel: any;

export interface IGameStore {
    duel: IGameCardInfo;
    gems: IGameCardInfo;
    reflex: IGameCardInfo;
}

export interface IGameCardInfo {
    isStarted: boolean;
    players: IUser[];
}

export const gameStore = defineStore('gameStore', {
    state: (): IGameStore => {
        return {
            duel: {
                isStarted: false,
                players: []
            },
            gems: {
                isStarted: false,
                players: []
            },
            reflex: {
                isStarted: false,
                players: []
            }
        };
    },
    getters: {
        //
    },
    actions: {
        async subFirebaseConnect() {
            // firebase - set game
            unSubFirebaseStatusDuel = await onSnapshot(gameStatusDuelRef, (doc) => {
                if (doc.exists()) {
                    const { isStarted, players } = doc.data();
                    this.duel.isStarted = isStarted;
                    this.duel.players = players;
                }
            });
            // TODO in progress for Gems and Reflex Status
        },
        unSubFirebaseConnect() {
            unSubFirebaseStatusDuel();
        },
        async deleteGameDuel(): Promise<void> {
            const playersUid = this.duel.players.map((user) => user);

            await updateDoc(gameStatusDuelRef, {
                isStarted: false,
                players: []
            });

            playersUid.forEach(async ({ uid, game }) => {
                if (game === 'Duel') {
                    await updateDoc(doc(usersRef, uid), {
                        game: '',
                        readyToGame: false,
                        online: 'online',
                        timestamp: serverTimestamp()
                    });
                }
            });

            await deleteDoc(tableGameDuelRef);
        }
    }
});
