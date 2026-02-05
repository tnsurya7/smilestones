'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getChildren } from '@/lib/localStorage';
import { 
  Save, 
  ArrowLeft, 
  ArrowRight, 
  Check,
  Printer,
  RefreshCw
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
import FunctionalSkills from './assessment-sections/FunctionalSkills';
import CognitiveMilestones from './assessment-sections/CognitiveMilestones';
import ClinicalNotes from './assessment-sections/ClinicalNotes';

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
  { id: 11, title: 'Functional & Cognitive Skills', component: FunctionalSkills },
  { id: 12, title: 'Cognitive Milestone Tracker', component: CognitiveMilestones },
  { id: 13, title: 'Final Clinical Notes', component: ClinicalNotes },
];

export default function AssessmentForm({ childId }: { childId?: string }) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<any>({});
  const [autoSaving, setAutoSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  useEffect(() => {
    // Load existing data if editing
    if (childId) {
      const saved = localStorage.getItem(`child_assessment_${childId}`);
      if (saved) {
        setFormData(JSON.parse(saved));
      }
    }
  }, [childId]);

  // Auto-save on every change
  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      setAutoSaving(true);
      const timer = setTimeout(() => {
        saveToLocalStorage();
        setAutoSaving(false);
        setLastSaved(new Date());
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [formData]);

  const saveToLocalStorage = () => {
    const id = childId || formData.childId || `temp_${Date.now()}`;
    const dataToSave = {
      ...formData,
      updatedAt: new Date().toISOString(),
      createdAt: formData.createdAt || new Date().toISOString(),
      status: currentStep === SECTIONS.length ? 'completed' : 'draft',
    };
    localStorage.setItem(`child_assessment_${id}`, JSON.stringify(dataToSave));
  };

  const handleDataChange = (sectionData: any) => {
    setFormData((prev: any) => ({ ...prev, ...sectionData }));
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

  const CurrentSectionComponent = SECTIONS[currentStep - 1].component;
  const progress = (currentStep / SECTIONS.length) * 100;

  return (
    <div className="admin-dashboard min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Auto-Save Status Banner */}
      {(autoSaving || lastSaved) && (
        <div className="fixed top-20 right-4 z-50 print:hidden">
          <div className={`px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 transition-all ${
            autoSaving 
              ? 'bg-blue-500 text-white' 
              : 'bg-green-500 text-white'
          }`}>
            {autoSaving ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span className="text-sm font-semibold">Saving...</span>
              </>
            ) : (
              <>
                <Check className="w-4 h-4" />
                <span className="text-sm font-semibold">Draft Auto-Saved</span>
              </>
            )}
          </div>
        </div>
      )}

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
                    Child Assessment Form
                  </h1>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    currentStep === SECTIONS.length
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    Status: {currentStep === SECTIONS.length ? 'Completed' : 'Draft'}
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
              onClick={() => {
                saveToLocalStorage();
                router.push('/admin/assessments');
              }}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 rounded-xl transition-all shadow-lg font-semibold"
            >
              <Check className="w-5 h-5" />
              Complete Assessment
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
