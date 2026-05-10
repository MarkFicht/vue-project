import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Ban, Hand, ShieldAlert, Volume2, VolumeX } from 'lucide-react';
import { useGameState } from '@/hooks/useGameState';
import { DuelSpriteCard } from '@/components/duel/DuelSpriteCard';
import { DuelWonderSprite } from '@/components/duel/DuelWonderSprite';
import { DuelBoard } from '@/components/duel/DuelBoard';
import { DuelPlayerColumns } from '@/components/duel/DuelPlayerColumns';
import {
    countMilitaryPoints,
    countPointsFromCards,
    countPointsFromCoins,
    countPointsFromGuild,
    showPrice
} from '@/game/gameHelpers';
import { tierOneX, tierOneY, tierTwoX, tierTwoY, tierThreeX, tierThreeY } from '@/helpers/GameDuelInit';
import { isSoundMuted, setSoundMuted, setSoundScope } from '@/utils/sound';

export function DuelGamePage({ uid }: { uid: string }) {
    const [wonderBuildMode, setWonderBuildMode] = useState(false);
    const [animatedP1Total, setAnimatedP1Total] = useState(0);
    const [animatedP2Total, setAnimatedP2Total] = useState(0);
    const [prepareRevealedIds, setPrepareRevealedIds] = useState<number[]>([]);
    const [displayPrepareBatch, setDisplayPrepareBatch] = useState<1 | 2>(1);
    const [prepareActionLocked, setPrepareActionLocked] = useState(false);
    const [soundMuted, setSoundMutedState] = useState(() => isSoundMuted());
    useEffect(() => {
        setSoundScope(uid);
        setSoundMutedState(isSoundMuted());
    }, [uid]);
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
    const winnerName = useMemo(() => {
        if (!winnerUid) return '';
        if (winnerUid === 'draw') return 'DRAW';
        if (winnerUid === game.player1.user.uid) return game.player1.user.displayName || game.player1.user.email;
        if (winnerUid === game.player2.user.uid) return game.player2.user.displayName || game.player2.user.email;
        return winnerUid;
    }, [game.player1.user.displayName, game.player1.user.email, game.player1.user.uid, game.player2.user.displayName, game.player2.user.email, game.player2.user.uid, winnerUid]);

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
        }, 940);

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

    return (
        <main className="mx-auto min-h-screen w-full max-w-[1400px] p-3 pb-6 text-slate-100">
            <header className="mb-3 flex items-center justify-between rounded-2xl border border-white/20 bg-white/10 p-3 backdrop-blur">
                <div>
                    <h1 className="text-lg font-semibold">7 Wonders Duel</h1>
                    <p className="text-xs opacity-80">
                        Tier: {game.tier} · Move: {game.move} · Turn: {isObserver ? 'Observer mode' : isMyTurn ? 'You' : 'Opponent'}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        className="btn-secondary hdrIconBtn"
                        onClick={() => {
                            const next = !soundMuted;
                            setSoundMuted(next);
                            setSoundMutedState(next);
                        }}
                        title={soundMuted ? 'Unmute sounds' : 'Mute sounds'}
                    >
                        {soundMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                        <span className="hdrBtnText">{soundMuted ? 'Muted' : 'Sound'}</span>
                    </button>
                    <button className="btn-secondary hdrIconBtn" onClick={goBackToFeed}>
                        <ArrowLeft className="h-4 w-4" />
                        <span className="hdrBtnText">Feed</span>
                    </button>
                </div>
            </header>

            <section className="mb-3">
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
                    highlightScience={!!game.wonByArt && winnerUid === topPlayer.user.uid}
                    isCurrentTurn={game.turn === topPlayer.user.uid}
                    showPreparePlaceholders={game.tier === 'prepare'}
                />
            </section>

            {winnerUid ? (
                <section className="mb-3 rounded-2xl border border-cyan-200/30 bg-cyan-500/10 p-4 backdrop-blur">
                    <h2 className="text-xl font-semibold">Game over</h2>
                    <p className="text-sm">Winner: {winnerName}</p>
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
                                <p className="mb-1 font-semibold">
                                    {game.player1.user.displayName || game.player1.user.email || 'Player 1'}
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
                                <p className="mb-1 font-semibold">
                                    {game.player2.user.displayName || game.player2.user.email || 'Player 2'}
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

            <section className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur">
                <div className="flex items-start justify-center gap-2">
                    <div className="shrink-0">
                        {game.tier === 'prepare' ? (
                            <>
                                <h2 className="mb-2 text-sm font-semibold">
                                    Pick wonders {isMyTurn ? '(your turn)' : '(opponent picks)'}
                                </h2>
                                <div className="dg-wondersPick">
                                    {prepareWonderSlots.map((wonder, index) => (
                                        <DuelWonderSprite
                                            key={wonder ? wonder.id : `prepare-placeholder-${index}`}
                                            card={wonder ?? undefined}
                                            showFront={!!wonder && !wonder.taken && prepareRevealedIds.includes(wonder.id)}
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
                            </>
                        ) : (
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
                        )}
                    </div>
                    <div className="shrink-0">
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
            </section>

            <section className="mt-3 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur">
                {game.chooseWhoWillStart && isMyTurn ? (
                    <div className="flex flex-wrap items-center gap-2">
                        <button className="btn-primary" onClick={() => chooseWhoStarts(game.player1.user.uid)}>
                            {game.player1.user.displayName || 'Player 1'}
                        </button>
                        <span className="text-sm opacity-80">Who starts the next age?</span>
                        <button className="btn-primary" onClick={() => chooseWhoStarts(game.player2.user.uid)}>
                            {game.player2.user.displayName || 'Player 2'}
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-wrap items-center gap-2">
                        {isObserver ? (
                            <span className="rounded-md border border-cyan-300/40 bg-cyan-500/15 px-2 py-1 text-xs">
                                Observer mode: read-only game view
                            </span>
                        ) : null}
                        <button className="btn-primary" disabled={!canBuySelectedCard} onClick={buySelectedCard}>
                            {canBuySelectedCard ? <Hand className="h-4 w-4" /> : <Ban className="h-4 w-4" />}
                            Buy {canBuyTierCard > -1 ? `(${canBuyTierCard})` : ''}
                        </button>
                        <button className="btn-secondary" disabled={!isMyTurn || !game.selectedCard} onClick={sellSelectedCard}>
                            Sell
                        </button>
                        <button
                            className={`btn-secondary ${!hasBuildableWonder ? '!bg-red-600/40 !text-red-100' : ''}`}
                            disabled={!hasBuildableWonder}
                            onClick={() => setWonderBuildMode((prev) => !prev)}
                        >
                            {wonderBuildMode ? 'Select wonder...' : 'Build wonder'}
                        </button>
                        {isMyTurn && game.pickCoinOfThree === uid && (
                            <>
                                {game.theRestOfCoins.slice(0, 3).map((coin) => (
                                    <button
                                        key={`pick3-${coin}`}
                                        className="btn-secondary"
                                        onClick={() => pickCoinOfThree(coin)}
                                    >
                                        Pick 1/3: {coin}
                                    </button>
                                ))}
                            </>
                        )}
                        {isMyTurn && game.pickCardFromGraveyard === uid && (
                            <span className="rounded-md border border-emerald-300/50 bg-emerald-500/20 px-2 py-1 text-xs">
                                Select card from graveyard
                            </span>
                        )}
                        {isMyTurn && (game.destroyBrown === uid || game.destroyGrey === uid) && (
                            <span className="rounded-md border border-amber-300/50 bg-amber-500/20 px-2 py-1 text-xs">
                                Destroy enemy {game.destroyBrown === uid ? 'brown' : 'grey'} card
                            </span>
                        )}
                        <button className="btn-secondary" disabled={isObserver} onClick={surrender}>
                            <ShieldAlert className="h-4 w-4" /> Surrender
                        </button>
                        <span className="text-xs opacity-80">
                            {isObserver ? 'Watching live game' : isMyTurn ? 'Your move' : "Opponent's move"}
                        </span>
                    </div>
                )}
            </section>

            <section className="mt-3 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur">
                <h3 className="mb-2 text-sm font-semibold">Graveyard</h3>
                <div
                    className={`flex max-h-44 flex-wrap gap-2 overflow-y-auto rounded-lg bg-black/20 p-2 ${
                        isMyTurn && game.pickCardFromGraveyard === uid ? 'ring-2 ring-emerald-300/60' : ''
                    }`}
                >
                    {game.graveyard.map((card, idx) => (
                        <DuelSpriteCard
                            key={`grave-${card.id}-${idx}`}
                            card={card}
                            x={0}
                            y={0}
                            compact
                            disabled={!(isMyTurn && game.pickCardFromGraveyard === uid)}
                            onClick={() => pickCardFromGraveyard(card)}
                        />
                    ))}
                    {!game.graveyard.length && <span className="text-xs opacity-70">empty</span>}
                </div>
            </section>

            <section className="mt-3">
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
                    highlightScience={!!game.wonByArt && winnerUid === bottomPlayer.user.uid}
                    isCurrentTurn={game.turn === bottomPlayer.user.uid}
                    showPreparePlaceholders={game.tier === 'prepare'}
                />
            </section>
        </main>
    );
}
