import React from 'react';
import { TREATMENTS } from '../data/clinicData';
import { Cpu, CheckCircle2, Clock, Sparkles, Calendar } from 'lucide-react';

interface TreatmentsSectionProps {
  onOpenBooking: () => void;
}

export const TreatmentsSection: React.FC<TreatmentsSectionProps> = ({ onOpenBooking }) => {
  return (
    <section id="treatments" className="py-20 lg:py-28 relative bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 text-xs font-semibold uppercase tracking-wider">
            <span>Next-Gen Medical Tech</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight">
            Advanced Clinical Procedures
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            Leveraging state-of-the-art robotic platforms, bio-cellular therapies, and non-invasive medical technology.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TREATMENTS.map((treatment) => (
            <div
              key={treatment.id}
              className="glass-card glass-card-hover p-6 sm:p-8 flex flex-col justify-between group"
            >
              <div className="space-y-6">
                {/* Top Image Banner */}
                <div className="relative h-48 sm:h-56 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img
                    src={treatment.image}
                    alt={treatment.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 dark:bg-slate-900/90 text-xs font-bold text-teal-600 dark:text-teal-400 backdrop-blur-md">
                    {treatment.category}
                  </div>
                  <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-slate-900/80 text-white text-[11px] font-semibold flex items-center space-x-1.5 backdrop-blur-md">
                    <Clock className="w-3.5 h-3.5 text-sky-400" />
                    <span>Downtime: {treatment.recoveryTime}</span>
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-display group-hover:text-teal-500 transition-colors">
                    {treatment.title}
                  </h3>
                  <p className="text-xs font-semibold text-sky-600 dark:text-sky-400 mb-3">
                    {treatment.subtitle}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    {treatment.description}
                  </p>
                </div>

                {/* Tech Used */}
                <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/60 dark:border-slate-700/60 flex items-center space-x-3">
                  <Cpu className="w-5 h-5 text-teal-500 shrink-0" />
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    Technology: <strong>{treatment.technologyUsed}</strong>
                  </span>
                </div>

                {/* Benefits checklist */}
                <div className="space-y-2">
                  <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Key Clinical Advantages
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {treatment.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-center space-x-2 text-xs text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6 mt-6 border-t border-slate-200/50 dark:border-slate-700/50">
                <button
                  onClick={onOpenBooking}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-sky-500 to-teal-500 text-white font-semibold text-xs shadow-md shadow-sky-500/20 hover:shadow-sky-500/30 flex items-center justify-center space-x-2"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Request Treatment Consultation</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
