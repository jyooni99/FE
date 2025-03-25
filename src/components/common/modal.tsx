'use client';
import { Dialog } from 'radix-ui';
import { useState } from 'react';
import Button, { ButtonVariantProps } from './button';

interface ModalButtonProps extends ButtonVariantProps {
  label: string;
  actionType: 'trigger' | 'action';
  onClick?: () => void;
  nextModalContent?: ModalContent;
  useStoreTrigger?: boolean;
}

export interface ModalContent {
  title?: string;
  subText?: string;
  buttons: ModalButtonProps[];
}

export interface ModalProps extends ModalContent {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  triggerButtonLabel?: string;
  triggerButtonVariant?: ButtonVariantProps['variant'];
  customContent?: React.ReactNode;
}

const Modal = ({
  title,
  subText,
  buttons,
  isOpen,
  onOpenChange,
  triggerButtonLabel,
  triggerButtonVariant,
  customContent,
}: ModalProps) => {
  // const initialModal = { title, subText, buttons };
  const [currentModal, setCurrentModal] = useState<ModalContent>({
    title,
    subText,
    buttons,
  });
  const shouldUsePropContent = buttons.some((btn) => btn.useStoreTrigger);

  const handleModalContent = (newModal: ModalContent) => {
    setCurrentModal({
      ...newModal,
      buttons: [...newModal.buttons],
    });
  };

  const modalToRender = shouldUsePropContent
    ? { title, subText, buttons }
    : currentModal;

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      {triggerButtonLabel && (
        <Dialog.Trigger asChild>
          <Button variant={triggerButtonVariant}>{triggerButtonLabel}</Button>
        </Dialog.Trigger>
      )}
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60 w-full h-full data-[state=open]:animate-overlayShow" />
        <Dialog.Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-[#373734] p-3.5 shadow-[var(--shadow-6)] focus:outline-none data-[state=open]:animate-contentShow">
          <Dialog.Title className="text-white text-[15px] font-semibold text-center whitespace-pre-line">
            {modalToRender.title}
          </Dialog.Title>
          <Dialog.Description className="text-[#b0b0b0] text-[13px] text-center whitespace-pre-line">
            {modalToRender.subText}
          </Dialog.Description>
          {customContent && <div className="mt-4">{customContent}</div>}
          <div className="relative w-full text-center mt-4 flex gap-1.5">
            {modalToRender.buttons.map((btn, index) => {
              if (btn.actionType === 'trigger') {
                return (
                  <Button
                    key={index}
                    variant={btn.variant}
                    onClick={async () => {
                      if (btn.useStoreTrigger) {
                        await btn.onClick?.(); // 이 안에서 store.openModal('request-sent', ...) 호출됨
                        return;
                      }

                      // 기존 방식 (useState로 nextModalContent 넘기던)
                      handleModalContent(btn.nextModalContent!);
                    }}
                  >
                    {btn.label}
                  </Button>
                );
              }

              return (
                <Dialog.Close asChild key={index}>
                  <Button onClick={btn.onClick} variant={btn.variant}>
                    {btn.label}
                  </Button>
                </Dialog.Close>
              );
            })}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
