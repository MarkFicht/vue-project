import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyBRIqo_JdB3v6nV5pAPNfkgm9NujxAup68',
    authDomain: 'vue-project-d53d4.firebaseapp.com',
    projectId: 'vue-project-d53d4',
    storageBucket: 'vue-project-d53d4.appspot.com',
    messagingSenderId: '495070706443',
    appId: '1:495070706443:web:c2afce58385a473439800e',
    measurementId: 'G-FQ88TGJMZE'
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(firebaseApp);
export default db;
