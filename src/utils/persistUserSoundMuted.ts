import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import { usersRef } from '@/firebase/refs';

/** Writes sound preference to the signed-in user's Firestore profile (merge). */
export async function persistUserSoundMuted(uid: string, soundMuted: boolean) {
    if (!uid) return;
    await setDoc(
        doc(usersRef, uid),
        {
            soundMuted,
            updatedAt: serverTimestamp(),
            lastSeenAt: serverTimestamp(),
            timestamp: serverTimestamp()
        },
        { merge: true }
    );
}
