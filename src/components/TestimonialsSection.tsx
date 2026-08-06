import React, { useState, useEffect } from 'react';
import { TESTIMONIALS } from '../data/clinicData';
import {
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Play,
  X,
} from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [selectedVideoTestimonial, setSelectedVideoTestimonial] = useState<string | null>(null);

  useEffect(() => {
    if (!isAutoplay) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoplay]);

  const handleNext = () => {
    setIsAutoplay(false);
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setIsAutoplay(false);
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const item = TESTIMONIALS[currentIndex];

  return (
    <section id="testimonials" className="py-20 lg:py-28 relative bg-white dark:bg-slate-900 transition-colors overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 text-xs font-semibold uppercase tracking-wider">
            <span>Patient Stories</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight">
            Trusted By Thousands of Families
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
            Hear from executive leaders, international patients, and local families who experienced LuminaCare's world-class medical excellence.
          </p>
        </div>

        {/* Carousel Showcase Box */}
        <div className="relative max-w-4xl mx-auto glass-card p-8 sm:p-12">
          <Quote className="w-16 h-16 text-sky-500/15 absolute top-8 right-8 pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Patient Photo Frame */}
            <div className="md:col-span-4 relative flex flex-col items-center text-center">
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden p-1 bg-gradient-to-tr from-sky-500 to-teal-400 shadow-xl mb-4">
                <img
                  src={item.image}
                  alt={item.patientName}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              {/* Play Video Testimonial Trigger */}
              <button
                onClick={() => setSelectedVideoTestimonial(item.patientName)}
                className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-sky-500 text-white text-[10px] font-bold shadow-md hover:bg-sky-600 transition-all"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>Watch Video Story</span>
              </button>
            </div>

            {/* Testimonial Quote & Info */}
            <div className="md:col-span-8 space-y-4 text-left">
              <div className="flex items-center space-x-1">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>

              <p className="text-base sm:text-xl font-medium text-slate-800 dark:text-slate-100 italic leading-relaxed">
                "{item.comment}"
              </p>

              <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">
                      {item.patientName}, {item.age}
                    </h4>
                    {item.verified && (
                      <span className="flex items-center text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-200/50">
                        <ShieldCheck className="w-3 h-3 mr-0.5" /> Verified Patient
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-sky-600 dark:text-sky-400 font-medium">
                    {item.treatment} • {item.department} Department
                  </p>
                </div>

                <span className="text-xs text-slate-400 hidden sm:inline">{item.date}</span>
              </div>
            </div>
          </div>

          {/* Nav Arrow Controls */}
          <div className="flex items-center justify-between pt-8 mt-6 border-t border-slate-200/50 dark:border-slate-700/50">
            <div className="flex space-x-2">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setIsAutoplay(false);
                    setCurrentIndex(idx);
                  }}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentIndex ? 'w-8 bg-sky-500' : 'w-2 bg-slate-300 dark:bg-slate-700'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handlePrev}
                className="p-2.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-2.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal Simulation */}
      {selectedVideoTestimonial && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 p-6 text-center text-white space-y-4">
            <button
              onClick={() => setSelectedVideoTestimonial(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center mx-auto mb-2">
              <Play className="w-8 h-8 fill-current ml-1" />
            </div>

            <h3 className="text-xl font-bold font-display">
              Video Testimonial: {selectedVideoTestimonial}
            </h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Simulated 4K Patient Story Video. LuminaCare patient privacy standards strictly protect all recorded clinical testimonials.
            </p>

            <button
              onClick={() => setSelectedVideoTestimonial(null)}
              className="px-6 py-2 rounded-full bg-sky-500 text-white text-xs font-semibold"
            >
              Close Video Player
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
