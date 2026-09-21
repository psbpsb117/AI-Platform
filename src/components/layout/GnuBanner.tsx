import React from 'react';
import { Rocket, Award, Users, CheckCircle } from 'lucide-react';

export const GnuBanner: React.FC<{ onExploreClick: () => void }> = ({ onExploreClick }) => {
  return (
    <div className="relative overflow-hidden rounded-3xl gradient-gnu-hero text-white p-6 sm:p-8 shadow-xl shadow-gnu-navy/15 mb-8">
      {/* Background Decorative Rings */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
      <div className="pointer-events-none absolute -left-16 -bottom-16 h-72 w-72 rounded-full bg-gnu-accent/20 blur-3xl" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center space-x-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur-md border border-white/20">
            <span className="flex h-2 w-2 rounded-full bg-gnu-accent animate-pulse" />
            <span>글로컬대학30 선정 · SW중심대학사업단 연계 플랫폼</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-snug">
            미래를 개척하는 GNU,<br />
            <span className="text-gnu-accent">AI 기반 융합 팀 빌딩</span>과 <span className="text-amber-300">16주 캡스톤 마일스톤</span>
          </h1>

          <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed">
            가좌·칠암·통영·창원산학 캠퍼스의 경계를 넘어 우주항공, IT공학, 스마트농생명, 인문사회 융합 인재를 AI 시너지 분석으로 즉시 매칭하고, 16주 완성형 산출물 로드맵을 체계적으로 완주하세요.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-medium text-blue-100">
            <div className="flex items-center gap-1.5">
              <CheckCircle className="h-4 w-4 text-gnu-accent" />
              <span>GNU 웹메일(@gnu.ac.kr) 기반 실명 인증</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Rocket className="h-4 w-4 text-amber-300" />
              <span>우주항공청(KASA)·방산 산학 과제</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Award className="h-4 w-4 text-emerald-300" />
              <span>정규 캡스톤 1·2 학점 연계</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
          <button
            onClick={onExploreClick}
            className="inline-flex items-center justify-center space-x-2 rounded-2xl bg-white px-5 py-3 text-xs font-bold text-gnu-navy shadow-lg hover:bg-blue-50 transition-all active:scale-95"
          >
            <Users className="h-4 w-4 text-gnu-blue" />
            <span>팀원 구인 프로젝트 둘러보기</span>
          </button>
        </div>
      </div>
    </div>
  );
};
