'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import BadgesAligned from '~/components/common/badges-aligned';
import Button from '~/components/common/button';
import ProfileImportant from '~/components/common/profile-important';
import { TimeLeft } from '~/components/notifications/notify-card';
import { getUserById } from '~/utils/api/user';
import { UserData } from '~/types/user.types';

const UserInfoPage = () => {
  const params = useParams();
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUserById(Number(params.userId));
      setUser(userData);
    };

    fetchUser();
  }, [params.userId]);

  if (!user) {
    return (
      <div className="flex flex-col justify-center items-center w-full">
        <div className="bg-gray-neutral-800 p-4 w-full rounded-[12px] flex flex-col gap-4 items-center"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="w-full px-5">
        <div className="bg-gray-neutral-800 w-full py-7 px-4 rounded-[12px] flex flex-col gap-4 items-center mt-5">
          <ProfileImportant
            userData={user}
            layout="vertical"
            existsJob={false}
            className="gap-5 text-center items-center"
          />
          <TimeLeft text="매칭 요청" />
          <div className="w-full flex flex-col gap-2">
            <BadgesAligned
              className="w-full p-[14px] justify-center bg-gray-neutral-900"
              items={user.participationPurpose}
              vertical
              title="참여목적"
              noneChip
              userInfoColor
              textColor="text-white"
            />
            <BadgesAligned
              className="w-full p-[14px] justify-center bg-gray-neutral-900"
              items={user.interests}
              vertical
              title="관심사"
              userInfoColor
            />
          </div>
        </div>

        <div className="fixed bottom-24 left-0 right-0 px-5">
          <div className="w-full mx-auto max-w-3xl rounded-[12px] bg-gray-neutral-800 p-5 flex flex-col gap-[6px]">
            <div className="text-body-lg font-semibold leading-[140%]">
              요청을 수락해 네트워킹 진행하시겠어요?
            </div>
            <div className="text-[13px] text-gray-neutral-400 leading-[150%]">
              거절하면 네트워킹을 진행하지 않아요
            </div>
            <div className="flex w-full gap-[6px] pt-spacing-8">
              <Button variant="black/50" className="flex-1">
                거절
              </Button>
              <Button className="flex-1">수락</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfoPage;
