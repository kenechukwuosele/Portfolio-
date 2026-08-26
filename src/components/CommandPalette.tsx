import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, X, CornerDownLeft, Sparkles } from 'lucide-react';
import { PortfolioData, ThemeMode } from '../types/portfolio';
import confetti from 'canvas-confetti';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  data: PortfolioData;
  theme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
  onSelectProject: (projectId: string) => void;
  onOpenAdmin?: () => void;
}

interface CommandLog {
  id: string;
  command: string;
  output: React.ReactNode;
  type: 'info' | 'success' | 'error' | 'system';
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  data,
  theme,
  onThemeChange,
  onSelectProject,
  onOpenAdmin
}) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandLog[]>([
    {
      id: 'init-1',
      command: 'sys.ready',
      output: 'Spotlight Command v2.6.0 ready. Type "help" for developer commands.',
      type: 'system'
    }
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Keyboard shortcut listener (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim();
    if (!cmd) return;

    const cmdLower = cmd.toLowerCase();
    let responseOutput: React.ReactNode = null;
    let resType: 'info' | 'success' | 'error' | 'system' = 'info';

    if (cmdLower === 'help') {
      responseOutput = (
        <div className="space-y-1 text-xs">
          <p className="text-sky-400 font-semibold">Available Developer Commands:</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-1 font-mono text-neutral-300">
            <div><span className="text-sky-300">about</span> - Developer summary</div>
            <div><span className="text-sky-300">projects</span> - List all work</div>
            <div><span className="text-sky-300">skills</span> - Stack & capabilities</div>
            <div><span className="text-sky-300">exp</span> - Career history</div>
            <div><span className="text-sky-300">admin</span> - Project Admin Panel</div>
            <div><span className="text-sky-300">theme [mode]</span> - dark/light</div>
            <div><span className="text-sky-300">sudo hire</span> - Direct recruiter VIP</div>
            <div><span className="text-sky-300">contact</span> - Email & socials</div>
            <div><span className="text-sky-300">clear</span> - Clear buffer</div>
          </div>
        </div>
      );
    } else if (cmdLower === 'clear') {
      setHistory([]);
      setInput('');
      return;
    } else if (cmdLower === 'about' || cmdLower === 'whoami') {
      responseOutput = (
        <div className="space-y-1.5 text-xs text-neutral-300">
          <p className="text-white font-bold">{data.developer.name} — {data.developer.title}</p>
          <p className="text-neutral-400">{data.developer.bio}</p>
          <p className="text-sky-400 font-mono">Status: {data.developer.statusBadge}</p>
        </div>
      );
    } else if (cmdLower.startsWith('projects') || cmdLower === 'ls') {
      responseOutput = (
        <div className="space-y-2 text-xs">
          <p className="text-sky-400 font-semibold">Projects in repository:</p>
          <div className="space-y-1.5 font-mono">
            {data.allProjects.map((p) => (
              <div 
                key={p.id}
                onClick={() => {
                  onSelectProject(p.id);
                  onClose();
                }}
                className="flex items-center justify-between p-1.5 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer text-neutral-200 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="text-sky-300 font-bold">{p.title}</span>
                  <span className="text-xs text-neutral-400">[{p.category}]</span>
                </div>
                <span className="text-xs text-sky-400 underline">open →</span>
              </div>
            ))}
          </div>
        </div>
      );
      resType = 'success';
    } else if (cmdLower === 'skills' || cmdLower.startsWith('cat skills')) {
      responseOutput = (
        <div className="space-y-2 text-xs">
          {data.skillCategories.map((cat, idx) => (
            <div key={idx} className="space-y-1">
              <span className="text-sky-300 font-semibold">{cat.title}:</span>
              <p className="text-neutral-300 pl-2">{cat.skills.map(s => s.name).join(', ')}</p>
            </div>
          ))}
        </div>
      );
    } else if (cmdLower === 'exp' || cmdLower === 'experience') {
      responseOutput = (
        <div className="space-y-2 text-xs">
          {data.experience.map((exp) => (
            <div key={exp.id} className="p-2 rounded bg-white/5 space-y-1">
              <div className="flex items-center justify-between text-neutral-200">
                <span className="font-bold text-sky-300">{exp.role}</span>
                <span className="text-neutral-400">{exp.period}</span>
              </div>
              <p className="text-neutral-300">{exp.company} • {exp.location}</p>
            </div>
          ))}
        </div>
      );
    } else if (cmdLower.startsWith('theme')) {
      const parts = cmdLower.split(' ');
      if (parts[1] === 'light') {
        onThemeChange('light');
        responseOutput = 'Theme switched to Light mode.';
        resType = 'success';
      } else if (parts[1] === 'dark') {
        onThemeChange('dark');
        responseOutput = 'Theme switched to Dark mode.';
        resType = 'success';
      } else {
        responseOutput = `Current theme: ${theme}. Usage: theme dark | theme light`;
      }
    } else if (cmdLower === 'sudo hire' || cmdLower === 'hire') {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      responseOutput = (
        <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs space-y-1 text-emerald-300">
          <p className="font-bold flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            Recruiter VIP Access Granted
          </p>
          <p className="text-neutral-300">
            Reach out directly: <a href={`mailto:${data.developer.email}`} className="text-sky-400 underline">{data.developer.email}</a>
          </p>
        </div>
      );
      resType = 'success';
    } else if (cmdLower === 'admin') {
      if (onOpenAdmin) {
        onOpenAdmin();
        onClose();
        return;
      } else {
        responseOutput = 'Admin panel not available in current mode.';
        resType = 'error';
      }
    } else if (cmdLower === 'contact' || cmdLower === 'email') {
      responseOutput = (
        <div className="space-y-1 text-xs text-neutral-300">
          <p>Email: <a href={`mailto:${data.developer.email}`} className="text-sky-400 underline">{data.developer.email}</a></p>
          <p>GitHub: <a href={data.developer.github} target="_blank" rel="noreferrer" className="text-sky-400 underline">{data.developer.github}</a></p>
          <p>LinkedIn: <a href={data.developer.linkedin} target="_blank" rel="noreferrer" className="text-sky-400 underline">{data.developer.linkedin}</a></p>
        </div>
      );
    } else {
      responseOutput = `command not found: "${cmd}". Type "help" for a list of valid commands.`;
      resType = 'error';
    }

    setHistory((prev) => [
      ...prev,
      {
        id: `cmd-${Date.now()}`,
        command: cmd,
        output: responseOutput,
        type: resType
      }
    ]);
    setInput('');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-2xl"
        onClick={onClose}
        id="command-palette-backdrop"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -16 }}
          transition={{ type: 'spring', damping: 30, stiffness: 350 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-2xl rounded-[28px] bg-[#161617] border border-white/[0.1] shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
          id="command-palette-modal"
        >
          {/* Spotlight Header Bar */}
          <div className="px-6 py-4 border-b border-white/[0.08] bg-black/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#86868b] flex items-center gap-2 font-medium">
                <Terminal className="w-4 h-4 text-sky-400" />
                Spotlight Developer Console
              </span>
            </div>
            <button 
              onClick={onClose}
              className="p-1.5 rounded-full text-[#86868b] hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
              aria-label="Close terminal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* History Output */}
          <div className="flex-1 overflow-y-auto p-6 space-y-3 font-mono text-xs max-h-[380px]">
            {history.map((item) => (
              <div key={item.id} className="space-y-1">
                <div className="flex items-center gap-2 text-white/40">
                  <span className="text-sky-400">➜</span>
                  <span className="text-white/90 font-medium">{item.command}</span>
                </div>
                <div className={`pl-4 ${
                  item.type === 'error' ? 'text-rose-400' :
                  item.type === 'success' ? 'text-emerald-300' :
                  item.type === 'system' ? 'text-white/40' : 'text-white/70'
                }`}>
                  {item.output}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input Bar */}
          <form onSubmit={handleCommandSubmit} className="p-4 border-t border-white/[0.08] bg-black/40 flex items-center gap-2.5">
            <span className="text-sky-400 font-mono text-sm font-bold pl-1">➜</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Try 'help', 'projects', 'about', 'skills', 'sudo hire'..."
              className="flex-1 bg-transparent text-white font-mono text-xs focus:outline-none placeholder:text-white/30"
              id="terminal-command-input"
            />
            <button
              type="submit"
              className="px-4 py-1.5 rounded-full bg-white text-black font-semibold hover:bg-[#e8e8ed] transition-colors text-xs font-mono flex items-center gap-1 shadow-md cursor-pointer"
            >
              <span>Run</span>
              <CornerDownLeft className="w-3 h-3" />
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
