import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Building, Sparkles } from 'lucide-react';
import { INTERNSHIPS } from '../data/portfolioData';

export const Internships: React.FC = () => {
  return (
    <section id="internships" className="py-24 px-4 sm:px-6 lg:px-8 relative">
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
            Practical Foundations
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Internship Experience
          </h2>
        </motion.div>

        {/* Internships Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {INTERNSHIPS.map((item, idx) => (
            <motion.div
              key={`${item.focus}-${item.duration}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-[#11151e] border border-white/[0.08] hover:border-slate-700 rounded-2xl p-7 transition-all duration-300 shadow-xl flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{item.duration}</span>
                  </div>
                </div>

                <div className="mb-2">
                  <span className="text-xs uppercase tracking-wider text-blue-400 font-semibold block mb-1">
                    Specialization Focus
                  </span>
                  <h3 className="text-2xl font-bold text-white tracking-tight">
                    {item.focus}
                  </h3>
                </div>

                <div className="flex items-center gap-2 text-slate-300 text-sm mt-3 pt-3 border-t border-white/[0.06]">
                  <Building className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="font-medium">{item.company}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
