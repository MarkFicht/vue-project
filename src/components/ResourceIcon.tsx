import type { ReactNode } from 'react';
import { Gem, Hammer, FlaskConical, Trees, BrickWall, Coins, Sword, Crown } from 'lucide-react';

const iconMap: Record<string, ReactNode> = {
    wood: <Trees className="h-4 w-4" />,
    brick: <BrickWall className="h-4 w-4" />,
    clay: <Hammer className="h-4 w-4" />,
    paper: <FlaskConical className="h-4 w-4" />,
    glass: <Gem className="h-4 w-4" />,
    cash: <Coins className="h-4 w-4" />,
    attack: <Sword className="h-4 w-4" />,
    points: <Crown className="h-4 w-4" />
};

export function ResourceIcon({ type }: { type: string }) {
    return (
        <span className="inline-flex items-center justify-center rounded-md bg-white/10 p-1 text-slate-100">
            {iconMap[type] ?? <span className="text-xs">{type}</span>}
        </span>
    );
}
