'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { getAssessments } from '@/lib/api-client';
import { generateAssessmentPDF } from '@/lib/pdfExport';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import { ArrowLeft, Download, Edit } from 'lucide-react';

export default function ViewAssessmentPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [assessment, setAssessment] = useState<any>(null);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/admin/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user && id) {
      loadAssessment();
    }
  }, [user, id]);

  const loadAssessment = async () => {
    try {
      const assessments = await getAssessments();
      const found = assessments.find(a => a.id === id);
      if (found) {
        setAssessment(found);
      } else {
        alert('Assessment not found');
        router.push('/admin/assessments');
      }
    } catch (error) {
      console.error('Error loading assessment:', error);
      alert('Failed to load assessment');
    } finally {
      setLoadingData(false);
    }
  };

  const handleDownloadPDF = () => {
    if (assessment) {
      generateAssessmentPDF(assessment, assessment.child_name || 'Unknown');
    }
  };

  if (loading || loadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user || !assessment) return null;

  const data = assessment.data || {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <AdminPageHeader title="View ASD Case Sheet" />

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={() => router.push('/admin/assessments')}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to List
          </button>
          <button
            onClick={() => router.push(`/admin/assessments/edit/${id}`)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2"
          >
            <Edit className="w-4 h-4" />
            Edit
          </button>
          <button
            onClick={handleDownloadPDF}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </button>
        </div>

        {/* Assessment Data */}
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{assessment.child_name}</h2>
            <span className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold ${
              assessment.status === 'completed'
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {assessment.status === 'completed' ? 'Completed' : 'Draft'}
            </span>
          </div>

          {/* Basic Details */}
          {data.childName && (
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2">Basic Child Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.childName && <div><span className="font-semibold text-gray-700">Child Name:</span> <span className="text-gray-900">{data.childName}</span></div>}
                {data.age && <div><span className="font-semibold text-gray-700">Age:</span> <span className="text-gray-900">{data.age} years</span></div>}
                {data.dob && <div><span className="font-semibold text-gray-700">Date of Birth:</span> <span className="text-gray-900">{data.dob}</span></div>}
                {data.gender && <div><span className="font-semibold text-gray-700">Gender:</span> <span className="text-gray-900">{data.gender}</span></div>}
                {data.parentName && <div><span className="font-semibold text-gray-700">Parent Name:</span> <span className="text-gray-900">{data.parentName}</span></div>}
                {data.phoneNumber && <div><span className="font-semibold text-gray-700">Phone:</span> <span className="text-gray-900">{data.phoneNumber}</span></div>}
                {data.address && <div className="md:col-span-2"><span className="font-semibold text-gray-700">Address:</span> <span className="text-gray-900">{data.address}</span></div>}
              </div>
            </div>
          )}

          {/* Display all other sections */}
          {Object.entries(data).map(([key, value]) => {
            if (key === 'childId' || key === 'childName' || key === 'age' || key === 'dob' || key === 'gender' || key === 'parentName' || key === 'phoneNumber' || key === 'address') {
              return null;
            }
            
            if (value && typeof value === 'object' && Object.keys(value).length > 0) {
              const sectionTitle = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
              
              return (
                <div key={key} className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2">{sectionTitle}</h3>
                  <div className="grid grid-cols-1 gap-3">
                    {Object.entries(value as any).map(([fieldKey, fieldValue]) => {
                      if (!fieldValue || fieldValue === '' || fieldValue === 'No') return null;
                      
                      const label = fieldKey.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                      const displayValue = Array.isArray(fieldValue) ? fieldValue.join(', ') : String(fieldValue);
                      
                      return (
                        <div key={fieldKey}>
                          <span className="font-semibold text-gray-700">{label}:</span>{' '}
                          <span className="text-gray-900">{displayValue}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            }
            
            return null;
          })}

          {/* Metadata */}
          <div className="mt-8 pt-6 border-t text-sm">
            <p className="text-gray-900 font-semibold">Created: {new Date(assessment.created_at).toLocaleString()}</p>
            <p className="text-gray-900 font-semibold">Last Updated: {new Date(assessment.updated_at).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
