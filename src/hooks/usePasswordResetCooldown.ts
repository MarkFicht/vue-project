import { useCallback, useEffect, useRef, useState } from 'react';
import { PASSWORD_RESET_COOLDOWN_MS } from '@/constants/auth';

export function usePasswordResetCooldown() {
    const lastSentAtRef = useRef(0);
    const [cooldownSecondsLeft, setCooldownSecondsLeft] = useState(0);

    const clearCooldownTimer = useRef<ReturnType<typeof setInterval> | null>(null);

    const startCooldown = useCallback(() => {
        lastSentAtRef.current = Date.now();
        setCooldownSecondsLeft(Math.ceil(PASSWORD_RESET_COOLDOWN_MS / 1000));

        if (clearCooldownTimer.current) {
            clearInterval(clearCooldownTimer.current);
        }

        clearCooldownTimer.current = setInterval(() => {
            const elapsed = Date.now() - lastSentAtRef.current;
            const remainingMs = PASSWORD_RESET_COOLDOWN_MS - elapsed;
            if (remainingMs <= 0) {
                setCooldownSecondsLeft(0);
                if (clearCooldownTimer.current) {
                    clearInterval(clearCooldownTimer.current);
                    clearCooldownTimer.current = null;
                }
                return;
            }
            setCooldownSecondsLeft(Math.ceil(remainingMs / 1000));
        }, 1000);
    }, []);

    const canSendReset = useCallback(() => {
        const elapsed = Date.now() - lastSentAtRef.current;
        return elapsed >= PASSWORD_RESET_COOLDOWN_MS;
    }, []);

    const getCooldownBlockedMessage = useCallback(() => {
        if (cooldownSecondsLeft <= 0) return '';
        return `Please wait ${cooldownSecondsLeft}s before sending another reset email.`;
    }, [cooldownSecondsLeft]);

    useEffect(() => {
        return () => {
            if (clearCooldownTimer.current) {
                clearInterval(clearCooldownTimer.current);
            }
        };
    }, []);

    return {
        cooldownSecondsLeft,
        startCooldown,
        canSendReset,
        getCooldownBlockedMessage
    };
}
