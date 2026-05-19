import { DuelSpriteCard } from '@/components/duel/DuelSpriteCard';
import type { IGameDuelCard } from '@/interfaces/GameDuel';

type DuelGraveyardPanelProps = {
    graveyard: IGameDuelCard[];
    isMyTurn: boolean;
    pickCardFromGraveyardUid: string;
    currentUid: string;
    onPickCardFromGraveyard: (card: IGameDuelCard) => void;
};

export function DuelGraveyardPanel({
    graveyard,
    isMyTurn,
    pickCardFromGraveyardUid,
    currentUid,
    onPickCardFromGraveyard
}: DuelGraveyardPanelProps) {
    const canPickFromGraveyard = isMyTurn && pickCardFromGraveyardUid === currentUid;

    return (
        <aside
            className={`dg-graveyardPanel rounded-xl p-2${canPickFromGraveyard ? ' dg-graveyardPanel--pickActive' : ''}`}
        >
            <h3 className="mb-1 text-sm font-semibold">Graveyard</h3>
            <div className="dg-graveyardCards dg-graveyardCardsBox duelPageScrollbar overflow-y-auto rounded-lg p-1">
                <div className="dg-graveyardCardsTransform">
                    {graveyard.map((card, idx) => (
                        <DuelSpriteCard
                            key={`grave-${card.id}-${idx}`}
                            card={card}
                            x={0}
                            y={0}
                            compact
                            disabled={!canPickFromGraveyard}
                            onClick={() => onPickCardFromGraveyard(card)}
                        />
                    ))}
                    {!graveyard.length && <span className="text-xs opacity-70">empty</span>}
                </div>
            </div>
        </aside>
    );
}
