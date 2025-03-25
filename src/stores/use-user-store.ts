// stores/use-user-store.ts
import { create } from 'zustand';
import { UserData } from '~/types/user.types';

interface UserStore {
  users: UserData[];
  selectedUser: UserData | null;
  loggedInUser: UserData | null;
  setUsers: (users: UserData[]) => void;
  setSelectedUser: (user: UserData) => void;
  // setLoggedInUser: (user: UserData) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  users: [],
  selectedUser: null,
  loggedInUser: null,
  setUsers: (users) => set({ users }),
  setSelectedUser: (user) => set({ selectedUser: user }),
  // setLoggedInUser: (user) => set({ loggedInUser: user }), // ✅ 추가
}));
