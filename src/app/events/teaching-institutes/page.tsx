import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingButtons from '@/components/ui/FloatingButtons';
import Link from 'next/link';
import { getEventsByCategory, groupEventsByMonthYear, formatEventDate } from '@/data/events';
import { Calendar, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Teaching Institutes Events | Smilestones',
  description: 'Educational programs for teachers and institutions to create inclusive learning environments and support children with special needs.',
};

export default function TeachingInstitutesPage() {
  const events = getEventsByCategory('teaching-institutes');
  const groupedEvents = groupEventsByMonthYear(events);

  return (
    <main>
      <Header />
      
      {/* Breadcrumbs */}
      <div className="pt-6 pb-4 bg-gray-50">
        <div className="container mx-auto px-4">
          <nav className="text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">Home</Link> → 
            <Link href="/events" className="hover:text-blue-600"> Events</Link> → 
            <span className="text-blue-600 font-medium"> Teaching Institutes</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
              <span className="text-blue-600">Teaching Institutes</span> Programs
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed px-4">
              Educational programs for teachers and institutions to create inclusive learning environments and support children with special needs.
            </p>
          </div>
        </div>
      </section>

      {/* Events Listing */}
      <section className="py-12 md:py-20 section-gradient">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-12">
            {Object.entries(groupedEvents).map(([monthYear, monthEvents]) => (
              <div key={monthYear}>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 md:mb-12">
                  {monthYear}
                </h2>
                
                <div className="space-y-12 md:space-y-16">
                  {monthEvents.map((event, index) => {
                    const gradients = ['gradient-card-purple', 'gradient-card-indigo', 'gradient-card-pink', 'gradient-card-orange'];
                    const gradient = gradients[index % gradients.length];
                    const isEven = index % 2 === 0;
                    
                    return (
                      <Link
                        key={event.id}
                        href={`/events/teaching-institutes/${event.id}`}
                        className="group block"
                      >
                        <div className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-6 md:gap-8 items-center`}>
                          {/* Event Image */}
                          {event.images[0] && (
                            <div className="w-full md:w-1/2 rounded-2xl overflow-hidden shadow-lg">
                              <img
                                src={event.images[0]}
                                alt={event.title}
                                className="w-full h-64 md:h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                            </div>
                          )}
                          
                          {/* Event Details Card */}
                          <div className={`w-full md:w-1/2 gradient-card ${gradient} hover-card-effect p-6 md:p-8 transition-transform duration-300 group-hover:scale-105`}>
                            <div className="flex items-center gap-2 mb-3 text-white/90 text-sm">
                              <Calendar className="w-4 h-4" />
                              <span>{formatEventDate(event.date)}</span>
                            </div>
                            
                            {event.location && (
                              <div className="flex items-center gap-2 mb-4 text-white/90 text-sm">
                                <MapPin className="w-4 h-4" />
                                <span>{event.location}</span>
                              </div>
                            )}
                            
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:underline">
                              {event.title}
                            </h3>
                            
                            {event.subtitle && (
                              <p className="text-white/90 text-base mb-4 leading-relaxed">
                                {event.subtitle}
                              </p>
                            )}
                            
                            <div className="flex items-center justify-between mt-6">
                              <div className="text-white/90 text-sm font-medium">
                                {event.images.length} {event.images.length === 1 ? 'photo' : 'photos'}
                              </div>
                              <div className="text-white font-semibold text-sm">
                                View Gallery →
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FloatingButtons />
      <Footer />
    </main>
  );
}
