import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Ban, Hand, ShieldAlert, Volume2, VolumeX } from 'lucide-react';
import { useGameState } from '@/hooks/useGameState';
import { DuelSpriteCard } from '@/components/duel/DuelSpriteCard';
import { DuelWonderSprite } from '@/components/duel/DuelWonderSprite';
import { DuelBoard } from '@/components/duel/DuelBoard';
import { DuelCoinSprite } from '@/components/duel/DuelCoinSprite';
import { DuelPlayerColumns } from '@/components/duel/DuelPlayerColumns';
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
import { UserFlag } from '@/components/UserFlag';

export function DuelGamePage({ uid }: { uid: string }) {
    const [wonderBuildMode, setWonderBuildMode] = useState(false);
    const [animatedP1Total, setAnimatedP1Total] = useState(0);
    const [animatedP2Total, setAnimatedP2Total] = useState(0);
    const [prepareRevealedIds, setPrepareRevealedIds] = useState<number[]>([]);
    const [displayPrepareBatch, setDisplayPrepareBatch] = useState<1 | 2>(1);
    const [prepareActionLocked, setPrepareActionLocked] = useState(false);
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
        goBackToFeed
    } = useGameState(uid);

    const tierCards = useMemo(() => {
        if (game.tier === 'I') return game.tierOneCards;
        if (game.tier === 'II') return game.tierTwoCards;
        if (game.tier === 'III') return game.tierThreeCards;
        return [];
    }, [game.tier, game.tierOneCards, game.tierThreeCards, game.tierTwoCards]);

    const tierLayout = useMemo(() => {
        if (game.tier === 'I') return { x: tierOneX, y: tierOneY };
        if (game.tier === 'II') return { x: tierTwoX, y: tierTwoY };
        return { x: tierThreeX, y: tierThreeY };
    }, [game.tier]);

    const batchOneWonders = useMemo(() => game.wonderCards.slice(0, 4), [game.wonderCards]);
    const batchTwoWonders = useMemo(() => game.wonderCards.slice(4, 8), [game.wonderCards]);
    const displayedPrepareWonders = useMemo(
        () => (displayPrepareBatch === 1 ? batchOneWonders : batchTwoWonders),
        [batchOneWonders, batchTwoWonders, displayPrepareBatch]
    );
    const selectablePrepareWonders = useMemo(
        () => displayedPrepareWonders.filter((wonder) => !wonder.taken),
        [displayedPrepareWonders]
    );
    const firstBatchComplete = useMemo(
        () => batchOneWonders.length === 4 && batchOneWonders.every((wonder) => wonder.taken),
        [batchOneWonders]
    );
    const prepareWonderSlots = useMemo(() => {
        if (displayedPrepareWonders.length === 4) {
            return displayedPrepareWonders as Array<(typeof displayedPrepareWonders)[number] | null>;
        }
        return Array(4).fill(null) as Array<(typeof displayedPrepareWonders)[number] | null>;
    }, [displayedPrepareWonders]);

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

    const pointBreakdown = useMemo(() => {
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

    const winnerUid = game.wonByArt || game.wonByAggressive || game.wonBySurr || game.wonByPoints;
    const showEpochStarterModal =
        !winnerUid &&
        game.tier !== 'prepare' &&
        game.chooseWhoWillStart &&
        isMyTurn &&
        !isObserver;

    const showActionModal =
        !winnerUid &&
        game.tier !== 'prepare' &&
        !!game.selectedCard &&
        !game.chooseWhoWillStart &&
        !isObserver;

    const awaitingBoardCoinPick =
        !winnerUid &&
        game.tier !== 'prepare' &&
        !isObserver &&
        isMyTurn &&
        game.pickCoin === uid &&
        game.pickCoin === game.turn;

    const awaitingWonderThreeCoins =
        !winnerUid &&
        game.tier !== 'prepare' &&
        !isObserver &&
        isMyTurn &&
        game.pickCoinOfThree === uid &&
        game.pickCoinOfThree === game.turn;

    const showCoinChoiceModal = awaitingBoardCoinPick || awaitingWonderThreeCoins;

    const showDestroyOpponentModal =
        !winnerUid &&
        game.tier !== 'prepare' &&
        !game.chooseWhoWillStart &&
        !isObserver &&
        isMyTurn &&
        (game.destroyBrown === uid || game.destroyGrey === uid) &&
        game.turn === uid;

    const showArenaFoot = isMyTurn && game.pickCardFromGraveyard === uid;
    const closeSelectedCardActions = () => {
        game.setSelectedCard(null);
        setWonderBuildMode(false);
    };
    const winnerName = useMemo(() => {
        if (!winnerUid) return '';
        if (winnerUid === 'draw') return 'DRAW';
        if (winnerUid === game.player1.user.uid) return game.player1.user.displayName || game.player1.user.email;
        if (winnerUid === game.player2.user.uid) return game.player2.user.displayName || game.player2.user.email;
        return winnerUid;
    }, [game.player1.user.displayName, game.player1.user.email, game.player1.user.uid, game.player2.user.displayName, game.player2.user.email, game.player2.user.uid, winnerUid]);

    const winnerCountryCode = useMemo(() => {
        if (!winnerUid || winnerUid === 'draw') return undefined;
        if (winnerUid === game.player1.user.uid) return game.player1.user.countryCode;
        if (winnerUid === game.player2.user.uid) return game.player2.user.countryCode;
        return undefined;
    }, [winnerUid, game.player1.user.countryCode, game.player1.user.uid, game.player2.user.countryCode, game.player2.user.uid]);

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
        }
    }, [game.selectedCard]);

    useEffect(() => {
        if (game.tier !== 'prepare') {
            setDisplayPrepareBatch(1);
            setPrepareRevealedIds([]);
            setPrepareActionLocked(false);
        }
    }, [game.tier]);

    useEffect(() => {
        const currentIds = displayedPrepareWonders.map((wonder) => wonder.id);
        setPrepareRevealedIds((prev) => prev.filter((id) => currentIds.includes(id)));
    }, [displayedPrepareWonders]);

    useEffect(() => {
        if (game.tier !== 'prepare') return;
        if (displayPrepareBatch !== 1) return;
        if (!firstBatchComplete) return;

        const timer = window.setTimeout(() => {
            setDisplayPrepareBatch(2);
            setPrepareRevealedIds([]);
        }, 760);

        return () => window.clearTimeout(timer);
    }, [displayPrepareBatch, firstBatchComplete, game.tier]);

    useEffect(() => {
        if (game.tier !== 'prepare') return;
        if (displayPrepareBatch !== 2) return;
        if (firstBatchComplete) return;
        setDisplayPrepareBatch(1);
        setPrepareRevealedIds([]);
    }, [displayPrepareBatch, firstBatchComplete, game.tier]);

    useEffect(() => {
        if (game.tier !== 'prepare') return;
        const pending = displayedPrepareWonders.filter((wonder) => !prepareRevealedIds.includes(wonder.id));
        if (!pending.length) return;
        const timers = pending.map((wonder, index) =>
            window.setTimeout(() => {
                setPrepareRevealedIds((prev) => (prev.includes(wonder.id) ? prev : [...prev, wonder.id]));
            }, index * 340)
        );
        return () => timers.forEach((timer) => window.clearTimeout(timer));
    }, [displayedPrepareWonders, game.tier, prepareRevealedIds]);

    useEffect(() => {
        if (game.tier !== 'prepare') return;
        if (!isMyTurn) return;
        if (game.selectWondersForPlayersMove !== 3 && game.selectWondersForPlayersMove !== 7) return;
        if (selectablePrepareWonders.length !== 1) return;
        if (prepareActionLocked) return;

        const lastWonder = selectablePrepareWonders[0];
        if (!prepareRevealedIds.includes(lastWonder.id)) return;
        const timer = window.setTimeout(async () => {
            setPrepareActionLocked(true);
            await chooseWonderForPlayer(lastWonder.id);
            setPrepareActionLocked(false);
        }, 120);

        return () => window.clearTimeout(timer);
    }, [
        chooseWonderForPlayer,
        game.selectWondersForPlayersMove,
        game.tier,
        isMyTurn,
        prepareActionLocked,
        prepareRevealedIds,
        selectablePrepareWonders
    ]);

    useEffect(() => {
        if (!showActionModal && !showEpochStarterModal && !showCoinChoiceModal && !showDestroyOpponentModal) return;
        const handlePointerDown = (event: PointerEvent) => {
            if (showEpochStarterModal || showCoinChoiceModal || showDestroyOpponentModal) return;
            const target = event.target as Element | null;
            if (!target) return;
            if (target.closest('.dg-cardWrapper') || target.closest('.dg-wonderWrapper') || target.closest('.dg-actionsModal')) return;
            closeSelectedCardActions();
        };
        const handleKeyDown = (event: KeyboardEvent) => {
            if (
                (showEpochStarterModal || showCoinChoiceModal || showDestroyOpponentModal) &&
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
    }, [showActionModal, showCoinChoiceModal, showDestroyOpponentModal, showEpochStarterModal]);

    return (
        <main className="mx-auto flex h-dvh max-h-dvh w-full max-w-[1400px] flex-col overflow-hidden p-2 text-[color:var(--app-text)] sm:p-3">
            <header className="app-surface-header mb-2 flex min-w-0 max-w-full shrink-0 items-center justify-between gap-2 rounded-xl p-2 sm:mb-3 sm:rounded-2xl sm:p-3">
                <div className="min-w-0">
                    <h1 className="flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-1 text-lg font-semibold leading-tight">
                        <span className="font-display shrink-0 tracking-wide">Duel</span>
                        <span className="text-xs font-normal opacity-80">
                            Turn: {isObserver ? 'Observer mode' : isMyTurn ? 'You' : 'Opponent'}
                        </span>
                    </h1>
                    <p className="text-xs opacity-80">
                        Tier: {game.tier} · Move: {game.move}
                    </p>
                </div>
                <div className="flex min-w-0 shrink items-center gap-2">
                    <button type="button" className="btn-secondary hdrIconBtn" disabled={isObserver} onClick={surrender} title="Surrender">
                        <ShieldAlert className="h-4 w-4" />
                        <span className="hdrBtnText">Surrender</span>
                    </button>
                    <button
                        type="button"
                        className="btn-secondary hdrIconBtn"
                        onClick={() => {
                            const next = !soundMuted;
                            setSoundMuted(next);
                            setSoundMutedState(next);
                            void persistUserSoundMuted(uid, next);
                        }}
                        title={soundMuted ? 'Unmute sounds' : 'Mute sounds'}
                    >
                        {soundMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                        <span className="hdrBtnText">{soundMuted ? 'Muted' : 'Sound'}</span>
                    </button>
                    <button type="button" className="btn-secondary hdrIconBtn" onClick={goBackToFeed} title="Back to feed">
                        <ArrowLeft className="h-4 w-4" />
                        <span className="hdrBtnText">Feed</span>
                    </button>
                </div>
            </header>

            {winnerUid ? (
                <section className="app-surface-callout mb-2 shrink-0 rounded-xl p-3 sm:mb-3 sm:rounded-2xl sm:p-4">
                    <h2 className="font-display text-xl font-semibold tracking-wide">Game over</h2>
                    <p className="flex flex-wrap items-center gap-2 text-sm">
                        <span>Winner:</span>
                        <UserFlag code={winnerCountryCode} className="text-lg" />
                        <span>{winnerName}</span>
                    </p>
                    <p className="mt-1 text-xs opacity-90">{victoryReason}</p>
                    {game.wonByAggressive ? (
                        <div className="mt-2 inline-flex items-center gap-2 rounded-md bg-black/20 px-2 py-1 text-xs">
                            <span className="dg-endIcon dg-endIconMilitary dg-endFocus dg-endFocusMilitary" />
                            Military domination
                        </div>
                    ) : null}
                    {game.wonByArt ? (
                        <div className="mt-2 inline-flex items-center gap-2 rounded-md bg-black/20 px-2 py-1 text-xs">
                            <span className="dg-endIcon dg-endIconScience dg-endFocus dg-endFocusScience" />
                            Scientific domination
                        </div>
                    ) : null}
                    {game.wonByPoints ? (
                        <div className="mt-3 grid gap-2 md:grid-cols-2">
                            <div className="rounded-lg bg-black/20 p-3 text-sm">
                                <p className="mb-1 inline-flex items-center gap-1.5 font-semibold">
                                    <UserFlag code={game.player1.user.countryCode} className="text-base" />
                                    <span>{game.player1.user.displayName || game.player1.user.email || 'Player 1'}</span>
                                </p>
                                <p>Cards/Wonders: {pointBreakdown.p1.cards}</p>
                                <p>Guilds: {pointBreakdown.p1.guild}</p>
                                <p>Coins: {pointBreakdown.p1.coins}</p>
                                <p
                                    className={`rounded px-1 ${game.wonByAggressive ? 'dg-endFocus dg-endFocusMilitary' : ''}`}
                                >
                                    Military: {pointBreakdown.p1.military}
                                </p>
                                <p className="mt-1 font-semibold">
                                    <span
                                        className={
                                            game.wonByPoints && winnerUid === game.player1.user.uid
                                                ? 'dg-endFocus dg-endFocusPoints rounded px-1'
                                                : ''
                                        }
                                    >
                                        Total: {animatedP1Total}
                                    </span>
                                </p>
                            </div>
                            <div className="rounded-lg bg-black/20 p-3 text-sm">
                                <p className="mb-1 inline-flex items-center gap-1.5 font-semibold">
                                    <UserFlag code={game.player2.user.countryCode} className="text-base" />
                                    <span>{game.player2.user.displayName || game.player2.user.email || 'Player 2'}</span>
                                </p>
                                <p>Cards/Wonders: {pointBreakdown.p2.cards}</p>
                                <p>Guilds: {pointBreakdown.p2.guild}</p>
                                <p>Coins: {pointBreakdown.p2.coins}</p>
                                <p
                                    className={`rounded px-1 ${game.wonByAggressive ? 'dg-endFocus dg-endFocusMilitary' : ''}`}
                                >
                                    Military: {pointBreakdown.p2.military}
                                </p>
                                <p className="mt-1 font-semibold">
                                    <span
                                        className={
                                            game.wonByPoints && winnerUid === game.player2.user.uid
                                                ? 'dg-endFocus dg-endFocusPoints rounded px-1'
                                                : ''
                                        }
                                    >
                                        Total: {animatedP2Total}
                                    </span>
                                </p>
                            </div>
                        </div>
                    ) : null}
                </section>
            ) : null}

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
                                            <>
                                                <h2 className="mb-2 text-sm font-semibold">
                                                    Pick wonders {isMyTurn ? '(your turn)' : '(opponent picks)'}
                                                </h2>
                                                <div className="dg-wondersPickTransform">
                                                    <div className="dg-wondersPick">
                                                        {prepareWonderSlots.map((wonder, index) => (
                                                            <DuelWonderSprite
                                                                key={wonder ? wonder.id : `prepare-placeholder-${index}`}
                                                                card={wonder ?? undefined}
                                                                showFront={
                                                                    !!wonder &&
                                                                    !wonder.taken &&
                                                                    prepareRevealedIds.includes(wonder.id)
                                                                }
                                                                flipDelayMs={0}
                                                                disabled={
                                                                    !isMyTurn ||
                                                                    !wonder ||
                                                                    wonder.taken ||
                                                                    !prepareRevealedIds.includes(wonder.id) ||
                                                                    prepareActionLocked
                                                                }
                                                                onClick={
                                                                    wonder
                                                                        ? async () => {
                                                                              if (prepareActionLocked) return;
                                                                              setPrepareActionLocked(true);
                                                                              await chooseWonderForPlayer(wonder.id);
                                                                              setPrepareActionLocked(false);
                                                                          }
                                                                        : undefined
                                                                }
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="dg-cardBoardShell">
                                                <div className="dg-epochCardsTransform">
                                                    <div className="dg-cardBoard">
                                                        {tierCards.map((card, index) => (
                                                            <DuelSpriteCard
                                                                key={`${card.tier}-${card.id}`}
                                                                card={card}
                                                                x={tierLayout.x[index]}
                                                                y={tierLayout.y[index]}
                                                                selected={game.selectedCard?.id === card.id}
                                                                cash1P={
                                                                    (card.coversBy?.length ?? 0) === 0
                                                                        ? showPrice(card, topPlayer, bottomPlayer)
                                                                        : -1
                                                                }
                                                                cash2P={
                                                                    (card.coversBy?.length ?? 0) === 0
                                                                        ? showPrice(card, bottomPlayer, topPlayer)
                                                                        : -1
                                                                }
                                                                res1P={topPlayer.resources.cash}
                                                                res2P={bottomPlayer.resources.cash}
                                                                onClick={() => selectTierCard(card)}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <aside className="dg-graveyardPanel rounded-xl p-2">
                                        <h3 className="mb-1 text-sm font-semibold">Graveyard</h3>
                                        <div
                                            className={`dg-graveyardCards dg-graveyardCardsBox duelPageScrollbar overflow-y-auto rounded-lg p-1 ${
                                                isMyTurn && game.pickCardFromGraveyard === uid
                                                    ? 'ring-2 ring-emerald-300/60'
                                                    : ''
                                            }`}
                                        >
                                            <div className="dg-graveyardCardsTransform">
                                                {game.graveyard.map((card, idx) => (
                                                    <DuelSpriteCard
                                                        key={`grave-${card.id}-${idx}`}
                                                        card={card}
                                                        x={0}
                                                        y={0}
                                                        compact
                                                        disabled={
                                                            !(
                                                                isMyTurn &&
                                                                game.pickCardFromGraveyard === uid
                                                            )
                                                        }
                                                        onClick={() => pickCardFromGraveyard(card)}
                                                    />
                                                ))}
                                                {!game.graveyard.length && (
                                                    <span className="text-xs opacity-70">empty</span>
                                                )}
                                            </div>
                                        </div>
                                    </aside>
                                {showArenaFoot ? (
                                    <div className="relative dg-arenaFoot">
                                        <div className="flex flex-wrap items-center gap-2">
                                            {isMyTurn && game.pickCardFromGraveyard === uid && (
                                                    <span className="rounded-md border border-emerald-300/50 bg-emerald-500/20 px-2 py-1 text-xs">
                                                        Select card from graveyard
                                                    </span>
                                                )}
                                            </div>
                                    </div>
                                ) : null}
                                {showCoinChoiceModal ? (
                                    <div
                                        className="dg-actionsBackdropInBoard dg-actionsBackdropInBoard--blocking"
                                        role="dialog"
                                        aria-modal="true"
                                        aria-label={
                                            awaitingBoardCoinPick
                                                ? 'Choose progress coin after matching pair'
                                                : 'Choose progress coin from wonder'
                                        }
                                    >
                                        <div className="dg-actionsModal">
                                            <p className="mb-3 px-1 text-center text-sm text-slate-200">
                                                {awaitingBoardCoinPick
                                                    ? 'You matched green science icons — choose one progress coin from the shared board pool.'
                                                    : 'Pick one of the three progress coins offered by the wonder:'}
                                            </p>
                                            <div className="dg-actionsModalCoins">
                                                {(awaitingBoardCoinPick ? game.board.coins : game.theRestOfCoins.slice(0, 3)).map(
                                                    (coin, idx) => (
                                                        <span
                                                            key={`${awaitingBoardCoinPick ? 'b' : 'w'}-${coin}-${idx}`}
                                                            className="dg-actionsModalCoinWrap"
                                                            title={coin}
                                                        >
                                                            <DuelCoinSprite
                                                                coin={coin}
                                                                onClick={() =>
                                                                    awaitingBoardCoinPick
                                                                        ? pickCoin(coin)
                                                                        : pickCoinOfThree(coin)
                                                                }
                                                            />
                                                        </span>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ) : showDestroyOpponentModal ? (
                                    <div
                                        className="dg-actionsBackdropInBoard dg-actionsBackdropInBoard--blocking"
                                        role="dialog"
                                        aria-modal="true"
                                        aria-label="Destroy opponent card"
                                    >
                                        <div className="dg-actionsModal dg-actionsModal--instruction">
                                            <p className="px-1 text-center text-sm leading-snug text-slate-200">
                                                {game.destroyBrown === uid
                                                    ? 'Wonder effect: choose one of your opponent\'s brown (raw material) cards to discard. Tap a highlighted card in their city below.'
                                                    : 'Wonder effect: choose one of your opponent\'s grey (manufactured goods) cards to discard. Tap a highlighted card in their city below.'}
                                            </p>
                                        </div>
                                    </div>
                                ) : showEpochStarterModal ? (
                                    <div
                                        className="dg-actionsBackdropInBoard dg-actionsBackdropInBoard--blocking"
                                        role="dialog"
                                        aria-modal="true"
                                        aria-label="Choose who starts this age"
                                    >
                                        <div className="dg-actionsModal">
                                            <p className="mb-3 px-1 text-center text-sm text-slate-200">
                                                Who takes the first turn this age? By the rules that should be{' '}
                                                <span className="font-medium text-white">you</span> — you may keep first
                                                move or pass it to your opponent.
                                            </p>
                                            <div className="dg-actionsButtons dg-actionsButtons--starter">
                                                <button
                                                    type="button"
                                                    className="btn-primary"
                                                    onClick={() => chooseWhoStarts(uid)}
                                                >
                                                    I stay first
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn-secondary"
                                                    onClick={() => chooseWhoStarts(opponent.user.uid)}
                                                >
                                                    Opponent goes first
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ) : showActionModal ? (
                                    <div className="dg-actionsBackdropInBoard" role="dialog" aria-modal="true">
                                        <div className="dg-actionsModal">
                                            <div className="dg-actionsButtons">
                                                <button
                                                    className="btn-primary"
                                                    disabled={!canBuySelectedCard}
                                                    onClick={buySelectedCard}
                                                >
                                                    {canBuySelectedCard ? (
                                                        <Hand className="h-3.5 w-3.5" />
                                                    ) : (
                                                        <Ban className="h-3.5 w-3.5" />
                                                    )}
                                                    Buy {canBuyTierCard > -1 ? `(${canBuyTierCard})` : ''}
                                                </button>
                                                <button
                                                    className="btn-secondary"
                                                    disabled={!isMyTurn || !game.selectedCard}
                                                    onClick={sellSelectedCard}
                                                >
                                                    Sell
                                                </button>
                                                <button
                                                    className={`btn-secondary ${!hasBuildableWonder ? '!bg-red-600/40 !text-red-100' : ''}`}
                                                    disabled={!hasBuildableWonder}
                                                    onClick={() => setWonderBuildMode((prev) => !prev)}
                                                >
                                                    {wonderBuildMode ? 'Select wonder...' : 'Build wonder'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ) : null}
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
                                        onSelectWonder={async (wonderId) => {
                                            if (!wonderBuildMode) return;
                                            const wonder = topPlayer.wonderCards.find((w) => w.id === wonderId);
                                            if (!wonder) return;
                                            selectWonder(wonder);
                                            await buildWonder(wonder);
                                            setWonderBuildMode(false);
                                        }}
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
