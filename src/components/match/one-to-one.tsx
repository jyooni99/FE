import MatchCard from '../card/match-card';
import Filter from '~/components/match/filter';
// import { mockUserData } from '../mypage/mock-user-data';
import { UserData } from '~/types/user.types';
interface OneToOneMatchingProps {
  profiles: UserData[]; // ✅ 최신 타입 반영
}

const OneToOneMatching = ({ profiles }: OneToOneMatchingProps) => {
  return (
    <div className="flex flex-col items-center">
      <Filter />
      {profiles.map((profile) => (
        <MatchCard
          userData={profile}
          key={profile.id}
          inMyPage={false}
          alignedOne={true}
        />
      ))}
    </div>
  );
};

export default OneToOneMatching;
