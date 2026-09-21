export type GnuCampus = '가좌(본원)' | '칠암' | '통영' | '창원산학';

export type GnuCollege = 
  | '우주항공대학'
  | 'IT공과대학'
  | '공과대학'
  | '융합기술공과대학'
  | '자연과학대학'
  | '농업생명과학대학'
  | '경영대학'
  | '해양과학대학'
  | '인문사회대학'
  | '사범대학';

export type ProjectCategory = 
  | 'CAPSTONE'         // 캡스톤디자인 1·2 (정규교과)
  | 'SW_CONTEST'        // SW중심대학 경진대회 / 해커톤
  | 'GLOCAL30'          // 글로컬30 우주항공·방산 산학연계
  | 'LINC_INDUSTRY'     // LINC 3.0 기업연계 캡스톤
  | 'ACADEMIC_CLUB';    // 전공 동아리 / 자율 프로젝트

export type RoleType = 
  | 'PM/기획' 
  | 'Frontend' 
  | 'Backend' 
  | 'AI/Data' 
  | 'Hardware/Embedded' 
  | 'UI/UX Design';

export type WorkStyle = 
  | '가좌캠퍼스 대면 (중앙도서관/과방)' 
  | '칠암캠퍼스 대면' 
  | '온/오프라인 병행' 
  | '완전 비대면 (Discord/Notion)';

export interface StudentProfile {
  id: string;
  name: string;
  studentNumber: string; // ex: 2021012345
  email: string;         // ex: student@gnu.ac.kr
  campus: GnuCampus;
  college: GnuCollege;
  major: string;
  grade: number;         // 1~4학년 / 대학원
  avatar: string;
  roles: RoleType[];
  skills: string[];
  interests: string[];
  bio: string;
  availableHoursWeekly: number;
  preferredWorkStyle: WorkStyle;
  githubUrl?: string;
  portfolioUrl?: string;
  synergyMatchRating?: number; // 0~100 (AI 매칭 시 계산)
  isLeader?: boolean;
}

export interface RecruitRole {
  role: RoleType;
  count: number;
  currentCount: number;
  requiredSkills: string[];
  description: string;
}

export interface Task {
  id: string;
  milestoneId: string;
  title: string;
  assigneeName?: string;
  assigneeAvatar?: string;
  role: RoleType;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  dueDate: string;
}

export interface Deliverable {
  id: string;
  title: string;
  type: 'DOCUMENT' | 'GITHUB' | 'DEMO_VIDEO' | 'PRESENTATION' | 'REPORT';
  url?: string;
  submittedAt?: string;
  feedback?: string;
  status: 'PENDING' | 'SUBMITTED' | 'APPROVED' | 'NEEDS_REVISION';
}

export interface Milestone {
  id: string;
  projectId: string;
  weekNumber: number; // 1 ~ 16주차
  title: string;
  description: string;
  startDate: string;
  dueDate: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'REVIEW_REQUESTED' | 'COMPLETED';
  deliverables: Deliverable[];
  tasks: Task[];
  advisorComment?: string;
}

export interface AdvisorFeedback {
  id: string;
  advisorName: string;
  advisorTitle: string;
  department: string;
  weekNumber: number;
  comment: string;
  scoreGrade?: 'S' | 'A' | 'B' | 'C';
  createdAt: string;
}

export interface Project {
  id: string;
  title: string;
  summary: string;
  description: string;
  category: ProjectCategory;
  campus: GnuCampus;
  department: string;
  leadStudent: StudentProfile;
  teamMembers: {
    student: StudentProfile;
    role: RoleType;
    joinedAt: string;
  }[];
  recruitRoles: RecruitRole[];
  currentWeek: number;
  totalWeeks: number; // 기본 16주 (한 학기)
  advisorName: string;
  advisorDepartment: string;
  advisorFeedbacks: AdvisorFeedback[];
  milestones: Milestone[];
  status: 'RECRUITING' | 'IN_PROGRESS' | 'EVALUATION' | 'COMPLETED';
  tags: string[];
  createdAt: string;
}

export interface Applicant {
  id: string;
  projectId: string;
  student: StudentProfile;
  appliedRole: RoleType;
  message: string;
  appliedAt: string;
  aiSynergyScore: number;
  aiMatchReason: string;
  aiRiskFactor?: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
}
