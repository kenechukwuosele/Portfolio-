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
                <!DOCTYPE html>
                <html lang="en">
                  <head>
                    <meta charset="UTF-8" />
                    <title>Osele Kenechukwu Alexander - Resume</title>
                    <style>
                      @page {
                        size: A4;
                        margin: 18mm 16mm 18mm 16mm;
                      }
                      * {
                        box-sizing: border-box;
                        margin: 0;
                        padding: 0;
                      }
                      body {
                        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
                        color: #1a1a1a;
                        background: #ffffff;
                        line-height: 1.45;
                        font-size: 10.5pt;
                      }
                      .container {
                        max-width: 820px;
                        margin: 0 auto;
                        padding: 24px 30px;
                      }
                      .no-print-bar {
                        background: #0f172a;
                        color: #ffffff;
                        padding: 12px 20px;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        border-radius: 8px;
                        margin-bottom: 24px;
                        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                      }
                      .btn-print {
                        background: #38bdf8;
                        color: #0f172a;
                        border: none;
                        padding: 8px 18px;
                        font-weight: 700;
                        font-size: 13px;
                        border-radius: 6px;
                        cursor: pointer;
                        transition: background 0.2s;
                      }
                      .btn-print:hover {
                        background: #7dd3fc;
                      }
                      .header {
                        text-align: center;
                        margin-bottom: 14px;
                      }
                      .name {
                        font-size: 18pt;
                        font-weight: 800;
                        letter-spacing: 0.5px;
                        color: #0f172a;
                        text-transform: uppercase;
                        margin-bottom: 3px;
                      }
                      .contact-info {
                        font-size: 9pt;
                        color: #334155;
                        margin-bottom: 4px;
                      }
                      .contact-links {
                        font-size: 9pt;
                        color: #2563eb;
                      }
                      .contact-links a {
                        color: #0284c7;
                        text-decoration: none;
                      }
                      .contact-links a:hover {
                        text-decoration: underline;
                      }
                      .section-title {
                        font-size: 10.5pt;
                        font-weight: 800;
                        text-transform: uppercase;
                        letter-spacing: 0.5px;
                        color: #0f172a;
                        border-bottom: 1.5px solid #0f172a;
                        padding-bottom: 2px;
                        margin-top: 14px;
                        margin-bottom: 8px;
                      }
                      .item-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: baseline;
                        margin-bottom: 2px;
                      }
                      .item-title {
                        font-weight: 700;
                        font-size: 10pt;
                        color: #0f172a;
                      }
                      .item-date {
                        font-size: 9pt;
                        color: #475569;
                        font-weight: 600;
                      }
                      .item-subtitle {
                        font-size: 9.5pt;
                        color: #334155;
                        margin-bottom: 4px;
                      }
                      ul {
                        list-style-type: disc;
                        padding-left: 18px;
                        margin-bottom: 8px;
                      }
                      li {
                        font-size: 9pt;
                        color: #334155;
                        margin-bottom: 3px;
                        line-height: 1.35;
                      }
                      .skills-line {
                        font-size: 9pt;
                        color: #334155;
                        margin-bottom: 4px;
                        line-height: 1.4;
                      }
                      .skills-line strong {
                        color: #0f172a;
                      }
                      @media print {
                        .no-print-bar {
                          display: none !important;
                        }
                        .container {
                          padding: 0;
                          max-width: 100%;
                        }
                        body {
                          background: #ffffff;
                          color: #000000;
                        }
                      }
                    </style>
                  </head>
                  <body>
                    <div class="container">
                      <div class="no-print-bar">
                        <div>
                          <strong style="font-size: 14px;">Official Resume</strong>
                          <span style="font-size: 12px; color: #94a3b8; margin-left: 8px;">Print or Save as PDF</span>
                        </div>
                        <button class="btn-print" onclick="window.print()">🖨️ Print / Save PDF</button>
                      </div>

                      <div class="header">
                        <div class="name">OSELE KENECHUKWU ALEXANDER</div>
                        <div class="contact-info">Lagos, Nigeria &nbsp;•&nbsp; +234 816 028 4721</div>
                        <div class="contact-links">
                          <a href="mailto:kenechukwu.osele@outlook.com">kenechukwu.osele@outlook.com</a> &nbsp;|&nbsp;
                          <a href="https://linkedin.com/in/kenechukwuosele" target="_blank">linkedin.com/in/kenechukwuosele</a> &nbsp;|&nbsp;
                          <a href="https://github.com/kenechukwuosele" target="_blank">github.com/kenechukwuosele</a>
                        </div>
                      </div>

                      <div class="section-title">Education</div>
                      <div>
                        <div class="item-header">
                          <span class="item-title">Covenant University, Ota, Nigeria</span>
                          <span class="item-date">August 2026</span>
                        </div>
                        <div class="item-subtitle">B.Eng. Computer Engineering (4.16/5.00, Second Class Upper)</div>
                        <ul>
                          <li><strong>Focus areas:</strong> machine learning, applied LLMs, computer networks, and software systems</li>
                          <li><strong>Relevant coursework:</strong> Algorithms and Data structures, Computer networks, Database systems, Probability and Statistics, Natural Language Processing and Computer Vision</li>
                        </ul>
                      </div>

                      <div class="section-title">Work Experience</div>
                      
                      <div style="margin-bottom: 6px;">
                        <div class="item-header">
                          <span class="item-title">Networking Intern - First City Monument Bank (FCMB), Lagos</span>
                          <span class="item-date">Mar 2025 – Nov 2025</span>
                        </div>
                        <ul>
                          <li>Escalated network faults to ISPs and resolved downtime incidents across multiple branches, cutting average resolution time by 4hrs/day</li>
                          <li>Led report generation spanning all branch networks across Nigeria as head networking intern, consolidating telemetry from over 200 sites into unified monitoring summaries.</li>
                        </ul>
                      </div>

                      <div style="margin-bottom: 6px;">
                        <div class="item-header">
                          <span class="item-title">Software and Documentation Intern - UNIVASA eSIM Technologies, Lagos</span>
                          <span class="item-date">Mar 2025 – Sep 2025</span>
                        </div>
                        <ul>
                          <li>Authored complete REST API documentation for UNIVASA eSIM covering endpoint references, authentication flows, error codes, and integration examples, cutting third-party developer onboarding time</li>
                          <li>Shipped a Python data-cleaning and reporting automation script for a small business client, removing roughly four hours of manual reporting work per weekly cycle</li>
                        </ul>
                      </div>

                      <div class="section-title">Projects</div>

                      <div style="margin-bottom: 6px;">
                        <div class="item-title">Real-Time Student Assessment Platform using Artificial intelligence</div>
                        <ul>
                          <li>Open-source AI-augmented LMS that adds browser-side face verification, real-time engagement monitoring, and a RAG-based hint pipeline to a production learning environment.</li>
                          <li>Implemented real-time engagement monitoring with gamification mechanics to sustain student attention during sessions, layered on top of the browser-side face verification and RAG-based hint pipeline</li>
                        </ul>
                      </div>

                      <div style="margin-bottom: 6px;">
                        <div class="item-title">AI-Powered Command-Line Interface for Autonomous Database Administration</div>
                        <ul>
                          <li>Open-source AI-powered CLI that translates plain English into optimized SQL and NoSQL queries across four database engines, removing the need for manual query writing</li>
                          <li>Lowered per-query inference cost by approximately 90% through a task-routing system that sends simple requests to lightweight models and reserves capable LLMs for complex ones, with a two-model critic pattern that reviews queries before they hit the database.</li>
                        </ul>
                      </div>

                      <div class="section-title">Volunteer Experience</div>

                      <div style="margin-bottom: 6px;">
                        <div class="item-header">
                          <span class="item-title">Website Designer - Digital Yearbook Team, Covenant University</span>
                          <span class="item-date">Aug 2026 – Oct 2026</span>
                        </div>
                        <ul>
                          <li>Designing and building the frontend of a digital yearbook site with React and Tailwind CSS, serving 72 graduating classmates, scheduled to launch after graduation</li>
                        </ul>
                      </div>

                      <div style="margin-bottom: 6px;">
                        <div class="item-header">
                          <span class="item-title">Developer - Digital SIWES+ Platform (with a friend)</span>
                          <span class="item-date">Aug 2025 – Sep 2026</span>
                        </div>
                        <ul>
                          <li>Built a full-stack platform digitizing the end-to-end SIWES placement process using Python, FastAPI, React, and Node.js; currently pending approval</li>
                        </ul>
                      </div>

                      <div class="section-title">Skills and Interests</div>
                      <div class="skills-line">
                        <strong>Programming Languages:</strong> Python, TypeScript, JavaScript, FastAPI, React, Node.js, Express.js, REST APIs, Tailwind CSS
                      </div>
                      <div class="skills-line">
                        <strong>Soft Skills:</strong> Teamwork & Collaboration, Communication, Adaptability & Resilience, Emotional Intelligence
                      </div>
                      <div class="skills-line">
                        <strong>Languages:</strong> English (fluent), German (intermediate)
                      </div>
                      <div class="skills-line">
                        <strong>Interests:</strong> Playing basketball, Swimming, Reading
                      </div>

                    </div>
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
