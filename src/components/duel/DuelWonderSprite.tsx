import type { IGameDuelWonderCard } from '@/interfaces/GameDuel';

type Props = {
    card: IGameDuelWonderCard;
    cash?: number;
    resCash?: number;
    selected?: boolean;
    disabled?: boolean;
    onClick?: () => void;
};

function getTierBackground(activated: IGameDuelWonderCard['activated']) {
    if (activated === 'I') return 'calc(var(--width-tier) * -10) calc(var(--height-tier) * -6)';
    if (activated === 'II') return 'calc(var(--width-tier) * -11) calc(var(--height-tier) * -6)';
    if (activated === 'III') return '0 calc(var(--height-tier) * -7)';
    if (activated === 'guild') return 'calc(var(--width-tier) * -1) calc(var(--height-tier) * -7)';
    return '';
}

export function DuelWonderSprite({ card, cash, resCash, selected, disabled, onClick }: Props) {
    const bgPosition = getTierBackground(card.activated);

    return (
        <button
            type="button"
            className={['dg-wonderWrapper', selected ? 'dg-selected' : '', !disabled && card.activated === 'none' ? 'dg-wonderSelectable' : ''].join(' ')}
            onClick={onClick}
            disabled={disabled}
        >
            <div className={['dg-wonderCard', `dg-wonder${card.id}`].join(' ')} />
            <div
                className={['dg-tierCardForWonder', bgPosition ? 'dg-tierCardImg' : ''].join(' ')}
                style={{ backgroundPosition: bgPosition || undefined }}
            />
            {card.taken && card.activated === 'none' && cash !== undefined && (
                <div className={['cashSum dg-wonderCash', resCash !== undefined && cash > resCash ? 'dg-tooHighPrice' : ''].join(' ')}>
                    {cash}
                </div>
            )}
        </button>
    );
}
