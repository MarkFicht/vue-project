import type { CSSProperties } from 'react';
import type { IGameDuelCard } from '@/interfaces/GameDuel';

type Props = {
    card: IGameDuelCard;
    x: number;
    y: number;
    compact?: boolean;
    /** Merged onto the outer button wrapper (compact or full layout). */
    wrapperClassName?: string;
    disabled?: boolean;
    selected?: boolean;
    cash1P?: number;
    cash2P?: number;
    res1P?: number;
    res2P?: number;
    onClick?: () => void;
};

export function DuelSpriteCard({
    card,
    x,
    y,
    compact,
    wrapperClassName,
    disabled,
    selected,
    cash1P,
    cash2P,
    res1P,
    res2P,
    onClick
}: Props) {
    const reverseBg =
        card.tier === 'I'
            ? 'calc(var(--width-tier) * -10) calc(var(--height-tier) * -6)'
            : card.tier === 'II'
              ? 'calc(var(--width-tier) * -11) calc(var(--height-tier) * -6)'
              : card.tier === 'III'
                ? '0 calc(var(--height-tier) * -7)'
                : 'calc(var(--width-tier) * -1) calc(var(--height-tier) * -7)';

    const style = {
        '--x': `${x}%`,
        '--y': `${y}%`,
        '--z': `${card.id ?? 0}`,
        '--reversBg': reverseBg
    } as CSSProperties;

    return (
        <button
            type="button"
            className={[
                compact ? 'dg-cardWrapperCompact' : 'dg-cardWrapper',
                wrapperClassName,
                !compact && card.taken === 'inGame' ? '' : '',
                !compact && card.taken !== 'inGame' ? 'dg-invisible' : '',
                !compact && card.coversBy?.length === 0 ? 'dg-canSelect' : '',
                selected ? 'dg-selected' : ''
            ]
                .filter(Boolean)
                .join(' ')}
            style={style}
            onClick={onClick}
            disabled={disabled ?? (compact ? true : card.taken !== 'inGame')}
        >
            <div
                className={[
                    compact ? 'dg-card dg-cardCompact' : 'dg-card',
                    `dg-card${card.idImg}`,
                    card.hide && (card.coversBy?.length ?? 0) !== 0 ? 'dg-hideCard' : ''
                ]
                    .filter(Boolean)
                    .join(' ')}
            >
                {card.taken === 'inGame' && cash1P !== undefined && cash1P >= 0 && (
                    <div className={['cashSum dg-cashSumP1', res1P !== undefined && cash1P > res1P ? 'dg-tooHighPrice' : ''].join(' ')}>
                        {cash1P}
                    </div>
                )}
                {card.taken === 'inGame' && cash2P !== undefined && cash2P >= 0 && (
                    <div className={['cashSum dg-cashSumP2', res2P !== undefined && cash2P > res2P ? 'dg-tooHighPrice' : ''].join(' ')}>
                        {cash2P}
                    </div>
                )}
            </div>
        </button>
    );
}
