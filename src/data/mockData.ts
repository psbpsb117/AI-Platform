import { Project, StudentProfile, Applicant, Milestone } from '../types';

export const CURRENT_USER: StudentProfile = {
  id: 'gnu-std-001',
  name: '김개척',
  studentNumber: '2021010892',
  email: 'pioneer.kim@gnu.ac.kr',
  campus: '가좌(본원)',
  college: 'IT공과대학',
  major: '컴퓨터공학부',
  grade: 4,
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  roles: ['Backend', 'PM/기획'],
  skills: ['Node.js', 'FastAPI', 'Spring Boot', 'PostgreSQL', 'Docker', 'AWS'],
  interests: ['도심항공교통(UAM)', 'SW캡스톤', '클라우드 아키텍처', '지역특화 AI'],
  bio: '경상국립대 4학년 캡스톤디자인 팀장 김개척입니다. 백엔드 시스템 설계와 마이크로서비스 아키텍처 구축을 담당하며 실용적인 산출물 완성을 지향합니다.',
  availableHoursWeekly: 20,
  preferredWorkStyle: '가좌캠퍼스 대면 (중앙도서관/과방)',
  githubUrl: 'https://github.com/gnu-pioneer',
  portfolioUrl: 'https://pioneer-kim.dev',
  isLeader: true,
};

