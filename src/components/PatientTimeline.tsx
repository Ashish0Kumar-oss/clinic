import React, { useState } from 'react';
import {
  CalendarCheck,
  Stethoscope,
  Microscope,
  Sparkles,
  Heart,
  ChevronRight,
  Clock,
} from 'lucide-react';

export const PatientTimeline: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: 1,
      title: "Book Appointment",
      icon: <CalendarCheck className="w-5 h-5 text-sky-500" />,
      tagline: "Instant Concierge Reservation",
      desc: "Reserve your slot online, select your attending physician, and complete your digital medical questionnaire from the comfort of home.",
      time: "2 Minutes",
    },
    {
      num: 2,
      title: "Comprehensive Consultation",
      icon: <Stethoscope className="w-5 h-5 text-teal-500" />,
      tagline: "VIP Private Suite Welcome",
      desc: "Meet your chief specialist for an in-depth 45-minute discussion in our quiet, serene private lounge without any rushed hospital feel.",
      time: "Day 1",
    },
    {
      num: 3,
      title: "Precision AI Diagnosis",
      icon: <Microscope className="w-5 h-5 text-indigo-500" />,
      tagline: "Same-Day Advanced Diagnostics",
      desc: "Undergo low-dose 3D CT, 3T MRI, or comprehensive biomarker labs. Results are reviewed by dual radiologists within 2 hours.",
      time: "Day 1 - 2",
    },
    {
      num: 4,
      title: "Tailored Treatment",
      icon: <Sparkles className="w-5 h-5 text-amber-500" />,
      tagline: "Robotic & Biological Intervention",
      desc: "Receive customized cellular therapy, robotic surgery, or targeted medication plans executed with sub-millimeter clinical precision.",
      time: "Scheduled Care",
    },
    {
      num: 5,
      title: "Full Recovery & Longevity",
      icon: <Heart className="w-5 h-5 text-emerald-500" />,
      tagline: "Continuous Post-Care Guidance",
      desc: "Enjoy direct 24/7 access to your care manager, hydrotherapy sessions, and continuous remote vital monitoring for long-term health.",
      time: "Ongoing",
    },
  ];

  return (
    <section className="py-20 lg:py-28 relative bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 text-xs font-semibold uppercase tracking-wider">
            <span>Seamless Patient Experience</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight">
            Your 5-Step Patient Journey
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            From first contact to complete recovery, experience transparent, compassionate guidance every step of the way.
          </p>
        </div>

        {/* Desktop Connected Stepper */}
        <div className="hidden lg:block relative mb-12">
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 dark:bg-slate-800 -translate-y-1/2 z-0" />
          <div
            className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-sky-500 to-teal-500 -translate-y-1/2 z-0 transition-all duration-500"
            style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
          />

          <div className="grid grid-cols-5 gap-4 relative z-10">
            {steps.map((step, idx) => (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                className="flex flex-col items-center text-center group cursor-pointer focus:outline-none"
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 mb-3 shadow-md ${
                    idx <= activeStep
                      ? 'bg-gradient-to-tr from-sky-500 to-teal-500 text-white scale-110 shadow-sky-500/30'
                      : 'bg-white dark:bg-slate-900 text-slate-400 border border-slate-200 dark:border-slate-800'
                  }`}
                >
                  {step.icon}
                </div>
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  Step {step.num}
                </span>
                <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  {step.title}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Step Detail Display Box */}
        <div className="p-8 sm:p-10 glass-card max-w-4xl mx-auto animate-in fade-in duration-300">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 dark:bg-sky-950 flex items-center justify-center text-sky-500 shrink-0">
                {steps[activeStep].icon}
              </div>
              <div>
                <span className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest">
                  {steps[activeStep].tagline}
                </span>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-display">
                  Step {steps[activeStep].num}: {steps[activeStep].title}
                </h3>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-xs font-semibold px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
              <Clock className="w-3.5 h-3.5 text-sky-500" />
              <span>Est. Timeframe: {steps[activeStep].time}</span>
            </div>
          </div>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed py-6">
            {steps[activeStep].desc}
          </p>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
              disabled={activeStep === 0}
              className={`text-xs font-semibold px-4 py-2 rounded-full border transition-all ${
                activeStep === 0
                  ? 'opacity-40 cursor-not-allowed border-slate-200 text-slate-400'
                  : 'border-slate-300 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Previous Step
            </button>

            <div className="flex space-x-1.5">
              {steps.map((_, i) => (
                <div
                  key={i}
                  onClick={() => setActiveStep(i)}
                  className={`h-2 rounded-full cursor-pointer transition-all ${
                    i === activeStep ? 'w-8 bg-sky-500' : 'w-2 bg-slate-200 dark:bg-slate-700'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
              disabled={activeStep === steps.length - 1}
              className={`text-xs font-semibold px-5 py-2 rounded-full bg-sky-500 text-white shadow-md hover:bg-sky-600 transition-all flex items-center space-x-1 ${
                activeStep === steps.length - 1 ? 'opacity-40 cursor-not-allowed' : ''
              }`}
            >
              <span>Next Step</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
