import { Card } from '../common/card';
import { MsgContainer, MainMsg, SubMsg, TimeAgo } from './notify-card';

interface NormalCardProps {
  message: string;
  subMessage?: string;
  timeStamp?: number;
  className?: string;
}

const NormalCard = ({ message, subMessage, timeStamp }: NormalCardProps) => {
  return (
    <Card className="py-7">
      <MsgContainer>
        <MainMsg message={message} />
        {subMessage && <SubMsg subMessage={subMessage} />}
        <TimeAgo timestamp={timeStamp} />
      </MsgContainer>
    </Card>
  );
};

export default NormalCard;
