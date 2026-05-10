import clsx from 'clsx';
import type { IGameDuelCard, IGameDuelWonderCard } from '@/interfaces/GameDuel';
import { ResourceIcon } from './ResourceIcon';

type Props = {
    card: IGameDuelCard | IGameDuelWonderCard;
    selected?: boolean;
    disabled?: boolean;
    onClick?: () => void;
};

const colorClass: Record<string, string> = {
    brown: 'from-amber-700/80 to-amber-900/80',
    grey: 'from-slate-500/80 to-slate-700/80',
    yellow: 'from-yellow-500/80 to-yellow-700/80',
    red: 'from-red-500/80 to-red-700/80',
    green: 'from-emerald-500/80 to-emerald-700/80',
    blue: 'from-blue-500/80 to-blue-700/80',
    purple: 'from-purple-500/80 to-purple-700/80'
};

export function Card({ card, selected, disabled, onClick }: Props) {
    const duelCard = card as IGameDuelCard;
    const label = 'tier' in duelCard ? `${duelCard.tier}-${duelCard.idImg}` : `Wonder ${card.id}`;

    return (
        <button
            type="button"
            disabled={disabled}
            onClick={onClick}
            className={clsx(
                'w-full rounded-xl border border-white/20 bg-gradient-to-br p-2 text-left text-xs text-white shadow transition',
                selected ? 'ring-2 ring-cyan-300' : 'hover:scale-[1.01]',
                disabled ? 'cursor-not-allowed opacity-50' : '',
                colorClass[(duelCard as IGameDuelCard).color] ?? 'from-indigo-500/80 to-indigo-700/80'
            )}
        >
            <div className="mb-1 flex items-center justify-between">
                <span className="font-semibold">{label}</span>
                {'taken' in card && <span className="text-[10px] uppercase opacity-80">{card.taken}</span>}
            </div>
            <div className="flex flex-wrap gap-1">
                {'power' in card &&
                    card.power.map((power, index) => (
                        <span key={`${power}-${index}`} className="inline-flex items-center gap-1 rounded bg-black/20 px-1 py-0.5">
                            <ResourceIcon type={power} />
                            <span>{card.valuePower[index]}</span>
                        </span>
                    ))}
            </div>
        </button>
    );
}
