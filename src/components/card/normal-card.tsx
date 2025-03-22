import { Card, CardBody, CardFooter, CardHeader } from '../common/card';
import {
  MainMsg,
  MsgContainer,
  PushAlarm,
  SubMsg,
  TimeAgo,
} from '../notifications/notify-card';
import CardNotifyProps from '~/types/card-notify';

const NormalCard = ({
  message,
  subMessage,
  timeStamp,
  className,
  isDisabled,
}: CardNotifyProps) => {
  return (
    <Card
      className={`w-full max-w-3xl shadow-md mb-2 rounded-lg mx-auto ${className} ${isDisabled ? 'opacity-50 pointer-events-none' : ''}`}
    >
      <CardHeader className="flex justify-between items-center mb-4">
        <PushAlarm />
      </CardHeader>
      <CardBody className={`flex justify-left items-center gap-4 mb-4`}>
        <MsgContainer>
          <MainMsg message={message} />
          <SubMsg subMessage={subMessage} />
        </MsgContainer>
      </CardBody>
      <CardFooter className="flex justify-between items-center align-top">
        <TimeAgo timestamp={timeStamp || Date.now()} />
      </CardFooter>
    </Card>
  );
};

export default NormalCard;
