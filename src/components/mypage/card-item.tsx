import { Card, CardBody } from '~/components/common/card';
import DefaultProfile from '~/components/common/default-profile';
import CardBasic from '~/components/common/card-basic';
import { QRCodeType } from '~/types/form';

interface CardItemProps {
  user: QRCodeType & {
    jobValue?: string;
    interestJobValue?: string;
  };
  onClick: () => void;
}

const CardItem = ({ user, onClick }: CardItemProps) => {
  return (
    <Card key={user.id} onClick={onClick}>
      <CardBody className="flex gap-[10px] p-[10px]">
        <DefaultProfile
          size="nameCard"
          jobValue={user.job.value} // ✅ user.job.value 사용
          interestJobValue={user.job.category} // ✅ 필요 시 job.category 활용
        />
        <div className="flex flex-col items-start justify-center gap-[6px]">
          <CardBasic userId={user.name} />
          <div className="flex items-center gap-2 text-body-sm text-[#b0b0b0]">
            <p>{user.job.value}</p>
            <div className="w-px h-3 bg-[#b0b0b0]" />
            <p>{user.affiliation}</p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default CardItem;