export const MOCK_STUDENTS: StudentProfile[] = [
  CURRENT_USER,
  {
    id: 'gnu-std-002',
    name: '박우주',
    studentNumber: '2022020145',
    email: 'space.park@gnu.ac.kr',
    campus: '가좌(본원)',
    college: '우주항공대학',
    major: '항공우주소프트웨어전공',
    grade: 3,
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    roles: ['AI/Data'],
    skills: ['PyTorch', 'Python', 'OpenCV', 'ROS2', 'NumPy', '강화학습'],
    interests: ['KASA 연계 비행제어', '드론 자율비행', '인공지능 비전', '글로컬30 우주항공'],
    bio: '우주항공청(KASA)과 연계된 위성/드론 비행 시뮬레이터 AI 모델링 연구에 관심이 많습니다. 실시간 센서 데이터 분석에 강점이 있습니다.',
    availableHoursWeekly: 18,
    preferredWorkStyle: '가좌캠퍼스 대면 (중앙도서관/과방)',
    githubUrl: 'https://github.com/aero-park',
  },
  {
    id: 'gnu-std-003',
    name: '이지원',
    studentNumber: '2022031120',
    email: 'jiwon.lee@gnu.ac.kr',
    campus: '가좌(본원)',
    college: 'IT공과대학',
    major: '인공지능소프트웨어학과',
    grade: 3,
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    roles: ['Frontend'],
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Figma', 'Three.js'],
    interests: ['3D 인터랙티브 웹', '대시보드 시각화', 'SW중심대학 해커톤'],
    bio: '사용자 친화적인 인터페이스와 웹 3D 렌더링에 열정을 가진 프론트엔드 개발자입니다. 경상국립대 SW 해커톤 우수상 수상 경험이 있습니다.',
    availableHoursWeekly: 16,
    preferredWorkStyle: '온/오프라인 병행',
    githubUrl: 'https://github.com/jiwon-frontend',
  },
  {
    id: 'gnu-std-004',
    name: '정칠암',
    studentNumber: '2020042299',
    email: 'chilam.jung@gnu.ac.kr',
    campus: '칠암',
    college: '융합기술공과대학',
    major: '메카트로닉스공학과',
    grade: 4,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    roles: ['Hardware/Embedded'],
    skills: ['C/C++', 'ROS2', 'STM32', 'CAN통신', 'Raspberry Pi', '센서퓨전'],
    interests: ['자율주행 모빌리티', '로보틱스', '산학연계 캡스톤', '하드웨어 프로토타이핑'],
    bio: '칠암캠퍼스 메카트로닉스 4학년입니다. 임베디드 펌웨어 및 로봇 통신 제어 프로젝트를 다수 수행했습니다. 칠암과 가좌 이동 협업 가능합니다.',
    availableHoursWeekly: 22,
    preferredWorkStyle: '칠암캠퍼스 대면',
    githubUrl: 'https://github.com/mecha-jung',
  },
  {
    id: 'gnu-std-005',
    name: '최아름',
    studentNumber: '2023050012',
    email: 'areum.choi@gnu.ac.kr',
    campus: '가좌(본원)',
    college: '인문사회대학',
    major: '미디어커뮤니케이션학과',
    grade: 3,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    roles: ['UI/UX Design', 'PM/기획'],
    skills: ['Figma', 'Adobe XD', 'Notion', 'User Research', '와이어프레임'],
    interests: ['사용자 중심 디자인', '교내 서비스 리디자인', '서비스 기획', '브랜딩'],
    bio: '미디어커뮤니케이션 전공자로, UX 리서치와 디자인 시스템 구축에 능숙합니다. 개발자와의 소통을 최우선으로 생각합니다.',
    availableHoursWeekly: 14,
    preferredWorkStyle: '온/오프라인 병행',
    portfolioUrl: 'https://behance.net/areum-ux',
  },
  {
    id: 'gnu-std-006',
    name: '한도현',
    studentNumber: '2021061988',
    email: 'dohyun.han@gnu.ac.kr',
    campus: '가좌(본원)',
    college: '자연과학대학',
    major: '데이터사이언스학과',
    grade: 3,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    roles: ['AI/Data', 'Backend'],
    skills: ['Python', 'SQL', 'FastAPI', 'scikit-learn', 'Tableau', 'Airflow'],
    interests: ['빅데이터 파이프라인', '시계열 예측', '이상치 탐지', '데이터 엔지니어링'],
    bio: '데이터사이언스 전공으로 수치 데이터 전처리와 ETL 파이프라인 구축 경험이 풍부합니다. 신뢰성 높은 AI 서빙을 목표로 합니다.',
    availableHoursWeekly: 16,
    preferredWorkStyle: '가좌캠퍼스 대면 (중앙도서관/과방)',
  },
  {
    id: 'gnu-std-007',
    name: '강통영',
    studentNumber: '2021070331',
    email: 'tongyeong.kang@gnu.ac.kr',
    campus: '통영',
    college: '해양과학대학',
    major: '해양로봇시스템학과',
    grade: 4,
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    roles: ['Hardware/Embedded', 'AI/Data'],
    skills: ['Python', 'ROS2', 'YOLOv8', 'Arduino', '수중센서'],
    interests: ['수중 로봇', '스마트 양식 비전 AI', '통영-가좌 연합 캡스톤'],
    bio: '통영캠퍼스 해양로봇 전공입니다. 온라인 정기미팅 및 격주 가좌캠퍼스 방문 협업이 가능합니다.',
    availableHoursWeekly: 18,
    preferredWorkStyle: '완전 비대면 (Discord/Notion)',
  }
];

