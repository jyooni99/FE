interface Options {
  value: string;
}

export const jobOptions: Options[] = [
  { value: '상관없음' },
  { value: '기획 & 운영' },
  { value: '개발자 & 엔지니어' },
  { value: '스타트업 & 창업자' },
  { value: '비즈니스 & 마케팅' },
  { value: '디자이너' },
  { value: '기타 전문직' },
];

export const interestOptions: Options[] = [
  { value: '상관없음' },
  { value: '소프트웨어 개발' },
  { value: '데이터&AI' },
  { value: '클라우드&인프라' },
  { value: '엔터테인먼트&미디어' },
  { value: '보안&블록체인' },
  { value: '핀테크&금융' },
  { value: '헬스케어&바이오' },
  { value: '스타트업&창업' },
];

export const experienceOptions: Options[] = [
  { value: '상관없음' },
  { value: '학생' },
  { value: '신입(1년 이하)' },
  { value: '주니어(1~3년)' },
  { value: '미드 레벨(4~9년)' },
  { value: '시니어 (10년이상)' },
];

export const purposeOptions: Options[] = [
  { value: '상관없음' },
  { value: '정보 교류(업계/기술 트렌드)' },
  { value: '협업/프로젝트 팀원 찾기' },
  {
    value: '멘토링/조언 받기',
  },
  {
    value: '취업/이직',
  },
  { value: '채용(정식채용/인재발굴)' },
  { value: '투자/비즈니스 파트너 찾기' },
  { value: '네트워킹/인맥 확장(커뮤니티)' },
];

export const jobCategories = [
  {
    category: '개발자 & 엔지니어',
    subcategories: [
      '프론트엔드 개발자',
      '백엔드 개발자',
      '풀스택 개발자',
      '모바일 개발자',
      'AI 엔지니어',
      '데이터 엔지니어',
      '클라우드 엔지니어',
    ],
  },
  {
    category: '디자이너',
    subcategories: ['UX/UI 디자이너', '브랜드 디자이너', '프로덕트 디자이너'],
  },
  {
    category: '기획 & 운영',
    subcategories: [
      '프로덕트 매니저 (PM)',
      '프로덕트 오너 (PO)',
      '서비스 기획자',
      '콘텐츠 운영',
    ],
  },
  {
    category: '비즈니스 & 마케팅',
    subcategories: ['세일즈', '마케팅', '투자유치', '파트너십 기획'],
  },
  {
    category: '스타트업 & 창업자',
    subcategories: ['초기 스타트업 창업자', '투자자', '엑셀러레이터'],
  },
  {
    category: '기타 전문직',
    subcategories: ['연구원', '교육자', '컨설턴트'],
  },
];
