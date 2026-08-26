import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Layers, 
  Code2,
  Sparkles,
  Workflow,
  Cpu,
  Github,
  ExternalLink,
  ArrowRight
} from 'lucide-react';
import { Project } from '../types/portfolio';
import { staggerContainer, headingReveal, fadeInUp, cardVariant, defaultViewport } from '../utils/animations';

interface ProjectShowcaseProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({
  projects,
  onSelectProject
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = [
    { label: 'All', icon: Sparkles },
    { label: 'Systems & AI', icon: Cpu },
    { label: 'Full-Stack', icon: Workflow },
    { label: 'Machine Learning', icon: Layers }
  ];

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className="py-24 px-6 sm:px-12 max-w-6xl mx-auto space-y-10">
      {/* Clean Section Header */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        variants={staggerContainer}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-4 border-t border-white/5 pt-12"
      >
        <div className="space-y-2">
          <motion.div 
            variants={fadeInUp} 
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs font-mono"
          >
            <Layers className="w-3.5 h-3.5 text-sky-400" />
            <span>Featured Work</span>
          </motion.div>
          
          <motion.h2 
            variants={headingReveal} 
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white"
          >
            Selected Projects & <span className="google-gemini-text font-bold">Systems</span>
          </motion.h2>
          
          <motion.p 
            variants={fadeInUp} 
            className="text-white/60 text-sm sm:text-base max-w-xl font-normal leading-relaxed"
          >
            Production microservices, applied AI tools, and full-stack web platforms built from first principles.
          </motion.p>
        </div>

        <motion.div variants={fadeInUp}>
          <div className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/60 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>{filteredProjects.length} Projects</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Category Filter Pills */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        variants={fadeInUp}
        className="flex items-center overflow-x-auto pb-1 scrollbar-none gap-2"
      >
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isSelected = activeCategory === cat.label;
          
          return (
            <button
              key={cat.label}
              onClick={() => setActiveCategory(cat.label)}
              className={`relative px-4 py-2 rounded-full text-xs font-medium transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                isSelected 
                  ? 'text-black font-semibold bg-white shadow-sm' 
                  : 'text-white/60 hover:text-white bg-white/5 border border-white/5 hover:bg-white/10'
              }`}
              id={`tab-category-${cat.label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
            >
              <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-black' : 'text-sky-400'}`} />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </motion.div>

      {/* Projects Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              variants={cardVariant}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, scale: 0.96 }}
              className="group relative rounded-3xl p-[1px] bg-gradient-to-b from-white/15 via-white/5 to-transparent hover:from-white/30 transition-all duration-300 shadow-xl"
              id={`project-card-${project.id}`}
            >
              <div className="h-full w-full bg-[#090b10]/90 rounded-[23px] p-6 sm:p-7 flex flex-col justify-between space-y-6 transition-colors duration-300">
                
                {/* Top Info */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-medium text-sky-400">
                      {project.category}
                    </span>
                    <span className="text-[11px] font-mono text-white/40 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10">
                      {project.year || '2026'}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-sky-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-white/65 leading-relaxed font-normal">
                      {project.description}
                    </p>
                  </div>

                  {/* Clean Performance / Architecture Metrics */}
                  <div className="grid grid-cols-3 gap-2 pt-2">
                    {project.metrics.slice(0, 3).map((m, mIdx) => (
                      <div 
                        key={mIdx}
                        className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-0.5"
                      >
                        <span className="text-[10px] text-white/40 block truncate">{m.label}</span>
                        <span className="text-xs font-semibold text-white block truncate">{m.value}</span>
                        <span className="text-[10px] text-white/50 block truncate">{m.detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Actions & Tech Tags */}
                <div className="space-y-4 pt-4 border-t border-white/5">
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] px-2 py-0.5 rounded-md bg-white/5 text-white/70 border border-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-1">
                    <button
                      onClick={() => onSelectProject(project)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <span>Architecture Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center gap-2">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-white/60 hover:text-white transition-colors"
                          title="View Source Code"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-white/60 hover:text-white transition-colors"
                          title="Live Application"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};
