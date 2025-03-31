import { create } from 'zustand';

interface ChatExitFlowStore {
  isExitModalOpen: boolean;
  isReasonModalOpen: boolean;
  openExitModal: () => void;
  closeExitModal: () => void;
  openReasonModal: () => void;
  closeReasonModal: () => void;
}

export const useChatExitFlowStore = create<ChatExitFlowStore>((set) => ({
  isExitModalOpen: false,
  isReasonModalOpen: false,
  openExitModal: () => set({ isExitModalOpen: true }),
  closeExitModal: () => set({ isExitModalOpen: false }),
  openReasonModal: () => set({ isReasonModalOpen: true }),
  closeReasonModal: () => set({ isReasonModalOpen: false }),
}));
