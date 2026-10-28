import React, { useState, useEffect } from 'react';
import { useHospitalData } from '../context/HospitalContext.jsx';

/**
 * HospitalLogo - Dynamic, Global Logo Component for Masaraddi Neuro Care Centre
 * 
 * - Seamlessly binds to the centralized `HospitalContext` logo/branding state.
 * - Updates automatically across Navbar, Footer, Mobile Drawer, Hero, Admin, and Dialogs.
 * - Supports custom image uploads (PNG, SVG, WebP, JPG, ICO) while preventing distortion.
 * - Gracefully falls back to the official high-resolution vector emblem if loading fails.
 */
export const HospitalLogo = ({ 
  src, 
  className = "w-10 h-10", 
  alt,
  priority = false,
  containerClassName = ""
}) => {
  const context = useHospitalData();
  const contextData = context?.data;

  // Active logo source: priority to prop (for previews), then backend data, then default SVG
  const activeLogo = src || contextData?.branding?.logoUrl || contextData?.logo || '/logo.svg';
  const altText = alt || contextData?.branding?.logoAlt || contextData?.hospitalName || "Masaraddi Neuro Care Centre Logo";

  const [hasError, setHasError] = useState(false);

  // Reset error state whenever the target image source changes
  useEffect(() => {
    setHasError(false);
  }, [activeLogo]);

  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 rounded-full select-none overflow-hidden ${className} ${containerClassName}`}>
      {!hasError ? (
        <img
          src={activeLogo}
          alt={altText}
          className="w-full h-full object-contain rounded-full transition-transform duration-200"
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onError={() => setHasError(true)}
        />
      ) : (
        /* Fallback authentic vector SVG seal */
        <svg
          viewBox="0 0 500 500"
          className="w-full h-full rounded-full"
          xmlns="http://www.w3.org/2000/svg"
          aria-label={altText}
        >
          <circle cx="250" cy="250" r="248" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />
          <circle cx="250" cy="250" r="242" fill="#1558A6" />
          <path d="M 28 320 A 242 242 0 0 0 472 320 C 475 345, 460 365, 435 375 C 385 435, 320 480, 250 480 C 180 480, 115 435, 65 375 C 40 365, 25 345, 28 320 Z" fill="#880E14" />
          <circle cx="250" cy="250" r="165" fill="#EEF2F6" stroke="#FFFFFF" strokeWidth="6" />
          <path id="fb-arc-top-fb" d="M 68 335 A 202 202 0 1 1 432 335" fill="none" />
          <path id="fb-arc-bottom-fb" d="M 95 330 A 205 205 0 0 0 405 330" fill="none" />
          <text fill="#FFFFFF" fontFamily="'Outfit', system-ui, sans-serif" fontWeight="900" fontSize="44" letterSpacing="18">
            <textPath href="#fb-arc-top-fb" startOffset="50%" textAnchor="middle">MASARADDI</textPath>
          </text>
          <text fill="#FFFFFF" fontFamily="'Outfit', system-ui, sans-serif" fontWeight="800" fontSize="29" letterSpacing="7">
            <textPath href="#fb-arc-bottom-fb" startOffset="50%" textAnchor="middle">NEURO CARE CENTRE</textPath>
          </text>
          <g clipPath="url(#fb-inner-clip)">
            <clipPath id="fb-inner-clip">
              <circle cx="250" cy="250" r="162" />
            </clipPath>
            <path d="M 130 315 C 155 310, 185 285, 195 245 C 180 205, 182 155, 215 130 C 230 118, 255 116, 275 125 C 295 135, 305 155, 306 170 C 305 178, 300 182, 302 186 C 305 190, 326 195, 335 198 C 336 200, 331 204, 324 207 C 317 210, 314 213, 317 216 C 322 220, 321 224, 314 227 C 310 229, 312 234, 318 238 C 321 241, 317 246, 308 247 C 296 248, 280 256, 273 268 C 265 280, 275 295, 290 300 C 315 308, 345 312, 370 315" fill="none" stroke="#1558A6" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
            <ellipse cx="255" cy="170" rx="35" ry="30" fill="#880E14" />
            <path d="M 235 220 C 238 250, 240 280, 242 320 C 243 350, 240 380, 236 410" fill="none" stroke="#1558A6" strokeWidth="4" />
            <path d="M 254 225 C 255 255, 256 285, 253 320 C 250 350, 246 380, 242 410" fill="none" stroke="#1558A6" strokeWidth="4" />
            <circle cx="245" cy="235" r="5" fill="#880E14" />
            <circle cx="245" cy="250" r="5" fill="#880E14" />
            <circle cx="245.5" cy="265" r="5" fill="#880E14" />
            <circle cx="246" cy="280" r="5" fill="#880E14" />
            <circle cx="245.5" cy="298" r="4.8" fill="#880E14" />
            <circle cx="244.5" cy="318" r="4.5" fill="#880E14" />
            <circle cx="243" cy="340" r="4.2" fill="#880E14" />
            <circle cx="241" cy="362" r="3.8" fill="#880E14" />
            <circle cx="239" cy="382" r="3.4" fill="#880E14" />
          </g>
        </svg>
      )}
    </div>
  );
};
