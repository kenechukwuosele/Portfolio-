import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Copy, 
  Check, 
  ArrowRight
} from 'lucide-react';
import { PortfolioData } from '../types/portfolio';
import { staggerContainer, fadeInUp, scaleIn } from '../utils/animations';

interface HeroSectionProps {
  data: PortfolioData;
  onExploreWork: () => void;
  onContactClick: () => void;
  onOpenCLI: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  data,
  onExploreWork,
  onContactClick
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(data.developer.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-[85vh] flex flex-col justify-center pt-24 sm:pt-32 pb-16 px-6 sm:px-12 max-w-6xl mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        
        {/* Left Column: Headline, Concise Subtitle & Action Row */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 space-y-6"
        >
          {/* Status Pill */}
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-white/80 font-medium">
              {data.developer.statusBadge}
            </span>
          </motion.div>

          {/* Hero Headline */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08]">
              Building intelligent,{' '}
              <span className="google-gemini-text font-bold block sm:inline">
                Full-Stack and AI systems.
              </span>
            </h1>
            
            <p className="text-base sm:text-lg text-white/70 max-w-xl font-normal leading-relaxed">
              Hi, I'm <span className="text-white font-medium">{data.developer.name}</span> — a Software Engineer specializing in high-throughput backend microservices, modern TypeScript applications, and applied AI systems.
            </p>
          </motion.div>

          {/* Primary Action Buttons */}
          <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onExploreWork}
              className="px-6 py-3.5 bg-white text-black rounded-xl font-semibold text-sm flex items-center gap-2 hover:bg-white/90 transition-all shadow-lg active:scale-[0.98] cursor-pointer"
              id="hero-explore-work-button"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onContactClick}
              className="px-6 py-3.5 bg-white/5 border border-white/10 rounded-xl font-semibold text-sm text-white backdrop-blur-md hover:bg-white/10 transition-all active:scale-[0.98] cursor-pointer"
              id="hero-get-in-touch-button"
            >
              Get in Touch
            </button>

            <button
              onClick={handleCopyEmail}
              className="px-3.5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 backdrop-blur-md text-xs flex items-center gap-1.5 transition-all cursor-pointer"
              title="Copy Email Address"
              id="hero-copy-email-button"
            >
              {copiedEmail ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300 font-medium">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span className="hidden sm:inline font-medium">Copy Email</span>
                </>
              )}
            </button>
          </motion.div>

          {/* Social Links & Languages */}
          <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-5 text-xs text-white/50 pt-1">
            <div className="flex items-center gap-3">
              <a 
                href={data.developer.github} 
                target="_blank" 
                rel="noreferrer"
                className="hover:text-white transition-colors flex items-center gap-1.5"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
              <span className="text-white/20">·</span>
              <a 
                href={data.developer.linkedin} 
                target="_blank" 
                rel="noreferrer"
                className="hover:text-white transition-colors flex items-center gap-1.5"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>
            </div>
            <span className="hidden sm:inline text-white/20">·</span>
            <span className="text-white/40">German (Intermediate) · English (Fluent)</span>
          </motion.div>
        </motion.div>

        {/* Right Column: Clean Apple-Style Frosted Portrait Card */}
        <motion.div 
          variants={scaleIn}
          initial="hidden"
          animate="visible"
          className="lg:col-span-5 relative"
        >
          <div className="rounded-3xl border border-white/10 bg-[#0c0e14]/90 p-5 sm:p-6 space-y-4 shadow-xl backdrop-blur-2xl">
            
            {/* Portrait Container */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/40">
              <div className="h-64 sm:h-72 w-full overflow-hidden bg-[#07090e] relative">
                <img 
                  src={data.developer.avatarUrl || "/profile.jpg"} 
                  alt={data.developer.name}
                  className="w-full h-full object-cover object-[center_18%]"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0e14] via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Floating Status Badge */}
              <div className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 border border-white/10 backdrop-blur-xl">
                <span className="w-2 h-2 rounded-full bg-[#4285F4] animate-pulse" />
                <span className="text-xs font-semibold google-gemini-text">
                  Full-Stack & AI
                </span>
              </div>

              {/* Bottom Overlay Name & Title */}
              <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-black/70 border border-white/10 backdrop-blur-2xl flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="text-sm font-semibold text-white tracking-wide">
                    {data.developer.name}
                  </p>
                  <p className="text-xs text-sky-300 font-medium">
                    {data.developer.title}
                  </p>
                </div>
              </div>
            </div>

            {/* Clean Stats Row */}
            <div className="grid grid-cols-2 gap-3">
              {data.developer.quickStats.slice(0, 2).map((stat, idx) => (
                <div 
                  key={idx} 
                  className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1"
                >
                  <span className="text-xs text-white/50">{stat.label}</span>
                  <p className="text-base font-bold text-white tracking-tight">{stat.value}</p>
                  <p className="text-xs text-white/60 truncate">{stat.detail}</p>
                </div>
              ))}
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};
