import type { IGameDuelPlayer } from '@/interfaces/GameDuel';

type Props = {
    player: IGameDuelPlayer;
    current?: boolean;
};

export function PlayerBoard({ player, current }: Props) {
    return (
        <section className="rounded-2xl border border-white/20 bg-white/10 p-4 text-slate-100 backdrop-blur">
            <header className="mb-2 flex items-center justify-between">
                <h3 className="font-semibold">{player.user.displayName || player.user.email}</h3>
                {current && <span className="rounded-full bg-cyan-500/30 px-2 py-1 text-xs">Your turn</span>}
            </header>
            <div className="grid grid-cols-2 gap-2 text-sm">
                <div>Cash: {player.resources.cash}</div>
                <div>Points: {player.points}</div>
                <div>Red: {player.cards.red.length}</div>
                <div>Green: {player.cards.green.length}</div>
                <div>Blue: {player.cards.blue.length}</div>
                <div>Yellow: {player.cards.yellow.length}</div>
                <div>Brown: {player.cards.brown.length}</div>
                <div>Grey: {player.cards.grey.length}</div>
            </div>
        </section>
    );
}
