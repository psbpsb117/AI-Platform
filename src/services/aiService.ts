import { Project, StudentProfile, RoleType, Milestone, Task, Deliverable } from '../types';

// API Key management
export const getStoredGeminiKey = (): string => {
  return localStorage.getItem('gnu_pioneers_gemini_key') || '';
};

export const setStoredGeminiKey = (key: string) => {
  if (key) {
    localStorage.setItem('gnu_pioneers_gemini_key', key);
  } else {
    localStorage.removeItem('gnu_pioneers_gemini_key');
  }
};

export interface SynergyAnalysisResult {
  score: number; // 0 ~ 100
  summary: string;
  strengths: string[];
  roleBalanceScore: number;
  campusCompatibility: {
    compatible: boolean;
    distanceNote: string;
  };
  recommendationReason: string;
  cautionNotes?: string;
}

/**
 * 경상국립대학교 맞춤형 AI 팀 시너지 분석기
 */
export async function analyzeApplicantSynergy(
  project: Project,
  student: StudentProfile,
  appliedRole: RoleType
): Promise<SynergyAnalysisResult> {
  const apiKey = getStoredGeminiKey();

  // If Gemini API Key exists, try real LLM inference
  if (apiKey) {
    try {
      const prompt = `
당신은 경상국립대학교(GNU) 캡스톤디자인 및 산학프로젝트 AI 팀빌딩 전문가입니다.
다음 프로젝트 정보와 지원자 프로필을 분석하여 팀 시너지 점수(0~100점)와 분석 리포트를 JSON으로 응답해주세요.

[프로젝트 정보]
- 프로젝트명: ${project.title}
- 분류: ${project.category} (${project.department}, 캠퍼스: ${project.campus})
- 프로젝트 개요: ${project.summary}
- 현재 팀 구성: ${project.teamMembers.map(m => `${m.student.name}(${m.role}, ${m.student.major})`).join(', ')}
- 모집 희망 역할: ${appliedRole}

[지원 학생 정보]
- 이름: ${student.name} (${student.college} ${student.major}, ${student.grade}학년)
- 소속 캠퍼스: ${student.campus}
- 보유 스택: ${student.skills.join(', ')}
- 주당 가용시간: ${student.availableHoursWeekly}시간
- 선호 협업 방식: ${student.preferredWorkStyle}
- 자기소개: ${student.bio}

JSON 응답 형식:
{
  "score": 95,
  "summary": "한 줄 총평",
  "strengths": ["강점1", "강점2"],
  "roleBalanceScore": 90,
  "campusCompatibility": { "compatible": true, "distanceNote": "거리 및 협업 형태 분석" },
  "recommendationReason": "상세 추천 사유",
  "cautionNotes": "주의점 혹은 협업 팁"
}
오직 JSON 문자열만 응답하세요.`;

      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: 'application/json' }
        })
      });

      if (res.ok) {
        const data = await res.json();
        const jsonText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (jsonText) {
          return JSON.parse(jsonText);
        }
      }
    } catch (e) {
      console.warn('Gemini API call failed, falling back to GNU Heuristic Engine:', e);
    }
  }

  // High-precision GNU Heuristic AI Engine (Fallback & Instant local execution)
  return calculateGnuHeuristicSynergy(project, student, appliedRole);
}

/**
 * GNU 도메인 지식 기반 정밀 휴리스틱 AI 매칭 알고리즘
 */
