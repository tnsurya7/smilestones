'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Phone, Calendar, Clock, MessageSquare, CheckCircle, ArrowRight } from 'lucide-react';

export default function AppointmentPage() {
  const router = useRouter();
  const [step, setStep] = useState<'phone' | 'schedule'>('phone');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [service, setService] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [messageText, setMessageText] = useState('');

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;

    const message = 'Thank you for contacting Smilestones Child Development Centre. Our team will contact you shortly.';
    setMessageText(message);
    setShowMessage(true);

    setTimeout(() => {
      setShowMessage(false);
      setStep('schedule');
    }, 3000);
  };

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !time || !service) {
      alert('Please fill all fields');
      return;
    }

    // Save to localStorage
    const appointments = JSON.parse(localStorage.getItem('parent_appointments') || '[]');
    const newAppointment = {
      id: Date.now().toString(),
      phone,
      date,
      time,
      service,
      createdAt: new Date().toISOString()
    };
    appointments.push(newAppointment);
    localStorage.setItem('parent_appointments', JSON.stringify(appointments));

    const message = `Your appointment at Smilestones Centre is confirmed on ${new Date(date).toLocaleDateString()} at ${time}.`;
    setMessageText(message);
    setShowMessage(true);

    setTimeout(() => {
      setShowMessage(false);
      router.push('/therapy');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-white drop-shadow-sm" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Book Appointment</h1>
              <p className="text-xs sm:text-sm text-gray-700">Schedule your visit with us</p>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Message Modal */}
      {showMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <MessageSquare className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">WhatsApp Message</h3>
            </div>
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 mb-4">
              <p className="text-base text-gray-900 leading-relaxed">{messageText}</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-green-700 font-semibold">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span>Message sent successfully</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Progress Steps */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-center gap-2 sm:gap-4">
            <div className={`flex items-center gap-2 ${step === 'phone' ? 'text-blue-700' : 'text-green-700'}`}>
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-sm sm:text-base ${
                step === 'phone' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
              }`}>
                {step === 'phone' ? '1' : '✓'}
              </div>
              <span className="hidden sm:inline font-bold">Contact</span>
            </div>
            <div className="w-8 sm:w-16 h-1 bg-gray-400 rounded"></div>
            <div className={`flex items-center gap-2 ${step === 'schedule' ? 'text-blue-700' : 'text-gray-500'}`}>
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-sm sm:text-base ${
                step === 'schedule' ? 'bg-blue-100 text-blue-700' : 'bg-gray-200 text-gray-500'
              }`}>
                2
              </div>
              <span className="hidden sm:inline font-bold">Schedule</span>
            </div>
          </div>
        </div>

        {/* Step 1: Phone Number */}
        {step === 'phone' && (
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
            <div className="text-center mb-6 sm:mb-8">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Phone className="w-8 h-8 sm:w-10 sm:h-10 text-white drop-shadow-sm" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Enter Your Mobile Number</h2>
              <p className="text-sm sm:text-base text-gray-700">We'll send you a WhatsApp confirmation</p>
            </div>

            <form onSubmit={handlePhoneSubmit} className="space-y-6">
              <div>
                <label className="block text-sm sm:text-base font-bold text-gray-900 mb-3">
                  Mobile Number <span className="text-red-600">*</span>
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 9445051166"
                  required
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg text-gray-900 bg-white border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400"
                />
              </div>

              <button
                type="submit"
                className="w-full px-6 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white font-bold rounded-xl hover:from-green-700 hover:to-green-800 transition-all shadow-lg flex items-center justify-center gap-2 text-base sm:text-lg"
              >
                <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />
                Send WhatsApp Message
              </button>
            </form>
          </div>
        )}

        {/* Step 2: Schedule Appointment */}
        {step === 'schedule' && (
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
            <div className="text-center mb-6 sm:mb-8">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Calendar className="w-8 h-8 sm:w-10 sm:h-10 text-white drop-shadow-sm" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Schedule Your Visit</h2>
              <p className="text-sm sm:text-base text-gray-700">Choose your preferred date and time</p>
            </div>

            <form onSubmit={handleScheduleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm sm:text-base font-bold text-gray-900 mb-3">
                  Preferred Date <span className="text-red-600">*</span>
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg text-gray-900 bg-white border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm sm:text-base font-bold text-gray-900 mb-3">
                  Preferred Time <span className="text-red-600">*</span>
                </label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg text-gray-900 bg-white border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm sm:text-base font-bold text-gray-900 mb-3">
                  Service Type <span className="text-red-600">*</span>
                </label>
                <div className="space-y-3">
                  {['Initial Assessment', 'Therapy Consultation', 'Online Consultation', 'Parent Training'].map((svc) => (
                    <label
                      key={svc}
                      className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all bg-white ${
                        service === svc
                          ? 'border-blue-600 ring-2 ring-blue-200'
                          : 'border-gray-300 hover:border-blue-400'
                      }`}
                    >
                      <input
                        type="radio"
                        name="service"
                        value={svc}
                        checked={service === svc}
                        onChange={(e) => setService(e.target.value)}
                        className="w-5 h-5 text-blue-600"
                      />
                      <span className="text-sm sm:text-base font-semibold text-gray-900">{svc}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg flex items-center justify-center gap-2 text-base sm:text-lg"
              >
                Confirm Appointment
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
