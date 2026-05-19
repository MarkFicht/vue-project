import { useEffect, useMemo, useState } from 'react';
import { useGameState } from '@/hooks/useGameState';
import { DuelBoard } from '@/components/duel/DuelBoard';
import { DuelPlayerColumns } from '@/components/duel/DuelPlayerColumns';
import { DuelActionsOverlay } from '@/components/duel/DuelActionsOverlay';
import { DuelPrepareStage } from '@/components/duel/DuelPrepareStage';
import { DuelTierCardsStage } from '@/components/duel/DuelTierCardsStage';
import { DuelGraveyardPanel } from '@/components/duel/DuelGraveyardPanel';
import { DuelGameOverPanel } from '@/components/duel/DuelGameOverPanel';
import { DuelGameHeader } from '@/components/duel/DuelGameHeader';
import {
    countMilitaryPoints,
    countPointsFromCards,
    countPointsFromCoins,
    countPointsFromGuild,
    showPrice
} from '@/helpers/GameDuelHelpers';
import { tierOneX, tierOneY, tierTwoX, tierTwoY, tierThreeX, tierThreeY } from '@/helpers/GameDuelInit';
import { setSoundMuted } from '@/utils/sound';
import { useSoundMuteSync } from '@/hooks/useSoundMuteSync';
import { persistUserSoundMuted } from '@/utils/persistUserSoundMuted';
import { useUserStore } from '@/store/useUserStore';
import { useDuelPreparePhase } from '@/hooks/useDuelPreparePhase';
import { useDuelModalsState } from '@/hooks/useDuelModalsState';
import type { AppTheme } from '@/hooks/useAppTheme';
import type { IGameDuelCard, IGameDuelPlayer, Tier } from '@/interfaces/GameDuel';

type PointBreakdown = {
    cards: number;
    guild: number;
    coins: number;
    military: number;
    total: number;
};

const TIER_LAYOUTS: Record<Exclude<Tier, 'prepare' | 'end'>, { x: number[]; y: number[] }> = {
    I: { x: tierOneX, y: tierOneY },
    II: { x: tierTwoX, y: tierTwoY },
    III: { x: tierThreeX, y: tierThreeY }
};

const resolveTierCards = (
    tier: Tier,
    game: { tierOneCards: IGameDuelCard[]; tierTwoCards: IGameDuelCard[]; tierThreeCards: IGameDuelCard[] }
) => {
    if (tier === 'I') return game.tierOneCards;
    if (tier === 'II') return game.tierTwoCards;
    if (tier === 'III') return game.tierThreeCards;
    return [];
};

const resolveTierLayout = (tier: Tier) => {
    if (tier === 'I' || tier === 'II' || tier === 'III') return TIER_LAYOUTS[tier];
    return TIER_LAYOUTS.III;
};

const winnerDisplay = (winnerUid: string, p1: IGameDuelPlayer, p2: IGameDuelPlayer) => {
    if (!winnerUid) return { name: '', countryCode: undefined as string | undefined };
    if (winnerUid === 'draw') return { name: 'DRAW', countryCode: undefined as string | undefined };
    if (winnerUid === p1.user.uid) return { name: p1.user.displayName || p1.user.email, countryCode: p1.user.countryCode };
    if (winnerUid === p2.user.uid) return { name: p2.user.displayName || p2.user.email, countryCode: p2.user.countryCode };
    return { name: winnerUid, countryCode: undefined as string | undefined };
};

