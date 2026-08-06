import React from 'react';
import {
  UserCheck,
  Cpu,
  CalendarCheck,
  ShieldAlert,
  Sliders,
  DollarSign,
  Sparkles,
} from 'lucide-react';

export const WhyChooseUsSection: React.FC = () => {
  const features = [
    {
      icon: <UserCheck className="w-6 h-6 text-sky-500" />,
      title: "Double Board-Certified Doctors",
      description: "Our physicians hail from Ivy League institutions with average 18+ years of dedicated clinical sub-specialization.",
    },
    {
      icon: <Cpu className="w-6 h-6 text-teal-500" />,
      title: "3D AI & Robotic Equipment",
      description: "Equipped with 3T Quiet MRI, Low-Dose AI CT scanners, and Mako® robotic surgical navigation systems.",
    },
    {
      icon: <CalendarCheck className="w-6 h-6 text-indigo-500" />,
      title: "Seamless 24/7 Online Booking",
      description: "Reserve real-time consultation slots in seconds with automatic calendar sync and instant SMS confirmations.",
    },
    {
      icon: <DollarSign className="w-6 h-6 text-emerald-500" />,
      title: "Transparent Concierge Pricing",
      description: "No hidden surprise fees. Clear upfront pricing packages, superbill generation, and major insurance compatibility.",
    },
    {
      icon: <ShieldAlert className="w-6 h-6 text-red-500" />,
      title: "24/7 Immediate Emergency Support",
      description: "Dedicated trauma hotline, zero-delay ER triage access, and on-demand physician phone consultations.",
    },
    {
      icon: <Sliders className="w-6 h-6 text-purple-500" />,
      title: "Personalized Genomic Care Plans",
      description: "Custom longevity protocols, bio-identical hormone balancing, and tailored nutrition crafted specifically for your DNA.",
    },
  ];

  return (
    <section className="py-20 lg:py-28 relative bg-white dark:bg-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 text-xs font-semibold uppercase tracking-wider">
            <span>The LuminaCare Advantage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight">
            Why Discerning Patients Choose Us
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            We combine high-touch hospital luxury with high-tech clinical rigor to ensure superior medical outcomes and peace of mind.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="glass-card glass-card-hover p-8 flex flex-col justify-between group"
            >
              <div>
                <div className="service-icon !w-14 !h-14 !mb-6 shadow-sm group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-sky-500 transition-colors font-display">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-200/40 dark:border-slate-700/40 flex items-center text-xs font-semibold text-sky-500 group-hover:text-sky-600">
                <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                <span>Gold Standard Protocol</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
