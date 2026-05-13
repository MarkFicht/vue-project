import type { IGameDuelCoin } from '@/interfaces/GameDuel';
import { DuelCoinSprite } from './DuelCoinSprite';

type Props = {
    pawn: number;
    coins: IGameDuelCoin['effect'][];
    punishment1: boolean;
    punishment2: boolean;
    punishment3: boolean;
    punishment4: boolean;
    currentIsPlayer2: boolean;
    pickCoinUid: string;
    isMyTurn: boolean;
    currentUid: string;
    onPickCoin: (coin: IGameDuelCoin['effect']) => void;
};

export function DuelBoard({
    pawn,
    coins,
    punishment1,
    punishment2,
    punishment3,
    punishment4,
    currentIsPlayer2,
    pickCoinUid,
    isMyTurn,
    currentUid,
    onPickCoin
}: Props) {
    const canPick = isMyTurn && pickCoinUid === currentUid;
    return (
        <section className="dg-board">
            <div className="dg-punishments">
                <div
                    className={[
                        'dg-punishment',
                        currentIsPlayer2 ? 'dg-punishment4' : 'dg-punishment1',
                        !punishment1 ? 'dg-punishmentGone' : ''
                    ].join(' ')}
                />
                <div
                    className={[
                        'dg-punishment',
                        currentIsPlayer2 ? 'dg-punishment3' : 'dg-punishment2',
                        !punishment2 ? 'dg-punishmentGone' : ''
                    ].join(' ')}
                />
                <div
                    className={[
                        'dg-punishment',
                        currentIsPlayer2 ? 'dg-punishment2' : 'dg-punishment3',
                        !punishment3 ? 'dg-punishmentGone' : ''
                    ].join(' ')}
                />
                <div
                    className={[
                        'dg-punishment',
                        currentIsPlayer2 ? 'dg-punishment1' : 'dg-punishment4',
                        !punishment4 ? 'dg-punishmentGone' : ''
                    ].join(' ')}
                />
            </div>
            <div className={['dg-pawnTrack', currentIsPlayer2 ? 'dg-pawnTrackFlipped' : ''].join(' ')}>
                <div className="dg-pawn" style={{ transform: `translateY(calc(${pawn} * 120.5% - 50%))` }} />
            </div>
            <div className={['dg-boardCoins', canPick ? 'dg-selectCoin' : ''].join(' ')}>
                {coins.map((coin) => (
                    <span key={`board-${coin}`} className="dg-boardCoinSlot">
                        <DuelCoinSprite
                            coin={coin}
                            onClick={() => onPickCoin(coin)}
                            disabled={!canPick}
                        />
                    </span>
                ))}
            </div>
        </section>
    );
}
