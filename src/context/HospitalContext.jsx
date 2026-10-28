import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { hospitalConfig } from '../config/hospitalConfig.js';

const STORAGE_KEY = 'masaraddi_persistent_data_v10';

const HospitalContext = createContext(undefined);

const normalizeFacilities = (facilitiesList) => {
  const fallback = Array.isArray(hospitalConfig.facilities) ? hospitalConfig.facilities : [];
  if (!Array.isArray(facilitiesList) || facilitiesList.length === 0) {
    return fallback;
  }
  const result = facilitiesList.map((fac) => {
    const confMatch = fallback.find((cf) => cf.id === fac.id);
    // If the cached facility has an older unsplash image while config has real photo, upgrade image
    if (confMatch && fac.image && fac.image.includes('images.unsplash.com') && confMatch.image.startsWith('/uploads/')) {
      return { ...fac, image: confMatch.image };
    }
    return fac;
  });
  fallback.forEach((confFac) => {
    const exists = result.some((f) => f.id === confFac.id || f.title?.toLowerCase() === confFac.title?.toLowerCase());
    if (!exists) {
      result.push(confFac);
    }
  });
  return result;
};

const normalizeGallery = (galleryList) => {
  if (!Array.isArray(galleryList) || galleryList.length === 0) {
    return hospitalConfig.gallery;
  }
  return galleryList.map((g) => {
    const configMatch = hospitalConfig.gallery.find((cg) => cg.id === g.id);
    const existingImages = Array.isArray(g.images) && g.images.length >= 2
      ? g.images
      : (configMatch?.images || [g.image || configMatch?.image].filter(Boolean));
    return {
      ...g,
      image: existingImages[0] || g.image,
      images: existingImages,
      interval: Number(g.interval) || 2000,
    };
  });
};

