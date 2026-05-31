import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
    hasExplicitDeviceMutePreference,
    isSoundMuted,
    refreshMutedFromStorage,
    setSoundMuted,
    setSoundScope
} from '@/utils/sound';

/** Keeps header mute UI + sound module aligned with uid and (once) Firestore profile when there is no device preference. */
export function useSoundMuteSync(uid: string, profileMuted: boolean | undefined, hydrateEnabled: boolean) {
    const [soundMuted, setSoundMutedState] = useState(() => {
        setSoundScope(uid);
        return isSoundMuted();
    });
    const hydratedRef = useRef(false);

    useLayoutEffect(() => {
        hydratedRef.current = false;
    }, [uid]);

    useLayoutEffect(() => {
        setSoundScope(uid);
        setSoundMutedState(isSoundMuted());
    }, [uid]);

    useEffect(() => {
        if (!hydrateEnabled) return;
        if (typeof profileMuted !== 'boolean') return;
        if (hydratedRef.current) return;
        if (hasExplicitDeviceMutePreference()) {
            hydratedRef.current = true;
            refreshMutedFromStorage();
            setSoundMutedState(isSoundMuted());
            return;
        }
        hydratedRef.current = true;
        if (profileMuted !== isSoundMuted()) {
            setSoundMuted(profileMuted);
            setSoundMutedState(profileMuted);
        }
    }, [hydrateEnabled, profileMuted]);

    return [soundMuted, setSoundMutedState] as const;
}
