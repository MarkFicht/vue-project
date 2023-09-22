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

// example

// set data
// import { collection, doc, setDoc, getDoc } from 'firebase/firestore';

// const citiesRef = collection(db, 'cities');

// await setDoc(doc(citiesRef, 'SF'), {
//     name: 'San Francisco',
//     state: 'CA',
//     country: 'USA',
//     capital: false,
//     population: 860000,
//     regions: ['west_coast', 'norcal']
// });
// await setDoc(doc(citiesRef, 'LA'), {
//     name: 'Los Angeles',
//     state: 'CA',
//     country: 'USA',
//     capital: false,
//     population: 3900000,
//     regions: ['west_coast', 'socal']
// });
// await setDoc(doc(citiesRef, 'DC'), {
//     name: 'Washington, D.C.',
//     state: null,
//     country: 'USA',
//     capital: true,
//     population: 680000,
//     regions: ['east_coast']
// });
// await setDoc(doc(citiesRef, 'TOK'), {
//     name: 'Tokyo',
//     state: null,
//     country: 'Japan',
//     capital: true,
//     population: 9000000,
//     regions: ['kanto', 'honshu']
// });
// await setDoc(doc(citiesRef, 'BJ'), {
//     name: 'Beijing',
//     state: null,
//     country: 'China',
//     capital: true,
//     population: 21500000,
//     regions: ['jingjinji', 'hebei']
// });

// get data
// const docRef = doc(db, 'cities', 'SF');
// const docSnap = await getDoc(docRef);

// if (docSnap.exists()) {
//     console.log('Document data:', docSnap.data());
// } else {
//     // docSnap.data() will be undefined in this case
//     console.log('No such document!');
// }

export default db;
