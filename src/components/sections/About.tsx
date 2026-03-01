'use client';

import { motion } from 'framer-motion';
import { Microscope, Users, Target } from 'lucide-react';

const About = () => {
  return (
    <>
      {/* About Section */}
      <section className="py-12 md:py-20 bg-white">
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

      {/* Mission & Vision */}
      <section className="py-12 md:py-20 section-gradient">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="universal-card p-8 md:p-12 mb-6 md:mb-8 hover-card-effect hover-card-blue"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                To provide comprehensive, evidence-based developmental services that empower children and families to achieve their highest potential through personalized care, professional expertise, and compassionate support.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="universal-card p-8 md:p-12 hover-card-effect hover-card-green"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                To be the leading child development centre in India, recognized for excellence in autism therapy, developmental pediatrics, and family-centered care that transforms lives and builds stronger communities.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Philosophy */}
      <section className="py-12 md:py-20 bg-white">
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

      {/* Our Approach */}
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
    </>
  );
};

export default About;
