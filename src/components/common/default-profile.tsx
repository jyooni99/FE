'use client';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '~/utils/cn';
import BirdIcon from '../common/quick-network/welcome-icon/bird';
import CatIcon from '../common/quick-network/welcome-icon/cat';
import DogIcon from '../common/quick-network/welcome-icon/dog';
import JellyFishIcon from '../common/quick-network/welcome-icon/jelly-fish';
import KoalaIcon from '../common/quick-network/welcome-icon/koala';
import MonkeyIcon from '../common/quick-network/welcome-icon//monkey';
import OtterIcon from '../common/quick-network/welcome-icon/otter';
import QuokkaIcon from '../common/quick-network/welcome-icon/quokka';
import RabbitIcon from '../common/quick-network/welcome-icon/rabbit';
import SnowmanIcon from '../common/quick-network/welcome-icon/snowman';
import WhaleIcon from '../common/quick-network/welcome-icon/whale';
import { useEffect, useState } from 'react';

const valueIconMap: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  '프론트엔드 개발자': MonkeyIcon,
  '백엔드 개발자': MonkeyIcon,
  '풀스택 개발자': MonkeyIcon,
  '모바일 개발자': MonkeyIcon,
  'AI 엔지니어': SnowmanIcon,
  '데이터 엔지니어': SnowmanIcon,
  '클라우드 엔지니어': WhaleIcon,
  마케팅: KoalaIcon,
  세일즈: CatIcon,
  투자유치: CatIcon,
  '파트너십 기획': CatIcon,
  '콘텐츠 운영': DogIcon,
  'UX/UI 디자이너': JellyFishIcon,
  '브랜드 디자이너': JellyFishIcon,
  '프로덕트 디자이너': JellyFishIcon,
  '프로덕트 매니저 (PM)': OtterIcon,
  '프로덕트 오너 (PO)': OtterIcon,
  '서비스 기획자': OtterIcon,
  '초기 스타트업 창업자': QuokkaIcon,
  투자자: RabbitIcon,
  액셀러레이터: RabbitIcon,
  연구원: BirdIcon,
  교육자: BirdIcon,
  컨설턴트: BirdIcon,
};

const colors = [
  '#30B6FD', // Blue
  '#1EDC93', // Green
  '#FF9257', // Orange
  '#FF84EF', // Pink
  '#856BFF', // Purple
  '#FE7777', // Red
  '#FFFFFF', // White
  '#FFF280', // Yellow
];

const defaultProfileVariants = cva(
  'relative rounded-full overflow-hidden bg-gray-neutral-900',
  {
    variants: {
      size: {
        xs: 'w-6 h-6',
        default: 'w-16 h-16', // 매칭 카드, 온라인 명함 저장 될 카드.....
        notification: 'h-10 w-10',
        profile: 'w-16 h-16',
        profileChat: 'h-[72px] w-[72px]',
        chatImg: 'h-8 w-8',
        groupChat: 'h-[24px] w-[24px]',
        nameCard: 'h-[48px] w-[48px]',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);

interface DefaultProfileProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof defaultProfileVariants> {
  jobValue?: string;
  interestJobValue?: string;
}

const DefaultProfile = ({
  size,
  className,
  jobValue = '',
  interestJobValue = '',
}: DefaultProfileProps) => {
  const Icon =
    valueIconMap[interestJobValue.trim()] ||
    valueIconMap[jobValue.trim()] ||
    BirdIcon;
  const [color, setColor] = useState<string>('');

  useEffect(() => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setColor(randomColor);
  }, []);

  if (!color) return null;
  return (
    <div className={cn(defaultProfileVariants({ size }), className)}>
      <Icon
        className="w-full h-full fill-current"
        style={{ fill: color, color }}
      />
    </div>
  );
};

export default DefaultProfile;
