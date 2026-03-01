'use client';

import { motion } from 'framer-motion';

const MissionVision = () => {
  return (
    <section className="py-12 md:py-20 section-gradient">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="universal-card p-6 md:p-8 hover-card-effect hover-card-blue"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed text-base md:text-lg">
              To provide comprehensive, evidence-based developmental services that empower children and families to achieve their highest potential through personalized care, professional expertise, and compassionate support.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="universal-card p-6 md:p-8 hover-card-effect hover-card-green"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-6">Our Vision</h2>
            <p className="text-gray-700 leading-relaxed text-base md:text-lg">
              To be the leading child development centre in India, recognized for excellence in autism therapy, developmental pediatrics, and family-centered care that transforms lives and builds stronger communities.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
