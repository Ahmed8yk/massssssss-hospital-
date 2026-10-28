/**
 * Masaraddi Neuro Care Center - Verified Hospital Configuration
 * 
 * Sourced directly from approved hospital information form.
 * Contains verified doctor credentials, OPD timings, confirmed clinical facilities,
 * and contact details.
 */

export const hospitalConfig = {
  hospitalName: "Masaraddi Neuro Care Center",
  category: "Specialized Neurological Care Center",
  tagline: "Dedicated Neurological Consultations & Clinical Care",
  headline: "Complete Neurological Services in Bagalkot",
  supportingText: "Providing patient-focused clinical neurology consultations, dedicated stroke care, epilepsy management, and inpatient monitoring under Dr. Shivkumar Masaraddi.",
  logo: "/logo.svg",
  branding: {
    logoUrl: "/logo.svg",
    logoAlt: "Masaraddi Neuro Care Centre Official Seal",
    faviconUrl: "/favicon.svg",
    updatedAt: "2026-10-23T00:00:00.000Z",
  },
  
  contact: {
    phone: "+918354220000",
    phoneDisplay: "+91 8354 220000",
    alternatePhone: "+919448000000",
    alternatePhoneDisplay: "+91 94480 00000",
    whatsappNumber: "919448000000",
    whatsappDisplay: "+91 94480 00000",
    whatsappMessage: "Hello, I am contacting Masaraddi Neuro Care Center to check doctor availability and schedule a consultation.",
    
    // Verified email from form
    email: "neurocarecentermasaraddi@gmail.com",
    
    // Verified address from form
    address: {
      street: "Godi Layout, near Rotary Circle, beside Kailash- In Hotel",
      landmark: "Near Rotary Circle, beside Kailash- In Hotel",
      city: "Bagalkot",
      state: "Karnataka",
      postalCode: "587101",
      country: "India",
      full: "Masaraddi Neuro Care Center, Godi Layout, near Rotary Circle, beside Kailash- In Hotel, Bagalkot, Karnataka 587101",
    },
    
    // Verified timings from form
    timings: {
      opd: "10:00 AM – 4:00 PM & 6:00 PM – 8:00 PM",
      opdSlot1: "10:00 AM – 4:00 PM",
      opdSlot2: "6:00 PM – 8:00 PM",
      emergency: "Emergency Care Available",
    },

    appointmentNote: "Call the hospital to check doctor availability and schedule your visit.",
    
    // Google Maps Bagalkot coordinates & directions
    googleMapsEmbedUrl: "https://maps.google.com/maps?q=Masaraddi+Neuro+Care+Center,+Godi+Layout,+near+Rotary+Circle,+beside+Kailash-+In+Hotel,+Bagalkot,+Karnataka+587101&t=&z=16&ie=UTF8&iwloc=&output=embed",
    googleMapsDirectionsUrl: "https://share.google/kY37dzPJA6qIplc1D",
  },
  
  heroSlides: [
    {
      id: "hero-1",
      url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=85&w=2560&auto=format&fit=crop",
      title: "Clinical Neurological Healthcare Center",
      caption: "Specialized center for comprehensive brain, spine, and nerve disorders in Bagalkot",
      altText: "Masaraddi Neuro Care Center modern hospital premises in Bagalkot",
      tag: "Hospital Premises",
      objectPosition: "center 40%"
    },
    {
      id: "hero-2",
      url: "/uploads/1792874313807-Screenshot_2026-10-10_013409.png",
      title: "Dr. Shivkumar Masaraddi — DM Neurology",
      caption: "Consultant Neurologist with 12+ years of clinical experience providing specialized care for stroke, epilepsy, and neurological disorders",
      altText: "Dr. Shivkumar Masaraddi at his consultation desk in Masaraddi Neuro Care Center",
      tag: "Consultant Neurologist",
      objectPosition: "center 25%"
    },
    {
      id: "hero-3",
      url: "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=85&w=2560&auto=format&fit=crop",
      title: "7 ICU & Inpatient Care Beds",
      caption: "Equipped 7-bed intensive care unit with continuous patient vital monitoring",
      altText: "ICU patient care beds and clinical monitoring setup",
      tag: "7 ICU Facilities",
      objectPosition: "center 45%"
    },
    {
      id: "hero-4",
      url: "https://images.unsplash.com/photo-1512678080530-7760d81faba6?q=85&w=2560&auto=format&fit=crop",
      title: "Inpatient Observation & Recovery",
      caption: "Sterile patient accommodations with dedicated nursing supervision",
      altText: "Inpatient observation room and patient care",
      tag: "Inpatient Care",
      objectPosition: "center 50%"
    },
    {
      id: "hero-5",
      url: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?q=85&w=2560&auto=format&fit=crop",
      title: "Hospital Reception & Patient Desk",
      caption: "Patient assistance desk located at Godi Layout, near Rotary Circle, beside Kailash- In Hotel, Bagalkot",
      altText: "Hospital reception and patient service desk",
      tag: "Patient Helpdesk",
      objectPosition: "center 40%"
    }
  ],
  
  services: [
    {
      id: "complete-neurology",
      name: "Complete Neurological Services",
      category: "Neurology Consultations",
      isPrimaryConfirmed: true,
      shortDescription: "In-depth clinical evaluation and medical management of brain, nerve, spine, and neuromuscular conditions.",
      detailedDescription: "Masaraddi Neuro Care Center provides thorough clinical consultations for patients presenting with neurological symptoms. Our evaluation includes detailed patient history review, cranial nerve examination, motor and sensory assessments, reflex analysis, and individual treatment planning.",
      commonSymptoms: [
        "Unexplained headaches and dizziness",
        "Numbness, tingling, or weakness in limbs",
        "Balance difficulties or gait unsteadiness",
        "Memory or cognitive changes",
        "Muscle twitching, spasms, or tremors"
      ],
      whatWeOffer: [
        "Clinical specialist examination and reflex evaluation",
        "Evidence-based diagnostic and treatment roadmap",
        "Prescription guidance and regular follow-up reviews",
        "Coordination with inpatient care when indicated"
      ],
      icon: "Brain"
    },
    {
      id: "stroke-care",
      name: "Stroke Care & Rehabilitation",
      category: "Acute & Post-Acute Care",
      isPrimaryConfirmed: true,
      shortDescription: "Post-stroke clinical assessment, secondary stroke prevention medical therapy, and guided neuro-rehabilitation.",
      detailedDescription: "For individuals recovering from ischemic or hemorrhagic stroke, structured clinical monitoring and secondary prevention are essential. We provide post-stroke neurological assessments, medical management of risk factors (blood pressure and blood thinners), and functional rehabilitation planning.",
      commonSymptoms: [
        "Sudden weakness or numbness on one side of face or body",
        "Difficulty speaking, slurred speech, or comprehension difficulty",
        "Sudden loss of balance or coordination",
        "Post-stroke muscle stiffness or reduced mobility"
      ],
      whatWeOffer: [
        "Clinical neurological health assessment after stroke",
        "Secondary stroke prevention medication regimens",
        "Physiotherapy and mobility recovery guidance",
        "Caregiver counseling for home-based recovery support"
      ],
      icon: "Activity"
    },
    {
      id: "epilepsy-care",
      name: "Epilepsy & Seizure Management",
      category: "Chronic Neurological Care",
      isPrimaryConfirmed: true,
      shortDescription: "Diagnostic seizure classification, anti-epileptic drug optimization, seizure control protocols, and patient safety counseling.",
      detailedDescription: "Epilepsy requires accurate classification of seizure episodes to select the appropriate anti-seizure medication regimen. We provide continuous outpatient management for adults and pediatric patients, focusing on seizure control and monitoring medication efficacy.",
      commonSymptoms: [
        "Episodes of involuntary jerking, stiffening, or convulsions",
        "Brief staring spells or temporary loss of awareness",
        "Sudden unprovoked falls or fainting episodes",
        "Sensory aura or unusual smells before an episode"
      ],
      whatWeOffer: [
        "Detailed seizure history and clinical classification",
        "Anti-epileptic medication stabilization and dosage review",
        "Patient safety counseling (sleep hygiene, precautions)",
        "Long-term follow-up to support seizure freedom"
      ],
      icon: "ShieldAlert"
    },
    {
      id: "headache-migraine",
      name: "Headache & Migraine Care",
      category: "Specialized Clinic",
      isPrimaryConfirmed: false,
      shortDescription: "Clinical diagnosis and management for chronic migraines, tension-type headaches, and facial nerve pain.",
      detailedDescription: "Headaches can significantly impact daily life. We evaluate primary and secondary headache causes, identify potential lifestyle triggers, and prescribe medical therapies for preventive and acute symptom relief.",
      commonSymptoms: [
        "Throbbing unilateral or bilateral head pain",
        "Headache accompanied by nausea, light, or sound sensitivity",
        "Chronic daily tension around forehead and neck",
        "Shooting facial pain"
      ],
      whatWeOffer: [
        "Clinical distinction between headache types",
        "Preventive and acute medication protocols",
        "Identification of triggers and lifestyle advice",
        "Regular monitoring of treatment response"
      ],
      icon: "Zap"
    },
    {
      id: "nerve-neuropathy",
      name: "Nerve & Peripheral Neuropathy Care",
      category: "Neuromuscular Health",
      isPrimaryConfirmed: false,
      shortDescription: "Evaluation of peripheral nerve disorders, diabetic neuropathy, burning feet sensations, and spinal nerve compression.",
      detailedDescription: "Disorders of the peripheral nerves cause numbness, tingling, burning pain, and muscle weakness. We assess causes such as diabetic neuropathy, sciatica, and radiculopathy to provide medical symptom relief and physical therapy recommendations.",
      commonSymptoms: [
        "Burning sensation or numbness in feet and hands",
        "Pain radiating along the leg (sciatica) or arm (radiculopathy)",
        "Loss of sensation or pin-and-needle sensations",
        "Weakness in grasping or walking"
      ],
      whatWeOffer: [
        "Peripheral nerve screening and glycemic neuropathy care",
        "Cervical and lumbar spine nerve evaluation",
        "Medical nerve pain management",
        "Physiotherapy and mobility recommendations"
      ],
      icon: "FileText"
    },
    {
      id: "movement-disorders",
      name: "Movement & Tremor Evaluation",
      category: "Clinical Neurology",
      isPrimaryConfirmed: false,
      shortDescription: "Clinical evaluation for Parkinson's disease, tremors, muscle rigidity, and balance disorders.",
      detailedDescription: "Movement disorders require ongoing clinical supervision. We conduct physical evaluations to identify movement symptoms and tailor medical therapies to support mobility, daily functioning, and quality of life.",
      commonSymptoms: [
        "Resting tremors in hands, fingers, or jaw",
        "Slowness of voluntary movement (bradykinesia)",
        "Stiffness in arms, legs, or trunk",
        "Postural instability or walking difficulty"
      ],
      whatWeOffer: [
        "Differential clinical evaluation of tremors and gait",
        "Medical therapy titration and follow-up reviews",
        "Balance and fall-prevention guidance",
        "Caregiver advice for everyday support"
      ],
      icon: "HeartPulse"
    }
  ],
  
  // Single verified doctor from submitted form
  doctors: [
    {
      id: "dr-shivkumar-masaraddi",
      name: "Dr. Shivkumar Masaraddi",
      specialization: "Neurology",
      qualificationsList: [
        "MBBS — J.N. Medical College, Belagavi",
        "MD — General Medicine, NHL Municipal Medical College, Ahmedabad",
        "DM — Neurology, Bangur Institute of Neurosciences, IPGMER, Kolkata"
      ],
      qualificationsSummary: "MBBS, MD (General Medicine), DM (Neurology)",
      experience: "12+ Years of Experience",
      bio: "Dr. Shivkumar Masaraddi is a Neurologist with over 12 years of clinical medical experience (since 2014). He completed his MBBS from J.N. Medical College, Belagavi, MD in General Medicine from NHL Municipal Medical College, Ahmedabad, and DM in Neurology from the Bangur Institute of Neurosciences, IPGMER, Kolkata. He provides clinical evaluation and care for stroke, epilepsy, and complete neurological disorders at Masaraddi Neuro Care Center in Bagalkot.",
      timings: "10:00 AM – 4:00 PM & 6:00 PM – 8:00 PM",
      image: "/src/assets/images/dr_shivkumar_avatar_1791582383196.jpg",
      departments: [
        "Complete Neurological Services",
        "Stroke Care",
        "Epilepsy & Seizures",
        "Clinical Neurology"
      ]
    }
  ],
  
  // Confirmed clinical facilities from official hospital brochure
  facilities: [
    {
      id: "fac-icu",
      title: "24 X 7 HI TECH ICU",
      shortTitle: "24x7 ICU",
      category: "Critical Care",
      description: "Round-the-clock 24x7 Hi-Tech Intensive Care Unit equipped with 7 dedicated beds and multi-parameter vital patient monitoring systems.",
      image: "/uploads/1793133749491-Screenshot_2026-10-28_021040.png",
      features: [
        "24x7 Hi-Tech continuous vital monitoring",
        "7 dedicated acute ICU patient beds",
        "Acute stroke & epilepsy critical management",
        "Specialized round-the-clock nursing care"
      ],
      altText: "24x7 Hi-Tech ICU at Masaraddi Neuro Care Center",
      icon: "BedDouble"
    },
    {
      id: "fac-ot",
      title: "Operation Theater",
      shortTitle: "Operation Theater",
      category: "Surgical Suite",
      description: "Available Operation Theater facility maintained with sterile surgical standards for clinical and neurological procedures.",
      image: "/uploads/1793093985102-Screenshot_2026-10-27_150846.png",
      features: [
        "Sterile surgical environment",
        "Advanced surgical lighting & instrumentation",
        "Direct link with post-operative recovery",
        "Comprehensive procedural support"
      ],
      altText: "Operation Theater at Masaraddi Neuro Care Center",
      icon: "ShieldAlert"
    },
    {
      id: "fac-physiotherapy",
      title: "Physiotherapy",
      shortTitle: "Physiotherapy",
      category: "Neuro-Rehabilitation",
      description: "Comprehensive physiotherapy and neuro-rehabilitation services supporting motor recovery, post-stroke rehabilitation, and mobility improvement.",
      image: "/uploads/1793134139935-Screenshot_2026-10-28_021847.png",
      features: [
        "Post-stroke physical rehabilitation",
        "Mobility, gait, and balance retraining",
        "Neuromuscular stimulation & muscle strengthening",
        "Customized exercise and recovery plans"
      ],
      altText: "Physiotherapy facility at Masaraddi Neuro Care Center",
      icon: "Activity"
    },
    {
      id: "fac-xray",
      title: "Digital X-Ray",
      shortTitle: "Digital X-Ray",
      category: "Imaging Services",
      description: "On-site high-resolution Digital X-Ray imaging facility for rapid clinical assessments of skeletal, cervical, and spinal structures.",
      image: "/uploads/1793133476918-Screenshot_2026-10-28_020509.png",
      features: [
        "Digital radiography technology",
        "High-definition spine & skeletal imaging",
        "Rapid image acquisition and report processing",
        "Direct clinical neurological correlation"
      ],
      altText: "Digital X-Ray unit at Masaraddi Neuro Care Center",
      icon: "Scan"
    },
    {
      id: "fac-pharmacy",
      title: "Pharmacy",
      shortTitle: "Pharmacy",
      category: "Medication Services",
      description: "Available on-premises pharmacy ensuring immediate round-the-clock access to prescribed neurological, stroke, and general medications.",
      image: "https://images.unsplash.com/photo-1585435557343-3b092031a831?q=85&w=1200&auto=format&fit=crop",
      features: [
        "Prescribed neurological and epilepsy medicines",
        "Acute stroke emergency medications",
        "Dispensing by qualified pharmaceutical staff",
        "Convenient on-site availability"
      ],
      altText: "Hospital pharmacy at Masaraddi Neuro Care Center",
      icon: "Pill"
    },
    {
      id: "fac-laboratory",
      title: "Blood Lab",
      shortTitle: "Blood Lab",
      category: "Diagnostic Support",
      description: "Available clinical blood laboratory for routine and specialized diagnostic investigations supporting prompt medical and neurological evaluations.",
      image: "/uploads/1793134278543-Screenshot_2026-10-28_020430.png",
      features: [
        "Complete blood counts and diagnostic panels",
        "Biochemical, electrolyte, and metabolic analysis",
        "Timely report availability for faster treatment",
        "Specialist clinical test correlation"
      ],
      altText: "Blood diagnostic laboratory at Masaraddi Neuro Care Center",
      icon: "FlaskConical"
    },
    {
      id: "fac-special-rooms",
      title: "Special Rooms / General Ward",
      shortTitle: "Rooms & Wards",
      category: "Inpatient Care",
      description: "Air-cooled Deluxe Special Rooms and well-ventilated separate Male/Female General Wards with hygiene maintained every 5 hours.",
      image: "/uploads/1793099718652-Screenshot_2026-10-27_164410.png",
      features: [
        "5 Deluxe Special Rooms with dedicated amenities",
        "Clean, hygienic Male and Female General Wards",
        "Sanitized every 5 hours with dedicated maid service",
        "24/7 nursing and patient supervision"
      ],
      altText: "Special Rooms and General Ward at Masaraddi Neuro Care Center",
      icon: "BedDouble"
    },
    {
      id: "fac-eeg",
      title: "EEG - Electro Encephalo Graphy",
      shortTitle: "EEG",
      category: "Brain Diagnostics",
      description: "Advanced digital Electroencephalography (EEG) recording electrical brain wave activity for diagnosing epilepsy, seizures, and altered consciousness.",
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=85&w=1200&auto=format&fit=crop",
      features: [
        "Digital brain electrical wave monitoring",
        "Epilepsy & seizure disorder evaluation",
        "Focal and generalized seizure classification",
        "Evaluations for fainting spells & blackout episodes"
      ],
      altText: "EEG - Electro Encephalo Graphy testing at Masaraddi Neuro Care Center",
      icon: "Brain"
    },
    {
      id: "fac-ncs",
      title: "NCS - Nerve Conduction Study",
      shortTitle: "NCS",
      category: "Nerve Diagnostics",
      description: "Specialized Nerve Conduction Studies measuring the velocity and health of electrical signals traveling through peripheral motor and sensory nerves.",
      image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=85&w=1200&auto=format&fit=crop",
      features: [
        "Peripheral neuropathy & diabetic nerve evaluation",
        "Carpal tunnel syndrome & nerve compression testing",
        "Motor and sensory nerve conduction velocity measurement",
        "Evaluation of unexplained tingling, numbness, and burning pain"
      ],
      altText: "NCS - Nerve Conduction Study at Masaraddi Neuro Care Center",
      icon: "Zap"
    },
    {
      id: "fac-emg",
      title: "EMG - Electromyography",
      shortTitle: "EMG",
      category: "Muscle & Nerve Studies",
      description: "Diagnostic Electromyography assessing electrical activity produced by skeletal muscles, helping distinguish muscle diseases from nerve disorders.",
      image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=85&w=1200&auto=format&fit=crop",
      features: [
        "Clinical diagnosis of unexplained muscle weakness",
        "Motor neuron disease & radiculopathy evaluation",
        "Neuromuscular junction disorder screening",
        "Personalized neurologist diagnostic review"
      ],
      altText: "EMG - Electromyography at Masaraddi Neuro Care Center",
      icon: "HeartPulse"
    }
  ],
  
  gallery: [
    {
      id: "gal-1",
      title: "Hospital Building & Front Entrance",
      category: "exterior",
      categoryLabel: "Premises",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1200&auto=format&fit=crop"
      ],
      interval: 2000,
      caption: "Hospital premises located at Godi Layout, Rotary Circle, Navanagar Road, Bagalkot.",
      altText: "Masaraddi Neuro Care Center hospital premises"
    },
    {
      id: "gal-2",
      title: "Dr. Shivkumar Masaraddi — Consultation Chamber",
      category: "consultation",
      categoryLabel: "Doctor Consultation",
      image: "/src/assets/images/dr_shivkumar_1791582310221.jpg",
      images: [
        "/src/assets/images/dr_shivkumar_1791582310221.jpg",
        "/src/assets/images/dr_shivkumar_avatar_1791582383196.jpg",
        "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1200&auto=format&fit=crop"
      ],
      interval: 2000,
      caption: "Consultant Neurologist Dr. Shivkumar Masaraddi conducting clinical neurology examinations and consultation reviews.",
      altText: "Dr. Shivkumar Masaraddi at his neurology consultation desk at Masaraddi Neuro Care Center"
    },
    {
      id: "gal-3",
      title: "7 ICU Patient Care Unit",
      category: "patient_care",
      categoryLabel: "ICU & Inpatient",
      image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=1200&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1200&auto=format&fit=crop"
      ],
      interval: 2000,
      caption: "Dedicated 7-bed ICU facility equipped for attentive patient care.",
      altText: "ICU care beds at Masaraddi Neuro Care Center"
    },
    {
      id: "gal-4",
      title: "Hospital Reception Desk",
      category: "facilities",
      categoryLabel: "Reception",
      image: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?q=80&w=1200&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1538108149393-fbbd81895907?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200&auto=format&fit=crop"
      ],
      interval: 2000,
      caption: "Hospital reception counter for patient assistance and OPD inquiries.",
      altText: "Reception desk at Masaraddi Neuro Care Center"
    },
    {
      id: "gal-5",
      title: "Clinical Diagnostic Support",
      category: "diagnostics",
      categoryLabel: "Laboratory & Diagnostics",
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1200&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=1200&auto=format&fit=crop"
      ],
      interval: 2000,
      caption: "Clinical laboratory and diagnostic investigation support area.",
      altText: "Clinical diagnostic area at Masaraddi Neuro Care Center"
    },
    {
      id: "gal-6",
      title: "Patient & Family Waiting Lounge",
      category: "facilities",
      categoryLabel: "Waiting Lounge",
      image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?q=80&w=1200&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1538108149393-fbbd81895907?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1200&auto=format&fit=crop"
      ],
      interval: 2000,
      caption: "Clean, comfortable seating area for patients and visiting family members.",
      altText: "Patient waiting area at Masaraddi Neuro Care Center"
    },
    {
      id: "gal-7",
      title: "Physiotherapy & Recovery Area",
      category: "patient_care",
      categoryLabel: "Physiotherapy",
      image: "https://images.unsplash.com/photo-1594824813511-20f545a95393?q=80&w=1200&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1594824813511-20f545a95393?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=1200&auto=format&fit=crop"
      ],
      interval: 2000,
      caption: "Dedicated physiotherapy space supporting post-stroke rehabilitation and mobility.",
      altText: "Physiotherapy area at Masaraddi Neuro Care Center"
    },
    {
      id: "gal-8",
      title: "Pharmacy & Medication Desk",
      category: "facilities",
      categoryLabel: "Pharmacy",
      image: "https://images.unsplash.com/photo-1585435557343-3b092031a831?q=80&w=1200&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1585435557343-3b092031a831?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?q=80&w=1200&auto=format&fit=crop"
      ],
      interval: 2000,
      caption: "On-site hospital pharmacy dispensing prescribed neurological medicines.",
      altText: "Hospital pharmacy at Masaraddi Neuro Care Center"
    }
  ]
};
