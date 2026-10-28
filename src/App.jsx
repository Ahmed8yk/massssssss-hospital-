import React, { useState, useEffect } from 'react';
import { ShieldCheck } from 'lucide-react';
import { HospitalProvider } from './context/HospitalContext.jsx';
import { StructuredData } from './components/StructuredData.jsx';
import { Navbar } from './components/Navbar.jsx';
import { HeroSlideshow } from './components/HeroSlideshow.jsx';
import { TrustStatsBar } from './components/TrustStatsBar.jsx';
import { AboutSection } from './components/AboutSection.jsx';
import { ServicesSection } from './components/ServicesSection.jsx';
import { DoctorsSection } from './components/DoctorsSection.jsx';
import { FacilitiesSection } from './components/FacilitiesSection.jsx';
import { PhotoGallery } from './components/PhotoGallery.jsx';
import { ServiceAreaSection } from './components/ServiceAreaSection.jsx';
import { FaqSection } from './components/FaqSection.jsx';
import { ContactSection } from './components/ContactSection.jsx';
import { Footer } from './components/Footer.jsx';
import { MobileStickyBar } from './components/MobileStickyBar.jsx';
import { AdminPanel } from './components/admin/AdminPanel.jsx';

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  useEffect(() => {
    const checkAdminRoute = () => {
      const hash = (window.location.hash || '').toLowerCase();
      const pathname = (window.location.pathname || '').toLowerCase();
      const search = (window.location.search || '').toLowerCase();

      if (
        hash === '#admin' ||
        hash === '#/admin' ||
        hash === '#staff' ||
        hash === '#/staff' ||
        pathname.endsWith('/admin') ||
        pathname.endsWith('/admin/') ||
        pathname.endsWith('/staff') ||
        pathname.endsWith('/staff/') ||
        search.includes('admin=true') ||
        search.includes('staff=true')
      ) {
        setIsAdminOpen(true);
      }
    };

    checkAdminRoute();
    window.addEventListener('hashchange', checkAdminRoute);
    window.addEventListener('popstate', checkAdminRoute);

    // Global developer/user helpers
    window.openAdmin = () => setIsAdminOpen(true);
    window.closeAdmin = () => setIsAdminOpen(false);

    // Shortcut: Ctrl+Shift+A or Cmd+Shift+A
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setIsAdminOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', checkAdminRoute);
      window.removeEventListener('popstate', checkAdminRoute);
      window.removeEventListener('keydown', handleKeyDown);
      delete window.openAdmin;
      delete window.closeAdmin;
    };
  }, []);

  const handleCloseAdmin = () => {
    setIsAdminOpen(false);
    if (window.location.hash.includes('admin') || window.location.hash.includes('staff')) {
      try {
        window.history.pushState(null, '', window.location.pathname);
      } catch (e) {
        window.location.hash = '';
      }
    }
  };

  return (
    <HospitalProvider>
      <div className="min-h-screen bg-[#F8FAFC] text-slate-700 flex flex-col selection:bg-sky-500 selection:text-white font-sans">
        {/* Search Engine Structured Data (JSON-LD) */}
        <StructuredData />

        {/* Sticky Header Navigation */}
        <Navbar onOpenAdmin={() => setIsAdminOpen(true)} />

        {/* Main Public Content Area */}
        <main className="flex-1">
          {/* 1. Hero Section with Hospital Photo Slideshow (#home) */}
          <HeroSlideshow />

          {/* 2. Quick Verified Facts & Clinical Bar */}
          <TrustStatsBar />

          {/* 3. Hospital Overview & Clinical Focus */}
          <AboutSection />

          {/* 4. Complete Neurological Services, Stroke & Epilepsy (#services) */}
          <ServicesSection />

          {/* 5. Doctor Profile - Dr. Shivkumar Masaraddi (#doctors) */}
          <DoctorsSection />

          {/* 6. Hospital Infrastructure: 7 ICU, Pharmacy, Lab, Physiotherapy, X-Ray, OT (#facilities) */}
          <FacilitiesSection />

          {/* 7. Upgraded Photo Gallery with Lightbox & Hover Effects (#gallery) */}
          <PhotoGallery />

          {/* 8. Regional 90 km Catchment & Travel Guide (#service-area) */}
          <ServiceAreaSection />

          {/* 9. Patient FAQ Section (#faq) */}
          <FaqSection />

          {/* 10. Hospital Address, Verified Timings & Contact (#contact) */}
          <ContactSection />
        </main>

        {/* Hospital Footer with Admin Portal trigger */}
        <Footer onOpenAdmin={() => setIsAdminOpen(true)} />

        {/* Mobile Sticky Bottom Bar */}
        <MobileStickyBar />

        {/* Floating Quick Access to Admin / Staff Portal */}
        {!isAdminOpen && (
          <button
            type="button"
            onClick={() => setIsAdminOpen(true)}
            className="fixed bottom-20 md:bottom-6 right-4 z-40 px-3.5 py-2 rounded-full bg-[#080E1A]/95 hover:bg-[#0B132B] text-sky-300 hover:text-white border border-sky-400/40 shadow-xl backdrop-blur-md text-xs font-bold transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-1.5 cursor-pointer group"
            title="Open Hospital Admin Panel (Ctrl+Shift+A)"
            aria-label="Open Hospital Admin Panel"
          >
            <ShieldCheck className="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform" />
            <span>Admin</span>
          </button>
        )}

        {/* Live Admin Panel Modal / Dashboard */}
        {isAdminOpen && (
          <AdminPanel onClose={handleCloseAdmin} />
        )}
      </div>
    </HospitalProvider>
  );
}
