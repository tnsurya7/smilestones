'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getChildren, addAssessment, updateAssessment, getAssessments } from '@/lib/api-client';
import { 
  Save, 
  ArrowLeft, 
  ArrowRight, 
  Check,
  Printer
} from 'lucide-react';

// Import section components
import BasicDetails from './assessment-sections/BasicDetails';
import ParentFamilyDetails from './assessment-sections/ParentFamilyDetails';
import LanguageExposure from './assessment-sections/LanguageExposure';
import FamilyHomeInfo from './assessment-sections/FamilyHomeInfo';
import ParentalConcerns from './assessment-sections/ParentalConcerns';
import FamilyHistory from './assessment-sections/FamilyHistory';
import PeriNatalHistory from './assessment-sections/PeriNatalHistory';
import AfterBirthHistory from './assessment-sections/AfterBirthHistory';
import DevelopmentalHistory from './assessment-sections/DevelopmentalHistory';
import MedicalHistory from './assessment-sections/MedicalHistory';

const SECTIONS = [
  { id: 1, title: 'Basic Child Details', component: BasicDetails },
  { id: 2, title: 'Parent & Family Details', component: ParentFamilyDetails },
  { id: 3, title: 'Language Exposure', component: LanguageExposure },
  { id: 4, title: 'Family & Home Info', component: FamilyHomeInfo },
  { id: 5, title: 'Parental Concerns', component: ParentalConcerns },
  { id: 6, title: 'Family History', component: FamilyHistory },
  { id: 7, title: 'Peri-Natal History', component: PeriNatalHistory },
  { id: 8, title: 'After Birth History', component: AfterBirthHistory },
  { id: 9, title: 'Developmental History', component: DevelopmentalHistory },
  { id: 10, title: 'Medical History', component: MedicalHistory },
];

export default function AssessmentForm({ childId, assessmentId }: { childId?: string; assessmentId?: string }) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<any>({});
  const [saving, setSaving] = useState(false);
  const [children, setChildren] = useState<any[]>([]);

  useEffect(() => {
    loadChildren();
    if (assessmentId) {
      loadAssessment();
    }
    // Pre-fill child data if childId is provided
    if (childId && children.length > 0) {
      const child = children.find(c => c.id === childId);
      if (child) {
        setFormData((prev: any) => ({
          ...prev,
          childId: child.id,
          childName: child.name,
          age: child.age.toString(),
          parentName: child.parent_name,
          phoneNumber: child.phone,
          diagnosis: child.diagnosis
        }));
      }
    }
  }, [assessmentId, childId, children]);

  const loadChildren = async () => {
    try {
      const data = await getChildren();
      setChildren(data);
    } catch (error) {
      console.error('Error loading children:', error);
    }
  };

  const loadAssessment = async () => {
    try {
      if (!assessmentId) return;
      const assessments = await getAssessments();
      const assessment = assessments.find(a => a.id === assessmentId);
      if (assessment) {
        setFormData(assessment.data || {});
      }
    } catch (error) {
      console.error('Error loading assessment:', error);
    }
  };

  const handleDataChange = (sectionData: any) => {
    setFormData((prev: any) => ({ ...prev, ...sectionData }));
  };

  const handleChildSelect = (selectedChildId: string) => {
    const child = children.find(c => c.id === selectedChildId);
    if (child) {
      setFormData({
        childId: child.id,
        childName: child.name,
        age: child.age.toString(),
        parentName: child.parent_name,
        phoneNumber: child.phone,
        diagnosis: child.diagnosis
      });
    }
  };

  const handleNext = () => {
    if (currentStep < SECTIONS.length) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleClear = () => {
    if (confirm('Are you sure you want to clear all form data?')) {
      setFormData({});
      setCurrentStep(1);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleComplete = async () => {
    try {
      setSaving(true);
      
      // Validate that child is selected
      if (!formData.childId && !childId) {
        alert('Please select a child before completing the case sheet');
        setSaving(false);
        return;
      }

      const selectedChildId = childId || formData.childId;

      if (assessmentId) {
        // Update existing assessment
        await updateAssessment(assessmentId, formData, 'completed');
      } else {
        // Create new assessment
        await addAssessment({
          child_id: selectedChildId,
          data: formData,
          status: 'completed'
        });
      }

      alert('Case sheet saved successfully!');
      router.push('/admin/assessments');
    } catch (error) {
      console.error('Error saving assessment:', error);
      alert('Failed to save case sheet. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const CurrentSectionComponent = SECTIONS[currentStep - 1].component;
  const progress = (currentStep / SECTIONS.length) * 100;

  return (
    <div className="admin-dashboard min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/admin/assessments')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                    ASD Case Sheet
                  </h1>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    currentStep === SECTIONS.length
                      ? 'bg-green-100 text-green-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {currentStep === SECTIONS.length ? 'Ready to Submit' : 'In Progress'}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Step {currentStep} of {SECTIONS.length}: {SECTIONS[currentStep - 1].title}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <Printer className="w-4 h-4" />
                Print
              </button>
              <button
                onClick={handleClear}
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 hover:bg-red-200 rounded-lg transition-colors"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-200 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="relative">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-2 text-sm text-gray-600 text-center">
              {Math.round(progress)}% Complete
            </div>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Child Selector (if no childId provided) */}
        {!childId && currentStep === 1 && (
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Select Child</h3>
            <select
              value={formData.childId || ''}
              onChange={(e) => handleChildSelect(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              required
            >
              <option value="">-- Select a child --</option>
              {children.map((child) => (
                <option key={child.id} value={child.id}>
                  {child.name} - {child.age} years - {child.diagnosis}
                </option>
              ))}
            </select>
            {!formData.childId && (
              <p className="text-red-600 text-sm mt-2">Please select a child to continue</p>
            )}
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
          <CurrentSectionComponent 
            data={formData} 
            onChange={handleDataChange}
          />
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-6 print:hidden">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-colors font-semibold"
          >
            <ArrowLeft className="w-5 h-5" />
            Previous
          </button>
          
          {currentStep < SECTIONS.length ? (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 rounded-xl transition-all shadow-lg font-semibold"
            >
              Next
              <ArrowRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleComplete}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 rounded-xl transition-all shadow-lg font-semibold disabled:opacity-50"
            >
              <Check className="w-5 h-5" />
              {saving ? 'Saving...' : 'Complete Case Sheet'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
