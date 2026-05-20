import { DuelSpriteCard } from '@/components/duel/DuelSpriteCard';
import { showPrice } from '@/helpers/GameDuelHelpers';
import type { IGameDuelCard, IGameDuelPlayer, Tier } from '@/interfaces/GameDuel';

type DuelTierCardsStageProps = {
    tier: Tier;
    tierCards: IGameDuelCard[];
    tierLayout: { x: number[]; y: number[] };
    selectedCardId?: number;
    topPlayer: IGameDuelPlayer;
    bottomPlayer: IGameDuelPlayer;
    onSelectTierCard: (card: IGameDuelCard) => void;
};

export function DuelTierCardsStage({
    tier,
    tierCards,
    tierLayout,
    selectedCardId,
    topPlayer,
    bottomPlayer,
    onSelectTierCard
}: DuelTierCardsStageProps) {
    return (
        <div className={`dg-cardBoardShell ${tier === 'III' ? 'dg-cardBoardShell--tall' : 'dg-cardBoardShell--compact'}`}>
            <div className="dg-epochCardsTransform">
                <div className="dg-cardBoard">
                    {tierCards.map((card, index) => (
                        <DuelSpriteCard
                            key={`${card.tier}-${card.id}`}
                            card={card}
                            x={tierLayout.x[index]}
                            y={tierLayout.y[index]}
                            selected={selectedCardId === card.id}
                            cash1P={(card.coversBy?.length ?? 0) === 0 ? showPrice(card, topPlayer, bottomPlayer) : -1}
                            cash2P={(card.coversBy?.length ?? 0) === 0 ? showPrice(card, bottomPlayer, topPlayer) : -1}
                            res1P={topPlayer.resources.cash}
                            res2P={bottomPlayer.resources.cash}
                            onClick={() => onSelectTierCard(card)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