export function DuelGamePage({
    uid,
    theme,
    onThemeChange
}: {
    uid: string;
    theme: AppTheme;
    onThemeChange: (theme: AppTheme) => void;
}) {
    const [wonderBuildMode, setWonderBuildMode] = useState(false);
    const [animatedP1Total, setAnimatedP1Total] = useState(0);
    const [animatedP2Total, setAnimatedP2Total] = useState(0);
    const [showSurrenderModal, setShowSurrenderModal] = useState(false);
    const profileSoundMuted = useUserStore((state) => state.fbUser.soundMuted);
    const [soundMuted, setSoundMutedState] = useSoundMuteSync(uid, profileSoundMuted, true);

    const {
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
    } = useGameState(uid);

    const tierCards = useMemo(
        () => resolveTierCards(game.tier, game),
        [game.tier, game.tierOneCards, game.tierThreeCards, game.tierTwoCards]
    );
    const tierLayout = useMemo(() => resolveTierLayout(game.tier), [game.tier]);

    const { prepareActionLocked, prepareRevealedIds, prepareWonderSlots, handlePrepareWonderPick } = useDuelPreparePhase({
        tier: game.tier,
        wonderCards: game.wonderCards,
        isMyTurn,
        selectWondersForPlayersMove: game.selectWondersForPlayersMove,
        chooseWonderForPlayer
    });

    const topPlayer = isObserver ? game.player1 : currentPlayer;
    const bottomPlayer = isObserver ? game.player2 : opponent;
    const topIsPlayerOne = topPlayer.user.uid === game.player1.user.uid;
    const bottomIsPlayerOne = bottomPlayer.user.uid === game.player1.user.uid;
    const hasBuildableWonder = useMemo(() => {
        if (!isMyTurn || !game.selectedCard) return false;
        return topPlayer.wonderCards.some(
            (wonder) =>
                wonder.activated === 'none' &&
                showPrice(wonder, topPlayer, bottomPlayer) <= topPlayer.resources.cash
        );
    }, [bottomPlayer, game.selectedCard, isMyTurn, topPlayer]);
    const affordableWonderIds = useMemo(
        () =>
            topPlayer.wonderCards
                .filter(
                    (wonder) =>
                        wonder.activated === 'none' &&
                        showPrice(wonder, topPlayer, bottomPlayer) <= topPlayer.resources.cash
                )
                .map((wonder) => wonder.id),
        [bottomPlayer, topPlayer]
    );

    const canBuySelectedCard = useMemo(() => {
        return (
            isMyTurn &&
            !!game.selectedCard &&
            canBuyTierCard >= 0 &&
            canBuyTierCard <= topPlayer.resources.cash
        );
    }, [canBuyTierCard, game.selectedCard, isMyTurn, topPlayer.resources.cash]);

    const pointBreakdown = useMemo<{ p1: PointBreakdown; p2: PointBreakdown }>(() => {
        const p1Cards = countPointsFromCards(game.player1);
        const p2Cards = countPointsFromCards(game.player2);
        const p1Guild = countPointsFromGuild(game.player1, game.player2);
        const p2Guild = countPointsFromGuild(game.player2, game.player1);
        const p1Coins = countPointsFromCoins(game.player1);
        const p2Coins = countPointsFromCoins(game.player2);
        const p1Military = countMilitaryPoints(game.board.pawn, true);
        const p2Military = countMilitaryPoints(game.board.pawn, false);

        return {
            p1: {
                cards: p1Cards,
                guild: p1Guild,
                coins: p1Coins,
                military: p1Military,
                total: p1Cards + p1Guild + p1Coins + p1Military
            },
            p2: {
                cards: p2Cards,
                guild: p2Guild,
                coins: p2Coins,
                military: p2Military,
                total: p2Cards + p2Guild + p2Coins + p2Military
            }
        };
    }, [game.board.pawn, game.player1, game.player2]);

    const {
        winnerUid,
        showEpochStarterModal,
        showActionModal,
        awaitingBoardCoinPick,
        showCoinChoiceModal,
        showDestroyOpponentModal,
        showGraveyardPickModal,
        visibleCoinChoices,
        showOpponentActionModal,
        opponentActionMessage,
        showIdlePrompt
    } = useDuelModalsState({ game, uid, isObserver, isMyTurn });

    const closeSelectedCardActions = () => {
        game.setSelectedCard(null);
        setWonderBuildMode(false);
    };
    const winnerMeta = useMemo(
        () => winnerDisplay(winnerUid, game.player1, game.player2),
        [game.player1, game.player2, winnerUid]
    );

    const victoryReason = game.wonByArt
        ? 'Scientific victory'
        : game.wonByAggressive
          ? 'Military victory'
          : game.wonBySurr
            ? 'Surrender'
            : game.wonByPoints
              ? 'Victory by points'
              : '';

    useEffect(() => {
        if (!game.wonByPoints) {
            setAnimatedP1Total(pointBreakdown.p1.total);
            setAnimatedP2Total(pointBreakdown.p2.total);
            return;
        }

        setAnimatedP1Total(0);
        setAnimatedP2Total(0);
        const interval = setInterval(() => {
            setAnimatedP1Total((prev) => {
                if (prev >= pointBreakdown.p1.total) return pointBreakdown.p1.total;
                const step = Math.max(1, Math.ceil((pointBreakdown.p1.total - prev) / 6));
                return Math.min(pointBreakdown.p1.total, prev + step);
            });
            setAnimatedP2Total((prev) => {
                if (prev >= pointBreakdown.p2.total) return pointBreakdown.p2.total;
                const step = Math.max(1, Math.ceil((pointBreakdown.p2.total - prev) / 6));
                return Math.min(pointBreakdown.p2.total, prev + step);
            });
        }, 65);

        return () => clearInterval(interval);
    }, [game.wonByPoints, pointBreakdown.p1.total, pointBreakdown.p2.total]);

    useEffect(() => {
        if (!game.selectedCard) {
            setWonderBuildMode(false);
            void setActionHint('');
        }
    }, [game.selectedCard, setActionHint]);

    useEffect(() => {
        if (!showActionModal && !showEpochStarterModal && !showCoinChoiceModal && !showDestroyOpponentModal && !showGraveyardPickModal)
            return;
        const handlePointerDown = (event: PointerEvent) => {
            if (showEpochStarterModal || showCoinChoiceModal || showDestroyOpponentModal || showGraveyardPickModal) return;
            const target = event.target as Element | null;
            if (!target) return;
            if (target.closest('.dg-cardWrapper') || target.closest('.dg-wonderWrapper') || target.closest('.dg-actionsModal')) return;
            closeSelectedCardActions();
        };
        const handleKeyDown = (event: KeyboardEvent) => {
            if (
                (showEpochStarterModal || showCoinChoiceModal || showDestroyOpponentModal || showGraveyardPickModal) &&
                event.key === 'Escape'
            ) {
                return;
            }
            if (event.key === 'Escape') closeSelectedCardActions();
        };
        window.addEventListener('pointerdown', handlePointerDown);
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('pointerdown', handlePointerDown);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [showActionModal, showCoinChoiceModal, showDestroyOpponentModal, showEpochStarterModal, showGraveyardPickModal]);

    const toggleSound = () => {
        const next = !soundMuted;
        setSoundMuted(next);
        setSoundMutedState(next);
        void persistUserSoundMuted(uid, next);
    };
    const toggleTheme = () => onThemeChange(theme === 'classic' ? 'ivory' : 'classic');
    const openSurrenderModal = () => {
        if (isObserver) return;
        setShowSurrenderModal(true);
    };
    const confirmSurrender = () => {
        setShowSurrenderModal(false);
        surrender();
    };
    const handleBuildSelectedWonder = async (wonderId: number) => {
        if (!wonderBuildMode) return;
        const wonder = topPlayer.wonderCards.find((item) => item.id === wonderId);
        if (!wonder) return;
        selectWonder(wonder);
        await buildWonder(wonder);
        setWonderBuildMode(false);
        void setActionHint('');
    };
    const toggleWonderBuildMode = () => {
        setWonderBuildMode((prev) => {
            const next = !prev;
            void setActionHint(next ? 'choose-wonder-build' : 'choose-card-action');
            return next;
        });
    };
    return (
        <main className="mx-auto flex h-dvh max-h-dvh w-full max-w-[1400px] flex-col overflow-hidden p-2 text-[color:var(--app-text)] sm:p-3">
            <DuelGameHeader
                isObserver={isObserver}
                isMyTurn={isMyTurn}
                tier={game.tier}
                move={game.move}
                soundMuted={soundMuted}
                theme={theme}
                onOpenSurrender={openSurrenderModal}
                onToggleSound={toggleSound}
                onToggleTheme={toggleTheme}
                onBackToFeed={goBackToFeed}
            />

            {showSurrenderModal && (
                <div className="dgSurrenderOverlay" onClick={() => setShowSurrenderModal(false)}>
                    <div className="dgSurrenderModal" onClick={(event) => event.stopPropagation()}>
                        <h3>Surrender</h3>
                        <p>Are you sure you want to surrender this game?</p>
                        <div className="dgSurrenderActions">
                            <button className="btn-secondary" type="button" onClick={() => setShowSurrenderModal(false)}>
                                Cancel
                            </button>
                            <button className="btn-primary" type="button" onClick={confirmSurrender}>
                                Surrender
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <DuelGameOverPanel
                winnerUid={winnerUid}
                winnerName={winnerMeta.name}
                winnerCountryCode={winnerMeta.countryCode}
                victoryReason={victoryReason}
                wonByAggressive={!!game.wonByAggressive}
                wonByArt={!!game.wonByArt}
                wonByPoints={!!game.wonByPoints}
                player1={game.player1}
                player2={game.player2}
                pointBreakdown={pointBreakdown}
                animatedP1Total={animatedP1Total}
                animatedP2Total={animatedP2Total}
            />

            <div className="dg-tableArena flex min-h-0 flex-1 flex-col overflow-hidden">
                <div className="dg-tableSurface duelPageScrollbar min-h-0 flex-1 overflow-y-auto">
                    <div className="dg-duelLayout">
                        <section className="dg-duelArena" aria-label="Draft area and conflict board">
                            <div className="relative overflow-visible rounded-xl p-2 dg-arenaTableCard">
                                <div className="dg-militaryViewport">
                                    <div className="dg-militaryTransform">
                                        <DuelBoard
                                            pawn={game.board.pawn}
                                            coins={game.board.coins}
                                            punishment1={game.board.punishment1}
                                            punishment2={game.board.punishment2}
                                            punishment3={game.board.punishment3}
                                            punishment4={game.board.punishment4}
                                            currentIsPlayer2={uid === game.player2.user.uid}
                                            pickCoinUid={game.pickCoin}
                                            isMyTurn={isMyTurn}
                                            currentUid={uid}
                                            onPickCoin={pickCoin}
                                        />
                                    </div>
                                </div>
                                    <div
                                        className={`dg-stageCards${game.tier === 'prepare' ? ' dg-stageCards--prepare' : ''}`}
                                    >
                                        {game.tier === 'prepare' ? (
                                            <DuelPrepareStage
                                                isMyTurn={isMyTurn}
                                                prepareWonderSlots={prepareWonderSlots}
                                                prepareRevealedIds={prepareRevealedIds}
                                                prepareActionLocked={prepareActionLocked}
                                                onPickWonder={(wonderId) => void handlePrepareWonderPick(wonderId)}
                                            />
                                        ) : (
                                            <DuelTierCardsStage
                                                tier={game.tier}
                                                tierCards={tierCards}
                                                tierLayout={tierLayout}
                                                selectedCardId={game.selectedCard?.id}
                                                topPlayer={topPlayer}
                                                bottomPlayer={bottomPlayer}
                                                onSelectTierCard={selectTierCard}
                                            />
                                        )}
                                    </div>
                                <DuelActionsOverlay
                                    inline
                                    showCoinChoiceModal={showCoinChoiceModal}
                                    awaitingBoardCoinPick={awaitingBoardCoinPick}
                                    visibleCoinChoices={visibleCoinChoices}
                                    onPickCoin={pickCoin}
                                    onPickCoinOfThree={pickCoinOfThree}
                                    showDestroyOpponentModal={showDestroyOpponentModal}
                                    destroyBrownActive={game.destroyBrown === uid}
                                    showGraveyardPickModal={showGraveyardPickModal}
                                    showEpochStarterModal={showEpochStarterModal}
                                    onChooseSelfStarts={() => chooseWhoStarts(uid)}
                                    onChooseOpponentStarts={() => chooseWhoStarts(opponent.user.uid)}
                                    showActionModal={showActionModal}
                                    canBuySelectedCard={canBuySelectedCard}
                                    buyPrice={canBuyTierCard}
                                    onBuySelectedCard={buySelectedCard}
                                    canSellSelectedCard={isMyTurn && !!game.selectedCard}
                                    onSellSelectedCard={sellSelectedCard}
                                    hasBuildableWonder={hasBuildableWonder}
                                    wonderBuildMode={wonderBuildMode}
                                    onToggleWonderBuildMode={toggleWonderBuildMode}
                                    showOpponentActionModal={showOpponentActionModal}
                                    opponentActionMessage={opponentActionMessage}
                                    showIdlePrompt={showIdlePrompt}
                                />
                                <DuelGraveyardPanel
                                    graveyard={game.graveyard}
                                    isMyTurn={isMyTurn}
                                    pickCardFromGraveyardUid={game.pickCardFromGraveyard}
                                    currentUid={uid}
                                    onPickCardFromGraveyard={pickCardFromGraveyard}
                                />
                            </div>
                        </section>

                        <div className="dg-duelPlayersRow">
                            <section className="dg-duelBand dg-duelBand--opp dg-playerBand" aria-label="Opponent city">
                                <div className="dg-playerShell">
                                    <DuelPlayerColumns
                                        player={topPlayer}
                                        enemy={bottomPlayer}
                                        boardPawn={game.board.pawn}
                                        isPlayerOne={topIsPlayerOne}
                                        canSelectWonder={wonderBuildMode && isMyTurn && !!game.selectedCard}
                                        affordableWonderIds={wonderBuildMode ? affordableWonderIds : []}
                                        selectedWonderId={game.selectedWonder?.id}
                                        onSelectWonder={handleBuildSelectedWonder}
                                        destroyMode={null}
                                        isDestroyTarget={false}
                                        pulseScienceVictory={!!game.wonByArt && game.wonByArt === topPlayer.user.uid}
                                        isCurrentTurn={game.turn === topPlayer.user.uid}
                                        showPreparePlaceholders={game.tier === 'prepare'}
                                    />
                                </div>
                            </section>

                            <section className="dg-duelBand dg-duelBand--you dg-playerBand" aria-label="Your city">
                                <div className="dg-playerShell">
                                <DuelPlayerColumns
                                    player={bottomPlayer}
                                    enemy={topPlayer}
                                    boardPawn={game.board.pawn}
                                    isPlayerOne={bottomIsPlayerOne}
                                    canSelectWonder={false}
                                    affordableWonderIds={[]}
                                    destroyMode={
                                        isMyTurn && game.destroyBrown === uid
                                            ? 'brown'
                                            : isMyTurn && game.destroyGrey === uid
                                              ? 'grey'
                                              : null
                                    }
                                    isDestroyTarget={isMyTurn && (game.destroyBrown === uid || game.destroyGrey === uid)}
                                    onDestroyCard={destroyEnemyCard}
                                    pulseScienceVictory={!!game.wonByArt && game.wonByArt === bottomPlayer.user.uid}
                                    isCurrentTurn={game.turn === bottomPlayer.user.uid}
                                    showPreparePlaceholders={game.tier === 'prepare'}
                                />
                                </div>
                            </section>
                    </div>
                </div>
            </div>
        </div>
        </main>
    );
}
