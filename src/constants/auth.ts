export const MAX_EMAIL_LENGTH = 254;
export const MAX_DISPLAY_NAME_LENGTH = 32;
export const MIN_PASSWORD_LENGTH = 10;
export const MAX_PASSWORD_LENGTH = 128;

/** Cooldown between password-reset emails from the same screen (ms). */
export const PASSWORD_RESET_COOLDOWN_MS = 60_000;

export function normalizeAuthEmail(email: string): string {
    return email.trim().toLowerCase();
}
