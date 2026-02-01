'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Phone, MessageCircle, Calendar } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-white hero-gradient">
      <div className="container mx-auto px-4 py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
            >
              Helping Children Reach Their{' '}
              <span className="text-blue-600">Full Potential</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl"
            >
              Professional child development centre providing assessment, therapy, and support for children with developmental delays, autism, ADHD, and learning difficulties.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
            >
              <Link href="/contact" className="btn-primary flex items-center justify-center space-x-2">
                <Calendar size={20} />
                <span>Book Appointment</span>
              </Link>
              
              <a href="tel:+919876543210" className="btn-secondary flex items-center justify-center space-x-2">
                <Phone size={20} />
                <span>Call Now</span>
              </a>
              
              <a 
                href="https://wa.me/919876543210" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-whatsapp flex items-center justify-center space-x-2"
              >
                <MessageCircle size={20} />
                <span>WhatsApp</span>
              </a>
            </motion.div>

            {/* Trust indicators - Stats Cards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-3 gap-6"
            >
              <div className="stats-card">
                <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
                <div className="text-sm text-gray-600">Children Helped</div>
              </div>
              <div className="stats-card">
                <div className="text-3xl font-bold text-green-600 mb-2">10+</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
              <div className="stats-card">
                <div className="text-3xl font-bold text-red-600 mb-2">4</div>
                <div className="text-sm text-gray-600">Locations</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right content - Glass card with founder info (NO LOGO) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="glass-card-strong p-8 text-center">
              {/* Founder Photo Placeholder */}
              <div className="w-32 h-32 mx-auto mb-6 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center">
                  <span className="text-4xl">👨‍⚕️</span>
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Dr. P. Sudhakar
              </h3>
              <p className="text-blue-600 font-semibold mb-4">
                Developmental Pediatrician & Applied Behavior Analyst
              </p>
              <p className="text-gray-600 leading-relaxed">
                First developmental pediatrician in India licensed to practice Applied Behavior Analysis from QABA Board USA
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;