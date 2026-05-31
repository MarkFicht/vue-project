import { useCallback, useEffect, useMemo, useState } from 'react';
import type { IGameDuelWonderCard, Tier } from '@/interfaces/GameDuel';

type UseDuelPreparePhaseParams = {
    tier: Tier;
    wonderCards: IGameDuelWonderCard[];
    isMyTurn: boolean;
    selectWondersForPlayersMove: number;
    chooseWonderForPlayer: (id: number) => Promise<void>;
};

export function useDuelPreparePhase({
    tier,
    wonderCards,
    isMyTurn,
    selectWondersForPlayersMove,
    chooseWonderForPlayer
}: UseDuelPreparePhaseParams) {
    const [prepareRevealedIds, setPrepareRevealedIds] = useState<number[]>([]);
    const [displayPrepareBatch, setDisplayPrepareBatch] = useState<1 | 2>(1);
    const [prepareActionLocked, setPrepareActionLocked] = useState(false);

    const batchOneWonders = useMemo(() => wonderCards.slice(0, 4), [wonderCards]);
    const batchTwoWonders = useMemo(() => wonderCards.slice(4, 8), [wonderCards]);
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

    const handlePrepareWonderPick = useCallback(
        async (wonderId: number) => {
            if (prepareActionLocked) return;
            setPrepareActionLocked(true);
            try {
                await chooseWonderForPlayer(wonderId);
            } finally {
                setPrepareActionLocked(false);
            }
        },
        [chooseWonderForPlayer, prepareActionLocked]
    );

    useEffect(() => {
        if (tier !== 'prepare') {
            setDisplayPrepareBatch(1);
            setPrepareRevealedIds([]);
            setPrepareActionLocked(false);
        }
    }, [tier]);

    useEffect(() => {
        const currentIds = displayedPrepareWonders.map((wonder) => wonder.id);
        setPrepareRevealedIds((prev) => prev.filter((id) => currentIds.includes(id)));
    }, [displayedPrepareWonders]);

    useEffect(() => {
        if (tier !== 'prepare') return;
        if (displayPrepareBatch !== 1) return;
        if (!firstBatchComplete) return;

        const timer = window.setTimeout(() => {
            setDisplayPrepareBatch(2);
            setPrepareRevealedIds([]);
        }, 760);

        return () => window.clearTimeout(timer);
    }, [displayPrepareBatch, firstBatchComplete, tier]);

    useEffect(() => {
        if (tier !== 'prepare') return;
        if (displayPrepareBatch !== 2) return;
        if (firstBatchComplete) return;
        setDisplayPrepareBatch(1);
        setPrepareRevealedIds([]);
    }, [displayPrepareBatch, firstBatchComplete, tier]);

    useEffect(() => {
        if (tier !== 'prepare') return;
        const pending = displayedPrepareWonders.filter((wonder) => !prepareRevealedIds.includes(wonder.id));
        if (!pending.length) return;
        const timers = pending.map((wonder, index) =>
            window.setTimeout(() => {
                setPrepareRevealedIds((prev) => (prev.includes(wonder.id) ? prev : [...prev, wonder.id]));
            }, index * 340)
        );
        return () => timers.forEach((timer) => window.clearTimeout(timer));
    }, [displayedPrepareWonders, tier, prepareRevealedIds]);

    useEffect(() => {
        if (tier !== 'prepare') return;
        if (!isMyTurn) return;
        if (selectWondersForPlayersMove !== 3 && selectWondersForPlayersMove !== 7) return;
        if (selectablePrepareWonders.length !== 1) return;
        if (prepareActionLocked) return;

        const lastWonder = selectablePrepareWonders[0];
        if (!prepareRevealedIds.includes(lastWonder.id)) return;
        const timer = window.setTimeout(() => {
            void handlePrepareWonderPick(lastWonder.id);
        }, 120);

        return () => window.clearTimeout(timer);
    }, [
        handlePrepareWonderPick,
        isMyTurn,
        prepareActionLocked,
        prepareRevealedIds,
        selectablePrepareWonders,
        selectWondersForPlayersMove,
        tier
    ]);

    return {
        prepareRevealedIds,
        prepareActionLocked,
        prepareWonderSlots,
        handlePrepareWonderPick
    };
}
