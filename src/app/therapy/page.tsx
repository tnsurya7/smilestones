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

  const handleContinue = () => {
    if (selectedTherapies.length === 0) {
      alert('Please select at least one therapy');
      return;
    }

    // Save to localStorage
    const selectedTherapyDetails = therapies.filter(t => selectedTherapies.includes(t.id));
    localStorage.setItem('parent_selected_therapy', JSON.stringify(selectedTherapyDetails));

    router.push('/payment');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-white drop-shadow-sm" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Choose Therapy</h1>
              <p className="text-xs sm:text-sm text-gray-700">Select the services you need</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Info Banner */}
        <div className="bg-blue-100 border-2 border-blue-300 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
          <h3 className="text-base sm:text-lg font-bold text-blue-900 mb-2">Select Your Therapy Options</h3>
          <p className="text-sm sm:text-base text-blue-900">
            Choose one or more therapies based on your child's needs. Our experts will guide you through the process.
          </p>
        </div>

        {/* Therapy Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {therapies.map((therapy) => {
            const Icon = therapy.icon;
            const isSelected = selectedTherapies.includes(therapy.id);

            return (
              <div
                key={therapy.id}
                onClick={() => toggleTherapy(therapy.id)}
                className={`relative bg-white rounded-2xl shadow-lg p-5 sm:p-6 cursor-pointer transition-all border-2 ${
                  isSelected
                    ? 'border-blue-500 ring-4 ring-blue-100'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                {/* Selection Indicator */}
                {isSelected && (
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-7 h-7 sm:w-8 sm:h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                )}

                {/* Icon */}
                <div className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br ${therapy.color} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white drop-shadow-sm" />
                </div>

                {/* Content */}
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">{therapy.name}</h3>
                <p className="text-xs sm:text-sm text-gray-700 mb-3 sm:mb-4">{therapy.description}</p>

                <div className="space-y-2 text-xs sm:text-sm">
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-gray-900 min-w-[80px] sm:min-w-[100px]">Duration:</span>
                    <span className="text-gray-700">{therapy.duration}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-gray-900 min-w-[80px] sm:min-w-[100px]">Suitable for:</span>
                    <span className="text-gray-700">{therapy.suitableFor}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Count */}
        {selectedTherapies.length > 0 && (
          <div className="bg-green-100 border-2 border-green-300 rounded-xl p-4 mb-6">
            <p className="text-sm sm:text-base text-green-900 font-bold text-center">
              {selectedTherapies.length} {selectedTherapies.length === 1 ? 'therapy' : 'therapies'} selected
            </p>
          </div>
        )}

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          disabled={selectedTherapies.length === 0}
          className={`w-full px-6 py-4 font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 text-base sm:text-lg ${
            selectedTherapies.length > 0
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Continue to Payment
          <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>
    </div>
  );
}
