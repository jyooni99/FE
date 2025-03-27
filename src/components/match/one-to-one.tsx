import MatchCard from '../card/match-card';
import Filter from '~/components/match/filter';
// import { mockUserData } from '../mypage/mock-user-data';
import { UserData } from '~/types/user.types';
import NetworkingModalFlow from './modal-for-match';
// import { useMatchModalStore } from '~/stores/use-match-modal-store';
import { useState } from 'react';
import { useMatchModalStore } from '~/stores/use-match-modal-store';
interface OneToOneMatchingProps {
  profiles: UserData[]; // ✅ 최신 타입 반영
}

const OneToOneMatching = ({ profiles }: OneToOneMatchingProps) => {
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  // const { openModal } = useMatchModalStore();
  const { requestedUserIds } = useMatchModalStore();
  console.log(selectedUser);
  const sortedProfiles = [...profiles].sort((a, b) => {
    const aRequested =
      typeof a.id === 'number' && requestedUserIds.includes(a.id);
    const bRequested =
      typeof b.id === 'number' && requestedUserIds.includes(b.id);

    if (aRequested && !bRequested) return -1; // a 먼저
    if (!aRequested && bRequested) return 1; // b 먼저
    return 0; // 그대로
  });
  return (
    <div className="flex flex-col items-center w-full">
      <Filter />
      {sortedProfiles.map((profile) => (
        <div
          className="w-full"
          key={profile.id}
          onClick={() => setSelectedUser(profile)}
        >
          <MatchCard
            userData={profile}
            key={profile.id}
            inMyPage={false}
            alignedOne={true}
          />
        </div>
      ))}
      <NetworkingModalFlow />
    </div>
  );
};

export default OneToOneMatching;
