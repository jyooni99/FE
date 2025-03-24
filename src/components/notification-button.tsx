'use client';

import { useState } from 'react';
import { getFcmToken } from '~/utils/firebase/get-fcm-token';
import { requestPermission } from '~/utils/firebase/request-permission';
import Button from './common/button';

const NotificationButton = () => {
  const [isPermissionGranted, setIsPermissionGranted] = useState(false);
  const [, setToken] = useState<string | null>(null);

  async function handleRequestPermission() {
    const granted = await requestPermission();
    setIsPermissionGranted(granted);

    if (granted) {
      const fcmToken = await getFcmToken();
      setToken(fcmToken);
      localStorage.setItem('FCMToken', fcmToken || '');
    }
  }

  return (
    <Button onClick={handleRequestPermission} disabled={isPermissionGranted}>
      {isPermissionGranted ? '알림 권한 허용됨' : '푸시 알림 권한 요청'}
    </Button>
  );
};

export default NotificationButton;
