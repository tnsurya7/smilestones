'use client';

import { motion } from 'framer-motion';

const Philosophy = () => {
  return (
    <section className="-mt-4 py-6 md:-mt-6 md:py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 md:mb-8"
          >
            Our Philosophy
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="universal-card p-8 md:p-12 hover-card-effect hover-card-purple"
          >
            <blockquote className="text-2xl md:text-3xl font-bold text-blue-600 mb-4 md:mb-6 italic">
              "Mothers are the best therapists – We believe it, We practice it."
            </blockquote>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              At Smilestones, we understand that parents know their children best. Our approach actively involves families in the therapeutic process, providing training and support to ensure continued progress at home. This collaborative method ensures consistent, loving care both at our center and in daily life.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
