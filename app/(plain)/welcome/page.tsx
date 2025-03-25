'use client';

import { useRouter } from 'next/navigation';
import { QRCodeSVG } from 'qrcode.react';

import Button from '~/components/common/button';
import { useFormStore } from '~/stores/use-form-store';

const Page = () => {
  const router = useRouter();
  const { qrData } = useFormStore();

  return (
    <div className="flex flex-col gap-4 min-h-screen px-6 justify-center items-center">
      <QRCodeSVG value={JSON.stringify(qrData)} />
      <Button
        size={'full'}
        onClick={() => {
          router.push('/quick-network');
        }}
      >
        네트워킹존 입장하기
      </Button>
    </div>
  );
};

export default Page;
