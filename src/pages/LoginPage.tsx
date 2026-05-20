import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    createUserWithEmailAndPassword,
    deleteUser,
    signOut,
    signInWithEmailAndPassword,
    signInWithPopup,
    updateProfile
} from 'firebase/auth';
import { doc, getDoc, runTransaction, serverTimestamp } from 'firebase/firestore';
import { ArrowRight, Gamepad2, LogIn, Palette, UserPlus, Volume2, VolumeX } from 'lucide-react';
import { auth, db, googleProvider } from '@/firebaseConfig';
import { displayNamesRef, usersRef } from '@/firebase/refs';
import { clearLoginOverlayPending, markLoginOverlayPending } from '@/hooks/useGlobalLoadingOverlay';
import { getNextTheme, getThemeLabel, getThemeSwitchTitle, type AppTheme } from '@/hooks/useAppTheme';
import { isSoundMuted, setSoundMuted } from '@/utils/sound';
import { normalizeDisplayName, sanitizeDisplayName } from '@/utils/displayName';
import { PASSWORD_RESET_SENT_MESSAGE, sendAccountPasswordResetEmail } from '@/utils/passwordReset';
import { mapLoginAuthError, mapPasswordResetError } from '@/utils/authErrors';
import {
    MAX_DISPLAY_NAME_LENGTH,
    MAX_EMAIL_LENGTH,
    MAX_PASSWORD_LENGTH,
    MIN_PASSWORD_LENGTH,
    normalizeAuthEmail
} from '@/constants/auth';
import { usePasswordResetCooldown } from '@/hooks/usePasswordResetCooldown';
import { getCountrySelectOptions, guessCountryFromLocale, normalizeCountryCode } from '@/utils/country';
import { CountrySelect } from '@/components/CountrySelect';
import { PasswordInput } from '@/components/PasswordInput';
import '@/styles/login.css';
const LOGIN_THEME_HINT_KEY = 'login-theme-hint-seen';

function readThemeHintVisible(): boolean {
    if (typeof window === 'undefined') {
        return true;
    }
    try {
        return window.localStorage.getItem(LOGIN_THEME_HINT_KEY) !== '1';
    } catch {
        return true;
    }
}

function dismissThemeHint() {
    try {
        window.localStorage.setItem(LOGIN_THEME_HINT_KEY, '1');
    } catch {
        // Ignore storage failures (private mode, quota, etc.).
    }
}

