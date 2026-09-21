import React, { useState } from 'react';
import { Project, RoleType, StudentProfile } from '../../types';
import { CampusBadge, CategoryBadge, RoleBadge } from '../common/Badge';
import { 
  ArrowLeft, 
  Users, 
  Milestone as MilestoneIcon, 
  GraduationCap, 
  UserPlus, 
  Send, 
  CheckCircle2, 
  Clock, 
  Sparkles,
  Layers
} from 'lucide-react';
import { Modal } from '../common/Modal';

interface ProjectDetailProps {
  project: Project;
  currentUser: StudentProfile;
  onBack: () => void;
  onApplyRole: (projectId: string, role: RoleType, message: string) => void;
  onNavigateToMilestones: (projectId: string) => void;
  onNavigateToTeamMatcher: (projectId: string) => void;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({
  project,
  currentUser,
  onBack,
  onApplyRole,
  onNavigateToMilestones,
  onNavigateToTeamMatcher,
}) => {
  const [selectedRoleToApply, setSelectedRoleToApply] = useState<RoleType | null>(null);
  const [applyMessage, setApplyMessage] = useState('');
  const [applySubmitted, setApplySubmitted] = useState(false);

  const isUserInTeam = project.teamMembers.some((m) => m.student.id === currentUser.id);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRoleToApply || !applyMessage.trim()) return;

