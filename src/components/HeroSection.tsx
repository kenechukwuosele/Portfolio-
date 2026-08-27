import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Copy, 
  Check, 
  ChevronRight
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

  // Typewriter effect alternating English and German
  const englishPhrase = "I build intelligent software systems";
  const germanPhrase = "Ich baue intelligente Softwaresysteme";
  const phrases = [englishPhrase, germanPhrase];

  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const currentTarget = phrases[phraseIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      // Typing forward
      if (displayedText.length < currentTarget.length) {
        timeout = setTimeout(() => {
          setDisplayedText(currentTarget.slice(0, displayedText.length + 1));
        }, 50);
      } else {
        // Pause at completion before deleting
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2200);
      }
    } else {
      // Deleting backwards
      if (displayedText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedText(currentTarget.slice(0, displayedText.length - 1));
        }, 25);
      } else {
        // Switch to next language
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, phraseIndex]);

  // Render text with Apple Intelligence gradient on "intelligent software systems" / "intelligente Softwaresysteme"
  const renderTypedTitle = (text: string) => {
    const prefixes = [
      { prefix: "I build ", target: "intelligent software systems" },
      { prefix: "Ich baue ", target: "intelligente Softwaresysteme" }
    ];

    for (const item of prefixes) {
      if (text.toLowerCase().startsWith(item.prefix.toLowerCase())) {
        const before = text.slice(0, item.prefix.length);
        const glowingPart = text.slice(item.prefix.length);
        return (
          <>
            <span className="text-white">{before}</span>
            <span className="apple-intelligence-gradient font-bold inline-block">
              {glowingPart}
            </span>
          </>
        );
      }
    }

    return <span className="text-white">{text}</span>;
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(data.developer.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-[85vh] flex flex-col justify-center pt-28 sm:pt-36 pb-20 px-6 sm:px-12 max-w-6xl mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
        
        {/* Left Column: Headline, Subtitle & Action Row */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 space-y-7"
        >
          {/* Hero Headline with English & German Typewriter */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <h1 className="apple-headline text-4xl sm:text-6xl lg:text-7xl font-bold text-white min-h-[2.4em] sm:min-h-[2.2em] leading-[1.08]">
              {renderTypedTitle(displayedText)}
              <span className="inline-block w-1 h-7 sm:h-11 lg:h-14 ml-1.5 bg-sky-400 align-middle animate-pulse" />
            </h1>
          </motion.div>

          {/* Primary Action Buttons (Apple Rounded-Full Pills) */}
          <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-3.5 pt-1">
            <button
              onClick={onExploreWork}
              className="px-6 py-3 bg-white text-black rounded-full font-medium text-sm flex items-center gap-2 hover:bg-[#e8e8ed] transition-all shadow-md active:scale-[0.98] cursor-pointer"
              id="hero-explore-work-button"
            >
              <span>Explore Projects</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={onContactClick}
              className="px-6 py-3 bg-white/[0.08] border border-white/[0.12] rounded-full font-medium text-sm text-white hover:bg-white/[0.14] transition-all active:scale-[0.98] cursor-pointer"
              id="hero-get-in-touch-button"
            >
              Get in Touch
            </button>

            <button
              onClick={handleCopyEmail}
              className="px-4 py-3 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-[#86868b] hover:text-white border border-white/[0.08] text-xs flex items-center gap-1.5 transition-all cursor-pointer"
              title="Copy Email Address"
              id="hero-copy-email-button"
            >
              {copiedEmail ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300 font-medium">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span className="font-medium">Copy Email</span>
                </>
              )}
            </button>
          </motion.div>

          {/* Social Links & Languages */}
          <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-5 text-xs text-[#86868b] pt-1">
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
          </motion.div>
        </motion.div>

        {/* Right Column: Clean Apple Bento Portrait Card */}
        <motion.div 
          variants={scaleIn}
          initial="hidden"
          animate="visible"
          className="lg:col-span-5 relative"
        >
          <div className="rounded-[28px] border border-white/[0.08] bg-[#161617] p-6 space-y-4 shadow-2xl">
            
            {/* Portrait Container without floating badge */}
            <div className="relative rounded-2xl overflow-hidden bg-black">
              <div className="h-64 sm:h-72 w-full overflow-hidden relative">
                <img 
                  src={data.developer.avatarUrl || "/profile.jpg"} 
                  alt={data.developer.name}
                  className="w-full h-full object-cover object-[center_18%]"
                  loading="eager"
                />
              </div>

              {/* Bottom Overlay Name & Title */}
              <div className="absolute bottom-3 left-3 right-3 p-3.5 rounded-xl bg-black/80 border border-white/[0.08] backdrop-blur-md flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="text-sm font-semibold text-white">
                    {data.developer.name}
                  </p>
                  <p className="text-xs text-[#86868b]">
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
                  className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-1"
                >
                  <span className="text-xs text-[#86868b]">{stat.label}</span>
                  <p className="text-base font-semibold text-white tracking-tight">{stat.value}</p>
                  <p className="text-xs text-[#86868b] truncate">{stat.detail}</p>
                </div>
              ))}
            </div>

            {/* Working Languages */}
            <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between text-xs">
              <span className="text-[#86868b]">Languages</span>
              <span className="text-white font-medium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Deutsch (A2/B1) · English (Fluent)
              </span>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};
