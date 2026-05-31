/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_FIREBASE_VAPID_KEY?: string;
    readonly VITE_FIREBASE_APP_CHECK_SITE_KEY?: string;
    readonly VITE_FIREBASE_APP_CHECK_DEBUG_TOKEN?: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
