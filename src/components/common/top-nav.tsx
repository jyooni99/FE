'use client';

import Image from 'next/image';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import ToggleSwitch from '~/components/common/switch';
import Modal, { ModalProps } from '~/components/common/modal';
import { useNetworkStore } from '~/stores/use-network-store';
import { getTopNavType } from '~/utils/get-top-nav-type';
import { ButtonVariantProps } from '~/components/common/button';

const TopNavigation = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { isConnect, setIsConnect } = useNetworkStore();
  const { type, title } = getTopNavType(pathname);
  const [showModal, setShowModal] = useState(false);

  const handleExitChatRoom = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirmExit = () => {
    setShowModal(false);
    router.push('/home');
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
    <div>
      <div className="flex justify-between items-center w-full max-w-[768px] h-[55px] px-5 py-3.5 bg-gray-neutral-900">
        {type === 'quick-network' && (
          <>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 border border-dashed border-[#02e473]" />
              <p className="text-lg font-semibold text-white">퀵네트워크</p>
              <ToggleSwitch toggle={isConnect} setToggle={setIsConnect} />
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => router.push('/qr-reader')}>
                <Image
                  src="/assets/svgs/qr-code.svg"
                  alt="qr code"
                  width={32}
                  height={32}
                />
              </button>
              <div className="w-6 h-6 border border-dashed border-[#02e473]" />
            </div>
          </>
        )}

        {type === 'default' && (
          <>
            <div className="flex gap-2">
              <p className="text-lg font-semibold text-white">{title}</p>
            </div>
            <div className="flex gap-4">
              <div className="w-6 h-6 border border-dashed border-[#02e473]" />
              <div className="w-6 h-6 border border-dashed border-[#02e473]" />
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
              <Image
                src="/assets/svgs/exit-icon.svg"
                alt="Exit Icon"
                width={24}
                height={24}
              />
            </button>
            <Image
              src="/assets/svgs/scanner.svg"
              alt="Scanner Icon"
              width={24}
              height={24}
            />
          </>
        )}

        {type === 'back-arrow' && (
          <>
            <div className="flex gap-2">
              <button onClick={() => router.back()}>
                <Image
                  src="/assets/svgs/back-arrow.svg"
                  alt="뒤로가기"
                  width={24}
                  height={24}
                />
              </button>
              <p className="text-lg font-semibold text-white">{title}</p>
            </div>
          </>
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
