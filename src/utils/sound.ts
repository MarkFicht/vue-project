type SoundKind =
    | 'click'
    | 'notify'
    | 'chatMessage'
    | 'start'
    | 'turn'
    | 'win'
    | 'loss'
    | 'militaryAttack'
    | 'militaryHit'
    | 'destroyBrown'
    | 'destroyGrey'
    | 'timerTick';

let audioCtx: AudioContext | null = null;
let soundUnlockBound = false;

/** One device-local preference (Firestore mirrors separately); avoids uid/global key mismatches on first paint. */
const MUTE_STORAGE_KEY = 'duel-sound-muted';

/** Legacy keys — migrated once into {@link MUTE_STORAGE_KEY}. */
let soundScope = 'global';

let previousSoundScope = '';

/** When localStorage rejects writes, keep the user's explicit choice for this tab until storage succeeds or the signed-in uid changes. */
let sessionMuteOverride: boolean | null = null;

function parseMuted(raw: string | null): boolean | null {
    if (raw === '1') return true;
    if (raw === '0') return false;
    return null;
}

function migrateLegacyMuteIntoCanonical(storagesGetItem: (key: string) => string | null): boolean | null {
    const scopedLegacy =
        soundScope && soundScope !== 'global'
            ? parseMuted(storagesGetItem(`${MUTE_STORAGE_KEY}:${soundScope}`))
            : null;
    const globalLegacy = parseMuted(storagesGetItem(`${MUTE_STORAGE_KEY}:global`));
    const resolved = scopedLegacy ?? globalLegacy;
    if (resolved === null) return null;
    try {
        window.localStorage.setItem(MUTE_STORAGE_KEY, resolved ? '1' : '0');
    } catch {
        /* Safari private mode etc. */
    }
    return resolved;
}

/** Reload mute from localStorage / legacy keys / session-only override; does not invent a default when nothing is stored. */
export function refreshMutedFromStorage(): void {
    if (typeof window === 'undefined') return;
    if (sessionMuteOverride !== null) {
        muted = sessionMuteOverride;
        return;
    }
    try {
        const getItem = (k: string) => window.localStorage.getItem(k);
        const canonical = parseMuted(getItem(MUTE_STORAGE_KEY));
        if (canonical !== null) {
            muted = canonical;
            return;
        }
        const migrated = migrateLegacyMuteIntoCanonical(getItem);
        if (migrated !== null) {
            muted = migrated;
            return;
        }
    } catch {
        /* keep muted */
    }
}

/** Prefer device mute toggles over Firestore if user already stored something locally (migration counts). */
export function hasExplicitDeviceMutePreference(): boolean {
    if (sessionMuteOverride !== null) return true;
    if (typeof window === 'undefined') return false;
    try {
        if (window.localStorage.getItem(MUTE_STORAGE_KEY) !== null) return true;
        if (soundScope && soundScope !== 'global') {
            if (window.localStorage.getItem(`${MUTE_STORAGE_KEY}:${soundScope}`) !== null) return true;
        }
        return window.localStorage.getItem(`${MUTE_STORAGE_KEY}:global`) !== null;
    } catch {
        return false;
    }
}

let muted = false;
refreshMutedFromStorage();

export function setSoundScope(scopeId: string) {
    const next = scopeId || 'global';
    if (previousSoundScope !== '' && previousSoundScope !== next) {
        sessionMuteOverride = null;
    }
    previousSoundScope = next;
    soundScope = next;
    refreshMutedFromStorage();
}

function getContext() {
    if (typeof window === 'undefined') return null;
    if (!audioCtx) {
        const Ctx = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        if (!Ctx) return null;
        audioCtx = new Ctx();
    }
    return audioCtx;
}

export function ensureUiSoundReady() {
    if (typeof window === 'undefined' || soundUnlockBound) return;
    soundUnlockBound = true;

    const tryResume = () => {
        const ctx = getContext();
        if (!ctx) return;
        if (ctx.state === 'suspended') {
            void ctx.resume();
        }
        if (ctx.state === 'running') {
            window.removeEventListener('pointerdown', tryResume);
            window.removeEventListener('touchstart', tryResume);
            window.removeEventListener('keydown', tryResume);
        }
    };

    window.addEventListener('pointerdown', tryResume, { passive: true });
    window.addEventListener('touchstart', tryResume, { passive: true });
    window.addEventListener('keydown', tryResume);
}

