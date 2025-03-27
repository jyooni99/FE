import { initializeApp } from 'firebase/app';
import { getMessaging, Messaging } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: 'AIzaSyAG5Dy_cMVsKyp9mrF6X8mWYa5xM_16IzI',
  authDomain: 'uratchacha-9c430.firebaseapp.com',
  projectId: 'uratchacha-9c430',
  storageBucket: 'uratchacha-9c430.firebasestorage.app',
  messagingSenderId: '975825146714',
  appId: '1:975825146714:web:e338b5e9ae8e67264f1963',
  measurementId: 'G-FM9MG74NEC',
};

const app = initializeApp(firebaseConfig);
let messaging: Messaging | null = null;

if (typeof window !== 'undefined' && typeof window.navigator !== 'undefined') {
  messaging = getMessaging(app);
}

export { messaging };
