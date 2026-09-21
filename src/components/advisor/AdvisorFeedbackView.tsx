import React, { useState } from 'react';
import { Project, AdvisorFeedback } from '../../types';
import { GraduationCap, Award, MessageSquare, CheckCircle, Send, Star, AlertCircle } from 'lucide-react';

interface AdvisorFeedbackViewProps {
  project: Project;
  onAddFeedback: (feedback: Omit<AdvisorFeedback, 'id' | 'createdAt'>) => void;
}

export const AdvisorFeedbackView: React.FC<AdvisorFeedbackViewProps> = ({
  project,
  onAddFeedback,
}) => {
  const [comment, setComment] = useState('');
  const [scoreGrade, setScoreGrade] = useState<'S' | 'A' | 'B' | 'C'>('S');
  const [weekNumber, setWeekNumber] = useState(project.currentWeek || 6);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    onAddFeedback({
      advisorName: project.advisorName || '이항공 교수',
      advisorTitle: '지도교수',
      department: project.advisorDepartment || '우주항공대학',
      weekNumber,
      comment: comment.trim(),
      scoreGrade,
    });

    setComment('');
    alert('지도교수 정기 마일스톤 평가 및 피드백이 등록되었습니다.');
  };

  return (
    <div className="space-y-6">
      {/* Advisor Dashboard Header */}
      <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-gnu-blue uppercase tracking-wider">
                GNU Capstone Faculty Mentoring
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-gnu-navy" />
              지도교수 마일스톤 점검 & 정기 피드백
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              담당 지도교수: {project.advisorName} ({project.advisorDepartment})
            </p>
          </div>

          <div className="p-3 rounded-xl bg-blue-50/80 border border-blue-100 flex items-center space-x-3">
            <Award className="h-6 w-6 text-gnu-blue" />
            <div>
              <span className="text-[10px] font-bold text-blue-800 block">공식 중간평가 일정</span>
              <span className="text-xs font-extrabold text-gnu-navy">8주차 중간발표 심사</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Past Feedbacks List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-gnu-blue" />
              주차별 교수 피드백 히스토리
            </h3>
            <span className="text-xs text-slate-400">
              총 {project.advisorFeedbacks.length}건 작성됨
            </span>
          </div>

          {project.advisorFeedbacks.length === 0 ? (
            <div className="py-12 text-center rounded-2xl bg-white border border-dashed border-slate-200 text-slate-400 text-xs">
              아직 등록된 지도교수 피드백이 없습니다.
            </div>
          ) : (
            <div className="space-y-3">
              {project.advisorFeedbacks.map((fb) => (
                <div
                  key={fb.id}
                  className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="h-8 w-8 rounded-lg bg-gnu-navy text-white text-xs font-bold flex items-center justify-center">
                        GNU
                      </span>
                      <div>
                        <div className="flex items-center space-x-1.5">
                          <span className="text-xs font-bold text-slate-900">{fb.advisorName}</span>
                          <span className="text-[11px] text-slate-500">({fb.advisorTitle})</span>
                        </div>
                        <span className="text-[10px] text-slate-400">{fb.department}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="rounded bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-gnu-blue">
                        {fb.weekNumber}주차 점검
                      </span>
                      {fb.scoreGrade && (
                        <span className="rounded bg-amber-100 px-2 py-0.5 text-[10px] font-extrabold text-amber-800">
                          평가등급: {fb.scoreGrade}
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                    "{fb.comment}"
                  </p>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                    <span>작성일: {fb.createdAt}</span>
                    <span className="text-emerald-600 font-semibold flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" />
                      마일스톤 승인 반영 완료
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Professor Form to write feedback */}
        <div className="rounded-2xl bg-white p-5 shadow-sm border border-slate-200/80 space-y-4">
          <div className="pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Star className="h-4 w-4 text-amber-500" />
              지도교수 피드백 및 등급 부여
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">
              (교수/멘토 전용) 주차별 마일스톤 달성도를 확인하고 코멘트를 전달합니다.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  점검 주차
                </label>
                <select
                  value={weekNumber}
                  onChange={(e) => setWeekNumber(parseInt(e.target.value))}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:border-gnu-blue focus:outline-none"
                >
                  {Array.from({ length: 16 }, (_, i) => i + 1).map((w) => (
                    <option key={w} value={w}>
                      {w}주차 점검
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">
                  달성 평가 등급
                </label>
                <select
                  value={scoreGrade}
                  onChange={(e) => setScoreGrade(e.target.value as any)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:border-gnu-blue focus:outline-none font-bold"
                >
                  <option value="S">S (매우 우수)</option>
                  <option value="A">A (우수)</option>
                  <option value="B">B (보통 / 보완 필요)</option>
                  <option value="C">C (재검토 요청)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">
                지도 코멘트 및 개선 권고사항
              </label>
              <textarea
                rows={4}
                required
                placeholder="예: 1차 MVP 프로토타입 구현도가 양호합니다. 8주차 중간평가 전에 교내 학생 50인 피드백을 반영하여 사용자 사용성을 개선하세요."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full rounded-xl border border-slate-200 p-3 text-xs focus:border-gnu-blue focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-gnu-navy px-4 py-2.5 text-xs font-bold text-white shadow-md hover:bg-gnu-blue transition-colors"
            >
              <Send className="h-3.5 w-3.5" />
              <span>피드백 전송 및 마일스톤 반영</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