    onApplyRole(project.id, selectedRoleToApply, applyMessage.trim());
    setApplySubmitted(true);
    setTimeout(() => {
      setApplySubmitted(false);
      setSelectedRoleToApply(null);
      setApplyMessage('');
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-gnu-blue transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>프로젝트 목록으로 돌아가기</span>
      </button>

      {/* Main Project Header Card */}
      <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <CategoryBadge category={project.category} size="md" />
              <CampusBadge campus={project.campus} size="md" />
              <span className="text-xs font-semibold text-slate-500">
                {project.department}
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
              {project.title}
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {project.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action Center */}
          <div className="flex flex-col gap-2 shrink-0">
            <button
              onClick={() => onNavigateToMilestones(project.id)}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gnu-navy px-4 py-2.5 text-xs font-bold text-white hover:bg-gnu-blue shadow-sm transition-all"
            >
              <MilestoneIcon className="h-4 w-4 text-amber-300" />
              <span>16주 마일스톤 & 로드맵 보기</span>
            </button>
            <button
              onClick={() => onNavigateToTeamMatcher(project.id)}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-all"
            >
              <Users className="h-4 w-4 text-gnu-blue" />
              <span>AI 팀 빌딩 대시보드</span>
            </button>
          </div>
        </div>

        {/* Info Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-100 text-xs">
          <div className="p-3 rounded-xl bg-slate-50">
            <span className="text-slate-400 block text-[11px]">프로젝트 팀장</span>
            <span className="font-bold text-slate-800">
              {project.leadStudent.name} ({project.leadStudent.major})
            </span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50">
            <span className="text-slate-400 block text-[11px]">지도교수</span>
            <span className="font-bold text-slate-800">
              {project.advisorName} ({project.advisorDepartment})
            </span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50">
            <span className="text-slate-400 block text-[11px]">현재 팀 규모</span>
            <span className="font-bold text-gnu-blue">{project.teamMembers.length}명 활동 중</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50">
            <span className="text-slate-400 block text-[11px]">학기 진도</span>
            <span className="font-bold text-slate-800">{project.currentWeek}주차 / 총 {project.totalWeeks}주</span>
          </div>
        </div>
      </div>

      {/* Recruiting Roles Section */}
      <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <UserPlus className="h-5 w-5 text-gnu-blue" />
              현재 모집 중인 팀원 포지션
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              원하는 역할에 지원서를 작성하면 AI가 즉시 시너지 점수를 산출하여 팀장에게 전달합니다.
            </p>
          </div>
          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-gnu-blue">
            {project.recruitRoles.length}개 포지션 구인 중
          </span>
        </div>

        {project.recruitRoles.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-400 rounded-2xl bg-slate-50 border border-dashed border-slate-200">
            모든 팀원 모집이 마감되었습니다.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.recruitRoles.map((roleInfo, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-between p-5 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <RoleBadge role={roleInfo.role} size="md" />
                    <span className="text-xs font-bold text-slate-600">
                      모집 인원: {roleInfo.count}명
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed">
                    {roleInfo.description}
                  </p>

                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block mb-1">
                      우대 기술 스택
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {roleInfo.requiredSkills.map((sk, sIdx) => (
                        <span
                          key={sIdx}
                          className="rounded-md bg-white border border-slate-200 px-2 py-0.5 text-[10px] font-semibold text-slate-700"
                        >
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200/80 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    경상국립대 재학생 지원 가능
                  </span>
                  <button
                    disabled={isUserInTeam}
                    onClick={() => setSelectedRoleToApply(roleInfo.role)}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-gnu-navy px-4 py-2 text-xs font-bold text-white hover:bg-gnu-blue disabled:opacity-40 shadow-sm"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>{isUserInTeam ? '이미 팀원임' : '팀 합류 지원하기'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Current Team Members */}
      <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-sm border border-slate-200/80 space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Users className="h-5 w-5 text-gnu-navy" />
          현재 프로젝트 팀원 ({project.teamMembers.length}명)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {project.teamMembers.map((m, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 transition-all flex items-center space-x-3.5"
            >
              <img
                src={m.student.avatar}
                alt={m.student.name}
                className="h-12 w-12 rounded-xl object-cover ring-2 ring-slate-100"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center space-x-1.5">
                  <span className="text-xs font-bold text-slate-900 truncate">
                    {m.student.name}
                  </span>
                  {m.student.isLeader && (
                    <span className="rounded bg-gnu-navy px-1 py-0.2 text-[9px] font-bold text-white">
                      팀장
                    </span>
                  )}
                </div>
                <div className="mt-1">
                  <RoleBadge role={m.role} size="sm" />
                </div>
                <span className="text-[10px] text-slate-400 block truncate mt-1">
                  {m.student.campus.slice(0, 2)} · {m.student.major}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Apply Role Modal */}
      <Modal
        isOpen={Boolean(selectedRoleToApply)}
        onClose={() => setSelectedRoleToApply(null)}
        title={`[${selectedRoleToApply}] 포지션 지원서 작성`}
        subtitle="작성하신 지원 동기와 프로필을 AI가 분석하여 팀장에게 높은 시너지 추천으로 전달합니다."
        maxWidth="md"
      >
        <form onSubmit={handleApply} className="space-y-4">
          <div className="p-3 rounded-xl bg-blue-50 border border-blue-100 text-xs text-blue-900">
            <span className="font-bold block mb-1">지원자 정보:</span>
            <p>{currentUser.name} ({currentUser.campus} · {currentUser.major} {currentUser.grade}학년)</p>
            <p className="text-[11px] text-blue-700 mt-1">보유 스택: {currentUser.skills.join(', ')}</p>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              지원 동기 및 팀 기여 계획
            </label>
            <textarea
              rows={4}
              required
              placeholder="예: 경상국립대 4학년으로서 관련 과목을 수강하였으며, 가좌 캠퍼스 중앙도서관 대면 모임에 매주 성실히 참여할 수 있습니다."
              value={applyMessage}
              onChange={(e) => setApplyMessage(e.target.value)}
              className="w-full rounded-xl border border-slate-200 p-3 text-xs focus:border-gnu-blue focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setSelectedRoleToApply(null)}
              className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100"
            >
              취소
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 rounded-xl bg-gnu-navy px-5 py-2 text-xs font-bold text-white shadow-md hover:bg-gnu-blue"
            >
              {applySubmitted ? (
                <>
                  <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                  <span>지원 완료!</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 text-amber-300" />
                  <span>AI 시너지 분석과 함께 지원하기</span>
                </>
              )}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
