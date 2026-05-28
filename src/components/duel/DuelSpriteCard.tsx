import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import type { IGameDuelCard } from '@/interfaces/GameDuel';

type Props = {
    card: IGameDuelCard;
    x: number;
    y: number;
    domId?: string;
    compact?: boolean;
    /** Merged onto the outer button wrapper (compact or full layout). */
    wrapperClassName?: string;
    disabled?: boolean;
    selected?: boolean;
    cash1P?: number;
    cash2P?: number;
    res1P?: number;
    res2P?: number;
    onClick?: () => void;
};

export function DuelSpriteCard({
    card,
    x,
    y,
    domId,
    compact,
    wrapperClassName,
    disabled,
    selected,
    cash1P,
    cash2P,
    res1P,
    res2P,
    onClick
}: Props) {
    const REVEAL_FLIP_DELAY_MS = 1300;
    const REVEAL_FLIP_MS = 780;
    const reverseBg =
        card.tier === 'I'
            ? 'calc(var(--width-tier) * -10) calc(var(--height-tier) * -6)'
            : card.tier === 'II'
              ? 'calc(var(--width-tier) * -11) calc(var(--height-tier) * -6)'
              : card.tier === 'III'
                ? '0 calc(var(--height-tier) * -7)'
                : 'calc(var(--width-tier) * -1) calc(var(--height-tier) * -7)';

    const style = {
        '--x': `${x}%`,
        '--y': `${y}%`,
        '--z': `${card.id ?? 0}`,
        '--reversBg': reverseBg
    } as CSSProperties;
    const hideAsMovingToBoard = !!wrapperClassName?.includes('dg-inPlayerBoardSource');
    const showCardBack = card.hide && (card.coversBy?.length ?? 0) !== 0;
    const [isRevealQueued, setIsRevealQueued] = useState(false);
    const [isRevealAnimating, setIsRevealAnimating] = useState(false);
    const previousShowCardBackRef = useRef(showCardBack);
    const revealDelayTimerRef = useRef<number | null>(null);
    const revealTimerRef = useRef<number | null>(null);

    useLayoutEffect(() => {
        if (compact) {
            previousShowCardBackRef.current = showCardBack;
            return;
        }
        const wasBack = previousShowCardBackRef.current;
        if (wasBack && !showCardBack) {
            setIsRevealQueued(true);
            setIsRevealAnimating(false);
            if (revealDelayTimerRef.current) window.clearTimeout(revealDelayTimerRef.current);
            if (revealTimerRef.current) window.clearTimeout(revealTimerRef.current);
            revealDelayTimerRef.current = window.setTimeout(() => {
                setIsRevealQueued(false);
                setIsRevealAnimating(true);
                revealDelayTimerRef.current = null;
                revealTimerRef.current = window.setTimeout(() => {
                    setIsRevealAnimating(false);
                    revealTimerRef.current = null;
                }, REVEAL_FLIP_MS);
            }, REVEAL_FLIP_DELAY_MS);
        }
        previousShowCardBackRef.current = showCardBack;
    }, [compact, showCardBack, REVEAL_FLIP_DELAY_MS]);

    useEffect(
        () => () => {
            if (revealDelayTimerRef.current) {
                window.clearTimeout(revealDelayTimerRef.current);
                revealDelayTimerRef.current = null;
            }
            if (revealTimerRef.current) {
                window.clearTimeout(revealTimerRef.current);
                revealTimerRef.current = null;
            }
        },
        []
    );

    const canShowPrices = card.taken === 'inGame' && !showCardBack && !isRevealQueued && !isRevealAnimating;

    return (
        <button
            type="button"
            id={domId}
            className={[
                compact ? 'dg-cardWrapperCompact' : 'dg-cardWrapper',
                wrapperClassName,
                !compact && card.taken === 'inGame' ? '' : '',
                !compact && hideAsMovingToBoard ? 'dg-inPlayerBoardSource' : '',
                !compact && card.taken !== 'inGame' && card.taken !== 'inPlayerBoard' && card.taken !== 'graveyard'
                    ? 'dg-invisible'
                    : '',
                !compact && card.coversBy?.length === 0 ? 'dg-canSelect' : '',
                selected ? 'dg-selected' : ''
            ]
                .filter(Boolean)
                .join(' ')}
            style={style}
            onClick={onClick}
            disabled={disabled ?? (compact ? true : card.taken !== 'inGame')}
        >
            {!compact && isRevealAnimating ? (
                <div className="dg-tierSimpleFlip dg-tierSimpleFlip--animate" aria-hidden>
                    <div className={['dg-card dg-tierSimpleFlipFace', `dg-card${card.idImg}`].join(' ')} />
                    <div className={['dg-card dg-tierSimpleFlipBack', 'dg-hideCard'].join(' ')} />
                </div>
            ) : !compact ? (
                <div
                    className={[
                        'dg-card',
                        `dg-card${card.idImg}`,
                        isRevealQueued ? 'dg-hideCard' : '',
                        showCardBack ? 'dg-hideCard' : ''
                    ]
                        .filter(Boolean)
                        .join(' ')}
                />
            ) : (
                <div
                    className={[
                        'dg-card dg-cardCompact',
                        `dg-card${card.idImg}`,
                        showCardBack ? 'dg-hideCard' : ''
                    ]
                        .filter(Boolean)
                        .join(' ')}
                />
            )}
            {canShowPrices && cash1P !== undefined && cash1P >= 0 && (
                    <div className={['cashSum dg-cashSumP1', res1P !== undefined && cash1P > res1P ? 'dg-tooHighPrice' : ''].join(' ')}>
                        {cash1P}
                    </div>
                )}
                {canShowPrices && cash2P !== undefined && cash2P >= 0 && (
                    <div className={['cashSum dg-cashSumP2', res2P !== undefined && cash2P > res2P ? 'dg-tooHighPrice' : ''].join(' ')}>
                        {cash2P}
                    </div>
                )}
        </button>
    );
}
