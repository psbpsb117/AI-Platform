import React, { useState } from 'react';
import { Project, Task, RoleType } from '../../types';
import { RoleBadge } from '../common/Badge';
import { CheckCircle2, Clock, Plus, ArrowRight, ArrowLeft, AlertCircle } from 'lucide-react';
import { Modal } from '../common/Modal';
import { ROLE_LABELS } from '../../data/gnuConstants';

interface KanbanBoardProps {
  project: Project;
  onUpdateTaskStatus: (taskId: string, newStatus: Task['status']) => void;
  onAddTask: (task: Omit<Task, 'id'>) => void;
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({
  project,
  onUpdateTaskStatus,
  onAddTask,
}) => {
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newRole, setNewRole] = useState<RoleType>('Backend');
  const [newAssignee, setNewAssignee] = useState(project.leadStudent.name);
  const [newPriority, setNewPriority] = useState<Task['priority']>('HIGH');
  const [newMilestoneId, setNewMilestoneId] = useState(
    project.milestones[0]?.id || 'ms-1'
  );

  // Flatten all tasks from milestones
  const allTasks: { task: Task; milestoneWeek: number }[] = [];
  project.milestones.forEach((m) => {
    m.tasks.forEach((t) => {
      allTasks.push({ task: t, milestoneWeek: m.weekNumber });
    });
  });

  const columns: { id: Task['status']; title: string; color: string; bg: string }[] = [
    { id: 'TODO', title: '할 일 (To Do)', color: 'text-slate-700', bg: 'bg-slate-100' },
    { id: 'IN_PROGRESS', title: '진행 중 (In Progress)', color: 'text-blue-700', bg: 'bg-blue-100' },
    { id: 'DONE', title: '완료됨 (Completed)', color: 'text-emerald-700', bg: 'bg-emerald-100' },
  ];

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    onAddTask({
      milestoneId: newMilestoneId,
      title: newTitle.trim(),
      assigneeName: newAssignee,
      role: newRole,
      status: 'TODO',
      priority: newPriority,
      dueDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
    });

