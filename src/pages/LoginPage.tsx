import { FormEvent, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    updateProfile
} from 'firebase/auth';
import { Gamepad2, LogIn, UserPlus } from 'lucide-react';
import { auth, googleProvider } from '@/firebaseConfig';
import '@/styles/login.css';

export function LoginPage() {
    const navigate = useNavigate();
    const [mode, setMode] = useState<'signin' | 'register'>('signin');
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const isRegister = useMemo(() => mode === 'register', [mode]);

    const onSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setError('');
        try {
            if (isRegister) {
                const res = await createUserWithEmailAndPassword(auth, email.trim().toLowerCase(), password);
                if (displayName.trim()) {
                    await updateProfile(res.user, { displayName: displayName.trim() });
                }
            } else {
                await signInWithEmailAndPassword(auth, email.trim().toLowerCase(), password);
            }
            navigate('/feed');
        } catch (err) {
            setError((err as Error).message);
        }
    };

    return (
        <main className="mx-auto flex min-h-screen w-full max-w-md flex-col items-center justify-center p-4">
            <div className="w-full rounded-2xl border border-white/20 bg-white/10 p-6 text-slate-100 shadow-2xl backdrop-blur">
                <header className="flex items-center justify-center gap-2 text-2xl font-bold">
                    <Gamepad2 className="h-7 w-7 text-cyan-300" />
                    Game Board
                </header>
                <h2 className="mb-4 text-center text-xl font-semibold">{isRegister ? 'Register' : 'Sign in'}</h2>

                <form className="space-y-3" onSubmit={onSubmit}>
                    {isRegister && (
                        <input
                            className="input"
                            placeholder="Display name"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                        />
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

                {error && <p className="mt-3 text-sm text-red-300">{error}</p>}
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
