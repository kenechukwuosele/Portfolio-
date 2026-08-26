import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Terminal } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface BootSequenceProps {
  onComplete: () => void;
}

export const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Initializing Liquid Optics...');

  useEffect(() => {
    soundFx.playGlassTap(1200, 0.02);

    const stages = [
      { p: 25, msg: 'Compiling GLSL Liquid Shaders...' },
      { p: 55, msg: 'Loading Refractive Prism Kernels...' },
      { p: 85, msg: 'Calibrating 120Hz Frame Optics...' },
      { p: 100, msg: 'Liquid Interface Ready.' }
    ];

    let currentStage = 0;
    const interval = setInterval(() => {
      if (currentStage < stages.length) {
        setProgress(stages[currentStage].p);
        setStatusText(stages[currentStage].msg);
        soundFx.playGlassTap(1000 + currentStage * 200, 0.015);
        currentStage++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          soundFx.playGlassChime();
          onComplete();
        }, 300);
      }
    }, 180);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-neutral-950 text-neutral-100"
      id="boot-sequence-overlay"
    >
      <div className="w-full max-w-sm px-6 space-y-6 text-center">
        {/* Pulsing Liquid Aperture Orb */}
        <div className="relative mx-auto w-16 h-16 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-xl animate-ping opacity-60" />
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500/30 to-purple-500/30 border border-white/30 backdrop-blur-2xl flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.4)]">
            <Sparkles className="w-6 h-6 text-cyan-300 animate-pulse" />
          </div>
        </div>

        {/* Progress Text */}
        <div className="space-y-1.5 font-mono">
          <p className="text-xs text-cyan-300 font-semibold tracking-wide flex items-center justify-center gap-1.5">
            <Terminal className="w-3.5 h-3.5" />
            <span>{statusText}</span>
          </p>
          <p className="text-[11px] text-neutral-500">
            Alex Thorne • Liquid Glass Portfolio
          </p>
        </div>

        {/* Liquid Progress Bar */}
        <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden relative">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-500 shadow-[0_0_12px_rgba(6,182,212,0.8)]"
            style={{ width: `${progress}%` }}
            transition={{ ease: 'easeOut', duration: 0.2 }}
          />
        </div>
      </div>
    </motion.div>
  );
};
