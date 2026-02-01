import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingButtons from '@/components/ui/FloatingButtons';

export const metadata: Metadata = {
  title: 'About Us - Smilestones Child Development Centre',
  description: 'Learn about Smilestones Child Development Centre, led by Dr. P. Sudhakar, providing professional therapy services for children with developmental needs.',
};

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Breadcrumbs */}
      <div className="pt-32 pb-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <nav className="text-sm text-gray-600">
            <span>Home</span> → <span className="text-blue-600 font-medium">About Us</span>
          </nav>
        </div>
      </div>

      {/* About Hero */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About <span className="text-blue-600">Smilestones</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              A professional child development centre dedicated to helping children reach their full potential through evidence-based therapies and family-centered care.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 section-gradient">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="glass-card p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                To provide comprehensive, evidence-based developmental services that empower children and families to achieve their highest potential through personalized care, professional expertise, and compassionate support.
              </p>
            </div>
            <div className="glass-card p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                To be the leading child development centre in India, recognized for excellence in autism therapy, developmental pediatrics, and family-centered care that transforms lives and builds stronger communities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Philosophy */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Our Philosophy</h2>
            <div className="glass-card-strong p-12">
              <blockquote className="text-3xl font-bold text-blue-600 mb-6 italic">
                "Mothers are the best therapists – We believe it, We practice it."
              </blockquote>
              <p className="text-lg text-gray-700 leading-relaxed">
                At Smilestones, we understand that parents know their children best. Our approach actively involves families in the therapeutic process, providing training and support to ensure continued progress at home. This collaborative method ensures consistent, loving care both at our center and in daily life.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 section-gradient">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Leadership</h2>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="glass-card-strong p-12 text-center">
              <div className="w-32 h-32 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                <span className="text-5xl">👨‍⚕️</span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">Dr. P. Sudhakar</h3>
              <p className="text-xl text-blue-600 font-semibold mb-6">
                Founder & Director<br/>
                Developmental Pediatrician & Applied Behavior Analyst
              </p>
              <div className="text-left max-w-3xl mx-auto">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Dr. P. Sudhakar is a pioneering figure in Indian developmental pediatrics, holding the distinction of being the first developmental pediatrician in India licensed to practice Applied Behavior Analysis from the QABA Board USA.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  With over a decade of experience in child development, Dr. Sudhakar has dedicated his career to helping children with autism, ADHD, learning disabilities, and other developmental challenges reach their full potential.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  His evidence-based approach, combined with a deep understanding of family dynamics, has helped transform the lives of over 500 children and their families across India.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Approach</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="service-card text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🔬</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Evidence-Based</h3>
              <p className="text-gray-600">All our interventions are grounded in scientific research and proven methodologies.</p>
            </div>
            
            <div className="service-card text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">👨‍👩‍👧‍👦</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Family-Centered</h3>
              <p className="text-gray-600">We actively involve families in therapy, recognizing parents as the child's first teachers.</p>
            </div>
            
            <div className="service-card text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Individualized</h3>
              <p className="text-gray-600">Every child is unique, and we create personalized treatment plans for each individual.</p>
            </div>
          </div>
        </div>
      </section>

      <FloatingButtons />
      <Footer />
    </main>
  );
}