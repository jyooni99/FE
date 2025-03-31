'use client';

import { useState, useEffect, Suspense } from 'react';
import ChatWindow from '~/components/chat/chat-window';
import MessageInput from '~/components/chat/message-input';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
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

const ChatContent = () => {
  // ... (기존 ChatPage 컴포넌트의 나머지 로직 유지)
  // 기존 useEffect, WebSocket 연결, 메시지 처리 로직 모두 이 컴포넌트에 포함
  // const [chats] = useState<Chat[]>(tempChats);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(tempChats[0]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [messages, setMessages] = useState<any[]>([]);
  const [websocket, setWebSocket] = useState<WebSocket | null>(null);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const roomId = searchParams.get('roomId');
  console.log(setSelectedChat);
  const router = useRouter();
  const [savedNickName, setSavedNickName] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const nickName = localStorage.getItem('nickName');
      setSavedNickName(nickName);
      console.log('닉네임은:' + nickName); // 상태 변경 전에 localStorage에서 가져온 값 확인
    }
  }, []);
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
      `ws://${process.env.NEXT_PUBLIC_WS_API_URL}/chats?chatRoomId=${roomId}&access_token=${access_token}`,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const exitChatRoom = async () => {
    if (!roomId) return;

    try {
      await fetch(`${process.env.NEXT_PUBLIC_HTTP_API_URL}/chats/exit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chatRoomId: Number(roomId) }),
      });

      console.log('채팅방 나가기 성공');

      // WebSocket 연결 종료
      if (websocket) {
        websocket.close();
      }

      router.push(`/home`);
    } catch (err) {
      console.error('채팅방 나가기 실패:', err);
    }
  };

  const handleSendMessage = async (message: string) => {
    // 메시지 객체를 서버에서 기대하는 형태에 맞게 수정
    const messageObject = {
      createTime: new Date().toISOString(), // LocalDateTime은 ISO 8601 형식의 문자열로 전달
      chatRoomId: roomId, // 채팅방 ID
      message: message, // 메시지 내용
      senderName: savedNickName, // senderId -> senderName으로 수정
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
      <button
        className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
        onClick={exitChatRoom}
      >
        채팅방 나가기
      </button>
    </div>
  );
};

const ChatPage = () => {
  return (
    <Suspense fallback={<div>채팅방 로딩 중...</div>}>
      <ChatContent />
    </Suspense>
  );
};
export default ChatPage;

export const dynamic = 'force-dynamic';
