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

  // Dynamically make "Full-Stack and AI systems" embody the Google Gemini gradient & glow
  const renderTypedTitle = (text: string) => {
    const prefixes = [
      { prefix: "Building intelligent, ", target: "Full-Stack and AI systems." },
      { prefix: "Entwicklung intelligenter, ", target: "Full-Stack und KI-Systeme." }
    ];

    for (const item of prefixes) {
      if (text.toLowerCase().startsWith(item.prefix.toLowerCase())) {
        const before = text.slice(0, item.prefix.length);
        const glowingPart = text.slice(item.prefix.length);
        return (
          <>
            <span className="text-white">{before}</span>
            <span className="google-gemini-text font-bold inline-block">
              {glowingPart}
            </span>
          </>
        );
      }
    }

    return <span className="text-white">{text}</span>;
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
          {/* Availability & Language Proficiency Badges */}
          <div className="flex flex-wrap items-center gap-2.5">
            <motion.div 
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl"
            >
              <span className="text-xs text-white/80 font-mono">
                {data.developer.statusBadge}
              </span>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 backdrop-blur-xl"
            >
              <span className="text-xs text-sky-300 font-mono font-medium">
                German (Intermediate) · English (Fluent)
              </span>
            </motion.div>
          </div>

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

        {/* Right Column: Liquid Glass Portrait & Engineering Bento */}
        <motion.div 
          variants={scaleIn}
          initial="hidden"
          animate="visible"
          className="lg:col-span-5 relative"
        >
          {/* Liquid Ambient Glow behind portrait */}
          <div className="absolute -inset-2 bg-gradient-to-tr from-sky-500/20 via-cyan-500/10 to-indigo-500/20 rounded-[32px] blur-2xl -z-10 opacity-70 pointer-events-none" />

          <div className="relative rounded-3xl p-[1px] bg-gradient-to-b from-white/25 via-white/10 to-white/5 shadow-[0_25px_60px_rgba(0,0,0,0.8)] backdrop-blur-3xl overflow-hidden group">
            
            {/* Top Liquid Glass Specular Highlight Bar */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-sky-400/60 to-transparent" />

            <div className="bg-[#090b10]/92 rounded-[23px] p-5 sm:p-6 space-y-4 border border-white/10">
              
              {/* Liquid Glass Portrait Container */}
              <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-gradient-to-b from-white/10 via-black/40 to-black/80 shadow-inner group/photo">
                
                {/* Photo with subtle zoom on hover */}
                <div className="h-64 sm:h-72 w-full overflow-hidden bg-[#07090e] relative">
                  <img 
                    src={data.developer.avatarUrl || "/profile.jpg"} 
                    alt={data.developer.name}
                    className="w-full h-full object-cover object-[center_18%] transition-transform duration-700 ease-out group-hover/photo:scale-105"
                    loading="eager"
                  />

                  {/* Liquid Glass Vignette & Depth Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090b10] via-transparent to-black/20 pointer-events-none" />
                  
                  {/* Subtle Top-Left Specular Sheen */}
                  <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                </div>

                {/* Floating Top-Right Live Status Glass Badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/65 border border-white/15 backdrop-blur-xl shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-[#4285F4] animate-pulse shadow-[0_0_8px_rgba(66,133,244,0.7)]" />
                  <span className="text-[10px] font-mono font-bold google-gemini-text uppercase tracking-wider">
                    Full-Stack & AI
                  </span>
                </div>

                {/* Floating Bottom Name & Title Overlay */}
                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-black/60 border border-white/15 backdrop-blur-2xl shadow-xl flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-white tracking-wide">
                      {data.developer.name}
                    </p>
                    <p className="text-[10px] font-mono text-sky-300">
                      {data.developer.title}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-white/40">Verified</span>
                  </div>
                </div>
              </div>

              {/* Clean Quick Stats Grid */}
              <div className="grid grid-cols-2 gap-2.5">
                {data.developer.quickStats.map((stat, idx) => (
                  <div 
                    key={idx} 
                    className="p-3 rounded-xl bg-white/[0.03] border border-white/10 space-y-0.5 hover:border-white/20 transition-colors"
                  >
                    <span className="text-[10px] font-mono text-white/50">{stat.label}</span>
                    <p className="text-base font-bold text-white tracking-tight">{stat.value}</p>
                    <p className="text-[10px] text-white/60 truncate">{stat.detail}</p>
                  </div>
                ))}
              </div>

              {/* Core Engineering Focus Pills */}
              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] font-mono text-white/50">Core Pillars:</span>
                <div className="flex flex-wrap gap-1">
                  {["TCP/IP & WebSockets", "asyncio Concurrency", "Argon2id & Auth", "PostgreSQL & Redis", "Applied Algorithms", "FastAPI & Python", "Critic Trees"].map((tech) => (
                    <span 
                      key={tech} 
                      className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-white/80"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Working Languages */}
              <div className="pt-2.5 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                <span className="text-white/50">Languages:</span>
                <span className="text-sky-300 font-medium">German (Intermediate) · English (Fluent)</span>
              </div>

            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
