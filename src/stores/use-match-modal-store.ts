// stores/use-modal-store.ts
import { create } from 'zustand';

type ModalType =
  | null
  | 'profile'
  | 'request-sent'
  | 'request-confirm'
  | 'request-cancel';

interface ModalStore {
  currentModal: ModalType;
  openModal: (modal: ModalType) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  currentModal: null,
  openModal: (modal) => set({ currentModal: modal }),
  closeModal: () => set({ currentModal: null }),
}));

export type MatchModalType =
  | 'profile'
  | 'request-sent'
  | 'request-confirm'
  | 'request-cancel'
  | null;

export interface MatchModalData {
  isNotificationOn?: boolean;
  id?: number;
}

interface MatchModalState {
  currentModal: MatchModalType;
  modalData: MatchModalData | null;
  openModal: (modal: MatchModalType, data?: MatchModalData) => void;
  closeModal: () => void;
  requestedUserIds: number[];
  markUserAsRequested: (userId: number) => void;
  removeUserFromRequested: (userId: number) => void;
}

export const useMatchModalStore = create<MatchModalState>((set) => ({
  currentModal: null,
  modalData: null,
  openModal: (modal, data) => set({ currentModal: modal, modalData: data }),
  closeModal: () => set({ currentModal: null, modalData: null }),
  requestedUserIds: [],
  markUserAsRequested: (userId) =>
    set((state) => ({
      requestedUserIds: [...state.requestedUserIds, userId],
    })),
  removeUserFromRequested: (userId: number) =>
    set((state) => ({
      requestedUserIds: state.requestedUserIds.filter((id) => id !== userId),
    })),
}));
