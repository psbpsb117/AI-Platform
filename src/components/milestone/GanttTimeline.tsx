import React from 'react';
import { Milestone, Project } from '../../types';
import { CheckCircle2, Clock, Calendar, AlertCircle, FileText, Video, Github } from 'lucide-react';

interface GanttTimelineProps {
  project: Project;
  onSelectMilestone: (milestone: Milestone) => void;
  selectedMilestoneId?: string;
}

export const GanttTimeline: React.FC<GanttTimelineProps> = ({
  project,
  onSelectMilestone,
  selectedMilestoneId,
}) => {
  const currentWeek = project.currentWeek || 6;
  const totalWeeks = project.totalWeeks || 16;
  const weeks = Array.from({ length: totalWeeks }, (_, i) => i + 1);

  const getStatusColor = (status: Milestone['status']) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-emerald-500 text-white';
      case 'IN_PROGRESS':
        return 'bg-gnu-blue text-white ring-2 ring-blue-300';
      case 'REVIEW_REQUESTED':
        return 'bg-purple-500 text-white';
      case 'PENDING':
      default:
        return 'bg-slate-200 text-slate-700';
    }
  };

  const getDeliverableIcon = (type: string) => {
    switch (type) {
      case 'DEMO_VIDEO':
        return <Video className="h-3 w-3 text-rose-500" />;
      case 'GITHUB':
        return <Github className="h-3 w-3 text-slate-800" />;
      case 'REPORT':
      case 'DOCUMENT':
      default:
        return <FileText className="h-3 w-3 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* 16-week timeline header */}
      <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-200/80 overflow-x-auto">
        <div className="min-w-[760px]">
          {/* Header row */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-gnu-blue" />
              <span className="text-xs font-bold text-slate-900">
                경상국립대 16주 학사 캡스톤 타임라인 (현재 {currentWeek}주차)
              </span>
            </div>
            <div className="flex items-center space-x-4 text-xs">
              <span className="flex items-center gap-1 text-emerald-600 font-medium">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" /> 완료
              </span>
              <span className="flex items-center gap-1 text-gnu-blue font-medium">
                <span className="h-2.5 w-2.5 rounded-full bg-gnu-blue" /> 진행 중
              </span>
              <span className="flex items-center gap-1 text-slate-500 font-medium">
                <span className="h-2.5 w-2.5 rounded-full bg-slate-300" /> 예정
              </span>
            </div>
          </div>

          {/* Week columns bar */}
          <div className="grid grid-cols-16 gap-1 text-center mb-3">
            {weeks.map((w) => {
              const isCurrent = w === currentWeek;
              const isPast = w < currentWeek;

              return (
                <div
                  key={w}
                  className={`py-1.5 px-0.5 rounded-lg text-[10px] font-bold transition-all relative ${
                    isCurrent
                      ? 'bg-gnu-navy text-white shadow-md'
                      : isPast
                      ? 'bg-blue-50 text-blue-900'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  <span>W{w}</span>
                  {isCurrent && (
                    <span className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full bg-rose-500 px-1 text-[8px] text-white">
                      현재
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Milestone Bars */}
          <div className="space-y-3 pt-2">
            {project.milestones.map((milestone) => {
              const isSelected = selectedMilestoneId === milestone.id;
              const isCompleted = milestone.status === 'COMPLETED';
              const isInProgress = milestone.status === 'IN_PROGRESS';

              return (
                <div
                  key={milestone.id}
                  onClick={() => onSelectMilestone(milestone)}
                  className={`cursor-pointer rounded-xl p-3.5 border transition-all ${
                    isSelected
                      ? 'border-gnu-blue bg-blue-50/40 shadow-sm ring-1 ring-gnu-blue'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${getStatusColor(milestone.status)}`}>
                        {milestone.weekNumber}주차
                      </span>
                      <h4 className="text-xs font-bold text-slate-900">{milestone.title}</h4>
                      {isCompleted && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />}
                      {isInProgress && (
                        <span className="rounded-full bg-blue-100 px-1.5 py-0.2 text-[9px] font-bold text-gnu-blue animate-pulse">
                          진행 중
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-400 font-mono">
                      기한: {milestone.dueDate}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-600 line-clamp-1 mb-2">
                    {milestone.description}
                  </p>

                  {/* Tasks & Deliverables mini chips */}
                  <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100 text-[10px]">
                    <span className="text-slate-400 font-medium">
                      태스크: {milestone.tasks.filter((t) => t.status === 'DONE').length}/{milestone.tasks.length} 완료
                    </span>
                    {milestone.deliverables.map((del) => (
                      <span
                        key={del.id}
                        className={`inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 border ${
                          del.status === 'APPROVED'
                            ? 'border-emerald-200 bg-emerald-50 text-emerald-800 font-medium'
                            : 'border-slate-200 bg-slate-50 text-slate-600'
                        }`}
                      >
                        {getDeliverableIcon(del.type)}
                        <span>{del.title}</span>
                        {del.status === 'APPROVED' && '✓'}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
