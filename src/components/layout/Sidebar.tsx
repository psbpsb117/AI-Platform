import React from 'react';
import { 
  FolderKanban, 
  Users, 
  Milestone as MilestoneIcon, 
  GraduationCap, 
  UserCircle2, 
  Building2, 
  ExternalLink,
  Sparkles
} from 'lucide-react';

export type ActiveTab = 'projects' | 'teambuilding' | 'milestones' | 'advisor' | 'myprofile';

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  applicantCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  applicantCount
}) => {
  const navItems = [
    {
      id: 'projects' as ActiveTab,
      label: '교내 프로젝트 탐색',
      icon: FolderKanban,
      badge: 'GNU 전체',
    },
    {
      id: 'teambuilding' as ActiveTab,
      label: 'AI 팀 빌딩 & 매칭',
      icon: Users,
      badge: applicantCount > 0 ? `${applicantCount}명 지원` : undefined,
      badgeColor: 'bg-rose-500 text-white',
      highlight: true
    },
    {
      id: 'milestones' as ActiveTab,
      label: '마일스톤 & 로드맵',
      icon: MilestoneIcon,
      badge: '16주 캡스톤',
    },
    {
      id: 'advisor' as ActiveTab,
      label: '지도교수 멘토링 & 평가',
      icon: GraduationCap,
      badge: '승인/피드백',
    },
    {
      id: 'myprofile' as ActiveTab,
      label: '내 개척 프로필 (역량)',
      icon: UserCircle2,
    },
  ];

  return (
    <aside className="w-full md:w-64 bg-white border-r border-slate-200/80 p-4 flex flex-col justify-between shrink-0">
      <div className="space-y-6">
        {/* Navigation list */}
        <div>
          <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
            플랫폼 메뉴
          </p>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`group flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-gnu-navy text-white shadow-sm shadow-gnu-navy/30'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`h-4 w-4 ${isActive ? 'text-gnu-accent' : 'text-slate-400 group-hover:text-slate-600'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        item.badgeColor
                          ? item.badgeColor
                          : isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* AI Co-Pilot Info Card */}
        <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50/50 p-4 border border-blue-100">
          <div className="flex items-center space-x-2 text-gnu-blue font-bold text-xs mb-1.5">
            <Sparkles className="h-3.5 w-3.5" />
            <span>GNU Pioneer Matcher</span>
          </div>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            가좌-칠암-통영 캠퍼스 학생들의 전공 스택과 캡스톤 요구역량을 AI가 실시간 분석하여 팀 시너지 점수를 계산합니다.
          </p>
        </div>
      </div>

      {/* Footer / GNU Official Portal Links */}
      <div className="pt-4 border-t border-slate-100 space-y-2">
        <div className="flex items-center space-x-2 text-[11px] font-semibold text-slate-500 px-2">
          <Building2 className="h-3.5 w-3.5" />
          <span>경상국립대 바로가기</span>
        </div>
        <div className="space-y-1 text-[11px] text-slate-500">
          <a
            href="https://www.gnu.ac.kr"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between rounded-lg px-2.5 py-1.5 hover:bg-slate-100 hover:text-gnu-blue transition-colors"
          >
            <span>GNU 공식 포털</span>
            <ExternalLink className="h-3 w-3" />
          </a>
          <a
            href="https://swedu.gnu.ac.kr"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between rounded-lg px-2.5 py-1.5 hover:bg-slate-100 hover:text-gnu-blue transition-colors"
          >
            <span>SW중심대학 사업단</span>
            <ExternalLink className="h-3 w-3" />
          </a>
          <a
            href="https://lib.gnu.ac.kr"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between rounded-lg px-2.5 py-1.5 hover:bg-slate-100 hover:text-gnu-blue transition-colors"
          >
            <span>도서관 스터디룸 예약</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </aside>
  );
};
