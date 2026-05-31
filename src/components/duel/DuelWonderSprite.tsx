import type { CSSProperties } from 'react';
import type { IGameDuelWonderCard } from '@/interfaces/GameDuel';

type Props = {
    card?: IGameDuelWonderCard;
    domId?: string;
    cash?: number;
    resCash?: number;
    selected?: boolean;
    disabled?: boolean;
    showFront?: boolean;
    flipDelayMs?: number;
    onClick?: () => void;
};

function getTierBackground(activated: IGameDuelWonderCard['activated']) {
    if (activated === 'I') return 'calc(var(--width-tier) * -10) calc(var(--height-tier) * -6)';
    if (activated === 'II') return 'calc(var(--width-tier) * -11) calc(var(--height-tier) * -6)';
    if (activated === 'III') return '0 calc(var(--height-tier) * -7)';
    if (activated === 'guild') return 'calc(var(--width-tier) * -1) calc(var(--height-tier) * -7)';
    return '';
}

export function DuelWonderSprite({
    card,
    domId,
    cash,
    resCash,
    selected,
    disabled,
    showFront = !!card,
    flipDelayMs = 0,
    onClick
}: Props) {
    const bgPosition = card ? getTierBackground(card.activated) : '';
    const isDisabled = disabled || !card;

    return (
        <button
            type="button"
            id={domId}
            className={[
                'dg-wonderWrapper',
                selected ? 'dg-selected' : '',
                !isDisabled && card?.activated === 'none' ? 'dg-wonderSelectable' : ''
            ].join(' ')}
            onClick={card ? onClick : undefined}
            disabled={isDisabled}
        >
            <div
                className={`dg-wonderFlip ${showFront ? 'dg-wonderFlipFront' : ''}`}
                style={{ '--wonder-flip-delay': `${flipDelayMs}ms` } as CSSProperties}
            >
                <div className={['dg-wonderCard', 'dg-wonderFace', card ? `dg-wonder${card.id}` : ''].join(' ')} />
                <div className="dg-wonderCard dg-wonderBack" />
            </div>
            {card?.taken && card.activated !== 'none' && (
                <div
                    className="dg-tierCardForWonder"
                    style={
                        {
                            backgroundPosition: bgPosition || undefined
                        } as CSSProperties
                    }
                >
                    <div className="dg-tierCardImg" />
                </div>
            )}
            {card?.taken && card.activated === 'none' && !card.blocked && cash !== undefined && (
                <div className={['cashSum dg-wonderCash', resCash !== undefined && cash > resCash ? 'dg-tooHighPrice' : ''].join(' ')}>
                    {cash}
                </div>
            )}
        </button>
    );
}