function calculateGnuHeuristicSynergy(
  project: Project,
  student: StudentProfile,
  appliedRole: RoleType
): SynergyAnalysisResult {
  let score = 70;
  const strengths: string[] = [];

  // 1. 역할 결손 보완성 체크
  const hasExistingRole = project.teamMembers.some(m => m.role === appliedRole);
  if (!hasExistingRole) {
    score += 15;
    strengths.push(`현재 팀에 공백인 [${appliedRole}] 핵심 역량을 즉각 채워줄 수 있습니다.`);
  } else {
    score += 5;
    strengths.push(`동일 역할의 시니어/주니어 협업으로 개발 가속화가 가능합니다.`);
  }

  // 2. 캠퍼스 간 시너지 및 지리적 적합성
  const isSameCampus = project.campus === student.campus;
  let campusNote = '';
  if (isSameCampus) {
    score += 8;
    campusNote = `${project.campus} 소속으로 대면 스터디룸 및 실습실 오프라인 협업에 최적화되어 있습니다.`;
    strengths.push(`같은 ${project.campus} 소속으로 원활한 오프라인 모임이 가능합니다.`);
  } else {
    campusNote = `${project.campus} ↔ ${student.campus} 간 원격 협업이 필요하지만 융합 프로젝트 가산점이 높습니다.`;
    if (student.preferredWorkStyle.includes('병행') || student.preferredWorkStyle.includes('비대면')) {
      score += 6;
      strengths.push(`타 캠퍼스(${student.campus}) 소속이나 온/오프라인 유연 협업 성향을 갖추었습니다.`);
    }
  }

  // 3. 다학제 융합 보너스 (예: IT공대 + 우주항공대, 농생대 + 메카트로닉스)
  const leadCollege = project.leadStudent.college;
  if (leadCollege !== student.college) {
    score += 7;
    strengths.push(`${leadCollege}와 ${student.college} 간의 경상국립대 다학제 융복합 시너지를 창출합니다.`);
  }

  // 4. 가용 시간 체크
  if (student.availableHoursWeekly >= 18) {
    score += 5;
    strengths.push(`주당 ${student.availableHoursWeekly}시간의 높은 캡스톤 몰입 시간을 확보하고 있습니다.`);
  }

  score = Math.min(99, Math.max(65, score));

  return {
    score,
    summary: `${student.name} 학생은 [${appliedRole}] 포지션에 ${score}%의 높은 적합성과 협업 시너지를 보입니다.`,
    strengths,
    roleBalanceScore: Math.min(100, score + 2),
    campusCompatibility: {
      compatible: true,
      distanceNote: campusNote,
    },
    recommendationReason: `${student.major} 전공자로서 보유한 스택(${student.skills.slice(0, 3).join(', ')})과 프로젝트 요구사항이 긴밀히 부합합니다. 특히 팀의 기술 스택 균형을 완벽히 맞춰줄 수 있습니다.`,
    cautionNotes: isSameCampus 
      ? '정기적인 가좌/칠암 회의 일정을 주간 단위로 확정하는 것을 권장합니다.'
      : '캠퍼스 이동 소요시간을 감안하여 Discord 및 Git 기반의 비대면 코드 리뷰 문화를 적극 활용하세요.',
  };
}

/**
 * 캡스톤디자인 16주 학사일정에 최적화된 마일스톤 자동 생성 AI
 */
