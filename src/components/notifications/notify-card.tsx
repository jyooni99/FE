'use client';

import { useRouter } from 'next/navigation';
import { formatDistanceToNow, Locale } from 'date-fns';
import { ko } from 'date-fns/locale';

import RequestCard from './request-card';
import NormalCard from './normal-card';

import { ChatMessage } from '~/types/card-notify';

interface NotifyCardProps {
  messageData: ChatMessage;
  className?: string;
  isDisabled?: boolean;
}

const NotifyCard = ({
  messageData,
  className,
  isDisabled,
}: NotifyCardProps) => {
  const router = useRouter();

  const timeStamp =
    'timeStamp' in messageData ? messageData.timeStamp : Date.now();

  const { messageType, message } = messageData;

  const subMessageList = [
    {
      messageType: 'request',
      message: '3분 안에 수락하지 않으면 자동 취소됩니다.',
    },
  ];

  const getSubMessage = (messageType: 'request' | 'reject' | 'accept') => {
    const getMessage = subMessageList.find(
      (message) => message.messageType === messageType,
    );
    return getMessage?.message;
  };

  const subMessage = getSubMessage(messageType);

  return (
    <div className={`${isDisabled ? 'opacity-50 pointer-events-none' : ''}`}>
      {messageType === 'request' ? (
        <RequestCard
          message={message}
          subMessage={subMessage}
          timeStamp={timeStamp}
          requester={messageData.requesterUser?.id}
          className={className}
          onClick={() =>
            router.push(`/user-info/${messageData.requesterUser?.id}`)
          }
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

interface TimeLeftProps {
  text: string;
}
// 매칭요청 뱃지 시간 3분 가정하고 시간 흘러감..
export const TimeLeft = ({ text }: TimeLeftProps) => {
  return (
    <p className="inline-block bg-gray-neutral-900 px-3 py-1 text-body-sm rounded-3xl">
      {text}
      <span className="inline-block ml-2 text-orange-500">2:59</span>
    </p>
  );
};

// 푸시알림 뱃지
export const PushAlarm = () => {
  return (
    <p className="inline-block bg-slate-900 px-3 py-1 text-body-sm rounded-3xl">
      푸시알람
    </p>
  );
};

// Main Message , Sub Message
export const MainMsg = ({ message }: { message: string }) => {
  return <p className="font-semibold text-body-md line-clamp-1">{message}</p>;
};

export const SubMsg = ({ subMessage }: { subMessage: string }) => {
  return (
    <span className="text-body-sm text-gray-neutral-400">{subMessage}</span>
  );
};

// 알림 시간.
interface TimeAgoProps {
  timestamp?: number;
}

export const TimeAgo = ({ timestamp = Date.now() }: TimeAgoProps) => {
  const timeAgo = formatDistanceToNow(new Date(timestamp), {
    addSuffix: true,
    locale: ko as unknown as Locale,
  });
  return <span className="text-gray-neutral-400 text-xs">{timeAgo}</span>;
};
