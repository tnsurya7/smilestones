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
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-blue-200 shadow-lg mb-8 relative">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition-colors bg-white rounded-full p-1 shadow-md"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Header */}
      <div className="mb-5">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          📝 Enrollment Form
        </h3>
        <p className="text-sm text-gray-700 font-medium">
          Fill in your details to proceed with enrollment
        </p>
      </div>

      {/* Form */}
      <div className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
            placeholder="Enter your name"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-1">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
            placeholder="+91 XXXXX XXXXX"
            required
          />
        </div>

        {/* Qualification */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-1">
            Qualification
          </label>
          <select
            name="qualification"
            value={formData.qualification}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
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
          <label className="block text-sm font-semibold text-gray-900 mb-1">
            Message (Optional)
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
            placeholder="Any questions or additional information..."
          />
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleWhatsAppSubmit}
          className="btn-primary flex-1 justify-center"
        >
          <MessageCircle className="w-5 h-5" />
          <span>Send via WhatsApp</span>
        </button>
        <button
          onClick={onClose}
          className="sm:w-auto px-4 py-2 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}


