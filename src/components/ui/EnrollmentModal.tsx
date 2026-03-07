'use client';

import { useState } from 'react';
import { X, MessageCircle } from 'lucide-react';

interface EnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseName: string;
}

export default function EnrollmentModal({ isOpen, onClose, courseName }: EnrollmentModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    qualification: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleWhatsAppSubmit = () => {
    // Check if required fields are filled
    if (!formData.name || !formData.phone) {
      alert('Please fill in your name and phone number');
      return;
    }

    // Create WhatsApp message
    const message = `*SMILESTONES - Course Enrollment*

*Course:* ${courseName}

*Name:* ${formData.name}
*Phone:* ${formData.phone}
*Qualification:* ${formData.qualification || 'Not provided'}

*Message:*
${formData.message || 'I am interested in enrolling for this course. Please provide more details.'}`;

    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // WhatsApp number
    const whatsappNumber = '919445051166';
    
    // Open WhatsApp
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, '_blank');
    
    // Close modal and reset form
    onClose();
    setFormData({
      name: '',
      phone: '',
      qualification: '',
      message: ''
    });
  };

  if (!isOpen) return null;

  return (
    <div className="bg-white rounded-lg md:rounded-xl p-4 md:p-6 border-2 border-blue-500 shadow-xl mb-6 md:mb-8 relative">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-2 right-2 md:top-3 md:right-3 text-gray-500 hover:text-gray-700 transition-colors bg-gray-100 rounded-full p-1 md:p-1.5 hover:bg-gray-200"
      >
        <X className="w-4 h-4 md:w-5 md:h-5" />
      </button>

      {/* Header with Icon */}
      <div className="mb-4 md:mb-6 flex items-start gap-3 md:gap-4 pr-8">
        {/* SVG Icon */}
        <div className="flex-shrink-0">
          <svg 
            className="w-8 h-8 md:w-12 md:h-12 text-blue-600" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
            />
          </svg>
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg md:text-2xl font-bold text-gray-900 mb-1">
            Enrollment Form
          </h3>
          <p className="text-xs md:text-sm text-gray-600 font-medium">
            Fill in your details to proceed
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="space-y-3 md:space-y-4">
        {/* Name */}
        <div>
          <label className="block text-xs md:text-sm font-bold text-gray-900 mb-1 md:mb-2">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 md:px-4 md:py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm md:text-base text-gray-900 bg-white font-medium"
            placeholder="Enter your name"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs md:text-sm font-bold text-gray-900 mb-1 md:mb-2">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 md:px-4 md:py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm md:text-base text-gray-900 bg-white font-medium"
            placeholder="+91 XXXXX XXXXX"
            required
          />
        </div>

        {/* Qualification */}
        <div>
          <label className="block text-xs md:text-sm font-bold text-gray-900 mb-1 md:mb-2">
            Qualification
          </label>
          <select
            name="qualification"
            value={formData.qualification}
            onChange={handleChange}
            className="w-full px-3 py-2 md:px-4 md:py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm md:text-base text-gray-900 bg-white font-medium"
          >
            <option value="">Select qualification</option>
            <option value="High School">High School</option>
            <option value="Undergraduate">Undergraduate</option>
            <option value="Postgraduate">Postgraduate</option>
            <option value="Psychology">Psychology</option>
            <option value="Child Development">Child Development</option>
            <option value="Social Work">Social Work</option>
            <option value="Education">Education</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Message */}
        <div>
          <label className="block text-xs md:text-sm font-bold text-gray-900 mb-1 md:mb-2">
            Message (Optional)
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={2}
            className="w-full px-3 py-2 md:px-4 md:py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm md:text-base text-gray-900 bg-white font-medium"
            placeholder="Any questions..."
          />
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4 md:mt-6 flex flex-col gap-2 md:gap-3">
        <button
          onClick={handleWhatsAppSubmit}
          className="btn-primary w-full justify-center text-sm md:text-base py-2.5 md:py-3"
        >
          <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
          <span>Send via WhatsApp</span>
        </button>
        <button
          onClick={onClose}
          className="w-full px-4 py-2 md:py-2.5 border-2 border-gray-400 text-gray-700 text-sm md:text-base font-bold rounded-lg hover:bg-gray-100 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}



