import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
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
import { Check, Copy, Gamepad2, LogOut, UserCircle2, UserX, Volume2, VolumeX } from 'lucide-react';
import {
    EmailAuthProvider,
    deleteUser,
    reauthenticateWithCredential,
    reauthenticateWithPopup,
    signOut,
    updateProfile
} from 'firebase/auth';
import { auth, db, googleProvider, rtdb } from '@/firebaseConfig';
import { useUserStore } from '@/store/useUserStore';
import { useGameStore } from '@/store/useGameStore';
import { displayNamesRef, gameStatusDuelRef, gameStatusGemsRef, gameStatusReflexRef, tableGameDuelRef, usersRef } from '@/firebase/refs';
import { isSoundMuted, playUiSound, setSoundMuted, setSoundScope } from '@/utils/sound';
import { persistUserSoundMuted } from '@/utils/persistUserSoundMuted';
import { usePresenceMap } from '@/hooks/usePresenceMap';
import { normalizeDisplayName, sanitizeDisplayName } from '@/utils/displayName';
import { getCountrySelectOptions, guessCountryFromLocale, normalizeCountryCode } from '@/utils/country';
import { CountrySelect } from '@/components/CountrySelect';
import { UserFlag } from '@/components/UserFlag';
import '@/styles/dashboard.css';

