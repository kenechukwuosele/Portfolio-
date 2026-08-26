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
  ChevronRight
} from 'lucide-react';
import { PortfolioData } from '../types/portfolio';
import { staggerContainer, headingReveal, fadeInUp, defaultViewport } from '../utils/animations';

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
    roleType: 'Full-Stack / AI Systems Role'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(data.developer.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.email || !formState.message) return;

    setIsSubmitted(true);
    const subject = encodeURIComponent(`[Portfolio Inquiry] ${formState.roleType} from ${formState.name || 'Visitor'}`);
    const firstName = data.developer.name.split(' ')[0];
    const body = encodeURIComponent(`Hi ${firstName},\n\n${formState.message}\n\nFrom: ${formState.name} (${formState.email})`);
    window.location.href = `mailto:${data.developer.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-24 sm:py-32 px-6 sm:px-12 max-w-6xl mx-auto space-y-12">
      {/* Apple Section Header */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        variants={staggerContainer}
        className="text-center space-y-3 max-w-2xl mx-auto border-t border-white/[0.08] pt-12"
      >
        <motion.p 
          variants={fadeInUp} 
          className="text-xs font-semibold text-[#86868b] tracking-wider uppercase"
        >
          Contact
        </motion.p>
        
        <motion.h2 variants={headingReveal} className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
          Get in <span className="google-gemini-text font-bold">Touch</span>
        </motion.h2>
        
        <motion.p variants={fadeInUp} className="text-[#86868b] text-base sm:text-lg font-normal leading-relaxed">
          Open to full-stack engineering roles, applied AI systems, and technical collaborations.
        </motion.p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Direct Email & Social Profiles */}
        <div className="lg:col-span-5 space-y-5">
          <div className="rounded-[28px] border border-white/[0.08] bg-[#161617] p-7 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <span className="text-xs text-sky-400 font-medium">Direct Contact</span>
              <span className="text-xs px-3 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 flex items-center gap-1.5 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Available for Hire
              </span>
            </div>

            <div className="space-y-1">
              <p className="text-xs text-[#86868b]">Email Address</p>
              <p className="text-base text-white font-medium break-all">
                {data.developer.email}
              </p>
            </div>

            <button
              onClick={handleCopyEmail}
              className="w-full py-3 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-white font-medium text-xs border border-white/[0.08] flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              {copiedEmail ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300">Email Copied to Clipboard</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#86868b]" />
                  <span>Copy Email Address</span>
                </>
              )}
            </button>
          </div>

          <div className="rounded-[28px] border border-white/[0.08] bg-[#161617] p-6 space-y-3 shadow-2xl">
            <p className="text-xs text-[#86868b]">Verified Profiles</p>
            <div className="grid grid-cols-2 gap-3">
              <a
                href={data.developer.github}
                target="_blank"
                rel="noreferrer"
                className="p-3.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] transition-all flex items-center gap-2.5"
              >
                <Github className="w-4 h-4 text-sky-400" />
                <span className="text-xs font-medium text-white">GitHub</span>
              </a>
              <a
                href={data.developer.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-3.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] transition-all flex items-center gap-2.5"
              >
                <Linkedin className="w-4 h-4 text-sky-400" />
                <span className="text-xs font-medium text-white">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Message Form */}
        <div className="lg:col-span-7">
          <div className="rounded-[28px] border border-white/[0.08] bg-[#161617] p-7 sm:p-8 shadow-2xl">
            {isSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight">Message Prepared</h3>
                <p className="text-sm text-[#86868b] max-w-md mx-auto leading-relaxed">
                  Your email client has been opened with your inquiry details. Feel free to copy the email directly if needed.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 rounded-full bg-white/[0.08] text-white text-xs font-semibold hover:bg-white/[0.15] transition-all cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs text-[#86868b]">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Alex Taylor"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-black/40 border border-white/[0.08] text-white placeholder-white/20 text-sm focus:outline-none focus:border-sky-400 transition-colors"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs text-[#86868b]">Your Email</label>
                    <input
                      type="email"
                      required
                      placeholder="alex@example.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-black/40 border border-white/[0.08] text-white placeholder-white/20 text-sm focus:outline-none focus:border-sky-400 transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-[#86868b]">Inquiry Type</label>
                  <select
                    value={formState.roleType}
                    onChange={(e) => setFormState({ ...formState, roleType: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-black/40 border border-white/[0.08] text-white text-sm focus:outline-none focus:border-sky-400 transition-colors"
                  >
                    <option value="Full-Stack / AI Systems Role" className="bg-[#161617]">Full-Stack / AI Systems Role</option>
                    <option value="Backend Engineering Role" className="bg-[#161617]">Backend Engineering Role</option>
                    <option value="Consulting & Architecture" className="bg-[#161617]">Consulting & Architecture</option>
                    <option value="General Question" className="bg-[#161617]">General Question</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs text-[#86868b]">Message</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your project, team, or opportunity..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-black/40 border border-white/[0.08] text-white placeholder-white/20 text-sm focus:outline-none focus:border-sky-400 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-white text-black font-semibold text-sm rounded-full flex items-center justify-center gap-2 hover:bg-[#e8e8ed] transition-all active:scale-[0.99] cursor-pointer shadow-md"
                >
                  <span>Send Message</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
