import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { RecruitRole, RoleType } from '../../types';
import { ROLE_LABELS, DEFAULT_GNU_TECH_STACKS } from '../../data/gnuConstants';
import { UserPlus, Plus, X } from 'lucide-react';

interface RecruitPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddRole: (role: RecruitRole) => void;
}

export const RecruitPostModal: React.FC<RecruitPostModalProps> = ({
  isOpen,
  onClose,
  onAddRole,
}) => {
  const [selectedRole, setSelectedRole] = useState<RoleType>('Frontend');
  const [count, setCount] = useState(1);
  const [description, setDescription] = useState('');
  const [customSkill, setCustomSkill] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>(['React', 'TypeScript']);

  const handleToggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleAddCustomSkill = () => {
    if (customSkill.trim() && !selectedSkills.includes(customSkill.trim())) {
      setSelectedSkills([...selectedSkills, customSkill.trim()]);
      setCustomSkill('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    onAddRole({
      role: selectedRole,
      count,
      currentCount: 0,
      requiredSkills: selectedSkills,
      description: description.trim(),
    });

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="새 팀원 모집 포지션 등록"
      subtitle="GNU 캡스톤 프로젝트에 필요한 역할과 역량을 등록하여 AI 매칭을 시작합니다."
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
            모집 포지션 선택
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {(Object.keys(ROLE_LABELS) as RoleType[]).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setSelectedRole(r)}
                className={`p-2.5 rounded-xl text-xs font-semibold text-center border transition-all ${
                  selectedRole === r
                    ? 'border-gnu-blue bg-blue-50 text-gnu-blue ring-2 ring-gnu-blue/20'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {ROLE_LABELS[r].label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-1/3">
            <label className="block text-xs font-bold text-slate-600 mb-1">
              모집 인원 (명)
            </label>
            <input
              type="number"
              min={1}
              max={5}
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value) || 1)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm focus:border-gnu-blue focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-600 mb-1.5">
            필요 기술 스택 (AI 매칭 키워드)
          </label>
          <div className="flex flex-wrap gap-1.5 mb-2 max-h-32 overflow-y-auto p-1">
            {DEFAULT_GNU_TECH_STACKS.map((stk) => {
              const isSelected = selectedSkills.includes(stk);
              return (
                <button
                  key={stk}
                  type="button"
                  onClick={() => handleToggleSkill(stk)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all ${
                    isSelected
                      ? 'bg-gnu-navy text-white border-gnu-navy'
                      : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                  }`}
                >
                  {stk} {isSelected && '✓'}
                </button>
              );
            })}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="스택 직접 입력 (예: Next.js, ROS2)"
              value={customSkill}
              onChange={(e) => setCustomSkill(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddCustomSkill();
                }
              }}
              className="flex-1 rounded-xl border border-slate-200 px-3 py-1.5 text-xs focus:border-gnu-blue focus:outline-none"
            />
            <button
              type="button"
              onClick={handleAddCustomSkill}
              className="rounded-xl bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200"
            >
              추가
            </button>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-600 mb-1">
            담당 업무 및 지원자 우대사항
          </label>
          <textarea
            rows={3}
            required
            placeholder="예: 실시간 관제 대시보드 및 지형도 렌더링 프론트엔드 구축. 가좌캠퍼스 중앙도서관 대면 회의 주 1회 가능자 우대."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-xl border border-slate-200 p-3 text-xs focus:border-gnu-blue focus:outline-none"
          />
        </div>

        <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100"
          >
            취소
          </button>
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 rounded-xl bg-gnu-navy px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-gnu-blue"
          >
            <UserPlus className="h-3.5 w-3.5" />
            모집 공고 등록
          </button>
        </div>
      </form>
    </Modal>
  );
};
