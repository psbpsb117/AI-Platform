import React, { useState } from 'react';
import { Project, Milestone, Task, Deliverable } from '../../types';
import { GanttTimeline } from './GanttTimeline';
import { KanbanBoard } from './KanbanBoard';
import { AiRoadmapModal } from './AiRoadmapModal';
import { 
  Milestone as MilestoneIcon, 
  Sparkles, 
  Calendar, 
  Kanban, 
  FileCheck2, 
  TrendingUp, 
  ExternalLink,
  PlusCircle,
  AlertCircle
} from 'lucide-react';
import { CampusBadge, CategoryBadge } from '../common/Badge';

interface MilestonePlannerProps {
  project: Project;
  onUpdateMilestones: (milestones: Milestone[]) => void;
  onUpdateTaskStatus: (taskId: string, newStatus: Task['status']) => void;
  onAddTask: (task: Omit<Task, 'id'>) => void;
}

export const MilestonePlanner: React.FC<MilestonePlannerProps> = ({
  project,
  onUpdateMilestones,
  onUpdateTaskStatus,
  onAddTask,
}) => {
  const [viewMode, setViewMode] = useState<'timeline' | 'kanban' | 'deliverables'>('timeline');
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(
    project.milestones[2] || project.milestones[0] || null
  );

  // Calculate statistics
  let totalTasks = 0;
  let doneTasks = 0;
  let totalDeliverables = 0;
  let approvedDeliverables = 0;

  project.milestones.forEach((m) => {
    totalTasks += m.tasks.length;
    doneTasks += m.tasks.filter((t) => t.status === 'DONE').length;
    totalDeliverables += m.deliverables.length;
    approvedDeliverables += m.deliverables.filter((d) => d.status === 'APPROVED').length;
  });

  const progressPercentage = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Header & Control Center */}
      <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200/80">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-gnu-blue uppercase tracking-wider">
                GNU Capstone Milestone Co-Pilot
              </span>
              <CategoryBadge category={project.category} size="sm" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <MilestoneIcon className="h-6 w-6 text-gnu-navy" />
              16주 캡스톤 프로젝트 마일스톤 관리
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              [{project.title}] 캡스톤 정규 학사일정 및 주차별 산출물 완주 트래커
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAiModalOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-gnu-navy to-gnu-blue px-4 py-2.5 text-xs font-bold text-white shadow-md hover:opacity-95 transition-all"
            >
              <Sparkles className="h-4 w-4 text-amber-300" />
              <span>AI 16주 로드맵 자동 분해 생성</span>
            </button>
          </div>
        </div>

        {/* Milestone Progress Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
          <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-100">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-bold text-blue-900 flex items-center gap-1.5">
                <TrendingUp className="h-4 w-4 text-gnu-blue" />
                전체 과제 완수율
              </span>
              <span className="font-extrabold text-gnu-navy text-sm">{progressPercentage}%</span>
            </div>
            <div className="w-full bg-blue-200/60 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gnu-blue h-2 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <span className="text-[10px] text-slate-500 mt-1 block">
              총 {totalTasks}개 태스크 중 {doneTasks}개 완료
            </span>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-100">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-bold text-emerald-900 flex items-center gap-1.5">
                <FileCheck2 className="h-4 w-4 text-emerald-600" />
                학사 산출물 승인 현황
              </span>
              <span className="font-extrabold text-emerald-800 text-sm">
                {approvedDeliverables} / {totalDeliverables} 건
              </span>
            </div>
            <div className="w-full bg-emerald-200/60 rounded-full h-2 overflow-hidden">
              <div
                className="bg-emerald-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${totalDeliverables > 0 ? (approvedDeliverables / totalDeliverables) * 100 : 0}%` }}
              />
            </div>
            <span className="text-[10px] text-slate-500 mt-1 block">
              지도교수 승인 완료 비율
            </span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-bold text-slate-700">현재 학기 일정</span>
              <span className="rounded bg-gnu-navy px-2 py-0.5 text-[10px] font-bold text-white">
                {project.currentWeek}주차 진행 중
              </span>
            </div>
            <p className="text-xs text-slate-800 font-semibold mt-1">
              8주차 중간평가까지 약 14일 남음
            </p>
            <span className="text-[10px] text-slate-400 block mt-0.5">
              중간보고서 및 PoC 데모 영상 준비 필요
            </span>
          </div>
        </div>

        {/* View mode switcher */}
        <div className="flex items-center space-x-2 mt-6 pt-4 border-t border-slate-100">
          <button
            onClick={() => setViewMode('timeline')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              viewMode === 'timeline'
                ? 'bg-gnu-navy text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Calendar className="h-4 w-4" />
            <span>16주 간트 타임라인</span>
          </button>
          <button
            onClick={() => setViewMode('kanban')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              viewMode === 'kanban'
                ? 'bg-gnu-navy text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Kanban className="h-4 w-4" />
            <span>칸반 보드 (태스크)</span>
          </button>
          <button
            onClick={() => setViewMode('deliverables')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
              viewMode === 'deliverables'
                ? 'bg-gnu-navy text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <FileCheck2 className="h-4 w-4" />
            <span>학사 산출물 & 제출 내역</span>
          </button>
        </div>
      </div>

      {/* Main View Area */}
      {viewMode === 'timeline' && (
        <GanttTimeline
          project={project}
          selectedMilestoneId={selectedMilestone?.id}
          onSelectMilestone={(m) => setSelectedMilestone(m)}
        />
      )}

      {viewMode === 'kanban' && (
        <KanbanBoard
          project={project}
          onUpdateTaskStatus={onUpdateTaskStatus}
          onAddTask={onAddTask}
        />
      )}

      {viewMode === 'deliverables' && (
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200/80 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                경상국립대 캡스톤 학기별 제출 산출물 목록
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                지도교수 검수 및 졸업/성적 평가를 위한 공식 보고서 및 코드 리포지토리 제출 현황
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {project.milestones.flatMap((m) =>
              m.deliverables.map((del) => (
                <div
                  key={del.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white transition-all"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-slate-200 px-2 py-0.5 text-[10px] font-bold text-slate-700">
                        {m.weekNumber}주차 마일스톤
                      </span>
                      <h4 className="text-xs font-bold text-slate-900">{del.title}</h4>
                      <span
                        className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${
                          del.status === 'APPROVED'
                            ? 'bg-emerald-100 text-emerald-800'
                            : del.status === 'SUBMITTED'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {del.status === 'APPROVED' ? '교수 승인 완료' : del.status === 'SUBMITTED' ? '심사 진행 중' : '미제출 (준비 중)'}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      연계 과제: {m.title}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {del.url ? (
                      <a
                        href={del.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                      >
                        <span>산출물 열람</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    ) : (
                      <button
                        onClick={() => alert(`[${del.title}] 산출물 업로드 창이 준비되었습니다.`)}
                        className="rounded-xl bg-gnu-navy px-3 py-1.5 text-xs font-bold text-white hover:bg-gnu-blue"
                      >
                        산출물 파일 등록
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* AI Roadmap Modal */}
      <AiRoadmapModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        projectTopic={project.title}
        projectCategory={project.category}
        onApplyRoadmap={(newMilestones) => {
          onUpdateMilestones(newMilestones);
        }}
      />
    </div>
  );
};
