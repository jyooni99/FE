import api from './api/api';

// const API_URL = `http://${process.env.NEXT_PUBLIC_API_URL}/chats/private-chatroom/request`;

export const sendChatRequestAPI = async (receiverId: number) => {
  try {
    await api.get('/api/chats/private-chatroom/request', {
      params: {
        receiverId: receiverId,
      },
    });

    alert('✅ 채팅 요청이 전송되었습니다!');
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error details:', error.message);
    } else {
      console.error('Unknown error:', error);
    }
    alert('❌ 채팅 요청 실패');
  }
};

// 채팅 수락 요청 함수
export const acceptChatRequestAPI = async (
  requesterId: number,
  receiverId: number,
): Promise<{ chatRoomId: number }> => {
  try {
    const response = await fetch(
      'http://3.37.80.119:8081/chats/private-chatroom/accept',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requesterId,
          receiverId,
        }),
      },
    );

    if (!response.ok) {
      const errorMessage = await response.text();
      console.error('Error accepting chat request:', errorMessage);
      throw new Error('채팅 수락 실패');
    }

    const data: { chatRoomId: number } = await response.json();
    console.log('채팅 수락 후 데이터:', data);
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error('채팅 수락 실패:', error.message);
    } else {
      console.error('Unknown error:', error);
    }
    throw new Error('채팅 수락 실패');
  }
};
