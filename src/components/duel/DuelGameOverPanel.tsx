import { UserFlag } from '@/components/UserFlag';
import type { IGameDuelPlayer } from '@/interfaces/GameDuel';

type PointBreakdown = {
    cards: number;
    guild: number;
    coins: number;
    military: number;
    total: number;
};

function VictoryPointsCard({
    player,
    points,
    animatedTotal,
    winnerUid,
    highlightMilitary
}: {
    player: IGameDuelPlayer;
    points: PointBreakdown;
    animatedTotal: number;
    winnerUid: string;
    highlightMilitary: boolean;
}) {
    return (
        <div className="rounded-lg bg-black/20 p-3 text-sm">
            <p className="mb-1 inline-flex items-center gap-1.5 font-semibold">
                <UserFlag code={player.user.countryCode} className="text-base" />
                <span>{player.user.displayName || player.user.email || 'Player'}</span>
            </p>
            <p>Cards/Wonders: {points.cards}</p>
            <p>Guilds: {points.guild}</p>
            <p>Coins: {points.coins}</p>
            <p className={`rounded px-1 ${highlightMilitary ? 'dg-endFocus dg-endFocusMilitary' : ''}`}>
                Military: {points.military}
            </p>
            <p className="mt-1 font-semibold">
                <span className={winnerUid === player.user.uid ? 'dg-endFocus dg-endFocusPoints rounded px-1' : ''}>
                    Total: {animatedTotal}
                </span>
            </p>
        </div>
    );
}

type DuelGameOverPanelProps = {
    winnerUid: string;
    winnerName: string;
    winnerCountryCode?: string;
    victoryReason: string;
    wonByAggressive: boolean;
    wonByArt: boolean;
    wonByPoints: boolean;
    player1: IGameDuelPlayer;
    player2: IGameDuelPlayer;
    pointBreakdown: { p1: PointBreakdown; p2: PointBreakdown };
    animatedP1Total: number;
    animatedP2Total: number;
};

export function DuelGameOverPanel({
    winnerUid,
    winnerName,
    winnerCountryCode,
    victoryReason,
    wonByAggressive,
    wonByArt,
    wonByPoints,
    player1,
    player2,
    pointBreakdown,
    animatedP1Total,
    animatedP2Total
}: DuelGameOverPanelProps) {
    if (!winnerUid) return null;

    return (
        <section className="app-surface-callout mb-2 shrink-0 rounded-xl p-3 sm:mb-3 sm:rounded-2xl sm:p-4">
            <h2 className="font-display text-xl font-semibold tracking-wide">Game over</h2>
            <p className="flex flex-wrap items-center gap-2 text-sm">
                <span>Winner:</span>
                <UserFlag code={winnerCountryCode} className="text-lg" />
                <span>{winnerName}</span>
            </p>
            <p className="mt-1 text-xs opacity-90">{victoryReason}</p>
            {wonByAggressive ? (
                <div className="mt-2 inline-flex items-center gap-2 rounded-md bg-black/20 px-2 py-1 text-xs">
                    <span className="dg-endIcon dg-endIconMilitary dg-endFocus dg-endFocusMilitary" />
                    Military domination
                </div>
            ) : null}
            {wonByArt ? (
                <div className="mt-2 inline-flex items-center gap-2 rounded-md bg-black/20 px-2 py-1 text-xs">
                    <span className="dg-endIcon dg-endIconScience dg-endFocus dg-endFocusScience" />
                    Scientific domination
                </div>
            ) : null}
            {wonByPoints ? (
                <div className="mt-3 grid gap-2 md:grid-cols-2">
                    <VictoryPointsCard
                        player={player1}
                        points={pointBreakdown.p1}
                        animatedTotal={animatedP1Total}
                        winnerUid={winnerUid}
                        highlightMilitary={wonByAggressive}
                    />
                    <VictoryPointsCard
                        player={player2}
                        points={pointBreakdown.p2}
                        animatedTotal={animatedP2Total}
                        winnerUid={winnerUid}
                        highlightMilitary={wonByAggressive}
                    />
                </div>
            ) : null}
        </section>
    );
}
