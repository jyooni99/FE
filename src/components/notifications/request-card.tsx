'use client';

import Link from 'next/link';
import {
  MsgContainer,
  MainMsg,
  SubMsg,
  TimeAgo,
  TimeLeft,
} from './notify-card';

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from '~/components/common/card';
import DefaultProfile from '~/components/common/default-profile';
import Arrow from '~/assets/svgs/arrow.svg';

interface RequestCardProps {
  message: string;
  subMessage?: string;
  timeStamp?: number;
  requester?: number;
  className?: string;
  isDisabled?: boolean;
  onClick?: () => void;
}

const RequestCard = ({
  message,
  subMessage,
  timeStamp,
  className,
  requester,
  onClick,
  isDisabled = false,
}: RequestCardProps) => {
  return (
    <Card
      className={`w-full shadow-md rounded-lg ${className} ${
        isDisabled ? 'opacity-50 pointer-events-none' : ''
      }`}
      onClick={onClick}
    >
      <CardHeader className="flex justify-between items-center mb-4">
        <TimeLeft text="매칭요청" />
        {requester && (
          <Link href={`/user-info/${requester}`}>
            <Arrow width={24} height={24} />
          </Link>
        )}
      </CardHeader>

      <CardBody className="flex justify-left items-center gap-4 mb-4">
        <DefaultProfile size="notification" />
        <MsgContainer>
          <MainMsg message={message} />
          {subMessage && <SubMsg subMessage={subMessage} />}
        </MsgContainer>
      </CardBody>

      <CardFooter className="flex justify-between items-center align-top">
        <TimeAgo timestamp={timeStamp || Date.now()} />
      </CardFooter>
    </Card>
  );
};

export default RequestCard;
