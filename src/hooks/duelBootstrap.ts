import { getDoc, runTransaction, serverTimestamp } from 'firebase/firestore';
import type IUser from '@/interfaces/User';
import { BoardDuel, PlayerDuel } from '@/interfaces/GameDuel';
import { cardsTierGuild, cardsTierOne, cardsTierThree, cardsTierTwo, cardsWonder, coins } from '@/helpers/GameDuelInit';
import { prepareIdForCards, sampleArray } from '@/helpers/GameDuelHelpers';
import { tableGameDuelRef } from '@/firebase/refs';
import { db } from '@/firebaseConfig';
import { isFirestoreCode } from '@/utils/firestoreErrors';

const DUEL_BOOTSTRAP_TAKEOVER_DELAY_MS = 3500;

const sleep = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms));

const buildInitialDuelTable = (players: IUser[]) => {
    const randomCoins = sampleArray(coins, 10);
    const randomWonders = sampleArray(cardsWonder, 8);
    const tier3 = sampleArray([...sampleArray(cardsTierThree, 17), ...sampleArray(cardsTierGuild, 3)], 20);

    return {
        player1: { ...new PlayerDuel(), user: players[0] },
        player2: { ...new PlayerDuel(), user: players[1] },
        selectWondersForPlayers: [
            players[0].uid,
            players[1].uid,
            players[1].uid,
            players[0].uid,
            players[1].uid,
            players[0].uid,
            players[0].uid,
            players[1].uid,
            players[0].uid
        ],
        selectWondersForPlayersMove: 0,
        chooseWhoWillStart: false,
        turn: players[0].uid,
        turnStartedAt: serverTimestamp(),
        player1ClockMs: 30000,
        gameBoard: {
            ...new BoardDuel(),
            coins: randomCoins.slice(0, 5)
        },
        tierICards: prepareIdForCards(sampleArray(cardsTierOne, 20), 'I'),
        tierIICards: prepareIdForCards(sampleArray(cardsTierTwo, 20), 'II'),
        tierIIICards: prepareIdForCards(tier3, 'III'),
        wonderCards: randomWonders,
        graveyard: [],
        theRestOfCoins: randomCoins.slice(5),
        tier: 'prepare',
        move: 0,
        pickCoin: '',
        pickCoinOfThree: '',
        pickCardFromGraveyard: '',
        destroyBrown: '',
        destroyGrey: '',
        actionUid: '',
        actionType: '',
        wonByArt: '',
        wonByAggressive: '',
        wonBySurr: '',
        wonByPoints: ''
    };
};

const createDuelTableIfMissing = async (players: IUser[]) => {
    await runTransaction(db, async (tx) => {
        const txSnap = await tx.get(tableGameDuelRef);
        if (txSnap.exists()) return;
        tx.set(tableGameDuelRef, buildInitialDuelTable(players));
    });
};

const createAllowingAlreadyExists = async (players: IUser[]) => {
    try {
        await createDuelTableIfMissing(players);
    } catch (error) {
        if (!isFirestoreCode(error, 'already-exists')) throw error;
    }
};

export async function bootstrapDuelTable({
    currentUserUid,
    players,
    tableExists,
    isCancelled
}: {
    currentUserUid: string;
    players: IUser[];
    tableExists: boolean;
    isCancelled: () => boolean;
}) {
    if (tableExists) return;

    const isHostBootstrapper = currentUserUid === players[0]?.uid;
    if (isHostBootstrapper) {
        if (isCancelled()) return;
        await createAllowingAlreadyExists(players);
        return;
    }

    await sleep(DUEL_BOOTSTRAP_TAKEOVER_DELAY_MS);
    if (isCancelled()) return;

    const takeoverSnap = await getDoc(tableGameDuelRef);
    if (isCancelled() || takeoverSnap.exists()) return;

    await createAllowingAlreadyExists(players);
}
