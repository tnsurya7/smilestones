'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { getSessions, getChildren, getDoctors, deleteSession } from '@/lib/api-client';
import { generateSessionPDF } from '@/lib/pdfExport';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import { 
  Plus,
  Search,
  Filter,
  Calendar,
  User,
  FileText,
  Download,
  Eye,
  Edit,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface SessionWithDetails {
  id: string;
  child_name: string;
  doctor_name: string;
  date: string;
  attendance: boolean;
  eye_contact: boolean;
  follow_instructions: boolean;
  speech_attempt: boolean;
  motor_improvement: boolean;
  skill_level: 'poor' | 'average' | 'good' | 'excellent';
  activities: string[];
  notes: string;
  next_goal: string;
}

function SessionsContent() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const childId = searchParams.get('child_id');
  
  const [sessions, setSessions] = useState<SessionWithDetails[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterSkillLevel, setFilterSkillLevel] = useState('');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/admin/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      loadSessions();
    }
  }, [user, childId]);

  const loadSessions = async () => {
    try {
      const sessionsData = await getSessions();
      const childrenData = await getChildren();
      const doctorsData = await getDoctors();
      
      // Add child and doctor names
      const sessionsWithDetails = sessionsData.map(session => {
        const child = childrenData.find(c => c.id === session.child_id);
        const doctor = doctorsData.find(d => d.id === session.doctor_id);
        
        return {
          ...session,
          child_name: child?.name || 'Unknown',
          doctor_name: doctor?.name || 'Unknown',
        };
      });
      
      // Filter by child if specified
      const filtered = childId 
        ? sessionsWithDetails.filter(s => s.child_id === childId)
        : sessionsWithDetails;
      
      setSessions(filtered as any);
    } catch (error) {
      console.error('Error loading sessions:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this session?')) {
      try {
        await deleteSession(id);
        await loadSessions();
      } catch (error) {
        console.error('Error deleting session:', error);
        alert('Error deleting session. Please try again.');
      }
    }
  };

  const handleDownloadPDF = (session: any) => {
    generateSessionPDF(
      session,
      session.child_name,
      session.doctor_name
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  const filteredSessions = sessions.filter(session => {
    const matchesSearch = 
      session.child_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.doctor_name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDate = !filterDate || session.date === filterDate;
    const matchesSkillLevel = !filterSkillLevel || session.skill_level === filterSkillLevel;
    
    return matchesSearch && matchesDate && matchesSkillLevel;
  });

  const getSkillLevelColor = (level: string) => {
    switch (level) {
      case 'excellent': return 'bg-green-100 text-green-700';
      case 'good': return 'bg-blue-100 text-blue-700';
      case 'average': return 'bg-yellow-100 text-yellow-700';
      case 'poor': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="admin-dashboard min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <AdminPageHeader title="Therapy Sessions" />
        
        {/* New Session Button */}
        <div className="mb-6">
          <button
            onClick={() => router.push('/admin/sessions/new')}
            className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
            New Session
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by child or doctor name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={filterSkillLevel}
                onChange={(e) => setFilterSkillLevel(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              >
                <option value="">All Skill Levels</option>
                <option value="excellent">Excellent</option>
                <option value="good">Good</option>
                <option value="average">Average</option>
                <option value="poor">Poor</option>
              </select>
            </div>
          </div>
        </div>

        {/* Sessions List */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {filteredSessions.length === 0 ? (
            <div className="p-12 text-center">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-900 text-lg font-semibold">No sessions found</p>
              <p className="text-gray-700 text-sm mt-2">
                {searchQuery || filterDate || filterSkillLevel
                  ? 'Try adjusting your filters'
                  : 'Create your first therapy session to get started'}
              </p>
              <button
                onClick={() => router.push('/admin/sessions/new')}
                className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg inline-flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Create First Session
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Child</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Doctor</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Attendance</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Skill Level</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Progress</th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredSessions.map((session) => (
                    <tr key={session.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-gray-900 font-medium">
                        {new Date(session.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-900">{session.child_name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-900 font-semibold">{session.doctor_name}</td>
                      <td className="px-6 py-4">
                        {session.attendance ? (
                          <span className="inline-flex items-center gap-1 text-green-600">
                            <CheckCircle className="w-4 h-4" />
                            Present
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-red-600">
                            <XCircle className="w-4 h-4" />
                            Absent
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getSkillLevelColor(session.skill_level)}`}>
                          {session.skill_level.charAt(0).toUpperCase() + session.skill_level.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-1">
                          {session.eye_contact && (
                            <span title="Eye Contact">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            </span>
                          )}
                          {session.follow_instructions && (
                            <span title="Follow Instructions">
                              <CheckCircle className="w-4 h-4 text-blue-500" />
                            </span>
                          )}
                          {session.speech_attempt && (
                            <span title="Speech Attempt">
                              <CheckCircle className="w-4 h-4 text-purple-500" />
                            </span>
                          )}
                          {session.motor_improvement && (
                            <span title="Motor Improvement">
                              <CheckCircle className="w-4 h-4 text-orange-500" />
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => router.push(`/admin/sessions/${session.id}`)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => router.push(`/admin/sessions/edit/${session.id}`)}
                            className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                            title="Edit Session"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDownloadPDF(session)}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Download PDF"
                          >
                            <Download className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SessionsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <SessionsContent />
    </Suspense>
  );
}
