/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/10.4.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.4.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: 'AIzaSyBRIqo_JdB3v6nV5pAPNfkgm9NujxAup68',
    authDomain: 'vue-project-d53d4.firebaseapp.com',
    projectId: 'vue-project-d53d4',
    storageBucket: 'vue-project-d53d4.appspot.com',
    messagingSenderId: '495070706443',
    appId: '1:495070706443:web:c2afce58385a473439800e'
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    const title = payload.notification?.title || payload.data?.title || 'New message';
    const body = payload.notification?.body || payload.data?.body || 'You have a new chat message.';
    self.registration.showNotification(title, {
        body,
        tag: payload.data?.chatId || 'chat-background'
    });
});
