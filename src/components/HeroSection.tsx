import React, { useEffect, useState } from 'react';
import {
  Calendar,
  Sparkles,
  ShieldCheck,
  Award,
  Users,
  Clock,
  HeartPulse,
  ChevronRight,
  PhoneCall,
  Activity,
  Star,
} from 'lucide-react';

interface HeroSectionProps {
  onOpenBooking: (dept?: string, docId?: string) => void;
  onOpenAiAssistant: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenBooking,
  onOpenAiAssistant,
}) => {
  const [counterDoctors, setCounterDoctors] = useState(0);
  const [counterPatients, setCounterPatients] = useState(0);
  const [counterYears, setCounterYears] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const steps = 30;
    const stepTime = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      setCounterDoctors(Math.min(25, Math.floor((25 / steps) * step)));
      setCounterPatients(Math.min(10000, Math.floor((10000 / steps) * step)));
      setCounterYears(Math.min(20, Math.floor((20 / steps) * step)));

      if (step >= steps) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden flex flex-col justify-center bg-slate-50/50 dark:bg-slate-950/50">
      {/* Soft Ambient Background Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-sky-400/20 via-teal-300/15 to-transparent rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-sky-300/10 dark:bg-sky-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Hero Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column Text Content */}
          <div className="lg:col-span-7 space-y-8 text-left">
            {/* Trust Badge Eyebrow */}
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/80 dark:bg-slate-900/80 border border-sky-200/80 dark:border-sky-800/80 shadow-sm backdrop-blur-md">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">
                #1 Voted Premier Healthcare Clinic in New York
              </span>
              <ShieldCheck className="w-4 h-4 text-sky-500 ml-1" />
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white font-display leading-[1.12]">
                Exceptional Healthcare <br />
                <span className="bg-gradient-to-r from-sky-500 via-teal-500 to-sky-600 bg-clip-text text-transparent">
                  With Compassion & Precision
                </span>
              </h1>
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl font-normal leading-relaxed">
                Experience world-class medical care with expert board-certified doctors, 
                advanced 3D AI diagnostics, and personalized holistic treatment in a luxury, comfortable setting.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onOpenBooking()}
                className="btn-primary shadow-lg shadow-sky-500/25 active:scale-[0.98] group"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={scrollToServices}
                className="btn-secondary"
              >
                Explore Services
              </button>

              <button
                onClick={onOpenAiAssistant}
                className="px-5 py-3 rounded-full bg-sky-50/80 dark:bg-sky-950/60 hover:bg-sky-100 dark:hover:bg-sky-900/60 text-sky-600 dark:text-sky-300 font-semibold text-sm border border-sky-200/80 dark:border-sky-800/80 backdrop-blur-md transition-all flex items-center space-x-2"
              >
                <Sparkles className="w-4 h-4 text-sky-500" />
                <span>AI Symptom Triage</span>
              </button>
            </div>

            {/* Features Bullet Bar */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-slate-200/60 dark:border-slate-800/60">
              <div className="flex items-center space-x-2 text-xs font-medium text-slate-600 dark:text-slate-300">
                <div className="w-2 h-2 rounded-full bg-teal-500" />
                <span>Zero Wait Times</span>
              </div>
              <div className="flex items-center space-x-2 text-xs font-medium text-slate-600 dark:text-slate-300">
                <div className="w-2 h-2 rounded-full bg-sky-500" />
                <span>VIP Private Suites</span>
              </div>
              <div className="flex items-center space-x-2 text-xs font-medium text-slate-600 dark:text-slate-300">
                <div className="w-2 h-2 rounded-full bg-indigo-500" />
                <span>Comprehensive Insurance</span>
              </div>
            </div>
          </div>

          {/* Right Column Visual Showcase */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            {/* Glowing Accent Ring */}
            <div className="absolute inset-0 bg-gradient-to-tr from-sky-400 to-teal-400 rounded-[40px] rotate-2 opacity-20 blur-xl pointer-events-none" />

            {/* Main Image Frame */}
            <div className="relative w-full max-w-md lg:max-w-none rounded-[32px] overflow-hidden bg-white dark:bg-slate-900 p-3 shadow-2xl border border-slate-200/80 dark:border-slate-800/80 group">
              <div className="relative h-[480px] sm:h-[520px] rounded-[24px] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=1000"
                  alt="Dr. Evelyn Vance - LuminaCare Medical Director"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                {/* Doctor Overlay Label */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-white/20 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        Dr. Evelyn Vance, MD
                      </h3>
                      <p className="text-xs font-medium text-sky-600 dark:text-sky-400">
                        Chief of Cardiovascular Medicine
                      </p>
                    </div>
                    <div className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-200/50 text-amber-600 dark:text-amber-400 text-xs font-bold">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>4.98</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Glass Badge 1: 24/7 Emergency Support */}
              <div className="absolute top-8 -left-4 sm:-left-8 p-3.5 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 shadow-xl flex items-center space-x-3 animate-bounce-subtle">
                <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-950/60 text-red-500 flex items-center justify-center shrink-0">
                  <HeartPulse className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">24/7 Emergency Care</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">Immediate Trauma Response</div>
                </div>
              </div>

              {/* Floating Glass Badge 2: AI Diagnostic Active */}
              <div className="absolute top-1/2 -right-4 sm:-right-6 p-3.5 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 shadow-xl flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-500 flex items-center justify-center shrink-0">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">3D AI Imaging</div>
                  <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">99.8% Precision</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Animated Statistics Banner */}
        <div className="mt-16 sm:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="glass-card glass-card-hover p-6">
            <div className="flex items-center space-x-3 mb-2">
              <div className="service-icon !mb-0 !w-10 !h-10">
                <Users className="w-5 h-5" />
              </div>
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                {counterDoctors}+
              </span>
            </div>
            <div className="text-xs font-semibold text-slate-700 dark:text-slate-200">Expert Specialists</div>
            <div className="text-[11px] text-slate-400">Double Board-Certified</div>
          </div>

          <div className="glass-card glass-card-hover p-6">
            <div className="flex items-center space-x-3 mb-2">
              <div className="service-icon !mb-0 !w-10 !h-10 !bg-teal-500/15 !text-teal-500">
                <Award className="w-5 h-5" />
              </div>
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                {(counterPatients / 1000).toFixed(0)}K+
              </span>
            </div>
            <div className="text-xs font-semibold text-slate-700 dark:text-slate-200">Happy Patients</div>
            <div className="text-[11px] text-slate-400">99.4% Satisfaction Rate</div>
          </div>

          <div className="glass-card glass-card-hover p-6">
            <div className="flex items-center space-x-3 mb-2">
              <div className="service-icon !mb-0 !w-10 !h-10 !bg-indigo-500/15 !text-indigo-500">
                <Clock className="w-5 h-5" />
              </div>
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                {counterYears}+
              </span>
            </div>
            <div className="text-xs font-semibold text-slate-700 dark:text-slate-200">Years of Excellence</div>
            <div className="text-[11px] text-slate-400">Established 2006</div>
          </div>

          <div className="glass-card glass-card-hover p-6 col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-3 mb-2">
              <div className="service-icon !mb-0 !w-10 !h-10 !bg-red-500/15 !text-red-500">
                <PhoneCall className="w-5 h-5" />
              </div>
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                24/7
              </span>
            </div>
            <div className="text-xs font-semibold text-slate-700 dark:text-slate-200">Emergency & Concierge</div>
            <div className="text-[11px] text-slate-400">Direct Physician Hotline</div>
          </div>
        </div>
      </div>
    </section>
  );
};
