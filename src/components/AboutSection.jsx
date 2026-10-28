import React from 'react';
import { 
  MapPin, 
  CheckCircle2, 
  ShieldCheck, 
  HeartHandshake, 
  Activity,
  BedDouble
} from 'lucide-react';
import { useHospitalData } from '../context/HospitalContext.jsx';

export const AboutSection = () => {
  const { data } = useHospitalData();
  const doctor = data.doctors[0];

  const clinicalPillars = [
    {
      icon: ShieldCheck,
      title: 'Neurologist in Bagalkot',
      desc: `Led by ${doctor?.name || 'Dr. Shivkumar Masaraddi'} with DM in Neurology and ${doctor?.experience || '12+ years'} of specialized clinical expertise.`,
      badgeColor: 'bg-sky-50 text-sky-600 border-sky-100',
    },
    {
      icon: Activity,
      title: 'Dedicated Stroke & Epilepsy Care',
      desc: 'Structured clinical protocols for acute stroke stabilization, secondary prevention, and long-term seizure management.',
      badgeColor: 'bg-indigo-50 text-indigo-600 border-indigo-100',
    },
    {
      icon: BedDouble,
      title: '7 ICU & Inpatient Facilities',
      desc: 'Equipped with 7 ICU beds and clinical patient observation wards for attentive neurological monitoring in Bagalkot.',
      badgeColor: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    },
    {
      icon: HeartHandshake,
      title: 'Patient-First Clinical Care',
      desc: 'Comprehensive clinical evaluations, cranial nerve testing, reflex examinations, and individualized treatment roadmaps.',
      badgeColor: 'bg-amber-50 text-amber-600 border-amber-100',
    },
  ];

  const confirmedCapabilities = [
    "Complete Neurological Services in Bagalkot",
    "Dedicated Stroke Care & Neuro-Rehabilitation",
    "Epilepsy & Seizure Assessment",
    "7 ICU Patient Monitoring Beds",
    "On-site Pharmacy & Diagnostic Lab",
    "Physiotherapy & X-Ray Facilities"
  ];

  return (
    <section className="py-20 bg-[#F8FAFC] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with local SEO keywords */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100/80 border border-sky-200 text-sky-800 text-xs font-bold tracking-wide uppercase shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
            <span>Neurology Hospital in Bagalkot</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B132B] tracking-tight font-outfit">
            {data.hospitalName}
          </h2>
          
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            {data.established} in Bagalkot, offering structured clinical consultations, specialized nerve and brain evaluations, and 7 ICU beds for inpatient care across North Karnataka.
          </p>
        </div>

        {/* 2-Column Content Grid: Story & Visual Highlights */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Hospital Overview Card */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.03)] space-y-6">
              
              <div className="flex items-start gap-4">
                <img
                  src={data.logo || "/logo.png"}
                  alt="Masaraddi Neuro Care Centre Official Seal"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-sky-400/40 bg-white shadow-md shadow-sky-500/15 shrink-0"
                />
                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-sky-600 uppercase tracking-wider block">
                    Clinical Mission &amp; Specialist Leadership
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#0B132B] font-outfit">
                    Patient-Centered Neurological Care in Bagalkot &amp; Surrounding Taluks
                  </h3>
                </div>
              </div>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {data.hospitalName} is a specialized neuro care center established in May 2025. Headed by Neurologist {doctor?.name} ({doctor?.qualificationsSummary}), the center is committed to providing evidence-based outpatient consultations, acute stroke care, epilepsy management, and inpatient monitoring for patients in Bagalkot, Navanagar, Badami, Jamkhandi, Mudhol, Ilkal, and neighboring regions.
              </p>

              {/* Confirmed Capabilities */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {confirmedCapabilities.map((item, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-100"
                  >
                    <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                    <span className="text-xs font-semibold text-slate-700 leading-snug">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              {/* Verified Location Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-sky-50 to-indigo-50 border border-sky-100/80 flex items-start gap-3">
                <MapPin className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <div className="text-xs text-slate-700">
                  <span className="font-bold text-[#0B132B] block">Hospital Location in Bagalkot</span>
                  {data.contact.address.full}
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: 4 Pillars */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {clinicalPillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <div
                  key={i}
                  className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-[0_4px_16px_rgba(0,0,0,0.02)] hover:border-sky-200 transition-all duration-200"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border ${p.badgeColor}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm sm:text-base font-bold text-[#0B132B] font-outfit">
                        {p.title}
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {p.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
