import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { 
  Terminal, 
  Volume2, 
  VolumeX, 
  Sun, 
  Moon, 
  Sparkles, 
  Sliders,
  FolderPlus
} from 'lucide-react';
import { ThemeMode } from '../types/portfolio';
import { soundFx } from '../utils/audio';

interface NavigationBarProps {
  activeSection: string;
  theme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
  onOpenCLI: () => void;
  onOpenDevDrawer: () => void;
  onOpenAdmin?: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  developerName?: string;
}

export const NavigationBar: React.FC<NavigationBarProps> = ({
  activeSection,
  theme,
  onThemeChange,
  onOpenCLI,
  onOpenDevDrawer,
  onOpenAdmin,
  soundEnabled,
  onToggleSound
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'Overview' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Architecture' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (id: string) => {
    soundFx.playGlassTap(1200, 0.04);
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const cycleTheme = () => {
    soundFx.playWhoosh();
    if (theme === 'dark') onThemeChange('obsidian');
    else if (theme === 'obsidian') onThemeChange('light');
    else onThemeChange('dark');
  };

  const getThemeIcon = () => {
    if (theme === 'light') return Sun;
    if (theme === 'obsidian') return Sparkles;
    return Moon;
  };

  const ThemeIcon = getThemeIcon();

  return (
    <>
      {/* Floating Glass Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-2 sm:px-6 py-2.5 sm:py-4 flex justify-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className={`relative pointer-events-auto max-w-5xl w-full flex items-center justify-between sm:justify-between gap-1 sm:gap-2 p-1 sm:p-2 rounded-full backdrop-blur-2xl border transition-all duration-300 ${
            isScrolled 
              ? 'bg-[#090a0f]/92 border-white/15 shadow-[0_16px_40px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.15)]' 
              : 'bg-[#090a0f]/80 border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.4)]'
          }`}
          id="floating-navigation-bar"
        >
          {/* Slim Scroll Progress Indicator */}
          <div 
            className="absolute bottom-0 inset-x-4 h-[2px] rounded-full overflow-hidden bg-white/[0.06] pointer-events-none"
            id="scroll-progress-track"
            aria-hidden="true"
          >
            <motion.div 
              className="h-full bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-400 rounded-full shadow-[0_0_8px_rgba(56,189,248,0.8)]"
              style={{ scaleX, transformOrigin: '0%' }}
              id="scroll-progress-bar"
            />
          </div>

          {/* Navigation Links — Visible on both mobile and desktop (scrollable on mobile) */}
          <nav 
            aria-label="Main Navigation" 
            className="flex items-center gap-0.5 sm:gap-1 overflow-x-auto scrollbar-none px-1 py-0.5 w-full sm:w-auto justify-start sm:justify-center"
            id="main-nav-tabs"
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-medium tracking-tight whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-black font-semibold'
                      : 'text-white/70 hover:text-white hover:bg-white/[0.06]'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activePillIndicator"
                      className="absolute inset-0 rounded-full bg-white shadow-sm"
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Utility Controls — Hidden on mobile, visible on sm and up */}
          <div className="hidden sm:flex items-center gap-1 shrink-0">
            {/* Command Palette Button */}
            <button
              onClick={() => {
                soundFx.playTerminalClick();
                onOpenCLI();
              }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Command Palette (⌘K)"
              id="header-cli-button"
            >
              <Terminal className="w-3.5 h-3.5 text-sky-400" />
              <span className="text-[11px] font-mono text-white/50">⌘K</span>
            </button>

            {/* Audio Toggle */}
            <button
              onClick={() => {
                onToggleSound();
                soundFx.playGlassTap(1600, 0.05);
              }}
              title={soundEnabled ? 'Sound Enabled' : 'Sound Muted'}
              className="p-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              id="header-sound-button"
            >
              {soundEnabled ? (
                <Volume2 className="w-3.5 h-3.5 text-sky-400" />
              ) : (
                <VolumeX className="w-3.5 h-3.5 text-white/40" />
              )}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={cycleTheme}
              title={`Theme: ${theme}`}
              className="p-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              id="header-theme-button"
            >
              <ThemeIcon className="w-3.5 h-3.5 text-white/80" />
            </button>

            {/* Admin Panel Button */}
            {onOpenAdmin && (
              <button
                onClick={() => {
                  soundFx.playGlassTap(1600, 0.05);
                  onOpenAdmin();
                }}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs text-sky-400 hover:text-white bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 transition-all cursor-pointer font-medium"
                title="Portfolio Admin & Projects Manager (⌘E)"
                id="header-admin-button"
              >
                <FolderPlus className="w-3.5 h-3.5" />
                <span className="text-[11px] font-mono font-semibold">Admin</span>
              </button>
            )}

            {/* Settings Customizer Drawer */}
            <button
              onClick={() => {
                soundFx.playGlassTap(1500, 0.05);
                onOpenDevDrawer();
              }}
              className="p-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Visual Preferences"
              id="header-drawer-button"
            >
              <Sliders className="w-3.5 h-3.5 text-sky-400" />
            </button>
          </div>
        </motion.div>
      </header>
    </>
  );
};
