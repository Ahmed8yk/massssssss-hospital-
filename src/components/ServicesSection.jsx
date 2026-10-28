import React, { useState } from 'react';
import { 
  Activity, 
  Zap, 
  Brain, 
  ShieldAlert, 
  CheckCircle2, 
  ArrowRight, 
  Phone, 
  FileText, 
  HeartPulse,
  Stethoscope,
  BedDouble
} from 'lucide-react';
import { useHospitalData } from '../context/HospitalContext.jsx';

export const ServicesSection = () => {
  const { data } = useHospitalData();
  const [selectedService, setSelectedService] = useState(null);

  const getServiceIcon = (iconName) => {
    switch (iconName) {
      case 'Brain': return Brain;
      case 'Activity': return Activity;
      case 'ShieldAlert': return ShieldAlert;
      case 'Zap': return Zap;
      case 'FileText': return FileText;
      case 'HeartPulse': return HeartPulse;
      case 'Stethoscope': return Stethoscope;
      case 'BedDouble': return BedDouble;
      default: return Brain;
    }
  };

  return (
    <section id="services" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with local SEO keywords */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-bold tracking-wide uppercase shadow-sm">
            <Activity className="w-3.5 h-3.5 text-sky-600" />
            <span>Neurology Services in Bagalkot</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B132B] tracking-tight font-outfit">
            Neurological Services &amp; Clinical Care
          </h2>
          
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Specialized outpatient evaluations, stroke assessment and rehabilitation, epilepsy care, and inpatient neuro-monitoring in Bagalkot.
          </p>
        </div>

        {/* Services Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {data.services.map((service) => {
            const Icon = getServiceIcon(service.icon);
            return (
              <div
                key={service.id}
                className={`rounded-3xl p-7 border transition-all duration-300 flex flex-col justify-between group ${
                  service.isPrimaryConfirmed
                    ? 'bg-gradient-to-b from-sky-50/50 to-white border-sky-200/90 shadow-[0_10px_30px_rgba(14,165,233,0.06)] hover:border-sky-400'
                    : 'bg-[#F8FAFC] border-slate-200/80 hover:border-sky-300 hover:shadow-lg'
                }`}
              >
                <div className="space-y-4">
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-white text-sky-600 border border-slate-200/80 shadow-sm flex items-center justify-center group-hover:bg-sky-600 group-hover:text-white group-hover:border-sky-600 transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    {service.isPrimaryConfirmed ? (
                      <span className="text-[11px] font-bold text-sky-700 bg-sky-100/90 border border-sky-300/80 px-3 py-1 rounded-full">
                        Confirmed Focus Area
                      </span>
                    ) : (
                      <span className="text-[11px] font-bold text-slate-600 bg-slate-100 border border-slate-200 px-3 py-1 rounded-full">
                        {service.category}
                      </span>
                    )}
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-[#0B132B] font-outfit group-hover:text-sky-600 transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                      {service.shortDescription}
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="pt-2 space-y-1.5">
                    {service.whatWeOffer.slice(0, 3).map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action Footnotes */}
                <div className="pt-6 mt-6 border-t border-slate-200/60 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedService(service)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 hover:text-sky-700 group-hover:translate-x-0.5 transition-transform cursor-pointer"
                  >
                    <span>View Clinical Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={`tel:${data.contact.phone}`}
                    className="p-2 rounded-xl bg-white hover:bg-sky-50 text-slate-700 hover:text-sky-600 border border-slate-200/80 shadow-sm transition-colors"
                    title="Inquire by phone"
                  >
                    <Phone className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Appointment Process Banner (Call-focused) */}
        <div className="mt-14 rounded-3xl bg-[#080E1A] p-8 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold text-sky-400 uppercase tracking-wider block">
              Appointment Process
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-outfit text-white">
              Book a Consultation with Dr. Shivkumar Masaraddi
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Call the hospital to check doctor availability and schedule your visit. OPD hours: {data.contact.timings.opdSlot1} &bull; {data.contact.timings.opdSlot2}.
            </p>
          </div>

          <div className="shrink-0 flex flex-wrap items-center gap-3">
            <a
              href={`tel:${data.contact.phone}`}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-sky-600/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Call Hospital Desk</span>
            </a>
            <a
              href={`https://wa.me/${data.contact.whatsappNumber}?text=${encodeURIComponent(
                data.contact.whatsappMessage
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs sm:text-sm border border-slate-700 transition-all"
            >
              <span>WhatsApp Inquiry</span>
            </a>
          </div>
        </div>

      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setSelectedService(null)}
          aria-modal="true"
          role="dialog"
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full p-5 sm:p-8 space-y-5 shadow-2xl border border-slate-100 max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
                  {selectedService.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#0B132B] font-outfit">
                  {selectedService.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedService(null)}
                className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              {selectedService.detailedDescription}
            </p>

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-[#0B132B] uppercase tracking-wider">
                Clinical Care Components:
              </h4>
              <ul className="space-y-2">
                {selectedService.whatWeOffer.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {selectedService.commonSymptoms && selectedService.commonSymptoms.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Common Evaluated Symptoms:
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedService.commonSymptoms.map((sym, i) => (
                    <span key={i} className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-xl">
                      {sym}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="p-4 rounded-2xl bg-sky-50 border border-sky-100 text-xs text-slate-700 space-y-1">
              <span className="font-bold text-[#0B132B] block">OPD Consultation &amp; Booking:</span>
              <p>Consultations are held at {data.contact.address.full}. Please call the hospital to confirm current availability before visiting.</p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <a
                href={`tel:${data.contact.phone}`}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold text-xs shadow-md shadow-sky-600/30 transition-all hover:scale-[1.02]"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Hospital</span>
              </a>
              <button
                onClick={() => setSelectedService(null)}
                className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
