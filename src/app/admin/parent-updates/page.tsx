'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import { getChildren } from '@/lib/api-client';
import { MessageCircle, Search, User, Calendar, Phone, Stethoscope } from 'lucide-react';

export default function ParentUpdatesPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [children, setChildren] = useState<any[]>([]);
  const [selectedChild, setSelectedChild] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    achievementUpdates: '',
    motivationalMessage: '',
    notes: ''
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push('/admin/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      loadChildren();
    }
  }, [user]);

  const loadChildren = async () => {
    try {
      const data = await getChildren();
      setChildren(data);
    } catch (error) {
      console.error('Error loading children:', error);
    }
  };

  const handleChildSelect = (child: any) => {
    setSelectedChild(child);
    // Reset form when selecting a new child
    setFormData({
      achievementUpdates: '',
      motivationalMessage: '',
      notes: ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleWhatsAppSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!selectedChild) return;

    // Format the message for WhatsApp
    const message = `*SMILESTONES - Parents Updates*

Hi ${selectedChild.parent_name},

This is regarding your child *${selectedChild.name}*.

*Child Details:*
Name: ${selectedChild.name}
Age: ${selectedChild.age} years
Diagnosis: ${selectedChild.diagnosis}
Parent: ${selectedChild.parent_name}
Phone: ${selectedChild.phone}
Doctor: Dr. P. Sudhakar

${formData.achievementUpdates ? `*Achievement Updates:*\n${formData.achievementUpdates}\n\n` : ''}${formData.motivationalMessage ? `*Motivational Message:*\n${formData.motivationalMessage}\n\n` : ''}${formData.notes ? `*Notes:*\n${formData.notes}\n\n` : ''}Best regards,
Smilestones Child Development Centre`;

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // WhatsApp URL with the child's phone number and message
    const whatsappUrl = `https://wa.me/91${selectedChild.phone}?text=${encodedMessage}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
  };

  const filteredChildren = children.filter(child =>
    child.name.toLowerCase().includes(searchQuery.toLowerCase())
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
        <AdminPageHeader title="Parents Updates" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Child Selection */}
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Select Child</h2>
            
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search children..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredChildren.length === 0 ? (
                <p className="text-gray-900 text-xs sm:text-sm text-center py-4 font-semibold">No children found</p>
              ) : (
                filteredChildren.map((child) => (
                  <button
                    key={child.id}
                    onClick={() => handleChildSelect(child)}
                    className={`w-full text-left p-2.5 sm:p-3 rounded-lg transition-all ${
                      selectedChild?.id === child.id
                        ? 'bg-blue-100 border-2 border-blue-500'
                        : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                    }`}
                  >
                    <p className="font-semibold text-gray-900 text-sm sm:text-base">{child.name}</p>
                    <p className="text-xs text-gray-600">{child.age} years | {child.diagnosis}</p>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Updates Form */}
          <div className="lg:col-span-2">
            {!selectedChild ? (
              <div className="bg-white rounded-xl shadow-lg p-8 sm:p-12 text-center">
                <MessageCircle className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-3 sm:mb-4" />
                <p className="text-gray-900 text-base sm:text-lg font-semibold">Select a child to send updates</p>
              </div>
            ) : (
              <div className="space-y-4 sm:space-y-6">
                {/* Child Profile Card */}
                <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Child Profile</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="flex items-start gap-3">
                      <User className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-600">Name</p>
                        <p className="text-sm font-semibold text-gray-900">{selectedChild.name}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-600">Age</p>
                        <p className="text-sm font-semibold text-gray-900">{selectedChild.age} years</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Stethoscope className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-600">Diagnosis</p>
                        <p className="text-sm font-semibold text-gray-900">{selectedChild.diagnosis}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <User className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-600">Parent/Guardian</p>
                        <p className="text-sm font-semibold text-gray-900">{selectedChild.parent_name}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-600">Phone</p>
                        <p className="text-sm font-semibold text-gray-900">{selectedChild.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-gray-600">Registered</p>
                        <p className="text-sm font-semibold text-gray-900">
                          {new Date(selectedChild.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Update Form */}
                <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Parents Update</h3>
                  
                  <form onSubmit={handleWhatsAppSubmit} className="space-y-4">
                    {/* Achievement Updates */}
                    <div>
                      <label htmlFor="achievementUpdates" className="block text-xs md:text-sm font-semibold text-gray-900 mb-1.5 md:mb-2">
                        Achievement Updates
                      </label>
                      <textarea
                        id="achievementUpdates"
                        name="achievementUpdates"
                        value={formData.achievementUpdates}
                        onChange={handleChange}
                        rows={3}
                        className="block w-full px-3 py-2.5 md:py-3 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                        placeholder="Enter achievement updates (optional)"
                      />
                    </div>

                    {/* Motivational Message */}
                    <div>
                      <label htmlFor="motivationalMessage" className="block text-xs md:text-sm font-semibold text-gray-900 mb-1.5 md:mb-2">
                        Motivational Message
                      </label>
                      <textarea
                        id="motivationalMessage"
                        name="motivationalMessage"
                        value={formData.motivationalMessage}
                        onChange={handleChange}
                        rows={3}
                        className="block w-full px-3 py-2.5 md:py-3 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                        placeholder="Enter motivational message (optional)"
                      />
                    </div>

                    {/* Notes */}
                    <div>
                      <label htmlFor="notes" className="block text-xs md:text-sm font-semibold text-gray-900 mb-1.5 md:mb-2">
                        Notes
                      </label>
                      <textarea
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        rows={3}
                        className="block w-full px-3 py-2.5 md:py-3 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                        placeholder="Enter additional notes (optional)"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full premium-gradient-btn primary flex items-center justify-center gap-2 py-3 md:py-4 text-sm md:text-base"
                      >
                        <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
                        <span>Send via WhatsApp</span>
                      </button>
                    </div>

                    <p className="text-xs md:text-sm text-gray-600 text-center">
                      This will open WhatsApp with the parent's number and pre-filled message
                    </p>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
