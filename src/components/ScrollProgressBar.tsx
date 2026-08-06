import React, { useEffect, useState } from 'react';

export const ScrollProgressBar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScroll = () => {
      const currentScroll = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setScrollProgress((currentScroll / scrollHeight) * 100);
      }
    };

    window.addEventListener('scroll', updateScroll);
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] bg-slate-200/30 dark:bg-slate-800/30 z-[100] pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-sky-500 via-teal-400 to-sky-400 transition-all duration-150 ease-out shadow-[0_0_10px_rgba(14,165,233,0.5)]"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
};
