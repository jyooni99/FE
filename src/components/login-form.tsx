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
      const response = await login(data.username, data.password);

      console.log(response);

      const { accessToken, refreshToken } = response;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

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
          <p className="text-[22px] whitespace-pre-line pb-20">
            {`사전 등록 시 작성한 정보로\n 로그인해 주세요.`}
          </p>
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <Input name="username" placeholder="아이디 입력" />
            <Input
              name="password"
              placeholder="비밀번호 입력"
              type="password"
            />
            <div className="text-[13px] text-center text-[#a6a6a6] pb-10">
              <Link href="/account/find-id-pw">아이디﹒비밀번호 찾기</Link>
            </div>
            <Button type="submit" size={'full'} className="font-normal">
              로그인
            </Button>
            <Button
              type="button"
              size={'full'}
              variant={'black/70'}
              className="font-normal"
              onClick={() => {
                router.push('/onsite/register/profile');
              }}
            >
              현장등록 하기
            </Button>
          </form>
        </FormProvider>
        <div className="text-right text-xs mt-4 mb-8 text-neutral-400"></div>
      </div>
    </div>
  );
};

export default LoginForm;
