'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { getChildren } from '@/lib/api-client';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import { 
  FileText,
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  Download,
  Calendar
} from 'lucide-react';

interface Assessment {
  id: string;
  childId: string;
  childName: string;
  createdAt: string;
  updatedAt: string;
  status: 'draft' | 'completed';
}

export default function AssessmentsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/admin/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      loadAssessments();
    }
  }, [user]);

  const loadAssessments = async () => {
    try {
      const keys = Object.keys(localStorage).filter(key => 
        key.startsWith('child_assessment_')
      );
      
      const children = await getChildren();
      
      const loadedAssessments: Assessment[] = keys.map(key => {
        const data = JSON.parse(localStorage.getItem(key) || '{}');
        const childId = key.replace('child_assessment_', '');
        const child = children.find(c => c.id === childId);
        
        return {
          id: childId,
          childId: childId,
          childName: child?.name || data.childName || 'Unknown',
          createdAt: data.createdAt || new Date().toISOString(),
          updatedAt: data.updatedAt || new Date().toISOString(),
          status: data.status || 'draft'
        };
      });
      
      setAssessments(loadedAssessments);
    } catch (error) {
      console.error('Error loading assessments:', error);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this assessment?')) {
      localStorage.removeItem(`child_assessment_${id}`);
      loadAssessments();
    }
  };

  const filteredAssessments = assessments.filter(assessment =>
    assessment.childName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="admin-dashboard min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <AdminPageHeader title="ASD Case Sheet" />
        
        {/* New Assessment Button */}
        <div className="mb-6">
          <button
            onClick={() => router.push('/admin/assessments/new')}
            className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
            New Case Sheet
          </button>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 mb-6 border border-gray-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by child name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Assessments List */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {filteredAssessments.length === 0 ? (
            <div className="text-center py-12 sm:py-16">
              <FileText className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-3 sm:mb-4" />
              <p className="text-gray-500 text-base sm:text-lg mb-2">No case sheets found</p>
              <p className="text-gray-400 text-xs sm:text-sm">
                Create your first case sheet to get started
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Child Name
                    </th>
                    <th className="hidden sm:table-cell px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Last Updated
                    </th>
                    <th className="px-4 sm:px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredAssessments.map((assessment) => (
                    <tr key={assessment.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 sm:px-6 py-4">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 flex-shrink-0" />
                          <span className="font-medium text-gray-900 text-sm sm:text-base">
                            {assessment.childName}
                          </span>
                        </div>
                      </td>
                      <td className="hidden sm:table-cell px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          assessment.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {assessment.status === 'completed' ? 'Completed' : 'Draft'}
                        </span>
                      </td>
                      <td className="hidden md:table-cell px-6 py-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          {new Date(assessment.updatedAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4">
                        <div className="flex items-center justify-end gap-1 sm:gap-2">
                          <button
                            onClick={() => router.push(`/admin/assessments/${assessment.id}`)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="View"
                          >
                            <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                          <button
                            onClick={() => router.push(`/admin/assessments/edit/${assessment.id}`)}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(assessment.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
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
