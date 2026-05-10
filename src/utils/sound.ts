type SoundKind = 'notify' | 'start' | 'turn' | 'win' | 'loss';

let audioCtx: AudioContext | null = null;
const MUTE_KEY_BASE = 'duel-sound-muted';
let soundScope = 'global';

function getMuteKey() {
    return `${MUTE_KEY_BASE}:${soundScope}`;
}

function readMutedFromStorage() {
    if (typeof window === 'undefined') return false;
    return window.localStorage.getItem(getMuteKey()) === '1';
}

let muted = readMutedFromStorage();

export function setSoundScope(scopeId: string) {
    soundScope = scopeId || 'global';
    muted = readMutedFromStorage();
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
        muted = window.localStorage.getItem(getMuteKey()) === '1';
    }
    if (muted) return;
    switch (kind) {
        case 'notify':
            playTones([
                { freq: 740, ms: 90, type: 'triangle' },
                { freq: 988, ms: 120, type: 'triangle' }
            ]);
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
            playTones([
                { freq: 659, ms: 100, type: 'sine' },
                { freq: 784, ms: 110, type: 'sine' },
                { freq: 1047, ms: 150, type: 'sine' }
            ], 0.06);
            break;
        case 'loss':
            playTones([
                { freq: 440, ms: 120, type: 'sawtooth' },
                { freq: 370, ms: 140, type: 'sawtooth' }
            ], 0.045);
            break;
        default:
            break;
    }
}

export function isSoundMuted() {
    return muted;
}

export function setSoundMuted(value: boolean) {
    muted = value;
    if (typeof window !== 'undefined') {
        window.localStorage.setItem(getMuteKey(), value ? '1' : '0');
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
