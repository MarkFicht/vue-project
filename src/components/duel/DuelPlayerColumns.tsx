import { useEffect, useMemo, useState } from 'react';
import type { IGameDuelPlayer, IGameDuelCard } from '@/interfaces/GameDuel';
import { UserFlag } from '@/components/UserFlag';
import { DuelSpriteCard } from './DuelSpriteCard';
import { DuelCoinSprite } from './DuelCoinSprite';
import { DuelWonderSprite } from './DuelWonderSprite';
import { countArtefactsForPlayer, countTotalPoints, showPrice } from '@/helpers/GameDuelHelpers';

const COLORS: Array<keyof IGameDuelPlayer['cards']> = ['brown', 'grey', 'yellow', 'blue', 'red', 'green', 'purple'];

export function DuelPlayerColumns({
    player,
    enemy,
    boardPawn,
    isPlayerOne,
    isCurrentTurn,
    canSelectWonder,
    affordableWonderIds,
    selectedWonderId,
    onSelectWonder,
    destroyMode,
    isDestroyTarget,
    onDestroyCard,
    pulseScienceVictory,
    showPreparePlaceholders
}: {
    player: IGameDuelPlayer;
    enemy: IGameDuelPlayer;
    boardPawn: number;
    isPlayerOne: boolean;
    isCurrentTurn: boolean;
    canSelectWonder?: boolean;
    affordableWonderIds?: number[];
    selectedWonderId?: number;
    onSelectWonder?: (wonderId: number) => void;
    destroyMode?: 'brown' | 'grey' | null;
    isDestroyTarget?: boolean;
    onDestroyCard?: (card: IGameDuelCard, color: 'brown' | 'grey') => void;
    /** Blink border on each green card + artefact7 coin after scientific victory. */
    pulseScienceVictory?: boolean;
    showPreparePlaceholders?: boolean;
}) {
    const totalPoints = countTotalPoints(player, enemy, boardPawn, isPlayerOne, {
        includeCashReserveVp: false
    });
    const wonderOrder = useMemo(
        () =>
            player.wonderCards.reduce<Record<number, number>>((acc, wonder, index) => {
                acc[wonder.id] = index;
                return acc;
            }, {}),
        [player.wonderCards]
    );
    const [revealedWonderIds, setRevealedWonderIds] = useState<number[]>([]);

    useEffect(() => {
        const currentIds = player.wonderCards.map((wonder) => wonder.id);
        setRevealedWonderIds((prev) => prev.filter((id) => currentIds.includes(id)));
    }, [player.wonderCards]);

    useEffect(() => {
        const pending = player.wonderCards
            .filter((wonder) => !revealedWonderIds.includes(wonder.id))
            .sort((a, b) => (wonderOrder[a.id] ?? 0) - (wonderOrder[b.id] ?? 0));
        if (!pending.length) return;

        const timers = pending.map((wonder) =>
            window.setTimeout(() => {
                setRevealedWonderIds((prev) => (prev.includes(wonder.id) ? prev : [...prev, wonder.id]));
            }, 0)
        );
        return () => timers.forEach((timer) => window.clearTimeout(timer));
    }, [player.wonderCards, revealedWonderIds, wonderOrder]);

    const wonderSlots = useMemo(() => {
        if (!showPreparePlaceholders) return player.wonderCards;
        const placeholdersNeeded = Math.max(0, 4 - player.wonderCards.length);
        return [...player.wonderCards, ...Array(placeholdersNeeded).fill(null)] as Array<typeof player.wonderCards[number] | null>;
    }, [player.wonderCards, showPreparePlaceholders]);

    return (
        <section className="dg-playerArea">
            <header className="dg-playerHeader">
                <div className="inline-flex items-center gap-1.5 font-semibold">
                    <UserFlag code={player.user.countryCode} className="text-base" />
                    <span>{player.user.displayName || player.user.email}</span>
                </div>
                <div className="text-xs opacity-80">{isCurrentTurn ? 'Your turn' : 'Waiting'}</div>
                <div className="dg-playerTotals">
                    <span className="cashSum dg-totalCash">{player.resources.cash}</span>
                    <span className="cashSum dg-totalPoints">{totalPoints}</span>
                </div>
            </header>
            <div className="dg-playerWonders">
                {wonderSlots.map((wonder, index) => {
                    const canAfford = wonder ? affordableWonderIds?.includes(wonder.id) ?? false : false;
                    if (!wonder) {
                        return (
                            <DuelWonderSprite
                                key={`${player.user.uid}-w-placeholder-${index}`}
                                disabled
                                showFront={false}
                                flipDelayMs={0}
                            />
                        );
                    }
                    return (
                    <DuelWonderSprite
                        key={`${player.user.uid}-w-${wonder.id}`}
                        card={wonder}
                        cash={showPrice(wonder, player, enemy)}
                        resCash={player.resources.cash}
                        selected={selectedWonderId === wonder.id}
                        disabled={!canSelectWonder || wonder.activated !== 'none' || !canAfford}
                        flipDelayMs={0}
                        showFront={revealedWonderIds.includes(wonder.id)}
                        onClick={() => onSelectWonder?.(wonder.id)}
                    />
                    );
                })}
            </div>
            <div className="dg-playerColumnsScroller">
                <div className="dg-columns">
                {COLORS.map((colorKey) => {
                    const cards = [...(player.cards[colorKey] as IGameDuelCard[])];
                    if (colorKey === 'green') cards.sort((a, b) => a.valuePower[0] - b.valuePower[0]);
                    const scienceProgress =
                        colorKey === 'green' ? countArtefactsForPlayer(player) : null;
                    const isDestroyColumn =
                        isDestroyTarget && (colorKey === 'brown' || colorKey === 'grey') && destroyMode === colorKey;
                    return (
                        <div
                            key={`${player.user.uid}-${colorKey}`}
                            id={`dg-deck-col-${player.user.uid}-${colorKey}`}
                            className={`dg-column dg-column-${colorKey}`}
                        >
                            {scienceProgress !== null && (
                                <div
                                    className={[
                                        'dg-artCount',
                                        scienceProgress >= 6 ? 'dg-artCount--complete' : ''
                                    ]
                                        .filter(Boolean)
                                        .join(' ')}
                                    title="Count: distinct symbols on green cards in your city, plus one if you earned the artefact/science-wheel progress coin. Six total wins scientifically."
                                    aria-label={`Distinct science symbols toward victory ${scienceProgress} of six, counting the artefact wheel progress coin if you have it`}
                                >
                                    {scienceProgress}/6
                                </div>
                            )}
                            {cards.map((card, idx) => (
                                <DuelSpriteCard
                                    key={`${card.id ?? card.idImg}-${idx}`}
                                    card={card}
                                    x={0}
                                    y={0}
                                    compact
                                    wrapperClassName={
                                        [
                                            isDestroyColumn ? 'dg-destroyCardTarget' : '',
                                            pulseScienceVictory && colorKey === 'green'
                                                ? 'dg-scienceVictoryPulse'
                                                : ''
                                        ]
                                            .filter(Boolean)
                                            .join(' ') || undefined
                                    }
                                    disabled={!isDestroyColumn}
                                    onClick={() =>
                                        isDestroyColumn
                                            ? onDestroyCard?.(card, colorKey as 'brown' | 'grey')
                                            : undefined
                                    }
                                />
                            ))}
                        </div>
                    );
                })}
                </div>
            </div>
            <div className="dg-playerCoinsBox">
                <div className="dg-playerCoinsLabel">Progress coins</div>
                <div className="dg-playerCoins">
                    {player.resources.coins.map((coin, idx) => (
                        <DuelCoinSprite
                            key={`${coin}-${idx}`}
                            coin={coin}
                            disabled
                            scienceVictoryPulse={pulseScienceVictory && coin === 'artefact7'}
                        />
                    ))}
                    {!player.resources.coins.length && <span className="text-xs opacity-60">none</span>}
                </div>
            </div>
        </section>
    );
}
