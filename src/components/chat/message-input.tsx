'use client';

import { useForm, FormProvider } from 'react-hook-form';
import Input from '../common/input';
import Button from '../common/button';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface MessageFormData {
  message: string;
}

interface MessageInputProps {
  onSendMessage: (message: string) => void;
}

const MessageInput = ({ onSendMessage }: MessageInputProps) => {
  const methods = useForm<MessageFormData>({
    mode: 'onSubmit',
  });

  const [isTyping, setIsTyping] = useState(false);

  const onSubmit = methods.handleSubmit((data) => {
    if (data.message.trim()) {
      onSendMessage(data.message);
      methods.reset(); // 입력 초기화
      setIsTyping(false);
    }
  });

  useEffect(() => {
    const subscription = methods.watch((value, { name }) => {
      if (name === 'message') {
        setIsTyping(!!value.message);
      }
    });
    return () => subscription.unsubscribe();
  }, [methods]);

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={onSubmit}
        className="fixed bottom-0 left-0 right-0 z-10 bg-[#1a1a1a] border-t border-[#3a3a3a] px-4 py-3 flex items-center gap-2 max-w-screen-md mx-auto w-full"
      >
        {/* 메시지 입력 영역 */}
        <div className="flex-grow">
          <Input
            name="message"
            placeholder="메시지를 입력하세요..."
            inputSize="full"
            className="w-full bg-[#2C2C2C] text-[#909090] focus:ring-0 focus:outline-none border-none rounded-full px-4 py-2"
          />
        </div>

        {/* 전송 아이콘 버튼 */}
        <Button
          type="submit"
          size="sm"
          className="min-w-[48px] min-h-[48px] w-12 h-12 bg-transparent flex items-center justify-center rounded-full hover:bg-[#2C2C2C]/50"
        >
          <Image
            src={
              isTyping
                ? '/assets/svgs/subtract-on.svg'
                : '/assets/svgs/subtract.svg'
            }
            alt="Send Icon"
            width={24}
            height={24}
          />
        </Button>
      </form>
    </FormProvider>
  );
};

export default MessageInput;
