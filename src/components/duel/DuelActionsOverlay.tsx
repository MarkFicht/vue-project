import { Ban, Hand } from 'lucide-react';
import { DuelCoinSprite } from '@/components/duel/DuelCoinSprite';
import type { IGameDuelCoin } from '@/interfaces/GameDuel';

type DuelActionsOverlayProps = {
    showCoinChoiceModal: boolean;
    awaitingBoardCoinPick: boolean;
    visibleCoinChoices: IGameDuelCoin['effect'][];
    onPickCoin: (coin: IGameDuelCoin['effect']) => void;
    onPickCoinOfThree: (coin: IGameDuelCoin['effect']) => void;
    showDestroyOpponentModal: boolean;
    destroyBrownActive: boolean;
    showEpochStarterModal: boolean;
    onChooseSelfStarts: () => void;
    onChooseOpponentStarts: () => void;
    showActionModal: boolean;
    canBuySelectedCard: boolean;
    buyPrice: number;
    onBuySelectedCard: () => void;
    canSellSelectedCard: boolean;
    onSellSelectedCard: () => void;
    hasBuildableWonder: boolean;
    wonderBuildMode: boolean;
    onToggleWonderBuildMode: () => void;
};

export function DuelActionsOverlay({
    showCoinChoiceModal,
    awaitingBoardCoinPick,
    visibleCoinChoices,
    onPickCoin,
    onPickCoinOfThree,
    showDestroyOpponentModal,
    destroyBrownActive,
    showEpochStarterModal,
    onChooseSelfStarts,
    onChooseOpponentStarts,
    showActionModal,
    canBuySelectedCard,
    buyPrice,
    onBuySelectedCard,
    canSellSelectedCard,
    onSellSelectedCard,
    hasBuildableWonder,
    wonderBuildMode,
    onToggleWonderBuildMode
}: DuelActionsOverlayProps) {
    if (showCoinChoiceModal) {
        return (
            <div
                className="dg-actionsBackdropInBoard dg-actionsBackdropInBoard--blocking"
                role="dialog"
                aria-modal="true"
                aria-label={awaitingBoardCoinPick ? 'Choose progress coin after matching pair' : 'Choose progress coin from wonder'}
            >
                <div className="dg-actionsModal">
                    <p className="mb-3 px-1 text-center text-sm text-slate-200">
                        {awaitingBoardCoinPick
                            ? 'You matched green science icons — choose one progress coin from the shared board pool.'
                            : 'Pick one of the three progress coins offered by the wonder:'}
                    </p>
                    <div className="dg-actionsModalCoins">
                        {visibleCoinChoices.map((coin, idx) => (
                            <span
                                key={`${awaitingBoardCoinPick ? 'b' : 'w'}-${coin}-${idx}`}
                                className="dg-actionsModalCoinWrap"
                                title={coin}
                            >
                                <DuelCoinSprite
                                    coin={coin}
                                    onClick={() => (awaitingBoardCoinPick ? onPickCoin(coin) : onPickCoinOfThree(coin))}
                                />
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (showDestroyOpponentModal) {
        return (
            <div
                className="dg-actionsBackdropInBoard dg-actionsBackdropInBoard--blocking"
                role="dialog"
                aria-modal="true"
                aria-label="Destroy opponent card"
            >
                <div className="dg-actionsModal dg-actionsModal--instruction">
                    <p className="px-1 text-center text-sm leading-snug text-slate-200">
                        {destroyBrownActive
                            ? "Wonder effect: choose one of your opponent's brown (raw material) cards to discard. Tap a highlighted card in their city below."
                            : "Wonder effect: choose one of your opponent's grey (manufactured goods) cards to discard. Tap a highlighted card in their city below."}
                    </p>
                </div>
            </div>
        );
    }

    if (showEpochStarterModal) {
        return (
            <div
                className="dg-actionsBackdropInBoard dg-actionsBackdropInBoard--blocking"
                role="dialog"
                aria-modal="true"
                aria-label="Choose who starts this age"
            >
                <div className="dg-actionsModal">
                    <p className="mb-3 px-1 text-center text-sm text-slate-200">
                        Who takes the first turn this age? By the rules that should be <span className="font-medium text-white">you</span>{' '}
                        — you may keep first move or pass it to your opponent.
                    </p>
                    <div className="dg-actionsButtons dg-actionsButtons--starter">
                        <button type="button" className="btn-primary" onClick={onChooseSelfStarts}>
                            I stay first
                        </button>
                        <button type="button" className="btn-secondary" onClick={onChooseOpponentStarts}>
                            Opponent goes first
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (showActionModal) {
        return (
            <div className="dg-actionsBackdropInBoard" role="dialog" aria-modal="true">
                <div className="dg-actionsModal">
                    <div className="dg-actionsButtons">
                        <button className="btn-primary" disabled={!canBuySelectedCard} onClick={onBuySelectedCard}>
                            {canBuySelectedCard ? <Hand className="h-3.5 w-3.5" /> : <Ban className="h-3.5 w-3.5" />}
                            Buy {buyPrice > -1 ? `(${buyPrice})` : ''}
                        </button>
                        <button className="btn-secondary" disabled={!canSellSelectedCard} onClick={onSellSelectedCard}>
                            Sell
                        </button>
                        <button
                            className={`btn-secondary ${!hasBuildableWonder ? '!bg-red-600/40 !text-red-100' : ''}`}
                            disabled={!hasBuildableWonder}
                            onClick={onToggleWonderBuildMode}
                        >
                            {wonderBuildMode ? 'Select wonder...' : 'Build wonder'}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return null;
}
