/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { initialPortfolioData } from './data/portfolioData';
import { PortfolioData, Project, ThemeMode } from './types/portfolio';
import { LiquidCanvas } from './components/LiquidCanvas';
import { NavigationBar } from './components/NavigationBar';
import { HeroSection } from './components/HeroSection';
import { ProjectShowcase } from './components/ProjectShowcase';
import { ProjectModal } from './components/ProjectModal';
import { SkillsRadar } from './components/SkillsRadar';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { ContactSection } from './components/ContactSection';
import { CommandPalette } from './components/CommandPalette';
import { AdminPanel } from './components/AdminPanel';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

const STORAGE_KEY = 'kene_portfolio_data';

export default function App() {
  const [data, setData] = useState<PortfolioData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load saved portfolio data', e);
    }
    return initialPortfolioData;
  });
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [viscosity, setViscosity] = useState<number>(0.25);
  const [dispersion, setDispersion] = useState<number>(0.035);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [cliOpen, setCliOpen] = useState<boolean>(false);
  const [adminOpen, setAdminOpen] = useState<boolean>(false);

  // Sync portfolio data to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to persist portfolio data', e);
    }
  }, [data]);

  // Global Keyboard Shortcuts (Cmd+K for CLI, Cmd+E for Admin)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'e') {
        e.preventDefault();
        soundFx.playGlassTap(1600, 0.05);
        setAdminOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Sync theme changes with DOM root
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark', 'light', 'obsidian');
    if (theme === 'light') {
      root.classList.add('light');
    } else if (theme === 'obsidian') {
      root.classList.add('dark', 'obsidian');
    } else {
      root.classList.add('dark');
    }
  }, [theme]);

  // Section Observer for scroll tracking
  useEffect(() => {
    const sections = ['hero', 'projects', 'skills', 'experience', 'contact'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.35;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleSound = () => {
    const nextVal = soundFx.toggle();
    setSoundEnabled(nextVal);
  };

  const handleUpdateDeveloperName = (name: string, title: string, bio: string) => {
    setData(prev => ({
      ...prev,
      developer: {
        ...prev.developer,
        name,
        title,
        bio
      }
    }));
  };

  const handleSaveProject = (project: Project, isNew: boolean) => {
    setData(prev => {
      let updatedAll = [...prev.allProjects];
      if (isNew) {
        updatedAll = [project, ...updatedAll];
      } else {
        const idx = updatedAll.findIndex(p => p.id === project.id);
        if (idx !== -1) {
          updatedAll[idx] = project;
        } else {
          updatedAll = [project, ...updatedAll];
        }
      }

      // Update featured list
      let updatedFeatured = [...prev.featuredProjects];
      if (project.featured) {
        const fIdx = updatedFeatured.findIndex(p => p.id === project.id);
        if (fIdx !== -1) {
          updatedFeatured[fIdx] = project;
        } else {
          updatedFeatured = [project, ...updatedFeatured];
        }
      } else {
        updatedFeatured = updatedFeatured.filter(p => p.id !== project.id);
      }

      return {
        ...prev,
        allProjects: updatedAll,
        featuredProjects: updatedFeatured
      };
    });
  };

  const handleDeleteProject = (projectId: string) => {
    setData(prev => ({
      ...prev,
      allProjects: prev.allProjects.filter(p => p.id !== projectId),
      featuredProjects: prev.featuredProjects.filter(p => p.id !== projectId)
    }));
    if (selectedProject?.id === projectId) {
      setSelectedProject(null);
    }
  };

  const handleToggleFeatured = (projectId: string) => {
    setData(prev => {
      const project = prev.allProjects.find(p => p.id === projectId);
      if (!project) return prev;

      const nextFeaturedState = !project.featured;
      const updatedProject = { ...project, featured: nextFeaturedState };

      const updatedAll = prev.allProjects.map(p => p.id === projectId ? updatedProject : p);
      let updatedFeatured = prev.featuredProjects;

      if (nextFeaturedState) {
        if (!updatedFeatured.some(p => p.id === projectId)) {
          updatedFeatured = [...updatedFeatured, updatedProject];
        }
      } else {
        updatedFeatured = updatedFeatured.filter(p => p.id !== projectId);
      }

      return {
        ...prev,
        allProjects: updatedAll,
        featuredProjects: updatedFeatured
      };
    });
  };

  const handleUpdateProfile = (updatedProfile: Partial<PortfolioData['developer']>) => {
    setData(prev => ({
      ...prev,
      developer: {
        ...prev.developer,
        ...updatedProfile
      }
    }));
  };

  const handleResetData = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error(e);
    }
    setData(initialPortfolioData);
  };

  const handleImportData = (newData: PortfolioData) => {
    setData(newData);
  };

  const handleSelectProjectId = (id: string) => {
    const found = data.allProjects.find(p => p.id === id);
    if (found) {
      setSelectedProject(found);
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen relative font-sans transition-colors duration-500 selection:bg-sky-500/20 selection:text-sky-300 ${
      theme === 'light' 
        ? 'light-theme bg-white text-[#1d1d1f]' 
        : 'bg-[#000000] text-[#f5f5f7]'
    }`}>

      {/* WebGL Liquid Optical Shader Canvas */}
      <LiquidCanvas 
        theme={theme}
        viscosity={viscosity}
        dispersion={dispersion}
      />

      {/* Unified World-Class Top Navigation Bar */}
      <NavigationBar 
        activeSection={activeSection}
        theme={theme}
        onThemeChange={setTheme}
        onOpenCLI={() => setCliOpen(true)}
        developerName={data.developer.name}
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <HeroSection 
          data={data}
          onExploreWork={() => scrollToSection('projects')}
          onContactClick={() => scrollToSection('contact')}
          onOpenCLI={() => setCliOpen(true)}
        />

        <ProjectShowcase 
          projects={data.allProjects && data.allProjects.length > 0 ? data.allProjects : data.featuredProjects}
          onSelectProject={(project) => setSelectedProject(project)}
        />

        <SkillsRadar 
          skillCategories={data.skillCategories}
        />

        <ExperienceTimeline 
          experience={data.experience}
          resumeUrl={data.developer.resumeUrl}
          developerName={data.developer.name}
          developerEmail={data.developer.email}
        />

        <ContactSection 
          data={data}
        />
      </main>

      {/* Minimalist Apple HIG Footer */}
      <footer className="relative z-10 px-6 sm:px-12 py-16 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-white/[0.08] max-w-6xl mx-auto">
        <div className="space-y-1 text-center md:text-left">
          <p className="text-sm font-semibold text-white">
            {data.developer.name}
          </p>
          <p className="text-xs text-[#86868b]">
            {data.developer.title} · Designed with first principles
          </p>
        </div>

        <div className="flex items-center gap-6 text-xs text-[#86868b]">
          <a 
            href={data.developer.github} 
            target="_blank" 
            rel="noreferrer" 
            className="hover:text-white transition-colors"
          >
            GitHub
          </a>
          <a 
            href={data.developer.linkedin} 
            target="_blank" 
            rel="noreferrer" 
            className="hover:text-white transition-colors"
          >
            LinkedIn
          </a>
          <button
            onClick={() => scrollToSection('hero')}
            className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
            title="Scroll to top"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </footer>

      {/* Interactive Case Study Modal */}
      <ProjectModal 
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Developer CLI Command Palette */}
      <CommandPalette 
        isOpen={cliOpen}
        onClose={() => setCliOpen(false)}
        data={data}
        theme={theme}
        onThemeChange={setTheme}
        onSelectProject={handleSelectProjectId}
        onOpenAdmin={() => setAdminOpen(true)}
      />

      {/* Portfolio Content & Project Admin Panel */}
      <AdminPanel 
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
        data={data}
        onSaveProject={handleSaveProject}
        onDeleteProject={handleDeleteProject}
        onToggleFeatured={handleToggleFeatured}
        onUpdateProfile={handleUpdateProfile}
        onResetData={handleResetData}
        onImportData={handleImportData}
      />
    </div>
  );
}
