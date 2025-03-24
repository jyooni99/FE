import { getToken } from 'firebase/messaging';
import { messaging } from '~/utils/firebase/firebase';

export async function getFcmToken(): Promise<string | null> {
  if (typeof window === 'undefined') return null;

  try {
    if (!messaging) {
      console.log('이 브라우저는 messaging을 지원하지 않습니다.');
      return null;
    }

    const token = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY,
    });

    if (token) {
      console.log('FCM Token:', token);
      return token;
    } else {
      console.log('FCM token을 가져올 수 없습니다.');
      return null;
    }
  } catch (error) {
    console.error('FCM token 요청 중 에러 발생:', error);
    return null;
  }
}
