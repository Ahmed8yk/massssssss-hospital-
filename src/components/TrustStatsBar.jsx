import React from 'react';
import { ShieldCheck, MapPin, Stethoscope, BedDouble, Award } from 'lucide-react';
import { useHospitalData } from '../context/HospitalContext.jsx';

export const TrustStatsBar = () => {
  const { data } = useHospitalData();
  const doctor = data.doctors[0];

  return (
    <section className="relative z-20 -mt-6 sm:-mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-3xl p-5 sm:p-7 lg:p-8 shadow-[0_20px_50px_rgba(15,23,42,0.08)] border border-slate-200/80 transition-all duration-300">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 lg:divide-x divide-slate-100">
          
          {/* Stat 1: Verified Specialist Doctor */}
          <div className="flex items-center gap-3.5 pt-3 first:pt-0 sm:pt-0 lg:px-3">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center shrink-0">
              <Stethoscope className="w-5 h-5 sm:w-6 sm:h-6 text-sky-600" />
            </div>
            <div className="min-w-0">
              <div className="text-sm sm:text-base font-extrabold text-[#0B132B] font-outfit truncate">
                {doctor?.name || 'Dr. Shivkumar Masaraddi'}
              </div>
              <p className="text-xs font-semibold text-sky-700 truncate mt-0.5">
                {doctor?.qualificationsSummary || 'MBBS, MD (Gen Med), DM (Neuro)'}
              </p>
              <p className="text-[11px] text-slate-500">
                Consultant Neurologist
              </p>
            </div>
          </div>

          {/* Stat 2: Verified Clinical Experience */}
          <div className="flex items-center gap-3.5 pt-3 sm:pt-0 lg:px-3">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
            </div>
            <div className="min-w-0">
              <div className="text-sm sm:text-base font-extrabold text-[#0B132B] font-outfit">
                {doctor?.experience || '12+ Years Experience'}
              </div>
              <p className="text-xs font-semibold text-slate-700 mt-0.5">
                Clinical Medical Practice
              </p>
              <p className="text-[11px] text-slate-500">
                Practicing Since 2014
              </p>
            </div>
          </div>

          {/* Stat 3: 7 ICU Confirmed in Form */}
          <div className="flex items-center gap-3.5 pt-3 sm:pt-0 lg:px-3">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
              <BedDouble className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
            </div>
            <div className="min-w-0">
              <div className="text-sm sm:text-base font-extrabold text-[#0B132B] font-outfit">
                7 ICU &amp; Inpatient Care
              </div>
              <p className="text-xs font-semibold text-slate-700 mt-0.5">
                24x7 Emergency Monitoring
              </p>
              <p className="text-[11px] text-slate-500">
                General Wards &amp; Special Rooms
              </p>
            </div>
          </div>

          {/* Stat 4: Verified Location */}
          <div className="flex items-center gap-3.5 pt-3 sm:pt-0 lg:px-3">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />
            </div>
            <div className="min-w-0">
              <div className="text-sm sm:text-base font-extrabold text-[#0B132B] font-outfit">
                Bagalkot, Karnataka
              </div>
              <p className="text-xs font-semibold text-slate-700 mt-0.5 truncate">
                Near Rotary Circle, beside Kailash- In Hotel
              </p>
              <a
                href={data.contact?.googleMapsDirectionsUrl || "https://share.google/kY37dzPJA6qIplc1D"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-bold text-sky-600 hover:underline inline-flex items-center gap-1"
              >
                <span>Open in Google Maps</span>
                <span>&rarr;</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
