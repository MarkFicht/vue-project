import type { IGameDuelCard } from '@/interfaces/GameDuel';
import { Card } from './Card';

type Props = {
    cards: IGameDuelCard[];
    selectedCardId?: number;
    onSelect: (card: IGameDuelCard) => void;
};

export function GameGrid({ cards, selectedCardId, onSelect }: Props) {
    return (
        <section className="grid grid-cols-4 gap-2 lg:grid-cols-5">
            {cards.map((card) => (
                <Card
                    key={`${card.tier}-${card.id}`}
                    card={card}
                    selected={card.id === selectedCardId}
                    disabled={card.taken !== 'inGame' || (card.coversBy?.length ?? 0) > 0}
                    onClick={() => onSelect(card)}
                />
            ))}
        </section>
    );
}
