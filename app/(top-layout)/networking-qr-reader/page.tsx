'use client';

import { useRouter } from 'next/navigation';
import QrScanner from 'qr-scanner';
import { QRCodeSVG } from 'qrcode.react';
import { useEffect, useState } from 'react';

import QrScannerWrapper from '~/components/common/qr-scanner';
import { useWebSocketStore } from '~/stores/use-websocket-store';
import { networkingStart } from '~/utils/api/network';

const QrReader = () => {
  const router = useRouter();
  const { websocket, setWebSocket } = useWebSocketStore();
  const [chatRoomId, setChatRoomId] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const storedRoomId = localStorage.getItem('chatRoomId');
    const id = storedRoomId ? parseInt(storedRoomId, 10) : null;
    setChatRoomId(id);

    const access_token = localStorage.getItem('accessToken');
    const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';

    const ws = new WebSocket(
      `${protocol}//${process.env.NEXT_PUBLIC_WS_API_URL}/notifications?access_token=${access_token}`,
    );
    setWebSocket(ws);

    ws.onopen = () => {
      console.log('WebSocket 연결됨 [QR 페이지]');
    };

    ws.onmessage = (event) => {
      const notification = JSON.parse(event.data);

      if (notification.messageType === 'table') {
        console.log('[📥 받은 메시지]', notification);
        router.push('/table');
      }
    };

    return () => {
      ws.close();
    };
  }, [router, setWebSocket]);

  const handleNetworkingStart = async (result: QrScanner.ScanResult) => {
    try {
      const parsedData = JSON.parse(result.data);

      await networkingStart(parsedData.tableNumber);
      if (websocket && websocket.readyState === WebSocket.OPEN) {
        websocket.send(
          JSON.stringify({
            messageType: 'table',
            message: '네트워킹이 시작됩니다.',
            chatRoomId: chatRoomId,
          }),
        );
      }
      router.push('/table');
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
