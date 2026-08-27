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
                        size: letter;
                        margin: 0.55in 0.65in 0.55in 0.65in;
                      }
                      * {
                        box-sizing: border-box;
                        margin: 0;
                        padding: 0;
                      }
                      body {
                        font-family: "Times New Roman", Times, "Nimbus Roman No9 L", serif;
                        color: #000000;
                        background: #ffffff;
                        line-height: 1.24;
                        font-size: 10pt;
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                      }
                      .container {
                        max-width: 800px;
                        margin: 0 auto;
                        padding: 24px 28px;
                        text-align: justify;
                      }
                      .no-print-bar {
                        background: #161617;
                        color: #ffffff;
                        padding: 10px 18px;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        border-radius: 8px;
                        margin-bottom: 24px;
                        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                        font-size: 13px;
                        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                        text-align: left;
                      }
                      .btn-print {
                        background: #0071e3;
                        color: #ffffff;
                        border: none;
                        padding: 7px 18px;
                        font-weight: 600;
                        font-size: 12px;
                        border-radius: 6px;
                        cursor: pointer;
                        transition: background 0.15s;
                      }
                      .btn-print:hover {
                        background: #0077ed;
                      }
                      .header {
                        text-align: center !important;
                        margin-bottom: 10px;
                      }
                      .header-name {
                        font-size: 14pt;
                        font-weight: bold;
                        text-transform: uppercase;
                        letter-spacing: 0.5px;
                        margin-bottom: 2px;
                      }
                      .header-info {
                        font-size: 10pt;
                        line-height: 1.3;
                      }
                      .header-links {
                        font-size: 10pt;
                        margin-top: 1px;
                      }
                      .header-links a {
                        color: #0000ee;
                        text-decoration: underline;
                      }
                      .section-title {
                        font-size: 10.5pt;
                        font-weight: bold;
                        text-transform: uppercase;
                        border-bottom: 1px solid #000000;
                        padding-bottom: 1px;
                        margin-top: 9px;
                        margin-bottom: 3px;
                        text-align: left;
                      }
                      .item-row {
                        display: flex;
                        justify-content: space-between;
                        align-items: baseline;
                        font-size: 10pt;
                        text-align: left;
                      }
                      .bold {
                        font-weight: bold;
                      }
                      .bullet-item {
                        margin-left: 20px;
                        text-indent: -13px;
                        line-height: 1.23;
                        font-size: 10pt;
                        margin-bottom: 1px;
                        text-align: justify;
                        text-justify: inter-word;
                      }
                      .skill-line {
                        font-size: 10pt;
                        line-height: 1.24;
                        margin-bottom: 2px;
                        text-align: justify;
                        text-justify: inter-word;
                      }
                      @media print {
                        .no-print-bar {
                          display: none !important;
                        }
                        .container {
                          padding: 0 !important;
                          max-width: 100% !important;
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
                        <span>Print Preview: Osele Kenechukwu Alexander Resume</span>
                        <button class="btn-print" onclick="window.print()">Print / Save PDF</button>
                      </div>

                      <div class="header">
                        <div class="header-name">OSELE KENECHUKWU ALEXANDER</div>
                        <div class="header-info">Lagos, Nigeria</div>
                        <div class="header-links">
                          | +234 (0) 816 028 4721 | <a href="mailto:oseleken9@gmail.com">oseleken9@gmail.com</a> | <a href="https://linkedin.com/in/kenechukwuosele" target="_blank">linkedin.com/in/kenechukwuosele</a> | <a href="https://kenechukwuosele.me" target="_blank">https://kenechukwuosele.me</a>
                        </div>
                      </div>

                      <div class="section-title">EDUCATION</div>
                      <div class="item-row">
                        <span class="bold">Covenant University, Ota, Nigeria</span>
                        <span>August 2026</span>
                      </div>
                      <div>B.Eng. Computer Engineering (4.16/5.00, Second Class Upper)</div>
                      <div class="bullet-item">• Focus areas: machine learning, applied LLMs, computer networks, and software systems</div>
                      <div class="bullet-item">• Relevant coursework: Algorithms and Data Structures, Computer Networks, Embedded Systems and Programming, Probability and Statistics, Computer Graphics, Artificial Intelligence</div>

                      <div class="section-title">WORK EXPERIENCE</div>
                      <div class="item-row">
                        <span class="bold">Networking Intern — First City Monument Bank (FCMB), Lagos</span>
                        <span>Mar 2025 – Nov 2025</span>
                      </div>
                      <div class="bullet-item">• Led report generation spanning all branch networks across Nigeria as head networking intern, consolidating telemetry from over 200 sites into unified monitoring summaries</div>
                      <div class="bullet-item">• Escalated network faults to ISPs and resolved downtime incidents across multiple branches, cutting average resolution time by 4hrs/day</div>

                      <div class="item-row" style="margin-top: 4px;">
                        <span class="bold">Software and Documentation Intern — UNIVASA eSIM Technologies, Lagos</span>
                        <span>Mar 2025 – Sep 2025</span>
                      </div>
                      <div class="bullet-item">• Authored complete REST API documentation for UNIVASA eSIM covering endpoint references, authentication flows, error codes, and integration examples, cutting third-party developer onboarding time</div>
                      <div class="bullet-item">• Shipped a Python data-cleaning and reporting automation script for a small business client, removing roughly four hours of manual reporting work per weekly cycle</div>

                      <div class="section-title">PROJECTS</div>
                      <div class="bold">Real-Time Student Assessment Platform using Artificial Intelligence (Final Year Project)</div>
                      <div class="bullet-item">• Open-source AI-augmented LMS that adds browser-side face verification, real-time engagement monitoring, and a RAG-based hint pipeline to a production learning environment</div>
                      <div class="bullet-item">• Implemented real-time engagement monitoring with gamification mechanics to sustain student attention during sessions, layered on top of the browser-side face verification and RAG-based hint pipeline</div>

                      <div class="bold" style="margin-top: 4px;">AI-Powered Command-Line Interface for Autonomous Database Administration</div>
                      <div class="bullet-item">• Open-source AI-powered CLI that translates plain English into optimized SQL and NoSQL queries across four database engines, removing the need for manual query writing</div>
                      <div class="bullet-item">• Lowered per-query inference cost by approximately 90% through a task-routing system that sends simple requests to lightweight models and reserves capable LLMs for complex ones, with a two-model critic pattern that reviews queries before they hit the database</div>

                      <div class="section-title">VOLUNTEER EXPERIENCE</div>
                      <div class="item-row">
                        <span class="bold">Website Designer — Digital Yearbook Team, Covenant University</span>
                        <span>Aug 2026 – Oct 2026</span>
                      </div>
                      <div class="bullet-item">• Designing and building the frontend of a digital yearbook site with React and Tailwind CSS, serving 72 graduating classmates, scheduled to launch after graduation</div>

                      <div class="item-row" style="margin-top: 4px;">
                        <span class="bold">Social Media Volunteer — CUALA Trade Fair, Covenant University</span>
                        <span>Aug 2026 – Sept 2026</span>
                      </div>
                      <div class="bullet-item">• Supported trade fair promotion by engaging with and resharing official posts across personal social media accounts</div>
                      <div class="bullet-item">• Attended online coordination sessions to align volunteer outreach with the event's promotional schedule</div>

                      <div class="item-row" style="margin-top: 4px;">
                        <span class="bold">Developer — Digital SIWES+ Platform (with a friend)</span>
                        <span>Aug 2025 – Sep 2026</span>
                      </div>
                      <div class="bullet-item">• Built a full-stack platform digitizing the end-to-end SIWES placement process using Python, FastAPI, React, and Node.js; currently pending approval</div>

                      <div class="section-title">SKILLS AND INTERESTS</div>
                      <div class="skill-line"><span class="bold">Programming Languages:</span> Python, TypeScript, JavaScript, FastAPI, React, Node.js, Express.js, REST APIs, Tailwind CSS</div>
                      <div class="skill-line"><span class="bold">Soft Skills:</span> Teamwork & Collaboration, Communication, Adaptability & Resilience, Emotional Intelligence</div>
                      <div class="skill-line"><span class="bold">Languages:</span> English (fluent), German (intermediate)</div>
                      <div class="skill-line"><span class="bold">Interests:</span> Playing Strategy Games, Swimming, Reading</div>
                    </div>
                  </body>
                </html>
              `);
              printWindow.document.close();
            }
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.08] text-white text-xs font-medium transition-colors cursor-pointer"
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
