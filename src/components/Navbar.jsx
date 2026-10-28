import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  MessageSquare, 
  Menu, 
  X, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  ExternalLink,
  ChevronRight,
  Activity,
  Calendar,
  Navigation
} from 'lucide-react';
import { useHospitalData } from '../context/HospitalContext.jsx';
import { HospitalLogo } from './HospitalLogo.jsx';

export const Navbar = ({ onOpenAdmin }) => {
  const { data } = useHospitalData();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);

      // Section intersection detection
      const sections = ['home', 'services', 'doctors', 'facilities', 'gallery', 'service-area', 'faq', 'contact'];
      const scrollPos = window.scrollY + 140;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'Services', href: '#services', id: 'services' },
    { name: 'Doctors', href: '#doctors', id: 'doctors' },
    { name: 'Facilities', href: '#facilities', id: 'facilities' },
    { name: 'Gallery', href: '#gallery', id: 'gallery' },
    { name: 'Service Area', href: '#service-area', id: 'service-area' },
    { name: 'FAQ', href: '#faq', id: 'faq' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (href) => {
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = targetElement.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const googleMapsUrl = data?.contact?.googleMapsDirectionsUrl || "https://share.google/kY37dzPJA6qIplc1D";

  return (
    <header className="fixed top-0 inset-x-0 z-50 transition-all duration-300 font-sans">
      {/* 1. Clinical Top Utility Strip (Pre-header with glassy feel) */}
      <div 
        className={`hidden lg:block transition-all duration-300 bg-[#050A14]/90 backdrop-blur-md border-b border-white/[0.08] ${
          isScrolled ? 'h-0 opacity-0 overflow-hidden py-0 border-none' : 'py-1.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between text-[11px] text-slate-300">
            
            {/* Left: Live Status & OPD Hours */}
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-1.5 font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-emerald-400 font-semibold tracking-wide">24/7 Acute Neuro Emergency &amp; ICU</span>
              </span>

              <span className="text-slate-700">|</span>

              <div className="flex items-center gap-1.5 text-slate-300">
                <Clock className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span>OPD Hours: <strong className="text-white font-semibold">{data?.contact?.timings?.opd || '10:00 AM – 4:00 PM & 6:00 PM – 8:00 PM'}</strong></span>
              </div>
            </div>

            {/* Right: Verified Landmark, Map Link & Direct Phone */}
            <div className="flex items-center gap-4">
              <a 
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-slate-300 hover:text-sky-300 transition-colors group"
                title="View on Google Maps"
              >
                <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0 group-hover:scale-110 transition-transform" />
                <span>Godi Layout, near Rotary Circle, beside Kailash- In Hotel, Bagalkot</span>
                <ExternalLink className="w-2.5 h-2.5 text-slate-500 group-hover:text-sky-300" />
              </a>

              <span className="text-slate-700">|</span>

              <a
                href={`tel:${data?.contact?.phone || '+918354220000'}`}
                className="flex items-center gap-1.5 text-sky-300 hover:text-white font-semibold transition-colors"
              >
                <Phone className="w-3 h-3 text-sky-400" />
                <span>OPD Desk: {data?.contact?.phoneDisplay || '+91 8354 220000'}</span>
              </a>
            </div>

          </div>
        </div>
      </div>

      {/* 2. Main Water-like Glossy Glass Hospital Header */}
      <div 
        className={`relative overflow-hidden transition-all duration-300 ${
          isScrolled
            ? 'water-glass-nav-scrolled py-2 sm:py-2.5'
            : 'water-glass-nav py-2.5 sm:py-3.5'
        }`}
      >
        {/* Specular Liquid Sheen Reflection Layer */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[48%] glossy-sheen" />
        
        {/* Top Razor Specular Highlight Rim */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        
        {/* Soft Ambient Prism Refraction */}
        <div className="pointer-events-none absolute -top-8 left-1/4 right-1/4 h-14 bg-sky-400/10 blur-xl rounded-full" />

        <div className="relative max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2.5 sm:gap-4 lg:gap-6">

            {/* Hospital Brand & Official Seal with Glossy Ring Bezel */}
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#home');
              }}
              className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none shrink-0"
              aria-label="Masaraddi Neuro Care Center Home"
            >
              <div className="relative">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full p-0.5 bg-gradient-to-tr from-sky-400/35 via-white/25 to-blue-600/30 ring-1 ring-white/25 group-hover:ring-sky-400/60 shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.4),0_2px_8px_rgba(0,0,0,0.4)] transition-all duration-300">
                  <HospitalLogo 
                    className="w-full h-full object-contain drop-shadow-[0_2px_8px_rgba(2,132,199,0.45)]" 
                    priority={true} 
                  />
                </div>
                {/* Live operational indicator badge */}
                <span 
                  className="absolute bottom-0 right-0 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500 ring-2 ring-[#080E1A] shadow-sm shadow-emerald-500/80" 
                  title="Hospital Open & Operating"
                />
              </div>

              <div className="flex flex-col text-left">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="font-extrabold tracking-tight text-white text-[15px] sm:text-lg font-outfit uppercase drop-shadow-sm">
                    Masaraddi
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-sky-300 bg-sky-950/80 border border-sky-400/40 px-2 py-0.5 rounded shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]">
                    Neuro Care
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[11px] sm:text-xs text-slate-300 font-medium leading-none mt-0.5">
                  <span className="text-slate-200">Bagalkot</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-300 hidden xs:inline">Dr. Shivkumar Masaraddi</span>
                  <span className="text-sky-400 text-[10px] hidden md:inline font-mono font-semibold">DM Neurology</span>
                </div>
              </div>
            </a>

            {/* Desktop Navigation Links with Modern Glossy Hover Effect */}
            <nav 
              className="hidden xl:flex items-center gap-1 py-1 px-1.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]"
              aria-label="Main Navigation"
            >
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className={`relative px-3.5 py-1.5 text-[13px] font-medium tracking-wide transition-all duration-200 rounded-xl group ${
                      isActive 
                        ? 'text-white font-semibold bg-white/[0.1] border border-white/15 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)]' 
                        : 'text-slate-300 hover:text-white hover:bg-white/[0.06] border border-transparent hover:border-white/10'
                    }`}
                  >
                    <span>{link.name}</span>
                    {/* Active indicator dot/glow */}
                    {isActive && (
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-gradient-to-r from-sky-400 to-blue-400 rounded-full shadow-[0_0_8px_rgba(56,189,248,0.9)]" />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Desktop Action Suite with Glossy Specular Buttons */}
            <div className="hidden sm:flex items-center gap-2.5 shrink-0">
              {/* WhatsApp Quick Connect */}
              <a
                href={`https://wa.me/${data?.contact?.whatsappNumber || '919448000000'}?text=${encodeURIComponent(
                  data?.contact?.whatsappMessage || 'Hello, I am contacting Masaraddi Neuro Care Center to schedule a consultation.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-400/35 transition-all duration-200 hover:border-emerald-400/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] hover:shadow-emerald-500/20 active:scale-95"
                title="Chat with Hospital Desk on WhatsApp"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>WhatsApp</span>
              </a>

              {/* Call Hospital CTA with Glossy Finish */}
              <a
                href={`tel:${data?.contact?.phone || '+918354220000'}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white shadow-lg shadow-sky-950/50 border border-sky-300/40 transition-all duration-200 hover:shadow-sky-500/30 active:scale-95"
                title="Call Masaraddi Neuro Care Center"
              >
                <Phone className="w-3.5 h-3.5 shrink-0" />
                <span>Call Hospital</span>
              </a>

              {/* Staff / Admin Portal Quick Switch */}
              {onOpenAdmin && (
                <button
                  type="button"
                  onClick={onOpenAdmin}
                  className="inline-flex items-center justify-center p-2 rounded-xl text-slate-300 hover:text-sky-300 bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-white/20 transition-all duration-200 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] cursor-pointer"
                  title="Hospital Staff &amp; Admin Panel"
                  aria-label="Hospital Staff &amp; Admin Panel"
                >
                  <ShieldCheck className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Mobile Actions: Optimized Touch Targets & Glossy Styling */}
            <div className="flex items-center gap-2 lg:hidden">
              <a
                href={`tel:${data?.contact?.phone || '+918354220000'}`}
                className="flex items-center gap-1.5 px-3 py-2 min-h-[42px] rounded-xl bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 text-white text-xs font-bold border border-sky-300/40 shadow-md shadow-sky-950/40 active:scale-95 transition-all"
                aria-label="Call Hospital"
              >
                <Phone className="w-3.5 h-3.5 text-white" />
                <span className="text-[12px]">Call</span>
              </a>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="min-w-[42px] min-h-[42px] p-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] border border-white/20 text-white flex items-center justify-center active:scale-95 transition-all shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)] focus:outline-none cursor-pointer"
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-sky-400" /> : <Menu className="w-5 h-5 text-slate-100" />}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* 3. Mobile Slide-Over Navigation Drawer with Water-like Glass Effect */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end">
          {/* Backdrop with dark blur */}
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity duration-200"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Sheet with Water Glass Aesthetics */}
          <div className="relative z-10 w-full bg-[#080E1A]/95 backdrop-blur-2xl border-t border-white/20 rounded-t-3xl shadow-[0_-16px_50px_rgba(0,0,0,0.8),inset_0_1px_1.5px_rgba(255,255,255,0.28)] max-h-[90vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-250">
            {/* Top Glossy Sheen Reflection */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-28 glossy-sheen" />

            {/* Drawer Header */}
            <div className="relative px-5 py-4 border-b border-white/[0.1] flex items-center justify-between bg-[#050A14]/70 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full p-0.5 bg-gradient-to-tr from-sky-400/30 to-blue-500/20 ring-1 ring-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]">
                  <HospitalLogo className="w-full h-full object-contain" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-extrabold text-white uppercase tracking-tight">Masaraddi</span>
                    <span className="text-[10px] font-bold text-sky-300 bg-sky-950/80 px-1.5 py-0.5 rounded border border-sky-400/40">Neuro Care</span>
                  </div>
                  <span className="text-[11px] text-slate-300 block font-medium">Bagalkot &bull; Dr. Shivkumar Masaraddi</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="min-w-[40px] min-h-[40px] flex items-center justify-center rounded-xl bg-white/[0.08] hover:bg-white/[0.15] border border-white/15 text-slate-300 hover:text-white transition-all active:scale-95 cursor-pointer shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"
                aria-label="Close navigation"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Emergency Status Strip in Drawer */}
            <div className="px-5 py-2.5 bg-emerald-950/50 border-b border-emerald-500/25 flex items-center justify-between text-xs">
              <span className="inline-flex items-center gap-1.5 text-emerald-300 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400/80" />
                24/7 Acute Neuro Emergency Open
              </span>
              <span className="text-slate-300 font-mono text-[11px] bg-emerald-900/40 px-2 py-0.5 rounded border border-emerald-500/20">7 ICU Beds</span>
            </div>

            {/* Scrollable Navigation Area */}
            <div className="px-5 py-3.5 overflow-y-auto flex-1 space-y-4">
              <nav className="grid grid-cols-2 gap-2" aria-label="Mobile Navigation">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.id;
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(link.href);
                      }}
                      className={`min-h-[46px] flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                        isActive
                          ? 'bg-sky-500/25 text-white border border-sky-400/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)]'
                          : 'bg-white/[0.04] text-slate-200 hover:text-white hover:bg-white/[0.08] border border-white/[0.08] active:scale-[0.98]'
                      }`}
                    >
                      <span>{link.name}</span>
                      <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'text-sky-300' : 'text-slate-500'}`} />
                    </a>
                  );
                })}
              </nav>

              {/* Exact Location & Directions Card with Water Glass Effect */}
              <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/[0.1] shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] space-y-2.5">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <p className="font-bold text-white">Hospital Location</p>
                    <p className="text-slate-300 text-[11px] leading-snug mt-0.5">
                      Godi Layout, near Rotary Circle, beside Kailash- In Hotel, Bagalkot - 587101
                    </p>
                  </div>
                </div>

                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-[44px] flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-sky-950/70 hover:bg-sky-900/80 text-sky-200 border border-sky-400/40 text-xs font-semibold shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] transition-all active:scale-95"
                >
                  <Navigation className="w-3.5 h-3.5 text-sky-300" />
                  <span>Open in Google Maps</span>
                </a>
              </div>

              {/* OPD Hours Note */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.07] text-[11px] text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-sky-400" />
                  <span className="font-medium">OPD Timings</span>
                </span>
                <span className="font-bold text-white">10AM–4PM &bull; 6PM–8PM</span>
              </div>
            </div>

            {/* Drawer Action Bar */}
            <div className="p-4 bg-[#050A14]/85 border-t border-white/[0.1] space-y-2.5">
              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href={`tel:${data?.contact?.phone || '+918354220000'}`}
                  className="min-h-[46px] flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold text-xs shadow-lg shadow-sky-950/50 border border-sky-300/40 active:scale-95 transition-transform"
                >
                  <Phone className="w-4 h-4 text-white" />
                  <span>Call Hospital</span>
                </a>

                <a
                  href={`https://wa.me/${data?.contact?.whatsappNumber || '919448000000'}?text=${encodeURIComponent(
                    data?.contact?.whatsappMessage || 'Hello, I am contacting Masaraddi Neuro Care Center.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[46px] flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-emerald-600/25 border border-emerald-400/40 text-emerald-200 font-bold text-xs shadow-md shadow-emerald-950/40 active:scale-95 transition-transform"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-300" />
                  <span>WhatsApp</span>
                </a>
              </div>

              {onOpenAdmin && (
                <div className="text-center pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenAdmin();
                    }}
                    className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-sky-300 font-semibold cursor-pointer py-1.5"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                    <span>Hospital Staff &amp; Admin Panel</span>
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      )}
    </header>
  );
};
