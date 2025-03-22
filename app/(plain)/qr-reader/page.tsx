'use client';

import QrScanner from 'qr-scanner';
import React, { useEffect, useRef, useState } from 'react';
import Button from '~/components/common/button';
import { useCardStore } from '~/stores/use-card-store';

const QrReader = () => {
  const { addCard } = useCardStore();
  const [qrError, setQrError] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const qrScannerRef = useRef<QrScanner | null>(null);

  const handleScan = (result: QrScanner.ScanResult) => {
    const parsedData = JSON.parse(result.data);
    addCard(parsedData);
  };

  const QrOptions = {
    preferredCamera: 'environment',
    maxScanPerSecond: 3,
    highlightScanRegion: true,
  };

  useEffect(() => {
    QrScanner.hasCamera().then((hasCamera) => {
      if (!hasCamera) {
        setQrError(true);
      }

      if (hasCamera) {
        const videoElem = videoRef.current;

        if (videoElem && !qrScannerRef.current) {
          const qrScanner = new QrScanner(
            videoElem,
            (result) => {
              handleScan(result);
            },
            QrOptions,
          );
          qrScannerRef.current = qrScanner;

          // 카메라 사용 허가되었는지 확인
          qrScanner.start().catch((e) => {
            console.error('QR Scanner Error:', e);
            setQrError(true);
          });

          return () => qrScanner.destroy();
        }
      }
    });
  }, []);

  return (
    <div id="qr-code" className="h-screen">
      {!qrError && (
        <div className="w-full h-full relative">
          <h1>QR리더기</h1>
          <video className="w-full h-full object-contain" ref={videoRef} />
          <Button
            className="absolute top-2/3 left-1/2 -translate-x-1/2"
            size={'sm'}
          >
            나의 qr코드 바로 가기
          </Button>
        </div>
      )}

      {/* qr 카메라가 작동이 안 될 경우 */}
      {qrError && (
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-black/50 text-white">
          <p className="text-xl font-semibold">오류가 발생했습니다.</p>
          <small className="mt-2">
            카메라가 작동하지 않으면 휴대기기의 카메라를 직접 사용해주세요.
          </small>
        </div>
      )}
    </div>
  );
};

export default QrReader;
