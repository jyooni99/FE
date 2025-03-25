import React from 'react';
import { UserData } from '~/types/user.types';
import { Card, CardBody, CardHeader } from '../common/card';
import StatusForGroup from '../match/status-for-group';
import MatchOneToOne from './match-one-to-one';
import MatchGroup from './match-group';
import DefaultProfile from '../common/default-profile';
import { useGroupMatchStore } from '~/stores/use-group-match-store';
import Image from 'next/image';
interface MatchCardProps {
  userData: UserData;
  inMyPage?: boolean;
  bgOnChipInterest?: boolean;
  bgOnChipPurpose?: boolean;
  isGroup?: boolean;
  alignedOne?: boolean;
  groupId?: number;
  groupData?: {
    job: string[];
    career: string[];
    interest: string[];
    purpose: string[];
  };
}

const MatchCard = ({
  userData,
  // inMyPage = false,
  isGroup = false,
  groupId,
}: MatchCardProps) => {
  const { groups, addMemberToGroup } = useGroupMatchStore();

  const handleJoinGroup = () => {
    console.log('추가..');
    if (typeof groupId === 'undefined') return null; // ✅ groupId가 undefined일 경우 함수 실행 안 함

    addMemberToGroup(groupId, {
      // ✅ number → string 변환
      id: Number(userData.id),
    });
  };

  const group = groups.find((g) => g.id === groupId);
  const members = group ? group.members.slice(0, 3) : [];
  const positionClass = [
    'right-4 z-10',
    'right-8 z-20',
    'right-12 z-30',
    'right-16 z-40',
  ];
  return (
    <Card className="w-[335px] border-none rounded-2xl pt-5">
      {isGroup && (
        <CardHeader
          className="flex justify-between items-center mb-2 -mt-2"
          onClick={handleJoinGroup}
        >
          <StatusForGroup variants="available" />
          <div className="flex relative flex-row-reverse">
            <DefaultProfile size="xs" className="relative" />
            {members.map((user, index) => (
              <DefaultProfile
                key={user.id}
                size="xs"
                className={`absolute ${positionClass[index] || 'right-16 z-40'}`}
              />
            ))}
            <div className="h-[24px] w-[24px] bg-gray-neutral-800 text-gray-neutral-700 rounded-full flex items-center justify-center text-center m-auto outline outline-[1px] outline-gray-neutral-800">
              <Image
                src="/assets/svgs/plus.svg"
                alt="plus icon"
                width={24}
                height={24}
              />
            </div>
          </div>
        </CardHeader>
      )}
      <CardBody className="flex flex-col pt-[var(--size-spacing-20)] px-[var(--size-spacing-12)] pb-[var(--size-spacing-12)]">
        {isGroup ? (
          // <MatchGroup groupData={groupData!} /> // ⬅ `inMyPage`를 직접 전달
          <MatchGroup
            groupData={{
              job: ['프론트엔드 개발자'],
              career: ['3년차'],
              interest: ['React', 'Next.js'],
              purpose: ['협업 프로젝트'],
            }}
          />
        ) : (
          <MatchOneToOne userData={userData} requestedNetwork={false} /> // ⬅ `inMyPage`를 직접 전달
        )}
      </CardBody>
    </Card>
  );
};

export default MatchCard;
