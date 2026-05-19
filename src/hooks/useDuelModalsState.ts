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
        const showActionModal = activeInGameTurn && isMyTurn && !!game.selectedCard && !game.chooseWhoWillStart;
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
        const showOpponentActionModal = !isObserver && !winnerUid && !!game.turn && !isMyTurn;
        let opponentActionMessage: string | null = null;

        if (showOpponentActionModal && game.tier === 'prepare') {
            opponentActionMessage = 'Opponent is choosing a wonder.';
        } else if (showOpponentActionModal && game.tier !== 'prepare') {
            if (game.chooseWhoWillStart) {
                opponentActionMessage = 'Opponent is choosing who starts.';
            } else if (game.pickCoin === game.turn) {
                opponentActionMessage = 'Opponent is choosing a coin.';
            } else if (game.pickCoinOfThree === game.turn) {
                opponentActionMessage = 'Opponent is choosing 1 of 3 coins.';
            } else if (game.pickCardFromGraveyard === game.turn) {
                opponentActionMessage = 'Opponent is choosing a graveyard card.';
            } else if (game.destroyBrown === game.turn) {
                opponentActionMessage = 'Opponent is choosing a brown card to destroy.';
            } else if (game.destroyGrey === game.turn) {
                opponentActionMessage = 'Opponent is choosing a grey card to destroy.';
            } else if (game.actionUid === game.turn && game.actionType === 'choose-wonder-build') {
                opponentActionMessage = 'Opponent is choosing a wonder.';
            } else if (game.actionUid === game.turn && game.actionType === 'choose-card-action') {
                opponentActionMessage = 'Opponent is choosing an action.';
            }
        }
        if (showOpponentActionModal && !opponentActionMessage) {
            opponentActionMessage = 'Opponent is making a move.';
        }

        const showIdlePrompt =
            activeInGameTurn &&
            isMyTurn &&
            !game.selectedCard &&
            !game.chooseWhoWillStart &&
            !showCoinChoiceModal &&
            !showDestroyOpponentModal;

        return {
            winnerUid,
            showEpochStarterModal,
            showActionModal,
            awaitingBoardCoinPick,
            awaitingWonderThreeCoins,
            showCoinChoiceModal,
            showDestroyOpponentModal,
            visibleCoinChoices,
            showOpponentActionModal,
            opponentActionMessage,
            showIdlePrompt
        };
    }, [game, isMyTurn, isObserver, uid]);
}
