import { useEffect, useMemo, useRef, useState, type CSSProperties, type FormEvent, type MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    deleteDoc,
    deleteField,
    doc,
    getDoc,
    getDocs,
    onSnapshot,
    query,
    runTransaction,
    serverTimestamp,
    setDoc,
    where,
    writeBatch
} from 'firebase/firestore';
import { ref as rtdbRef, get as getRtdb, serverTimestamp as rtdbServerTimestamp, set as setRtdb } from 'firebase/database';
import { Check, Copy, Gamepad2, LogOut, Palette, UserCircle2, UserX, Volume2, VolumeX } from 'lucide-react';
import {
    EmailAuthProvider,
    deleteUser,
    reauthenticateWithCredential,
    reauthenticateWithPopup,
    signOut,
    updatePassword,
    updateProfile
} from 'firebase/auth';
import { auth, db, googleProvider, rtdb } from '@/firebaseConfig';
import { useUserStore } from '@/store/useUserStore';
import { useGameStore } from '@/store/useGameStore';
import { displayNamesRef, gameStatusDuelRef, gameStatusGemsRef, gameStatusReflexRef, tableGameDuelRef, usersRef } from '@/firebase/refs';
import { isSoundMuted, playUiSound, setSoundMuted, soundMutedForProfileMerge } from '@/utils/sound';
import { useSoundMuteSync } from '@/hooks/useSoundMuteSync';
import { persistUserSoundMuted } from '@/utils/persistUserSoundMuted';
import { usePresenceMap } from '@/hooks/usePresenceMap';
import { normalizeDisplayName, sanitizeDisplayName } from '@/utils/displayName';
import { getCountrySelectOptions, guessCountryFromLocale, normalizeCountryCode } from '@/utils/country';
import { MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH } from '@/constants/auth';
import { mapPasswordChangeError, mapPasswordResetError } from '@/utils/authErrors';
import { PASSWORD_RESET_SENT_MESSAGE, sendAccountPasswordResetEmail } from '@/utils/passwordReset';
import { usePasswordResetCooldown } from '@/hooks/usePasswordResetCooldown';
import { PasswordInput } from '@/components/PasswordInput';
import { CountrySelect } from '@/components/CountrySelect';
import { UserFlag } from '@/components/UserFlag';
import { LoadingOverlay } from '@/components/LoadingOverlay';
import { MobileHamburgerMenu } from '@/components/MobileHamburgerMenu';
import { SkeletonDot, SkeletonInput, SkeletonTag, SkeletonText } from '@/components/Skeleton';
import { getNextTheme, getThemeLabel, getThemeSwitchTitle, type AppTheme } from '@/hooks/useAppTheme';
import '@/styles/dashboard.css';
// import { DashGameCardDummyPngPreview } from '@/components/dashboard/DashGameCardDummyPngPreview';

const MAX_DISPLAY_NAME_LENGTH = 32;
const DASH_PROFILE_FORM_ID = 'dash-user-profile-form';
const DASH_PASSWORD_FORM_ID = 'dash-user-password-form';

type LobbySkeletonProps = {
    rows?: number;
    withTag?: boolean;
};

function LobbySkeleton({ rows = 1, withTag = false }: LobbySkeletonProps) {
    return (
        <div className="dashLobbySkeletonStack">
            {Array.from({ length: rows }, (_, index) => (
                <div key={index} className="dashLobbySkeletonRow">
                    <SkeletonText />
                    {withTag && <SkeletonTag />}
                </div>
            ))}
        </div>
    );
}

type DashboardHeaderProps = {
    headerRef: React.RefObject<HTMLElement | null>;
    isLoadingUser: boolean;
    displayName: string;
    email: string;
    countryCode?: string;
    soundMuted: boolean;
    theme: AppTheme;
    showHeaderMobileMenu: boolean;
    openUserProfileModal: () => void;
    toggleSound: () => void;
    toggleTheme: () => void;
    openLogoutModal: () => void;
    setShowHeaderMobileMenu: React.Dispatch<React.SetStateAction<boolean>>;
};

