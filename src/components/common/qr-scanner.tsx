'use client';

import QrScanner from 'qr-scanner';
import React, { useEffect, useRef, useState } from 'react';
import Button from '~/components/common/button';

interface QrScannerWrapperProps {
  onScan: (result: QrScanner.ScanResult) => void;
  showButton?: boolean;
  buttonText?: string;
  onButtonClick?: () => void;
  dialog?: React.ReactNode;
  scanGuideText?: string;
}

const QrScannerWrapper = ({
  onScan,
  showButton = false,
  buttonText = '',
  onButtonClick,
  dialog,
  scanGuideText = '네트워킹 상대의 명함 QR코드를 인식하세요',
}: QrScannerWrapperProps) => {
  const [qrError, setQrError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const qrScannerRef = useRef<QrScanner | null>(null);
  const scanTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isScannedRef = useRef<boolean>(false);

  const handleScan = (result: QrScanner.ScanResult) => {
    if (isScannedRef.current) return;
    isScannedRef.current = true;

    try {
      onScan(result);

      qrScannerRef.current?.setInversionMode('original');

      scanTimeoutRef.current = setTimeout(() => {
        isScannedRef.current = false;
        qrScannerRef.current?.setInversionMode('both');
      }, 3000);
    } catch (error) {
      console.error('QR 처리 오류:', error);
      isScannedRef.current = false;
    }
  };

  const qrOptions = {
    preferredCamera: 'environment',
    maxScansPerSecond: 1,
    highlightScanRegion: true,
    calculateScanRegion: (video: HTMLVideoElement) => {
      const smallestDimension = Math.min(video.videoWidth, video.videoHeight);
      const scanRegionSize = Math.round(smallestDimension * 0.28);
      return {
        x: Math.round((video.videoWidth - scanRegionSize) / 2),
        y:
          Math.round((video.videoHeight - scanRegionSize) / 2) +
          Math.round(video.videoHeight * -0.06),
        width: scanRegionSize,
        height: scanRegionSize,
        downScaledWidth: scanRegionSize,
        downScaledHeight: scanRegionSize,
      };
    },
    onDecodeError: () => {},
  };

  useEffect(() => {
    const initScanner = async () => {
      const hasCamera = await QrScanner.hasCamera();
      if (!hasCamera) {
        setQrError(true);
        return;
      }

      const videoElem = videoRef.current;
      if (!videoElem || qrScannerRef.current) return;

      const qrScanner = new QrScanner(videoElem, handleScan, qrOptions);
      qrScannerRef.current = qrScanner;
      qrScanner.start();
    };

    initScanner();

    return () => {
      qrScannerRef.current?.destroy();

      if (scanTimeoutRef.current) {
        clearTimeout(scanTimeoutRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative w-screen h-full max-w-3xl bg-black">
      {!qrError && (
        <div className="relative w-full h-full">
          <video
            ref={videoRef}
            className="absolute bottom-0 left-0 w-full h-full object-cover"
            autoPlay
            playsInline
          />

          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-[calc(20.4%)] bg-black/50" />
            <div className="absolute bottom-0 left-0 w-full h-[calc(33%)] bg-black/50" />
          </div>

          <div className="absolute w-[280px] top-20 left-1/2 transform -translate-x-1/2 text-white text-center">
            <p className="bg-black/60 px-4 py-3 rounded-md text-sm">
              {scanGuideText}
            </p>
          </div>

          {showButton && (
            <div className="absolute bottom-[165px] left-1/2 transform -translate-x-1/2">
              <Button onClick={onButtonClick} size="lg">
                {buttonText}
              </Button>
            </div>
          )}

          {dialog}
        </div>
      )}

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

export default QrScannerWrapper;
