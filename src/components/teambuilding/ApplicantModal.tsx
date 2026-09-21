import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { Applicant, Project, StudentProfile, RoleType } from '../../types';
import { CampusBadge, RoleBadge } from '../common/Badge';
import { Sparkles, MapPin, Clock, BookOpen, Check, X, AlertTriangle, Github, Globe } from 'lucide-react';
import { analyzeApplicantSynergy, SynergyAnalysisResult } from '../../services/aiService';

interface ApplicantModalProps {
  applicant: Applicant | null;
  project: Project;
  isOpen: boolean;
  onClose: () => void;
  onAccept: (applicantId: string) => void;
  onReject: (applicantId: string) => void;
}

export const ApplicantModal: React.FC<ApplicantModalProps> = ({
  applicant,
  project,
  isOpen,
  onClose,
  onAccept,
  onReject
}) => {
  const [analyzing, setAnalyzing] = useState(false);
  const [aiReport, setAiReport] = useState<SynergyAnalysisResult | null>(null);

  useEffect(() => {
    if (applicant && isOpen) {
      setAnalyzing(true);
      analyzeApplicantSynergy(project, applicant.student, applicant.appliedRole)
        .then((res) => {
          setAiReport(res);
          setAnalyzing(false);
        })
        .catch(() => {
          setAnalyzing(false);
        });
    }
  }, [applicant, isOpen, project]);

  if (!applicant) return null;

  const student: StudentProfile = applicant.student;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${student.name} 학생의 팀 지원서`}
      subtitle={`[${project.title.slice(0, 30)}...] 지원서 심사 & AI 시너지 평가`}
      maxWidth="2xl"
    >
      <div className="space-y-6">
        {/* Student Header Info */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
          <div className="flex items-center space-x-3.5">
            <img
              src={student.avatar}
              alt={student.name}
              className="h-14 w-14 rounded-2xl object-cover ring-2 ring-gnu-blue/30"
            />
            <div>
              <div className="flex items-center space-x-2">
                <h4 className="text-base font-bold text-slate-900">{student.name}</h4>
                <span className="text-xs text-slate-500 font-mono">({student.studentNumber})</span>
                <RoleBadge role={applicant.appliedRole} size="sm" />
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                {student.college} · {student.major} ({student.grade}학년)
              </p>
              <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-500">
                <CampusBadge campus={student.campus} size="sm" />
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3 text-slate-400" />
                  주당 {student.availableHoursWeekly}시간 몰입 가능
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {student.githubUrl && (
              <a
                href={student.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl border border-slate-200 hover:bg-slate-200 text-slate-600 transition-colors"
                title="GitHub 프로필"
              >
                <Github className="h-4 w-4" />
              </a>
            )}
            {student.portfolioUrl && (
              <a
                href={student.portfolioUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl border border-slate-200 hover:bg-slate-200 text-slate-600 transition-colors"
                title="포트폴리오"
              >
                <Globe className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>

        {/* Applicant Message */}
        <div>
          <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
            지원 메시지 & 각오
          </h5>
          <div className="p-3.5 rounded-xl bg-slate-50 text-xs text-slate-700 leading-relaxed border border-slate-200/70">
            "{applicant.message}"
          </div>
        </div>

        {/* Skills & Preferences */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3 rounded-xl border border-slate-100 bg-white">
            <span className="text-[11px] font-semibold text-slate-500 block mb-1.5">보유 기술 스택</span>
            <div className="flex flex-wrap gap-1.5">
              {student.skills.map((s, idx) => (
                <span key={idx} className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700">
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div className="p-3 rounded-xl border border-slate-100 bg-white">
            <span className="text-[11px] font-semibold text-slate-500 block mb-1.5">선호 협업 스타일</span>
            <p className="text-xs font-medium text-slate-800">{student.preferredWorkStyle}</p>
          </div>
        </div>

        {/* AI Synergy Evaluation Card */}
        <div className="rounded-2xl border-2 border-blue-200 bg-gradient-to-br from-blue-50/70 via-indigo-50/40 to-white p-4.5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className="h-7 w-7 rounded-lg bg-gnu-blue text-white flex items-center justify-center">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-slate-900">GNU Pioneer AI 시너지 심사 리포트</h5>
                <p className="text-[10px] text-slate-500">경상국립대 캡스톤 다학제 융합 알고리즘 평가</p>
              </div>
            </div>

            {analyzing ? (
              <span className="text-xs font-semibold text-gnu-blue animate-pulse flex items-center gap-1">
                AI 분석 중...
              </span>
            ) : (
              <div className="text-right">
                <span className="text-2xl font-black text-gnu-navy">{aiReport?.score || applicant.aiSynergyScore}</span>
                <span className="text-xs font-bold text-gnu-blue"> / 100점</span>
              </div>
            )}
          </div>

          {analyzing ? (
            <div className="py-4 text-center text-xs text-slate-400">
              지원자의 기술 스택, 캠퍼스 위치, R&R 적합성을 계산하고 있습니다...
            </div>
          ) : (
            <div className="space-y-2.5 text-xs">
              <div className="p-2.5 rounded-lg bg-white/80 border border-blue-100 text-slate-700">
                <p className="font-semibold text-gnu-blue mb-1">💡 AI 추천 종합 의견</p>
                <p>{aiReport?.summary || applicant.aiMatchReason}</p>
              </div>

              {aiReport?.strengths && (
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-slate-600 block">주요 협업 강점:</span>
                  {aiReport.strengths.map((str, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-slate-600">
                      <span className="text-emerald-500 font-bold">✓</span>
                      <span>{str}</span>
                    </div>
                  ))}
                </div>
              )}

              {aiReport?.cautionNotes && (
                <div className="flex items-start gap-2 p-2 rounded-lg bg-amber-50 text-amber-800 text-[11px] border border-amber-200">
                  <AlertTriangle className="h-3.5 w-3.5 shrink-0 mt-0.5 text-amber-600" />
                  <span>{aiReport.cautionNotes}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={() => onReject(applicant.id)}
            className="inline-flex items-center space-x-1.5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-xs font-bold text-rose-700 hover:bg-rose-100 transition-colors"
          >
            <X className="h-4 w-4" />
            <span>선발 보류 (거절)</span>
          </button>
          <button
            type="button"
            onClick={() => onAccept(applicant.id)}
            className="inline-flex items-center space-x-1.5 rounded-xl bg-gnu-navy px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-gnu-navy/20 hover:bg-gnu-blue transition-colors"
          >
            <Check className="h-4 w-4" />
            <span>팀원으로 최종 수락</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};
