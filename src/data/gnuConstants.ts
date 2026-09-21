import { GnuCampus, GnuCollege, ProjectCategory, RoleType, WorkStyle } from '../types';

export const GNU_CAMPUSES: { id: GnuCampus; label: string; location: string; description: string }[] = [
  { id: '가좌(본원)', label: '가좌캠퍼스 (본원)', location: '경남 진주시 진주대로 501', description: 'IT·공과·우주항공·자연·경영 등 본원 중심 캠퍼스' },
  { id: '칠암', label: '칠암캠퍼스', location: '경남 진주시 동진로 33', description: '융합기술공과대학, 의과·간호대학 특성화' },
  { id: '통영', label: '통영캠퍼스', location: '경남 통영시 통영해안로 2', description: '해양과학대학, 스마트 해양/수산 바이오 특성화' },
  { id: '창원산학', label: '창원산학캠퍼스', location: '경남 창원시 성산구 창원대로', description: '창원 국가산단 연계 우주항공·방산 R&D 캠퍼스' },
];

export const GNU_COLLEGES_MAP: Record<GnuCollege, string[]> = {
  우주항공대학: ['우주항공공학부', '항공우주소프트웨어전공', '미래모빌리티학과'],
  IT공과대학: ['컴퓨터공학부', '인공지능소프트웨어학과', '전자공학과', '반도체공학과', '정보통신공학과'],
  공과대학: ['기계융합공학부', '신소재공학과', '화학공학과', '산업시스템공학과', '도시건설공학과'],
  융합기술공과대학: ['메카트로닉스공학과', '자동차융합공학부', '스마트소프트웨어전공', '에너지환경공학과'],
  자연과학대학: ['데이터사이언스학과', '정보통계학과', '수학과', '물리학과', '생명과학부'],
  농업생명과학대학: ['스마트농업공학과', '식물의학과', '바이오시스템소재공학과', '애그리비즈니스학과'],
  경영대학: ['경영학부', '스마트유통정보학과', '경제학과', '회계학과'],
  해양과학대학: ['해양로봇시스템학과', '스마트양식공학과', '해양환경공학과'],
  인문사회대학: ['국어국문학과', '미디어커뮤니케이션학과', '행정학과', '정치외교학과'],
  사범대학: ['컴퓨터교육과', '수학교육과', '물리교육과', '영어교육과'],
};

export const PROJECT_CATEGORY_LABELS: Record<ProjectCategory, { name: string; tagColor: string; description: string }> = {
  CAPSTONE: { 
    name: '캡스톤디자인 (정규교과)', 
    tagColor: 'bg-blue-100 text-blue-800 border-blue-200', 
    description: '경상국립대 16주 정규 캡스톤디자인 1·2 학점 연계 프로젝트' 
  },
  SW_CONTEST: { 
    name: 'SW중심대학 경진대회', 
    tagColor: 'bg-indigo-100 text-indigo-800 border-indigo-200', 
    description: 'GNU SW중심대학사업단 주최 해커톤 및 오픈소스 AI 챌린지' 
  },
  GLOCAL30: { 
    name: '글로컬30 우주항공·방산', 
    tagColor: 'bg-sky-100 text-sky-800 border-sky-200', 
    description: '글로컬대학30 선정 기념 우주항공청(KASA) 및 KAI/한화 연계 프로젝트' 
  },
  LINC_INDUSTRY: { 
    name: 'LINC 3.0 산학연계', 
    tagColor: 'bg-emerald-100 text-emerald-800 border-emerald-200', 
    description: '경남 지역 기업 문제 해결형 산학협력 프로젝트' 
  },
  ACADEMIC_CLUB: { 
    name: '전공동아리 & 연구실 스터디', 
    tagColor: 'bg-amber-100 text-amber-800 border-amber-200', 
    description: '컴퓨터·로봇·AI 학술 동아리 및 대학원 랩실 스터디 프로젝트' 
  },
};

export const ROLE_LABELS: Record<RoleType, { label: string; color: string; bg: string }> = {
  'PM/기획': { label: 'PM/기획', color: 'text-purple-700', bg: 'bg-purple-100' },
  'Frontend': { label: '프론트엔드', color: 'text-blue-700', bg: 'bg-blue-100' },
  'Backend': { label: '백엔드', color: 'text-emerald-700', bg: 'bg-emerald-100' },
  'AI/Data': { label: 'AI/데이터', color: 'text-rose-700', bg: 'bg-rose-100' },
  'Hardware/Embedded': { label: 'HW/임베디드', color: 'text-amber-700', bg: 'bg-amber-100' },
  'UI/UX Design': { label: 'UI/UX 디자인', color: 'text-pink-700', bg: 'bg-pink-100' },
};

export const WORK_STYLE_OPTIONS: WorkStyle[] = [
  '가좌캠퍼스 대면 (중앙도서관/과방)',
  '칠암캠퍼스 대면',
  '온/오프라인 병행',
  '완전 비대면 (Discord/Notion)',
];

export const DEFAULT_GNU_TECH_STACKS = [
  'React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vue.js',
  'Node.js', 'Spring Boot', 'FastAPI', 'Django', 'PostgreSQL', 'MySQL',
  'PyTorch', 'TensorFlow', 'LangChain', 'OpenCV', 'ROS2',
  'Arduino', 'Raspberry Pi', 'STM32', 'CAN통신', 'Figma', 'Docker', 'AWS'
];
