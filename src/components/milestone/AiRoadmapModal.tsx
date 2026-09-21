import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Sparkles, Loader2, Calendar, Target, CheckCircle2 } from 'lucide-react';
import { generateAiRoadmap } from '../../services/aiService';
import { Milestone } from '../../types';

interface AiRoadmapModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectTopic: string;
  projectCategory: string;
  onApplyRoadmap: (milestones: Milestone[]) => void;
}

export const AiRoadmapModal: React.FC<AiRoadmapModalProps> = ({
  isOpen,
  onClose,
  projectTopic,
  projectCategory,
  onApplyRoadmap,
}) => {
  const [topic, setTopic] = useState(projectTopic || '');
  const [weeks, setWeeks] = useState(16);
  const [loading, setLoading] = useState(false);
  const [previewMilestones, setPreviewMilestones] = useState<Milestone[] | null>(null);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    try {
      const generated = await generateAiRoadmap(topic, projectCategory, weeks);
      setPreviewMilestones(generated);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = () => {
    if (previewMilestones) {
      onApplyRoadmap(previewMilestones);
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="GNU AI 16주 캡스톤 마일스톤 자동 생성기"
      subtitle="프로젝트 주제를 바탕으로 경상국립대 학사일정에 최적화된 주차별 마일스톤과 세부 태스크를 자동 수립합니다."
      maxWidth="3xl"
    >
      <div className="space-y-5">
        {!previewMilestones ? (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                프로젝트 핵심 과제명 및 개발 목표
              </label>
              <textarea
                rows={3}
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="예: 경상국립대 캠퍼스 라이프 올인원 셔틀·학식 큐레이션 AI 웹 플랫폼 개발"
                className="w-full rounded-xl border border-slate-200 p-3 text-xs focus:border-gnu-blue focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  프로젝트 학기 기간
                </label>
                <div className="flex items-center gap-2">
                  {[8, 12, 16].map((w) => (
                    <button
                      key={w}
                      type="button"
                      onClick={() => setWeeks(w)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                        weeks === w
                          ? 'bg-gnu-navy text-white border-gnu-navy'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {w}주차 ({w === 16 ? '정규 한학기' : `${w}주 단기`})
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  산출물 기준 가이드라인
                </label>
                <div className="p-2.5 rounded-xl bg-blue-50 text-[11px] text-blue-900 border border-blue-200">
                  ✓ 중간발표 보고서, 와이어프레임, PoC 데모, 최종 캡스톤 결과물 자동 반영
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100"
              >
                닫기
              </button>
              <button
                type="button"
                disabled={loading || !topic.trim()}
                onClick={handleGenerate}
                className="inline-flex items-center gap-2 rounded-xl bg-gnu-navy px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-gnu-blue disabled:opacity-50 transition-all"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-gnu-accent" />
                    <span>AI가 16주 로드맵을 설계하는 중...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 text-amber-300" />
                    <span>AI 마일스톤 로드맵 생성</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span className="font-bold">
                  경상국립대 16주 표준 캡스톤 로드맵이 성공적으로 생성되었습니다!
                </span>
              </div>
              <button
                type="button"
                onClick={() => setPreviewMilestones(null)}
                className="text-xs font-semibold text-emerald-700 underline"
              >
                다시 생성
              </button>
            </div>

            {/* Preview Milestones List */}
            <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1">
              {previewMilestones.map((m, idx) => (
                <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="rounded bg-gnu-navy px-2 py-0.5 text-[10px] font-bold text-white">
                      {m.weekNumber}주차 마일스톤
                    </span>
                    <span className="text-[11px] text-slate-400">
                      태스크 {m.tasks.length}개 · 산출물 {m.deliverables.length}개
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">{m.title}</h4>
                  <p className="text-[11px] text-slate-600 mt-0.5">{m.description}</p>
                  
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {m.tasks.map((t, tIdx) => (
                      <span key={tIdx} className="rounded-md bg-white border border-slate-200 px-2 py-0.5 text-[10px] text-slate-700">
                        • {t.title}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
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
                type="button"
                onClick={handleConfirm}
                className="inline-flex items-center gap-1.5 rounded-xl bg-gnu-navy px-5 py-2 text-xs font-bold text-white shadow-md hover:bg-gnu-blue"
              >
                <Target className="h-4 w-4 text-emerald-400" />
                <span>프로젝트에 로드맵 적용하기</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
