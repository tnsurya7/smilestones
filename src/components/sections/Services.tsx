'use client';

import { motion } from 'framer-motion';
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
  Calendar,
  School,
  UserCheck,
  ClipboardList
} from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Brain,
      title: 'Autism Assessment & Therapy',
      description: 'Comprehensive autism spectrum disorder assessment and evidence-based interventions.',
    },
    {
      icon: Users,
      title: 'ABA Therapy',
      description: 'Applied Behavior Analysis including DTT, NET, PRT, and Social Skills Training.',
    },
    {
      icon: MessageSquare,
      title: 'Speech Therapy',
      description: 'Speech and language therapy for communication disorders and delays.',
    },
    {
      icon: Hand,
      title: 'Occupational Therapy',
      description: 'Improving daily living skills, sensory processing, and motor development.',
    },
    {
      icon: GraduationCap,
      title: 'Special Education',
      description: 'Individualized educational programs for children with learning differences.',
    },
    {
      icon: Zap,
      title: 'ADHD Support',
      description: 'Comprehensive support for attention deficit and hyperactivity disorders.',
    },
    {
      icon: BookOpen,
      title: 'Learning Disability Support',
      description: 'Support for dyslexia, dysgraphia, dyscalculia, and other learning challenges.',
    },
    {
      icon: Heart,
      title: 'Child Counseling',
      description: 'Individual and family counseling for emotional and behavioral challenges.',
    },
    {
      icon: School,
      title: 'Smile CAMP',
      description: 'School readiness program preparing children for academic success.',
    },
    {
      icon: UserCheck,
      title: 'School Support Program',
      description: 'Ongoing support for children in mainstream educational settings.',
    },
    {
      icon: Users,
      title: 'Parent Training',
      description: 'Empowering parents with skills and strategies to support their children.',
    },
    {
      icon: ClipboardList,
      title: 'Assessments & Screening',
      description: 'Comprehensive developmental assessments and early screening services.',
    },
  ];

  return (
    <section className="py-20 section-gradient">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="text-blue-600">Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive child development services tailored to meet each child's unique needs and help them thrive.
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="service-card h-full">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors duration-300">
                    <IconComponent className="w-6 h-6 text-blue-600" />
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                    {service.description}
                  </p>
                  
                  <Link 
                    href="/services"
                    className="text-blue-600 hover:text-blue-800 font-semibold text-sm inline-flex items-center group-hover:translate-x-1 transition-transform"
                  >
                    Learn More →
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="glass-card-strong p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-xl text-gray-600 mb-8">
              Schedule a consultation to discuss your child's needs and create a personalized treatment plan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary">
                <Calendar className="w-5 h-5 mr-2" />
                Book Consultation
              </Link>
              <Link href="/services" className="btn-secondary">
                View All Services
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;