import { useMemo } from 'react';
import type { IGameDuelCoin } from '@/interfaces/GameDuel';
import type { DuelGameState } from '@/store/useDuelGameStore';

type UseDuelModalsStateParams = {
    game: DuelGameState;
    uid: string;
    isObserver: boolean;
    isMyTurn: boolean;
};

export function useDuelModalsState({ game, uid, isObserver, isMyTurn }: UseDuelModalsStateParams) {
    return useMemo(() => {
        const winnerUid = game.wonByArt || game.wonByAggressive || game.wonBySurr || game.wonByPoints;
        const showEpochStarterModal =
            !winnerUid && game.tier !== 'prepare' && game.chooseWhoWillStart && isMyTurn && !isObserver;

        const activeInGameTurn = !winnerUid && game.tier !== 'prepare' && !isObserver;
        const showActionModal = activeInGameTurn && !!game.selectedCard && !game.chooseWhoWillStart;
        const awaitingBoardCoinPick = activeInGameTurn && isMyTurn && game.pickCoin === uid && game.pickCoin === game.turn;
        const awaitingWonderThreeCoins =
            activeInGameTurn && isMyTurn && game.pickCoinOfThree === uid && game.pickCoinOfThree === game.turn;
        const showCoinChoiceModal = awaitingBoardCoinPick || awaitingWonderThreeCoins;
        const showDestroyOpponentModal =
            activeInGameTurn &&
            !game.chooseWhoWillStart &&
            isMyTurn &&
            (game.destroyBrown === uid || game.destroyGrey === uid) &&
            game.turn === uid;
        const visibleCoinChoices: IGameDuelCoin['effect'][] = awaitingBoardCoinPick
            ? game.board.coins
            : game.theRestOfCoins.slice(0, 3);

        return {
            winnerUid,
            showEpochStarterModal,
            showActionModal,
            awaitingBoardCoinPick,
            awaitingWonderThreeCoins,
            showCoinChoiceModal,
            showDestroyOpponentModal,
            visibleCoinChoices
        };
    }, [game, isMyTurn, isObserver, uid]);
}
