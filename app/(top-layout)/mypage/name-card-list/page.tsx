'use client';

import { useEffect, useState } from 'react';
import Button from '~/components/common/button';
import CardDialog from '~/components/mypage/card-dialog';
import CardItem from '~/components/mypage/card-item';
import { QRCodeType } from '~/types/form';
import { fetchCard } from '~/utils/api/card';

const Page = () => {
  const [cards, setCards] = useState<QRCodeType[] | []>([]);
  const [selectedUser, setSelectedUser] = useState<QRCodeType | null>(null);

  useEffect(() => {
    const loadCards = async () => {
      const fetchedCards = await fetchCard();
      setCards(fetchedCards ?? []);
    };

    loadCards();
  }, []);

  const downloadHandler = () => {
    console.log('다운로드 클릭됨');
  };

  return (
    <div className="relative m-auto w-full h-full text-body-lg max-w-2xl flex flex-col justify-center items-center gap-4 py-5 px-5 overflow-x-hidden">
      <div className="flex flex-col justify-between w-full h-full">
        <div className="w-full flex gap-2 flex-col">
          {/* 카드 리스트 */}
          {cards.map((user, index) => (
            <CardItem
              user={user}
              key={`${user.name}-${index}`}
              onClick={() => setSelectedUser(user)}
            />
          ))}
        </div>
        <div className="w-full max-w-[768px] fixed left-1/2 transform -translate-x-1/2 bottom-5 px-5">
          <Button size="full" variant="green" onSubmit={downloadHandler}>
            명함 전체 다운로드
          </Button>
        </div>
        {/* 모달창 */}
        <CardDialog
          open={!!selectedUser}
          onClose={() => setSelectedUser(null)}
          user={selectedUser}
        />
      </div>
    </div>
  );
};

export default Page;
