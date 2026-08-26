import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, X, ArrowRight, CornerDownLeft, Sparkles, Check } from 'lucide-react';
import { PortfolioData, ThemeMode } from '../types/portfolio';
import { soundFx } from '../utils/audio';
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
      command: 'sys.boot --liquid-optics',
      output: 'Liquid Terminal v2.6.0 ready. Type "help" to list interactive developer commands.',
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
        soundFx.playTerminalClick();
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

    soundFx.playTerminalClick();
    const cmdLower = cmd.toLowerCase();
    let responseOutput: React.ReactNode = null;
    let resType: 'info' | 'success' | 'error' | 'system' = 'info';

    if (cmdLower === 'help') {
      responseOutput = (
        <div className="space-y-1 text-xs">
          <p className="text-cyan-400 font-semibold">Available Developer Commands:</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-1 font-mono text-neutral-300">
            <div><span className="text-cyan-300">about</span> - Developer summary</div>
            <div><span className="text-cyan-300">projects</span> - List all work</div>
            <div><span className="text-cyan-300">skills</span> - Stack & capabilities</div>
            <div><span className="text-cyan-300">exp</span> - Career history</div>
            <div><span className="text-cyan-300">admin</span> - Open Project Admin Panel</div>
            <div><span className="text-cyan-300">theme [mode]</span> - dark/light/obsidian</div>
            <div><span className="text-cyan-300">sudo hire</span> - Direct recruiter VIP</div>
            <div><span className="text-cyan-300">contact</span> - Email & socials</div>
            <div><span className="text-cyan-300">clear</span> - Clear terminal buffer</div>
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
          <p className="text-cyan-400 font-mono">Status: {data.developer.statusBadge}</p>
        </div>
      );
    } else if (cmdLower.startsWith('projects') || cmdLower === 'ls') {
      responseOutput = (
        <div className="space-y-2 text-xs">
          <p className="text-cyan-400 font-semibold">Projects in repository:</p>
          <div className="space-y-1.5 font-mono">
            {data.allProjects.map((p) => (
              <div 
                key={p.id}
                onClick={() => {
                  soundFx.playGlassChime();
                  onSelectProject(p.id);
                  onClose();
                }}
                className="flex items-center justify-between p-1.5 rounded bg-white/5 hover:bg-cyan-500/20 cursor-pointer text-neutral-200 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="text-cyan-300 font-bold">{p.title}</span>
                  <span className="text-[10px] text-neutral-400">[{p.category}]</span>
                </div>
                <span className="text-xs text-cyan-400 underline">open →</span>
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
            <div key={idx}>
              <p className="text-purple-300 font-semibold">{cat.title}:</p>
              <p className="text-neutral-400 font-mono text-[11px]">
                {cat.skills.map(s => `${s.name} (${s.level})`).join(' • ')}
              </p>
            </div>
          ))}
        </div>
      );
    } else if (cmdLower.startsWith('theme')) {
      const parts = cmdLower.split(' ');
      if (parts[1] === 'light' || parts[1] === 'dark' || parts[1] === 'obsidian') {
        onThemeChange(parts[1] as ThemeMode);
        soundFx.playWhoosh();
        responseOutput = `Theme changed to: ${parts[1]}`;
        resType = 'success';
      } else {
        responseOutput = 'Usage: theme [dark | light | obsidian]';
        resType = 'error';
      }
    } else if (cmdLower === 'sudo hire' || cmdLower === 'hire') {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      soundFx.playGlassChime();
      responseOutput = (
        <div className="p-2 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 space-y-1 text-xs">
          <p className="font-bold flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-300" />
            Recruiter VIP Trigger Activated!
          </p>
          <p>Email: <a href={`mailto:${data.developer.email}?subject=Senior%20Engineering%20Role%20Inquiry`} className="underline font-bold text-white">{data.developer.email}</a></p>
          <p className="text-[11px] text-emerald-200">Opening your default mail client with high-priority dispatch.</p>
        </div>
      );
      resType = 'success';
      window.location.href = `mailto:${data.developer.email}?subject=Senior%20Engineering%20Role%20Inquiry`;
    } else if (cmdLower === 'contact' || cmdLower.startsWith('ping')) {
      responseOutput = (
        <div className="space-y-1 text-xs font-mono text-neutral-300">
          <p>Email: <a href={`mailto:${data.developer.email}`} className="text-cyan-300 underline">{data.developer.email}</a></p>
          <p>GitHub: <a href={data.developer.github} target="_blank" rel="noreferrer" className="text-cyan-300 underline">{data.developer.github}</a></p>
          <p>LinkedIn: <a href={data.developer.linkedin} target="_blank" rel="noreferrer" className="text-cyan-300 underline">{data.developer.linkedin}</a></p>
        </div>
      );
    } else if (cmdLower === 'admin' || cmdLower === 'manage' || cmdLower === 'new project' || cmdLower === 'add project') {
      soundFx.playGlassChime();
      if (onOpenAdmin) {
        onOpenAdmin();
        onClose();
        return;
      } else {
        responseOutput = 'Admin Panel ready.';
        resType = 'success';
      }
    } else {
      responseOutput = `Command not recognized: "${cmd}". Type "help" for a list of valid commands.`;
      resType = 'error';
    }

    setHistory(prev => [
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
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/75 backdrop-blur-xl"
        onClick={onClose}
        id="command-palette-backdrop"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 10 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-2xl max-h-[80vh] flex flex-col rounded-3xl bg-[#09090b]/95 border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.8)] backdrop-blur-2xl overflow-hidden"
          id="command-palette-modal"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-black/40">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80 cursor-pointer" onClick={onClose} />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-xs font-mono text-white/50 ml-2 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-sky-400" />
                kenechukwu@dev: ~/portfolio
              </span>
            </div>
            <button 
              onClick={onClose}
              className="p-1 rounded-md text-white/40 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close terminal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Terminal History Output */}
          <div className="flex-1 overflow-y-auto p-5 space-y-3 font-mono text-xs max-h-[380px]">
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

          {/* Terminal Input Bar */}
          <form onSubmit={handleCommandSubmit} className="p-3.5 border-t border-white/10 bg-black/60 flex items-center gap-2">
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
              className="px-3 py-1.5 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition-colors text-xs font-mono flex items-center gap-1 shadow-md"
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
