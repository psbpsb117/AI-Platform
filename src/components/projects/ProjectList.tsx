import React, { useState } from 'react';
import { Project, ProjectCategory, GnuCampus } from '../../types';
import { CampusBadge, CategoryBadge, RoleBadge } from '../common/Badge';
import { Search, Filter, Users, ArrowRight, Sparkles, PlusCircle } from 'lucide-react';
import { PROJECT_CATEGORY_LABELS, GNU_CAMPUSES } from '../../data/gnuConstants';

interface ProjectListProps {
  projects: Project[];
  onSelectProject: (projectId: string) => void;
  onOpenNewProject: () => void;
}

export const ProjectList: React.FC<ProjectListProps> = ({
  projects,
  onSelectProject,
  onOpenNewProject,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCampus, setSelectedCampus] = useState<string>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const filteredProjects = projects.filter((proj) => {
    const matchesSearch =
      proj.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proj.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proj.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCampus = selectedCampus === 'ALL' || proj.campus === selectedCampus;
    const matchesCategory = selectedCategory === 'ALL' || proj.category === selectedCategory;

    return matchesSearch && matchesCampus && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Search & Filter Toolbar */}
      <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-200/80 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-96">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="프로젝트명, 기술 태그 (React, UAM, 드론 등) 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-slate-200 pl-10 pr-4 py-2.5 text-xs focus:border-gnu-blue focus:outline-none focus:ring-2 focus:ring-gnu-blue/20"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={onOpenNewProject}
              className="inline-flex items-center gap-1.5 rounded-xl bg-gnu-navy px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-gnu-blue transition-colors"
            >
              <PlusCircle className="h-4 w-4" />
              <span>프로젝트 개설</span>
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center gap-4 text-xs">
          {/* Campus filter */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-slate-400 font-bold shrink-0">캠퍼스:</span>
            <button
              onClick={() => setSelectedCampus('ALL')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                selectedCampus === 'ALL'
                  ? 'bg-gnu-navy text-white font-bold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              전체
            </button>
            {GNU_CAMPUSES.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCampus(c.id)}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                  selectedCampus === c.id
                    ? 'bg-gnu-navy text-white font-bold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {c.id}
              </button>
            ))}
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-slate-400 font-bold shrink-0">과제 분류:</span>
            <button
              onClick={() => setSelectedCategory('ALL')}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                selectedCategory === 'ALL'
                  ? 'bg-gnu-navy text-white font-bold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              전체
            </button>
            {(Object.keys(PROJECT_CATEGORY_LABELS) as ProjectCategory[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-gnu-navy text-white font-bold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {PROJECT_CATEGORY_LABELS[cat].name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            onClick={() => onSelectProject(project.id)}
            className="group flex flex-col justify-between rounded-3xl bg-white p-5 sm:p-6 shadow-sm border border-slate-200/80 hover:border-blue-300 hover:shadow-xl transition-all cursor-pointer"
          >
            <div className="space-y-3">
              {/* Badges */}
              <div className="flex items-center justify-between gap-2">
                <CategoryBadge category={project.category} size="sm" />
                <CampusBadge campus={project.campus} size="sm" />
              </div>

              {/* Title & summary */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-gnu-blue transition-colors line-clamp-2 leading-snug">
                  {project.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                  {project.summary}
                </p>
              </div>

              {/* Department & Advisor */}
              <div className="text-[11px] text-slate-400">
                <span>{project.department}</span>
                {project.advisorName && (
                  <span className="ml-2 font-medium text-slate-500">
                    · 지도: {project.advisorName}
                  </span>
                )}
              </div>

              {/* Open Recruitment Roles */}
              {project.recruitRoles.length > 0 && (
                <div className="p-3 rounded-2xl bg-blue-50/50 border border-blue-100">
                  <span className="text-[10px] font-bold text-gnu-blue uppercase tracking-wider block mb-1.5">
                    구인 중인 포지션
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.recruitRoles.map((roleInfo, idx) => (
                      <RoleBadge key={idx} role={roleInfo.role} size="sm" />
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {project.tags.slice(0, 3).map((tag, idx) => (
                  <span
                    key={idx}
                    className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-600"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Meta */}
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
              {/* Member avatars */}
              <div className="flex items-center -space-x-2">
                {project.teamMembers.map((m, idx) => (
                  <img
                    key={idx}
                    src={m.student.avatar}
                    alt={m.student.name}
                    title={`${m.student.name} (${m.role})`}
                    className="h-7 w-7 rounded-full object-cover ring-2 ring-white"
                  />
                ))}
                <span className="pl-3 text-[11px] font-semibold text-slate-500">
                  {project.teamMembers.length}명 활동 중
                </span>
              </div>

              <span className="text-xs font-bold text-gnu-blue group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                상세보기
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
