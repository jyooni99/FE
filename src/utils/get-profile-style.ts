import BirdIcon from '~/components/common/quick-network/welcome-icon/bird';
import CatIcon from '~/components/common/quick-network/welcome-icon/cat';
import DogIcon from '~/components/common/quick-network/welcome-icon/dog';
import JellyFishIcon from '~/components/common/quick-network/welcome-icon/jelly-fish';
import KoalaIcon from '~/components/common/quick-network/welcome-icon/koala';
import MonkeyIcon from '~/components/common/quick-network/welcome-icon/monkey';
import OtterIcon from '~/components/common/quick-network/welcome-icon/otter';
import QuokkaIcon from '~/components/common/quick-network/welcome-icon/quokka';
import RabbitIcon from '~/components/common/quick-network/welcome-icon/rabbit';
import SnowmanIcon from '~/components/common/quick-network/welcome-icon/snowman';
import WhaleIcon from '~/components/common/quick-network/welcome-icon/whale';

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

export const getHashColor = (key: string): string => {
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = key.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index];
};

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

export const getIconByJob = (
  jobValue: string | undefined,
): React.FC<React.SVGProps<SVGSVGElement>> => {
  const cleaned = jobValue?.trim() ?? '';
  return valueIconMap[cleaned] ?? WhaleIcon;
};
