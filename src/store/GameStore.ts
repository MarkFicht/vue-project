import { defineStore } from 'pinia';
import db from '@/firebase/index';
import {
    collection,
    doc,
    updateDoc,
    onSnapshot,
    increment,
    arrayUnion,
    arrayRemove
} from 'firebase/firestore';
import type IUser from '@/interfaces/User';

const gameStatusRef = collection(db, 'gameStatus');
const statusGameDuelRef = doc(gameStatusRef, 'Duel');
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
            unSubFirebaseStatusDuel = await onSnapshot(statusGameDuelRef, (doc) => {
                if (doc.exists()) {
                    const { isStarted, players } = doc.data();
                    this.duel.isStarted = isStarted;
                    this.duel.players = players;
                }
            });
            // TODO in pgoress for Gems and Reflex Status
        },
        unSubFirebaseConnect() {
            unSubFirebaseStatusDuel();
        }
    }
});
