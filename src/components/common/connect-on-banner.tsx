import { useNetworkStore } from '~/stores/use-network-store';
import ToggleSwitch from './switch';

const ConnectOnBanner = ({ isDisabled }: { isDisabled: boolean }) => {
  const { isSubscribed, toggleSubscription } = useNetworkStore();

  return (
    <div className="px-5">
      <div
        className={`w-full bg-gray-neutral-700 px-4 py-4 rounded-[12px] mb-4 relative flex items-center justify-between ${isDisabled ? 'opacity-50 pointer-events-none' : ''}`}
      >
        <div>
          <p className="text-lg flex-2">알림 {isSubscribed ? 'ON' : 'OFF'}</p>
          <p className="text-sm">네트워킹 요청을 확인하려면 알림을 켜야해요!</p>
        </div>
        <div className="">
          <ToggleSwitch toggle={isSubscribed} setToggle={toggleSubscription} />
        </div>
      </div>
      <div className="w-full h-[0.5] bg-gray-700 mb-3"></div>
    </div>
  );
};

export default ConnectOnBanner;
