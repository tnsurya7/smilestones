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
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Comprehensive Child Development Services
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Evidence-based therapies and support programs designed to help every child reach their full potential.
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            const gradientClasses = [
              'hover-card-blue',
              'hover-card-green', 
              'hover-card-red',
              'hover-card-purple',
              'hover-card-yellow',
              'hover-card-indigo',
              'hover-card-blue',
              'hover-card-green',
              'hover-card-red',
              'hover-card-purple',
              'hover-card-yellow',
              'hover-card-indigo'
            ];
            const gradientClass = gradientClasses[index % gradientClasses.length];
            const iconGradients = [
              'from-purple-500 to-blue-500',
              'from-blue-500 to-cyan-500', 
              'from-cyan-500 to-green-500',
              'from-green-500 to-yellow-500',
              'from-yellow-500 to-red-500',
              'from-red-500 to-pink-500',
              'from-pink-500 to-purple-500',
              'from-indigo-500 to-purple-500',
              'from-teal-500 to-blue-500',
              'from-orange-500 to-red-500',
              'from-emerald-500 to-teal-500',
              'from-violet-500 to-purple-500'
            ];
            const iconGradient = iconGradients[index % iconGradients.length];
            
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <motion.div 
                  className={`universal-card hover-card-effect ${gradientClass} h-full relative overflow-hidden`}
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div 
                    className={`w-16 h-16 bg-gradient-to-br ${iconGradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg relative z-10`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </motion.div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-blue-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {service.description}
                  </p>
                  
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Link 
                      href="/services"
                      className={`inline-flex items-center font-semibold bg-gradient-to-r ${iconGradient} bg-clip-text text-transparent hover:opacity-80 transition-opacity`}
                    >
                      Learn More 
                      <motion.span
                        className="ml-2"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </Link>
                  </motion.div>

                  {/* Premium shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-1000"></div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Premium CTA section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="premium-cta-card">
            <div className="cta-content">
              <motion.div
                initial={{ scale: 0.9 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.6 }}
                className="cta-header"
              >
                <h3 className="cta-title">Ready to Get Started?</h3>
                <p className="cta-description">
                  Schedule a consultation to discuss your child's needs and create a personalized treatment plan.
                </p>
              </motion.div>
              
              <motion.div 
                className="cta-buttons"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/contact" className="premium-gradient-btn primary">
                    <Calendar className="btn-icon" />
                    <span className="btn-text">Book Appointment</span>
                    <div className="btn-gradient-overlay"></div>
                    <div className="btn-glow-effect"></div>
                  </Link>
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/services" className="premium-gradient-btn secondary blue">
                    <span className="btn-text">View All Services</span>
                    <div className="btn-gradient-overlay"></div>
                    <div className="btn-glow-effect"></div>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
            
            {/* Animated background pattern */}
            <div className="animated-bg-pattern"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;