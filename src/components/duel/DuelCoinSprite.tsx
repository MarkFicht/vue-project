import type { IGameDuelCoin } from '@/interfaces/GameDuel';

export function DuelCoinSprite({
    coin,
    onClick,
    disabled,
    scienceVictoryPulse
}: {
    coin: IGameDuelCoin['effect'];
    onClick?: () => void;
    disabled?: boolean;
    /** Pulsing ring (scientific win highlight for artefact7 wheel). */
    scienceVictoryPulse?: boolean;
}) {
    return (
        <button
            type="button"
            className={['dg-coin', `dg-coin-${coin}`, scienceVictoryPulse ? 'dg-coinScienceVictoryPulse' : '']
                .filter(Boolean)
                .join(' ')}
            onClick={onClick}
            disabled={disabled}
        />
    );
}
