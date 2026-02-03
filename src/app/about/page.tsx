import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingButtons from '@/components/ui/FloatingButtons';
import { Microscope, Users, Target } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us - Smilestones Child Development Centre',
  description: 'Learn about Smilestones Child Development Centre, led by Dr. P. Sudhakar, providing professional therapy services for children with developmental needs.',
};

export default function AboutPage() {
  return (
    <main>
      <Header />
      
      {/* Breadcrumbs */}
      <div className="pb-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <nav className="text-sm text-gray-600">
            <span>Home</span> → <span className="text-blue-600 font-medium">About Us</span>
          </nav>
        </div>
      </div>

      {/* About Hero */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
              About <span className="text-blue-600">Smilestones</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed px-4">
              A professional child development centre dedicated to helping children reach their full potential through evidence-based therapies and family-centered care.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12 md:py-20 section-gradient">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div className="universal-card p-6 md:p-8 hover-card-effect hover-card-blue">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                To provide comprehensive, evidence-based developmental services that empower children and families to achieve their highest potential through personalized care, professional expertise, and compassionate support.
              </p>
            </div>
            <div className="universal-card p-6 md:p-8 hover-card-effect hover-card-green">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">Our Vision</h2>
              <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                To be the leading child development centre in India, recognized for excellence in autism therapy, developmental pediatrics, and family-centered care that transforms lives and builds stronger communities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Philosophy */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 md:mb-8">Our Philosophy</h2>
            <div className="universal-card p-8 md:p-12 hover-card-effect hover-card-purple">
              <blockquote className="text-2xl md:text-3xl font-bold text-blue-600 mb-4 md:mb-6 italic">
                "Mothers are the best therapists – We believe it, We practice it."
              </blockquote>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                At Smilestones, we understand that parents know their children best. Our approach actively involves families in the therapeutic process, providing training and support to ensure continued progress at home. This collaborative method ensures consistent, loving care both at our center and in daily life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-12 md:py-20 section-gradient">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6">Leadership</h2>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="universal-card p-8 md:p-12 text-center hover-card-effect hover-card-indigo">
              <div className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-4 md:mb-6 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center overflow-hidden">
                <svg className="w-12 h-12 md:w-16 md:h-16 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 7V9C15 11.8 12.8 14 10 14S5 11.8 5 9V7H3V9C3 12.9 6.1 16 10 16V18H8V20H16V18H14V16C17.9 16 21 12.9 21 9Z"/>
                </svg>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Dr. P. Sudhakar</h3>
              <p className="text-lg md:text-xl text-blue-600 font-semibold mb-4 md:mb-6">
                Founder & Director<br/>
                Developmental Pediatrician & Applied Behavior Analyst
              </p>
              <div className="text-left max-w-3xl mx-auto">
                <p className="text-gray-700 leading-relaxed mb-4 text-sm md:text-base">
                  Dr. P. Sudhakar is a pioneering figure in Indian developmental pediatrics, holding the distinction of being the first developmental pediatrician in India licensed to practice Applied Behavior Analysis from the QABA Board USA.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4 text-sm md:text-base">
                  With over a decade of experience in child development, Dr. Sudhakar has dedicated his career to helping children with autism, ADHD, learning disabilities, and other developmental challenges reach their full potential.
                </p>
                <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                  His evidence-based approach, combined with a deep understanding of family dynamics, has helped transform the lives of over 500 children and their families across India.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6">Our Approach</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="universal-card text-center p-6 hover-card-effect hover-card-blue">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                <Microscope className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">Evidence-Based</h3>
              <p className="text-gray-600 text-sm md:text-base">All our interventions are grounded in scientific research and proven methodologies.</p>
            </div>
            
            <div className="universal-card text-center p-6 hover-card-effect hover-card-green">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                <Users className="w-6 h-6 md:w-8 md:h-8 text-green-600" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">Family-Centered</h3>
              <p className="text-gray-600 text-sm md:text-base">We actively involve families in therapy, recognizing parents as the child's first teachers.</p>
            </div>
            
            <div className="universal-card text-center p-6 hover-card-effect hover-card-red">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                <Target className="w-6 h-6 md:w-8 md:h-8 text-red-600" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">Individualized</h3>
              <p className="text-gray-600 text-sm md:text-base">Every child is unique, and we create personalized treatment plans for each individual.</p>
            </div>
          </div>
        </div>
      </section>

      <FloatingButtons />
      <Footer />
    </main>
  );
}