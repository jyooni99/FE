'use client';

import QrScanner from 'qr-scanner';
import React, { useEffect, useRef, useState } from 'react';
import Button from '~/components/common/button';
import CardDialog from '~/components/mypage/card-dialog';
import { useFormStore } from '~/stores/use-form-store';
import { addCard } from '~/utils/api/card';

const QrReader = () => {
  const { qrData } = useFormStore(); // 내 QR 명함 데이터
  const [showCard, setShowCard] = useState<boolean>(false); // 내 명함 보여주기/숨기기
  const [qrError, setQrError] = useState<boolean>(false); // QrError
  const videoRef = useRef<HTMLVideoElement>(null); // 비디오
  const qrScannerRef = useRef<QrScanner | null>(null);
  const scanTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isScannedRef = useRef<boolean>(false); // 스캔 상태 관리

  const handleScan = (result: QrScanner.ScanResult) => {
    if (isScannedRef.current) return;

    isScannedRef.current = true;

    try {
      const parsedData = JSON.parse(result.data);
      addCard(parsedData);

      if (qrScannerRef.current) {
        qrScannerRef.current.setInversionMode('original');
      }

      scanTimeoutRef.current = setTimeout(() => {
        isScannedRef.current = false;
        if (qrScannerRef.current) {
          qrScannerRef.current.setInversionMode('both');
        }
      }, 3000);
    } catch (error) {
      console.error('QR 처리 오류:', error);
      isScannedRef.current = false;
    }
  };

  const QrOptions = {
    preferredCamera: 'environment',
    maxScansPerSecond: 1,
    highlightScanRegion: true,
    calculateScanRegion: (video: HTMLVideoElement) => {
      // 스캔 영역을 화면 중앙에 위치
      const smallestDimension = Math.min(video.videoWidth, video.videoHeight);
      const scanRegionSize = Math.round(smallestDimension * 0.28);
      return {
        x: Math.round((video.videoWidth - scanRegionSize) / 2),
        y:
          Math.round((video.videoHeight - scanRegionSize) / 2) +
          Math.round(video.videoHeight * -0.06), // y축 위치 조정
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

      const qrScanner = new QrScanner(videoElem, handleScan, QrOptions);
      qrScannerRef.current = qrScanner;

      qrScanner.start();
    };

    initScanner();

    // 컴포넌트 언마운트 시 정리
    return () => {
      if (qrScannerRef.current) {
        qrScannerRef.current.destroy();
      }
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
          {/* 카메라 비디오 */}
          <video
            ref={videoRef}
            className="absolute bottom-0 left-0 w-full h-full object-cover"
            autoPlay
            playsInline
          />

          {/* 스캔 영역 하이라이트 */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-[calc(20.4%)] bg-black/50" />
            <div className="absolute bottom-0 left-0 w-full h-[calc(33%)] bg-black/50" />
          </div>

          {/* 안내 텍스트 */}
          <div className="absolute w-[280px] top-20 left-1/2 transform -translate-x-1/2 text-white text-center">
            <p className="bg-black/60 px-4 py-3 rounded-md text-sm">
              네트워킹 상대의 명함 QR코드를 인식하세요
            </p>
          </div>

          {/* 버튼 */}
          <div className="absolute bottom-[165px] left-1/2 transform -translate-x-1/2">
            <Button onClick={() => setShowCard((prev) => !prev)} size="lg">
              내 명함 QR코드 보기
            </Button>
          </div>

          {/* 내 명함 QR코드 다이얼로그 */}
          <CardDialog
            open={showCard}
            onClose={() => setShowCard(false)}
            user={qrData}
            isShowQR={true}
          />
        </div>
      )}

      {/* QR 카메라가 작동하지 않을 경우 */}
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
