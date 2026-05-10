import type { IGameDuelCoin } from '@/interfaces/GameDuel';

export function DuelCoinSprite({
    coin,
    onClick,
    disabled
}: {
    coin: IGameDuelCoin['effect'];
    onClick?: () => void;
    disabled?: boolean;
}) {
    return (
        <button
            type="button"
            className={['dg-coin', `dg-coin-${coin}`].join(' ')}
            onClick={onClick}
            disabled={disabled}
        />
    );
}
