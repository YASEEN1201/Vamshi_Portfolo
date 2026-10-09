import React from 'react';
import { motion } from 'motion/react';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { EXPERIENCES } from '../data/portfolioData';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 block mb-2">
            Career Journey
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Professional Experience
          </h2>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative border-l border-white/[0.1] ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
          {EXPERIENCES.map((exp, idx) => (
            <motion.div
              key={`${exp.company}-${exp.position}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="relative group"
            >
              {/* Timeline marker node */}
              <div
                className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-5 h-5 rounded-full bg-[#0b0d10] border-2 border-blue-500 group-hover:border-blue-400 group-hover:shadow-[0_0_12px_rgba(59,130,246,0.6)] transition-all"
                aria-hidden="true"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 m-auto mt-1" />
              </div>

              {/* Experience Card */}
              <div className="bg-[#11151e] border border-white/[0.08] hover:border-slate-700 rounded-2xl p-6 sm:p-8 transition-colors duration-300 shadow-xl">
                {/* Header Information */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      {exp.position}
                    </h3>
                    <div className="text-base sm:text-lg font-medium text-blue-400 mt-1 flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-blue-400 shrink-0" />
                      <span>{exp.company}</span>
                    </div>
                  </div>

                  {/* Date and Location clean metadata with separators */}
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm text-slate-400 pt-1">
                    <span className="flex items-center gap-1.5 text-slate-300">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{exp.duration}</span>
                    </span>
                    {exp.location && (
                      <>
                        <span aria-hidden="true" className="text-slate-600">·</span>
                        <span className="flex items-center gap-1.5 text-slate-300">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span>{exp.location}</span>
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px w-full bg-white/[0.06] my-5" />

                {/* Responsibilities list */}
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-3">
                    Key Responsibilities
                  </h4>
                  <ul className="space-y-2.5 text-sm sm:text-base text-slate-300">
                    {exp.responsibilities.map((resp, rIdx) => (
                      <li key={rIdx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-1" />
                        <span className="leading-relaxed">{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
