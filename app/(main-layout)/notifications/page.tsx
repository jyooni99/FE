'use client';

import ConnectOnBanner from '~/components/common/connect-on-banner';
import NotifyCard from '~/components/notifications/notify-card';
import { useNetworkStore } from '~/stores/use-network-store';
import { ChatMessage } from '~/types/card-notify';

const NotificationsPage = () => {
  const { isConnect } = useNetworkStore();
  const notifications: ChatMessage[] = [
    {
      requesterUser: {
        id: 1,
        username: 'sdssdsd',
        password: 'sdsdd',
        chatRoom: null,
        authorities: [{ authority: 'ROLE_USER' }],
        enabled: true,
        accountNonExpired: true,
        credentialsNonExpired: true,
        accountNonLocked: true,
      },
      requesterId: 1,
      receiverId: 2,
      messageType: 'request',
      message: '새로운 채팅 요청이 왔습니다.',
    },
    {
      messageType: 'accept',
      message: '채팅이 승인되었습니다.',
      subMessage: '지금 바로 채팅을 시작해보세요!',
      chatRoomId: 1,
      timeStamp: Date.now(),
    },
  ];

  return (
    <div className="flex flex-col gap-2 max-w-3xl min-h-screen w-full mx-auto items-center overflow-x-hidden">
      <div className="w-full flex flex-col justify-center">
        <ConnectOnBanner isDisabled={!isConnect} />
        <div className="max-w-3xl px-5">
          {notifications.length !== 0 ? (
            notifications.map((notification, index) => {
              return (
                <div key={index} className="mb-3">
                  <NotifyCard
                    messageData={notification}
                    isDisabled={!isConnect}
                  />
                </div>
              );
            })
          ) : (
            <div className="text-center text-body-md py-28 text-gray-neutral-400">
              받은 알림이 없어요. 네트워킹을 시작해보세요.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
