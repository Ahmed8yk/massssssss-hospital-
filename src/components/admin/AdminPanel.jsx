import React, { useState, useRef, useEffect } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Unlock, 
  Eye, 
  Upload, 
  Trash2, 
  Plus, 
  Edit3, 
  Check, 
  AlertCircle, 
  RefreshCw, 
  ArrowLeft, 
  Save, 
  UserCheck, 
  ImageIcon, 
  Activity, 
  Building, 
  Settings, 
  Sliders, 
  ExternalLink, 
  X, 
  CheckCircle2, 
  Phone, 
  Clock, 
  MapPin,
  Image as ImgIcon,
  Layers,
  Sparkles,
  ArrowUp,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause
} from 'lucide-react';
import { useHospitalData } from '../../context/HospitalContext.jsx';
import { HospitalLogo } from '../HospitalLogo.jsx';

/**
 * Live 2-second auto-rotating reel preview inside Admin Panel
 */
const AdminReelLivePreview = ({ images = [], interval = 2000, title = 'Reel' }) => {
  const list = Array.isArray(images) && images.length > 0 ? images : [];
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    if (list.length <= 1) return;
    const intervalMs = Number(interval) || 2000;
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % list.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [list.length, interval]);

  if (list.length === 0) {
    return (
      <div className="w-full h-full min-h-[140px] flex flex-col items-center justify-center bg-black/60 text-slate-500 text-xs p-4 rounded-xl border border-white/5">
        <ImageIcon className="w-6 h-6 mb-1 opacity-40 text-slate-400" />
        <span>No photos added to reel yet</span>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full min-h-[140px] overflow-hidden bg-black rounded-xl border border-white/10 aspect-video">
      {list.map((imgUrl, idx) => (
        <img
          key={imgUrl + idx}
          src={imgUrl}
          alt={`${title} - ${idx + 1}`}
          referrerPolicy="no-referrer"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
            idx === currentIdx ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none z-20" />
      
      {/* Top Header Row with Reel Badge and Counter */}
      <div className="absolute top-2 left-2 right-2 z-30 flex items-center justify-between pointer-events-none">
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-950/85 backdrop-blur-md text-[10px] font-bold text-emerald-300 border border-emerald-500/40">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>{list.length} Photos &bull; 2s Reel</span>
        </span>
        <span className="text-[10px] text-white/90 bg-black/70 px-1.5 py-0.5 rounded border border-white/10 font-mono">
          {currentIdx + 1}/{list.length}
        </span>
      </div>

      {/* Bottom Progress Dashes */}
      {list.length > 1 && (
        <div className="absolute bottom-2 inset-x-2 z-30 flex items-center justify-center gap-1 pointer-events-none">
          {list.map((_, dotIdx) => (
            <span
              key={dotIdx}
              className={`h-1 rounded-full transition-all duration-300 ${
                dotIdx === currentIdx ? 'w-4 bg-sky-400 shadow-sm' : 'w-1 bg-white/40'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const AdminPanel = ({ onClose }) => {
  const {
    data,
    saveStatus,
    uploadImage,
    resetToDefaults,
    updateLogo,
    resetLogoToDefault,
    updateDoctor,
    updateService,
    addService,
    deleteService,
    updateFacility,
    addFacility,
    deleteFacility,
    addGalleryItem,
    updateGalleryItem,
    deleteGalleryItem,
    updateHeroSlide,
    addHeroSlide,
    deleteHeroSlide,
    reorderHeroSlides,
    moveHeroSlide,
    replaceHeroImage,
    resetHeroSlidesToDefaults,
    updateHospitalInfo,
  } = useHospitalData();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('masaraddi_admin_session_valid') === 'true';
  });
  const [pinInput, setPinInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Active Management Tab - defaults to logo branding for quick access
  const [activeTab, setActiveTab] = useState('logo');

  // Logo Management State
  const [logoPreview, setLogoPreview] = useState(null);
  const [logoFileBase64, setLogoFileBase64] = useState(null);
  const [selectedLogoFile, setSelectedLogoFile] = useState(null);
  const [logoAltInput, setLogoAltInput] = useState(() => data.branding?.logoAlt || 'Masaraddi Neuro Care Centre Official Seal');
  const [customLogoUrlInput, setCustomLogoUrlInput] = useState('');
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const [logoUploadError, setLogoUploadError] = useState('');

  // Notification Toast
  const [toast, setToast] = useState(null);
  const showToast = (text, type = 'success') => {
    setToast({ text, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Synchronize logo alt text if data updates from remote
  useEffect(() => {
    if (data.branding?.logoAlt && !logoPreview) {
      setLogoAltInput(data.branding.logoAlt);
    }
  }, [data.branding?.logoAlt, logoPreview]);

  // Logo File Selection Handler
  const handleLogoFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLogoUploadError('');
    setSelectedLogoFile(file);

    const validExtensions = ['.png', '.jpg', '.jpeg', '.webp', '.svg', '.ico'];
    const ext = '.' + file.name.split('.').pop().toLowerCase();
    
    if (!validExtensions.includes(ext) && !file.type.startsWith('image/')) {
      setLogoUploadError(`Invalid format (${ext || file.type}). Supported: PNG, SVG, WebP, JPG, ICO.`);
      return;
    }

    if (file.size > 12 * 1024 * 1024) {
      setLogoUploadError(`File too large (${(file.size / (1024 * 1024)).toFixed(1)}MB). Max allowed: 12MB.`);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setLogoPreview(reader.result);
      setLogoFileBase64(reader.result);
      setCustomLogoUrlInput('');
    };
    reader.onerror = () => {
      setLogoUploadError('Failed to read image file');
    };
    reader.readAsDataURL(file);
  };

  // Logo Save Handler
  const handleSaveLogo = async () => {
    setIsUploadingLogo(true);
    setLogoUploadError('');

    try {
      let finalUrl = '';
      if (selectedLogoFile || logoFileBase64) {
        // Upload via persistent backend API to /public/uploads/
        finalUrl = await uploadImage(selectedLogoFile || logoFileBase64, selectedLogoFile?.name || 'website_logo.png');
      } else if (customLogoUrlInput.trim()) {
        finalUrl = customLogoUrlInput.trim();
      } else if (logoAltInput !== data.branding?.logoAlt) {
        // Just updating alt text
        finalUrl = data.branding?.logoUrl || data.logo || '/logo.svg';
      } else {
        setLogoUploadError('Please select a logo file or enter an image URL.');
        setIsUploadingLogo(false);
        return;
      }

      if (!finalUrl) {
        throw new Error('Upload did not return a valid image URL');
      }

      updateLogo(finalUrl, logoAltInput.trim());
      setLogoPreview(null);
      setLogoFileBase64(null);
      setSelectedLogoFile(null);
      setCustomLogoUrlInput('');
      showToast('Website logo updated! Live across all pages & browser favicon.');
    } catch (err) {
      setLogoUploadError(err.message || 'Failed to update logo.');
    } finally {
      setIsUploadingLogo(false);
    }
  };

  // Logo Reset Handler
  const handleResetLogo = () => {
    if (window.confirm('Reset website logo to the official Masaraddi vector seal?')) {
      resetLogoToDefault();
      setLogoPreview(null);
      setLogoFileBase64(null);
      setSelectedLogoFile(null);
      setCustomLogoUrlInput('');
      setLogoUploadError('');
      showToast('Reset to official Masaraddi vector seal');
    }
  };

  // Auth Handler
  const handleLogin = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setIsLoggingIn(true);
    setAuthError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: pinInput }),
      });

      const cleanPin = (pinInput || '').trim().toLowerCase();
      // Allow API success or local fallback for demo credentials
      if (res.ok || cleanPin === '1234' || cleanPin === 'admin' || cleanPin === 'masaraddi') {
        setIsAuthenticated(true);
        sessionStorage.setItem('masaraddi_admin_session_valid', 'true');
        showToast('Logged in successfully');
      } else {
        setAuthError('Invalid PIN. Use default PIN: 1234');
      }
    } catch (err) {
      // Local fallback
      const cleanPin = (pinInput || '').trim().toLowerCase();
      if (cleanPin === '1234' || cleanPin === 'admin' || cleanPin === 'masaraddi') {
        setIsAuthenticated(true);
        sessionStorage.setItem('masaraddi_admin_session_valid', 'true');
        showToast('Logged in successfully (offline)');
      } else {
        setAuthError('Invalid PIN. Use default PIN: 1234');
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('masaraddi_admin_session_valid');
    setPinInput('');
  };

  // ==========================================
  // TAB: HERO SLIDESHOW STATE & HANDLERS
  // ==========================================
  const [heroPreviewIndex, setHeroPreviewIndex] = useState(0);
  const [heroPreviewDevice, setHeroPreviewDevice] = useState('desktop'); // 'desktop', 'tablet', 'mobile'
  const [isHeroAutoPlaying, setIsHeroAutoPlaying] = useState(true);
  const [editingHeroSlide, setEditingHeroSlide] = useState(null); // slide id or null
  const [heroEditForm, setHeroEditForm] = useState({
    title: '',
    caption: '',
    tag: '',
    altText: '',
    url: '',
    objectPosition: 'center 40%',
  });
  const [isAddingHeroSlide, setIsAddingHeroSlide] = useState(false);
  const [newHeroSlideForm, setNewHeroSlideForm] = useState({
    title: '',
    caption: '',
    tag: 'Hospital Premises',
    altText: '',
    url: '',
    objectPosition: 'center 40%',
  });
  const [replacingHeroSlideId, setReplacingHeroSlideId] = useState(null);
  const [isUploadingHeroImage, setIsUploadingHeroImage] = useState(false);
  const heroFileInputRef = useRef(null);
  const replaceHeroFileInputRef = useRef(null);

  // Curated Ultra-HD Medical & Verified Hospital Photography Presets
  const ultraHDPresets = [
    {
      id: 'preset-hospital-ext',
      tag: 'Hospital Premises',
      title: 'Clinical Neurological Healthcare Center',
      caption: 'Specialized center for comprehensive brain, spine, and nerve disorders in Bagalkot',
      url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=85&w=2560&auto=format&fit=crop',
      altText: 'Masaraddi Neuro Care Center modern hospital premises in Bagalkot',
      objectPosition: 'center 40%',
    },
    {
      id: 'preset-doctor-chamber',
      tag: 'Consultant Neurologist',
      title: 'Dr. Shivkumar Masaraddi — DM Neurology',
      caption: 'Consultant Neurologist with 12+ years of clinical experience providing specialized care for stroke, epilepsy, and neurological disorders',
      url: '/uploads/1792874313807-Screenshot_2026-10-10_013409.png',
      altText: 'Dr. Shivkumar Masaraddi at his consultation desk in Masaraddi Neuro Care Center',
      objectPosition: 'center 25%',
    },
    {
      id: 'preset-icu-beds',
      tag: '7 ICU Facilities',
      title: '7 ICU & Inpatient Care Beds',
      caption: 'Equipped 7-bed intensive care unit with continuous patient vital monitoring',
      url: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=85&w=2560&auto=format&fit=crop',
      altText: 'ICU patient care beds and clinical monitoring setup',
      objectPosition: 'center 45%',
    },
    {
      id: 'preset-diagnostics-neuro',
      tag: 'Neurological Diagnostics',
      title: 'Advanced Neurological Evaluation & Imaging',
      caption: 'Diagnostic laboratory, digital X-Ray, and neurological assessment protocols',
      url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=85&w=2560&auto=format&fit=crop',
      altText: 'Diagnostic laboratory and neurological investigation facility',
      objectPosition: 'center 40%',
    },
    {
      id: 'preset-inpatient-ward',
      tag: 'Inpatient Care',
      title: 'Inpatient Observation & Recovery',
      caption: 'Sterile patient accommodations with dedicated nursing supervision',
      url: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?q=85&w=2560&auto=format&fit=crop',
      altText: 'Inpatient observation room and patient care',
      objectPosition: 'center 50%',
    },
    {
      id: 'preset-reception-desk',
      tag: 'Patient Helpdesk',
      title: 'Hospital Reception & Patient Desk',
      caption: 'Patient assistance desk located at Godi Layout, near Rotary Circle, beside Kailash- In Hotel',
      url: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?q=85&w=2560&auto=format&fit=crop',
      altText: 'Hospital reception and patient service desk',
      objectPosition: 'center 40%',
    },
  ];

  // Auto-cycle live hero preview in admin if playing
  useEffect(() => {
    if (!isHeroAutoPlaying) return;
    const slides = data.heroSlides || [];
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      setHeroPreviewIndex((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isHeroAutoPlaying, (data.heroSlides || []).length]);

  const handleStartEditHeroSlide = (slide) => {
    setEditingHeroSlide(slide.id);
    setHeroEditForm({
      title: slide.title || '',
      caption: slide.caption || '',
      tag: slide.tag || 'Clinical Facility',
      altText: slide.altText || '',
      url: slide.url || '',
      objectPosition: slide.objectPosition || 'center 40%',
    });
  };

  const handleSaveHeroSlideEdit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!editingHeroSlide) return;
    if (!heroEditForm.url.trim()) {
      showToast('Image URL cannot be empty', 'error');
      return;
    }
    updateHeroSlide(editingHeroSlide, heroEditForm);
    setEditingHeroSlide(null);
    showToast('Hero slide updated & live on homepage!');
  };

  const handleDeleteHeroSlide = (id) => {
    const list = data.heroSlides || [];
    if (list.length <= 1) {
      showToast('Cannot delete the only remaining hero slide', 'error');
      return;
    }
    if (window.confirm('Are you sure you want to remove this image from the hero slideshow?')) {
      deleteHeroSlide(id);
      setHeroPreviewIndex(0);
      showToast('Slide removed from hero banner');
    }
  };

  const handleMoveHeroSlide = (index, direction) => {
    moveHeroSlide(index, direction);
    const target = direction === 'up' ? Math.max(0, index - 1) : Math.min((data.heroSlides || []).length - 1, index + 1);
    setHeroPreviewIndex(target);
    showToast(`Slide moved ${direction === 'up' ? 'earlier (# ' + (target + 1) + ')' : 'later (# ' + (target + 1) + ')'}`);
  };

  const handleStartReplaceImage = (slideId) => {
    setReplacingHeroSlideId(slideId);
    if (replaceHeroFileInputRef.current) {
      replaceHeroFileInputRef.current.value = '';
      replaceHeroFileInputRef.current.click();
    }
  };

  const handleReplaceHeroImageFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !replacingHeroSlideId) return;

    try {
      setIsUploadingHeroImage(true);
      const url = await uploadImage(file, `hero_${Date.now()}_${file.name}`);
      replaceHeroImage(replacingHeroSlideId, url);
      showToast('Hero image replaced & updated live on website!');
    } catch (err) {
      showToast(err.message || 'Image replacement failed', 'error');
    } finally {
      setIsUploadingHeroImage(false);
      setReplacingHeroSlideId(null);
      if (e.target) e.target.value = '';
    }
  };

  const handleUploadNewHeroImageFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploadingHeroImage(true);
      const url = await uploadImage(file, `hero_${Date.now()}_${file.name}`);
      setNewHeroSlideForm((prev) => ({
        ...prev,
        url,
        altText: prev.altText || file.name.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' '),
      }));
      showToast('Image uploaded! Review details and click Add Slide.');
    } catch (err) {
      showToast(err.message || 'Upload failed', 'error');
    } finally {
      setIsUploadingHeroImage(false);
      if (e.target) e.target.value = '';
    }
  };

  const handleAddNewHeroSlide = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!newHeroSlideForm.url.trim()) {
      showToast('Please upload an image or provide an image URL', 'error');
      return;
    }
    addHeroSlide(newHeroSlideForm);
    setNewHeroSlideForm({
      title: '',
      caption: '',
      tag: 'Hospital Premises',
      altText: '',
      url: '',
      objectPosition: 'center 40%',
    });
    setIsAddingHeroSlide(false);
    showToast('New ultra-HD slide added to hero section!');
  };

  const handleApplyPreset = (preset) => {
    const { id: _ignore, ...presetData } = preset || {};
    addHeroSlide(presetData);
    showToast(`Added "${preset.tag}" preset to hero slides!`);
  };

  const handleRestoreAllUltraHDPresets = () => {
    if (window.confirm('Restore all hero slides to the verified ultra-HD photography set?')) {
      const freshSlides = ultraHDPresets.map((preset, idx) => {
        const { id: _ignore, ...presetData } = preset;
        return {
          ...presetData,
          id: `hero-preset-${Date.now()}-${idx}-${Math.random().toString(36).slice(2, 6)}`,
        };
      });
      reorderHeroSlides(freshSlides);
      setHeroPreviewIndex(0);
      showToast('Hero section updated with ultra-HD curated imagery!');
    }
  };

  // ==========================================
  // TAB 1: DOCTOR PROFILE STATE & HANDLERS
  // ==========================================
  const currentDoctor = data.doctors[0] || {
    id: 'dr-shivkumar-masaraddi',
    name: 'Dr. Shivkumar Masaraddi',
    specialization: 'Neurology',
    qualificationsSummary: 'MBBS, MD (General Medicine), DM (Neurology)',
    qualificationsList: [],
    experience: '12+ Years of Experience',
    timings: '10:00 AM – 4:00 PM & 6:00 PM – 8:00 PM',
    bio: '',
    image: '',
  };

  const [doctorForm, setDoctorForm] = useState({
    name: currentDoctor.name,
    specialization: currentDoctor.specialization,
    qualificationsSummary: currentDoctor.qualificationsSummary,
    experience: currentDoctor.experience,
    timings: currentDoctor.timings,
    bio: currentDoctor.bio,
    image: currentDoctor.image,
    qualificationsRaw: (currentDoctor.qualificationsList || []).join('\n'),
  });

  const [isUploadingDoctorPhoto, setIsUploadingDoctorPhoto] = useState(false);
  const doctorFileRef = useRef(null);

  const handleDoctorPhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploadingDoctorPhoto(true);
      const url = await uploadImage(file);
      setDoctorForm((prev) => ({ ...prev, image: url }));
      // Immediately update doctor in context and persist
      updateDoctor(currentDoctor.id, { image: url });
      showToast('Doctor portrait uploaded and updated on public site!');
    } catch (err) {
      showToast(err.message || 'Image upload failed', 'error');
    } finally {
      setIsUploadingDoctorPhoto(false);
    }
  };

  const handleSaveDoctor = (e) => {
    e.preventDefault();
    const qList = doctorForm.qualificationsRaw
      .split('\n')
      .map((q) => q.trim())
      .filter(Boolean);

    updateDoctor(currentDoctor.id, {
      name: doctorForm.name,
      specialization: doctorForm.specialization,
      qualificationsSummary: doctorForm.qualificationsSummary,
      experience: doctorForm.experience,
      timings: doctorForm.timings,
      bio: doctorForm.bio,
      image: doctorForm.image,
      qualificationsList: qList,
    });
    showToast('Doctor profile changes saved!');
  };

  // ==========================================
  // TAB 2: GALLERY PHOTOS STATE & HANDLERS (MULTI-PHOTO 2S REEL)
  // ==========================================
  const [editingPhoto, setEditingPhoto] = useState(null);
  const [newPhotoForm, setNewPhotoForm] = useState({
    title: '',
    category: 'consultation',
    categoryLabel: 'Doctor Consultation',
    caption: '',
    image: '',
    images: [],
    interval: 2000,
  });
  const [isAddingPhoto, setIsAddingPhoto] = useState(false);
  const [isUploadingGalleryPhoto, setIsUploadingGalleryPhoto] = useState(false);
  const [uploadProgressText, setUploadProgressText] = useState('');
  const [reelUrlInput, setReelUrlInput] = useState('');
  const galleryFileRef = useRef(null);
  const editGalleryFileRef = useRef(null);

  const handleGalleryPhotoUpload = async (e, isEdit = false) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    try {
      setIsUploadingGalleryPhoto(true);
      setUploadProgressText(`Uploading ${files.length} photo(s)...`);
      const uploadedUrls = [];
      for (let i = 0; i < files.length; i++) {
        setUploadProgressText(`Uploading photo ${i + 1} of ${files.length}...`);
        const url = await uploadImage(files[i]);
        uploadedUrls.push(url);
      }

      if (isEdit && editingPhoto) {
        setEditingPhoto((prev) => {
          const prevImages = Array.isArray(prev.images) && prev.images.length > 0
            ? prev.images
            : (prev.image ? [prev.image] : []);
          const combined = [...prevImages, ...uploadedUrls];
          return {
            ...prev,
            image: combined[0] || prev.image,
            images: combined,
          };
        });
      } else {
        setNewPhotoForm((prev) => {
          const prevImages = Array.isArray(prev.images) && prev.images.length > 0
            ? prev.images
            : (prev.image ? [prev.image] : []);
          const combined = [...prevImages, ...uploadedUrls];
          return {
            ...prev,
            image: combined[0] || prev.image,
            images: combined,
          };
        });
      }
      showToast(`${uploadedUrls.length} photo(s) added to the 2-second changing reel!`);
    } catch (err) {
      showToast(err.message || 'Photo upload failed', 'error');
    } finally {
      setIsUploadingGalleryPhoto(false);
      setUploadProgressText('');
      if (e.target) e.target.value = '';
    }
  };

  const handleAddUrlToReel = (isEdit = false) => {
    const url = reelUrlInput.trim();
    if (!url) {
      showToast('Please enter an image URL', 'error');
      return;
    }

    if (isEdit && editingPhoto) {
      setEditingPhoto((prev) => {
        const prevImages = Array.isArray(prev.images) && prev.images.length > 0
          ? prev.images
          : (prev.image ? [prev.image] : []);
        const combined = [...prevImages, url];
        return {
          ...prev,
          image: combined[0] || url,
          images: combined,
        };
      });
    } else {
      setNewPhotoForm((prev) => {
        const prevImages = Array.isArray(prev.images) && prev.images.length > 0
          ? prev.images
          : (prev.image ? [prev.image] : []);
        const combined = [...prevImages, url];
        return {
          ...prev,
          image: combined[0] || url,
          images: combined,
        };
      });
    }
    setReelUrlInput('');
    showToast('Photo added to reel!');
  };

  const handleRemovePhotoFromReel = (indexToRemove, isEdit = false) => {
    if (isEdit && editingPhoto) {
      setEditingPhoto((prev) => {
        const list = Array.isArray(prev.images) && prev.images.length > 0 ? prev.images : [prev.image];
        const filtered = list.filter((_, i) => i !== indexToRemove);
        return {
          ...prev,
          image: filtered[0] || '',
          images: filtered,
        };
      });
    } else {
      setNewPhotoForm((prev) => {
        const list = Array.isArray(prev.images) && prev.images.length > 0 ? prev.images : (prev.image ? [prev.image] : []);
        const filtered = list.filter((_, i) => i !== indexToRemove);
        return {
          ...prev,
          image: filtered[0] || '',
          images: filtered,
        };
      });
    }
  };

  const handleMovePhoto = (fromIndex, toIndex, isEdit = false) => {
    if (isEdit && editingPhoto) {
      setEditingPhoto((prev) => {
        const list = [...(Array.isArray(prev.images) && prev.images.length > 0 ? prev.images : [prev.image])];
        if (toIndex < 0 || toIndex >= list.length) return prev;
        const [moved] = list.splice(fromIndex, 1);
        list.splice(toIndex, 0, moved);
        return {
          ...prev,
          image: list[0] || prev.image,
          images: list,
        };
      });
    } else {
      setNewPhotoForm((prev) => {
        const list = [...(Array.isArray(prev.images) ? prev.images : [])];
        if (toIndex < 0 || toIndex >= list.length) return prev;
        const [moved] = list.splice(fromIndex, 1);
        list.splice(toIndex, 0, moved);
        return {
          ...prev,
          image: list[0] || prev.image,
          images: list,
        };
      });
    }
  };

  const handleCreatePhoto = (e) => {
    e.preventDefault();
    const allImages = Array.isArray(newPhotoForm.images) && newPhotoForm.images.length > 0
      ? newPhotoForm.images
      : (newPhotoForm.image ? [newPhotoForm.image] : []);

    if (!newPhotoForm.title || allImages.length === 0) {
      showToast('Please provide a title and at least one photo image for the reel', 'error');
      return;
    }

    const categoryLabels = {
      consultation: 'Doctor Consultation',
      patient_care: 'ICU & Inpatient',
      facilities: 'Facilities',
      diagnostics: 'Diagnostics',
      exterior: 'Premises',
    };

    addGalleryItem({
      ...newPhotoForm,
      image: allImages[0],
      images: allImages,
      interval: Number(newPhotoForm.interval) || 2000,
      categoryLabel: categoryLabels[newPhotoForm.category] || 'Facilities',
      altText: newPhotoForm.title,
    });

    setNewPhotoForm({
      title: '',
      category: 'consultation',
      categoryLabel: 'Doctor Consultation',
      caption: '',
      image: '',
      images: [],
      interval: 2000,
    });
    setReelUrlInput('');
    setIsAddingPhoto(false);
    showToast('New multi-photo reel added to public gallery!');
  };

  const handleSavePhotoEdit = (e) => {
    e.preventDefault();
    if (!editingPhoto) return;

    const allImages = Array.isArray(editingPhoto.images) && editingPhoto.images.length > 0
      ? editingPhoto.images
      : (editingPhoto.image ? [editingPhoto.image] : []);

    if (allImages.length === 0) {
      showToast('Please keep at least one image in the gallery reel', 'error');
      return;
    }

    const updatedCard = {
      ...editingPhoto,
      image: allImages[0],
      images: allImages,
      interval: Number(editingPhoto.interval) || 2000,
    };

    updateGalleryItem(editingPhoto.id, updatedCard);
    setEditingPhoto(null);
    setReelUrlInput('');
    showToast('Gallery reel updated with multi-photo 2s settings!');
  };

  // ==========================================
  // TAB 3: SERVICES STATE & HANDLERS
  // ==========================================
  const [editingService, setEditingService] = useState(null);
  const [isAddingService, setIsAddingService] = useState(false);
  const [newServiceForm, setNewServiceForm] = useState({
    name: '',
    category: 'Neurology Consultations',
    shortDescription: '',
    detailedDescription: '',
    whatWeOfferRaw: '',
    commonSymptomsRaw: '',
    icon: 'Brain',
  });

  const handleCreateService = (e) => {
    e.preventDefault();
    if (!newServiceForm.name) {
      showToast('Service name is required', 'error');
      return;
    }

    addService({
      name: newServiceForm.name,
      category: newServiceForm.category,
      shortDescription: newServiceForm.shortDescription,
      detailedDescription: newServiceForm.detailedDescription,
      whatWeOffer: newServiceForm.whatWeOfferRaw.split('\n').map((s) => s.trim()).filter(Boolean),
      commonSymptoms: newServiceForm.commonSymptomsRaw.split('\n').map((s) => s.trim()).filter(Boolean),
      icon: newServiceForm.icon,
      isPrimaryConfirmed: true,
    });

    setNewServiceForm({
      name: '',
      category: 'Neurology Consultations',
      shortDescription: '',
      detailedDescription: '',
      whatWeOfferRaw: '',
      commonSymptomsRaw: '',
      icon: 'Brain',
    });
    setIsAddingService(false);
    showToast('New service published to public website!');
  };

  const handleSaveServiceEdit = (e) => {
    e.preventDefault();
    if (!editingService) return;

    updateService(editingService.id, {
      ...editingService,
      whatWeOffer: Array.isArray(editingService.whatWeOffer)
        ? editingService.whatWeOffer
        : (editingService.whatWeOfferRaw || '').split('\n').map((s) => s.trim()).filter(Boolean),
      commonSymptoms: Array.isArray(editingService.commonSymptoms)
        ? editingService.commonSymptoms
        : (editingService.commonSymptomsRaw || '').split('\n').map((s) => s.trim()).filter(Boolean),
    });
    setEditingService(null);
    showToast('Service updated on public website!');
  };

  // ==========================================
  // TAB 4: FACILITIES STATE & HANDLERS
  // ==========================================
  const [editingFacility, setEditingFacility] = useState(null);
  const [isAddingFacility, setIsAddingFacility] = useState(false);
  const [newFacilityForm, setNewFacilityForm] = useState({
    title: '',
    shortTitle: '',
    category: 'Patient Care',
    description: '',
    featuresRaw: '',
    image: '',
    icon: 'Building',
  });

  const handleFacilityImageUpload = async (e, isEdit = false) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const url = await uploadImage(file);
      if (isEdit && editingFacility) {
        setEditingFacility((prev) => ({ ...prev, image: url }));
      } else {
        setNewFacilityForm((prev) => ({ ...prev, image: url }));
      }
      showToast('Facility photo uploaded!');
    } catch (err) {
      showToast(err.message || 'Image upload failed', 'error');
    }
  };

  const handleCreateFacility = (e) => {
    e.preventDefault();
    if (!newFacilityForm.title) {
      showToast('Facility title is required', 'error');
      return;
    }

    addFacility({
      title: newFacilityForm.title,
      shortTitle: newFacilityForm.shortTitle || newFacilityForm.title,
      category: newFacilityForm.category,
      description: newFacilityForm.description,
      features: newFacilityForm.featuresRaw.split('\n').map((f) => f.trim()).filter(Boolean),
      image: newFacilityForm.image || currentDoctor.image,
      icon: newFacilityForm.icon,
      altText: newFacilityForm.title,
    });

    setNewFacilityForm({
      title: '',
      shortTitle: '',
      category: 'Patient Care',
      description: '',
      featuresRaw: '',
      image: '',
      icon: 'Building',
    });
    setIsAddingFacility(false);
    showToast('New facility added to public website!');
  };

  const handleSaveFacilityEdit = (e) => {
    e.preventDefault();
    if (!editingFacility) return;

    updateFacility(editingFacility.id, {
      ...editingFacility,
      features: Array.isArray(editingFacility.features)
        ? editingFacility.features
        : (editingFacility.featuresRaw || '').split('\n').map((f) => f.trim()).filter(Boolean),
    });
    setEditingFacility(null);
    showToast('Facility details updated on public website!');
  };

  // ==========================================
  // TAB 5: HOSPITAL CONTACT & TIMINGS FORM
  // ==========================================
  const [hospitalForm, setHospitalForm] = useState({
    hospitalName: data.hospitalName,
    tagline: data.tagline,
    headline: data.headline,
    supportingText: data.supportingText,
    phone: data.contact.phone,
    phoneDisplay: data.contact.phoneDisplay,
    alternatePhone: data.contact.alternatePhone || '',
    alternatePhoneDisplay: data.contact.alternatePhoneDisplay || '',
    whatsappNumber: data.contact.whatsappNumber,
    whatsappDisplay: data.contact.whatsappDisplay,
    email: data.contact.email,
    street: data.contact.address.street,
    city: data.contact.address.city,
    state: data.contact.address.state,
    landmark: data.contact.address.landmark,
    opdSlot1: data.contact.timings.opdSlot1,
    opdSlot2: data.contact.timings.opdSlot2,
    emergency: data.contact.timings.emergency,
    googleMapsDirectionsUrl: data.contact.googleMapsDirectionsUrl || "https://share.google/kY37dzPJA6qIplc1D",
  });

  const handleSaveHospitalInfo = (e) => {
    e.preventDefault();
    updateHospitalInfo({
      hospitalName: hospitalForm.hospitalName,
      tagline: hospitalForm.tagline,
      headline: hospitalForm.headline,
      supportingText: hospitalForm.supportingText,
      contact: {
        phone: hospitalForm.phone,
        phoneDisplay: hospitalForm.phoneDisplay,
        alternatePhone: hospitalForm.alternatePhone,
        alternatePhoneDisplay: hospitalForm.alternatePhoneDisplay,
        whatsappNumber: hospitalForm.whatsappNumber,
        whatsappDisplay: hospitalForm.whatsappDisplay,
        email: hospitalForm.email,
        googleMapsDirectionsUrl: hospitalForm.googleMapsDirectionsUrl || "https://share.google/kY37dzPJA6qIplc1D",
        googleMapsEmbedUrl: `https://maps.google.com/maps?q=${encodeURIComponent(`${hospitalForm.hospitalName}, ${hospitalForm.street}, ${hospitalForm.city}, ${hospitalForm.state} 587101`)}&t=&z=16&ie=UTF8&iwloc=&output=embed`,
        address: {
          street: hospitalForm.street,
          city: hospitalForm.city,
          state: hospitalForm.state,
          postalCode: '587101',
          landmark: hospitalForm.landmark,
          country: 'India',
          full: `${hospitalForm.hospitalName}, ${hospitalForm.street}, ${hospitalForm.city}, ${hospitalForm.state} 587101`,
        },
        timings: {
          opd: `${hospitalForm.opdSlot1} & ${hospitalForm.opdSlot2}`,
          opdSlot1: hospitalForm.opdSlot1,
          opdSlot2: hospitalForm.opdSlot2,
          emergency: hospitalForm.emergency,
        },
      },
    });
    showToast('Hospital information & timings updated!');
  };

  // ==========================================
  // LOGIN SCREEN (If not authenticated)
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#080E1A]/95 backdrop-blur-xl">
        <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 text-center space-y-6 animate-in fade-in zoom-in-95 duration-200">
          <div className="relative w-20 h-20 mx-auto">
            <HospitalLogo className="w-20 h-20 drop-shadow-md" priority={true} />
            <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-slate-900 border-2 border-white text-white flex items-center justify-center shadow-md">
              <Lock className="w-3.5 h-3.5 text-sky-400" />
            </div>
          </div>

          <div>
            <span className="text-xs font-bold text-sky-600 tracking-wider uppercase">Staff &amp; Doctor Portal</span>
            <h2 className="text-2xl font-extrabold text-[#0B132B] font-outfit mt-1">
              Masaraddi Admin Access
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Manage doctor credentials, upload photos, and update clinic timings.
            </p>
          </div>

          {authError && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="text-left space-y-1">
              <label className="text-xs font-bold text-slate-700">Access PIN or Password</label>
              <input
                type="password"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Enter PIN (Default: 1234)"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm font-semibold"
                autoFocus
              />
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-sm shadow-md shadow-sky-600/30 transition-all cursor-pointer active:scale-95"
            >
              {isLoggingIn ? 'Verifying...' : 'Sign In to Admin Panel'}
            </button>

            <button
              type="button"
              onClick={() => {
                setPinInput('1234');
                setIsAuthenticated(true);
                sessionStorage.setItem('masaraddi_admin_session_valid', 'true');
                showToast('Logged in with demo access');
              }}
              className="w-full py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
            >
              One-Click Quick Login (PIN: 1234)
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-2 text-xs text-slate-500 hover:text-slate-800 font-medium cursor-pointer"
            >
              Cancel &amp; Return to Website
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ==========================================
  // FULLSCREEN ADMIN DASHBOARD
  // ==========================================
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#0B132B] text-slate-100 overflow-hidden font-sans">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs font-bold animate-in slide-in-from-top-4 duration-300 ${
          toast.type === 'error'
            ? 'bg-rose-600 text-white border border-rose-400'
            : 'bg-emerald-600 text-white border border-emerald-400'
        }`}>
          {toast.type === 'error' ? <AlertCircle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
          <span>{toast.text}</span>
        </div>
      )}

      {/* Saving status banner */}
      {saveStatus && (
        <div className="bg-sky-600 text-white text-xs font-semibold py-1.5 px-4 text-center flex items-center justify-center gap-2">
          {saveStatus.type === 'saving' && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
          <span>{saveStatus.message}</span>
        </div>
      )}

      {/* Top Header Bar */}
      <header className="bg-[#080E1A] border-b border-white/10 px-4 sm:px-6 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
            title="Return to public website"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <HospitalLogo className="w-9 h-9 shrink-0 drop-shadow-sm" />

          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-white text-base sm:text-lg font-outfit uppercase tracking-tight">
                Masaraddi Admin Panel
              </span>
              <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                Live Sync Active
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Updates saved here automatically persist to the backend &amp; live frontend.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onClose}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-sky-500/15 hover:bg-sky-500/25 text-sky-300 hover:text-white border border-sky-500/30 text-xs font-bold transition-all cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Live Website</span>
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="p-2 sm:px-3 sm:py-2 rounded-xl bg-white/5 hover:bg-rose-500/20 text-slate-400 hover:text-rose-300 border border-white/10 text-xs font-semibold transition-colors cursor-pointer"
            title="Log out of admin"
          >
            <span>Log out</span>
          </button>
        </div>
      </header>

      {/* Responsive Navigation Tabs */}
      <div className="bg-[#080E1A]/60 border-b border-white/10 px-4 sm:px-6 py-2 overflow-x-auto no-scrollbar flex items-center gap-2 shrink-0">
        {[
          { id: 'logo', label: 'Website Logo & Branding', icon: Sparkles },
          { id: 'hero', label: `Hero Slides (${(data.heroSlides || []).length})`, icon: Layers },
          { id: 'doctor', label: 'Doctor Profile & Photo', icon: UserCheck },
          { id: 'gallery', label: `Gallery Photos (${(data.gallery || []).length})`, icon: ImageIcon },
          { id: 'services', label: `Services (${(data.services || []).length})`, icon: Activity },
          { id: 'facilities', label: `Facilities (${(data.facilities || []).length})`, icon: Building },
          { id: 'hospital', label: 'Hospital Info & Timings', icon: Settings },
          { id: 'danger', label: 'Settings & Reset', icon: Sliders },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                isActive
                  ? 'bg-sky-500 text-white shadow-md shadow-sky-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Admin Scrollable Workspace */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 max-w-6xl w-full mx-auto space-y-8">
        
        {/* ========================================================= */}
        {/* TAB 0: WEBSITE LOGO & BRANDING MANAGEMENT                 */}
        {/* ========================================================= */}
        {activeTab === 'logo' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="bg-slate-900/80 rounded-3xl p-6 sm:p-8 border border-white/10 shadow-xl space-y-6">
              
              {/* Top Title & Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-white font-outfit">Website Logo &amp; Global Branding</h3>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                      Live Sync Active
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
                    Upload or change the hospital logo. The new logo updates automatically across every location on the website (navigation bar, mobile drawer, hero trust badge, footer, login dialog, admin header, and browser tab favicon).
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={handleResetLogo}
                    className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
                    title="Restore default official vector seal"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Reset to Official Seal</span>
                  </button>
                </div>
              </div>

              {/* Multi-Context Live Preview Mockups */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5" />
                    <span>Real-Time Multi-Context Preview</span>
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {logoPreview ? (
                      <span className="text-amber-300 font-medium">Previewing unsaved upload</span>
                    ) : (
                      <span className="text-emerald-400 font-medium">Currently live on website</span>
                    )}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  
                  {/* Context 1: Browser Tab / Favicon Mockup */}
                  <div className="bg-[#080E1A] p-4 rounded-2xl border border-white/10 space-y-2.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      1. Browser Tab &amp; Favicon
                    </span>
                    <div className="bg-[#1E293B] rounded-xl p-2.5 border border-white/5 flex items-center gap-2 shadow-inner">
                      <HospitalLogo 
                        src={logoPreview} 
                        className="w-5 h-5 shrink-0" 
                      />
                      <div className="truncate text-left flex-1 min-w-0">
                        <span className="text-[11px] font-semibold text-slate-200 block truncate">
                          {data.hospitalName}
                        </span>
                        <span className="text-[9px] text-slate-400 block truncate">
                          Neurologist in Bagalkot
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-500 hover:text-slate-300 px-1">✕</span>
                    </div>
                    <p className="text-[10px] text-slate-400 leading-tight">
                      Dynamically updates the browser tab icon via <code>&lt;link rel="icon"&gt;</code>.
                    </p>
                  </div>

                  {/* Context 2: Dark Sticky Navbar Header */}
                  <div className="bg-[#080E1A] p-4 rounded-2xl border border-white/10 space-y-2.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      2. Navigation Header (Dark)
                    </span>
                    <div className="bg-[#080E1A]/95 p-2.5 rounded-xl border border-white/10 flex items-center gap-2.5 shadow-md">
                      <HospitalLogo 
                        src={logoPreview} 
                        className="w-10 h-10 shrink-0 drop-shadow-md" 
                      />
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1.5">
                          <span className="font-extrabold text-white text-xs uppercase font-outfit">
                            Masaraddi
                          </span>
                          <span className="text-[9px] font-bold uppercase px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-300 border border-rose-400/30">
                            Neuro Care
                          </span>
                        </div>
                        <span className="text-[9px] text-slate-400">Bagalkot</span>
                      </div>
                    </div>
                    <p className="text-[10px] text-slate-400 leading-tight">
                      Sticky navigation header at the top of desktop and tablet screens.
                    </p>
                  </div>

                  {/* Context 3: Clean White Document / Prescription / Print */}
                  <div className="bg-[#080E1A] p-4 rounded-2xl border border-white/10 space-y-2.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      3. Clinical Light Card &amp; Print
                    </span>
                    <div className="bg-white p-3 rounded-xl border border-slate-200 flex items-center gap-2.5 shadow-sm">
                      <HospitalLogo 
                        src={logoPreview} 
                        className="w-10 h-10 shrink-0 drop-shadow-sm" 
                      />
                      <div className="flex flex-col">
                        <span className="font-bold text-[#0B132B] text-xs font-outfit">
                          Masaraddi Neuro Care
                        </span>
                        <span className="text-[9px] text-slate-500">
                          Dr. Shivkumar Masaraddi
                        </span>
                      </div>
                    </div>
                    <p className="text-[10px] text-slate-400 leading-tight">
                      Tested on pure white background for medical forms and clean readability.
                    </p>
                  </div>

                  {/* Context 4: Mobile Drawer Header */}
                  <div className="bg-[#080E1A] p-4 rounded-2xl border border-white/10 space-y-2.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      4. Mobile Menu Drawer
                    </span>
                    <div className="bg-[#0B132B] p-2.5 rounded-xl border border-white/10 flex items-center justify-between shadow-md">
                      <div className="flex items-center gap-2">
                        <HospitalLogo 
                          src={logoPreview} 
                          className="w-7 h-7 shrink-0" 
                        />
                        <span className="text-[11px] font-bold text-white">Menu Drawer</span>
                      </div>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    </div>
                    <p className="text-[10px] text-slate-400 leading-tight">
                      Renders inside the mobile sliding drawer and touch navigation bar.
                    </p>
                  </div>

                </div>
              </div>

              {/* Upload & Logo Form Section */}
              <div className="bg-black/30 rounded-2xl p-6 border border-white/5 space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Upload className="w-4 h-4 text-sky-400" />
                    <span>Upload New Logo File</span>
                  </span>
                  <span className="text-xs text-slate-400">
                    Supports PNG, SVG, WebP, JPG, ICO (Max 10MB)
                  </span>
                </div>

                {logoUploadError && (
                  <div className="p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-semibold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                    <span>{logoUploadError}</span>
                  </div>
                )}

                {/* Dropzone File Input */}
                <div className={`relative border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center transition-all group cursor-pointer ${
                  logoPreview
                    ? 'border-emerald-500/50 bg-emerald-500/[0.05]'
                    : 'border-white/20 hover:border-sky-500/60 bg-white/[0.02] hover:bg-sky-500/[0.03]'
                }`}>
                  <input
                    type="file"
                    accept=".png,.svg,.webp,.jpg,.jpeg,.ico,image/png,image/svg+xml,image/webp,image/jpeg,image/x-icon"
                    onClick={(e) => { e.target.value = null; }}
                    onChange={handleLogoFileSelect}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    title="Click or drag an image to upload as website logo"
                  />
                  
                  {logoPreview ? (
                    <div className="flex flex-col items-center justify-center space-y-3 pointer-events-none">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-2xl bg-[#080E1A] p-2 border border-emerald-500/40 flex items-center justify-center shadow-lg">
                          <img
                            src={logoPreview}
                            alt="Selected Logo Preview"
                            className="w-full h-full object-contain rounded-xl"
                          />
                        </div>
                        <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold shadow-md">
                          ✓
                        </span>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-sm font-bold text-emerald-300 block">
                          {selectedLogoFile ? selectedLogoFile.name : 'Image loaded successfully'}
                        </span>
                        <span className="text-xs text-slate-400 block">
                          {selectedLogoFile
                            ? `${(selectedLogoFile.size / 1024).toFixed(1)} KB — Ready to publish globally`
                            : 'Ready to publish globally'}
                        </span>
                      </div>
                      <span className="text-[11px] text-sky-400 font-semibold underline underline-offset-2">
                        Click or drag another file to replace
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center space-y-2 pointer-events-none">
                      <div className="w-12 h-12 rounded-2xl bg-sky-500/15 border border-sky-500/30 text-sky-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Upload className="w-6 h-6" />
                      </div>
                      <span className="text-sm font-bold text-white">
                        Click to choose or drag &amp; drop an image file here
                      </span>
                      <span className="text-xs text-slate-400">
                        Supports transparent PNG, SVG vector, modern WebP, JPG, or ICO formats (Max 12MB)
                      </span>
                    </div>
                  )}
                </div>

                {/* Alternative URL & Alt Text Controls */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1.5 text-left">
                    <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                      <span>Or Provide Direct Logo URL (CDN / Hosted):</span>
                    </label>
                    <input
                      type="text"
                      value={customLogoUrlInput}
                      onChange={(e) => {
                        const val = e.target.value;
                        setCustomLogoUrlInput(val);
                        if (val.trim()) {
                          setLogoPreview(val.trim());
                          setLogoFileBase64(null);
                        } else {
                          setLogoPreview(null);
                        }
                      }}
                      placeholder="e.g. /logo.svg or https://example.com/logo.png"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                      <span>Logo Alt Text (for SEO &amp; Screen Readers):</span>
                    </label>
                    <input
                      type="text"
                      value={logoAltInput}
                      onChange={(e) => setLogoAltInput(e.target.value)}
                      placeholder="Masaraddi Neuro Care Centre Official Seal"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>

                {/* Current Active Path & Metadata */}
                <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-400 gap-2">
                  <div className="flex items-center gap-2 truncate">
                    <span className="font-semibold text-slate-300">Active Logo Source:</span>
                    <code className="text-sky-300 bg-black/40 px-2 py-0.5 rounded font-mono truncate max-w-xs sm:max-w-md">
                      {data.branding?.logoUrl || data.logo || '/logo.svg'}
                    </code>
                  </div>
                  <span className="text-[11px] text-slate-500 shrink-0">
                    Updated: {data.branding?.updatedAt ? new Date(data.branding.updatedAt).toLocaleDateString() : 'Baseline'}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center justify-end gap-3 pt-3 border-t border-white/10">
                  {logoPreview && (
                    <button
                      type="button"
                      onClick={() => {
                        setLogoPreview(null);
                        setLogoFileBase64(null);
                        setCustomLogoUrlInput('');
                        setLogoUploadError('');
                      }}
                      className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-bold transition-all cursor-pointer"
                    >
                      Discard Preview
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={handleSaveLogo}
                    disabled={isUploadingLogo || (!logoFileBase64 && !customLogoUrlInput.trim() && logoAltInput === (data.branding?.logoAlt || ''))}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-sky-600/30 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-2 cursor-pointer"
                  >
                    {isUploadingLogo ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Saving &amp; Updating Logo...</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        <span>Save &amp; Publish Logo Globally</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Hidden File Inputs for Hero Upload and Image Replacement */}
        <input
          ref={heroFileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/svg+xml"
          onChange={handleUploadNewHeroImageFile}
          className="hidden"
          aria-hidden="true"
        />
        <input
          ref={replaceHeroFileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/svg+xml"
          onChange={handleReplaceHeroImageFile}
          className="hidden"
          aria-hidden="true"
        />

        {/* ========================================================= */}
        {/* TAB: HERO SECTION IMAGE & SLIDESHOW MANAGEMENT            */}
        {/* ========================================================= */}
        {activeTab === 'hero' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Top Overview & Action Header */}
            <div className="bg-slate-900/80 rounded-3xl p-6 sm:p-8 border border-white/10 shadow-xl space-y-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10 pb-5">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-white font-outfit">Hero Section Image Management</h3>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                      Instant Live Sync
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
                    Upload, replace, reorder, crop, and delete hero images. All adjustments instantly reflect on the public website hero section without touching any code.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddingHeroSlide(!isAddingHeroSlide);
                      setEditingHeroSlide(null);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-sky-600/30 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{isAddingHeroSlide ? 'Close Add Form' : 'Add New Hero Slide'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleRestoreAllUltraHDPresets}
                    className="px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
                    title="Restore curated set of ultra-HD medical & hospital images"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Restore Ultra-HD Presets</span>
                  </button>
                </div>
              </div>

              {/* ----------------------------------------------------------- */}
              {/* INTERACTIVE MULTI-DEVICE LIVE HERO PREVIEW                 */}
              {/* ----------------------------------------------------------- */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5" />
                    <span>Interactive Hero Banner Preview</span>
                  </span>

                  {/* Device Switcher */}
                  <div className="flex items-center gap-1 bg-[#080E1A] p-1 rounded-xl border border-white/10 self-start sm:self-auto">
                    {[
                      { id: 'desktop', label: 'Desktop 16:9' },
                      { id: 'tablet', label: 'Tablet 4:3' },
                      { id: 'mobile', label: 'Mobile 9:16' },
                    ].map((dev) => (
                      <button
                        key={dev.id}
                        type="button"
                        onClick={() => setHeroPreviewDevice(dev.id)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                          heroPreviewDevice === dev.id
                            ? 'bg-sky-500 text-white shadow-sm'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {dev.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Live Mockup Screen */}
                {(() => {
                  const slides = data.heroSlides || [];
                  const activeSlide = slides[heroPreviewIndex] || slides[0] || {};
                  const aspectClasses = {
                    desktop: 'aspect-[21/9] max-h-[380px]',
                    tablet: 'aspect-[16/10] max-h-[420px]',
                    mobile: 'aspect-[9/14] max-h-[460px] max-w-[320px] mx-auto',
                  }[heroPreviewDevice] || 'aspect-[21/9] max-h-[380px]';

                  return (
                    <div className="bg-[#080E1A] p-3 rounded-2xl border border-white/10">
                      <div className={`relative w-full ${aspectClasses} rounded-xl overflow-hidden bg-slate-950 border border-white/5 transition-all duration-300 shadow-2xl`}>
                        {activeSlide.url ? (
                          <img
                            src={activeSlide.url}
                            alt={activeSlide.altText || activeSlide.title || 'Hero Slide'}
                            style={{
                              objectPosition: activeSlide.objectPosition || 'center 40%',
                            }}
                            className="w-full h-full object-cover transition-all duration-700"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 text-xs">
                            <ImgIcon className="w-8 h-8 opacity-40 mb-1" />
                            <span>No image URL provided</span>
                          </div>
                        )}

                        {/* Real-time Theme Gradient Overlay - Lightened for maximum image clarity */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#080E1A]/80 via-[#080E1A]/30 to-transparent pointer-events-none" />
                        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#080E1A] via-[#080E1A]/40 to-transparent pointer-events-none" />

                        {/* Live Overlay Content Preview */}
                        <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-between z-10 pointer-events-none">
                          {/* Top Row: Slide Tag & Live Badge */}
                          <div className="flex items-center justify-between gap-2">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/90 border border-sky-400/40 text-[10px] font-bold text-sky-300 backdrop-blur-md shadow-sm">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                              <span>{activeSlide.tag || 'Clinical Facility'}</span>
                            </span>
                            <span className="text-[10px] text-white/90 bg-black/75 px-2 py-0.5 rounded-full font-mono border border-white/10">
                              Slide {heroPreviewIndex + 1} of {slides.length}
                            </span>
                          </div>

                          {/* Middle/Bottom: Headline & Caption Overlay */}
                          <div className="space-y-1.5 max-w-xl">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400 block font-outfit">
                              Masaraddi Neuro Care Center &bull; Bagalkot
                            </span>
                            <h4 className="text-sm sm:text-lg md:text-xl font-extrabold text-white leading-tight font-outfit line-clamp-2">
                              {activeSlide.title || 'Complete Neurological Services in Bagalkot'}
                            </h4>
                            <p className="text-[11px] sm:text-xs text-slate-300 line-clamp-2 leading-relaxed">
                              {activeSlide.caption || data.supportingText}
                            </p>
                            <div className="pt-1 flex items-center gap-2">
                              <span className="px-2.5 py-1 rounded-lg bg-sky-500 text-white font-bold text-[10px] shadow-sm">
                                Call to Schedule Visit
                              </span>
                              <span className="px-2.5 py-1 rounded-lg bg-slate-800/90 text-slate-200 font-bold text-[10px] border border-slate-700">
                                WhatsApp
                              </span>
                            </div>
                          </div>

                          {/* Bottom Row: Cropping Focal Point Indicator */}
                          <div className="flex items-center justify-between text-[10px] text-slate-400 border-t border-white/10 pt-1.5">
                            <span className="truncate">
                              Focal Position: <strong className="text-white font-mono">{activeSlide.objectPosition || 'center 40%'}</strong>
                            </span>
                            <span className="text-emerald-400 font-semibold truncate hidden sm:inline">
                              Ultra-HD Sharp Rendering
                            </span>
                          </div>
                        </div>

                        {/* Interactive Navigation Overlay Controls */}
                        <div className="absolute bottom-2 right-2 z-20 flex items-center gap-1.5 bg-black/80 backdrop-blur-md px-2 py-1 rounded-xl border border-white/10">
                          <button
                            type="button"
                            onClick={() => setHeroPreviewIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1))}
                            className="p-1 rounded text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                            title="Previous slide"
                          >
                            <ChevronLeft className="w-3.5 h-3.5" />
                          </button>

                          <div className="flex items-center gap-1 px-1">
                            {slides.map((_, dotIdx) => (
                              <button
                                key={dotIdx}
                                type="button"
                                onClick={() => setHeroPreviewIndex(dotIdx)}
                                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                                  dotIdx === heroPreviewIndex ? 'w-4 bg-sky-400' : 'w-1.5 bg-white/30'
                                }`}
                                title={`Jump to slide ${dotIdx + 1}`}
                              />
                            ))}
                          </div>

                          <button
                            type="button"
                            onClick={() => setHeroPreviewIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1))}
                            className="p-1 rounded text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                            title="Next slide"
                          >
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => setIsHeroAutoPlaying(!isHeroAutoPlaying)}
                            className="p-1 rounded text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer ml-1"
                            title={isHeroAutoPlaying ? 'Pause preview' : 'Play preview'}
                          >
                            {isHeroAutoPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* ----------------------------------------------------------- */}
              {/* CURATED ULTRA-HD PRESET PHOTOGRAPHY QUICK-PICK             */}
              {/* ----------------------------------------------------------- */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Quick-Pick Ultra-HD Hospital Photography Presets</span>
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Click any card to add it to your live slideshow
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  {ultraHDPresets.map((preset, pIdx) => (
                    <div
                      key={`preset-card-${preset.id || pIdx}-${pIdx}`}
                      onClick={() => handleApplyPreset(preset)}
                      className="group relative rounded-2xl overflow-hidden bg-[#080E1A] border border-white/10 hover:border-sky-500/60 p-2 space-y-2 cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-500/10 text-left"
                    >
                      <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-slate-900 border border-white/5">
                        <img
                          src={preset.url}
                          alt={preset.altText}
                          style={{ objectPosition: preset.objectPosition }}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-black/80 text-[9px] font-bold text-sky-300">
                          {preset.tag}
                        </span>
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-[11px] font-bold text-white group-hover:text-sky-300 block truncate">
                          {preset.title}
                        </span>
                        <span className="text-[9px] text-slate-400 block line-clamp-1">
                          {preset.caption}
                        </span>
                      </div>
                      <div className="pt-1 flex items-center justify-between text-[10px] text-sky-400 font-bold border-t border-white/5">
                        <span>+ Add Slide</span>
                        <Plus className="w-3 h-3 group-hover:rotate-90 transition-transform" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ----------------------------------------------------------- */}
              {/* ADD NEW HERO SLIDE DRAWER / FORM                           */}
              {/* ----------------------------------------------------------- */}
              {isAddingHeroSlide && (
                <form
                  onSubmit={handleAddNewHeroSlide}
                  className="bg-[#080E1A] p-5 sm:p-6 rounded-3xl border border-sky-500/40 shadow-2xl space-y-5 animate-in slide-in-from-top-4 duration-300"
                >
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
                        <Plus className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white font-outfit">Add New Hero Slideshow Image</h4>
                        <span className="text-[11px] text-slate-400">Upload a high-definition photograph or provide an image link</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsAddingHeroSlide(false)}
                      className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Upload Dropzone & URL Input */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* File Upload Box */}
                    <div
                      onClick={() => heroFileInputRef.current?.click()}
                      className="group border-2 border-dashed border-sky-500/30 hover:border-sky-400 rounded-2xl p-5 text-center bg-slate-900/60 hover:bg-sky-500/5 transition-all cursor-pointer flex flex-col items-center justify-center min-h-[160px]"
                    >
                      {newHeroSlideForm.url ? (
                        <div className="space-y-2 w-full">
                          <div className="relative aspect-video max-h-28 mx-auto rounded-xl overflow-hidden border border-emerald-500/40 shadow-md">
                            <img
                              src={newHeroSlideForm.url}
                              alt="Preview"
                              style={{ objectPosition: newHeroSlideForm.objectPosition }}
                              className="w-full h-full object-cover"
                            />
                            <span className="absolute top-1 right-1 bg-emerald-500 text-white rounded-full p-0.5 text-[10px]">
                              ✓
                            </span>
                          </div>
                          <span className="text-xs font-bold text-emerald-400 block">
                            Image Selected! Click to pick a different file
                          </span>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="w-10 h-10 rounded-xl bg-sky-500/15 text-sky-400 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                            {isUploadingHeroImage ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5" />}
                          </div>
                          <span className="text-xs font-bold text-white block">
                            {isUploadingHeroImage ? 'Uploading image...' : 'Click to Upload Hero Image File'}
                          </span>
                          <span className="text-[10px] text-slate-400 block">
                            High-res JPG, PNG, or WebP (Ultra-HD recommended)
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Direct URL & Focal Point */}
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-300">
                          Or Provide Direct Image URL (Unsplash, Cloud, etc.):
                        </label>
                        <input
                          type="text"
                          value={newHeroSlideForm.url}
                          onChange={(e) => setNewHeroSlideForm((prev) => ({ ...prev, url: e.target.value }))}
                          placeholder="https://images.unsplash.com/... or /uploads/..."
                          className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-mono focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-300">Slide Tag / Badge:</label>
                          <input
                            type="text"
                            value={newHeroSlideForm.tag}
                            onChange={(e) => setNewHeroSlideForm((prev) => ({ ...prev, tag: e.target.value }))}
                            placeholder="e.g. 7 ICU Facilities"
                            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-300">Crop Alignment:</label>
                          <select
                            value={newHeroSlideForm.objectPosition}
                            onChange={(e) => setNewHeroSlideForm((prev) => ({ ...prev, objectPosition: e.target.value }))}
                            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
                          >
                            <option value="center 40%">Center Balanced (40%)</option>
                            <option value="center 25%">Top Focus / Portrait (25%)</option>
                            <option value="center 50%">Dead Center (50%)</option>
                            <option value="center 65%">Lower Focus (65%)</option>
                            <option value="top">Top</option>
                            <option value="bottom">Bottom</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-300">SEO Alt Text:</label>
                        <input
                          type="text"
                          value={newHeroSlideForm.altText}
                          onChange={(e) => setNewHeroSlideForm((prev) => ({ ...prev, altText: e.target.value }))}
                          placeholder="Masaraddi Neuro Care Center hospital premises in Bagalkot"
                          className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Title & Caption */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300">Slide Headline / Title:</label>
                      <input
                        type="text"
                        value={newHeroSlideForm.title}
                        onChange={(e) => setNewHeroSlideForm((prev) => ({ ...prev, title: e.target.value }))}
                        placeholder="e.g. 7 ICU & Inpatient Care Beds"
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300">Slide Caption / Description:</label>
                      <input
                        type="text"
                        value={newHeroSlideForm.caption}
                        onChange={(e) => setNewHeroSlideForm((prev) => ({ ...prev, caption: e.target.value }))}
                        placeholder="e.g. Equipped 7-bed intensive care unit with vital monitoring"
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                  </div>

                  {/* Form Footer */}
                  <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => setIsAddingHeroSlide(false)}
                      className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold transition-all cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={!newHeroSlideForm.url.trim()}
                      className="px-5 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs shadow-md shadow-sky-600/30 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Add to Live Hero Slideshow</span>
                    </button>
                  </div>
                </form>
              )}

              {/* ----------------------------------------------------------- */}
              {/* LIST OF HERO SLIDES (REORDER, REPLACE, EDIT, DELETE)        */}
              {/* ----------------------------------------------------------- */}
              <div className="space-y-4 pt-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                  <div>
                    <h4 className="text-base font-bold text-white font-outfit flex items-center gap-2">
                      <span>Live Hero Slides</span>
                      <span className="px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-400 text-xs font-mono">
                        {(data.heroSlides || []).length} active
                      </span>
                    </h4>
                    <p className="text-xs text-slate-400">
                      Slide #1 is the primary first impression seen by patients. Use Up/Down buttons to reorder.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {(data.heroSlides || []).map((slide, index) => {
                    const isEditing = editingHeroSlide === slide.id;
                    const isFirst = index === 0;
                    const isLast = index === (data.heroSlides || []).length - 1;

                    return (
                      <div
                        key={`admin-hero-slide-${slide.id || index}-${index}`}
                        className={`rounded-2xl border transition-all duration-200 p-4 sm:p-5 ${
                          isEditing
                            ? 'bg-slate-900 border-sky-500 shadow-xl'
                            : 'bg-[#080E1A] border-white/10 hover:border-white/20'
                        }`}
                      >
                        {isEditing ? (
                          /* Inline Edit Form */
                          <form onSubmit={handleSaveHeroSlideEdit} className="space-y-4">
                            <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                              <span className="text-xs font-bold text-sky-400 flex items-center gap-1.5">
                                <Edit3 className="w-3.5 h-3.5" />
                                <span>Editing Slide #{index + 1}</span>
                              </span>
                              <button
                                type="button"
                                onClick={() => setEditingHeroSlide(null)}
                                className="text-slate-400 hover:text-white p-1 text-xs cursor-pointer"
                              >
                                Cancel
                              </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div className="space-y-1">
                                <label className="text-[11px] font-bold text-slate-300">Image URL:</label>
                                <input
                                  type="text"
                                  value={heroEditForm.url}
                                  onChange={(e) => setHeroEditForm((prev) => ({ ...prev, url: e.target.value }))}
                                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white text-xs font-mono focus:outline-none focus:ring-2 focus:ring-sky-500"
                                />
                              </div>

                              <div className="grid grid-cols-2 gap-2">
                                <div className="space-y-1">
                                  <label className="text-[11px] font-bold text-slate-300">Tag / Badge:</label>
                                  <input
                                    type="text"
                                    value={heroEditForm.tag}
                                    onChange={(e) => setHeroEditForm((prev) => ({ ...prev, tag: e.target.value }))}
                                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[11px] font-bold text-slate-300">Focal Crop:</label>
                                  <select
                                    value={heroEditForm.objectPosition}
                                    onChange={(e) => setHeroEditForm((prev) => ({ ...prev, objectPosition: e.target.value }))}
                                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
                                  >
                                    <option value="center 40%">Center Balanced (40%)</option>
                                    <option value="center 25%">Top Focus / Portrait (25%)</option>
                                    <option value="center 50%">Dead Center (50%)</option>
                                    <option value="center 65%">Lower Focus (65%)</option>
                                    <option value="top">Top</option>
                                    <option value="bottom">Bottom</option>
                                  </select>
                                </div>
                              </div>

                              <div className="space-y-1">
                                <label className="text-[11px] font-bold text-slate-300">Headline / Title:</label>
                                <input
                                  type="text"
                                  value={heroEditForm.title}
                                  onChange={(e) => setHeroEditForm((prev) => ({ ...prev, title: e.target.value }))}
                                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
                                />
                              </div>

                              <div className="space-y-1">
                                <label className="text-[11px] font-bold text-slate-300">Caption / Description:</label>
                                <input
                                  type="text"
                                  value={heroEditForm.caption}
                                  onChange={(e) => setHeroEditForm((prev) => ({ ...prev, caption: e.target.value }))}
                                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
                                />
                              </div>

                              <div className="space-y-1 sm:col-span-2">
                                <label className="text-[11px] font-bold text-slate-300">SEO Alt Text:</label>
                                <input
                                  type="text"
                                  value={heroEditForm.altText}
                                  onChange={(e) => setHeroEditForm((prev) => ({ ...prev, altText: e.target.value }))}
                                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-white/10 text-white text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
                                />
                              </div>
                            </div>

                            <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/10">
                              <button
                                type="button"
                                onClick={() => setEditingHeroSlide(null)}
                                className="px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold cursor-pointer"
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                className="px-4 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold shadow-md cursor-pointer flex items-center gap-1.5"
                              >
                                <Check className="w-3.5 h-3.5" />
                                <span>Save &amp; Update Live</span>
                              </button>
                            </div>
                          </form>
                        ) : (
                          /* Normal Slide Display Card */
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-start gap-3.5 flex-1 min-w-0">
                              {/* Reorder Up/Down Column */}
                              <div className="flex flex-col items-center justify-center gap-1 shrink-0 bg-slate-950 p-1 rounded-xl border border-white/10">
                                <button
                                  type="button"
                                  onClick={() => handleMoveHeroSlide(index, 'up')}
                                  disabled={isFirst}
                                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 disabled:opacity-20 disabled:cursor-not-allowed transition-colors cursor-pointer"
                                  title={isFirst ? 'Already first slide' : 'Move slide up'}
                                >
                                  <ArrowUp className="w-3.5 h-3.5" />
                                </button>
                                <span className="text-[10px] font-mono font-bold text-sky-400 px-1">
                                  #{index + 1}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => handleMoveHeroSlide(index, 'down')}
                                  disabled={isLast}
                                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 disabled:opacity-20 disabled:cursor-not-allowed transition-colors cursor-pointer"
                                  title={isLast ? 'Already last slide' : 'Move slide down'}
                                >
                                  <ArrowDown className="w-3.5 h-3.5" />
                                </button>
                              </div>

                              {/* Thumbnail with focal position and replace overlay */}
                              <div className="relative w-28 sm:w-36 aspect-[16/10] rounded-xl overflow-hidden bg-slate-950 border border-white/10 shrink-0 group">
                                <img
                                  src={slide.url}
                                  alt={slide.altText || slide.title}
                                  style={{ objectPosition: slide.objectPosition || 'center 40%' }}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                {isFirst && (
                                  <span className="absolute top-1 left-1 px-1.5 py-0.2 rounded bg-sky-500 text-white text-[9px] font-extrabold uppercase shadow-sm">
                                    Primary #1
                                  </span>
                                )}
                                {/* Quick Replace Hover Button */}
                                <button
                                  type="button"
                                  onClick={() => handleStartReplaceImage(slide.id)}
                                  className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-[10px] font-bold gap-1 cursor-pointer"
                                  title="Click to replace image file"
                                >
                                  <Upload className="w-4 h-4 text-sky-400" />
                                  <span>Replace</span>
                                </button>
                              </div>

                              {/* Details Column */}
                              <div className="space-y-1 flex-1 min-w-0">
                                <div className="flex flex-wrap items-center gap-2">
                                  <span className="px-2 py-0.5 rounded-md bg-sky-500/15 border border-sky-400/30 text-sky-300 text-[10px] font-bold">
                                    {slide.tag || 'Clinical Facility'}
                                  </span>
                                  <span className="text-[10px] text-slate-400 font-mono">
                                    Focal: {slide.objectPosition || 'center 40%'}
                                  </span>
                                </div>
                                <h5 className="text-sm font-bold text-white truncate font-outfit">
                                  {slide.title || 'Untitled Slide'}
                                </h5>
                                <p className="text-xs text-slate-400 line-clamp-1">
                                  {slide.caption || 'No description provided'}
                                </p>
                                <div className="text-[10px] text-slate-500 font-mono truncate pt-0.5">
                                  {slide.url}
                                </div>
                              </div>
                            </div>

                            {/* Actions Column */}
                            <div className="flex items-center gap-1.5 shrink-0 self-end md:self-center border-t md:border-t-0 border-white/5 pt-2 md:pt-0 w-full md:w-auto justify-end">
                              {/* Direct Replace Image Button */}
                              <button
                                type="button"
                                onClick={() => handleStartReplaceImage(slide.id)}
                                className="px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-sky-500/20 text-slate-300 hover:text-sky-300 border border-white/10 text-xs font-semibold transition-all flex items-center gap-1 cursor-pointer"
                                title="Upload or choose a replacement image"
                              >
                                <Upload className="w-3.5 h-3.5" />
                                <span className="hidden sm:inline">Replace</span>
                              </button>

                              {/* Edit Details Button */}
                              <button
                                type="button"
                                onClick={() => handleStartEditHeroSlide(slide)}
                                className="px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white border border-white/10 text-xs font-semibold transition-all flex items-center gap-1 cursor-pointer"
                                title="Edit slide headline, caption, tag, or alignment"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                                <span className="hidden sm:inline">Edit</span>
                              </button>

                              {/* Delete Button */}
                              <button
                                type="button"
                                onClick={() => handleDeleteHeroSlide(slide.id)}
                                disabled={(data.heroSlides || []).length <= 1}
                                className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl bg-white/5 hover:bg-rose-500/20 text-slate-400 hover:text-rose-300 border border-white/10 text-xs font-semibold disabled:opacity-20 disabled:cursor-not-allowed transition-all flex items-center gap-1 cursor-pointer"
                                title={(data.heroSlides || []).length <= 1 ? 'Cannot delete only remaining slide' : 'Delete hero slide'}
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                <span className="hidden sm:inline">Delete</span>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 1: DOCTOR PROFILE & PHOTO UPLOAD                      */}
        {/* ========================================================= */}
        {activeTab === 'doctor' && (
          <div className="space-y-6">
            <div className="bg-slate-900/80 rounded-3xl p-6 sm:p-8 border border-white/10 shadow-xl space-y-6">
              <div className="border-b border-white/10 pb-4">
                <h3 className="text-xl font-bold text-white font-outfit">Doctor Profile &amp; Image Management</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Upload official doctor photographs and update clinical credentials.
                </p>
              </div>

              {/* Photo Upload Showcase */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                <div className="md:col-span-4 flex flex-col items-center text-center p-6 bg-black/40 rounded-2xl border border-white/10 space-y-4">
                  <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-2xl overflow-hidden border-2 border-sky-400/50 shadow-xl bg-slate-800">
                    <img
                      src={doctorForm.image || currentDoctor.image}
                      alt={doctorForm.name}
                      className="w-full h-full object-cover object-top"
                    />
                    {isUploadingDoctorPhoto && (
                      <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-xs text-sky-300">
                        <RefreshCw className="w-6 h-6 animate-spin mb-1 text-sky-400" />
                        <span>Uploading...</span>
                      </div>
                    )}
                  </div>

                  <input
                    type="file"
                    ref={doctorFileRef}
                    onChange={handleDoctorPhotoUpload}
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                  />

                  <div className="w-full space-y-2">
                    <button
                      type="button"
                      onClick={() => doctorFileRef.current?.click()}
                      disabled={isUploadingDoctorPhoto}
                      className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload New Doctor Photo</span>
                    </button>
                    <p className="text-[10px] text-slate-400">
                      JPG, PNG, WEBP (Auto-saved to persistent storage)
                    </p>
                  </div>
                </div>

                {/* Form Fields */}
                <form onSubmit={handleSaveDoctor} className="md:col-span-8 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300">Doctor Full Name</label>
                      <input
                        type="text"
                        value={doctorForm.name}
                        onChange={(e) => setDoctorForm({ ...doctorForm, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs font-semibold focus:outline-none focus:border-sky-400"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300">Specialization</label>
                      <input
                        type="text"
                        value={doctorForm.specialization}
                        onChange={(e) => setDoctorForm({ ...doctorForm, specialization: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs font-semibold focus:outline-none focus:border-sky-400"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300">Qualifications Summary</label>
                      <input
                        type="text"
                        value={doctorForm.qualificationsSummary}
                        onChange={(e) => setDoctorForm({ ...doctorForm, qualificationsSummary: e.target.value })}
                        placeholder="e.g. MBBS, MD (General Medicine), DM (Neurology)"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs font-semibold focus:outline-none focus:border-sky-400"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300">Experience Label</label>
                      <input
                        type="text"
                        value={doctorForm.experience}
                        onChange={(e) => setDoctorForm({ ...doctorForm, experience: e.target.value })}
                        placeholder="e.g. 12+ Years of Experience"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs font-semibold focus:outline-none focus:border-sky-400"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300">OPD Consultation Timings</label>
                    <input
                      type="text"
                      value={doctorForm.timings}
                      onChange={(e) => setDoctorForm({ ...doctorForm, timings: e.target.value })}
                      placeholder="e.g. 10:00 AM – 4:00 PM & 6:00 PM – 8:00 PM"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs font-semibold focus:outline-none focus:border-sky-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300">Verified Medical Qualifications (one per line)</label>
                    <textarea
                      rows={3}
                      value={doctorForm.qualificationsRaw}
                      onChange={(e) => setDoctorForm({ ...doctorForm, qualificationsRaw: e.target.value })}
                      placeholder="MBBS — J.N. Medical College, Belagavi&#10;MD — General Medicine&#10;DM — Neurology"
                      className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs font-medium focus:outline-none focus:border-sky-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300">Doctor Bio &amp; Clinical Background</label>
                    <textarea
                      rows={4}
                      value={doctorForm.bio}
                      onChange={(e) => setDoctorForm({ ...doctorForm, bio: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs font-medium focus:outline-none focus:border-sky-400 leading-relaxed"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/30 transition-all cursor-pointer active:scale-95"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Doctor Profile</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: GALLERY PHOTOS (MULTI-PHOTO 2S CONTINUOUS REELS)  */}
        {/* ========================================================= */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-white font-outfit">Campus &amp; Facilities Gallery Reels</h3>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[11px] font-bold border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>2s Continuous Auto-Reel Active</span>
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Manage multi-photo continuous rotating reels for the hospital campus, ICU, consultation chamber, and facilities. Each card continuously cycles through multiple images every 2 seconds on the public website.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setNewPhotoForm({
                    title: '',
                    category: 'consultation',
                    categoryLabel: 'Doctor Consultation',
                    caption: '',
                    image: '',
                    images: [],
                    interval: 2000,
                  });
                  setReelUrlInput('');
                  setIsAddingPhoto(true);
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-sky-600/30 transition-all cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Add Multi-Photo Reel</span>
              </button>
            </div>

            {/* Add New Reel Form */}
            {isAddingPhoto && (
              <div className="p-6 rounded-3xl bg-slate-900 border border-sky-400/40 shadow-2xl space-y-5 animate-in fade-in duration-200">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-sky-400" />
                    <h4 className="text-sm font-bold text-white">Create New Multi-Photo 2s Gallery Reel</h4>
                  </div>
                  <button onClick={() => setIsAddingPhoto(false)} className="text-slate-400 hover:text-white p-1">✕</button>
                </div>

                <form onSubmit={handleCreatePhoto} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-xs font-bold text-slate-300">Reel Title</label>
                      <input
                        type="text"
                        value={newPhotoForm.title}
                        onChange={(e) => setNewPhotoForm({ ...newPhotoForm, title: e.target.value })}
                        placeholder="e.g. Advanced ICU &amp; Vital Monitoring Setup"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs font-semibold focus:outline-none focus:border-sky-400"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300">Category</label>
                      <select
                        value={newPhotoForm.category}
                        onChange={(e) => setNewPhotoForm({ ...newPhotoForm, category: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs font-semibold focus:outline-none focus:border-sky-400"
                      >
                        <option value="consultation">Doctor Consultation</option>
                        <option value="patient_care">ICU &amp; Inpatient</option>
                        <option value="facilities">Facilities</option>
                        <option value="diagnostics">Diagnostics</option>
                        <option value="exterior">Premises</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-xs font-bold text-slate-300">Caption / Clinical Description</label>
                      <input
                        type="text"
                        value={newPhotoForm.caption}
                        onChange={(e) => setNewPhotoForm({ ...newPhotoForm, caption: e.target.value })}
                        placeholder="Brief description explaining this clinical area to visiting patients"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-sky-400"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300">Rotation Speed (ms)</label>
                      <select
                        value={newPhotoForm.interval || 2000}
                        onChange={(e) => setNewPhotoForm({ ...newPhotoForm, interval: Number(e.target.value) })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs font-semibold focus:outline-none focus:border-sky-400"
                      >
                        <option value={2000}>2 Seconds (Recommended)</option>
                        <option value={1500}>1.5 Seconds (Fast)</option>
                        <option value={3000}>3 Seconds (Gentle)</option>
                        <option value={4000}>4 Seconds (Slow)</option>
                      </select>
                    </div>
                  </div>

                  {/* Multi-Photo Reel Manager & Live Preview Box */}
                  <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                      <div>
                        <h5 className="text-xs font-bold text-sky-300 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                          <span>Reel Photos ({newPhotoForm.images?.length || 0} Photos Added)</span>
                        </h5>
                        <p className="text-[11px] text-slate-400">
                          Add multiple photos that will automatically change every 2 seconds in a seamless crossfade loop.
                        </p>
                      </div>

                      {/* File Upload Button (Multi-select enabled) */}
                      <div>
                        <input
                          type="file"
                          ref={galleryFileRef}
                          onChange={(e) => handleGalleryPhotoUpload(e, false)}
                          accept="image/*"
                          multiple
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => galleryFileRef.current?.click()}
                          disabled={isUploadingGalleryPhoto}
                          className="px-3.5 py-2 rounded-xl bg-sky-600/30 hover:bg-sky-600/50 text-sky-300 hover:text-white border border-sky-400/30 text-xs font-bold flex items-center gap-2 cursor-pointer transition-all"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>{isUploadingGalleryPhoto ? uploadProgressText || 'Uploading...' : 'Upload Photos (Select Multiple)'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Add Image by URL Input */}
                    <div className="flex gap-2 items-center">
                      <input
                        type="text"
                        value={reelUrlInput}
                        onChange={(e) => setReelUrlInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddUrlToReel(false);
                          }
                        }}
                        placeholder="Paste image URL (e.g. https://... or /src/assets/...)"
                        className="flex-1 px-3.5 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-xs focus:outline-none focus:border-sky-400"
                      />
                      <button
                        type="button"
                        onClick={() => handleAddUrlToReel(false)}
                        className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold cursor-pointer transition-all shrink-0"
                      >
                        + Add to Reel
                      </button>
                    </div>

                    {/* Preview Strip of All Photos in Reel */}
                    {newPhotoForm.images?.length > 0 ? (
                      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 pt-2">
                        {newPhotoForm.images.map((imgUrl, idx) => (
                          <div
                            key={imgUrl + idx}
                            className={`relative rounded-xl overflow-hidden bg-black/60 border-2 p-1 space-y-1.5 ${
                              idx === 0 ? 'border-sky-400' : 'border-white/15'
                            }`}
                          >
                            <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
                              <img src={imgUrl} alt={`Reel ${idx + 1}`} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                              <span className="absolute top-1 left-1 bg-black/80 text-[9px] font-bold px-1.5 py-0.2 rounded text-white">
                                {idx === 0 ? 'Cover #1' : `#${idx + 1}`}
                              </span>
                            </div>

                            <div className="flex items-center justify-between pt-1 border-t border-white/10 text-[10px]">
                              <div className="flex items-center gap-1">
                                {idx > 0 && (
                                  <button
                                    type="button"
                                    onClick={() => handleMovePhoto(idx, idx - 1, false)}
                                    title="Move earlier in 2s cycle"
                                    className="p-1 rounded bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white"
                                  >
                                    <ChevronLeft className="w-3 h-3" />
                                  </button>
                                )}
                                {idx < newPhotoForm.images.length - 1 && (
                                  <button
                                    type="button"
                                    onClick={() => handleMovePhoto(idx, idx + 1, false)}
                                    title="Move later in 2s cycle"
                                    className="p-1 rounded bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white"
                                  >
                                    <ChevronRight className="w-3 h-3" />
                                  </button>
                                )}
                              </div>

                              <button
                                type="button"
                                onClick={() => handleRemovePhotoFromReel(idx, false)}
                                className="text-rose-400 hover:text-rose-300 p-1"
                                title="Remove photo from reel"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="py-6 text-center text-xs text-slate-400 border border-dashed border-white/10 rounded-xl">
                        No photos added yet. Upload files above or paste image URLs to populate this 2-second continuous reel.
                      </div>
                    )}

                    {/* Live Continuous 2s Preview Box */}
                    {newPhotoForm.images?.length > 0 && (
                      <div className="pt-2">
                        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 block">
                          Live 2-Second Auto-Rotation Preview:
                        </label>
                        <div className="max-w-md mx-auto">
                          <AdminReelLivePreview
                            images={newPhotoForm.images}
                            interval={newPhotoForm.interval || 2000}
                            title={newPhotoForm.title || 'Reel Preview'}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingPhoto(false)}
                      className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={!newPhotoForm.images?.length && !newPhotoForm.image}
                      className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-bold shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
                    >
                      Publish Reel to Live Website
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Gallery Reels Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {data.gallery.map((photo) => {
                const cardImages = Array.isArray(photo.images) && photo.images.length > 0
                  ? photo.images
                  : [photo.image].filter(Boolean);

                return (
                  <div
                    key={photo.id}
                    className="rounded-3xl overflow-hidden bg-slate-900 border border-white/10 p-4 space-y-3 flex flex-col justify-between shadow-xl hover:border-sky-500/30 transition-all"
                  >
                    <div className="space-y-3">
                      {/* Live Continuous 2s Preview Card */}
                      <div className="rounded-2xl overflow-hidden aspect-video bg-black relative border border-white/10 shadow-inner">
                        <AdminReelLivePreview
                          images={cardImages}
                          interval={photo.interval || 2000}
                          title={photo.title}
                        />
                      </div>

                      {/* Header details */}
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#080E1A] text-sky-300 border border-white/10">
                            {photo.categoryLabel}
                          </span>
                          <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            <span>{cardImages.length} Photos &bull; 2s</span>
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-white line-clamp-1 mt-1.5 font-outfit">{photo.title}</h4>
                        <p className="text-[11px] text-slate-400 line-clamp-2 mt-0.5 leading-relaxed">{photo.caption}</p>
                      </div>

                      {/* Mini Thumbnail Row */}
                      {cardImages.length > 1 && (
                        <div className="flex items-center gap-1.5 overflow-x-auto py-1 no-scrollbar">
                          {cardImages.map((img, i) => (
                            <div key={img + i} className="w-9 h-6 rounded-md overflow-hidden shrink-0 border border-white/20 bg-black">
                              <img src={img} alt={`Thumb ${i + 1}`} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center justify-between pt-3 border-t border-white/10">
                      <button
                        type="button"
                        onClick={() => {
                          const images = Array.isArray(photo.images) && photo.images.length > 0
                            ? [...photo.images]
                            : [photo.image].filter(Boolean);
                          setEditingPhoto({
                            ...photo,
                            images,
                            interval: Number(photo.interval) || 2000,
                          });
                          setReelUrlInput('');
                        }}
                        className="inline-flex items-center gap-1.5 text-xs text-sky-400 hover:text-sky-300 font-bold cursor-pointer transition-colors"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit Reel Photos ({cardImages.length})</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm(`Delete gallery reel "${photo.title}"?`)) {
                            deleteGalleryItem(photo.id);
                            showToast('Photo reel removed from gallery');
                          }
                        }}
                        className="inline-flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300 font-semibold cursor-pointer transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Edit Photo Reel Modal */}
            {editingPhoto && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
                <div className="bg-slate-900 rounded-3xl max-w-2xl w-full p-6 border border-white/10 shadow-2xl space-y-5 my-auto max-h-[92vh] overflow-y-auto">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2">
                      <Layers className="w-4 h-4 text-sky-400" />
                      <h4 className="text-sm font-bold text-white">Edit Multi-Photo 2s Reel</h4>
                    </div>
                    <button onClick={() => setEditingPhoto(null)} className="text-slate-400 hover:text-white p-1">✕</button>
                  </div>

                  <form onSubmit={handleSavePhotoEdit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-1 sm:col-span-2">
                        <label className="text-xs font-bold text-slate-300">Reel Title</label>
                        <input
                          type="text"
                          value={editingPhoto.title}
                          onChange={(e) => setEditingPhoto({ ...editingPhoto, title: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs font-semibold focus:outline-none focus:border-sky-400"
                          required
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-300">Category</label>
                        <select
                          value={editingPhoto.category}
                          onChange={(e) => {
                            const labels = {
                              consultation: 'Doctor Consultation',
                              patient_care: 'ICU & Inpatient',
                              facilities: 'Facilities',
                              diagnostics: 'Diagnostics',
                              exterior: 'Premises',
                            };
                            setEditingPhoto({
                              ...editingPhoto,
                              category: e.target.value,
                              categoryLabel: labels[e.target.value] || 'Facilities',
                            });
                          }}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs font-semibold focus:outline-none focus:border-sky-400"
                        >
                          <option value="consultation">Doctor Consultation</option>
                          <option value="patient_care">ICU &amp; Inpatient</option>
                          <option value="facilities">Facilities</option>
                          <option value="diagnostics">Diagnostics</option>
                          <option value="exterior">Premises</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-1 sm:col-span-2">
                        <label className="text-xs font-bold text-slate-300">Caption / Description</label>
                        <textarea
                          rows={2}
                          value={editingPhoto.caption}
                          onChange={(e) => setEditingPhoto({ ...editingPhoto, caption: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs focus:outline-none focus:border-sky-400"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-300">Rotation Interval</label>
                        <select
                          value={editingPhoto.interval || 2000}
                          onChange={(e) => setEditingPhoto({ ...editingPhoto, interval: Number(e.target.value) })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs font-semibold focus:outline-none focus:border-sky-400"
                        >
                          <option value={2000}>2 Seconds (Recommended)</option>
                          <option value={1500}>1.5 Seconds (Fast)</option>
                          <option value={3000}>3 Seconds (Gentle)</option>
                          <option value={4000}>4 Seconds (Slow)</option>
                        </select>
                      </div>
                    </div>

                    {/* Reel Photo List Manager */}
                    <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-4">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                        <div>
                          <h5 className="text-xs font-bold text-sky-300 flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                            <span>Reel Photos ({editingPhoto.images?.length || 0} Photos)</span>
                          </h5>
                          <p className="text-[11px] text-slate-400">
                            Reorder, upload more photos, or remove photos from this continuous 2-second cycle.
                          </p>
                        </div>

                        <div>
                          <input
                            type="file"
                            ref={editGalleryFileRef}
                            onChange={(e) => handleGalleryPhotoUpload(e, true)}
                            accept="image/*"
                            multiple
                            className="hidden"
                          />
                          <button
                            type="button"
                            onClick={() => editGalleryFileRef.current?.click()}
                            disabled={isUploadingGalleryPhoto}
                            className="px-3.5 py-2 rounded-xl bg-sky-600/30 hover:bg-sky-600/50 text-sky-300 hover:text-white border border-sky-400/30 text-xs font-bold flex items-center gap-2 cursor-pointer transition-all"
                          >
                            <Upload className="w-3.5 h-3.5" />
                            <span>{isUploadingGalleryPhoto ? uploadProgressText || 'Uploading...' : 'Add More Photos'}</span>
                          </button>
                        </div>
                      </div>

                      {/* Add Image by URL */}
                      <div className="flex gap-2 items-center">
                        <input
                          type="text"
                          value={reelUrlInput}
                          onChange={(e) => setReelUrlInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddUrlToReel(true);
                            }
                          }}
                          placeholder="Paste image URL to add to this reel..."
                          className="flex-1 px-3.5 py-2 rounded-xl bg-black/50 border border-white/10 text-white text-xs focus:outline-none focus:border-sky-400"
                        />
                        <button
                          type="button"
                          onClick={() => handleAddUrlToReel(true)}
                          className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold cursor-pointer transition-all shrink-0"
                        >
                          + Add to Reel
                        </button>
                      </div>

                      {/* Thumbnails of current photos */}
                      {editingPhoto.images?.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-2">
                          {editingPhoto.images.map((imgUrl, idx) => (
                            <div
                              key={imgUrl + idx}
                              className={`relative rounded-xl overflow-hidden bg-black/60 border-2 p-1.5 space-y-1.5 ${
                                idx === 0 ? 'border-sky-400' : 'border-white/15'
                              }`}
                            >
                              <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
                                <img src={imgUrl} alt={`Photo ${idx + 1}`} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                                <span className="absolute top-1 left-1 bg-black/80 text-[9px] font-bold px-1.5 py-0.2 rounded text-white">
                                  {idx === 0 ? 'Cover #1' : `#${idx + 1}`}
                                </span>
                              </div>

                              <div className="flex items-center justify-between pt-1 border-t border-white/10 text-[10px]">
                                <div className="flex items-center gap-1">
                                  {idx > 0 && (
                                    <button
                                      type="button"
                                      onClick={() => handleMovePhoto(idx, idx - 1, true)}
                                      title="Move earlier"
                                      className="p-1 rounded bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white"
                                    >
                                      <ChevronLeft className="w-3.5 h-3.5" />
                                    </button>
                                  )}
                                  {idx < editingPhoto.images.length - 1 && (
                                    <button
                                      type="button"
                                      onClick={() => handleMovePhoto(idx, idx + 1, true)}
                                      title="Move later"
                                      className="p-1 rounded bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white"
                                    >
                                      <ChevronRight className="w-3.5 h-3.5" />
                                    </button>
                                  )}
                                </div>

                                <button
                                  type="button"
                                  onClick={() => handleRemovePhotoFromReel(idx, true)}
                                  className="text-rose-400 hover:text-rose-300 p-1"
                                  title="Delete photo from reel"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="py-4 text-center text-xs text-rose-400">
                          This reel needs at least one photo.
                        </div>
                      )}

                      {/* Live 2-Second Preview Box inside Edit Modal */}
                      {editingPhoto.images?.length > 0 && (
                        <div className="pt-2">
                          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 block">
                            Live Continuous 2-Second Preview:
                          </label>
                          <div className="max-w-md mx-auto">
                            <AdminReelLivePreview
                              images={editingPhoto.images}
                              interval={editingPhoto.interval || 2000}
                              title={editingPhoto.title}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setEditingPhoto(null)}
                        className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={!editingPhoto.images?.length}
                        className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-bold shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
                      >
                        Save Reel Changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: SERVICES MANAGEMENT                                */}
        {/* ========================================================= */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-white font-outfit">Neurological Services Management</h3>
                <p className="text-xs text-slate-400">
                  Manage clinical consultation services, stroke care, epilepsy, and treatments displayed to patients.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsAddingService(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Service</span>
              </button>
            </div>

            {/* Add Service Modal */}
            {isAddingService && (
              <div className="p-6 rounded-3xl bg-slate-900 border border-sky-400/30 shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <h4 className="text-sm font-bold text-sky-300">Add Neurological Service</h4>
                  <button onClick={() => setIsAddingService(false)} className="text-slate-400 hover:text-white">✕</button>
                </div>

                <form onSubmit={handleCreateService} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300">Service Name</label>
                      <input
                        type="text"
                        value={newServiceForm.name}
                        onChange={(e) => setNewServiceForm({ ...newServiceForm, name: e.target.value })}
                        placeholder="e.g. Neuro-Rehabilitation Clinic"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300">Category</label>
                      <input
                        type="text"
                        value={newServiceForm.category}
                        onChange={(e) => setNewServiceForm({ ...newServiceForm, category: e.target.value })}
                        placeholder="e.g. Specialized Clinic"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300">Short Summary</label>
                    <textarea
                      rows={2}
                      value={newServiceForm.shortDescription}
                      onChange={(e) => setNewServiceForm({ ...newServiceForm, shortDescription: e.target.value })}
                      placeholder="Brief card description"
                      className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300">Detailed Clinical Description</label>
                    <textarea
                      rows={3}
                      value={newServiceForm.detailedDescription}
                      onChange={(e) => setNewServiceForm({ ...newServiceForm, detailedDescription: e.target.value })}
                      placeholder="Full clinical explanation shown in patient modal"
                      className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300">What We Offer (one item per line)</label>
                      <textarea
                        rows={3}
                        value={newServiceForm.whatWeOfferRaw}
                        onChange={(e) => setNewServiceForm({ ...newServiceForm, whatWeOfferRaw: e.target.value })}
                        placeholder="Specialist examination&#10;Prescription protocol&#10;Follow-up check"
                        className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300">Common Symptoms (one per line)</label>
                      <textarea
                        rows={3}
                        value={newServiceForm.commonSymptomsRaw}
                        onChange={(e) => setNewServiceForm({ ...newServiceForm, commonSymptomsRaw: e.target.value })}
                        placeholder="Numbness in limbs&#10;Headache&#10;Tremors"
                        className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsAddingService(false)}
                      className="px-4 py-2 rounded-xl bg-white/5 text-slate-300 text-xs font-semibold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md cursor-pointer"
                    >
                      Publish Service
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Services List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.services.map((service) => (
                <div
                  key={service.id}
                  className="rounded-2xl bg-slate-900 border border-white/10 p-5 space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-sky-500/20 text-sky-300 border border-sky-400/30">
                        {service.category}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-white font-outfit">{service.name}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">{service.shortDescription}</p>

                    {service.whatWeOffer && service.whatWeOffer.length > 0 && (
                      <div className="pt-1 space-y-1">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Offerings:</span>
                        <ul className="text-[11px] text-slate-300 space-y-0.5">
                          {service.whatWeOffer.slice(0, 3).map((f, i) => (
                            <li key={i} className="flex items-center gap-1.5">
                              <span className="text-sky-400">&bull;</span>
                              <span>{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingService({
                          ...service,
                          whatWeOfferRaw: (service.whatWeOffer || []).join('\n'),
                          commonSymptomsRaw: (service.commonSymptoms || []).join('\n'),
                        });
                      }}
                      className="inline-flex items-center gap-1.5 text-xs text-sky-400 hover:text-sky-300 font-bold"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit Service</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm(`Delete service "${service.name}"?`)) {
                          deleteService(service.id);
                          showToast('Service deleted');
                        }
                      }}
                      className="inline-flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 font-semibold"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Edit Service Modal */}
            {editingService && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
                <div className="bg-slate-900 rounded-3xl max-w-xl w-full p-6 border border-white/10 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <h4 className="text-sm font-bold text-white">Edit Neurological Service</h4>
                    <button onClick={() => setEditingService(null)} className="text-slate-400 hover:text-white">✕</button>
                  </div>

                  <form onSubmit={handleSaveServiceEdit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-300">Name</label>
                        <input
                          type="text"
                          value={editingService.name}
                          onChange={(e) => setEditingService({ ...editingService, name: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs font-semibold"
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-300">Category</label>
                        <input
                          type="text"
                          value={editingService.category}
                          onChange={(e) => setEditingService({ ...editingService, category: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs font-semibold"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300">Short Summary</label>
                      <textarea
                        rows={2}
                        value={editingService.shortDescription}
                        onChange={(e) => setEditingService({ ...editingService, shortDescription: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300">Detailed Description</label>
                      <textarea
                        rows={3}
                        value={editingService.detailedDescription}
                        onChange={(e) => setEditingService({ ...editingService, detailedDescription: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300">Offerings (one per line)</label>
                      <textarea
                        rows={3}
                        value={editingService.whatWeOfferRaw}
                        onChange={(e) => setEditingService({ ...editingService, whatWeOfferRaw: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs"
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setEditingService(null)}
                        className="px-4 py-2 rounded-xl bg-white/5 text-slate-300 text-xs font-semibold"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: FACILITIES MANAGEMENT                              */}
        {/* ========================================================= */}
        {activeTab === 'facilities' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-white font-outfit">Hospital Facilities &amp; Equipment</h3>
                <p className="text-xs text-slate-400">
                  Manage 7 ICU beds, on-premises Pharmacy, Diagnostic Laboratory, Physiotherapy, and X-Ray.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsAddingFacility(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Facility</span>
              </button>
            </div>

            {/* Facilities Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.facilities.map((fac) => (
                <div
                  key={fac.id}
                  className="rounded-2xl bg-slate-900 border border-white/10 p-4 space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-sky-500/15 text-sky-300 border border-sky-400/25">
                      {fac.category}
                    </span>
                    <h4 className="text-base font-bold text-white font-outfit">{fac.title}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">{fac.description}</p>
                    
                    {fac.features && (
                      <div className="pt-1">
                        <ul className="text-[11px] text-slate-300 space-y-0.5">
                          {fac.features.slice(0, 3).map((f, i) => (
                            <li key={i} className="flex items-center gap-1.5">
                              <CheckCircle2 className="w-3 h-3 text-sky-400 shrink-0" />
                              <span className="truncate">{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingFacility({
                          ...fac,
                          featuresRaw: (fac.features || []).join('\n'),
                        });
                      }}
                      className="inline-flex items-center gap-1 text-xs text-sky-400 hover:text-sky-300 font-bold"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>Edit</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm(`Delete facility "${fac.title}"?`)) {
                          deleteFacility(fac.id);
                          showToast('Facility deleted');
                        }
                      }}
                      className="inline-flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300 font-semibold"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Edit Facility Modal */}
            {editingFacility && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
                <div className="bg-slate-900 rounded-3xl max-w-lg w-full p-6 border border-white/10 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <h4 className="text-sm font-bold text-white">Edit Facility</h4>
                    <button onClick={() => setEditingFacility(null)} className="text-slate-400 hover:text-white">✕</button>
                  </div>

                  <form onSubmit={handleSaveFacilityEdit} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300">Facility Title</label>
                      <input
                        type="text"
                        value={editingFacility.title}
                        onChange={(e) => setEditingFacility({ ...editingFacility, title: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs font-semibold"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300">Category</label>
                      <input
                        type="text"
                        value={editingFacility.category}
                        onChange={(e) => setEditingFacility({ ...editingFacility, category: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300">Description</label>
                      <textarea
                        rows={3}
                        value={editingFacility.description}
                        onChange={(e) => setEditingFacility({ ...editingFacility, description: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300">Key Features (one per line)</label>
                      <textarea
                        rows={3}
                        value={editingFacility.featuresRaw}
                        onChange={(e) => setEditingFacility({ ...editingFacility, featuresRaw: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs"
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setEditingFacility(null)}
                        className="px-4 py-2 rounded-xl bg-white/5 text-slate-300 text-xs font-semibold"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold"
                      >
                        Save Facility
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Add Facility Modal */}
            {isAddingFacility && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
                <div className="bg-slate-900 rounded-3xl max-w-lg w-full p-6 border border-white/10 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <h4 className="text-sm font-bold text-white">Add New Clinical Facility</h4>
                    <button onClick={() => setIsAddingFacility(false)} className="text-slate-400 hover:text-white">✕</button>
                  </div>

                  <form onSubmit={handleCreateFacility} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300">Facility Title</label>
                      <input
                        type="text"
                        value={newFacilityForm.title}
                        onChange={(e) => setNewFacilityForm({ ...newFacilityForm, title: e.target.value })}
                        placeholder="e.g. EEG - Electro Encephalo Graphy"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs font-semibold"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300">Category</label>
                      <input
                        type="text"
                        value={newFacilityForm.category}
                        onChange={(e) => setNewFacilityForm({ ...newFacilityForm, category: e.target.value })}
                        placeholder="e.g. Brain Diagnostics"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300">Description</label>
                      <textarea
                        rows={3}
                        value={newFacilityForm.description}
                        onChange={(e) => setNewFacilityForm({ ...newFacilityForm, description: e.target.value })}
                        placeholder="Brief description of the facility equipment and clinical purpose..."
                        className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-300">Key Features (one per line)</label>
                      <textarea
                        rows={3}
                        value={newFacilityForm.featuresRaw}
                        onChange={(e) => setNewFacilityForm({ ...newFacilityForm, featuresRaw: e.target.value })}
                        placeholder="Digital brain wave monitoring&#10;Epilepsy diagnosis"
                        className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs"
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsAddingFacility(false)}
                        className="px-4 py-2 rounded-xl bg-white/5 text-slate-300 text-xs font-semibold"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold"
                      >
                        Add Facility
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 5: HOSPITAL INFO & TIMINGS                            */}
        {/* ========================================================= */}
        {activeTab === 'hospital' && (
          <div className="space-y-6">
            <div className="bg-slate-900/80 rounded-3xl p-6 sm:p-8 border border-white/10 shadow-xl space-y-6">
              <div className="border-b border-white/10 pb-4">
                <h3 className="text-xl font-bold text-white font-outfit">Hospital Information &amp; Timings</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Update hospital contact numbers, address, OPD consultation hours, and emergency status.
                </p>
              </div>

              <form onSubmit={handleSaveHospitalInfo} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300">Hospital Official Name</label>
                    <input
                      type="text"
                      value={hospitalForm.hospitalName}
                      onChange={(e) => setHospitalForm({ ...hospitalForm, hospitalName: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs font-semibold"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300">Official Email</label>
                    <input
                      type="email"
                      value={hospitalForm.email}
                      onChange={(e) => setHospitalForm({ ...hospitalForm, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs font-semibold"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300">Primary Phone (Call Link)</label>
                    <input
                      type="text"
                      value={hospitalForm.phone}
                      onChange={(e) => setHospitalForm({ ...hospitalForm, phone: e.target.value, phoneDisplay: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs font-semibold"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300">WhatsApp Number (e.g. 919448000000)</label>
                    <input
                      type="text"
                      value={hospitalForm.whatsappNumber}
                      onChange={(e) => setHospitalForm({ ...hospitalForm, whatsappNumber: e.target.value, whatsappDisplay: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs font-semibold"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300">OPD Morning Slot</label>
                    <input
                      type="text"
                      value={hospitalForm.opdSlot1}
                      onChange={(e) => setHospitalForm({ ...hospitalForm, opdSlot1: e.target.value })}
                      placeholder="10:00 AM – 4:00 PM"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs font-semibold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300">OPD Evening Slot</label>
                    <input
                      type="text"
                      value={hospitalForm.opdSlot2}
                      onChange={(e) => setHospitalForm({ ...hospitalForm, opdSlot2: e.target.value })}
                      placeholder="6:00 PM – 8:00 PM"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs font-semibold"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Emergency Care Status</label>
                  <input
                    type="text"
                    value={hospitalForm.emergency}
                    onChange={(e) => setHospitalForm({ ...hospitalForm, emergency: e.target.value })}
                    placeholder="Emergency Care Available"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs font-semibold"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300">Street / Area</label>
                    <input
                      type="text"
                      value={hospitalForm.street}
                      onChange={(e) => setHospitalForm({ ...hospitalForm, street: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300">Landmark</label>
                    <input
                      type="text"
                      value={hospitalForm.landmark}
                      onChange={(e) => setHospitalForm({ ...hospitalForm, landmark: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-300">City &amp; State</label>
                    <input
                      type="text"
                      value={hospitalForm.city}
                      onChange={(e) => setHospitalForm({ ...hospitalForm, city: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-300">Google Maps Link (Directions / Share URL)</label>
                  <input
                    type="url"
                    value={hospitalForm.googleMapsDirectionsUrl}
                    onChange={(e) => setHospitalForm({ ...hospitalForm, googleMapsDirectionsUrl: e.target.value })}
                    placeholder="https://share.google/kY37dzPJA6qIplc1D"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/40 border border-white/10 text-sky-400 font-mono text-xs font-medium"
                  />
                  <span className="text-[10px] text-slate-400 block">
                    Controls "Directions" on mobile bar, trust stats bar, and contact map buttons. Default: https://share.google/kY37dzPJA6qIplc1D
                  </span>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/30 transition-all cursor-pointer active:scale-95"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Hospital Info &amp; Timings</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 6: DANGER ZONE & RESET                                */}
        {/* ========================================================= */}
        {activeTab === 'danger' && (
          <div className="space-y-6">
            <div className="bg-slate-900/80 rounded-3xl p-6 sm:p-8 border border-white/10 shadow-xl space-y-6">
              <div className="border-b border-white/10 pb-4">
                <h3 className="text-xl font-bold text-white font-outfit">Data Maintenance &amp; Factory Reset</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Export backup configuration or reset data to original factory defaults.
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-xs font-bold text-white">Reset to Verified Hospital Defaults</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Clears custom modifications and restores original approved doctor data, timings, and facilities.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm('Are you sure you want to restore original verified hospital defaults?')) {
                        resetToDefaults();
                        showToast('Restored verified defaults');
                      }
                    }}
                    className="px-4 py-2 rounded-xl bg-rose-600/30 hover:bg-rose-600 text-rose-200 hover:text-white border border-rose-500/40 text-xs font-bold transition-colors cursor-pointer shrink-0"
                  >
                    Restore Defaults
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-xs font-bold text-white">Download JSON Backup</h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Download a complete copy of all current hospital content, services, facilities, and timings.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
                        JSON.stringify(data, null, 2)
                      )}`;
                      const downloadAnchor = document.createElement('a');
                      downloadAnchor.setAttribute('href', jsonString);
                      downloadAnchor.setAttribute('download', `masaraddi-neuro-data-${Date.now()}.json`);
                      document.body.appendChild(downloadAnchor);
                      downloadAnchor.click();
                      downloadAnchor.remove();
                      showToast('Backup downloaded');
                    }}
                    className="px-4 py-2 rounded-xl bg-sky-600/30 hover:bg-sky-600 text-sky-200 hover:text-white border border-sky-500/40 text-xs font-bold transition-colors cursor-pointer shrink-0"
                  >
                    Download Backup
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};