const normalizeHeroSlides = (slidesList) => {
  const fallback = Array.isArray(hospitalConfig.heroSlides) ? hospitalConfig.heroSlides : [];
  if (!Array.isArray(slidesList) || slidesList.length === 0) {
    return fallback;
  }
  const seenIds = new Set();
  return slidesList.map((s, idx) => {
    let id = s.id;
    if (!id || seenIds.has(id)) {
      id = `hero-${idx + 1}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
    }
    seenIds.add(id);
    return {
      ...s,
      id,
      objectPosition: s.objectPosition || 'center 40%',
    };
  });
};

export const updateBrowserFavicon = (logoUrl) => {
  if (typeof document === 'undefined') return;
  const url = logoUrl || '/logo.svg';

  // 1. Standard / Shortcut Icon
  let link = document.querySelector("link[rel~='icon']");
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
  }
  link.href = url;
  if (url.endsWith('.svg')) {
    link.type = 'image/svg+xml';
  } else if (url.endsWith('.png')) {
    link.type = 'image/png';
  } else if (url.endsWith('.ico')) {
    link.type = 'image/x-icon';
  } else if (url.endsWith('.webp')) {
    link.type = 'image/webp';
  }

  // 2. Apple Touch Icon
  let appleLink = document.querySelector("link[rel='apple-touch-icon']");
  if (!appleLink) {
    appleLink = document.createElement('link');
    appleLink.rel = 'apple-touch-icon';
    document.head.appendChild(appleLink);
  }
  appleLink.href = url;
};

export const HospitalProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed === 'object' && parsed.hospitalName) {
          const mergedLogo = parsed.branding?.logoUrl || parsed.logo || hospitalConfig.logo;
          return {
            ...hospitalConfig,
            ...parsed,
            logo: mergedLogo,
            branding: {
              ...hospitalConfig.branding,
              ...(parsed.branding || {}),
              logoUrl: mergedLogo,
            },
            contact: {
              ...hospitalConfig.contact,
              ...(parsed.contact || {}),
              address: {
                ...hospitalConfig.contact.address,
                ...(parsed.contact?.address || {}),
              },
              timings: {
                ...hospitalConfig.contact.timings,
                ...(parsed.contact?.timings || {}),
              },
            },
            doctors: Array.isArray(parsed.doctors) && parsed.doctors.length > 0 ? parsed.doctors : hospitalConfig.doctors,
            services: Array.isArray(parsed.services) && parsed.services.length > 0 ? parsed.services : hospitalConfig.services,
            facilities: normalizeFacilities(parsed.facilities),
            gallery: normalizeGallery(parsed.gallery),
            heroSlides: normalizeHeroSlides(parsed.heroSlides),
          };
        }
      }
    } catch (e) {
      console.warn('Failed to load cached hospital data:', e);
    }
    return hospitalConfig;
  });

  const [isLoading, setIsLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState(null); // { type: 'saving'|'success'|'error', message: string }

  // Synchronize browser favicon whenever logo changes
  useEffect(() => {
    const activeLogo = data?.branding?.logoUrl || data?.logo || '/logo.svg';
    updateBrowserFavicon(activeLogo);
  }, [data?.logo, data?.branding?.logoUrl]);

  // Fetch persistent data from backend API on mount
  useEffect(() => {
    let isMounted = true;
    const fetchBackendData = async () => {
      try {
        const res = await fetch('/api/hospital-data');
        if (res.ok) {
          const remoteData = await res.json();
          if (isMounted && remoteData && remoteData.hospitalName) {
            const mergedLogo = remoteData.branding?.logoUrl || remoteData.logo || hospitalConfig.logo;
            setData((prev) => ({
              ...prev,
              ...remoteData,
              logo: mergedLogo,
              branding: {
                ...hospitalConfig.branding,
                ...(prev.branding || {}),
                ...(remoteData.branding || {}),
                logoUrl: mergedLogo,
              },
              contact: {
                ...prev.contact,
                ...(remoteData.contact || {}),
                address: {
                  ...prev.contact.address,
                  ...(remoteData.contact?.address || {}),
                },
                timings: {
                  ...prev.contact.timings,
                  ...(remoteData.contact?.timings || {}),
                },
                googleMapsDirectionsUrl: remoteData.contact?.googleMapsDirectionsUrl || hospitalConfig.contact.googleMapsDirectionsUrl,
                googleMapsEmbedUrl: remoteData.contact?.googleMapsEmbedUrl || hospitalConfig.contact.googleMapsEmbedUrl,
              },
              doctors: Array.isArray(remoteData.doctors) && remoteData.doctors.length > 0 ? remoteData.doctors : prev.doctors,
              services: Array.isArray(remoteData.services) && remoteData.services.length > 0 ? remoteData.services : prev.services,
              facilities: normalizeFacilities(remoteData.facilities || prev.facilities),
              gallery: normalizeGallery(remoteData.gallery),
              heroSlides: normalizeHeroSlides(remoteData.heroSlides || prev.heroSlides),
            }));
            updateBrowserFavicon(mergedLogo);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(remoteData));
          }
        }
      } catch (err) {
        console.warn('Backend API unavailable, using local cache:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchBackendData();
    return () => { isMounted = false; };
  }, []);

  // Save data to backend and local storage
  const persistData = useCallback(async (updatedData) => {
    setData(updatedData);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }

    setSaveStatus({ type: 'saving', message: 'Saving changes...' });
    try {
      const res = await fetch('/api/hospital-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });

      if (res.ok) {
        setSaveStatus({ type: 'success', message: 'All changes saved & updated on live website!' });
        setTimeout(() => setSaveStatus(null), 3500);
        return { success: true };
      } else {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'Server error');
      }
    } catch (err) {
      console.warn('Backend persistence error (data saved locally):', err);
      setSaveStatus({ type: 'success', message: 'Changes saved locally (offline mode active)' });
      setTimeout(() => setSaveStatus(null), 3500);
      return { success: true, offline: true };
    }
  }, []);

  // Upload image to backend persistent storage (supports File, Blob, or base64 data string)
  const uploadImage = useCallback(async (fileOrBase64, customName = 'upload.jpg') => {
    if (!fileOrBase64) throw new Error('No image file or data provided');

    let base64String = '';
    let fileName = customName;

    if (typeof fileOrBase64 === 'string') {
      base64String = fileOrBase64;
    } else if (fileOrBase64 instanceof Blob || (typeof File !== 'undefined' && fileOrBase64 instanceof File)) {
      fileName = fileOrBase64.name || customName;
      // Read as base64
      base64String = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(new Error('Failed to read image file'));
        reader.readAsDataURL(fileOrBase64);
      });
    } else {
      throw new Error('Unsupported image format');
    }

    // Send to backend upload API
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: base64String,
          name: fileName,
        }),
      });

      if (res.ok) {
        const json = await res.json();
        if (json && json.url) {
          return json.url;
        }
      }
      const errJson = await res.json().catch(() => ({}));
      throw new Error(errJson.error || 'Upload request failed');
    } catch (err) {
      console.warn('Backend upload failed, utilizing direct data URL fallback:', err);
      // Fallback: return base64 string directly so it always succeeds
      return base64String;
    }
  }, []);

  // Reset to original factory defaults
  const resetToDefaults = useCallback(async () => {
    try {
      await fetch('/api/reset-defaults', { method: 'POST' });
    } catch (e) {}
    localStorage.removeItem(STORAGE_KEY);
    setData(hospitalConfig);
    setSaveStatus({ type: 'success', message: 'Reset to verified defaults!' });
    setTimeout(() => setSaveStatus(null), 3500);
  }, []);

  // 1. Doctor updates
  const updateDoctor = useCallback((id, updated) => {
    setData((prev) => {
      const updatedDoctors = prev.doctors.map((doc) =>
        doc.id === id ? { ...doc, ...updated } : doc
      );
      const nextData = { ...prev, doctors: updatedDoctors };
      persistData(nextData);
      return nextData;
    });
  }, [persistData]);

  // 2. Service updates
  const updateService = useCallback((id, updated) => {
    setData((prev) => {
      const updatedServices = prev.services.map((srv) =>
        srv.id === id ? { ...srv, ...updated } : srv
      );
      const nextData = { ...prev, services: updatedServices };
      persistData(nextData);
      return nextData;
    });
  }, [persistData]);

  const addService = useCallback((newService) => {
    setData((prev) => {
      const item = {
        ...newService,
        id: `srv-${Date.now()}`,
        whatWeOffer: Array.isArray(newService.whatWeOffer) ? newService.whatWeOffer : [],
        commonSymptoms: Array.isArray(newService.commonSymptoms) ? newService.commonSymptoms : [],
      };
      const nextData = { ...prev, services: [...prev.services, item] };
      persistData(nextData);
      return nextData;
    });
  }, [persistData]);

  const deleteService = useCallback((id) => {
    setData((prev) => {
      const nextData = { ...prev, services: prev.services.filter((s) => s.id !== id) };
      persistData(nextData);
      return nextData;
    });
  }, [persistData]);

  // 3. Facility updates
  const updateFacility = useCallback((id, updated) => {
    setData((prev) => {
      const updatedFacilities = prev.facilities.map((fac) =>
        fac.id === id ? { ...fac, ...updated } : fac
      );
      const nextData = { ...prev, facilities: updatedFacilities };
      persistData(nextData);
      return nextData;
    });
  }, [persistData]);

  const addFacility = useCallback((newFacility) => {
    setData((prev) => {
      const item = {
        ...newFacility,
        id: `fac-${Date.now()}`,
        features: Array.isArray(newFacility.features) ? newFacility.features : [],
      };
      const nextData = { ...prev, facilities: [...prev.facilities, item] };
      persistData(nextData);
      return nextData;
    });
  }, [persistData]);

  const deleteFacility = useCallback((id) => {
    setData((prev) => {
      const nextData = { ...prev, facilities: prev.facilities.filter((f) => f.id !== id) };
      persistData(nextData);
      return nextData;
    });
  }, [persistData]);

  // 4. Gallery updates (supports multiple changing images)
  const addGalleryItem = useCallback((item) => {
    setData((prev) => {
      const imagesList = Array.isArray(item.images) && item.images.length > 0
        ? item.images
        : (item.image ? [item.image] : []);
      const newItem = {
        ...item,
        id: `gal-${Date.now()}`,
        image: imagesList[0] || item.image || '',
        images: imagesList,
        interval: item.interval || 2000,
      };
      const nextData = { ...prev, gallery: [newItem, ...prev.gallery] };
      persistData(nextData);
      return nextData;
    });
  }, [persistData]);

  const updateGalleryItem = useCallback((id, updated) => {
    setData((prev) => {
      const updatedGallery = prev.gallery.map((g) => {
        if (g.id !== id) return g;
        const imagesList = Array.isArray(updated.images) && updated.images.length > 0
          ? updated.images
          : (updated.image ? [updated.image] : (g.images || [g.image]));
        return {
          ...g,
          ...updated,
          image: imagesList[0] || updated.image || g.image,
          images: imagesList,
          interval: updated.interval || g.interval || 2000,
        };
      });
      const nextData = { ...prev, gallery: updatedGallery };
      persistData(nextData);
      return nextData;
    });
  }, [persistData]);

  const deleteGalleryItem = useCallback((id) => {
    setData((prev) => {
      const nextData = { ...prev, gallery: prev.gallery.filter((g) => g.id !== id) };
      persistData(nextData);
      return nextData;
    });
  }, [persistData]);

  // 5. Hero slide operations (Upload, Replace, Delete, Reorder)
  const addHeroSlide = useCallback((newSlide) => {
    setData((prev) => {
      const { id: _ignore, ...slideData } = newSlide || {};
      const uniqueId = `hero-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      const slide = {
        title: 'Specialized Neurological Care',
        caption: 'Masaraddi Neuro Care Center, Bagalkot',
        altText: 'Hero image',
        tag: 'Clinical Facility',
        objectPosition: 'center 40%',
        ...slideData,
        id: uniqueId,
      };
      const updatedSlides = [...(prev.heroSlides || []), slide];
      const nextData = { ...prev, heroSlides: updatedSlides };
      persistData(nextData);
      return nextData;
    });
  }, [persistData]);

  const updateHeroSlide = useCallback((id, updated) => {
    setData((prev) => {
      const updatedSlides = (prev.heroSlides || []).map((s) =>
        s.id === id ? { ...s, ...updated } : s
      );
      const nextData = { ...prev, heroSlides: updatedSlides };
      persistData(nextData);
      return nextData;
    });
  }, [persistData]);

  const replaceHeroImage = useCallback((id, newUrl, newAltText) => {
    setData((prev) => {
      const updatedSlides = (prev.heroSlides || []).map((s) => {
        if (s.id !== id) return s;
        return {
          ...s,
          url: newUrl,
          ...(newAltText ? { altText: newAltText } : {}),
        };
      });
      const nextData = { ...prev, heroSlides: updatedSlides };
      persistData(nextData);
      return nextData;
    });
  }, [persistData]);

  const deleteHeroSlide = useCallback((id) => {
    setData((prev) => {
      if ((prev.heroSlides || []).length <= 1) {
        console.warn('Cannot delete the only hero slide.');
        return prev;
      }
      const updatedSlides = (prev.heroSlides || []).filter((s) => s.id !== id);
      const nextData = { ...prev, heroSlides: updatedSlides };
      persistData(nextData);
      return nextData;
    });
  }, [persistData]);

  const reorderHeroSlides = useCallback((newSlides) => {
    if (!Array.isArray(newSlides) || newSlides.length === 0) return;
    const normalized = normalizeHeroSlides(newSlides);
    setData((prev) => {
      const nextData = { ...prev, heroSlides: normalized };
      persistData(nextData);
      return nextData;
    });
  }, [persistData]);

  const moveHeroSlide = useCallback((index, direction) => {
    setData((prev) => {
      const list = [...(prev.heroSlides || [])];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= list.length) return prev;
      
      const temp = list[index];
      list[index] = list[targetIndex];
      list[targetIndex] = temp;

      const nextData = { ...prev, heroSlides: list };
      persistData(nextData);
      return nextData;
    });
  }, [persistData]);

  const resetHeroSlidesToDefaults = useCallback(() => {
    setData((prev) => {
      const nextData = { ...prev, heroSlides: hospitalConfig.heroSlides };
      persistData(nextData);
      return nextData;
    });
  }, [persistData]);

  // 6. Hospital Info updates
  const updateHospitalInfo = useCallback((info) => {
    setData((prev) => {
      const nextData = {
        ...prev,
        ...(info.hospitalName && { hospitalName: info.hospitalName }),
        ...(info.tagline && { tagline: info.tagline }),
        ...(info.headline && { headline: info.headline }),
        ...(info.supportingText && { supportingText: info.supportingText }),
        contact: {
          ...prev.contact,
          ...(info.contact || {}),
          address: {
            ...prev.contact.address,
            ...(info.contact?.address || {}),
          },
          timings: {
            ...prev.contact.timings,
            ...(info.contact?.timings || {}),
          },
        },
      };
      persistData(nextData);
      return nextData;
    });
  }, [persistData]);

  // 7. Dynamic Website Logo & Branding updates
  const updateLogo = useCallback((logoUrl, logoAlt = '') => {
    setData((prev) => {
      const nextData = {
        ...prev,
        logo: logoUrl,
        branding: {
          ...(prev.branding || {}),
          logoUrl,
          logoAlt: logoAlt || prev.branding?.logoAlt || `${prev.hospitalName} Logo`,
          updatedAt: new Date().toISOString(),
        },
      };
      persistData(nextData);
      updateBrowserFavicon(logoUrl);
      return nextData;
    });
  }, [persistData]);

  const resetLogoToDefault = useCallback(() => {
    return updateLogo(hospitalConfig.logo, hospitalConfig.branding.logoAlt);
  }, [updateLogo]);

  return (
    <HospitalContext.Provider
      value={{
        data,
        isLoading,
        saveStatus,
        persistData,
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
      }}
    >
      {children}
    </HospitalContext.Provider>
  );
};

export const useHospitalData = () => {
  const context = useContext(HospitalContext);
  if (!context) {
    throw new Error('useHospitalData must be used within a HospitalProvider');
  }
  return context;
};
