import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cpu, 
  Layers, 
  Server, 
  Sparkles,
  Zap,
  CheckCircle2,
  Code2,
  Languages
} from 'lucide-react';
import { SkillCategory } from '../types/portfolio';
import { soundFx } from '../utils/audio';
import { staggerContainer, headingReveal, fadeInUp, cardVariant, defaultViewport } from '../utils/animations';

interface SkillsRadarProps {
  skillCategories: SkillCategory[];
}

export const SkillsRadar: React.FC<SkillsRadarProps> = ({
  skillCategories
}) => {
  const [selectedCategory, setSelectedCategory] = useState<number>(0);

  const categoryIcons = [Server, Layers, Sparkles, Languages];

  const architecturalPillars = [
    {
      title: "Real-Time State & CRDTs",
      desc: "Conflict-free data replication, optimistic UI updates, and sub-10ms binary WebSocket sync."
    },
    {
      title: "FastAPI & Microservices Architecture",
      desc: "Production ASGI services, Argon2id cryptographic hashing, Redis token blacklisting, and async SQLAlchemy pooling."
    },
    {
      title: "Modular Design Systems",
      desc: "Type-safe component tokens, fluid responsive layouts, and accessible interaction patterns."
    },
    {
      title: "Edge & AI Pipelines",
      desc: "Streaming LLM token evaluation, prompt caching, and low-latency edge worker execution."
    }
  ];

  return (
    <section id="skills" className="py-20 px-6 sm:px-12 max-w-7xl mx-auto space-y-12">
      {/* Clean Section Header */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        variants={staggerContainer}
        className="space-y-2 border-t border-white/10 pt-10"
      >
        <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs font-mono">
          <Cpu className="w-3.5 h-3.5 text-sky-400" />
          <span>Technical Stack</span>
        </motion.div>
        
        <motion.h2 variants={headingReveal} className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
          Architecture & <span className="text-sky-400 font-semibold">Core Stack</span>
        </motion.h2>
        
        <motion.p variants={fadeInUp} className="text-white/70 text-sm sm:text-base max-w-xl font-normal leading-relaxed">
          Technologies, frameworks, and architectural patterns used across production web applications.
        </motion.p>
      </motion.div>

      {/* Architectural Pillars Bento */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        variants={staggerContainer}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {architecturalPillars.map((pillar, idx) => (
          <motion.div
            key={idx}
            variants={cardVariant}
            className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all space-y-2"
          >
            <div className="flex items-center gap-2 text-sky-400">
              <Zap className="w-4 h-4" />
              <h4 className="text-sm font-semibold text-white">{pillar.title}</h4>
            </div>
            <p className="text-xs text-white/70 leading-relaxed font-normal">
              {pillar.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Categorized Skills Breakdown */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        variants={staggerContainer}
        className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
      >
        {/* Category Navigation Tabs */}
        <motion.div variants={fadeInUp} className="lg:col-span-4 space-y-2">
          {skillCategories.map((cat, idx) => {
            const isSelected = selectedCategory === idx;
            const Icon = categoryIcons[idx % categoryIcons.length] || Code2;
            
            return (
              <button
                key={idx}
                onClick={() => {
                  soundFx.playGlassTap(1400, 0.03);
                  setSelectedCategory(idx);
                }}
                className={`w-full text-left p-4 rounded-2xl border transition-all space-y-1 cursor-pointer ${
                  isSelected
                    ? 'bg-white/10 border-white/30 text-white shadow-lg'
                    : 'bg-white/[0.02] border-white/10 text-white/60 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-sky-400' : 'text-white/40'}`} />
                    <span className="font-semibold text-sm text-white">{cat.title}</span>
                  </div>
                </div>
                <p className="text-xs text-white/50 leading-relaxed font-normal pl-6">
                  {cat.description}
                </p>
              </button>
            );
          })}
        </motion.div>

        {/* Skills Cards Grid */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {skillCategories[selectedCategory]?.skills.map((skill, sIdx) => (
                <div
                  key={skill.name}
                  className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all space-y-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-white text-base">
                      {skill.name}
                    </span>
                    <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-sky-500/10 text-sky-300 border border-sky-500/20">
                      {skill.years}+ yrs
                    </span>
                  </div>

                  {skill.highlight && (
                    <p className="text-xs text-white/70 font-normal leading-relaxed">
                      {skill.highlight}
                    </p>
                  )}

                  <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Production Grade</span>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
};
