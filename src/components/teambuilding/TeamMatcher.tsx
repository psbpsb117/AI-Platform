import React, { useState } from 'react';
import { Project, StudentProfile, Applicant, RoleType, RecruitRole } from '../../types';
import { CampusBadge, RoleBadge, CategoryBadge } from '../common/Badge';
import { 
  Users, 
  Sparkles, 
  UserPlus, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Clock, 
  Send,
  SlidersHorizontal,
  GraduationCap
} from 'lucide-react';
import { ApplicantModal } from './ApplicantModal';
import { RecruitPostModal } from './RecruitPostModal';
import { ROLE_LABELS } from '../../data/gnuConstants';

interface TeamMatcherProps {
  projects: Project[];
  activeProjectId: string;
  onSelectProject: (id: string) => void;
  applicants: Applicant[];
  allStudents: StudentProfile[];
  onAcceptApplicant: (applicantId: string) => void;
  onRejectApplicant: (applicantId: string) => void;
  onAddRecruitRole: (projectId: string, role: RecruitRole) => void;
}

export const TeamMatcher: React.FC<TeamMatcherProps> = ({
  projects,
  activeProjectId,
  onSelectProject,
  applicants,
  allStudents,
  onAcceptApplicant,
  onRejectApplicant,
  onAddRecruitRole,
}) => {
  const currentProject = projects.find((p) => p.id === activeProjectId) || projects[0];
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
  const [isRecruitModalOpen, setIsRecruitModalOpen] = useState(false);
  const [invitedStudentIds, setInvitedStudentIds] = useState<string[]>([]);
  const [filterCampus, setFilterCampus] = useState<string>('ALL');

  // Filter applicants for this project
  const projectApplicants = applicants.filter(
    (a) => a.projectId === currentProject.id && a.status === 'PENDING'
  );

  // Check which roles are fulfilled
  const coveredRoles = new Set(currentProject.teamMembers.map((m) => m.role));
  const allPossibleRoles: RoleType[] = ['PM/기획', 'Frontend', 'Backend', 'AI/Data', 'Hardware/Embedded', 'UI/UX Design'];

  // AI Recommended Students (students not currently in the team)
  const currentMemberIds = new Set(currentProject.teamMembers.map((m) => m.student.id));
  const eligibleStudents = allStudents.filter((s) => !currentMemberIds.has(s.id));

  // Compute recommendation candidates with GNU matching heuristics
  const recommendedCandidates = eligibleStudents
    .map((student) => {
      // Find complementary score: does this student have a role missing in the team?
      const fulfillsMissingRole = student.roles.some((r) => !coveredRoles.has(r));
      const sameCampus = student.campus === currentProject.campus;
      let score = 75;
      if (fulfillsMissingRole) score += 15;
      if (sameCampus) score += 6;
      if (student.availableHoursWeekly >= 18) score += 3;
      return {
        student,
        score: Math.min(98, score),
        targetRole: student.roles[0],
        matchReason: fulfillsMissingRole
          ? `현재 팀에 결핍된 [${student.roles[0]}] 포지션을 채워 팀 밸런스를 즉시 완성합니다.`
          : `풍부한 기술 스택과 가좌/칠암 협업 적합도가 우수합니다.`
      };
    })
    .filter(item => filterCampus === 'ALL' || item.student.campus === filterCampus)
    .sort((a, b) => b.score - a.score);

  const handleInviteStudent = (studentName: string, studentId: string) => {
    setInvitedStudentIds([...invitedStudentIds, studentId]);
    alert(`${studentName} 학생에게 경상국립대 캡스톤 팀 합류 제안 초대장을 발송했습니다!`);
  };

  return (
    <div className="space-y-8">
      {/* Top Project Selector & Quick Stats */}
      <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200/80">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-gnu-blue uppercase tracking-wider mb-1 block">
              GNU Pioneer AI Team Matcher
            </span>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Users className="h-6 w-6 text-gnu-navy" />
              팀 빌딩 & AI 시너지 매칭 센터
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              경상국립대 다학제 융합 역량 분석 및 지원자 시너지 자동 계산
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 shrink-0">대상 프로젝트:</span>
            <select
              value={activeProjectId}
              onChange={(e) => onSelectProject(e.target.value)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-semibold text-slate-800 focus:border-gnu-blue focus:outline-none max-w-xs truncate"
            >
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Selected Project Overview Card */}
        <div className="mt-5 p-4 rounded-xl bg-slate-50/80 border border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <CategoryBadge category={currentProject.category} size="sm" />
              <CampusBadge campus={currentProject.campus} size="sm" />
              <span className="text-xs font-medium text-slate-500">
                지도교수: {currentProject.advisorName} ({currentProject.advisorDepartment})
              </span>
            </div>
            <h3 className="text-sm font-bold text-slate-900">{currentProject.title}</h3>
            <p className="text-xs text-slate-600 line-clamp-2">{currentProject.summary}</p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="text-center px-4 py-2 bg-white rounded-xl border border-slate-200 shadow-2xl shadow-slate-100">
              <span className="text-[10px] text-slate-400 block font-medium">현재 팀원</span>
              <span className="text-base font-extrabold text-gnu-navy">
                {currentProject.teamMembers.length}명
              </span>
            </div>
            <div className="text-center px-4 py-2 bg-white rounded-xl border border-slate-200 shadow-2xl shadow-slate-100">
              <span className="text-[10px] text-slate-400 block font-medium">신규 지원자</span>
              <span className="text-base font-extrabold text-rose-600">
                {projectApplicants.length}명
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 1. Team Balance Matrix (포지션 매트릭스) */}
      <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200/80">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-gnu-blue" />
              팀 R&R 역할 커버리지 & 밸런스 분석
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              캡스톤 완주를 위해 6대 핵심 포지션(기획, FE, BE, AI, HW, 디자인)의 충족 여부를 확인합니다.
            </p>
          </div>
          <button
            onClick={() => setIsRecruitModalOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-xl bg-gnu-navy px-3.5 py-1.5 text-xs font-bold text-white hover:bg-gnu-blue transition-colors"
          >
            <UserPlus className="h-3.5 w-3.5" />
            모집 포지션 추가
          </button>
        </div>

        {/* Roles Coverage Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
          {allPossibleRoles.map((role) => {
            const isFilled = coveredRoles.has(role);
            const member = currentProject.teamMembers.find((m) => m.role === role);

            return (
              <div
                key={role}
                className={`p-3.5 rounded-xl border transition-all ${
                  isFilled
                    ? 'border-emerald-200 bg-emerald-50/40 text-emerald-950'
                    : 'border-dashed border-slate-300 bg-slate-50/60 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold">{ROLE_LABELS[role].label}</span>
                  {isFilled ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-amber-500" />
                  )}
                </div>
                {isFilled && member ? (
                  <div className="text-[11px]">
                    <span className="font-semibold text-slate-800 block truncate">{member.student.name}</span>
                    <span className="text-slate-500 text-[10px] block truncate">{member.student.major}</span>
                  </div>
                ) : (
                  <span className="text-[11px] text-amber-700 font-medium">영입 필요</span>
                )}
              </div>
            );
          })}
        </div>

        {/* Current Team Members Cards */}
        <div>
          <span className="text-xs font-bold text-slate-700 block mb-3">현재 팀원 명단</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {currentProject.teamMembers.map((member, idx) => (
              <div
                key={idx}
                className="flex items-center space-x-3 p-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-slate-200 transition-all"
              >
                <img
                  src={member.student.avatar}
                  alt={member.student.name}
                  className="h-10 w-10 rounded-xl object-cover ring-1 ring-slate-200"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-xs font-bold text-slate-900 truncate">
                      {member.student.name}
                    </span>
                    {member.student.isLeader && (
                      <span className="rounded bg-gnu-navy px-1 py-0.2 text-[9px] font-bold text-white">
                        팀장
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <RoleBadge role={member.role} size="sm" />
                  </div>
                  <span className="text-[10px] text-slate-400 block truncate mt-0.5">
                    {member.student.campus.slice(0, 2)} · {member.student.major}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Pending Applicants with AI Synergy Score */}
      <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200/80">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-rose-500" />
              도착한 팀 지원서 & AI 시너지 심사
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              지원자의 기술 스택과 가용시간, 캠퍼스 이동성을 분석한 AI 시너지 점수 순으로 표시됩니다.
            </p>
          </div>
          <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-bold text-rose-700">
            대기 {projectApplicants.length}건
          </span>
        </div>

        {projectApplicants.length === 0 ? (
          <div className="text-center py-10 rounded-xl bg-slate-50 border border-dashed border-slate-200 text-slate-400 text-xs">
            현재 대기 중인 지원서가 없습니다. 아래의 "AI 교내 인재 발굴"을 통해 우수 학생에게 먼저 합류를 제안해보세요!
          </div>
        ) : (
          <div className="space-y-3">
            {projectApplicants.map((app) => (
              <div
                key={app.id}
                className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-xl border border-blue-100 bg-gradient-to-r from-blue-50/40 via-white to-white hover:shadow-md transition-all"
              >
                <div className="flex items-start space-x-3.5">
                  <img
                    src={app.student.avatar}
                    alt={app.student.name}
                    className="h-12 w-12 rounded-xl object-cover ring-2 ring-blue-200"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-bold text-slate-900">{app.student.name}</span>
                      <span className="text-xs text-slate-500 font-mono">({app.student.studentNumber})</span>
                      <RoleBadge role={app.appliedRole} size="sm" />
                      <CampusBadge campus={app.student.campus} size="sm" />
                    </div>
                    <p className="text-xs text-slate-600 mt-1 line-clamp-1">
                      "{app.message}"
                    </p>
                    <div className="flex flex-wrap items-center gap-1.5 mt-2">
                      <span className="text-[10px] text-slate-400">보유스택:</span>
                      {app.student.skills.slice(0, 4).map((s, idx) => (
                        <span key={idx} className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-600">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between lg:justify-end gap-4 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                  {/* AI Synergy badge */}
                  <div className="text-right">
                    <span className="text-[10px] font-bold text-gnu-blue uppercase tracking-wider block">
                      AI 시너지 점수
                    </span>
                    <div className="flex items-center gap-1 justify-end">
                      <span className="text-xl font-black text-gnu-navy">{app.aiSynergyScore}</span>
                      <span className="text-xs font-bold text-gnu-blue">%</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedApplicant(app)}
                    className="inline-flex items-center space-x-1.5 rounded-xl bg-gnu-navy px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-gnu-blue transition-colors"
                  >
                    <Sparkles className="h-3.5 w-3.5 text-gnu-accent" />
                    <span>AI 심사 및 합류결정</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 3. AI Pioneer Candidate Recommender (AI 교내 인재 추천) */}
      <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200/80">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-gnu-blue" />
              경상국립대학교 AI 인재 발굴 & 추천 풀 (GNU Pioneer Pool)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              전공 역량 및 프로젝트 결손 포지션을 기반으로 최적의 협업 파트너를 AI가 교내 전체에서 발굴합니다.
            </p>
          </div>

          {/* Campus Filter */}
          <div className="flex items-center space-x-1.5">
            <span className="text-xs text-slate-500 font-medium">캠퍼스:</span>
            {['ALL', '가좌(본원)', '칠암', '통영'].map((c) => (
              <button
                key={c}
                onClick={() => setFilterCampus(c)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                  filterCampus === c
                    ? 'bg-gnu-navy text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {c === 'ALL' ? '전체' : c}
              </button>
            ))}
          </div>
        </div>

        {/* Candidate Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendedCandidates.map(({ student, score, targetRole, matchReason }) => {
            const isInvited = invitedStudentIds.includes(student.id);

            return (
              <div
                key={student.id}
                className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-4.5 hover:border-blue-300 hover:shadow-lg transition-all group"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex items-center space-x-3">
                      <img
                        src={student.avatar}
                        alt={student.name}
                        className="h-11 w-11 rounded-xl object-cover ring-1 ring-slate-200"
                      />
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                          {student.name}
                          <span className="text-xs font-normal text-slate-500">({student.grade}학년)</span>
                        </h4>
                        <span className="text-[11px] text-slate-500 block truncate max-w-[160px]">
                          {student.college} · {student.major}
                        </span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="rounded-full bg-blue-100 px-2.5 py-1 text-[11px] font-black text-gnu-blue">
                        {score}% 적합
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-2.5">
                    <CampusBadge campus={student.campus} size="sm" />
                    <RoleBadge role={targetRole} size="sm" />
                    <span className="text-[10px] text-slate-400 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      주 {student.availableHoursWeekly}h
                    </span>
                  </div>

                  {/* AI Reason */}
                  <div className="p-2.5 rounded-xl bg-blue-50/50 border border-blue-100/80 text-[11px] text-slate-700 leading-relaxed mb-3">
                    <span className="font-bold text-gnu-blue mr-1">AI 매칭:</span>
                    {matchReason}
                  </div>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {student.skills.slice(0, 4).map((skill, idx) => (
                      <span key={idx} className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-600">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    {student.preferredWorkStyle.slice(0, 10)}...
                  </span>
                  <button
                    disabled={isInvited}
                    onClick={() => handleInviteStudent(student.name, student.id)}
                    className={`inline-flex items-center space-x-1 rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                      isInvited
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        : 'bg-gnu-navy text-white hover:bg-gnu-blue shadow-sm'
                    }`}
                  >
                    {isInvited ? (
                      <>
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                        <span>초대 완료</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-3.5 w-3.5" />
                        <span>영입 제안</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Applicant Review Modal */}
      <ApplicantModal
        applicant={selectedApplicant}
        project={currentProject}
        isOpen={Boolean(selectedApplicant)}
        onClose={() => setSelectedApplicant(null)}
        onAccept={(id) => {
          onAcceptApplicant(id);
          setSelectedApplicant(null);
        }}
        onReject={(id) => {
          onRejectApplicant(id);
          setSelectedApplicant(null);
        }}
      />

      {/* Recruit Role Modal */}
      <RecruitPostModal
        isOpen={isRecruitModalOpen}
        onClose={() => setIsRecruitModalOpen(false)}
        onAddRole={(role) => onAddRecruitRole(currentProject.id, role)}
      />
    </div>
  );
};
