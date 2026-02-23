'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { getChildById } from '@/lib/api-client';
import { ArrowLeft, Save, Download } from 'lucide-react';
import jsPDF from 'jspdf';
import Toast from '@/components/Toast';

// Input Components (defined outside to prevent re-rendering issues)
const TextInput = ({ label, value, onChange, type = 'text', required = false }: any) => (
  <div>
    <label className="block text-sm font-semibold text-gray-900 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
    />
  </div>
);

const TextArea = ({ label, value, onChange, rows = 3 }: any) => (
  <div>
    <label className="block text-sm font-semibold text-gray-900 mb-1">{label}</label>
    <textarea
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      rows={rows}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
    />
  </div>
);

const RadioGroup = ({ label, value, onChange, options }: any) => (
  <div>
    <label className="block text-sm font-semibold text-gray-900 mb-2">{label}</label>
    <div className="flex flex-wrap gap-3">
      {options.map((option: string) => (
        <label key={option} className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            value={option}
            checked={value === option}
            onChange={() => onChange(option)}
            className="w-4 h-4 text-blue-600"
          />
          <span className="text-gray-900 font-semibold text-sm">{option}</span>
        </label>
      ))}
    </div>
  </div>
);

const CheckboxGroup = ({ label, values, onChange, options }: any) => {
  const handleToggle = (option: string) => {
    const newValues = values.includes(option)
      ? values.filter((v: string) => v !== option)
      : [...values, option];
    onChange(newValues);
  };

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-900 mb-2">{label}</label>
      <div className="flex flex-wrap gap-3">
        {options.map((option: string) => (
          <label key={option} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={values.includes(option)}
              onChange={() => handleToggle(option)}
              className="w-4 h-4 text-blue-600 rounded"
            />
            <span className="text-gray-900 font-semibold text-sm">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

interface CaseSheetData {
  // Section 1: Child Identification
  childFullName: string;
  dob: string;
  age: string;
  gender: string;
  birthOrder: string;
  uhid: string;
  dateOfAssessment: string;
  referredBy: string;
  locality: string; // Urban / Rural
  familyType: string; // Nuclear / Joint
  address: string;
  informantName: string;
  relationshipToChild: string;
  contactNumber: string;
  
  // Section 2: Parent Details
  fatherName: string;
  fatherAge: string;
  fatherEducation: string;
  fatherOccupation: string;
  fatherContactNumber: string;
  fatherTimeSpends: string;
  motherName: string;
  motherAge: string;
  motherEducation: string;
  motherOccupation: string;
  motherContactNumber: string;
  motherTimeSpends: string;
  
  // Section 2B: Family History
  familySpeechDelayHistory: string;
  intellectualDisabilityInFamily: string;
  developmentalDelayInFamily: string;
  autismInFamily: string;
  siblingDetails: string;
  siblingMilestonesAppropriate: string; // Yes/No
  fatherAgeAtDelivery: string;
  motherAgeAtDelivery: string;
  consanguinity: string;
  whoIdentifiedFirst: string;
  whoSuggestedTherapy: string;
  parentalConcerns: string[]; // Speech delay, Hyperactivity, Behavior problem, Eye contact, Not responding to name
  residenceType: string;
  substanceUse: string;
  sleepPattern: string;
  screenTimeHours: string;
  
  // Section 3: Chief Complaints
  chiefComplaints: string;
  ageWhenNoticed: string;
  durationOfProblem: string;
  
  // Section 4: Perinatal History
  conceptionType: string;
  antenatalComplications: string[]; // Thyroid, Diabetic, Hypertension, Seizure, Stress, Trauma, Bleeding issues
  termType: string;
  weeksOfGestation: string;
  pregnancyComplications: string;
  deliveryType: string;
  assistanceRequiredAtBirth: string;
  apgarScore: string;
  birthHistory: string;
  birthWeight: string;
  
  // Section 4B: After Birth History
  criedImmediately: string;
  nicuAdmission: string;
  jaundice: string; // Yes/No
  phototherapy: string;
  phototherapyDays: string;
  etTube: string;
  etTubeDays: string;
  seizuresAtBirth: string; // Yes/No
  febrileSeizure: string; // Yes/No
  floppinessOrStiffness: string; // Yes/No
  developmentCourse: string;
  
  // Section 5: Developmental History
  milestonesDelay: string;
  speechDelay: string;
  motorDelay: string;
  regressionOfSkills: string;
  socialSmileAge: string;
  strangerAnxietyAge: string;
  responseToName: string;
  nameCallResponseMonths: string;
  nameCallAdequacy: string; // adequate / inadequate / absent
  reducedNameCallFrequency: string;
  languageMilestoneDelay: string;
  
  // Section 5B: Functional/Cognitive Assessment
  understandsHouseholdObjects: string;
  operatesMobilePhone: string;
  labelsObjects: string;
  identifiesFamilyMembers: string;
  identifiesSelfInMirror: string;
  understandsSimpleCommands: string;
  understandsDoubleCommands: string;
  understands3StepCommands: string;
  
  // Section 6: Medical History
  seizures: string;
  seizureMedication: string;
  hearingProblems: string;
  visionProblems: string;
  currentMedication: string;
  
  // Section 7: Behavioral Observations
  eyeContact: string;
  socialInteraction: string;
  repetitiveBehaviors: string;
  sensoryIssues: string;
  attentionSpan: string;
  
  // Section 8: Assessment & Recommendations
  provisionalDiagnosis: string;
  recommendedTherapies: string[];
  frequencyPerWeek: string;
  doctorSignatureName: string;
}

export default function CaseSheetPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const childId = params.id as string;
  
  const [child, setChild] = useState<any>(null);
  const [formData, setFormData] = useState<CaseSheetData>({
    // Section 1
    childFullName: '', dob: '', age: '', gender: '', birthOrder: '', uhid: '', dateOfAssessment: '',
    referredBy: '', locality: '', familyType: '', address: '', informantName: '', relationshipToChild: '', contactNumber: '',
    // Section 2
    fatherName: '', fatherAge: '', fatherEducation: '', fatherOccupation: '', fatherContactNumber: '', fatherTimeSpends: '',
    motherName: '', motherAge: '', motherEducation: '', motherOccupation: '', motherContactNumber: '', motherTimeSpends: '',
    // Section 2B: Family History
    familySpeechDelayHistory: '', intellectualDisabilityInFamily: '', developmentalDelayInFamily: '',
    autismInFamily: '', siblingDetails: '', siblingMilestonesAppropriate: '', fatherAgeAtDelivery: '', motherAgeAtDelivery: '',
    consanguinity: '', whoIdentifiedFirst: '', whoSuggestedTherapy: '', parentalConcerns: [], residenceType: '',
    substanceUse: '', sleepPattern: '', screenTimeHours: '',
    // Section 3
    chiefComplaints: '', ageWhenNoticed: '', durationOfProblem: '',
    // Section 4: Perinatal
    conceptionType: '', antenatalComplications: [], termType: '', weeksOfGestation: '', pregnancyComplications: '',
    deliveryType: '', assistanceRequiredAtBirth: '', apgarScore: '', birthHistory: '', birthWeight: '',
    // Section 4B: After Birth
    criedImmediately: '', nicuAdmission: '', jaundice: '', phototherapy: '', phototherapyDays: '', 
    etTube: '', etTubeDays: '', seizuresAtBirth: '', febrileSeizure: '', floppinessOrStiffness: '', developmentCourse: '',
    // Section 5: Developmental
    milestonesDelay: '', speechDelay: '', motorDelay: '', regressionOfSkills: '',
    socialSmileAge: '', strangerAnxietyAge: '', responseToName: '', nameCallResponseMonths: '', nameCallAdequacy: '',
    reducedNameCallFrequency: '', languageMilestoneDelay: '',
    // Section 5B: Functional/Cognitive
    understandsHouseholdObjects: '', operatesMobilePhone: '', labelsObjects: '',
    identifiesFamilyMembers: '', identifiesSelfInMirror: '', understandsSimpleCommands: '',
    understandsDoubleCommands: '', understands3StepCommands: '',
    // Section 6: Medical
    seizures: '', seizureMedication: '', hearingProblems: '', visionProblems: '', currentMedication: '',
    // Section 7: Behavioral
    eyeContact: '', socialInteraction: '', repetitiveBehaviors: '', sensoryIssues: '', attentionSpan: '',
    // Section 8: Assessment
    provisionalDiagnosis: '', recommendedTherapies: [], frequencyPerWeek: '', doctorSignatureName: ''
  });
  
  const [autoSection, setAutoSection] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' | 'warning' } | null>(null);

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

      // Load existing case sheet
      const caseResponse = await fetch(`/api/case-sheets?child_id=${childId}`);
      if (caseResponse.ok) {
        const caseData = await caseResponse.json();
        if (caseData && caseData.data) {
          setFormData({ ...formData, ...caseData.data, uhid: caseData.uhid });
        } else if (caseData && caseData.uhid) {
          setFormData({ ...formData, uhid: caseData.uhid });
        }
      }

      // Load M-CHAT data
      const mchatResponse = await fetch(`/api/mchat?child_id=${childId}`);
      let mchatData = null;
      if (mchatResponse.ok) {
        mchatData = await mchatResponse.json();
      }

      // Load DSM data
      const dsmResponse = await fetch(`/api/dsm?child_id=${childId}`);
      let dsmData = null;
      if (dsmResponse.ok) {
        dsmData = await dsmResponse.json();
      }

      setAutoSection({ mchat: mchatData, dsm: dsmData });
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const handleInputChange = (field: keyof CaseSheetData, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleTherapyChange = (therapy: string) => {
    const current = formData.recommendedTherapies;
    if (current.includes(therapy)) {
      setFormData({ ...formData, recommendedTherapies: current.filter(t => t !== therapy) });
    } else {
      setFormData({ ...formData, recommendedTherapies: [...current, therapy] });
    }
  };

  const calculateAge = (dob: string) => {
    if (!dob) return '';
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age.toString();
  };

  const handleDOBChange = (dob: string) => {
    setFormData({ ...formData, dob, age: calculateAge(dob) });
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const response = await fetch('/api/case-sheets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ child_id: childId, data: formData })
      });

      if (response.ok) {
        const result = await response.json();
        if (result.uhid && !formData.uhid) {
          setFormData({ ...formData, uhid: result.uhid });
        }
        setToast({ message: 'Case Sheet saved successfully!', type: 'success' });
      } else {
        throw new Error('Failed to save');
      }
    } catch (error) {
      console.error('Error saving case sheet:', error);
      setToast({ message: 'Failed to save Case Sheet. Please try again.', type: 'error' });
    } finally {
      setSaving(false);
    }
  };


  const handleDownloadCaseSheetPDF = () => {
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
    doc.text('Clinical Case Sheet', 105, 33, { align: 'center' });
    
    doc.setTextColor(0, 0, 0);
    let yPos = 50;
    
    // Section 1: Child Identification
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Section 1: Child Identification Details', 14, yPos);
    yPos += 8;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const section1 = [
      ['Child Full Name:', formData.childFullName || 'N/A'],
      ['Date of Birth:', formData.dob || 'N/A'],
      ['Age:', formData.age ? `${formData.age} years` : 'N/A'],
      ['Gender:', formData.gender || 'N/A'],
      ['UHID:', formData.uhid || 'N/A'],
      ['Date of Assessment:', formData.dateOfAssessment || 'N/A'],
      ['Referred By:', formData.referredBy || 'N/A'],
      ['Informant Name:', formData.informantName || 'N/A'],
      ['Relationship to Child:', formData.relationshipToChild || 'N/A'],
      ['Contact Number:', formData.contactNumber || 'N/A']
    ];
    
    section1.forEach(([label, value]) => {
      if (yPos > 275) { doc.addPage(); yPos = 20; }
      doc.setFont('helvetica', 'bold');
      doc.text(label, 14, yPos);
      doc.setFont('helvetica', 'normal');
      doc.text(value, 70, yPos);
      yPos += 6;
    });
    yPos += 5;
    
    // Section 2: Parent Details
    if (yPos > 250) { doc.addPage(); yPos = 20; }
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Section 2: Parent Details', 14, yPos);
    yPos += 8;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('Father:', 14, yPos);
    yPos += 6;
    doc.setFont('helvetica', 'normal');
    doc.text(`Name: ${formData.fatherName || 'N/A'}`, 20, yPos);
    yPos += 5;
    doc.text(`Age: ${formData.fatherAge || 'N/A'}`, 20, yPos);
    yPos += 5;
    doc.text(`Education: ${formData.fatherEducation || 'N/A'}`, 20, yPos);
    yPos += 5;
    doc.text(`Occupation: ${formData.fatherOccupation || 'N/A'}`, 20, yPos);
    yPos += 8;
    
    doc.setFont('helvetica', 'bold');
    doc.text('Mother:', 14, yPos);
    yPos += 6;
    doc.setFont('helvetica', 'normal');
    doc.text(`Name: ${formData.motherName || 'N/A'}`, 20, yPos);
    yPos += 5;
    doc.text(`Age: ${formData.motherAge || 'N/A'}`, 20, yPos);
    yPos += 5;
    doc.text(`Education: ${formData.motherEducation || 'N/A'}`, 20, yPos);
    yPos += 5;
    doc.text(`Occupation: ${formData.motherOccupation || 'N/A'}`, 20, yPos);
    yPos += 8;
    
    // Section 3: Chief Complaints
    if (yPos > 240) { doc.addPage(); yPos = 20; }
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Section 3: Chief Complaints', 14, yPos);
    yPos += 8;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const complaints = doc.splitTextToSize(`Parent's main concerns: ${formData.chiefComplaints || 'N/A'}`, 180);
    complaints.forEach((line: string) => {
      if (yPos > 280) { doc.addPage(); yPos = 20; }
      doc.text(line, 14, yPos);
      yPos += 5;
    });
    yPos += 2;
    doc.text(`Age when noticed: ${formData.ageWhenNoticed || 'N/A'} years`, 14, yPos);
    yPos += 5;
    doc.text(`Duration of problem: ${formData.durationOfProblem || 'N/A'}`, 14, yPos);
    yPos += 8;
    
    // Section 4: Developmental History
    if (yPos > 220) { doc.addPage(); yPos = 20; }
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Section 4: Developmental History', 14, yPos);
    yPos += 8;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const pregComp = doc.splitTextToSize(`Pregnancy complications: ${formData.pregnancyComplications || 'N/A'}`, 180);
    pregComp.forEach((line: string) => {
      if (yPos > 280) { doc.addPage(); yPos = 20; }
      doc.text(line, 14, yPos);
      yPos += 5;
    });
    yPos += 2;
    
    const birthHist = doc.splitTextToSize(`Birth history: ${formData.birthHistory || 'N/A'}`, 180);
    birthHist.forEach((line: string) => {
      if (yPos > 280) { doc.addPage(); yPos = 20; }
      doc.text(line, 14, yPos);
      yPos += 5;
    });
    yPos += 2;
    
    doc.text(`NICU admission: ${formData.nicuAdmission || 'N/A'}`, 14, yPos);
    yPos += 5;
    doc.text(`Birth weight: ${formData.birthWeight || 'N/A'} kg`, 14, yPos);
    yPos += 5;
    doc.text(`Milestones delay noticed: ${formData.milestonesDelay || 'N/A'}`, 14, yPos);
    yPos += 5;
    doc.text(`Speech delay: ${formData.speechDelay || 'N/A'}`, 14, yPos);
    yPos += 5;
    doc.text(`Motor delay: ${formData.motorDelay || 'N/A'}`, 14, yPos);
    yPos += 5;
    doc.text(`Regression of skills: ${formData.regressionOfSkills || 'N/A'}`, 14, yPos);
    yPos += 8;
    
    // Section 5: Medical History
    if (yPos > 250) { doc.addPage(); yPos = 20; }
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Section 5: Medical History', 14, yPos);
    yPos += 8;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Seizures: ${formData.seizures || 'N/A'}`, 14, yPos);
    yPos += 5;
    doc.text(`Hearing problems: ${formData.hearingProblems || 'N/A'}`, 14, yPos);
    yPos += 5;
    doc.text(`Vision problems: ${formData.visionProblems || 'N/A'}`, 14, yPos);
    yPos += 5;
    const medText = doc.splitTextToSize(`Current medication: ${formData.currentMedication || 'N/A'}`, 180);
    medText.forEach((line: string) => {
      if (yPos > 280) { doc.addPage(); yPos = 20; }
      doc.text(line, 14, yPos);
      yPos += 5;
    });
    yPos += 5;
    
    // Section 6: Behavioural Observation
    if (yPos > 250) { doc.addPage(); yPos = 20; }
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Section 6: Behavioural Observation', 14, yPos);
    yPos += 8;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Eye contact: ${formData.eyeContact || 'N/A'}`, 14, yPos);
    yPos += 5;
    doc.text(`Social interaction: ${formData.socialInteraction || 'N/A'}`, 14, yPos);
    yPos += 5;
    doc.text(`Repetitive behaviors: ${formData.repetitiveBehaviors || 'N/A'}`, 14, yPos);
    yPos += 5;
    doc.text(`Sensory issues: ${formData.sensoryIssues || 'N/A'}`, 14, yPos);
    yPos += 5;
    doc.text(`Attention span: ${formData.attentionSpan || 'N/A'}`, 14, yPos);
    yPos += 8;
    
    // Section 7: Auto-filled
    if (yPos > 200) { doc.addPage(); yPos = 20; }
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Section 7: Screening Results (Auto-filled)', 14, yPos);
    yPos += 8;
    
    doc.setFontSize(10);
    if (autoSection?.mchat) {
      doc.setFont('helvetica', 'bold');
      doc.text('M-CHAT Screening:', 14, yPos);
      yPos += 6;
      doc.setFont('helvetica', 'normal');
      doc.text(`Total Score: ${autoSection.mchat.total_score} / 20`, 20, yPos);
      yPos += 5;
      doc.text(`Risk Level: ${autoSection.mchat.risk_level}`, 20, yPos);
      yPos += 8;
    } else {
      doc.setFont('helvetica', 'italic');
      doc.text('M-CHAT: Not completed', 14, yPos);
      yPos += 8;
    }
    
    if (autoSection?.dsm) {
      doc.setFont('helvetica', 'bold');
      doc.text('DSM Checklist:', 14, yPos);
      yPos += 6;
      doc.setFont('helvetica', 'normal');
      doc.text(`A Criteria: ${autoSection.dsm.a_criteria_count} / 3 groups`, 20, yPos);
      yPos += 5;
      doc.text(`B Criteria: ${autoSection.dsm.b_criteria_count} / 4 groups`, 20, yPos);
      yPos += 5;
      doc.text(`C (Early Onset): ${autoSection.dsm.c_criteria ? 'Yes' : 'No'}`, 20, yPos);
      yPos += 5;
      doc.text(`D (Clinical Impairment): ${autoSection.dsm.d_criteria ? 'Yes' : 'No'}`, 20, yPos);
      yPos += 5;
      doc.text(`Final: ${autoSection.dsm.interpretation}`, 20, yPos);
      yPos += 8;
    } else {
      doc.setFont('helvetica', 'italic');
      doc.text('DSM Checklist: Not completed', 14, yPos);
      yPos += 8;
    }
    
    // Section 8: Final Clinical Impression
    if (yPos > 200) { doc.addPage(); yPos = 20; }
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Section 8: Final Clinical Impression', 14, yPos);
    yPos += 8;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const diagText = doc.splitTextToSize(`Provisional Diagnosis: ${formData.provisionalDiagnosis || 'N/A'}`, 180);
    diagText.forEach((line: string) => {
      if (yPos > 280) { doc.addPage(); yPos = 20; }
      doc.text(line, 14, yPos);
      yPos += 5;
    });
    yPos += 3;
    
    doc.setFont('helvetica', 'bold');
    doc.text('Recommended Therapies:', 14, yPos);
    yPos += 6;
    doc.setFont('helvetica', 'normal');
    if (formData.recommendedTherapies && formData.recommendedTherapies.length > 0) {
      formData.recommendedTherapies.forEach((therapy: string) => {
        if (yPos > 280) { doc.addPage(); yPos = 20; }
        doc.text(`• ${therapy}`, 20, yPos);
        yPos += 5;
      });
    } else {
      doc.text('None selected', 20, yPos);
      yPos += 5;
    }
    yPos += 3;
    
    doc.text(`Frequency per week: ${formData.frequencyPerWeek || 'N/A'} sessions`, 14, yPos);
    yPos += 5;
    doc.text(`Doctor Signature: ${formData.doctorSignatureName || 'N/A'}`, 14, yPos);
    
    // Footer
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(128, 128, 128);
      doc.text('Confidential Medical Document', 14, 290);
      doc.text(`Page ${i} of ${pageCount}`, 105, 290, { align: 'center' });
      doc.text(`Generated: ${new Date().toLocaleDateString()}`, 160, 290);
    }
    
    doc.save(`Case-Sheet-${child?.name || 'Report'}-${new Date().toISOString().split('T')[0]}.pdf`);
  };

  const handleDownloadFullClinicalPDF = async () => {
    try {
      // Fetch all data
      const mchatResponse = await fetch(`/api/mchat?child_id=${childId}`);
      const mchatData = mchatResponse.ok ? await mchatResponse.json() : null;
      
      const dsmResponse = await fetch(`/api/dsm?child_id=${childId}`);
      const dsmData = dsmResponse.ok ? await dsmResponse.json() : null;
      
      const doc = new jsPDF();
      let yPos = 50;
      
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
      doc.text('Complete Clinical Report', 105, 33, { align: 'center' });
      
      doc.setTextColor(0, 0, 0);
      
      // ===== M-CHAT SECTION =====
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text('M-CHAT Screening Results', 14, yPos);
      yPos += 10;
      
      if (mchatData) {
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text(`Total Score: ${mchatData.total_score} / 20`, 14, yPos);
        yPos += 6;
        doc.text(`Risk Level: ${mchatData.risk_level}`, 14, yPos);
        yPos += 10;
        
        // M-CHAT Questions
        const mchatQuestions = [
          'If you point at something across the room, does your child look at it?',
          'Have you ever wondered if your child might be deaf?',
          'Does your child play pretend or make-believe?',
          'Does your child like climbing on things?',
          'Does your child make unusual finger movements near their eyes?',
          'Does your child point with one finger to ask for something or get help?',
          'Does your child point with one finger to show you something interesting?',
          'Is your child interested in other children?',
          'Does your child show you things by bringing them to you or holding them up?',
          'Does your child respond when you call their name?',
          'When you smile at your child, does they smile back at you?',
          'Does your child get upset by everyday noises?',
          'Does your child walk?',
          'Does your child look you in the eye when you are talking or playing?',
          'Does your child try to copy what you do?',
          'If you turn your head to look at something, does your child look around to see what you are looking at?',
          'Does your child try to get you to watch them?',
          'Does your child understand when you tell them to do something?',
          'If something new happens, does your child look at your face to see how you feel about it?',
          'Does your child like movement activities?'
        ];
        
        doc.setFont('helvetica', 'bold');
        doc.text('Responses:', 14, yPos);
        yPos += 6;
        doc.setFont('helvetica', 'normal');
        
        mchatQuestions.forEach((q, idx) => {
          if (yPos > 270) { doc.addPage(); yPos = 20; }
          const answer = mchatData.answers?.[`q${idx + 1}`] || 'Not answered';
          const lines = doc.splitTextToSize(`${idx + 1}. ${q}`, 170);
          lines.forEach((line: string) => {
            if (yPos > 280) { doc.addPage(); yPos = 20; }
            doc.text(line, 14, yPos);
            yPos += 5;
          });
          doc.setFont('helvetica', 'bold');
          doc.text(`Answer: ${answer}`, 20, yPos);
          doc.setFont('helvetica', 'normal');
          yPos += 7;
        });
      } else {
        doc.setFontSize(10);
        doc.setFont('helvetica', 'italic');
        doc.text('M-CHAT screening not completed', 14, yPos);
        yPos += 10;
      }
      
      // ===== DSM SECTION =====
      if (yPos > 240) { doc.addPage(); yPos = 20; }
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text('DSM-5 Checklist Results', 14, yPos);
      yPos += 10;
      
      if (dsmData) {
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text(`A Criteria: ${dsmData.a_criteria_count} / 3 groups`, 14, yPos);
        yPos += 6;
        doc.text(`B Criteria: ${dsmData.b_criteria_count} / 4 groups`, 14, yPos);
        yPos += 6;
        doc.text(`C (Early Onset): ${dsmData.c_criteria ? 'Yes' : 'No'}`, 14, yPos);
        yPos += 6;
        doc.text(`D (Clinical Impairment): ${dsmData.d_criteria ? 'Yes' : 'No'}`, 14, yPos);
        yPos += 6;
        doc.text(`Final: ${dsmData.interpretation}`, 14, yPos);
        yPos += 10;
        
        // DSM Criteria Details
        const dsmCriteria = [
          { group: 'A1', label: 'Social-Emotional Reciprocity', questions: [
            'Abnormal social approach',
            'Failure of normal back-and-forth conversation',
            'Reduced sharing of interests/emotions',
            'Failure to initiate or respond to social interactions'
          ]},
          { group: 'A2', label: 'Nonverbal Communication', questions: [
            'Poorly integrated verbal and nonverbal communication',
            'Abnormalities in eye contact and body language',
            'Deficits in understanding and use of gestures',
            'Total lack of facial expressions and nonverbal communication'
          ]},
          { group: 'A3', label: 'Relationships', questions: [
            'Difficulties adjusting behavior to suit various social contexts',
            'Difficulties in sharing imaginative play',
            'Absence of interest in peers'
          ]},
          { group: 'B1', label: 'Stereotyped/Repetitive Motor Movements', questions: [
            'Stereotyped or repetitive motor movements',
            'Use of objects',
            'Speech (e.g., echolalia, idiosyncratic phrases)'
          ]},
          { group: 'B2', label: 'Insistence on Sameness', questions: [
            'Insistence on sameness',
            'Inflexible adherence to routines',
            'Ritualized patterns of verbal or nonverbal behavior',
            'Extreme distress at small changes'
          ]},
          { group: 'B3', label: 'Restricted Interests', questions: [
            'Highly restricted, fixated interests',
            'Abnormal in intensity or focus',
            'Strong attachment to unusual objects',
            'Excessively circumscribed or perseverative interests'
          ]},
          { group: 'B4', label: 'Sensory Issues', questions: [
            'Hyper- or hyporeactivity to sensory input',
            'Unusual interest in sensory aspects of environment',
            'Excessive smelling or touching of objects',
            'Visual fascination with lights or movement'
          ]}
        ];
        
        doc.setFont('helvetica', 'bold');
        doc.text('Detailed Responses:', 14, yPos);
        yPos += 8;
        
        dsmCriteria.forEach((criteria) => {
          if (yPos > 260) { doc.addPage(); yPos = 20; }
          doc.setFont('helvetica', 'bold');
          doc.text(`${criteria.group}: ${criteria.label}`, 14, yPos);
          yPos += 6;
          doc.setFont('helvetica', 'normal');
          
          criteria.questions.forEach((q, idx) => {
            if (yPos > 275) { doc.addPage(); yPos = 20; }
            const key = `${criteria.group.toLowerCase()}_${idx + 1}`;
            const answer = dsmData.answers?.[key] || 'Not answered';
            const lines = doc.splitTextToSize(`• ${q}`, 165);
            lines.forEach((line: string) => {
              if (yPos > 280) { doc.addPage(); yPos = 20; }
              doc.text(line, 18, yPos);
              yPos += 5;
            });
            doc.setFont('helvetica', 'bold');
            doc.text(`Answer: ${answer}`, 22, yPos);
            doc.setFont('helvetica', 'normal');
            yPos += 6;
          });
          yPos += 3;
        });
      } else {
        doc.setFontSize(10);
        doc.setFont('helvetica', 'italic');
        doc.text('DSM checklist not completed', 14, yPos);
        yPos += 10;
      }
      
      // ===== CASE SHEET SECTION =====
      if (yPos > 200) { doc.addPage(); yPos = 20; }
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text('Clinical Case Sheet', 14, yPos);
      yPos += 10;
      
      // Section 1: Child Identification
      doc.setFontSize(12);
      doc.text('Child Identification', 14, yPos);
      yPos += 8;
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      const section1 = [
        ['Child Full Name:', formData.childFullName || 'N/A'],
        ['Date of Birth:', formData.dob || 'N/A'],
        ['Age:', formData.age ? `${formData.age} years` : 'N/A'],
        ['Gender:', formData.gender || 'N/A'],
        ['UHID:', formData.uhid || 'N/A'],
        ['Date of Assessment:', formData.dateOfAssessment || 'N/A']
      ];
      
      section1.forEach(([label, value]) => {
        if (yPos > 275) { doc.addPage(); yPos = 20; }
        doc.setFont('helvetica', 'bold');
        doc.text(label, 14, yPos);
        doc.setFont('helvetica', 'normal');
        doc.text(value, 70, yPos);
        yPos += 6;
      });
      yPos += 5;
      
      // Section 8: Final Clinical Impression
      if (yPos > 240) { doc.addPage(); yPos = 20; }
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('Final Clinical Impression', 14, yPos);
      yPos += 8;
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      const diagText = doc.splitTextToSize(`Provisional Diagnosis: ${formData.provisionalDiagnosis || 'N/A'}`, 180);
      diagText.forEach((line: string) => {
        if (yPos > 280) { doc.addPage(); yPos = 20; }
        doc.text(line, 14, yPos);
        yPos += 5;
      });
      yPos += 3;
      
      doc.setFont('helvetica', 'bold');
      doc.text('Recommended Therapies:', 14, yPos);
      yPos += 6;
      doc.setFont('helvetica', 'normal');
      if (formData.recommendedTherapies && formData.recommendedTherapies.length > 0) {
        formData.recommendedTherapies.forEach((therapy: string) => {
          if (yPos > 280) { doc.addPage(); yPos = 20; }
          doc.text(`• ${therapy}`, 20, yPos);
          yPos += 5;
        });
      } else {
        doc.text('None selected', 20, yPos);
        yPos += 5;
      }
      yPos += 3;
      
      doc.text(`Frequency per week: ${formData.frequencyPerWeek || 'N/A'} sessions`, 14, yPos);
      yPos += 5;
      doc.text(`Doctor Signature: ${formData.doctorSignatureName || 'N/A'}`, 14, yPos);
      
      // Footer
      const pageCount = doc.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(128, 128, 128);
        doc.text('Confidential Medical Document', 14, 290);
        doc.text(`Page ${i} of ${pageCount}`, 105, 290, { align: 'center' });
        doc.text(`Generated: ${new Date().toLocaleDateString()}`, 160, 290);
      }
      
      doc.save(`Full-Clinical-Report-${child?.name || 'Report'}-${new Date().toISOString().split('T')[0]}.pdf`);
      setToast({ message: 'Full Clinical Report downloaded successfully!', type: 'success' });
    } catch (error) {
      console.error('Error generating Full Clinical PDF:', error);
      setToast({ message: 'Failed to generate Full Clinical Report. Please try again.', type: 'error' });
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
                onClick={handleDownloadCaseSheetPDF}
                className="flex-1 sm:flex-none px-2 sm:px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm"
              >
                <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Case Sheet</span>
                <span className="sm:hidden">Case</span>
              </button>
              <button
                onClick={handleDownloadFullClinicalPDF}
                className="flex-1 sm:flex-none px-2 sm:px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm"
              >
                <Download className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Full Clinical</span>
                <span className="sm:hidden">Full</span>
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 text-xs sm:text-sm"
              >
                <Save className="w-3 h-3 sm:w-4 sm:h-4" />
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
          
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Clinical Case Sheet</h1>
          <p className="text-sm sm:text-base text-gray-900 font-semibold">Child: {child.name} | Age: {child.age} years</p>
        </div>


        {/* Section 1: Child Identification */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Section 1: Child Identification Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextInput label="Child Full Name" value={formData.childFullName} onChange={(v: string) => handleInputChange('childFullName', v)} required />
            <TextInput label="Date of Birth" value={formData.dob} onChange={handleDOBChange} type="date" required />
            <TextInput label="Age (years)" value={formData.age} onChange={(v: string) => handleInputChange('age', v)} type="number" />
            <RadioGroup label="Gender" value={formData.gender} onChange={(v: string) => handleInputChange('gender', v)} options={['Male', 'Female', 'Other']} />
            <TextInput label="Birth Order" value={formData.birthOrder} onChange={(v: string) => handleInputChange('birthOrder', v)} />
            <TextInput label="UHID / Unique Child ID" value={formData.uhid} onChange={(v: string) => handleInputChange('uhid', v)} />
            <TextInput label="Date of Assessment" value={formData.dateOfAssessment} onChange={(v: string) => handleInputChange('dateOfAssessment', v)} type="date" />
            <TextInput label="Referred By" value={formData.referredBy} onChange={(v: string) => handleInputChange('referredBy', v)} />
            <RadioGroup label="Locality" value={formData.locality} onChange={(v: string) => handleInputChange('locality', v)} options={['Urban', 'Rural']} />
            <RadioGroup label="Family Type" value={formData.familyType} onChange={(v: string) => handleInputChange('familyType', v)} options={['Nuclear', 'Joint']} />
            <TextInput label="Informant Name" value={formData.informantName} onChange={(v: string) => handleInputChange('informantName', v)} />
            <TextInput label="Relationship to Child" value={formData.relationshipToChild} onChange={(v: string) => handleInputChange('relationshipToChild', v)} />
            <TextInput label="Contact Number" value={formData.contactNumber} onChange={(v: string) => handleInputChange('contactNumber', v)} type="tel" />
          </div>
          <div className="mt-4">
            <TextArea label="Address" value={formData.address} onChange={(v: string) => handleInputChange('address', v)} rows={2} />
          </div>
        </div>

        {/* Section 2: Parent Details */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Section 2: Parent Details</h2>
          <div className="mb-4">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Father</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextInput label="Name" value={formData.fatherName} onChange={(v: string) => handleInputChange('fatherName', v)} />
              <TextInput label="Age" value={formData.fatherAge} onChange={(v: string) => handleInputChange('fatherAge', v)} type="number" />
              <TextInput label="Time Spends with Child" value={formData.fatherTimeSpends} onChange={(v: string) => handleInputChange('fatherTimeSpends', v)} />
              <RadioGroup label="Education" value={formData.fatherEducation} onChange={(v: string) => handleInputChange('fatherEducation', v)} options={['Higher', 'Hr. Sec', 'UG', 'PG']} />
              <TextInput label="Occupation" value={formData.fatherOccupation} onChange={(v: string) => handleInputChange('fatherOccupation', v)} />
              <TextInput label="Contact Number" value={formData.fatherContactNumber} onChange={(v: string) => handleInputChange('fatherContactNumber', v)} type="tel" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">Mother</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextInput label="Name" value={formData.motherName} onChange={(v: string) => handleInputChange('motherName', v)} />
              <TextInput label="Age" value={formData.motherAge} onChange={(v: string) => handleInputChange('motherAge', v)} type="number" />
              <TextInput label="Time Spends with Child" value={formData.motherTimeSpends} onChange={(v: string) => handleInputChange('motherTimeSpends', v)} />
              <RadioGroup label="Education" value={formData.motherEducation} onChange={(v: string) => handleInputChange('motherEducation', v)} options={['Higher', 'Hr. Sec', 'UG', 'PG']} />
              <TextInput label="Occupation" value={formData.motherOccupation} onChange={(v: string) => handleInputChange('motherOccupation', v)} />
              <TextInput label="Contact Number" value={formData.motherContactNumber} onChange={(v: string) => handleInputChange('motherContactNumber', v)} type="tel" />
            </div>
          </div>
        </div>

        {/* Section 2B: Family History */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Section 2B: Family History</h2>
          <div className="space-y-4">
            <CheckboxGroup 
              label="Parental Concerns" 
              values={formData.parentalConcerns} 
              onChange={(v: string[]) => handleInputChange('parentalConcerns', v)} 
              options={['Speech delay', 'Hyperactivity', 'Behavior problem', 'Eye contact', 'Not responding to name']} 
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <RadioGroup label="Family speech delay history" value={formData.familySpeechDelayHistory} onChange={(v: string) => handleInputChange('familySpeechDelayHistory', v)} options={['Yes', 'No']} />
              <RadioGroup label="Intellectual disability in family" value={formData.intellectualDisabilityInFamily} onChange={(v: string) => handleInputChange('intellectualDisabilityInFamily', v)} options={['Yes', 'No']} />
              <RadioGroup label="Developmental delay in family" value={formData.developmentalDelayInFamily} onChange={(v: string) => handleInputChange('developmentalDelayInFamily', v)} options={['Yes', 'No']} />
              <RadioGroup label="Autism in family" value={formData.autismInFamily} onChange={(v: string) => handleInputChange('autismInFamily', v)} options={['Yes', 'No']} />
              <RadioGroup label="Sibling details" value={formData.siblingDetails} onChange={(v: string) => handleInputChange('siblingDetails', v)} options={['Nil', 'Elder', 'Younger']} />
              <RadioGroup label="Sibling attained milestones appropriately" value={formData.siblingMilestonesAppropriate} onChange={(v: string) => handleInputChange('siblingMilestonesAppropriate', v)} options={['Yes', 'No']} />
              <TextInput label="Father age at delivery" value={formData.fatherAgeAtDelivery} onChange={(v: string) => handleInputChange('fatherAgeAtDelivery', v)} type="number" />
              <TextInput label="Mother age at delivery" value={formData.motherAgeAtDelivery} onChange={(v: string) => handleInputChange('motherAgeAtDelivery', v)} type="number" />
              <RadioGroup label="Consanguinity" value={formData.consanguinity} onChange={(v: string) => handleInputChange('consanguinity', v)} options={['Yes', 'No']} />
              <RadioGroup label="Who identified first" value={formData.whoIdentifiedFirst} onChange={(v: string) => handleInputChange('whoIdentifiedFirst', v)} options={['Mother', 'Father', 'Grandparent', 'Pediatrician', 'Teacher']} />
              <TextInput label="Who suggested therapy" value={formData.whoSuggestedTherapy} onChange={(v: string) => handleInputChange('whoSuggestedTherapy', v)} />
              <RadioGroup label="Residence type" value={formData.residenceType} onChange={(v: string) => handleInputChange('residenceType', v)} options={['Individual', 'Apartment']} />
              <TextInput label="Substance use / drugs" value={formData.substanceUse} onChange={(v: string) => handleInputChange('substanceUse', v)} />
              <TextInput label="Sleep pattern" value={formData.sleepPattern} onChange={(v: string) => handleInputChange('sleepPattern', v)} />
              <TextInput label="Screen time (hours/day)" value={formData.screenTimeHours} onChange={(v: string) => handleInputChange('screenTimeHours', v)} type="number" />
            </div>
          </div>
        </div>

        {/* Section 3: Chief Complaints */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Section 3: Chief Complaints</h2>
          <div className="space-y-4">
            <TextArea label="Parent's main concerns" value={formData.chiefComplaints} onChange={(v: string) => handleInputChange('chiefComplaints', v)} rows={4} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextInput label="Age at which concern noticed" value={formData.ageWhenNoticed} onChange={(v: string) => handleInputChange('ageWhenNoticed', v)} type="number" />
              <TextInput label="Duration of problem" value={formData.durationOfProblem} onChange={(v: string) => handleInputChange('durationOfProblem', v)} />
            </div>
          </div>
        </div>

        {/* Section 4: Perinatal & Birth History */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Section 4: Perinatal & Birth History</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <RadioGroup label="Conception type" value={formData.conceptionType} onChange={(v: string) => handleInputChange('conceptionType', v)} options={['Natural', 'Assisted fertilization']} />
              <RadioGroup label="Term type" value={formData.termType} onChange={(v: string) => handleInputChange('termType', v)} options={['Term', 'Preterm']} />
              <TextInput label="Weeks of gestation" value={formData.weeksOfGestation} onChange={(v: string) => handleInputChange('weeksOfGestation', v)} type="number" />
              <RadioGroup label="Delivery type" value={formData.deliveryType} onChange={(v: string) => handleInputChange('deliveryType', v)} options={['Normal', 'LSCS', 'Assisted']} />
              <RadioGroup label="Assistance required at birth" value={formData.assistanceRequiredAtBirth} onChange={(v: string) => handleInputChange('assistanceRequiredAtBirth', v)} options={['Yes', 'No']} />
              <TextInput label="APGAR score" value={formData.apgarScore} onChange={(v: string) => handleInputChange('apgarScore', v)} />
              <TextInput label="Birth weight (kg)" value={formData.birthWeight} onChange={(v: string) => handleInputChange('birthWeight', v)} type="number" />
            </div>
            <TextArea label="Pregnancy complications" value={formData.pregnancyComplications} onChange={(v: string) => handleInputChange('pregnancyComplications', v)} />
            <TextArea label="Birth history details" value={formData.birthHistory} onChange={(v: string) => handleInputChange('birthHistory', v)} />
          </div>
        </div>

        {/* Section 4B: After Birth History */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Section 4B: After Birth History</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <RadioGroup label="Cried immediately after birth" value={formData.criedImmediately} onChange={(v: string) => handleInputChange('criedImmediately', v)} options={['Yes', 'No']} />
            <RadioGroup label="NICU admission" value={formData.nicuAdmission} onChange={(v: string) => handleInputChange('nicuAdmission', v)} options={['Yes', 'No']} />
            <RadioGroup label="Phototherapy" value={formData.phototherapy} onChange={(v: string) => handleInputChange('phototherapy', v)} options={['Yes', 'No']} />
            <RadioGroup label="ET tube" value={formData.etTube} onChange={(v: string) => handleInputChange('etTube', v)} options={['Yes', 'No']} />
            <RadioGroup label="Development course" value={formData.developmentCourse} onChange={(v: string) => handleInputChange('developmentCourse', v)} options={['Normal', 'Abnormal']} />
          </div>
        </div>

        {/* Section 5: Developmental History */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Section 5: Developmental History</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <RadioGroup label="Milestones delay noticed" value={formData.milestonesDelay} onChange={(v: string) => handleInputChange('milestonesDelay', v)} options={['Yes', 'No']} />
              <RadioGroup label="Speech delay" value={formData.speechDelay} onChange={(v: string) => handleInputChange('speechDelay', v)} options={['Yes', 'No']} />
              <RadioGroup label="Motor delay" value={formData.motorDelay} onChange={(v: string) => handleInputChange('motorDelay', v)} options={['Yes', 'No']} />
              <RadioGroup label="Regression of skills" value={formData.regressionOfSkills} onChange={(v: string) => handleInputChange('regressionOfSkills', v)} options={['Yes', 'No']} />
              <TextInput label="Social smile age (months)" value={formData.socialSmileAge} onChange={(v: string) => handleInputChange('socialSmileAge', v)} type="number" />
              <TextInput label="Stranger anxiety age (months)" value={formData.strangerAnxietyAge} onChange={(v: string) => handleInputChange('strangerAnxietyAge', v)} type="number" />
              <RadioGroup label="Response to name" value={formData.responseToName} onChange={(v: string) => handleInputChange('responseToName', v)} options={['Good', 'Poor', 'Absent']} />
              <RadioGroup label="Reduced name call frequency" value={formData.reducedNameCallFrequency} onChange={(v: string) => handleInputChange('reducedNameCallFrequency', v)} options={['Yes', 'No']} />
              <TextInput label="Language milestone delay" value={formData.languageMilestoneDelay} onChange={(v: string) => handleInputChange('languageMilestoneDelay', v)} />
            </div>
          </div>
        </div>

        {/* Section 5B: Functional/Cognitive Assessment */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Section 5B: Functional/Cognitive Assessment</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <RadioGroup label="Understands household objects" value={formData.understandsHouseholdObjects} onChange={(v: string) => handleInputChange('understandsHouseholdObjects', v)} options={['Yes', 'No']} />
            <RadioGroup label="Operates mobile phone" value={formData.operatesMobilePhone} onChange={(v: string) => handleInputChange('operatesMobilePhone', v)} options={['Yes', 'No']} />
            <RadioGroup label="Labels objects" value={formData.labelsObjects} onChange={(v: string) => handleInputChange('labelsObjects', v)} options={['Yes', 'No']} />
            <RadioGroup label="Identifies family members" value={formData.identifiesFamilyMembers} onChange={(v: string) => handleInputChange('identifiesFamilyMembers', v)} options={['Yes', 'No']} />
            <RadioGroup label="Identifies self in mirror" value={formData.identifiesSelfInMirror} onChange={(v: string) => handleInputChange('identifiesSelfInMirror', v)} options={['Yes', 'No']} />
            <RadioGroup label="Understands simple commands" value={formData.understandsSimpleCommands} onChange={(v: string) => handleInputChange('understandsSimpleCommands', v)} options={['Yes', 'No']} />
            <RadioGroup label="Understands double commands" value={formData.understandsDoubleCommands} onChange={(v: string) => handleInputChange('understandsDoubleCommands', v)} options={['Yes', 'No']} />
            <RadioGroup label="Understands 3-step commands" value={formData.understands3StepCommands} onChange={(v: string) => handleInputChange('understands3StepCommands', v)} options={['Yes', 'No']} />
          </div>
        </div>

        {/* Section 6: Medical History */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Section 6: Medical History</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <RadioGroup label="Seizures" value={formData.seizures} onChange={(v: string) => handleInputChange('seizures', v)} options={['Yes', 'No']} />
              <RadioGroup label="Hearing problems" value={formData.hearingProblems} onChange={(v: string) => handleInputChange('hearingProblems', v)} options={['Yes', 'No']} />
              <RadioGroup label="Vision problems" value={formData.visionProblems} onChange={(v: string) => handleInputChange('visionProblems', v)} options={['Yes', 'No']} />
            </div>
            <TextArea label="Current medication" value={formData.currentMedication} onChange={(v: string) => handleInputChange('currentMedication', v)} />
          </div>
        </div>

        {/* Section 7: Behavioural Observation */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Section 7: Behavioural Observation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <RadioGroup label="Eye contact" value={formData.eyeContact} onChange={(v: string) => handleInputChange('eyeContact', v)} options={['Good', 'Poor']} />
            <RadioGroup label="Social interaction" value={formData.socialInteraction} onChange={(v: string) => handleInputChange('socialInteraction', v)} options={['Normal', 'Reduced']} />
            <RadioGroup label="Repetitive behaviors" value={formData.repetitiveBehaviors} onChange={(v: string) => handleInputChange('repetitiveBehaviors', v)} options={['Yes', 'No']} />
            <RadioGroup label="Sensory issues" value={formData.sensoryIssues} onChange={(v: string) => handleInputChange('sensoryIssues', v)} options={['Yes', 'No']} />
            <RadioGroup label="Attention span" value={formData.attentionSpan} onChange={(v: string) => handleInputChange('attentionSpan', v)} options={['Good', 'Poor']} />
          </div>
        </div>


        {/* Section 8: Auto-filled Section (READ ONLY) */}
        <div className="bg-gray-50 rounded-xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6 border-2 border-blue-200">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Section 8: Screening Results (Auto-filled)</h2>
          <p className="text-sm text-gray-900 mb-4 italic">This section is automatically populated from M-CHAT and DSM assessments</p>
          
          {autoSection?.mchat ? (
            <div className="mb-4 bg-white rounded-lg p-4">
              <h3 className="text-lg font-bold text-gray-900 mb-2">M-CHAT Screening</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-900 font-semibold">Total Score</p>
                  <p className="text-xl sm:text-2xl font-bold text-blue-600">{autoSection.mchat.total_score} / 20</p>
                </div>
                <div>
                  <p className="text-sm text-gray-900 font-semibold">Risk Level</p>
                  <span className={`inline-flex px-3 py-1 rounded-full text-sm font-bold ${
                    autoSection.mchat.risk_level === 'High Risk' ? 'bg-red-100 text-red-800' :
                    autoSection.mchat.risk_level === 'Medium Risk' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {autoSection.mchat.risk_level}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="mb-4 bg-white rounded-lg p-4">
              <p className="text-gray-900 font-semibold">M-CHAT not completed yet</p>
              <button
                onClick={() => router.push(`/admin/children/${childId}/mchat`)}
                className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
              >
                Complete M-CHAT
              </button>
            </div>
          )}

          {autoSection?.dsm ? (
            <div className="bg-white rounded-lg p-4">
              <h3 className="text-lg font-bold text-gray-900 mb-2">DSM Checklist</h3>
              <div className="space-y-2">
                <p className="text-sm text-gray-900"><span className="font-semibold">A Criteria:</span> {autoSection.dsm.a_criteria_count} / 3 groups</p>
                <p className="text-sm text-gray-900"><span className="font-semibold">B Criteria:</span> {autoSection.dsm.b_criteria_count} / 4 groups</p>
                <p className="text-sm text-gray-900"><span className="font-semibold">C (Early Onset):</span> {autoSection.dsm.c_criteria ? 'Yes' : 'No'}</p>
                <p className="text-sm text-gray-900"><span className="font-semibold">D (Clinical Impairment):</span> {autoSection.dsm.d_criteria ? 'Yes' : 'No'}</p>
                <div className="mt-3">
                  <p className="text-sm text-gray-900 font-semibold mb-1">Final Interpretation:</p>
                  <span className={`inline-flex px-3 py-1 rounded-full text-sm font-bold ${
                    autoSection.dsm.meets_criteria ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {autoSection.dsm.interpretation}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg p-4">
              <p className="text-gray-900 font-semibold">DSM Checklist not completed yet</p>
              <button
                onClick={() => router.push(`/admin/children/${childId}/dsm`)}
                className="mt-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors text-sm"
              >
                Complete DSM Checklist
              </button>
            </div>
          )}
        </div>

        {/* Section 9: Final Clinical Impression */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Section 9: Final Clinical Impression</h2>
          <div className="space-y-4">
            <TextArea label="Provisional Diagnosis" value={formData.provisionalDiagnosis} onChange={(v: string) => handleInputChange('provisionalDiagnosis', v)} rows={4} />
            
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Recommended Therapies</label>
              <div className="space-y-2">
                {['Speech Therapy', 'ABA', 'Occupational Therapy', 'Special Education', 'Physiotherapy'].map(therapy => (
                  <label key={therapy} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.recommendedTherapies.includes(therapy)}
                      onChange={() => handleTherapyChange(therapy)}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <span className="text-gray-900 font-semibold">{therapy}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextInput label="Frequency per week" value={formData.frequencyPerWeek} onChange={(v: string) => handleInputChange('frequencyPerWeek', v)} type="number" />
              <TextInput label="Doctor Signature Name" value={formData.doctorSignatureName} onChange={(v: string) => handleInputChange('doctorSignatureName', v)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
