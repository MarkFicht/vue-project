import { useEffect, useState } from 'react';

export type AppTheme = 'classic' | 'ivory';

const APP_THEME_KEY = 'app-theme';

function isTheme(value: unknown): value is AppTheme {
    return value === 'classic' || value === 'ivory';
}

function readStoredTheme(): AppTheme {
    if (typeof window === 'undefined') {
        return 'classic';
    }
    try {
        const stored = window.localStorage.getItem(APP_THEME_KEY);
        return isTheme(stored) ? stored : 'classic';
    } catch {
        return 'classic';
    }
}

export function useAppTheme() {
    const [theme, setTheme] = useState<AppTheme>(readStoredTheme);

    useEffect(() => {
        document.documentElement.setAttribute('data-app-theme', theme);
        try {
            window.localStorage.setItem(APP_THEME_KEY, theme);
        } catch {
            // Ignore storage failures (private mode, quota, etc.).
        }
    }, [theme]);

    return { theme, setTheme };
}
