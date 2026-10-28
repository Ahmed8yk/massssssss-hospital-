import React, { useState } from 'react';
import { 
  MapPin, 
  Navigation, 
  Phone, 
  Clock, 
  Compass, 
  Car, 
  Bus, 
  CalendarCheck, 
  FileText, 
  CheckCircle2, 
  Search,
  ArrowRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { useHospitalData } from '../context/HospitalContext.jsx';

export const ServiceAreaSection = () => {
  const { data } = useHospitalData();
  const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'near', 'mid', 'far'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTown, setSelectedTown] = useState(null);

  const towns = [
    {
      name: 'Bagalkot City',
      kannada: 'ಬಾಗಲಕೋಟೆ',
      distanceKm: 0,
      travelTime: 'Local (0-10 mins)',
      category: 'near',
      route: 'Godi Layout, near Rotary Circle, beside Kailash- In Hotel',
      transit: 'Local auto-rickshaws, city buses, walking distance from Rotary Circle',
      highlights: 'Immediate access to OPD, 7 ICU emergency care beds, pharmacy, and diagnostic lab.',
      opdRecommendation: '10:00 AM – 4:00 PM or 6:00 PM – 8:00 PM',
      majorNeeds: 'Acute stroke stabilization, emergency neurology admissions, daily OPD checkups.'
    },
    {
      name: 'Navanagar',
      kannada: 'ನವನಗರ',
      distanceKm: 4,
      travelTime: '8–12 mins',
      category: 'near',
      route: 'Direct via Navanagar Road / Sector 1 to Sector 63',
      transit: 'City bus service runs frequently between Navanagar and Rotary Circle',
      highlights: 'Primary residential extension of Bagalkot with fast road connectivity.',
      opdRecommendation: '10:00 AM – 4:00 PM or 6:00 PM – 8:00 PM',
      majorNeeds: 'Epilepsy follow-ups, chronic headache management, post-stroke physiotherapy.'
    },
    {
      name: 'Vidyagiri',
      kannada: 'ವಿದ್ಯಾಗಿರಿ',
      distanceKm: 3,
      travelTime: '6–10 mins',
      category: 'near',
      route: 'Via Vidyagiri Main Road connecting to Rotary Circle',
      transit: 'Auto-rickshaw or personal vehicle',
      highlights: 'Educational hub and medical precinct adjacent to Bagalkot center.',
      opdRecommendation: '10:00 AM – 4:00 PM or 6:00 PM – 8:00 PM',
      majorNeeds: 'Student migraine care, nerve pain evaluations, general neurological consultations.'
    },
    {
      name: 'Guledgudda',
      kannada: 'ಗುಳೇದಗುಡ್ಡ',
      distanceKm: 25,
      travelTime: '30–35 mins',
      category: 'near',
      route: 'Via Guledgudda-Bagalkot State Highway',
      transit: 'Regular KSRTC and private bus service to Bagalkot central bus station',
      highlights: 'Textile and trade town with direct half-hourly road connectivity.',
      opdRecommendation: 'Morning OPD: 10:00 AM – 4:00 PM (Return journey same day)',
      majorNeeds: 'Tremors, numbness in limbs, chronic migraine, stroke risk assessments.'
    },
    {
      name: 'Bilgi',
      kannada: 'ಬೀಳಗಿ',
      distanceKm: 30,
      travelTime: '35–40 mins',
      category: 'near',
      route: 'Via NH 52 (Bijapur-Bagalkot 4-lane highway corridor)',
      transit: 'Continuous KSRTC express and local buses via Bilgi Cross',
      highlights: 'Agricultural center along the Krishna river basin with smooth highway transit.',
      opdRecommendation: 'Morning OPD: 10:00 AM – 4:00 PM',
      majorNeeds: 'Seizure evaluations, dizziness/vertigo diagnosis, neuropathy care.'
    },
    {
      name: 'Badami',
      kannada: 'ಬಾದಾಮಿ',
      distanceKm: 30,
      travelTime: '40–45 mins',
      category: 'near',
      route: 'Via SH 53 / Badami-Bagalkot Road',
      transit: 'Direct KSRTC buses every 20-30 minutes to Bagalkot',
      highlights: 'Historic town and taluk headquarters serving extensive rural catchment.',
      opdRecommendation: 'Morning OPD: 10:00 AM – 4:00 PM',
      majorNeeds: 'Epilepsy stabilization, secondary stroke prevention, nerve conduction reviews.'
    },
    {
      name: 'Mudhol',
      kannada: 'ಮುಧೋಳ',
      distanceKm: 45,
      travelTime: '50–55 mins',
      category: 'mid',
      route: 'Via SH 53 through Lokapur corridor',
      transit: 'Frequent express bus services connecting Mudhol to Bagalkot',
      highlights: 'Industrial and sugar belt hub; major referral origin for neuromuscular disorders.',
      opdRecommendation: 'Morning OPD: 10:00 AM – 4:00 PM (Leave Mudhol by 8:30 AM)',
      majorNeeds: 'Post-stroke motor recovery, Parkinsonian gait issues, spine-nerve compression.'
    },
    {
      name: 'Hungund',
      kannada: 'ಹುನಗುಂದ',
      distanceKm: 55,
      travelTime: '60 mins',
      category: 'mid',
      route: 'Via NH 67 / NH 50 corridor directly to Bagalkot',
      transit: 'KSRTC interstate and district buses running round the clock',
      highlights: 'Taluk headquarters located at major national highway junction.',
      opdRecommendation: 'Morning OPD: 10:00 AM – 4:00 PM',
      majorNeeds: 'Chronic intractable headache, unexplained seizures/fits, stroke rehabilitation.'
    },
    {
      name: 'Ilkal',
      kannada: 'ಇಲಕಲ್ಲ',
      distanceKm: 60,
      travelTime: '1 hr 10 mins',
      category: 'mid',
      route: 'Via NH 50 and Bagalkot Road connecting through Hungund',
      transit: 'Frequent direct bus transit from Ilkal new bus stand to Bagalkot',
      highlights: 'Major commercial granite and textile center in southeastern Bagalkot district.',
      opdRecommendation: 'Morning OPD: 10:00 AM – 4:00 PM (Reach by 11:00 AM)',
      majorNeeds: 'Comprehensive neurological reviews, anti-epileptic drug titration, 7 ICU care.'
    },
    {
      name: 'Jamkhandi',
      kannada: 'ಜಮಖಂಡಿ',
      distanceKm: 65,
      travelTime: '1 hr 20 mins',
      category: 'mid',
      route: 'Via SH 53 through Mudhol and Lokapur',
      transit: 'Direct express buses from Jamkhandi central bus stand to Bagalkot',
      highlights: 'Sub-divisional medical referral base with large volume of neurological referrals.',
      opdRecommendation: 'Morning OPD: 10:00 AM – 4:00 PM (Start by 8:00 AM for same-day return)',
      majorNeeds: 'Acute stroke therapy, recurring seizure evaluation, memory/cognitive disorders.'
    },
    {
      name: 'Rabkavi-Banhatti',
      kannada: 'ರಬಕವಿ-ಬನಹಟ್ಟಿ',
      distanceKm: 75,
      travelTime: '1 hr 35 mins',
      category: 'far',
      route: 'Via Banhatti-Jamkhandi-Mudhol-Bagalkot Highway',
      transit: 'KSRTC buses via Jamkhandi / Mudhol junction',
      highlights: 'Twin weaving cities on the northern border of Bagalkot district.',
      opdRecommendation: 'Morning OPD: 10:00 AM – 4:00 PM (Call ahead before journey)',
      majorNeeds: 'Chronic neuropathy, repetitive movement tremors, secondary stroke protection.'
    },
    {
      name: 'Mahalingpur',
      kannada: 'ಮಹಾಲಿಂಗಪುರ',
      distanceKm: 80,
      travelTime: '1 hr 45 mins',
      category: 'far',
      route: 'Via Mahalingpur-Mudhol corridor connecting to SH 53',
      transit: 'Direct bus services to Bagalkot via Mudhol',
      highlights: 'Commercial agriculture center near Belagavi-Bagalkot border.',
      opdRecommendation: 'Morning OPD: 10:00 AM – 4:00 PM',
      majorNeeds: 'Long-term epilepsy management, specialized stroke care, 7 ICU inpatient care.'
    },
    {
      name: 'Lokapur & Kerur',
      kannada: 'ಲೋಕಾಪುರ - ಕೆರೂರ',
      distanceKm: 35,
      travelTime: '40–45 mins',
      category: 'near',
      route: 'Via NH 52 and SH 53 junction',
      transit: 'All Mudhol, Jamkhandi and Belagavi buses halt at Lokapur Cross',
      highlights: 'Strategic junction points with continuous highway transit into Bagalkot.',
      opdRecommendation: '10:00 AM – 4:00 PM or 6:00 PM – 8:00 PM',
      majorNeeds: 'Emergency neurological referral, post-trauma assessment, nerve consultations.'
    }
  ];

  const filterCategories = [
    { id: 'all', label: 'All 90 km Catchment' },
    { id: 'near', label: 'Within 35 km (Quick Transit)' },
    { id: 'mid', label: '35–65 km (1–1.5 Hrs)' },
    { id: 'far', label: '65–90 km (Regional Hubs)' },
  ];

  const filteredTowns = towns.filter((town) => {
    const matchesFilter = activeFilter === 'all' || town.category === activeFilter;
    const matchesSearch = 
      town.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      town.kannada.includes(searchQuery) ||
      town.highlights.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <section id="service-area" className="py-24 bg-white relative overflow-hidden border-t border-slate-100">
      {/* Background visual elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-50 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Local SEO Keywords */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100/80 border border-sky-200 text-sky-800 text-xs font-bold tracking-wide uppercase shadow-sm">
            <Compass className="w-3.5 h-3.5 text-sky-600" />
            <span>90 km Regional Service Area &bull; North Karnataka</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B132B] tracking-tight font-outfit">
            Serving Bagalkot &amp; Surrounding Taluks
          </h2>
          
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Masaraddi Neuro Care Center provides specialized neurological care led by <strong>Dr. Shivkumar Masaraddi (DM Neurology)</strong> for patients across Bagalkot District and neighboring taluks within approximately 90 km.
          </p>
        </div>

        {/* Essential Travel Tips Banner for Outstation Patients */}
        <div className="mt-10 p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-sky-900 to-[#0B132B] text-white shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8 space-y-2">
              <div className="flex items-center gap-2 text-sky-300 font-bold text-xs uppercase tracking-wider">
                <Clock className="w-4 h-4 text-sky-400" />
                <span>Traveler OPD Advisory for Out-of-Town Patients</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold font-outfit text-white">
                Planning your visit from Jamkhandi, Mudhol, Badami, or Ilkal?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                We recommend arriving during the <strong>Morning OPD slot (10:00 AM – 4:00 PM)</strong> so clinical nerve examinations, prescriptions, and necessary diagnostic reviews can be completed for a convenient same-day return.
              </p>
            </div>

            <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-2.5">
              <a
                href={`tel:${data.contact.phone}`}
                className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-xs shadow-md transition-all text-center"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Before Traveling ({data.contact.phoneDisplay})</span>
              </a>

              <a
                href={data.contact.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/15 transition-all text-center"
              >
                <Navigation className="w-3.5 h-3.5 text-sky-400" />
                <span>GPS Directions to Hospital</span>
              </a>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="mt-12 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {filterCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveFilter(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeFilter === cat.id
                    ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64 shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search town (e.g. Badami)..."
              className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl bg-slate-100 border border-slate-200 text-slate-800 focus:outline-none focus:bg-white focus:border-sky-500 transition-all font-medium"
            />
          </div>
        </div>

        {/* Location Cards Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTowns.map((town) => (
            <div
              key={town.name}
              className="bg-[#F8FAFC] rounded-3xl p-5 sm:p-6 border border-slate-200/80 hover:border-sky-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group space-y-4"
            >
              <div className="space-y-3">
                {/* Town Title and Distance Badge */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-bold text-[#0B132B] font-outfit group-hover:text-sky-600 transition-colors flex items-center gap-1.5">
                      <span>{town.name}</span>
                      <span className="text-xs font-normal text-slate-400 font-sans">({town.kannada})</span>
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      {town.travelTime} from Hospital
                    </p>
                  </div>

                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-sky-50 text-sky-700 border border-sky-200 text-xs font-bold shrink-0">
                    <Car className="w-3.5 h-3.5 text-sky-600" />
                    <span>{town.distanceKm} km</span>
                  </span>
                </div>

                {/* Highway Route */}
                <div className="space-y-1 text-xs">
                  <span className="font-bold text-slate-700 block">Recommended Route:</span>
                  <p className="text-slate-600 leading-relaxed font-medium">
                    {town.route}
                  </p>
                </div>

                {/* Public Transit Details */}
                <div className="space-y-1 text-xs">
                  <span className="font-bold text-slate-700 flex items-center gap-1">
                    <Bus className="w-3 h-3 text-slate-500" />
                    <span>Bus &amp; Transit:</span>
                  </span>
                  <p className="text-slate-600 leading-relaxed">
                    {town.transit}
                  </p>
                </div>

                {/* Primary Neurological Needs in Catchment */}
                <div className="p-3 rounded-2xl bg-white border border-slate-200/70 space-y-1 text-xs">
                  <span className="font-bold text-sky-800 block text-[11px] uppercase tracking-wider">
                    Common Consultations:
                  </span>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    {town.majorNeeds}
                  </p>
                </div>
              </div>

              {/* Action Button: Call to verify schedule */}
              <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between gap-2">
                <span className="text-[11px] text-slate-500">
                  OPD: {town.distanceKm > 40 ? '10 AM – 4 PM' : '10 AM–4 PM & 6–8 PM'}
                </span>
                <a
                  href={`tel:${data.contact.phone}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-sky-600 hover:text-sky-700"
                >
                  <span>Book Visit</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Medical Document Checklist for Visiting Patients */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-[#F8FAFC] border border-slate-200/90 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5 text-sky-700" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#0B132B] font-outfit">
                Patient Checklist: What to Bring for Your Neurology Consultation
              </h3>
              <p className="text-xs text-slate-500">
                To help Dr. Shivkumar Masaraddi conduct a thorough clinical neurological evaluation, please bring the following documents:
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-2">
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200/70 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="font-bold text-slate-800 block">Neuro Imaging:</span>
                <span className="text-slate-600">Previous MRI Brain/Spine films, CT scans, and diagnostic reports.</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-slate-200/70 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="font-bold text-slate-800 block">Current Medications:</span>
                <span className="text-slate-600">All current prescription strips for BP, seizures, blood thinners, and diabetes.</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-slate-200/70 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="font-bold text-slate-800 block">Diagnostic Records:</span>
                <span className="text-slate-600">Past EEG recordings, EMG reports, blood test results, and discharge cards.</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-slate-200/70 flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-xs">
                <span className="font-bold text-slate-800 block">Symptom Log:</span>
                <span className="text-slate-600">Notes on seizure frequency, headache triggers, numbness duration, and onset dates.</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
