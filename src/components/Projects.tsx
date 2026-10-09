import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mic, ScanLine, Play, Pause, Layers, Cpu } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';

export const Projects: React.FC = () => {
  const [audioActive, setAudioActive] = useState<boolean>(true);
  const [scannerActive, setScannerActive] = useState<boolean>(true);

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 relative">
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
            Selected Work
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Projects
          </h2>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {PROJECTS.map((proj, idx) => {
            const isAudio = proj.visualType === 'audio';

            return (
              <motion.div
                key={proj.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="bg-[#11151e] border border-white/[0.08] hover:border-slate-700/80 rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between group transition-all duration-300"
              >
                {/* Visual Header / Cinematic Interactive Canvas */}
                <div className="relative h-64 sm:h-72 w-full bg-[#0a0d13] border-b border-white/[0.06] flex items-center justify-center p-6 overflow-hidden">
                  {/* Subtle Grid Backing */}
                  <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                      backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
                      backgroundSize: '24px 24px',
                    }}
                  />

                  {/* Audio Project Visual */}
                  {isAudio ? (
                    <div className="relative z-10 w-full flex flex-col items-center justify-center">
                      <div className="relative mb-6">
                        <div className="w-16 h-16 rounded-full bg-blue-600/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-[0_0_25px_rgba(59,130,246,0.2)]">
                          <Mic className="w-8 h-8" />
                        </div>
                        {audioActive && (
                          <motion.div
                            animate={{ scale: [1, 1.35, 1], opacity: [0.6, 0, 0.6] }}
                            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                            className="absolute -inset-2 rounded-full border border-blue-400/40 pointer-events-none"
                          />
                        )}
                      </div>

                      {/* Animated Sound Wave Bars */}
                      <div className="flex items-center gap-1.5 h-14">
                        {[16, 32, 48, 24, 40, 56, 32, 20, 44, 28, 52, 36, 20, 48, 28].map((baseH, barIdx) => (
                          <motion.div
                            key={barIdx}
                            animate={
                              audioActive
                                ? {
                                    height: [
                                      `${baseH * 0.4}px`,
                                      `${baseH}px`,
                                      `${baseH * 0.3}px`,
                                    ],
                                  }
                                : { height: '8px' }
                            }
                            transition={{
                              repeat: Infinity,
                              duration: 1.2,
                              delay: barIdx * 0.08,
                              ease: 'easeInOut',
                            }}
                            className="w-1.5 rounded-full bg-gradient-to-t from-blue-600 via-blue-400 to-cyan-300"
                          />
                        ))}
                      </div>

                      {/* Interactive toggle */}
                      <button
                        type="button"
                        onClick={() => setAudioActive(!audioActive)}
                        className="mt-4 px-3 py-1 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-[11px] font-medium text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                        title={audioActive ? 'Pause wave simulation' : 'Play wave simulation'}
                      >
                        {audioActive ? <Pause className="w-3 h-3 text-blue-400" /> : <Play className="w-3 h-3 text-blue-400" />}
                        <span>{audioActive ? 'Active Stream' : 'Paused Wave'}</span>
                      </button>
                    </div>
                  ) : (
                    /* Currency Scanner Visual */
                    <div className="relative z-10 w-full max-w-sm flex flex-col items-center justify-center">
                      {/* Stylized Currency Note Frame */}
                      <div className="relative w-64 sm:w-72 h-36 rounded-xl border border-blue-500/30 bg-[#0f1420] p-4 flex flex-col justify-between overflow-hidden shadow-lg">
                        {/* Note inner border */}
                        <div className="absolute inset-2 border border-slate-700/50 rounded-lg pointer-events-none" />

                        {/* Top Note Detail */}
                        <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono tracking-wider">
                          <span>OCR RECOGNITION</span>
                          <span className="text-blue-400">ML · CLASSIFICATION</span>
                        </div>

                        {/* Center Seal */}
                        <div className="flex items-center justify-center gap-3">
                          <div className="w-10 h-10 rounded-full border border-blue-400/40 bg-blue-950/40 flex items-center justify-center text-blue-300">
                            <ScanLine className="w-5 h-5" />
                          </div>
                          <div className="text-left">
                            <p className="text-xs font-semibold text-white tracking-wide">Feature Matrix</p>
                            <p className="text-[11px] text-slate-400 font-mono">Curvature &amp; Pattern</p>
                          </div>
                        </div>

                        {/* Bottom Detail */}
                        <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                          <span>SPECIMEN SAMPLE</span>
                          <span className="text-emerald-400">DETECTED</span>
                        </div>

                        {/* Animated Laser Scanning Line */}
                        {scannerActive && (
                          <motion.div
                            animate={{ y: [0, 110, 0] }}
                            transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
                            className="absolute left-0 right-0 top-2 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent shadow-[0_0_12px_#38bdf8] pointer-events-none"
                          />
                        )}
                      </div>

                      {/* Interactive toggle */}
                      <button
                        type="button"
                        onClick={() => setScannerActive(!scannerActive)}
                        className="mt-4 px-3 py-1 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-[11px] font-medium text-slate-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                        title={scannerActive ? 'Pause scanner simulation' : 'Play scanner simulation'}
                      >
                        {scannerActive ? <Pause className="w-3 h-3 text-blue-400" /> : <Play className="w-3 h-3 text-blue-400" />}
                        <span>{scannerActive ? 'Scanning Active' : 'Scanner Paused'}</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-7 sm:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Project Title */}
                    <div className="flex items-center gap-2.5 mb-3">
                      {isAudio ? (
                        <Cpu className="w-5 h-5 text-blue-400" />
                      ) : (
                        <Layers className="w-5 h-5 text-blue-400" />
                      )}
                      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                        {proj.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                      {proj.description}
                    </p>
                  </div>

                  {/* Technologies (Clean unboxed text metadata with separators or tasteful tech specs) */}
                  <div className="pt-5 border-t border-white/[0.06]">
                    <span className="text-xs uppercase tracking-wider font-semibold text-slate-400 block mb-2">
                      Technologies &amp; Libraries
                    </span>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 text-xs sm:text-sm text-blue-300">
                      {proj.technologies.map((tech, techIdx) => (
                        <React.Fragment key={tech}>
                          <span className="font-mono text-slate-200 bg-white/[0.03] px-2 py-0.5 rounded border border-white/[0.05]">
                            {tech}
                          </span>
                          {techIdx < proj.technologies.length - 1 && (
                            <span aria-hidden="true" className="text-slate-600">·</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
