'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import api from '~/utils/api/api';
import RadixTabs from '~/components/common/radix-tabs';
import GroupMatching from '~/components/match/group';
import OneToOneMatching from '~/components/match/one-to-one';
import { useNetworkStore } from '~/stores/use-network-store';
import { useUserStore } from '~/stores/use-user-store';
import { UserData } from '~/types/user.types';
import Modal from '~/components/common/modal';
import { useFormStore } from '~/stores/use-form-store';

const Page = () => {
  const { isConnect } = useNetworkStore();
  const { users, setUsers } = useUserStore();
  const loggedInUserRef = useRef<UserData | null>(null);
  const router = useRouter();
  const [, setWebSocket] = useState<WebSocket | null>(null);
  const { loggedInUser, setLoggedInUser } = useUserStore();
  const { setQRData } = useFormStore();
  const chatRequesterIdRef = useRef<number | null>(null);
  const chatReceiverIdRef = useRef<number | null>(null);
  // ✅ 모달 상태 추가
  const [isChatRequestOpen, setIsChatRequestOpen] = useState(false);
  const [chatRequesterId, setChatRequesterId] = useState<number | null>(null);
  // const [chatReceiverId, setChatReceiverId] = useState<number | null>(null);

  useEffect(() => {
    loggedInUserRef.current = loggedInUser;
  }, [loggedInUser]);

  console.log(users);
  console.log(loggedInUser);

  // ✅ 채팅 요청 수락 함수
  async function acceptChat(requesterId: number, receiverId: number) {
    try {
      const response = await api.post('api/chats/private-chatroom/accept', {
        requesterId,
        receiverId,
      });

      const roomId = response.data;
      if (!roomId) throw new Error('응답에 roomId 없음');

      console.log('loggedInUser 객체:', loggedInUserRef.current);
      console.log('닉네임:', loggedInUserRef.current?.nickName);
      localStorage.setItem('nickName', loggedInUserRef.current?.nickName || '');

      router.push(`/chat?roomId=${roomId}`);
    } catch (error) {
      console.error('[ERROR] 채팅방 수락 실패:', error);
    }
  }

  // ✅ window 객체에 등록 (테스트용)
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).showChatRequestNotification = showChatRequestNotification;
  }, []);
  // showChatRequestNotification("테스트 메시지", 1, 2); -> 콘솔에 입력

  // 채팅 방 거절 함수
  function rejectChat(requesterId: number) {
    api.get(`api/chats/private-chatroom/reject?requesterId=${requesterId}`);
  }

  // ✅ 채팅 요청 UI 모달을 띄우는 함수
  function showChatRequestNotification(
    message: string,
    requesterId: number,
    // receiverId: number,
  ) {
    setChatRequesterId(requesterId);
    //setChatReceiverId(receiverId);
    setIsChatRequestOpen(true);
  }

  // ✅ WebSocket 연결 설정
  useEffect(() => {
    const access_token = localStorage.getItem('accessToken');
    const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
    const ws = new WebSocket(
      `${protocol}://${process.env.NEXT_PUBLIC_WS_API_URL}/notifications?access_token=${access_token}`,
    );
    setWebSocket(ws);

    ws.onerror = (error) => {
      console.error('WebSocket 오류:', error);
    };
    // WebSocket 연결이 열리면
    ws.onopen = () => {
      console.log('WebSocket 연결됨');
    };

    ws.onmessage = (event) => {
      const notificationData = JSON.parse(event.data); // 메시지 파싱

      // 메시지 타입이 'request'일 때
      if (notificationData.messageType === 'request') {
        chatRequesterIdRef.current = notificationData.requesterId;
        chatReceiverIdRef.current = notificationData.receiverId;
        showChatRequestNotification(
          notificationData.message,
          notificationData.requesterId,
          //  notificationData.receiverId,
        );
      }

      if (notificationData.messageType === 'reject') {
        alert(notificationData.message);
      }

      if (notificationData.messageType === 'accept') {
        const roomId = notificationData.chatRoomId;
        router.push(`/chat?roomId=${roomId}`);
      }

      if (notificationData.messageType === 'notification') {
        const roomId = notificationData.chatRoomId;
        router.push(`/chat?roomId=${roomId}`);
      }

      if (notificationData.messageType === 'update') {
        alert(notificationData.message);
      }
    };

    const fetchLoggedInUser = async () => {
      try {
        const res = await api.get('/api/users/mypage');
        setLoggedInUser(res.data);
        setQRData(res.data);
      } catch (error) {
        console.error('로그인된 유저 정보 불러오기 실패:', error);
      }
    };

    fetchLoggedInUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_HTTP_API_URL}users/all`,
        );

        // res.json()을 호출해서 JSON 데이터를 가져와야 함
        const data = await res.json();

        const filteredUsers = loggedInUser
          ? data.filter(
              (user: UserData) => user.nickName !== loggedInUser.nickName,
            )
          : (data as UserData[]);

        setUsers(filteredUsers);
      } catch (error) {
        console.error('유저 목록 불러오기 실패:', error);
      }
    };

    fetchUsers();
  }, [setUsers, loggedInUser]);

  const tabLabels = ['1:1 매칭', '그룹 매칭'];
  const tabContents = [
    <OneToOneMatching key="one-to-one" profiles={users} />,
    <GroupMatching key="group" />,
  ];

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center bg-gray-neutral-900">
      <div className="w-full max-w-3xl min-h-screen flex flex-col items-center pb-[92px]">
        <RadixTabs
          tabLabels={tabLabels}
          tabContents={tabContents}
          disabled={!isConnect}
        />
      </div>
      {!isConnect && (
        <div className="absolute inset-0 top-0 w-full max-w-3xl h-full bg-black bg-opacity-75 backdrop-filter backdrop-blur-sm flex items-center justify-center pb-[92px]">
          <p className="text-white text-lg font-semibold text-center">
            스위치를 on하면
            <br />
            네트워킹에 참여할 수 있어요
          </p>
        </div>
      )}
      <Modal
        isOpen={isChatRequestOpen}
        onOpenChange={() => setIsChatRequestOpen(false)}
        title="요청을 수락해 네트워킹 진행하시겠어요?"
        subText="거절하면 네트워킹을 진행하지 않아요"
        buttons={[
          {
            label: '거절',
            actionType: 'action',
            onClick: () => {
              if (chatRequesterId !== null) rejectChat(chatRequesterId);
              setIsChatRequestOpen(false);
            },
            variant: 'black-transparent',
          },
          {
            label: '수락',
            actionType: 'action',
            onClick: () => {
              console.log(
                chatReceiverIdRef.current + ' ' + chatReceiverIdRef.current,
              );
              if (
                chatRequesterIdRef.current !== null &&
                chatReceiverIdRef.current !== null
              ) {
                acceptChat(
                  chatRequesterIdRef.current,
                  chatReceiverIdRef.current,
                );
              }
              setIsChatRequestOpen(false);
            },
            variant: 'green',
          },
        ]}
      />
    </div>
  );
};

export default Page;
