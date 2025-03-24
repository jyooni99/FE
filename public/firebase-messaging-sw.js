importScripts(
  'https://www.gstatic.com/firebasejs/9.0.2/firebase-app-compat.js',
);
importScripts(
  'https://www.gstatic.com/firebasejs/9.0.2/firebase-messaging-compat.js',
);

const firebaseConfig = {
  apiKey: 'AIzaSyBGKLvKKLj-XSWBbUUSkwepDfFzv--Ws6Q',
  authDomain: 'quick-network-6cdb3.firebaseapp.com',
  projectId: 'quick-network-6cdb3',
  storageBucket: 'quick-network-6cdb3.firebasestorage.app',
  messagingSenderId: '1425957634',
  appId: '1:1425957634:web:e68c34c2c9712f8746181b',
  measurementId: 'G-9NT589E02Z',
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// 백그라운드에서 푸시알림 설정
messaging.onBackgroundMessage((payload) => {
  const title = payload.notification.title + ' (onBackgroundMessage)';
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/images/icons/icon-128.png',
  };

  self.registration.showNotification(title, notificationOptions);
});

// 푸시 알림
self.addEventListener('push', function (e) {
  console.log('push: ', e.data.json());
  if (!e.data.json()) return;

  const resultData = e.data.json().notification;
  const notificationTitle = resultData.title;
  const notificationOptions = {
    body: resultData.body,
    icon: resultData.image,
    tag: resultData.tag,
    ...resultData,
  };
  console.log('push: ', { resultData, notificationTitle, notificationOptions });

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// 푸시 알림 클릭했을 때
self.addEventListener('notificationclick', function (event) {
  console.log('notification click');
  const url = '/';
  event.notification.close();
  event.waitUntil(clients.openWindow(url));
});
