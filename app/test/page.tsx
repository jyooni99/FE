'use client';

import React from 'react';
import Button from '~/components/common/button';
import NotificationButton from '~/components/notification-button';
import { useCardStore } from '~/stores/use-card-store';

const Page = () => {
  const { cards, resetCard } = useCardStore();
  return (
    <>
      <div className="h-screen flex flex-col content-center justify-center text-center">
        <div className="text-lg mb-3">Push Notification</div>
        <div className="mx-auto">
          <NotificationButton />
          {cards.map((card, idx) => {
            return (
              <div key={`${card.id}-${idx}`} className="bg-white">
                <div>{card.affiliation}</div>
                <div>{card.email}</div>
                <div>
                  {card.job.category}/ {card.job.value}
                </div>
                <div>{card.name}</div>
                <div>{card.phone}</div>
              </div>
            );
          })}
          <Button onClick={resetCard}>카드 리스트 리셋</Button>
        </div>
      </div>
    </>
  );
};

export default Page;
