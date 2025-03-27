import axios from 'axios';

export async function sendPush(token: string) {
  try {
    const res = await axios.post('/api/send-push', {
      token,
      title: '✨ 새로운 채팅 요청이 왔습니다.',
      body: '3분 안에 수락하지 않으면 자동 취소됩니다.',
    });

    console.log('푸시 전송 성공:', res.data);
  } catch (error) {
    console.error('푸시 전송 실패:', error);
  }
}
