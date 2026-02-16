'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import { TextInput } from '@/components/admin/FormComponents';
import { Phone, Calendar, Clock, MessageSquare, CheckCircle, Search } from 'lucide-react';

interface Appointment {
  id: string;
  phone: string;
  date: string;
  time: string;
  service: string;
  status: 'pending' | 'confirmed';
  createdAt: string;
}

export default function AppointmentsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState<'phone' | 'schedule'>('phone');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [service, setService] = useState('');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [showMessage, setShowMessage] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/admin/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      loadAppointments();
    }
  }, [user]);

  const loadAppointments = () => {
    const data = localStorage.getItem('appointments');
    if (data) {
      setAppointments(JSON.parse(data));
    }
  };

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;

    const message = `Thank you for contacting Smilestones Centre. Our team will contact you shortly.`;
    setMessageText(message);
    setShowMessage(true);
    
    setTimeout(() => {
      setShowMessage(false);
      setStep('schedule');
    }, 3000);
  };

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !time || !service) return;

    const newAppointment: Appointment = {
      id: Date.now().toString(),
      phone,
      date,
      time,
      service,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    const updated = [...appointments, newAppointment];
    localStorage.setItem('appointments', JSON.stringify(updated));
    setAppointments(updated);

    const message = `Your appointment at Smilestones Centre is confirmed for ${new Date(date).toLocaleDateString()} at ${time}.`;
    setMessageText(message);
    setShowMessage(true);

    setTimeout(() => {
      setShowMessage(false);
      resetForm();
    }, 3000);
  };

  const resetForm = () => {
    setPhone('');
    setDate('');
    setTime('');
    setService('');
    setStep('phone');
  };

  const filteredAppointments = appointments.filter(apt =>
    apt.phone.includes(searchQuery) || apt.service.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <AdminPageHeader title="Online Appointments" />

        {/* WhatsApp Message Modal */}
        {showMessage && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl">
              <div className="flex items-center gap-3 mb-4">
                <MessageSquare className="w-8 h-8 text-green-500" />
                <h3 className="text-lg font-bold text-gray-900">WhatsApp Message</h3>
              </div>
              <p className="text-gray-700 mb-4">{messageText}</p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Message sent successfully
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* New Appointment Form */}
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">New Appointment</h2>

            {step === 'phone' && (
              <form onSubmit={handlePhoneSubmit}>
                <TextInput
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  value={phone}
                  onChange={setPhone}
                  required
                  placeholder="+91 9445051166"
                />
                <button
                  type="submit"
                  className="w-full px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-lg sm:rounded-xl hover:from-green-700 hover:to-green-800 transition-all shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                  Send WhatsApp Message
                </button>
              </form>
            )}

            {step === 'schedule' && (
              <form onSubmit={handleScheduleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Select Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Select Time <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Select Service <span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-2">
                    {['Assessment', 'Therapy Consultation', 'Parent Training', 'Online Consultation'].map((svc) => (
                      <label key={svc} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="service"
                          value={svc}
                          checked={service === svc}
                          onChange={(e) => setService(e.target.value)}
                          className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{svc}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 sm:gap-3">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg sm:rounded-xl hover:bg-gray-50 transition-all text-sm sm:text-base"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg sm:rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg flex items-center justify-center gap-1.5 sm:gap-2 text-sm sm:text-base"
                  >
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                    Confirm
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Appointments List */}
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Appointments</h2>

            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by phone or service..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>

            <div className="space-y-2 sm:space-y-3 max-h-96 overflow-y-auto">
              {filteredAppointments.length === 0 ? (
                <div className="text-center py-6 sm:py-8">
                  <Calendar className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 mx-auto mb-2 sm:mb-3" />
                  <p className="text-gray-900 text-sm sm:text-base font-semibold">No appointments yet</p>
                </div>
              ) : (
                filteredAppointments.map((apt) => (
                  <div key={apt.id} className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-500 flex-shrink-0" />
                        <span className="font-semibold text-gray-900 text-sm sm:text-base">{apt.phone}</span>
                      </div>
                      <span className="text-xs px-2 py-0.5 sm:py-1 bg-green-100 text-green-800 rounded-full">
                        {apt.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        {new Date(apt.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        {apt.time}
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-700 mt-2">{apt.service}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
