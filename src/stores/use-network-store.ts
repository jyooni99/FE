import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { deleteFcmToken } from '~/utils/firebase/delete-fcm-token';
import { getFcmToken } from '~/utils/firebase/get-fcm-token';
import { requestPermission } from '~/utils/firebase/request-permission';
import api from '~/utils/api/api';

interface UseNetworkStoreType {
  isConnect: boolean; //네트워킹 상태 변경
  isSubscribed: boolean; //알림 수신 여부 변경
  setIsConnect: () => void;
  toggleSubscription: (checked: boolean) => void;
}

export const useNetworkStore = create<UseNetworkStoreType>()(
  persist(
    (set) => ({
      isConnect: false,
      isSubscribed: false,
      setIsConnect: async () => {
        set((state) => ({ isConnect: !state.isConnect })); // UI 즉시 반영
        try {
          const response = await api.put('/api/users/updateParticipate');
          if (response.status !== 200) {
            set((state) => ({ isConnect: !state.isConnect })); // 실패 시 롤백
          }
        } catch (error) {
          console.error('네트워킹 상태 변경 오류:', error);
          set((state) => ({ isConnect: !state.isConnect })); // 오류 발생 시 롤백
        }
      },

      toggleSubscription: async (checked) => {
        set({ isSubscribed: checked }); // UI 즉시 반영
        try {
          if (checked) {
            const granted = await requestPermission();

            if (granted) {
              await getFcmToken();
              const response = await api.put('/api/users/updateNotifications');
              if (response.status !== 200) {
                set({ isSubscribed: false }); // 실패 시 롤백
              }
            } else {
              set({ isSubscribed: false }); // 권한 거부 시 롤백
            }
          } else {
            await deleteFcmToken();
            const response = await api.put('/api/users/updateNotifications');
            if (response.status !== 200) {
              set({ isSubscribed: true }); // 실패 시 롤백
            }
          }
        } catch (error) {
          console.error('알림 설정 오류:', error);
          set({ isSubscribed: !checked }); // 오류 발생 시 롤백
        }
      },
    }),
    {
      name: 'network-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
