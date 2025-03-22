import React from 'react';
import Button from '../common/button';
import { UserData } from '~/types/user.types';
import CardBasic from '../common/card-basic';
import DefaultProfile from '../common/default-profile';
import Image from 'next/image';

interface MatchCardProps {
  userData: UserData;
  requestedNetwork: boolean;
  bgOnChipInterest?: boolean;
  bgOnChipPurpose?: boolean;
  isGroup?: boolean;
  isTopAligned?: boolean;
}

const MatchOneToOne = ({
  userData,
  requestedNetwork = false,
}: MatchCardProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-[10px] p-[10px]">
          <DefaultProfile size="nameCard" />
          <CardBasic userId={userData.nickName ?? '익명'} />
        </div>
        {requestedNetwork && (
          <Button variant="red" size="sm" className="h-8">
            <span className="font-body3-normal-b-14 !text-body-sm text-semantic-color-text-subtle tracking-[var(--body3-normal-b-14-letter-spacing)] leading-[var(--body3-normal-b-14-line-height)]">
              네트워킹 신청
            </span>
          </Button>
        )}
      </div>
      <div className="px-4 py-[10px] rounded-md self-stretch bg-gray-neutral-900 flex flex-row items-center justify-start py-spacing-10 pl-spacing-16 pr-spacing-10 gap-3 text-sm text-orange-500">
        <div className="flex !items-center !text-orange-500 gap-[6px]">
          <Image
            src="/assets/svgs/bookmark.svg"
            alt="bookmark"
            width={12}
            height={14}
          />
          <p>{userData.participationPurpose}</p>
        </div>
      </div>
    </div>
  );
};

export default MatchOneToOne;

/* <ProfileImportant
        userData={userData}
        layout="horizontal"
        isTopAligned={true}
      >
        <BadgesAligned
          items={userData.interests}
          className="!bg-transparent !text-body-sm mt-[0.5px]"
          vertical={false}
        />
      </ProfileImportant> */
