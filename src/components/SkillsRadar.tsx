import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cpu, 
  Sparkles, 
  Code2, 
  Languages,
  Network,
  ShieldCheck
} from 'lucide-react';
import { SkillCategory } from '../types/portfolio';
import { staggerContainer, headingReveal, fadeInUp, cardVariant, defaultViewport } from '../utils/animations';

interface SkillsRadarProps {
  skillCategories: SkillCategory[];
}

export const SkillsRadar: React.FC<SkillsRadarProps> = ({
  skillCategories
}) => {
  const [selectedCategory, setSelectedCategory] = useState<number>(0);

  const categoryIcons = [Network, Cpu, ShieldCheck, Sparkles, Languages];

  const architecturalPillars = [
    {
      title: "Internet Protocols & Socket Transport",
      desc: "TCP handshake mechanics, windowing, HTTP/1.1 vs HTTP/2 multiplexing, WebSocket full-duplex streams, and network telemetry."
    },
    {
      title: "Asynchronous Concurrency & I/O",
      desc: "Python asyncio event loops, non-blocking I/O multiplexing, async connection pools, and distributed Redis mutexes."
    },
    {
      title: "Cryptographic Security & Identity",
      desc: "Argon2id memory-hard password hashing, dual-token rotation, constant-time verification, and zero-trust API boundaries."
    },
    {
      title: "Algorithmic Rigor & Applied AI",
      desc: "Time-space complexity optimization, vector indexing (ChromaDB), and two-model critic query verification."
    }
  ];

  return (
    <section id="skills" className="py-24 px-6 sm:px-12 max-w-6xl mx-auto space-y-12">
      {/* Clean Section Header */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        variants={staggerContainer}
        className="space-y-2 border-t border-white/5 pt-12"
      >
        <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs font-mono">
          <Network className="w-3.5 h-3.5 text-sky-400" />
          <span>Core Competencies</span>
        </motion.div>
        
        <motion.h2 variants={headingReveal} className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
          Protocols, Concurrency & <span className="google-gemini-text font-bold">Architecture</span>
        </motion.h2>
        
        <motion.p variants={fadeInUp} className="text-white/60 text-sm sm:text-base max-w-xl font-normal leading-relaxed">
          Deep first-principles knowledge of internet transport, asynchronous event loops, applied algorithms, and cryptographic system defense.
        </motion.p>
      </motion.div>

      {/* 4 Deep Architectural Pillars */}
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
            className="p-6 rounded-3xl bg-[#0c0e14]/90 border border-white/10 hover:border-white/20 transition-all space-y-2 backdrop-blur-xl shadow-lg"
          >
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-sm text-white">
                {pillar.title}
              </h3>
            </div>
            <p className="text-xs text-white/60 leading-relaxed font-normal">
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
        className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start pt-4"
      >
        {/* Category Navigation Tabs */}
        <motion.div variants={fadeInUp} className="lg:col-span-4 space-y-2">
          {skillCategories.map((cat, idx) => {
            const isSelected = selectedCategory === idx;
            const Icon = categoryIcons[idx % categoryIcons.length] || Code2;
            
            return (
              <button
                key={idx}
                onClick={() => setSelectedCategory(idx)}
                className={`w-full text-left p-4 rounded-2xl border transition-all space-y-1 cursor-pointer ${
                  isSelected
                    ? 'bg-white/10 border-white/20 text-white shadow-sm'
                    : 'bg-white/[0.02] border-white/5 text-white/60 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-sky-400' : 'text-white/40'}`} />
                  <span className="font-medium text-sm text-white">{cat.title}</span>
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
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {skillCategories[selectedCategory]?.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="p-5 rounded-2xl bg-[#0c0e14]/90 border border-white/10 space-y-2.5 shadow-md"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-white text-sm">
                      {skill.name}
                    </span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-sky-500/10 text-sky-300 border border-sky-500/20 font-medium">
                      {skill.level}
                    </span>
                  </div>

                  {skill.highlight && (
                    <p className="text-xs text-white/65 font-normal leading-relaxed">
                      {skill.highlight}
                    </p>
                  )}
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
};
