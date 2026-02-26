'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { getTherapyRegistrations } from '@/lib/api-client';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import { UserPlus, Search, CheckCircle, Phone, Mail, User, Baby } from 'lucide-react';

export default function ParentRegistrationsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

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

  const loadRegistrations = async () => {
    try {
      const data = await getTherapyRegistrations();
      setRegistrations(data);
    } catch (error) {
      console.error('Error loading registrations:', error);
    }
  };

  const filteredRegistrations = registrations.filter(reg =>
    reg.referral_code?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    reg.phone?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    reg.parent_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    reg.child_name?.toLowerCase().includes(searchQuery.toLowerCase())
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
    <div className="admin-dashboard min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <AdminPageHeader title="Parents Registrations" />

        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name, phone, or referral code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Registrations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredRegistrations.length === 0 ? (
            <div className="col-span-full bg-white rounded-xl shadow-lg p-12 text-center">
              <UserPlus className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-900 text-lg mb-2 font-semibold">No registrations found</p>
              <p className="text-gray-600 text-sm">
                Parents registrations will appear here
              </p>
            </div>
          ) : (
            filteredRegistrations.map((reg) => (
              <div key={reg.id} className="bg-white rounded-xl shadow-lg p-5 sm:p-6 border border-gray-100 hover:shadow-xl transition-all">
                {/* Referral Code Badge */}
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-3 mb-4">
                  <p className="text-xs opacity-90 mb-1">Referral Code</p>
                  <p className="text-base sm:text-lg font-bold tracking-wider">{reg.referral_code}</p>
                </div>

                {/* Child & Parent Info */}
                <div className="mb-4 space-y-2">
                  <div className="flex items-center gap-2">
                    <Baby className="w-4 h-4 text-blue-500 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500">Child Name</p>
                      <p className="text-sm font-semibold text-gray-900">{reg.child_name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-purple-500 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500">Parent Name</p>
                      <p className="text-sm font-semibold text-gray-900">{reg.parent_name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500">Phone</p>
                      <p className="text-sm font-semibold text-gray-900">{reg.phone}</p>
                    </div>
                  </div>
                  {reg.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-orange-500 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-500">Email</p>
                        <p className="text-sm font-semibold text-gray-900 truncate">{reg.email}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Therapies */}
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Selected Therapies:</p>
                  <div className="space-y-1">
                    {reg.therapy_types && reg.therapy_types.map((therapy: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm">
                        <CheckCircle className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-600">{therapy}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment & Registration Info */}
                <div className="border-t border-gray-200 pt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Payment Mode</span>
                    <span className="font-semibold text-gray-900">{reg.payment_mode}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Registered</span>
                    <span>{new Date(reg.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
