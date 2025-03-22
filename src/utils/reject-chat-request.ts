import axios from 'axios';
import api from './api/api';

export const rejectChatRequest = async (requesterId: number) => {
  try {
    const response = await api.post(
      `${process.env.NEXT_PUBLIC_API_URL}/chats/private-chatroom/reject`,
      null, // POST 요청이지만 Body 데이터가 없으므로 null을 넣음
      {
        params: { requesterId }, // 쿼리 파라미터로 전달
      },
    );
    console.log(`채팅 거절 요청 완료: ${requesterId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('❌ API 요청 오류:', error.response?.data || error.message);
    } else {
      console.error('❌ 알 수 없는 오류:', error);
    }
  }
};
