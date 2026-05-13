import { collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { getMessaging, getToken, isSupported, onMessage, type MessagePayload } from 'firebase/messaging';
import { db, firebaseApp } from '@/firebaseConfig';
import { usersRef } from '@/firebase/refs';

const PUSH_TOKEN_COLLECTION = 'pushTokens';

function tokenToDocId(token: string) {
    let hash = 2166136261;
    for (let i = 0; i < token.length; i += 1) {
        hash ^= token.charCodeAt(i);
        hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
    }
    return `web_${(hash >>> 0).toString(16)}`;
}

export async function registerWebPushToken(uid: string) {
    if (typeof window === 'undefined' || typeof Notification === 'undefined' || !('serviceWorker' in navigator)) return;
    if (Notification.permission !== 'granted') return;

    const supported = await isSupported();
    if (!supported) return;

    const vapidKey = import.meta.env.VITE_FIREBASE_VAPID_KEY as string | undefined;
    if (!vapidKey) return;

    const serviceWorkerRegistration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
    const messaging = getMessaging(firebaseApp);
    const token = await getToken(messaging, { vapidKey, serviceWorkerRegistration });
    if (!token) return;

    await setDoc(
        doc(collection(doc(usersRef, uid), PUSH_TOKEN_COLLECTION), tokenToDocId(token)),
        {
            uid,
            token,
            platform: 'web',
            userAgent: navigator.userAgent.slice(0, 300),
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        },
        { merge: true }
    );
}

export async function subscribeToForegroundPush(onPayload: (payload: MessagePayload) => void) {
    if (typeof window === 'undefined') return () => {};
    const supported = await isSupported();
    if (!supported) return () => {};
    const messaging = getMessaging(firebaseApp);
    return onMessage(messaging, onPayload);
}
