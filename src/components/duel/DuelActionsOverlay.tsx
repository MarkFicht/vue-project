import type { ReactNode } from 'react';
import { Ban, Hand } from 'lucide-react';
import { DuelCoinSprite } from '@/components/duel/DuelCoinSprite';
import type { IGameDuelCoin } from '@/interfaces/GameDuel';

type DuelActionsOverlayProps = {
    inline?: boolean;
    isPrepareTier?: boolean;
    showCoinChoiceModal: boolean;
    awaitingBoardCoinPick: boolean;
    visibleCoinChoices: IGameDuelCoin['effect'][];
    onPickCoin: (coin: IGameDuelCoin['effect']) => void;
    onPickCoinOfThree: (coin: IGameDuelCoin['effect']) => void;
    showDestroyOpponentModal: boolean;
    destroyBrownActive: boolean;
    showGraveyardPickModal?: boolean;
    showEpochStarterModal: boolean;
    showPrepareWonderPickModal?: boolean;
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
    showOpponentActionModal?: boolean;
    opponentActionMessage?: string | null;
    showIdlePrompt?: boolean;
};

type ModalFrameOptions = {
    blocking: boolean;
    role: 'dialog' | 'status';
    ariaLabel: string;
    instruction?: boolean;
    ariaLive?: 'polite';
    children: ReactNode;
};

export function DuelActionsOverlay({
    inline = false,
    isPrepareTier = false,
    showCoinChoiceModal,
    awaitingBoardCoinPick,
    visibleCoinChoices,
    onPickCoin,
    onPickCoinOfThree,
    showDestroyOpponentModal,
    destroyBrownActive,
    showGraveyardPickModal,
    showEpochStarterModal,
    showPrepareWonderPickModal,
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
    onToggleWonderBuildMode,
    showOpponentActionModal,
    opponentActionMessage,
    showIdlePrompt
}: DuelActionsOverlayProps) {
    const inlineContainerClass = `dg-actionsInlineWrap${isPrepareTier ? ' dg-actionsInlineWrap--prepare' : ''}`;
    const containerClass = inline ? inlineContainerClass : 'dg-actionsBackdropInBoard';
    const blockingContainerClass = inline
        ? `${inlineContainerClass} dg-actionsInlineWrap--blocking`
        : 'dg-actionsBackdropInBoard dg-actionsBackdropInBoard--blocking';

    const renderModalFrame = ({ blocking, role, ariaLabel, instruction = false, ariaLive, children }: ModalFrameOptions) => (
        <div
            className={blocking ? blockingContainerClass : containerClass}
            role={role}
            aria-modal={role === 'dialog' ? 'true' : undefined}
            aria-live={ariaLive}
            aria-label={ariaLabel}
        >
            <div className={`dg-actionsModal${instruction ? ' dg-actionsModal--instruction' : ''}`}>{children}</div>
        </div>
    );

    const renderInstructionModal = (
        message: string,
        options: Omit<ModalFrameOptions, 'children' | 'instruction'> & { instruction?: boolean }
    ) =>
        renderModalFrame({
            ...options,
            instruction: options.instruction ?? true,
            children: <p className="px-1 text-center text-sm leading-snug text-slate-200">{message}</p>
        });

    if (showCoinChoiceModal) {
        return renderModalFrame({
            blocking: true,
            role: 'dialog',
            ariaLabel: awaitingBoardCoinPick
                ? 'Choose progress coin after matching pair'
                : 'Choose progress coin from wonder',
            children: (
                <>
                    <p className="mb-3 px-1 text-center text-sm text-slate-200">
                        {awaitingBoardCoinPick
                            ? 'You matched green science icons, choose one progress coin from the shared board pool.'
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
                </>
            )
        });
    }

    if (showDestroyOpponentModal) {
        return renderInstructionModal(
            destroyBrownActive
                ? "Wonder effect: choose one of your opponent's brown (raw material) cards to discard. Tap a highlighted card in their city below."
                : "Wonder effect: choose one of your opponent's grey (manufactured goods) cards to discard. Tap a highlighted card in their city below.",
            { blocking: true, role: 'dialog', ariaLabel: 'Destroy opponent card' }
        );
    }

    if (showGraveyardPickModal) {
        return renderInstructionModal('Pick a card from the graveyard.', {
            blocking: true,
            role: 'dialog',
            ariaLabel: 'Pick card from graveyard'
        });
    }

    if (showPrepareWonderPickModal) {
        return renderInstructionModal('Choose a wonder.', {
            blocking: false,
            role: 'status',
            ariaLabel: 'Choose wonder'
        });
    }

    if (showEpochStarterModal) {
        return renderModalFrame({
            blocking: true,
            role: 'dialog',
            ariaLabel: 'Choose who starts this age',
            children: (
                <>
                    <p className="mb-3 px-1 text-center text-sm text-slate-200">
                        Who takes the first turn this age? By the rules that should be{' '}
                        <span className="font-medium text-white">you</span> may keep first move or pass it to your opponent.
                    </p>
                    <div className="dg-actionsButtons dg-actionsButtons--starter">
                        <button type="button" className="btn-primary" onClick={onChooseSelfStarts}>
                            I stay first
                        </button>
                        <button type="button" className="btn-secondary" onClick={onChooseOpponentStarts}>
                            Opponent goes first
                        </button>
                    </div>
                </>
            )
        });
    }

    if (showActionModal) {
        return renderModalFrame({
            blocking: false,
            role: 'dialog',
            ariaLabel: 'Card actions',
            children: (
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
            )
        });
    }

    if (showIdlePrompt) {
        return renderInstructionModal('Your turn! Pick a tier card!', {
            blocking: false,
            role: 'status',
            ariaLabel: 'Awaiting card selection'
        });
    }

    if (showOpponentActionModal && opponentActionMessage) {
        return renderInstructionModal(opponentActionMessage, {
            blocking: true,
            role: 'status',
            ariaLabel: 'Opponent action status',
            ariaLive: 'polite'
        });
    }

    return null;
}
