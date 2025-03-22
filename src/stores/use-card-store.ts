import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { QRCodeType } from '~/types/form';

type CardStore = {
  cards: QRCodeType[];
  addCard: (card: QRCodeType) => void;
  resetCard: () => void;
};

export const useCardStore = create<CardStore>()(
  persist(
    (set) => ({
      cards: [],
      addCard: (card) =>
        set((state) => {
          if (state.cards.some((savedCard) => savedCard.id === card.id)) {
            alert('이미 저장된 명함입니다.');
            return state;
          }
          alert('명함이 저장되었습니다.');
          return {
            cards: [...state.cards, card],
          };
        }),
      resetCard: () => set({ cards: [] }),
    }),
    {
      name: 'card-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
