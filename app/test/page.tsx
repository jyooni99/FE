'use client';

import React, { useEffect, useState } from 'react';
import Button from '~/components/common/button';
import NotificationButton from '~/components/notification-button';
import axios from 'axios';

export async function sendPush(token: string) {
  try {
    const res = await axios.post('/api/send-push', {
      token,
      title: '✨ 새 소식이 도착했어요!',
      body: '푸시 알림 테스트 중입니다.',
    });

    console.log('푸시 전송 성공:', res.data);
  } catch (error) {
    console.error('푸시 전송 실패:', error);
  }
}

const Page = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fcmToken = localStorage.getItem('FCMToken');
    setToken(fcmToken);
  }, []);

  return (
    <>
      <div className="h-screen flex flex-col content-center justify-center text-center">
        <div className="text-lg mb-3">Push Notification</div>
        <div className="mx-auto w-[300px] flex flex-col gap-4">
          <NotificationButton />
          <Button onClick={() => sendPush(token ?? '')}>푸시 알림</Button>
        </div>
      </div>
    </>
  );
};

export default Page;
