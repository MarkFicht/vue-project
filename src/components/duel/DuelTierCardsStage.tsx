import { useEffect, useRef, useState } from 'react';
import { DuelSpriteCard } from '@/components/duel/DuelSpriteCard';
import {
    playCardFlightAnimation,
    type FlightFallbackPlacement,
    type FlightTargetSelection,
    type FlightVisualMode
} from '@/components/duel/duelCardFlight';
import { showPrice } from '@/helpers/GameDuelHelpers';
import type { IGameDuelCard, IGameDuelPlayer, Tier } from '@/interfaces/GameDuel';

type DuelTierCardsStageProps = {
    tier: Tier;
    tierCards: IGameDuelCard[];
    graveyard: IGameDuelCard[];
    tierLayout: { x: number[]; y: number[] };
    selectedCardId?: number;
    topPlayer: IGameDuelPlayer;
    bottomPlayer: IGameDuelPlayer;
    onSelectTierCard: (card: IGameDuelCard) => void;
};
const PLAYER_COLORS: Array<keyof IGameDuelPlayer['cards']> = ['brown', 'grey', 'yellow', 'blue', 'red', 'green', 'purple'];

const getCardKey = (card: IGameDuelCard, index: number) => `${card.tier}-${card.id ?? `img-${card.idImg}`}-${index}`;
const getCardSignature = (card: IGameDuelCard) => `${card.id ?? 'x'}-${card.tier}-${card.idImg}-${card.color}`;

const buildPlayerCardCounts = (player: IGameDuelPlayer) => {
    const counts: Record<string, number> = {};
    PLAYER_COLORS.forEach((color) => {
        player.cards[color].forEach((card) => {
            const signature = getCardSignature(card);
            counts[signature] = (counts[signature] ?? 0) + 1;
        });
    });
    return counts;
};

const isSameCard = (a: IGameDuelCard, b: IGameDuelCard) => {
    if (a.id !== undefined && b.id !== undefined) return a.id === b.id;
    return a.idImg === b.idImg && a.tier === b.tier;
};

const resolveCardOwnerUid = (card: IGameDuelCard, topPlayer: IGameDuelPlayer, bottomPlayer: IGameDuelPlayer) => {
    const inTop = topPlayer.cards[card.color]?.some((candidate) => isSameCard(candidate, card));
    if (inTop) return topPlayer.user.uid;
    const inBottom = bottomPlayer.cards[card.color]?.some((candidate) => isSameCard(candidate, card));
    if (inBottom) return bottomPlayer.user.uid;
    return null;
};

type PlayerCardCounts = Record<string, number>;
type FlightTargetResolution = {
    targetEl: HTMLElement;
    fallbackPlacement: FlightFallbackPlacement;
    targetSelection: FlightTargetSelection;
    visualMode: FlightVisualMode;
};

const resolveOwnerUidByDelta = (
    card: IGameDuelCard,
    currentTopCounts: PlayerCardCounts,
    currentBottomCounts: PlayerCardCounts,
    previousTopCounts: PlayerCardCounts,
    previousBottomCounts: PlayerCardCounts,
    topUid: string,
    bottomUid: string
) => {
    const signature = getCardSignature(card);
    const topDelta = (currentTopCounts[signature] ?? 0) - (previousTopCounts[signature] ?? 0);
    const bottomDelta = (currentBottomCounts[signature] ?? 0) - (previousBottomCounts[signature] ?? 0);
    if (topDelta > bottomDelta && topDelta > 0) return topUid;
    if (bottomDelta > topDelta && bottomDelta > 0) return bottomUid;
    return null;
};

