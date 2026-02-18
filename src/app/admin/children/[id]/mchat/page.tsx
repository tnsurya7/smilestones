'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { getChildById } from '@/lib/api-client';
import { MCHAT_QUESTIONS } from '@/data/mchatQuestions';
import { ArrowLeft, Save, RotateCcw, Download } from 'lucide-react';
import jsPDF from 'jspdf';
import Toast, { ConfirmDialog } from '@/components/Toast';

export default function MCHATPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const childId = params.id as string;
  
  const [child, setChild] = useState<any>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [totalScore, setTotalScore] = useState(0);
  const [riskLevel, setRiskLevel] = useState('');
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

      // Load existing M-CHAT data
      const response = await fetch(`/api/mchat?child_id=${childId}`);
      if (response.ok) {
        const data = await response.json();
        if (data) {
          setAnswers(data.answers || {});
          calculateScore(data.answers || {});
        }
      }
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const calculateScore = (currentAnswers: Record<string, string>) => {
    let score = 0;
    Object.values(currentAnswers).forEach(answer => {
      if (answer === 'No') score++;
    });

    setTotalScore(score);

    let risk = 'Low Risk';
    if (score >= 8) risk = 'High Risk';
    else if (score >= 3) risk = 'Medium Risk';
    setRiskLevel(risk);
  };

  const handleAnswerChange = (questionId: string, answer: string) => {
    const newAnswers = { ...answers, [questionId]: answer };
    setAnswers(newAnswers);
    calculateScore(newAnswers);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const response = await fetch('/api/mchat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ child_id: childId, answers })
      });

      if (response.ok) {
        setToast({ message: 'M-CHAT saved successfully!', type: 'success' });
      } else {
        throw new Error('Failed to save');
      }
    } catch (error) {
      console.error('Error saving M-CHAT:', error);
      setToast({ message: 'Failed to save M-CHAT. Please try again.', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setShowResetConfirm(true);
  };

  const confirmReset = () => {
    setAnswers({});
    setTotalScore(0);
    setRiskLevel('');
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
    doc.text('M-CHAT Screening Report', 105, 33, { align: 'center' });
    
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
    
    // Score
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Screening Results', 14, yPos);
    yPos += 8;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Total Score: ${totalScore} / 20`, 14, yPos);
    yPos += 6;
    doc.text(`Risk Level: ${riskLevel}`, 14, yPos);
    yPos += 10;
    
    // Questions and Answers
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Responses', 14, yPos);
    yPos += 8;
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    
    MCHAT_QUESTIONS.forEach((q, index) => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
      
      const answer = answers[q.id] || 'Not Answered';
      const lines = doc.splitTextToSize(`${index + 1}. ${q.text}`, 160);
      lines.forEach((line: string) => {
        doc.text(line, 14, yPos);
        yPos += 5;
      });
      doc.text(`Answer: ${answer}`, 20, yPos);
      yPos += 7;
    });
    
    // Footer
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text('Confidential Medical Document', 14, 290);
    doc.text(`Page 1 of ${doc.getNumberOfPages()}`, 105, 290, { align: 'center' });
    
    doc.save(`MCHAT-${child?.name || 'Report'}-${new Date().toISOString().split('T')[0]}.pdf`);
  };

  if (loading || !child) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  const getRiskColor = () => {
    if (riskLevel === 'High Risk') return 'bg-red-100 text-red-800';
    if (riskLevel === 'Medium Risk') return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

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
          
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">M-CHAT Screening</h1>
          <p className="text-sm sm:text-base text-gray-900 font-semibold">Child: {child.name} | Age: {child.age} years</p>
        </div>

        {/* Score Display */}
        {totalScore > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Screening Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-blue-50 rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-gray-900 font-semibold mb-1">Total Score</p>
                <p className="text-2xl sm:text-3xl font-bold text-blue-600">{totalScore} / 20</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-gray-900 font-semibold mb-1">Risk Level</p>
                <span className={`inline-flex px-3 sm:px-4 py-1 sm:py-2 rounded-full text-base sm:text-lg font-bold ${getRiskColor()}`}>
                  {riskLevel}
                </span>
              </div>
            </div>
            <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-900 font-semibold">
              <p className="font-semibold">Scoring Guide:</p>
              <p>• 0-2: Low Risk</p>
              <p>• 3-7: Medium Risk</p>
              <p>• 8+: High Risk</p>
            </div>
          </div>
        )}

        {/* Questions */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">M-CHAT Questions</h2>
          <div className="space-y-4 sm:space-y-6">
            {MCHAT_QUESTIONS.map((question, index) => (
              <div key={question.id} className="border-b border-gray-200 pb-4 sm:pb-6 last:border-0">
                <p className="text-sm sm:text-base text-gray-900 font-semibold mb-2 sm:mb-3">
                  {index + 1}. {question.text}
                </p>
                <div className="flex gap-3 sm:gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name={question.id}
                      value="Yes"
                      checked={answers[question.id] === 'Yes'}
                      onChange={() => handleAnswerChange(question.id, 'Yes')}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="text-sm sm:text-base text-gray-900 font-semibold">Yes</span>
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
                    <span className="text-sm sm:text-base text-gray-900 font-semibold">No</span>
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
