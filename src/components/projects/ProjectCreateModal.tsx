import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { GnuCampus, GnuCollege, ProjectCategory, RoleType, Project } from '../../types';
import { GNU_CAMPUSES, GNU_COLLEGES_MAP, PROJECT_CATEGORY_LABELS, ROLE_LABELS } from '../../data/gnuConstants';
import { PlusCircle, Sparkles } from 'lucide-react';
import { CURRENT_USER } from '../../data/mockData';

interface ProjectCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateProject: (project: Project) => void;
}

export const ProjectCreateModal: React.FC<ProjectCreateModalProps> = ({
  isOpen,
  onClose,
  onCreateProject,
}) => {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<ProjectCategory>('CAPSTONE');
  const [campus, setCampus] = useState<GnuCampus>('가좌(본원)');
  const [college, setCollege] = useState<GnuCollege>('IT공과대학');
  const [department, setDepartment] = useState('컴퓨터공학부');
  const [advisorName, setAdvisorName] = useState('이항공 교수');
  const [tags, setTags] = useState('React, FastAPI, AI');

  const handleCollegeChange = (newCollege: GnuCollege) => {
    setCollege(newCollege);
    setDepartment(GNU_COLLEGES_MAP[newCollege]?.[0] || '');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !summary.trim()) return;

    const newProject: Project = {
      id: `gnu-proj-${Date.now()}`,
      title: title.trim(),
      summary: summary.trim(),
      description: description.trim() || summary.trim(),
      category,
      campus,
      department: `${college} ${department}`,
      leadStudent: CURRENT_USER,
      teamMembers: [
        {
          student: CURRENT_USER,
          role: 'Backend',
          joinedAt: new Date().toISOString().split('T')[0],
        },
      ],
      recruitRoles: [
        {
          role: 'Frontend',
          count: 1,
          currentCount: 0,
          requiredSkills: ['React', 'TypeScript'],
          description: '프론트엔드 인터페이스 개발을 담당할 열정적인 팀원을 찾습니다.',
        },
        {
          role: 'UI/UX Design',
          count: 1,
          currentCount: 0,
          requiredSkills: ['Figma'],
          description: '와이어프레임 및 디자인 시스템 구축 전담.',
        },
      ],
      currentWeek: 1,
      totalWeeks: 16,
      advisorName,
      advisorDepartment: college,
      advisorFeedbacks: [],
      milestones: [],
      status: 'RECRUITING',
      tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
      createdAt: new Date().toISOString().split('T')[0],
    };

    onCreateProject(newProject);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="새 경상국립대 프로젝트 / 캡스톤 개설"
      subtitle="교내 캡스톤디자인, SW중심대학 해커톤, 글로컬30 과제를 등록하고 팀원을 모집합니다."
      maxWidth="2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
            과제 분류
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {(Object.keys(PROJECT_CATEGORY_LABELS) as ProjectCategory[]).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`p-2.5 rounded-xl text-left border transition-all ${
                  category === cat
                    ? 'border-gnu-blue bg-blue-50/80 text-gnu-blue ring-2 ring-gnu-blue/20'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span className="text-xs font-bold block">{PROJECT_CATEGORY_LABELS[cat].name}</span>
                <span className="text-[10px] text-slate-500 block truncate">
                  {PROJECT_CATEGORY_LABELS[cat].description.slice(0, 20)}...
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">
              소속 캠퍼스
            </label>
            <select
              value={campus}
              onChange={(e) => setCampus(e.target.value as GnuCampus)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:border-gnu-blue focus:outline-none"
            >
              {GNU_CAMPUSES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">
              단과대학
            </label>
            <select
              value={college}
              onChange={(e) => handleCollegeChange(e.target.value as GnuCollege)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:border-gnu-blue focus:outline-none"
            >
              {(Object.keys(GNU_COLLEGES_MAP) as GnuCollege[]).map((col) => (
                <option key={col} value={col}>
                  {col}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">
              학과 / 전공
            </label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:border-gnu-blue focus:outline-none"
            >
              {(GNU_COLLEGES_MAP[college] || []).map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-600 mb-1">
            프로젝트 제목
          </label>
          <input
            type="text"
            required
            placeholder="예: 글로컬30 연계 사천 KAI 항공정비 스마트 비전 AI 시스템"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs focus:border-gnu-blue focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-600 mb-1">
            프로젝트 한 줄 요약
          </label>
          <input
            type="text"
            required
            placeholder="예: 드론과 지상 카메라를 활용한 격납고 항공기 외피 결함 실시간 검출"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs focus:border-gnu-blue focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">
              지도교수명 (캡스톤/연구실)
            </label>
            <input
              type="text"
              placeholder="예: 홍길동 교수"
              value={advisorName}
              onChange={(e) => setAdvisorName(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs focus:border-gnu-blue focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">
              주요 기술 태그 (쉼표로 구분)
            </label>
            <input
              type="text"
              placeholder="React, PyTorch, ROS2, FastAPI"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-xs focus:border-gnu-blue focus:outline-none"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100"
          >
            취소
          </button>
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 rounded-xl bg-gnu-navy px-5 py-2 text-xs font-bold text-white shadow-md hover:bg-gnu-blue"
          >
            <PlusCircle className="h-4 w-4" />
            <span>프로젝트 생성 및 AI 매칭 활성화</span>
          </button>
        </div>
      </form>
    </Modal>
  );
};
