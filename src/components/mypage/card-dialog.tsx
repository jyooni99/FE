import { Dialog } from 'radix-ui';
import DetailCard from '~/components/mypage/detail-card';
import { QRCodeType } from '~/types/form';

interface CardDialogProps {
  open: boolean;
  onClose: () => void;
  user: QRCodeType | null;
  isShowQR?: boolean;
}

const CardDialog = ({ open, onClose, user, isShowQR }: CardDialogProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/80 data-[state=open]:animate-overlayShow">
          <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 focus:outline-none data-[state=open]:animate-contentShow">
            <DetailCard user={user} isShowQR={isShowQR} />
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default CardDialog;
