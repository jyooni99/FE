'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';

import Input from '~/components/common/input';
import Button from '~/components/common/button';
import { loginPayload, loginSchema } from '~/schema/user';
import { login } from '~/utils/api/user';
import { useFormStore } from '~/stores/use-form-store';
// import { useUserStore } from '~/stores/use-user-store';

const LoginForm = () => {
  const router = useRouter();
  const { fetchMyQRData } = useFormStore();
  const methods = useForm<loginPayload>({
    resolver: zodResolver(loginSchema),
    mode: 'onSubmit',
  });

  const onSubmit = methods.handleSubmit(async (data) => {
    try {
      await login(data.username, data.password);

      // const { setLoggedInUser } = useUserStore.getState();
      // setLoggedInUser(user);
      await fetchMyQRData();
      router.push('/welcome');
    } catch (error: unknown) {
      if (error instanceof Error) {
        methods.setError('password', {
          type: 'manual',
          message: error.message,
        });
      }
    }
  });

  return (
    <div className="flex flex-col w-full justify-center items-center">
      <div className="w-full max-w-3xl">
        <FormProvider {...methods}>
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <Input name="username" placeholder="아이디" />
            <Input name="password" placeholder="비밀번호" type="password" />
            <Button type="submit">로그인</Button>
          </form>
        </FormProvider>
        <div className="text-right text-xs mt-4 mb-8 text-neutral-400">
          <Link href="/account/find-id-pw">아이디﹒비밀번호 찾기</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
