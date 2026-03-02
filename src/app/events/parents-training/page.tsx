import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingButtons from '@/components/ui/FloatingButtons';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Parents Training Events | Smilestones',
  description: 'Comprehensive training programs designed to empower parents with skills and strategies to support their child\'s development journey.',
};

export default function ParentsTrainingPage() {
  const images = [
    '/parents training header.jpg',
    '/Gurgaon Program_sub1.jpg',
    '/kolkata1.jpg',
    '/Kolkata Program February 2023_sub2.jpg',
    '/rotary1.jpg',
    '/Rotary Club Madras September 2022_sub1.jpg',
    '/Rotary Club Madras September 2022_sub2.jpg',
    '/Rotary Club Madras September 2022_sub3.jpg',
    '/Rotary Club Madras September 2022_sub5.jpg',
    '/pediariacians.jpg',
  ];

  return (
    <main>
      <Header />
      
      {/* Breadcrumbs */}
      <div className="pt-6 pb-4 bg-gray-50">
        <div className="container mx-auto px-4">
          <nav className="text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">Home</Link> → 
            <Link href="/events" className="hover:text-blue-600"> Events</Link> → 
            <span className="text-blue-600 font-medium"> Parents Training</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
              Parents <span className="text-blue-600">Training</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed px-4">
              Empowering parents with evidence-based strategies and skills to support their child's development at home.
            </p>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-12 md:py-20 section-gradient">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
              Program Gallery
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                    <img
                      src={image}
                      alt={`Parents Training - Photo ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-white font-medium text-sm">
                        Photo {index + 1} of {images.length}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Interested in Our Programs?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Contact us to learn more about our upcoming events and training programs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="premium-gradient-btn primary"
              >
                Contact Us
              </Link>
              <Link
                href="/events"
                className="premium-gradient-btn secondary blue"
              >
                View All Events
              </Link>
            </div>
          </div>
        </div>
      </section>

      <FloatingButtons />
      <Footer />
    </main>
  );
}