export function DashboardPage({ uid }: { uid: string }) {
    const REMOVE_COOLDOWN_MS = 3000;
    const navigate = useNavigate();
    const [initError, setInitError] = useState('');
    const [isBootstrapped, setIsBootstrapped] = useState(false);
    const [soundMuted, setSoundMutedState] = useState(() => isSoundMuted());
    const [showUserModal, setShowUserModal] = useState(false);
    const [profileDisplayName, setProfileDisplayName] = useState('');
    const [profileCountryCode, setProfileCountryCode] = useState('');
    const [profileError, setProfileError] = useState('');
    const [savingProfile, setSavingProfile] = useState(false);
    const [deletePassword, setDeletePassword] = useState('');
    const [deleteConfirmText, setDeleteConfirmText] = useState('');
    const [deleteError, setDeleteError] = useState('');
    const [deletingAccount, setDeletingAccount] = useState(false);
    const [exportError, setExportError] = useState('');
    const [exportingData, setExportingData] = useState(false);
    const [copiedField, setCopiedField] = useState('');
    const [nowMs, setNowMs] = useState(() => Date.now());
    const [liveMove, setLiveMove] = useState<number | null>(null);
    const user = useUserStore((state) => state.fbUser);
    const subUser = useUserStore((state) => state.subFirebaseConnect);
    const unSubUser = useUserStore((state) => state.unSubFirebaseConnect);

    const duel = useGameStore((state) => state.duel);
    const subGame = useGameStore((state) => state.subFirebaseConnect);
    const unSubGame = useGameStore((state) => state.unSubFirebaseConnect);
    const prevPlayersLenRef = useRef(duel.players.length);
    const prevStartedRef = useRef(duel.isStarted);
    const presenceMap = usePresenceMap();

    useEffect(() => {
        setSoundScope(uid);
        setSoundMutedState(isSoundMuted());
    }, [uid]);

    useEffect(() => {
        if (!user.uid || user.uid !== uid) return;
        if (typeof user.soundMuted !== 'boolean') return;
        if (user.soundMuted === isSoundMuted()) return;
        setSoundMuted(user.soundMuted);
        setSoundMutedState(user.soundMuted);
    }, [user.soundMuted, user.uid, uid]);

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
                            soundMuted:
                                typeof data.soundMuted === 'boolean' ? data.soundMuted : isSoundMuted(),
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

        const nextPlayers = duel.players
            .filter((player) => player.uid !== targetUid)
            .map((player) => ({ ...player, readyToGame: false }));

        const batch = writeBatch(db);
        batch.set(
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
        nextPlayers.forEach((player) => {
            batch.set(
                doc(usersRef, player.uid),
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
        });
        batch.set(
            gameStatusDuelRef,
            {
                players: nextPlayers,
                isStarted: false
            },
            { merge: true }
        );
        await batch.commit();
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
    const logoutUser = async () => {
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
            await signOut(auth);
        }
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
                    .filter((player) => player.uid !== uid)
                    .map((player) => ({ ...player, readyToGame: false }));
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
                            soundMuted:
                                typeof userDocData?.soundMuted === 'boolean'
                                    ? (userDocData.soundMuted as boolean)
                                    : isSoundMuted()
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
    const getRemoveCooldown = (joinedAt: unknown) => {
        const joinedAtMs = getLobbyJoinedAtMs(joinedAt);
        if (!joinedAtMs) {
            return {
                canRemove: true,
                progressDeg: '360deg',
                secondsLeft: 0
            };
        }
        const elapsedMs = nowMs - joinedAtMs;
        const clampedElapsed = Math.max(0, Math.min(elapsedMs, REMOVE_COOLDOWN_MS));
        const progress = clampedElapsed / REMOVE_COOLDOWN_MS;
        const remainingMs = Math.max(0, REMOVE_COOLDOWN_MS - elapsedMs);
        return {
            canRemove: remainingMs <= 0,
            progressDeg: `${Math.round(progress * 360)}deg`,
            secondsLeft: Math.ceil(remainingMs / 1000)
        };
    };
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
    const renderReadonlyField = (label: string, value: string, fieldKey: string) => (
        <label className="dashUserField">
            <span>{label}</span>
            <div className="dashReadonlyInputWrap">
                <input className="input dashReadonlyInput" value={value} readOnly />
                <button
                    type="button"
                    className="dashInputCopyBtn"
                    onClick={() => copyFieldValue(fieldKey, value)}
                    title={copiedField === fieldKey ? 'Copied' : 'Copy value'}
                >
                    {copiedField === fieldKey ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
            </div>
        </label>
    );

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
        if (!showDuelLobbyModal && !showUserModal) return;

        const prevBodyOverflow = document.body.style.overflow;
        const prevHtmlOverflow = document.documentElement.style.overflow;
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = prevBodyOverflow;
            document.documentElement.style.overflow = prevHtmlOverflow;
        };
    }, [showDuelLobbyModal, showUserModal]);

    return (
        <main className="dashboardPage">
            <header className="dashHeader app-surface-header">
                <div className="dashTitleMain">
                    <Gamepad2 className="app-brand-icon" aria-hidden />
                    Feed Panel
                </div>
                <div className="flex min-w-0 shrink items-center gap-2">
                    <button
                        className="btn-secondary hdrIconBtn"
                        onClick={() => {
                            setProfileDisplayName(user.displayName || '');
                            setProfileCountryCode(normalizeCountryCode(user.countryCode) ?? guessCountryFromLocale());
                            setProfileError('');
                            setDeletePassword('');
                            setDeleteConfirmText('');
                            setDeleteError('');
                            setExportError('');
                            setShowUserModal(true);
                        }}
                        title={
                            (user.displayName || user.email || 'User') +
                            ' — profile'
                        }
                    >
                        <UserCircle2 className="h-4 w-4 shrink-0" />
                        <span className="hdrBtnLabelGroup inline-flex min-w-0 items-center gap-1.5">
                            <UserFlag code={user.countryCode} className="text-base shrink-0" />
                            <span className="hdrBtnText">{user.displayName || user.email || 'User'}</span>
                        </span>
                    </button>
                    <button
                        className="btn-secondary hdrIconBtn"
                        onClick={() => {
                            const next = !soundMuted;
                            setSoundMuted(next);
                            setSoundMutedState(next);
                            void persistUserSoundMuted(uid, next);
                        }}
                        title={soundMuted ? 'Unmute sounds' : 'Mute sounds'}
                    >
                        {soundMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                        <span className="hdrBtnText">{soundMuted ? 'Muted' : 'Sound'}</span>
                    </button>
                    <button className="btn-secondary hdrIconBtn" title="Log out" onClick={logoutUser}>
                        <LogOut className="h-4 w-4" />
                        <span className="hdrBtnText">Logout</span>
                    </button>
                </div>
            </header>

            {!!initError && (
                <section className="mb-3 rounded-2xl border border-red-300/40 bg-red-500/20 p-3 text-sm text-red-100">
                    Firebase init error: {initError}
                </section>
            )}

            <section className={`dashWrapper ${showDuelLobbyModal ? 'modalOpen' : ''}`}>
                <div className="dashGameContainer">
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
                                {duel.players.map((player) => {
                                    const removeCooldown = getRemoveCooldown(player.joinedAt);
                                    const removeDisabled = !isBootstrapped || !removeCooldown.canRemove;
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
                                                {player.displayName || player.email}
                                            </span>
                                            <div className="flex items-center gap-2">
                                                <span className={player.readyToGame ? 'text-emerald-300' : 'text-amber-300'}>
                                                    {player.readyToGame ? 'ready' : 'waiting'}
                                                </span>
                                                {player.uid !== uid && (
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
                                                                  ? 'Remove user from lobby'
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
                                {!duel.players.length && <p className="opacity-70">No players in lobby.</p>}
                                {duel.players.length === 2 && (
                                    <p className="text-[color:var(--app-accent-bright)]">
                                        {duel.isStarted
                                            ? `Game in progress · Turn: ${typeof liveMove === 'number' ? liveMove + 1 : 1}`
                                            : 'Creating game...'}
                                    </p>
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
                                <p className="opacity-70">No players in lobby.</p>
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
                                <p className="opacity-70">No players in lobby.</p>
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
                                const removeCooldown = getRemoveCooldown(player.joinedAt);
                                const removeDisabled = !isBootstrapped || !removeCooldown.canRemove;
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
                                            {player.displayName || player.email}
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <span className={player.readyToGame ? 'text-emerald-300' : 'text-amber-300'}>
                                                {player.readyToGame ? 'ready' : 'waiting'}
                                            </span>
                                            {player.uid !== uid && (
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
                                                              ? 'Remove user from lobby'
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
                <div className="dashLobbyOverlay" onClick={() => setShowUserModal(false)}>
                    <div className="dashUserModal" onClick={(event) => event.stopPropagation()}>
                        <div className="dashUserModalHeader">
                            <h3>User profile</h3>
                            <p>Edit your account details.</p>
                        </div>
                        <div className="dashUserModalBody modalLikeScrollbar">
                            <div className="dashUserGrid">
                                {renderReadonlyField('UID', uid, 'uid')}
                                {renderReadonlyField('Email', user.email || '', 'email')}
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
                                {renderReadonlyField('Current game', user.game || '-', 'currentGame')}
                                {renderReadonlyField(
                                    'Ready status',
                                    user.readyToGame ? 'ready' : 'not ready',
                                    'readyStatus'
                                )}
                                {renderReadonlyField(
                                    'Created at',
                                    formatUserTimestamp(user.createdAt),
                                    'createdAt'
                                )}
                                {renderReadonlyField('Last seen', formatUserTimestamp(user.lastSeenAt), 'lastSeen')}
                            </div>
                            {profileError && <p className="mt-2 text-sm text-red-300">{profileError}</p>}
                            <div className="dashDataZone">
                                <h4>Data export</h4>
                                <p>Download your account-related data as JSON.</p>
                                {exportError && <p className="mt-1 text-sm text-red-300">{exportError}</p>}
                                <div className="dashDataActions">
                                    <button className="btn-secondary" disabled={exportingData} onClick={exportAccountData}>
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
                                        <input
                                            type="password"
                                            className="input"
                                            value={deletePassword}
                                            onChange={(event) => setDeletePassword(event.target.value)}
                                            placeholder="Enter current password"
                                            autoComplete="current-password"
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
                            <button className="btn-secondary" onClick={() => setShowUserModal(false)}>
                                Cancel
                            </button>
                            <button className="btn-primary" disabled={savingProfile} onClick={saveProfile}>
                                {savingProfile ? 'Saving...' : 'Save'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
