import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { 
  Terminal, 
  Sun, 
  Moon, 
  Sparkles
} from 'lucide-react';
import { ThemeMode } from '../types/portfolio';

interface NavigationBarProps {
  activeSection: string;
  theme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
  onOpenCLI: () => void;
  developerName?: string;
}

export const NavigationBar: React.FC<NavigationBarProps> = ({
  activeSection,
  theme,
  onThemeChange,
  onOpenCLI,
  developerName
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
    <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 py-3 sm:py-4 flex justify-center pointer-events-none">
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={`relative pointer-events-auto max-w-3xl w-full flex items-center justify-between gap-2 p-1.5 rounded-full backdrop-blur-2xl border transition-all duration-300 ${
          theme === 'light'
            ? 'bg-white/80 border-black/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.04)] text-slate-800'
            : 'bg-black/75 border-white/[0.08] shadow-[0_12px_40px_rgba(0,0,0,0.8)] text-white'
        }`}
        id="floating-navigation-bar"
      >

        {/* Navigation Tabs */}
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
                className={`relative px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-medium tracking-tight whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? theme === 'light'
                      ? 'text-white font-semibold'
                      : 'text-black font-semibold'
                    : theme === 'light'
                    ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                    : 'text-white/60 hover:text-white hover:bg-white/[0.06]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activePillIndicator"
                    className={`absolute inset-0 rounded-full shadow-sm ${
                      theme === 'light' ? 'bg-slate-900' : 'bg-white'
                    }`}
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}
                <span 
                  className={`relative z-10 ${
                    isActive 
                      ? theme === 'light' ? 'nav-active-text text-white font-semibold' : 'text-black font-semibold' 
                      : ''
                  }`}
                  style={{ color: isActive ? (theme === 'light' ? '#ffffff' : '#000000') : undefined }}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Right Minimal Utility Group */}
        <div className="flex items-center gap-1 shrink-0 pr-1">
          {/* Command Palette Button */}
          <button
            onClick={onOpenCLI}
            className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs transition-colors cursor-pointer ${
              theme === 'light'
                ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                : 'text-white/60 hover:text-white hover:bg-white/10'
            }`}
            title="Command Palette (⌘K)"
            id="header-cli-button"
          >
            <Terminal className="w-3.5 h-3.5 text-white/70" />
            <span className={`text-xs font-mono ${theme === 'light' ? 'text-slate-400' : 'text-white/40'}`}>⌘K</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={cycleTheme}
            title={`Theme: ${theme}`}
            className={`p-1.5 rounded-full transition-colors cursor-pointer ${
              theme === 'light'
                ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                : 'text-white/60 hover:text-white hover:bg-white/10'
            }`}
            id="header-theme-button"
          >
            <ThemeIcon className={`w-3.5 h-3.5 ${theme === 'light' ? 'text-amber-500' : 'text-white/80'}`} />
          </button>
        </div>
      </motion.div>
    </header>
  );
};
