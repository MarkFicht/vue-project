import { FormEvent, useMemo, useState } from 'react';
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
import { Gamepad2, LogIn, UserPlus } from 'lucide-react';
import { auth, db, googleProvider } from '@/firebaseConfig';
import { displayNamesRef, usersRef } from '@/firebase/refs';
import { normalizeDisplayName, sanitizeDisplayName } from '@/utils/displayName';
import { getCountrySelectOptions, guessCountryFromLocale, normalizeCountryCode } from '@/utils/country';
import { CountrySelect } from '@/components/CountrySelect';
import '@/styles/login.css';

export function LoginPage() {
    const navigate = useNavigate();
    const [mode, setMode] = useState<'signin' | 'register'>('signin');
    const [displayName, setDisplayName] = useState('');
    const [registerCountry, setRegisterCountry] = useState(() => guessCountryFromLocale());
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const isRegister = useMemo(() => mode === 'register', [mode]);
    const countryOptions = useMemo(() => getCountrySelectOptions(), []);

    const ensureDisplayNameAvailable = async (displayNameKey: string) => {
        const displayNameRef = doc(displayNamesRef, displayNameKey);
        const displayNameSnap = await getDoc(displayNameRef);
        if (displayNameSnap.exists()) {
            throw new Error('Display name is already taken.');
        }
    };

    const onSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setError('');
        try {
            if (isRegister) {
                const cleanDisplayName = sanitizeDisplayName(displayName);
                if (!cleanDisplayName) {
                    setError('Display name is required.');
                    return;
                }
                const displayNameKey = normalizeDisplayName(cleanDisplayName);
                const countryNorm = normalizeCountryCode(registerCountry);
                if (!countryNorm) {
                    setError('Choose a valid country.');
                    return;
                }
                await ensureDisplayNameAvailable(displayNameKey);
                const res = await createUserWithEmailAndPassword(auth, email.trim().toLowerCase(), password);
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
                            email: res.user.email || email.trim().toLowerCase(),
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
                await signInWithEmailAndPassword(auth, email.trim().toLowerCase(), password);
            }
            navigate('/feed');
        } catch (err) {
            const firebaseError = err as { code?: string; message?: string };
            if (firebaseError.code === 'auth/email-already-in-use') {
                setError('This email already exists in Firebase Authentication.');
                return;
            }
            if (firebaseError.code === 'auth/weak-password') {
                setError('Password is too weak (minimum 6 characters).');
                return;
            }
            if (firebaseError.code === 'auth/invalid-credential') {
                setError('Invalid email or password.');
                return;
            }
            setError(firebaseError.message || 'Operation failed.');
        }
    };

    return (
        <main className="loginPage mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center p-4 text-[var(--app-text)]">
            <div className="app-surface-login w-full rounded-2xl p-6">
                <header className="flex items-center justify-center gap-2 text-2xl font-bold">
                    <Gamepad2 className="app-brand-icon h-7 w-7" aria-hidden />
                    Game Board
                </header>
                <h2 className="mb-4 text-center text-xl font-semibold text-[var(--app-text)]">
                    {isRegister ? 'Register' : 'Sign in'}
                </h2>

                <form className="space-y-3" onSubmit={onSubmit}>
                    {isRegister && (
                        <>
                            <input
                                className="input"
                                placeholder="Display name"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
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
                        className="input"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className="input"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="btn-primary w-full" type="submit">
                        {isRegister ? 'Create account' : 'Login'}
                    </button>
                </form>

                <button
                    className="btn-secondary mt-3 w-full"
                    type="button"
                    onClick={async () => {
                        setError('');
                        try {
                            await signInWithPopup(auth, googleProvider);
                            navigate('/feed');
                        } catch (err) {
                            setError((err as Error).message);
                        }
                    }}
                >
                    Continue with Google
                </button>

                {error && <p className="loginPageError mt-3 text-sm">{error}</p>}
            </div>
            <section className="loginModeSwitch">
                <nav className="loginModeNav">
                    <button
                        type="button"
                        className={`loginModeItem ${!isRegister ? 'active' : ''}`}
                        onClick={() => setMode('signin')}
                    >
                        <span className="icon">
                            <LogIn className="h-5 w-5" />
                        </span>
                        <span className="text">Sign In</span>
                    </button>
                    <button
                        type="button"
                        className={`loginModeItem ${isRegister ? 'active' : ''}`}
                        onClick={() => setMode('register')}
                    >
                        <span className="icon">
                            <UserPlus className="h-5 w-5" />
                        </span>
                        <span className="text">Register</span>
                    </button>
                    <div className={`loginModeIndicator ${isRegister ? 'toRight' : ''}`} />
                </nav>
            </section>
        </main>
    );
}
