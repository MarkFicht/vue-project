import { useEffect, useRef, useState } from 'react';
import { LOGIN_OVERLAY } from '@/constants/ui';

export type OverlayState = 'hidden' | 'visible' | 'fading';

const LOGIN_OVERLAY_PENDING_EVENT = 'app:login-overlay-pending';
const LOGIN_OVERLAY_CLEAR_EVENT = 'app:login-overlay-clear';

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
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event(LOGIN_OVERLAY_PENDING_EVENT));
    }
}

export function clearLoginOverlayPending() {
    try {
        sessionStorage.removeItem(LOGIN_OVERLAY.flagStorageKey);
    } catch {
        // Ignore storage failures in restrictive environments.
    }
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event(LOGIN_OVERLAY_CLEAR_EVENT));
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
    const [loginOverlayPending, setLoginOverlayPending] = useState(() => hasLoginOverlayFlag());
    const [loginOverlayState, setLoginOverlayState] = useState<OverlayState>(() => (hasLoginOverlayFlag() ? 'visible' : 'hidden'));
    const loginTransitionStartedRef = useRef(false);

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
        const onPending = () => setLoginOverlayPending(true);
        const onClear = () => setLoginOverlayPending(false);

        window.addEventListener(LOGIN_OVERLAY_PENDING_EVENT, onPending);
        window.addEventListener(LOGIN_OVERLAY_CLEAR_EVENT, onClear);

        return () => {
            window.removeEventListener(LOGIN_OVERLAY_PENDING_EVENT, onPending);
            window.removeEventListener(LOGIN_OVERLAY_CLEAR_EVENT, onClear);
        };
    }, []);

    useEffect(() => {
        if (!loginOverlayPending) {
            loginTransitionStartedRef.current = false;
            setLoginOverlayState('hidden');
            return;
        }

        setLoginOverlayState('visible');
        if (loginTransitionStartedRef.current || authLoading || !userId || pathname !== LOGIN_OVERLAY.targetPathname) {
            return;
        }

        loginTransitionStartedRef.current = true;
        consumeLoginOverlayFlag();

        const fadeTimeout = window.setTimeout(() => {
            setLoginOverlayState('fading');
        }, LOGIN_OVERLAY.visibleMsAfterLogin);
        const hideTimeout = window.setTimeout(() => {
            setLoginOverlayState('hidden');
            setLoginOverlayPending(false);
            loginTransitionStartedRef.current = false;
        }, LOGIN_OVERLAY.totalMsAfterLogin);

        return () => {
            window.clearTimeout(fadeTimeout);
            window.clearTimeout(hideTimeout);
        };
    }, [authLoading, loginOverlayPending, pathname, userId]);

    const overlayState: OverlayState =
        !fontsReady ? 'visible' : authOverlayState !== 'hidden' ? authOverlayState : loginOverlayState;

    return {
        appReady: !authLoading && fontsReady,
        overlayState
    };
}
