'use client';

import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Phone, MessageCircle, Calendar } from 'lucide-react';

// Counter component for animated numbers
const AnimatedCounter = ({ value, suffix = '' }: { value: number; suffix?: string }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const count = useMotionValue(0);

  useEffect(() => {
    const controls = animate(count, value, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (latest) => {
        setDisplayValue(Math.round(latest));
      }
    });
    return controls.stop;
  }, [count, value]);

  return <span>{displayValue}{suffix}</span>;
};

const Hero = () => {
  return (
    <section className="relative min-h-fit md:min-h-screen flex items-center justify-center premium-gradient-bg overflow-hidden py-8 md:py-12 lg:py-20">
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

      <div className="container mx-auto px-4 py-2 md:py-4 lg:py-8 relative z-10">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-16">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left space-y-4 md:space-y-6 lg:space-y-8 order-1"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-3 md:space-y-4 lg:space-y-6"
            >
              <div className="flex items-center justify-center lg:justify-start">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                  <span className="text-blue-900">
                    Helping Children
                  </span>
                  <br />
                  <span className="text-gray-900">Reach Their</span>
                  <br />
                  <span className="text-gray-900">Full Potential</span>
                </h1>
              </div>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-sm md:text-lg lg:text-xl xl:text-2xl text-gray-600 leading-relaxed max-w-2xl"
            >
              Professional child development centre providing evidence-based therapy and support for children with developmental needs.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col lg:grid lg:grid-cols-2 gap-2 md:gap-3 lg:gap-4 items-center lg:items-start"
            >
              <motion.div 
                whileHover={{ scale: 1.05, y: -2 }} 
                whileTap={{ scale: 0.95 }}
                className="premium-btn-wrapper w-full"
              >
                <Link href="/appointment" className="premium-gradient-btn primary text-xs md:text-sm py-2 md:py-3 w-full justify-center">
                  <Calendar size={16} className="btn-icon md:w-5 md:h-5" />
                  <span className="btn-text">Book Appointment</span>
                  <div className="btn-gradient-overlay"></div>
                  <div className="btn-glow-effect"></div>
                </Link>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05, y: -2 }} 
                whileTap={{ scale: 0.95 }}
                className="premium-btn-wrapper w-full"
              >
                <Link href="/therapy" className="premium-gradient-btn primary text-xs md:text-sm py-2 md:py-3 w-full justify-center">
                  <Calendar size={16} className="btn-icon md:w-5 md:h-5" />
                  <span className="btn-text">Register for Therapy</span>
                  <div className="btn-gradient-overlay"></div>
                  <div className="btn-glow-effect"></div>
                </Link>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05, y: -2 }} 
                whileTap={{ scale: 0.95 }}
                className="premium-btn-wrapper w-full"
              >
                <a href="tel:+919445051166" className="premium-gradient-btn secondary blue text-xs md:text-sm py-2 md:py-3 w-full justify-center">
                  <Phone size={16} className="btn-icon md:w-5 md:h-5" />
                  <span className="btn-text">Call Now</span>
                  <div className="btn-gradient-overlay"></div>
                  <div className="btn-glow-effect"></div>
                </a>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05, y: -2 }} 
                whileTap={{ scale: 0.95 }}
                className="premium-btn-wrapper w-full"
              >
                <a 
                  href="https://wa.me/919445051166" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="premium-gradient-btn secondary green text-xs md:text-sm py-2 md:py-3 w-full justify-center"
                >
                  <MessageCircle size={16} className="btn-icon md:w-5 md:h-5" />
                  <span className="btn-text">WhatsApp</span>
                  <div className="btn-gradient-overlay"></div>
                  <div className="btn-glow-effect"></div>
                </a>
              </motion.div>
            </motion.div>

            {/* Statistics cards - Mobile only */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="w-full lg:hidden"
            >
              <div className="grid grid-cols-3 gap-2 md:gap-3">
                <motion.div 
                  className="universal-card text-center p-2 md:p-3"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-lg md:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-0.5">
                    <AnimatedCounter value={1500} suffix="+" />
                  </div>
                  <div className="text-[8px] md:text-[10px] text-gray-600 leading-tight">Children Screened</div>
                </motion.div>
                <motion.div 
                  className="universal-card text-center p-2 md:p-3"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-lg md:text-xl font-bold bg-gradient-to-r from-green-600 to-cyan-600 bg-clip-text text-transparent mb-0.5">
                    <AnimatedCounter value={600} suffix="+" />
                  </div>
                  <div className="text-[8px] md:text-[10px] text-gray-600 leading-tight">Autism Managed</div>
                </motion.div>
                <motion.div 
                  className="universal-card text-center p-2 md:p-3"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-lg md:text-xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent mb-0.5">
                    <AnimatedCounter value={600} suffix="+" />
                  </div>
                  <div className="text-[8px] md:text-[10px] text-gray-600 leading-tight">Parents Trained</div>
                </motion.div>
                <motion.div 
                  className="universal-card text-center p-2 md:p-3"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-lg md:text-xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent mb-0.5">
                    <AnimatedCounter value={720} suffix="+" />
                  </div>
                  <div className="text-[8px] md:text-[10px] text-gray-600 leading-tight">Teachers Trained</div>
                </motion.div>
                <motion.div 
                  className="universal-card text-center p-2 md:p-3"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-lg md:text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-0.5">
                    <AnimatedCounter value={12} suffix="+" />
                  </div>
                  <div className="text-[8px] md:text-[10px] text-gray-600 leading-tight">Pediatrician Workshops</div>
                </motion.div>
                <motion.div 
                  className="universal-card text-center p-2 md:p-3"
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-lg md:text-xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-0.5">
                    <AnimatedCounter value={8} suffix="+" />
                  </div>
                  <div className="text-[8px] md:text-[10px] text-gray-600 leading-tight">Parental Workshops</div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right content - Premium founder card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative float-element order-4 lg:order-3 space-y-4"
          >
            <motion.div 
              className="universal-card p-4 md:p-6 lg:p-8 text-center relative overflow-hidden"
              whileHover={{ scale: 1.02, y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-cyan-500/5"></div>
              
              {/* Founder Photo with professional styling */}
              <motion.div 
                className="w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 mx-auto mb-3 md:mb-4 lg:mb-6 relative"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 rounded-full flex items-center justify-center overflow-hidden shadow-lg border-2 md:border-4 border-white">
                  <img 
                    src="/sudhar.jpeg" 
                    alt="Dr. P. Sudhakar" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
              
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-1 md:mb-2">
                Dr. P. Sudhakar
              </h3>
              <p className="text-sm md:text-base lg:text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2 md:mb-3 lg:mb-4">
                Developmental Pediatrician & Applied Behavior Analyst
              </p>
              <p className="text-xs md:text-sm lg:text-base text-gray-600 leading-relaxed relative z-10">
                First developmental pediatrician in India licensed to practice Applied Behavior Analysis from QABA Board USA
              </p>

              {/* Premium badge */}
              <motion.div
                className="absolute top-2 right-2 md:top-4 md:right-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-[10px] md:text-xs font-bold px-2 py-0.5 md:px-3 md:py-1 rounded-full"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Expert
              </motion.div>
            </motion.div>

            {/* Statistics cards below doctor card - Desktop only */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="hidden lg:grid lg:grid-cols-3 gap-3"
            >
              <motion.div 
                className="universal-card text-center p-3"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-1">
                  <AnimatedCounter value={1500} suffix="+" />
                </div>
                <div className="text-xs text-gray-600 leading-tight">Children Screened</div>
              </motion.div>
              <motion.div 
                className="universal-card text-center p-3"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-cyan-600 bg-clip-text text-transparent mb-1">
                  <AnimatedCounter value={600} suffix="+" />
                </div>
                <div className="text-xs text-gray-600 leading-tight">Autism Managed</div>
              </motion.div>
              <motion.div 
                className="universal-card text-center p-3"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-2xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent mb-1">
                  <AnimatedCounter value={600} suffix="+" />
                </div>
                <div className="text-xs text-gray-600 leading-tight">Parents Trained</div>
              </motion.div>
              <motion.div 
                className="universal-card text-center p-3"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent mb-1">
                  <AnimatedCounter value={720} suffix="+" />
                </div>
                <div className="text-xs text-gray-600 leading-tight">Teachers Trained</div>
              </motion.div>
              <motion.div 
                className="universal-card text-center p-3"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-1">
                  <AnimatedCounter value={12} suffix="+" />
                </div>
                <div className="text-xs text-gray-600 leading-tight">Pediatrician Workshops</div>
              </motion.div>
              <motion.div 
                className="universal-card text-center p-3"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-1">
                  <AnimatedCounter value={8} suffix="+" />
                </div>
                <div className="text-xs text-gray-600 leading-tight">Parental Workshops</div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;