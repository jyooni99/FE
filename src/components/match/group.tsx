import Button from '../common/button';
import DefaultProfile from '~/components/common/default-profile'; // DefaultProfile 컴포넌트 추가
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import api from '~/utils/api/api';
import { FormProvider, useForm } from 'react-hook-form';
import FilterWrapper from './filter-wrapper';
import { FormValues } from './one-to-one';

import { useNetworkStore } from '~/stores/use-network-store';
import { useUserStore } from '~/stores/use-user-store';
interface GroupChatRoomResponseDto {
  id: number;
  job: string[];
  members: {
    username: string;
    id: number;
    nickname: string;
    job: string;
  }[];
  career: string;
  interests: string;
  participationPurpose: string;
}

const GroupMatching = () => {
  const [groups, setGroups] = useState<GroupChatRoomResponseDto[]>([]); // 그룹 데이터를 위한 상태
  const router = useRouter();
  const methods = useForm<FormValues>({
    defaultValues: {
      interests: [],
      participationPurpose: [],
      career: [0, 4],
    },
  });
  const { participatedGroupId, setParticipatedGroupId } = useNetworkStore();
  const { loggedInUser } = useUserStore();

  useEffect(() => {
    // 그룹 API 데이터를 가져오는 함수
    const fetchGroups = async () => {
      try {
        const response = await api.get('api/chats/group-chatroom'); // API URL
        const groupsData: GroupChatRoomResponseDto[] = response.data;
        console.log(response);
        // 그룹 데이터를 상태에 저장

        setGroups(groupsData);
        // const myGroup = groupsData.find((group) =>
        //   Array.isArray(group.members) && group.members.some((member) => member.username === loggedInUser?.username),);

        // if (myGroup) {
        //   setParticipatedGroupId(myGroup.id);
        // }
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };

    fetchGroups(); // 컴포넌트 마운트 시 데이터 가져오기
  }, [loggedInUser, setParticipatedGroupId]);
  console.log(loggedInUser?.username);
  const handleJoinGroup = async (chatRoomId: number) => {
    try {
      const response = await api.post('/api/chats/group-chatroom/join', {
        chatRoomId, // 요청 데이터 (축약형 구문 사용)
      });

      console.log('참여 성공:', response.data);
      alert('그룹에 참여하였습니다!');

      setParticipatedGroupId(chatRoomId);
      // ✅ API 응답 구조에 맞게 id 필드 사용
      const roomId = response.data.id;
      if (roomId) {
        router.push(`/chat?roomId=${roomId}`);
      } else {
        console.error('채팅방 ID가 없습니다.');
      }
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
        };
        console.error('그룹 참여 실패:', axiosError.response?.data?.message);
        alert(
          axiosError.response?.data?.message ||
            '그룹 참여 중 오류가 발생했습니다.',
        );
      } else {
        console.error('알 수 없는 오류:', error);
        alert('그룹 참여 중 알 수 없는 오류가 발생했습니다.');
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <FormProvider {...methods}>
        {/* 필터 컴포넌트 */}
        <FilterWrapper />
        {/* 나머지 UI */}
      </FormProvider>

      {/* 그룹 데이터 렌더링 */}
      <div className="w-full max-w-4xl mt-5">
        {groups.length > 0 ? (
          groups.map((group) => (
            <div
              key={group.id}
              className="flex flex-col justify-center items-center self-stretch flex-grow-0 flex-shrink-0 px-2 pt-3 pb-2 rounded-xl bg-[#373734] mb-4 cursor-pointer hover:bg-[#44443f]"
              onClick={() => handleJoinGroup(group.id)}
            >
              <div className="flex justify-between items-start self-stretch flex-grow-0 flex-shrink-0 px-1.5 mb-2">
                <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 h-[25px] relative gap-1.5 px-2.5 py-1.5 rounded-full bg-[#1f1f1f]">
                  <svg
                    width="8"
                    height="9"
                    viewBox="0 0 8 9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="flex-grow-0 flex-shrink-0"
                    preserveAspectRatio="none"
                  >
                    <circle
                      cx="4"
                      cy="4.5"
                      r="4"
                      fill={
                        // participatedGroupId === group.id ? '#FF9257' : '#07ca7f'
                        group.members[0]?.username === loggedInUser?.username ||
                        participatedGroupId === group.id
                          ? '#FF9257'
                          : '#07ca7f'
                      }
                    ></circle>
                  </svg>
                  <p className="text-xs font-semibold text-[#fefefe]">
                    {group.members[0]?.username === loggedInUser?.username ||
                    participatedGroupId === group.id
                      ? '참여중'
                      : '참여 가능'}
                  </p>
                </div>
                <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative space-x-[-6px]">
                  {/* 멤버 아바타 */}
                  {[...Array(group.members)].map((_, i) => (
                    <DefaultProfile
                      key={i}
                      size="groupChat"
                      jobValue={group.job[i % group.job.length]} // 직무별 아이콘 설정
                    />
                  ))}
                </div>
              </div>

              {/* 상세 정보 */}
              <div className="flex justify-start items-start self-stretch gap-2 p-3 rounded-lg bg-[#1f1f1f]">
                <div className="flex flex-col gap-1.5 w-full">
                  {/* 직무 */}
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-semibold text-[#fefefe]">직무</p>
                    <p className="text-sm text-[#fefefe]">
                      {group.job.join(', ')}
                    </p>
                  </div>
                  {/* 경력 */}
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-semibold text-[#858585]">경력</p>
                    <p className="text-sm text-[#858585]">{group.career}</p>
                  </div>
                  {/* 관심분야 */}
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-semibold text-[#fefefe]">
                      관심분야
                    </p>
                    <p className="text-sm text-[#fefefe]">{group.interests}</p>
                  </div>
                  {/* 참여목적 */}
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-semibold text-[#858585]">
                      참여목적
                    </p>
                    <p className="text-sm text-[#858585]">
                      {group.participationPurpose}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>그룹 데이터가 없습니다.</p>
        )}
      </div>

      {/* 그룹 생성 버튼 */}
      <Button
        size={'full'}
        onClick={(e) => {
          e.stopPropagation();
          router.push('/create-group');
        }}
        className="mt-5"
      >
        그룹 만들기
      </Button>
    </div>
  );
};

export default GroupMatching;
