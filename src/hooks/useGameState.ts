import { useCallback, useEffect, useMemo, useRef } from 'react';
import {
    arrayRemove,
    arrayUnion,
    deleteField,
    doc,
    getDoc,
    increment,
    runTransaction,
    serverTimestamp,
    updateDoc
} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import type IUser from '@/interfaces/User';
import type { IGameDuelCard, IGameDuelCoin, IGameDuelPlayer, IGameDuelWonderCard } from '@/interfaces/GameDuel';
import { BoardDuel, PlayerDuel } from '@/interfaces/GameDuel';
import {
    cardsTierGuild,
    cardsTierOne,
    cardsTierThree,
    cardsTierTwo,
    cardsWonder,
    coins
} from '@/helpers/GameDuelInit';
import {
    sampleArray,
    prepareIdForCards,
    countPlayerResources,
    countArtefactsForPlayer,
    bankGoldFromYellowCashBackWatchingOpponentSpend,
    extraCashWhenChainPurchaseWithEconomyCoin,
    goldFromTreasuryGrantedByWonder,
    immediateGoldWhenTakingProgressCoin,
    showPrice,
    countTotalPoints,
    getNextTurnUidAfterPlay
} from '@/helpers/GameDuelHelpers';
import { useGameStore } from '@/store/useGameStore';
import { useDuelGameStore } from '@/store/useDuelGameStore';
import { useUserStore } from '@/store/useUserStore';
import { gameStatusDuelRef, tableGameDuelRef, usersRef } from '@/firebase/refs';
import { db } from '@/firebaseConfig';
import { playUiSound, setSoundScope } from '@/utils/sound';

const EPOCH_STARTER_CHOICE_AFTER_MOVE = [19, 39] as const;

/** Starter choice only between Ages I→II and II→III. After the last Age III pick (59→60) there is no next age — no modal. */
function shouldOfferEpochStarterChoice(moveBeforeIncrement: number): boolean {
    return (EPOCH_STARTER_CHOICE_AFTER_MOVE as readonly number[]).includes(moveBeforeIncrement);
}

