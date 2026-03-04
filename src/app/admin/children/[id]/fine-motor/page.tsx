'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { getChildById } from '@/lib/api-client';
import { FINE_MOTOR_SKILLS, FINE_MOTOR_AVAILABLE_AGES } from '@/data/fineMotorSkills';
import { ArrowLeft, Save, RotateCcw, Download } from 'lucide-react';
import jsPDF from 'jspdf';
import { addPDFHeader, addPDFWatermark, addPDFFooter } from '@/utils/pdfUtils';
import Toast, { ConfirmDialog } from '@/components/Toast';

export default function FineMotorSkillsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const childId = params.id as string;
  
  const [child, setChild] = useState<any>(null);
  const [selectedAge, setSelectedAge] = useState<string>('');
  const [answers, setAnswers] = useState<Record<string, string>>({});
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
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  // Load data for selected age
  useEffect(() => {
    if (selectedAge && childId) {
      loadAgeData(selectedAge);
    }
  }, [selectedAge, childId]);

  const loadAgeData = async (age: string) => {
    try {
      // Load existing fine motor skills data for this specific age
      const response = await fetch(`/api/fine-motor-skills?child_id=${childId}&age=${age}`);
      if (response.ok) {
        const data = await response.json();
        if (data && data.answers) {
          setAnswers(typeof data.answers === 'string' ? JSON.parse(data.answers) : data.answers);
        } else {
          // No data for this age, reset answers
          setAnswers({});
        }
      } else {
        // No data for this age
        setAnswers({});
      }
    } catch (error) {
      console.error('Error loading age data:', error);
      setAnswers({});
    }
  };

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleAgeChange = (age: string) => {
    setSelectedAge(age);
    // Data will be loaded by useEffect
  };

  const handleSave = async () => {
    if (!selectedAge) {
      setToast({ message: 'Please select child\'s age first', type: 'warning' });
      return;
    }

    try {
      setSaving(true);
      const response = await fetch('/api/fine-motor-skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ child_id: childId, age: selectedAge, answers })
      });

      if (response.ok) {
        setToast({ message: 'Fine Motor Skills saved successfully!', type: 'success' });
      } else {
        throw new Error('Failed to save');
      }
    } catch (error) {
      console.error('Error saving fine motor skills:', error);
      setToast({ message: 'Failed to save Fine Motor Skills. Please try again.', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setShowResetConfirm(true);
  };

  const confirmReset = () => {
    setAnswers({});
    setSelectedAge('');
    setShowResetConfirm(false);
    setToast({ message: 'All answers have been reset', type: 'info' });
  };

  const handleDownloadPDF = () => {
    if (!selectedAge) {
      setToast({ message: 'Please select child\'s age first', type: 'warning' });
      return;
    }

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    
    // Add header to first page
    let yPos = addPDFHeader({
      doc,
      title: 'FINE MOTOR SKILLS ASSESSMENT',
      childName: child?.name,
      childAge: `${child?.age} years`,
      childDiagnosis: child?.diagnosis,
      parentName: child?.parent_name,
      phone: child?.phone,
      registeredDate: child?.created_at ? new Date(child.created_at).toLocaleDateString() : undefined
    });
    
    // Assessment details
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(`Assessment Age: ${selectedAge} months`, 15, yPos);
    yPos += 6;
    doc.text(`Assessment Date: ${new Date().toLocaleDateString()}`, 15, yPos);
    yPos += 10;
    
    // Fine Motor Skills
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(`Fine Motor Skills for ${selectedAge} months`, 15, yPos);
    yPos += 8;
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    
    const skills = FINE_MOTOR_SKILLS[parseInt(selectedAge)];
    skills.forEach((skill, index) => {
      if (yPos > pageHeight - 40) {
        addPDFWatermark(doc);
        addPDFFooter(doc, doc.getCurrentPageInfo().pageNumber, 1);
        doc.addPage();
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text('FINE MOTOR SKILLS ASSESSMENT (Continued)', pageWidth / 2, 20, { align: 'center' });
        yPos = 30;
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
      }
      
      const answer = answers[skill.id] || 'Not Answered';
      const lines = doc.splitTextToSize(`${index + 1}. ${skill.text}`, 160);
      lines.forEach((line: string) => {
        doc.text(line, 15, yPos);
        yPos += 5;
      });
      
      // Make answer bold and colored
      doc.setFont('helvetica', 'normal');
      doc.text('Answer: ', 20, yPos);
      doc.setFont('helvetica', 'bold');
      
      // Set color based on answer
      if (answer === 'Yes') {
        doc.setTextColor(34, 197, 94); // Green
      } else if (answer === 'No') {
        doc.setTextColor(239, 68, 68); // Red
      } else if (answer === 'Not Answered') {
        doc.setTextColor(156, 163, 175); // Gray
      } else {
        doc.setTextColor(0, 0, 0); // Black for text input
      }
      
      doc.text(answer, 38, yPos);
      doc.setTextColor(0, 0, 0); // Reset to black
      doc.setFont('helvetica', 'normal');
      yPos += 7;
    });
    
    // Add watermark and footer to all pages
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      addPDFWatermark(doc);
      addPDFFooter(doc, i, pageCount);
    }
    
    doc.save(`Fine-Motor-Skills-${child?.name || 'Report'}-${new Date().toISOString().split('T')[0]}.pdf`);
  };

  if (loading || !child) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  const currentSkills = selectedAge ? FINE_MOTOR_SKILLS[parseInt(selectedAge)] : [];

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
          
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Fine Motor Skills Assessment</h1>
          <p className="text-sm sm:text-base text-gray-900 font-semibold">Child: {child.name} | Age: {child.age} years</p>
        </div>

        {/* Age Selector */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Select Child's Age (months)</h2>
          <select
            value={selectedAge}
            onChange={(e) => handleAgeChange(e.target.value)}
            className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 font-semibold"
          >
            <option value="">-- Select Age --</option>
            {FINE_MOTOR_AVAILABLE_AGES.map(age => (
              <option key={age} value={age}>{age} months</option>
            ))}
          </select>
        </div>

        {/* Questions */}
        {selectedAge && currentSkills.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">
              Fine Motor Skills for {selectedAge} months
            </h2>
            <div className="space-y-4 sm:space-y-6">
              {currentSkills.map((skill, index) => (
                <div key={skill.id} className="border-b border-gray-200 pb-4 sm:pb-6 last:border-0">
                  <p className="text-sm sm:text-base text-gray-900 font-semibold mb-2 sm:mb-3">
                    {index + 1}. {skill.text}
                  </p>
                  <div className="flex gap-3 sm:gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name={skill.id}
                        value="Yes"
                        checked={answers[skill.id] === 'Yes'}
                        onChange={() => handleAnswerChange(skill.id, 'Yes')}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-sm sm:text-base text-gray-900 font-semibold">Yes</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name={skill.id}
                        value="No"
                        checked={answers[skill.id] === 'No'}
                        onChange={() => handleAnswerChange(skill.id, 'No')}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-sm sm:text-base text-gray-900 font-semibold">No</span>
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!selectedAge && (
          <div className="bg-white rounded-xl shadow-lg p-8 sm:p-12 text-center">
            <p className="text-gray-500 text-base sm:text-lg italic">
              Please select child's age to view relevant fine motor skills
            </p>
          </div>
        )}

        {/* Bottom Save Button */}
        {selectedAge && (
          <div className="flex justify-center pb-6 mt-6">
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50 text-base font-semibold shadow-lg"
            >
              <Save className="w-5 h-5" />
              {saving ? 'Saving...' : 'Save Fine Motor Skills'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
