import React from 'react';
import { motion } from 'motion/react';
import {
  Code2,
  Database,
  BarChart,
  Globe,
  Users2,
  Check,
} from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  Programming: Code2,
  Databases: Database,
  'Data and Productivity Tools': BarChart,
  'Web Technologies': Globe,
  'Professional Skills': Users2,
};

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 block mb-2">
            Capabilities &amp; Toolset
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Technical &amp; Professional Skills
          </h2>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((cat, idx) => {
            const Icon = CATEGORY_ICONS[cat.category] || Code2;
            const isFullWidthOnLarge = idx === SKILL_CATEGORIES.length - 1 && SKILL_CATEGORIES.length % 3 !== 0;

            return (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className={`bg-[#11151e] border border-white/[0.08] hover:border-blue-500/30 rounded-2xl p-7 transition-all duration-300 shadow-xl flex flex-col justify-between group ${
                  isFullWidthOnLarge ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-white/[0.06]">
                    <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-semibold text-white tracking-tight">
                      {cat.category}
                    </h3>
                  </div>

                  {/* Skills List without candy pill badges */}
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {cat.skills.map((skill) => (
                      <li
                        key={skill}
                        className="flex items-center gap-2.5 py-1.5 px-2 rounded-lg bg-white/[0.02] border border-white/[0.04] text-slate-200 text-sm hover:text-white hover:bg-white/[0.05] transition-colors"
                      >
                        <Check className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                        <span className="font-medium">{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