export async function generateAiRoadmap(
  projectTopic: string,
  category: string,
  totalWeeks: number = 16,
  targetStack: string[] = []
): Promise<Milestone[]> {
  const apiKey = getStoredGeminiKey();

  if (apiKey) {
    try {
      const prompt = `
경상국립대학교 캡스톤디자인/산학프로젝트를 위한 ${totalWeeks}주 완성 로드맵 마일스톤을 JSON으로 생성해주세요.
- 프로젝트 주제: ${projectTopic}
- 과제 유형: ${category}
- 주요 기술 스택: ${targetStack.join(', ')}

단계별(기획 및 분석 -> 아키텍처/승인 -> 1차 프로토타입 -> 중간평가 -> 고도화/통합 -> 최종 전시/결과보고서)로 4~6개의 Milestone 객체 배열을 JSON으로 응답해주세요.
각 마일스톤에는 weekNumber, title, description, tasks(최소 2개), deliverables(최소 1개)가 포함되어야 합니다.
오직 JSON 문자열만 응답하세요.`;

      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: 'application/json' }
        })
      });

      if (res.ok) {
        const data = await res.json();
        const jsonText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (jsonText) {
          const parsed = JSON.parse(jsonText);
          if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed.map((m, idx) => ({
              id: `ms-ai-${Date.now()}-${idx}`,
              projectId: 'current',
              weekNumber: m.weekNumber || (idx + 1) * 3,
              title: m.title,
              description: m.description,
              startDate: new Date(Date.now() + idx * 14 * 86400000).toISOString().split('T')[0],
              dueDate: new Date(Date.now() + (idx + 1) * 14 * 86400000).toISOString().split('T')[0],
              status: idx === 0 ? 'IN_PROGRESS' : 'PENDING',
              deliverables: (m.deliverables || []).map((d: any, dIdx: number) => ({
                id: `del-ai-${idx}-${dIdx}`,
                title: typeof d === 'string' ? d : d.title || '산출물 보고서',
                type: d.type || 'REPORT',
                status: 'PENDING'
              })),
              tasks: (m.tasks || []).map((t: any, tIdx: number) => ({
                id: `t-ai-${idx}-${tIdx}`,
                milestoneId: `ms-ai-${idx}`,
                title: typeof t === 'string' ? t : t.title || '세부 개발 과제',
                role: t.role || 'Backend',
                status: 'TODO',
                priority: 'HIGH',
                dueDate: new Date(Date.now() + (idx + 1) * 14 * 86400000).toISOString().split('T')[0]
              }))
            }));
          }
        }
      }
    } catch (e) {
      console.warn('Gemini API roadmap call failed, falling back to GNU Template Engine:', e);
    }
  }

  // Pre-calibrated GNU Capstone Design 16-Week Roadmap Template
  return getGnuDefault16WeekRoadmap(projectTopic);
}

