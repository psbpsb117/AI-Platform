import React from 'react';
import { GnuCampus, ProjectCategory, RoleType } from '../../types';
import { PROJECT_CATEGORY_LABELS, ROLE_LABELS } from '../../data/gnuConstants';

interface CampusBadgeProps {
  campus: GnuCampus;
  size?: 'sm' | 'md';
}

export const CampusBadge: React.FC<CampusBadgeProps> = ({ campus, size = 'sm' }) => {
  const getBadgeStyle = () => {
    switch (campus) {
      case '가좌(본원)':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case '칠암':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case '통영':
        return 'bg-sky-50 text-sky-700 border-sky-200';
      case '창원산학':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const sz = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-sm';

  return (
    <span className={`inline-flex items-center font-medium rounded-md border ${sz} ${getBadgeStyle()}`}>
      📍 {campus}
    </span>
  );
};

export const CategoryBadge: React.FC<{ category: ProjectCategory; size?: 'sm' | 'md' }> = ({ category, size = 'sm' }) => {
  const info = PROJECT_CATEGORY_LABELS[category] || { name: category, tagColor: 'bg-slate-100 text-slate-700 border-slate-200' };
  const sz = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-sm';
  return (
    <span className={`inline-flex items-center font-semibold rounded-md border ${sz} ${info.tagColor}`}>
      {info.name}
    </span>
  );
};

export const RoleBadge: React.FC<{ role: RoleType; size?: 'sm' | 'md' }> = ({ role, size = 'sm' }) => {
  const info = ROLE_LABELS[role] || { label: role, color: 'text-slate-700', bg: 'bg-slate-100' };
  const sz = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-sm';
  return (
    <span className={`inline-flex items-center font-medium rounded-full ${sz} ${info.bg} ${info.color}`}>
      {info.label}
    </span>
  );
};
