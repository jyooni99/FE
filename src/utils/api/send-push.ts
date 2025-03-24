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
