'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Button from '~/components/common/button';
import IconRolling from '~/components/common/quick-network/icon-rolling';
import TextRolling from '~/components/common/quick-network/text.rolling';

const Page = () => {
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxClick = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)] px-6 py-8 justify-between items-center bg-[#1C1C1E]">
      <div className="flex flex-col justify-start items-start w-full max-w-[327px] gap-5">
        <div className="flex justify-start items-center gap-1.5">
          <Image
            src="/assets/svgs/logo.svg"
            alt="logo"
            width={40}
            height={40}
          />
          <p className="text-2xl font-semibold text-white">퀵네트워크</p>
        </div>
        <p className="text-lg font-semibold text-[#fefefe]">
          지금, IF KAKAO 2025에서 <br />
          놓치지 말아야 할 연결을 시작해 보세요!
        </p>
      </div>

      <div className="w-full flex flex-col items-center gap-8">
        <div className="w-full relative overflow-hidden py-6 rounded-lg bg-[#2e2e2e]">
          <div className="flex flex-col items-center gap-4">
            <IconRolling />
            <div className="h-[56px] overflow-hidden">
              <TextRolling />
            </div>
          </div>
        </div>
      </div>

      <div
        className="flex flex-col items-center gap-6 w-full max-w-[327px]"
        onClick={handleCheckboxClick}
      >
        <div className="flex items-start gap-2 w-full cursor-pointer">
          <Image
            src={
              isChecked
                ? '/assets/svgs/checkbox-circle-true.svg'
                : '/assets/svgs/checkbox-circle-false.svg'
            }
            alt="check"
            width={20}
            height={20}
            className="mt-1"
          />
          <p className="text-sm text-[#fefefe] flex-1">
            네트워킹 서비스의 원활한 이용(네트워킹 수락 여부, 테이블 배정
            알림)을 위해 홈 화면 추가가 필요해요.
          </p>
        </div>
        <Button
          size={'full'}
          onClick={(e) => {
            e.stopPropagation();
            router.push('/home');
          }}
          disabled={!isChecked}
        >
          1초만에 홈 화면 추가
        </Button>
      </div>
    </div>
  );
};

export default Page;