function playTones(tones: Array<{ freq: number; ms: number; type?: OscillatorType }>, gain = 0.05) {
    const ctx = getContext();
    if (!ctx) return;
    if (ctx.state === 'suspended') {
        void ctx.resume();
    }

    let time = ctx.currentTime + 0.01;
    tones.forEach((tone) => {
        const osc = ctx.createOscillator();
        const amp = ctx.createGain();
        osc.type = tone.type ?? 'sine';
        osc.frequency.setValueAtTime(tone.freq, time);
        amp.gain.setValueAtTime(0, time);
        amp.gain.linearRampToValueAtTime(gain, time + 0.01);
        amp.gain.linearRampToValueAtTime(0, time + tone.ms / 1000);
        osc.connect(amp).connect(ctx.destination);
        osc.start(time);
        osc.stop(time + tone.ms / 1000 + 0.02);
        time += tone.ms / 1000 + 0.03;
    });
}

export function playUiSound(kind: SoundKind) {
    if (typeof window !== 'undefined') {
        refreshMutedFromStorage();
    }
    if (muted) return;
    switch (kind) {
        case 'click':
            playTones(
                [
                    { freq: 910, ms: 28, type: 'triangle' },
                    { freq: 740, ms: 24, type: 'triangle' }
                ],
                0.028
            );
            break;
        case 'notify':
            playTones([
                { freq: 740, ms: 90, type: 'triangle' },
                { freq: 988, ms: 120, type: 'triangle' }
            ]);
            break;
        case 'chatMessage':
            playTones(
                [
                    { freq: 1280, ms: 26, type: 'triangle' },
                    { freq: 1620, ms: 30, type: 'sine' },
                    { freq: 1360, ms: 24, type: 'triangle' }
                ],
                0.022
            );
            break;
        case 'start':
            playTones([
                { freq: 523, ms: 90, type: 'square' },
                { freq: 659, ms: 90, type: 'square' },
                { freq: 784, ms: 130, type: 'square' }
            ]);
            break;
        case 'turn':
            playTones([{ freq: 880, ms: 110, type: 'triangle' }]);
            break;
        case 'win':
            playTones(
                [
                    { freq: 659, ms: 100, type: 'sine' },
                    { freq: 784, ms: 110, type: 'sine' },
                    { freq: 1047, ms: 150, type: 'sine' }
                ],
                0.06
            );
            break;
        case 'loss':
            playTones(
                [
                    { freq: 440, ms: 120, type: 'sawtooth' },
                    { freq: 370, ms: 140, type: 'sawtooth' }
                ],
                0.045
            );
            break;
        case 'militaryAttack':
            playTones(
                [
                    { freq: 520, ms: 45, type: 'square' },
                    { freq: 780, ms: 55, type: 'square' },
                    { freq: 320, ms: 70, type: 'sawtooth' }
                ],
                0.055
            );
            break;
        case 'militaryHit':
            playTones(
                [
                    { freq: 165, ms: 90, type: 'triangle' },
                    { freq: 118, ms: 110, type: 'sawtooth' }
                ],
                0.07
            );
            break;
        case 'destroyBrown':
            playTones(
                [
                    { freq: 240, ms: 55, type: 'triangle' },
                    { freq: 180, ms: 75, type: 'square' },
                    { freq: 95, ms: 100, type: 'sawtooth' }
                ],
                0.05
            );
            break;
        case 'destroyGrey':
            playTones(
                [
                    { freq: 980, ms: 35, type: 'triangle' },
                    { freq: 740, ms: 50, type: 'triangle' },
                    { freq: 440, ms: 90, type: 'sine' }
                ],
                0.042
            );
            break;
        case 'timerTick':
            playTones([{ freq: 960, ms: 45, type: 'sine' }], 0.016);
            break;
        default:
            break;
    }
}

export function isSoundMuted() {
    return muted;
}

/** Firestore merge: device preference wins; otherwise keep server boolean if present. */
export function soundMutedForProfileMerge(serverValue: unknown): boolean {
    if (hasExplicitDeviceMutePreference()) return isSoundMuted();
    return typeof serverValue === 'boolean' ? serverValue : isSoundMuted();
}

export function setSoundMuted(value: boolean) {
    muted = value;
    if (typeof window !== 'undefined') {
        try {
            window.localStorage.setItem(MUTE_STORAGE_KEY, value ? '1' : '0');
            sessionMuteOverride = null;
        } catch {
            sessionMuteOverride = value;
        }
        if (!value) {
            const ctx = getContext();
            if (ctx?.state === 'suspended') void ctx.resume();
        }
    }
    if (audioCtx) {
        if (value && audioCtx.state === 'running') {
            void audioCtx.suspend();
        } else if (!value && audioCtx.state === 'suspended') {
            void audioCtx.resume();
        }
    }
}

export function toggleSoundMuted() {
    setSoundMuted(!muted);
    return muted;
}
