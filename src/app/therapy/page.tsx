'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Heart, Brain, Hand, BookOpen, Activity, Users, ArrowRight, CheckCircle } from 'lucide-react';

const therapies = [
  {
    id: 'aba',
    name: 'Applied Behavior Analysis (ABA)',
    icon: Brain,
    description: 'Evidence-based therapy for autism and developmental disorders',
    duration: '45-60 minutes per session',
    suitableFor: 'Children with autism, ADHD, behavioral challenges',
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 'speech',
    name: 'Speech Therapy',
    icon: Users,
    description: 'Improve communication, language, and speech skills',
    duration: '30-45 minutes per session',
    suitableFor: 'Speech delays, articulation issues, language disorders',
    color: 'from-purple-500 to-purple-600'
  },
  {
    id: 'occupational',
    name: 'Occupational Therapy',
    icon: Hand,
    description: 'Develop fine motor skills and daily living activities',
    duration: '45 minutes per session',
    suitableFor: 'Sensory issues, motor skill delays, self-care challenges',
    color: 'from-green-500 to-green-600'
  },
  {
    id: 'special-ed',
    name: 'Special Education',
    icon: BookOpen,
    description: 'Individualized academic support and learning strategies',
    duration: '60 minutes per session',
    suitableFor: 'Learning disabilities, academic delays, special needs',
    color: 'from-orange-500 to-orange-600'
  },
  {
    id: 'physio',
    name: 'Physiotherapy',
    icon: Activity,
    description: 'Improve gross motor skills and physical development',
    duration: '45 minutes per session',
    suitableFor: 'Motor delays, physical disabilities, coordination issues',
    color: 'from-red-500 to-red-600'
  },
  {
    id: 'counselling',
    name: 'Adolescent Counselling',
    icon: Heart,
    description: 'Mental health support for teenagers and young adults',
    duration: '50 minutes per session',
    suitableFor: 'Emotional issues, behavioral concerns, social challenges',
    color: 'from-pink-500 to-pink-600'
  }
];

export default function TherapyPage() {
  const router = useRouter();
  const [selectedTherapies, setSelectedTherapies] = useState<string[]>([]);

  const toggleTherapy = (therapyId: string) => {
    if (selectedTherapies.includes(therapyId)) {
      setSelectedTherapies(selectedTherapies.filter(id => id !== therapyId));
    } else {
      setSelectedTherapies([...selectedTherapies, therapyId]);
    }
  };

  const handleContinue = async () => {
    if (selectedTherapies.length === 0) {
      alert('Please select at least one therapy');
      return;
    }

    try {
      // Get appointment data from localStorage (if exists)
      const appointmentData = JSON.parse(localStorage.getItem('parent_appointment_data') || '{}');

      // Map therapy IDs to therapy names (as array)
      const selectedTherapyNames = selectedTherapies
        .map(id => therapies.find(t => t.id === id)?.name)
        .filter(Boolean);

      // Generate a unique referral code
      const referralCode = `REF-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

      const requestData = {
        child_name: appointmentData.childName || 'N/A',
        parent_name: appointmentData.parentName || 'N/A',
        phone: appointmentData.phone || 'N/A',
        email: appointmentData.email || '',
        therapy_types: selectedTherapyNames,
        payment_mode: 'Pending',
        referral_code: referralCode
      };

      console.log('Submitting therapy registration:', requestData);

      // Save to database via API
      const response = await fetch('/api/therapy-registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData)
      });

      const responseData = await response.json();
      console.log('API Response:', responseData);

      if (!response.ok) {
        console.error('API Error:', responseData);
        throw new Error(responseData.details || responseData.error || 'Failed to save registration');
      }

      // Show success message and redirect
      alert('Therapy registration submitted successfully! Our team will contact you shortly.');
      router.push('/');
    } catch (error: any) {
      console.error('Error saving registration:', error);
      alert(`Failed to submit registration: ${error.message}`);
    }
  };

  return (
    <div className="admin-dashboard min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 py-3 sm:py-4 md:py-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white drop-shadow-sm" />
            </div>
            <div>
              <h1 className="text-base sm:text-xl md:text-2xl font-bold text-gray-900">Choose Therapy</h1>
              <p className="text-xs sm:text-sm text-gray-700">Select the services you need</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
        {/* Info Banner */}
        <div className="bg-blue-100 border-2 border-blue-300 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 mb-4 sm:mb-6 md:mb-8">
          <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-1.5 sm:mb-2">Select Your Therapy Options</h3>
          <p className="text-xs sm:text-sm md:text-base text-gray-900 leading-relaxed">
            Choose one or more therapies based on your child's needs. Our experts will guide you through the process.
          </p>
        </div>

        {/* Therapy Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6 md:mb-8">
          {therapies.map((therapy) => {
            const Icon = therapy.icon;
            const isSelected = selectedTherapies.includes(therapy.id);

            return (
              <div
                key={therapy.id}
                onClick={() => toggleTherapy(therapy.id)}
                className={`relative bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-5 md:p-6 cursor-pointer transition-all border-2 ${
                  isSelected
                    ? 'border-blue-500 ring-4 ring-blue-100'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                {/* Selection Indicator */}
                {isSelected && (
                  <div className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                  </div>
                )}

                {/* Icon */}
                <div className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-br ${therapy.color} rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 shadow-lg`}>
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white drop-shadow-sm" />
                </div>

                {/* Content */}
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-1.5 sm:mb-2 leading-tight">{therapy.name}</h3>
                <p className="text-xs sm:text-sm text-gray-700 mb-2.5 sm:mb-3 md:mb-4 leading-relaxed">{therapy.description}</p>

                <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-gray-900 min-w-[70px] sm:min-w-[80px] md:min-w-[100px] flex-shrink-0">Duration:</span>
                    <span className="text-gray-700">{therapy.duration}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-gray-900 min-w-[70px] sm:min-w-[80px] md:min-w-[100px] flex-shrink-0">Suitable for:</span>
                    <span className="text-gray-700">{therapy.suitableFor}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Count */}
        {selectedTherapies.length > 0 && (
          <div className="bg-green-100 border-2 border-green-300 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
            <p className="text-xs sm:text-sm md:text-base text-gray-900 font-bold text-center">
              {selectedTherapies.length} {selectedTherapies.length === 1 ? 'therapy' : 'therapies'} selected
            </p>
          </div>
        )}

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          disabled={selectedTherapies.length === 0}
          className={`w-full px-4 sm:px-6 py-3 sm:py-4 font-bold rounded-lg sm:rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base md:text-lg ${
            selectedTherapies.length > 0
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Submit Registration
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
        </button>
      </div>
    </div>
  );
}
