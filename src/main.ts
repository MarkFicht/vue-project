import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
// import firebase from 'firebase/app';

import App from './App.vue';
import router from './router';

// // --- Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: 'AIzaSyDp574Cg72qIyAimYGfHFSO0txNP7sZmKk',
//     authDomain: 'online-project-bf469.firebaseapp.com',
//     databaseURL: 'https://online-project-bf469.firebaseio.com',
//     projectId: 'online-project-bf469',
//     storageBucket: 'online-project-bf469.appspot.com',
//     messagingSenderId: '856280314889',
//     appId: '1:856280314889:web:7fd5b9edbe34f900fc34d8'
// };
// // --- Initialize Firebase
// firebase.initializeApp(firebaseConfig);

// --- Check logged user after refresh
// let app: any;
// firebase.auth().onAuthStateChanged((user) => {
//     console.log('%c user -> ', 'background: #222; color: #bada55', user);

//     if (!app) {
//         app = createApp(App).use(store).use(router).mount('#app');
//     }
// });

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
