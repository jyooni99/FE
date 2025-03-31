import React, { useRef, useEffect, useState } from 'react';
import ChatBubble from './chat-bubble';
import DefaultProfile from '../common/default-profile';
import TableApplicationCard from './table-application-card';
import {
  cancelTable,
  consentReservation,
  requestTable,
  getWaitTime,
} from '~/utils/api/table';
import SystemMessage from './system-message';
import { SystemMessageSubtype } from '../../../app/(top-layout)/chat/page';
import { useRouter } from 'next/navigation';
interface Message {
  id?: number;
  senderName: string;
  message: string;
  createTime: string;
}

type VariantType = 'apply' | 'waiting' | 'assigned';
interface Notification {
  variant: VariantType;
  tableNumber?: string;
}
interface ChatWindowProps {
  messages: Message[];
  status?: 'accepted' | 'pending';
  receiverJob: string;
  currentUser: string;
  receiverName: string;
  receiverStatus: string;
  chatRoomId: number;
  websocket?: WebSocket;
  // senderName: string;
  systemMessages?: { type: string; nickname?: string }[];
  onSystemMessageSend?: (subtype: SystemMessageSubtype) => void;
  onTableStatusSend?: (variant: VariantType, tableNumber?: string) => void;
}

const ChatWindow = ({
  messages,
  receiverName,
  receiverJob,
  receiverStatus,
  currentUser,
  chatRoomId,
  systemMessages,
  onSystemMessageSend,
  onTableStatusSend,
  websocket,
  // senderName,
}: ChatWindowProps) => {
  const chatRef = useRef<HTMLDivElement>(null);
  const [waitTime, setWaitTime] = useState<number | undefined>();
  const prevVariantRef = useRef<string | null>(null);
  // 건드리는 중
  // 초기 상태를 테이블 대기 시간에 따라 'apply' 혹은 'waiting' 로 설정
  const [notification, setNotification] = useState<Notification>({
    variant: 'apply',
    tableNumber: undefined,
  });
  const router = useRouter();
  const handleTimeoutSystemMessage = (
    prevVariant: string | null,
    newVariant: VariantType,
    send: (subtype: SystemMessageSubtype) => void,
    updatePrev?: (v: string) => void,
  ) => {
    if (prevVariant === 'assigned' && newVariant === 'apply') {
      send('timeout');
    }
    if (updatePrev) updatePrev(newVariant);
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (!websocket) return;

    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.messageType === 'table') {
        if (data.variant === 'apply') {
          setNotification({ variant: 'apply' });
        } else if (data.variant === 'waiting') {
          setNotification({ variant: 'waiting' });
        } else if (data.variant === 'assigned') {
          setNotification({
            variant: 'assigned',
            tableNumber: data.tableNumber,
          });
        }
      }
    };

    return () => {
      websocket.onmessage = null;
    };
  }, [websocket, router]);

  // useEffect(() => {
  //   const fetchWaitTime = async () => {
  //     const time = await getWaitTime(chatRoomId);
  //     setWaitTime(time);

  //     if (time <= 0) {
  //       const newVariant: VariantType = 'apply';
  //       setNotification((prev) => {
  //         handleTimeoutSystemMessage(
  //           prevVariantRef.current,
  //           newVariant,
  //           (subtype) => onSystemMessageSend?.(subtype),
  //           (v) => (prevVariantRef.current = v),
  //         );
  //         onTableStatusSend?.(newVariant);
  //         return { ...prev, variant: newVariant };
  //       });
  //     } else {
  //       const newVariant: VariantType = 'waiting';
  //       setNotification((prev) => {
  //         prevVariantRef.current = newVariant;
  //         onTableStatusSend?.(newVariant);
  //         return { ...prev, variant: newVariant };
  //       });
  //       onSystemMessageSend?.('notice');
  //     }
  //   };
  //   fetchWaitTime();
  // }, [chatRoomId, waitTime]);

  useEffect(() => {
    const fetchWaitTime = async () => {
      const time = await getWaitTime(chatRoomId);
      console.log('💡 가져온 waitTime:', waitTime);
      console.log('chatRoomId', chatRoomId);
      setWaitTime(time);

      if (time <= 0) {
        setNotification((prev) => {
          const newVariant = 'apply';
          handleTimeoutSystemMessage(
            prevVariantRef.current,
            newVariant,
            (subtype) => onSystemMessageSend?.(subtype),
            (v) => (prevVariantRef.current = v),
          );
          onTableStatusSend?.(newVariant);
          return { ...prev, variant: newVariant };
        });
      } else if (time > 0) {
        setNotification((prev) => {
          const newVariant = 'waiting';
          prevVariantRef.current = newVariant;
          onTableStatusSend?.(newVariant);
          return { ...prev, variant: newVariant };
        });
        onSystemMessageSend?.('notice');
      } else if (
        prevVariantRef.current === 'apply' ||
        prevVariantRef.current === 'waiting'
      ) {
        setNotification((prev) => {
          const newVariant = 'assigned';
          prevVariantRef.current = newVariant;
          onTableStatusSend?.(newVariant);
          return { ...prev, variant: newVariant };
        });
      }
    };

    fetchWaitTime();
  }, [chatRoomId, waitTime, onSystemMessageSend, onTableStatusSend]);

  useEffect(() => {
    if (chatRoomId) {
      localStorage.setItem('chatRoomId', String(chatRoomId));
      console.log('✅ chatRoomId 로컬 저장됨:', chatRoomId);
    }
  }, [chatRoomId]);
  // 백엔드에서 알림 데이터 가져오기 (주석 처리)
  /*
  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const response = await fetch('/api/notifications');
        const data: Notification = await response.json();
        setNotification(data);
      } catch (error) {
        console.error('Failed to fetch notification:', error);
      }
    };

    fetchNotification();
  }, []);
  */

  // /table-application-card onConfirm 함수 ✅
  const handleConfirm = async () => {
    if (chatRoomId) {
      const tableNumber = await requestTable(chatRoomId);
      console.log('테이블 신청 확인');
      // 여기에 테이블 배정 알림 확인 푸시알림
      setNotification({
        variant: 'assigned',
        tableNumber: tableNumber || undefined,
      });
      onTableStatusSend?.('assigned', tableNumber || undefined);
    } else {
      console.warn('👀 tableNumber 없음');
    }
  };

  // setShowSecondCancelModal
  // 지금 나가는 거 waiting 중일 때,
  const handleCancel = async () => {
    if (chatRoomId) {
      console.log('테이블 신청 취소');
      await cancelTable(chatRoomId);
    } else {
      console.warn('👀 신청 취소를 실패!: tableNumber가 없음', chatRoomId);
    }
    // 여기에 테이블 뭐지 이거 확인해야함
  };
  const handleConsent = async () => {
    await consentReservation(chatRoomId);
    onSystemMessageSend?.('agree');
    console.log('currentUser', currentUser);
  };

  return (
    <div className="flex flex-col h-full mt-[55px]">
      {/* 상단 고정 알림 */}
      <div className="fixed top-[55px] left-0 right-0 z-10">
        {notification && (
          <TableApplicationCard
            variant={notification.variant}
            tableNumber={notification.tableNumber}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
            chatRoomId={chatRoomId}
            onConsent={handleConsent}
            currentUser={currentUser}
            receiverName={receiverName}
            waitTime={waitTime}
            // waitTime 여기에 ..
          />
        )}
      </div>
      {/* 알림 높이만큼 공간 확보 */}
      <div className="h-[85px]" />

      {/* 프로필 + 채팅 메시지 스크롤 영역 */}
      <div className="flex-1 overflow-y-auto " ref={chatRef}>
        {/* 프로필 */}
        <div className="flex flex-col items-center p-6 border border-gray-700/60">
          <DefaultProfile size="profileChat" jobValue={receiverJob} />
          <div className="flex flex-col items-center gap-1.5 mt-6">
            <p className="text-lg font-semibold text-center text-[#fefefe] w-[200px]">
              {receiverName}
            </p>
            <p className="text-[13px] text-center text-[#a6a6a6] w-[228px]">
              {receiverStatus}
            </p>
          </div>
        </div>

        {/* 채팅 메시지 영역 */}
        <div className="p-4 ">
          {messages.map((message) => (
            <ChatBubble
              key={message.createTime}
              message={message.message} // 메시지 내용
              createTime={message.createTime}
              senderName={message.senderName}
            />
          ))}
          {systemMessages?.map((msg, idx) => (
            <SystemMessage
              key={idx}
              type={msg.type as SystemMessageSubtype}
              nickname={msg.nickname}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
