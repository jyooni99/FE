import { create } from 'zustand';

interface GroupMember {
  id: number;
  name?: string;
  profileImage?: string;
  job?: string[];
  jobValue?: string;
  interests?: string[];
  interestJobValue?: string;
}

interface Group {
  id: number;
  members: GroupMember[];
}

interface GroupMatchState {
  groups: Group[];
  addMemberToGroup: (groupId: number, member: GroupMember) => void;
}

export const useGroupMatchStore = create<GroupMatchState>((set) => ({
  groups: [],

  addMemberToGroup: (groupId, member) =>
    set((state) => ({
      groups: state.groups.map((group) =>
        group.id === groupId && group.members.length < 4
          ? {
              ...group,
              members: [
                ...group.members,
                {
                  id: member.id,
                  name: member.name,
                  profileImage: member.profileImage,
                  jobValue: member.job?.[0] || '',
                  interestJobValue: member.interests?.[0] || '',
                },
              ],
            }
          : group,
      ),
    })),
}));
