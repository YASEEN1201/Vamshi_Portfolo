import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Mail, ChevronDown } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ProfilePhoto } from './ProfilePhoto';

export const Hero: React.FC = () => {
  const scrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAbout = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-between pt-28 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full flex-1 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full py-8 lg:py-16">
          {/* Left Column: Typography & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Subtle lead label / role indicator */}
            <div className="inline-flex items-center gap-2 mb-4 text-xs sm:text-sm font-semibold tracking-wider uppercase text-blue-400">
              <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" />
              <span>Data Management &amp; Technical Operations</span>
            </div>

            {/* Name */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white mb-3 text-balance">
              {PERSONAL_INFO.name}
            </h1>

            {/* Role Title */}
            <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-slate-300 italic mb-6">
              {PERSONAL_INFO.role}
            </h2>

            {/* Introduction paragraph */}
            <p className="text-base sm:text-lg text-slate-300/90 leading-relaxed max-w-2xl mb-8 font-normal">
              {PERSONAL_INFO.heroIntro}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <button
                type="button"
                onClick={scrollToProjects}
                className="w-full sm:w-auto px-7 py-3.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 active:scale-[0.98] rounded-xl shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 cursor-pointer"
              >
                <span>Explore My Work</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={scrollToContact}
                className="w-full sm:w-auto px-7 py-3.5 text-sm font-semibold text-slate-200 hover:text-white bg-[#141822] hover:bg-[#1a2130] active:scale-[0.98] border border-slate-700/60 rounded-xl transition-all flex items-center justify-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 cursor-pointer"
              >
                <Mail className="w-4 h-4 text-slate-400" />
                <span>Contact Me</span>
              </button>
            </div>

            {/* Quick trust metrics row */}
            <div className="mt-10 pt-8 border-t border-white/[0.08] w-full grid grid-cols-2 sm:grid-cols-3 gap-6 text-slate-400">
              <div>
                <p className="text-xs uppercase tracking-wider text-slate-400 mb-1">Core Domain</p>
                <p className="text-sm font-semibold text-white">Data Quality &amp; Reporting</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-slate-400 mb-1">Primary Stack</p>
                <p className="text-sm font-semibold text-white">MySQL · Python · Power BI</p>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <p className="text-xs uppercase tracking-wider text-slate-400 mb-1">Location</p>
                <p className="text-sm font-semibold text-white">{PERSONAL_INFO.location}</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Profile Photograph Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex justify-center lg:justify-end items-center"
          >
            <ProfilePhoto />
          </motion.div>
        </div>
      </div>

      {/* Subtle animated scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        className="w-full flex justify-center pt-4"
      >
        <button
          type="button"
          onClick={scrollToAbout}
          className="flex flex-col items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded p-1"
          aria-label="Scroll down to About section"
        >
          <span className="tracking-widest uppercase text-[10px] font-medium text-slate-400 group-hover:text-slate-300">
            Scroll Down
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-blue-400 transition-colors" />
          </motion.div>
        </button>
      </motion.div>
    </section>
  );
};
