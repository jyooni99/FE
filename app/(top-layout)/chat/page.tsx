'use client';

import { useState, useEffect } from 'react';
import ChatWindow from '~/components/chat/chat-window';
import MessageInput from '~/components/chat/message-input';

interface Chat {
  id: number;
  name: string;
  lastMessage: string;
  status: 'accepted' | 'pending';
}

const tempChats: Chat[] = [
  { id: 1, name: '홍길동', lastMessage: '안녕하세요!', status: 'accepted' },
  {
    id: 2,
    name: '김철수',
    lastMessage: '네트워킹 하실래요?',
    status: 'pending',
  },
  {
    id: 3,
    name: '이영희',
    lastMessage: '프로젝트 협업 어떠세요?',
    status: 'accepted',
  },
];

const ChatPage = () => {
  // const [chats] = useState<Chat[]>(tempChats);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(tempChats[0]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [messages, setMessages] = useState<any[]>([]);
  const [websocket, setWebSocket] = useState<WebSocket | null>(null);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  console.log(setSelectedChat);
  const fetchToken = () => {
    // 쿠키에서 access_token 가져오기
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [key, value] = cookie.trim().split('=');
      if (key === 'access_token') {
        return value;
      }
    }
    return null;
  };

  useEffect(() => {
    const token = fetchToken();
    if (token) {
      setCurrentUser(token); // 토큰을 통해 사용자 정보를 설정
    }
    const access_token = localStorage.getItem('accessToken');

    const ws = new WebSocket(
      `ws://${process.env.NEXT_PUBLIC_WS_API_URL}/chats?chatRoomId=1&access_token=${access_token}`,
    );
    setWebSocket(ws);

    // WebSocket 연결이 열리면
    ws.onopen = () => {
      console.log('WebSocket 연결됨');
    };

    // WebSocket 메시지를 받으면
    ws.onmessage = (event) => {
      const incomingMessage = JSON.parse(event.data);

      const formattedMessage = {
        createTime: incomingMessage.createTime, // createTime을 적절한 형식으로 변환
        message: incomingMessage.message,
        senderName: incomingMessage.senderName,
      };
      console.log(formattedMessage);
      // messages 상태 업데이트
      setMessages((prevMessages) => [...prevMessages, formattedMessage]);
    };

    // WebSocket 오류 처리
    ws.onerror = (error) => {
      console.error('WebSocket 에러 발생:', error);
      if (error instanceof ErrorEvent) {
        console.error('Error message:', error.message);
        console.error('Error type:', error.type);
      } else {
        console.error('Unknown error type:', error);
      }
    };

    // WebSocket 연결 종료 시 처리
    ws.onclose = () => {
      console.log('WebSocket 연결 종료');
    };

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  const handleSendMessage = async (message: string) => {
    // 메시지 객체를 서버에서 기대하는 형태에 맞게 수정
    const messageObject = {
      createTime: new Date().toISOString(), // LocalDateTime은 ISO 8601 형식의 문자열로 전달
      chatRoomId: 1, // 채팅방 ID
      message: message, // 메시지 내용
      senderName: 'kim', // senderId -> senderName으로 수정
    };

    // 서버로 메시지 전송
    try {
      await fetch(`${process.env.NEXT_PUBLIC_HTTP_API_URL}chats/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(messageObject),
      });

      // WebSocket을 통해 메시지 전송
      if (websocket) {
        websocket.send(JSON.stringify(messageObject));
      }
    } catch (err) {
      console.error('메시지 전송 실패:', err);
    }
  };

  return (
    <div className="flex flex-col w-full min-h-full">
      {selectedChat ? (
        <>
          <ChatWindow
            messages={messages}
            receiverId={selectedChat.id}
            status={selectedChat.status}
            currentUser={currentUser || 'unknown'}
            receiverName={selectedChat.name}
            receiverStatus={selectedChat.status}
          />
          <div className="h-[60px] border-t border-gray-700">
            <MessageInput onSendMessage={handleSendMessage} />
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-full text-white">
          채팅방을 선택해주세요!
        </div>
      )}
    </div>
  );
};

export default ChatPage;