function getGnuDefault16WeekRoadmap(topic: string): Milestone[] {
  return [
    {
      id: `ms-${Date.now()}-1`,
      projectId: 'current',
      weekNumber: 2,
      title: '주제 구체화 및 요구사항 명세서 확정',
      description: `[${topic}] 주제에 대한 GNU 교내 문제정의 및 캡스톤 R&R 확정`,
      startDate: '2026-09-01',
      dueDate: '2026-09-14',
      status: 'IN_PROGRESS',
      deliverables: [
        { id: `del-${Date.now()}-1`, title: '캡스톤디자인 1차 연구계획서.pdf', type: 'DOCUMENT', status: 'PENDING' }
      ],
      tasks: [
        { id: `t-${Date.now()}-1`, milestoneId: '1', title: '사용자 및 타깃 사용자 페르소나 분석', role: 'PM/기획', status: 'IN_PROGRESS', priority: 'HIGH', dueDate: '2026-09-07' },
        { id: `t-${Date.now()}-2`, milestoneId: '1', title: '기술 스택 선정 및 개발 환경 리포지토리 구성', role: 'Backend', status: 'DONE', priority: 'MEDIUM', dueDate: '2026-09-12' },
      ]
    },
    {
      id: `ms-${Date.now()}-2`,
      projectId: 'current',
      weekNumber: 4,
      title: '시스템 아키텍처 설계 & 지도교수 1차 승인',
      description: 'DB ERD, API 명세서 작성 및 지도교수 정기 면담 승인 획득',
      startDate: '2026-09-15',
      dueDate: '2026-09-28',
      status: 'PENDING',
      deliverables: [
        { id: `del-${Date.now()}-2`, title: '시스템 아키텍처 및 DB 설계서', type: 'REPORT', status: 'PENDING' }
      ],
      tasks: [
        { id: `t-${Date.now()}-3`, milestoneId: '2', title: '핵심 REST API 규격서 작성', role: 'Backend', status: 'TODO', priority: 'HIGH', dueDate: '2026-09-22' },
        { id: `t-${Date.now()}-4`, milestoneId: '2', title: 'Figma 와이어프레임 및 디자인 시스템 구축', role: 'UI/UX Design', status: 'TODO', priority: 'HIGH', dueDate: '2026-09-26' }
      ]
    },
    {
      id: `ms-${Date.now()}-3`,
      projectId: 'current',
      weekNumber: 8,
      title: '핵심 프로토타입 구현 및 중간평가 발표',
      description: '경상국립대 캡스톤 중간발표회(8주차) 참여, 동작 가능한 PoC 시연',
      startDate: '2026-10-12',
      dueDate: '2026-10-26',
      status: 'PENDING',
      deliverables: [
        { id: `del-${Date.now()}-3`, title: '중간발표 슬라이드 및 중간결과보고서', type: 'PRESENTATION', status: 'PENDING' },
        { id: `del-${Date.now()}-4`, title: '1차 동작 프로토타입 시연 영상', type: 'DEMO_VIDEO', status: 'PENDING' }
      ],
      tasks: [
        { id: `t-${Date.now()}-5`, milestoneId: '3', title: '프론트엔드-백엔드 인증 및 주요 CRUD 연동', role: 'Frontend', status: 'TODO', priority: 'HIGH', dueDate: '2026-10-18' },
        { id: `t-${Date.now()}-6`, milestoneId: '3', title: 'AI 모델 / 핵심 비즈니스 로직 서빙 파이프라인 완성', role: 'AI/Data', status: 'TODO', priority: 'HIGH', dueDate: '2026-10-22' }
      ]
    },
    {
      id: `ms-${Date.now()}-4`,
      projectId: 'current',
      weekNumber: 13,
      title: '통합 테스트, 실증 및 성능 튜닝',
      description: 'GNU 교내 학생 베타 테스트 진행, 피드백 수렴 및 결함 수정',
      startDate: '2026-11-16',
      dueDate: '2026-11-30',
      status: 'PENDING',
      deliverables: [
        { id: `del-${Date.now()}-5`, title: '베타 테스트 결과 및 버그 트래킹 리포트', type: 'REPORT', status: 'PENDING' }
      ],
      tasks: [
        { id: `t-${Date.now()}-7`, milestoneId: '4', title: '부하 테스트 및 보안/인증 취약점 보완', role: 'Backend', status: 'TODO', priority: 'MEDIUM', dueDate: '2026-11-23' },
        { id: `t-${Date.now()}-8`, milestoneId: '4', title: '사용자 피드백 기반 UI/UX 디테일 개선', role: 'Frontend', status: 'TODO', priority: 'MEDIUM', dueDate: '2026-11-27' }
      ]
    },
    {
      id: `ms-${Date.now()}-5`,
      projectId: 'current',
      weekNumber: 16,
      title: '최종 캡스톤 페스티벌 출품 & 아카이빙',
      description: '경상국립대 캡스톤 경진대회 발표, 최종 결과보고서 제출, 오픈소스 릴리즈',
      startDate: '2026-12-01',
      dueDate: '2026-12-18',
      status: 'PENDING',
      deliverables: [
        { id: `del-${Date.now()}-6`, title: '최종 캡스톤 결과보고서.pdf', type: 'REPORT', status: 'PENDING' },
        { id: `del-${Date.now()}-7`, title: '공식 GitHub Release v1.0.0', type: 'GITHUB', status: 'PENDING' },
        { id: `del-${Date.now()}-8`, title: '최종 3분 시연 영상', type: 'DEMO_VIDEO', status: 'PENDING' }
      ],
      tasks: [
        { id: `t-${Date.now()}-9`, milestoneId: '5', title: '전시 부스용 포스터(A0) 인쇄물 제작', role: 'PM/기획', status: 'TODO', priority: 'HIGH', dueDate: '2026-12-08' },
        { id: `t-${Date.now()}-10`, milestoneId: '5', title: '운영 서버 프로덕션 배포 및 최종 산출물 등록', role: 'Backend', status: 'TODO', priority: 'HIGH', dueDate: '2026-12-14' }
      ]
    }
  ];
}
