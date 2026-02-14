'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Phone, MessageCircle, Calendar, Sparkles } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-[calc(100vh-80px)] md:min-h-screen flex items-center justify-center premium-gradient-bg overflow-hidden pt-4 md:pt-0">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="gradient-orb orb-1"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="gradient-orb orb-2"
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="gradient-orb orb-3"
          animate={{
            x: [0, 60, 0],
            y: [0, -40, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-8 md:py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left space-y-4 md:space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-3 md:space-y-6"
            >
              <div className="flex items-center justify-center lg:justify-start mb-2 md:mb-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="mr-2 md:mr-3"
                >
                  <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-yellow-500" />
                </motion.div>
                <span className="text-xs md:text-sm font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent uppercase tracking-wider">
                  Premium Child Development
                </span>
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-blue-900">
                  Helping Children
                </span>
                <br />
                <span className="text-gray-900">Reach Their</span>
                <br />
                <span className="text-gray-900">Full Potential</span>
              </h1>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base md:text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-2xl"
            >
              Professional child development centre providing evidence-based therapy and support for children with developmental needs.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start"
            >
              <motion.div 
                whileHover={{ scale: 1.05, y: -2 }} 
                whileTap={{ scale: 0.95 }}
                className="premium-btn-wrapper"
              >
                <Link href="/appointment" className="premium-gradient-btn primary">
                  <Calendar size={20} className="btn-icon" />
                  <span className="btn-text">Book Appointment</span>
                  <div className="btn-gradient-overlay"></div>
                  <div className="btn-glow-effect"></div>
                </Link>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05, y: -2 }} 
                whileTap={{ scale: 0.95 }}
                className="premium-btn-wrapper"
              >
                <a href="tel:+919445051166" className="premium-gradient-btn secondary blue">
                  <Phone size={20} className="btn-icon" />
                  <span className="btn-text">Call Now</span>
                  <div className="btn-gradient-overlay"></div>
                  <div className="btn-glow-effect"></div>
                </a>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05, y: -2 }} 
                whileTap={{ scale: 0.95 }}
                className="premium-btn-wrapper"
              >
                <a 
                  href="https://wa.me/919445051166" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="premium-gradient-btn secondary green"
                >
                  <MessageCircle size={20} className="btn-icon" />
                  <span className="btn-text">WhatsApp</span>
                  <div className="btn-gradient-overlay"></div>
                  <div className="btn-glow-effect"></div>
                </a>
              </motion.div>
            </motion.div>

            {/* Premium Stats Cards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-3 gap-2 md:gap-6"
            >
              <motion.div 
                className="universal-card text-center p-3 md:p-6"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-1 md:mb-2">500+</div>
                <div className="text-[10px] md:text-sm text-gray-600 leading-tight">Children Helped</div>
              </motion.div>
              <motion.div 
                className="universal-card text-center p-3 md:p-6"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-xl md:text-3xl font-bold bg-gradient-to-r from-green-600 to-cyan-600 bg-clip-text text-transparent mb-1 md:mb-2">10+</div>
                <div className="text-[10px] md:text-sm text-gray-600 leading-tight">Years Experience</div>
              </motion.div>
              <motion.div 
                className="universal-card text-center p-3 md:p-6"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-xl md:text-3xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent mb-1 md:mb-2">4</div>
                <div className="text-[10px] md:text-sm text-gray-600 leading-tight">Locations</div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right content - Premium founder card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative float-element"
          >
            <motion.div 
              className="universal-card p-8 text-center relative overflow-hidden"
              whileHover={{ scale: 1.02, y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-cyan-500/5"></div>
              
              {/* Founder Photo with professional styling */}
              <motion.div 
                className="w-32 h-32 mx-auto mb-6 relative"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 rounded-full flex items-center justify-center overflow-hidden shadow-lg border-4 border-white">
                  <img 
                    src="/sudhar.jpeg" 
                    alt="Dr. P. Sudhakar" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
              
              <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
                Dr. P. Sudhakar
              </h3>
              <p className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
                Developmental Pediatrician & Applied Behavior Analyst
              </p>
              <p className="text-gray-600 leading-relaxed relative z-10">
                First developmental pediatrician in India licensed to practice Applied Behavior Analysis from QABA Board USA
              </p>

              {/* Premium badge */}
              <motion.div
                className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold px-3 py-1 rounded-full"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Expert
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;