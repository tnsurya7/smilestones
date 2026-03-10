'use client';

export default function SpecialtyScroll() {
  const specialties = [
    {
      title: 'Autism',
      description: 'Specialized support for autism spectrum disorders',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Attention Deficit',
      description: 'Expert guidance for attention challenges',
      gradient: 'from-green-500 to-teal-500'
    },
    {
      title: 'Hyperactivity Disorder',
      description: 'Managing hyperactivity with proven strategies',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      title: 'Learning Problems',
      description: 'Comprehensive support for learning difficulties',
      gradient: 'from-indigo-500 to-blue-500'
    },
    {
      title: 'Behavior Issues',
      description: 'Positive behavior management techniques',
      gradient: 'from-red-500 to-pink-500'
    },
    {
      title: 'Adolescent Mental Well Being',
      description: 'Supporting mental health in adolescents',
      gradient: 'from-yellow-500 to-orange-500'
    }
  ];

  return (
    <div className="w-full overflow-hidden bg-transparent py-2 md:py-3">
      <div className="specialty-scroll-container">
        <div className="specialty-scroll-track-detailed">
          {/* Render items multiple times for seamless loop */}
          {[...Array(3)].map((_, setIndex) => (
            specialties.map((specialty, index) => (
              <div
                key={`${setIndex}-${index}`}
                className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${specialty.gradient} p-4 md:p-6 shadow-xl hover:shadow-2xl transition-all duration-300 flex-shrink-0 w-60 md:w-72 group`}
              >
                {/* Animated background pattern */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-0 right-0 w-16 h-16 md:w-20 md:h-20 bg-white rounded-full -mr-8 md:-mr-10 -mt-8 md:-mt-10"></div>
                  <div className="absolute bottom-0 left-0 w-12 h-12 md:w-16 md:h-16 bg-white rounded-full -ml-6 md:-ml-8 -mb-6 md:-mb-8"></div>
                </div>
                
                <div className="relative z-10">
                  <h3 className="text-base md:text-xl font-bold text-white mb-2">
                    {specialty.title}
                  </h3>
                  
                  <p className="text-white/90 text-xs md:text-sm leading-relaxed">
                    {specialty.description}
                  </p>
                </div>

                {/* Shine effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-700"></div>
              </div>
            ))
          ))}
        </div>
      </div>
    </div>
  );
}
