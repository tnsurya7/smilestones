import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingButtons from '@/components/ui/FloatingButtons';
import Link from 'next/link';
import { 
  Brain, 
  MessageSquare, 
  Hand, 
  GraduationCap, 
  Zap, 
  Heart, 
  BookOpen, 
  Users,
  School,
  UserCheck,
  ClipboardList
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Services - Smilestones Child Development Centre',
  description: 'Comprehensive child development services including autism therapy, ABA therapy, speech therapy, occupational therapy, and more.',
};

export default function ServicesPage() {
  const services = [
    {
      icon: Brain,
      title: 'Autism Assessment & Therapy',
      description: 'Comprehensive autism spectrum disorder assessment and evidence-based interventions using the latest diagnostic tools and therapeutic approaches.',
      features: ['ADOS-2 Assessment', 'Early Intervention', 'Social Skills Training', 'Sensory Integration'],
    },
    {
      icon: Users,
      title: 'ABA Therapy',
      description: 'Applied Behavior Analysis including Discrete Trial Training (DTT), Natural Environment Teaching (NET), Pivotal Response Treatment (PRT), and Social Skills Training.',
      features: ['DTT Programs', 'NET Strategies', 'PRT Techniques', 'Behavior Management'],
    },
    {
      icon: MessageSquare,
      title: 'Speech Therapy',
      description: 'Comprehensive speech and language therapy for communication disorders, delays, and articulation challenges.',
      features: ['Language Development', 'Articulation Therapy', 'Fluency Training', 'AAC Systems'],
    },
    {
      icon: Hand,
      title: 'Occupational Therapy',
      description: 'Improving daily living skills, sensory processing, fine motor development, and adaptive behaviors.',
      features: ['Sensory Integration', 'Fine Motor Skills', 'Daily Living Skills', 'Adaptive Equipment'],
    },
    {
      icon: GraduationCap,
      title: 'Special Education',
      description: 'Individualized educational programs designed for children with learning differences and developmental delays.',
      features: ['IEP Development', 'Academic Support', 'Learning Strategies', 'Curriculum Adaptation'],
    },
    {
      icon: Zap,
      title: 'ADHD Support',
      description: 'Comprehensive support for attention deficit and hyperactivity disorders through behavioral interventions and family training.',
      features: ['Attention Training', 'Behavioral Strategies', 'Parent Coaching', 'School Collaboration'],
    },
    {
      icon: BookOpen,
      title: 'Learning Disability Support',
      description: 'Specialized support for dyslexia, dysgraphia, dyscalculia, and other specific learning challenges.',
      features: ['Reading Programs', 'Writing Support', 'Math Interventions', 'Study Skills'],
    },
    {
      icon: Heart,
      title: 'Child & Adolescent Counseling',
      description: 'Individual and family counseling for emotional, behavioral, and social challenges.',
      features: ['Individual Therapy', 'Family Counseling', 'Behavioral Support', 'Crisis Intervention'],
    },
    {
      icon: School,
      title: 'Smile CAMP',
      description: 'School readiness program preparing children for academic success and social integration.',
      features: ['Pre-Academic Skills', 'Social Preparation', 'Routine Building', 'Independence Training'],
    },
    {
      icon: UserCheck,
      title: 'School Support Program',
      description: 'Ongoing support for children in mainstream educational settings with regular monitoring and consultation.',
      features: ['Teacher Training', 'Classroom Strategies', 'Progress Monitoring', 'IEP Support'],
    },
    {
      icon: Users,
      title: 'Parent Training Programs',
      description: 'Comprehensive training programs empowering parents with skills and strategies to support their children.',
      features: ['Behavior Management', 'Communication Strategies', 'Home Programs', 'Support Groups'],
    },
    {
      icon: ClipboardList,
      title: 'Assessments & Screening',
      description: 'Comprehensive developmental assessments and early screening services using standardized tools.',
      features: ['Developmental Screening', 'Cognitive Assessment', 'Behavioral Evaluation', 'Progress Monitoring'],
    },
  ];

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Breadcrumbs */}
      <div className="pt-32 pb-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <nav className="text-sm text-gray-600">
            <span>Home</span> → <span className="text-blue-600 font-medium">Services</span>
          </nav>
        </div>
      </div>

      {/* Services Hero */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our <span className="text-blue-600">Services</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Comprehensive child development services tailored to meet each child's unique needs and help them thrive in all areas of development.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 section-gradient">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div key={service.title} className="service-card">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                      <IconComponent className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
                  </div>
                  
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {service.description}
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-600">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Link 
                    href="/contact"
                    className="text-blue-600 hover:text-blue-800 font-semibold inline-flex items-center"
                  >
                    Learn More →
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="glass-card-strong p-12 text-center max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Schedule a consultation to discuss your child's needs and create a personalized treatment plan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary">
                Book Consultation
              </Link>
              <a href="tel:+919876543210" className="btn-secondary">
                Call Now
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