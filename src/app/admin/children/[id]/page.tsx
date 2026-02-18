'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { getChildById } from '@/lib/api-client';
import { ArrowLeft, FileText, ClipboardCheck, ListChecks, Activity, FileBarChart } from 'lucide-react';

export default function ChildProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const childId = params.id as string;
  
  const [child, setChild] = useState<any>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/admin/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user && childId) {
      loadChild();
    }
  }, [user, childId]);

  const loadChild = async () => {
    try {
      const childData = await getChildById(childId);
      setChild(childData);
    } catch (error) {
      console.error('Error loading child:', error);
    }
  };

  if (loading || !child) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  const modules = [
    {
      title: 'Case Sheet',
      description: 'Complete clinical case sheet with child identification, parent details, developmental history, and clinical impression',
      icon: FileText,
      color: 'from-blue-500 to-blue-600',
      route: `/admin/children/${childId}/casesheet`
    },
    {
      title: 'M-CHAT Screening',
      description: '20-question Modified Checklist for Autism in Toddlers with automatic risk scoring',
      icon: ClipboardCheck,
      color: 'from-purple-500 to-purple-600',
      route: `/admin/children/${childId}/mchat`
    },
    {
      title: 'DSM Checklist',
      description: 'DSM-5 Autism Spectrum Disorder diagnostic criteria checklist with automatic evaluation',
      icon: ListChecks,
      color: 'from-pink-500 to-pink-600',
      route: `/admin/children/${childId}/dsm`
    },
    {
      title: 'Sessions',
      description: 'View and manage therapy sessions, progress tracking, and session notes',
      icon: Activity,
      color: 'from-green-500 to-green-600',
      route: `/admin/sessions?child_id=${childId}`
    },
    {
      title: 'EMR',
      description: 'Electronic Medical Records - comprehensive medical history and documentation',
      icon: FileBarChart,
      color: 'from-orange-500 to-orange-600',
      route: `/admin/emr/${childId}`
    }
  ];

  return (
    <div className="admin-dashboard min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6">
          <button
            onClick={() => router.push('/admin/children')}
            className="flex items-center gap-2 text-gray-900 hover:text-blue-600 mb-3 sm:mb-4 font-semibold text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            Back to Children
          </button>
          
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Child Profile</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 sm:p-6">
            <div>
              <p className="text-xs sm:text-sm text-gray-900 font-semibold">Name</p>
              <p className="text-lg sm:text-xl font-bold text-gray-900">{child.name}</p>
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-900 font-semibold">Age</p>
              <p className="text-lg sm:text-xl font-bold text-gray-900">{child.age} years</p>
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-900 font-semibold">Diagnosis</p>
              <p className="text-lg sm:text-xl font-bold text-gray-900">{child.diagnosis}</p>
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-900 font-semibold">Parent/Guardian</p>
              <p className="text-lg sm:text-xl font-bold text-gray-900">{child.parent_name}</p>
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-900 font-semibold">Phone</p>
              <p className="text-lg sm:text-xl font-bold text-gray-900">{child.phone}</p>
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-900 font-semibold">Registered</p>
              <p className="text-lg sm:text-xl font-bold text-gray-900">{new Date(child.created_at).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        {/* Clinical Modules */}
        <div className="mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Clinical Modules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {modules.map((module) => {
              const Icon = module.icon;
              return (
                <button
                  key={module.title}
                  onClick={() => router.push(module.route)}
                  className="bg-white rounded-xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-all transform hover:-translate-y-1 text-left"
                >
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br ${module.color} flex items-center justify-center mb-3 sm:mb-4`}>
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1 sm:mb-2">{module.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-900 font-semibold">{module.description}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
