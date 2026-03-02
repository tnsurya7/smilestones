import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingButtons from '@/components/ui/FloatingButtons';
import Link from 'next/link';
import { getEventsByCategory, groupEventsByMonthYear, formatEventDate } from '@/data/events';
import { Calendar, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Pediatricians Events | Smilestones',
  description: 'Professional development workshops and conferences for pediatricians focusing on developmental pediatrics and evidence-based interventions.',
};

export default function PediatriciansPage() {
  const events = getEventsByCategory('pediatricians');
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
            <span className="text-blue-600 font-medium"> Pediatricians</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
              <span className="text-blue-600">Pediatricians</span> Events
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed px-4">
              Professional development workshops and conferences focusing on developmental pediatrics and evidence-based interventions.
            </p>
          </div>
        </div>
      </section>

      {/* Events Listing */}
      <section className="py-12 md:py-20 section-gradient">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-12">
            {Object.entries(groupedEvents).map(([monthYear, monthEvents]) => (
              <div key={monthYear}>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8">
                  {monthYear}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  {monthEvents.map((event, index) => {
                    const gradients = ['gradient-card-green', 'gradient-card-teal', 'gradient-card-cyan', 'gradient-card-blue'];
                    const gradient = gradients[index % gradients.length];
                    
                    return (
                      <Link
                        key={event.id}
                        href={`/events/${event.category}/${event.id}`}
                        className="group"
                      >
                        <div className={`gradient-card ${gradient} hover-card-effect p-6 h-full transition-transform duration-300 group-hover:scale-105`}>
                          {event.images[0] && (
                            <div className="mb-4 rounded-lg overflow-hidden">
                              <img
                                src={event.images[0]}
                                alt={event.title}
                                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                            </div>
                          )}
                          
                          <div className="flex items-center gap-2 mb-3 text-white/90 text-sm">
                            <Calendar className="w-4 h-4" />
                            <span>{formatEventDate(event.date)}</span>
                          </div>
                          
                          {event.location && (
                            <div className="flex items-center gap-2 mb-3 text-white/90 text-sm">
                              <MapPin className="w-4 h-4" />
                              <span>{event.location}</span>
                            </div>
                          )}
                          
                          <h3 className="text-xl font-bold text-white mb-2 group-hover:underline">
                            {event.title}
                          </h3>
                          
                          {event.subtitle && (
                            <p className="text-white/80 text-sm mb-3">
                              {event.subtitle}
                            </p>
                          )}
                          
                          <div className="text-white/90 text-sm">
                            {event.images.length} {event.images.length === 1 ? 'photo' : 'photos'}
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
