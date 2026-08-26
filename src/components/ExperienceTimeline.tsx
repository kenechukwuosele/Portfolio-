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
    <section id="experience" className="py-24 px-6 sm:px-12 max-w-6xl mx-auto space-y-10">
      {/* Apple Section Header */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={defaultViewport}
        variants={staggerContainer}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-2 border-t border-white/[0.08] pt-12"
      >
        <div className="space-y-3">
          <motion.p 
            variants={fadeInUp} 
            className="apple-eyebrow"
          >
            Experience
          </motion.p>
          
          <motion.h2 variants={headingReveal} className="apple-headline text-4xl sm:text-5xl font-bold text-white">
            Career & <span className="apple-intelligence-gradient font-bold">Background</span>
          </motion.h2>
          
          <motion.p variants={fadeInUp} className="apple-body text-base sm:text-lg max-w-xl">
            Full-stack engineering, AI developer tooling, open-source systems, and computer engineering coursework.
          </motion.p>
        </div>

        <motion.button
          variants={fadeInUp}
          onClick={() => {
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
                        color: #0f172a;
                        text-transform: uppercase;
                        letter-spacing: 0.8px;
                        border-bottom: 1.5px solid #0f172a;
                        padding-bottom: 3px;
                        margin-top: 14px;
                        margin-bottom: 8px;
                      }
                      .entry {
                        margin-bottom: 11px;
                      }
                      .entry-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: baseline;
                        margin-bottom: 2px;
                      }
                      .entry-title {
                        font-weight: 700;
                        font-size: 10.5pt;
                        color: #0f172a;
                      }
                      .entry-company {
                        font-weight: 600;
                        color: #1e293b;
                      }
                      .entry-date {
                        font-size: 9pt;
                        color: #64748b;
                        font-weight: 500;
                      }
                      .entry-location {
                        font-size: 8.5pt;
                        color: #64748b;
                      }
                      .entry-desc {
                        font-size: 9.5pt;
                        color: #334155;
                        margin-bottom: 4px;
                      }
                      ul.achievements {
                        list-style-type: none;
                        padding-left: 0;
                      }
                      ul.achievements li {
                        position: relative;
                        padding-left: 14px;
                        font-size: 9pt;
                        color: #334155;
                        margin-bottom: 3px;
                        line-height: 1.4;
                      }
                      ul.achievements li::before {
                        content: "•";
                        position: absolute;
                        left: 2px;
                        color: #0284c7;
                        font-weight: bold;
                      }
                      .skills-grid {
                        display: grid;
                        grid-template-columns: 140px 1fr;
                        row-gap: 5px;
                        font-size: 9pt;
                        margin-top: 4px;
                      }
                      .skill-category {
                        font-weight: 700;
                        color: #0f172a;
                      }
                      .skill-list {
                        color: #334155;
                      }
                      @media print {
                        .no-print-bar {
                          display: none !important;
                        }
                        .container {
                          padding: 0 !important;
                        }
                        body {
                          font-size: 10pt;
                        }
                      }
                    </style>
                  </head>
                  <body>
                    <div class="container">
                      <div class="no-print-bar">
                        <span>Print Preview: ${developerName} Resume</span>
                        <button class="btn-print" onclick="window.print()">Print / Save PDF</button>
                      </div>

                      <div class="header">
                        <div class="name">${developerName}</div>
                        <div class="contact-info">Lagos, Nigeria • ${developerEmail}</div>
                        <div class="contact-links">

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
            className="group rounded-[28px] border border-white/[0.08] bg-[#161617] p-7 sm:p-8 space-y-6 shadow-2xl transition-all duration-300"
            id={`experience-card-${item.id}`}
          >
            {/* Header Info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/[0.06]">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h3 className="text-2xl font-bold text-white tracking-tight">
                    {item.role}
                  </h3>
                  <span className="text-xs text-sky-400 px-3 py-0.5 rounded-full bg-sky-400/10 border border-sky-400/20 font-medium">
                    {item.type}
                  </span>
                </div>
                
                <div className="flex flex-wrap items-center gap-3 text-sm text-[#86868b]">
                  <span className="font-semibold text-white flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-sky-400" />
                    {item.company}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#86868b]" />
                    {item.location}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:self-center">
                {item.highlightMetric && (
                  <div className="px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-1.5 font-medium">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{item.highlightMetric}</span>
                  </div>
                )}
                <div className="px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-xs text-[#86868b] flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-sky-400" />
                  <span>{item.period}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-base text-[#86868b] leading-relaxed font-normal">
              {item.description}
            </p>

            {/* Accomplishments */}
            <div className="space-y-2.5 pt-1">
              <span className="text-xs text-[#86868b] font-semibold uppercase tracking-wider">Key Contributions</span>
              <ul className="space-y-2">
                {item.achievements.map((ach, aIdx) => (
                  <li key={aIdx} className="flex items-start gap-2.5 text-sm text-white/80 font-normal leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-2 shrink-0" />
                    <span>{ach}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stack Chips */}
            <div className="pt-4 border-t border-white/[0.06] flex flex-wrap items-center gap-1.5">
              <span className="text-xs text-[#86868b] mr-1">Technologies:</span>
              {item.technologies.map((tech) => (
                <span 
                  key={tech}
                  className="text-xs px-2.5 py-1 rounded-lg bg-white/[0.04] text-white/70 border border-white/[0.06]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
