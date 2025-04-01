'use client';

import { useState, useEffect, Suspense } from 'react';
import ChatWindow from '~/components/chat/chat-window';
import MessageInput from '~/components/chat/message-input';
import { useSearchParams } from 'next/navigation';
import api from '~/utils/api/api';
import { UserData } from '~/types/user.types';
import { useWebSocketStore } from '~/stores/use-websocket-store';
export type SystemMessageSubtype = 'notice' | 'agree' | 'complete' | 'timeout';

interface Member {
  id: number;
  username: string;
  nickname?: string;
  affiliation?: string;
}
const ChatContent = () => {
  const [messages, setMessages] = useState<
    { createTime: string; message: string; senderName: string }[]
  >([]);
  const [, setCurrentUser] = useState<UserData | null>(null);
  const [receiverUser, setReceiverUser] = useState<UserData | null>(null);
  const [savedNickName, setSavedNickName] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const roomIdParam = searchParams.get('roomId');
  const roomId = roomIdParam ? parseInt(roomIdParam, 10) : null;
  const { websocket, setWebSocket } = useWebSocketStore();
  // const [systemMessages, setSystemMessages] = useState<
  //   { type: string; nickname?: string }[]
  // >([]);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const access_token = localStorage.getItem('accessToken');
      if (!access_token) return;

      try {
        const res = await api.get('/api/users/mypage'); // ✅ 이게 핵심
        setCurrentUser(res.data);
        localStorage.setItem('nickName', res.data.nickName);
      } catch (err) {
        console.error('유저 정보 불러오기 실패:', err);
      }
    };

    fetchCurrentUser();
  }, []); // 유저 정보

  console.log('receiver', receiverUser);
  // useEffect(() => {
  // const fetchReceiverId = async () => {
  //   if (!roomId || !currentUser) return;

  //   try {
  //     const allUsers = await viewAllUser();
  //     const receiver = await getReceiverIdFromChatRoom(
  //       roomId,
  //       currentUser.nickName!,
  //       allUsers,
  //     );
  //     setReceiverUser(receiver);
  //   } catch (err) {
  //     console.error('상대방 ID 가져오기 실패:', err);
  //   }
  // };

  // fetchReceiverId();
  // }, [roomId, currentUser]);
  useEffect(() => {
    const fetchReceiverInfo = async () => {
      if (!roomId || !savedNickName) return;

      try {
        const res = await api.get(`/api/chats/${roomId}`);
        const chatRoom = res.data;
        console.log(chatRoom);

        const otherUser = chatRoom.members.find(
          (member: Member) => member.username !== savedNickName,
        );

        if (otherUser) {
          // 필요한 경우, 다른 API 호출을 통해 추가 정보를 가져올 수 있습니다.
          // const userInfo = await api.get(`/api/users/${otherUser.id}`);
          // setReceiverUser(userInfo.data);
          setReceiverUser(otherUser); // 예시로, 직접 otherUser를 설정합니다.
        }
      } catch (error) {
        console.error('상대방 정보 가져오기 실패:', error);
      }
    };

    fetchReceiverInfo();
  }, [roomId, savedNickName]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const nickName = localStorage.getItem('nickName');
      setSavedNickName(nickName);
      console.log('닉네임은:' + nickName); // 상태 변경 전에 localStorage에서 가져온 값 확인
    }
  }, []);

  // const fetchToken = () => {
  //   // 쿠키에서 access_token 가져오기
  //   const cookies = document.cookie.split(';');
  //   for (const cookie of cookies) {
  //     const [key, value] = cookie.trim().split('=');
  //     if (key === 'access_token') {
  //       return value;
  //     }
  //   }
  //   return null;
  // };

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const access_token = localStorage.getItem('accessToken');
      if (!access_token) return;

      try {
        const res = await api.get('/api/users/mypage');
        setCurrentUser(res.data); // ✅ 올바른 user 객체
      } catch (err) {
        console.error('유저 정보 불러오기 실패:', err);
      }
    };

    fetchCurrentUser();
  }, []);

  useEffect(() => {
    // const token = fetchToken();
    // if (token) {
    //   setCurrentUser(token); // 토큰을 통해 사용자 정보를 설정
    // }
    const access_token = localStorage.getItem('accessToken');
    const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';

    const ws = new WebSocket(
      `${protocol}://${process.env.NEXT_PUBLIC_WS_API_URL}/chats?chatRoomId=${roomId}&access_token=${access_token}`,
    );
    setWebSocket(ws);

    // WebSocket 연결이 열리면
    ws.onopen = () => {
      console.log('WebSocket 연결됨');
    };

    // WebSocket 메시지를 받으면
    ws.onmessage = (event) => {
      const incomingMessage = JSON.parse(event.data);

      // if (incomingMessage.type === 'system') {
      //   // 여기서 시스템 메시지 상태를 업데이트해줘야 함
      //   setSystemMessages((prev) => [
      //     ...prev,
      //     {
      //       type: incomingMessage.subtype,
      //       nickname: incomingMessage.senderName,
      //     },
      //   ]);
      //   return;
      // }

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

  const handleSendSystemMessage = async (subtype: SystemMessageSubtype) => {
    const systemMessagePayload = {
      type: 'system',
      subtype,
      senderName: savedNickName,
      chatRoomId: roomId,
    };

    try {
      // ✅ 서버에 저장
      await fetch(`${process.env.NEXT_PUBLIC_HTTP_API_URL}chats/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(systemMessagePayload),
      });

      // ✅ 웹소켓 전송
      if (websocket && websocket.readyState === WebSocket.OPEN) {
        websocket.send(JSON.stringify(systemMessagePayload));
      }
    } catch (err) {
      console.error('시스템 메시지 전송 실패:', err);
    }
  };

  const handleSendMessage = async (message: string) => {
    // 메시지 객체를 서버에서 기대하는 형태에 맞게 수정
    const messageObject = {
      createTime: new Date().toISOString(), // LocalDateTime은 ISO 8601 형식의 문자열로 전달
      chatRoomId: roomId, // 채팅방 ID
      message: message, // 메시지 내용
      senderName: savedNickName, // senderId -> senderName으로 수정
      id: Date.now(),
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

  // 누르면 채팅방에 잇는 모두에게 알림을전송하게 되어있는데 알림을 받으면 ? 다 다음 으로 넘어가게
  // 받으면 다음 창으로 넘어가ㄹ
  return (
    <div className="flex flex-col w-full min-h-full">
      <>
        <ChatWindow
          messages={messages}
          currentUser={savedNickName!}
          receiverName={receiverUser?.nickName || 'nickname'}
          chatRoomId={roomId!}
          receiverJob={receiverUser?.affiliation || '직장 정보 없음'}
          // systemMessages={systemMessages}
          onSystemMessageSend={(subtype) => handleSendSystemMessage(subtype)}
          onTableStatusSend={(variant, chatRoomId) => {
            if (websocket && websocket.readyState === WebSocket.OPEN) {
              websocket.send(
                JSON.stringify({
                  messageType: 'table',
                  variant,
                  chatRoomId,
                }),
              );
            }
          }}
        />
        <div className="h-[60px] border-t border-gray-700">
          <MessageInput onSendMessage={handleSendMessage} />
        </div>
      </>
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
