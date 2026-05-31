import { Gamepad2 } from 'lucide-react';
import { LOGIN_OVERLAY } from '@/constants/ui';
import type { OverlayState } from '@/hooks/useGlobalLoadingOverlay';

type LoadingOverlayProps = {
    state: OverlayState;
};

export function LoadingOverlay({ state }: LoadingOverlayProps) {
    if (state === 'hidden') {
        return null;
    }

    return (
        <div className={`appLoginOverlay ${state === 'fading' ? 'isFading' : ''}`}>
            <div className="appLoginOverlayCard">
                <Gamepad2 className="appLoginOverlayLogo" aria-hidden />
                <p className="appLoginOverlayLabel">{LOGIN_OVERLAY.label}</p>
                <span className="appLoginOverlaySpinner" aria-hidden />
            </div>
        </div>
    );
}
