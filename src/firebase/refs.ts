import { collection, doc } from 'firebase/firestore';
import { db } from '@/firebaseConfig';

export const usersRef = collection(db, 'users');
export const displayNamesRef = collection(db, 'displayNames');
export const gameStatusRef = collection(db, 'gameStatus');
export const gameStatusDuelRef = doc(gameStatusRef, 'Duel');
export const gameStatusGemsRef = doc(gameStatusRef, 'Gems');
export const gameStatusReflexRef = doc(gameStatusRef, 'Reflex');

export const gameDuelRef = collection(db, 'gameDuel');
export const tableGameDuelRef = doc(gameDuelRef, 'table1');
