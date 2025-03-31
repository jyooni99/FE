'use client';

import { useRouter } from 'next/navigation';
import QrScanner from 'qr-scanner';
import { QRCodeSVG } from 'qrcode.react';

import QrScannerWrapper from '~/components/common/qr-scanner';
import { networkingStart } from '~/utils/api/network';

const QrReader = () => {
  const router = useRouter();

  const handleNetworkingStart = (result: QrScanner.ScanResult) => {
    try {
      const parsedData = JSON.parse(result.data);
      networkingStart(parsedData.tableNumber);
    } catch (error) {
      console.error('QR 데이터 처리 실패:', error);
    }
  };

  return (
    <>
      {/* 테이블 QR입니다! 테스트할 때만 사용해주시고, 배포할 때는 주석 처리 해주세요! */}
      <QRCodeSVG
        value={JSON.stringify({ tableNumber: 'T1' })}
        size={200}
        bgColor="#FFF"
        fgColor="#000"
        level="H"
        marginSize={2}
      />
      <QrScannerWrapper
        onScan={handleNetworkingStart}
        showButton
        buttonText="채팅방으로 돌아가기"
        scanGuideText="테이블의 QR코드를 인식해주세요."
        onButtonClick={() => router.back()}
      />
    </>
  );
};

export default QrReader;
