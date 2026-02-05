'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { getChildren, addSession } from '@/lib/localStorage';
import { 
  Save,
  X,
  Calendar,
  User,
  CheckCircle,
  XCircle,
  FileText,
  Target
} from 'lucide-react';

export default function NewSessionPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [children, setChildren] = useState<any[]>([]);
  
  const [formData, setFormData] = useState({
    child_id: '',
    date: new Date().toISOString().split('T')[0],
    attendance: true,
    eye_contact: false,
    follow_instructions: false,
    speech_attempt: false,
    motor_improvement: false,
    skill_level: 'average' as 'poor' | 'average' | 'good' | 'excellent',
    activities: [] as string[],
    notes: '',
    next_goal: '',
  });

  const activityOptions = [
    'Speech Therapy',
    'ABA Therapy',
    'Occupational Therapy',
    'Play Therapy',
    'Social Skills Training',
    'Sensory Integration',
    'Fine Motor Skills',
    'Gross Motor Skills',
    'Communication Skills',
    'Behavioral Therapy',
  ];

  useEffect(() => {
    if (!loading && !user) {
      router.push('/admin/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      setChildren(getChildren());
    }
  }, [user]);

  const handleActivityToggle = (activity: string) => {
    setFormData(prev => ({
      ...prev,
      activities: prev.activities.includes(activity)
        ? prev.activities.filter(a => a !== activity)
        : [...prev.activities, activity]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.child_id) {
      alert('Please select a child');
      return;
    }
    
    // Add session with current user as doctor
    addSession({
      child_id: formData.child_id,
      doctor_id: user?.id || '1',
      date: formData.date,
      attendance: formData.attendance,
      eye_contact: formData.eye_contact,
      follow_instructions: formData.follow_instructions,
      speech_attempt: formData.speech_attempt,
      motor_improvement: formData.motor_improvement,
      skill_level: formData.skill_level,
      activities: formData.activities,
      notes: formData.notes,
      next_goal: formData.next_goal,
    });
    
    router.push('/admin/sessions');
  };

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
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">New Therapy Session</h1>
              <p className="text-gray-600 mt-1">Fill in the session details and progress notes</p>
            </div>
            <button
              onClick={() => router.push('/admin/sessions')}
              className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all flex items-center gap-2"
            >
              <X className="w-5 h-5" />
              Cancel
            </button>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Calendar className="w-6 h-6 text-blue-600" />
              Basic Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Select Child *
                </label>
                <select
                  value={formData.child_id}
                  onChange={(e) => setFormData({ ...formData, child_id: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Choose a child</option>
                  {children.map((child) => (
                    <option key={child.id} value={child.id}>
                      {child.name} ({child.age} years old)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Session Date *
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.attendance}
                  onChange={(e) => setFormData({ ...formData, attendance: e.target.checked })}
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-semibold text-gray-700">
                  Child was present for this session
                </span>
              </label>
            </div>
          </div>

          {/* Progress Indicators */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-green-600" />
              Progress Indicators
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-blue-500 transition-colors">
                <input
                  type="checkbox"
                  checked={formData.eye_contact}
                  onChange={(e) => setFormData({ ...formData, eye_contact: e.target.checked })}
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <div>
                  <span className="font-semibold text-gray-900 block">Eye Contact</span>
                  <span className="text-sm text-gray-500">Made eye contact during session</span>
                </div>
              </label>

              <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-blue-500 transition-colors">
                <input
                  type="checkbox"
                  checked={formData.follow_instructions}
                  onChange={(e) => setFormData({ ...formData, follow_instructions: e.target.checked })}
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <div>
                  <span className="font-semibold text-gray-900 block">Follow Instructions</span>
                  <span className="text-sm text-gray-500">Followed given instructions</span>
                </div>
              </label>

              <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-blue-500 transition-colors">
                <input
                  type="checkbox"
                  checked={formData.speech_attempt}
                  onChange={(e) => setFormData({ ...formData, speech_attempt: e.target.checked })}
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <div>
                  <span className="font-semibold text-gray-900 block">Speech Attempt</span>
                  <span className="text-sm text-gray-500">Attempted verbal communication</span>
                </div>
              </label>

              <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-blue-500 transition-colors">
                <input
                  type="checkbox"
                  checked={formData.motor_improvement}
                  onChange={(e) => setFormData({ ...formData, motor_improvement: e.target.checked })}
                  className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <div>
                  <span className="font-semibold text-gray-900 block">Motor Improvement</span>
                  <span className="text-sm text-gray-500">Showed motor skill progress</span>
                </div>
              </label>
            </div>
          </div>

          {/* Skill Level */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Target className="w-6 h-6 text-purple-600" />
              Overall Skill Level
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {(['poor', 'average', 'good', 'excellent'] as const).map((level) => (
                <label
                  key={level}
                  className={`p-4 border-2 rounded-xl cursor-pointer text-center transition-all ${
                    formData.skill_level === level
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="skill_level"
                    value={level}
                    checked={formData.skill_level === level}
                    onChange={(e) => setFormData({ ...formData, skill_level: e.target.value as any })}
                    className="sr-only"
                  />
                  <span className="font-semibold text-gray-900 block capitalize">
                    {level}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Activities */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <User className="w-6 h-6 text-orange-600" />
              Activities Performed
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {activityOptions.map((activity) => (
                <label
                  key={activity}
                  className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    formData.activities.includes(activity)
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.activities.includes(activity)}
                    onChange={() => handleActivityToggle(activity)}
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="font-medium text-gray-900">{activity}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Notes and Goals */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <FileText className="w-6 h-6 text-indigo-600" />
              Session Notes & Goals
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Session Notes
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Describe the session, child's behavior, any notable observations..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Next Session Goal
                </label>
                <textarea
                  value={formData.next_goal}
                  onChange={(e) => setFormData({ ...formData, next_goal: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="What should be the focus for the next session?"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => router.push('/admin/sessions')}
              className="flex-1 px-6 py-4 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              Save Session
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
