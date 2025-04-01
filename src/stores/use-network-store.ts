import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { getFcmToken } from '~/utils/firebase/get-fcm-token';
import { requestPermission } from '~/utils/firebase/request-permission';
import api from '~/utils/api/api';

interface UseNetworkStoreType {
  isConnect: boolean; //네트워킹 상태 변경
  isSubscribed: boolean; //알림 수신 여부 변경
  participatedGroupId: number | null;
  setIsConnect: () => void;
  toggleSubscription: (checked: boolean) => void;
  setParticipatedGroupId: (id: number | null) => void;
}

export const useNetworkStore = create<UseNetworkStoreType>()(
  persist(
    (set, get) => ({
      isConnect: false,
      isSubscribed: false,
      participatedGroupId: null,
      setIsConnect: async () => {
        const prevConnect = get().isConnect;
        const nextConnect = !prevConnect;
        set({ isConnect: nextConnect }); // UI 즉시 반영

        try {
          const response = await api.put('/api/users/updateParticipate');
          if (response.status !== 200) {
            set({ isConnect: prevConnect });
            return;
          }

          if (nextConnect) {
            // 네트워크 ON → 알림 설정 확인
            if (Notification.permission === 'granted') {
              const token = await getFcmToken();
              const fcmRes = await api.post('/api/FCM/register-token', {
                token,
              });

              console.log(fcmRes);

              if (fcmRes.status === 200) {
                await api.put('/api/users/updateNotifications', {
                  enabled: true,
                });
                set({ isSubscribed: true });
              }
            } else {
              const granted = await requestPermission();
              if (granted) {
                const token = await getFcmToken();
                const fcmRes = await api.post('/api/FCM/register-token', {
                  token,
                });

                if (fcmRes.status === 200) {
                  await api.put('/api/users/updateNotifications', {
                    enabled: true,
                  });
                  set({ isSubscribed: true });
                }
              } else {
                await api.put('/api/users/updateNotifications', {
                  enabled: false,
                });
                set({ isSubscribed: false });
              }
            }
          } else {
            // 네트워크 OFF → 알림 OFF
            await api.put('/api/users/updateNotifications', { enabled: false });
            set({ isSubscribed: false });
          }
        } catch (error) {
          console.error('네트워크 상태 변경 오류:', error);
          set({ isConnect: prevConnect }); // 롤백
        }
      },

      toggleSubscription: async (checked) => {
        set({ isSubscribed: checked });

        try {
          const notifyRes = await api.put('/api/users/updateNotifications', {
            enabled: checked,
          });
          if (notifyRes.status !== 200) {
            console.error('알림 상태 업데이트 실패');
            set({ isSubscribed: !checked }); // 롤백
          }
        } catch (error) {
          console.error('알림 설정 오류:', error);
          set({ isSubscribed: !checked }); // 롤백
        }
      },

      setParticipatedGroupId: (id) => {
        set({ participatedGroupId: id });
      },
    }),

    {
      name: 'network-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
