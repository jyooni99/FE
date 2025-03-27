import MatchCard from '../card/match-card';
import Filter from '~/components/match/filter';
import Button from '../common/button';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { UserData } from '~/types/user.types';

const GroupMatching = () => {
  const [storedGroups, setStoredGroups] = useState<UserData[]>([]);
  const router = useRouter();

  useEffect(() => {
    const loadGroups = () => {
      const storedGroups: UserData[] = JSON.parse(
        localStorage.getItem('groupMatchings') || '[]',
      );

      const convertedGroups: UserData[] = storedGroups.map((group) => ({
        id: group.id || Date.now(),
        job: group.job ?? [],
        career: group.career ?? [], // number[] 유지
        interests: group.interests ?? [],
        participationPurpose: group.participationPurpose ?? [],
      }));

      setStoredGroups(convertedGroups);
    };

    loadGroups();
    window.addEventListener('focus', loadGroups);

    return () => {
      window.removeEventListener('focus', loadGroups);
    };
  }, []);

  return (
    <div className="flex flex-col items-center">
      {/* 필터 컴포넌트 */}
      <Filter />
      {/* 전체 그룹 데이터를 렌더링 */}
      {storedGroups.map((group, index) => (
        <MatchCard
          key={index}
          userData={{
            job: group.job || [],
            career: group.career || [],
            interests: group.interests || [],
            participationPurpose: group.participationPurpose || [],
          }}
          isGroup={true}
        />
      ))}
      {/* 그룹 생성 버튼 */}
      <Button
        size={'full'}
        onClick={(e) => {
          e.stopPropagation();
          router.push('/create-group');
        }}
      >
        그룹 만들기
      </Button>
    </div>
  );
};

export default GroupMatching;
