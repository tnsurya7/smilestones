export default function StructuredData() {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    "name": "Smilestones - A Centre for Child Development and Learning",
    "description": "Professional child development centre providing assessment, therapy, training, and counseling for children with developmental delays, learning difficulties, speech disorders, autism, ADHD, and emotional/behavioral challenges.",
    "url": "https://smilestones.com",
    "logo": "https://smilestones.com/smilestones-logo.jpeg",
    "image": "https://smilestones.com/smilestones-logo.jpeg",
    "telephone": "+919876543210",
    "email": "info@smilestones.com",
    "address": [
      {
        "@type": "PostalAddress",
        "streetAddress": "123 Anna Nagar",
        "addressLocality": "Chennai",
        "addressRegion": "Tamil Nadu",
        "postalCode": "600040",
        "addressCountry": "IN"
      },
      {
        "@type": "PostalAddress",
        "streetAddress": "456 Trustpuram",
        "addressLocality": "Chennai",
        "addressRegion": "Tamil Nadu",
        "postalCode": "600024",
        "addressCountry": "IN"
      },
      {
        "@type": "PostalAddress",
        "streetAddress": "789 Main Road",
        "addressLocality": "Puducherry",
        "addressRegion": "Puducherry",
        "postalCode": "605001",
        "addressCountry": "IN"
      }
    ],
    "openingHours": [
      "Mo-Sa 09:00-18:00"
    ],
    "founder": {
      "@type": "Person",
      "name": "Dr. P. Sudhakar",
      "jobTitle": "Developmental Pediatrician & Applied Behavior Analyst",
      "description": "First developmental pediatrician in India licensed to practice Applied Behavior Analysis from QABA Board USA"
    },
    "medicalSpecialty": [
      "Autism Spectrum Disorder",
      "ADHD",
      "Speech and Language Disorders",
      "Learning Disabilities",
      "Developmental Delays",
      "Behavioral Disorders"
    ],
    "serviceType": [
      "Autism Assessment & Therapy",
      "ABA Therapy",
      "Speech Therapy",
      "Occupational Therapy",
      "Special Education",
      "ADHD Support",
      "Learning Disability Support",
      "Child & Adolescent Counseling",
      "Parent Training Programs",
      "School Readiness Programs"
    ],
    "areaServed": [
      "Chennai",
      "Anna Nagar",
      "Trustpuram",
      "Puducherry",
      "Tamil Nadu"
    ],
    "sameAs": [
      "https://www.facebook.com/smilestones",
      "https://www.instagram.com/smilestones",
      "https://www.linkedin.com/company/smilestones",
      "https://www.youtube.com/smilestones"
    ]
  };

  const localBusinessData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Smilestones Child Development Centre",
    "image": "https://smilestones.com/smilestones-logo.jpeg",
    "telephone": "+919876543210",
    "email": "info@smilestones.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Anna Nagar",
      "addressLocality": "Chennai",
      "addressRegion": "Tamil Nadu",
      "postalCode": "600040",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "13.0827",
      "longitude": "80.2707"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        "opens": "09:00",
        "closes": "18:00"
      }
    ],
    "priceRange": "$$",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "150"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessData),
        }}
      />
    </>
  );
}