'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { getChildById } from '@/lib/api-client';
import { ArrowLeft, FileText, ClipboardCheck, ListChecks, Activity, FileBarChart, Brain, Hand, Footprints, MessageSquare, Heart, Download } from 'lucide-react';
import jsPDF from 'jspdf';
import Toast from '@/components/Toast';

export default function ChildProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const childId = params.id as string;
  
  const [child, setChild] = useState<any>(null);
  const [downloading, setDownloading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' | 'warning' } | null>(null);

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

  const downloadFullClinicalData = async () => {
    setDownloading(true);
    setToast({ message: 'Generating comprehensive clinical report...', type: 'info' });

    try {
      // Fetch all clinical data
      const [caseSheetRes, mchatRes, dsmRes, cognitiveRes, fineMotorRes, grossMotorRes, languageRes, socialRes] = await Promise.all([
        fetch(`/api/case-sheets?child_id=${childId}`),
        fetch(`/api/mchat?child_id=${childId}`),
        fetch(`/api/dsm?child_id=${childId}`),
        fetch(`/api/cognitive-milestones?child_id=${childId}`),
        fetch(`/api/fine-motor-skills?child_id=${childId}`),
        fetch(`/api/gross-motor-skills?child_id=${childId}`),
        fetch(`/api/language-development?child_id=${childId}`),
        fetch(`/api/social-emotional?child_id=${childId}`)
      ]);

      const caseSheet = await caseSheetRes.json();
      const mchat = await mchatRes.json();
      const dsm = await dsmRes.json();
      const cognitive = await cognitiveRes.json();
      const fineMotor = await fineMotorRes.json();
      const grossMotor = await grossMotorRes.json();
      const language = await languageRes.json();
      const social = await socialRes.json();

      // Create PDF
      const doc = new jsPDF();
      let yPos = 20;

      // Title
      doc.setFontSize(20);
      doc.setFont('helvetica', 'bold');
      doc.text('COMPREHENSIVE CLINICAL REPORT', 105, yPos, { align: 'center' });
      yPos += 15;

      // Child Information
      doc.setFontSize(14);
      doc.text('Child Information', 20, yPos);
      yPos += 8;
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(`Name: ${child.name}`, 20, yPos);
      yPos += 6;
      doc.text(`Age: ${child.age} years`, 20, yPos);
      yPos += 6;
      doc.text(`Diagnosis: ${child.diagnosis}`, 20, yPos);
      yPos += 6;
      doc.text(`Parent/Guardian: ${child.parent_name}`, 20, yPos);
      yPos += 6;
      doc.text(`Phone: ${child.phone}`, 20, yPos);
      yPos += 6;
      doc.text(`Registered: ${new Date(child.created_at).toLocaleDateString()}`, 20, yPos);
      yPos += 12;

      // Case Sheet Summary
      if (caseSheet && caseSheet.length > 0) {
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text('Case Sheet', 20, yPos);
        yPos += 6;
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        doc.text('Status: Completed', 20, yPos);
        yPos += 10;
      }

      // M-CHAT Summary
      if (mchat && mchat.length > 0) {
        const mchatData = mchat[0];
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text('M-CHAT Screening', 20, yPos);
        yPos += 6;
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        doc.text(`Risk Score: ${mchatData.risk_score || 'N/A'}`, 20, yPos);
        yPos += 5;
        doc.text(`Risk Level: ${mchatData.risk_level || 'N/A'}`, 20, yPos);
        yPos += 10;
      }

      // DSM Summary
      if (dsm && dsm.length > 0) {
        const dsmData = dsm[0];
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text('DSM-5 Checklist', 20, yPos);
        yPos += 6;
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        doc.text(`Criteria Met: ${dsmData.criteria_met || 'N/A'}`, 20, yPos);
        yPos += 5;
        doc.text(`Diagnosis: ${dsmData.diagnosis || 'N/A'}`, 20, yPos);
        yPos += 10;
      }

      // Assessment Summaries
      const assessments = [
        { name: 'Cognitive Milestones', data: cognitive },
        { name: 'Fine Motor Skills', data: fineMotor },
        { name: 'Gross Motor Skills', data: grossMotor },
        { name: 'Language Development', data: language },
        { name: 'Social-Emotional', data: social }
      ];

      assessments.forEach(assessment => {
        if (yPos > 250) {
          doc.addPage();
          yPos = 20;
        }
        
        if (assessment.data && assessment.data.length > 0) {
          doc.setFontSize(12);
          doc.setFont('helvetica', 'bold');
          doc.text(assessment.name, 20, yPos);
          yPos += 6;
          doc.setFontSize(9);
          doc.setFont('helvetica', 'normal');
          doc.text(`Assessments Completed: ${assessment.data.length}`, 20, yPos);
          yPos += 5;
          doc.text(`Last Updated: ${new Date(assessment.data[0].created_at).toLocaleDateString()}`, 20, yPos);
          yPos += 10;
        }
      });

      // Footer
      const pageCount = doc.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');
        doc.text(`Page ${i} of ${pageCount}`, 105, 285, { align: 'center' });
        doc.text(`Generated: ${new Date().toLocaleString()}`, 105, 290, { align: 'center' });
      }

      // Save PDF
      doc.save(`${child.name}_Full_Clinical_Report_${new Date().toISOString().split('T')[0]}.pdf`);
      setToast({ message: 'Clinical report downloaded successfully!', type: 'success' });
    } catch (error) {
      console.error('Error generating PDF:', error);
      setToast({ message: 'Failed to generate clinical report', type: 'error' });
    } finally {
      setDownloading(false);
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
      title: 'Cognitive Milestones',
      description: 'Age-based cognitive and developmental milestones assessment for tracking child progress',
      icon: Brain,
      color: 'from-teal-500 to-teal-600',
      route: `/admin/children/${childId}/cognitive`
    },
    {
      title: 'Fine Motor Skills',
      description: 'Age-based fine motor skills assessment tracking hand-eye coordination and dexterity development',
      icon: Hand,
      color: 'from-cyan-500 to-cyan-600',
      route: `/admin/children/${childId}/fine-motor`
    },
    {
      title: 'Gross Motor Skills',
      description: 'Age-based gross motor skills assessment tracking movement, balance, and physical coordination',
      icon: Footprints,
      color: 'from-indigo-500 to-indigo-600',
      route: `/admin/children/${childId}/gross-motor`
    },
    {
      title: 'Language Development',
      description: 'Age-based language and communication skills assessment tracking speech and comprehension',
      icon: MessageSquare,
      color: 'from-violet-500 to-violet-600',
      route: `/admin/children/${childId}/language`
    },
    {
      title: 'Social-Emotional',
      description: 'Age-based social-emotional development assessment tracking interactions and emotional responses',
      icon: Heart,
      color: 'from-rose-500 to-rose-600',
      route: `/admin/children/${childId}/social-emotional`
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
      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
          duration={5000}
        />
      )}

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
          
          {/* Download Button */}
          <button
            onClick={downloadFullClinicalData}
            disabled={downloading}
            className="mb-4 w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-bold rounded-lg hover:from-green-700 hover:to-green-800 transition-all shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="w-4 h-4 sm:w-5 sm:h-5" />
            {downloading ? 'Generating PDF...' : 'Download Full Clinical Data PDF'}
          </button>
          
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
