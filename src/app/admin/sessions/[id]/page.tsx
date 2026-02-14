'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { getSessions, getChildById, getDoctorById, Session } from '@/lib/neon/database';
import { generateSessionPDF } from '@/lib/pdfExport';
import { 
  ArrowLeft,
  Calendar,
  User,
  CheckCircle,
  XCircle,
  FileText,
  Target,
  Download
} from 'lucide-react';

export default function SessionDetailPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const sessionId = params.id as string;
  
  const [session, setSession] = useState<Session | null>(null);
  const [childName, setChildName] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [childDetails, setChildDetails] = useState<any>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/admin/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user && sessionId) {
      loadSession();
    }
  }, [user, sessionId]);

  const loadSession = () => {
    const sessions = getSessions();
    const foundSession = sessions.find(s => s.id === sessionId);
    
    if (foundSession) {
      setSession(foundSession);
      
      const child = getChildById(foundSession.child_id);
      const doctor = getDoctorById(foundSession.doctor_id);
      
      setChildName(child?.name || 'Unknown');
      setDoctorName(doctor?.name || 'Unknown');
      setChildDetails(child);
    }
  };

  const handleDownloadPDF = () => {
    if (session) {
      generateSessionPDF(session, childName, doctorName, childDetails);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user || !session) {
    return (
      <div className="admin-dashboard min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">Session not found</p>
          <button
            onClick={() => router.push('/admin/sessions')}
            className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg"
          >
            Back to Sessions
          </button>
        </div>
      </div>
    );
  }

  const getSkillLevelColor = (level: string) => {
    switch (level) {
      case 'excellent': return 'bg-green-100 text-green-700 border-green-300';
      case 'good': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'average': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'poor': return 'bg-red-100 text-red-700 border-red-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  return (
    <div className="admin-dashboard min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Session Details</h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1">
                {childName} - {new Date(session.date).toLocaleDateString()}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <button
                onClick={() => router.push('/admin/sessions')}
                className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                Back
              </button>
              <button
                onClick={handleDownloadPDF}
                className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Basic Info */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            Session Information
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-xs sm:text-sm text-gray-600 mb-1">Child</p>
              <p className="text-sm sm:text-base font-semibold text-gray-900">{childName}</p>
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-600 mb-1">Doctor</p>
              <p className="text-sm sm:text-base font-semibold text-gray-900">{doctorName}</p>
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-600 mb-1">Date</p>
              <p className="text-sm sm:text-base font-semibold text-gray-900">
                {new Date(session.date).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-600 mb-1">Attendance</p>
              <div className="flex items-center gap-2">
                {session.attendance ? (
                  <>
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                    <span className="text-sm sm:text-base font-semibold text-green-600">Present</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                    <span className="text-sm sm:text-base font-semibold text-red-600">Absent</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Progress Indicators */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
            Progress Indicators
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className={`p-3 sm:p-4 rounded-xl border-2 ${session.eye_contact ? 'bg-green-50 border-green-300' : 'bg-gray-50 border-gray-200'}`}>
              <div className="flex items-center gap-2">
                {session.eye_contact ? (
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                ) : (
                  <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                )}
                <span className={`text-sm sm:text-base font-semibold ${session.eye_contact ? 'text-green-700' : 'text-gray-600'}`}>
                  Eye Contact
                </span>
              </div>
            </div>

            <div className={`p-3 sm:p-4 rounded-xl border-2 ${session.follow_instructions ? 'bg-green-50 border-green-300' : 'bg-gray-50 border-gray-200'}`}>
              <div className="flex items-center gap-2">
                {session.follow_instructions ? (
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                ) : (
                  <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                )}
                <span className={`text-sm sm:text-base font-semibold ${session.follow_instructions ? 'text-green-700' : 'text-gray-600'}`}>
                  Follow Instructions
                </span>
              </div>
            </div>

            <div className={`p-3 sm:p-4 rounded-xl border-2 ${session.speech_attempt ? 'bg-green-50 border-green-300' : 'bg-gray-50 border-gray-200'}`}>
              <div className="flex items-center gap-2">
                {session.speech_attempt ? (
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                ) : (
                  <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                )}
                <span className={`text-sm sm:text-base font-semibold ${session.speech_attempt ? 'text-green-700' : 'text-gray-600'}`}>
                  Speech Attempt
                </span>
              </div>
            </div>

            <div className={`p-3 sm:p-4 rounded-xl border-2 ${session.motor_improvement ? 'bg-green-50 border-green-300' : 'bg-gray-50 border-gray-200'}`}>
              <div className="flex items-center gap-2">
                {session.motor_improvement ? (
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                ) : (
                  <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                )}
                <span className={`text-sm sm:text-base font-semibold ${session.motor_improvement ? 'text-green-700' : 'text-gray-600'}`}>
                  Motor Improvement
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Skill Level */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
            Overall Skill Level
          </h2>
          
          <div className={`inline-flex px-4 sm:px-6 py-2 sm:py-3 rounded-xl border-2 text-base sm:text-lg font-bold ${getSkillLevelColor(session.skill_level)}`}>
            {session.skill_level.charAt(0).toUpperCase() + session.skill_level.slice(1)}
          </div>
        </div>

        {/* Activities */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <User className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
            Activities Performed
          </h2>
          
          {session.activities.length > 0 ? (
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {session.activities.map((activity, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-100 text-blue-700 rounded-lg text-xs sm:text-sm font-semibold"
                >
                  {activity}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm sm:text-base text-gray-500">No activities recorded</p>
          )}
        </div>

        {/* Notes */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600" />
            Session Notes
          </h2>
          
          {session.notes ? (
            <p className="text-sm sm:text-base text-gray-700 whitespace-pre-wrap">{session.notes}</p>
          ) : (
            <p className="text-sm sm:text-base text-gray-500 italic">No notes recorded</p>
          )}
        </div>

        {/* Next Goal */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
            Next Session Goal
          </h2>
          
          {session.next_goal ? (
            <p className="text-sm sm:text-base text-gray-700 whitespace-pre-wrap">{session.next_goal}</p>
          ) : (
            <p className="text-sm sm:text-base text-gray-500 italic">No goal set</p>
          )}
        </div>
      </div>
    </div>
  );
}
