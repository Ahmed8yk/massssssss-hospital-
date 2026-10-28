import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Phone, MessageSquare, ChevronLeft, ChevronRight, Pause, Play, MapPin, CheckCircle2, Clock } from 'lucide-react';
import { useHospitalData } from '../context/HospitalContext.jsx';
import { HospitalLogo } from './HospitalLogo.jsx';

export const HeroSlideshow = () => {
  const { data } = useHospitalData();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);
  const timerRef = useRef(null);

  const rawSlides = Array.isArray(data.heroSlides) && data.heroSlides.length > 0 ? data.heroSlides : [];
  const slides = rawSlides.filter((s) => s && s.url);

  // Preload adjacent slides for instantaneous transitions
  useEffect(() => {
    if (slides.length > 1) {
      const nextIdx = (currentIndex + 1) % slides.length;
      if (slides[nextIdx]?.url) {
        const img = new Image();
        img.src = slides[nextIdx].url;
      }
    }
  }, [currentIndex, slides]);

  const nextSlide = useCallback(() => {
    if (slides.length === 0) return;
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    if (slides.length === 0) return;
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Auto transition
  useEffect(() => {
    if (isPlaying && slides.length > 1) {
      timerRef.current = setInterval(() => {
        nextSlide();
      }, 5000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, nextSlide, slides.length]);

  // Touch gesture handling
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section
      id="home"
      className="relative min-h-[88svh] sm:min-h-[92vh] md:min-h-screen flex items-center justify-center overflow-hidden bg-[#080E1A] pt-20 sm:pt-24 pb-24 sm:pb-16"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-label="Masaraddi Neuro Care Center Hero Introduction"
    >
      {/* Background Slideshow Layer with Crisp Contrast & Ultra-HD Clarity */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {slides.map((slide, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={`hero-bg-${slide.id || index}-${index}`}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <img
                src={slide.url}
                alt={slide.altText || slide.title || 'Masaraddi Neuro Care Center'}
                style={{
                  objectPosition: slide.objectPosition || 'center 35%',
                }}
                className={`w-full h-full object-cover contrast-[1.06] brightness-[0.98] saturate-[1.04] transition-transform duration-[14000ms] ease-out ${
                  isActive ? 'scale-105' : 'scale-100'
                }`}
                loading={index === 0 ? 'eager' : 'lazy'}
                fetchPriority={index === 0 ? 'high' : 'auto'}
              />
            </div>
          );
        })}

        {/* Lightweight Crystal-Clear Vignettes: Preserves Sharp Visuals Across Desktop and Mobile */}
        <div className="absolute inset-0 z-20 bg-gradient-to-r from-[#080E1A]/70 via-[#080E1A]/25 to-transparent md:from-[#080E1A]/75 md:via-[#080E1A]/20 md:to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-36 sm:h-44 z-20 bg-gradient-to-t from-[#080E1A] via-[#080E1A]/35 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-24 sm:h-28 z-20 bg-gradient-to-b from-[#080E1A]/60 via-[#080E1A]/15 to-transparent pointer-events-none" />
      </div>

      {/* Hero Content Layer */}
      <div className="relative z-30 max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 w-full py-6 sm:py-16 md:py-20">
        <div className="max-w-3xl space-y-4 sm:space-y-6">
          
          {/* Mobile Clarity Frame: Translucent water-glass that lets the sharp background shine through */}
          <div className="bg-[#080E1A]/40 sm:bg-transparent backdrop-blur-[6px] sm:backdrop-blur-none p-4 sm:p-0 rounded-2xl sm:rounded-none border border-white/15 sm:border-transparent shadow-[0_8px_32px_rgba(0,0,0,0.35)] sm:shadow-none space-y-3.5 sm:space-y-6">
            
            {/* Official Hospital Information & Trust Badge */}
            <div className="inline-flex flex-wrap items-center gap-2.5 sm:gap-3 p-1.5 pr-3.5 sm:pr-4 rounded-full bg-slate-900/85 border border-sky-400/35 backdrop-blur-xl shadow-lg">
              <HospitalLogo className="w-7 h-7 sm:w-8 sm:h-8 drop-shadow-sm" priority={true} />
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs">
                <span className="text-white font-bold tracking-wide">
                  Masaraddi Neuro Care Centre
                </span>
                <span className="text-slate-500 hidden sm:inline">&bull;</span>
                <span className="text-sky-300 font-medium hidden sm:inline">
                  {data.established} &bull; Bagalkot
                </span>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-0.5" title="24/7 Emergency Care Active" />
            </div>

            {/* Main H1 Headline with Razor-Sharp Clarity & Drop Shadow */}
            <h1 className="text-2xl sm:text-4xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.18] sm:leading-[1.14] font-outfit text-hero-clarity">
              Complete Neurological Services. <br />
              <span className="neuro-gradient-text">Neurology Hospital in Bagalkot.</span>
            </h1>

            {/* Supporting Verified Hospital Copy */}
            <p className="text-[13px] sm:text-base lg:text-lg text-slate-100 font-medium leading-relaxed max-w-2xl text-hero-clarity">
              {data.supportingText}
            </p>

            {/* OPD Consultation Timings Display with Glossy Water-Glass Finish */}
            <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-900/75 border border-sky-400/30 backdrop-blur-md max-w-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
              <div className="flex items-start gap-2.5 sm:gap-3">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-sky-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5 text-xs sm:text-sm">
                  <span className="text-slate-300 font-semibold block text-[10px] sm:text-xs uppercase tracking-wider">OPD / Consultation Timings:</span>
                  <p className="text-white font-bold tracking-wide">
                    {data.contact.timings.opdSlot1} &bull; {data.contact.timings.opdSlot2}
                  </p>
                  <p className="text-sky-200 text-[11px] sm:text-xs font-medium pt-0.5">
                    Call the hospital to check doctor availability and schedule your visit.
                  </p>
                </div>
              </div>
            </div>

            {/* Primary Action Buttons (Call Hospital & WhatsApp Only) with Min 44px Touch Targets */}
            <div className="pt-1 sm:pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4 max-w-lg">
              {/* Primary Call CTA */}
              <a
                href={`tel:${data.contact.phone}`}
                className="w-full sm:w-auto min-h-[46px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-sky-600/35 hover:scale-[1.02] active:scale-95 transition-all duration-200 border border-sky-300/40 text-center"
                aria-label="Call Masaraddi Neuro Care Center"
              >
                <Phone className="w-4 h-4 text-white shrink-0" />
                <span>Call to Schedule Visit</span>
              </a>

              {/* Secondary WhatsApp CTA */}
              <a
                href={`https://wa.me/${data.contact.whatsappNumber}?text=${encodeURIComponent(
                  data.contact.whatsappMessage
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto min-h-[46px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl sm:rounded-2xl bg-slate-900/85 hover:bg-slate-800 text-slate-100 font-bold text-xs sm:text-sm border border-slate-600/70 backdrop-blur-md shadow-md hover:scale-[1.02] active:scale-95 transition-all duration-200 text-center"
                aria-label="WhatsApp Masaraddi Neuro Care Center"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>WhatsApp Inquiry</span>
              </a>
            </div>

            {/* Quick Key Highlights Strip */}
            <div className="pt-3 sm:pt-4 grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5 border-t border-white/10 sm:border-slate-800/80 max-w-2xl">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span className="text-[11px] sm:text-xs text-slate-200 font-medium text-hero-clarity">7 ICU Beds Available</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span className="text-[11px] sm:text-xs text-slate-200 font-medium text-hero-clarity">Stroke &amp; Epilepsy Care</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 col-span-2 sm:col-span-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span className="text-[11px] sm:text-xs text-slate-200 font-medium text-hero-clarity">Rotary Circle, Bagalkot</span>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Slide Navigation Controls - Positioned safely above MobileStickyBar */}
      {slides.length > 1 && (
        <div className="absolute bottom-20 sm:bottom-6 left-0 right-0 z-30 max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#080E1A]/80 backdrop-blur-xl border border-white/15 text-[11px] sm:text-xs text-slate-200 shadow-[0_8px_24px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.15)] max-w-[190px] sm:max-w-none truncate">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse shrink-0" />
            <span className="font-medium text-slate-400 hidden sm:inline">Clinical Facility:</span>
            <span className="text-white font-semibold truncate">{slides[currentIndex]?.tag}</span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-3 bg-[#080E1A]/85 backdrop-blur-xl px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/15 ml-auto shadow-[0_8px_24px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.2)]">
            <button
              onClick={prevSlide}
              className="p-1 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-1.5" role="tablist" aria-label="Slideshow pagination">
              {slides.map((slide, idx) => (
                <button
                  key={`hero-dot-${slide.id || idx}-${idx}`}
                  onClick={() => goToSlide(idx)}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    idx === currentIndex
                      ? 'w-5 sm:w-6 h-2 bg-gradient-to-r from-sky-400 to-blue-500 shadow-sm shadow-sky-400/50'
                      : 'w-2 h-2 bg-slate-600 hover:bg-slate-400'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                  aria-selected={idx === currentIndex}
                  role="tab"
                />
              ))}
            </div>

            <span className="text-[11px] font-mono text-slate-300 px-1 font-semibold select-none">
              {currentIndex + 1} / {slides.length}
            </span>

            <button
              onClick={nextSlide}
              className="p-1 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Next photo"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-1 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors ml-0.5 sm:ml-1 cursor-pointer"
              aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
