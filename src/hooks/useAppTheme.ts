import { useEffect, useState } from 'react';

export const APP_THEMES = ['classic', 'cyberpunk', 'scifi', 'luxury', 'ivory'] as const;
export type AppTheme = (typeof APP_THEMES)[number];

const APP_THEME_LABELS: Record<AppTheme, string> = {
    classic: 'Classic',
    ivory: 'Ivory',
    cyberpunk: 'Cyberpunk',
    scifi: 'Sci-Fi',
    luxury: 'Luxury'
};

const APP_THEME_KEY = 'app-theme';

function isTheme(value: unknown): value is AppTheme {
    return typeof value === 'string' && APP_THEMES.includes(value as AppTheme);
}

function getNextAppTheme(theme: AppTheme): AppTheme {
    const currentIndex = APP_THEMES.indexOf(theme);
    if (currentIndex < 0) {
        return APP_THEMES[0];
    }
    return APP_THEMES[(currentIndex + 1) % APP_THEMES.length];
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

export function getThemeLabel(theme: AppTheme): string {
    return APP_THEME_LABELS[theme];
}

export function getThemeSwitchTitle(theme: AppTheme): string {
    const nextThemeLabel = getThemeLabel(getNextAppTheme(theme)).toLowerCase();
    return `Switch to ${nextThemeLabel} theme`;
}

export function getNextTheme(theme: AppTheme): AppTheme {
    return getNextAppTheme(theme);
}
