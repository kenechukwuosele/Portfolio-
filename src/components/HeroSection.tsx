import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Copy, 
  Check, 
  ArrowRight
} from 'lucide-react';
import { PortfolioData } from '../types/portfolio';
import { soundFx } from '../utils/audio';
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
  onContactClick,
  onOpenCLI
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Typewriter effect state
  // English: "Building intelligent, Full-Stack and AI systems."
  // German: "Entwicklung intelligenter, Full-Stack und KI-Systeme."
  const englishPhrase = "Building intelligent, Full-Stack and AI systems.";
  const germanPhrase = "Entwicklung intelligenter, Full-Stack und KI-Systeme.";

  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0); // 0 = English, 1 = German
  const phrases = [englishPhrase, germanPhrase];

  useEffect(() => {
    const currentTarget = phrases[phraseIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      // Typing forward
      if (displayedText.length < currentTarget.length) {
        timeout = setTimeout(() => {
          setDisplayedText(currentTarget.slice(0, displayedText.length + 1));
        }, 55);
      } else {
        // Finished typing current phrase, pause before deleting
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2200);
      }
    } else {
      // Deleting backwards
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(currentTarget.slice(0, displayedText.length - 1));
        }, 28);
      } else {
        // Finished deleting, switch to next phrase
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, phraseIndex]);

  // Dynamically highlight "Full-Stack" in a distinct vibrant cyan color while typing
  const renderTypedTitle = (text: string) => {
    const target = "Full-Stack";
    const lowerText = text.toLowerCase();
    const lowerTarget = target.toLowerCase();
    
    const index = lowerText.indexOf(lowerTarget);
    if (index !== -1) {
      const before = text.slice(0, index);
      const highlighted = text.slice(index, index + target.length);
      const after = text.slice(index + target.length);
      return (
        <>
          <span>{before}</span>
          <span className="text-cyan-400 font-semibold drop-shadow-[0_0_16px_rgba(34,211,238,0.4)]">
            {highlighted}
          </span>
          <span>{after}</span>
        </>
      );
    }

    // Handle mid-typing of "Full-Stack"
    const prefixes = ["building intelligent, ", "entwicklung intelligenter, "];
    for (const prefix of prefixes) {
      if (lowerText.startsWith(prefix)) {
        const typedTargetPart = text.slice(prefix.length);
        if (typedTargetPart.length <= target.length && target.toLowerCase().startsWith(typedTargetPart.toLowerCase())) {
          return (
            <>
              <span>{text.slice(0, prefix.length)}</span>
              <span className="text-cyan-400 font-semibold drop-shadow-[0_0_16px_rgba(34,211,238,0.4)]">
                {typedTargetPart}
              </span>
            </>
          );
        }
      }
    }

    return <span>{text}</span>;
  };

  const handleCopyEmail = () => {
    soundFx.playGlassTap(1800, 0.05);
    navigator.clipboard.writeText(data.developer.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-[90vh] flex flex-col justify-center pt-24 sm:pt-28 pb-16 px-6 sm:px-12 max-w-7xl mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
        
        {/* Left Column: Headline, Concise Subtitle & CTAs */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 space-y-6"
        >
          {/* Developer Photo & Badges */}
          <motion.div variants={fadeInUp} className="flex items-center gap-4">
            <div className="relative group shrink-0">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden p-[2px] bg-gradient-to-tr from-sky-400 via-cyan-300 to-indigo-500 shadow-[0_0_30px_rgba(56,189,248,0.3)] transition-transform duration-300 group-hover:scale-105">
                <img 
                  src={data.developer.avatarUrl || "https://avatars.githubusercontent.com/u/226654465?v=4"} 
                  alt={data.developer.name}
                  className="w-full h-full object-cover rounded-[14px] bg-[#0d0f17]"
                  loading="eager"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl">
                  <span className="text-xs text-white/80 font-mono">
                    {data.developer.statusBadge}
                  </span>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 backdrop-blur-xl">
                  <span className="text-xs text-sky-300 font-mono font-medium">
                    German Proficient (Deutsch) · English
                  </span>
                </div>
              </div>
              <p className="text-xs font-mono text-white/40 pl-1">{data.developer.name}</p>
            </div>
          </motion.div>

          {/* Clean Hero Title with Typewriter & Subtitle */}
          <motion.div variants={fadeInUp} className="space-y-3">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white font-sans leading-[1.08] min-h-[2.4em] sm:min-h-[2.2em]">
              {renderTypedTitle(displayedText)}
              <span className="inline-block w-1.5 h-8 sm:h-12 lg:h-14 ml-1 bg-sky-400 align-middle animate-pulse" />
            </h1>
            <p className="text-base sm:text-lg text-white/70 max-w-xl font-normal leading-relaxed">
              Software Engineer crafting AI-powered developer tools, voice copilots, MERN applications, and machine learning pipelines.
            </p>
          </motion.div>

          {/* Socials (Location removed) */}
          <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-4 text-xs font-mono text-white/50">
            <div className="flex items-center gap-3">
              <a 
                href={data.developer.github} 
                target="_blank" 
                rel="noreferrer"
                className="hover:text-white transition-colors flex items-center gap-1"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
              <a 
                href={data.developer.linkedin} 
                target="_blank" 
                rel="noreferrer"
                className="hover:text-white transition-colors flex items-center gap-1"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>
            </div>
          </motion.div>

          {/* Primary Action Buttons */}
          <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => {
                soundFx.playGlassTap(1400, 0.05);
                onExploreWork();
              }}
              className="px-6 py-3.5 bg-white text-black rounded-xl font-semibold text-sm flex items-center gap-2 hover:bg-white/90 transition-all shadow-lg active:scale-[0.98] cursor-pointer"
              id="hero-explore-work-button"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                soundFx.playGlassTap(1500, 0.04);
                onContactClick();
              }}
              className="px-6 py-3.5 bg-white/5 border border-white/10 rounded-xl font-semibold text-sm text-white backdrop-blur-md hover:bg-white/10 transition-all active:scale-[0.98] cursor-pointer"
              id="hero-get-in-touch-button"
            >
              Get in Touch
            </button>

            <button
              onClick={handleCopyEmail}
              className="px-3.5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 backdrop-blur-md text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer"
              title="Copy Email Address"
              id="hero-copy-email-button"
            >
              {copiedEmail ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span className="hidden sm:inline">Copy Email</span>
                </>
              )}
            </button>
          </motion.div>
        </motion.div>

        {/* Right Column: High-Impact Glass Capability Bento */}
        <motion.div 
          variants={scaleIn}
          initial="hidden"
          animate="visible"
          className="lg:col-span-5 relative"
        >
          <div className="relative rounded-3xl p-[1px] bg-gradient-to-b from-white/20 via-white/10 to-white/5 shadow-2xl backdrop-blur-2xl">
            <div className="bg-[#090b10]/90 rounded-[23px] p-6 sm:p-7 space-y-5 border border-white/10">
              
              {/* Header inside Card without logo */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-white">Engineering Overview</span>
                </div>
                <span className="text-xs font-mono text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded-full border border-sky-500/20">
                  Active
                </span>
              </div>

              {/* Clean Quick Stats Grid */}
              <div className="grid grid-cols-2 gap-3">
                {data.developer.quickStats.map((stat, idx) => (
                  <div 
                    key={idx} 
                    className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-1 hover:border-white/20 transition-colors"
                  >
                    <span className="text-xs text-white/50">{stat.label}</span>
                    <p className="text-xl font-bold text-white tracking-tight">{stat.value}</p>
                    <p className="text-[11px] text-white/60">{stat.detail}</p>
                  </div>
                ))}
              </div>

              {/* Core Specialization Pills */}
              <div className="pt-2 space-y-2">
                <span className="text-xs font-mono text-white/50">Core Focus:</span>
                <div className="flex flex-wrap gap-1.5">
                  {["FastAPI & Python", "PostgreSQL & Redis", "Argon2 & JWT", "TypeScript & React", "Node.js & MERN", "RAG & ChromaDB", "Scikit-Learn"].map((tech) => (
                    <span 
                      key={tech} 
                      className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-medium text-white/80"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Working Languages */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                <span className="text-white/50">Languages:</span>
                <span className="text-sky-300 font-medium">German (Proficient) · English (Fluent)</span>
              </div>

            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