function DashboardHeader({
    headerRef,
    isLoadingUser,
    displayName,
    email,
    countryCode,
    soundMuted,
    theme,
    showHeaderMobileMenu,
    openUserProfileModal,
    toggleSound,
    toggleTheme,
    openLogoutModal,
    setShowHeaderMobileMenu
}: DashboardHeaderProps) {
    const resolvedUserLabel = displayName || email || 'User';

    return (
        <header ref={headerRef} className="dashHeader app-surface-header">
            <div className="dashTitleMain">
                <Gamepad2 className="app-brand-icon" aria-hidden />
                Feed Panel
            </div>
            <div className="dashHeaderActionsDesktop">
                <button
                    type="button"
                    className="btn-secondary hdrIconBtn"
                    onClick={openUserProfileModal}
                    title={isLoadingUser ? 'Loading profile...' : `${resolvedUserLabel} — profile`}
                >
                    <UserCircle2 className="h-4 w-4 shrink-0" />
                    <span className="hdrBtnLabelGroup inline-flex min-w-0 items-center gap-1.5">
                        {isLoadingUser ? (
                            <>
                                <SkeletonDot />
                                <SkeletonText />
                            </>
                        ) : (
                            <>
                                <UserFlag code={countryCode} className="text-base shrink-0" />
                                <span className="hdrBtnText">{resolvedUserLabel}</span>
                            </>
                        )}
                    </span>
                </button>
                <button
                    type="button"
                    className="btn-secondary hdrIconBtn"
                    onClick={toggleSound}
                    title={soundMuted ? 'Unmute sounds' : 'Mute sounds'}
                >
                    {soundMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    <span className="hdrBtnText">{soundMuted ? 'Muted' : 'Sound'}</span>
                </button>
                <button
                    type="button"
                    className="btn-secondary hdrIconBtn"
                    onClick={toggleTheme}
                    title={getThemeSwitchTitle(theme)}
                >
                    <Palette className="h-4 w-4" />
                    <span className="hdrBtnText">{getThemeLabel(theme)}</span>
                </button>
                <button type="button" className="btn-secondary hdrIconBtn" title="Log out" onClick={openLogoutModal}>
                    <LogOut className="h-4 w-4" />
                    <span className="hdrBtnText">Logout</span>
                </button>
            </div>
            <MobileHamburgerMenu
                open={showHeaderMobileMenu}
                onToggle={() => setShowHeaderMobileMenu((prev) => !prev)}
                toggleClassName="btn-secondary dashMobileMenuToggle"
                panelClassName="dashMobileMenu"
                listClassName="dashMobileMenuList"
                openLabel="Open header menu"
                closeLabel="Close header menu"
            >
                <button type="button" className="btn-secondary dashMobileMenuItem" onClick={openUserProfileModal}>
                    <UserCircle2 className="h-4 w-4 shrink-0" />
                    {isLoadingUser ? (
                        <SkeletonText className="dashSkeletonTextMobile" />
                    ) : (
                        <span className="dashMobileMenuText">{resolvedUserLabel}</span>
                    )}
                </button>
                <button
                    type="button"
                    className="btn-secondary dashMobileMenuItem"
                    onClick={toggleSound}
                    title={soundMuted ? 'Unmute sounds' : 'Mute sounds'}
                >
                    {soundMuted ? <VolumeX className="h-4 w-4 shrink-0" /> : <Volume2 className="h-4 w-4 shrink-0" />}
                    <span className="dashMobileMenuText">{soundMuted ? 'Unmute sounds' : 'Mute sounds'}</span>
                </button>
                <button type="button" className="btn-secondary dashMobileMenuItem" onClick={toggleTheme}>
                    <Palette className="h-4 w-4 shrink-0" />
                    <span className="dashMobileMenuText">
                        {`${getThemeLabel(theme)} (Switch theme)`}
                    </span>
                </button>
                <button type="button" className="btn-secondary dashMobileMenuItem" onClick={openLogoutModal}>
                    <LogOut className="h-4 w-4 shrink-0" />
                    <span className="dashMobileMenuText">Logout</span>
                </button>
            </MobileHamburgerMenu>
        </header>
    );
}

type LogoutConfirmModalProps = {
    show: boolean;
    loggingOut: boolean;
    onClose: () => void;
    onConfirm: () => void;
};

function LogoutConfirmModal({ show, loggingOut, onClose, onConfirm }: LogoutConfirmModalProps) {
    if (!show) {
        return null;
    }

    return (
        <div className="dashLobbyOverlay" onClick={onClose}>
            <div className="dashLogoutModal" onClick={(event) => event.stopPropagation()}>
                <h3>Log out</h3>
                <p>Are you sure you want to log out?</p>
                <div className="dashLobbyActions">
                    <button className="btn-secondary" type="button" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="btn-primary" type="button" onClick={onConfirm} disabled={loggingOut}>
                        {loggingOut ? 'Logging out...' : 'Log out'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export function DashboardPage({
    uid,
    theme,
    onThemeChange
}: {
    uid: string;
    theme: AppTheme;
    onThemeChange: (theme: AppTheme) => void;
}) {
    const REMOVE_COOLDOWN_MS = 3000;
    const OBSERVER_REMOVE_COOLDOWN_MS = 5000;
    const navigate = useNavigate();
    const [initError, setInitError] = useState('');
    const [isBootstrapped, setIsBootstrapped] = useState(false);
    const [showUserModal, setShowUserModal] = useState(false);
    const [profileDisplayName, setProfileDisplayName] = useState('');
    const [profileCountryCode, setProfileCountryCode] = useState('');
    const [profileError, setProfileError] = useState('');
    const [savingProfile, setSavingProfile] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [passwordChangeError, setPasswordChangeError] = useState('');
    const [passwordChangeSuccess, setPasswordChangeSuccess] = useState('');
    const [changingPassword, setChangingPassword] = useState(false);
    const [passwordResetMessage, setPasswordResetMessage] = useState('');
    const [passwordResetError, setPasswordResetError] = useState('');
    const [sendingPasswordReset, setSendingPasswordReset] = useState(false);
    const [deletePassword, setDeletePassword] = useState('');
    const [deleteConfirmText, setDeleteConfirmText] = useState('');
    const [deleteError, setDeleteError] = useState('');
    const [deletingAccount, setDeletingAccount] = useState(false);
    const [exportError, setExportError] = useState('');
    const [exportingData, setExportingData] = useState(false);
    const [copiedField, setCopiedField] = useState('');
    const [nowMs, setNowMs] = useState(() => Date.now());
    const [liveMove, setLiveMove] = useState<number | null>(null);
    const [showHeaderMobileMenu, setShowHeaderMobileMenu] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [loggingOut, setLoggingOut] = useState(false);
    const [showLogoutLoadingOverlay, setShowLogoutLoadingOverlay] = useState(false);
    const headerRef = useRef<HTMLElement | null>(null);
    const user = useUserStore((state) => state.fbUser);
    const hasLoadedUserSnapshot = useUserStore((state) => state.hasLoadedSnapshot);
    const subUser = useUserStore((state) => state.subFirebaseConnect);
    const unSubUser = useUserStore((state) => state.unSubFirebaseConnect);

    const [soundMuted, setSoundMutedState] = useSoundMuteSync(uid, user.soundMuted, !!user.uid && user.uid === uid);

    const duel = useGameStore((state) => state.duel);
    const duelLoaded = useGameStore((state) => state.duelLoaded);
    const gemsLoaded = useGameStore((state) => state.gemsLoaded);
    const reflexLoaded = useGameStore((state) => state.reflexLoaded);
    const subGame = useGameStore((state) => state.subFirebaseConnect);
    const unSubGame = useGameStore((state) => state.unSubFirebaseConnect);
    const prevPlayersLenRef = useRef(duel.players.length);
    const prevStartedRef = useRef(duel.isStarted);
    const presenceMap = usePresenceMap();
    const passwordResetCooldown = usePasswordResetCooldown();

    useEffect(() => {
        let cancelled = false;

        const bootstrapDocs = async () => {
            try {
                const currentAuthUser = auth.currentUser;
                const userDocRef = doc(usersRef, uid);
                let userSnap = await getDoc(userDocRef);
                // Fresh email/password accounts may reach Dashboard before Firestore doc propagates.
                // Retry briefly before creating any fallback profile data.
                const isPasswordUser = currentAuthUser?.providerData.some((provider) => provider.providerId === 'password');
                if (!userSnap.exists() && isPasswordUser) {
                    for (let attempt = 0; attempt < 8; attempt += 1) {
                        await new Promise<void>((resolve) => {
                            window.setTimeout(resolve, 200);
                        });
                        userSnap = await getDoc(userDocRef);
                        if (userSnap.exists()) break;
                    }
                }
                const now = serverTimestamp();
                const fallbackDisplayName = `Player-${uid.slice(0, 6)}`;
                const authDisplayName = sanitizeDisplayName(currentAuthUser?.displayName || '');
                const snapshotDisplayName = sanitizeDisplayName((userSnap.data()?.displayName as string) || '');
                const initialDisplayName = authDisplayName || fallbackDisplayName;
                const initialDisplayNameKey = normalizeDisplayName(initialDisplayName || uid);
                // Firestore user profile is the source of truth; auth fallback is used only when doc is missing.
                const resolvedDisplayName = snapshotDisplayName || authDisplayName || fallbackDisplayName;
                const resolvedDisplayNameKey = normalizeDisplayName(resolvedDisplayName || uid);

                if (!userSnap.exists()) {
                    await setDoc(
                        userDocRef,
                        {
                            uid,
                            email: currentAuthUser?.email || '',
                            displayName: initialDisplayName,
                            displayNameKey: initialDisplayNameKey,
                            game: '',
                            readyToGame: false,
                            status: 'online',
                            online: deleteField(),
                            timestamp: now,
                            createdAt: now,
                            updatedAt: now,
                            lastSeenAt: now,
                            schemaVersion: 1,
                            soundMuted: isSoundMuted(),
                            countryCode: guessCountryFromLocale()
                        },
                        { merge: true }
                    );
                } else {
                    const data = userSnap.data() as Record<string, unknown>;
                    await setDoc(
                        userDocRef,
                        {
                            uid,
                            email: currentAuthUser?.email || (data.email as string) || '',
                            displayName: resolvedDisplayName,
                            displayNameKey: (data.displayNameKey as string) || resolvedDisplayNameKey,
                            game: (data.game as string) || '',
                            readyToGame: (data.readyToGame as boolean) || false,
                            status: (data.status as string) || 'online',
                            online: deleteField(),
                            timestamp: now,
                            createdAt: data.createdAt ?? now,
                            updatedAt: now,
                            lastSeenAt: now,
                            schemaVersion: typeof data.schemaVersion === 'number' ? data.schemaVersion : 1,
                            soundMuted: soundMutedForProfileMerge(data.soundMuted),
                            countryCode: normalizeCountryCode(data.countryCode) ?? guessCountryFromLocale()
                        },
                        { merge: true }
                    );
                }

                const statusRefs = [gameStatusDuelRef, gameStatusGemsRef, gameStatusReflexRef];
                await Promise.all(
                    statusRefs.map(async (statusRef) => {
                        const snap = await getDoc(statusRef);
                        if (!snap.exists()) {
                            await setDoc(statusRef, { isStarted: false, players: [] }, { merge: true });
                        }
                    })
                );

                if (!cancelled) {
                    subUser(uid);
                    subGame();
                    setIsBootstrapped(true);
                }
            } catch (error) {
                if (!cancelled) {
                    setInitError((error as Error).message);
                    setIsBootstrapped(false);
                }
            }
        };

        bootstrapDocs();

        return () => {
            cancelled = true;
            unSubGame();
            unSubUser();
        };
    }, [subGame, subUser, uid, unSubGame, unSubUser]);

    useEffect(() => {
        if (
            duel.isStarted &&
            duel.players.find((player) => player.uid === uid) &&
            !duel.players.find((player) => !player.readyToGame)
        ) {
            const timer = setTimeout(() => navigate('/duel-game'), 1000);
            return () => clearTimeout(timer);
        }
    }, [duel.isStarted, duel.players, navigate, uid]);

    useEffect(() => {
        const prevLen = prevPlayersLenRef.current;
        const nextLen = duel.players.length;
        if (prevLen < 2 && nextLen === 2) {
            playUiSound('notify');
        }
        prevPlayersLenRef.current = nextLen;
    }, [duel.players.length]);

    useEffect(() => {
        const timer = window.setInterval(() => setNowMs(Date.now()), 500);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const wasStarted = prevStartedRef.current;
        if (!wasStarted && duel.isStarted) {
            playUiSound('start');
        }
        prevStartedRef.current = duel.isStarted;
    }, [duel.isStarted]);

    const inDuelLobby = useMemo(
        () => duel.players.some((player) => player.uid === uid),
        [duel.players, uid]
    );
    const currentLobbyPlayer = useMemo(
        () => duel.players.find((player) => player.uid === uid),
        [duel.players, uid]
    );
    const allReady = useMemo(
        () => duel.players.length === 2 && duel.players.every((player) => player.readyToGame),
        [duel.players]
    );
    const duelLobbyFull = useMemo(() => duel.players.length >= 2 && !inDuelLobby, [duel.players.length, inDuelLobby]);
    const canObserveDuel = useMemo(
        () => duel.players.length === 2 && duel.isStarted && !inDuelLobby,
        [duel.isStarted, duel.players.length, inDuelLobby]
    );
    const showDuelLobbyModal = useMemo(
        () => inDuelLobby && duel.players.length === 2 && !allReady && !duel.isStarted,
        [allReady, duel.isStarted, duel.players.length, inDuelLobby]
    );
    const duelStatus = useMemo(() => {
        if (duel.players.length === 0) return 'Free';
        if (duel.players.length === 2) return 'Busy';
        return 'Lobby';
    }, [duel.players.length]);
    const resolvedHeaderDisplayName = useMemo(
        () => sanitizeDisplayName(user.displayName || auth.currentUser?.displayName || ''),
        [user.displayName]
    );
    const resolvedHeaderEmail = useMemo(() => user.email || auth.currentUser?.email || '', [user.email]);
    const isUserSnapshotReady = hasLoadedUserSnapshot && user.uid === uid;
    const isHeaderIdentityReady = isUserSnapshotReady && Boolean(resolvedHeaderDisplayName || resolvedHeaderEmail);
    const countryOptions = useMemo(() => getCountrySelectOptions(), []);

    useEffect(() => {
        const unsubscribe = onSnapshot(tableGameDuelRef, (snapshot) => {
            if (!snapshot.exists()) {
                setLiveMove(null);
                return;
            }
            const data = snapshot.data() as { move?: number };
            setLiveMove(typeof data.move === 'number' ? data.move : null);
        });
        return () => unsubscribe();
    }, []);

    const toggleDuelLobby = async () => {
        if (!uid) return;
        if (duelLobbyFull) return;

        const currentAuthUser = auth.currentUser;
        const lobbyPlayer = {
            uid,
            displayName: user.displayName || currentAuthUser?.displayName || '',
            email: user.email || currentAuthUser?.email || '',
            game: 'Duel' as const,
            readyToGame: false,
            status: 'online',
            joinedAt: Date.now(),
            schemaVersion: 1,
            countryCode: normalizeCountryCode(user.countryCode) ?? guessCountryFromLocale()
        };

        if (inDuelLobby) {
            await removeUserFromLobby(uid);
            return;
        }

        await setDoc(
            doc(usersRef, uid),
            {
                game: 'Duel',
                readyToGame: false,
                status: 'online',
                online: deleteField(),
                timestamp: serverTimestamp(),
                updatedAt: serverTimestamp(),
                lastSeenAt: serverTimestamp(),
                schemaVersion: 1
            },
            { merge: true }
        );

        await runTransaction(db, async (tx) => {
            const duelStatusSnap = await tx.get(gameStatusDuelRef);
            const players = (duelStatusSnap.data()?.players ?? []) as Array<{
                uid: string;
                displayName: string;
                email: string;
                game: string;
                readyToGame: boolean;
                joinedAt?: number;
            }>;

            const exists = players.some((player) => player.uid === uid);
            const nextPlayers = exists ? players : [...players, lobbyPlayer];

            tx.set(
                gameStatusDuelRef,
                {
                    players: nextPlayers,
                    isStarted: false
                },
                { merge: true }
            );
        });
    };

    const removeUserFromLobby = async (targetUid: string) => {
        if (!targetUid) return;
        if (duel.isStarted) return;
        try {
            await runTransaction(db, async (tx) => {
                const duelStatusSnap = await tx.get(gameStatusDuelRef);
                if (!duelStatusSnap.exists()) return;
                const players = (duelStatusSnap.data()?.players ?? []) as Array<{
                    uid: string;
                    displayName: string;
                    email: string;
                    game: string;
                    readyToGame: boolean;
                    joinedAt?: number;
                }>;
                const nextPlayers = players.filter((player) => player.uid !== targetUid);
                tx.set(
                    gameStatusDuelRef,
                    {
                        players: nextPlayers,
                        isStarted: false
                    },
                    { merge: true }
                );
            });

            if (targetUid === uid) {
                await setDoc(
                    doc(usersRef, targetUid),
                    {
                        game: '',
                        readyToGame: false,
                        status: 'online',
                        online: deleteField(),
                        timestamp: serverTimestamp(),
                        updatedAt: serverTimestamp(),
                        lastSeenAt: serverTimestamp(),
                        schemaVersion: 1
                    },
                    { merge: true }
                );
            }
        } catch (error) {
            const message = (error as { message?: string }).message || 'Failed to update lobby.';
            setInitError(message);
        }
    };

    const readyUp = async () => {
        await setDoc(
            doc(usersRef, uid),
            {
                readyToGame: true,
                status: 'online',
                online: deleteField(),
                timestamp: serverTimestamp(),
                updatedAt: serverTimestamp(),
                lastSeenAt: serverTimestamp(),
                schemaVersion: 1
            },
            { merge: true }
        );

        await runTransaction(db, async (tx) => {
            const duelStatusSnap = await tx.get(gameStatusDuelRef);
            const players = (duelStatusSnap.data()?.players ?? []) as Array<{
                uid: string;
                displayName: string;
                email: string;
                game: string;
                readyToGame: boolean;
                joinedAt?: number;
            }>;

            const updated = players.map((player) =>
                player.uid === uid ? { ...player, readyToGame: true } : player
            );
            const shouldStart = updated.length === 2 && updated.every((player) => player.readyToGame);

            tx.set(
                gameStatusDuelRef,
                {
                    players: updated,
                    isStarted: shouldStart
                },
                { merge: true }
            );
        });
    };

    const leaveLobby = async () => {
        await removeUserFromLobby(uid);
    };

    const openLogoutModal = () => {
        setShowLogoutModal(true);
        setShowHeaderMobileMenu(false);
    };
    const toggleTheme = () => {
        onThemeChange(getNextTheme(theme));
    };
    const toggleSound = () => {
        const next = !soundMuted;
        setSoundMuted(next);
        setSoundMutedState(next);
        void persistUserSoundMuted(uid, next);
    };

    const logoutUser = async () => {
        if (loggingOut) return;
        setLoggingOut(true);
        setShowLogoutModal(false);
        setShowLogoutLoadingOverlay(true);
        try {
            if (inDuelLobby) {
                await removeUserFromLobby(uid);
            }
            await setRtdb(rtdbRef(rtdb, `status/${uid}`), {
                state: 'offline',
                lastChanged: rtdbServerTimestamp()
            });
            await setDoc(
                doc(usersRef, uid),
                {
                    status: 'offline',
                    online: deleteField(),
                    updatedAt: serverTimestamp(),
                    lastSeenAt: serverTimestamp(),
                    timestamp: serverTimestamp()
                },
                { merge: true }
            );
        } catch {
            // best effort before sign-out
        } finally {
            setLoggingOut(false);
            try {
                await signOut(auth);
            } catch {
                setShowLogoutLoadingOverlay(false);
            }
        }
    };

    const openUserProfileModal = () => {
        setProfileDisplayName(user.displayName || '');
        setProfileCountryCode(normalizeCountryCode(user.countryCode) ?? guessCountryFromLocale());
        setProfileError('');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
        setPasswordChangeError('');
        setPasswordChangeSuccess('');
        setPasswordResetMessage('');
        setPasswordResetError('');
        setDeletePassword('');
        setDeleteConfirmText('');
        setDeleteError('');
        setExportError('');
        setShowUserModal(true);
        setShowHeaderMobileMenu(false);
    };
    const isUserModalBusy = changingPassword || savingProfile || deletingAccount || exportingData || sendingPasswordReset;
    const closeUserProfileModal = () => {
        if (isUserModalBusy) return;
        setShowUserModal(false);
    };
    const handleUserModalOverlayMouseDown = (event: MouseEvent<HTMLDivElement>) => {
        if (event.target !== event.currentTarget) return;
        closeUserProfileModal();
    };
    const handleProfileFormSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        void saveProfile();
    };
    const handlePasswordFormSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        void changePassword();
    };
    const deleteAccountSelf = async () => {
        const currentUser = auth.currentUser;
        if (!currentUser || currentUser.uid !== uid) {
            setDeleteError('You need to be signed in to delete your account.');
            return;
        }
        if (deleteConfirmText.trim().toUpperCase() !== 'DELETE') {
            setDeleteError('Type DELETE to confirm account removal.');
            return;
        }

        setDeleteError('');
        setDeletingAccount(true);
        try {
            const providerIds = currentUser.providerData.map((provider) => provider.providerId);
            if (providerIds.includes('password')) {
                if (!currentUser.email) {
                    throw new Error('This account has no email attached. Contact support.');
                }
                if (!deletePassword) {
                    throw new Error('Enter your current password to continue.');
                }
                const credential = EmailAuthProvider.credential(currentUser.email, deletePassword);
                await reauthenticateWithCredential(currentUser, credential);
            } else if (providerIds.includes('google.com')) {
                await reauthenticateWithPopup(currentUser, googleProvider);
            } else {
                throw new Error('Unsupported provider for self-service account deletion.');
            }

            const userDocRef = doc(usersRef, uid);
            const statusRefs = [gameStatusDuelRef, gameStatusGemsRef, gameStatusReflexRef];
            const [userSnap, ...statusSnaps] = await Promise.all([
                getDoc(userDocRef),
                ...statusRefs.map((statusRef) => getDoc(statusRef))
            ]);
            const userDocData = userSnap.data() as Record<string, unknown> | undefined;
            const resolvedDisplayNameKey = (userDocData?.displayNameKey as string) ||
                normalizeDisplayName(
                    sanitizeDisplayName((userDocData?.displayName as string) || currentUser.displayName || uid) || uid
                );
            const ownedDisplayNamesSnap = await getDocs(query(displayNamesRef, where('uid', '==', uid)));

            const statusBatch = writeBatch(db);
            let hasStatusUpdates = false;
            for (let index = 0; index < statusRefs.length; index += 1) {
                const statusRef = statusRefs[index];
                const statusSnap = statusSnaps[index];
                if (!statusSnap.exists()) continue;

                const data = statusSnap.data() as Record<string, unknown>;
                const players = (data.players as Array<Record<string, unknown>> | undefined) ?? [];
                const isParticipant = players.some((player) => player.uid === uid);
                if (!isParticipant) continue;

                if (data.isStarted === true) {
                    throw new Error('Cannot delete account while participating in an active game.');
                }

                const nextPlayers = players
                    .filter((player) => player.uid !== uid);
                statusBatch.set(
                    statusRef,
                    {
                        players: nextPlayers,
                        isStarted: false
                    },
                    { merge: true }
                );
                hasStatusUpdates = true;
            }
            if (hasStatusUpdates) {
                await statusBatch.commit();
            }

            const displayNameKeysToDelete = new Set<string>();
            displayNameKeysToDelete.add(resolvedDisplayNameKey);
            ownedDisplayNamesSnap.forEach((displayNameDoc) => {
                displayNameKeysToDelete.add(displayNameDoc.id);
            });
            for (const displayNameKey of displayNameKeysToDelete) {
                if (!displayNameKey) continue;
                await deleteDoc(doc(displayNamesRef, displayNameKey));
            }

            if (userSnap.exists()) {
                try {
                    await deleteDoc(userDocRef);
                } catch (error) {
                    const code = (error as { code?: string }).code ?? '';
                    if (code !== 'permission-denied') throw error;

                    const deletedDisplayName = `Deleted-${uid.slice(0, 6)}`;
                    await setDoc(
                        userDocRef,
                        {
                            uid,
                            email: '',
                            displayName: deletedDisplayName,
                            displayNameKey: normalizeDisplayName(deletedDisplayName),
                            game: '',
                            readyToGame: false,
                            status: 'offline',
                            online: deleteField(),
                            timestamp: serverTimestamp(),
                            createdAt: userDocData?.createdAt ?? serverTimestamp(),
                            updatedAt: serverTimestamp(),
                            lastSeenAt: serverTimestamp(),
                            schemaVersion:
                                typeof userDocData?.schemaVersion === 'number'
                                    ? (userDocData.schemaVersion as number)
                                    : 1,
                            soundMuted: soundMutedForProfileMerge(userDocData?.soundMuted),
                        },
                        { merge: true }
                    );
                }
            }

            try {
                await setRtdb(rtdbRef(rtdb, `status/${uid}`), {
                    state: 'offline',
                    lastChanged: rtdbServerTimestamp()
                });
            } catch {
                // Presence cleanup is best effort.
            }

            await deleteUser(currentUser);
        } catch (error) {
            const code = (error as { code?: string }).code ?? '';
            if (code === 'permission-denied') {
                setDeleteError('Permission denied during cleanup. Deploy latest Firestore rules and try again.');
            } else {
                setDeleteError((error as Error).message || 'Failed to delete account.');
            }
        } finally {
            setDeletingAccount(false);
        }
    };

    const formatUserTimestamp = (value: unknown) => {
        if (!value) return '-';
        if (typeof value === 'object' && value !== null && 'toDate' in value) {
            const asTs = value as { toDate: () => Date };
            return asTs.toDate().toLocaleString();
        }
        return '-';
    };
    const getLobbyJoinedAtMs = (value: unknown) => {
        if (typeof value === 'number') return value;
        if (typeof value === 'object' && value !== null) {
            if ('toDate' in value) {
                const withToDate = value as { toDate: () => Date };
                return withToDate.toDate().getTime();
            }
            if ('seconds' in value) {
                const withSeconds = value as { seconds: number };
                return withSeconds.seconds * 1000;
            }
        }
        return null;
    };
    const getRemoveCooldown = (joinedAtMs: number | null, cooldownMs: number) => {
        if (!joinedAtMs || cooldownMs <= 0) {
            return {
                canRemove: true,
                progressDeg: '360deg',
                secondsLeft: 0
            };
        }
        const elapsedMs = nowMs - joinedAtMs;
        const clampedElapsed = Math.max(0, Math.min(elapsedMs, cooldownMs));
        const progress = clampedElapsed / cooldownMs;
        const remainingMs = Math.max(0, cooldownMs - elapsedMs);
        return {
            canRemove: remainingMs <= 0,
            progressDeg: `${Math.round(progress * 360)}deg`,
            secondsLeft: Math.ceil(remainingMs / 1000)
        };
    };
    const duelLobbyCreatedAtMs = useMemo(() => {
        if (duel.players.length !== 2) return null;
        const joinedTimes = duel.players
            .map((player) => getLobbyJoinedAtMs(player.joinedAt))
            .filter((value): value is number => typeof value === 'number');
        if (!joinedTimes.length) return null;
        return Math.max(...joinedTimes);
    }, [duel.players]);
    const canObserverKickWhileCreating = duel.players.length === 2 && !duel.isStarted && !inDuelLobby;
    const getPresence = (id: string) => presenceMap[id] || 'offline';
    const hasPasswordProvider = auth.currentUser?.providerData.some((provider) => provider.providerId === 'password');
    const toExportSafeData = (value: unknown): unknown => {
        if (value === null || value === undefined) return value;
        if (Array.isArray(value)) return value.map((item) => toExportSafeData(item));
        if (typeof value === 'object') {
            if ('toDate' in (value as Record<string, unknown>) && typeof (value as { toDate: () => Date }).toDate === 'function') {
                return (value as { toDate: () => Date }).toDate().toISOString();
            }
            const entries = Object.entries(value as Record<string, unknown>).map(([key, nested]) => [
                key,
                toExportSafeData(nested)
            ]);
            return Object.fromEntries(entries);
        }
        return value;
    };
    const copyFieldValue = async (key: string, value: string) => {
        if (!value) return;
        try {
            await navigator.clipboard.writeText(value);
            setCopiedField(key);
            window.setTimeout(() => {
                setCopiedField((prev) => (prev === key ? '' : prev));
            }, 1200);
        } catch {
            // Clipboard access can fail in some contexts; ignore silently.
        }
    };
    const exportAccountData = async () => {
        setExportError('');
        setExportingData(true);
        try {
            const userDocRef = doc(usersRef, uid);
            const [userSnap, duelStatusSnap, gemsStatusSnap, reflexStatusSnap, duelTableSnap, presenceSnap] = await Promise.all([
                getDoc(userDocRef),
                getDoc(gameStatusDuelRef),
                getDoc(gameStatusGemsRef),
                getDoc(gameStatusReflexRef),
                getDoc(tableGameDuelRef),
                getRtdb(rtdbRef(rtdb, `status/${uid}`))
            ]);

            const userData = (userSnap.data() as Record<string, unknown> | undefined) ?? null;
            const displayNameKey = (userData?.displayNameKey as string | undefined) || normalizeDisplayName(uid);
            const displayNameSnap = await getDoc(doc(displayNamesRef, displayNameKey));
            const currentUid = auth.currentUser?.uid || uid;
            const extractLobbyData = (snapshotData: Record<string, unknown> | undefined) => {
                const players = (snapshotData?.players as Array<Record<string, unknown>> | undefined) ?? [];
                return {
                    isStarted: snapshotData?.isStarted ?? false,
                    yourPlayerRecord: players.find((player) => player.uid === currentUid) ?? null,
                    allPlayers: players
                };
            };

            const duelData = (duelTableSnap.data() as Record<string, unknown> | undefined) ?? undefined;
            const duelParticipation =
                duelData &&
                ((duelData.player1 as { user?: { uid?: string } } | undefined)?.user?.uid === currentUid ||
                    (duelData.player2 as { user?: { uid?: string } } | undefined)?.user?.uid === currentUid)
                    ? duelData
                    : null;

            const payload = toExportSafeData({
                exportedAt: new Date().toISOString(),
                userId: uid,
                auth: {
                    email: auth.currentUser?.email || user.email || '',
                    providerIds: auth.currentUser?.providerData.map((provider) => provider.providerId) || []
                },
                profile: userData,
                displayNameIndex: displayNameSnap.exists() ? displayNameSnap.data() : null,
                presence: presenceSnap.exists() ? presenceSnap.val() : null,
                gameStatus: {
                    duel: extractLobbyData(duelStatusSnap.data() as Record<string, unknown> | undefined),
                    gems: extractLobbyData(gemsStatusSnap.data() as Record<string, unknown> | undefined),
                    reflex: extractLobbyData(reflexStatusSnap.data() as Record<string, unknown> | undefined)
                },
                duelGameTable: duelParticipation
            });

            const blob = new Blob([JSON.stringify(payload, null, 2)], {
                type: 'application/json;charset=utf-8'
            });
            const url = URL.createObjectURL(blob);
            const anchor = document.createElement('a');
            const stamp = new Date().toISOString().replace(/[:.]/g, '-');
            anchor.href = url;
            anchor.download = `account-export-${uid}-${stamp}.json`;
            document.body.appendChild(anchor);
            anchor.click();
            anchor.remove();
            URL.revokeObjectURL(url);
        } catch (error) {
            setExportError((error as Error).message || 'Failed to export account data.');
        } finally {
            setExportingData(false);
        }
    };
    const renderReadonlyField = (label: string, value: string, fieldKey: string, isLoading = false) => (
        <label className="dashUserField">
            <span>{label}</span>
            <div className="dashReadonlyInputWrap">
                {isLoading ? (
                    <div className="input dashReadonlyInput dashReadonlyInputSkeleton" aria-hidden>
                        <SkeletonInput />
                    </div>
                ) : (
                    <>
                        <input className="input dashReadonlyInput" value={value} readOnly />
                        <button
                            type="button"
                            className="dashInputCopyBtn"
                            onClick={() => copyFieldValue(fieldKey, value)}
                            title={copiedField === fieldKey ? 'Copied' : 'Copy value'}
                        >
                            {copiedField === fieldKey ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                        </button>
                    </>
                )}
            </div>
        </label>
    );

    const sendPasswordResetEmailToAccount = async () => {
        const accountEmail = auth.currentUser?.email || user.email || '';
        if (!accountEmail) {
            setPasswordResetError('No email on this account.');
            setPasswordResetMessage('');
            return;
        }
        if (sendingPasswordReset || changingPassword) return;
        if (!passwordResetCooldown.canSendReset()) {
            setPasswordResetError(passwordResetCooldown.getCooldownBlockedMessage());
            setPasswordResetMessage('');
            return;
        }

        setPasswordResetError('');
        setPasswordResetMessage('');
        setSendingPasswordReset(true);
        try {
            await sendAccountPasswordResetEmail(accountEmail);
            setPasswordResetMessage(PASSWORD_RESET_SENT_MESSAGE);
            passwordResetCooldown.startCooldown();
        } catch (error) {
            setPasswordResetError(mapPasswordResetError(error));
        } finally {
            setSendingPasswordReset(false);
        }
    };

    const changePassword = async () => {
        const currentUser = auth.currentUser;
        if (!currentUser || currentUser.uid !== uid) {
            setPasswordChangeError('You need to be signed in to change your password.');
            setPasswordChangeSuccess('');
            return;
        }
        if (!currentUser.email) {
            setPasswordChangeError('This account has no email attached.');
            setPasswordChangeSuccess('');
            return;
        }
        if (!currentPassword) {
            setPasswordChangeError('Enter your current password.');
            setPasswordChangeSuccess('');
            return;
        }
        if (newPassword.length < MIN_PASSWORD_LENGTH) {
            setPasswordChangeError(`New password must have at least ${MIN_PASSWORD_LENGTH} characters.`);
            setPasswordChangeSuccess('');
            return;
        }
        if (newPassword.length > MAX_PASSWORD_LENGTH) {
            setPasswordChangeError(`New password is too long (max ${MAX_PASSWORD_LENGTH} characters).`);
            setPasswordChangeSuccess('');
            return;
        }
        if (newPassword !== confirmNewPassword) {
            setPasswordChangeError('New passwords do not match.');
            setPasswordChangeSuccess('');
            return;
        }
        if (currentPassword === newPassword) {
            setPasswordChangeError('New password must be different from the current one.');
            setPasswordChangeSuccess('');
            return;
        }

        setPasswordChangeError('');
        setPasswordChangeSuccess('');
        setProfileError('');
        setChangingPassword(true);
        try {
            const credential = EmailAuthProvider.credential(currentUser.email, currentPassword);
            try {
                await reauthenticateWithCredential(currentUser, credential);
            } catch (reauthError) {
                setPasswordChangeError(mapPasswordChangeError(reauthError));
                return;
            }

            try {
                await updatePassword(currentUser, newPassword);
            } catch (updateError) {
                setPasswordChangeError(mapPasswordChangeError(updateError));
                return;
            }

            setCurrentPassword('');
            setNewPassword('');
            setConfirmNewPassword('');
            setDeletePassword('');
            setPasswordChangeSuccess('Password updated successfully.');
        } finally {
            setChangingPassword(false);
        }
    };

    const saveProfile = async () => {
        const displayName = sanitizeDisplayName(profileDisplayName);
        if (!displayName) {
            setProfileError('Display name is required.');
            return;
        }
        if (displayName.length < 2) {
            setProfileError('Display name must have at least 2 characters.');
            return;
        }
        if (displayName.length > MAX_DISPLAY_NAME_LENGTH) {
            setProfileError(`Display name is too long (max ${MAX_DISPLAY_NAME_LENGTH} characters).`);
            return;
        }
        const countryNorm = normalizeCountryCode(profileCountryCode);
        if (!countryNorm) {
            setProfileError('Choose a valid country.');
            return;
        }

        setSavingProfile(true);
        setProfileError('');
        try {
            await runTransaction(db, async (tx) => {
                const userDocRef = doc(usersRef, uid);
                const statusRefs = [gameStatusDuelRef, gameStatusGemsRef, gameStatusReflexRef];
                const displayNameKey = normalizeDisplayName(displayName);
                const userSnap = await tx.get(userDocRef);
                const currentDisplayName = sanitizeDisplayName((userSnap.data()?.displayName as string) || '');
                const currentDisplayNameKey = (userSnap.data()?.displayNameKey as string) ||
                    normalizeDisplayName(currentDisplayName || uid);
                const statusSnaps = await Promise.all(statusRefs.map((statusRef) => tx.get(statusRef)));
                const nextDisplayNameRef = doc(displayNamesRef, displayNameKey);
                const currentDisplayNameRef = doc(displayNamesRef, currentDisplayNameKey);
                const [nextDisplayNameSnap, currentDisplayNameSnap] = await Promise.all([
                    tx.get(nextDisplayNameRef),
                    tx.get(currentDisplayNameRef)
                ]);

                if (nextDisplayNameSnap.exists()) {
                    const ownerUid = nextDisplayNameSnap.data()?.uid as string;
                    if (ownerUid !== uid) {
                        throw new Error('Display name is already taken.');
                    }
                }

                tx.set(
                    userDocRef,
                    {
                        displayName,
                        displayNameKey,
                        countryCode: countryNorm,
                        updatedAt: serverTimestamp(),
                        timestamp: serverTimestamp()
                    },
                    { merge: true }
                );

                for (let index = 0; index < statusRefs.length; index += 1) {
                    const statusRef = statusRefs[index];
                    const statusSnap = statusSnaps[index];
                    if (!statusSnap.exists()) continue;

                    const players = (statusSnap.data()?.players ?? []) as Array<Record<string, unknown>>;
                    if (!Array.isArray(players) || !players.length) continue;

                    let changed = false;
                    const nextPlayers = players.map((player) => {
                        if (player.uid === uid) {
                            changed = true;
                            return {
                                ...player,
                                displayName,
                                countryCode: countryNorm
                            };
                        }
                        return player;
                    });

                    if (changed) {
                        tx.set(
                            statusRef,
                            {
                                players: nextPlayers
                            },
                            { merge: true }
                        );
                    }
                }

                tx.set(
                    nextDisplayNameRef,
                    {
                        uid,
                        displayName,
                        updatedAt: serverTimestamp(),
                        createdAt: nextDisplayNameSnap.exists()
                            ? nextDisplayNameSnap.data()?.createdAt ?? serverTimestamp()
                            : serverTimestamp()
                    },
                    { merge: true }
                );

                if (
                    currentDisplayNameKey &&
                    currentDisplayNameKey !== displayNameKey &&
                    currentDisplayNameSnap.exists() &&
                    currentDisplayNameSnap.data()?.uid === uid
                ) {
                    tx.delete(currentDisplayNameRef);
                }
            });

            if (auth.currentUser?.uid === uid) {
                await updateProfile(auth.currentUser, { displayName });
            }

            setShowUserModal(false);
        } catch (error) {
            setProfileError((error as Error).message || 'Failed to update user profile.');
        } finally {
            setSavingProfile(false);
        }
    };

    useEffect(() => {
        if (!showDuelLobbyModal && !showUserModal && !showLogoutModal) return;

        const prevBodyOverflow = document.body.style.overflow;
        const prevHtmlOverflow = document.documentElement.style.overflow;
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = prevBodyOverflow;
            document.documentElement.style.overflow = prevHtmlOverflow;
        };
    }, [showDuelLobbyModal, showLogoutModal, showUserModal]);

    useEffect(() => {
        const onResize = () => {
            if (window.innerWidth > 767) setShowHeaderMobileMenu(false);
        };
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    useEffect(() => {
        if (!showHeaderMobileMenu) return;
        const onPointerDown = (event: PointerEvent) => {
            const target = event.target as Node | null;
            if (headerRef.current?.contains(target)) return;
            setShowHeaderMobileMenu(false);
        };
        document.addEventListener('pointerdown', onPointerDown);
        return () => document.removeEventListener('pointerdown', onPointerDown);
    }, [showHeaderMobileMenu]);

    return (
        <main className="dashboardPage">
            <DashboardHeader
                headerRef={headerRef}
                isLoadingUser={!isHeaderIdentityReady}
                displayName={resolvedHeaderDisplayName}
                email={resolvedHeaderEmail}
                countryCode={user.countryCode}
                soundMuted={soundMuted}
                theme={theme}
                showHeaderMobileMenu={showHeaderMobileMenu}
                openUserProfileModal={openUserProfileModal}
                toggleSound={toggleSound}
                toggleTheme={toggleTheme}
                openLogoutModal={openLogoutModal}
                setShowHeaderMobileMenu={setShowHeaderMobileMenu}
            />

            {!!initError && (
                <section className="mb-3 rounded-2xl border border-red-300/40 bg-red-500/20 p-3 text-sm text-red-100">
                    Firebase init error: {initError}
                </section>
            )}

            <section className={`dashWrapper ${showDuelLobbyModal ? 'modalOpen' : ''}`}>
                <div className="dashScrollViewport dashGameContainer modalLikeScrollbar">
                    {/* <DashGameCardDummyPngPreview /> */}

                    <article className="dashCard" style={{ '--dash-clr': '#4589cc' } as CSSProperties}>
                        <div className="dashBox dashBoxTop">Video soon!</div>
                        <div className="dashBox dashBoxBottom">
                            <div className="dashButtonRow">
                                <button
                                    type="button"
                                    className={`dashCardButton ${inDuelLobby ? 'dashCardButtonLobby' : ''}`}
                                    onClick={() => {
                                        if (duelLobbyFull && !inDuelLobby) {
                                            if (canObserveDuel) navigate('/duel-game');
                                            return;
                                        }
                                        void toggleDuelLobby();
                                    }}
                                    disabled={!isBootstrapped || (duelLobbyFull && !inDuelLobby && !canObserveDuel)}
                                    title={
                                        duelLobbyFull && !inDuelLobby
                                            ? canObserveDuel
                                                ? 'Watch live game'
                                                : 'Game not started yet'
                                            : undefined
                                    }
                                >
                                    {inDuelLobby ? 'Exit' : duelLobbyFull ? 'Observe' : 'Lobby'}
                                </button>
                            </div>
                            <p>A board game inspired by a strategy game called '7 Wonders of the World'</p>
                            <div className="dashLobbyList">
                                {!duelLoaded ? (
                                    <LobbySkeleton rows={2} withTag />
                                ) : (
                                    <>
                                        {duel.players.map((player) => {
                                            const canLobbyPlayerKick = inDuelLobby && player.uid !== uid;
                                            const canObserverKick = canObserverKickWhileCreating;
                                            const shouldShowKick = canLobbyPlayerKick || canObserverKick;
                                            const removeCooldown = canObserverKick
                                                ? getRemoveCooldown(duelLobbyCreatedAtMs, OBSERVER_REMOVE_COOLDOWN_MS)
                                                : getRemoveCooldown(getLobbyJoinedAtMs(player.joinedAt), REMOVE_COOLDOWN_MS);
                                            const removeDisabled = !isBootstrapped || !removeCooldown.canRemove;
                                            const playerLabel = player.displayName || player.email;
                                            return (
                                                <div key={player.uid} className="dashLobbyRow">
                                                    <span className="truncate flex items-center gap-2">
                                                        <span
                                                            className={`dashPresenceDot ${
                                                                getPresence(player.uid) === 'online'
                                                                    ? 'dashPresenceOnline'
                                                                    : getPresence(player.uid) === 'away'
                                                                      ? 'dashPresenceAway'
                                                                      : 'dashPresenceOffline'
                                                            }`}
                                                        />
                                                        <UserFlag code={player.countryCode} className="text-base" />
                                                        {playerLabel ? (
                                                            playerLabel
                                                        ) : (
                                                            <SkeletonText className="dashSkeletonTextPlayer" />
                                                        )}
                                                    </span>
                                                    <div className="flex items-center gap-2">
                                                        <span className={player.readyToGame ? 'text-emerald-300' : 'text-amber-300'}>
                                                            {player.readyToGame ? 'ready' : 'waiting'}
                                                        </span>
                                                        {shouldShowKick && (
                                                            <button
                                                                type="button"
                                                                className={`dashRemoveButton ${
                                                                    removeCooldown.canRemove ? 'dashRemoveButtonReady' : 'dashRemoveButtonLocked'
                                                                }`}
                                                                style={
                                                                    {
                                                                        '--dash-remove-progress': removeCooldown.progressDeg
                                                                    } as CSSProperties
                                                                }
                                                                onClick={() => removeUserFromLobby(player.uid)}
                                                                disabled={removeDisabled || duel.isStarted}
                                                                title={
                                                                    duel.isStarted
                                                                        ? 'Cannot remove players while game is running'
                                                                        :
                                                                    !isBootstrapped
                                                                        ? 'Loading lobby data...'
                                                                        : removeCooldown.canRemove
                                                                          ? 'Remove player from lobby'
                                                                          : `Remove available in ${removeCooldown.secondsLeft}s`
                                                                }
                                                            >
                                                                <UserX className="h-3 w-3" />
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                        {!duel.players.length && <p className="dashLobbyEmptyText">No players in lobby.</p>}
                                        {duel.players.length === 2 && (
                                            <p className="text-[color:var(--app-accent-bright)]">
                                                {duel.isStarted
                                                    ? `Game in progress · Turn: ${typeof liveMove === 'number' ? liveMove + 1 : 1}`
                                                    : 'Creating game...'}
                                            </p>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="dashCircle">
                            <h2>Duel</h2>
                            <p>{duelStatus}</p>
                            <p>{`${duel.players.length}/2`}</p>
                        </div>
                    </article>

                    <article className="dashCard" style={{ '--dash-clr': '#26985a' } as CSSProperties}>
                        <div className="dashBox dashBoxTop">Video soon!</div>
                        <div className="dashBox dashBoxBottom">
                            <div className="dashButtonRow">
                                <button type="button" className="dashCardButton" disabled>
                                    Soon
                                </button>
                            </div>
                            <p>A board game inspired by a strategy game called 'Splendor'</p>
                            <div className="dashLobbyList">
                                {!gemsLoaded ? (
                                    <LobbySkeleton />
                                ) : (
                                    <p className="dashLobbyEmptyText">No players in lobby.</p>
                                )}
                            </div>
                        </div>
                        <div className="dashCircle">
                            <h2>Gems</h2>
                            <p>-</p>
                            <p>-</p>
                        </div>
                    </article>

                    <article className="dashCard" style={{ '--dash-clr': '#8b44a8' } as CSSProperties}>
                        <div className="dashBox dashBoxTop">Video soon!</div>
                        <div className="dashBox dashBoxBottom">
                            <div className="dashButtonRow">
                                <button type="button" className="dashCardButton" disabled>
                                    Soon
                                </button>
                            </div>
                            <p>Game written from 0 in canvasJS. Cooperation against zombies</p>
                            <div className="dashLobbyList">
                                {!reflexLoaded ? (
                                    <LobbySkeleton />
                                ) : (
                                    <p className="dashLobbyEmptyText">No players in lobby.</p>
                                )}
                            </div>
                        </div>
                        <div className="dashCircle">
                            <h2>Reflex</h2>
                            <p>-</p>
                            <p>-</p>
                        </div>
                    </article>
                </div>
            </section>
            {showDuelLobbyModal && (
                <div className="dashLobbyOverlay">
                    <div className="dashLobbyModal">
                        <h3>Duel lobby is full</h3>
                        <p>2 players are in lobby. Click Ready to start or Exit to leave lobby.</p>
                        <div className="dashLobbyPlayers">
                            {duel.players.map((player) => {
                                const removeCooldown = getRemoveCooldown(getLobbyJoinedAtMs(player.joinedAt), REMOVE_COOLDOWN_MS);
                                const removeDisabled = !isBootstrapped || !removeCooldown.canRemove;
                                const playerLabel = player.displayName || player.email;
                                return (
                                    <div key={`modal-${player.uid}`} className="dashLobbyPlayer">
                                        <span className="flex items-center gap-2">
                                            <span
                                                className={`dashPresenceDot ${
                                                    getPresence(player.uid) === 'online'
                                                        ? 'dashPresenceOnline'
                                                        : getPresence(player.uid) === 'away'
                                                          ? 'dashPresenceAway'
                                                          : 'dashPresenceOffline'
                                                }`}
                                            />
                                            <UserFlag code={player.countryCode} className="text-base" />
                                            {playerLabel ? playerLabel : <SkeletonText className="dashSkeletonTextPlayer" />}
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <span className={player.readyToGame ? 'text-emerald-300' : 'text-amber-300'}>
                                                {player.readyToGame ? 'ready' : 'waiting'}
                                            </span>
                                            {inDuelLobby && player.uid !== uid && (
                                                <button
                                                    type="button"
                                                    className={`dashRemoveButton ${
                                                        removeCooldown.canRemove ? 'dashRemoveButtonReady' : 'dashRemoveButtonLocked'
                                                    }`}
                                                    style={
                                                        {
                                                            '--dash-remove-progress': removeCooldown.progressDeg
                                                        } as CSSProperties
                                                    }
                                                    onClick={() => removeUserFromLobby(player.uid)}
                                                    disabled={removeDisabled || duel.isStarted}
                                                    title={
                                                        duel.isStarted
                                                            ? 'Cannot remove players while game is running'
                                                            :
                                                        !isBootstrapped
                                                            ? 'Loading lobby data...'
                                                            : removeCooldown.canRemove
                                                              ? 'Remove player from lobby'
                                                              : `Remove available in ${removeCooldown.secondsLeft}s`
                                                    }
                                                >
                                                    <UserX className="h-3 w-3" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="dashLobbyActions">
                            <button className="btn-primary" onClick={readyUp} disabled={currentLobbyPlayer?.readyToGame}>
                                {currentLobbyPlayer?.readyToGame ? 'Waiting...' : 'Ready'}
                            </button>
                            <button className="btn-secondary" type="button" onClick={leaveLobby}>
                                Exit
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {showUserModal && (
                <div className="dashLobbyOverlay" onMouseDown={handleUserModalOverlayMouseDown}>
                    <div className="dashUserModal" onMouseDown={(event) => event.stopPropagation()}>
                        <div className="dashUserModalHeader">
                            <h3>User profile</h3>
                            <p>Edit your account details.</p>
                        </div>
                        <div className="dashUserModalBody modalLikeScrollbar">
                            <form id={DASH_PROFILE_FORM_ID} className="dashUserProfileForm" noValidate onSubmit={handleProfileFormSubmit}>
                                <div className="dashUserGrid">
                                    {renderReadonlyField('UID', uid, 'uid')}
                                    {renderReadonlyField('Email', user.email || '', 'email', !isUserSnapshotReady || !user.email)}
                                    <label className="dashUserField">
                                        <span>Display name</span>
                                        <input
                                            className="input"
                                            value={profileDisplayName}
                                            onChange={(event) => setProfileDisplayName(event.target.value)}
                                            placeholder="Display name"
                                        />
                                    </label>
                                    <label className="dashUserField">
                                        <span>Country / region</span>
                                        <CountrySelect
                                            value={profileCountryCode}
                                            onChange={setProfileCountryCode}
                                            options={countryOptions}
                                        />
                                    </label>
                                    {renderReadonlyField('Connection status (auto)', getPresence(uid), 'connectionStatus')}
                                    {renderReadonlyField('Current game', user.game || '-', 'currentGame', !isUserSnapshotReady)}
                                    {renderReadonlyField(
                                        'Ready status',
                                        user.readyToGame ? 'ready' : 'not ready',
                                        'readyStatus',
                                        !isUserSnapshotReady
                                    )}
                                    {renderReadonlyField(
                                        'Created at',
                                        formatUserTimestamp(user.createdAt),
                                        'createdAt',
                                        !isUserSnapshotReady
                                    )}
                                    {renderReadonlyField('Last seen', formatUserTimestamp(user.lastSeenAt), 'lastSeen', !isUserSnapshotReady)}
                                </div>
                                {profileError && <p className="mt-2 text-sm text-red-300">{profileError}</p>}
                            </form>
                            {hasPasswordProvider && (
                                <form
                                    id={DASH_PASSWORD_FORM_ID}
                                    className="dashSecurityZone"
                                    noValidate
                                    onSubmit={handlePasswordFormSubmit}
                                >
                                    <h4>Password</h4>
                                    <p>Change your sign-in password. You will stay signed in.</p>
                                    <label className="dashUserField">
                                        <span>Current password</span>
                                        <PasswordInput
                                            value={currentPassword}
                                            onChange={setCurrentPassword}
                                            placeholder="Current password"
                                            autoComplete="current-password"
                                            disabled={changingPassword || savingProfile}
                                        />
                                    </label>
                                    <label className="dashUserField">
                                        <span>New password</span>
                                        <PasswordInput
                                            value={newPassword}
                                            onChange={setNewPassword}
                                            placeholder={`At least ${MIN_PASSWORD_LENGTH} characters`}
                                            autoComplete="new-password"
                                            minLength={MIN_PASSWORD_LENGTH}
                                            disabled={changingPassword || savingProfile}
                                        />
                                    </label>
                                    <label className="dashUserField">
                                        <span>Confirm new password</span>
                                        <PasswordInput
                                            value={confirmNewPassword}
                                            onChange={setConfirmNewPassword}
                                            placeholder="Repeat new password"
                                            autoComplete="new-password"
                                            minLength={MIN_PASSWORD_LENGTH}
                                            disabled={changingPassword || savingProfile}
                                        />
                                    </label>
                                    {passwordChangeError && (
                                        <p className="mt-2 text-sm text-red-300" role="alert">
                                            {passwordChangeError}
                                        </p>
                                    )}
                                    {passwordChangeSuccess && (
                                        <p className="mt-2 text-sm text-emerald-300" role="status">
                                            {passwordChangeSuccess}
                                        </p>
                                    )}
                                    <div className="dashPasswordResetBlock">
                                        <p className="dashPasswordResetHint">Forgot your current password?</p>
                                        <button
                                            type="button"
                                            className="btn-secondary dashPasswordResetBtn"
                                            disabled={
                                                sendingPasswordReset ||
                                                changingPassword ||
                                                savingProfile ||
                                                passwordResetCooldown.cooldownSecondsLeft > 0
                                            }
                                            onClick={sendPasswordResetEmailToAccount}
                                        >
                                            {sendingPasswordReset
                                                ? 'Sending...'
                                                : passwordResetCooldown.cooldownSecondsLeft > 0
                                                  ? `Wait ${passwordResetCooldown.cooldownSecondsLeft}s`
                                                  : 'Send reset link to my email'}
                                        </button>
                                        {passwordResetMessage && (
                                            <p className="mt-2 text-sm text-emerald-300" role="status">
                                                {passwordResetMessage}
                                            </p>
                                        )}
                                        {passwordResetError && (
                                            <p className="mt-2 text-sm text-red-300" role="alert">
                                                {passwordResetError}
                                            </p>
                                        )}
                                    </div>
                                    <div className="dashSecurityActions">
                                        <button type="submit" className="btn-secondary" disabled={changingPassword || savingProfile}>
                                            {changingPassword ? 'Updating...' : 'Change password'}
                                        </button>
                                    </div>
                                </form>
                            )}
                            <div className="dashDataZone">
                                <h4>Data export</h4>
                                <p>Download your account-related data as JSON.</p>
                                {exportError && <p className="mt-1 text-sm text-red-300">{exportError}</p>}
                                <div className="dashDataActions">
                                    <button
                                        type="button"
                                        className="btn-secondary"
                                        disabled={exportingData}
                                        onClick={exportAccountData}
                                    >
                                        {exportingData ? 'Exporting...' : 'Export my data'}
                                    </button>
                                </div>
                            </div>
                            <div className="dashDangerZone">
                                <h4>Danger zone</h4>
                                <p>
                                    Permanently delete account and profile data. Type DELETE to continue.
                                </p>
                                {hasPasswordProvider ? (
                                    <label className="dashUserField">
                                        <span>Current password</span>
                                        <PasswordInput
                                            value={deletePassword}
                                            onChange={setDeletePassword}
                                            placeholder="Enter current password"
                                            autoComplete="current-password"
                                            disabled={deletingAccount}
                                        />
                                    </label>
                                ) : (
                                    <p className="dashDangerHint">Google re-auth popup will be required.</p>
                                )}
                                <label className="dashUserField">
                                    <span>Confirmation</span>
                                    <input
                                        className="input"
                                        value={deleteConfirmText}
                                        onChange={(event) => setDeleteConfirmText(event.target.value)}
                                        placeholder="Type DELETE"
                                    />
                                </label>
                                {deleteError && <p className="mt-2 text-sm text-red-300">{deleteError}</p>}
                                <div className="dashDangerActions">
                                    <button
                                        type="button"
                                        className="btn-secondary dashDangerButton"
                                        disabled={deletingAccount}
                                        onClick={deleteAccountSelf}
                                    >
                                        {deletingAccount ? 'Deleting...' : 'Delete account permanently'}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="dashLobbyActions dashUserModalFooter">
                            <button type="button" className="btn-secondary" onClick={closeUserProfileModal} disabled={isUserModalBusy}>
                                Cancel
                            </button>
                            <button
                                type="submit"
                                form={DASH_PROFILE_FORM_ID}
                                className="btn-primary"
                                disabled={savingProfile || changingPassword}
                            >
                                {savingProfile ? 'Saving...' : 'Save'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <LogoutConfirmModal
                show={showLogoutModal}
                loggingOut={loggingOut}
                onClose={() => setShowLogoutModal(false)}
                onConfirm={logoutUser}
            />
            <LoadingOverlay state={showLogoutLoadingOverlay ? 'visible' : 'hidden'} />
        </main>
    );
}
