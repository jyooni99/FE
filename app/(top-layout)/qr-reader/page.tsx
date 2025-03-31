'use client';

import QrScanner from 'qr-scanner';
import { useState } from 'react';

import QrScannerWrapper from '~/components/common/qr-scanner';
import CardDialog from '~/components/mypage/card-dialog';
import { useFormStore } from '~/stores/use-form-store';
import { addCard } from '~/utils/api/card';

const QrReader = () => {
  const { qrData } = useFormStore(); // 내 QR 명함 데이터
  const [showCard, setShowCard] = useState<boolean>(false); // 내 명함 보여주기/숨기기

  const handleBusinessCardScan = (result: QrScanner.ScanResult) => {
    try {
      const parsedData = JSON.parse(result.data);
      addCard(parsedData);
    } catch (error) {
      console.error('QR 데이터 처리 실패:', error);
    }
  };

  return (
    <QrScannerWrapper
      onScan={handleBusinessCardScan}
      showButton
      buttonText="내 QR코드 보기"
      onButtonClick={() => setShowCard((prev) => !prev)}
      dialog={
        <CardDialog
          open={showCard}
          onClose={() => setShowCard(false)}
          user={qrData}
          isShowQR
        />
      }
    />
  );
};

export default QrReader;
