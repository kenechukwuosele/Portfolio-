import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Mail, 
  Send, 
  Copy, 
  Check, 
  Github, 
  Linkedin, 
  CheckCircle2,
  MapPin
} from 'lucide-react';
import { PortfolioData } from '../types/portfolio';
import { soundFx } from '../utils/audio';
import { staggerContainer, headingReveal, fadeInUp, defaultViewport } from '../utils/animations';
import confetti from 'canvas-confetti';

interface ContactSectionProps {
  data: PortfolioData;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  data
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
    roleType: 'Senior Frontend Engineering Role'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleCopyEmail = () => {
    soundFx.playGlassTap(1800, 0.05);
    navigator.clipboard.writeText(data.developer.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.email || !formState.message) return;

    soundFx.playGlassChime();
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 }
    });

    setIsSubmitted(true);
    const subject = encodeURIComponent(`[Portfolio Inquiry] ${formState.roleType} from ${formState.name || 'Visitor'}`);
    const firstName = data.developer.name.split(' ')[0];
    const body = encodeURIComponent(`Hi ${firstName},\n\n${formState.message}\n\nFrom: ${formState.name} (${formState.email})`);
    window.location.href = `mailto:${data.developer.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-20 px-6 sm:px-12 max-w-7xl mx-auto space-y-10">
      {/* Clean Section Header */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        variants={staggerContainer}
        className="text-center space-y-2 max-w-2xl mx-auto border-t border-white/10 pt-10"
      >
        <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs font-mono">
          <Mail className="w-3.5 h-3.5 text-sky-400" />
          <span>Contact</span>
        </motion.div>
        
        <motion.h2 variants={headingReveal} className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
          Get in <span className="text-sky-400 font-semibold">Touch</span>
        </motion.h2>
        
        <motion.p variants={fadeInUp} className="text-white/70 text-sm sm:text-base font-normal leading-relaxed">
          Open to senior frontend engineering roles, consulting, and ambitious web projects.
        </motion.p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Direct Info */}
        <div className="lg:col-span-5 space-y-4">
          {/* Main Direct Email Card */}
          <div className="rounded-3xl border border-white/15 bg-[#0a0c10]/95 p-6 sm:p-7 space-y-5 shadow-xl backdrop-blur-2xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-sky-400 font-medium">Direct Reachout</span>
              <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Available for Hire
              </span>
            </div>

            <div className="space-y-1">
              <p className="text-xs text-white/50">Email Address</p>
              <p className="text-base sm:text-lg font-mono text-white font-medium break-all">
                {data.developer.email}
              </p>
            </div>

            <button
              onClick={handleCopyEmail}
              className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium text-xs border border-white/10 flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              {copiedEmail ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300">Email Copied to Clipboard</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-white/50" />
                  <span>Copy Email Address</span>
                </>
              )}
            </button>
          </div>

          {/* Social Profiles */}
          <div className="rounded-3xl border border-white/15 bg-[#0a0c10]/95 p-6 space-y-3 shadow-xl backdrop-blur-2xl">
            <p className="text-xs font-mono text-white/50">Verified Profiles</p>
            <div className="grid grid-cols-2 gap-3">
              <a
                href={data.developer.github}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 transition-all flex items-center gap-2"
              >
                <Github className="w-4 h-4 text-sky-400" />
                <span className="text-xs font-medium text-white">GitHub</span>
              </a>
              <a
                href={data.developer.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 transition-all flex items-center gap-2"
              >
                <Linkedin className="w-4 h-4 text-sky-400" />
                <span className="text-xs font-medium text-white">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Message Form */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl border border-white/15 bg-[#0a0c10]/95 p-6 sm:p-8 shadow-xl backdrop-blur-2xl">
            {isSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">Message Prepared</h3>
                <p className="text-sm text-white/70 max-w-md mx-auto">
                  Your email client has been opened with your inquiry details. Feel free to copy the email directly if needed.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs text-white font-medium transition-colors cursor-pointer"
                >
                  Send another note
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-white/70">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Rivera"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-sky-400"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-white/70">Your Email</label>
                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-sky-400"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-white/70">Inquiry Type</label>
                  <select
                    value={formState.roleType}
                    onChange={(e) => setFormState({ ...formState, roleType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#12141a] border border-white/10 text-white text-sm focus:outline-none focus:border-sky-400"
                  >
                    <option value="Backend & Systems Engineering Role">Backend & Systems Engineering Role</option>
                    <option value="Protocols, Networking & Microservices Project">Protocols, Networking & Microservices Project</option>
                    <option value="Security & Cryptographic Auth Architecture">Security & Cryptographic Auth Architecture</option>
                    <option value="Distributed AI & Algorithmic Tooling">Distributed AI & Algorithmic Tooling</option>
                    <option value="General Engineering Collaboration">General Engineering Collaboration</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-white/70">Your Message</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell me about your team, roadmap, or engineering challenge..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-sky-400 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-white text-black font-semibold text-sm flex items-center justify-center gap-2 hover:bg-white/90 transition-all shadow-md active:scale-[0.99] cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
