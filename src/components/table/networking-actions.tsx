import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '~/components/common/button';
import Modal from '~/components/common/modal';

const NetworkingActions: React.FC = () => {
  const router = useRouter();
  const [isFirstModalOpen, setIsFirstModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);

  const handleNetworkingStop = () => {
    setIsFirstModalOpen(true);
  };

  const handleCloseFirstModal = () => {
    setIsFirstModalOpen(false);
  };

  const handleConfirmStop = () => {
    setIsFirstModalOpen(false);
    setIsSecondModalOpen(true);
  };

  const handleReturnToList = () => {
    setIsSecondModalOpen(false);
    router.push('/home');
  };

  const firstModalProps = {
    isOpen: isFirstModalOpen,
    onOpenChange: setIsFirstModalOpen,
    title: '네트워킹을 중단하시겠어요?',
    subText: '네트워킹을 중단하면 현재 진행 중인 대화가 종료됩니다.',
    buttons: [
      {
        label: '아니요',
        actionType: 'action' as const,
        variant: 'black-transparent' as const,
        onClick: handleCloseFirstModal,
      },
      {
        label: '네, 중단할게요',
        actionType: 'action' as const,
        variant: 'green' as const,
        onClick: handleConfirmStop,
      },
    ],
  };

  const secondModalProps = {
    isOpen: isSecondModalOpen,
    onOpenChange: setIsSecondModalOpen,
    title: '네트워킹이 종료되었어요',
    subText:
      "교환한 온라인 명함은 마이페이지\n'저장한 명함 목록'에서 볼 수 있어요.",
    buttons: [
      {
        label: '리스트로 돌아가기',
        actionType: 'action' as const,
        variant: 'green' as const,
        onClick: handleReturnToList,
      },
    ],
  };

  return (
    <div className="flex flex-col justify-center items-start flex-grow-0 flex-shrink-0 w-[335px] gap-2">
      <Button
        variant="green"
        size="full"
        className="px-7 py-3.5 rounded-[10px]"
      >
        온라인 명함 교환
      </Button>
      <Button
        onClick={handleNetworkingStop}
        variant="black-transparent"
        size="full"
        className="px-7 py-3.5 rounded-[10px]"
      >
        네트워킹 중단
      </Button>
      <Modal {...firstModalProps} />
      <Modal {...secondModalProps} />
    </div>
  );
};

export default NetworkingActions;
