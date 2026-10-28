import React, { useState, useEffect, useRef } from 'react';
import { 
  Camera, 
  Eye, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Layers, 
  Play, 
  Pause, 
  Clock, 
  Sparkles,
  Maximize2
} from 'lucide-react';
import { useHospitalData } from '../context/HospitalContext.jsx';

/**
 * Auto-Rotating Gallery Card:
 * Continuously changes photos every 2 seconds (2000ms) with smooth crossfade
 */
const AutoRotatingCard = ({ photo, onClick, onImageLoad, isLoaded }) => {
  const images = Array.isArray(photo.images) && photo.images.length > 0
    ? photo.images
    : [photo.image].filter(Boolean);

  const [currentIdx, setCurrentIdx] = useState(0);

  // Auto-change photo continuously every 2 seconds (2000ms)
  useEffect(() => {
    if (images.length <= 1) return;

    const intervalMs = Number(photo.interval) || 2000;
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % images.length);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [images.length, photo.interval]);

  const handleDotClick = (e, dotIdx) => {
    e.stopPropagation();
    setCurrentIdx(dotIdx);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev + 1) % images.length);
  };

  return (
    <div
      onClick={() => onClick(photo, currentIdx)}
      className="group relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 cursor-pointer shadow-lg hover:border-sky-500/50 hover:shadow-2xl hover:shadow-sky-500/10 transition-all duration-500 flex flex-col aspect-[4/3]"
    >
      {/* Background images layered with smooth opacity crossfade */}
      {images.map((imgUrl, idx) => {
        const isActive = idx === currentIdx;
        return (
          <img
            key={imgUrl + idx}
            src={imgUrl}
            alt={`${photo.altText || photo.title} - ${idx + 1}`}
            referrerPolicy="no-referrer"
            className={`absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-700 ease-in-out ${
              isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
            loading="lazy"
            onLoad={() => onImageLoad(photo.id)}
          />
        );
      })}

      {/* Dark gradient overlay for typography readability */}
      <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#080E1A] via-[#080E1A]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300 pointer-events-none" />

      {/* Top Header Row: Category Badge & 2s Changing Reel Badge */}
      <div className="absolute top-3.5 left-3.5 right-3.5 z-30 flex items-center justify-between pointer-events-none">
        <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#080E1A]/85 backdrop-blur-md text-sky-300 border border-white/10 shadow-xs">
          {photo.categoryLabel}
        </span>

        <div className="flex items-center gap-1.5">
          {images.length > 1 && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/85 backdrop-blur-md text-emerald-300 border border-emerald-500/40 text-[10px] font-bold shadow-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>{images.length} Photos &bull; 2s Reel</span>
            </span>
          )}

          <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0 transition-all duration-300 shadow-md">
            <Eye className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Multi-Photo Interactive Progress Dashes */}
      {images.length > 1 && (
        <div className="absolute top-12 left-3.5 z-30 flex items-center gap-1.5">
          {images.map((_, dotIdx) => (
            <button
              key={dotIdx}
              type="button"
              onClick={(e) => handleDotClick(e, dotIdx)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                dotIdx === currentIdx
                  ? 'w-6 bg-sky-400 shadow-md'
                  : 'w-2 bg-white/40 hover:bg-white/80'
              }`}
              aria-label={`Switch to photo ${dotIdx + 1}`}
            />
          ))}
        </div>
      )}

      {/* Hover Next / Prev Arrow buttons on card */}
      {images.length > 1 && (
        <div className="absolute inset-y-0 inset-x-2 z-30 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <button
            type="button"
            onClick={handlePrev}
            className="w-7 h-7 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center pointer-events-auto cursor-pointer border border-white/20 backdrop-blur-xs"
            aria-label="Previous image in reel"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="w-7 h-7 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center pointer-events-auto cursor-pointer border border-white/20 backdrop-blur-xs"
            aria-label="Next image in reel"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Bottom Title & Description */}
      <div className="absolute bottom-3.5 inset-x-3.5 z-30 space-y-1 pointer-events-none">
        <h3 className="text-sm font-bold text-white font-outfit group-hover:text-sky-300 transition-colors line-clamp-1">
          {photo.title}
        </h3>
        <p className="text-[11px] text-slate-300 line-clamp-1 opacity-90">
          {photo.caption}
        </p>
      </div>
    </div>
  );
};

