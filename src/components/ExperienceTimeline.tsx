import React from 'react';
import { motion } from 'motion/react';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  FileText, 
  TrendingUp, 
  Building2
} from 'lucide-react';
import { ExperienceItem } from '../types/portfolio';
import { soundFx } from '../utils/audio';
import { staggerContainer, headingReveal, fadeInUp, defaultViewport } from '../utils/animations';

interface ExperienceTimelineProps {
  experience: ExperienceItem[];
  resumeUrl: string;
  developerName?: string;
  developerEmail?: string;
}

export const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({
  experience,
  resumeUrl,
  developerName = 'Kenechukwu Osele',
  developerEmail = 'oseleken9@gmail.com'
}) => {
  return (
    <section id="experience" className="py-20 px-6 sm:px-12 max-w-7xl mx-auto space-y-10">
      {/* Clean Section Header */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        variants={staggerContainer}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-t border-white/10 pt-10"
      >
        <div className="space-y-2">
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs font-mono">
            <Briefcase className="w-3.5 h-3.5 text-sky-400" />
            <span>Career History</span>
          </motion.div>
          
          <motion.h2 variants={headingReveal} className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
            Professional <span className="text-sky-400 font-semibold">Experience</span>
          </motion.h2>
          
          <motion.p variants={fadeInUp} className="text-white/70 text-sm sm:text-base max-w-xl font-normal leading-relaxed">
            Full-stack engineering, AI developer tooling, open-source systems, and machine learning pipelines.
          </motion.p>
        </div>

        <motion.button
          variants={fadeInUp}
          onClick={() => {
            soundFx.playGlassTap(1500, 0.04);
            const printWindow = window.open('', '_blank');
            if (printWindow) {
              printWindow.document.write(`
                <html>
                  <head><title>${developerName} - Resume</title></head>
                  <body style="font-family: system-ui, -apple-system, sans-serif; padding: 40px; line-height: 1.6; max-width: 800px; margin: auto; color: #111;">
                    <h1>${developerName}</h1>
                    <p>Full-Stack Engineer & AI Systems Developer • ${developerEmail}</p>
                    <hr style="margin: 20px 0; border: 0; border-top: 1px solid #ccc;"/>
                    <h2>Experience</h2>
                    ${experience.map(e => `
                      <div style="margin-bottom: 24px;">
                        <h3 style="margin-bottom: 4px;">${e.role} · ${e.company} (${e.period})</h3>
                        <p style="color: #555; margin-bottom: 8px;"><em>${e.description}</em></p>
                        <ul style="padding-left: 20px;">${e.achievements.map(a => `<li style="margin-bottom: 4px;">${a}</li>`).join('')}</ul>
                      </div>
                    `).join('')}
                  </body>
                </html>
              `);
              printWindow.document.close();
            }
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold backdrop-blur-md transition-colors cursor-pointer"
          id="btn-view-printable-resume"
        >
          <FileText className="w-4 h-4 text-sky-400" />
          <span>Printable Resume</span>
        </motion.button>
      </motion.div>

      {/* Experience Cards */}
      <div className="space-y-6">
        {experience.map((item) => (
          <div
            key={item.id}
            className="group rounded-3xl p-[1px] bg-gradient-to-b from-white/15 via-white/5 to-transparent hover:from-white/25 transition-all duration-300 shadow-xl"
            id={`experience-card-${item.id}`}
          >
            <div className="bg-[#0a0c10]/95 rounded-[23px] p-6 sm:p-8 space-y-6 transition-colors duration-300">
              
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/10">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      {item.role}
                    </h3>
                    <span className="text-xs font-mono text-sky-400 px-2.5 py-0.5 rounded-full bg-sky-400/10 border border-sky-400/20">
                      {item.type}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-white/60">
                    <span className="font-semibold text-white flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-sky-400" />
                      {item.company}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-white/40" />
                      {item.location}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 sm:self-center">
                  {item.highlightMetric && (
                    <div className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-mono flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{item.highlightMetric}</span>
                    </div>
                  )}
                  <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-white/70 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-sky-400" />
                    <span>{item.period}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-white/80 leading-relaxed font-normal">
                {item.description}
              </p>

              {/* Accomplishments */}
              <div className="space-y-2 pt-1">
                <span className="text-xs font-mono text-white/50 uppercase tracking-wider">Key Contributions:</span>
                <ul className="space-y-2">
                  {item.achievements.map((ach, aIdx) => (
                    <li key={aIdx} className="flex items-start gap-2 text-xs sm:text-sm text-white/70 font-normal">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-2 shrink-0" />
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Stack Chips */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-1.5">
                <span className="text-xs font-mono text-white/40 mr-1">Technologies:</span>
                {item.technologies.map((tech) => (
                  <span 
                    key={tech}
                    className="text-[11px] font-mono px-2.5 py-0.5 rounded-lg bg-white/5 text-white/70 border border-white/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
