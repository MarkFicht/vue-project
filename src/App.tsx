import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { usePresence } from '@/hooks/usePresence';
import { LoginPage } from '@/pages/LoginPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { DuelGamePage } from '@/pages/DuelGamePage';

export default function App() {
    const { user, loading } = useAuth();
    usePresence(user?.uid);

    if (loading) {
        return <main className="grid min-h-screen place-content-center text-slate-100">Loading...</main>;
    }

    return (
        <Routes>
            <Route path="/" element={user ? <Navigate to="/feed" replace /> : <LoginPage />} />
            <Route path="/feed" element={user ? <DashboardPage uid={user.uid} /> : <Navigate to="/" replace />} />
            <Route
                path="/duel-game"
                element={user ? <DuelGamePage uid={user.uid} /> : <Navigate to="/" replace />}
            />
            <Route path="*" element={<Navigate to={user ? '/feed' : '/'} replace />} />
        </Routes>
    );
}