export const PhotoGallery = () => {
  const { data } = useHospitalData();
  const photos = data.gallery;

  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
  const [selectedImageSubIndex, setSelectedImageSubIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState('all');
  const [loadedImages, setLoadedImages] = useState({});
  const [isAutoPlayingLightbox, setIsAutoPlayingLightbox] = useState(true);

  const filters = [
    { id: 'all', label: 'All Photos' },
    { id: 'exterior', label: 'Premises' },
    { id: 'consultation', label: 'Consultation' },
    { id: 'patient_care', label: 'ICU & Inpatient' },
    { id: 'facilities', label: 'Facilities' },
    { id: 'diagnostics', label: 'Diagnostics' },
  ];

  const filteredPhotos = activeFilter === 'all'
    ? photos
    : photos.filter((p) => p.category === activeFilter);

  // Lightbox continuous 2s auto-cycle when opened
  useEffect(() => {
    if (selectedPhotoIndex === null || !isAutoPlayingLightbox) return;

    const currentCard = filteredPhotos[selectedPhotoIndex];
    if (!currentCard) return;

    const cardImages = Array.isArray(currentCard.images) && currentCard.images.length > 0
      ? currentCard.images
      : [currentCard.image];

    const timer = setInterval(() => {
      if (cardImages.length > 1 && selectedImageSubIndex < cardImages.length - 1) {
        // Next image in current card
        setSelectedImageSubIndex((prev) => prev + 1);
      } else {
        // Next card in gallery
        setSelectedPhotoIndex((prev) => (prev + 1) % filteredPhotos.length);
        setSelectedImageSubIndex(0);
      }
    }, 2000); // 2 seconds continuous change

    return () => clearInterval(timer);
  }, [selectedPhotoIndex, selectedImageSubIndex, isAutoPlayingLightbox, filteredPhotos]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedPhotoIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextPhoto();
      if (e.key === 'ArrowLeft') prevPhoto();
      if (e.key === ' ') {
        e.preventDefault();
        setIsAutoPlayingLightbox((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhotoIndex, filteredPhotos.length]);

  const openLightbox = (photo, subIdx = 0) => {
    const idx = filteredPhotos.findIndex((p) => p.id === photo.id);
    if (idx !== -1) {
      setSelectedPhotoIndex(idx);
      setSelectedImageSubIndex(subIdx);
      setIsAutoPlayingLightbox(true);
    }
  };

  const closeLightbox = () => {
    setSelectedPhotoIndex(null);
    setSelectedImageSubIndex(0);
  };

  const nextPhoto = () => {
    if (selectedPhotoIndex === null || filteredPhotos.length === 0) return;
    const currentCard = filteredPhotos[selectedPhotoIndex];
    const cardImages = Array.isArray(currentCard?.images) && currentCard.images.length > 0
      ? currentCard.images
      : [currentCard?.image];

    if (cardImages.length > 1 && selectedImageSubIndex < cardImages.length - 1) {
      setSelectedImageSubIndex((prev) => prev + 1);
    } else {
      setSelectedPhotoIndex((selectedPhotoIndex + 1) % filteredPhotos.length);
      setSelectedImageSubIndex(0);
    }
  };

  const prevPhoto = () => {
    if (selectedPhotoIndex === null || filteredPhotos.length === 0) return;
    if (selectedImageSubIndex > 0) {
      setSelectedImageSubIndex((prev) => prev - 1);
    } else {
      const prevCardIdx = (selectedPhotoIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
      const prevCard = filteredPhotos[prevCardIdx];
      const prevImages = Array.isArray(prevCard?.images) && prevCard.images.length > 0
        ? prevCard.images
        : [prevCard?.image];
      setSelectedPhotoIndex(prevCardIdx);
      setSelectedImageSubIndex(prevImages.length - 1);
    }
  };

  const handleImageLoad = (id) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  };

  const activeCard = selectedPhotoIndex !== null ? filteredPhotos[selectedPhotoIndex] : null;
  const activeCardImages = activeCard
    ? (Array.isArray(activeCard.images) && activeCard.images.length > 0 ? activeCard.images : [activeCard.image])
    : [];
  const currentDisplayImage = activeCardImages[selectedImageSubIndex] || activeCard?.image;

  return (
    <section id="gallery" className="py-24 bg-[#080E1A] text-white relative overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with 2-Second Multi-Photo Live Reel Badge */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-sky-500/30 text-sky-400 text-xs font-bold tracking-wide uppercase shadow-sm">
            <Camera className="w-3.5 h-3.5 text-sky-400" />
            <span>Clinical Environment &amp; Facilities</span>
            <span className="text-slate-600">&bull;</span>
            <span className="text-emerald-400 flex items-center gap-1 font-semibold normal-case">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Multi-Photo 2s Reel</span>
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-outfit">
            Hospital Facilities &amp; Campus Gallery
          </h2>
          
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Take a visual tour of Masaraddi Neuro Care Center in Bagalkot. Each section continuously cycles through multiple high-resolution photos every 2 seconds.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="mt-8 sm:mt-10 flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 px-1 max-w-full no-scrollbar">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer shrink-0 ${
                activeFilter === f.id
                  ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-600/30 scale-[1.02]'
                  : 'bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {f.label}
              {f.id !== 'all' && (
                <span className="ml-1.5 text-[10px] opacity-75">
                  ({photos.filter((p) => p.category === f.id).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Responsive Grid with 2-Second Multi-Photo Auto-Changing Cards */}
        <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredPhotos.map((photo) => (
            <AutoRotatingCard
              key={photo.id}
              photo={photo}
              onClick={openLightbox}
              onImageLoad={handleImageLoad}
              isLoaded={loadedImages[photo.id]}
            />
          ))}
        </div>

        {/* Gallery Caption Footnote */}
        <div className="mt-14 text-center">
          <p className="text-xs text-slate-400 max-w-xl mx-auto">
            Photographs illustrate clinical infrastructure and facilities designed for patient care at Masaraddi Neuro Care Center, Godi Layout, Rotary Circle, Bagalkot.
          </p>
        </div>

      </div>

      {/* Upgraded Lightbox Modal with 2-Second Auto-Play Controls */}
      {selectedPhotoIndex !== null && activeCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-md animate-in fade-in duration-200">
          
          {/* Top Bar with Auto-Play (2s) Toggle and Close Button */}
          <div className="absolute top-4 inset-x-4 sm:inset-x-8 flex items-center justify-between z-30">
            <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-300 bg-black/60 px-3.5 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
              <span className="text-sky-400 font-bold">{activeCard.categoryLabel}</span>
              <span className="text-slate-500">•</span>
              <span>
                Card {selectedPhotoIndex + 1} of {filteredPhotos.length}
              </span>
              {activeCardImages.length > 1 && (
                <>
                  <span className="text-slate-500">•</span>
                  <span className="text-emerald-400 font-medium">
                    Photo {selectedImageSubIndex + 1} of {activeCardImages.length}
                  </span>
                </>
              )}
            </div>

            <div className="flex items-center gap-2">
              {/* 2-Second Auto-Play Toggle */}
              <button
                type="button"
                onClick={() => setIsAutoPlayingLightbox((prev) => !prev)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all border cursor-pointer ${
                  isAutoPlayingLightbox
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-sm'
                    : 'bg-white/10 text-slate-300 border-white/10 hover:text-white'
                }`}
                title="Toggle 2-second continuous slideshow"
              >
                {isAutoPlayingLightbox ? (
                  <>
                    <Pause className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Auto 2s Active</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 text-sky-400" />
                    <span>Play 2s Slideshow</span>
                  </>
                )}
              </button>

              <button
                onClick={closeLightbox}
                className="p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer border border-white/10"
                aria-label="Close photo preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Previous Photo Button */}
          <button
            onClick={prevPhoto}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-black/60 hover:bg-black/90 text-white transition-all z-30 border border-white/15 hover:scale-105 cursor-pointer shadow-xl"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Photo Button */}
          <button
            onClick={nextPhoto}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-black/60 hover:bg-black/90 text-white transition-all z-30 border border-white/15 hover:scale-105 cursor-pointer shadow-xl"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Main Image Stage */}
          <div className="max-w-5xl w-full max-h-[85vh] flex flex-col items-center justify-center space-y-4 px-2 sm:px-4">
            <div className="relative rounded-3xl overflow-hidden max-h-[64vh] sm:max-h-[70vh] border border-white/10 shadow-2xl bg-black">
              <img
                src={currentDisplayImage}
                alt={activeCard.altText || activeCard.title}
                referrerPolicy="no-referrer"
                className="max-h-[64vh] sm:max-h-[70vh] w-auto max-w-full object-contain mx-auto transition-opacity duration-300"
              />
            </div>

            {/* Title & Caption */}
            <div className="text-center space-y-1 max-w-2xl px-2">
              <h3 className="text-base sm:text-lg font-bold text-white font-outfit">
                {activeCard.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                {activeCard.caption}
              </p>
            </div>

            {/* Thumbnail Strip with Multi-Image Indicators */}
            <div className="hidden sm:flex items-center gap-2 overflow-x-auto max-w-full py-2 px-4 bg-white/5 rounded-2xl border border-white/10 no-scrollbar">
              {filteredPhotos.map((thumb, idx) => {
                const isSelected = idx === selectedPhotoIndex;
                const thumbImage = (Array.isArray(thumb.images) && thumb.images.length > 0)
                  ? thumb.images[0]
                  : thumb.image;
                const photoCount = Array.isArray(thumb.images) ? thumb.images.length : 1;

                return (
                  <button
                    key={thumb.id}
                    onClick={() => {
                      setSelectedPhotoIndex(idx);
                      setSelectedImageSubIndex(0);
                    }}
                    className={`relative w-14 h-10 rounded-lg overflow-hidden shrink-0 transition-all border-2 cursor-pointer ${
                      isSelected
                        ? 'border-sky-400 scale-105 opacity-100 shadow-md'
                        : 'border-transparent opacity-50 hover:opacity-85'
                    }`}
                    aria-label={`Jump to photo ${idx + 1}`}
                  >
                    <img src={thumbImage} alt={thumb.title} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                    {photoCount > 1 && (
                      <span className="absolute bottom-0 right-0 bg-black/80 text-[9px] font-bold text-emerald-400 px-1 rounded-tl">
                        {photoCount}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

          </div>

        </div>
      )}
    </section>
  );
};
