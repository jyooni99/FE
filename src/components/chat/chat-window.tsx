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
  chatRoomId: number;
  systemMessages?: { type: string; nickname?: string }[];
  onSystemMessageSend?: (subtype: SystemMessageSubtype) => void;
  onTableStatusSend?: (variant: VariantType, tableNumber?: string) => void;
}

const ChatWindow = ({
  messages,
  receiverName,
  receiverJob,
  currentUser,
  chatRoomId,
  systemMessages,
  onSystemMessageSend,
  onTableStatusSend,
}: ChatWindowProps) => {
  const chatRef = useRef<HTMLDivElement>(null);
  const [waitTime, setWaitTime] = useState<number | undefined>();
  const prevVariantRef = useRef<string | null>(null);

  const [notification, setNotification] = useState<Notification>({
    variant: 'apply',
    tableNumber: undefined,
  });

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
    const fetchWaitTime = async () => {
      const time = await getWaitTime(chatRoomId);
      console.log('💡 가져온 waitTime:', time);
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
      }
    };

    fetchWaitTime();
  }, [chatRoomId, onSystemMessageSend, onTableStatusSend]);

  useEffect(() => {
    if (chatRoomId) {
      localStorage.setItem('chatRoomId', String(chatRoomId));
      console.log('✅ chatRoomId 로컬 저장됨:', chatRoomId);
    }
  }, [chatRoomId]);

  const handleConfirm = async () => {
    if (chatRoomId) {
      const tableNumber = await requestTable(chatRoomId);
      console.log('테이블 신청 확인');
      setNotification({
        variant: 'assigned',
        tableNumber: tableNumber || undefined,
      });
      onTableStatusSend?.('assigned', tableNumber || undefined);
    } else {
      console.warn('👀 tableNumber 없음');
    }
  };

  const handleCancel = async () => {
    if (chatRoomId) {
      console.log('테이블 신청 취소');
      await cancelTable(chatRoomId);
    } else {
      console.warn('👀 신청 취소를 실패!: tableNumber가 없음', chatRoomId);
    }
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
          />
        )}
      </div>
      <div className="h-[85px]" />

      {/* 프로필 + 채팅 메시지 스크롤 영역 */}
      <div className="flex-1 overflow-y-auto " ref={chatRef}>
        <div className="flex flex-col items-center p-6 border border-gray-700/60">
          <DefaultProfile size="profileChat" jobValue={receiverJob} />
          <div className="flex flex-col items-center gap-1.5 mt-6">
            <p className="text-lg font-semibold text-center text-[#fefefe] w-[200px]">
              {receiverName}
            </p>
            <p className="text-[13px] text-center text-[#a6a6a6] w-[228px]">
              {receiverJob}
            </p>
          </div>
        </div>

        {/* 채팅 메시지 영역 */}
        <div className="p-4 ">
          {messages.map((message) => (
            <ChatBubble
              key={message.createTime}
              message={message.message}
              createTime={message.createTime}
              senderName={message.senderName}
              variant={
                currentUser === message.senderName ? 'sender' : 'receiver'
              }
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
