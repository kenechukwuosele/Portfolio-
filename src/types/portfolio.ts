export type ThemeMode = 'dark' | 'light' | 'obsidian';

export interface SocialLink {
  platform: string;
  url: string;
  label: string;
  icon: string;
}

export interface Metric {
  label: string;
  value: string;
  detail: string;
}

export interface ProjectArchitecture {
  layers: {
    title: string;
    description: string;
    technologies: string[];
  }[];
  keyDecision: string;
  latencyOrPerf: string;
}

export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: 'Full-Stack' | 'Systems & AI' | 'WebGL & Graphics' | 'Open Source' | 'Mobile & visionOS' | 'Machine Learning';
  description: string;
  longDescription: string;
  featured: boolean;
  year: string;
  status: 'Production' | 'Beta' | 'Open Source' | 'Archived';
  metrics: Metric[];
  tags: string[];
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  demoSnippet?: string;
  architecture?: ProjectArchitecture;
  glassHue: string; // e.g. "from-cyan-500/20 to-blue-600/20"
  accentColor: string; // e.g. "#06b6d4"
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: {
    name: string;
    level: 'Expert' | 'Advanced' | 'Proficient';
    iconName?: string;
    years: number;
    highlight?: string;
  }[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: 'Full-time' | 'Contract' | 'Founding' | 'Open Source';
  description: string;
  achievements: string[];
  technologies: string[];
  highlightMetric?: string;
}

export interface LabExperiment {
  id: string;
  title: string;
  category: string;
  description: string;
  interactiveType: 'shader' | 'canvas' | 'audio' | 'bench' | 'physics';
  codeSnippet: string;
}

export interface PortfolioData {
  developer: {
    name: string;
    preferredName: string;
    title: string;
    roleFocus: string;
    statusBadge: string;
    isAvailableForHire: boolean;
    location: string;
    timezone: string;
    bio: string;
    subBio: string;
    avatarUrl?: string;
    email: string;
    github: string;
    twitter: string;
    linkedin: string;
    resumeUrl: string;
    philosophy: string[];
    quickStats: Metric[];
  };
  featuredProjects: Project[];
  allProjects: Project[];
  skillCategories: SkillCategory[];
  experience: ExperienceItem[];
  labExperiments: LabExperiment[];
}
