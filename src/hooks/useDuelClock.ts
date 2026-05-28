import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { serverTimestamp, updateDoc } from 'firebase/firestore';
import { tableGameDuelRef } from '@/firebase/refs';
import {
    buildTurnClockPatch,
    clockFromGame,
    computeTurnTimer,
    hasDuelWinner,
    isTurnTimedOut,
    otherPlayerUid,
    turnChipFor,
    type DuelWinnerFields
} from '@/utils/duelTurnClock';
import { playUiSound } from '@/utils/sound';

type DuelClockGame = DuelWinnerFields & {
    turn: string;
    turnStartedAtMs: number | null;
    player1: { user: { uid: string } };
    player2: { user: { uid: string } };
    player1ClockMs?: number;
    player2ClockMs?: number;
};

export function useDuelClock(
    game: DuelClockGame,
    uid: string,
    { isObserver, isMyTurn, opponentUid }: { isObserver: boolean; isMyTurn: boolean; opponentUid: string }
) {
    const clock = useMemo(
        () => clockFromGame(game),
        [game.turn, game.turnStartedAtMs, game.player1.user.uid, game.player2.user.uid, game.player1ClockMs, game.player2ClockMs]
    );
    const [nowMs, setNowMs] = useState(() => Date.now());
    const lastTickSecondRef = useRef<number | null>(null);
    const hasWinner = hasDuelWinner(game);
    const turnTimer = useMemo(() => computeTurnTimer(clock, nowMs, hasWinner), [clock, hasWinner, nowMs]);

    const patchTurnClock = useCallback(
        (nextTurnUid: string) => buildTurnClockPatch(clock, nextTurnUid, serverTimestamp()),
        [clock]
    );

    const canKickTimedOut =
        !!game.turn &&
        turnTimer.expired &&
        !hasWinner &&
        (isObserver || (!isMyTurn && game.turn === opponentUid));

    const kickTimedOutOpponent = useCallback(async () => {
        if (hasWinner || !game.turn || !isTurnTimedOut(clock)) return;
        const winnerUid = isObserver ? otherPlayerUid(game.turn, clock) : uid;
        if (!winnerUid || winnerUid === game.turn) return;
        if (!isObserver && (isMyTurn || opponentUid !== game.turn)) return;
        await updateDoc(tableGameDuelRef, { wonBySurr: winnerUid });
    }, [clock, game.turn, hasWinner, isMyTurn, isObserver, opponentUid, uid]);

    useEffect(() => {
        const timer = window.setInterval(() => setNowMs(Date.now()), 250);
        return () => window.clearInterval(timer);
    }, []);

    useEffect(() => {
        if (game.turn !== uid) return;
        if (turnTimer.expired) {
            playUiSound('timerTick');
            const timer = window.setInterval(() => playUiSound('timerTick'), 1000);
            return () => window.clearInterval(timer);
        }
        if (turnTimer.secondsLeft > 10 || turnTimer.secondsLeft <= 0) {
            lastTickSecondRef.current = null;
            return;
        }
        if (lastTickSecondRef.current === turnTimer.secondsLeft) return;
        lastTickSecondRef.current = turnTimer.secondsLeft;
        playUiSound('timerTick');
    }, [game.turn, turnTimer.expired, turnTimer.secondsLeft, uid]);

    const turnChip = (playerUid: string) => turnChipFor(playerUid, clock, turnTimer);

    return {
        patchTurnClock,
        canKickTimedOut,
        kickTimedOutOpponent,
        timeoutKickLabel: isObserver
            ? 'Player time is at 0. You can kick this player.'
            : 'Opponent time is at 0. You can kick this player.',
        turnChip
    };
}
