import React from 'react';
import { Phone, MessageSquare, MapPin } from 'lucide-react';
import { useHospitalData } from '../context/HospitalContext.jsx';

export const MobileStickyBar = () => {
  const { data } = useHospitalData();

  return (
    <aside
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#080E1A]/90 backdrop-blur-2xl border-t border-white/15 px-3 pt-2 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-12px_36px_rgba(0,0,0,0.65),inset_0_1px_1.5px_rgba(255,255,255,0.2)]"
      aria-label="Mobile Quick Hospital Actions"
    >
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
        {/* Call Hospital Desk */}
        <a
          href={`tel:${data.contact?.phone || '+918354220000'}`}
          className="flex flex-col items-center justify-center min-h-[46px] py-1.5 px-1 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 active:from-sky-600 active:to-blue-700 text-white active:scale-95 transition-all text-center border border-sky-400/30 shadow-md shadow-sky-600/25"
          aria-label="Call Hospital Desk"
        >
          <Phone className="w-4 h-4 mb-0.5" />
          <span className="text-[11px] font-bold tracking-tight">Call Hospital</span>
        </a>

        {/* WhatsApp */}
        <a
          href={`https://wa.me/${data.contact?.whatsappNumber || '919448000000'}?text=${encodeURIComponent(
            data.contact?.whatsappMessage || 'Hello, I would like to schedule an appointment at Masaraddi Neuro Care Center.'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center min-h-[46px] py-1.5 px-1 rounded-xl bg-emerald-950/90 active:bg-emerald-900 text-emerald-300 active:scale-95 transition-all text-center border border-emerald-500/40"
          aria-label="WhatsApp Hospital Desk"
        >
          <MessageSquare className="w-4 h-4 mb-0.5 text-emerald-400" />
          <span className="text-[11px] font-bold tracking-tight">WhatsApp</span>
        </a>

        {/* Directions */}
        <a
          href={data.contact?.googleMapsDirectionsUrl || "https://share.google/kY37dzPJA6qIplc1D"}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center min-h-[46px] py-1.5 px-1 rounded-xl bg-slate-900/90 active:bg-slate-800 text-slate-100 active:scale-95 transition-all text-center border border-sky-400/20 shadow-sm"
          aria-label="Directions to Bagalkot Hospital"
        >
          <MapPin className="w-4 h-4 text-sky-400 mb-0.5" />
          <span className="text-[11px] font-semibold tracking-tight">Directions</span>
        </a>
      </div>
    </aside>
  );
};
