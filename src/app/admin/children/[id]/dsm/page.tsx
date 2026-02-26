'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { getChildById } from '@/lib/api-client';
import { DSM_QUESTIONS } from '@/data/dsmQuestions';
import { ArrowLeft, Save, RotateCcw, Download } from 'lucide-react';
import jsPDF from 'jspdf';
import Toast, { ConfirmDialog } from '@/components/Toast';

export default function DSMPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const childId = params.id as string;
  
  const [child, setChild] = useState<any>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [results, setResults] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' | 'warning' } | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/admin/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user && childId) {
      loadData();
    }
  }, [user, childId]);

  const loadData = async () => {
    try {
      const childData = await getChildById(childId);
      setChild(childData);

      // Load existing DSM data
      const response = await fetch(`/api/dsm?child_id=${childId}`);
      if (response.ok) {
        const data = await response.json();
        if (data) {
          setAnswers(data.answers || {});
          calculateResults(data.answers || {});
        }
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const calculateResults = (currentAnswers: Record<string, string>) => {
    // Count A criteria (need at least 2 from A1, A2, A3)
    // Count all A1 questions (a1_1 to a1_22)
    const a1Count = Object.keys(currentAnswers).filter(k => k.startsWith('a1_') && currentAnswers[k] === 'Yes').length;
    const a2Count = Object.keys(currentAnswers).filter(k => k.startsWith('a2_') && currentAnswers[k] === 'Yes').length;
    const a3Count = Object.keys(currentAnswers).filter(k => k.startsWith('a3_') && currentAnswers[k] === 'Yes').length;
    
    const aGroups = [a1Count > 0 ? 1 : 0, a2Count > 0 ? 1 : 0, a3Count > 0 ? 1 : 0].filter(x => x > 0).length;
    const aCriteriaCount = aGroups;

    // Count B criteria (need at least 2 from B1, B2, B3, B4)
    const b1Count = Object.keys(currentAnswers).filter(k => k.startsWith('b1_') && currentAnswers[k] === 'Yes').length;
    const b2Count = Object.keys(currentAnswers).filter(k => k.startsWith('b2_') && currentAnswers[k] === 'Yes').length;
    const b3Count = Object.keys(currentAnswers).filter(k => k.startsWith('b3_') && currentAnswers[k] === 'Yes').length;
    const b4Count = Object.keys(currentAnswers).filter(k => k.startsWith('b4_') && currentAnswers[k] === 'Yes').length;
    
    const bGroups = [b1Count > 0 ? 1 : 0, b2Count > 0 ? 1 : 0, b3Count > 0 ? 1 : 0, b4Count > 0 ? 1 : 0].filter(x => x > 0).length;
    const bCriteriaCount = bGroups;

    const cCriteria = currentAnswers.c === 'Yes';
    const dCriteria = currentAnswers.d === 'Yes';

    const meetsCriteria = aCriteriaCount >= 2 && bCriteriaCount >= 2 && cCriteria && dCriteria;
    
    const interpretation = meetsCriteria 
      ? 'Meets DSM Autism Criteria' 
      : 'Does NOT Meet DSM Criteria';

    setResults({
      aCriteriaCount,
      bCriteriaCount,
      cCriteria,
      dCriteria,
      meetsCriteria,
      interpretation,
      a1Count,
      a2Count,
      a3Count,
      b1Count,
      b2Count,
      b3Count,
      b4Count
    });
  };

  const handleAnswerChange = (questionId: string, answer: string) => {
    const newAnswers = { ...answers, [questionId]: answer };
    setAnswers(newAnswers);
    calculateResults(newAnswers);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const response = await fetch('/api/dsm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ child_id: childId, answers })
      });

      if (response.ok) {
        setToast({ message: 'DSM Checklist saved successfully!', type: 'success' });
      } else {
        throw new Error('Failed to save');
      }
    } catch (error) {
      console.error('Error saving DSM:', error);
      setToast({ message: 'Failed to save DSM Checklist. Please try again.', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setShowResetConfirm(true);
  };

  const confirmReset = () => {
    setAnswers({});
    setResults(null);
    setShowResetConfirm(false);
    setToast({ message: 'All answers have been reset', type: 'info' });
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    
    // Header with logo
    doc.setFillColor(102, 126, 234);
    doc.rect(0, 0, 210, 40, 'F');
    
    // Add logo
    const logo = new Image();
    logo.src = '/smilestones-logo.jpeg';
    doc.addImage(logo, 'JPEG', 14, 8, 24, 24);
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('Smilestones', 105, 15, { align: 'center' });
    
    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text('Child Development Centre', 105, 25, { align: 'center' });
    
    doc.setFontSize(12);
    doc.text('DSM Checklist Report', 105, 33, { align: 'center' });
    
    doc.setTextColor(0, 0, 0);
    
    let yPos = 50;
    
    // Child Info
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Child Information', 14, yPos);
    yPos += 8;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Name: ${child?.name || 'N/A'}`, 14, yPos);
    yPos += 6;
    doc.text(`Age: ${child?.age || 'N/A'} years`, 14, yPos);
    yPos += 6;
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, yPos);
    yPos += 10;
    
    // Results
    if (results) {
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('DSM Criteria Results', 14, yPos);
      yPos += 8;
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(`A Criteria: ${results.aCriteriaCount} / 3 groups (need ≥2)`, 14, yPos);
      yPos += 6;
      doc.text(`  A1: ${results.a1Count} symptoms`, 20, yPos);
      yPos += 5;
      doc.text(`  A2: ${results.a2Count} symptoms`, 20, yPos);
      yPos += 5;
      doc.text(`  A3: ${results.a3Count} symptoms`, 20, yPos);
      yPos += 8;
      
      doc.text(`B Criteria: ${results.bCriteriaCount} / 4 groups (need ≥2)`, 14, yPos);
      yPos += 6;
      doc.text(`  B1: ${results.b1Count} symptoms`, 20, yPos);
      yPos += 5;
      doc.text(`  B2: ${results.b2Count} symptoms`, 20, yPos);
      yPos += 5;
      doc.text(`  B3: ${results.b3Count} symptoms`, 20, yPos);
      yPos += 5;
      doc.text(`  B4: ${results.b4Count} symptoms`, 20, yPos);
      yPos += 8;
      
      doc.text(`C Criteria (Early Onset): ${results.cCriteria ? 'Yes' : 'No'}`, 14, yPos);
      yPos += 6;
      doc.text(`D Criteria (Clinical Impairment): ${results.dCriteria ? 'Yes' : 'No'}`, 14, yPos);
      yPos += 10;
      
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      const color = results.meetsCriteria ? [220, 38, 38] : [34, 197, 94];
      doc.setTextColor(color[0], color[1], color[2]);
      doc.text(`Final: ${results.interpretation}`, 14, yPos);
      doc.setTextColor(0, 0, 0);
      yPos += 12;
    }
    
    // Questions and Answers
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Detailed Responses', 14, yPos);
    yPos += 8;
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    
    Object.entries(DSM_QUESTIONS).forEach(([key, section]) => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
      
      doc.setFont('helvetica', 'bold');
      doc.text(section.title, 14, yPos);
      yPos += 6;
      doc.setFont('helvetica', 'normal');
      
      section.questions.forEach((q) => {
        if (yPos > 275) {
          doc.addPage();
          yPos = 20;
        }
        
        // Check if this is a heading
        if (q.isHeading) {
          doc.setFont('helvetica', 'bold');
          doc.text(q.text, 18, yPos);
          doc.setFont('helvetica', 'normal');
          yPos += 6;
        } else {
          const answer = answers[q.id] || 'Not Answered';
          doc.setFont('helvetica', 'normal');
          doc.text(`• ${q.text}: `, 18, yPos);
          
          // Make answer bold and colored
          doc.setFont('helvetica', 'bold');
          if (answer === 'Yes') {
            doc.setTextColor(34, 197, 94); // Green
          } else if (answer === 'No') {
            doc.setTextColor(239, 68, 68); // Red
          } else {
            doc.setTextColor(156, 163, 175); // Gray
          }
          
          const textWidth = doc.getTextWidth(`• ${q.text}: `);
          doc.text(answer, 18 + textWidth, yPos);
          doc.setTextColor(0, 0, 0); // Reset to black
          doc.setFont('helvetica', 'normal');
          yPos += 5;
        }
      });
      
      yPos += 3;
    });
    
    // Add watermark and footer to all pages
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      
      // Add watermark
      doc.saveGraphicsState();
      doc.setGState({ opacity: 0.1 } as any);
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(60);
      doc.setFont('helvetica', 'bold');
      
      // Center watermark at 45-degree angle
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      doc.text('SMILESTONES', pageWidth / 2, pageHeight / 2, {
        align: 'center',
        angle: 45
      });
      
      doc.restoreGraphicsState();
      
      // Footer
      doc.setFontSize(8);
      doc.setTextColor(128, 128, 128);
      doc.text('Confidential Medical Document', 14, 290);
      doc.text(`Page ${i} of ${pageCount}`, 105, 290, { align: 'center' });
      doc.text(`Generated: ${new Date().toLocaleDateString()}`, 160, 290);
    }
    
    doc.save(`DSM-Checklist-${child?.name || 'Report'}-${new Date().toISOString().split('T')[0]}.pdf`);
  };

  if (loading || !child) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="admin-dashboard min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Toast Notification */}
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}

        {/* Reset Confirmation Dialog */}
        {showResetConfirm && (
          <ConfirmDialog
            message="Are you sure you want to reset all answers? This action cannot be undone."
            onConfirm={confirmReset}
            onCancel={() => setShowResetConfirm(false)}
          />
        )}
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 sm:mb-4 gap-3">
            <button
              onClick={() => router.push(`/admin/children/${childId}`)}
              className="flex items-center gap-2 text-gray-900 hover:text-blue-600 font-semibold text-sm sm:text-base"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              Back
            </button>
            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
              <button
                onClick={handleReset}
                className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
              >
                <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Reset</span>
              </button>
              <button
                onClick={handleDownloadPDF}
                className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
              >
                <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">PDF</span>
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 text-sm"
              >
                <Save className="w-3 h-3 sm:w-4 sm:h-4" />
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
          
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">DSM Checklist</h1>
          <p className="text-sm sm:text-base text-gray-900 font-semibold">Child: {child.name} | Age: {child.age} years</p>
        </div>

        {/* Results Display */}
        {results && (
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">DSM Criteria Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-gray-900 font-semibold mb-1">A Criteria (Social Communication)</p>
                <p className="text-xl sm:text-2xl font-bold text-blue-600">{results.aCriteriaCount} / 3 groups</p>
                <p className="text-xs text-gray-900 mt-1">Need at least 2 groups</p>
                <div className="mt-2 text-sm text-gray-900">
                  <p>A1: {results.a1Count} symptoms</p>
                  <p>A2: {results.a2Count} symptoms</p>
                  <p>A3: {results.a3Count} symptoms</p>
                </div>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <p className="text-sm text-gray-900 font-semibold mb-1">B Criteria (Restricted Behaviors)</p>
                <p className="text-xl sm:text-2xl font-bold text-purple-600">{results.bCriteriaCount} / 4 groups</p>
                <p className="text-xs text-gray-900 mt-1">Need at least 2 groups</p>
                <div className="mt-2 text-sm text-gray-900">
                  <p>B1: {results.b1Count} symptoms</p>
                  <p>B2: {results.b2Count} symptoms</p>
                  <p>B3: {results.b3Count} symptoms</p>
                  <p>B4: {results.b4Count} symptoms</p>
                </div>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-sm text-gray-900 font-semibold mb-1">C Criteria (Early Onset)</p>
                <p className="text-xl sm:text-2xl font-bold text-green-600">{results.cCriteria ? 'Yes' : 'No'}</p>
              </div>
              <div className="bg-yellow-50 rounded-lg p-4">
                <p className="text-sm text-gray-900 font-semibold mb-1">D Criteria (Clinical Impairment)</p>
                <p className="text-xl sm:text-2xl font-bold text-yellow-600">{results.dCriteria ? 'Yes' : 'No'}</p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-900 font-semibold mb-2">Final Interpretation</p>
              <span className={`inline-flex px-4 py-2 rounded-full text-lg font-bold ${
                results.meetsCriteria 
                  ? 'bg-red-100 text-red-800' 
                  : 'bg-green-100 text-green-800'
              }`}>
                {results.interpretation}
              </span>
            </div>
          </div>
        )}

        {/* Questions */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-6">DSM-5 Autism Criteria</h2>
          <div className="space-y-8">
            {Object.entries(DSM_QUESTIONS).map(([key, section]) => (
              <div key={key} className="border-b border-gray-200 pb-6 last:border-0">
                <h3 className="text-lg font-bold text-gray-900 mb-4">{section.title}</h3>
                <div className="space-y-4">
                  {section.questions.map((question) => {
                    // Check if this is a heading
                    if (question.isHeading) {
                      return (
                        <h4 key={question.id} className="text-base font-bold text-gray-900 mt-4 mb-2">
                          {question.text}
                        </h4>
                      );
                    }
                    
                    // Regular question with Yes/No options
                    return (
                      <div key={question.id} className="pl-4">
                        <p className="text-gray-900 font-semibold mb-2">{question.text}</p>
                        <div className="flex gap-4">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name={question.id}
                              value="Yes"
                              checked={answers[question.id] === 'Yes'}
                              onChange={() => handleAnswerChange(question.id, 'Yes')}
                              className="w-4 h-4 text-blue-600"
                            />
                            <span className="text-gray-900 font-semibold">Yes</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name={question.id}
                              value="No"
                              checked={answers[question.id] === 'No'}
                              onChange={() => handleAnswerChange(question.id, 'No')}
                              className="w-4 h-4 text-blue-600"
                            />
                            <span className="text-gray-900 font-semibold">No</span>
                          </label>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Save Button */}
        <div className="flex justify-center pb-6">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50 text-base font-semibold shadow-lg"
          >
            <Save className="w-5 h-5" />
            {saving ? 'Saving...' : 'Save DSM Checklist'}
          </button>
        </div>
      </div>
    </div>
  );
}
