'use client';
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import type { Locale } from 'date-fns';
import { GrFormNext } from 'react-icons/gr';
import { useRouter } from 'next/navigation';
import NormalCard from '../card/normal-card';
import RequestCard from '../card/request-card';
// import { MessageType } from '../../stores/use-notify-store';
// import DefaultProfile from '../common/default-profile';
// import Button from '../common/button';
import { NotifyUser } from '~/types/notify-user';
interface NotifyProps {
  messageData: {
    message: string;
    subMessage: string;
    // status?: MessageType;
    requester?: NotifyUser;
    status: 'request' | 'normal';
    chatRoomId?: number;
    timeStamp?: number;
    requesterId: number;
    receiverId: number;
  };
  className?: string;
  isDisabled?: boolean;
}

const NotifyCard = ({ messageData, className, isDisabled }: NotifyProps) => {
  const {
    message,
    subMessage,
    chatRoomId,
    timeStamp,
    status,
    // requesterId,
    // receiverId,
  } = messageData;

  const router = useRouter();

  const handleAccept = async () => {
    if (!isDisabled) return;

    const requesterId = Number(messageData?.requester?.id) || 1;

    const receiverId = messageData?.receiverId || 2; // 채팅 수락자 ID (디폴트 값 설정)

    console.log('requesterId:', requesterId);
    console.log('receiverId:', receiverId);
    console.log(process.env.NEXT_PUBLIC_HTTP_API_URL);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HTTP_API_URL}/chats/private-chatroom/accept`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            requesterId: 1,
            receiverId: 2,
          }),
        },
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error('채팅 수락 실패:', errorText);
        return;
      }

      const data = await response.json();
      const newChatRoomId = data?.privateChatRoomId || chatRoomId;

      if (newChatRoomId) {
        router.push(`/chat/${newChatRoomId}?user=1`);
      } else {
        router.push('/chat?user=1');
      }
    } catch (err) {
      console.error('채팅 수락 처리 중 오류:', err);
    }
  };

  return (
    <div
      className={`relative ${isDisabled ? 'opacity-50 pointer-events-none' : ''}`}
    >
      {isDisabled && (
        <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg"></div>
      )}
      {status === 'request' ? (
        <RequestCard
          message={message}
          subMessage={subMessage}
          timeStamp={timeStamp}
          onAccept={handleAccept}
          requester={messageData.requester?.id}
          className={className}
        />
      ) : (
        <NormalCard
          message={message}
          subMessage={subMessage}
          timeStamp={timeStamp}
          className={className}
        />
      )}
    </div>
  );
};

export default NotifyCard;

// COMPONENTS
// ▼ ******* 📦 container
// 🔸 Msg 컨테이너 - 안에 message, subMessage 선택 취하
interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const MsgContainer = ({ children }: ContainerProps) => {
  return (
    <div className="flex flex-col justify-center gap-2 break-words">
      {children}
    </div>
  );
};
// ⏏️ container 📦 ********

// ✼✼ 화살표 이모티콘
export const Arrow = () => {
  return (
    <div>
      <GrFormNext />
    </div>
  );
};

interface TimeLeftProps {
  text: string;
}
// ✼✼매칭요청 뱃지 시간 3분 가정하고 시간 흘러감..
export const TimeLeft = ({ text }: TimeLeftProps) => {
  return (
    <p className="inline-block bg-slate-900 px-3 py-1 text-body-sm rounded-3xl">
      {text}
      <span className="inline-block ml-2 text-red-600">2:59</span>
    </p>
  );
};

// ✼✼푸시알림 뱃지
export const PushAlarm = () => {
  return (
    <p className="inline-block bg-slate-900 px-3 py-1 text-body-sm rounded-3xl">
      푸시알람
    </p>
  );
};

// ✼✼ Main Message , Sub Message
export const MainMsg = ({ message }: { message: string }) => {
  return <p className="font-semibold text-body-md line-clamp-1">{message}</p>;
};

export const SubMsg = ({ subMessage }: { subMessage: string }) => {
  return <span className="text-body-sm text-gray-500">{subMessage}</span>;
};

// ✼✼알림 시간.
interface TimeAgoProps {
  timestamp?: number;
}

export const TimeAgo = ({ timestamp = Date.now() }: TimeAgoProps) => {
  const timeAgo = formatDistanceToNow(new Date(timestamp), {
    addSuffix: true,
    locale: ko as unknown as Locale,
  });
  return <span>{timeAgo}</span>;
};
