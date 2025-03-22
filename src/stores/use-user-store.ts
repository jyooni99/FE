// stores/use-user-store.ts
import { create } from 'zustand';
import { UserData } from '~/types/user.types';

interface UserStore {
  users: UserData[];
  setUsers: (users: UserData[]) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  users: [],
  setUsers: (users) => set({ users }),
}));
