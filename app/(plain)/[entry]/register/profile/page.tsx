import React from 'react';
import ProfileForm from '~/components/register/profile-form';
import RegisterTemplete from '~/components/register/register-templete';

const RegisterPage = async ({
  params,
}: {
  params: Promise<{ entry: string }>;
}) => {
  const { entry } = await params;

  return (
    <RegisterTemplete
      title={`🎉 컨퍼런스 ${entry === 'pre' ? '사전' : '현장'} 등록`}
      subtitle={`행사 기간 동안 세션 출입, 네트워킹, 온라인 명함 교환 등 다양한 활동을 원활하게 이용하시려면 사전 등록이 필요합니다.`}
    >
      <ProfileForm />
    </RegisterTemplete>
  );
};

export default RegisterPage;
