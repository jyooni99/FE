'use client';

import Modal, { ModalContent } from '~/components/common/modal';
import { Card, CardBody } from '../common/card';
import ProfileImportant from '../common/profile-important';
import { UserData } from '~/types/user.types';
import BadgesAligned from '../common/badges-aligned';
import Bookmark from '~/assets/svgs/bookmark.svg';
import { sendChatRequestAPI } from '~/utils/api';
import {
  MatchModalType,
  useMatchModalStore,
} from '~/stores/use-match-modal-store';
import { useNetworkStore } from '~/stores/use-network-store';

type ExtendedModalContent = ModalContent & { customContent?: React.ReactNode };

const NetworkingModalFlow = () => {
  const { currentModal, modalData, closeModal, markUserAsRequested } =
    useMatchModalStore();
  const { isSubscribed, toggleSubscription } = useNetworkStore();

  const userData = modalData as UserData | null;

  if (!currentModal || !userData?.id) return null;

  const modalContent = getModalContent(
    currentModal,
    closeModal,
    userData,
    markUserAsRequested,
    isSubscribed,
    toggleSubscription,
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {modalContent && (
        <Modal
          key={currentModal}
          className="bg-gray-neutral-800 pt-4 pb-4"
          isOpen={!!currentModal}
          onOpenChange={(nextOpen) => {
            if (!nextOpen) {
              closeModal();
            }
          }}
          {...modalContent}
        />
      )}
    </div>
  );
};

export default NetworkingModalFlow;

const getModalContent = (
  modalType: Exclude<MatchModalType, null>,
  closeModal: () => void,
  userData: UserData,
  markUserAsRequested: (userId: number) => void,
  isSubscribed: boolean,
  toggleSubscription: (checked: boolean) => void,
): ExtendedModalContent | null => {
  switch (modalType) {
    case 'profile':
      return {
        buttons: [
          {
            label: '네트워킹 신청',
            variant: 'primary',
            actionType: 'trigger',
            useStoreTrigger: true,
            onClick: () => {
              useMatchModalStore.getState().openModal('request-sent', userData);
            },
          },
        ],
        customContent: (
          <Card>
            <CardBody className="flex flex-col gap-3">
              <div>
                <ProfileImportant userData={userData} layout="horizontal">
                  <p className="text-sm text-[#b0b0b0]">
                    {userData.affiliation}
                  </p>
                </ProfileImportant>
              </div>
              <div className="mt-2">
                <BadgesAligned
                  items={userData.interests || []}
                  isInterested
                  userInfoColor
                />
              </div>
              <div className="flex !items-center !text-orange-500 font-bold gap-[8px] w-full p-2 !bg-transparent">
                <Bookmark width={20} height={20} />
                <BadgesAligned
                  items={userData.participationPurpose || []}
                  userInfoColor={true}
                  noneChip={true}
                  textSize="!text-body-lg"
                />
              </div>
            </CardBody>
          </Card>
        ),
      };

    case 'request-sent':
      return {
        title: `${userData.nickName ?? '[닉네임]'} 님에게 네트워킹을 신청할까요?`,
        subText: '상대방이 3분 안에 확인하지 않으면\n요청이 자동 취소돼요.',
        buttons: [
          {
            label: '아니오',
            variant: 'black-transparent',
            actionType: 'trigger',
            useStoreTrigger: true,
            onClick: closeModal,
          },
          {
            label: '신청하기',
            variant: 'primary',
            actionType: 'trigger',
            useStoreTrigger: true,
            onClick: async () => {
              await sendChatRequestAPI(userData.id!);
              markUserAsRequested(userData.id!);
              useMatchModalStore
                .getState()
                .openModal('request-confirm', userData);
            },
          },
        ],
      };
    case 'request-confirm':
      const subscribed = useNetworkStore.getState().isSubscribed;
      return subscribed
        ? {
            title: '네트워킹이 신청되었어요!',
            subText: '요청 수락 시 알림으로 알려드릴게요!',
            buttons: [
              {
                label: '확인',
                variant: 'primary',
                actionType: 'trigger',
                useStoreTrigger: true,
                onClick: closeModal,
              },
            ],
          }
        : {
            title: '네트워킹이 신청되었어요!',
            subText: '요청이 수락되면 알림으로 알려드릴게요',
            buttons: [
              {
                label: '괜찮아요',
                variant: 'black-transparent',
                actionType: 'trigger',
                useStoreTrigger: true,
                onClick: closeModal,
              },
              {
                label: '알림받기',
                variant: 'primary',
                actionType: 'trigger',
                useStoreTrigger: true,
                onClick: async () => {
                  await toggleSubscription(true);
                  closeModal();
                },
              },
            ],
          };

    case 'request-cancel':
      return {
        title: `${userData.id}와 네트워킹을 취소할까요?`,
        subText: '-',
        buttons: [
          {
            label: '아니오',
            variant: 'black-transparent',
            actionType: 'trigger',
            useStoreTrigger: true,
            onClick: closeModal,
          },
          {
            label: '취소하기',
            variant: 'black-transparent',
            actionType: 'trigger',
            useStoreTrigger: true,
            onClick: async () => {
              console.log('[API 호출] 네트워킹 취소!!');
              useMatchModalStore
                .getState()
                .removeUserFromRequested(userData.id!);
              closeModal();
            },
          },
        ],
      };

    default:
      return null;
  }
};
