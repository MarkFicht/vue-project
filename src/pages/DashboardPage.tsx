import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    doc, getDoc, runTransaction, serverTimestamp, setDoc, updateDoc, writeBatch
} from 'firebase/firestore';
import { ref as rtdbRef, serverTimestamp as rtdbServerTimestamp, set as setRtdb } from 'firebase/database';
import { Gamepad2, LogOut, UserCircle2, UserX, Volume2, VolumeX } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth, db, rtdb } from '@/firebaseConfig';
import { useUserStore } from '@/store/useUserStore';
import { useGameStore } from '@/store/useGameStore';
import { gameStatusDuelRef, gameStatusGemsRef, gameStatusReflexRef, usersRef } from '@/firebase/refs';
import { isSoundMuted, playUiSound, setSoundMuted, setSoundScope } from '@/utils/sound';
import { usePresenceMap } from '@/hooks/usePresenceMap';
import '@/styles/dashboard.css';

export function DashboardPage({ uid }: { uid: string }) {
    const navigate = useNavigate();
    const [initError, setInitError] = useState('');
    const [isBootstrapped, setIsBootstrapped] = useState(false);
    const [soundMuted, setSoundMutedState] = useState(() => isSoundMuted());
    const [showUserModal, setShowUserModal] = useState(false);
    const [profileDisplayName, setProfileDisplayName] = useState('');
    const [profileError, setProfileError] = useState('');
    const [savingProfile, setSavingProfile] = useState(false);
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
        let cancelled = false;

        const bootstrapDocs = async () => {
            try {
                const currentAuthUser = auth.currentUser;
                const userDocRef = doc(usersRef, uid);
                const userSnap = await getDoc(userDocRef);
                const now = serverTimestamp();

                if (!userSnap.exists()) {
                    await setDoc(
                        userDocRef,
                        {
                            uid,
                            email: currentAuthUser?.email || '',
                            displayName: currentAuthUser?.displayName || '',
                            game: '',
                            readyToGame: false,
                            online: 'online',
                            status: 'online',
                            timestamp: now,
                            createdAt: now,
                            updatedAt: now,
                            lastSeenAt: now,
                            schemaVersion: 1,
                            soundMuted: isSoundMuted()
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
                            displayName: currentAuthUser?.displayName || (data.displayName as string) || '',
                            game: (data.game as string) || '',
                            readyToGame: (data.readyToGame as boolean) || false,
                            online: (data.online as string) || 'online',
                            status: (data.status as string) || ((data.online as string) || 'online'),
                            timestamp: now,
                            createdAt: data.createdAt ?? now,
                            updatedAt: now,
                            lastSeenAt: now,
                            schemaVersion: typeof data.schemaVersion === 'number' ? data.schemaVersion : 1,
                            soundMuted:
                                typeof data.soundMuted === 'boolean' ? data.soundMuted : isSoundMuted()
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
    const showDuelLobbyModal = useMemo(
        () => inDuelLobby && duel.players.length === 2 && !allReady && !duel.isStarted,
        [allReady, duel.isStarted, duel.players.length, inDuelLobby]
    );
    const duelStatus = useMemo(() => {
        if (duel.players.length === 0) return 'Free';
        if (duel.players.length === 2) return 'Busy';
        return 'Lobby';
    }, [duel.players.length]);

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
            online: 'online',
            status: 'online',
            schemaVersion: 1
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
                online: 'online',
                status: 'online',
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
                online?: string;
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

        const nextPlayers = duel.players
            .filter((player) => player.uid !== targetUid)
            .map((player) => ({ ...player, readyToGame: false }));

        const batch = writeBatch(db);
        batch.set(
            doc(usersRef, targetUid),
            {
                game: '',
                readyToGame: false,
                online: 'online',
                status: 'online',
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
                    online: 'online',
                    status: 'online',
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
                online: 'online',
                status: 'online',
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
                online?: string;
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
                    online: 'offline',
                    status: 'offline',
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

    const formatUserTimestamp = (value: unknown) => {
        if (!value) return '-';
        if (typeof value === 'object' && value !== null && 'toDate' in value) {
            const asTs = value as { toDate: () => Date };
            return asTs.toDate().toLocaleString();
        }
        return '-';
    };
    const getPresence = (id: string) => presenceMap[id] || 'offline';

    const saveProfile = async () => {
        const displayName = profileDisplayName.trim();
        if (!displayName) {
            setProfileError('Display name is required.');
            return;
        }
        if (displayName.length < 2) {
            setProfileError('Display name must have at least 2 characters.');
            return;
        }

        setSavingProfile(true);
        setProfileError('');
        try {
            await updateDoc(doc(usersRef, uid), {
                displayName,
                updatedAt: serverTimestamp(),
                timestamp: serverTimestamp()
            });
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
            <header className="dashHeader">
                <div className="dashTitleMain">
                    <Gamepad2 className="text-cyan-300" />
                    Feed Panel
                </div>
                <div className="flex items-center gap-2">
                    <button
                        className="btn-secondary hdrIconBtn"
                        onClick={() => {
                            setProfileDisplayName(user.displayName || '');
                            setProfileError('');
                            setShowUserModal(true);
                        }}
                        title="User profile settings"
                    >
                        <UserCircle2 className="h-4 w-4" />
                        <span className="hdrBtnText">{user.displayName || user.email || 'User'}</span>
                    </button>
                    <button
                        className="btn-secondary hdrIconBtn"
                        onClick={() => {
                            const next = !soundMuted;
                            setSoundMuted(next);
                            setSoundMutedState(next);
                        }}
                        title={soundMuted ? 'Unmute sounds' : 'Mute sounds'}
                    >
                        {soundMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                        <span className="hdrBtnText">{soundMuted ? 'Muted' : 'Sound'}</span>
                    </button>
                    <button className="btn-secondary hdrIconBtn" onClick={logoutUser}>
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
                    <article className="dashCard" style={{ '--dash-clr': '#2196f3' } as CSSProperties}>
                        <div className="dashBox dashBoxTop">Video soon!</div>
                        <div className="dashBox dashBoxBottom">
                            <div className="dashButtonRow">
                                <button
                                    className={`dashCardButton ${inDuelLobby ? 'dashCardButtonLobby' : ''}`}
                                    onClick={toggleDuelLobby}
                                    disabled={!isBootstrapped || duelLobbyFull}
                                    title={duelLobbyFull ? 'Lobby is full (2/2)' : undefined}
                                >
                                    {inDuelLobby ? 'Exit' : duelLobbyFull ? 'Busy' : 'Lobby'}
                                </button>
                            </div>
                            <p>A board game inspired by a strategy game called '7 Wonders of the World'</p>
                            <div className="dashLobbyList">
                                {duel.players.map((player) => (
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
                                            {player.displayName || player.email}
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <span className={player.readyToGame ? 'text-emerald-300' : 'text-amber-300'}>
                                                {player.readyToGame ? 'ready' : 'waiting'}
                                            </span>
                                            {inDuelLobby && (
                                                <button
                                                    type="button"
                                                    className="dashRemoveButton"
                                                    onClick={() => removeUserFromLobby(player.uid)}
                                                    disabled={!isBootstrapped}
                                                    title="Remove user from lobby"
                                                >
                                                    <UserX className="h-3 w-3" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                                {!duel.players.length && <p className="opacity-70">No players in lobby.</p>}
                                {allReady && <p className="text-cyan-300">Game starts shortly...</p>}
                            </div>
                        </div>
                        <div className="dashCircle">
                            <h2>Duel</h2>
                            <p>{duelStatus}</p>
                            <p>{`${duel.players.length}/2`}</p>
                        </div>
                    </article>

                    <article className="dashCard" style={{ '--dash-clr': '#008a1b' } as CSSProperties}>
                        <div className="dashBox dashBoxTop">Video soon!</div>
                        <div className="dashBox dashBoxBottom">
                            <div className="dashButtonRow">
                                <button className="dashCardButton" disabled>
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

                    <article className="dashCard" style={{ '--dash-clr': '#dc1dff' } as CSSProperties}>
                        <div className="dashBox dashBoxTop">Video soon!</div>
                        <div className="dashBox dashBoxBottom">
                            <div className="dashButtonRow">
                                <button className="dashCardButton" disabled>
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
                {showDuelLobbyModal && (
                    <div className="dashLobbyOverlay">
                        <div className="dashLobbyModal">
                            <h3>Duel lobby is full</h3>
                            <p>2 players are in lobby. Click Ready to start or Exit to leave lobby.</p>
                            <div className="dashLobbyPlayers">
                                {duel.players.map((player) => (
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
                                            {player.displayName || player.email}
                                        </span>
                                        <span className={player.readyToGame ? 'text-emerald-300' : 'text-amber-300'}>
                                            {player.readyToGame ? 'ready' : 'waiting'}
                                        </span>
                                    </div>
                                ))}
                            </div>
                            <div className="dashLobbyActions">
                                <button className="dashCardButton" onClick={readyUp} disabled={currentLobbyPlayer?.readyToGame}>
                                    {currentLobbyPlayer?.readyToGame ? 'Waiting...' : 'Ready'}
                                </button>
                                <button className="dashCardButton dashCardButtonLobby" onClick={leaveLobby}>
                                    Exit
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {showUserModal && (
                    <div className="dashLobbyOverlay" onClick={() => setShowUserModal(false)}>
                        <div className="dashUserModal" onClick={(event) => event.stopPropagation()}>
                            <h3>User profile</h3>
                            <p>Edit your account details.</p>
                            <div className="dashUserGrid">
                                <label className="dashUserField">
                                    <span>UID</span>
                                    <input className="input" value={uid} readOnly />
                                </label>
                                <label className="dashUserField">
                                    <span>Email</span>
                                    <input className="input" value={user.email || ''} readOnly />
                                </label>
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
                                    <span>Connection status (auto)</span>
                                    <input className="input" value={getPresence(uid)} readOnly />
                                </label>
                                <label className="dashUserField">
                                    <span>Created at</span>
                                    <input className="input" value={formatUserTimestamp(user.createdAt)} readOnly />
                                </label>
                                <label className="dashUserField">
                                    <span>Last seen</span>
                                    <input className="input" value={formatUserTimestamp(user.lastSeenAt)} readOnly />
                                </label>
                            </div>
                            {profileError && <p className="mt-2 text-sm text-red-300">{profileError}</p>}
                            <div className="dashLobbyActions">
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
            </section>
        </main>
    );
}
