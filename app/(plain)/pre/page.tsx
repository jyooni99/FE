'use client';

import { useRouter } from 'next/navigation';
import Button from '~/components/common/button';
import { useFormStore } from '~/stores/use-form-store';

const Page = () => {
  const router = useRouter();
  const { qrData } = useFormStore();

  return (
    <div className="flex flex-col gap-4 min-h-screen px-6 justify-center items-center">
      {Object.keys(qrData).length === 0 ? (
        <>
          <p className="text-white text-lg">사전등록 랜딩 페이지</p>
          <Button
            size={'full'}
            variant={'primary'}
            onClick={() => {
              router.push('/pre/register');
            }}
          >
            사전등록하기
          </Button>
        </>
      ) : (
        <>
          <div className="text-center pb-4">
            <p>사전등록이 완료되었습니다.</p>
            <p>컨퍼런스 날에 만나요</p>
          </div>
          <Button onClick={() => router.push('/')}>확인</Button>
        </>
      )}
    </div>
  );
};

export default Page;
