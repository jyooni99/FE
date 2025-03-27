'use client';

import { useRouter } from 'next/navigation';
import { QRCodeSVG } from 'qrcode.react';
import { useEffect, useState } from 'react';

import Button from '~/components/common/button';
import { useFormStore } from '~/stores/use-form-store';
import isPWA from '~/utils/is-pwa';

const Page = () => {
  const [path, setPath] = useState<string>('');
  const router = useRouter();
  const { qrData } = useFormStore();

  useEffect(() => {
    if (isPWA()) {
      setPath('/home');
    } else {
      setPath('/quick-network');
    }
  }, [setPath]);

  return (
    <div className="flex flex-col gap-4 min-h-screen px-6 justify-center items-center">
      <p className="text-base font-semibold text-left text-[#fefefe]">
        입장 시 QR코드를 보여주세요
      </p>
      <QRCodeSVG
        value={JSON.stringify(qrData)}
        size={260}
        bgColor="#FFF"
        fgColor="#000"
        level="H"
        marginSize={2}
      />
      <Button
        size={'full'}
        onClick={() => {
          router.push(path);
        }}
      >
        네트워킹존 입장하기
      </Button>
    </div>
  );
};

export default Page;
