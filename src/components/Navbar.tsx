import React, { useEffect, useState } from 'react';
import {
  ShieldPlus,
  Search,
  Bot,
  Sun,
  Moon,
  Phone,
  Calendar,
  Menu,
  X,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

interface NavbarProps {
  theme?: 'light' | 'dark';
  darkMode?: boolean;
  onToggleTheme?: () => void;
  onToggleDarkMode?: () => void;
  onOpenBooking: (dept?: string, docId?: string) => void;
  onOpenAiAssistant: () => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  darkMode,
  onToggleTheme,
  onToggleDarkMode,
  onOpenBooking,
  onOpenAiAssistant,
  onOpenSearch,
}) => {
  const isDark = theme === 'dark' || darkMode === true;
  const toggleThemeHandler = onToggleTheme || onToggleDarkMode || (() => {});
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['home', 'services', 'about', 'doctors', 'treatments', 'gallery', 'testimonials', 'blog', 'contact'];
      const scrollPos = window.scrollY + 100;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Services', id: 'services' },
    { name: 'About', id: 'about' },
    { name: 'Doctors', id: 'doctors' },
    { name: 'Treatments', id: 'treatments' },
    { name: 'Gallery', id: 'gallery' },
    { name: 'Reviews', id: 'testimonials' },
    { name: 'Insights', id: 'blog' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-[90] transition-all duration-300 ${
          isScrolled
            ? 'glass-nav shadow-lg py-3'
            : 'bg-slate-50/40 dark:bg-slate-950/40 backdrop-blur-md py-5 border-b border-white/20 dark:border-slate-800/20'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('home');
            }}
            className="flex items-center space-x-3 group"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-500 via-teal-400 to-sky-400 p-0.5 shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-white dark:bg-slate-900 rounded-[14px] flex items-center justify-center">
                <ShieldPlus className="w-5 h-5 text-sky-500 group-hover:rotate-12 transition-transform" />
              </div>
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white font-display">
                Lumina<span className="text-sky-500">Care</span>
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] font-semibold tracking-widest text-teal-600 dark:text-teal-400 uppercase px-2 py-0.5 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200/50 dark:border-teal-800/50">
                Luxury Clinic
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1 bg-slate-100/70 dark:bg-slate-800/50 p-1.5 rounded-full border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-md">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  activeSection === link.id
                    ? 'bg-white dark:bg-slate-900 text-sky-600 dark:text-sky-400 shadow-sm font-semibold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-700/50'
                }`}
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* Desktop Right Action Controls */}
          <div className="hidden md:flex items-center space-x-2.5">
            {/* Search Button */}
            <button
              onClick={onOpenSearch}
              className="p-2.5 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Search clinic"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* AI Assistant Button */}
            <button
              onClick={onOpenAiAssistant}
              className="relative flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-sky-500/10 to-teal-500/10 text-sky-600 dark:text-sky-400 border border-sky-200 dark:border-sky-800 hover:border-sky-400 text-xs font-medium transition-all group"
            >
              <Sparkles className="w-3.5 h-3.5 text-sky-500 group-hover:rotate-12 transition-transform" />
              <span>AI Triage</span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
              </span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleThemeHandler}
              className="p-2.5 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition-colors"
              title="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Direct Phone Dial */}
            <a
              href="tel:+18005864621"
              className="hidden lg:flex items-center space-x-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-sky-500 dark:hover:text-sky-400 transition-colors px-2"
            >
              <Phone className="w-3.5 h-3.5 text-sky-500" />
              <span>+1 (800) 586-4621</span>
            </a>

            {/* Primary Book CTA */}
            <button
              onClick={() => onOpenBooking()}
              className="btn-primary text-xs !py-2.5 !px-5 shadow-md shadow-sky-500/20 active:scale-[0.98]"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={onOpenSearch}
              className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={toggleThemeHandler}
              className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[80] md:hidden bg-slate-900/60 backdrop-blur-md pt-24 px-6 pb-8 flex flex-col justify-between animate-in slide-in-from-top duration-300">
          <div className="space-y-3 bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Navigation</span>
              <button
                onClick={onOpenAiAssistant}
                className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400 text-xs font-semibold"
              >
                <Bot className="w-3.5 h-3.5" />
                <span>AI Symptom Checker</span>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`flex items-center justify-between p-3 rounded-2xl text-sm font-medium text-left transition-colors ${
                    activeSection === link.id
                      ? 'bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 font-semibold'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col space-y-3">
              <a
                href="tel:+18005864621"
                className="flex items-center justify-center space-x-2 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold"
              >
                <Phone className="w-4 h-4 text-sky-500" />
                <span>Call Emergency: +1 (800) 586-4621</span>
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-teal-500 text-white font-semibold text-sm shadow-md shadow-sky-500/20 flex items-center justify-center space-x-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
