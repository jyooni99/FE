'use client';

import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Dialog } from 'radix-ui';
import { QRCodeType } from '~/types/form';

import RepeatIcon from '~/assets/svgs/repeat.svg';
import ScannerIcon from '~/assets/svgs/scanner.svg';
import UnderLeftDeco from '~/assets/svgs/graphic-under-left.svg';
import UpRightDeco from '~/assets/svgs/graphic-up-right.svg';

import { getHashColor, getIconByJob } from '~/utils/get-profile-style';

interface DetailCardProps {
  user: QRCodeType | null;
  isShowQR?: boolean;
}

const DetailCard = ({ user, isShowQR = false }: DetailCardProps) => {
  const [showQR, setShowQR] = useState(isShowQR);
  const handleToggle = () => setShowQR((prev) => !prev);

  return (
    <>
      <Dialog.Title className="text-white text-sm font-medium flex justify-between w-[215px] absolute top-[-60px] left-1/2 -translate-x-1/2 z-10 pointer-events-none">
        <span className="translate-y-[110%] inline-flex gap-1 items-center ㅋ-">
          <RepeatIcon />
          카드를 뒤집어 명함을 교환하세요!
        </span>
      </Dialog.Title>
      <div
        className="perspective-1000 w-[315px] h-[468px] cursor-pointer overflow-hidden rounded-2xl"
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
    </>
  );
};

const FrontCard = ({ user }: { user: QRCodeType | null }) => {
  const color = getHashColor(user?.job.value ?? '');
  const Icon = getIconByJob(user?.job.value);

  return (
    <div className="absolute w-full h-full backface-hidden bg-stone-900 py-16 px-10 rounded-2xl">
      <UnderLeftDeco
        className="absolute left-[-2px] bottom-[0px]"
        width={121}
        height={104}
        fill={color}
      />
      <UpRightDeco
        className="absolute right-[0px] top-[0px]"
        fill={color}
        width={102}
        height={87}
      />
      <Icon
        className="absolute bottom-[20px] right-[20px]"
        style={{ color }}
        width={136}
        height={136}
      />
      <div className="flex flex-col items-start h-full">
        <p className="text-white text-4xl font-semibold leading-[43.2px] mb-10">
          {user?.name}
        </p>
        <div className="w-full space-y-3 font-['Pretendard'] font-light">
          <InfoRow label="직무/직책" value={user?.job.value} />
          <InfoRow label="소속" value={user?.affiliation} />
          <InfoRow label="이메일" value={user?.email} />
          <InfoRow label="휴대폰 번호" value={user?.contactInfo} />
        </div>
      </div>
    </div>
  );
};

const BackCard = ({ user }: { user: QRCodeType | null }) => (
  <div className="absolute w-full h-full rotate-y-180 backface-hidden bg-stone-900 py-16 px-10 rounded-2xl">
    <div className="flex flex-col items-center justify-top gap-7 h-full">
      <QRCodeSVG
        value={JSON.stringify(user)}
        size={170}
        bgColor="#FFF"
        fgColor="#000"
        level="H"
        marginSize={2}
      />
      <Dialog.Title className="text-white text-sm font-medium flex justify-between w-[160px]">
        <ScannerIcon />
        QR코드를 스캔해주세요
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
