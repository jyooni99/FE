import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '~/utils/cn';
import DefaultProfile from '~/components/common/default-profile';
import { useState } from 'react';
import { useEffect } from 'react';

const chatBubbleVariants = cva(
  'break-words whitespace-normal relative max-w-[220px] w-fit min-h-[43px]',
  {
    variants: {
      variant: {
        sender:
          'bg-[#555555] ml-auto rounded-tl-[8px] rounded-br-[8px] rounded-bl-[8px] px-4 py-2.5 text-white',
        receiver:
          'bg-[#1f1f1f] mr-auto rounded-tr-[8px] rounded-br-[8px] rounded-bl-[8px] px-4 py-2.5 text-white',
        system: 'bg-yellow-100 text-black mx-auto italic rounded-lg',
      },
      size: {
        default: 'text-sm px-4 py-2 gap-1',
        small: 'text-xs px-3 py-1',
        large: 'text-base px-5 py-3',
      },
    },
    defaultVariants: {
      variant: 'receiver',
      size: 'default',
    },
  },
);

interface ChatBubbleProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chatBubbleVariants> {
  message: string;
  showProfile?: boolean;
  createTime: string;
  senderName: string;
  imgSrc?: string;
}
const ChatBubble = ({
  variant,
  size,
  className,
  message,
  createTime,
  senderName,
  showProfile = false,
  imgSrc,
  ...props
}: ChatBubbleProps) => {
  const [savedNickName, setSavedNickName] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const nickName = localStorage.getItem('nickName');
      setSavedNickName(nickName);
      console.log(senderName);

      // 상태 변경 전에 localStorage에서 가져온 값 확인
    }
  }, []);
  useEffect(() => {
    console.log(senderName === savedNickName);
  }, [savedNickName]);
  console.log('sd:' + savedNickName);
  return (
    <div
      className={cn(
        'mb-2 flex gap-2 items-start',

        senderName === savedNickName ? 'justify-end' : 'justify-start',
      )}
    >
      {variant === 'receiver' && showProfile && imgSrc && (
        <DefaultProfile size="xs" />
      )}
      <div>
        <div className="message-content">{message}</div>{' '}
        <div className="message-time">
          {' '}
          {new Date(createTime).toLocaleTimeString('ko-KR', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          })}
        </div>{' '}
      </div>
    </div>
  );
};

export default ChatBubble;
