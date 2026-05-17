import { useEffect, useState } from 'react';
import { LOGIN_OVERLAY } from '@/constants/ui';

export type OverlayState = 'hidden' | 'visible' | 'fading';

type UseGlobalLoadingOverlayParams = {
    authLoading: boolean;
    userId?: string;
    pathname: string;
};

export function markLoginOverlayPending() {
    try {
        sessionStorage.setItem(LOGIN_OVERLAY.flagStorageKey, '1');
    } catch {
        // Ignore storage failures in restrictive environments.
    }
}

function hasLoginOverlayFlag() {
    try {
        return sessionStorage.getItem(LOGIN_OVERLAY.flagStorageKey) === '1';
    } catch {
        return false;
    }
}

function consumeLoginOverlayFlag() {
    const hasFlag = hasLoginOverlayFlag();
    if (hasFlag) {
        try {
            sessionStorage.removeItem(LOGIN_OVERLAY.flagStorageKey);
        } catch {
            // Ignore storage failures in restrictive environments.
        }
    }
    return hasFlag;
}

function supportsFontLoadingApi() {
    return typeof document !== 'undefined' && 'fonts' in document;
}

export function useGlobalLoadingOverlay({ authLoading, userId, pathname }: UseGlobalLoadingOverlayParams) {
    const [fontsReady, setFontsReady] = useState(() => !supportsFontLoadingApi());
    const [authOverlayState, setAuthOverlayState] = useState<OverlayState>('visible');
    const [loginOverlayState, setLoginOverlayState] = useState<OverlayState>(() =>
        pathname === LOGIN_OVERLAY.targetPathname && hasLoginOverlayFlag() ? 'visible' : 'hidden'
    );

    useEffect(() => {
        if (fontsReady || !supportsFontLoadingApi()) {
            return;
        }

        let cancelled = false;
        document.fonts.ready.then(() => {
            if (!cancelled) {
                setFontsReady(true);
            }
        });

        return () => {
            cancelled = true;
        };
    }, [fontsReady]);

    useEffect(() => {
        if (authLoading || !fontsReady) {
            setAuthOverlayState('visible');
            return;
        }

        setAuthOverlayState('fading');
        const hideTimeout = window.setTimeout(() => {
            setAuthOverlayState('hidden');
        }, LOGIN_OVERLAY.authFadeMs);

        return () => {
            window.clearTimeout(hideTimeout);
        };
    }, [authLoading, fontsReady]);

    useEffect(() => {
        if (authLoading || !userId || pathname !== LOGIN_OVERLAY.targetPathname || !consumeLoginOverlayFlag()) {
            return;
        }

        setLoginOverlayState('visible');
        const fadeTimeout = window.setTimeout(() => {
            setLoginOverlayState('fading');
        }, LOGIN_OVERLAY.visibleMsAfterLogin);
        const hideTimeout = window.setTimeout(() => {
            setLoginOverlayState('hidden');
        }, LOGIN_OVERLAY.totalMsAfterLogin);

        return () => {
            window.clearTimeout(fadeTimeout);
            window.clearTimeout(hideTimeout);
        };
    }, [authLoading, pathname, userId]);

    useEffect(() => {
        if (pathname !== LOGIN_OVERLAY.targetPathname && loginOverlayState !== 'hidden') {
            setLoginOverlayState('hidden');
        }
    }, [loginOverlayState, pathname]);

    const overlayState: OverlayState =
        !fontsReady ? 'visible' : authOverlayState !== 'hidden' ? authOverlayState : loginOverlayState;

    return {
        appReady: !authLoading && fontsReady,
        overlayState
    };
}