    setNewTitle('');
    setIsAddTaskModalOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-900">
            캡스톤 실무 칸반 보드 (Kanban)
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            전체 마일스톤의 세부 개발 과제를 드래그 또는 버튼으로 간편하게 상태 변경합니다.
          </p>
        </div>
        <button
          onClick={() => setIsAddTaskModalOpen(true)}
          className="inline-flex items-center gap-1.5 rounded-xl bg-gnu-navy px-3.5 py-1.5 text-xs font-bold text-white hover:bg-gnu-blue transition-colors"
        >
          <Plus className="h-3.5 w-3.5" />
          태스크 추가
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {columns.map((col) => {
          const tasksInCol = allTasks.filter((item) => item.task.status === col.id);

          return (
            <div
              key={col.id}
              className="flex flex-col rounded-2xl bg-slate-100/70 border border-slate-200/80 p-3.5"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-200">
                <div className="flex items-center space-x-2">
                  <span className={`h-2.5 w-2.5 rounded-full ${col.id === 'DONE' ? 'bg-emerald-500' : col.id === 'IN_PROGRESS' ? 'bg-blue-500' : 'bg-slate-400'}`} />
                  <span className="text-xs font-bold text-slate-800">{col.title}</span>
                </div>
                <span className="rounded-full bg-white px-2 py-0.5 text-xs font-bold text-slate-600 shadow-sm">
                  {tasksInCol.length}
                </span>
              </div>

              {/* Tasks List */}
              <div className="space-y-3 flex-1 min-h-[350px]">
                {tasksInCol.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-center p-6 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 text-xs">
                    과제가 없습니다
                  </div>
                ) : (
                  tasksInCol.map(({ task, milestoneWeek }) => (
                    <div
                      key={task.id}
                      className="group relative rounded-xl bg-white p-3.5 shadow-sm border border-slate-200/80 hover:border-slate-300 hover:shadow-md transition-all"
                    >
                      <div className="flex items-center justify-between gap-1 mb-2">
                        <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[9px] font-bold text-slate-600">
                          W{milestoneWeek}주차
                        </span>
                        <RoleBadge role={task.role} size="sm" />
                      </div>

                      <h5 className="text-xs font-bold text-slate-900 mb-2 leading-snug">
                        {task.title}
                      </h5>

                      <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                        <div className="flex items-center space-x-1.5">
                          <span className="h-5 w-5 rounded-full bg-gnu-navy text-white text-[10px] font-bold flex items-center justify-center">
                            {task.assigneeName?.slice(0, 1) || '김'}
                          </span>
                          <span className="text-xs font-medium text-slate-700">
                            {task.assigneeName}
                          </span>
                        </div>

                        {/* Priority Badge */}
                        <span
                          className={`rounded px-1.5 py-0.2 text-[9px] font-bold ${
                            task.priority === 'HIGH'
                              ? 'bg-rose-100 text-rose-700'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {task.priority === 'HIGH' ? '높음' : '보통'}
                        </span>
                      </div>

                      {/* Status Transition buttons */}
                      <div className="mt-3 flex items-center justify-end space-x-1 pt-1 border-t border-slate-50">
                        {col.id !== 'TODO' && (
                          <button
                            title="이전 단계로 이동"
                            onClick={() =>
                              onUpdateTaskStatus(
                                task.id,
                                col.id === 'DONE' ? 'IN_PROGRESS' : 'TODO'
                              )
                            }
                            className="p-1 rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-600 text-[10px] flex items-center gap-0.5"
                          >
                            <ArrowLeft className="h-3 w-3" />
                            <span>이전</span>
                          </button>
                        )}
                        {col.id !== 'DONE' && (
                          <button
                            title="다음 단계로 이동"
                            onClick={() =>
                              onUpdateTaskStatus(
                                task.id,
                                col.id === 'TODO' ? 'IN_PROGRESS' : 'DONE'
                              )
                            }
                            className="p-1 rounded-md bg-blue-50 text-gnu-blue hover:bg-blue-100 text-[10px] font-bold flex items-center gap-0.5"
                          >
                            <span>다음</span>
                            <ArrowRight className="h-3 w-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Task Modal */}
      <Modal
        isOpen={isAddTaskModalOpen}
        onClose={() => setIsAddTaskModalOpen(false)}
        title="새 캡스톤 태스크 생성"
        subtitle="마일스톤 목표 달성을 위한 세부 개발 과제를 등록합니다."
        maxWidth="md"
      >
        <form onSubmit={handleCreateTask} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">
              태스크명
            </label>
            <input
              type="text"
              required
              placeholder="예: 백엔드 JWT 인증 필터 및 권한 인가 로직 구현"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs focus:border-gnu-blue focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">
                해당 마일스톤
              </label>
              <select
                value={newMilestoneId}
                onChange={(e) => setNewMilestoneId(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:border-gnu-blue focus:outline-none"
              >
                {project.milestones.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.weekNumber}주차: {m.title.slice(0, 15)}...
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">
                담당 역할 (Role)
              </label>
              <select
                value={newRole}
                onChange={(e) => setNewRole(e.target.value as RoleType)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:border-gnu-blue focus:outline-none"
              >
                {(Object.keys(ROLE_LABELS) as RoleType[]).map((r) => (
                  <option key={r} value={r}>
                    {ROLE_LABELS[r].label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">
                담당자
              </label>
              <select
                value={newAssignee}
                onChange={(e) => setNewAssignee(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:border-gnu-blue focus:outline-none"
              >
                {project.teamMembers.map((m, idx) => (
                  <option key={idx} value={m.student.name}>
                    {m.student.name} ({m.role})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">
                우선순위
              </label>
              <select
                value={newPriority}
                onChange={(e) => setNewPriority(e.target.value as Task['priority'])}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:border-gnu-blue focus:outline-none"
              >
                <option value="HIGH">높음 (High)</option>
                <option value="MEDIUM">보통 (Medium)</option>
                <option value="LOW">낮음 (Low)</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsAddTaskModalOpen(false)}
              className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100"
            >
              취소
            </button>
            <button
              type="submit"
              className="rounded-xl bg-gnu-navy px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-gnu-blue"
            >
              태스크 등록
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
