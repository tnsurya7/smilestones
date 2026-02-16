'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import { getChildren, getParentUpdates, saveParentUpdates } from '@/lib/api-client';
import { TextArea } from '@/components/admin/FormComponents';
import { MessageSquare, Video, Award, Save, Search } from 'lucide-react';

interface ParentUpdate {
  childId: string;
  achievements: string[];
  motivationalMessages: string[];
  videoLinks: string[];
  lastUpdated: string;
}

export default function ParentUpdatesPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [children, setChildren] = useState<any[]>([]);
  const [selectedChildId, setSelectedChildId] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [updateData, setUpdateData] = useState<ParentUpdate>({
    childId: '',
    achievements: [],
    motivationalMessages: [],
    videoLinks: [],
    lastUpdated: new Date().toISOString()
  });
  const [newAchievement, setNewAchievement] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [newVideoLink, setNewVideoLink] = useState('');
  const [saveMessage, setSaveMessage] = useState('');

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

  useEffect(() => {
    if (selectedChildId) {
      loadUpdateData(selectedChildId);
    }
  }, [selectedChildId]);

  const loadUpdateData = async (childId: string) => {
    try {
      const data = await getParentUpdates(childId);
      setUpdateData({
        childId: childId,
        achievements: data.achievements || [],
        motivationalMessages: data.motivational_messages || [],
        videoLinks: data.video_links || [],
        lastUpdated: data.last_updated || new Date().toISOString()
      });
    } catch (error) {
      console.error('Error loading updates:', error);
      setUpdateData({
        childId: childId,
        achievements: [],
        motivationalMessages: [],
        videoLinks: [],
        lastUpdated: new Date().toISOString()
      });
    }
  };

  const handleSave = async () => {
    if (!selectedChildId) return;
    
    try {
      await saveParentUpdates({
        child_id: selectedChildId,
        achievements: updateData.achievements,
        motivational_messages: updateData.motivationalMessages,
        video_links: updateData.videoLinks
      });
      
      setSaveMessage('Saved successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
      
      // Reload data
      await loadUpdateData(selectedChildId);
    } catch (error) {
      console.error('Error saving updates:', error);
      alert('Failed to save updates. Please try again.');
    }
  };

  const addAchievement = () => {
    if (!newAchievement.trim()) return;
    setUpdateData({
      ...updateData,
      achievements: [...updateData.achievements, newAchievement]
    });
    setNewAchievement('');
  };

  const removeAchievement = (index: number) => {
    setUpdateData({
      ...updateData,
      achievements: updateData.achievements.filter((_, i) => i !== index)
    });
  };

  const addMessage = () => {
    if (!newMessage.trim()) return;
    setUpdateData({
      ...updateData,
      motivationalMessages: [...updateData.motivationalMessages, newMessage]
    });
    setNewMessage('');
  };

  const removeMessage = (index: number) => {
    setUpdateData({
      ...updateData,
      motivationalMessages: updateData.motivationalMessages.filter((_, i) => i !== index)
    });
  };

  const addVideoLink = () => {
    if (!newVideoLink.trim()) return;
    setUpdateData({
      ...updateData,
      videoLinks: [...updateData.videoLinks, newVideoLink]
    });
    setNewVideoLink('');
  };

  const removeVideoLink = (index: number) => {
    setUpdateData({
      ...updateData,
      videoLinks: updateData.videoLinks.filter((_, i) => i !== index)
    });
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <AdminPageHeader title="Parents Updates" />

        {/* Save Message */}
        {saveMessage && (
          <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg text-sm z-50">
            {saveMessage}
          </div>
        )}

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
                    onClick={() => setSelectedChildId(child.id)}
                    className={`w-full text-left p-2.5 sm:p-3 rounded-lg transition-all ${
                      selectedChildId === child.id
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
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {!selectedChildId ? (
              <div className="bg-white rounded-xl shadow-lg p-8 sm:p-12 text-center">
                <MessageSquare className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-3 sm:mb-4" />
                <p className="text-gray-900 text-base sm:text-lg font-semibold">Select a child to manage updates</p>
              </div>
            ) : (
              <>
                {/* Achievement Updates */}
                <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
                  <div className="flex items-center gap-2 mb-3 sm:mb-4">
                    <Award className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900">Achievement Updates</h3>
                  </div>

                  <div className="flex gap-2 mb-3 sm:mb-4">
                    <input
                      type="text"
                      value={newAchievement}
                      onChange={(e) => setNewAchievement(e.target.value)}
                      placeholder="Enter achievement..."
                      className="flex-1 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm"
                      onKeyPress={(e) => e.key === 'Enter' && addAchievement()}
                    />
                    <button
                      onClick={addAchievement}
                      className="px-3 sm:px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all text-xs sm:text-sm"
                    >
                      Add
                    </button>
                  </div>

                  <div className="space-y-2">
                    {updateData.achievements.map((achievement, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-yellow-50 p-2.5 sm:p-3 rounded-lg">
                        <p className="text-xs sm:text-sm text-gray-900">{achievement}</p>
                        <button
                          onClick={() => removeAchievement(idx)}
                          className="text-red-600 hover:text-red-700 text-xs sm:text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    {updateData.achievements.length === 0 && (
                      <p className="text-gray-900 text-xs sm:text-sm text-center py-3 sm:py-4 font-semibold">No achievements added yet</p>
                    )}
                  </div>
                </div>

                {/* Motivational Messages */}
                <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
                  <div className="flex items-center gap-2 mb-3 sm:mb-4">
                    <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900">Motivational Messages</h3>
                  </div>

                  <TextArea
                    label=""
                    name="newMessage"
                    value={newMessage}
                    onChange={setNewMessage}
                    rows={3}
                    placeholder="Write a motivational message for parents..."
                  />
                  <button
                    onClick={addMessage}
                    className="w-full mt-2 px-3 sm:px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-all text-xs sm:text-sm"
                  >
                    Add Message
                  </button>

                  <div className="space-y-2 mt-3 sm:mt-4">
                    {updateData.motivationalMessages.map((message, idx) => (
                      <div key={idx} className="bg-green-50 p-2.5 sm:p-3 rounded-lg">
                        <p className="text-xs sm:text-sm text-gray-900 mb-2">{message}</p>
                        <button
                          onClick={() => removeMessage(idx)}
                          className="text-red-600 hover:text-red-700 text-xs"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    {updateData.motivationalMessages.length === 0 && (
                      <p className="text-gray-900 text-xs sm:text-sm text-center py-3 sm:py-4 font-semibold">No messages added yet</p>
                    )}
                  </div>
                </div>

                {/* Video Links */}
                <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
                  <div className="flex items-center gap-2 mb-3 sm:mb-4">
                    <Video className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" />
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900">Video Links for Parents</h3>
                  </div>

                  <div className="flex gap-2 mb-3 sm:mb-4">
                    <input
                      type="url"
                      value={newVideoLink}
                      onChange={(e) => setNewVideoLink(e.target.value)}
                      placeholder="Enter YouTube URL..."
                      className="flex-1 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm"
                      onKeyPress={(e) => e.key === 'Enter' && addVideoLink()}
                    />
                    <button
                      onClick={addVideoLink}
                      className="px-3 sm:px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-all text-xs sm:text-sm"
                    >
                      Add
                    </button>
                  </div>

                  <div className="space-y-2">
                    {updateData.videoLinks.map((link, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-purple-50 p-2.5 sm:p-3 rounded-lg">
                        <a
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs sm:text-sm text-blue-600 hover:underline truncate flex-1"
                        >
                          {link}
                        </a>
                        <button
                          onClick={() => removeVideoLink(idx)}
                          className="text-red-600 hover:text-red-700 text-xs sm:text-sm ml-2"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    {updateData.videoLinks.length === 0 && (
                      <p className="text-gray-900 text-xs sm:text-sm text-center py-3 sm:py-4 font-semibold">No video links added yet</p>
                    )}
                  </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end">
                  <button
                    onClick={handleSave}
                    className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg sm:rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg flex items-center gap-2 text-sm sm:text-base"
                  >
                    <Save className="w-4 h-4 sm:w-5 sm:h-5" />
                    Save Updates
                  </button>
                </div>

                <p className="text-xs text-gray-500 text-right">
                  Last updated: {new Date(updateData.lastUpdated).toLocaleString()}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
