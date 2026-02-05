'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { getChildren, getSessions, getDoctors, getSessionsByChildId } from '@/lib/localStorage';
import { generateChildReportPDF } from '@/lib/pdfExport';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import { 
  Download,
  FileText,
  User,
  Calendar
} from 'lucide-react';

export default function ReportsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [children, setChildren] = useState<any[]>([]);
  const [selectedChild, setSelectedChild] = useState('');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/admin/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  const loadData = () => {
    const childrenData = getChildren();
    const doctorsData = getDoctors();
    
    // Add doctor names and session counts
    const childrenWithDetails = childrenData.map(child => {
      const doctor = doctorsData.find(d => d.id === child.assigned_doctor_id);
      const sessions = getSessionsByChildId(child.id);
      
      return {
        ...child,
        doctor_name: doctor?.name || 'Not assigned',
        session_count: sessions.length,
      };
    });
    
    setChildren(childrenWithDetails);
  };

  const handleDownloadChildReport = (childId: string) => {
    const child = children.find(c => c.id === childId);
    if (!child) return;
    
    const sessions = getSessionsByChildId(childId);
    generateChildReportPDF(child, sessions, child.doctor_name);
  };

  const handleDownloadAllReports = () => {
    children.forEach(child => {
      setTimeout(() => {
        handleDownloadChildReport(child.id);
      }, 500);
    });
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
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <AdminPageHeader title="Export Reports" />
        
        {/* Download All Button */}
        {children.length > 0 && (
          <div className="mb-6">
            <button
              onClick={handleDownloadAllReports}
              className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <Download className="w-4 h-4 sm:w-5 sm:h-5" />
              Download All Reports
            </button>
          </div>
        )}

        {/* Quick Export Section */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            Quick Export
          </h2>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <select
              value={selectedChild}
              onChange={(e) => setSelectedChild(e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
            >
              <option value="">Select a child to export report...</option>
              {children.map((child) => (
                <option key={child.id} value={child.id}>
                  {child.name} - {child.session_count} sessions
                </option>
              ))}
            </select>
            
            <button
              onClick={() => selectedChild && handleDownloadChildReport(selectedChild)}
              disabled={!selectedChild}
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-xl hover:from-green-700 hover:to-green-800 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
            >
              <Download className="w-4 h-4 sm:w-5 sm:h-5" />
              Export Report
            </button>
          </div>
        </div>

        {/* Children List */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
            <User className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
            Individual Child Reports
          </h2>

          {children.length === 0 ? (
            <div className="text-center py-8 sm:py-12">
              <FileText className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-3 sm:mb-4" />
              <p className="text-gray-500 text-base sm:text-lg">No children found</p>
              <p className="text-gray-400 text-xs sm:text-sm mt-2">
                Add children to generate reports
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {children.map((child) => (
                <div
                  key={child.id}
                  className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start justify-between mb-3 sm:mb-4">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-base sm:text-lg">
                        {child.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-sm sm:text-base">{child.name}</h3>
                        <p className="text-xs sm:text-sm text-gray-600">{child.age} years old</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-xs sm:text-sm">
                      <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500" />
                      <span className="text-gray-600">Diagnosis:</span>
                      <span className="font-medium text-gray-900 truncate">{child.diagnosis}</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs sm:text-sm">
                      <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500" />
                      <span className="text-gray-600">Doctor:</span>
                      <span className="font-medium text-gray-900 truncate">{child.doctor_name}</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs sm:text-sm">
                      <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500" />
                      <span className="text-gray-600">Sessions:</span>
                      <span className="font-medium text-gray-900">{child.session_count}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDownloadChildReport(child.id)}
                    className="w-full px-4 py-2 sm:py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg sm:rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-md flex items-center justify-center gap-2 text-xs sm:text-sm"
                  >
                    <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    Download Report
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
