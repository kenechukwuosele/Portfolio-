import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Layers, 
  Sparkles, 
  Workflow, 
  Cpu, 
  Github, 
  ExternalLink, 
  ChevronRight 
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
    <section id="projects" className="py-24 sm:py-32 px-6 sm:px-12 max-w-6xl mx-auto space-y-12">
      {/* Apple Section Header */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        variants={staggerContainer}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-2 border-t border-white/[0.08] pt-12"
      >
        <div className="space-y-3">
          <motion.p 
            variants={fadeInUp} 
            className="apple-eyebrow"
          >
            Projects
          </motion.p>
          
          <motion.h2 
            variants={headingReveal} 
            className="apple-headline text-4xl sm:text-5xl font-bold text-white"
          >
            Crafted for scale and <span className="apple-intelligence-gradient font-bold">intelligence.</span>
          </motion.h2>
          
          <motion.p 
            variants={fadeInUp} 
            className="apple-body text-base sm:text-lg max-w-xl"
          >
            Production microservices, developer tooling, and applied AI systems built from first principles.
          </motion.p>
        </div>

        <motion.div variants={fadeInUp}>
          <div className="px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.08] text-xs text-[#86868b] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>{filteredProjects.length} Selected Projects</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Apple Capsule Filter Pills */}
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
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                isSelected 
                  ? 'text-black font-semibold bg-white shadow-md' 
                  : 'text-[#86868b] hover:text-white bg-white/[0.05] border border-white/[0.06] hover:bg-white/[0.1]'
              }`}
              id={`tab-category-${cat.label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
            >
              <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-black' : 'text-sky-400'}`} />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </motion.div>

      {/* Projects Apple Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              variants={cardVariant}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, scale: 0.96 }}
              className="group border border-white/[0.08] bg-[#161617] rounded-[28px] p-7 sm:p-8 flex flex-col justify-between space-y-6 shadow-2xl transition-all duration-300"
              id={`project-card-${project.id}`}
            >
              {/* Top Info */}
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-medium text-sky-400">
                    {project.category}
                  </span>
                  <span className="text-xs text-[#86868b] px-3 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.06]">
                    {project.year || '2026'}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-white tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#86868b] leading-relaxed font-normal">
                    {project.description}
                  </p>
                </div>

                {/* Clean Metrics Bento Cells */}
                <div className="grid grid-cols-3 gap-2.5 pt-2">
                  {project.metrics.slice(0, 3).map((m, mIdx) => (
                    <div 
                      key={mIdx}
                      className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-1"
                    >
                      <span className="text-xs text-[#86868b] block truncate">{m.label}</span>
                      <span className="text-sm font-semibold text-white block truncate">{m.value}</span>
                      <span className="text-xs text-[#86868b] block truncate">{m.detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Actions & Tech Tags */}
              <div className="space-y-4 pt-4 border-t border-white/[0.06]">
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 5).map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2.5 py-1 rounded-lg bg-white/[0.04] text-white/70 border border-white/[0.06]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between gap-2 pt-1">
                  <button
                    onClick={() => onSelectProject(project)}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-white hover:text-sky-300 transition-colors cursor-pointer group/btn"
                  >
                    <span>Read Architecture Case Study</span>
                    <ChevronRight className="w-4 h-4 text-sky-400 group-hover/btn:translate-x-0.5 transition-transform" />
                  </button>

                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="p-2.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-white transition-colors"
                        title="GitHub Repository"
                        aria-label={`View ${project.title} source code on GitHub`}
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="p-2.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-white transition-colors"
                        title="Live Deployment"
                        aria-label={`Visit ${project.title} live deployment`}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
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
