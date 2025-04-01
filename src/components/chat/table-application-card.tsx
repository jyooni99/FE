import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Modal, { ModalProps } from '../common/modal';
import CheckboxItem from './checkbox-item-modal';
import Button from '../common/button';
import { cancelTable } from '~/utils/api/table';

interface TableApplicationCardProps {
  variant: 'apply' | 'waiting' | 'assigned';
  tableNumber?: string;
  waitTime?: number;
  onConfirm?: () => void;
  onCancel?: () => void;
  chatRoomId: number;
  onConsent?: () => void;
  currentUser: string;
  receiverName: string;
}
// 시간 부분... 맞춰보기..
const TableApplicationCard: React.FC<TableApplicationCardProps> = ({
  variant: initialVariant,
  tableNumber,
  waitTime: initialWaitTime,
  onConfirm,
  onCancel,
  chatRoomId,
  onConsent,
  // currentUser,
  // receiverName,
}) => {
  const router = useRouter();
  const [isReserved, setIsReserved] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showSecondCancelModal, setShowSecondCancelModal] = useState(false);
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({
    '대기시간이 너무 길어요.': false,
    '일정이 생겼어요.': false,
    '기술적 문제가 발생했어요.': false,
    '상대방이 응답하지 않아요.': false,
  });
  const [showReasonWhyPartnerQuitsModal, setShowReasonWhyPartnerQuitsModal] =
    useState(false);
  const [waitTime, setWaitTime] = useState(initialWaitTime);
  const [variant, setVariant] = useState(initialVariant);
  const [, setIsQRExpired] = useState(false);
  const [countdown, setCountdown] = useState(600);

  //필요없
  // props로 받은 값으로 내부 상태 동기화
  useEffect(() => {
    setVariant(initialVariant);
  }, [initialVariant]);

  useEffect(() => {
    setWaitTime(initialWaitTime);
  }, [initialWaitTime]);

  useEffect(() => {
    if (variant === 'assigned') {
      const timer = setTimeout(() => {
        setIsQRExpired(true);
        console.log('📌 QR 등록 시간 초과됨. isQRExpired 실행됨');
        if (waitTime && waitTime > 0) {
          setVariant('waiting');
        } else {
          isTableCancelled();
          setVariant('apply');
        }
      }, 600000);

      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variant, waitTime]);

  console.log('qr등록 시간');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (variant === 'assigned' && countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [variant, countdown]);

  const isTableCancelled = async () => {
    await cancelTable(chatRoomId);
  };

  const handleCheckboxChange = (label: string) => {
    setCheckedItems((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const handleFirstCancelConfirm = () => {
    setShowCancelModal(false);
    setShowSecondCancelModal(true);
  };

  const test = () => {
    console.log('모달 열기 test 실행됨 ✅');
    setShowReasonWhyPartnerQuitsModal(true);
  };

  const handleFinalCancel = async () => {
    const selectedReasons = Object.entries(checkedItems)
      .filter(([, isChecked]) => isChecked)
      .map(([label]) => label);

    console.log('선택된 취소 사유:', selectedReasons);

    if (chatRoomId) {
      await cancelTable(chatRoomId);
      console.log('취소 됐는지요');
    } else {
      console.warn('👀 tableNumber가 없음', chatRoomId, '<-chatroomId');
    }

    // 이거 어디에 쓰는?  onCancel
    setShowSecondCancelModal(false);
    if (onCancel) {
      onCancel(); // handleCancel (API: cancelTable)
    }
    router.push('/home');
  };

  const handleReservation = () => {
    if (onConsent) {
      onConsent();
      setIsReserved(true);
    }
  };

  const handleCancelNetworking = () => {
    setShowCancelModal(true);
    if (onCancel) {
      onCancel();
    }
  };

  const handleNoAction = () => {
    setIsModalOpen(false);
    console.log('아무 동작 없는 거');
  };

  //필요
  const handleQRRegistration = () => {
    router.push('/networking-qr-reader');
  };

  // ✅
  const getModalProps = (): ModalProps => {
    if (variant === 'apply') {
      return {
        title: '테이블을 신청하시겠어요?',
        subText: '신청 즉시 배정되므로,\n구성원의 동의 후에 신청해주세요!',
        buttons: [
          {
            label: '아니요',
            variant: 'black-transparent',
            actionType: 'action',
            onClick: handleNoAction, // 아무 동작없어야하는.. ✅
          },
          {
            label: '네',
            variant: 'green',
            actionType: 'action',
            onClick: onConfirm, // ✅
          },
        ],
        triggerButtonLabel: '테이블 신청',
        triggerButtonVariant: 'primary',
        isOpen: isModalOpen,
        onOpenChange: setIsModalOpen,
      };
    }

    return {} as ModalProps;
  };

  //
  const cancelNetworkingModalProps: ModalProps = {
    title: '네트워킹을 취소하시겠어요?',
    subText: '네트워킹을 취소하면 채팅방은 종료돼요.',
    buttons: [
      {
        label: '아니요',
        variant: 'black-transparent',
        actionType: 'action',
        onClick: handleNoAction, // 동작 없음  ✅
      },
      {
        label: '네',
        variant: 'green',
        actionType: 'action',
        onClick: handleFirstCancelConfirm, // onCancel액션 ✅
      },
    ],
    isOpen: showCancelModal,
    onOpenChange: setShowCancelModal,
    triggerButtonLabel: '',
  };

  const secondCancelModalProps: ModalProps = {
    title: '네트워킹을 취소하시겠어요?',
    subText: '네트워킹을 취소하면 채팅방은 종료돼요.',
    buttons: [
      {
        label: '제출하고 나가기',
        variant: 'green',
        actionType: 'action',
        // onClick: handleFinalCancel, // 찐 나가면서 네트워킹종료.
        onClick: test,
      },
    ],
    isOpen: showSecondCancelModal,
    onOpenChange: setShowSecondCancelModal,
    triggerButtonLabel: '',
    customContent: (
      <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-2 p-4 rounded-[10px] bg-[#1f1f1f]">
        {Object.entries(checkedItems).map(([label, isChecked]) => (
          <CheckboxItem
            key={label}
            label={label}
            isChecked={isChecked}
            onChange={() => handleCheckboxChange(label)}
          />
        ))}
      </div>
    ),
  };

  const showReasonWhyPartnerQuitsProps: ModalProps = {
    title: '네트워킹이 종료되었어요',
    subText: `상대방이 다음과 같은 이유로 /n 네트워킹을 진행하기 어려웠어요.`,
    buttons: [
      {
        label: '종료',
        variant: 'green',
        actionType: 'action',
        onClick: handleFinalCancel,
      },
    ],
    isOpen: showReasonWhyPartnerQuitsModal,
    onOpenChange: setShowReasonWhyPartnerQuitsModal,
    triggerButtonLabel: '',
    customContent: (
      <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-2 p-4 rounded-[10px] bg-[#1f1f1f]">
        {Object.entries(checkedItems).map(([label, isChecked]) => (
          <CheckboxItem
            key={label}
            label={label}
            isChecked={isChecked}
            onChange={() => handleCheckboxChange(label)}
          />
        ))}
      </div>
    ),
  };
  const getTitle = () => {
    if (variant === 'apply') return '테이블을 신청해볼까요?';
    if (variant === 'waiting') return `예상 대기 시간: ${waitTime ?? '-'}분`;
    if (variant === 'assigned') return `${tableNumber ?? '-'}번 테이블`;
  };

  const getDescription = () => {
    if (variant === 'apply')
      return '테이블을 신청하면 네트워킹 존을 이용할 수 있어요.';
    if (variant === 'waiting')
      return '지금은 모든 테이블이 사용 중이에요.\n예약에 동의하시면 테이블을 예약 후 이용할 수 있어요!';
    if (variant === 'assigned')
      return '테이블이 배정되었어요.\n네트워킹 존으로 이동해서 테이블 QR을 등록해주세요!';
  };

  const renderButtons = () => {
    if (variant === 'waiting') {
      return (
        <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 w-[335px] gap-1.5">
          <Button
            variant="black-transparent"
            size="sm"
            onClick={handleCancelNetworking}
            className="flex-grow"
          >
            네트워킹 취소
          </Button>
          {isReserved ? (
            <Button
              variant="black-transparent"
              size="sm"
              disabled
              className="flex-grow bg-[#858585]/30 text-[#858585]"
            >
              예약 완료
            </Button>
          ) : (
            <Button
              variant="green"
              size="sm"
              onClick={handleReservation}
              className="flex-grow"
            >
              예약 동의
            </Button>
          )}
        </div>
      );
    }

    if (variant === 'assigned') {
      return (
        <div className="flex justify-start items-center w-[335px] gap-1.5">
          <Button
            variant="black-transparent"
            size="sm"
            onClick={onCancel}
            className="flex-grow"
          >
            위치 안내
          </Button>
          <Button
            variant="green"
            size="sm"
            onClick={handleQRRegistration}
            className="flex-grow"
          >
            QR 등록{' '}
            {Math.floor(countdown / 60)
              .toString()
              .padStart(2, '0')}{' '}
            : {(countdown % 60).toString().padStart(2, '0')}
          </Button>
        </div>
      );
    }

    return <Modal {...getModalProps()} />;
  };

  return (
    <div className="flex flex-col justify-center items-center flex-grow-0 flex-shrink-0 max-w-[768px] m-auto gap-4 px-5 pt-5 pb-4 bg-[#3a3a3a]/60 backdrop-blur-[5px]">
      <div className="flex flex-col justify-start items-center self-stretch flex-grow-0 flex-shrink-0 gap-2.5">
        <div className="flex justify-center items-center self-stretch flex-grow-0 flex-shrink-0 gap-1.5 px-1">
          <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-2">
            <div className="flex-grow-0 flex-shrink-0 w-6 h-6 relative bg-[#02e473]/25">
              <div className="w-5 h-5 absolute left-px top-px rounded-sm border border-[#02e473]/70 border-dashed"></div>
            </div>
          </div>
          <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 gap-0.5">
            <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative">
              {variant === 'waiting' ? (
                <>
                  <p className="flex-grow-0 flex-shrink-0 text-lg font-semibold text-center text-[#fefefe]">
                    예상 대기 시간:
                  </p>
                  <p className="flex-grow-0 flex-shrink-0 text-lg font-semibold text-center text-white">
                    {waitTime}
                  </p>
                  <p className="flex-grow-0 flex-shrink-0 text-lg font-semibold text-center text-white">
                    분
                  </p>
                </>
              ) : (
                <p className="flex-grow-0 flex-shrink-0 text-lg font-semibold text-center text-[#fefefe]">
                  {getTitle()}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-start self-stretch flex-grow-0 flex-shrink-0 relative gap-1 pl-1.5">
          <p className="self-stretch flex-grow-0 flex-shrink-0 w-[329px] text-sm text-center text-[#a6a6a6] whitespace-pre-line">
            {getDescription()}
          </p>
        </div>
      </div>
      {renderButtons()}
      <Modal {...cancelNetworkingModalProps} />
      <Modal {...secondCancelModalProps} />
      <Modal {...showReasonWhyPartnerQuitsProps} />
    </div>
  );
};

export default TableApplicationCard;
