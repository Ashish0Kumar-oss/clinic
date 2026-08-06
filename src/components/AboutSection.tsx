import React, { useState } from 'react';
import {
  ShieldCheck,
  Award,
  Check,
  ArrowRight,
  Heart,
  Eye,
  Target,
  Sparkles,
  Building2,
} from 'lucide-react';

interface AboutSectionProps {
  onOpenBooking: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenBooking }) => {
  const [activeTab, setActiveTab] = useState<'mission' | 'vision' | 'values'>('mission');

  const checklistItems = [
    "Joint Commission International (JCI) Accredited Hospital Standard",
    "Dual Board-Certified Attending Physicians with Ivy League Fellowships",
    "Zero-Interference VIP Private Recovery Suites with Concierge Catering",
    "Real-Time AI-Assisted Imaging & Genomic Risk Profiling",
    "Transparent Pricing with Comprehensive Superbill Support",
  ];

  return (
    <section id="about" className="py-20 lg:py-28 relative bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Side: Luxury Clinic Image Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-[36px] overflow-hidden bg-white dark:bg-slate-900 p-3 shadow-2xl border border-slate-200/80 dark:border-slate-800">
              <div className="relative h-[440px] sm:h-[500px] rounded-[28px] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200"
                  alt="LuminaCare Luxury Reception & Lounge"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                {/* Floating Award Badge */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-white/20 shadow-lg flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-sky-500 text-white flex items-center justify-center shrink-0">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      Global Healthcare Award Winner 2025
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Recognized for Outstanding Patient Experience & Innovation
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Small floating badge */}
            <div className="absolute -bottom-6 -right-4 hidden sm:flex p-4 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-xl items-center space-x-3">
              <Building2 className="w-8 h-8 text-teal-500" />
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">3 Flagship Centers</div>
                <div className="text-[10px] text-slate-400">New York • Manhattan • Westside</div>
              </div>
            </div>
          </div>

          {/* Right Side: Story & Interactive Tabs */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 text-xs font-semibold uppercase tracking-wider">
              <span>Our Legacy & Distinction</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight leading-tight">
              Redefining Healthcare Standards Through Innovation
            </h2>

            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Founded in 2006, LuminaCare was designed to dismantle the cold, rushed atmosphere of conventional clinical visits. We built a luxury sanctuary where world-leading medical intellect meets genuine human empathy.
            </p>

            {/* Interactive Mission / Vision / Values Tabs */}
            <div className="pt-2">
              <div className="flex border-b border-slate-200 dark:border-slate-800 space-x-6">
                <button
                  onClick={() => setActiveTab('mission')}
                  className={`pb-3 text-xs font-bold transition-all relative flex items-center space-x-1.5 ${
                    activeTab === 'mission'
                      ? 'text-sky-500 border-b-2 border-sky-500'
                      : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                  }`}
                >
                  <Target className="w-3.5 h-3.5" />
                  <span>Our Mission</span>
                </button>
                <button
                  onClick={() => setActiveTab('vision')}
                  className={`pb-3 text-xs font-bold transition-all relative flex items-center space-x-1.5 ${
                    activeTab === 'vision'
                      ? 'text-sky-500 border-b-2 border-sky-500'
                      : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Our Vision</span>
                </button>
                <button
                  onClick={() => setActiveTab('values')}
                  className={`pb-3 text-xs font-bold transition-all relative flex items-center space-x-1.5 ${
                    activeTab === 'values'
                      ? 'text-sky-500 border-b-2 border-sky-500'
                      : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                  }`}
                >
                  <Heart className="w-3.5 h-3.5" />
                  <span>Core Values</span>
                </button>
              </div>

              <div className="pt-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 min-h-[70px]">
                {activeTab === 'mission' && (
                  <p className="animate-in fade-in duration-200">
                    To deliver uncompromised medical excellence, combining cutting-edge AI diagnostics and robotic precision with personalized, stress-free clinical care.
                  </p>
                )}
                {activeTab === 'vision' && (
                  <p className="animate-in fade-in duration-200">
                    To pioneer a global paradigm where preventative longevity, early intervention, and luxury healthcare accessibility seamlessly unite.
                  </p>
                )}
                {activeTab === 'values' && (
                  <p className="animate-in fade-in duration-200">
                    Empathetic Integrity, Unwavering Precision, Clinical Rigor, Patient Dignity, and Continuous Innovation across every patient interaction.
                  </p>
                )}
              </div>
            </div>

            {/* Animated Checklist */}
            <div className="space-y-2.5 pt-2">
              {checklistItems.map((item, idx) => (
                <div key={idx} className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-teal-50 dark:bg-teal-950/60 text-teal-500 flex items-center justify-center shrink-0 mt-0.5 border border-teal-200/50 dark:border-teal-800/50">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <button
                onClick={onOpenBooking}
                className="btn-primary text-xs !py-3.5 group"
              >
                <span>Schedule a Private Tour or Consultation</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
