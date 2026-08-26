import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Plus, 
  Trash2, 
  Edit3, 
  Star, 
  Download, 
  Copy, 
  Check, 
  RotateCcw, 
  ExternalLink, 
  Github, 
  Layers, 
  Code2, 
  Search, 
  Sparkles,
  Save,
  FileJson,
  User,
  FolderGit2,
  Sliders,
  Lock,
  KeyRound,
  RefreshCw
} from 'lucide-react';
import { PortfolioData, Project, Metric } from '../types/portfolio';
import { soundFx } from '../utils/audio';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  data: PortfolioData;
  onSaveProject: (project: Project, isNew: boolean) => void;
  onDeleteProject: (projectId: string) => void;
  onToggleFeatured: (projectId: string) => void;
  onUpdateProfile: (updatedProfile: Partial<PortfolioData['developer']>) => void;
  onResetData: () => void;
  onImportData: (newData: PortfolioData) => void;
}

const COLOR_PRESETS = [
  { name: 'Cyan & Blue', hue: 'from-cyan-500/20 via-blue-500/10 to-indigo-500/20', accent: '#06b6d4' },
  { name: 'Sky & Indigo', hue: 'from-sky-500/20 via-blue-500/10 to-indigo-500/20', accent: '#0284c7' },
  { name: 'Emerald & Teal', hue: 'from-emerald-500/20 via-teal-500/10 to-cyan-500/20', accent: '#10b981' },
  { name: 'Purple & Violet', hue: 'from-purple-500/20 via-indigo-500/10 to-blue-500/20', accent: '#8b5cf6' },
  { name: 'Amber & Orange', hue: 'from-amber-500/20 via-orange-500/10 to-rose-500/20', accent: '#f59e0b' },
  { name: 'Rose & Red', hue: 'from-rose-500/20 via-red-500/10 to-pink-500/20', accent: '#f43f5e' },
];

const EMPTY_PROJECT: Project = {
  id: '',
  title: '',
  tagline: '',
  category: 'Systems & AI',
  description: '',
  longDescription: '',
  featured: false,
  year: new Date().getFullYear().toString(),
  status: 'Open Source',
  metrics: [
    { label: 'Latency', value: '<50ms', detail: 'Optimized response' },
    { label: 'Architecture', value: 'Microservices', detail: 'Modular design' },
    { label: 'Coverage', value: '95%+', detail: 'Unit & integration tests' }
  ],
  tags: ['Python', 'FastAPI'],
  technologies: ['Python', 'FastAPI'],
  githubUrl: '',
  liveUrl: '',
  demoSnippet: '',
  architecture: {
    layers: [
      { title: 'API Gateway & Routing', description: 'Async endpoints and input validation', technologies: ['FastAPI'] },
      { title: 'Core Logic & Security', description: 'Cryptographic hashing and business logic', technologies: ['Python'] },
      { title: 'Persistence & Caching', description: 'Relational database and caching layer', technologies: ['PostgreSQL'] }
    ],
    keyDecision: 'Implemented asynchronous connection pooling to minimize round-trip database overhead.',
    latencyOrPerf: 'Sub-30ms round-trip latency under high throughput load.'
  },
  glassHue: 'from-cyan-500/20 via-blue-500/10 to-indigo-500/20',
  accentColor: '#06b6d4'
};

