import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowLeft, Gamepad2, Palette, ShieldAlert, Volume2, VolumeX } from 'lucide-react';
import { MobileHamburgerMenu } from '@/components/MobileHamburgerMenu';
import { getThemeLabel, getThemeSwitchTitle, type AppTheme } from '@/hooks/useAppTheme';
import type { Tier } from '@/interfaces/GameDuel';

function HeaderActionButton({
    onClick,
    title,
    disabled,
    icon,
    label,
    className = 'btn-secondary hdrIconBtn'
}: {
    onClick: () => void;
    title?: string;
    disabled?: boolean;
    icon: ReactNode;
    label: string;
    className?: string;
}) {
    return (
        <button type="button" className={className} disabled={disabled} onClick={onClick} title={title}>
            {icon}
            <span className="hdrBtnText">{label}</span>
        </button>
    );
}

type DuelGameHeaderProps = {
    isObserver: boolean;
    isMyTurn: boolean;
    tier: Tier;
    move: number;
    soundMuted: boolean;
    theme: AppTheme;
    onOpenSurrender: () => void;
    onToggleSound: () => void;
    onToggleTheme: () => void;
    onBackToFeed: () => void;
};

export function DuelGameHeader({
    isObserver,
    isMyTurn,
    tier,
    move,
    soundMuted,
    theme,
    onOpenSurrender,
    onToggleSound,
    onToggleTheme,
    onBackToFeed
}: DuelGameHeaderProps) {
    const [showHeaderMobileMenu, setShowHeaderMobileMenu] = useState(false);
    const headerRef = useRef<HTMLElement | null>(null);
    const turnLabel = isObserver ? 'Observer mode' : isMyTurn ? 'YOU' : 'Opponent';
    const turnToneClass = isObserver ? 'dgTurnBadgeObserver' : isMyTurn ? 'dgTurnBadgeYou' : 'dgTurnBadgeOpponent';

    useEffect(() => {
        const onResize = () => {
            if (window.innerWidth > 767) setShowHeaderMobileMenu(false);
        };
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    useEffect(() => {
        if (!showHeaderMobileMenu) return;
        const onPointerDown = (event: PointerEvent) => {
            const target = event.target as Node | null;
            if (headerRef.current?.contains(target)) return;
            setShowHeaderMobileMenu(false);
        };
        document.addEventListener('pointerdown', onPointerDown);
        return () => document.removeEventListener('pointerdown', onPointerDown);
    }, [showHeaderMobileMenu]);

    return (
        <header
            ref={headerRef}
            className="app-surface-header mb-2 flex min-w-0 max-w-full shrink-0 items-center justify-between gap-2 rounded-xl p-2 sm:mb-3 sm:rounded-2xl sm:p-3 dgHeader"
        >
            <div className="min-w-0">
                <h1 className="flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-1 text-lg font-semibold leading-tight">
                    <span className="font-display inline-flex shrink-0 items-center gap-2 tracking-wide">
                        <Gamepad2 className="app-brand-icon h-5 w-5" aria-hidden />
                        Duel
                    </span>
                </h1>
                <p className="dgMetaLine text-xs">
                    <span className="dgMetaStrong">Turn:</span> <span className={`mr-1 dgTurnBadge ${turnToneClass}`}>{turnLabel}</span> ·{' '}
                    <span className="ml-1 dgMetaStrong">Tier:</span> <span className="mr-1 dgMetaValue">{tier}</span> ·{' '}
                    <span className="ml-1 dgMetaStrong">Move:</span> <span className="mr-1 dgMetaValue">{move}</span>
                </p>
            </div>
            <div className="dgHeaderActionsDesktop min-w-0 shrink items-center gap-2">
                <HeaderActionButton
                    disabled={isObserver}
                    onClick={onOpenSurrender}
                    title="Surrender"
                    icon={<ShieldAlert className="h-4 w-4" />}
                    label="Surrender"
                />
                <HeaderActionButton
                    onClick={onToggleSound}
                    title={soundMuted ? 'Unmute sounds' : 'Mute sounds'}
                    icon={soundMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    label={soundMuted ? 'Muted' : 'Sound'}
                />
                <HeaderActionButton
                    onClick={onToggleTheme}
                    title={getThemeSwitchTitle(theme)}
                    icon={<Palette className="h-4 w-4" />}
                    label={getThemeLabel(theme)}
                />
                <HeaderActionButton
                    onClick={onBackToFeed}
                    title="Back to feed"
                    icon={<ArrowLeft className="h-4 w-4" />}
                    label="Feed"
                />
            </div>
            <MobileHamburgerMenu
                open={showHeaderMobileMenu}
                onToggle={() => setShowHeaderMobileMenu((prev) => !prev)}
                toggleClassName="btn-secondary dgMobileMenuToggle"
                panelClassName="dgMobileMenu"
                listClassName="dgMobileMenuList"
                openLabel="Open header menu"
                closeLabel="Close header menu"
            >
                <button
                    type="button"
                    className="btn-secondary dgMobileMenuItem"
                    disabled={isObserver}
                    onClick={() => {
                        setShowHeaderMobileMenu(false);
                        onOpenSurrender();
                    }}
                >
                    <ShieldAlert className="h-4 w-4 shrink-0" />
                    <span className="dgMobileMenuText">Surrender</span>
                </button>
                <button
                    type="button"
                    className="btn-secondary dgMobileMenuItem"
                    onClick={() => {
                        onToggleSound();
                        setShowHeaderMobileMenu(false);
                    }}
                    title={soundMuted ? 'Unmute sounds' : 'Mute sounds'}
                >
                    {soundMuted ? <VolumeX className="h-4 w-4 shrink-0" /> : <Volume2 className="h-4 w-4 shrink-0" />}
                    <span className="dgMobileMenuText">{soundMuted ? 'Unmute sounds' : 'Mute sounds'}</span>
                </button>
                <button
                    type="button"
                    className="btn-secondary dgMobileMenuItem"
                    onClick={() => {
                        onToggleTheme();
                        setShowHeaderMobileMenu(false);
                    }}
                >
                    <Palette className="h-4 w-4 shrink-0" />
                    <span className="dgMobileMenuText">
                        {`${getThemeLabel(theme)} (Switch theme)`}
                    </span>
                </button>
                <button
                    type="button"
                    className="btn-secondary dgMobileMenuItem"
                    onClick={() => {
                        setShowHeaderMobileMenu(false);
                        onBackToFeed();
                    }}
                >
                    <ArrowLeft className="h-4 w-4 shrink-0" />
                    <span className="dgMobileMenuText">Feed</span>
                </button>
            </MobileHamburgerMenu>
        </header>
    );
}