export function LoginPage({
    theme,
    onThemeChange
}: {
    theme: AppTheme;
    onThemeChange: (theme: AppTheme) => void;
}) {
    const navigate = useNavigate();
    const [mode, setMode] = useState<'signin' | 'register' | 'forgot'>('signin');
    const [displayName, setDisplayName] = useState('');
    const [registerCountry, setRegisterCountry] = useState(() => guessCountryFromLocale());
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [resetError, setResetError] = useState('');
    const [resetMessage, setResetMessage] = useState('');
    const [resetSending, setResetSending] = useState(false);
    const [authInProgress, setAuthInProgress] = useState(false);
    const [soundMuted, setSoundMutedState] = useState(() => isSoundMuted());
    const [showThemeHint, setShowThemeHint] = useState(readThemeHintVisible);
    const isRegister = useMemo(() => mode === 'register', [mode]);
    const isForgot = mode === 'forgot';
    const isFormBusy = authInProgress || resetSending;
    const passwordResetCooldown = usePasswordResetCooldown();

    const clearResetFeedback = () => {
        setResetError('');
        setResetMessage('');
    };

    const goToSignIn = () => {
        setMode('signin');
        setError('');
        clearResetFeedback();
    };

    const emailInputRef = useRef<HTMLInputElement>(null);

    const goToForgot = () => {
        setMode('forgot');
        setError('');
        clearResetFeedback();
    };

    useEffect(() => {
        if (!isForgot) return;
        emailInputRef.current?.focus();
    }, [isForgot]);
    const countryOptions = useMemo(() => getCountrySelectOptions(), []);
    const toggleTheme = () => {
        if (showThemeHint) {
            setShowThemeHint(false);
            dismissThemeHint();
        }
        onThemeChange(getNextTheme(theme));
    };
    const toggleSound = () => {
        const next = !soundMuted;
        setSoundMuted(next);
        setSoundMutedState(next);
    };

    const ensureDisplayNameAvailable = async (displayNameKey: string) => {
        const displayNameRef = doc(displayNamesRef, displayNameKey);
        const displayNameSnap = await getDoc(displayNameRef);
        if (displayNameSnap.exists()) {
            throw new Error('Display name is already taken.');
        }
    };

    const onSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if (isForgot) {
            await sendPasswordReset();
            return;
        }
        if (authInProgress) return;
        setError('');
        const normalizedEmail = normalizeAuthEmail(email);
        if (!normalizedEmail) {
            setError('Email is required.');
            return;
        }
        if (normalizedEmail.length > MAX_EMAIL_LENGTH) {
            setError(`Email is too long (max ${MAX_EMAIL_LENGTH} characters).`);
            return;
        }
        if (password.length > MAX_PASSWORD_LENGTH) {
            setError(`Password is too long (max ${MAX_PASSWORD_LENGTH} characters).`);
            return;
        }
        try {
            if (isRegister) {
                const cleanDisplayName = sanitizeDisplayName(displayName);
                if (!cleanDisplayName) {
                    setError('Display name is required.');
                    return;
                }
                if (cleanDisplayName.length > MAX_DISPLAY_NAME_LENGTH) {
                    setError(`Display name is too long (max ${MAX_DISPLAY_NAME_LENGTH} characters).`);
                    return;
                }
                if (password.length < MIN_PASSWORD_LENGTH) {
                    setError(`Password must have at least ${MIN_PASSWORD_LENGTH} characters.`);
                    return;
                }
                const displayNameKey = normalizeDisplayName(cleanDisplayName);
                const countryNorm = normalizeCountryCode(registerCountry);
                if (!countryNorm) {
                    setError('Choose a valid country.');
                    return;
                }
                setAuthInProgress(true);
                markLoginOverlayPending();
                await ensureDisplayNameAvailable(displayNameKey);
                const res = await createUserWithEmailAndPassword(auth, normalizedEmail, password);
                try {
                    await updateProfile(res.user, { displayName: cleanDisplayName });
                    await runTransaction(db, async (tx) => {
                        const displayNameRef = doc(displayNamesRef, displayNameKey);
                        const displayNameSnap = await tx.get(displayNameRef);
                        if (displayNameSnap.exists()) {
                            throw new Error('Display name is already taken.');
                        }

                        const now = serverTimestamp();
                        tx.set(doc(usersRef, res.user.uid), {
                            uid: res.user.uid,
                            email: res.user.email || normalizedEmail,
                            displayName: cleanDisplayName,
                            displayNameKey,
                            game: '',
                            readyToGame: false,
                            status: 'online',
                            timestamp: now,
                            createdAt: now,
                            updatedAt: now,
                            lastSeenAt: now,
                            schemaVersion: 1,
                            soundMuted: false,
                            countryCode: countryNorm
                        });
                        tx.set(displayNameRef, {
                            uid: res.user.uid,
                            displayName: cleanDisplayName,
                            createdAt: now,
                            updatedAt: now
                        });
                    });
                } catch (txError) {
                    try {
                        await deleteUser(res.user);
                    } finally {
                        await signOut(auth);
                    }
                    throw txError;
                }
            } else {
                setAuthInProgress(true);
                markLoginOverlayPending();
                await signInWithEmailAndPassword(auth, normalizedEmail, password);
            }
            navigate('/feed');
        } catch (err) {
            clearLoginOverlayPending();
            setAuthInProgress(false);
            setError(mapLoginAuthError(err, isRegister));
        }
    };

    const sendPasswordReset = async () => {
        if (resetSending || authInProgress) return;
        if (!passwordResetCooldown.canSendReset()) {
            setResetError(passwordResetCooldown.getCooldownBlockedMessage());
            setResetMessage('');
            return;
        }

        const normalizedEmail = normalizeAuthEmail(email);
        if (!normalizedEmail) {
            setResetError('Email is required.');
            setResetMessage('');
            return;
        }

        setResetError('');
        setResetMessage('');
        setResetSending(true);
        try {
            await sendAccountPasswordResetEmail(normalizedEmail);
            setResetMessage(PASSWORD_RESET_SENT_MESSAGE);
            passwordResetCooldown.startCooldown();
        } catch (err) {
            setResetError(mapPasswordResetError(err));
        } finally {
            setResetSending(false);
        }
    };

    const signInWithGoogle = async () => {
        if (authInProgress) return;
        setError('');
        try {
            setAuthInProgress(true);
            markLoginOverlayPending();
            await signInWithPopup(auth, googleProvider);
            navigate('/feed');
        } catch (err) {
            clearLoginOverlayPending();
            setAuthInProgress(false);
            setError(mapLoginAuthError(err, false));
        }
    };

    return (
        <main className="loginPage mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center p-4 text-[var(--app-text)]">
            <div className="app-surface-login w-full rounded-2xl p-6">
                <div className="loginTopControls">
                    <button
                        type="button"
                        className={`btn-secondary loginTopControlBtn${showThemeHint ? ' loginThemeHintBtn' : ''}`}
                        onClick={toggleTheme}
                        title={getThemeSwitchTitle(theme)}
                        disabled={isFormBusy}
                    >
                        {showThemeHint && (
                            <ArrowRight className="loginThemeHintArrow" strokeWidth={2.5} aria-hidden />
                        )}
                        <Palette className="h-4 w-4" />
                        <span>{getThemeLabel(theme)}</span>
                    </button>
                    <button
                        type="button"
                        className="btn-secondary loginTopControlBtn"
                        onClick={toggleSound}
                        title={soundMuted ? 'Unmute sounds' : 'Mute sounds'}
                        disabled={isFormBusy}
                    >
                        {soundMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                        <span>{soundMuted ? 'Muted' : 'Sound'}</span>
                    </button>
                </div>
                <header className="font-display flex items-center justify-center gap-2 text-2xl font-bold tracking-wide">
                    <Gamepad2 className="app-brand-icon h-7 w-7" aria-hidden />
                    Game Board
                </header>
                <h2 className="font-display tracking-wide text-center text-xl font-semibold text-[var(--app-text)]">
                    {isRegister ? 'Register' : isForgot ? 'Reset password' : 'Sign in'}
                </h2>
                {isForgot && (
                    <p className="loginForgotSubtitle">
                        Enter your email address. We will send you a link to set a new password.
                    </p>
                )}

                <form className="loginForm space-y-3" onSubmit={onSubmit}>
                    {isRegister && (
                        <>
                            <input
                                className="input"
                                placeholder="Display name"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                                maxLength={MAX_DISPLAY_NAME_LENGTH}
                                required
                            />
                            <label className="block text-xs text-[var(--app-text-muted)]">
                                <span className="mb-1.5 block font-medium tracking-wide">Country / region</span>
                                <CountrySelect
                                    value={registerCountry}
                                    onChange={setRegisterCountry}
                                    options={countryOptions}
                                />
                            </label>
                        </>
                    )}
                    <input
                        ref={emailInputRef}
                        className="input"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            if (isForgot && (resetMessage || resetError)) {
                                clearResetFeedback();
                            }
                        }}
                        maxLength={MAX_EMAIL_LENGTH}
                        autoComplete="email"
                        inputMode="email"
                        required
                    />
                    {!isForgot && (
                        <PasswordInput
                            key={mode}
                            value={password}
                            onChange={setPassword}
                            minLength={isRegister ? MIN_PASSWORD_LENGTH : 1}
                            autoComplete={isRegister ? 'new-password' : 'current-password'}
                            disabled={isFormBusy}
                            required
                        />
                    )}
                    {mode === 'signin' && (
                        <div className="loginForgotBlock">
                            <button type="button" className="loginForgotLink" disabled={isFormBusy} onClick={goToForgot}>
                                Forgot password?
                            </button>
                        </div>
                    )}
                    <button
                        className="btn-primary w-full"
                        type="submit"
                        disabled={
                            isFormBusy ||
                            (isForgot && !!resetMessage) ||
                            (isForgot && passwordResetCooldown.cooldownSecondsLeft > 0)
                        }
                    >
                        {isForgot
                            ? resetSending
                                ? 'Sending...'
                                : resetMessage
                                  ? 'Email sent'
                                  : passwordResetCooldown.cooldownSecondsLeft > 0
                                    ? `Wait ${passwordResetCooldown.cooldownSecondsLeft}s`
                                    : 'Send reset link'
                            : authInProgress
                              ? 'Loading...'
                              : isRegister
                                ? 'Create account'
                                : 'Login'}
                    </button>
                    {isForgot && (resetMessage || resetError) && (
                        <div className="loginForgotFeedback" aria-live="polite">
                            {resetMessage && (
                                <p className="loginForgotSuccess" role="status">
                                    {resetMessage}
                                </p>
                            )}
                            {resetError && (
                                <p className="loginForgotError" role="alert">
                                    {resetError}
                                </p>
                            )}
                        </div>
                    )}
                    {isForgot && (
                        <button type="button" className="loginBackLink" disabled={isFormBusy} onClick={goToSignIn}>
                            ← Back to sign in
                        </button>
                    )}
                </form>

                {!isForgot && (
                <button
                    className="btn-secondary loginGoogleBtn mt-3 w-full"
                    type="button"
                    disabled={authInProgress}
                    onClick={signInWithGoogle}
                >
                    <span className="loginGoogleIcon" aria-hidden>
                        <svg viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                            <path
                                fill="#4285F4"
                                d="M17.64 9.2c0-.64-.06-1.26-.16-1.85H9v3.5h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.9c1.7-1.57 2.7-3.88 2.7-6.63Z"
                            />
                            <path
                                fill="#34A853"
                                d="M9 18c2.43 0 4.47-.8 5.96-2.17l-2.9-2.26c-.8.54-1.84.86-3.06.86-2.35 0-4.33-1.58-5.04-3.7H.96V13c1.47 2.9 4.48 5 8.04 5Z"
                            />
                            <path
                                fill="#FBBC05"
                                d="M3.96 10.73A5.4 5.4 0 0 1 3.67 9c0-.6.1-1.18.29-1.73V4.98H.96A9 9 0 0 0 0 9c0 1.45.35 2.82.96 4l3-2.27Z"
                            />
                            <path
                                fill="#EA4335"
                                d="M9 3.58c1.32 0 2.5.45 3.43 1.33l2.58-2.58C13.46.9 11.42 0 9 0 5.44 0 2.43 2.1.96 4.98l3 2.29c.71-2.12 2.69-3.7 5.04-3.7Z"
                            />
                        </svg>
                    </span>
                    Continue with Google
                </button>
                )}

                {!isForgot && error && <p className="loginPageError mt-3 text-sm">{error}</p>}
            </div>
            {!isForgot && (
            <section className="loginModeSwitch">
                <nav className="loginModeNav">
                    <button
                        type="button"
                        className={`loginModeItem ${mode === 'signin' ? 'active' : ''}`}
                        onClick={goToSignIn}
                    >
                        <span className="icon">
                            <LogIn className="h-5 w-5" />
                        </span>
                        <span className="text">Sign In</span>
                    </button>
                    <button
                        type="button"
                        className={`loginModeItem ${isRegister ? 'active' : ''}`}
                        onClick={() => {
                            setMode('register');
                            setError('');
                            clearResetFeedback();
                        }}
                    >
                        <span className="icon">
                            <UserPlus className="h-5 w-5" />
                        </span>
                        <span className="text">Register</span>
                    </button>
                    <div className={`loginModeIndicator ${isRegister ? 'toRight' : ''}`} />
                </nav>
            </section>
            )}
        </main>
    );
}
