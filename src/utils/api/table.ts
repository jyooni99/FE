import api from './api';

export async function requestTable(chatRoomId: number) {
  try {
    const response = await fetch(`/api/networking-table/apply/${chatRoomId}`, {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error('테이블 신청 실패');
    }

    const tableNumber = await response.text();

    console.log('배정된 테이블 번호:', tableNumber);
    return tableNumber;
  } catch (error) {
    console.error('테이블 신청 중 오류 발생:', error);
    return null;
  }
}

export async function cancelTable(chatRoomId: number) {
  try {
    await api.post(`/api/networking-table/cancel/${chatRoomId}`);
  } catch (error) {
    console.log(error);
  }
}

export async function startNetworking(tableNumber: string) {
  try {
    await api.post(`/api/networking-table/start/${tableNumber}`);
  } catch (error) {
    console.log(error);
  }
}

export async function endsNetwork(tableNumber: string) {
  try {
    await api.post(`/api/networking-table/end/${tableNumber}`);
  } catch (error) {
    console.log(error);
  }
}

export async function consentReservation(chatRoomId: number) {
  try {
    await api.post(`/api/reservation/consent/${chatRoomId}`);
  } catch (error) {
    console.log(error);
  }
}

export async function getWaitTime(chatRoomId: number): Promise<number> {
  try {
    const response = await api.get(`/api/reservation/wait-time/${chatRoomId}`);
    console.log('✅ waitTime 응답 성공:', response.data); // 여기서 응답 확인
    return response.data.waitTime; // <- 백엔드 응답 구조에 맞게 조정!
  } catch (error) {
    console.error('⛔️ waitTime 요청 실패:', error);
    return 0; // 실패 시 기본값
  }
}
