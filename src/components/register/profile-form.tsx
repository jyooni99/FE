'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Input from '~/components/common/input';
import Button from '~/components/common/button';
import { signUpPayload, signUpSchema } from '~/schema/user';
import useFormSubmit from '~/utils/use-form-submit';
import { phoneFormatter } from '~/utils/phone-formatter';

const ProfileForm = () => {
  const methods = useForm<signUpPayload>({
    resolver: zodResolver(signUpSchema),
    mode: 'onTouched',
  });

  const { handleSubmit, setValue, watch, formState } = methods;

  const onSubmit = handleSubmit(useFormSubmit('/register/job'));

  const usernameValue = watch('username');
  const isUsernameValid = !formState.errors.username; //username 유효성 검사
  const [usernameCheckMessage, setUsernameCheckMessage] = useState(''); // username 중복 확인 메시지
  const [isUsernameAvailable, setIsUsernameAvailable] = useState<
    boolean | null
  >(null); // username 중복 확인

  async function checkUsername(value: string) {
    try {
      const res = await axios.get('/api/users/check-username', {
        params: { username: value },
      });

      if (res.data) {
        setUsernameCheckMessage('사용 가능한 아이디입니다.');
        setIsUsernameAvailable(true);
      } else {
        setUsernameCheckMessage('이미 사용 중인 아이디입니다.');
        setIsUsernameAvailable(false);
      }
    } catch (error) {
      console.error(error);
      setUsernameCheckMessage('오류가 발생했습니다. 다시 시도해주세요.');
      setIsUsernameAvailable(false);
    }
  }

  useEffect(() => {
    setUsernameCheckMessage('');
    setIsUsernameAvailable(null);
  }, [usernameValue]);

  return (
    <div className="h-full">
      <FormProvider {...methods}>
        <form
          onSubmit={onSubmit}
          className="flex flex-col justify-between h-full"
        >
          <div className="flex flex-col gap-5">
            <Input name="name" placeholder="이름" label="이름" />
            <div>
              <Input
                name="username"
                placeholder="아이디"
                label="아이디"
                customMessage={usernameCheckMessage}
                customMessageType={isUsernameAvailable ? 'success' : 'error'}
                button={
                  <Button
                    className="h-[42px]"
                    size="md"
                    type="button"
                    onClick={() => checkUsername(usernameValue)}
                    disabled={!usernameValue || !isUsernameValid}
                  >
                    중복 확인
                  </Button>
                }
              />
            </div>
            <Input
              name="password"
              placeholder="비밀번호"
              label="비밀번호"
              type="password"
              subLabel="8~20자의 영문, 숫자 및 특수문자(!@#$%^&*) 조합"
            />
            <Input name="email" placeholder="이메일" label="이메일" />
            <Input
              name="contactInfo"
              placeholder="휴대폰 번호"
              label="휴대폰 번호"
              maxLength={13}
              onChange={(e) =>
                setValue('contactInfo', phoneFormatter(e.target.value))
              }
            />
          </div>
          <Button
            className="py-3"
            disabled={!methods.formState.isValid || !isUsernameAvailable}
          >
            다음으로
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

export default ProfileForm;
