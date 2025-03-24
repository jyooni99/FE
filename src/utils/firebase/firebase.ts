import { initializeApp } from 'firebase/app';
import { getMessaging, Messaging } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: 'quick-network-6cdb3.firebaseapp.com',
  projectId: 'quick-network-6cdb3',
  storageBucket: 'quick-network-6cdb3.firebasestorage.app',
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_VAPID_KEY,
};

const app = initializeApp(firebaseConfig);
let messaging: Messaging | null = null;

if (typeof window !== 'undefined' && typeof window.navigator !== 'undefined') {
  messaging = getMessaging(app);
}

export { messaging };
