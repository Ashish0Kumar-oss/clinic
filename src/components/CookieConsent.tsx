import React, { useState, useEffect } from 'react';
import { ShieldCheck, X } from 'lucide-react';

export const CookieConsent: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('luminacare_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('luminacare_cookie_consent', 'accepted');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 md:left-8 md:right-auto md:max-w-md z-[110] animate-in slide-in-from-bottom-5 duration-300">
      <div className="p-5 rounded-3xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 shadow-2xl backdrop-blur-md space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs font-bold text-sky-500 uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4" />
            <span>HIPAA Privacy & Cookies</span>
          </div>
          <button onClick={() => setShow(false)} className="text-slate-400 hover:text-slate-600">
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          LuminaCare uses essential cookies and HIPAA-compliant session encryption to personalize your booking experience and improve our medical services.
        </p>

        <div className="flex items-center justify-end space-x-2 pt-1">
          <button
            onClick={() => setShow(false)}
            className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Preferences
          </button>
          <button
            onClick={handleAccept}
            className="px-5 py-1.5 rounded-full bg-sky-500 text-white text-xs font-semibold shadow-md hover:bg-sky-600"
          >
            Accept & Continue
          </button>
        </div>
      </div>
    </div>
  );
};
