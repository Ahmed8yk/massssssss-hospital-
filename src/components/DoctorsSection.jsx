import React from 'react';
import { Award, Clock, Phone, GraduationCap, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useHospitalData } from '../context/HospitalContext.jsx';

export const DoctorsSection = () => {
  const { data } = useHospitalData();
  const doctor = data.doctors[0] || {
    name: 'Dr. Shivkumar Masaraddi',
    specialization: 'Neurology',
    qualificationsList: [
      'MBBS — J.N. Medical College, Belagavi',
      'MD — General Medicine, NHL Municipal Medical College, Ahmedabad',
      'DM — Neurology, Bangur Institute of Neurosciences, IPGMER, Kolkata',
    ],
    qualificationsSummary: 'MBBS, MD (General Medicine), DM (Neurology)',
    experience: '12+ Years of Experience',
    bio: '',
    timings: '10:00 AM – 4:00 PM & 6:00 PM – 8:00 PM',
    image: '',
    departments: ['Complete Neurological Services', 'Stroke Care', 'Epilepsy & Seizures'],
  };

  return (
    <section id="doctors" className="py-24 bg-[#F8FAFC] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with local SEO keywords */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100/80 border border-sky-200 text-sky-800 text-xs font-bold tracking-wide uppercase shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
            <span>Neurologist in Bagalkot</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B132B] tracking-tight font-outfit">
            Medical Leadership &amp; Specialist Profile
          </h2>
          
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Direct clinical neurology consultations, reflex examinations, and individualized treatment planning under {doctor.name}.
          </p>
        </div>

        {/* Doctor Profile Card */}
        <div className="mt-14 max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-[0_15px_40px_rgba(0,0,0,0.04)]">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              
              {/* Doctor Photo & Badges */}
              <div className="md:col-span-4 flex flex-col items-center text-center">
                <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-3xl overflow-hidden border-4 border-white shadow-xl bg-slate-100 mb-4">
                  <img
                    src={doctor.image}
                    alt={`${doctor.name} - Neurologist in Bagalkot`}
                    className="w-full h-full object-cover object-top"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#080E1A] to-transparent p-2">
                    <span className="text-xs text-white font-bold block">MBBS, MD (General Medicine), DM (Neurology)</span>
                  </div>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
                  <Award className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{doctor.experience}</span>
                </div>
              </div>

              {/* Doctor Details & Verified Qualifications */}
              <div className="md:col-span-8 space-y-6">
                
                <div>
                  <span className="text-xs font-bold text-sky-700 bg-sky-50 border border-sky-200 px-3 py-1 rounded-full uppercase tracking-wider">
                    {doctor.specialization} &bull; Bagalkot
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B132B] font-outfit mt-2">
                    {doctor.name}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">
                    {doctor.qualificationsSummary}
                  </p>
                </div>

                {/* Verified Medical Qualifications */}
                <div className="space-y-2.5 p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200/80">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0B132B] uppercase tracking-wider">
                    <GraduationCap className="w-4 h-4 text-sky-600" />
                    <span>Verified Qualifications &amp; Training:</span>
                  </div>
                  <ul className="space-y-1.5 pt-1">
                    {doctor.qualificationsList.map((qual, index) => (
                      <li key={index} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{qual}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Professional Bio */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {doctor.bio}
                </p>

                {/* OPD Timings Display */}
                <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0B132B]">
                    <Clock className="w-4 h-4 text-sky-600 shrink-0" />
                    <span>OPD Consultation Timings:</span>
                  </div>
                  <span className="text-xs sm:text-sm font-extrabold text-sky-900 bg-white px-3 py-1 rounded-xl border border-sky-200/80">
                    {doctor.timings}
                  </span>
                </div>

                {/* Call to Consult CTA */}
                <div className="pt-2">
                  <a
                    href={`tel:${data.contact.phone}`}
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-sky-600/25 transition-all hover:scale-[1.01]"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call to Check Doctor Availability &amp; Schedule Visit</span>
                  </a>
                  <p className="text-[11px] text-slate-500 text-center mt-2">
                    Consultations are scheduled via direct phone call.
                  </p>
                </div>

              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
