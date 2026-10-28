import React, { useEffect } from 'react';
import { useHospitalData } from '../context/HospitalContext.jsx';

export const StructuredData = () => {
  const { data } = useHospitalData();
  const doctor = data.doctors[0];

  useEffect(() => {
    // MedicalOrganization & Hospital Schema
    const hospitalSchema = {
      "@context": "https://schema.org",
      "@type": ["Hospital", "MedicalOrganization", "MedicalBusiness"],
      "name": data.hospitalName,
      "alternateName": [
        "Masaraddi Neuro Care Center Bagalkot",
        "Masaraddi Neurology Hospital",
        "Dr Shivkumar Masaraddi Clinic"
      ],
      "description": "Masaraddi Neuro Care Center in Bagalkot, Karnataka is led by Dr. Shivkumar Masaraddi (DM Neurology). Providing complete neurological services, dedicated stroke care, epilepsy management, and 7 ICU beds.",
      "url": "https://masaraddineurocare.com",
      "logo": (data.branding?.logoUrl || data.logo || '/logo.svg').startsWith('http') 
        ? (data.branding?.logoUrl || data.logo) 
        : `https://masaraddineurocare.com${(data.branding?.logoUrl || data.logo || '/logo.svg').startsWith('/') ? '' : '/'}${data.branding?.logoUrl || data.logo || '/logo.svg'}`,
      "image": data.heroSlides.map((s) => s.url),
      "telephone": data.contact.phone,
      "email": data.contact.email,
      "priceRange": "$$",
      "currenciesAccepted": "INR",
      "paymentAccepted": "Cash, UPI, Credit Card, Debit Card",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": data.contact.address.street,
        "addressLocality": data.contact.address.city,
        "addressRegion": data.contact.address.state,
        "postalCode": data.contact.address.postalCode || "587101",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 16.181,
        "longitude": 75.698
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "10:00",
          "closes": "16:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "18:00",
          "closes": "20:00"
        }
      ],
      "medicalSpecialty": [
        "https://schema.org/Neurology"
      ],
      "availableService": data.services.map((s) => ({
        "@type": "MedicalProcedure",
        "name": s.name,
        "description": s.shortDescription
      })),
      "physician": {
        "@type": "Physician",
        "name": doctor?.name || "Dr. Shivkumar Masaraddi",
        "medicalSpecialty": "Neurology",
        "description": doctor?.bio,
        "jobTitle": "Consultant Neurologist"
      },
      "areaServed": [
        { "@type": "City", "name": "Bagalkot" },
        { "@type": "City", "name": "Navanagar" },
        { "@type": "City", "name": "Vidyagiri" },
        { "@type": "City", "name": "Badami" },
        { "@type": "City", "name": "Jamkhandi" },
        { "@type": "City", "name": "Mudhol" },
        { "@type": "City", "name": "Ilkal" },
        { "@type": "City", "name": "Hungund" },
        { "@type": "City", "name": "Bilagi" },
        { "@type": "City", "name": "Guledgudda" },
        { "@type": "City", "name": "Rabkavi-Banhatti" },
        { "@type": "City", "name": "Mahalingpur" },
        { "@type": "AdministrativeArea", "name": "Bagalkot District" },
        { "@type": "AdministrativeArea", "name": "North Karnataka" }
      ]
    };

    // Physician Schema
    const physicianSchema = {
      "@context": "https://schema.org",
      "@type": "Physician",
      "name": doctor?.name || "Dr. Shivkumar Masaraddi",
      "jobTitle": "Consultant Neurologist",
      "medicalSpecialty": "https://schema.org/Neurology",
      "description": doctor?.bio,
      "image": "https://masaraddineurocare.com/src/assets/images/dr_shivkumar_avatar_1791582383196.jpg",
      "worksFor": {
        "@type": "Hospital",
        "name": data.hospitalName,
        "url": "https://masaraddineurocare.com"
      },
      "alumniOf": [
        {
          "@type": "EducationalOrganization",
          "name": "J.N. Medical College, Belagavi"
        }
      ],
      "knowsAbout": [
        "Stroke Care and Rehabilitation",
        "Epilepsy and Seizure Disorders",
        "Chronic Migraine and Headache Disorders",
        "Peripheral Neuropathy",
        "Parkinsonism and Tremor Evaluation",
        "Critical Neuro ICU Patient Care"
      ],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": data.contact.address.street,
        "addressLocality": data.contact.address.city,
        "addressRegion": data.contact.address.state,
        "addressCountry": "IN"
      }
    };

    // FAQPage Schema
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What neurological services are available at Masaraddi Neuro Care Center in Bagalkot?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Complete neurological services led by Dr. Shivkumar Masaraddi (DM Neurology), including stroke care and neuro-rehabilitation, epilepsy and seizure management, headache and chronic migraine treatment, peripheral neuropathy evaluations, and 7 ICU beds for patient monitoring."
          }
        },
        {
          "@type": "Question",
          "name": "What are the neurologist consultation timings in Bagalkot?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `OPD consultations are conducted from ${data.contact.timings.opdSlot1} and ${data.contact.timings.opdSlot2}, Monday through Saturday. Emergency neurological admissions are supported 24/7.`
          }
        },
        {
          "@type": "Question",
          "name": "Do you serve patients from Badami, Jamkhandi, Mudhol, and Ilkal?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, Masaraddi Neuro Care Center is centrally located at Rotary Circle, Bagalkot and regularly serves patients from across Bagalkot District and neighboring taluks within 90 km, including Navanagar, Badami, Jamkhandi, Mudhol, Ilkal, Hungund, Guledgudda, Bilgi, and Mahalingpur."
          }
        },
        {
          "@type": "Question",
          "name": "What should outstation patients bring for their neurological review?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Please bring all previous MRI or CT brain/spine scans, past EEG/EMG reports, current prescription strips, blood sugar/BP logs, and any hospital discharge summaries to assist in complete clinical evaluation."
          }
        },
        {
          "@type": "Question",
          "name": "How can I book an appointment with Dr. Shivkumar Masaraddi?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": `Appointments and doctor availability can be confirmed by calling the hospital desk at ${data.contact.phoneDisplay} or ${data.contact.alternatePhoneDisplay}. Walk-in patients are also seen during OPD hours.`
          }
        },
        {
          "@type": "Question",
          "name": "Where is Masaraddi Neuro Care Center located?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Godi Layout, Rotary Circle, Navanagar Road, Bagalkot, Karnataka 587102."
          }
        },
        {
          "@type": "Question",
          "name": "Is acute stroke care and 7 ICU monitoring available in Bagalkot?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes, our facility features 7 ICU beds equipped with vital monitoring equipment, dedicated acute stroke protocols, post-stroke physiotherapy, and secondary stroke prevention medication programs."
          }
        }
      ]
    };

    // BreadcrumbList Schema
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://masaraddineurocare.com/#home" },
        { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://masaraddineurocare.com/#services" },
        { "@type": "ListItem", "position": 3, "name": "Doctors", "item": "https://masaraddineurocare.com/#doctors" },
        { "@type": "ListItem", "position": 4, "name": "Facilities", "item": "https://masaraddineurocare.com/#facilities" },
        { "@type": "ListItem", "position": 5, "name": "Gallery", "item": "https://masaraddineurocare.com/#gallery" },
        { "@type": "ListItem", "position": 6, "name": "90 km Service Area", "item": "https://masaraddineurocare.com/#service-area" },
        { "@type": "ListItem", "position": 7, "name": "FAQ", "item": "https://masaraddineurocare.com/#faq" },
        { "@type": "ListItem", "position": 8, "name": "Contact", "item": "https://masaraddineurocare.com/#contact" }
      ]
    };

    const script1 = document.createElement('script');
    script1.type = 'application/ld+json';
    script1.text = JSON.stringify(hospitalSchema);
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.type = 'application/ld+json';
    script2.text = JSON.stringify(physicianSchema);
    document.head.appendChild(script2);

    const script3 = document.createElement('script');
    script3.type = 'application/ld+json';
    script3.text = JSON.stringify(faqSchema);
    document.head.appendChild(script3);

    const script4 = document.createElement('script');
    script4.type = 'application/ld+json';
    script4.text = JSON.stringify(breadcrumbSchema);
    document.head.appendChild(script4);

    return () => {
      if (document.head.contains(script1)) document.head.removeChild(script1);
      if (document.head.contains(script2)) document.head.removeChild(script2);
      if (document.head.contains(script3)) document.head.removeChild(script3);
      if (document.head.contains(script4)) document.head.removeChild(script4);
    };
  }, [data, doctor]);

  return null;
};
