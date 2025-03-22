import ConnectOnBanner from '~/components/common/connect-on-banner';
import NotifyCard from '~/components/notifications/notify-card';

interface GroupNotificationsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  messages: Record<string, any>;
  handleQuickConnectToggle: (isOn: boolean) => void;
  isDisabled: boolean;
}

const GroupNotifications = ({
  messages,
  isDisabled,
}: GroupNotificationsProps) => {
  const filteredMessages = Object.entries(messages).filter(
    ([, messageData]) => messageData.chatType === 'group',
  );
  return (
    <div className="w-full max-w-3xl rounded-lg mx-auto">
      <ConnectOnBanner isDisabled={isDisabled} />
      {filteredMessages.length > 0 ? (
        filteredMessages.map(([id, messageData]) => (
          <NotifyCard
            key={id}
            messageData={messageData}
            isDisabled={isDisabled}
          />
        ))
      ) : (
        <div className="text-center text-body-md py-28 text-gray-neutral-400">
          받은 알림이 없어요. 네트워킹을 시작해보세요.
        </div>
      )}
    </div>
  );
};

export default GroupNotifications;
