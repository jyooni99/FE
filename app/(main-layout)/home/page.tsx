'use client';

import { useEffect, useState } from 'react';
import api from '~/utils/api/api';

import RadixTabs from '~/components/common/radix-tabs';
import GroupMatching from '~/components/match/group';
import OneToOneMatching from '~/components/match/one-to-one';
import { useNetworkStore } from '~/stores/use-network-store';
import { useUserStore } from '~/stores/use-user-store';
import { UserData } from '~/types/user.types';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
const Page = () => {
  const { isConnect } = useNetworkStore();
  const { users, setUsers } = useUserStore();
  const [loggedInUser, setLoggedInUser] = useState<UserData | null>(null);
  const [, setWebSocket] = useState<WebSocket | null>(null);
  const router = useRouter();
  const loggedInUserRef = useRef<UserData | null>(null);
  useEffect(() => {
    loggedInUserRef.current = loggedInUser;
  }, [loggedInUser]);

  console.log(users);
  console.log(loggedInUser);

  // 채팅 요청 알림 UI 표시
  function showChatRequestNotification(
    message: string,
    requesterId: number,
    receiverId: number,
  ) {
    const notificationElement = document.createElement('div');
    notificationElement.innerHTML = `
      <p>${message}</p>
      <button id="acceptButton">수락</button>
      <button id="rejectButton">거절</button>
    `;
    document.body.appendChild(notificationElement); // 메시지를 UI에 추가
    console.log('요청자' + requesterId);
    console.log('받는 사람' + receiverId);

    // 수락 버튼 클릭 시 acceptChat 호출
    const acceptButton = notificationElement.querySelector('#acceptButton')!;
    acceptButton.addEventListener('click', () =>
      acceptChat(requesterId, receiverId),
    );

    // 거절 버튼 클릭 시 rejectChat 호출
    const rejectButton = notificationElement.querySelector('#rejectButton')!;
    rejectButton.addEventListener('click', () => rejectChat(requesterId));
  }

  // 채팅 방 수락 함수
  async function acceptChat(requesterId: number, receiverId: number) {
    const chatsRequestDto = {
      requesterId: requesterId,
      receiverId: receiverId,
    };

    console.log(chatsRequestDto);
    try {
      const response = await api.post(
        'api/chats/private-chatroom/accept',
        chatsRequestDto,
      );
      console.log(response.data + ' sdsdssdsd');
      const roomId = response.data; // 응답에서 채팅방 ID 가져오기

      if (!response) throw new Error('응답에 roomId 없음');

      console.log('loggedInUser 객체:', loggedInUserRef.current);
      console.log('닉네임은' + loggedInUserRef.current?.nickName);
      localStorage.setItem('nickName', loggedInUserRef.current?.nickName || '');

      router.push(`/chat?roomId=${roomId}`);
    } catch (error) {
      console.error('[ERROR] 채팅방 수락 실패:', error);
    }
  }

  // 채팅 방 거절 함수
  function rejectChat(requesterId: number) {
    api.get(`api/chats/private-chatroom/reject?requesterId=${requesterId}`);
  }

  useEffect(() => {
    const access_token = localStorage.getItem('accessToken');
    const ws = new WebSocket(
      `ws://${process.env.NEXT_PUBLIC_WS_API_URL}/notifications?access_token=${access_token}`,
    );
    setWebSocket(ws);

    ws.onerror = (error) => {
      console.error('WebSocket 오류:', error);
    };
    // WebSocket 연결이 열리면
    ws.onopen = () => {
      console.log('WebSocket 연결됨');
    };
    const fetchLoggedInUser = async () => {
      try {
        const res = await api.get('/api/users/mypage', {});
        const data = await res.data;
        setLoggedInUser(data); // 로그인된 유저 정보 상태 설정
      } catch (error) {
        console.error('로그인된 유저 정보 불러오기 실패:', error);
      }
    };

    ws.onmessage = (event) => {
      const notificationData = JSON.parse(event.data); // 메시지 파싱

      // 메시지 타입이 'request'일 때
      if (notificationData.messageType === 'request') {
        const requesterId = notificationData.requesterId;
        const receiverId = notificationData.receiverId;
        const message = notificationData.message;

        // UI에 채팅 요청 알림을 띄운다.
        showChatRequestNotification(message, requesterId, receiverId);
      }

      if (notificationData.messageType === 'reject') {
        const message = notificationData.message;

        alert(message); // '채팅 요청이 거절되었습니다' 등 메시지 띄우기
      }

      if (notificationData.messageType === 'accept') {
        //룸 아이디와 함께 채팅페이지로 이동
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
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          },
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
    </div>
  );
};

export default Page;
