import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingButtons from '@/components/ui/FloatingButtons';
import Link from 'next/link';
import { Heart, Shield, Users, Clock, CheckCircle, Phone, MessageCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Online Child Therapy | Smilestones',
  description: 'Compassionate online therapy for children. Support for anxiety, behavior challenges, mood concerns, and emotional development from certified child therapists.',
};

export default function OnlineTherapyPage() {
  const services = [
    {
      title: 'Online Kids Counselling',
      description: 'Children don\'t always have the words to explain their feelings. Our therapists use child-friendly techniques to help kids understand and express emotions in a healthy way.',
      highlight: 'Private, secure, and accessible from home.',
      icon: Heart,
    },
    {
      title: 'Child Behavior Support',
      description: 'If your child is withdrawing, arguing, or acting out, it may signal emotional overwhelm. We help families reduce stress, rebuild connection, and create healthier communication patterns.',
      icon: Users,
    },
    {
      title: 'Child Therapy Assessment',
      description: 'We provide detailed psychological assessments for emotional, behavioral, and developmental concerns.',
      features: [
        'Attention difficulties',
        'Anxiety patterns',
        'Learning concerns',
        'Emotional trauma indicators'
      ],
      highlight: 'Early understanding leads to the right support plan.',
      icon: Shield,
    },
  ];

  const helpCategories = [
    {
      title: 'Anxiety & Worries',
      items: ['Social anxiety', 'General anxiety', 'Panic episodes', 'Specific fears'],
      color: 'blue',
    },
    {
      title: 'Depression & Mood Changes',
      items: ['Sadness', 'Irritability', 'Loneliness', 'Emotional withdrawal'],
      color: 'purple',
    },
    {
      title: 'Behavioral Challenges',
      items: ['Tantrums', 'Defiance', 'Impulsivity', 'Obsessive patterns'],
      color: 'red',
    },
    {
      title: 'Adjustments & Transitions',
      items: ['School transitions', 'Camp transitions', 'Bullying', 'Trauma'],
      color: 'green',
    },
  ];

  const whyOnline = [
    'Safe and familiar environment for your child',
    'No travel stress',
    'Flexible scheduling',
    'Confidential and secure sessions',
    'Parent guidance included',
  ];

  return (
    <main>
      <Header />
      
      {/* Breadcrumbs */}
      <div className="pt-6 pb-4 bg-gray-50">
        <div className="container mx-auto px-4">
          <nav className="text-sm text-gray-600">
            <span>Home</span> → <span className="text-blue-600 font-medium">Online Therapy</span>
          </nav>
        </div>
      </div>
      
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 opacity-50"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
              Online Therapy for Kids – Talk to a <span className="text-blue-600">Child Counselor</span> Today
            </h1>
            
            <p className="text-lg md:text-xl text-gray-900 mb-3 md:mb-4 font-semibold">
              Worried about your child's behavior, emotions, or school struggles?
            </p>
            
            <p className="text-base md:text-lg text-gray-800 mb-6 md:mb-8 leading-relaxed px-4">
              Smilestones offers compassionate, expert-led therapy for anxiety, tantrums, attention issues, and emotional shutdowns.
            </p>
            
            <div className="universal-card p-6 md:p-8 mb-8 md:mb-10 max-w-2xl mx-auto hover-card-effect bg-white shadow-lg border border-gray-100">
              <p className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                Online sessions from the comfort of your home.
              </p>
              <p className="text-base md:text-lg text-gray-700">
                No travel. No stress. Just real help that works.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://wa.me/919445051166" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-primary text-center inline-flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Book Online Session</span>
              </a>
              <a 
                href="tel:+919445051166" 
                className="btn-secondary text-center inline-flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                <span>Talk to Counselor</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 md:mb-8">
              Therapy & Counseling Services for <span className="text-blue-600">Children and Teens</span>
            </h2>
            
            <div className="text-left space-y-4 md:space-y-6 text-base md:text-lg text-gray-700 leading-relaxed">
              <p>
                Every child struggles sometimes with emotions, school pressure, sudden behavior changes, or fears they can't explain.
              </p>
              
              <p>
                At Smilestones, we provide professional online therapy designed specifically for children and adolescents. Our experienced child therapists create a safe, supportive space where children can express themselves freely and parents receive meaningful guidance.
              </p>
              
              <p className="font-semibold text-gray-900">
                Whether it's anxiety, anger, attention challenges, or emotional withdrawal, we are here to support your child's journey toward healing and growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 md:py-20 section-gradient">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              
              return (
                <div key={service.title} className="universal-card hover-card-effect p-6 md:p-8 flex flex-col bg-white">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 md:mb-6 mx-auto">
                    <IconComponent className="w-7 h-7 md:w-8 md:h-8 text-blue-600" />
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4 text-center">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed mb-4 text-sm md:text-base text-center flex-grow">
                    {service.description}
                  </p>
                  
                  {service.features && (
                    <div className="mb-4">
                      <p className="font-semibold text-gray-900 mb-2 text-sm md:text-base">Including:</p>
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start">
                            <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-600 rounded-full mt-1.5 md:mt-2 mr-2 md:mr-3 flex-shrink-0"></div>
                            <span className="text-gray-600 text-sm md:text-base">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {service.highlight && (
                    <p className="text-blue-600 font-semibold text-center text-sm md:text-base mt-auto">
                      {service.highlight}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* What We Help With */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 md:mb-12 text-center">
              What We <span className="text-blue-600">Help With</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {helpCategories.map((category, index) => {
                return (
                  <div key={category.title} className="universal-card hover-card-effect p-6 md:p-8 bg-white">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">
                      {category.title}
                    </h3>
                    
                    <ul className="space-y-3">
                      {category.items.map((item, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle className="w-5 h-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 text-sm md:text-base">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Why Online Therapy Works */}
      <section className="py-12 md:py-20 section-gradient">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 md:mb-12 text-center">
              Why Choose <span className="text-blue-600">Online Therapy</span> at Smilestones?
            </h2>
            
            <div className="universal-card hover-card-effect p-8 md:p-12 bg-white">
              <ul className="space-y-4 md:space-y-6">
                {whyOnline.map((point, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                    </div>
                    <span className="text-gray-700 text-base md:text-lg pt-1">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="universal-card hover-card-effect p-8 md:p-12 text-center max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
              Your Child Deserves Support That <span className="text-blue-600">Truly Understands Them</span>
            </h2>
            
            <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8 leading-relaxed px-4">
              Early support makes a lifelong difference. Let's help your child build confidence, resilience, and emotional strength.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://wa.me/919445051166" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-primary text-center inline-flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                <span>WhatsApp Us</span>
              </a>
              <Link 
                href="/contact" 
                className="btn-secondary text-center inline-flex items-center justify-center gap-2"
              >
                <span>Contact Us</span>
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
