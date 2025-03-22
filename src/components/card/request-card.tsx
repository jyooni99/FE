import CardNotifyProps from '~/types/card-notify';
import { Card, CardBody, CardFooter, CardHeader } from '../common/card';
import {
  Arrow,
  MainMsg,
  MsgContainer,
  SubMsg,
  TimeAgo,
  TimeLeft,
} from '../notifications/notify-card';
import DefaultProfile from '../common/default-profile';
import Button from '../common/button';
import Link from 'next/link';

const RequestCard = ({
  message,
  subMessage,
  timeStamp,
  onAccept,
  requester,
  className,
  isDisabled,
}: CardNotifyProps) => {
  return (
    <Card
      className={`w-full max-w-3xl  shadow-md rounded-lg mx-auto mb-2 ${className} ${isDisabled ? 'opacity-50 pointer-events-none' : ''}`}
    >
      <CardHeader className="flex justify-between items-center mb-4">
        <TimeLeft text="매칭요청" />
        <Link href={`/user-info/${requester}`}>
          <Arrow />
        </Link>
      </CardHeader>
      <CardBody className={`flex justify-left items-center gap-4 mb-4`}>
        <DefaultProfile size="notification" />
        <MsgContainer>
          <MainMsg message={message} />
          <SubMsg subMessage={subMessage} />
        </MsgContainer>
      </CardBody>
      <CardFooter className="flex justify-between items-center align-top">
        <TimeAgo timestamp={timeStamp || Date.now()} />
        <Button onClick={onAccept} size="sm">
          수락
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RequestCard;
