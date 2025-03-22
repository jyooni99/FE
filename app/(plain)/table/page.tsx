'use client';

import React from 'react';
import NetworkingActions from '~/components/table/networking-actions';
import TableRemainingTime from '~/components/table/table-remaining-time';
import TableUsageRules from '~/components/table/table-usage-rules';

const TablePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-[#1a1a1a] min-h-screen">
      <div className="flex flex-col items-center gap-12 w-full max-w-md">
        <TableRemainingTime initialMinutes={0} initialSeconds={2} />
        <TableUsageRules />
        <NetworkingActions />
      </div>
    </div>
  );
};

export default TablePage;
