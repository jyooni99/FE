import React from 'react';
import Button from '../common/button';
import { UserData } from '~/types/user.types';
import CardBasic from '../common/card-basic';
import DefaultProfile from '../common/default-profile';
import { useMatchModalStore } from '~/stores/use-match-modal-store';
import Bookmark from '~/assets/svgs/bookmark.svg';

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
  const { openModal } = useMatchModalStore();

  const handleClick = () => {
    openModal('profile', userData);
  };

  //네트워킹 취소하는 부분 ..!!
  const handleRequestCancel = () => {
    console.log('request-cancel 핸들 온 클릭');
    openModal('request-cancel', userData);
  };

  return (
    <div
      className="flex flex-col gap-4"
      onClick={requestedNetwork ? undefined : handleClick}
    >
      <div className="flex justify-between items-center">
        <div className="flex gap-[10px] p-[10px]">
          <DefaultProfile
            size="nameCard"
            jobValue={userData.jobValue || 'FFFFFF'}
          />
          <CardBasic
            userId={userData.nickName ?? '익명'}
            requestedNetwork={requestedNetwork}
          />
        </div>
        {requestedNetwork && (
          <Button
            variant="red"
            size="sm"
            className="h-8"
            onClick={(e) => {
              handleRequestCancel();
              e.stopPropagation();
              // setSelectedUser(userData);
              console.log('찌곃ㅅ나 ');
            }}
          >
            <span className="font-body3-normal-b-14 !text-body-sm text-semantic-color-text-subtle tracking-[var(--body3-normal-b-14-letter-spacing)] leading-[var(--body3-normal-b-14-line-height)]">
              네트워킹 취소
            </span>
          </Button>
          // 이 부분 네트워킹 취소 관련된 API가 필요할 거 같음 !!
        )}
      </div>
      <div className="px-4 py-[10px] rounded-md self-stretch bg-gray-neutral-900 flex flex-row items-center justify-start py-spacing-10 pl-spacing-16 pr-spacing-10 gap-3 text-sm text-orange-500">
        <div className="flex !items-center !text-orange-500 gap-[6px]">
          <Bookmark width={12} height={14} />
          <p>{userData.participationPurpose}</p>
        </div>
      </div>
    </div>
  );
};

export default MatchOneToOne;