const resolveFlightTarget = ({
    card,
    topPlayer,
    bottomPlayer,
    currentTopCounts,
    currentBottomCounts,
    previousTopCounts,
    previousBottomCounts,
    graveyardLength,
    previousGraveyardLength,
    previousWonderActivationByKey
}: {
    card: IGameDuelCard;
    topPlayer: IGameDuelPlayer;
    bottomPlayer: IGameDuelPlayer;
    currentTopCounts: PlayerCardCounts;
    currentBottomCounts: PlayerCardCounts;
    previousTopCounts: PlayerCardCounts;
    previousBottomCounts: PlayerCardCounts;
    graveyardLength: number;
    previousGraveyardLength: number;
    previousWonderActivationByKey: Record<string, string>;
}): FlightTargetResolution | null => {
    if (card.taken === 'inPlayerBoard') {
        const ownerUid =
            resolveCardOwnerUid(card, topPlayer, bottomPlayer) ??
            resolveOwnerUidByDelta(
                card,
                currentTopCounts,
                currentBottomCounts,
                previousTopCounts,
                previousBottomCounts,
                topPlayer.user.uid,
                bottomPlayer.user.uid
            );
        if (!ownerUid) return null;

        const targetEl = document.getElementById(`dg-deck-col-${ownerUid}-${card.color}`);
        if (!targetEl) return null;
        return {
            targetEl,
            fallbackPlacement: 'below-last',
            targetSelection: 'match-card',
            visualMode: 'header-shrink'
        };
    }

    if (card.taken === 'graveyard') {
        if (graveyardLength <= previousGraveyardLength) return null;
        const targetEl = document.getElementById(`dg-grave-card-${graveyardLength - 1}`);
        if (!targetEl) return null;
        return {
            targetEl,
            fallbackPlacement: 'same-spot',
            targetSelection: 'last-slot',
            visualMode: 'header-shrink'
        };
    }

    if (card.taken === 'inWonder') {
        const activatedWonders = [...topPlayer.wonderCards, ...bottomPlayer.wonderCards].filter(
            (wonder) => wonder.activated !== 'none'
        );
        const newlyActivatedWonder = activatedWonders.find((wonder) => {
            const wonderKey = `w-${wonder.id}`;
            return previousWonderActivationByKey[wonderKey] === 'none';
        });
        if (!newlyActivatedWonder) return null;

        const wonderOwnerUid = topPlayer.wonderCards.some((wonder) => wonder.id === newlyActivatedWonder.id)
            ? topPlayer.user.uid
            : bottomPlayer.user.uid;
        const targetEl = document.querySelector<HTMLElement>(
            `#dg-wonder-${wonderOwnerUid}-${newlyActivatedWonder.id} .dg-tierCardForWonder`
        );
        if (!targetEl) return null;
        return {
            targetEl,
            fallbackPlacement: 'same-spot',
            targetSelection: 'none',
            visualMode: 'flip-to-back'
        };
    }

    return null;
};

