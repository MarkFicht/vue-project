import { useLayoutEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { LoadingOverlay } from '@/components/LoadingOverlay';
import { useAuth } from '@/hooks/useAuth';
import { useGlobalClickSound } from '@/hooks/useGlobalClickSound';
import { useGlobalLoadingOverlay } from '@/hooks/useGlobalLoadingOverlay';
import { usePresence } from '@/hooks/usePresence';
import { LoginPage } from '@/pages/LoginPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { DuelGamePage } from '@/pages/DuelGamePage';
import { ChatWidget } from '@/components/chat/ChatWidget';

export default function App() {
    const { user, loading } = useAuth();
    const location = useLocation();
    const { appReady, overlayState } = useGlobalLoadingOverlay({
        authLoading: loading,
        userId: user?.uid,
        pathname: location.pathname
    });
    useGlobalClickSound();
    usePresence(user?.uid);

    useLayoutEffect(() => {
        const mainBgRoutes = ['/', '/feed', '/duel-game'];
        document.body.classList.toggle('app-body-main-bg', mainBgRoutes.includes(location.pathname));
    }, [location.pathname]);

    return (
        <>
            {appReady && (
                <Routes>
                    <Route path="/" element={user ? <Navigate to="/feed" replace /> : <LoginPage />} />
                    <Route path="/feed" element={user ? <DashboardPage uid={user.uid} /> : <Navigate to="/" replace />} />
                    <Route
                        path="/duel-game"
                        element={user ? <DuelGamePage uid={user.uid} /> : <Navigate to="/" replace />}
                    />
                    <Route path="*" element={<Navigate to={user ? '/feed' : '/'} replace />} />
                </Routes>
            )}
            {appReady && user?.uid && <ChatWidget uid={user.uid} />}
            <LoadingOverlay state={overlayState} />
        </>
    );
}
