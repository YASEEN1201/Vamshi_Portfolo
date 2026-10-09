import React from 'react';
import { Mail, Phone, MapPin, ArrowUp } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#07090c] border-t border-white/[0.08] text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 pb-10 border-b border-white/[0.06]">
          {/* Brand & Role */}
          <div className="space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {PERSONAL_INFO.name}
            </h3>
            <p className="text-sm font-medium text-blue-400">
              {PERSONAL_INFO.role}
            </p>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed mt-2">
              Dedicated to data quality, reporting, database maintenance, and technical operational excellence.
            </p>
          </div>

          {/* Contact Details at the absolute bottom */}
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-wider font-semibold text-slate-400 block">
              Direct Contact
            </span>
            <div className="flex flex-col gap-2.5 text-sm">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="flex items-center gap-2.5 text-slate-300 hover:text-white transition-colors group"
              >
                <Mail className="w-4 h-4 text-blue-400 group-hover:text-blue-300 shrink-0" />
                <span>Email: <span className="underline decoration-slate-600 underline-offset-4 group-hover:decoration-blue-400">{PERSONAL_INFO.email}</span></span>
              </a>

              <a
                href={`tel:${PERSONAL_INFO.phone}`}
                className="flex items-center gap-2.5 text-slate-300 hover:text-white transition-colors group"
              >
                <Phone className="w-4 h-4 text-blue-400 group-hover:text-blue-300 shrink-0" />
                <span>Phone: <span className="underline decoration-slate-600 underline-offset-4 group-hover:decoration-blue-400">{PERSONAL_INFO.formattedPhone}</span></span>
              </a>

              <div className="flex items-center gap-2.5 text-slate-400">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Location: {PERSONAL_INFO.location}</span>
              </div>
            </div>
          </div>

          {/* Back to Top */}
          <div className="flex md:flex-col items-start md:items-end justify-between">
            <button
              type="button"
              onClick={scrollToTop}
              className="p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-slate-300 hover:text-white transition-all flex items-center gap-2 text-xs font-medium cursor-pointer"
              title="Return to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-4 h-4 text-blue-400" />
            </button>
          </div>
        </div>

        {/* Copyright notice line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 {PERSONAL_INFO.name}. All rights reserved.</p>
          <p className="text-slate-400">Personal Portfolio</p>
        </div>
      </div>
    </footer>
  );
};
