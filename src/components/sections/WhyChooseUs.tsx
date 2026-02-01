'use client';

import { motion } from 'framer-motion';
import { Award, Users, Heart, Clock, Shield, Star } from 'lucide-react';

const WhyChooseUs = () => {
  const features = [
    {
      icon: Award,
      title: 'Expert Leadership',
      description: 'Led by Dr. P. Sudhakar, the first developmental pediatrician in India licensed to practice Applied Behavior Analysis from QABA Board USA.',
    },
    {
      icon: Users,
      title: 'Family-Centered Approach',
      description: 'We believe mothers are the best therapists. Parents and caretakers are actively involved in every step of the therapy process.',
    },
    {
      icon: Heart,
      title: 'Personalized Care',
      description: 'Every child is unique. We create individualized treatment plans tailored to each child\'s specific needs and goals.',
    },
    {
      icon: Clock,
      title: 'Comprehensive Services',
      description: 'From assessment to therapy, training to counseling - we provide a complete range of child development services under one roof.',
    },
    {
      icon: Shield,
      title: 'Evidence-Based Methods',
      description: 'All our interventions are based on scientific research and proven methodologies for maximum effectiveness.',
    },
    {
      icon: Star,
      title: 'Proven Results',
      description: 'Over 500 children have benefited from our services across 4 locations with 10+ years of experience and measurable progress outcomes.',
    },
  ];

  return (
    <section className="py-20 bg-white">
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
            Why Choose <span className="text-green-600">Smilestones</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're committed to providing the highest quality care and support for your child's development journey.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="service-card h-full text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6 mx-auto group-hover:bg-blue-200 transition-colors duration-300">
                    <IconComponent className="w-8 h-8 text-blue-600" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Philosophy section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="glass-card-strong p-12 text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Philosophy
            </h3>
            <p className="text-2xl text-blue-600 mb-6 italic font-semibold">
              "Mothers are the best therapists – We believe it, We practice it."
            </p>
            <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
              At Smilestones, we understand that parents know their children best. That's why we actively involve families in the therapeutic process, providing training and support to ensure continued progress at home. Our collaborative approach ensures that every child receives consistent, loving care both at our center and in their daily environment.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;