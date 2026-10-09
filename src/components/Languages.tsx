import React from 'react';
import { motion } from 'motion/react';
import { Languages as LanguagesIcon, Check } from 'lucide-react';
import { LANGUAGES } from '../data/portfolioData';

export const Languages: React.FC = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="bg-[#11151e] border border-white/[0.08] rounded-2xl p-7 sm:p-9 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
              <LanguagesIcon className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-blue-400 font-semibold block">
                Communication
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Languages
              </h3>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {LANGUAGES.map((lang) => (
              <div
                key={lang}
                className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.06] text-white text-sm font-medium"
              >
                <Check className="w-4 h-4 text-blue-400" />
                <span>{lang}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
