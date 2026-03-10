'use client';

export default function SpecialtyScroll() {
  const specialties = [
    'Autism',
    'Attention issues',
    'Hyperactivity',
    'Learning problems',
    'Behavior issues',
    'Adolescent mental well being'
  ];

  return (
    <div className="w-full overflow-hidden bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 py-4">
      <div className="specialty-scroll-container">
        <div className="specialty-scroll-track">
          {/* First set */}
          {specialties.map((specialty, index) => (
            <div
              key={`first-${index}`}
              className="specialty-card"
            >
              <span className="text-sm font-medium text-gray-700">
                {specialty}
              </span>
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {specialties.map((specialty, index) => (
            <div
              key={`second-${index}`}
              className="specialty-card"
            >
              <span className="text-sm font-medium text-gray-700">
                {specialty}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
