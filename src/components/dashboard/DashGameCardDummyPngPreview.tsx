import type { CSSProperties, ReactNode } from 'react';
import '@/styles/dash-game-card-dummy-png-preview.css';

type DashGameCardDummyPngPreviewProps = {
    color?: string;
    title?: string;
    subtitle?: string;
    players?: string;
    topLabel?: string;
    description?: string;
    lobbyLabel?: string;
    buttonLabel?: string;
    className?: string;
    style?: CSSProperties;
    children?: ReactNode;
};

/** Drop `<DashGameCardDummyPngPreview />` anywhere to test _2 PNG masks. */
export function DashGameCardDummyPngPreview({
    color = '#4589cc',
    title = 'Duel',
    subtitle = 'Free',
    players = '0/2',
    topLabel = 'Video soon!',
    description = "A board game inspired by a strategy game called '7 Wonders of the World'",
    lobbyLabel = 'No players in lobby.',
    buttonLabel = 'Lobby',
    className,
    style,
    children
}: DashGameCardDummyPngPreviewProps) {
    return (
        <article
            className={['dg2Card', className].filter(Boolean).join(' ')}
            style={{ '--dg2-clr': color, ...style } as CSSProperties}
            aria-label="Game card PNG mask preview"
        >
            <div className="dg2Card__layers" aria-hidden>
                <span className="dg2Card__layer dg2Card__layer--bottom" />
                <span className="dg2Card__layer dg2Card__layer--top" />
            </div>

            <div className="dg2Card__top">{topLabel}</div>

            <div className="dg2Card__buttonRow">
                <button type="button" className="dg2Card__button">
                    {buttonLabel}
                </button>
            </div>

            <div className="dg2Card__bottom">
                <p>{description}</p>
            </div>

            <div className="dg2Card__lobby">
                <p>{lobbyLabel}</p>
            </div>

            <div className="dg2Card__circle">
                <h2>{title}</h2>
                <p>{subtitle}</p>
                <p>{players}</p>
            </div>

            {children}
        </article>
    );
}
