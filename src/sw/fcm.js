/* eslint-disable */

// Prod imports
importScripts('/__/firebase/7.13.2/firebase-app.js');
importScripts('/__/firebase/7.13.2/firebase-auth.js');
importScripts('/__/firebase/7.13.2/firebase-messaging.js');
// importScripts('/__/firebase/init.js');

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_ID,
  });
}

const messaging = firebase.messaging();

const auth = firebase.auth();

messaging.setBackgroundMessageHandler(function (payload) {
  console.log('[FCM service worker] Mensagem de background recebida', payload);
  const notificationTitle = payload.data.title;
  const { idPessoa } = payload.data;

  const notificationOptions = {
    body: payload.data.body,
    icon: payload.data.icon,
    data: { clickAction: payload.data.clickAction },
  };

  const idUsuarioLogado = auth.currentUser ? auth.currentUser.uid : null;

  if (idUsuarioLogado === null || idPessoa === idUsuarioLogado) {
    return self.registration.showNotification(
      notificationTitle,
      notificationOptions,
    );
  }
});

self.addEventListener('notificationclick', event => {
  let notification = {};
  if (event.notification) {
    notification = event.notification;
  }
  event.notification.close();
  event.waitUntil(self.clients.openWindow(notification.data.clickAction));
});
