import { defineStore } from 'pinia';
import { doc, updateDoc, deleteDoc, onSnapshot, serverTimestamp } from 'firebase/firestore';
import {
    usersRef,
    gameStatusDuelRef,
    gameStatusGemsRef,
    gameStatusReflexRef,
    tableGameDuelRef,
    tableGameGemsRef,
    tableGameReflexRef
} from '@/helpers/HelpersFirebaseConst';
import type IUser from '@/interfaces/User';

let unSubFirebaseStatusDuel: any;
let unSubFirebaseStatusGems: any;
let unSubFirebaseStatusReflex: any;

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
    actions: {
        async subFirebaseConnect() {
            unSubFirebaseStatusDuel = await onSnapshot(gameStatusDuelRef, (doc) => {
                if (doc.exists()) {
                    const { isStarted, players } = doc.data();
                    this.duel.isStarted = isStarted;
                    this.duel.players = players;
                }
            });
            unSubFirebaseStatusGems = await onSnapshot(gameStatusGemsRef, (doc) => {
                if (doc.exists()) {
                    const { isStarted, players } = doc.data();
                    this.gems.isStarted = isStarted;
                    this.gems.players = players;
                }
            });
            unSubFirebaseStatusReflex = await onSnapshot(gameStatusReflexRef, (doc) => {
                if (doc.exists()) {
                    const { isStarted, players } = doc.data();
                    this.reflex.isStarted = isStarted;
                    this.reflex.players = players;
                }
            });
        },
        async unSubFirebaseConnect() {
            await unSubFirebaseStatusDuel();
            await unSubFirebaseStatusGems();
            await unSubFirebaseStatusReflex();
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
        },
        async deleteGameGems(): Promise<void> {
            const playersUid = this.gems.players.map((user) => user);

            await updateDoc(gameStatusGemsRef, {
                isStarted: false,
                players: []
            });

            playersUid.forEach(async ({ uid, game }) => {
                if (game === 'Gems') {
                    await updateDoc(doc(usersRef, uid), {
                        game: '',
                        readyToGame: false,
                        online: 'online',
                        timestamp: serverTimestamp()
                    });
                }
            });

            await deleteDoc(tableGameGemsRef);
        },
        async deleteGameReflex(): Promise<void> {
            const playersUid = this.reflex.players.map((user) => user);

            await updateDoc(gameStatusReflexRef, {
                isStarted: false,
                players: []
            });

            playersUid.forEach(async ({ uid, game }) => {
                if (game === 'Reflex') {
                    await updateDoc(doc(usersRef, uid), {
                        game: '',
                        readyToGame: false,
                        online: 'online',
                        timestamp: serverTimestamp()
                    });
                }
            });

            await deleteDoc(tableGameReflexRef);
        }
    }
});
