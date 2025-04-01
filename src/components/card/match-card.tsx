import React from 'react';
import { UserData } from '~/types/user.types';
import { Card, CardBody, CardHeader } from '../common/card';
import StatusForGroup from '../match/status-for-group';
import MatchOneToOne from './match-one-to-one';
import MatchGroup from './match-group';
import DefaultProfile from '../common/default-profile';
import { useGroupMatchStore } from '~/stores/use-group-match-store';
import { useMatchModalStore } from '~/stores/use-match-modal-store';
import Plus from '~/assets/svgs/plus.svg';

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
  onClick?: () => void;
}

const MatchCard = ({
  userData,
  // inMyPage = false,
  isGroup,
  groupId,
}: MatchCardProps) => {
  const { groups, addMemberToGroup } = useGroupMatchStore();
  const { requestedUserIds } = useMatchModalStore();

  const handleJoinGroup = () => {
    console.log('추가..');
    if (typeof groupId === 'undefined') return null; // ✅ groupId가 undefined일 경우 함수 실행 안 함

    addMemberToGroup(groupId, {
      // ✅ number → string 변환
      id: Number(userData.id),
      jobValue: userData.jobValue,
      interestJobValue: userData.interestJobValue,
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
    <div className="w-full">
      <Card className="w-full border-none rounded-2xl pt-5 mb-3">
        {isGroup && (
          <CardHeader
            className="flex justify-between items-center mb-2 -mt-2"
            onClick={handleJoinGroup}
          >
            <StatusForGroup variants="available" />
            <div className="flex relative flex-row-reverse">
              <DefaultProfile
                size="xs"
                className="relative"
                jobValue={userData.job?.[0] || ''}
                interestJobValue={userData.interests?.[0] || ''}
              />
              {members.map((user, index) => (
                <DefaultProfile
                  jobValue={user.jobValue || ''}
                  interestJobValue={user.interestJobValue || ''}
                  key={user.id}
                  size="xs"
                  className={`absolute ${positionClass[index] || 'right-16 z-40'}`}
                />
              ))}
              <div className="h-[24px] w-[24px] bg-gray-neutral-800 text-gray-neutral-700 rounded-full flex items-center justify-center text-center m-auto outline outline-[1px] outline-gray-neutral-800">
                <Plus width={24} height={24} />
              </div>
            </div>
          </CardHeader>
        )}
        <CardBody className="flex flex-col pt-[var(--size-spacing-20)] px-[var(--size-spacing-12)]">
          {isGroup ? (
            <MatchGroup
              groupData={{
                job: userData.job || [],
                career: Array.isArray(userData.career)
                  ? userData.career
                  : typeof userData.career === 'string'
                    ? userData.career.match(/\d+/g)?.map(Number) || [
                        0,
                        Infinity,
                      ] // 문자열에서 숫자 추출 후 변환
                    : [0, Infinity], // 기본값 설정
                interest: userData.interests || [],
                purpose: Array.isArray(userData.participationPurpose)
                  ? userData.participationPurpose
                  : userData.participationPurpose
                    ? [userData.participationPurpose]
                    : [],
              }}
            />
          ) : (
            <MatchOneToOne
              userData={userData}
              requestedNetwork={
                typeof userData.id === 'number' &&
                requestedUserIds.includes(userData.id)
              }
            /> // ⬅ `inMyPage`를 직접 전달
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default MatchCard;
