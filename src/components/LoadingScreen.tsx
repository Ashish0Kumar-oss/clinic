import React, { useEffect, useState } from 'react';
import { HeartPulse } from 'lucide-react';

export const LoadingScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-[200] bg-slate-950 flex flex-col items-center justify-center space-y-6 animate-out fade-out duration-500">
      <div className="relative">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-sky-500 to-teal-400 p-1 animate-pulse shadow-2xl shadow-sky-500/30">
          <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center">
            <HeartPulse className="w-10 h-10 text-sky-400" />
          </div>
        </div>
      </div>

      <div className="text-center space-y-2">
        <h1 className="text-2xl font-extrabold text-white font-display tracking-tight">
          Lumina<span className="text-sky-400">Care</span>
        </h1>
        <p className="text-xs font-medium text-slate-400 uppercase tracking-widest">
          Loading World-Class Clinical Experience
        </p>
      </div>

      <div className="w-36 h-1 bg-slate-800 rounded-full overflow-hidden">
        <div className="w-full h-full bg-gradient-to-r from-sky-500 to-teal-400 animate-pulse" />
      </div>
    </div>
  );
};