export const INITIAL_MILESTONES: Milestone[] = [
  {
    id: 'ms-1',
    projectId: 'gnu-proj-001',
    weekNumber: 1,
    title: '팀 빌딩 및 프로젝트 요구사항 정의',
    description: '경상국립대 캡스톤 1주차: 팀원 R&R 확정, KASA 연계 UAM 관제 시나리오 수립, 개발 환경 설정',
    startDate: '2026-09-01',
    dueDate: '2026-09-07',
    status: 'COMPLETED',
    deliverables: [
      { id: 'del-1', title: '팀 구성 및 주제 제안서(초안)', type: 'DOCUMENT', status: 'APPROVED', submittedAt: '2026-09-06' }
    ],
    tasks: [
      { id: 't-1', milestoneId: 'ms-1', title: 'GitHub Organization 및 레포지토리 세팅', assigneeName: '김개척', role: 'Backend', status: 'DONE', priority: 'HIGH', dueDate: '2026-09-03' },
      { id: 't-2', milestoneId: 'ms-1', title: 'UAM 관제 소프트웨어 요구사항 명세서 작성', assigneeName: '최아름', role: 'PM/기획', status: 'DONE', priority: 'MEDIUM', dueDate: '2026-09-05' },
    ],
    advisorComment: '우주항공청 설립 취지에 부합하는 매우 시의적절한 주제입니다. 지도 승인합니다.'
  },
  {
    id: 'ms-2',
    projectId: 'gnu-proj-001',
    weekNumber: 3,
    title: '시스템 아키텍처 & 제안서 지도교수 승인',
    description: '3~4주차: 전체 시스템 블록도 완성, 비행 시뮬레이터 엔진 인터페이스 정의, 캡스톤 승인 심사',
    startDate: '2026-09-15',
    dueDate: '2026-09-28',
    status: 'COMPLETED',
    deliverables: [
      { id: 'del-2', title: '캡스톤 정규 제안서 최종본.pdf', type: 'REPORT', status: 'APPROVED', submittedAt: '2026-09-26' },
      { id: 'del-3', title: '시스템 아키텍처 다이어그램', type: 'DOCUMENT', status: 'APPROVED', submittedAt: '2026-09-27' }
    ],
    tasks: [
      { id: 't-3', milestoneId: 'ms-2', title: 'ROS2 / WebSocket 데이터 브릿지 프로토콜 규격서', assigneeName: '정칠암', role: 'Hardware/Embedded', status: 'DONE', priority: 'HIGH', dueDate: '2026-09-20' },
      { id: 't-4', milestoneId: 'ms-2', title: '비행경로 생성 AI 알고리즘 수학적 모델링', assigneeName: '박우주', role: 'AI/Data', status: 'DONE', priority: 'HIGH', dueDate: '2026-09-24' }
    ],
    advisorComment: '비행 데이터 양이 방대할 수 있으니 메시지 큐(RabbitMQ/Kafka) 도입 검토를 권장함.'
  },
  {
    id: 'ms-3',
    projectId: 'gnu-proj-001',
    weekNumber: 6,
    title: '핵심 모듈 1차 프로토타입 구현 (현재 진행 중)',
    description: '5~7주차: 실시간 3D 뷰어 프론트엔드 연동, 가상 UAM 궤적 생성 백엔드 API 서빙, 중간 발표 준비',
    startDate: '2026-10-06',
    dueDate: '2026-10-20',
    status: 'IN_PROGRESS',
    deliverables: [
      { id: 'del-4', title: '1차 동작 데모 영상 링크', type: 'DEMO_VIDEO', status: 'PENDING' },
      { id: 'del-5', title: 'GitHub v0.2.0-beta Release', type: 'GITHUB', status: 'PENDING', url: 'https://github.com/gnu-uam-lab/flight-monitor' }
    ],
    tasks: [
      { id: 't-5', milestoneId: 'ms-3', title: 'Three.js 기반 3D 지형 및 기체 렌더링 뷰어 개발', assigneeName: '이지원', role: 'Frontend', status: 'IN_PROGRESS', priority: 'HIGH', dueDate: '2026-10-14' },
      { id: 't-6', milestoneId: 'ms-3', title: '실시간 위경도/고도 텔레메트리 백엔드 스트리밍 API', assigneeName: '김개척', role: 'Backend', status: 'IN_PROGRESS', priority: 'HIGH', dueDate: '2026-10-15' },
      { id: 't-7', milestoneId: 'ms-3', title: '충돌 회피 AI 회귀 모델 1차 가중치 학습', assigneeName: '박우주', role: 'AI/Data', status: 'TODO', priority: 'MEDIUM', dueDate: '2026-10-18' }
    ]
  },
  {
    id: 'ms-4',
    projectId: 'gnu-proj-001',
    weekNumber: 8,
    title: '중간 평가 및 마일스톤 리뷰 (Midterm Review)',
    description: '8주차: 경상국립대 캡스톤디자인 중간발표회(포스터/PT), 지도교수 및 산학멘토 피드백 반영',
    startDate: '2026-10-21',
    dueDate: '2026-10-27',
    status: 'PENDING',
    deliverables: [
      { id: 'del-6', title: '중간 발표 PPT 및 발표대본', type: 'PRESENTATION', status: 'PENDING' },
      { id: 'del-7', title: '중간 보고서 제출', type: 'REPORT', status: 'PENDING' }
    ],
    tasks: [
      { id: 't-8', milestoneId: 'ms-4', title: '중간발표 슬라이드 덱 제작 및 리허설', assigneeName: '최아름', role: 'PM/기획', status: 'TODO', priority: 'HIGH', dueDate: '2026-10-25' }
    ]
  },
  {
    id: 'ms-5',
    projectId: 'gnu-proj-001',
    weekNumber: 12,
    title: '통합 테스트 및 산학 연계 실증',
    description: '11~13주차: KAI/KASA 시뮬레이터 데이터셋 검증, 부하 테스트, 예외 케이스 처리',
    startDate: '2026-11-10',
    dueDate: '2026-11-24',
    status: 'PENDING',
    deliverables: [
      { id: 'del-8', title: '테스트 결과 보고서 및 성능 지표', type: 'REPORT', status: 'PENDING' }
    ],
    tasks: [
      { id: 't-9', milestoneId: 'ms-5', title: '가상 UAM 100대 동시 관제 부하 테스트', assigneeName: '김개척', role: 'Backend', status: 'TODO', priority: 'MEDIUM', dueDate: '2026-11-20' }
    ]
  },
  {
    id: 'ms-6',
    projectId: 'gnu-proj-001',
    weekNumber: 16,
    title: '최종 캡스톤 페스티벌 출품 & 졸업평가',
    description: '15~16주차: GNU 개척 캡스톤 페스티벌 부스 운영, 최종 결과보고서, 지식재산권/특허 출원',
    startDate: '2026-12-08',
    dueDate: '2026-12-18',
    status: 'PENDING',
    deliverables: [
      { id: 'del-9', title: '최종 결과보고서.pdf', type: 'REPORT', status: 'PENDING' },
      { id: 'del-10', title: '전시용 패널/포스터 디자인 파일', type: 'PRESENTATION', status: 'PENDING' },
      { id: 'del-11', title: '최종 시연 영상 (3분 유튜브/드라이브)', type: 'DEMO_VIDEO', status: 'PENDING' }
    ],
    tasks: [
      { id: 't-10', milestoneId: 'ms-6', title: 'GNU 오픈소스 아카이빙 및 배포 도메인 연결', assigneeName: '김개척', role: 'Backend', status: 'TODO', priority: 'HIGH', dueDate: '2026-12-14' }
    ]
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'gnu-proj-001',
    title: '경상국립대 KASA 연계 무인 도심항공교통(UAM) 관제 & 비행 시뮬레이터',
    summary: '사천 우주항공청(KASA) 개청 및 글로컬30 연계, 가상 진주-사천 회랑 UAM 항로 관제 및 충돌 회피 AI 시스템 구축',
    description: '경상국립대학교 우주항공대학과 IT공과대학의 융합 캡스톤디자인 과제입니다. 실시간 텔레메트리 데이터를 Three.js와 웹소켓으로 관제 화면에 시각화하고, AI 강화학습 모델을 활용하여 공역 내 비행체 간 충돌을 방지하는 알고리즘을 연구합니다.',
    category: 'GLOCAL30',
    campus: '가좌(본원)',
    department: '항공우주소프트웨어전공 & 컴퓨터공학부',
    leadStudent: CURRENT_USER,
    teamMembers: [
      { student: CURRENT_USER, role: 'Backend', joinedAt: '2026-09-01' },
      { student: MOCK_STUDENTS[1], role: 'AI/Data', joinedAt: '2026-09-02' },
      { student: MOCK_STUDENTS[2], role: 'Frontend', joinedAt: '2026-09-04' },
      { student: MOCK_STUDENTS[3], role: 'Hardware/Embedded', joinedAt: '2026-09-05' },
    ],
    recruitRoles: [
      {
        role: 'UI/UX Design',
        count: 1,
        currentCount: 0,
        requiredSkills: ['Figma', '대시보드 디자인', '디자인 시스템'],
        description: '실시간 관제 대시보드 및 조종사 인터페이스의 고도화된 UI 디자인을 전담할 팀원을 모십니다.'
      }
    ],
    currentWeek: 6,
    totalWeeks: 16,
    advisorName: '이항공 교수',
    advisorDepartment: '우주항공대학 항공우주및SW공학부',
    advisorFeedbacks: [
      {
        id: 'fb-1',
        advisorName: '이항공 교수',
        advisorTitle: '책임교수',
        department: '항공우주및소프트웨어공학부',
        weekNumber: 1,
        comment: '주제 정의가 우수합니다. 사천-진주 간 UAM 실증 항로의 비행 금지 구역(사천공항 관제권) 데이터를 사전 조사하여 시스템에 반영하세요.',
        scoreGrade: 'S',
        createdAt: '2026-09-07'
      },
      {
        id: 'fb-2',
        advisorName: '이항공 교수',
        advisorTitle: '책임교수',
        department: '항공우주및소프트웨어공학부',
        weekNumber: 3,
        comment: '아키텍처 설계가 체계적입니다. 중간평가 때 실제 KAI 또는 항공청 실무진 멘토링을 주선하도록 하겠습니다.',
        scoreGrade: 'A',
        createdAt: '2026-09-28'
      }
    ],
    milestones: INITIAL_MILESTONES,
    status: 'IN_PROGRESS',
    tags: ['글로컬30', '우주항공청(KASA)', 'UAM', 'Three.js', 'PyTorch', 'ROS2'],
    createdAt: '2026-09-01'
  },
  {
    id: 'gnu-proj-002',
    title: '캠퍼스 메이트 - GNU 가좌/칠암 통학 셔틀 실시간 혼잡도 예측 & 카풀 플랫폼',
    summary: '가좌-칠암 캠퍼스 이동 학생들의 불편을 해결하기 위해 AI 버스 승하차 예측 모델과 학생증 인증 카풀 시스템 개발',
    description: '경상국립대 SW중심대학 해커톤 출품작입니다. 매시간 가좌-칠암 셔틀버스의 대기줄과 혼잡도를 교내 CCTV/정류장 센서와 결합하여 예측하고, 공강 시간에 맞춰 학생들 간 안전한 택시 팟/카풀 매칭을 제공합니다.',
    category: 'SW_CONTEST',
    campus: '가좌(본원)',
    department: '인공지능소프트웨어학과',
    leadStudent: MOCK_STUDENTS[5],
    teamMembers: [
      { student: MOCK_STUDENTS[5], role: 'AI/Data', joinedAt: '2026-09-10' },
      { student: MOCK_STUDENTS[6], role: 'Backend', joinedAt: '2026-09-12' },
    ],
    recruitRoles: [
      {
        role: 'Frontend',
        count: 1,
        currentCount: 0,
        requiredSkills: ['React Native', 'TypeScript', '카카오 지도 API'],
        description: '모바일 웹 또는 React Native 기반의 실시간 셔틀 위치 지도 뷰를 개발할 개발자를 찾습니다.'
      },
      {
        role: 'PM/기획',
        count: 1,
        currentCount: 0,
        requiredSkills: ['학생 설문조사', '서비스 기획', '노션'],
        description: '가좌 및 칠암 학생 대상 베타 테스트 기획 및 교내 홍보를 이끌어줄 기획자를 모십니다.'
      }
    ],
    currentWeek: 3,
    totalWeeks: 8,
    advisorName: '정인공 교수',
    advisorDepartment: 'IT공과대학 인공지능학과',
    advisorFeedbacks: [],
    milestones: [],
    status: 'RECRUITING',
    tags: ['SW중심대학', '캠퍼스라이프', '시계열예측', 'React Native', '셔틀버스'],
    createdAt: '2026-09-10'
  },
  {
    id: 'gnu-proj-003',
    title: '경남 서부권 스마트팜 농작물(파프리카/딸기) 병충해 비전 AI 감지 드론',
    summary: '진주 문산/금산 비닐하우스 특화, 온디바이스 AI 드론을 활용한 온실 내부 자동 순찰 및 조기 병충해 탐지',
    description: '농업생명과학대학 스마트농업공학과와 칠암캠퍼스 메카트로닉스의 LINC 3.0 산학연계 캡스톤 프로젝트입니다. 진주 농가와 실증 테스트를 진행하며 파프리카 흰가루병, 딸기 응애 등 5대 병충해를 YOLOv8 경량 모델로 실시간 분류합니다.',
    category: 'LINC_INDUSTRY',
    campus: '칠암',
    department: '스마트농업공학과 & 메카트로닉스공학부',
    leadStudent: MOCK_STUDENTS[3],
    teamMembers: [
      { student: MOCK_STUDENTS[3], role: 'Hardware/Embedded', joinedAt: '2026-08-25' },
      { student: MOCK_STUDENTS[1], role: 'AI/Data', joinedAt: '2026-08-28' },
    ],
    recruitRoles: [
      {
        role: 'Backend',
        count: 1,
        currentCount: 0,
        requiredSkills: ['FastAPI', 'PostgreSQL', 'Docker'],
        description: '드론 영상 수집 및 진단 결과를 농장주 앱에 알림 발송하는 클라우드 백엔드를 맡아주실 분을 구합니다.'
      }
    ],
    currentWeek: 8,
    totalWeeks: 16,
    advisorName: '박생명 교수',
    advisorDepartment: '농업생명과학대학 스마트농업공학과',
    advisorFeedbacks: [],
    milestones: [],
    status: 'IN_PROGRESS',
    tags: ['LINC3.0', '스마트팜', '경남진주특화', 'YOLOv8', '드론'],
    createdAt: '2026-08-25'
  }
];

