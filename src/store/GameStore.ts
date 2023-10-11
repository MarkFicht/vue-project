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

const gameDuelRef = collection(db, 'gameDuel');
const tableGameDuelRef = doc(gameDuelRef, 'table1');
let unSubFirebase: any;

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
    actions: {}
});
