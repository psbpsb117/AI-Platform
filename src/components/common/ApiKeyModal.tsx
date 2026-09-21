import React, { useState } from 'react';
import { Modal } from './Modal';
import { Key, Sparkles, CheckCircle2, ShieldCheck, Cpu } from 'lucide-react';
import { getStoredGeminiKey, setStoredGeminiKey } from '../../services/aiService';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onKeyUpdated: () => void;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onClose, onKeyUpdated }) => {
  const [apiKey, setApiKey] = useState(getStoredGeminiKey());
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    setStoredGeminiKey(apiKey.trim());
    setSavedSuccess(true);
    onKeyUpdated();
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 900);
  };

  const handleClear = () => {
    setApiKey('');
    setStoredGeminiKey('');
    onKeyUpdated();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="GNU AI 엔진 설정 (Gemini API & 오프라인 엔진)"
      subtitle="Google Gemini 1.5 Flash 실시간 API 또는 경상국립대 내장 휴리스틱 AI 엔진을 선택할 수 있습니다."
      maxWidth="lg"
    >
      <div className="space-y-5">
        <div className="rounded-xl bg-blue-50 border border-blue-200 p-4">
          <div className="flex items-start space-x-3">
            <Sparkles className="h-5 w-5 text-gnu-blue mt-0.5 shrink-0" />
            <div className="text-xs text-blue-900 leading-relaxed">
              <p className="font-semibold text-sm mb-1">듀얼 AI 모드 지원</p>
              <ul className="list-disc list-inside space-y-1 text-blue-800">
                <li><span className="font-medium">기본 모드:</span> API 키 없이도 <strong>경상국립대 16주 캡스톤 템플릿 및 캠퍼스 최적화 휴리스틱 AI 엔진</strong>이 즉시 100% 정상 구동됩니다.</li>
                <li><span className="font-medium">실시간 Gemini 모드:</span> API Key를 입력하시면 Google Gemini 1.5 Flash 모델이 프로젝트 기획서와 지원자 자소서를 실시간 분석합니다.</li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Google AI Studio API Key (선택사항)
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
              <Key className="h-4 w-4" />
            </div>
            <input
              type="password"
              placeholder="AIzaSy..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full rounded-xl border border-slate-200 pl-10 pr-4 py-2.5 text-sm focus:border-gnu-blue focus:outline-none focus:ring-2 focus:ring-gnu-blue/20"
            />
          </div>
          <p className="text-[11px] text-slate-400 mt-1.5 flex items-center gap-1">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
            API 키는 외부 서버로 전송되지 않고 브라우저 LocalStorage에만 안전하게 저장됩니다.
          </p>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={handleClear}
            className="text-xs font-medium text-slate-500 hover:text-rose-600 transition-colors"
          >
            기본 내장 엔진 사용 (초기화)
          </button>
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 transition-colors"
            >
              닫기
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center gap-1.5 rounded-xl bg-gnu-navy px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-gnu-blue transition-colors"
            >
              {savedSuccess ? (
                <>
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-300" />
                  저장 완료!
                </>
              ) : (
                <>
                  <Cpu className="h-3.5 w-3.5" />
                  설정 적용
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
