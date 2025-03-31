'use client';

import React from 'react';
import Button from '../common/button';
import { useRouter } from 'next/navigation';

const NetworkingButton = () => {
  const router = useRouter();

  function handleButton() {
    router.push('/networking-qr-reader');
  }

  return <Button onClick={handleButton}>QR 코드 등록</Button>;
};

export default NetworkingButton;
