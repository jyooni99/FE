'use client';

import { useRouter } from 'next/navigation';
import Button from '~/components/common/button';

const Page = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-4 min-h-screen px-6 justify-center items-center">
      <div className="text-center pb-4">
        <p>사전등록이 완료되었습니다.</p>
        <p>컨퍼런스 날에 만나요</p>
      </div>
      <Button onClick={() => router.push('/')}>확인</Button>
    </div>
  );
};

export default Page;
