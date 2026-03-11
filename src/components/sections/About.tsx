'use client';

import { motion } from 'framer-motion';

const About = () => {
  return (
    <section className="py-6 md:py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6"
          >
            About <span className="text-blue-600">Smilestones</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg md:text-xl text-gray-600 leading-relaxed px-4"
          >
            A professional child development centre dedicated to helping children reach their full potential through evidence-based therapies and family-centered care.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default About;
