import React from 'react';
import { Calendar, PhoneCall } from 'lucide-react';

interface StickyMobileCtaProps {
  onOpenBooking: () => void;
}

export const StickyMobileCta: React.FC<StickyMobileCtaProps> = ({ onOpenBooking }) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-[90] p-3 bg-white/95 dark:bg-slate-900/95 border-t border-slate-200 dark:border-slate-800 backdrop-blur-lg flex items-center space-x-2">
      <a
        href="tel:+18005864621"
        className="px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center justify-center space-x-1.5 shrink-0"
      >
        <PhoneCall className="w-4 h-4 text-red-500" />
        <span>ER Hotline</span>
      </a>

      <button
        onClick={onOpenBooking}
        className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-sky-500 to-teal-500 text-white text-xs font-bold shadow-lg shadow-sky-500/25 flex items-center justify-center space-x-2"
      >
        <Calendar className="w-4 h-4" />
        <span>Book Appointment</span>
      </button>
    </div>
  );
};
