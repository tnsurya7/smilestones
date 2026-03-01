'use client';

import { motion } from 'framer-motion';
import { Microscope, Users, Target } from 'lucide-react';

const OurApproach = () => {
  return (
    <section className="py-12 md:py-20 section-gradient">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6"
          >
            Our Approach
          </motion.h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="universal-card text-center p-6 hover-card-effect hover-card-blue"
          >
            <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
              <Microscope className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">Evidence-Based</h3>
            <p className="text-gray-600 text-sm md:text-base">All our interventions are grounded in scientific research and proven methodologies.</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="universal-card text-center p-6 hover-card-effect hover-card-green"
          >
            <div className="w-12 h-12 md:w-16 md:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
              <Users className="w-6 h-6 md:w-8 md:h-8 text-green-600" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">Family-Centered</h3>
            <p className="text-gray-600 text-sm md:text-base">We actively involve families in therapy, recognizing parents as the child's first teachers.</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="universal-card text-center p-6 hover-card-effect hover-card-red"
          >
            <div className="w-12 h-12 md:w-16 md:h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
              <Target className="w-6 h-6 md:w-8 md:h-8 text-red-600" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">Individualized</h3>
            <p className="text-gray-600 text-sm md:text-base">Every child is unique, and we create personalized treatment plans for each individual.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OurApproach;
