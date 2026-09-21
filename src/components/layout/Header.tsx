import React, { useState } from 'react';
import { Sparkles, PlusCircle, Compass, ShieldCheck } from 'lucide-react';
import { StudentProfile } from '../../types';
import { ApiKeyModal } from '../common/ApiKeyModal';
import { getStoredGeminiKey } from '../../services/aiService';

interface HeaderProps {
  currentUser: StudentProfile;
  onOpenNewProject: () => void;
  onOpenProfile: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  onOpenNewProject,
  onOpenProfile,
}) => {
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(Boolean(getStoredGeminiKey()));

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo & GNU Identity */}
          <div className="flex items-center space-x-3.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gnu-navy text-white shadow-md shadow-gnu-navy/20">
              <Compass className="h-6 w-6 text-gnu-accent animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold tracking-tight text-slate-900 text-lg sm:text-xl">
                  GNU <span className="text-gnu-blue">PIONEERS</span>
                </span>
                <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[11px] font-bold text-gnu-blue">
                  개척 매칭
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 hidden sm:block">
                경상국립대학교 맞춤형 AI 팀 빌딩 & 마일스톤 관리
              </p>
            </div>
          </div>

          {/* Right Actions & Status */}
          <div className="flex items-center space-x-3">
            {/* AI Engine Status Button */}
            <button
              onClick={() => setIsApiKeyModalOpen(true)}
              className="flex items-center space-x-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-all"
              title="AI 모델 설정 변경"
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              <span>{hasApiKey ? 'Gemini 1.5 Live' : 'GNU 특화 AI (내장)'}</span>
            </button>

            {/* ALIO Mobile Prototype Link */}
            <a
              href="/"
              className="inline-flex items-center space-x-1.5 rounded-full border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-bold text-sky-700 hover:bg-sky-100 transition-all shadow-xs"
              title="ALIO 스타일 모바일 프로토타입 보기"
            >
              <span>📱 모바일 뷰</span>
            </a>

            {/* Semester Week Indicator */}
            <div className="hidden lg:flex items-center space-x-2 rounded-lg bg-blue-50/70 border border-blue-100 px-3 py-1.5 text-xs text-blue-900">
              <span className="h-2 w-2 rounded-full bg-blue-500 animate-ping" />
              <span className="font-semibold">2026-2학기 6주차 (중간평가 D-14)</span>
            </div>

            {/* New Project Button */}
            <button
              onClick={onOpenNewProject}
              className="inline-flex items-center space-x-1.5 rounded-xl bg-gnu-navy px-3.5 py-2 text-xs font-bold text-white shadow-sm hover:bg-gnu-blue transition-all"
            >
              <PlusCircle className="h-4 w-4" />
              <span className="hidden sm:inline">프로젝트 개설</span>
            </button>

            {/* Profile Avatar Button */}
            <button
              onClick={onOpenProfile}
              className="flex items-center space-x-2 rounded-xl p-1.5 hover:bg-slate-100 transition-all border border-slate-200/60"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="h-8 w-8 rounded-lg object-cover ring-2 ring-gnu-blue/30"
              />
              <div className="text-left hidden md:block pr-1">
                <div className="flex items-center space-x-1">
                  <span className="text-xs font-bold text-slate-800">{currentUser.name}</span>
                  <ShieldCheck className="h-3 w-3 text-gnu-blue" />
                </div>
                <span className="text-[10px] text-slate-500 block leading-tight">
                  {currentUser.campus.slice(0, 2)} · {currentUser.major}
                </span>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* API Key Modal */}
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        onKeyUpdated={() => setHasApiKey(Boolean(getStoredGeminiKey()))}
      />
    </>
  );
};
