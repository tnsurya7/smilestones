'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { getChildById } from '@/lib/api-client';
import { ArrowLeft, Save, Download } from 'lucide-react';
import jsPDF from 'jspdf';
import { addPDFHeader, addPDFWatermark, addPDFFooter } from '@/utils/pdfUtils';
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

const SelectInput = ({ label, value, onChange, options, required = false }: any) => (
  <div>
    <label className="block text-sm font-semibold text-gray-900 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <select
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
    >
      <option value="">Select {label}</option>
      {options.map((option: string | number) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
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
  contactNumber: string;
  
  // Chief Complaints (moved to Section 1)
  chiefComplaints: string;
  ageWhenNoticed: string;
  durationOfProblem: string;
  
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
  
  // Siblings Details
  sibling1Name: string;
  sibling1Age: string;
  sibling2Name: string;
  sibling2Age: string;
  siblingMilestonesAppropriate: string; // Yes/No
  timeSpentWithSiblings: string;
  
  // Grandparents Details
  paternalGrandfatherName: string;
  paternalGrandmotherName: string;
  maternalGrandfatherName: string;
  maternalGrandmotherName: string;
  timeSpentWithGrandparents: string;
  
  // Section 2: Family History
  paternalFamilyHistory: string; // Yes/No
  maternalFamilyHistory: string; // Yes/No
  familySpeechDelayHistory: string;
  intellectualDisabilityInFamily: string;
  developmentalDelayInFamily: string;
  autismInFamily: string;
  whoIdentifiedFirst: string; // Changed label to "Who first doubted the delay"
  whoSuggestedTherapy: string;
  parentalConcerns: string[]; // Speech delay, Hyperactivity, Behavior problem, Eye contact, Not responding to name
  residenceType: string;
  
  // Section 3: Personal History (Perinatal)
  conceptionType: string;
  pregnancyIssues: string[]; // Thyroid, Diabetic, Hypertension, Seizure, Stress, Trauma, Bleeding issues
  termType: string;
  weeksOfGestation: string;
  deliveryType: string;
  assistanceRequiredAtBirth: string;
  apgarScore: string;
  birthWeight: string;
  
  // Section 4: After Birth History
  criedImmediately: string;
  nicuAdmission: string;
  jaundice: string; // Yes/No
  phototherapyDays: string;
  etTubeDays: string;
  seizuresAtBirth: string; // Yes/No
  febrileSeizure: string; // Yes/No
  floppinessOrStiffness: string; // Yes/No
  
  // Section 5: Developmental History
  socialSmileAge: string;
  strangerAnxietyAge: string;
  nameCallResponseMonths: string;
  nameCallAdequacy: string; // adequate / inadequate / absent
  languageMilestoneDelay: string;
  
  // Section 6: Medical History
  seizures: string;
  seizureMedication: string;
  sleepPattern: string;
  screenTimeHours: string;
  
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
    referredBy: '', locality: '', familyType: '', address: '', contactNumber: '',
    // Chief Complaints (in Section 1)
    chiefComplaints: '', ageWhenNoticed: '', durationOfProblem: '',
    // Section 2: Parent Details
    fatherName: '', fatherAge: '', fatherEducation: '', fatherOccupation: '', fatherContactNumber: '', fatherTimeSpends: '',
    motherName: '', motherAge: '', motherEducation: '', motherOccupation: '', motherContactNumber: '', motherTimeSpends: '',
    // Siblings
    sibling1Name: '', sibling1Age: '', sibling2Name: '', sibling2Age: '', siblingMilestonesAppropriate: '', timeSpentWithSiblings: '',
    // Grandparents
    paternalGrandfatherName: '', paternalGrandmotherName: '', maternalGrandfatherName: '', maternalGrandmotherName: '',
    timeSpentWithGrandparents: '',
    // Family History
    paternalFamilyHistory: '', maternalFamilyHistory: '',
    familySpeechDelayHistory: '', intellectualDisabilityInFamily: '', developmentalDelayInFamily: '',
    autismInFamily: '', whoIdentifiedFirst: '', whoSuggestedTherapy: '', parentalConcerns: [], residenceType: '',
    // Section 3: Personal History
    conceptionType: '', pregnancyIssues: [], termType: '', weeksOfGestation: '',
    deliveryType: '', assistanceRequiredAtBirth: '', apgarScore: '', birthWeight: '',
    // Section 4: After Birth
    criedImmediately: '', nicuAdmission: '', jaundice: '', phototherapyDays: '', 
    etTubeDays: '', seizuresAtBirth: '', febrileSeizure: '', floppinessOrStiffness: '',
    // Section 5: Developmental
    socialSmileAge: '', strangerAnxietyAge: '', nameCallResponseMonths: '', nameCallAdequacy: '',
    languageMilestoneDelay: '',
    // Section 6: Medical
    seizures: '', seizureMedication: '', sleepPattern: '', screenTimeHours: '',
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
    
    // Section 4: Family History
    if (yPos > 250) { doc.addPage(); yPos = 20; }
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Section 4: Family History', 14, yPos);
    yPos += 8;
    
    doc.setFontSize(10);
    if (yPos > 250) { doc.addPage(); yPos = 20; }
    doc.setFont('helvetica', 'bold');
    doc.text('Siblings:', 14, yPos);
    yPos += 6;
    doc.setFont('helvetica', 'normal');
    if (formData.sibling1Name || formData.sibling2Name) {
      if (formData.sibling1Name) {
        doc.text(`Sibling 1: ${formData.sibling1Name}, Age: ${formData.sibling1Age || 'N/A'}`, 20, yPos);
        yPos += 5;
      }
      if (formData.sibling2Name) {
        doc.text(`Sibling 2: ${formData.sibling2Name}, Age: ${formData.sibling2Age || 'N/A'}`, 20, yPos);
        yPos += 5;
      }
    } else {
      doc.text('None', 20, yPos);
      yPos += 5;
    }
    yPos += 5;
    
    doc.setFont('helvetica', 'bold');
    doc.text('Grandparents:', 14, yPos);
    yPos += 6;
    doc.setFont('helvetica', 'normal');
    doc.text(`Paternal Grandfather: ${formData.paternalGrandfatherName || 'N/A'}`, 20, yPos);
    yPos += 5;
    doc.text(`Paternal Grandmother: ${formData.paternalGrandmotherName || 'N/A'}`, 20, yPos);
    yPos += 5;
    doc.text(`Maternal Grandfather: ${formData.maternalGrandfatherName || 'N/A'}`, 20, yPos);
    yPos += 5;
    doc.text(`Maternal Grandmother: ${formData.maternalGrandmotherName || 'N/A'}`, 20, yPos);
    yPos += 8;
    
    if (yPos > 220) { doc.addPage(); yPos = 20; }
    doc.setFont('helvetica', 'bold');
    doc.text('Family Medical History:', 14, yPos);
    yPos += 6;
    doc.setFont('helvetica', 'normal');
    doc.text(`Speech delay: ${formData.familySpeechDelayHistory || 'N/A'}`, 20, yPos);
    yPos += 5;
    doc.text(`Intellectual disability: ${formData.intellectualDisabilityInFamily || 'N/A'}`, 20, yPos);
    yPos += 5;
    doc.text(`Developmental delay: ${formData.developmentalDelayInFamily || 'N/A'}`, 20, yPos);
    yPos += 5;
    doc.text(`Autism: ${formData.autismInFamily || 'N/A'}`, 20, yPos);
    yPos += 5;
    doc.text(`Who first doubted delay: ${formData.whoIdentifiedFirst || 'N/A'}`, 20, yPos);
    yPos += 8;
    
    doc.setFont('helvetica', 'bold');
    doc.text('Parental Concerns:', 14, yPos);
    yPos += 6;
    doc.setFont('helvetica', 'normal');
    if (formData.parentalConcerns && formData.parentalConcerns.length > 0) {
      formData.parentalConcerns.forEach((concern: string) => {
        doc.text(`• ${concern}`, 20, yPos);
        yPos += 5;
      });
    } else {
      doc.text('None', 20, yPos);
      yPos += 5;
    }
    yPos += 8;
    
    // Family Tree Space
    if (yPos > 220) { doc.addPage(); yPos = 20; }
    doc.setFont('helvetica', 'bold');
    doc.text('Family Tree:', 14, yPos);
    yPos += 10;
    doc.setFont('helvetica', 'normal');
    // Add blank space for family tree (40mm height)
    yPos += 40;
    
    // Section 5: Personal History
    if (yPos > 220) { doc.addPage(); yPos = 20; }
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Section 5: Personal History', 14, yPos);
    yPos += 8;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Conception type: ${formData.conceptionType || 'N/A'}`, 14, yPos);
    yPos += 5;
    doc.text(`Term type: ${formData.termType || 'N/A'}`, 14, yPos);
    yPos += 5;
    doc.text(`Weeks of gestation: ${formData.weeksOfGestation || 'N/A'}`, 14, yPos);
    yPos += 5;
    doc.text(`Delivery type: ${formData.deliveryType || 'N/A'}`, 14, yPos);
    yPos += 5;
    doc.text(`Birth weight: ${formData.birthWeight || 'N/A'} kg`, 14, yPos);
    yPos += 5;
    doc.text(`APGAR score: ${formData.apgarScore || 'N/A'}`, 14, yPos);
    yPos += 8;
    
    // Section 6: After Birth History
    if (yPos > 250) { doc.addPage(); yPos = 20; }
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Section 6: After Birth History', 14, yPos);
    yPos += 8;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Cried immediately: ${formData.criedImmediately || 'N/A'}`, 14, yPos);
    yPos += 5;
    doc.text(`NICU admission: ${formData.nicuAdmission || 'N/A'}`, 14, yPos);
    yPos += 5;
    doc.text(`Phototherapy days: ${formData.phototherapyDays || 'N/A'}`, 14, yPos);
    yPos += 5;
    doc.text(`ET days: ${formData.etTubeDays || 'N/A'}`, 14, yPos);
    yPos += 5;
    doc.text(`Seizures at birth: ${formData.seizuresAtBirth || 'N/A'}`, 14, yPos);
    yPos += 8;
    
    // Section 7: Developmental History
    if (yPos > 250) { doc.addPage(); yPos = 20; }
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Section 7: Developmental History', 14, yPos);
    yPos += 8;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Social smile: ${formData.socialSmileAge || 'N/A'} months`, 14, yPos);
    yPos += 5;
    doc.text(`Stranger anxiety: ${formData.strangerAnxietyAge || 'N/A'} months`, 14, yPos);
    yPos += 5;
    doc.text(`Name call response: ${formData.nameCallResponseMonths || 'N/A'} months`, 14, yPos);
    yPos += 5;
    doc.text(`Name call adequacy: ${formData.nameCallAdequacy || 'N/A'}`, 14, yPos);
    yPos += 5;
    doc.text(`Language milestones delayed: ${formData.languageMilestoneDelay || 'N/A'}`, 14, yPos);
    yPos += 8;
    
    // Section 8: Medical History
    if (yPos > 250) { doc.addPage(); yPos = 20; }
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Section 8: Medical History', 14, yPos);
    yPos += 8;
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Seizures: ${formData.seizures || 'N/A'}`, 14, yPos);
    yPos += 5;
    if (formData.seizures === 'Yes') {
      doc.text(`Seizure medication: ${formData.seizureMedication || 'N/A'}`, 14, yPos);
      yPos += 5;
    }
    doc.text(`Febrile seizure: ${formData.febrileSeizure || 'N/A'}`, 14, yPos);
    yPos += 5;
    doc.text(`Floppiness/stiffness: ${formData.floppinessOrStiffness || 'N/A'}`, 14, yPos);
    yPos += 5;
    doc.text(`Sleep pattern: ${formData.sleepPattern || 'N/A'}`, 14, yPos);
    yPos += 5;
    doc.text(`Screen time: ${formData.screenTimeHours || 'N/A'} hours/day`, 14, yPos);
    yPos += 8;
    
    // Section 9: Auto-filled
    if (yPos > 200) { doc.addPage(); yPos = 20; }
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Section 9: Screening Results (Auto-filled)', 14, yPos);
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
    
    // Section 10: Final Clinical Impression
    if (yPos > 200) { doc.addPage(); yPos = 20; }
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Section 10: Final Clinical Impression', 14, yPos);
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
    
    // Add watermark and footer to all pages
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      
      // Add watermark (using light gray color instead of opacity)
      doc.setTextColor(230, 230, 230);
      doc.setFontSize(60);
      doc.setFont('helvetica', 'bold');
      
      // Center watermark at 45-degree angle
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      doc.text('SMILESTONES', pageWidth / 2, pageHeight / 2, {
        align: 'center',
        angle: 45
      });
      
      // Footer
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
          
          // Make answer bold and colored
          doc.setFont('helvetica', 'normal');
          doc.text('Answer: ', 20, yPos);
          doc.setFont('helvetica', 'bold');
          
          // Set color based on answer
          if (answer === 'Yes') {
            doc.setTextColor(34, 197, 94); // Green
          } else if (answer === 'No') {
            doc.setTextColor(239, 68, 68); // Red
          } else {
            doc.setTextColor(156, 163, 175); // Gray
          }
          
          doc.text(answer, 38, yPos);
          doc.setTextColor(0, 0, 0); // Reset to black
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
            
            // Make answer bold and colored
            doc.setFont('helvetica', 'normal');
            doc.text('Answer: ', 22, yPos);
            doc.setFont('helvetica', 'bold');
            
            // Set color based on answer
            if (answer === 'Yes') {
              doc.setTextColor(34, 197, 94); // Green
            } else if (answer === 'No') {
              doc.setTextColor(239, 68, 68); // Red
            } else {
              doc.setTextColor(156, 163, 175); // Gray
            }
            
            doc.text(answer, 40, yPos);
            doc.setTextColor(0, 0, 0); // Reset to black
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
                <span className="hidden sm:inline">Case Sheet PDF</span>
                <span className="sm:hidden">PDF</span>
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
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Section 1: Child Identification & Chief Complaints</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextInput label="Child Full Name" value={formData.childFullName} onChange={(v: string) => handleInputChange('childFullName', v)} required />
            <TextInput label="Date of Birth" value={formData.dob} onChange={handleDOBChange} type="date" required />
            <TextInput label="Age (years)" value={formData.age} onChange={(v: string) => handleInputChange('age', v)} type="number" />
            <RadioGroup label="Gender" value={formData.gender} onChange={(v: string) => handleInputChange('gender', v)} options={['Male', 'Female', 'Other']} />
            <SelectInput label="Birth Order" value={formData.birthOrder} onChange={(v: string) => handleInputChange('birthOrder', v)} options={[0, 1, 2, 3, 4]} />
            <TextInput label="UHID (Auto-generated)" value={formData.uhid} onChange={(v: string) => handleInputChange('uhid', v)} />
            <TextInput label="Date of Assessment" value={formData.dateOfAssessment} onChange={(v: string) => handleInputChange('dateOfAssessment', v)} type="date" />
            <TextInput label="Referred By" value={formData.referredBy} onChange={(v: string) => handleInputChange('referredBy', v)} />
            <RadioGroup label="Locality" value={formData.locality} onChange={(v: string) => handleInputChange('locality', v)} options={['Urban', 'Rural']} />
            <RadioGroup label="Family Type" value={formData.familyType} onChange={(v: string) => handleInputChange('familyType', v)} options={['Nuclear', 'Joint']} />
            <TextInput label="Contact Number" value={formData.contactNumber} onChange={(v: string) => handleInputChange('contactNumber', v)} type="tel" />
          </div>
          <div className="mt-4">
            <TextArea label="Address" value={formData.address} onChange={(v: string) => handleInputChange('address', v)} rows={2} />
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Chief Complaints</h3>
            <div className="space-y-4">
              <TextArea label="Parent's main concerns" value={formData.chiefComplaints} onChange={(v: string) => handleInputChange('chiefComplaints', v)} rows={4} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput label="Age at which concern noticed (years)" value={formData.ageWhenNoticed} onChange={(v: string) => handleInputChange('ageWhenNoticed', v)} type="number" />
                <TextInput label="Duration of problem" value={formData.durationOfProblem} onChange={(v: string) => handleInputChange('durationOfProblem', v)} />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Family History */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Section 2: Family History</h2>
          
          {/* Father Details */}
          <div className="mb-6">
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
          
          {/* Mother Details */}
          <div className="mb-6">
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
          
          {/* Siblings Details */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Siblings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextInput label="Sibling 1 Name" value={formData.sibling1Name} onChange={(v: string) => handleInputChange('sibling1Name', v)} />
              <TextInput label="Sibling 1 Age" value={formData.sibling1Age} onChange={(v: string) => handleInputChange('sibling1Age', v)} type="number" />
              <TextInput label="Sibling 2 Name" value={formData.sibling2Name} onChange={(v: string) => handleInputChange('sibling2Name', v)} />
              <TextInput label="Sibling 2 Age" value={formData.sibling2Age} onChange={(v: string) => handleInputChange('sibling2Age', v)} type="number" />
              <RadioGroup label="Sibling attained milestones appropriately" value={formData.siblingMilestonesAppropriate} onChange={(v: string) => handleInputChange('siblingMilestonesAppropriate', v)} options={['Yes', 'No']} />
              <TextInput label="Time spent with siblings (hours/day)" value={formData.timeSpentWithSiblings} onChange={(v: string) => handleInputChange('timeSpentWithSiblings', v)} type="number" />
            </div>
          </div>
          
          {/* Grandparents Details */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Grandparents</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextInput label="Paternal Grandfather Name" value={formData.paternalGrandfatherName} onChange={(v: string) => handleInputChange('paternalGrandfatherName', v)} />
              <TextInput label="Paternal Grandmother Name" value={formData.paternalGrandmotherName} onChange={(v: string) => handleInputChange('paternalGrandmotherName', v)} />
              <TextInput label="Maternal Grandfather Name" value={formData.maternalGrandfatherName} onChange={(v: string) => handleInputChange('maternalGrandfatherName', v)} />
              <TextInput label="Maternal Grandmother Name" value={formData.maternalGrandmotherName} onChange={(v: string) => handleInputChange('maternalGrandmotherName', v)} />
              <TextInput label="Time spent with Grandparents (hours/day)" value={formData.timeSpentWithGrandparents} onChange={(v: string) => handleInputChange('timeSpentWithGrandparents', v)} type="number" />
            </div>
          </div>
          
          {/* Family History Details */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Family Medical History</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <RadioGroup label="Paternal family history" value={formData.paternalFamilyHistory} onChange={(v: string) => handleInputChange('paternalFamilyHistory', v)} options={['Yes', 'No']} />
              <RadioGroup label="Maternal family history" value={formData.maternalFamilyHistory} onChange={(v: string) => handleInputChange('maternalFamilyHistory', v)} options={['Yes', 'No']} />
              <RadioGroup label="Family member has speech delay" value={formData.familySpeechDelayHistory} onChange={(v: string) => handleInputChange('familySpeechDelayHistory', v)} options={['Yes', 'No']} />
              <RadioGroup label="Intellectual disability in family" value={formData.intellectualDisabilityInFamily} onChange={(v: string) => handleInputChange('intellectualDisabilityInFamily', v)} options={['Yes', 'No']} />
              <RadioGroup label="Developmental delay in family" value={formData.developmentalDelayInFamily} onChange={(v: string) => handleInputChange('developmentalDelayInFamily', v)} options={['Yes', 'No']} />
              <RadioGroup label="Autism in family" value={formData.autismInFamily} onChange={(v: string) => handleInputChange('autismInFamily', v)} options={['Yes', 'No']} />
              <RadioGroup label="Who first doubted the delay" value={formData.whoIdentifiedFirst} onChange={(v: string) => handleInputChange('whoIdentifiedFirst', v)} options={['Mother', 'Father', 'Grandparent', 'Pediatrician', 'Teacher']} />
              <TextInput label="Who suggested therapy" value={formData.whoSuggestedTherapy} onChange={(v: string) => handleInputChange('whoSuggestedTherapy', v)} />
              <RadioGroup label="Residence type" value={formData.residenceType} onChange={(v: string) => handleInputChange('residenceType', v)} options={['Individual', 'Apartment']} />
            </div>
          </div>
          
          {/* Parental Concerns */}
          <div className="mb-6">
            <CheckboxGroup 
              label="Parental Concerns" 
              values={formData.parentalConcerns} 
              onChange={(v: string[]) => handleInputChange('parentalConcerns', v)} 
              options={['Speech delay', 'Hyperactivity', 'Behavior problem', 'Eye contact', 'Not responding to name']} 
            />
          </div>
          
          {/* Family Tree */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Family Tree</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 min-h-[200px] bg-gray-50">
              <p className="text-gray-500 text-center">Space for family tree diagram</p>
            </div>
          </div>
        </div>

        {/* Section 3: Personal History */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Section 3: Personal History</h2>
          
          {/* Antenatal History */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Antenatal History</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <RadioGroup label="Conception type" value={formData.conceptionType} onChange={(v: string) => handleInputChange('conceptionType', v)} options={['Natural', 'Assisted fertilization']} />
              <CheckboxGroup 
                label="Any issues during pregnancy" 
                values={formData.pregnancyIssues} 
                onChange={(v: string[]) => handleInputChange('pregnancyIssues', v)} 
                options={['Thyroid', 'Diabetic', 'Hypertension', 'Seizure', 'Stress', 'Trauma', 'Bleeding issues']} 
              />
            </div>
          </div>

          {/* Natal History */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Natal History</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <RadioGroup label="Delivery type" value={formData.deliveryType} onChange={(v: string) => handleInputChange('deliveryType', v)} options={['Natural', 'LSCS', 'Assisted delivery']} />
              <RadioGroup label="Assistance required at birth" value={formData.assistanceRequiredAtBirth} onChange={(v: string) => handleInputChange('assistanceRequiredAtBirth', v)} options={['Yes', 'No']} />
              <RadioGroup label="Term type" value={formData.termType} onChange={(v: string) => handleInputChange('termType', v)} options={['Term', 'Preterm']} />
              <TextInput label="Weeks of gestation" value={formData.weeksOfGestation} onChange={(v: string) => handleInputChange('weeksOfGestation', v)} type="number" />
              <TextInput label="Birth weight (kg)" value={formData.birthWeight} onChange={(v: string) => handleInputChange('birthWeight', v)} type="number" />
              <TextInput label="APGAR score" value={formData.apgarScore} onChange={(v: string) => handleInputChange('apgarScore', v)} />
            </div>
          </div>
        </div>

        {/* Section 4: After Birth History */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Section 4: After Birth History</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <RadioGroup label="Cried immediately after birth" value={formData.criedImmediately} onChange={(v: string) => handleInputChange('criedImmediately', v)} options={['Yes', 'No']} />
            <RadioGroup label="NICU admission" value={formData.nicuAdmission} onChange={(v: string) => handleInputChange('nicuAdmission', v)} options={['Yes', 'No']} />
            <TextInput label="Phototherapy (days)" value={formData.phototherapyDays} onChange={(v: string) => handleInputChange('phototherapyDays', v)} type="number" />
            <TextInput label="ET (days)" value={formData.etTubeDays} onChange={(v: string) => handleInputChange('etTubeDays', v)} type="number" />
            <RadioGroup label="Seizures" value={formData.seizuresAtBirth} onChange={(v: string) => handleInputChange('seizuresAtBirth', v)} options={['Yes', 'No']} />
          </div>
        </div>

        {/* Section 5: Developmental History */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Section 5: Developmental History</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextInput label="Social smile (months)" value={formData.socialSmileAge} onChange={(v: string) => handleInputChange('socialSmileAge', v)} type="number" />
              <TextInput label="Stranger anxiety (months)" value={formData.strangerAnxietyAge} onChange={(v: string) => handleInputChange('strangerAnxietyAge', v)} type="number" />
              <TextInput label="Name call response (months)" value={formData.nameCallResponseMonths} onChange={(v: string) => handleInputChange('nameCallResponseMonths', v)} type="number" />
              <RadioGroup label="Name call adequacy" value={formData.nameCallAdequacy} onChange={(v: string) => handleInputChange('nameCallAdequacy', v)} options={['Adequate', 'Inadequate', 'Absent']} />
              <RadioGroup label="Language milestones delayed against expected for age" value={formData.languageMilestoneDelay} onChange={(v: string) => handleInputChange('languageMilestoneDelay', v)} options={['Yes', 'No']} />
            </div>
          </div>
        </div>

        {/* Section 6: Medical History */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Section 6: Medical History</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <RadioGroup label="Seizures" value={formData.seizures} onChange={(v: string) => handleInputChange('seizures', v)} options={['Yes', 'No']} />
              {formData.seizures === 'Yes' && (
                <TextInput label="Seizure medication" value={formData.seizureMedication} onChange={(v: string) => handleInputChange('seizureMedication', v)} />
              )}
              <RadioGroup label="Febrile seizure" value={formData.febrileSeizure} onChange={(v: string) => handleInputChange('febrileSeizure', v)} options={['Yes', 'No']} />
              <RadioGroup label="Mother never felt any floppiness or stiffness in early childhood" value={formData.floppinessOrStiffness} onChange={(v: string) => handleInputChange('floppinessOrStiffness', v)} options={['Yes', 'No']} />
              <TextInput label="Sleep pattern" value={formData.sleepPattern} onChange={(v: string) => handleInputChange('sleepPattern', v)} />
              <TextInput label="Screen time (hours/day)" value={formData.screenTimeHours} onChange={(v: string) => handleInputChange('screenTimeHours', v)} type="number" />
            </div>
          </div>
        </div>


        {/* Section 7: Auto-filled Section (READ ONLY) */}
        <div className="bg-gray-50 rounded-xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6 border-2 border-blue-200">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Section 7: Screening Results (Auto-filled)</h2>
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

        {/* Section 8: Final Clinical Impression */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Section 8: Final Clinical Impression</h2>
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

        {/* Bottom Save Button */}
        <div className="flex justify-center pb-6">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50 text-base font-semibold shadow-lg"
          >
            <Save className="w-5 h-5" />
            {saving ? 'Saving...' : 'Save Case Sheet'}
          </button>
        </div>
      </div>
    </div>
  );
}
