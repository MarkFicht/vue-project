import { useLayoutEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { usePresence } from '@/hooks/usePresence';
import { LoginPage } from '@/pages/LoginPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { DuelGamePage } from '@/pages/DuelGamePage';

export default function App() {
    const { user, loading } = useAuth();
    const location = useLocation();
    usePresence(user?.uid);

    useLayoutEffect(() => {
        const mainBgRoutes = ['/', '/feed', '/duel-game'];
        document.body.classList.toggle('app-body-main-bg', mainBgRoutes.includes(location.pathname));
    }, [location.pathname]);

    if (loading) {
        return <main className="font-sans grid min-h-screen place-content-center text-slate-100">Loading...</main>;
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
