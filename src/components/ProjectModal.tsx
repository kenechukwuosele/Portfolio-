import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ExternalLink, 
  Github, 
  Cpu, 
  Layers, 
  Code2, 
  Copy, 
  Check, 
  Sparkles, 
  Zap,
  ArrowUpRight
} from 'lucide-react';
import { Project } from '../types/portfolio';
import { soundFx } from '../utils/audio';
import confetti from 'canvas-confetti';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'code'>('overview');
  const [copiedCode, setCopiedCode] = useState(false);

  if (!project) return null;

  const handleCopyCode = () => {
    if (!project.demoSnippet) return;
    soundFx.playGlassTap(1800, 0.04);
    navigator.clipboard.writeText(project.demoSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const triggerLaunchConfetti = () => {
    soundFx.playGlassChime();
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.5 }
    });
    if (project.liveUrl) {
      window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-neutral-950/80 backdrop-blur-2xl overflow-y-auto"
        onClick={onClose}
        id="project-modal-backdrop"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ type: 'spring', damping: 28, stiffness: 320 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-3xl my-auto rounded-3xl bg-[#09090b]/95 border border-white/20 shadow-[0_30px_70px_rgba(0,0,0,0.8)] backdrop-blur-3xl overflow-hidden flex flex-col max-h-[90vh]"
          id="project-case-study-modal"
        >
          {/* Modal Header */}
          <div className="px-6 sm:px-8 pt-6 pb-4 border-b border-white/10 flex items-start justify-between bg-black/40">
            <div className="space-y-1.5 pr-4">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white/10 text-white/80 border border-white/10">
                  {project.category}
                </span>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                  {project.status}
                </span>
                <span className="text-xs font-mono text-white/40">{project.year}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-white mt-1">
                {project.title}
              </h2>
            </div>

            <button
              onClick={() => {
                soundFx.playGlassTap(1200, 0.04);
                onClose();
              }}
              className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-white/60 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tab Bar */}
          <div className="px-6 sm:px-8 py-2.5 border-b border-white/10 bg-black/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  soundFx.playGlassTap(1400, 0.03);
                  setActiveTab('overview');
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  activeTab === 'overview'
                    ? 'bg-white text-black shadow-md'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                Overview & Impact
              </button>

              {project.architecture && (
                <button
                  onClick={() => {
                    soundFx.playGlassTap(1400, 0.03);
                    setActiveTab('architecture');
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                    activeTab === 'architecture'
                      ? 'bg-white text-black shadow-md'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  System Architecture
                </button>
              )}

              {project.demoSnippet && (
                <button
                  onClick={() => {
                    soundFx.playGlassTap(1400, 0.03);
                    setActiveTab('code');
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                    activeTab === 'code'
                      ? 'bg-white text-black shadow-md'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  Core Code Snippet
                </button>
              )}
            </div>

            {/* Quick External Links */}
            <div className="flex items-center gap-2">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                  title="Source Code"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              {project.liveUrl && (
                <button
                  onClick={triggerLaunchConfetti}
                  className="flex items-center gap-1 text-xs font-mono text-sky-400 hover:text-sky-300 hover:underline px-2 py-1"
                >
                  <span>Launch</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Modal Scrollable Body */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-sm text-white/70">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Description */}
                <div className="space-y-2">
                  <h4 className="text-[10px] font-mono uppercase tracking-wider text-white/40">
                    The Problem & Solution
                  </h4>
                  <p className="text-base text-white/90 leading-relaxed font-light">
                    {project.longDescription || project.description}
                  </p>
                </div>

                {/* Key Metrics Bento */}
                <div className="space-y-2.5">
                  <h4 className="text-[10px] font-mono uppercase tracking-wider text-white/40">
                    Engineered Outcomes
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {project.metrics.map((m, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                        <p className="text-xl font-light text-white font-mono">{m.value}</p>
                        <p className="text-xs font-medium text-white/80 mt-1">{m.label}</p>
                        <p className="text-[11px] text-white/40 mt-0.5 font-mono">{m.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="space-y-2.5">
                  <h4 className="text-[10px] font-mono uppercase tracking-wider text-white/40">
                    Core Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="px-3 py-1 rounded-full bg-white/5 text-white/80 border border-white/10 font-mono text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'architecture' && project.architecture && (
              <div className="space-y-6">
                {/* Architectural Layers */}
                <div className="space-y-4">
                  <h4 className="text-[10px] font-mono uppercase tracking-wider text-white/40">
                    Pipeline Architecture Layers
                  </h4>
                  <div className="space-y-3">
                    {project.architecture.layers.map((layer, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-white text-sm flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-300 text-xs flex items-center justify-center font-mono">
                              {idx + 1}
                            </span>
                            {layer.title}
                          </span>
                        </div>
                        <p className="text-xs text-white/70 leading-relaxed font-light">
                          {layer.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {layer.technologies.map(t => (
                            <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-white/40">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Decision & Performance Impact */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs">
                  <p className="font-medium text-sky-300 flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-sky-300" />
                    Key Architectural Decision
                  </p>
                  <p className="text-white/80 leading-relaxed font-light">
                    {project.architecture.keyDecision}
                  </p>
                  <p className="text-sky-200 font-mono text-[11px] pt-1">
                    Latency/Benchmark: {project.architecture.latencyOrPerf}
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'code' && project.demoSnippet && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-white/40">Source Implementation Preview</span>
                  <button
                    onClick={handleCopyCode}
                    className="flex items-center gap-1.5 text-xs font-mono text-white/80 hover:text-white bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded-lg border border-white/10 transition-colors"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode ? 'Copied' : 'Copy Code'}</span>
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-black/60 border border-white/10 font-mono text-xs overflow-x-auto text-white/90 leading-relaxed shadow-inner">
                  <pre>{project.demoSnippet}</pre>
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="p-4 sm:p-6 border-t border-white/10 bg-black/40 flex items-center justify-between">
            <span className="text-xs font-mono text-white/40 hidden sm:inline">
              Press Esc or click backdrop to close
            </span>
            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-xs font-medium border border-white/10"
              >
                Close
              </button>
              {project.liveUrl && (
                <button
                  onClick={triggerLaunchConfetti}
                  className="px-5 py-2 rounded-full bg-white text-black font-semibold text-xs flex items-center gap-1.5 shadow-xl hover:bg-white/90 transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Launch Live System</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
