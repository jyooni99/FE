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

// 색상표
//   '#30B6FD' Blue
//   '#1EDC93' Green
//   '#FF9257' Orange
//   '#FF84EF' Pink
//   '#856BFF' Purple
//   '#FE7777' Red
//   '#FFFFFF' White
//   '#FFF280' Yellow

export const jobMetaMap: Record<
  string,
  { icon: React.FC<React.SVGProps<SVGSVGElement>>; color: string }
> = {
  '프론트엔드 개발자': { icon: MonkeyIcon, color: '#856BFF' },
  '백엔드 개발자': { icon: MonkeyIcon, color: '#FF84EF' },
  '풀스택 개발자': { icon: MonkeyIcon, color: '#FFF280' },
  '모바일 개발자': { icon: MonkeyIcon, color: '#856BFF' },

  'AI 엔지니어': { icon: SnowmanIcon, color: '#FFFFFF' },
  '데이터 엔지니어': { icon: SnowmanIcon, color: '#FF9257' },

  '클라우드 엔지니어': { icon: WhaleIcon, color: '#30B6FD' },

  마케팅: { icon: KoalaIcon, color: '#FE7777' },

  세일즈: { icon: CatIcon, color: '#30B6FD' },
  투자유치: { icon: CatIcon, color: '#FF9257' },
  '파트너십 기획': { icon: CatIcon, color: '#1EDC93' },

  '콘텐츠 운영': { icon: DogIcon, color: '#FFF280' },

  'UX/UI 디자이너': { icon: JellyFishIcon, color: '#FFFFFF' },
  '브랜드 디자이너': { icon: JellyFishIcon, color: '#30B6FD' },
  '프로덕트 디자이너': { icon: JellyFishIcon, color: '#FE7777' },

  '프로덕트 매니저 (PM)': { icon: OtterIcon, color: '#856BFF' },
  '프로덕트 오너 (PO)': { icon: OtterIcon, color: '#FF9257' },
  '서비스 기획자': { icon: OtterIcon, color: '#1EDC93' },

  '초기 스타트업 창업자': { icon: QuokkaIcon, color: '#FF84EF' },

  투자자: { icon: RabbitIcon, color: '#30B6FD' },
  액셀러레이터: { icon: RabbitIcon, color: '#FF84EF' },

  연구원: { icon: BirdIcon, color: '#FFF280' },
  교육자: { icon: BirdIcon, color: '#1EDC93' },
  컨설턴트: { icon: BirdIcon, color: '#856BFF' },
};

export const getIconByJob = (
  jobValue: string | undefined,
): React.FC<React.SVGProps<SVGSVGElement>> =>
  jobValue && jobMetaMap[jobValue] ? jobMetaMap[jobValue].icon : WhaleIcon;

export const getColorByJob = (jobValue: string | undefined): string =>
  jobValue && jobMetaMap[jobValue] ? jobMetaMap[jobValue].color : '#ffffff';
