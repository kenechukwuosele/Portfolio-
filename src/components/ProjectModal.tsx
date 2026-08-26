import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ExternalLink, 
  Github, 
  Copy, 
  Check, 
  Sparkles, 
  Zap,
  ArrowUpRight
} from 'lucide-react';
import { Project } from '../types/portfolio';
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
    navigator.clipboard.writeText(project.demoSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const triggerLaunchConfetti = () => {
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
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-2xl overflow-y-auto"
        onClick={onClose}
        id="project-modal-backdrop"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ type: 'spring', damping: 30, stiffness: 350 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-3xl my-auto rounded-[32px] bg-[#161617] border border-white/[0.1] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          id="project-case-study-modal"
        >
          {/* Modal Header */}
          <div className="px-7 sm:px-9 pt-7 pb-5 border-b border-white/[0.08] flex items-start justify-between">
            <div className="space-y-2 pr-4">
              <div className="flex items-center gap-2">
                <span className="text-xs px-3 py-0.5 rounded-full bg-white/[0.06] text-[#86868b] border border-white/[0.08]">
                  {project.category}
                </span>
                <span className="text-xs px-3 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-medium">
                  {project.status}
                </span>
                <span className="text-xs text-[#86868b]">{project.year || '2026'}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
                {project.title}
              </h2>
            </div>

            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-[#86868b] hover:text-white transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Tab Bar */}
          <div className="px-7 sm:px-9 py-3 border-b border-white/[0.06] bg-black/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  activeTab === 'overview'
                    ? 'bg-white text-black font-semibold shadow-sm'
                    : 'text-[#86868b] hover:text-white'
                }`}
              >
                Overview & Impact
              </button>

              {project.architecture && (
                <button
                  onClick={() => setActiveTab('architecture')}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                    activeTab === 'architecture'
                      ? 'bg-white text-black font-semibold shadow-sm'
                      : 'text-[#86868b] hover:text-white'
                  }`}
                >
                  Architecture
                </button>
              )}

              {project.demoSnippet && (
                <button
                  onClick={() => setActiveTab('code')}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                    activeTab === 'code'
                      ? 'bg-white text-black font-semibold shadow-sm'
                      : 'text-[#86868b] hover:text-white'
                  }`}
                >
                  Code Preview
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
                  className="p-2 rounded-full text-[#86868b] hover:text-white hover:bg-white/[0.08] transition-colors"
                  title="Source Code"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              {project.liveUrl && (
                <button
                  onClick={triggerLaunchConfetti}
                  className="flex items-center gap-1 text-xs text-sky-400 hover:underline px-2 py-1 font-medium cursor-pointer"
                >
                  <span>Launch</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Modal Scrollable Body */}
          <div className="p-7 sm:p-9 overflow-y-auto space-y-6 flex-1 text-sm text-[#86868b]">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Description */}
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-[#86868b] uppercase tracking-wider">
                    The Problem & Solution
                  </h4>
                  <p className="text-base text-white/90 leading-relaxed font-normal">
                    {project.longDescription || project.description}
                  </p>
                </div>

                {/* Key Metrics Bento */}
                <div className="space-y-3">
                  <h4 className="text-xs font-semibold text-[#86868b] uppercase tracking-wider">
                    Engineered Outcomes
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {project.metrics.map((m, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-1">
                        <p className="text-xl font-bold text-white tracking-tight">{m.value}</p>
                        <p className="text-xs font-medium text-white/80">{m.label}</p>
                        <p className="text-xs text-[#86868b]">{m.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="space-y-3">
                  <h4 className="text-xs font-semibold text-[#86868b] uppercase tracking-wider">
                    Core Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="px-3 py-1 rounded-lg bg-white/[0.04] text-white/80 border border-white/[0.06] text-xs">
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
                  <h4 className="text-xs font-semibold text-[#86868b] uppercase tracking-wider">
                    Pipeline Architecture Layers
                  </h4>
                  <div className="space-y-3">
                    {project.architecture.layers.map((layer, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-white text-sm flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-300 text-xs flex items-center justify-center">
                              {idx + 1}
                            </span>
                            {layer.title}
                          </span>
                        </div>
                        <p className="text-xs text-[#86868b] leading-relaxed font-normal">
                          {layer.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {layer.technologies.map(t => (
                            <span key={t} className="text-xs px-2 py-0.5 rounded bg-white/[0.04] text-white/50 border border-white/[0.04]">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Decision & Performance Impact */}
                <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] space-y-2 text-xs">
                  <p className="font-semibold text-sky-300 flex items-center gap-1.5 text-sm">
                    <Zap className="w-4 h-4 text-sky-300" />
                    Key Architectural Decision
                  </p>
                  <p className="text-white/80 leading-relaxed font-normal">
                    {project.architecture.keyDecision}
                  </p>
                  <p className="text-sky-200 text-xs pt-1">
                    Latency/Benchmark: {project.architecture.latencyOrPerf}
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'code' && project.demoSnippet && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#86868b]">Source Implementation Preview</span>
                  <button
                    onClick={handleCopyCode}
                    className="flex items-center gap-1.5 text-xs text-white/80 hover:text-white bg-white/[0.06] hover:bg-white/[0.12] px-3 py-1 rounded-full border border-white/[0.08] transition-colors cursor-pointer"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode ? 'Copied' : 'Copy Code'}</span>
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-black/60 border border-white/[0.08] font-mono text-xs overflow-x-auto text-white/90 leading-relaxed">
                  <pre>{project.demoSnippet}</pre>
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="p-5 sm:p-7 border-t border-white/[0.08] bg-black/30 flex items-center justify-between">
            <span className="text-xs text-[#86868b] hidden sm:inline">
              Press Esc or click backdrop to close
            </span>
            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-[#86868b] hover:text-white text-xs font-medium border border-white/[0.08] cursor-pointer"
              >
                Close
              </button>
              {project.liveUrl && (
                <button
                  onClick={triggerLaunchConfetti}
                  className="px-6 py-2.5 rounded-full bg-white text-black font-semibold text-xs flex items-center gap-1.5 shadow-xl hover:bg-[#e8e8ed] transition-all cursor-pointer"
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