export function DuelTierCardsStage({
    tier,
    tierCards,
    graveyard,
    tierLayout,
    selectedCardId,
    topPlayer,
    bottomPlayer,
    onSelectTierCard
}: DuelTierCardsStageProps) {
    const previousTakenByCardRef = useRef<Record<string, IGameDuelCard['taken']>>({});
    const [hiddenSourceCardKeys, setHiddenSourceCardKeys] = useState<Set<string>>(
        () =>
            new Set(
                tierCards
                    .map((card, index) => ({ card, index }))
                    .filter(({ card }) => card.taken === 'inPlayerBoard' || card.taken === 'graveyard' || card.taken === 'inWonder')
                    .map(({ card, index }) => getCardKey(card, index))
            )
    );
    const previousPlayerCardCountsRef = useRef<{
        topUid: string;
        bottomUid: string;
        topCounts: Record<string, number>;
        bottomCounts: Record<string, number>;
    }>({
        topUid: '',
        bottomUid: '',
        topCounts: {},
        bottomCounts: {}
    });
    const previousGraveyardLengthRef = useRef(graveyard.length);
    const previousWonderActivationByKeyRef = useRef<Record<string, string>>({});

    useEffect(() => {
        const existingKeys = new Set(tierCards.map((card, index) => getCardKey(card, index)));
        setHiddenSourceCardKeys((prev) => {
            let changed = false;
            const next = new Set<string>();
            prev.forEach((key) => {
                if (existingKeys.has(key)) {
                    next.add(key);
                } else {
                    changed = true;
                }
            });
            return changed ? next : prev;
        });
    }, [tierCards]);

    useEffect(() => {
        const nextTakenByCard: Record<string, IGameDuelCard['taken']> = {};
        const currentTopCounts = buildPlayerCardCounts(topPlayer);
        const currentBottomCounts = buildPlayerCardCounts(bottomPlayer);
        const previousCounts = previousPlayerCardCountsRef.current;
        const hasSamePlayers =
            previousCounts.topUid === topPlayer.user.uid && previousCounts.bottomUid === bottomPlayer.user.uid;
        const previousTopCounts = hasSamePlayers ? previousCounts.topCounts : {};
        const previousBottomCounts = hasSamePlayers ? previousCounts.bottomCounts : {};
        const retryTransition = (cardKey: string, previousTaken: IGameDuelCard['taken']) => {
            nextTakenByCard[cardKey] = previousTaken;
        };

        tierCards.forEach((card, index) => {
            const cardKey = getCardKey(card, index);
            const previousTaken = previousTakenByCardRef.current[cardKey];
            nextTakenByCard[cardKey] = card.taken;
            if (
                previousTaken !== 'inGame' ||
                (card.taken !== 'inPlayerBoard' && card.taken !== 'graveyard' && card.taken !== 'inWonder')
            )
                return;

            const sourceEl = document.getElementById(`dg-tier-card-${cardKey}`);
            if (!sourceEl) {
                retryTransition(cardKey, previousTaken);
                return;
            }

            const resolvedTarget = resolveFlightTarget({
                card,
                topPlayer,
                bottomPlayer,
                currentTopCounts,
                currentBottomCounts,
                previousTopCounts,
                previousBottomCounts,
                graveyardLength: graveyard.length,
                previousGraveyardLength: previousGraveyardLengthRef.current,
                previousWonderActivationByKey: previousWonderActivationByKeyRef.current
            });
            if (!resolvedTarget) {
                retryTransition(cardKey, previousTaken);
                return;
            }

            setHiddenSourceCardKeys((prev) => {
                if (prev.has(cardKey)) return prev;
                const next = new Set(prev);
                next.add(cardKey);
                return next;
            });
            playCardFlightAnimation({
                sourceEl,
                targetEl: resolvedTarget.targetEl,
                card,
                fallbackPlacement: resolvedTarget.fallbackPlacement,
                targetSelection: resolvedTarget.targetSelection,
                visualMode: resolvedTarget.visualMode
            });
        });
        previousTakenByCardRef.current = nextTakenByCard;
        previousPlayerCardCountsRef.current = {
            topUid: topPlayer.user.uid,
            bottomUid: bottomPlayer.user.uid,
            topCounts: currentTopCounts,
            bottomCounts: currentBottomCounts
        };
        previousGraveyardLengthRef.current = graveyard.length;
        previousWonderActivationByKeyRef.current = [...topPlayer.wonderCards, ...bottomPlayer.wonderCards].reduce<
            Record<string, string>
        >((acc, wonder) => {
            acc[`w-${wonder.id}`] = wonder.activated;
            return acc;
        }, {});
    }, [bottomPlayer, graveyard, tierCards, topPlayer]);

    return (
        <div className={`dg-cardBoardShell ${tier === 'III' ? 'dg-cardBoardShell--tall' : 'dg-cardBoardShell--compact'}`}>
            <div className="dg-epochCardsTransform">
                <div className="dg-cardBoard">
                    {tierCards.map((card, index) => {
                        const cardKey = getCardKey(card, index);
                        return (
                        <DuelSpriteCard
                            key={cardKey}
                            domId={`dg-tier-card-${cardKey}`}
                            wrapperClassName={hiddenSourceCardKeys.has(cardKey) ? 'dg-inPlayerBoardSource' : undefined}
                            card={card}
                            x={tierLayout.x[index]}
                            y={tierLayout.y[index]}
                            selected={selectedCardId === card.id}
                            cash1P={(card.coversBy?.length ?? 0) === 0 ? showPrice(card, topPlayer, bottomPlayer) : -1}
                            cash2P={(card.coversBy?.length ?? 0) === 0 ? showPrice(card, bottomPlayer, topPlayer) : -1}
                            res1P={topPlayer.resources.cash}
                            res2P={bottomPlayer.resources.cash}
                            onClick={() => onSelectTierCard(card)}
                        />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
