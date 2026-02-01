'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, Phone, Mail, MapPin, Clock } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  childAge: z.string().min(1, 'Please select child age'),
  service: z.string().min(1, 'Please select a service'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Form data:', data);
      setSubmitStatus('success');
      reset();
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = [
    'Autism Assessment & Therapy',
    'ABA Therapy',
    'Speech Therapy',
    'Occupational Therapy',
    'Special Education',
    'ADHD Support',
    'Learning Disability Support',
    'Child Counseling',
    'Smile CAMP',
    'School Support Program',
    'Parent Training',
    'Assessment & Screening',
  ];

  const ageRanges = [
    '0-2 years',
    '3-5 years',
    '6-8 years',
    '9-12 years',
    '13-16 years',
    '17+ years',
  ];

  return (
    <section className="py-20 section-bg-gradient">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="gradient-card gradient-card-multi p-8 mb-8">
              <h2 className="text-4xl font-bold text-white mb-6">
                Get in <span className="bg-gradient-to-r from-blue-200 to-blue-100 bg-clip-text text-transparent">Touch</span>
              </h2>
              <p className="text-xl text-white/95 mb-8 leading-relaxed">
                Ready to start your child's development journey? Contact us today to schedule a consultation.
              </p>
            </div>

            <div className="space-y-6">
              <div className="gradient-card gradient-card-blue flex items-start space-x-4">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">Phone</h3>
                  <p className="text-white/90">Main Office: +91 98765 43210</p>
                  <p className="text-white/90">Emergency: +91 98765 43211</p>
                </div>
              </div>

              <div className="gradient-card gradient-card-green flex items-start space-x-4">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">Email</h3>
                  <p className="text-white/90">info@smilestones.com</p>
                  <p className="text-white/90">appointments@smilestones.com</p>
                </div>
              </div>

              <div className="gradient-card gradient-card-red flex items-start space-x-4">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">Main Office</h3>
                  <p className="text-white/90">123 Anna Nagar, Chennai - 600040</p>
                  <p className="text-white/90">Tamil Nadu, India</p>
                </div>
              </div>

              <div className="gradient-card gradient-card-yellow flex items-start space-x-4">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-gray-700" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">Working Hours</h3>
                  <p className="text-gray-700">Monday - Saturday: 9:00 AM - 6:00 PM</p>
                  <p className="text-gray-700">Sunday: Closed</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-white/95 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-white/30">
              <h3 className="text-2xl font-bold text-foreground mb-6">Book a Consultation</h3>
              
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-100 border border-green-300 rounded-lg text-green-700">
                  Thank you! Your message has been sent successfully. We'll get back to you soon.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-lg text-red-700">
                  Sorry, there was an error sending your message. Please try again.
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Parent/Guardian Name *
                    </label>
                    <input
                      {...register('name')}
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Your full name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      {...register('email')}
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="your.email@example.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      {...register('phone')}
                      type="tel"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="+91 98765 43210"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Child's Age *
                    </label>
                    <select
                      {...register('childAge')}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    >
                      <option value="">Select age range</option>
                      {ageRanges.map((age) => (
                        <option key={age} value={age}>
                          {age}
                        </option>
                      ))}
                    </select>
                    {errors.childAge && (
                      <p className="mt-1 text-sm text-red-600">{errors.childAge.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service Interested In *
                  </label>
                  <select
                    {...register('service')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  >
                    <option value="">Select a service</option>
                    {services.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                  {errors.service && (
                    <p className="mt-1 text-sm text-red-600">{errors.service.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    {...register('message')}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                    placeholder="Please describe your child's needs and any specific concerns..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-gradient-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;