import type { FieldValue } from 'firebase/firestore';

export const TURN_START_MS = 30000;
export const TURN_INCREMENT_MS = 10000;

export type DuelClockFields = {
    turn: string;
    turnStartedAtMs: number | null;
    player1Uid: string;
    player2Uid: string;
    player1ClockMs?: number;
    player2ClockMs?: number;
};

export type DuelWinnerFields = {
    wonByArt: string;
    wonByAggressive: string;
    wonBySurr: string;
    wonByPoints: string;
};

export type TurnTimerState = { turnUid: string; secondsLeft: number; expired: boolean };

const hasBank = (ms?: number | null): ms is number => typeof ms === 'number' && Number.isFinite(ms);

const bankMs = (uid: string, c: DuelClockFields) =>
    uid === c.player1Uid ? c.player1ClockMs : uid === c.player2Uid ? c.player2ClockMs : undefined;

const activeMsForUid = (uid: string, c: DuelClockFields) => {
    const bank = bankMs(uid, c);
    return hasBank(bank) ? Math.max(0, bank) : TURN_START_MS;
};

export const hasDuelWinner = (g: DuelWinnerFields) =>
    !!(g.wonByArt || g.wonByAggressive || g.wonBySurr || g.wonByPoints);

export const clockFromGame = (g: {
    turn: string;
    turnStartedAtMs: number | null;
    player1: { user: { uid: string } };
    player2: { user: { uid: string } };
    player1ClockMs?: number;
    player2ClockMs?: number;
}) => ({
    turn: g.turn,
    turnStartedAtMs: g.turnStartedAtMs,
    player1Uid: g.player1.user.uid,
    player2Uid: g.player2.user.uid,
    player1ClockMs: g.player1ClockMs,
    player2ClockMs: g.player2ClockMs
});

export const activeClockMs = (c: DuelClockFields) => activeMsForUid(c.turn, c);

export const previewClockMs = (uid: string, c: DuelClockFields) =>
    hasBank(bankMs(uid, c)) ? activeMsForUid(uid, c) + TURN_INCREMENT_MS : TURN_START_MS;

export const isTurnTimedOut = (c: DuelClockFields) =>
    !!c.turnStartedAtMs && Date.now() - c.turnStartedAtMs >= activeClockMs(c);

export const otherPlayerUid = (uid: string, c: Pick<DuelClockFields, 'player1Uid' | 'player2Uid'>) =>
    uid === c.player1Uid ? c.player2Uid : c.player1Uid;

export const computeTurnTimer = (c: DuelClockFields, nowMs: number, hasWinner: boolean): TurnTimerState => {
    const turnUid = c.turn || '';
    const activeMs = activeClockMs(c);
    const fallbackSeconds = Math.ceil(activeMs / 1000);
    if (!turnUid || hasWinner || !c.turnStartedAtMs) {
        return { turnUid, secondsLeft: fallbackSeconds, expired: false };
    }
    const remainingMs = Math.max(0, activeMs - Math.max(0, nowMs - c.turnStartedAtMs));
    return { turnUid, secondsLeft: Math.ceil(remainingMs / 1000), expired: remainingMs <= 0 };
};

export const turnChipFor = (uid: string, c: DuelClockFields, timer: TurnTimerState) => {
    const seconds = uid === timer.turnUid ? timer.secondsLeft : Math.ceil(previewClockMs(uid, c) / 1000);
    return { seconds, danger: uid === c.turn && seconds <= 10 };
};

export const buildTurnClockPatch = (c: DuelClockFields, nextTurnUid: string, turnStartedAt: FieldValue) => {
    const elapsedMs = c.turnStartedAtMs ? Math.max(0, Date.now() - c.turnStartedAtMs) : 0;
    const patch: { turnStartedAt: FieldValue; player1ClockMs?: number; player2ClockMs?: number } = {
        turnStartedAt
    };

    for (const [field, uid, bank] of [
        ['player1ClockMs', c.player1Uid, c.player1ClockMs],
        ['player2ClockMs', c.player2Uid, c.player2ClockMs]
    ] as const) {
        const isCurrent = c.turn === uid;
        const isNext = nextTurnUid === uid;
        const stored = hasBank(bank) ? Math.max(0, bank) : null;
        const settled = isCurrent ? Math.max(0, activeMsForUid(uid, c) - elapsedMs) : stored;
        const hadTurn = stored !== null || isCurrent;

        if (isNext) patch[field] = hadTurn ? (settled ?? 0) + TURN_INCREMENT_MS : TURN_START_MS;
        else if (typeof settled === 'number') patch[field] = settled;
    }

    return patch;
};
