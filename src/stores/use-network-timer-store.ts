// stores/use-network-timer-store.ts
import { create } from 'zustand';

interface NetworkTimerStore {
  isFinished: boolean;
  setIsFinished: (value: boolean) => void;
}

export const useNetworkTimerStore = create<NetworkTimerStore>((set) => ({
  isFinished: false,
  setIsFinished: (value) => set({ isFinished: value }),
}));
