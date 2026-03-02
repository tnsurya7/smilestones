import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingButtons from '@/components/ui/FloatingButtons';
import Link from 'next/link';
import { events, formatEventDate } from '@/data/events';
import { Calendar, MapPin, ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';

interface PageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const event = events.find((e) => e.id === params.id && e.category === 'teaching-institutes');
  
  if (!event) {
    return {
      title: 'Event Not Found | Smilestones',
    };
  }

  return {
    title: `${event.title} | Smilestones Events`,
    description: event.subtitle || `View photos and details from ${event.title}`,
  };
}

export default function EventDetailPage({ params }: PageProps) {
  const event = events.find((e) => e.id === params.id && e.category === 'teaching-institutes');

  if (!event) {
    notFound();
  }

  return (
    <main>
      <Header />
      
      {/* Breadcrumbs */}
      <div className="pt-6 pb-4 bg-gray-50">
        <div className="container mx-auto px-4">
          <nav className="text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">Home</Link> → 
            <Link href="/events" className="hover:text-blue-600"> Events</Link> → 
            <Link href="/events/teaching-institutes" className="hover:text-blue-600"> Teaching Institutes</Link> → 
            <span className="text-blue-600 font-medium"> {event.title}</span>
          </nav>
        </div>
      </div>

      {/* Back Button */}
      <section className="py-6 bg-white">
        <div className="container mx-auto px-4">
          <Link
            href="/events/teaching-institutes"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Teaching Institutes
          </Link>
        </div>
      </section>

      {/* Event Header */}
      <section className="py-8 md:py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {event.title}
            </h1>
            
            {event.subtitle && (
              <p className="text-lg md:text-xl text-gray-600 mb-6">
                {event.subtitle}
              </p>
            )}
            
            <div className="flex flex-wrap gap-4 md:gap-6">
              <div className="flex items-center gap-2 text-gray-700">
                <Calendar className="w-5 h-5 text-blue-600" />
                <span className="font-medium">{formatEventDate(event.date)}</span>
              </div>
              
              {event.location && (
                <div className="flex items-center gap-2 text-gray-700">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <span className="font-medium">{event.location}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-12 md:py-20 section-gradient">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
              Event Gallery
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {event.images.map((image, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                    <img
                      src={image}
                      alt={`${event.title} - Photo ${index + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-white font-medium text-sm">
                        Photo {index + 1} of {event.images.length}
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
