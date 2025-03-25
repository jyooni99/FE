import MatchCard from '../card/match-card';
import Filter from '~/components/match/filter';
// import { mockUserData } from '../mypage/mock-user-data';
import { UserData } from '~/types/user.types';
import NetworkingModalFlow from './modal-for-match';
// import { useMatchModalStore } from '~/stores/use-match-modal-store';
import { useState } from 'react';
interface OneToOneMatchingProps {
  profiles: UserData[]; // ✅ 최신 타입 반영
}

const OneToOneMatching = ({ profiles }: OneToOneMatchingProps) => {
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  // const { openModal } = useMatchModalStore();
  console.log(selectedUser);
  return (
    <div className="flex flex-col items-center">
      <Filter />
      {profiles.map((profile) => (
        <div key={profile.id} onClick={() => setSelectedUser(profile)}>
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
