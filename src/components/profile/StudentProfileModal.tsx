import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { StudentProfile, GnuCampus, GnuCollege, RoleType, WorkStyle } from '../../types';
import { GNU_CAMPUSES, GNU_COLLEGES_MAP, ROLE_LABELS, WORK_STYLE_OPTIONS, DEFAULT_GNU_TECH_STACKS } from '../../data/gnuConstants';
import { CampusBadge, RoleBadge } from '../common/Badge';
import { Save, User, Clock, ShieldCheck, Mail, BookOpen, LogOut } from 'lucide-react';

interface StudentProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: StudentProfile;
  onUpdateProfile: (updated: StudentProfile) => void;
}

export const StudentProfileModal: React.FC<StudentProfileModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onUpdateProfile,
}) => {
  const [name, setName] = useState(currentUser.name);
  const [campus, setCampus] = useState<GnuCampus>(currentUser.campus);
  const [college, setCollege] = useState<GnuCollege>(currentUser.college);
  const [major, setMajor] = useState(currentUser.major);
  const [grade, setGrade] = useState(currentUser.grade);
  const [availableHours, setAvailableHours] = useState(currentUser.availableHoursWeekly);
  const [workStyle, setWorkStyle] = useState<WorkStyle>(currentUser.preferredWorkStyle);
  const [bio, setBio] = useState(currentUser.bio);
  const [selectedRoles, setSelectedRoles] = useState<RoleType[]>(currentUser.roles);
  const [selectedSkills, setSelectedSkills] = useState<string[]>(currentUser.skills);

  const toggleRole = (role: RoleType) => {
    if (selectedRoles.includes(role)) {
      if (selectedRoles.length > 1) {
        setSelectedRoles(selectedRoles.filter((r) => r !== role));
      }
    } else {
      setSelectedRoles([...selectedRoles, role]);
    }
  };

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      ...currentUser,
      name,
      campus,
      college,
      major,
      grade,
      availableHoursWeekly: availableHours,
      preferredWorkStyle: workStyle,
      bio,
      roles: selectedRoles,
      skills: selectedSkills,
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="내 개척자(Pioneer) 프로필 & 캡스톤 역량"
      subtitle="경상국립대 실명/학번 기반의 프로젝트 매칭 프로필을 관리합니다."
      maxWidth="2xl"
    >
      <form onSubmit={handleSave} className="space-y-4">
        {/* Verification banner */}
        <div className="flex items-center space-x-3 p-3.5 rounded-xl bg-blue-50/80 border border-blue-100 text-xs text-blue-900">
          <ShieldCheck className="h-5 w-5 text-gnu-blue shrink-0" />
          <div className="flex-1">
            <span className="font-bold">GNU 학생 인증 완료</span>
            <span className="text-blue-700 block text-[11px]">
              {currentUser.studentNumber} · {currentUser.email}
            </span>
          </div>
          <span className="rounded-full bg-blue-200 px-2 py-0.5 text-[10px] font-bold text-blue-800">
            인증됨
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">성명</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:border-gnu-blue focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">소속 캠퍼스</label>
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
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">단과대학</label>
            <select
              value={college}
              onChange={(e) => {
                const newCol = e.target.value as GnuCollege;
                setCollege(newCol);
                setMajor(GNU_COLLEGES_MAP[newCol]?.[0] || '');
              }}
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
            <label className="block text-xs font-bold text-slate-600 mb-1">전공</label>
            <select
              value={major}
              onChange={(e) => setMajor(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:border-gnu-blue focus:outline-none"
            >
              {(GNU_COLLEGES_MAP[college] || []).map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">학년</label>
            <select
              value={grade}
              onChange={(e) => setGrade(parseInt(e.target.value))}
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:border-gnu-blue focus:outline-none"
            >
              {[1, 2, 3, 4, 5].map((g) => (
                <option key={g} value={g}>
                  {g === 5 ? '대학원' : `${g}학년`}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Roles Selection */}
        <div>
          <label className="block text-xs font-bold text-slate-600 mb-1.5">
            자신의 주력 포지션 (복수 선택 가능)
          </label>
          <div className="flex flex-wrap gap-1.5">
            {(Object.keys(ROLE_LABELS) as RoleType[]).map((role) => {
              const isSelected = selectedRoles.includes(role);
              return (
                <button
                  key={role}
                  type="button"
                  onClick={() => toggleRole(role)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                    isSelected
                      ? 'bg-gnu-navy text-white border-gnu-navy'
                      : 'bg-slate-100 text-slate-600 border-slate-200'
                  }`}
                >
                  {ROLE_LABELS[role].label} {isSelected && '✓'}
                </button>
              );
            })}
          </div>
        </div>

        {/* Workstyle & Hours */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">
              주당 가용 시간 (시간)
            </label>
            <input
              type="number"
              min={5}
              max={60}
              value={availableHours}
              onChange={(e) => setAvailableHours(parseInt(e.target.value) || 10)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:border-gnu-blue focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">
              선호 협업 형태
            </label>
            <select
              value={workStyle}
              onChange={(e) => setWorkStyle(e.target.value as WorkStyle)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:border-gnu-blue focus:outline-none"
            >
              {WORK_STYLE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Skills */}
        <div>
          <label className="block text-xs font-bold text-slate-600 mb-1.5">
            보유 기술 스택
          </label>
          <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto p-1">
            {DEFAULT_GNU_TECH_STACKS.map((stk) => {
              const isSelected = selectedSkills.includes(stk);
              return (
                <button
                  key={stk}
                  type="button"
                  onClick={() => toggleSkill(stk)}
                  className={`px-2 py-1 rounded-lg text-xs font-medium border transition-all ${
                    isSelected
                      ? 'bg-gnu-blue text-white border-gnu-blue'
                      : 'bg-slate-100 text-slate-600 border-slate-200'
                  }`}
                >
                  {stk} {isSelected && '✓'}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bio */}
        <div>
          <label className="block text-xs font-bold text-slate-600 mb-1">
            자기소개 & 캡스톤 포부
          </label>
          <textarea
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full rounded-xl border border-slate-200 p-3 text-xs focus:border-gnu-blue focus:outline-none"
          />
        </div>

        <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={() => {
              if (window.confirm('로그아웃 하시겠습니까?\n로그아웃 시 시작 화면으로 이동합니다.')) {
                window.location.href = '/';
              }
            }}
            className="inline-flex items-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-2 text-xs font-bold text-rose-600 hover:bg-rose-100 transition-colors"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>로그아웃</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100"
            >
              닫기
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 rounded-xl bg-gnu-navy px-5 py-2 text-xs font-bold text-white shadow-md hover:bg-gnu-blue"
            >
              <Save className="h-4 w-4" />
              <span>프로필 저장</span>
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};
