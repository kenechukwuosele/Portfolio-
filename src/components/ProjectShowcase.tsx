import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Layers, 
  Code2,
  Sparkles,
  Workflow,
  Cpu,
  Glasses,
  Github,
  ExternalLink,
  ArrowRight
} from 'lucide-react';
import { Project } from '../types/portfolio';
import { soundFx } from '../utils/audio';
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
    { label: 'Open Source', icon: Code2 },
    { label: 'Machine Learning', icon: Layers }
  ];

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className="py-20 px-6 sm:px-12 max-w-7xl mx-auto space-y-10">
      {/* Clean Section Header */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        variants={staggerContainer}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-t border-white/10 pt-10"
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
            className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white"
          >
            Production Projects & <span className="text-sky-400 font-semibold">Systems</span>
          </motion.h2>
          
          <motion.p 
            variants={fadeInUp} 
            className="text-white/70 text-sm sm:text-base max-w-xl font-normal leading-relaxed"
          >
            Production web applications, graphics engines, and open-source developer tooling.
          </motion.p>
        </div>

        <motion.div variants={fadeInUp}>
          <div className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/70 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>{filteredProjects.length} Projects</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Filter Tabs */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        variants={fadeInUp}
        className="flex items-center overflow-x-auto pb-1 scrollbar-none gap-2 p-1.5 rounded-2xl bg-white/[0.03] border border-white/10"
      >
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isSelected = activeCategory === cat.label;
          
          return (
            <button
              key={cat.label}
              onClick={() => {
                soundFx.playGlassTap(1500, 0.04);
                setActiveCategory(cat.label);
              }}
              className={`relative px-3.5 py-2 rounded-xl text-xs font-medium transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                isSelected 
                  ? 'text-black font-semibold' 
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
              id={`tab-category-${cat.label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
            >
              {isSelected && (
                <motion.div
                  layoutId="activeCategoryTab"
                  className="absolute inset-0 bg-white rounded-xl shadow-md z-0"
                  transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-black' : 'text-sky-400'}`} />
                <span>{cat.label}</span>
              </span>
            </button>
          );
        })}
      </motion.div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              variants={cardVariant}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, scale: 0.95 }}
              className="group relative rounded-3xl p-[1px] bg-gradient-to-b from-white/20 via-white/10 to-white/5 hover:from-white/35 transition-all duration-300 shadow-xl"
              id={`project-card-${project.id}`}
            >
              <div className="h-full w-full bg-[#0a0c10]/95 group-hover:bg-[#0c0e14]/95 rounded-[23px] p-6 sm:p-7 flex flex-col justify-between space-y-6 transition-colors duration-300">
                
                {/* Top Info */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-mono text-sky-400 font-medium">
                      {project.category}
                    </span>
                    <span className="text-xs font-mono text-white/50 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10">
                      {project.status}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-sky-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-white/70 leading-relaxed font-normal">
                      {project.description}
                    </p>
                  </div>

                  {/* Performance Metrics */}
                  <div className="grid grid-cols-3 gap-2 pt-2">
                    {project.metrics.map((m, mIdx) => (
                      <div 
                        key={mIdx}
                        className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-0.5"
                      >
                        <span className="text-[10px] font-mono text-white/40 block truncate">{m.label}</span>
                        <span className="text-xs font-bold text-white block">{m.value}</span>
                        <span className="text-[10px] text-white/50 block truncate">{m.detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Actions & Tech Tags */}
                <div className="space-y-4 pt-4 border-t border-white/10">
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/5 text-white/80 border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-1">
                    <button
                      onClick={() => {
                        soundFx.playGlassTap(1400, 0.04);
                        onSelectProject(project);
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <span>Architecture Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center gap-2">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-colors"
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
                          className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-colors"
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