export const AdminPanel: React.FC<AdminPanelProps> = ({
  isOpen,
  onClose,
  data,
  onSaveProject,
  onDeleteProject,
  onToggleFeatured,
  onUpdateProfile,
  onResetData,
  onImportData
}) => {
  const [activeTab, setActiveTab] = useState<'projects' | 'profile' | 'export'>('projects');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Project editing state
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isNewProject, setIsNewProject] = useState(false);
  const [formTagsString, setFormTagsString] = useState('');
  const [formTechString, setFormTechString] = useState('');

  // Profile editing state
  const [profileForm, setProfileForm] = useState(data.developer);
  const [profileSavedFeedback, setProfileSavedFeedback] = useState(false);

  // Export / Import state
  const [copiedCode, setCopiedCode] = useState(false);
  const [importJsonText, setImportJsonText] = useState('');
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState(false);

  // GitHub Sync state
  const [isSyncingGitHub, setIsSyncingGitHub] = useState(false);
  const [syncFeedback, setSyncFeedback] = useState<string | null>(null);

  // Passcode Security state
  const PASSCODE_STORAGE_KEY = 'kene_admin_pin';
  const [masterPin, setMasterPin] = useState(() => {
    try {
      const stored = localStorage.getItem(PASSCODE_STORAGE_KEY);
      return stored && stored !== '2026' ? stored : 'Osele@2005';
    } catch {
      return 'Osele@2005';
    }
  });
  const [isUnlocked, setIsUnlocked] = useState(() => {
    try {
      return sessionStorage.getItem('admin_session_unlocked') === 'true';
    } catch {
      return false;
    }
  });
  const [enteredPin, setEnteredPin] = useState('');
  const [pinError, setPinError] = useState(false);
  const [newPinInput, setNewPinInput] = useState('');
  const [pinUpdatedFeedback, setPinUpdatedFeedback] = useState(false);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredPin.trim() === masterPin.trim()) {
      soundFx.playGlassChime();
      try {
        sessionStorage.setItem('admin_session_unlocked', 'true');
      } catch {}
      setIsUnlocked(true);
      setPinError(false);
      setEnteredPin('');
    } else {
      soundFx.playGlassTap(800, 0.08);
      setPinError(true);
      setTimeout(() => setPinError(false), 2500);
    }
  };

  const handleChangePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPinInput.trim().length >= 4) {
      try {
        localStorage.setItem(PASSCODE_STORAGE_KEY, newPinInput.trim());
      } catch {}
      setMasterPin(newPinInput.trim());
      setPinUpdatedFeedback(true);
      soundFx.playGlassChime();
      setTimeout(() => {
        setPinUpdatedFeedback(false);
        setNewPinInput('');
      }, 2500);
    }
  };

  if (!isOpen) return null;

  if (!isUnlocked) {
    return (
      <AnimatePresence>
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl"
          onClick={onClose}
          id="admin-auth-backdrop"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            onClick={(e) => e.stopPropagation()}
            className={`w-full max-w-md p-6 sm:p-8 rounded-3xl bg-[#090b10]/95 border shadow-2xl backdrop-blur-3xl space-y-6 text-center transition-all ${
              pinError ? 'border-rose-500/50' : 'border-white/20 shadow-[0_30px_90px_rgba(0,0,0,0.9)]'
            }`}
          >
            <div className="w-14 h-14 mx-auto rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shadow-[0_0_30px_rgba(56,189,248,0.2)]">
              <Lock className="w-6 h-6" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-lg font-bold text-white tracking-tight">Admin Authentication</h3>
              <p className="text-xs text-white/50 font-mono">
                Only authorized administrator (Kenechukwu) can access project management and profile controls.
              </p>
            </div>

            <form onSubmit={handleUnlock} className="space-y-4">
              <div className="space-y-1.5 text-left">
                <label className="text-[11px] font-mono uppercase tracking-wider text-white/60">
                  Master Passcode / PIN
                </label>
                <input
                  type="password"
                  autoFocus
                  required
                  value={enteredPin}
                  onChange={(e) => setEnteredPin(e.target.value)}
                  placeholder="Enter passcode (Osele@2005)..."
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-center text-sm tracking-widest focus:outline-none focus:border-sky-400 transition-colors"
                />
                {pinError && (
                  <p className="text-xs text-rose-400 font-mono text-center pt-1">
                    Incorrect passcode. Please try again.
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Cancel (Esc)
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-black text-xs font-bold transition-all shadow-[0_0_20px_rgba(56,189,248,0.4)] cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>Unlock Admin</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </AnimatePresence>
    );
  }

  const handleOpenAddProject = () => {
    soundFx.playGlassTap(1400, 0.04);
    const newId = `project-${Date.now().toString(36)}`;
    const template: Project = {
      ...EMPTY_PROJECT,
      id: newId,
      year: new Date().getFullYear().toString()
    };
    setEditingProject(template);
    setIsNewProject(true);
    setFormTagsString(template.tags.join(', '));
    setFormTechString(template.technologies.join(', '));
  };

  const handleOpenEditProject = (project: Project) => {
    soundFx.playGlassTap(1400, 0.04);
    setEditingProject(JSON.parse(JSON.stringify(project)));
    setIsNewProject(false);
    setFormTagsString(project.tags.join(', '));
    setFormTechString(project.technologies.join(', '));
  };

  const handleSaveProjectForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject || !editingProject.title.trim()) return;

    soundFx.playGlassChime();

    // Process tags & technologies strings
    const tags = formTagsString.split(',').map(t => t.trim()).filter(Boolean);
    const technologies = formTechString.split(',').map(t => t.trim()).filter(Boolean);

    // Auto-generate clean ID if empty
    let id = editingProject.id.trim();
    if (!id) {
      id = editingProject.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }

    const updated: Project = {
      ...editingProject,
      id,
      tags: tags.length > 0 ? tags : [editingProject.category],
      technologies: technologies.length > 0 ? technologies : tags
    };

    onSaveProject(updated, isNewProject);
    setEditingProject(null);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playGlassChime();
    onUpdateProfile(profileForm);
    setProfileSavedFeedback(true);
    setTimeout(() => setProfileSavedFeedback(false), 2500);
  };

  const handleCopyCode = () => {
    soundFx.playGlassTap(1800, 0.05);
    const code = `import { PortfolioData } from '../types/portfolio';\n\nexport const initialPortfolioData: PortfolioData = ${JSON.stringify(data, null, 2)};\n`;
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleDownloadCode = () => {
    soundFx.playGlassTap(1600, 0.05);
    const code = `import { PortfolioData } from '../types/portfolio';\n\nexport const initialPortfolioData: PortfolioData = ${JSON.stringify(data, null, 2)};\n`;
    const blob = new Blob([code], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolioData.ts';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadJson = () => {
    soundFx.playGlassTap(1600, 0.05);
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolio.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJson = () => {
    try {
      setImportError(null);
      const parsed = JSON.parse(importJsonText);
      if (!parsed.developer || !parsed.allProjects) {
        throw new Error('Invalid portfolio JSON schema. Must contain developer and allProjects.');
      }
      onImportData(parsed);
      setImportSuccess(true);
      soundFx.playGlassChime();
      setTimeout(() => {
        setImportSuccess(false);
        setImportJsonText('');
      }, 2500);
    } catch (err: any) {
      setImportError(err.message || 'Failed to parse JSON');
    }
  };

  // Filtered project list for projects tab
  const filteredProjects = data.allProjects.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleSyncFromGitHub = async () => {
    try {
      setIsSyncingGitHub(true);
      setSyncFeedback(null);
      soundFx.playGlassTap(1400, 0.04);
      
      const res = await fetch('https://api.github.com/users/kenechukwuosele/repos?sort=updated&per_page=100');
      if (!res.ok) throw new Error('Failed to fetch from GitHub API');
      const repos = await res.json();
      
      const existingIds = new Set(data.allProjects.map(p => p.id.toLowerCase().replace(/[^a-z0-9]/g, '')));
      let added = 0;

      for (const repo of repos) {
        const rawName = repo.name.toLowerCase();
        if (rawName === 'portfolio-' || rawName === 'kenechukwuosele' || repo.fork) continue;
        const normalized = rawName.replace(/[^a-z0-9]/g, '');
        if (!existingIds.has(normalized)) {
          const primaryLang = (repo.language || 'TypeScript').toLowerCase();
          const category = primaryLang.includes('python') ? 'Systems & AI' : 'Full-Stack';
          const tags = [repo.language || 'Full-Stack', ...(repo.topics || [])].filter(Boolean);
          if (tags.length === 1 && repo.language) tags.push('Open Source');
          const title = repo.name.split(/[-_]/).filter(Boolean).map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

          const newProj: Project = {
            id: repo.name.toLowerCase().replace(/[^a-z0-9-]/g, '-'),
            title: title,
            tagline: repo.description ? repo.description.slice(0, 75) : `Modern ${repo.language || 'software'} project.`,
            category: category,
            description: repo.description || `Open source ${repo.language || 'software'} project by Osele Kenechukwu Alexander.`,
            longDescription: `An open-source project hosted on GitHub under @kenechukwuosele. Engineered with clean modular architecture and documentation.`,
            featured: false,
            year: repo.created_at ? new Date(repo.created_at).getFullYear().toString() : new Date().getFullYear().toString(),
            status: repo.archived ? 'Archived' : 'Open Source',
            metrics: [
              { label: 'Stars', value: `${repo.stargazers_count}`, detail: 'GitHub Stars' },
              { label: 'Language', value: repo.language || 'Multi-stack', detail: 'Primary Stack' },
              { label: 'License', value: 'MIT', detail: 'Open Source' }
            ],
            tags: tags.slice(0, 5),
            technologies: tags.slice(0, 5),
            githubUrl: repo.html_url,
            liveUrl: repo.homepage || repo.html_url,
            demoSnippet: `# Clone and test\ngit clone ${repo.html_url}.git\ncd ${repo.name}\n`,
            architecture: {
              layers: [
                { title: 'Core Source', description: 'Application logic', technologies: [repo.language || 'TypeScript'] },
                { title: 'Pipelines', description: 'CI/CD & workflows', technologies: ['Git', 'GitHub Actions'] }
              ],
              keyDecision: 'Designed with clean modular patterns for high maintainability.',
              latencyOrPerf: 'Optimized for fast execution and minimal resource consumption.'
            },
            glassHue: COLOR_PRESETS[data.allProjects.length % COLOR_PRESETS.length].hue,
            accentColor: COLOR_PRESETS[data.allProjects.length % COLOR_PRESETS.length].accent
          };
          onSaveProject(newProj, true);
          existingIds.add(normalized);
          added++;
        }
      }

      soundFx.playGlassChime();
      setSyncFeedback(added > 0 ? `Synced ${added} new repositories from GitHub!` : 'All repositories are up-to-date!');
      setTimeout(() => setSyncFeedback(null), 3000);
    } catch (err: any) {
      setSyncFeedback('GitHub API rate limit or network issue. Try again later.');
      setTimeout(() => setSyncFeedback(null), 3500);
    } finally {
      setIsSyncingGitHub(false);
    }
  };

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-2xl overflow-y-auto"
        onClick={onClose}
        id="admin-panel-backdrop"
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 28, stiffness: 320 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-5xl my-auto rounded-3xl bg-[#090b10]/95 border border-white/20 shadow-[0_30px_90px_rgba(0,0,0,0.9)] backdrop-blur-3xl overflow-hidden flex flex-col max-h-[92vh]"
          id="admin-panel-card"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-black/40">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400">
                <Sliders className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
                  Portfolio Admin & Content Manager
                </h2>
                <p className="text-xs text-white/50 font-mono">
                  Live in-browser persistence · Changes save instantly to localStorage
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                title="Close (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="px-6 py-2.5 bg-white/[0.02] border-b border-white/10 flex items-center justify-between gap-2 overflow-x-auto scrollbar-none">
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => {
                  soundFx.playGlassTap(1200, 0.03);
                  setActiveTab('projects');
                  setEditingProject(null);
                }}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  activeTab === 'projects'
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30 font-semibold'
                    : 'text-white/70 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <FolderGit2 className="w-3.5 h-3.5 text-sky-400" />
                <span>Projects ({data.allProjects.length})</span>
              </button>

              <button
                onClick={() => {
                  soundFx.playGlassTap(1200, 0.03);
                  setActiveTab('profile');
                  setEditingProject(null);
                }}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  activeTab === 'profile'
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30 font-semibold'
                    : 'text-white/70 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <User className="w-3.5 h-3.5 text-sky-400" />
                <span>Profile & Bio</span>
              </button>

              <button
                onClick={() => {
                  soundFx.playGlassTap(1200, 0.03);
                  setActiveTab('export');
                  setEditingProject(null);
                }}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  activeTab === 'export'
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30 font-semibold'
                    : 'text-white/70 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <FileJson className="w-3.5 h-3.5 text-sky-400" />
                <span>Export & Sync Code</span>
              </button>
            </div>

            {activeTab === 'projects' && !editingProject && (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSyncFromGitHub}
                  disabled={isSyncingGitHub}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/15 text-white/80 hover:text-white border border-white/10 text-xs font-semibold transition-all cursor-pointer disabled:opacity-50"
                  title="Pull latest public repositories from GitHub"
                >
                  <RefreshCw className={`w-3.5 h-3.5 text-sky-400 ${isSyncingGitHub ? 'animate-spin' : ''}`} />
                  <span>{isSyncingGitHub ? 'Syncing...' : 'Sync GitHub'}</span>
                </button>

                <button
                  onClick={handleOpenAddProject}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-sky-500 hover:bg-sky-400 text-black text-xs font-bold transition-all shadow-[0_0_15px_rgba(56,189,248,0.4)] cursor-pointer shrink-0"
                >
                  <Plus className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Add Project</span>
                </button>
              </div>
            )}
          </div>

          {/* Tab Content Body */}
          <div className="p-6 overflow-y-auto flex-1 space-y-6">
            {/* PROJECTS TAB */}
            {activeTab === 'projects' && (
              <>
                {editingProject ? (
                  /* PROJECT ADD / EDIT FORM */
                  <form onSubmit={handleSaveProjectForm} className="space-y-6">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <div>
                        <h3 className="text-lg font-bold text-white">
                          {isNewProject ? 'Create New Project' : `Edit "${editingProject.title}"`}
                        </h3>
                        <p className="text-xs text-white/50 font-mono">
                          Fill in the details below. All fields update live in your showcase.
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setEditingProject(null)}
                          className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 text-xs font-medium transition-colors cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-black text-xs font-bold transition-colors shadow-md cursor-pointer"
                        >
                          <Save className="w-3.5 h-3.5" />
                          <span>Save Project</span>
                        </button>
                      </div>
                    </div>

                    {/* Section 1: Basic Information */}
                    <div className="space-y-4">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-sky-400 font-semibold">
                        1. Basic Project Info
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-medium text-white/80">Project Title *</label>
                          <input
                            type="text"
                            required
                            value={editingProject.title}
                            onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                            placeholder="e.g. DbAdmin AI"
                            className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-sky-400 transition-colors"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-medium text-white/80">Category *</label>
                          <select
                            value={editingProject.category}
                            onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value as any })}
                            className="w-full px-3 py-2 rounded-xl bg-[#11131b] border border-white/10 text-white text-xs focus:outline-none focus:border-sky-400 transition-colors"
                          >
                            <option value="Systems & AI">Systems & AI</option>
                            <option value="Full-Stack">Full-Stack</option>
                            <option value="Machine Learning">Machine Learning</option>
                            <option value="Open Source">Open Source</option>
                            <option value="WebGL & Graphics">WebGL & Graphics</option>
                            <option value="Mobile & visionOS">Mobile & visionOS</option>
                          </select>
                        </div>

                        <div className="space-y-1.5 sm:col-span-2">
                          <label className="text-xs font-medium text-white/80">Tagline *</label>
                          <input
                            type="text"
                            required
                            value={editingProject.tagline}
                            onChange={(e) => setEditingProject({ ...editingProject, tagline: e.target.value })}
                            placeholder="e.g. Natural language database CLI for PostgreSQL, MySQL, and Redis"
                            className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-sky-400 transition-colors"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-medium text-white/80">Release Year</label>
                          <input
                            type="text"
                            value={editingProject.year}
                            onChange={(e) => setEditingProject({ ...editingProject, year: e.target.value })}
                            placeholder="2026"
                            className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-sky-400 transition-colors"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-medium text-white/80">Project Status</label>
                          <select
                            value={editingProject.status}
                            onChange={(e) => setEditingProject({ ...editingProject, status: e.target.value as any })}
                            className="w-full px-3 py-2 rounded-xl bg-[#11131b] border border-white/10 text-white text-xs focus:outline-none focus:border-sky-400 transition-colors"
                          >
                            <option value="Production">Production</option>
                            <option value="Open Source">Open Source</option>
                            <option value="Beta">Beta</option>
                            <option value="Archived">Archived</option>
                          </select>
                        </div>

                        <div className="space-y-1.5 sm:col-span-2 flex items-center gap-3 pt-1">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={editingProject.featured}
                              onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                              className="w-4 h-4 rounded border-white/20 bg-white/10 text-sky-500 focus:ring-0 cursor-pointer"
                            />
                            <span className="text-xs text-white/90 font-medium">Showcase as Featured Project (Home carousel & deep architecture)</span>
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Section 2: Links & URLs */}
                    <div className="space-y-4 pt-4 border-t border-white/10">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-sky-400 font-semibold">
                        2. Links & Repositories
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-medium text-white/80 flex items-center gap-1.5">
                            <Github className="w-3.5 h-3.5 text-sky-400" />
                            <span>GitHub URL</span>
                          </label>
                          <input
                            type="url"
                            value={editingProject.githubUrl || ''}
                            onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                            placeholder="https://github.com/kenechukwuosele/your-repo"
                            className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-sky-400 transition-colors"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-medium text-white/80 flex items-center gap-1.5">
                            <ExternalLink className="w-3.5 h-3.5 text-sky-400" />
                            <span>Live Demo URL (Optional)</span>
                          </label>
                          <input
                            type="url"
                            value={editingProject.liveUrl || ''}
                            onChange={(e) => setEditingProject({ ...editingProject, liveUrl: e.target.value })}
                            placeholder="https://your-demo-app.onrender.com"
                            className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-sky-400 transition-colors"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Section 3: Descriptions */}
                    <div className="space-y-4 pt-4 border-t border-white/10">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-sky-400 font-semibold">
                        3. Descriptions & Details
                      </h4>
                      <div className="space-y-3">
                        <div className="space-y-1.5">
                          <label className="text-xs font-medium text-white/80">Short Card Description *</label>
                          <textarea
                            required
                            rows={2}
                            value={editingProject.description}
                            onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                            placeholder="Short overview that appears on the showcase cards..."
                            className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-sky-400 transition-colors resize-none"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-medium text-white/80">Detailed Case Study Long Description</label>
                          <textarea
                            rows={4}
                            value={editingProject.longDescription}
                            onChange={(e) => setEditingProject({ ...editingProject, longDescription: e.target.value })}
                            placeholder="In-depth breakdown of the problem, methodology, and engineered outcomes shown in the modal..."
                            className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-sky-400 transition-colors"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Section 4: Tags & Tech Stack */}
                    <div className="space-y-4 pt-4 border-t border-white/10">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-sky-400 font-semibold">
                        4. Technologies & Tags
                      </h4>
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-white/80">Technologies & Tags (Comma Separated)</label>
                        <input
                          type="text"
                          value={formTagsString}
                          onChange={(e) => {
                            setFormTagsString(e.target.value);
                            setFormTechString(e.target.value);
                          }}
                          placeholder="Python, FastAPI, Redis, PostgreSQL, Docker, JWT"
                          className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-sky-400 transition-colors"
                        />
                        <p className="text-[11px] text-white/40 font-mono">
                          Example: Python, React, ChromaDB, Groq, Tailwind CSS
                        </p>
                      </div>
                    </div>

                    {/* Section 5: Engineered Outcome Metrics */}
                    <div className="space-y-4 pt-4 border-t border-white/10">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-sky-400 font-semibold">
                        5. Key Metrics (Bento Stats)
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {editingProject.metrics.map((metric, idx) => (
                          <div key={idx} className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                            <span className="text-[11px] font-mono text-white/40">Metric #{idx + 1}</span>
                            <input
                              type="text"
                              value={metric.label}
                              onChange={(e) => {
                                const newMetrics = [...editingProject.metrics];
                                newMetrics[idx] = { ...newMetrics[idx], label: e.target.value };
                                setEditingProject({ ...editingProject, metrics: newMetrics });
                              }}
                              placeholder="Label (e.g. Cost Reduction)"
                              className="w-full px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:outline-none"
                            />
                            <input
                              type="text"
                              value={metric.value}
                              onChange={(e) => {
                                const newMetrics = [...editingProject.metrics];
                                newMetrics[idx] = { ...newMetrics[idx], value: e.target.value };
                                setEditingProject({ ...editingProject, metrics: newMetrics });
                              }}
                              placeholder="Value (e.g. ~90%)"
                              className="w-full px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:outline-none font-bold"
                            />
                            <input
                              type="text"
                              value={metric.detail}
                              onChange={(e) => {
                                const newMetrics = [...editingProject.metrics];
                                newMetrics[idx] = { ...newMetrics[idx], detail: e.target.value };
                                setEditingProject({ ...editingProject, metrics: newMetrics });
                              }}
                              placeholder="Detail (e.g. Smart Task Routing)"
                              className="w-full px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:outline-none text-white/60"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Section 6: Code Snippet (Optional) */}
                    <div className="space-y-4 pt-4 border-t border-white/10">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-sky-400 font-semibold">
                        6. Code Kernel Snippet (Optional)
                      </h4>
                      <div className="space-y-1.5">
                        <textarea
                          rows={6}
                          value={editingProject.demoSnippet || ''}
                          onChange={(e) => setEditingProject({ ...editingProject, demoSnippet: e.target.value })}
                          placeholder={`# Example code snippet\ndef execute_pipeline():\n    pass`}
                          className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-sky-300 font-mono text-xs focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Section 7: Accent Color & Glass Preset */}
                    <div className="space-y-4 pt-4 border-t border-white/10">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-sky-400 font-semibold">
                        7. Glass Hue & Theme Preset
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        {COLOR_PRESETS.map((preset) => (
                          <button
                            key={preset.name}
                            type="button"
                            onClick={() => {
                              setEditingProject({
                                ...editingProject,
                                glassHue: preset.hue,
                                accentColor: preset.accent
                              });
                            }}
                            className={`flex items-center gap-2.5 p-3 rounded-2xl border transition-all text-left cursor-pointer ${
                              editingProject.accentColor === preset.accent
                                ? 'bg-white/10 border-white text-white'
                                : 'bg-white/[0.03] border-white/10 text-white/70 hover:bg-white/5'
                            }`}
                          >
                            <span 
                              className="w-4 h-4 rounded-full shadow-sm shrink-0" 
                              style={{ backgroundColor: preset.accent }} 
                            />
                            <span className="text-xs font-medium">{preset.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Submit Bar */}
                    <div className="flex items-center justify-end gap-3 pt-6 border-t border-white/10">
                      <button
                        type="button"
                        onClick={() => setEditingProject(null)}
                        className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 text-xs font-semibold transition-colors cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex items-center gap-2 px-6 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-black text-xs font-bold transition-all shadow-[0_0_20px_rgba(56,189,248,0.4)] cursor-pointer"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save Project & Persist</span>
                      </button>
                    </div>
                  </form>
                ) : (
                  /* PROJECT LIST VIEW */
                  <div className="space-y-4">
                    {syncFeedback && (
                      <div className="p-3 rounded-2xl bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-mono flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-emerald-400" />
                          {syncFeedback}
                        </span>
                      </div>
                    )}

                    {/* Search & Stats Bar */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                      <div className="relative flex-1">
                        <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search projects by title, category, or technology..."
                          className="w-full pl-9 pr-4 py-2 rounded-2xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-sky-400 transition-colors"
                        />
                      </div>
                      <div className="text-xs font-mono text-white/50 px-2 flex items-center gap-2">
                        <span>Showing {filteredProjects.length} of {data.allProjects.length} projects</span>
                      </div>
                    </div>

                    {/* Projects Grid */}
                    <div className="grid grid-cols-1 gap-3">
                      {filteredProjects.map((project) => (
                        <div
                          key={project.id}
                          className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                        >
                          <div className="space-y-1 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span 
                                className="w-2.5 h-2.5 rounded-full" 
                                style={{ backgroundColor: project.accentColor || '#06b6d4' }}
                              />
                              <h4 className="text-sm font-bold text-white group-hover:text-sky-300 transition-colors">
                                {project.title}
                              </h4>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-white/70 border border-white/10">
                                {project.category}
                              </span>
                              <span className="text-[10px] font-mono text-white/40">{project.year}</span>
                              {project.featured && (
                                <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                                  <Star className="w-2.5 h-2.5 fill-amber-300 text-amber-300" />
                                  Featured
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-white/60 line-clamp-1">
                              {project.tagline || project.description}
                            </p>
                            <div className="flex flex-wrap gap-1 pt-1">
                              {project.tags.slice(0, 5).map(t => (
                                <span key={t} className="text-[10px] font-mono text-white/40">#{t}</span>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
                            <button
                              onClick={() => {
                                soundFx.playGlassTap(1500, 0.04);
                                onToggleFeatured(project.id);
                              }}
                              className={`p-2 rounded-xl transition-colors cursor-pointer ${
                                project.featured 
                                  ? 'bg-amber-500/10 text-amber-300 hover:bg-amber-500/20' 
                                  : 'bg-white/5 text-white/40 hover:text-white hover:bg-white/10'
                              }`}
                              title={project.featured ? 'Remove from featured' : 'Mark as featured'}
                            >
                              <Star className={`w-4 h-4 ${project.featured ? 'fill-amber-300' : ''}`} />
                            </button>

                            <button
                              onClick={() => handleOpenEditProject(project)}
                              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/15 text-white text-xs font-semibold transition-colors cursor-pointer"
                            >
                              <Edit3 className="w-3.5 h-3.5 text-sky-400" />
                              <span>Edit</span>
                            </button>

                            <button
                              onClick={() => {
                                if (confirm(`Are you sure you want to delete "${project.title}"?`)) {
                                  soundFx.playGlassTap(1000, 0.06);
                                  onDeleteProject(project.id);
                                }
                              }}
                              className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors cursor-pointer"
                              title="Delete project"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}

                      {filteredProjects.length === 0 && (
                        <div className="text-center py-12 space-y-3 bg-white/[0.01] rounded-2xl border border-white/5">
                          <FolderGit2 className="w-8 h-8 text-white/20 mx-auto" />
                          <p className="text-xs text-white/40 font-mono">No projects found matching &quot;{searchQuery}&quot;</p>
                          <button
                            onClick={handleOpenAddProject}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-black text-xs font-bold cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add First Project</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* PROFILE TAB */}
            {activeTab === 'profile' && (
              <form onSubmit={handleSaveProfile} className="space-y-6 max-w-3xl mx-auto">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div>
                    <h3 className="text-lg font-bold text-white">Developer Profile & Bio</h3>
                    <p className="text-xs text-white/50 font-mono">
                      Update your headline, status badge, bio, and social contact coordinates.
                    </p>
                  </div>
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-5 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-black text-xs font-bold transition-all shadow-md cursor-pointer"
                  >
                    {profileSavedFeedback ? (
                      <>
                        <Check className="w-4 h-4 text-black" />
                        <span>Saved!</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        <span>Save Profile</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-white/80">Full Name</label>
                    <input
                      type="text"
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-sky-400"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-white/80">Preferred / Username</label>
                    <input
                      type="text"
                      value={profileForm.preferredName}
                      onChange={(e) => setProfileForm({ ...profileForm, preferredName: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-sky-400"
                    />
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-medium text-white/80">Professional Title</label>
                    <input
                      type="text"
                      value={profileForm.title}
                      onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-sky-400"
                    />
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-medium text-white/80">Role Focus Summary</label>
                    <input
                      type="text"
                      value={profileForm.roleFocus}
                      onChange={(e) => setProfileForm({ ...profileForm, roleFocus: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-sky-400"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-white/80">Status Badge</label>
                    <input
                      type="text"
                      value={profileForm.statusBadge}
                      onChange={(e) => setProfileForm({ ...profileForm, statusBadge: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-sky-400"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-white/80">Email Contact</label>
                    <input
                      type="email"
                      value={profileForm.email}
                      onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-sky-400"
                    />
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-medium text-white/80">Profile Photo / Avatar URL</label>
                    <input
                      type="url"
                      value={profileForm.avatarUrl || ''}
                      onChange={(e) => setProfileForm({ ...profileForm, avatarUrl: e.target.value })}
                      placeholder="https://avatars.githubusercontent.com/u/... or custom image URL"
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-sky-400"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-white/80">GitHub Profile URL</label>
                    <input
                      type="url"
                      value={profileForm.github}
                      onChange={(e) => setProfileForm({ ...profileForm, github: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-sky-400"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-white/80">LinkedIn Profile URL</label>
                    <input
                      type="url"
                      value={profileForm.linkedin}
                      onChange={(e) => setProfileForm({ ...profileForm, linkedin: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-sky-400"
                    />
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-medium text-white/80">Hero Subtitle Bio</label>
                    <textarea
                      rows={2}
                      value={profileForm.bio}
                      onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-sky-400 resize-none"
                    />
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-medium text-white/80">Technical Specialization Sub-Bio</label>
                    <textarea
                      rows={2}
                      value={profileForm.subBio}
                      onChange={(e) => setProfileForm({ ...profileForm, subBio: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-sky-400 resize-none"
                    />
                  </div>
                </div>

                {/* Master Security PIN settings */}
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
                  <div className="flex items-center gap-2 text-sky-400">
                    <Lock className="w-4 h-4" />
                    <h4 className="text-xs font-mono uppercase tracking-wider font-semibold">
                      Master Passcode & Security Lock
                    </h4>
                  </div>
                  <p className="text-[11px] text-white/50">
                    Only you can access this panel by entering your master passcode. Default: <code className="text-sky-300">Osele@2005</code>.
                  </p>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                    <input
                      type="password"
                      value={newPinInput}
                      onChange={(e) => setNewPinInput(e.target.value)}
                      placeholder="Enter new 4+ digit passcode..."
                      className="px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-sky-400 flex-1"
                    />
                    <button
                      type="button"
                      onClick={handleChangePin}
                      disabled={newPinInput.trim().length < 4}
                      className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-40 text-white text-xs font-semibold transition-colors cursor-pointer shrink-0 flex items-center justify-center gap-1.5"
                    >
                      {pinUpdatedFeedback ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-300">Passcode Updated!</span>
                        </>
                      ) : (
                        <>
                          <KeyRound className="w-3.5 h-3.5 text-sky-400" />
                          <span>Update Passcode</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-black text-xs font-bold transition-all shadow-[0_0_20px_rgba(56,189,248,0.4)] cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Profile Changes</span>
                  </button>
                </div>
              </form>
            )}

            {/* EXPORT & SYNC TAB */}
            {activeTab === 'export' && (
              <div className="space-y-6 max-w-3xl mx-auto">
                <div className="pb-3 border-b border-white/10">
                  <h3 className="text-lg font-bold text-white">Data Export, Backup & Code Sync</h3>
                  <p className="text-xs text-white/50 font-mono">
                    Copy or download your updated portfolio schema to paste into your codebase or backup your data.
                  </p>
                </div>

                {/* Quick Action Export Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    onClick={handleCopyCode}
                    className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    {copiedCode ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-300">Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-sky-400" />
                        <span>Copy portfolioData.ts</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleDownloadCode}
                    className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-sky-400" />
                    <span>Download .ts File</span>
                  </button>

                  <button
                    onClick={handleDownloadJson}
                    className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <FileJson className="w-4 h-4 text-sky-400" />
                    <span>Download JSON Backup</span>
                  </button>
                </div>

                {/* Import JSON Section */}
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-sky-400 font-semibold">
                      Import JSON Data
                    </h4>
                    {importSuccess && (
                      <span className="text-xs font-mono text-emerald-300 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" />
                        Imported Successfully!
                      </span>
                    )}
                  </div>
                  <textarea
                    rows={4}
                    value={importJsonText}
                    onChange={(e) => setImportJsonText(e.target.value)}
                    placeholder="Paste exported portfolio JSON here..."
                    className="w-full px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-white font-mono text-xs focus:outline-none"
                  />
                  {importError && (
                    <p className="text-xs text-rose-400 font-mono">{importError}</p>
                  )}
                  <button
                    onClick={handleImportJson}
                    disabled={!importJsonText.trim()}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 disabled:opacity-40 text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Apply Imported Data
                  </button>
                </div>

                {/* Factory Reset */}
                <div className="p-5 rounded-2xl bg-rose-500/[0.03] border border-rose-500/20 flex items-center justify-between gap-4">
                  <div>
                    <h4 className="text-xs font-bold text-rose-300">Restore Original Portfolio Defaults</h4>
                    <p className="text-[11px] text-white/50">
                      Clears local browser storage and resets all projects and profile fields to default.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      if (confirm('Are you sure you want to reset all portfolio data to defaults? This cannot be undone.')) {
                        soundFx.playGlassTap(1000, 0.08);
                        onResetData();
                        onClose();
                      }
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-semibold transition-colors shrink-0 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Data</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
