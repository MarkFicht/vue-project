import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';
import type { FirebaseApp } from 'firebase/app';

declare global {
    interface Window {
        FIREBASE_APPCHECK_DEBUG_TOKEN?: string | boolean;
    }
}

/**
 * Optional Firebase App Check (reCAPTCHA v3).
 * Enabled only when VITE_FIREBASE_APP_CHECK_SITE_KEY is set.
 *
 * Local dev with enforcement: register a debug token in Firebase Console
 * and set VITE_FIREBASE_APP_CHECK_DEBUG_TOKEN in .env.
 */
export function initFirebaseAppCheck(app: FirebaseApp): void {
    const siteKey = import.meta.env.VITE_FIREBASE_APP_CHECK_SITE_KEY?.trim();
    if (!siteKey) {
        if (import.meta.env.DEV) {
            console.info('[App Check] Disabled — set VITE_FIREBASE_APP_CHECK_SITE_KEY in .env to enable.');
        }
        return;
    }

    const debugToken = import.meta.env.VITE_FIREBASE_APP_CHECK_DEBUG_TOKEN?.trim();
    if (import.meta.env.DEV && debugToken) {
        window.FIREBASE_APPCHECK_DEBUG_TOKEN = debugToken;
        console.info('[App Check] Using debug token from VITE_FIREBASE_APP_CHECK_DEBUG_TOKEN');
    }

    try {
        initializeAppCheck(app, {
            provider: new ReCaptchaV3Provider(siteKey),
            isTokenAutoRefreshEnabled: true
        });
        console.info('[App Check] Initialized (reCAPTCHA v3)');
    } catch (error) {
        console.warn('[App Check] Initialization failed:', error);
    }
}
