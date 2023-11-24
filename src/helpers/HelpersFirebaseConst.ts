import db from '@/firebase/index';
import { collection, doc } from 'firebase/firestore';

// --- All Users Ref
export const usersRef = collection(db, 'users');

// --- All Games Status Ref
export const gameStatusRef = collection(db, 'gameStatus');
export const gameStatusDuelRef = doc(gameStatusRef, 'Duel');
export const gameStatusGemsRef = doc(gameStatusRef, 'Gems');
export const gameStatusReflexRef = doc(gameStatusRef, 'Reflex');

// --- Duel Game Ref
export const gameDuelRef = collection(db, 'gameDuel');
export const tableGameDuelRef = doc(gameDuelRef, 'table1');

// --- Gems Game Ref
export const gameGemsRef = collection(db, 'gameGems');
export const tableGameGemsRef = doc(gameGemsRef, 'table1');

// --- Reflex Game Ref
export const gameReflexRef = collection(db, 'gameReflex');
export const tableGameReflexRef = doc(gameReflexRef, 'table1');
