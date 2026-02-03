'use client';

import { useState } from 'react';
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
    <section className="py-12 md:py-20 section-bg-gradient pt-28 md:pt-32">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Information */}
          <div className="order-2 lg:order-1">
            <div className="universal-card p-6 md:p-8 mb-6 md:mb-8 hover-card-effect text-white" style={{
              background: 'linear-gradient(135deg, #f59e0b, #f97316)',
              borderRadius: '24px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.12)'
            }}>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6" style={{ color: '#ffffff' }}>
                Get in <span className="font-bold" style={{ color: '#ffffff' }}>Touch</span>
              </h2>
              <p className="text-lg md:text-xl mb-6 md:mb-8 leading-relaxed font-medium" style={{ color: '#ffffff' }}>
                Ready to start your child's development journey? Contact us today to schedule a consultation.
              </p>
            </div>

            <div className="space-y-4 md:space-y-6">
              <div className="universal-card hover-card-effect contact-info-card flex items-start space-x-3 md:space-x-4 p-4 md:p-6" style={{
                background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                borderRadius: '24px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.12)'
              }}>
                <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 md:w-6 md:h-6" style={{ color: '#ffffff', opacity: 0.9 }} />
                </div>
                <div>
                  <h3 className="font-bold mb-1 text-sm md:text-base" style={{ color: '#ffffff' }}>Phone</h3>
                  <p className="text-xs md:text-sm font-medium" style={{ color: '#ffffff' }}>Main Office: +91 98765 43210</p>
                  <p className="text-xs md:text-sm font-medium" style={{ color: '#ffffff' }}>Emergency: +91 98765 43211</p>
                </div>
              </div>

              <div className="universal-card hover-card-effect contact-info-card flex items-start space-x-3 md:space-x-4 p-4 md:p-6" style={{
                background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                borderRadius: '24px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.12)'
              }}>
                <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 md:w-6 md:h-6" style={{ color: '#ffffff', opacity: 0.9 }} />
                </div>
                <div>
                  <h3 className="font-bold mb-1 text-sm md:text-base" style={{ color: '#ffffff' }}>Email</h3>
                  <p className="text-xs md:text-sm font-medium" style={{ color: '#ffffff' }}>info@smilestones.com</p>
                  <p className="text-xs md:text-sm font-medium" style={{ color: '#ffffff' }}>appointments@smilestones.com</p>
                </div>
              </div>

              <div className="universal-card hover-card-effect contact-info-card flex items-start space-x-3 md:space-x-4 p-4 md:p-6" style={{
                background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
                borderRadius: '24px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.12)'
              }}>
                <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 md:w-6 md:h-6" style={{ color: '#ffffff', opacity: 0.9 }} />
                </div>
                <div>
                  <h3 className="font-bold mb-1 text-sm md:text-base" style={{ color: '#ffffff' }}>Main Office</h3>
                  <p className="text-xs md:text-sm font-medium" style={{ color: '#ffffff' }}>123 Anna Nagar, Chennai - 600040</p>
                  <p className="text-xs md:text-sm font-medium" style={{ color: '#ffffff' }}>Tamil Nadu, India</p>
                </div>
              </div>

              <div className="universal-card hover-card-effect contact-info-card flex items-start space-x-3 md:space-x-4 p-4 md:p-6" style={{
                background: 'linear-gradient(135deg, #f59e0b, #f97316)',
                borderRadius: '24px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.12)'
              }}>
                <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 md:w-6 md:h-6" style={{ color: '#ffffff', opacity: 0.9 }} />
                </div>
                <div>
                  <h3 className="font-bold mb-1 text-sm md:text-base" style={{ color: '#ffffff' }}>Working Hours</h3>
                  <p className="text-xs md:text-sm font-medium" style={{ color: '#ffffff' }}>Monday - Saturday: 9:00 AM - 6:00 PM</p>
                  <p className="text-xs md:text-sm font-medium" style={{ color: '#ffffff' }}>Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="order-1 lg:order-2">
            <div className="universal-card p-6 md:p-8 hover-card-effect">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">Book a Consultation</h3>
              
              {submitStatus === 'success' && (
                <div className="mb-4 md:mb-6 p-3 md:p-4 bg-green-100 border border-green-300 rounded-lg text-green-700 text-sm md:text-base">
                  Thank you! Your message has been sent successfully. We'll get back to you soon.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-4 md:mb-6 p-3 md:p-4 bg-red-100 border border-red-300 rounded-lg text-red-700 text-sm md:text-base">
                  Sorry, there was an error sending your message. Please try again.
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                      Parent/Guardian Name *
                    </label>
                    <input
                      {...register('name')}
                      type="text"
                      className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm md:text-base"
                      placeholder="Your full name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs md:text-sm text-red-600">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                      Email Address *
                    </label>
                    <input
                      {...register('email')}
                      type="email"
                      className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm md:text-base"
                      placeholder="your.email@example.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs md:text-sm text-red-600">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                      Phone Number *
                    </label>
                    <input
                      {...register('phone')}
                      type="tel"
                      className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm md:text-base"
                      placeholder="+91 98765 43210"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs md:text-sm text-red-600">{errors.phone.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                      Child's Age *
                    </label>
                    <select
                      {...register('childAge')}
                      className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm md:text-base"
                    >
                      <option value="">Select age range</option>
                      {ageRanges.map((age) => (
                        <option key={age} value={age}>
                          {age}
                        </option>
                      ))}
                    </select>
                    {errors.childAge && (
                      <p className="mt-1 text-xs md:text-sm text-red-600">{errors.childAge.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                    Service Interested In *
                  </label>
                  <select
                    {...register('service')}
                    className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm md:text-base"
                  >
                    <option value="">Select a service</option>
                    {services.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                  {errors.service && (
                    <p className="mt-1 text-xs md:text-sm text-red-600">{errors.service.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1 md:mb-2">
                    Message *
                  </label>
                  <textarea
                    {...register('message')}
                    rows={4}
                    className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none text-sm md:text-base"
                    placeholder="Please describe your child's needs and any specific concerns..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs md:text-sm text-red-600">{errors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 md:w-5 md:h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;