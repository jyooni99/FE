'use client';

import React, { useEffect, useState } from 'react';
import Button from '~/components/common/button';
import NotificationButton from '~/components/notification-button';
import api from '~/utils/api/api';
import { sendPush } from '~/utils/api/send-push';

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
          <button
            onClick={async () => {
              try {
                await api.post('/api/send-notification', {
                  title: '버튼 눌렀을 때',
                  body: '이 알림이 오면 연결 성공!',
                });
                console.log('✅ 푸시 전송 요청 완료');
              } catch (e) {
                console.error('❌ 푸시 전송 실패', e);
              }
            }}
          >
            🔔 푸시 테스트 보내기
          </button>

          <Button onClick={() => sendPush(token ?? '')}>푸시 알림</Button>
        </div>
      </div>
    </>
  );
};

export default Page;
