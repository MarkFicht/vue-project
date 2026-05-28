import { deleteDoc, deleteField, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { auth } from '@/firebaseConfig';
import { gameStatusDuelRef, tableGameDuelRef, usersRef } from '@/firebase/refs';
import { isAnyFirestoreCode } from '@/utils/firestoreErrors';

const isCleanupRaceError = (error: unknown) => isAnyFirestoreCode(error, ['permission-denied', 'not-found']);

const ignoreCleanupRace = async (operation: () => Promise<void>) => {
    try {
        await operation();
    } catch (error) {
        if (!isCleanupRaceError(error)) throw error;
    }
};

export async function cleanupDuelGame() {
    await ignoreCleanupRace(async () =>
        updateDoc(gameStatusDuelRef, {
            isStarted: false,
            players: []
        })
    );

    const currentUid = auth.currentUser?.uid;
    if (currentUid) {
        await updateDoc(doc(usersRef, currentUid), {
            game: '',
            readyToGame: false,
            status: 'online',
            online: deleteField(),
            timestamp: serverTimestamp(),
            updatedAt: serverTimestamp(),
            lastSeenAt: serverTimestamp(),
            schemaVersion: 1
        });
    }

    await ignoreCleanupRace(async () => deleteDoc(tableGameDuelRef));
}
