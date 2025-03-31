'use client';
import { useState } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

import ToggleSwitch from '~/components/common/switch';
import Modal, { ModalProps } from '~/components/common/modal';
import { useNetworkStore } from '~/stores/use-network-store';
import { getTopNavType } from '~/utils/get-top-nav-type';
import { ButtonVariantProps } from '~/components/common/button';

import Exit from '~/assets/svgs/exit-icon.svg';
import BackArrow from '~/assets/svgs/back-arrow.svg';
import QRIcon from '~/assets/svgs/qr-code.svg';

import { exitChatRoom as exitChatRoomApi } from '~/utils/api/chats';
import { useWebSocketStore } from '~/stores/use-websocket-store';

const TopNavigation = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { isConnect, setIsConnect } = useNetworkStore();
  const { type, title } = getTopNavType(pathname);
  const [showModal, setShowModal] = useState(false);
  const searchParams = useSearchParams();
  const roomIdParam = searchParams.get('roomId');
  const roomId = roomIdParam ? parseInt(roomIdParam, 10) : null;
  const { closeWebSocket } = useWebSocketStore();

  const handleExitChatRoom = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirmExit = async () => {
    if (!roomId) return;

    try {
      const success = await exitChatRoomApi(roomId);
      if (success) {
        router.push('/home');
        closeWebSocket();
      } else {
        console.error('❌ 채팅방 나가기 실패');
      }
    } catch (err) {
      console.error('❌ 에러 발생:', err);
    } finally {
      setShowModal(false);
    }
  };

  const exitChatRoomModalProps: Omit<ModalProps, 'isOpen' | 'onOpenChange'> = {
    title: '채팅방에서 나가시겠어요?',
    subText: '채팅방에서 나가면 네트워킹이 취소돼요.',
    buttons: [
      {
        label: '아니요',
        variant: 'black-transparent',
        actionType: 'action' as const,
        onClick: handleCloseModal,
      },
      {
        label: '네',
        variant: 'green',
        actionType: 'action' as const,
        onClick: handleConfirmExit,
      },
    ],
    triggerButtonLabel: '',
    triggerButtonVariant: 'primary' as ButtonVariantProps['variant'],
  };

  return (
    <div className="fixed top-0 z-10 w-full">
      <div className="flex justify-between items-center w-full max-w-[768px] h-[55px] px-5 py-3.5 bg-gray-neutral-900">
        {type === 'quick-network' && (
          <>
            <div className="flex items-center gap-2">
              <p className="text-lg font-semibold text-white">퀵네트워크</p>
              <ToggleSwitch toggle={isConnect} setToggle={setIsConnect} />
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => router.push('/qr-reader')}>
                <QRIcon width={32} height={32} />
              </button>
            </div>
          </>
        )}

        {type === 'default' && (
          <>
            <div className="flex gap-2">
              <p className="text-lg font-semibold text-white">{title}</p>
            </div>
          </>
        )}

        {type === 'chat-room' && (
          <>
            <button
              className="flex items-center gap-2"
              onClick={handleExitChatRoom}
            >
              <p className="text-lg font-semibold text-white">채팅방</p>
              <Exit width={24} height={24} />
            </button>
            <QRIcon width={32} height={32} />
          </>
        )}

        {type === 'back-arrow' && (
          <div className="flex justify-between items-center w-full">
            <div className="flex gap-2">
              <button onClick={() => router.back()}>
                <BackArrow width={24} height={24} />
              </button>
              {title && (
                <p className="text-lg font-semibold text-white">{title}</p>
              )}
            </div>
          </div>
        )}
      </div>

      {showModal && (
        <Modal
          {...exitChatRoomModalProps}
          isOpen={showModal}
          onOpenChange={setShowModal}
        />
      )}
    </div>
  );
};

export default TopNavigation;
