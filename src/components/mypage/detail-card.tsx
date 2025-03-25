'use client';

import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Dialog } from 'radix-ui';
import { QRCodeType } from '~/types/form';

interface DetailCardProps {
  user: QRCodeType | null;
  isShowQR?: boolean;
}

const DetailCard = ({ user, isShowQR = false }: DetailCardProps) => {
  const [showQR, setShowQR] = useState(isShowQR);
  const handleToggle = () => setShowQR((prev) => !prev);

  return (
    <div
      className="perspective-1000 w-[315px] h-[468px] cursor-pointer"
      onClick={handleToggle}
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d rounded-2xl shadow-md ${
          showQR ? 'rotate-y-180' : ''
        }`}
      >
        <FrontCard user={user} />
        <BackCard user={user} />
      </div>
    </div>
  );
};

const FrontCard = ({ user }: { user: QRCodeType | null }) => (
  <div className="absolute w-full h-full backface-hidden bg-stone-900 py-16 px-10 rounded-2xl">
    <div className="flex flex-col items-start h-full">
      <Dialog.Title className="text-white text-4xl font-semibold leading-[43.2px] mb-10">
        {user?.name}
      </Dialog.Title>

      <div className="w-full space-y-3 font-['Pretendard'] font-light">
        <InfoRow label="직무/직책" value={user?.job.value} />
        <InfoRow label="소속" value={user?.affiliation} />
        <InfoRow label="이메일" value={user?.email} />
        <InfoRow label="휴대폰 번호" value={user?.contactInfo} />
      </div>
    </div>
  </div>
);

const BackCard = ({ user }: { user: QRCodeType | null }) => (
  <div className="absolute w-full h-full rotate-y-180 backface-hidden bg-stone-900 py-16 px-10 rounded-2xl">
    <div className="flex flex-col items-center justify-top gap-7 h-full">
      <QRCodeSVG value={JSON.stringify(user)} width={170} height={170} />
      <Dialog.Title className="text-white text-xl font-medium">
        QR코드
      </Dialog.Title>
    </div>
  </div>
);

const InfoRow = ({ label, value }: { label: string; value?: string }) => (
  <div className="flex text-sm text-neutral-200">
    <Dialog.Description className="w-[85px]">{label}</Dialog.Description>
    <Dialog.Description>{value}</Dialog.Description>
  </div>
);

export default DetailCard;
