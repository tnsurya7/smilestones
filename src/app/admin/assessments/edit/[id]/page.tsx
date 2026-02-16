'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { getAssessments } from '@/lib/api-client';
import AssessmentForm from '@/components/admin/AssessmentForm';

export default function EditAssessmentPage() {
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

  if (loading || loadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user || !assessment) return null;

  return <AssessmentForm childId={assessment.child_id} assessmentId={id} />;
}
