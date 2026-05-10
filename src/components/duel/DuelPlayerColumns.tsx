import type { IGameDuelPlayer, IGameDuelCard } from '@/interfaces/GameDuel';
import { DuelSpriteCard } from './DuelSpriteCard';
import { DuelCoinSprite } from './DuelCoinSprite';
import { DuelWonderSprite } from './DuelWonderSprite';
import { countArtefactsForPlayer, countTotalPoints, showPrice } from '@/game/gameHelpers';

const COLORS: Array<keyof IGameDuelPlayer['cards']> = ['brown', 'grey', 'yellow', 'blue', 'red', 'green', 'purple'];

export function DuelPlayerColumns({
    player,
    enemy,
    boardPawn,
    isPlayerOne,
    isCurrentTurn,
    canSelectWonder,
    affordableWonderIds,
    selectedWonderId,
    onSelectWonder,
    destroyMode,
    isDestroyTarget,
    onDestroyCard,
    highlightScience
}: {
    player: IGameDuelPlayer;
    enemy: IGameDuelPlayer;
    boardPawn: number;
    isPlayerOne: boolean;
    isCurrentTurn: boolean;
    canSelectWonder?: boolean;
    affordableWonderIds?: number[];
    selectedWonderId?: number;
    onSelectWonder?: (wonderId: number) => void;
    destroyMode?: 'brown' | 'grey' | null;
    isDestroyTarget?: boolean;
    onDestroyCard?: (card: IGameDuelCard, color: 'brown' | 'grey') => void;
    highlightScience?: boolean;
}) {
    const totalPoints = countTotalPoints(player, enemy, boardPawn, isPlayerOne);
    return (
        <section className="dg-playerArea">
            <header className="dg-playerHeader">
                <div className="font-semibold">{player.user.displayName || player.user.email}</div>
                <div className="text-xs opacity-80">{isCurrentTurn ? 'Your turn' : 'Waiting'}</div>
                <div className="dg-playerTotals">
                    <span className="cashSum dg-totalCash">{player.resources.cash}</span>
                    <span className="cashSum dg-totalPoints">{totalPoints}</span>
                </div>
            </header>
            <div className="dg-playerWonders">
                {player.wonderCards.map((wonder) => {
                    const canAfford = affordableWonderIds?.includes(wonder.id) ?? false;
                    return (
                    <DuelWonderSprite
                        key={`${player.user.uid}-w-${wonder.id}`}
                        card={wonder}
                        cash={showPrice(wonder, player, enemy)}
                        resCash={player.resources.cash}
                        selected={selectedWonderId === wonder.id}
                        disabled={!canSelectWonder || wonder.activated !== 'none' || !canAfford}
                        onClick={() => onSelectWonder?.(wonder.id)}
                    />
                    );
                })}
            </div>
            <div className="dg-columns">
                {COLORS.map((colorKey) => {
                    const cards = [...(player.cards[colorKey] as IGameDuelCard[])];
                    if (colorKey === 'green') cards.sort((a, b) => a.valuePower[0] - b.valuePower[0]);
                    const isDestroyColumn =
                        isDestroyTarget && (colorKey === 'brown' || colorKey === 'grey') && destroyMode === colorKey;
                    return (
                        <div
                            key={`${player.user.uid}-${colorKey}`}
                            className={`dg-column dg-column-${colorKey} ${isDestroyColumn ? 'dg-destroySelectable' : ''} ${
                                highlightScience && colorKey === 'green' ? 'dg-victoryScience' : ''
                            }`}
                        >
                            {colorKey === 'green' && <div className="dg-artCount">{countArtefactsForPlayer(player)}/6</div>}
                            {cards.map((card, idx) => (
                                <div key={`${card.id ?? card.idImg}-${idx}`} className="dg-smallCardSlot">
                                    <DuelSpriteCard
                                        card={card}
                                        x={0}
                                        y={0}
                                        compact
                                        disabled={!isDestroyColumn}
                                        onClick={() =>
                                            isDestroyColumn
                                                ? onDestroyCard?.(card, colorKey as 'brown' | 'grey')
                                                : undefined
                                        }
                                    />
                                </div>
                            ))}
                        </div>
                    );
                })}
            </div>
            <div className="dg-playerCoinsBox">
                <div className="dg-playerCoinsLabel">Progress coins</div>
                <div className="dg-playerCoins">
                    {player.resources.coins.map((coin, idx) => (
                        <DuelCoinSprite key={`${coin}-${idx}`} coin={coin} disabled />
                    ))}
                    {!player.resources.coins.length && <span className="text-xs opacity-60">none</span>}
                </div>
            </div>
        </section>
    );
}
