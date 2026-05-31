import { DuelWonderSprite } from '@/components/duel/DuelWonderSprite';
import type { IGameDuelWonderCard } from '@/interfaces/GameDuel';

type DuelPrepareStageProps = {
    isMyTurn: boolean;
    prepareWonderSlots: Array<IGameDuelWonderCard | null>;
    prepareRevealedIds: number[];
    prepareActionLocked: boolean;
    onPickWonder: (wonderId: number) => void;
};

export function DuelPrepareStage({
    isMyTurn,
    prepareWonderSlots,
    prepareRevealedIds,
    prepareActionLocked,
    onPickWonder
}: DuelPrepareStageProps) {
    return (
        <>
            <h2 className="mb-2 text-sm font-semibold">Pick wonders {isMyTurn ? '(your turn)' : '(opponent picks)'}</h2>
            <div className="dg-wondersPickTransform">
                <div className="dg-wondersPick">
                    {prepareWonderSlots.map((wonder, index) => (
                        <DuelWonderSprite
                            key={wonder ? wonder.id : `prepare-placeholder-${index}`}
                            card={wonder ?? undefined}
                            showFront={!!wonder && !wonder.taken && prepareRevealedIds.includes(wonder.id)}
                            flipDelayMs={0}
                            disabled={
                                !isMyTurn ||
                                !wonder ||
                                wonder.taken ||
                                !prepareRevealedIds.includes(wonder.id) ||
                                prepareActionLocked
                            }
                            onClick={wonder ? () => onPickWonder(wonder.id) : undefined}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}
