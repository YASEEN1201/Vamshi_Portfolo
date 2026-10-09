import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Calendar, BookOpen, School } from 'lucide-react';
import { EDUCATION } from '../data/portfolioData';

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-24 px-4 sm:px-6 lg:px-8 relative">
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
            Academic Background
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Education
          </h2>
        </motion.div>

        {/* Education Card */}
        <div className="grid grid-cols-1 max-w-3xl">
          {EDUCATION.map((item, idx) => (
            <motion.div
              key={`${item.institution}-${item.qualification}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-[#11151e] border border-white/[0.08] hover:border-slate-700 rounded-2xl p-7 sm:p-9 shadow-xl group transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      {item.qualification}
                    </h3>
                    <div className="flex items-center gap-2 text-slate-300 font-medium mt-1">
                      <School className="w-4 h-4 text-slate-400 shrink-0" />
                      <span>{item.institution}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-400 font-medium">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span>{item.duration}</span>
                </div>
              </div>

              <div className="pt-5 border-t border-white/[0.06] space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm">
                  <span className="text-xs uppercase tracking-wider font-semibold text-slate-400 min-w-28">
                    Affiliation:
                  </span>
                  <span className="text-slate-200 font-medium">
                    {item.university}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 text-sm">
                  <span className="text-xs uppercase tracking-wider font-semibold text-slate-400 min-w-28 mt-0.5">
                    Subjects:
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    {item.subjects.map((sub, sIdx) => (
                      <span
                        key={sub}
                        className="inline-flex items-center gap-1 text-slate-200 text-xs sm:text-sm"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-blue-400" />
                        <span>{sub}</span>
                        {sIdx < item.subjects.length - 1 && (
                          <span aria-hidden="true" className="text-slate-600 ml-1">·</span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
