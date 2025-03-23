'use client';

import { useRouter } from 'next/navigation';
import Button from '~/components/common/button';
import LoginForm from '~/components/login-form';

const Page = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-4 min-h-screen px-6 justify-center items-center">
      <LoginForm />
      <Button
        size={'full'}
        variant={'secondary'}
        onClick={() => {
          router.push('/onsite/register/profile');
        }}
      >
        현장등록하기
      </Button>
    </div>
  );
};

export default Page;
