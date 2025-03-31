import api from './api';
import { UserData } from '~/types/user.types';

export async function getReceiverIdFromChatRoom(
  chatRoomId: number,
  currentUserNickName: string,
  allUsers: UserData[],
): Promise<UserData | null> {
  try {
    const res = await api.get<string[]>(`/chats/user-nickName/${chatRoomId}`);
    const nickNames = res.data;

    const otherNickName = nickNames.find(
      (name) => name !== currentUserNickName,
    );

    if (!otherNickName) return null;

    const receiver = allUsers.find((user) => user.nickName === otherNickName);

    return receiver ?? null;
  } catch (error) {
    console.log('[getReceiverIdFromChatRoom] Error:', error);
    return null;
  }
}

export const exitChatRoom = async (chatRoomId: number): Promise<boolean> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HTTP_API_URL}/chats/exit`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chatRoomId: Number(chatRoomId) }),
      },
    );
    if (!res.ok) throw new Error(`응답 실패: ${res.status}`);

    console.log('✅ 채팅방 나가기 성공');
    return true;
  } catch (error) {
    console.error('❌ 채팅방 나가기 실패:', error);
    return false;
  }
};