export const INITIAL_APPLICANTS: Applicant[] = [
  {
    id: 'app-001',
    projectId: 'gnu-proj-001',
    student: MOCK_STUDENTS[4], // 최아름 (미디어커뮤니케이션 / UI/UX)
    appliedRole: 'UI/UX Design',
    message: '안녕하세요 김개척 팀장님! 미디어커뮤니케이션학과 3학년 최아름입니다. 피그마 기반 대시보드 컴포넌트 시스템 구축 경험이 있고, 관제 3D 인터페이스의 시각적 피로도를 최소화하는 UI를 설계해보고 싶어 지원했습니다. 가좌 중앙도서관 대면 미팅 언제든 가능합니다!',
    appliedAt: '2026-09-18',
    aiSynergyScore: 96,
    aiMatchReason: '현재 팀에 결핍된 전문 UI/UX 디자인 역량을 100% 보완합니다. 캠퍼스(가좌) 및 대면 협업 선호 스타일이 팀장과 일치하며, 미디어커뮤니케이션학과의 풍부한 사용자 분석 경험이 기술 중심 프로젝트의 완성도를 크게 끌어올립니다.',
    aiRiskFactor: '기술 스택 중 Three.js 3D 파이프라인에 대한 기초 이해가 필요하므로 프론트엔드 담당(이지원)과의 초반 규격 미팅 권장.',
    status: 'PENDING'
  },
  {
    id: 'app-002',
    projectId: 'gnu-proj-002',
    student: MOCK_STUDENTS[2], // 이지원 (컴공 / Frontend)
    appliedRole: 'Frontend',
    message: '캠퍼스 메이트 프로젝트에 프론트엔드로 지원합니다. React와 카카오맵 SDK 연동 경험이 있어서 실시간 셔틀 경로 시각화를 빠르게 구현할 수 있습니다!',
    appliedAt: '2026-09-19',
    aiSynergyScore: 92,
    aiMatchReason: '인공지능학과 데이터 엔지니어 팀원과 뛰어난 협업 시너지가 기대됩니다. 카카오맵 SDK 숙련도로 인해 프로젝트 1단계 핵심 과제를 바로 완수할 수 있습니다.',
    status: 'PENDING'
  }
];
