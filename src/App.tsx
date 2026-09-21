import React, { useState } from 'react';
import { 
  Project, 
  StudentProfile, 
  Applicant, 
  Milestone, 
  Task, 
  RecruitRole, 
  RoleType, 
  AdvisorFeedback 
} from './types';
import { 
  CURRENT_USER, 
  MOCK_STUDENTS, 
  INITIAL_PROJECTS, 
  INITIAL_APPLICANTS 
} from './data/mockData';
import { Header } from './components/layout/Header';
import { Sidebar, ActiveTab } from './components/layout/Sidebar';
import { GnuBanner } from './components/layout/GnuBanner';
import { ProjectList } from './components/projects/ProjectList';
import { ProjectDetail } from './components/projects/ProjectDetail';
import { ProjectCreateModal } from './components/projects/ProjectCreateModal';
import { TeamMatcher } from './components/teambuilding/TeamMatcher';
import { MilestonePlanner } from './components/milestone/MilestonePlanner';
import { AdvisorFeedbackView } from './components/advisor/AdvisorFeedbackView';
import { StudentProfileModal } from './components/profile/StudentProfileModal';

export const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<StudentProfile>(CURRENT_USER);
  const [allStudents, setAllStudents] = useState<StudentProfile[]>(MOCK_STUDENTS);
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [applicants, setApplicants] = useState<Applicant[]>(INITIAL_APPLICANTS);
  const [activeTab, setActiveTab] = useState<ActiveTab>('projects');
  const [activeProjectId, setActiveProjectId] = useState<string>(projects[0].id);
  const [detailProjectId, setDetailProjectId] = useState<string | null>(null);

  // Modals
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const activeProject = projects.find((p) => p.id === activeProjectId) || projects[0];

  // Handler: Accept Applicant
  const handleAcceptApplicant = (applicantId: string) => {
    const applicant = applicants.find((a) => a.id === applicantId);
    if (!applicant) return;

    setApplicants((prev) =>
      prev.map((a) => (a.id === applicantId ? { ...a, status: 'ACCEPTED' } : a))
    );

    setProjects((prev) =>
      prev.map((proj) => {
        if (proj.id === applicant.projectId) {
          return {
            ...proj,
            teamMembers: [
              ...proj.teamMembers,
              {
                student: applicant.student,
                role: applicant.appliedRole,
                joinedAt: new Date().toISOString().split('T')[0],
              },
            ],
          };
        }
        return proj;
      })
    );
  };

  // Handler: Reject Applicant
  const handleRejectApplicant = (applicantId: string) => {
    setApplicants((prev) =>
      prev.map((a) => (a.id === applicantId ? { ...a, status: 'REJECTED' } : a))
    );
  };

  // Handler: Add Recruit Role
  const handleAddRecruitRole = (projectId: string, newRole: RecruitRole) => {
    setProjects((prev) =>
      prev.map((proj) => {
        if (proj.id === projectId) {
          return {
            ...proj,
            recruitRoles: [...proj.recruitRoles, newRole],
          };
        }
        return proj;
      })
    );
  };

  // Handler: Apply Role to Project
  const handleApplyRole = (projectId: string, role: RoleType, message: string) => {
    const newApplicant: Applicant = {
      id: `app-${Date.now()}`,
      projectId,
      student: currentUser,
      appliedRole: role,
      message,
      appliedAt: new Date().toISOString().split('T')[0],
      aiSynergyScore: 95,
      aiMatchReason: '컴퓨터공학과 핵심 백엔드/기획 역량이 해당 프로젝트의 기술 요구사항과 우수하게 일치합니다.',
      status: 'PENDING',
    };
    setApplicants((prev) => [newApplicant, ...prev]);
  };

  // Handler: Update Milestones
  const handleUpdateMilestones = (newMilestones: Milestone[]) => {
    setProjects((prev) =>
      prev.map((proj) => {
        if (proj.id === activeProjectId) {
          return {
            ...proj,
            milestones: newMilestones,
          };
        }
        return proj;
      })
    );
  };

  // Handler: Update Task Status
  const handleUpdateTaskStatus = (taskId: string, newStatus: Task['status']) => {
    setProjects((prev) =>
      prev.map((proj) => {
        if (proj.id === activeProjectId) {
          const updatedMilestones = proj.milestones.map((m) => ({
            ...m,
            tasks: m.tasks.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t)),
          }));
          return { ...proj, milestones: updatedMilestones };
        }
        return proj;
      })
    );
  };

  // Handler: Add Task
  const handleAddTask = (taskData: Omit<Task, 'id'>) => {
    const newTask: Task = {
      id: `t-${Date.now()}`,
      ...taskData,
    };

    setProjects((prev) =>
      prev.map((proj) => {
        if (proj.id === activeProjectId) {
          const updatedMilestones = proj.milestones.map((m) => {
            if (m.id === taskData.milestoneId) {
              return {
                ...m,
                tasks: [...m.tasks, newTask],
              };
            }
            return m;
          });
          return { ...proj, milestones: updatedMilestones };
        }
        return proj;
      })
    );
  };

  // Handler: Add Advisor Feedback
  const handleAddAdvisorFeedback = (
    feedbackData: Omit<AdvisorFeedback, 'id' | 'createdAt'>
  ) => {
    const newFeedback: AdvisorFeedback = {
      id: `fb-${Date.now()}`,
      ...feedbackData,
      createdAt: new Date().toISOString().split('T')[0],
    };

    setProjects((prev) =>
      prev.map((proj) => {
        if (proj.id === activeProjectId) {
          return {
            ...proj,
            advisorFeedbacks: [newFeedback, ...proj.advisorFeedbacks],
          };
        }
        return proj;
      })
    );
  };

  // Handler: Create Project
  const handleCreateProject = (newProject: Project) => {
    setProjects((prev) => [newProject, ...prev]);
    setActiveProjectId(newProject.id);
    setActiveTab('teambuilding');
  };

  // Pending applicant count for badge
  const pendingApplicantCount = applicants.filter(
    (a) => a.projectId === activeProjectId && a.status === 'PENDING'
  ).length;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-gnu-blue selection:text-white">
      {/* Top Header */}
      <Header
        currentUser={currentUser}
        onOpenNewProject={() => setIsNewProjectModalOpen(true)}
        onOpenProfile={() => setIsProfileModalOpen(true)}
      />

      <div className="flex-1 flex flex-col md:flex-row w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-6">
        {/* Left Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={(tab) => {
            if (tab === 'myprofile') {
              setIsProfileModalOpen(true);
            } else {
              setActiveTab(tab);
              setDetailProjectId(null);
            }
          }}
          applicantCount={pendingApplicantCount}
        />

        {/* Main Content Area */}
        <main className="flex-1 min-w-0">
          {/* Detailed view if a project was clicked in Explorer */}
          {detailProjectId ? (
            <ProjectDetail
              project={projects.find((p) => p.id === detailProjectId) || activeProject}
              currentUser={currentUser}
              onBack={() => setDetailProjectId(null)}
              onApplyRole={handleApplyRole}
              onNavigateToMilestones={(id) => {
                setActiveProjectId(id);
                setActiveTab('milestones');
                setDetailProjectId(null);
              }}
              onNavigateToTeamMatcher={(id) => {
                setActiveProjectId(id);
                setActiveTab('teambuilding');
                setDetailProjectId(null);
              }}
            />
          ) : (
            <>
              {/* Show Hero Banner on Projects Tab */}
              {activeTab === 'projects' && (
                <GnuBanner onExploreClick={() => {}} />
              )}

              {/* Tab: Project Explorer */}
              {activeTab === 'projects' && (
                <ProjectList
                  projects={projects}
                  onSelectProject={(id) => setDetailProjectId(id)}
                  onOpenNewProject={() => setIsNewProjectModalOpen(true)}
                />
              )}

              {/* Tab: AI Team Matcher */}
              {activeTab === 'teambuilding' && (
                <TeamMatcher
                  projects={projects}
                  activeProjectId={activeProjectId}
                  onSelectProject={(id) => setActiveProjectId(id)}
                  applicants={applicants}
                  allStudents={allStudents}
                  onAcceptApplicant={handleAcceptApplicant}
                  onRejectApplicant={handleRejectApplicant}
                  onAddRecruitRole={handleAddRecruitRole}
                />
              )}

              {/* Tab: Milestone Planner */}
              {activeTab === 'milestones' && (
                <MilestonePlanner
                  project={activeProject}
                  onUpdateMilestones={handleUpdateMilestones}
                  onUpdateTaskStatus={handleUpdateTaskStatus}
                  onAddTask={handleAddTask}
                />
              )}

              {/* Tab: Advisor Feedback */}
              {activeTab === 'advisor' && (
                <AdvisorFeedbackView
                  project={activeProject}
                  onAddFeedback={handleAddAdvisorFeedback}
                />
              )}
            </>
          )}
        </main>
      </div>

      {/* Global Modals */}
      <ProjectCreateModal
        isOpen={isNewProjectModalOpen}
        onClose={() => setIsNewProjectModalOpen(false)}
        onCreateProject={handleCreateProject}
      />

      <StudentProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        currentUser={currentUser}
        onUpdateProfile={(updated) => {
          setCurrentUser(updated);
          setAllStudents((prev) =>
            prev.map((s) => (s.id === updated.id ? updated : s))
          );
        }}
      />
    </div>
  );
};
export default App;
