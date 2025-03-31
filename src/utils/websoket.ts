let socket: WebSocket | null = null;
let onMessageCallback: ((message: string) => void) | null = null;

export const connectWebSocket = (
  chatRoomId: number,
  onReady?: (chatRoomId: number) => void,
  onMessage?: (message: string) => void,
  userId?: string,
) => {
  const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
  const wsUrl = `${protocol}://${process.env.NEXT_PUBLIC_WS_API_URL}/chats?chatRoomId=${chatRoomId}&userId=${userId}`;

  socket = new WebSocket(wsUrl);

  if (onMessage) onMessageCallback = onMessage;

  socket.onopen = () => {
    console.log(`✅ WebSocket Connected to chat room ${chatRoomId}`);
    onReady?.(chatRoomId);
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log(`📩 메시지 수신 (User ${userId}):`, data); // userId 로깅 추가

    onMessageCallback?.(event.data);

    switch (data.messageType) {
      case 'request':
        console.log(`🔔 채팅 요청 도착 from User ${data.requesterId}`);
        break;
      case 'accept':
        console.log(`✅ 채팅 수락 완료 → 채팅방 ID: ${data.chatRoomId}`);
        break;
      case 'message':
        console.log(`💬 메시지 도착: ${data.message}`);
        break;
      default:
        console.warn('알 수 없는 messageType:', data.messageType);
    }
  };

  socket.onclose = () => console.log('WebSocket Disconnected');
  socket.onerror = (error) => console.error('WebSocket Error', error);
};

export const sendMessage = (message: string, userId: string) => {
  if (socket?.readyState === WebSocket.OPEN) {
    const messageObj = {
      senderId: userId,
      message: message,
      timestamp: new Date().toISOString(),
    };
    socket.send(JSON.stringify(messageObj));
    console.log('📤 Message sent:', messageObj);
  } else {
    console.error('❌ WebSocket is not open');
  }
};

export const checkExistingChatRoom = async (
  requesterId: number,
  receiverId: number,
): Promise<number | null> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HTTP_API_URL}/chats/check-room?requesterId=${requesterId}&receiverId=${receiverId}`,
    );
    if (!response.ok) throw new Error('채팅방 확인 실패');
    const data = await response.json();
    return data.chatRoomId || null;
  } catch (error) {
    console.error('채팅방 확인 중 오류:', error);
    return null;
  }
};

export const acceptChat = async (
  requesterId: number,
  receiverId: number,
): Promise<number | null> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HTTP_API_URL}/chats/accept`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requesterId, receiverId }),
      },
    );
    if (!response.ok) throw new Error('채팅 수락 실패');
    const data = await response.json();
    return data.chatRoomId;
  } catch (error) {
    console.error('채팅 수락 중 오류:', error);
    return null;
  }
};

export const disconnectWebSocket = () => {
  if (socket) socket.close();
  socket = null;
};

export const getWebSocket = (): WebSocket | null => {
  return socket;
};

export const sendTableStatusMessage = (
  variant: 'apply' | 'waiting' | 'assigned',
  senderName: string,
  chatRoomId: number,
  websocket: WebSocket,
  tableNumber?: string,
) => {
  if (!websocket || websocket.readyState !== WebSocket.OPEN) {
    console.warn('🛑 WebSocket이 아직 연결되지 않았습니다.');
    return;
  }

  const message = {
    type: 'table-status',
    variant,
    senderName,
    chatRoomId,
    tableNumber,
  };

  websocket.send(JSON.stringify(message));
};
