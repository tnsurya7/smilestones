'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Mother of Arjun (Age 6)',
      content: 'Dr. Sudhakar and the team at Smilestones have been incredible. My son Arjun has made remarkable progress with his speech therapy. The personalized approach and caring staff make all the difference.',
      rating: 5,
      image: '👩‍💼',
      gradient: 'gradient-card-blue',
    },
    {
      name: 'Rajesh Kumar',
      role: 'Father of Meera (Age 8)',
      content: 'The ABA therapy program has transformed our daughter\'s life. She\'s more confident, communicates better, and is thriving in school. We\'re so grateful for the professional support.',
      rating: 5,
      image: '👨‍💼',
      gradient: 'gradient-card-green',
    },
    {
      name: 'Anita Reddy',
      role: 'Mother of Karthik (Age 5)',
      content: 'The occupational therapy sessions have helped Karthik develop essential life skills. The therapists are patient, skilled, and truly care about each child\'s progress.',
      rating: 5,
      image: '👩‍🏫',
      gradient: 'gradient-card-red',
    },
    {
      name: 'Suresh Patel',
      role: 'Father of Riya (Age 7)',
      content: 'Smilestones\' approach to ADHD support has been life-changing. The strategies we learned help Riya focus better at home and school. Highly recommend their services.',
      rating: 5,
      image: '👨‍🔬',
      gradient: 'gradient-card-yellow',
    },
  ];

  return (
    <section className="py-20 section-bg-gradient">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="gradient-card gradient-card-multi p-8 inline-block rounded-3xl mb-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              What <span className="bg-gradient-to-r from-red-200 to-red-100 bg-clip-text text-transparent">Parents Say</span>
            </h2>
            <p className="text-xl text-white/95 max-w-3xl mx-auto leading-relaxed">
              Real stories from families who have experienced the positive impact of our services.
            </p>
          </div>
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className={`gradient-card ${testimonial.gradient} h-full relative overflow-hidden`}>
                {/* Animated background pattern */}
                <div className="absolute inset-0 opacity-10">
                  <motion.div 
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute top-4 right-4 w-16 h-16 border-2 border-white/30 rounded-full"
                  ></motion.div>
                  <motion.div 
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute bottom-4 left-4 w-12 h-12 bg-white/20 rounded-full"
                  ></motion.div>
                </div>

                <div className="relative z-10">
                  {/* Quote icon */}
                  <div className={`absolute top-4 right-4 ${testimonial.gradient === 'gradient-card-yellow' ? 'text-gray-600/30' : 'text-white/30'}`}>
                    <Quote size={40} />
                  </div>

                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <Star className={`w-5 h-5 fill-current ${
                          testimonial.gradient === 'gradient-card-yellow' ? 'text-yellow-600' : 'text-yellow-300'
                        }`} />
                      </motion.div>
                    ))}
                  </div>

                  {/* Content */}
                  <p className={`leading-relaxed mb-6 text-lg italic font-medium ${
                    testimonial.gradient === 'gradient-card-yellow' ? 'text-gray-700' : 'text-white/95'
                  }`}>
                    "{testimonial.content}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-3xl mr-4 shadow-lg"
                    >
                      {testimonial.image}
                    </motion.div>
                    <div>
                      <h4 className={`font-bold text-lg ${
                        testimonial.gradient === 'gradient-card-yellow' ? 'text-gray-800' : 'text-white'
                      }`}>
                        {testimonial.name}
                      </h4>
                      <p className={`text-sm ${
                        testimonial.gradient === 'gradient-card-yellow' ? 'text-gray-600' : 'text-white/80'
                      }`}>
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-6"
        >
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="gradient-card gradient-card-blue text-center"
          >
            <motion.div 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold mb-2"
            >
              500+
            </motion.div>
            <div className="text-white/90">Children Helped</div>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="gradient-card gradient-card-green text-center"
          >
            <motion.div 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl font-bold mb-2"
            >
              10+
            </motion.div>
            <div className="text-white/90">Years Experience</div>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="gradient-card gradient-card-red text-center col-span-2 md:col-span-1"
          >
            <motion.div 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl font-bold mb-2"
            >
              4
            </motion.div>
            <div className="text-white/90">Locations</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;