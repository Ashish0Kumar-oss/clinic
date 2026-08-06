import React, { useState, useEffect } from 'react';
import { LoadingScreen } from './components/LoadingScreen';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { AboutSection } from './components/AboutSection';
import { WhyChooseUsSection } from './components/WhyChooseUsSection';
import { DoctorsSection } from './components/DoctorsSection';
import { TreatmentsSection } from './components/TreatmentsSection';
import { PatientTimeline } from './components/PatientTimeline';
import { TestimonialsSection } from './components/TestimonialsSection';
import { GallerySection } from './components/GallerySection';
import { FaqSection } from './components/FaqSection';
import { BlogSection } from './components/BlogSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

import { AppointmentModal } from './components/AppointmentModal';
import { SearchModal } from './components/SearchModal';
import { AiHealthAssistantModal } from './components/AiHealthAssistantModal';
import { FloatingWhatsappWidget } from './components/FloatingWhatsappWidget';
import { CookieConsent } from './components/CookieConsent';
import { StickyMobileCta } from './components/StickyMobileCta';

export function App() {
  // Theme state
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Modal states
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingDept, setBookingDept] = useState<string | undefined>('');
  const [bookingDocId, setBookingDocId] = useState<string | undefined>('');

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  // Selected article or doctor from global search
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);

  useEffect(() => {
    // Check initial preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleOpenBooking = (dept?: string, docId?: string) => {
    setBookingDept(dept || '');
    setBookingDocId(docId || '');
    setIsBookingOpen(true);
  };

  const handleSelectSearchResult = (type: string, id: string) => {
    if (type === 'service') {
      const el = document.getElementById('services');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (type === 'doctor') {
      const el = document.getElementById('doctors');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (type === 'treatment') {
      const el = document.getElementById('treatments');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (type === 'blog') {
      setSelectedBlogId(id);
      const el = document.getElementById('blog');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-sky-500 selection:text-white transition-colors duration-300 relative pb-16 md:pb-0 overflow-x-hidden">
      {/* Background Aurora Light Blobs */}
      <div className="aurora aurora-blue top-[-150px] right-[-100px] fixed pointer-events-none" />
      <div className="aurora aurora-teal bottom-[-150px] left-[-100px] fixed pointer-events-none" />
      <div className="aurora aurora-indigo top-[45%] left-[-150px] fixed pointer-events-none opacity-40" />

      {/* Entrance Screen Loader */}
      <LoadingScreen />

      {/* Top Reading Scroll Indicator */}
      <ScrollProgressBar />

      {/* Sticky Glass Navbar */}
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenBooking={() => handleOpenBooking()}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAiAssistant={() => setIsAiModalOpen(true)}
      />

      {/* Main Sections Stack */}
      <main>
        <HeroSection
          onOpenBooking={() => handleOpenBooking()}
          onOpenAiAssistant={() => setIsAiModalOpen(true)}
        />

        <ServicesSection onOpenBooking={(dept) => handleOpenBooking(dept)} />

        <AboutSection onOpenBooking={() => handleOpenBooking()} />

        <WhyChooseUsSection />

        <DoctorsSection onOpenBooking={(dept, docId) => handleOpenBooking(dept, docId)} />

        <TreatmentsSection onOpenBooking={() => handleOpenBooking()} />

        <PatientTimeline />

        <TestimonialsSection />

        <GallerySection />

        <FaqSection />

        <BlogSection selectedBlogIdFromOutside={selectedBlogId} />

        <ContactSection />
      </main>

      {/* Luxury Footer */}
      <Footer onOpenBooking={() => handleOpenBooking()} />

      {/* Overlays and Modals */}
      <AppointmentModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedDepartment={bookingDept}
        preselectedDoctorId={bookingDocId}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectResult={handleSelectSearchResult}
      />

      <AiHealthAssistantModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        onOpenBooking={(dept) => handleOpenBooking(dept)}
      />

      {/* Floating Widgets */}
      <FloatingWhatsappWidget />
      <CookieConsent />
      <StickyMobileCta onOpenBooking={() => handleOpenBooking()} />
    </div>
  );
}

export default App;
