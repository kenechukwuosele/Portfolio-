import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Terminal, Cpu, CheckCircle2, Shield, Sparkles, Code2 } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface BootSequenceProps {
  onComplete: () => void;
}

interface LogLine {
  id: number;
  time: string;
  module: string;
  message: string;
  status: string;
  statusColor: string;
}

export const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [activeLogs, setActiveLogs] = useState<LogLine[]>([]);

  const bootStages: { progress: number; log: LogLine }[] = [
    {
      progress: 18,
      log: {
        id: 1,
        time: '0.012s',
        module: 'sys.init',
        message: 'Loading Linux kernel & environment variables',
        status: 'OK',
        statusColor: 'text-emerald-400'
      }
    },
    {
      progress: 38,
      log: {
        id: 2,
        time: '0.048s',
        module: 'auth.service',
        message: 'Initializing FastAPI, Argon2id & Redis token store',
        status: 'READY',
        statusColor: 'text-sky-400'
      }
    },
    {
      progress: 62,
      log: {
        id: 3,
        time: '0.092s',
        module: 'ai.pipelines',
        message: 'Connecting ChromaDB vector store & Groq inference',
        status: 'SYNCED',
        statusColor: 'text-cyan-300'
      }
    },
    {
      progress: 84,
      log: {
        id: 4,
        time: '0.145s',
        module: 'webgl.optics',
        message: 'Compiling GLSL liquid refraction shaders (120 FPS)',
        status: 'COMPILED',
        statusColor: 'text-purple-400'
      }
    },
    {
      progress: 100,
      log: {
        id: 5,
        time: '0.198s',
        module: 'kene.profile',
        message: 'Osele Kenechukwu Alexander (Full-Stack & AI)',
        status: 'ONLINE',
        statusColor: 'text-emerald-300'
      }
    }
  ];

  useEffect(() => {
    soundFx.playTerminalClick();

    let step = 0;
    const interval = setInterval(() => {
      if (step < bootStages.length) {
        const current = bootStages[step];
        setProgress(current.progress);
        setActiveLogs(prev => [...prev, current.log]);
        soundFx.playGlassTap(1200 + step * 180, 0.015);
        step++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          soundFx.playGlassChime();
          onComplete();
        }, 350);
      }
    }, 200);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.02, filter: 'blur(10px)' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050608] text-white font-mono select-none"
      id="boot-sequence-overlay"
    >
      {/* Background Ambient Cyber Glow */}
      <div className="absolute w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Developer Terminal Box */}
      <div className="w-full max-w-lg rounded-3xl bg-[#090b10]/95 border border-white/15 shadow-[0_25px_80px_rgba(0,0,0,0.9)] backdrop-blur-3xl overflow-hidden relative">
        
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-black/50">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            </div>
            <span className="text-xs text-white/50 ml-2 flex items-center gap-1.5 font-mono">
              <Terminal className="w-3.5 h-3.5 text-sky-400" />
              kenechukwu@dev: ~ (bootloader-v2.6)
            </span>
          </div>

          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-300 border border-sky-500/20">
            {progress}%
          </span>
        </div>

        {/* Terminal Console Stream Body */}
        <div className="p-5 space-y-2.5 text-xs min-h-[220px] flex flex-col justify-end bg-black/30">
          {activeLogs.map((log) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.15 }}
              className="flex items-start justify-between gap-3 font-mono"
            >
              <div className="flex items-center gap-2 text-white/80">
                <span className="text-white/30 text-[10px]">{log.time}</span>
                <span className="text-sky-400 font-semibold">[{log.module}]</span>
                <span className="text-white/90 text-xs">{log.message}</span>
              </div>
              <span className={`text-[10px] font-bold tracking-wider shrink-0 ${log.statusColor}`}>
                [{log.status}]
              </span>
            </motion.div>
          ))}

          {/* Active Terminal Cursor */}
          <div className="flex items-center gap-2 text-sky-400 pt-1">
            <span className="font-bold">➜</span>
            <span className="text-white/40 text-[11px]">compiling environment assets</span>
            <span className="w-2 h-4 bg-sky-400 animate-pulse inline-block align-middle" />
          </div>
        </div>

        {/* Bottom Status & Liquid Progress Bar */}
        <div className="p-4 border-t border-white/10 bg-black/60 space-y-2.5">
          <div className="flex items-center justify-between text-[11px] text-white/60">
            <div className="flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-sky-400 animate-spin" />
              <span>Full-Stack Architecture & WebGL Stack</span>
            </div>
            <span className="font-mono text-sky-300 font-bold">{progress}% Completed</span>
          </div>

          <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden relative">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-500 shadow-[0_0_15px_rgba(56,189,248,0.8)]"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut', duration: 0.18 }}
            />
          </div>
        </div>

      </div>
    </motion.div>
  );
};
