import React, { useState } from 'react';
import { 
  Building, 
  BedDouble, 
  Pill, 
  FlaskConical, 
  Activity, 
  Scan, 
  ShieldAlert,
  ShieldPlus,
  HeartPulse,
  Stethoscope,
  Zap,
  Brain,
  Phone,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  MapPin
} from 'lucide-react';
import { useHospitalData } from '../context/HospitalContext.jsx';

export const FacilitiesSection = () => {
  const { data } = useHospitalData();
  const [activeTab, setActiveTab] = useState('all');

  const getFacilityIcon = (iconName) => {
    switch (iconName) {
      case 'BedDouble': return BedDouble;
      case 'Pill': return Pill;
      case 'FlaskConical': return FlaskConical;
      case 'Activity': return Activity;
      case 'Scan': return Scan;
      case 'ShieldAlert': return ShieldAlert;
      case 'ShieldPlus': return ShieldPlus;
      case 'HeartPulse': return HeartPulse;
      case 'Stethoscope': return Stethoscope;
      case 'Zap': return Zap;
      case 'Brain': return Brain;
      default: return Building;
    }
  };

  // Official confirmed brochure facility list
  const brochureFacilities = [
    '24 X 7 HI TECH ICU',
    'Operation Theater',
    'Physiotherapy',
    'Digital X-Ray',
    'Pharmacy',
    'Blood Lab',
    'Special Rooms / General Ward',
    'EEG - Electro Encephalo Graphy',
    'NCS - Nerve Conduction Study',
    'EMG - Electromyography'
  ];

  const filterTabs = [
    { id: 'all', label: 'All 10 Facilities', count: 10 },
    { id: 'critical', label: 'Critical Care & Wards', count: 3 },
    { id: 'diagnostics', label: 'Neuro Diagnostics', count: 4 },
    { id: 'support', label: 'Therapy & Services', count: 3 }
  ];

  const filteredFacilities = data.facilities.filter((fac) => {
    if (activeTab === 'critical') {
      return ['fac-icu', 'fac-ot', 'fac-special-rooms'].includes(fac.id);
    }
    if (activeTab === 'diagnostics') {
      return ['fac-eeg', 'fac-ncs', 'fac-emg', 'fac-xray'].includes(fac.id);
    }
    if (activeTab === 'support') {
      return ['fac-physiotherapy', 'fac-pharmacy', 'fac-laboratory'].includes(fac.id);
    }
    return true;
  });

  return (
    <section id="facilities" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-bold tracking-wide uppercase shadow-sm">
            <Building className="w-3.5 h-3.5 text-sky-600" />
            <span>Official Clinical Infrastructure in Bagalkot</span>
          </div>
          
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B132B] tracking-tight font-outfit">
            Hospital Facilities &amp; Diagnostic Units
          </h2>
          
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed">
            Equipped with on-site neuro-diagnostic equipment, intensive patient monitoring, surgical theater, and inpatient care under Dr. Shivkumar Masaraddi.
          </p>
        </div>

        {/* Official Brochure Highlight Card - Styled directly matching hospital brochure */}
        <div className="mt-10 sm:mt-12 bg-gradient-to-br from-[#0B172E] to-[#080E1A] rounded-3xl p-5 sm:p-8 text-white shadow-xl border border-sky-900/40 relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6 lg:gap-8">
            
            {/* Left: Official Brochure Header & Tag */}
            <div className="lg:w-1/3 space-y-3">
              <div className="inline-block bg-sky-500 text-white font-extrabold text-xs sm:text-sm tracking-wider uppercase px-4 py-1.5 rounded-lg shadow-md shadow-sky-600/30">
                FACILITIES
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-outfit text-white">
                Confirmed In-Hospital Capabilities
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Directly verified from Masaraddi Neuro Care Center's official hospital brochure for patient clinical guidance in Bagalkot.
              </p>
              
              <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                <a
                  href={`tel:${data.contact.phone}`}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold text-xs shadow-md shadow-sky-600/25 hover:from-sky-400 hover:to-blue-500 transition-all text-center"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Hospital: {data.contact.phoneDisplay}</span>
                </a>
                <a
                  href={data.contact?.googleMapsDirectionsUrl || "https://share.google/kY37dzPJA6qIplc1D"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 font-semibold text-xs border border-white/15 transition-all text-center"
                >
                  <MapPin className="w-3.5 h-3.5 text-sky-400" />
                  <span>Hospital Map</span>
                </a>
              </div>
            </div>

            {/* Right: 10 Bulleted Facilities with Official Orange Dots */}
            <div className="lg:w-2/3 bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 backdrop-blur-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                {brochureFacilities.map((facilityName, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] transition-colors border border-white/[0.06]"
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0 shadow-sm shadow-amber-400/50" />
                    <span className="text-xs sm:text-sm font-semibold text-slate-100 tracking-tight">
                      {facilityName}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Mobile & Desktop Interactive Filter Tabs */}
        <div className="mt-10 sm:mt-12 flex items-center justify-start sm:justify-center overflow-x-auto pb-2 scrollbar-none gap-2">
          {filterTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`shrink-0 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#0B132B] text-white shadow-md shadow-slate-900/20'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] ${
                  isActive ? 'bg-sky-500 text-white' : 'bg-slate-200 text-slate-600'
                }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Facilities Detailed Cards Grid */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7">
          {filteredFacilities.map((fac) => {
            const Icon = getFacilityIcon(fac.icon);
            return (
              <div
                key={fac.id}
                className="bg-[#F8FAFC] rounded-3xl overflow-hidden border border-slate-200/90 hover:border-sky-300 hover:shadow-xl hover:shadow-sky-500/10 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Facility Real Photo Header */}
                  {fac.image && (
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                      <img
                        src={fac.image}
                        alt={fac.altText || fac.title}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20 pointer-events-none" />
                      
                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                        <span className="text-[10px] font-bold text-sky-200 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-sky-400/30">
                          {fac.category}
                        </span>
                        <div className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md text-sky-700 flex items-center justify-center shadow-md">
                          <Icon className="w-4 h-4" />
                        </div>
                      </div>

                      {/* Photo Bottom Title on Mobile */}
                      <div className="absolute bottom-2.5 left-3 right-3 pointer-events-none sm:hidden">
                        <span className="text-xs font-bold text-white drop-shadow-md truncate block">
                          {fac.title}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Card Content Body */}
                  <div className="p-5 sm:p-6 space-y-3.5">
                    
                    {/* Header if no photo, or desktop title */}
                    {!fac.image && (
                      <div className="flex items-center justify-between">
                        <div className="w-11 h-11 rounded-2xl bg-white text-sky-600 border border-slate-200 shadow-sm flex items-center justify-center group-hover:bg-sky-600 group-hover:text-white transition-all">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-[11px] font-bold text-sky-700 bg-sky-100 border border-sky-200 px-3 py-0.5 rounded-full">
                          {fac.category}
                        </span>
                      </div>
                    )}

                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-[#0B132B] font-outfit group-hover:text-sky-600 transition-colors">
                        {fac.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                        {fac.description}
                      </p>
                    </div>

                    {/* Confirmed Features */}
                    {Array.isArray(fac.features) && fac.features.length > 0 && (
                      <div className="pt-1.5 space-y-1.5 border-t border-slate-200/70">
                        {fac.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0 mt-0.5" />
                            <span className="leading-tight">{feature}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Footnote Action */}
                <div className="p-5 pt-3 sm:px-6 sm:pb-6 border-t border-slate-200/60 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">Masaraddi Neuro Care</span>
                  <a
                    href={`tel:${data.contact.phone}`}
                    className="font-bold text-sky-600 hover:text-sky-700 inline-flex items-center gap-1 active:scale-95 transition-transform"
                    aria-label={`Inquire about ${fac.title}`}
                  >
                    <span>Inquire</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Emergency Care Callout Banner */}
        <div className="mt-12 sm:mt-14 bg-white rounded-3xl p-5 sm:p-8 border border-slate-200 shadow-md max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-6">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 mx-auto sm:mx-0">
              <ShieldAlert className="w-6 h-6 text-emerald-600" />
            </div>
            <div className="space-y-0.5">
              <h4 className="text-base font-bold text-[#0B132B] font-outfit">
                {data.contact.timings.emergency}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600">
                Contact our Bagalkot hospital desk directly for urgent neurological consultations and admissions.
              </p>
            </div>
          </div>

          <a
            href={`tel:${data.contact.phone}`}
            className="shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-sky-600/20 hover:scale-[1.02] active:scale-95 transition-all w-full sm:w-auto text-center"
          >
            <Phone className="w-4 h-4" />
            <span>Call Hospital Desk</span>
          </a>
        </div>

      </div>
    </section>
  );
};
