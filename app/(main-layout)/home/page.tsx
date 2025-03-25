'use client';

import { useEffect } from 'react';
import api from '~/utils/api/api';

import RadixTabs from '~/components/common/radix-tabs';
import GroupMatching from '~/components/match/group';
import OneToOneMatching from '~/components/match/one-to-one';
import { useNetworkStore } from '~/stores/use-network-store';
import { mockUserData } from '~/components/mypage/mock-user-data';
import { useUserStore } from '~/stores/use-user-store';
import { UserData } from '~/types/user.types';

const Page = () => {
  const { isConnect } = useNetworkStore();
  const { users, setUsers, loggedInUser } = useUserStore();
  console.log(users);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get<UserData[]>('/api/users/all');
        const filteredUsers = loggedInUser
          ? res.data.filter((user) => user.id !== loggedInUser.id)
          : (res.data as UserData[]);

        setUsers(filteredUsers);
      } catch (error) {
        console.error('유저 목록 불러오기 실패:', error);
      }
    };

    fetchUsers();
  }, [setUsers, loggedInUser]);

  const tabLabels = ['1:1 매칭', '그룹 매칭'];
  const tabContents = [
    <OneToOneMatching key="one-to-one" profiles={users} />,
    <GroupMatching key="group" profiles={mockUserData} />,
  ];

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center">
      <div className="w-full max-w-3xl min-h-screen flex flex-col items-center pb-[92px]">
        <RadixTabs
          tabLabels={tabLabels}
          tabContents={tabContents}
          disabled={!isConnect}
        />
      </div>

      {!isConnect && (
        <div className="absolute inset-0 top-0 w-full max-w-3xl h-full bg-black bg-opacity-75 backdrop-filter backdrop-blur-sm flex items-center justify-center pb-[92px]">
          <p className="text-white text-lg font-semibold text-center">
            스위치를 on하면
            <br />
            네트워킹에 참여할 수 있어요
          </p>
        </div>
      )}
    </div>
  );
};

export default Page;
