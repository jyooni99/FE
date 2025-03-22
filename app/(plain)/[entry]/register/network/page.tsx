import React from 'react';
import NetworkForm from '~/components/register/network-form';
import RegisterTemplete from '~/components/register/register-templete';

const RegisterInterest = () => {
  return (
    <RegisterTemplete
      title={`아래 항목은 이번 컨퍼런스 행사 내 \n네트워킹 이벤트에 필요한 정보입니다.`}
    >
      <NetworkForm />
    </RegisterTemplete>
  );
};

export default RegisterInterest;