export function useGameState(currentUserUid: string) {
    const navigate = useNavigate();
    const game = useDuelGameStore();
    const user = useUserStore((state) => state.fbUser);
    const subUser = useUserStore((state) => state.subFirebaseConnect);
    const unSubUser = useUserStore((state) => state.unSubFirebaseConnect);

    const subLobbyGame = useGameStore((state) => state.subFirebaseConnect);
    const unSubLobbyGame = useGameStore((state) => state.unSubFirebaseConnect);
    const deleteGameDuel = useGameStore((state) => state.deleteGameDuel);

    const subDuelGame = useDuelGameStore((state) => state.subFirebaseConnect);
    const unSubDuelGame = useDuelGameStore((state) => state.unSubFirebaseConnect);
    const resetDuelState = useDuelGameStore((state) => state.resetState);
    const duelStateReadyRef = useRef(false);
    const pendingWonderRepeatRef = useRef(false);
    const prevTurnRef = useRef<string | null>(null);
    const prevMoveRef = useRef<number | null>(null);
    const prevWinnerRef = useRef('');
    const sfxPawnPrimedRef = useRef(false);
    const prevPawnRef = useRef(game.board.pawn);
    const deckDestroySfxPrimedRef = useRef(false);
    const prevMyBrownLenRef = useRef(0);
    const prevMyGreyLenRef = useRef(0);

    useEffect(() => {
        setSoundScope(currentUserUid);
    }, [currentUserUid]);

    const isObserver = useMemo(() => {
        const p1Uid = game.player1.user?.uid;
        const p2Uid = game.player2.user?.uid;
        if (!p1Uid || !p2Uid) return false;
        return currentUserUid !== p1Uid && currentUserUid !== p2Uid;
    }, [currentUserUid, game.player1.user?.uid, game.player2.user?.uid]);

    const isMyTurn = useMemo(() => game.turn === currentUserUid && !isObserver, [game.turn, currentUserUid, isObserver]);

    const currentPlayer = useMemo(
        () => (game.player1.user?.uid === currentUserUid ? game.player1 : game.player2),
        [game.player1, game.player2, currentUserUid]
    );

    const opponent = useMemo(
        () => (game.player1.user?.uid === currentUserUid ? game.player2 : game.player1),
        [game.player1, game.player2, currentUserUid]
    );

    const canBuyTierCard = useMemo(() => {
        if (!game.selectedCard?.id) return -1;
        return showPrice(game.selectedCard, currentPlayer, opponent);
    }, [game.selectedCard, currentPlayer, opponent]);

    useEffect(() => {
        let cancelled = false;

        const bootstrapGame = async () => {
            if (!currentUserUid) return;
            duelStateReadyRef.current = false;
            resetDuelState();

            subUser(currentUserUid);
            subLobbyGame();

            const statusSnap = await getDoc(gameStatusDuelRef);
            const tableSnap = await getDoc(tableGameDuelRef);

            if (!statusSnap.exists()) return;
            const players = statusSnap.data().players as IUser[];
            const isLobbyPlayer = players.some((player) => player.uid === currentUserUid);
            if (!isLobbyPlayer) {
                if (tableSnap.exists()) {
                    if (!cancelled) {
                        subDuelGame();
                    }
                    return;
                }
                navigate('/feed');
                return;
            }

            if (!tableSnap.exists()) {
                await runTransaction(db, async (tx) => {
                    const txSnap = await tx.get(tableGameDuelRef);
                    if (txSnap.exists()) return;

                    const randomCoins = sampleArray(coins, 10);
                    const randomWonders = sampleArray(cardsWonder, 8);
                    const tier3 = sampleArray(
                        [...sampleArray(cardsTierThree, 17), ...sampleArray(cardsTierGuild, 3)],
                        20
                    );

                    tx.set(tableGameDuelRef, {
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
                    });
                });
            }

            if (!cancelled) {
                subDuelGame();
            }
        };

        bootstrapGame();

        return () => {
            cancelled = true;
            unSubDuelGame();
            unSubLobbyGame();
            unSubUser();
            resetDuelState();
            duelStateReadyRef.current = false;
        };
    }, [
        currentUserUid,
        navigate,
        subDuelGame,
        subLobbyGame,
        subUser,
        unSubDuelGame,
        unSubLobbyGame,
        unSubUser,
        resetDuelState
    ]);

    useEffect(() => {
        if (game.player1.user?.uid && game.player2.user?.uid && game.turn) {
            duelStateReadyRef.current = true;
        }
    }, [game.player1.user?.uid, game.player2.user?.uid, game.turn]);

    useEffect(() => {
        if (isObserver) {
            prevTurnRef.current = game.turn;
            prevMoveRef.current = game.move;
            return;
        }
        const ready = !!(game.player1.user?.uid && game.player2.user?.uid && game.turn);
        if (!ready || !currentUserUid) {
            return;
        }
        if (prevTurnRef.current === null || prevMoveRef.current === null) {
            prevTurnRef.current = game.turn;
            prevMoveRef.current = game.move;
            return;
        }
        const sameSeat = prevTurnRef.current === game.turn;
        if (prevTurnRef.current !== game.turn && game.turn === currentUserUid) {
            playUiSound('turn');
        } else if (sameSeat && game.turn === currentUserUid && game.move !== prevMoveRef.current) {
            playUiSound('turn');
        }
        prevTurnRef.current = game.turn;
        prevMoveRef.current = game.move;
    }, [currentUserUid, game.move, game.player1.user?.uid, game.player2.user?.uid, game.turn, isObserver]);

    useEffect(() => {
        if (isObserver) {
            sfxPawnPrimedRef.current = false;
            prevPawnRef.current = game.board.pawn;
            return;
        }
        const p1 = game.player1.user?.uid;
        const p2 = game.player2.user?.uid;
        const readyBoard = !!(p1 && p2 && game.turn);
        const skip = !readyBoard || game.tier === 'prepare';

        if (skip) {
            sfxPawnPrimedRef.current = false;
            prevPawnRef.current = game.board.pawn;
            return;
        }

        const cur = game.board.pawn;
        if (!sfxPawnPrimedRef.current) {
            sfxPawnPrimedRef.current = true;
            prevPawnRef.current = cur;
            return;
        }

        const prev = prevPawnRef.current;
        prevPawnRef.current = cur;
        if (prev === cur) return;

        const delta = cur - prev;
        const attackerUid = delta < 0 ? p1! : p2!;
        const defenderUid = delta < 0 ? p2! : p1!;
        if (currentUserUid === attackerUid) playUiSound('militaryAttack');
        if (currentUserUid === defenderUid) playUiSound('militaryHit');
    }, [
        currentUserUid,
        game.board.pawn,
        game.player1.user?.uid,
        game.player2.user?.uid,
        game.tier,
        game.turn,
        isObserver
    ]);

    useEffect(() => {
        if (isObserver) {
            deckDestroySfxPrimedRef.current = false;
            return;
        }
        const ready = !!(game.player1.user?.uid && game.player2.user?.uid && game.turn);
        if (!ready) return;

        const myBrown = currentPlayer.cards.brown.length;
        const myGrey = currentPlayer.cards.grey.length;

        if (!deckDestroySfxPrimedRef.current) {
            deckDestroySfxPrimedRef.current = true;
            prevMyBrownLenRef.current = myBrown;
            prevMyGreyLenRef.current = myGrey;
            return;
        }

        if (myBrown < prevMyBrownLenRef.current) {
            playUiSound('destroyBrown');
        }
        if (myGrey < prevMyGreyLenRef.current) {
            playUiSound('destroyGrey');
        }
        prevMyBrownLenRef.current = myBrown;
        prevMyGreyLenRef.current = myGrey;
    }, [
        currentPlayer.cards.brown.length,
        currentPlayer.cards.grey.length,
        game.player1.user?.uid,
        game.player2.user?.uid,
        game.turn,
        isObserver
    ]);

    useEffect(() => {
        if (!isMyTurn) return;
        if (game.move >= 20 && game.move < 40 && game.tier !== 'II' && !game.wonBySurr) {
            updateDoc(tableGameDuelRef, { tier: 'II' });
        }
        if (game.move >= 40 && game.move < 60 && game.tier !== 'III' && !game.wonByAggressive && !game.wonByArt && !game.wonBySurr) {
            updateDoc(tableGameDuelRef, { tier: 'III' });
        }
        if (game.move >= 60 && !game.wonByAggressive && !game.wonByArt && !game.wonBySurr) {
            updateDoc(tableGameDuelRef, { tier: 'end' });
        }
    }, [game.move, game.tier, game.wonByAggressive, game.wonByArt, game.wonBySurr, isMyTurn]);

    useEffect(() => {
        if (isObserver || !isMyTurn) return;
        if (!game.player1.user?.uid || !game.player2.user?.uid) return;
        if (game.wonByArt || game.wonByAggressive || game.wonBySurr || game.wonByPoints) return;
        if (game.tier === 'prepare') return;

        if (countArtefactsForPlayer(game.player1) >= 6) {
            void updateDoc(tableGameDuelRef, { wonByArt: game.player1.user.uid });
            return;
        }
        if (countArtefactsForPlayer(game.player2) >= 6) {
            void updateDoc(tableGameDuelRef, { wonByArt: game.player2.user.uid });
        }
    }, [
        game.player1,
        game.player2,
        game.wonByArt,
        game.wonByAggressive,
        game.wonByPoints,
        game.wonBySurr,
        game.tier,
        isMyTurn,
        isObserver
    ]);

    useEffect(() => {
        if (!isMyTurn) return;
        if (game.wonByArt || game.wonByAggressive || game.wonBySurr || game.wonByPoints) return;
        if (game.tier !== 'end' && game.move < 60) return;

        const p1 = countTotalPoints(game.player1, game.player2, game.board.pawn, true);
        const p2 = countTotalPoints(game.player2, game.player1, game.board.pawn, false);

        let winner = 'draw';
        if (p1 > p2) winner = game.player1.user.uid;
        else if (p2 > p1) winner = game.player2.user.uid;
        else {
            if (game.player1.cards.blue.length > game.player2.cards.blue.length) winner = game.player1.user.uid;
            else if (game.player2.cards.blue.length > game.player1.cards.blue.length) winner = game.player2.user.uid;
        }

        updateDoc(tableGameDuelRef, { wonByPoints: winner });
    }, [
        game.board.pawn,
        game.move,
        game.player1,
        game.player2,
        game.tier,
        game.wonByAggressive,
        game.wonByArt,
        game.wonByPoints,
        game.wonBySurr,
        isMyTurn
    ]);

    useEffect(() => {
        if (!isMyTurn) return;
        if (game.tier !== 'prepare') return;
        if (game.move !== 0) return;
        if (game.player1.wonderCards.length !== 4 || game.player2.wonderCards.length !== 4) return;
        const timer = window.setTimeout(() => {
            updateDoc(tableGameDuelRef, { tier: 'I' });
        }, 980);
        return () => window.clearTimeout(timer);
    }, [game.move, game.player1.wonderCards.length, game.player2.wonderCards.length, game.tier, isMyTurn]);

    useEffect(() => {
        if (isObserver) return;
        if (!game.wonByArt && !game.wonByAggressive && !game.wonBySurr) return;
        if (!duelStateReadyRef.current) return;
        deleteGameDuel().finally(() => {
            setTimeout(() => navigate('/feed'), 2000);
        });
    }, [deleteGameDuel, game.wonByAggressive, game.wonByArt, game.wonBySurr, isObserver, navigate]);

    useEffect(() => {
        const winner = game.wonByArt || game.wonByAggressive || game.wonBySurr || game.wonByPoints;
        if (!winner || prevWinnerRef.current === winner) return;

        if (winner === 'draw' || winner === currentUserUid) {
            playUiSound('win');
        } else {
            playUiSound('loss');
        }
        prevWinnerRef.current = winner;
    }, [currentUserUid, game.wonByAggressive, game.wonByArt, game.wonByPoints, game.wonBySurr]);

    const applyMilitaryTrackEffects = useCallback(
        async (attackerUid: string, steps: number): Promise<number> => {
            if (steps <= 0) return game.board.pawn;

            const isPlayerOneAttacker = attackerUid === game.player1.user.uid;
            const direction = isPlayerOneAttacker ? -1 : 1;
            let pawn = game.board.pawn;

            let punishment1 = game.board.punishment1;
            let punishment2 = game.board.punishment2;
            let punishment3 = game.board.punishment3;
            let punishment4 = game.board.punishment4;

            const opponentKey = isPlayerOneAttacker ? 'player2' : 'player1';
            let opponentCash = isPlayerOneAttacker
                ? game.player2.resources.cash
                : game.player1.resources.cash;

            for (let i = 0; i < steps; i++) {
                pawn += direction;

                if (isPlayerOneAttacker) {
                    // Conflict tokens levy one step past the drawn -2/-5 lines (mirror on +track).
                    if (punishment1 && pawn <= -6) {
                        punishment1 = false;
                        opponentCash = Math.max(0, opponentCash - 5);
                    } else if (punishment2 && pawn <= -3) {
                        punishment2 = false;
                        opponentCash = Math.max(0, opponentCash - 2);
                    }
                } else {
                    if (punishment3 && pawn >= 3) {
                        punishment3 = false;
                        opponentCash = Math.max(0, opponentCash - 2);
                    } else if (punishment4 && pawn >= 6) {
                        punishment4 = false;
                        opponentCash = Math.max(0, opponentCash - 5);
                    }
                }
            }

            await updateDoc(tableGameDuelRef, {
                'gameBoard.pawn': pawn,
                'gameBoard.punishment1': punishment1,
                'gameBoard.punishment2': punishment2,
                'gameBoard.punishment3': punishment3,
                'gameBoard.punishment4': punishment4,
                [`${opponentKey}.resources.cash`]: opponentCash,
                ...(Math.abs(pawn) > 8 ? { wonByAggressive: attackerUid } : {})
            });
            return pawn;
        },
        [game.board, game.player1.user.uid, game.player2.resources.cash, game.player1.resources.cash]
    );

    const upgradeTurnAndMove = useCallback(
        async (uid: string, withoutMove = false, opts?: { openEpochStarterChoice?: boolean }) => {
            if (withoutMove) {
                await updateDoc(tableGameDuelRef, { turn: uid, actionUid: '', actionType: '' });
                return;
            }
            await updateDoc(tableGameDuelRef, {
                turn: uid,
                move: increment(1),
                actionUid: '',
                actionType: '',
                ...(opts?.openEpochStarterChoice ? { chooseWhoWillStart: true } : {})
            });
        },
        []
    );

    const setActionHint = useCallback(
        async (actionType: string) => {
            await updateDoc(tableGameDuelRef, {
                actionUid: actionType ? game.turn : '',
                actionType
            });
        },
        [game.turn]
    );

    const finishTurnAfterSpecialAction = useCallback(async () => {
        const hasRepeat = pendingWonderRepeatRef.current || currentPlayer.resources.coins.includes('repeatWonder');
        pendingWonderRepeatRef.current = false;
        const p1Uid = game.player1.user.uid;
        const p2Uid = game.player2.user.uid;
        const openStarter = shouldOfferEpochStarterChoice(game.move);
        if (hasRepeat && ![19, 39, 59].includes(game.move)) {
            await upgradeTurnAndMove(game.turn, false, { openEpochStarterChoice: openStarter });
        } else {
            const next = getNextTurnUidAfterPlay(game.turn, game.move, game.board.pawn, p1Uid, p2Uid);
            await upgradeTurnAndMove(next, false, { openEpochStarterChoice: openStarter });
        }
    }, [
        currentPlayer.resources.coins,
        game.board.pawn,
        game.move,
        game.player1.user.uid,
        game.player2.user.uid,
        game.turn,
        upgradeTurnAndMove
    ]);

    const chooseWonderForPlayer = useCallback(
        async (id: number) => {
            if (!isMyTurn || game.wonBySurr) return;
            const selected = game.wonderCards.find((card) => card.id === id);
            if (!selected || selected.taken) return;

            const newWonderCards = game.wonderCards.map((card) =>
                card.id === id ? { ...card, taken: true } : card
            );
            const nextTurn = game.selectWondersForPlayers[game.selectWondersForPlayersMove + 1];
            const isP1Turn = game.turn === game.player1.user.uid;

            await updateDoc(tableGameDuelRef, {
                wonderCards: newWonderCards,
                selectWondersForPlayersMove: increment(1),
                turn: nextTurn,
                ...(isP1Turn
                    ? { player1: { ...game.player1, wonderCards: [...game.player1.wonderCards, { ...selected, taken: true }] } }
                    : { player2: { ...game.player2, wonderCards: [...game.player2.wonderCards, { ...selected, taken: true }] } })
            });
        },
        [game, isMyTurn]
    );

    const chooseWhoStarts = useCallback(
        async (uid: string) => {
            if (!isMyTurn || !game.chooseWhoWillStart) return;
            await updateDoc(tableGameDuelRef, {
                turn: uid,
                chooseWhoWillStart: false,
                actionUid: '',
                actionType: ''
            });
        },
        [game.chooseWhoWillStart, isMyTurn]
    );

    const selectTierCard = useCallback(
        (card: IGameDuelCard) => {
            if (!isMyTurn || game.chooseWhoWillStart || game.wonByArt || game.wonByAggressive) return;
            if ((card.coversBy?.length ?? 0) > 0 || card.taken !== 'inGame') return;
            game.setSelectedWonder(null);
            game.setSelectedCard(card);
            void setActionHint('choose-card-action');
        },
        [game, isMyTurn, setActionHint]
    );

    const setCardStateInTier = useCallback(
        async (state: 'inPlayerBoard' | 'graveyard' | 'inWonder', tier = game.selectedCard?.tier): Promise<IGameDuelCard | null> => {
            if (!game.selectedCard?.id || !tier) return null;
            const source =
                tier === 'I'
                    ? game.tierOneCards
                    : tier === 'II'
                      ? game.tierTwoCards
                      : game.tierThreeCards;
            const key = tier === 'I' ? 'tierICards' : tier === 'II' ? 'tierIICards' : 'tierIIICards';
            let picked: IGameDuelCard | null = null;
            const updated = source.map((c) => {
                if (c.id === game.selectedCard?.id) picked = c;
                return {
                    ...c,
                    taken: c.id === game.selectedCard?.id ? state : c.taken,
                    coversBy: c.coversBy?.filter((id) => id !== game.selectedCard?.id) ?? []
                };
            });
            await updateDoc(tableGameDuelRef, { [key]: updated });
            return picked;
        },
        [game.selectedCard, game.tierOneCards, game.tierTwoCards, game.tierThreeCards]
    );

    const applyScientificVictoryIfNeeded = useCallback(async (winnerUid: string, playerSnapshot: IGameDuelPlayer) => {
        if (countArtefactsForPlayer(playerSnapshot) >= 6) {
            await updateDoc(tableGameDuelRef, { wonByArt: winnerUid });
            return true;
        }
        return false;
    }, []);

    const buySelectedCard = useCallback(async () => {
        if (!game.selectedCard || canBuyTierCard < 0 || canBuyTierCard > currentPlayer.resources.cash) return;
        const moveSnap = game.move;
        const card = await setCardStateInTier('inPlayerBoard');
        if (!card) return;

        const playerKey = game.turn === game.player1.user.uid ? 'player1' : 'player2';
        const playerState = game.turn === game.player1.user.uid ? game.player1 : game.player2;
        const opponentState = playerKey === 'player1' ? game.player2 : game.player1;
        const playerSnap = structuredClone(playerState);
        const resources = countPlayerResources(card, playerSnap, opponentState);
        const cards = structuredClone(playerSnap.cards);
        cards[card.color].push({ ...card, taken: 'inPlayerBoard' });

        const chainCoinPayout = extraCashWhenChainPurchaseWithEconomyCoin(card, playerSnap);

        const opponentKey = playerKey === 'player1' ? 'player2' : 'player1';
        const opponentWatching = opponentKey === 'player1' ? game.player1 : game.player2;
        const opponentBankCashback = bankGoldFromYellowCashBackWatchingOpponentSpend(
            opponentWatching,
            Math.max(0, canBuyTierCard)
        );

        await updateDoc(tableGameDuelRef, {
            [`${playerKey}.cards`]: cards,
            [`${playerKey}.points`]: playerSnap.points,
            [`${playerKey}.resources`]: {
                ...resources,
                cash: resources.cash - canBuyTierCard + chainCoinPayout
            },
            ...(opponentBankCashback
                ? { [`${opponentKey}.resources.cash`]: increment(opponentBankCashback) }
                : {})
        });

        const postBuyPlayer: IGameDuelPlayer = {
            ...playerSnap,
            cards,
            resources: {
                ...resources,
                cash: resources.cash - canBuyTierCard + chainCoinPayout
            }
        };

        let pawnForNextTurn = game.board.pawn;

        if (await applyScientificVictoryIfNeeded(game.turn, postBuyPlayer)) {
            game.setSelectedCard(null);
            return;
        }

        if (card.color === 'red' && card.power.includes('attack')) {
            const attackVal = card.valuePower[card.power.indexOf('attack')] ?? 0;
            const attackCoin = playerSnap.resources.coins.includes('attack1') ? 1 : 0;
            pawnForNextTurn = await applyMilitaryTrackEffects(game.turn, attackVal + attackCoin);
        }

        let shouldPickCoin = false;

        if (card.color === 'green') {
            const artefactIdx = card.power.indexOf('artefact');
            if (artefactIdx >= 0) {
                const artefactValue = card.valuePower[artefactIdx];
                const howManyPairs = resources.artefacts.filter((value) => value === artefactValue).length;
                shouldPickCoin = howManyPairs >= 2;
            }
        }

        const p1Uid = game.player1.user.uid;
        const p2Uid = game.player2.user.uid;
        if (shouldPickCoin) {
            await updateDoc(tableGameDuelRef, { pickCoin: game.turn });
        } else {
            await upgradeTurnAndMove(getNextTurnUidAfterPlay(game.turn, game.move, pawnForNextTurn, p1Uid, p2Uid), false, {
                openEpochStarterChoice: shouldOfferEpochStarterChoice(moveSnap)
            });
        }
        game.setSelectedCard(null);
    }, [
        applyScientificVictoryIfNeeded,
        canBuyTierCard,
        currentPlayer.resources.cash,
        game,
        applyMilitaryTrackEffects,
        setCardStateInTier,
        upgradeTurnAndMove
    ]);

    const sellSelectedCard = useCallback(async () => {
        if (!game.selectedCard) return;
        const moveSnap = game.move;
        const card = await setCardStateInTier('graveyard');
        if (!card) return;
        const playerKey = game.turn === game.player1.user.uid ? 'player1' : 'player2';
        const seller = game.turn === game.player1.user.uid ? game.player1 : game.player2;
        const addCash = 2 + seller.cards.yellow.length;

        await updateDoc(tableGameDuelRef, {
            graveyard: arrayUnion({ ...card, taken: 'graveyard' }),
            [`${playerKey}.resources.cash`]: increment(addCash)
        });

        await upgradeTurnAndMove(
            getNextTurnUidAfterPlay(game.turn, game.move, game.board.pawn, game.player1.user.uid, game.player2.user.uid),
            false,
            { openEpochStarterChoice: shouldOfferEpochStarterChoice(moveSnap) }
        );
        game.setSelectedCard(null);
    }, [game, setCardStateInTier, upgradeTurnAndMove]);

    const buildWonder = useCallback(async (wonderToBuild?: IGameDuelWonderCard) => {
        if (!game.selectedCard) return;

        const selectedWonder = wonderToBuild ?? game.selectedWonder;
        if (!selectedWonder) return;

        const cost = showPrice(selectedWonder, currentPlayer, opponent);
        if (cost > currentPlayer.resources.cash) return;
        const moveSnap = game.move;
        await setCardStateInTier('inWonder');
        let shouldPickCoinOfThree = false;
        let shouldPickFromGraveyard = false;
        let shouldDestroyBrown = false;
        let shouldDestroyGrey = false;
        let shouldMovePawn = 0;
        let shouldRepeat = false;
        let shouldStealThreeGold = false;

        selectedWonder.power.forEach((effect, index) => {
            if (effect === 'effect' && selectedWonder.valuePower[index] === 3) {
                shouldPickCoinOfThree = true;
            }
            if (effect === 'effect' && selectedWonder.valuePower[index] === 2) {
                shouldPickFromGraveyard = true;
            }
            if (effect === 'effect' && selectedWonder.valuePower[index] === 1) {
                shouldRepeat = true;
            }
            if (effect === 'attack') {
                shouldMovePawn += selectedWonder.valuePower[index] ?? 0;
            }
            if (effect === 'break' && selectedWonder.valuePower[index] === 1) {
                shouldDestroyBrown = true;
            }
            if (effect === 'break' && selectedWonder.valuePower[index] === 2) {
                shouldDestroyGrey = true;
            }
            if (effect === 'break' && selectedWonder.valuePower[index] === 3) {
                shouldStealThreeGold = true;
            }
        });

        const treasuryGoldFromWonder = goldFromTreasuryGrantedByWonder(selectedWonder);

        const playerKey = game.turn === game.player1.user.uid ? 'player1' : 'player2';
        const opponentKey = playerKey === 'player1' ? 'player2' : 'player1';
        const opponentSnap = opponentKey === 'player1' ? game.player1 : game.player2;

        let opponentNextCash = opponentSnap.resources.cash;
        if (shouldStealThreeGold) {
            opponentNextCash = Math.max(0, opponentNextCash - 3);
        }
        const opponentWatchingBuilderPay = bankGoldFromYellowCashBackWatchingOpponentSpend(opponentSnap, cost);
        opponentNextCash += opponentWatchingBuilderPay;

        const builderNetCashDelta = treasuryGoldFromWonder - cost;

        const newWonderCards = currentPlayer.wonderCards.map((wonder) =>
            wonder.id === selectedWonder.id ? { ...wonder, activated: game.selectedCard?.tier ?? 'I' } : wonder
        );
        await updateDoc(tableGameDuelRef, {
            [`${playerKey}.wonderCards`]: newWonderCards,
            [`${playerKey}.resources.cash`]: increment(builderNetCashDelta),
            [`${opponentKey}.resources.cash`]: opponentNextCash,
            ...(shouldPickCoinOfThree ? { pickCoinOfThree: game.turn } : {}),
            ...(shouldPickFromGraveyard ? { pickCardFromGraveyard: game.turn } : {}),
            ...(shouldDestroyBrown ? { destroyBrown: game.turn } : {}),
            ...(shouldDestroyGrey ? { destroyGrey: game.turn } : {})
        });

        let pawnForNext = game.board.pawn;
        if (shouldMovePawn > 0) {
            pawnForNext = await applyMilitaryTrackEffects(game.turn, shouldMovePawn);
        }

        const hasPendingSpecialAction =
            shouldPickCoinOfThree || shouldPickFromGraveyard || shouldDestroyBrown || shouldDestroyGrey;
        const builderCoins =
            game.turn === game.player1.user.uid ? game.player1.resources.coins : game.player2.resources.coins;
        const repeatFromProgressToken = builderCoins.includes('repeatWonder');
        pendingWonderRepeatRef.current = shouldRepeat || repeatFromProgressToken;
        if (!hasPendingSpecialAction) {
            const p1Uid = game.player1.user.uid;
            const p2Uid = game.player2.user.uid;
            const openStarter = shouldOfferEpochStarterChoice(moveSnap);
            const keepTurnForAnotherWonder =
                (shouldRepeat || repeatFromProgressToken) && ![19, 39, 59].includes(moveSnap);
            if (keepTurnForAnotherWonder) {
                await upgradeTurnAndMove(game.turn, false, { openEpochStarterChoice: openStarter });
            } else {
                await upgradeTurnAndMove(getNextTurnUidAfterPlay(game.turn, game.move, pawnForNext, p1Uid, p2Uid), false, {
                    openEpochStarterChoice: openStarter
                });
            }
        }
        game.setSelectedCard(null);
        game.setSelectedWonder(null);
    }, [
        currentPlayer,
        game,
        opponent,
        setCardStateInTier,
        upgradeTurnAndMove,
        applyMilitaryTrackEffects
    ]);

    const selectWonder = useCallback((wonder: IGameDuelWonderCard) => {
        const cost = showPrice(wonder, currentPlayer, opponent);
        if (cost > currentPlayer.resources.cash) return;
        game.setSelectedWonder(wonder);
    }, [currentPlayer, game, opponent]);

    const pickCoin = useCallback(
        async (coin: IGameDuelCoin['effect']) => {
            if (!coin) return;
            if (game.pickCoin !== game.turn || game.pickCoin !== currentUserUid) return;
            const moveSnap = game.move;
            const playerKey = game.turn === game.player1.user.uid ? 'player1' : 'player2';
            const playerState = game.turn === game.player1.user.uid ? game.player1 : game.player2;
            const acquireCash = immediateGoldWhenTakingProgressCoin(coin);
            const withCoin: IGameDuelPlayer = {
                ...playerState,
                resources: {
                    ...playerState.resources,
                    coins: [...playerState.resources.coins, coin],
                    cash: playerState.resources.cash + acquireCash
                }
            };

            await updateDoc(tableGameDuelRef, {
                'gameBoard.coins': arrayRemove(coin),
                [`${playerKey}.resources.coins`]: arrayUnion(coin),
                ...(acquireCash ? { [`${playerKey}.resources.cash`]: increment(acquireCash) } : {}),
                pickCoin: ''
            });

            if (await applyScientificVictoryIfNeeded(game.turn, withCoin)) {
                return;
            }

            await upgradeTurnAndMove(
                getNextTurnUidAfterPlay(game.turn, game.move, game.board.pawn, game.player1.user.uid, game.player2.user.uid),
                false,
                { openEpochStarterChoice: shouldOfferEpochStarterChoice(moveSnap) }
            );
        },
        [
            applyScientificVictoryIfNeeded,
            currentUserUid,
            game.board.pawn,
            game.move,
            game.pickCoin,
            game.player1.user.uid,
            game.player2.user.uid,
            game.turn,
            upgradeTurnAndMove
        ]
    );

    const pickCoinOfThree = useCallback(
        async (coin: IGameDuelCoin['effect']) => {
            if (!coin) return;
            if (game.pickCoinOfThree !== game.turn || game.pickCoinOfThree !== currentUserUid) return;
            const playerKey = game.turn === game.player1.user.uid ? 'player1' : 'player2';
            const playerState = game.turn === game.player1.user.uid ? game.player1 : game.player2;
            const acquireCash = immediateGoldWhenTakingProgressCoin(coin);
            const withCoin: IGameDuelPlayer = {
                ...playerState,
                resources: {
                    ...playerState.resources,
                    coins: [...playerState.resources.coins, coin],
                    cash: playerState.resources.cash + acquireCash
                }
            };

            await updateDoc(tableGameDuelRef, {
                'gameBoard.coins': arrayRemove(coin),
                [`${playerKey}.resources.coins`]: arrayUnion(coin),
                ...(acquireCash ? { [`${playerKey}.resources.cash`]: increment(acquireCash) } : {}),
                pickCoinOfThree: ''
            });

            if (await applyScientificVictoryIfNeeded(game.turn, withCoin)) {
                return;
            }

            await finishTurnAfterSpecialAction();
        },
        [
            applyScientificVictoryIfNeeded,
            currentUserUid,
            finishTurnAfterSpecialAction,
            game.pickCoinOfThree,
            game.player1.user.uid,
            game.player2.user.uid,
            game.turn
        ]
    );

    const pickCardFromGraveyard = useCallback(
        async (graveCard: IGameDuelCard) => {
            if (!graveCard?.id) return;
            if (game.pickCardFromGraveyard !== game.turn || game.pickCardFromGraveyard !== currentUserUid) return;

            const playerKey = game.turn === game.player1.user.uid ? 'player1' : 'player2';
            const playerState = game.turn === game.player1.user.uid ? game.player1 : game.player2;
            const opponentState = playerKey === 'player1' ? game.player2 : game.player1;
            const ps = structuredClone(playerState);
            const resources = countPlayerResources(graveCard, ps, opponentState);
            const cards = structuredClone(ps.cards);
            cards[graveCard.color].push({ ...graveCard, taken: 'inPlayerBoard' });

            const tierKey =
                graveCard.tier === 'I' ? 'tierICards' : graveCard.tier === 'II' ? 'tierIICards' : 'tierIIICards';
            const tierCards =
                graveCard.tier === 'I'
                    ? game.tierOneCards
                    : graveCard.tier === 'II'
                      ? game.tierTwoCards
                      : game.tierThreeCards;
            const tierUpdated = tierCards.map((card) =>
                card.id === graveCard.id ? { ...card, taken: 'inPlayerBoard' } : card
            );

            const chainCoinPayout = extraCashWhenChainPurchaseWithEconomyCoin(graveCard, ps);
            const resourcesFinal = {
                ...resources,
                cash: resources.cash + chainCoinPayout
            };

            await updateDoc(tableGameDuelRef, {
                [tierKey]: tierUpdated,
                graveyard: arrayRemove(graveCard),
                pickCardFromGraveyard: '',
                [`${playerKey}.cards`]: cards,
                [`${playerKey}.points`]: ps.points,
                [`${playerKey}.resources`]: resourcesFinal
            });

            const merged: IGameDuelPlayer = { ...ps, cards, resources: resourcesFinal };
            if (!(await applyScientificVictoryIfNeeded(game.turn, merged))) {
                await finishTurnAfterSpecialAction();
            }
        },
        [
            applyScientificVictoryIfNeeded,
            currentUserUid,
            finishTurnAfterSpecialAction,
            game.pickCardFromGraveyard,
            game.player1,
            game.player2,
            game.tierOneCards,
            game.tierThreeCards,
            game.tierTwoCards,
            game.turn
        ]
    );

    const destroyEnemyCard = useCallback(
        async (targetCard: IGameDuelCard, color: 'brown' | 'grey') => {
            const currentDestroy = color === 'brown' ? game.destroyBrown : game.destroyGrey;
            if (currentDestroy !== currentUserUid || currentDestroy !== game.turn) return;

            const enemyKey = game.turn === game.player1.user.uid ? 'player2' : 'player1';
            const enemy = game.turn === game.player1.user.uid ? game.player2 : game.player1;
            const updatedEnemyCards = structuredClone(enemy.cards);
            updatedEnemyCards[color] = updatedEnemyCards[color].filter((card: IGameDuelCard) => card.id !== targetCard.id);

            const enemyRes = { ...enemy.resources };
            if (color === 'brown') {
                if (targetCard.power[0] === 'clay') enemyRes.clayValue -= targetCard.valuePower[0];
                if (targetCard.power[0] === 'brick') enemyRes.brickValue -= targetCard.valuePower[0];
                if (targetCard.power[0] === 'wood') enemyRes.woodValue -= targetCard.valuePower[0];
            } else {
                if (targetCard.power[0] === 'paper') enemyRes.paperValue -= targetCard.valuePower[0];
                if (targetCard.power[0] === 'glass') enemyRes.glassValue -= targetCard.valuePower[0];
            }

            await updateDoc(tableGameDuelRef, {
                [`${enemyKey}.cards`]: updatedEnemyCards,
                [`${enemyKey}.resources`]: enemyRes,
                graveyard: arrayUnion({ ...targetCard, taken: 'graveyard' }),
                ...(color === 'brown' ? { destroyBrown: '' } : { destroyGrey: '' })
            });

            playUiSound(color === 'brown' ? 'destroyBrown' : 'destroyGrey');

            await finishTurnAfterSpecialAction();
        },
        [
            currentUserUid,
            finishTurnAfterSpecialAction,
            game.destroyBrown,
            game.destroyGrey,
            game.player1,
            game.player2,
            game.turn
        ]
    );

    const surrender = useCallback(async () => {
        await updateDoc(tableGameDuelRef, { wonBySurr: opponent.user.uid });
    }, [opponent.user.uid]);

    const goBackToFeed = useCallback(async () => {
        await updateDoc(doc(usersRef, currentUserUid), {
            game: '',
            readyToGame: false,
            status: 'online',
            online: deleteField(),
            timestamp: serverTimestamp(),
            updatedAt: serverTimestamp(),
            lastSeenAt: serverTimestamp(),
            schemaVersion: 1
        });
        navigate('/feed');
    }, [currentUserUid, navigate]);

    return {
        user,
        game,
        isObserver,
        isMyTurn,
        currentPlayer,
        opponent,
        canBuyTierCard,
        chooseWonderForPlayer,
        chooseWhoStarts,
        selectTierCard,
        selectWonder,
        buySelectedCard,
        sellSelectedCard,
        buildWonder,
        pickCoin,
        pickCoinOfThree,
        pickCardFromGraveyard,
        destroyEnemyCard,
        surrender,
        goBackToFeed,
        setActionHint
    };
}
