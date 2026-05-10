import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyBRIqo_JdB3v6nV5pAPNfkgm9NujxAup68',
    authDomain: 'vue-project-d53d4.firebaseapp.com',
    projectId: 'vue-project-d53d4',
    storageBucket: 'vue-project-d53d4.appspot.com',
    messagingSenderId: '495070706443',
    appId: '1:495070706443:web:c2afce58385a473439800e',
    measurementId: 'G-FQ88TGJMZE'
};

export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);
export const googleProvider = new GoogleAuthProvider();
