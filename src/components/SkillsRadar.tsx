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
    <section id="skills" className="py-24 sm:py-32 px-6 sm:px-12 max-w-6xl mx-auto space-y-12">
      {/* Apple Section Header */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        variants={staggerContainer}
        className="space-y-3 border-t border-white/[0.08] pt-12"
      >
        <motion.p 
          variants={fadeInUp} 
          className="apple-eyebrow"
        >
          Architecture
        </motion.p>
        
        <motion.h2 variants={headingReveal} className="apple-headline text-4xl sm:text-5xl font-bold text-white">
          Engineering from <span className="apple-intelligence-gradient font-bold">first principles.</span>
        </motion.h2>
        
        <motion.p variants={fadeInUp} className="apple-body text-base sm:text-lg max-w-xl">
          Deep fundamental understanding of network transport, async concurrency, cryptographic security, and applied AI systems.
        </motion.p>
      </motion.div>

      {/* 4 Apple Feature Cards */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        variants={staggerContainer}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
      >
        {architecturalPillars.map((pillar, idx) => (
          <motion.div
            key={idx}
            variants={cardVariant}
            className="p-6 rounded-[24px] bg-[#161617] border border-white/[0.08] hover:border-white/[0.15] transition-all space-y-2.5 shadow-xl"
          >
            <h3 className="font-semibold text-base text-white tracking-tight">
              {pillar.title}
            </h3>
            <p className="text-xs text-[#86868b] leading-relaxed font-normal">
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
                    ? 'bg-white text-black font-semibold shadow-md border-transparent'
                    : 'bg-[#161617] border-white/[0.06] text-[#86868b] hover:text-white hover:border-white/[0.12]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-black' : 'text-sky-400'}`} />
                  <span className={`font-semibold text-sm ${isSelected ? 'text-black' : 'text-white'}`}>{cat.title}</span>
                </div>
                <p className={`text-xs leading-relaxed font-normal pl-6 ${isSelected ? 'text-neutral-700' : 'text-[#86868b]'}`}>
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
                  className="p-5 rounded-[22px] bg-[#161617] border border-white/[0.08] space-y-2 shadow-lg"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-white text-sm">
                      {skill.name}
                    </span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/[0.06] text-[#86868b] border border-white/[0.08] font-medium">
                      {skill.level}
                    </span>
                  </div>

                  {skill.highlight && (
                    <p className="text-xs text-[#86868b] font-normal leading-relaxed">
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
