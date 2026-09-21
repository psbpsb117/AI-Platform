# GNU Pioneers (개척 매칭)
> **경상국립대학교(GNU) 맞춤형 AI 기반 팀 빌딩 및 프로젝트 마일스톤 관리 플랫폼**
> 글로컬대학30(우주항공·방산) · SW중심대학사업단 · 16주 정규 캡스톤디자인 연계

---

## 🌟 프로젝트 개요

**GNU Pioneers(개척 매칭)**는 경상국립대학교 4개 캠퍼스(가좌 본원, 칠암, 통영, 창원산학)와 다양한 단과대학(우주항공대, IT공과대, 융합기술공과대, 농생대, 자연대, 인문사회대 등)의 학생들이 팀을 결성하고, 16주 정규 캡스톤디자인 및 해커톤 마일스톤을 AI의 도움을 받아 완주할 수 있도록 돕는 교내 맞춤형 플랫폼입니다.

---

## 🚀 주요 핵심 기능

### 1. 경상국립대(GNU) 학사 & 캠퍼스 체계 맞춤화
- **4개 캠퍼스 연동**: 가좌(본원), 칠암, 통영, 창원산학
- **단과대학 및 학과 매핑**: 우주항공대학(항공우주소프트웨어, 우주항공공학), IT공과대학(컴퓨터공학, 인공지능), 융합기술공과대학(메카트로닉스), 농생대 등 실제 GNU 전공 체계 탑재
- **프로젝트 과제 유형별 분류**:
  - `캡스톤디자인 (정규교과)`: 16주 학점 연계
  - `SW중심대학 경진대회`: SW 해커톤 및 AI 챌린지
  - `글로컬30 우주항공·방산`: KASA(우주항공청) & KAI/한화 연계 과제
  - `LINC 3.0 산학연계`: 지역 농가 및 기업 문제 해결형 캡스톤
  - `전공동아리 & 연구실 스터디`

### 2. AI 기반 팀 빌딩 (Pioneer Matchmaker)
- **AI 팀 시너지 점수(0~100%) 산출**:
  - 지원자의 기술 스택, 주당 가용 시간, 선호 협업 방식(가좌 중앙도서관 대면 vs 디스코드)을 분석
  - 팀 내 결핍된 포지션(기획, FE, BE, AI, HW, UI/UX) 자동 감지 및 시너지 리포트 제공
- **GNU Pioneer 인재 추천 풀**:
  - 팀에 없는 포지션을 가진 교내 우수 인재를 AI가 발굴하여 1-Click 영입 제안 전송

### 3. 16주 캡스톤 마일스톤 코파일럿 (Milestone Co-Pilot)
- **AI 16주 로드맵 자동 생성**:
  - 프로젝트 주제와 기술 스택만 입력하면 GNU 16주 학사 일정에 맞춘 단계별(기획 -> 아키텍처/지도교수 승인 -> 1차 프로토타입 -> 중간평가 -> 실증/고도화 -> 최종 캡스톤 페스티벌) 마일스톤과 세부 태스크 자동 분해
- **인터랙티브 뷰 모드**:
  - 📊 **16주 간트 타임라인**: 학기 진행 위치(현재 6주차) 및 주차별 산출물 기한 시각화
  - 📌 **실무 칸반 보드**: 할 일(TODO) / 진행 중(IN_PROGRESS) / 완료(DONE) 드래그 및 원클릭 상태 전환
  - 📁 **학사 산출물 관리**: 보고서, GitHub Release, 시연 영상 링크 관리 및 승인 현황 트래킹

### 4. 지도교수 정기 멘토링 & 성적 평가
- 전담 지도교수가 주차별 마일스톤 달성도를 확인하고 등급(S, A, B, C) 및 정기 피드백 작성 지원

### 5. 듀얼 AI 엔진 지원
- **오프라인 GNU 내장 휴리스틱 AI**: API 키가 없어도 GNU 학사 및 전공 체계에 최적화된 알고리즘으로 100% 동작
- **Google Gemini 1.5 Flash Live 연동**: 개인 API 키 입력 시 실시간 생성형 LLM을 활용한 정밀 자소서 분석 및 로드맵 수립

---

## 💻 빠른 시작 가이드 (Quick Start)

### 실행 방법
```bash
# 1. 프로젝트 디렉토리 이동
cd C:\Users\Administrator\.gemini\antigravity\scratch\gnu-pioneers-hub

# 2. 의존성 패키지 설치
npm install

# 3. 로컬 개발 서버 실행
npm run dev
```

브라우저에서 `http://localhost:3000` 접속 시 즉시 플랫폼을 체험하실 수 있습니다.

---

## 📁 디렉토리 구조

```text
gnu-pioneers-hub/
├── index.html                 # 메인 HTML 템플릿
├── package.json               # 패키지 매니페스트
├── tailwind.config.js         # GNU Navy/Pioneer Blue 컬러 테마 설정
├── vite.config.ts             # Vite 개발 서버 설정
├── src/
│   ├── main.tsx               # 진입점
│   ├── App.tsx                # 메인 플랫폼 컨테이너 및 탭 라우팅
│   ├── types/index.ts         # GNU 캠퍼스/학과/마일스톤 인터페이스
│   ├── data/
│   │   ├── gnuConstants.ts    # 캠퍼스, 학과, 16주 학사일정 상수
│   │   └── mockData.ts        # 학생 프로필, 캡스톤 프로젝트, 지원자 모의 데이터
│   ├── services/
│   │   └── aiService.ts       # Gemini 1.5 Flash & GNU 휴리스틱 AI 매칭/마일스톤 생성기
│   └── components/
│       ├── layout/            # Header, Sidebar, GnuBanner
│       ├── common/            # Badge, Modal, ApiKeyModal
│       ├── teambuilding/      # TeamMatcher, ApplicantModal, RecruitPostModal
│       ├── milestone/        # MilestonePlanner, GanttTimeline, KanbanBoard, AiRoadmapModal
│       ├── projects/          # ProjectList, ProjectDetail, ProjectCreateModal
│       ├── advisor/           # AdvisorFeedbackView
│       └── profile/           # StudentProfileModal
```
