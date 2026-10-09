import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, BarChart3, Database, Headphones } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

const HIGHLIGHT_AREAS = [
  {
    icon: ShieldCheck,
    title: 'Data Quality & Maintenance',
    description:
      'Organizing data storage, enforcing consistency, and maintaining accurate records across databases and management systems.',
  },
  {
    icon: BarChart3,
    title: 'Reporting & Analytics',
    description:
      'Preparing structured reports and maintaining documentation using tools like Microsoft Excel and Power BI.',
  },
  {
    icon: Database,
    title: 'Database Operations',
    description:
      'Working with MySQL and relational SQL structures to ensure data reliability and operational accessibility.',
  },
  {
    icon: Headphones,
    title: 'Technical Support',
    description:
      'Handling access management, system coordination, and resolving technical requirements in high-tempo operational workflows.',
  },
];

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 block mb-2">
            Professional Overview
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            About Me
          </h2>
        </motion.div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Summary Editorial Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-6 bg-[#11151e] border border-white/[0.08] rounded-2xl p-8 sm:p-10 shadow-xl"
          >
            <h3 className="text-xl sm:text-2xl font-semibold text-white mb-6 leading-snug">
              Committed to accurate information and reliable data workflows.
            </h3>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-6 font-normal">
              {PERSONAL_INFO.aboutSummary}
            </p>
            <div className="pt-6 border-t border-white/[0.06] flex flex-wrap gap-y-3 gap-x-6 text-sm text-slate-400">
              <div>
                <span className="text-slate-400 block text-xs uppercase tracking-wider mb-0.5">Focus</span>
                <span className="text-white font-medium">Data Management &amp; Support</span>
              </div>
              <div>
                <span className="text-slate-400 block text-xs uppercase tracking-wider mb-0.5">Base</span>
                <span className="text-white font-medium">Hyderabad, India</span>
              </div>
              <div>
                <span className="text-slate-400 block text-xs uppercase tracking-wider mb-0.5">Core Tools</span>
                <span className="text-white font-medium">MySQL · Python · Excel · Power BI</span>
              </div>
            </div>
          </motion.div>

          {/* Core Areas Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {HIGHLIGHT_AREAS.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.08 }}
                  className="bg-[#11151e]/80 hover:bg-[#151b27] border border-white/[0.06] hover:border-blue-500/30 rounded-xl p-6 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center mb-4 text-blue-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-semibold text-white mb-2">
                      {item.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
