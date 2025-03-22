import { create } from 'zustand';

interface GroupMember {
  id: number;
  name?: string;
  profileImage?: string;
}

interface Group {
  id: number; // 그룹 ID (채팅방 ID 역할)
  members: GroupMember[];
}

interface GroupMatchState {
  groups: Group[];
  addMemberToGroup: (groupId: number, member: GroupMember) => void;
}

export const useGroupMatchStore = create<GroupMatchState>((set) => ({
  groups: [],

  // ✅ 특정 그룹에 멤버 추가
  addMemberToGroup: (groupId, member) =>
    set((state) => ({
      groups: state.groups.map((group) =>
        group.id === groupId && group.members.length < 4
          ? { ...group, members: [...group.members, member] }
          : group,
      ),
    })),
}));
