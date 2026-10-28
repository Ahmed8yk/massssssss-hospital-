import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Phone, MapPin, Clock } from 'lucide-react';
import { useHospitalData } from '../context/HospitalContext.jsx';

export const FaqSection = () => {
  const { data } = useHospitalData();
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [

    {
      id: 'faq-services',
      question: 'What neurological services are available at Masaraddi Neuro Care Center?',
      answer: `We provide complete neurological services led by Dr. Shivkumar Masaraddi (DM Neurology). Core clinical focus areas include dedicated Stroke Care & post-stroke neuro-rehabilitation, Epilepsy & Seizure management, Headache and Chronic Migraine care, Peripheral Neuropathy & nerve disorder evaluations, and general neurological consultations. Inpatient monitoring is supported across 7 ICU beds.`,
      category: 'Services',
    },
    {
      id: 'faq-timings',
      question: 'What are the doctor consultation and OPD timings in Bagalkot?',
      answer: `Outpatient (OPD) consultations are scheduled in two daily slots: Morning from ${data.contact.timings.opdSlot1} and Evening from ${data.contact.timings.opdSlot2}, Monday through Saturday. Emergency care is available for acute neurological admissions. We recommend calling the hospital desk before visiting to confirm doctor availability.`,
      category: 'Timings',
    },
    {
      id: 'faq-appointment',
      question: 'How can I book a consultation with the neurologist?',
      answer: `Consultations are scheduled primarily through direct phone calls. Patients and family members can call our hospital desk at ${data.contact.phoneDisplay} or ${data.contact.alternatePhoneDisplay || '+91 94480 00000'} to check doctor availability and schedule their visit. Walk-in consultations are also accommodated during OPD hours.`,
      category: 'Appointments',
    },
    {
      id: 'faq-location',
      question: 'Where is Masaraddi Neuro Care Center located in Bagalkot?',
      answer: `Our hospital is located at Godi Layout, Rotary Circle, Navanagar Road, Bagalkot, Karnataka (Landmark: Near Rotary Circle). The center is centrally positioned with easy road accessibility from Bagalkot railway station, Navanagar, and surrounding towns including Badami, Mudhol, Jamkhandi, and Ilkal.`,
      category: 'Location',
    },
    {
      id: 'faq-stroke',
      question: 'Is specialized stroke care and rehabilitation available?',
      answer: `Yes. Stroke care is one of our primary verified focus areas. We provide post-stroke neurological assessments, secondary stroke prevention medication protocols (blood pressure, lipid and antiplatelet management), and guided physiotherapy/neuro-rehabilitation support to assist in patient motor recovery and functional independence.`,
      category: 'Stroke Care',
    },
    {
      id: 'faq-epilepsy',
      question: 'Is epilepsy and seizure management provided for adults and children?',
      answer: `Yes. Dr. Shivkumar Masaraddi specializes in clinical seizure evaluation, differential diagnosis between seizure types, stabilization of anti-epileptic medications (AEDs), and ongoing counseling on patient safety, sleep hygiene, and long-term seizure control.`,
      category: 'Epilepsy',
    },
    {
      id: 'faq-facilities',
      question: 'What medical infrastructure and facilities are available at the hospital?',
      answer: `Masaraddi Neuro Care Center features confirmed clinical facilities: 7 ICU beds with continuous patient vital monitoring, an on-premises Pharmacy for prompt dispensing of neurological medications, a clinical Diagnostic Laboratory, a dedicated Physiotherapy department for motor rehabilitation, an X-Ray imaging unit, and an Operation Theatre (OT).`,
      category: 'Facilities',
    },
    {
      id: 'faq-regional',
      question: 'Do you serve patients from towns outside Bagalkot, such as Badami, Jamkhandi, Mudhol, and Ilkal?',
      answer: `Yes, we regularly receive and treat patients across a 90 km radius covering Bagalkot, Navanagar, Vidyagiri, Badami, Jamkhandi, Mudhol, Ilkal, Hungund, Guledgudda, Bilgi, Rabkavi-Banhatti, and Mahalingpur. Outstation patients are advised to visit during Morning OPD (10:00 AM – 4:00 PM) for convenient same-day return.`,
      category: 'Regional Patients',
    },
    {
      id: 'faq-symptoms',
      question: 'What symptoms indicate an urgent need for a neurological evaluation?',
      answer: `Consult a neurologist promptly if you experience sudden weakness or numbness in the face, arm, or leg (especially on one side); sudden speech difficulty or slurred speech; sudden vision changes; first-time seizures or fits; severe 'thunderclap' headaches; unexplained loss of balance or coordination; or progressive tremors and memory decline.`,
      category: 'Symptoms',
    },
  ];

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-[#F8FAFC] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with local SEO keywords */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100/80 border border-sky-200 text-sky-800 text-xs font-bold tracking-wide uppercase shadow-sm">
            <HelpCircle className="w-3.5 h-3.5 text-sky-600" />
            <span>Frequently Asked Questions</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B132B] tracking-tight font-outfit">
            Patient &amp; Consultation Guidance
          </h2>
          
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Essential information regarding neurological consultations, OPD hours, stroke and epilepsy care, and hospital facilities in Bagalkot.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="mt-14 space-y-3.5">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.02)] transition-all duration-200 hover:border-sky-300"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-4 sm:px-6 py-4 sm:py-5 text-left flex items-center justify-between gap-3 sm:gap-4 focus:outline-none focus:bg-slate-50 transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-sm sm:text-base text-[#0B132B] font-outfit">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'bg-sky-50 text-sky-600 rotate-180' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-6 pb-4 sm:pb-5 pt-1 border-t border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick Consultation Call Card */}
        <div className="mt-12 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base font-bold text-[#0B132B] font-outfit">
              Need to check current doctor availability?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600">
              Call our hospital reception desk at Godi Layout, Rotary Circle, Bagalkot.
            </p>
          </div>

          <a
            href={`tel:${data.contact.phone}`}
            className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-sky-600/25 transition-all hover:scale-[1.02]"
          >
            <Phone className="w-4 h-4" />
            <span>Call {data.contact.phoneDisplay}</span>
          </a>
        </div>

      </div>
    </section>
  );
};
