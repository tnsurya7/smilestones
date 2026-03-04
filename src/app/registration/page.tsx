'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingButtons from '@/components/ui/FloatingButtons';
import Link from 'next/link';
import { MessageCircle, User, Phone, Calendar, UserCheck } from 'lucide-react';

export default function RegistrationPage() {
  const [formData, setFormData] = useState({
    parentName: '',
    childName: '',
    phoneNumber: '',
    dateOfRegistration: '',
    referralDoctorName: '',
    referralDoctorPhone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleWhatsAppSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Format the message for WhatsApp
    const message = `*Patient Registration Details*

*Parent Name:* ${formData.parentName}
*Child Name:* ${formData.childName}
*Phone Number:* ${formData.phoneNumber}
*Date of Registration:* ${formData.dateOfRegistration}
*Referral Doctor Name:* ${formData.referralDoctorName}
*Referral Doctor Phone:* ${formData.referralDoctorPhone}`;

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // WhatsApp URL with the phone number and message
    const whatsappUrl = `https://wa.me/919445051166?text=${encodedMessage}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
  };

  return (
    <main>
      <Header />
      
      {/* Breadcrumbs */}
      <div className="pt-6 pb-4 bg-gray-50">
        <div className="container mx-auto px-4">
          <nav className="text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">Home</Link> → 
            <span className="text-blue-600 font-medium"> Patient Registration</span>
          </nav>
        </div>
      </div>

      {/* Registration Form */}
      <section className="py-12 md:py-20 section-gradient">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8 md:mb-12">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Patient <span className="text-blue-600">Registration</span>
              </h1>
              <p className="text-lg text-gray-600">
                Fill in the details below to register your child
              </p>
            </div>

            {/* Form Card */}
            <div className="universal-card hover-card-effect p-6 md:p-8">
              <form onSubmit={handleWhatsAppSubmit} className="space-y-6">
                {/* Parent Name */}
                <div>
                  <label htmlFor="parentName" className="block text-sm font-semibold text-gray-900 mb-2">
                    Parent Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="parentName"
                      name="parentName"
                      value={formData.parentName}
                      onChange={handleChange}
                      required
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                      placeholder="Enter parent's full name"
                    />
                  </div>
                </div>

                {/* Child Name */}
                <div>
                  <label htmlFor="childName" className="block text-sm font-semibold text-gray-900 mb-2">
                    Child Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="childName"
                      name="childName"
                      value={formData.childName}
                      onChange={handleChange}
                      required
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                      placeholder="Enter child's full name"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-900 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      required
                      pattern="[0-9]{10}"
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                      placeholder="Enter 10-digit phone number"
                    />
                  </div>
                </div>

                {/* Date of Registration */}
                <div>
                  <label htmlFor="dateOfRegistration" className="block text-sm font-semibold text-gray-900 mb-2">
                    Date of Registration <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="date"
                      id="dateOfRegistration"
                      name="dateOfRegistration"
                      value={formData.dateOfRegistration}
                      onChange={handleChange}
                      required
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    />
                  </div>
                </div>

                {/* Referral Doctor Name */}
                <div>
                  <label htmlFor="referralDoctorName" className="block text-sm font-semibold text-gray-900 mb-2">
                    Referral Doctor Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <UserCheck className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="referralDoctorName"
                      name="referralDoctorName"
                      value={formData.referralDoctorName}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                      placeholder="Enter referral doctor's name (optional)"
                    />
                  </div>
                </div>

                {/* Referral Doctor Phone */}
                <div>
                  <label htmlFor="referralDoctorPhone" className="block text-sm font-semibold text-gray-900 mb-2">
                    Referral Doctor Phone No
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      id="referralDoctorPhone"
                      name="referralDoctorPhone"
                      value={formData.referralDoctorPhone}
                      onChange={handleChange}
                      pattern="[0-9]{10}"
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                      placeholder="Enter 10-digit phone number (optional)"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full premium-gradient-btn primary flex items-center justify-center gap-2 py-4"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Send via WhatsApp</span>
                  </button>
                </div>

                <p className="text-sm text-gray-600 text-center mt-4">
                  Clicking the button will open WhatsApp with your registration details pre-filled
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      <FloatingButtons />
      <Footer />
    </main>
  );
}
