import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingButtons from '@/components/ui/FloatingButtons';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Programs - Smilestones Child Development Centre',
  description: 'Specialized programs including Smile CAMP, Parent Training, and School Support programs designed to help children and families succeed.',
};

export default function ProgramsPage() {
  const programs = [
    {
      title: 'Smile CAMP',
      subtitle: 'School Readiness Program',
      description: 'A comprehensive school readiness program designed to prepare children for academic success and social integration in mainstream educational settings.',
      duration: '3-6 months',
      features: [
        'Pre-academic skill development',
        'Social interaction training',
        'Routine and structure building',
        'Independence and self-help skills',
        'Attention and focus training',
        'Peer interaction opportunities'
      ],
      outcomes: [
        'Improved school readiness',
        'Better social skills',
        'Enhanced independence',
        'Stronger attention span'
      ]
    },
    {
      title: 'Parent Training Program',
      subtitle: 'Empowering Families',
      description: 'Comprehensive training program that empowers parents with evidence-based strategies and skills to support their child\'s development at home.',
      duration: '8-12 weeks',
      features: [
        'Behavior management techniques',
        'Communication strategies',
        'Home-based intervention programs',
        'Crisis management skills',
        'Progress monitoring methods',
        'Support group participation'
      ],
      outcomes: [
        'Confident parenting skills',
        'Improved child behavior',
        'Stronger family bonds',
        'Better home environment'
      ]
    },
    {
      title: 'School Support Program',
      subtitle: 'Mainstream Integration',
      description: 'Ongoing support program for children in mainstream educational settings with regular monitoring, consultation, and teacher training.',
      duration: 'Ongoing',
      features: [
        'Teacher training and consultation',
        'Classroom strategy development',
        'Regular progress monitoring',
        'IEP development and support',
        'Peer interaction facilitation',
        'Academic accommodation planning'
      ],
      outcomes: [
        'Successful school integration',
        'Improved academic performance',
        'Better peer relationships',
        'Enhanced self-confidence'
      ]
    }
  ];

  return (
    <main>
      <Header />
      
      {/* Breadcrumbs */}
      <div className="pt-6 pb-4 bg-gray-50">
        <div className="container mx-auto px-4">
          <nav className="text-sm text-gray-600">
            <span>Home</span> → <span className="text-blue-600 font-medium">Programs</span>
          </nav>
        </div>
      </div>

      {/* Programs Hero */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
              Our <span className="text-blue-600">Programs</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed px-4">
              Specialized programs designed to support children and families at every stage of development, from early intervention to school integration.
            </p>
          </div>
          
          {/* Program Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
            <div className="bg-gray-100 rounded-lg overflow-hidden">
              <img 
                src="/7287a954-7940-49f6-9cca-4db37db0b942.jpg" 
                alt="Smilestones Program Activities" 
                className="w-full h-48 md:h-56 lg:h-64 object-contain"
              />
            </div>
            <div className="bg-gray-100 rounded-lg overflow-hidden">
              <img 
                src="/68022e53-c10f-49f6-b899-9390a3f4ade7.jpg" 
                alt="Smilestones Children Learning" 
                className="w-full h-48 md:h-56 lg:h-64 object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Programs Details */}
      <section className="py-12 md:py-20 section-gradient">
        <div className="container mx-auto px-4">
          <div className="space-y-12 md:space-y-16">
            {programs.map((program, index) => {
              const gradientClasses = ['hover-card-blue', 'hover-card-green', 'hover-card-purple'];
              const gradientClass = gradientClasses[index % gradientClasses.length];
              
              return (
                <div key={program.title} className={`grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                  <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                    <div className={`universal-card hover-card-effect ${gradientClass} p-6 md:p-8`}>
                      <div className="flex items-center mb-3 md:mb-4">
                        <div className="w-2 h-2 md:w-3 md:h-3 bg-blue-600 rounded-full mr-2 md:mr-3"></div>
                        <span className="text-blue-600 font-semibold text-xs md:text-sm uppercase tracking-wide">{program.subtitle}</span>
                      </div>
                      
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">{program.title}</h2>
                      <p className="text-gray-600 leading-relaxed text-sm md:text-base mb-4 md:mb-6">{program.description}</p>
                      
                      <div className="grid grid-cols-1 gap-3 md:gap-4 mb-4 md:mb-6">
                        <div className="bg-blue-50 p-3 md:p-4 rounded-lg">
                          <div className="text-xs md:text-sm text-blue-600 font-semibold">Duration</div>
                          <div className="text-gray-900 font-medium text-sm md:text-base">{program.duration}</div>
                        </div>
                      </div>
                      
                      <Link href="/contact" className="btn-primary text-center block sm:inline-block">
                        <span>Enroll Now</span>
                      </Link>
                    </div>
                  </div>
                  
                  <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                    <div className="space-y-6 md:space-y-8">
                      <div className={`universal-card hover-card-effect ${gradientClass} p-4 md:p-6`}>
                        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">Program Features</h3>
                        <ul className="space-y-2 md:space-y-3">
                          {program.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start">
                              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-600 rounded-full mt-1.5 md:mt-2 mr-2 md:mr-3 flex-shrink-0"></div>
                              <span className="text-gray-600 text-sm md:text-base">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className={`universal-card hover-card-effect ${gradientClass} p-4 md:p-6`}>
                        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">Expected Outcomes</h3>
                        <ul className="space-y-2 md:space-y-3">
                          {program.outcomes.map((outcome, idx) => (
                            <li key={idx} className="flex items-start">
                              <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-600 rounded-full mt-1.5 md:mt-2 mr-2 md:mr-3 flex-shrink-0"></div>
                              <span className="text-gray-600 text-sm md:text-base">{outcome}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="universal-card hover-card-effect p-8 md:p-12 text-center max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">
              Ready to Join Our Programs?
            </h2>
            <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8 px-4">
              Contact us to learn more about our programs and find the right fit for your child's needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary text-center">
                <span>Get Started</span>
              </Link>
              <a href="tel:+919876543210" className="btn-secondary text-center">
                <span>Call for Information</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <FloatingButtons />
      <Footer />
    </main>
  );
}