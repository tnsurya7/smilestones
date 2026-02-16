'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import { TextInput, CheckboxGroup } from '@/components/admin/FormComponents';
import { UserPlus, CreditCard, CheckCircle, Download, Search } from 'lucide-react';

interface Registration {
  id: string;
  childName: string;
  parentName: string;
  phone: string;
  email: string;
  therapyTypes: string[];
  paymentMode: string;
  referralCode: string;
  createdAt: string;
}

export default function TherapyRegistrationPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentRegistration, setCurrentRegistration] = useState<Registration | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Form state
  const [childName, setChildName] = useState('');
  const [parentName, setParentName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [therapyTypes, setTherapyTypes] = useState<string[]>([]);
  const [paymentMode, setPaymentMode] = useState('');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/admin/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      loadRegistrations();
    }
  }, [user]);

  const loadRegistrations = () => {
    const data = localStorage.getItem('therapy_registrations');
    if (data) {
      setRegistrations(JSON.parse(data));
    }
  };

  const generateReferralCode = () => {
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `SMILE-THERAPY-${random}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!childName || !parentName || !phone || therapyTypes.length === 0 || !paymentMode) {
      alert('Please fill all required fields');
      return;
    }

    const newRegistration: Registration = {
      id: Date.now().toString(),
      childName,
      parentName,
      phone,
      email,
      therapyTypes,
      paymentMode,
      referralCode: generateReferralCode(),
      createdAt: new Date().toISOString()
    };

    const updated = [...registrations, newRegistration];
    localStorage.setItem('therapy_registrations', JSON.stringify(updated));
    setRegistrations(updated);
    setCurrentRegistration(newRegistration);
    setShowSuccess(true);

    // Reset form
    setChildName('');
    setParentName('');
    setPhone('');
    setEmail('');
    setTherapyTypes([]);
    setPaymentMode('');
  };

  const handlePrintBill = (reg: Registration) => {
    const billContent = `
SMILESTONES CHILD DEVELOPMENT CENTRE
=====================================

THERAPY REGISTRATION RECEIPT
----------------------------

Registration ID: ${reg.id}
Date: ${new Date(reg.createdAt).toLocaleDateString()}

Child Name: ${reg.childName}
Parent Name: ${reg.parentName}
Phone: ${reg.phone}
Email: ${reg.email || 'N/A'}

Therapy Types:
${reg.therapyTypes.map(t => `- ${t}`).join('\n')}

Payment Mode: ${reg.paymentMode}

Referral Code: ${reg.referralCode}

Thank you for choosing Smilestones Centre!
    `;

    const printWindow = window.open('', '', 'width=600,height=800');
    if (printWindow) {
      printWindow.document.write('<pre>' + billContent + '</pre>');
      printWindow.document.close();
      printWindow.print();
    }
  };

  const filteredRegistrations = registrations.filter(reg =>
    reg.childName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    reg.phone.includes(searchQuery) ||
    reg.referralCode.toLowerCase().includes(searchQuery.toLowerCase())
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
        <AdminPageHeader title="Therapy Registration" />

        {/* Success Modal */}
        {showSuccess && currentRegistration && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl">
              <div className="text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Registration Successful!</h3>
                <p className="text-gray-600 mb-4">Payment processed successfully</p>
                
                <div className="bg-blue-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-600 mb-1">Unique Referral Code</p>
                  <p className="text-2xl font-bold text-blue-600">{currentRegistration.referralCode}</p>
                </div>

                <div className="text-left bg-gray-50 rounded-lg p-4 mb-4 text-sm">
                  <p className="mb-1"><strong>Child:</strong> {currentRegistration.childName}</p>
                  <p className="mb-1"><strong>Parent:</strong> {currentRegistration.parentName}</p>
                  <p><strong>Phone:</strong> {currentRegistration.phone}</p>
                </div>

                <div className="flex gap-2 sm:gap-3">
                  <button
                    onClick={() => handlePrintBill(currentRegistration)}
                    className="flex-1 px-3 sm:px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-1.5 sm:gap-2 text-sm sm:text-base"
                  >
                    <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    Print Bill
                  </button>
                  <button
                    onClick={() => setShowSuccess(false)}
                    className="flex-1 px-3 sm:px-4 py-2 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all text-sm sm:text-base"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Registration Form */}
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">New Registration</h2>

            <form onSubmit={handleSubmit}>
              <TextInput
                label="Child Name"
                name="childName"
                value={childName}
                onChange={setChildName}
                required
                placeholder="Enter child's name"
              />

              <TextInput
                label="Parent Name"
                name="parentName"
                value={parentName}
                onChange={setParentName}
                required
                placeholder="Enter parent's name"
              />

              <TextInput
                label="Phone Number"
                name="phone"
                type="tel"
                value={phone}
                onChange={setPhone}
                required
                placeholder="+91 9445051166"
              />

              <TextInput
                label="Email (Optional)"
                name="email"
                type="text"
                value={email}
                onChange={setEmail}
                placeholder="email@example.com"
              />

              <CheckboxGroup
                label="Therapy Type"
                name="therapyTypes"
                options={[
                  'Applied Behavior Analysis (ABA)',
                  'Speech Therapy',
                  'Occupational Therapy',
                  'Special Education',
                  'Physiotherapy',
                  'Adolescent Counselling'
                ]}
                values={therapyTypes}
                onChange={setTherapyTypes}
                required
              />

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Payment Mode <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  {['UPI', 'Credit Card', 'Debit Card', 'Net Banking'].map((mode) => (
                    <label key={mode} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMode"
                        value={mode}
                        checked={paymentMode === mode}
                        onChange={(e) => setPaymentMode(e.target.value)}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">{mode}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg sm:rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <UserPlus className="w-4 h-4 sm:w-5 sm:h-5" />
                Complete Registration
              </button>
            </form>
          </div>

          {/* Registrations List */}
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Registrations</h2>

            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name, phone, or code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>

            <div className="space-y-2 sm:space-y-3 max-h-96 overflow-y-auto">
              {filteredRegistrations.length === 0 ? (
                <div className="text-center py-6 sm:py-8">
                  <UserPlus className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 mx-auto mb-2 sm:mb-3" />
                  <p className="text-gray-900 text-sm sm:text-base font-semibold">No registrations yet</p>
                </div>
              ) : (
                filteredRegistrations.map((reg) => (
                  <div key={reg.id} className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold text-gray-900 text-sm sm:text-base">{reg.childName}</p>
                        <p className="text-xs sm:text-sm text-gray-600">{reg.parentName}</p>
                      </div>
                      <button
                        onClick={() => handlePrintBill(reg)}
                        className="p-1.5 sm:p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Print Bill"
                      >
                        <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </button>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 mb-2">{reg.phone}</p>
                    <div className="bg-blue-50 rounded px-2 py-1 inline-block mb-2">
                      <p className="text-xs font-mono text-blue-700">{reg.referralCode}</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      {new Date(reg.createdAt).toLocaleDateString()}
                    </p>
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
