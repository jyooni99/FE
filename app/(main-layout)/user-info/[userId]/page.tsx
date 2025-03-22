'use client';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
// import React, { useEffect, useState } from 'react';
import React from 'react';
import BadgesAligned from '~/components/common/badges-aligned';
import Button from '~/components/common/button';
import ProfileImportant from '~/components/common/profile-important';
import { TimeLeft } from '~/components/notifications/notify-card';
import { rejectChatRequest } from '~/utils/reject-chat-request';
import { useUserStore } from '~/stores/use-user-store';

const UserInfoPage = () => {
  const params = useParams();
  const userId = params?.userId as string;
  const router = useRouter();
  const { users } = useUserStore();

  const user = users.find((u) => String(u.id) === userId);

  console.log(user);
  const handleAccept = () => {
    console.log('✅ 네트워킹 요청 수락');
    // setIsModalOpen(false);
    router.push('/chatroom'); // 네트워킹 진행 페이지로 이동
  };

  const handleReject = async () => {
    console.log('❌ 네트워킹 요청 거절');

    try {
      await rejectChatRequest(Number(user?.id)); // 요청자 ID를 1로 가정 (실제 데이터에 맞게 변경 필요)
      console.log('🛑 요청이 정상적으로 처리되었습니다.');
      console.log(user?.id);
      // 알람도 줘야하는 것이지요
    } catch (error) {
      console.error('❌ 요청 처리 중 오류 발생:', error);
    }
  };

  if (!user) {
    return <p className="text-lg text-white">유저 정보를 찾을 수 없습니다.</p>;
  }

  return (
    <div className="flex flex-col mx-5 justify-center items-center relative">
      <div className="bg-gray-neutral-800 w-full p-4 pt-7 rounded-[12px] flex flex-col gap-4 justify-center items-center ">
        <ProfileImportant
          userData={user}
          layout="vertical"
          existsJob={false}
          className="gap-5"
        />
        <TimeLeft text="매칭 요청" />
        <div className="w-full flex flex-col gap-2 px-5">
          <BadgesAligned
            className="flex-1 p-[14px] w-full justify-center bg-gray-neutral-900"
            items={[user.participationPurpose]}
            vertical={true}
            title="참여목적"
            noneChip={true}
            userInfoColor={true}
          />
          <BadgesAligned
            className="flex-1 p-[14px] justify-center w-full bg-gray-neutral-900"
            items={user.interests}
            vertical={true}
            title="관심사"
            noneChip={false}
            userInfoColor={true}
          />
        </div>
      </div>

      <div className="w-[311px] mx-5 fixed bottom-24 rounded-[12px] bg-gray-neutral-800  flex flex-col items-start justify-start p-5 box-border gap-[6px] text-center text-base text-text-normal font-body3-normal-b-14">
        <div className="self-stretch flex flex-row items-center justify-center py-spacing-2 px-0">
          <div className="flex-1 flex flex-row items-center justify-center">
            <div className="relative tracking-[-0.02em] leading-[140%] text-body-lg font-semibold">
              요청을 수락해 네트워킹 진행하시겠어요?
            </div>
          </div>
        </div>
        <div className="self-stretch flex flex-col items-center justify-start text-[13px] text-gray-neutral-400">
          <div className="self-stretch relative tracking-[-0.02em] leading-[150%]">
            거절하면 네트워킹을 진행하지 않아요
          </div>
        </div>
        <div className="self-stretch flex flex-col items-start justify-start pt-spacing-8 px-0 pb-0 text-left text-sm text-text-subtle">
          <div className="self-stretch flex flex-row items-center justify-start gap-[6px]">
            <div className="flex-1 rounded-radius-8 bg-opacity-fill flex flex-row items-center justify-center py-spacing-10 px-spacing-16">
              <Button variant="black/50" onClick={handleReject}>
                거절
              </Button>
            </div>
            <div className="flex-1 rounded-radius-8 bg-fill-primary flex flex-row items-center justify-center py-spacing-10 px-spacing-16 text-text-normal">
              <Button onClick={handleAccept}>수락</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfoPage;
