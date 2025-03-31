'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import NetworkingActions from '~/components/table/networking-actions';
import TableRemainingTime from '~/components/table/table-remaining-time';
import TableUsageRules from '~/components/table/table-usage-rules';
import { useWebSocketStore } from '~/stores/use-websocket-store';

const TablePage: React.FC = () => {
  const { websocket } = useWebSocketStore();
  const router = useRouter();
  useEffect(() => {
    if (!websocket) return;

    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.messageType === 'table' && data.variant === 'end') {
        router.push('/home');
      }
    };

    return () => {
      websocket.onmessage = null;
    };
  }, [websocket, router]);

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-[#1a1a1a] min-h-screen">
      <div className="flex flex-col items-center gap-12 w-full max-w-md">
        <TableRemainingTime
          initialMinutes={20}
          initialSeconds={0}
          tableNumber="1"
          userId={1}
        />
        <TableUsageRules />
        <NetworkingActions tableNumber="1" userId={1} />
      </div>
    </div>
  );
};

export default TablePage;
