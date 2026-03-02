import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingButtons from '@/components/ui/FloatingButtons';
import Link from 'next/link';
import { Users, Stethoscope, GraduationCap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Events & Workshops | Smilestones',
  description: 'Explore our training programs and workshops for parents, pediatricians, and teaching institutes. Empowering communities through education and awareness.',
};

export default function EventsPage() {
  const categories = [
    {
      title: 'Parents Training',
      description: 'Comprehensive training programs designed to empower parents with skills and strategies to support their child\'s development journey.',
      icon: Users,
      href: '/events/parents-training',
      gradient: 'gradient-card-blue',
      image: '/events/parents-training.jpg',
    },
    {
      title: 'Pediatricians',
      description: 'Professional development workshops and conferences for pediatricians focusing on developmental pediatrics and evidence-based interventions.',
      icon: Stethoscope,
      href: '/events/pediatricians',
      gradient: 'gradient-card-green',
      image: '/events/pediatricians.jpg',
    },
    {
      title: 'Teaching Institutes',
      description: 'Educational programs for teachers and institutions to create inclusive learning environments and support children with special needs.',
      icon: GraduationCap,
      href: '/events/teaching-institutes',
      gradient: 'gradient-card-purple',
      image: '/events/teaching-institutes.jpg',
    },
  ];

  return (
    <main>
      <Header />
      
      {/* Breadcrumbs */}
      <div className="pt-6 pb-4 bg-gray-50">
        <div className="container mx-auto px-4">
          <nav className="text-sm text-gray-600">
            <span>Home</span> → <span className="text-blue-600 font-medium">Events</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
              Events & <span className="text-blue-600">Workshops</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed px-4">
              Empowering communities through education, training, and awareness programs. Explore our workshops and events designed for parents, healthcare professionals, and educators.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-12 md:py-20 section-gradient">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {categories.map((category, index) => {
              const IconComponent = category.icon;
              
              return (
                <Link
                  key={category.title}
                  href={category.href}
                  className="group"
                >
                  <div className={`gradient-card ${category.gradient} hover-card-effect p-6 md:p-8 h-full flex flex-col transition-transform duration-300 group-hover:scale-105`}>
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 md:mb-6 mx-auto shadow-lg">
                      <IconComponent className="w-8 h-8 md:w-10 md:h-10 text-white" />
                    </div>
                    
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4 text-center">
                      {category.title}
                    </h2>
                    
                    <p className="text-white/90 leading-relaxed mb-6 text-sm md:text-base text-center flex-grow">
                      {category.description}
                    </p>
                    
                    <div className="text-center">
                      <span className="inline-flex items-center text-white font-semibold text-sm md:text-base group-hover:underline">
                        View Programs →
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <FloatingButtons />
      <Footer />
    </main>
  );
}
