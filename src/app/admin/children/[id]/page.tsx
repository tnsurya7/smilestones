'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { getChildById } from '@/lib/api-client';
import { ArrowLeft, FileText, ClipboardCheck, ListChecks, Activity, FileBarChart, Brain, Hand, Footprints, MessageSquare, Heart, Download } from 'lucide-react';
import jsPDF from 'jspdf';
import { addPDFHeader, addPDFWatermark, addPDFFooter } from '@/utils/pdfUtils';
import Toast from '@/components/Toast';
import { COGNITIVE_MILESTONES } from '@/data/cognitiveMilestones';
import { FINE_MOTOR_SKILLS } from '@/data/fineMotorSkills';
import { GROSS_MOTOR_SKILLS } from '@/data/grossMotorSkills';
import { LANGUAGE_DEVELOPMENT } from '@/data/languageDevelopment';
import { SOCIAL_EMOTIONAL } from '@/data/socialEmotional';
import { MCHAT_QUESTIONS } from '@/data/mchatQuestions';
import { DSM_QUESTIONS } from '@/data/dsmQuestions';

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
    setToast({ message: 'Generating comprehensive clinical report with all questions...', type: 'info' });

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

      const caseSheet = caseSheetRes.ok ? await caseSheetRes.json() : [];
      const mchat = mchatRes.ok ? await mchatRes.json() : [];
      const dsm = dsmRes.ok ? await dsmRes.json() : [];
      const cognitive = cognitiveRes.ok ? await cognitiveRes.json() : [];
      const fineMotor = fineMotorRes.ok ? await fineMotorRes.json() : [];
      const grossMotor = grossMotorRes.ok ? await grossMotorRes.json() : [];
      const language = languageRes.ok ? await languageRes.json() : [];
      const social = socialRes.ok ? await socialRes.json() : [];

      console.log('Case Sheet Data:', caseSheet);
      console.log('M-CHAT Data:', mchat);
      console.log('DSM Data:', dsm);

      // Create PDF with watermark
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.width;
      const pageHeight = doc.internal.pageSize.height;

      // Function to check if new page is needed
      const checkNewPage = (spaceNeeded = 20) => {
        if (yPos > pageHeight - 40) {
          addPDFFooter(doc, doc.getCurrentPageInfo().pageNumber, 1);
          addPDFWatermark(doc);
          doc.addPage();
          // For continuation pages, just add a simple header without full details
          doc.setFontSize(12);
          doc.setFont('helvetica', 'bold');
          doc.setTextColor(0, 0, 0);
          doc.text('COMPREHENSIVE CLINICAL REPORT (Continued)', pageWidth / 2, 20, { align: 'center' });
          yPos = 30;
          return true;
        }
        return false;
      };

      // Add header to first page
      let yPos = addPDFHeader({
        doc,
        title: 'COMPREHENSIVE CLINICAL REPORT',
        childName: child.name,
        childAge: `${child.age} years`,
        childDiagnosis: child.diagnosis,
        parentName: child.parent_name,
        phone: child.phone,
        registeredDate: new Date(child.created_at).toLocaleDateString()
      });

      // Case Sheet - Full Details
      checkNewPage(30);
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 0);
      doc.text('CASE SHEET', 20, yPos);
      yPos += 8;
      
      // Handle both array and single object responses
      const caseSheetData = Array.isArray(caseSheet) ? caseSheet[0] : caseSheet;
      const mchatData = Array.isArray(mchat) ? mchat[0] : mchat;
      const dsmData = Array.isArray(dsm) ? dsm[0] : dsm;
      
      // Extract the actual form data from the data field
      const formData = caseSheetData?.data || {};
      
      if (caseSheetData && Object.keys(formData).length > 0) {
        // Section 1: Child Identification & Chief Complaints
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text('Section 1: Child Identification & Chief Complaints', 20, yPos);
        yPos += 6;
        
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        if (formData.childFullName) doc.text(`Child Full Name: ${formData.childFullName}`, 25, yPos), yPos += 5;
        if (formData.dob) doc.text(`Date of Birth: ${formData.dob}`, 25, yPos), yPos += 5;
        if (formData.age) doc.text(`Age (years): ${formData.age}`, 25, yPos), yPos += 5;
        if (formData.gender) doc.text(`Gender: ${formData.gender}`, 25, yPos), yPos += 5;
        if (formData.birthOrder) doc.text(`Birth Order: ${formData.birthOrder}`, 25, yPos), yPos += 5;
        if (caseSheetData.uhid) doc.text(`UHID (Auto-generated): ${caseSheetData.uhid}`, 25, yPos), yPos += 5;
        if (formData.dateOfAssessment) doc.text(`Date of Assessment: ${formData.dateOfAssessment}`, 25, yPos), yPos += 5;
        if (formData.referredBy) doc.text(`Referred By: ${formData.referredBy}`, 25, yPos), yPos += 5;
        if (formData.locality) doc.text(`Locality: ${formData.locality}`, 25, yPos), yPos += 5;
        if (formData.familyType) doc.text(`Family Type: ${formData.familyType}`, 25, yPos), yPos += 5;
        if (formData.contactNumber) doc.text(`Contact Number: ${formData.contactNumber}`, 25, yPos), yPos += 5;
        if (formData.address) {
          const addressLines = doc.splitTextToSize(`Address: ${formData.address}`, pageWidth - 50);
          addressLines.forEach((line: string) => {
            checkNewPage();
            doc.text(line, 25, yPos);
            yPos += 5;
          });
        }
        yPos += 3;
        
        // Chief Complaints subsection
        checkNewPage(20);
        doc.setFont('helvetica', 'bold');
        doc.text('Chief Complaints', 25, yPos);
        yPos += 5;
        doc.setFont('helvetica', 'normal');
        if (formData.chiefComplaints) {
          const complaints = doc.splitTextToSize(`Parent's main concerns: ${formData.chiefComplaints}`, pageWidth - 50);
          complaints.forEach((line: string) => {
            checkNewPage();
            doc.text(line, 30, yPos);
            yPos += 5;
          });
        }
        if (formData.ageWhenNoticed) doc.text(`Age at which concern noticed (years): ${formData.ageWhenNoticed}`, 30, yPos), yPos += 5;
        if (formData.durationOfProblem) doc.text(`Duration of problem: ${formData.durationOfProblem}`, 30, yPos), yPos += 5;
        yPos += 5;
        
        // Start new page for Section 2
        addPDFFooter(doc, doc.getCurrentPageInfo().pageNumber, 1);
        addPDFWatermark(doc);
        doc.addPage();
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text('COMPREHENSIVE CLINICAL REPORT (Continued)', pageWidth / 2, 20, { align: 'center' });
        yPos = 30;
        
        // Section 2: Family History
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text('Section 2: Family History', 20, yPos);
        yPos += 6;
        
        // Father
        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.text('Father:', 25, yPos);
        yPos += 5;
        doc.setFont('helvetica', 'normal');
        if (formData.fatherName) doc.text(`Name: ${formData.fatherName}`, 30, yPos), yPos += 5;
        if (formData.fatherAge) doc.text(`Age: ${formData.fatherAge}`, 30, yPos), yPos += 5;
        if (formData.fatherTimeSpends) doc.text(`Time Spends with Child: ${formData.fatherTimeSpends}`, 30, yPos), yPos += 5;
        if (formData.fatherEducation) doc.text(`Education: ${formData.fatherEducation}`, 30, yPos), yPos += 5;
        if (formData.fatherOccupation) doc.text(`Occupation: ${formData.fatherOccupation}`, 30, yPos), yPos += 5;
        if (formData.fatherContactNumber) doc.text(`Contact Number: ${formData.fatherContactNumber}`, 30, yPos), yPos += 5;
        yPos += 3;
        
        // Mother
        checkNewPage(40);
        doc.setFont('helvetica', 'bold');
        doc.text('Mother:', 25, yPos);
        yPos += 5;
        doc.setFont('helvetica', 'normal');
        if (formData.motherName) doc.text(`Name: ${formData.motherName}`, 30, yPos), yPos += 5;
        if (formData.motherAge) doc.text(`Age: ${formData.motherAge}`, 30, yPos), yPos += 5;
        if (formData.motherTimeSpends) doc.text(`Time Spends with Child: ${formData.motherTimeSpends}`, 30, yPos), yPos += 5;
        if (formData.motherEducation) doc.text(`Education: ${formData.motherEducation}`, 30, yPos), yPos += 5;
        if (formData.motherOccupation) doc.text(`Occupation: ${formData.motherOccupation}`, 30, yPos), yPos += 5;
        if (formData.motherContactNumber) doc.text(`Contact Number: ${formData.motherContactNumber}`, 30, yPos), yPos += 5;
        yPos += 3;
        
        // Siblings
        checkNewPage(30);
        doc.setFont('helvetica', 'bold');
        doc.text('Siblings:', 25, yPos);
        yPos += 5;
        doc.setFont('helvetica', 'normal');
        if (formData.sibling1Name) doc.text(`Sibling 1 Name: ${formData.sibling1Name}`, 30, yPos), yPos += 5;
        if (formData.sibling1Age) doc.text(`Sibling 1 Age: ${formData.sibling1Age}`, 30, yPos), yPos += 5;
        if (formData.sibling2Name) doc.text(`Sibling 2 Name: ${formData.sibling2Name}`, 30, yPos), yPos += 5;
        if (formData.sibling2Age) doc.text(`Sibling 2 Age: ${formData.sibling2Age}`, 30, yPos), yPos += 5;
        if (formData.siblingMilestonesAppropriate) doc.text(`Sibling attained milestones appropriately: ${formData.siblingMilestonesAppropriate}`, 30, yPos), yPos += 5;
        if (formData.timeSpentWithSiblings) doc.text(`Time spent with siblings (hours/day): ${formData.timeSpentWithSiblings}`, 30, yPos), yPos += 5;
        yPos += 3;
        
        // Grandparents
        checkNewPage(30);
        doc.setFont('helvetica', 'bold');
        doc.text('Grandparents:', 25, yPos);
        yPos += 5;
        doc.setFont('helvetica', 'normal');
        if (formData.paternalGrandfatherName) doc.text(`Paternal Grandfather Name: ${formData.paternalGrandfatherName}`, 30, yPos), yPos += 5;
        if (formData.paternalGrandmotherName) doc.text(`Paternal Grandmother Name: ${formData.paternalGrandmotherName}`, 30, yPos), yPos += 5;
        if (formData.maternalGrandfatherName) doc.text(`Maternal Grandfather Name: ${formData.maternalGrandfatherName}`, 30, yPos), yPos += 5;
        if (formData.maternalGrandmotherName) doc.text(`Maternal Grandmother Name: ${formData.maternalGrandmotherName}`, 30, yPos), yPos += 5;
        if (formData.timeSpentWithGrandparents) doc.text(`Time spent with Grandparents (hours/day): ${formData.timeSpentWithGrandparents}`, 30, yPos), yPos += 5;
        yPos += 3;
        
        // Family Medical History
        checkNewPage(40);
        doc.setFont('helvetica', 'bold');
        doc.text('Family Medical History:', 25, yPos);
        yPos += 5;
        doc.setFont('helvetica', 'normal');
        if (formData.paternalFamilyHistory) doc.text(`Paternal family history: ${formData.paternalFamilyHistory}`, 30, yPos), yPos += 5;
        if (formData.maternalFamilyHistory) doc.text(`Maternal family history: ${formData.maternalFamilyHistory}`, 30, yPos), yPos += 5;
        if (formData.familySpeechDelayHistory) doc.text(`Family member has speech delay: ${formData.familySpeechDelayHistory}`, 30, yPos), yPos += 5;
        if (formData.intellectualDisabilityInFamily) doc.text(`Intellectual disability in family: ${formData.intellectualDisabilityInFamily}`, 30, yPos), yPos += 5;
        if (formData.developmentalDelayInFamily) doc.text(`Developmental delay in family: ${formData.developmentalDelayInFamily}`, 30, yPos), yPos += 5;
        if (formData.autismInFamily) doc.text(`Autism in family: ${formData.autismInFamily}`, 30, yPos), yPos += 5;
        if (formData.whoIdentifiedFirst) doc.text(`Who first doubted the delay: ${formData.whoIdentifiedFirst}`, 30, yPos), yPos += 5;
        if (formData.whoSuggestedTherapy) doc.text(`Who suggested therapy: ${formData.whoSuggestedTherapy}`, 30, yPos), yPos += 5;
        if (formData.residenceType) doc.text(`Residence type: ${formData.residenceType}`, 30, yPos), yPos += 5;
        yPos += 3;
        
        // Parental Concerns
        checkNewPage(20);
        doc.setFont('helvetica', 'bold');
        doc.text('Parental Concerns:', 25, yPos);
        yPos += 5;
        doc.setFont('helvetica', 'normal');
        if (formData.parentalConcerns && formData.parentalConcerns.length > 0) {
          const concerns = Array.isArray(formData.parentalConcerns) ? formData.parentalConcerns : [formData.parentalConcerns];
          concerns.forEach((concern: string) => {
            checkNewPage();
            doc.text(`• ${concern}`, 30, yPos);
            yPos += 5;
          });
        }
        yPos += 3;
        
        // Family Tree
        checkNewPage(55);
        doc.setFont('helvetica', 'bold');
        doc.text('Family Tree:', 25, yPos);
        yPos += 5;
        doc.setFont('helvetica', 'normal');
        doc.text('(Space for family tree diagram)', 30, yPos);
        yPos += 50; // Reserve 50mm space for family tree
        yPos += 5;
        
        // Start new page for Section 3
        addPDFFooter(doc, doc.getCurrentPageInfo().pageNumber, 1);
        addPDFWatermark(doc);
        doc.addPage();
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text('COMPREHENSIVE CLINICAL REPORT (Continued)', pageWidth / 2, 20, { align: 'center' });
        yPos = 30;
        
        // Section 3: Personal History
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text('Section 3: Personal History', 20, yPos);
        yPos += 6;
        
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        if (formData.conceptionType) doc.text(`Conception type: ${formData.conceptionType}`, 25, yPos), yPos += 5;
        if (formData.pregnancyIssues && formData.pregnancyIssues.length > 0) {
          const issues = Array.isArray(formData.pregnancyIssues) ? formData.pregnancyIssues.join(', ') : formData.pregnancyIssues;
          doc.text(`Any issues during pregnancy: ${issues}`, 25, yPos);
          yPos += 5;
        }
        if (formData.deliveryType) doc.text(`Delivery type: ${formData.deliveryType}`, 25, yPos), yPos += 5;
        if (formData.assistanceRequiredAtBirth) doc.text(`Assistance required at birth: ${formData.assistanceRequiredAtBirth}`, 25, yPos), yPos += 5;
        if (formData.termType) doc.text(`Term type: ${formData.termType}`, 25, yPos), yPos += 5;
        if (formData.weeksOfGestation) doc.text(`Weeks of gestation: ${formData.weeksOfGestation}`, 25, yPos), yPos += 5;
        if (formData.birthWeight) doc.text(`Birth weight (kg): ${formData.birthWeight}`, 25, yPos), yPos += 5;
        if (formData.apgarScore) doc.text(`APGAR score: ${formData.apgarScore}`, 25, yPos), yPos += 5;
        yPos += 5;
        
        // Section 4: After Birth History
        checkNewPage(30);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text('Section 4: After Birth History', 20, yPos);
        yPos += 6;
        
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        if (formData.criedImmediately) doc.text(`Cried immediately after birth: ${formData.criedImmediately}`, 25, yPos), yPos += 5;
        if (formData.nicuAdmission) doc.text(`NICU admission: ${formData.nicuAdmission}`, 25, yPos), yPos += 5;
        if (formData.jaundice) doc.text(`Jaundice: ${formData.jaundice}`, 25, yPos), yPos += 5;
        if (formData.phototherapyDays) doc.text(`Phototherapy (days): ${formData.phototherapyDays}`, 25, yPos), yPos += 5;
        if (formData.etTubeDays) doc.text(`ET (days): ${formData.etTubeDays}`, 25, yPos), yPos += 5;
        if (formData.seizuresAtBirth) doc.text(`Seizures: ${formData.seizuresAtBirth}`, 25, yPos), yPos += 5;
        yPos += 5;
        
        // Section 5: Developmental History
        checkNewPage(30);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text('Section 5: Developmental History', 20, yPos);
        yPos += 6;
        
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        if (formData.socialSmileAge) doc.text(`Social smile (months): ${formData.socialSmileAge}`, 25, yPos), yPos += 5;
        if (formData.strangerAnxietyAge) doc.text(`Stranger anxiety (months): ${formData.strangerAnxietyAge}`, 25, yPos), yPos += 5;
        if (formData.nameCallResponseMonths) doc.text(`Name call response (months): ${formData.nameCallResponseMonths}`, 25, yPos), yPos += 5;
        if (formData.nameCallAdequacy) doc.text(`Name call adequacy: ${formData.nameCallAdequacy}`, 25, yPos), yPos += 5;
        if (formData.languageMilestoneDelay) doc.text(`Language milestones delayed against expected for age: ${formData.languageMilestoneDelay}`, 25, yPos), yPos += 5;
        yPos += 5;
        
        // Section 6: Medical History
        checkNewPage(30);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text('Section 6: Medical History', 20, yPos);
        yPos += 6;
        
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        if (formData.seizures) doc.text(`Seizures: ${formData.seizures}`, 25, yPos), yPos += 5;
        if (formData.seizureMedication) doc.text(`Seizure medication: ${formData.seizureMedication}`, 25, yPos), yPos += 5;
        if (formData.febrileSeizure) doc.text(`Febrile seizure: ${formData.febrileSeizure}`, 25, yPos), yPos += 5;
        if (formData.floppinessOrStiffness) doc.text(`Mother never felt any floppiness or stiffness in early childhood: ${formData.floppinessOrStiffness}`, 25, yPos), yPos += 5;
        if (formData.sleepPattern) doc.text(`Sleep pattern: ${formData.sleepPattern}`, 25, yPos), yPos += 5;
        if (formData.screenTimeHours) doc.text(`Screen time (hours/day): ${formData.screenTimeHours}`, 25, yPos), yPos += 5;
        yPos += 5;
        
        // Section 7: Screening Results (Auto-filled)
        checkNewPage(30);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text('Section 7: Screening Results (Auto-filled)', 20, yPos);
        yPos += 6;
        
        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.text('M-CHAT Screening:', 25, yPos);
        yPos += 5;
        doc.setFont('helvetica', 'normal');
        if (mchatData) {
          doc.text(`Total Score: ${mchatData.risk_score || mchatData.total_score || 'N/A'} / 20`, 30, yPos);
          yPos += 5;
          doc.text(`Risk Level: ${mchatData.risk_level || 'N/A'}`, 30, yPos);
          yPos += 5;
        } else {
          doc.text('Not completed', 30, yPos);
          yPos += 5;
        }
        yPos += 3;
        
        doc.setFont('helvetica', 'bold');
        doc.text('DSM Checklist:', 25, yPos);
        yPos += 5;
        doc.setFont('helvetica', 'normal');
        if (dsmData) {
          const answers = typeof dsmData.answers === 'string' ? JSON.parse(dsmData.answers) : dsmData.answers;
          // Count A criteria groups
          let aCount = 0;
          if (answers && answers['a1_abnormal_social_approach']) aCount++;
          if (answers && (answers['a2_impairments_eye_contact'] || answers['a2_impairment_body_postures'])) aCount++;
          if (answers && answers['a3_deficits_developing_relationships']) aCount++;
          
          // Count B criteria groups
          let bCount = 0;
          if (answers && (answers['b1_echolalia'] || answers['b1_repetitive_hand_movements'])) bCount++;
          if (answers && answers['b2_adherence_routine']) bCount++;
          if (answers && answers['b3_preoccupations']) bCount++;
          if (answers && answers['b4_high_tolerance_pain']) bCount++;
          
          doc.text(`A Criteria: ${aCount} / 3 groups`, 30, yPos);
          yPos += 5;
          doc.text(`B Criteria: ${bCount} / 4 groups`, 30, yPos);
          yPos += 5;
          doc.text(`C (Early Onset): ${answers && answers['c_symptoms_present_early'] === 'Yes' ? 'Yes' : 'No'}`, 30, yPos);
          yPos += 5;
          doc.text(`D (Clinical Impairment): ${answers && answers['d_deficits_cause_impairment'] === 'Yes' ? 'Yes' : 'No'}`, 30, yPos);
          yPos += 5;
          doc.text(`Final: ${dsmData.diagnosis || dsmData.interpretation || 'N/A'}`, 30, yPos);
          yPos += 5;
        } else {
          doc.text('Not completed', 30, yPos);
          yPos += 5;
        }
        yPos += 5;
        
        // Start new page for Section 8
        addPDFFooter(doc, doc.getCurrentPageInfo().pageNumber, 1);
        addPDFWatermark(doc);
        doc.addPage();
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text('COMPREHENSIVE CLINICAL REPORT (Continued)', pageWidth / 2, 20, { align: 'center' });
        yPos = 30;
        
        // Section 8: Final Clinical Impression
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text('Section 8: Final Clinical Impression', 20, yPos);
        yPos += 6;
        
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        if (formData.provisionalDiagnosis) {
          const diagLines = doc.splitTextToSize(`Provisional Diagnosis: ${formData.provisionalDiagnosis}`, pageWidth - 50);
          diagLines.forEach((line: string) => {
            checkNewPage();
            doc.text(line, 25, yPos);
            yPos += 5;
          });
        }
        yPos += 3;
        
        if (formData.recommendedTherapies && formData.recommendedTherapies.length > 0) {
          doc.setFont('helvetica', 'bold');
          doc.text('Recommended Therapies:', 25, yPos);
          yPos += 5;
          doc.setFont('helvetica', 'normal');
          const therapies = Array.isArray(formData.recommendedTherapies) ? formData.recommendedTherapies : [formData.recommendedTherapies];
          therapies.forEach((therapy: string) => {
            checkNewPage();
            doc.text(`• ${therapy}`, 30, yPos);
            yPos += 5;
          });
        }
        yPos += 3;
        
        if (formData.frequencyPerWeek) doc.text(`Frequency per week: ${formData.frequencyPerWeek} sessions`, 25, yPos), yPos += 5;
        yPos += 3;
        
        if (formData.doctorSignatureName) {
          doc.setFont('helvetica', 'bold');
          doc.text('Doctor Signature', 25, yPos);
          yPos += 5;
          doc.setFont('helvetica', 'normal');
          doc.text(`Name: ${formData.doctorSignatureName}`, 30, yPos);
          yPos += 5;
        }
      } else {
        doc.setFontSize(10);
        doc.setFont('helvetica', 'italic');
        doc.setTextColor(150, 150, 150);
        doc.text('No case sheet data available', 20, yPos);
        doc.setTextColor(0, 0, 0);
        yPos += 5;
      }

      // Start new page for M-CHAT
      addPDFFooter(doc, doc.getCurrentPageInfo().pageNumber, 1);
      addPDFWatermark(doc);
      doc.addPage();
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('COMPREHENSIVE CLINICAL REPORT (Continued)', pageWidth / 2, 20, { align: 'center' });
      yPos = 30;

      // M-CHAT - All Questions
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 0);
      doc.text('M-CHAT SCREENING', 20, yPos);
      yPos += 8;
      
      if (mchatData && Object.keys(mchatData).length > 0) {
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text(`Risk Score: ${mchatData.risk_score || mchatData.total_score || 'N/A'}`, 20, yPos);
        yPos += 6;
        doc.text(`Risk Level: ${mchatData.risk_level || 'N/A'}`, 20, yPos);
        yPos += 8;
        
        // Add all M-CHAT answers with questions
        if (mchatData.answers) {
          const answers = typeof mchatData.answers === 'string' ? JSON.parse(mchatData.answers) : mchatData.answers;
          MCHAT_QUESTIONS.forEach((question, idx) => {
            checkNewPage();
            const answer = answers[question.id] || 'Not Answered';
            const questionText = `${idx + 1}. ${question.text}`;
            
            // Render question text - ensure normal font
            doc.setFontSize(9);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(0, 0, 0);
            const lines = doc.splitTextToSize(questionText, pageWidth - 40);
            lines.forEach((line: string) => {
              doc.text(line, 20, yPos);
              yPos += 5;
            });
            
            // Render "Answer: " in black
            doc.setFontSize(9);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(0, 0, 0);
            doc.text('Answer: ', 25, yPos);
            
            // Render answer value with color
            const answerX = 25 + doc.getTextWidth('Answer: ');
            if (answer === 'Yes') {
              doc.setTextColor(34, 197, 94); // Green
            } else if (answer === 'No') {
              doc.setTextColor(239, 68, 68); // Red
            } else {
              doc.setTextColor(0, 0, 0); // Black for other answers
            }
            doc.text(String(answer), answerX, yPos);
            doc.setTextColor(0, 0, 0); // Reset to black
            yPos += 6;
          });
        }
      } else {
        doc.setFontSize(10);
        doc.setFont('helvetica', 'italic');
        doc.setTextColor(150, 150, 150);
        doc.text('No M-CHAT data available', 20, yPos);
        doc.setTextColor(0, 0, 0);
        yPos += 5;
      }

      // Start new page for DSM
      addPDFFooter(doc, doc.getCurrentPageInfo().pageNumber, 1);
      addPDFWatermark(doc);
      doc.addPage();
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('COMPREHENSIVE CLINICAL REPORT (Continued)', pageWidth / 2, 20, { align: 'center' });
      yPos = 30;

      // DSM - All Criteria
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 0);
      doc.text('DSM-5 CHECKLIST', 20, yPos);
      yPos += 8;

      if (dsmData && Object.keys(dsmData).length > 0) {
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text(`Criteria Met: ${dsmData.criteria_met || dsmData.meets_criteria || 'N/A'}`, 20, yPos);
        yPos += 6;
        doc.text(`Diagnosis: ${dsmData.diagnosis || dsmData.interpretation || 'N/A'}`, 20, yPos);
        yPos += 8;
        
        // Add all DSM criteria with questions
        if (dsmData.answers) {
          const answers = typeof dsmData.answers === 'string' ? JSON.parse(dsmData.answers) : dsmData.answers;
          
          Object.entries(DSM_QUESTIONS).forEach(([key, section]) => {
            checkNewPage(15);
            doc.setFont('helvetica', 'bold');
            doc.text(section.title, 20, yPos);
            yPos += 6;
            doc.setFont('helvetica', 'normal');
            
            section.questions.forEach((question) => {
              if (!question.isHeading) {
                checkNewPage();
                const answer = answers[question.id] || 'Not Answered';
                const questionText = `• ${question.text}`;
                
                // Render question text - ensure normal font
                doc.setFontSize(9);
                doc.setFont('helvetica', 'normal');
                doc.setTextColor(0, 0, 0);
                const lines = doc.splitTextToSize(questionText, pageWidth - 45);
                lines.forEach((line: string) => {
                  doc.text(line, 25, yPos);
                  yPos += 5;
                });
                
                // Render "Answer: " in black
                doc.setFontSize(9);
                doc.setFont('helvetica', 'normal');
                doc.setTextColor(0, 0, 0);
                doc.text('Answer: ', 30, yPos);
                
                // Render answer value with color
                const answerX = 30 + doc.getTextWidth('Answer: ');
                if (answer === 'Yes') {
                  doc.setTextColor(34, 197, 94); // Green
                } else if (answer === 'No') {
                  doc.setTextColor(239, 68, 68); // Red
                } else {
                  doc.setTextColor(0, 0, 0); // Black for other answers
                }
                doc.text(String(answer), answerX, yPos);
                doc.setTextColor(0, 0, 0); // Reset to black
                yPos += 6;
              } else {
                checkNewPage();
                doc.setFontSize(10);
                doc.setFont('helvetica', 'bold');
                doc.setTextColor(0, 0, 0);
                doc.text(question.text, 25, yPos);
                yPos += 6;
              }
            });
            yPos += 3;
          });
        }
      } else {
        doc.setFontSize(10);
        doc.setFont('helvetica', 'italic');
        doc.setTextColor(150, 150, 150);
        doc.text('No DSM-5 data available', 20, yPos);
        doc.setTextColor(0, 0, 0);
        yPos += 5;
      }

      // Start new page for Cognitive Milestones
      addPDFFooter(doc, doc.getCurrentPageInfo().pageNumber, 1);
      addPDFWatermark(doc);
      doc.addPage();
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('COMPREHENSIVE CLINICAL REPORT (Continued)', pageWidth / 2, 20, { align: 'center' });
      yPos = 30;

      // Cognitive Milestones - All Questions
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 0);
      doc.text('COGNITIVE MILESTONES', 20, yPos);
      yPos += 8;
      
      if (cognitive && cognitive.length > 0) {
        cognitive.forEach((assessment: any, index: number) => {
          if (index > 0) {
            checkNewPage(20);
            doc.setFontSize(12);
            doc.setFont('helvetica', 'bold');
            doc.text('COGNITIVE MILESTONES (Additional Assessment)', 20, yPos);
            yPos += 6;
          }
          
          doc.setFontSize(10);
          doc.setFont('helvetica', 'normal');
          doc.text(`Age: ${assessment.age} months`, 20, yPos);
          yPos += 6;
          doc.text(`Date: ${new Date(assessment.created_at).toLocaleDateString()}`, 20, yPos);
          yPos += 8;
          
          if (assessment.answers) {
            const answers = typeof assessment.answers === 'string' ? JSON.parse(assessment.answers) : assessment.answers;
            const milestones = COGNITIVE_MILESTONES[parseInt(assessment.age)] || [];
            
            milestones.forEach((milestone, idx) => {
              checkNewPage();
              const answer = answers[milestone.id] || 'Not Answered';
              const questionText = `${idx + 1}. ${milestone.text}`;
              
              // Render question text - ensure normal font
              doc.setFontSize(9);
              doc.setFont('helvetica', 'normal');
              doc.setTextColor(0, 0, 0);
              const lines = doc.splitTextToSize(questionText, pageWidth - 40);
              lines.forEach((line: string) => {
                doc.text(line, 20, yPos);
                yPos += 5;
              });
              
              // Render "Answer: " in black
              doc.setFontSize(9);
              doc.setFont('helvetica', 'normal');
              doc.setTextColor(0, 0, 0);
              doc.text('Answer: ', 25, yPos);
              
              // Render answer value with color
              const answerX = 25 + doc.getTextWidth('Answer: ');
              if (answer === 'Yes') {
                doc.setTextColor(34, 197, 94); // Green
              } else if (answer === 'No') {
                doc.setTextColor(239, 68, 68); // Red
              } else {
                doc.setTextColor(0, 0, 0); // Black for other answers
              }
              doc.text(String(answer), answerX, yPos);
              doc.setTextColor(0, 0, 0); // Reset to black
              yPos += 6;
            });
          }
          yPos += 5;
        });
      } else {
        doc.setFontSize(10);
        doc.setFont('helvetica', 'italic');
        doc.setTextColor(150, 150, 150);
        doc.text('No cognitive milestones data available', 20, yPos);
        doc.setTextColor(0, 0, 0);
        yPos += 5;
      }

      // Start new page for Fine Motor Skills
      addPDFFooter(doc, doc.getCurrentPageInfo().pageNumber, 1);
      addPDFWatermark(doc);
      doc.addPage();
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('COMPREHENSIVE CLINICAL REPORT (Continued)', pageWidth / 2, 20, { align: 'center' });
      yPos = 30;

      // Fine Motor Skills - All Questions
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 0);
      doc.text('FINE MOTOR SKILLS', 20, yPos);
      yPos += 8;
      
      if (fineMotor && fineMotor.length > 0) {
        fineMotor.forEach((assessment: any, index: number) => {
          if (index > 0) {
            checkNewPage(20);
            doc.setFontSize(12);
            doc.setFont('helvetica', 'bold');
            doc.text('FINE MOTOR SKILLS (Additional Assessment)', 20, yPos);
            yPos += 6;
          }
          
          doc.setFontSize(10);
          doc.setFont('helvetica', 'normal');
          doc.text(`Age: ${assessment.age} months`, 20, yPos);
          yPos += 6;
          doc.text(`Date: ${new Date(assessment.created_at).toLocaleDateString()}`, 20, yPos);
          yPos += 8;
          
          if (assessment.answers) {
            const answers = typeof assessment.answers === 'string' ? JSON.parse(assessment.answers) : assessment.answers;
            const skills = FINE_MOTOR_SKILLS[parseInt(assessment.age)] || [];
            
            skills.forEach((skill, idx) => {
              checkNewPage();
              const answer = answers[skill.id] || 'Not Answered';
              const questionText = `${idx + 1}. ${skill.text}`;
              
              // Render question text - ensure normal font
              doc.setFontSize(9);
              doc.setFont('helvetica', 'normal');
              doc.setTextColor(0, 0, 0);
              const lines = doc.splitTextToSize(questionText, pageWidth - 40);
              lines.forEach((line: string) => {
                doc.text(line, 20, yPos);
                yPos += 5;
              });
              
              // Render "Answer: " in black
              doc.setFontSize(9);
              doc.setFont('helvetica', 'normal');
              doc.setTextColor(0, 0, 0);
              doc.text('Answer: ', 25, yPos);
              
              // Render answer value with color
              const answerX = 25 + doc.getTextWidth('Answer: ');
              if (answer === 'Yes') {
                doc.setTextColor(34, 197, 94); // Green
              } else if (answer === 'No') {
                doc.setTextColor(239, 68, 68); // Red
              } else {
                doc.setTextColor(0, 0, 0); // Black for other answers
              }
              doc.text(String(answer), answerX, yPos);
              doc.setTextColor(0, 0, 0); // Reset to black
              yPos += 6;
            });
          }
          yPos += 5;
        });
      } else {
        doc.setFontSize(10);
        doc.setFont('helvetica', 'italic');
        doc.setTextColor(150, 150, 150);
        doc.text('No fine motor skills data available', 20, yPos);
        doc.setTextColor(0, 0, 0);
        yPos += 5;
      }

      // Start new page for Gross Motor Skills
      addPDFFooter(doc, doc.getCurrentPageInfo().pageNumber, 1);
      addPDFWatermark(doc);
      doc.addPage();
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('COMPREHENSIVE CLINICAL REPORT (Continued)', pageWidth / 2, 20, { align: 'center' });
      yPos = 30;

      // Gross Motor Skills - All Questions
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 0);
      doc.text('GROSS MOTOR SKILLS', 20, yPos);
      yPos += 8;
      
      if (grossMotor && grossMotor.length > 0) {
        grossMotor.forEach((assessment: any, index: number) => {
          if (index > 0) {
            checkNewPage(20);
            doc.setFontSize(12);
            doc.setFont('helvetica', 'bold');
            doc.text('GROSS MOTOR SKILLS (Additional Assessment)', 20, yPos);
            yPos += 6;
          }
          
          doc.setFontSize(10);
          doc.setFont('helvetica', 'normal');
          doc.text(`Age: ${assessment.age} months`, 20, yPos);
          yPos += 6;
          doc.text(`Date: ${new Date(assessment.created_at).toLocaleDateString()}`, 20, yPos);
          yPos += 8;
          
          if (assessment.answers) {
            const answers = typeof assessment.answers === 'string' ? JSON.parse(assessment.answers) : assessment.answers;
            const skills = GROSS_MOTOR_SKILLS[parseInt(assessment.age)] || [];
            
            skills.forEach((skill, idx) => {
              checkNewPage();
              const answer = answers[skill.id] || 'Not Answered';
              const questionText = `${idx + 1}. ${skill.text}`;
              
              // Render question text - ensure normal font
              doc.setFontSize(9);
              doc.setFont('helvetica', 'normal');
              doc.setTextColor(0, 0, 0);
              const lines = doc.splitTextToSize(questionText, pageWidth - 40);
              lines.forEach((line: string) => {
                doc.text(line, 20, yPos);
                yPos += 5;
              });
              
              // Render "Answer: " in black
              doc.setFontSize(9);
              doc.setFont('helvetica', 'normal');
              doc.setTextColor(0, 0, 0);
              doc.text('Answer: ', 25, yPos);
              
              // Render answer value with color
              const answerX = 25 + doc.getTextWidth('Answer: ');
              if (answer === 'Yes') {
                doc.setTextColor(34, 197, 94); // Green
              } else if (answer === 'No') {
                doc.setTextColor(239, 68, 68); // Red
              } else {
                doc.setTextColor(0, 0, 0); // Black for other answers
              }
              doc.text(String(answer), answerX, yPos);
              doc.setTextColor(0, 0, 0); // Reset to black
              yPos += 6;
            });
          }
          yPos += 5;
        });
      } else {
        doc.setFontSize(10);
        doc.setFont('helvetica', 'italic');
        doc.setTextColor(150, 150, 150);
        doc.text('No gross motor skills data available', 20, yPos);
        doc.setTextColor(0, 0, 0);
        yPos += 5;
      }

      // Start new page for Language Development
      addPDFFooter(doc, doc.getCurrentPageInfo().pageNumber, 1);
      addPDFWatermark(doc);
      doc.addPage();
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('COMPREHENSIVE CLINICAL REPORT (Continued)', pageWidth / 2, 20, { align: 'center' });
      yPos = 30;

      // Language Development - All Questions
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 0);
      doc.text('LANGUAGE DEVELOPMENT', 20, yPos);
      yPos += 8;
      
      if (language && language.length > 0) {
        language.forEach((assessment: any, index: number) => {
          if (index > 0) {
            checkNewPage(20);
            doc.setFontSize(12);
            doc.setFont('helvetica', 'bold');
            doc.text('LANGUAGE DEVELOPMENT (Additional Assessment)', 20, yPos);
            yPos += 6;
          }
          
          doc.setFontSize(10);
          doc.setFont('helvetica', 'normal');
          doc.text(`Age: ${assessment.age} months`, 20, yPos);
          yPos += 6;
          doc.text(`Date: ${new Date(assessment.created_at).toLocaleDateString()}`, 20, yPos);
          yPos += 8;
          
          if (assessment.answers) {
            const answers = typeof assessment.answers === 'string' ? JSON.parse(assessment.answers) : assessment.answers;
            const skills = LANGUAGE_DEVELOPMENT[parseInt(assessment.age)] || [];
            
            skills.forEach((skill, idx) => {
              checkNewPage();
              const answer = answers[skill.id] || 'Not Answered';
              const questionText = `${idx + 1}. ${skill.text}`;
              
              // Render question text - ensure normal font
              doc.setFontSize(9);
              doc.setFont('helvetica', 'normal');
              doc.setTextColor(0, 0, 0);
              const lines = doc.splitTextToSize(questionText, pageWidth - 40);
              lines.forEach((line: string) => {
                doc.text(line, 20, yPos);
                yPos += 5;
              });
              
              // Render "Answer: " in black
              doc.setFontSize(9);
              doc.setFont('helvetica', 'normal');
              doc.setTextColor(0, 0, 0);
              doc.text('Answer: ', 25, yPos);
              
              // Render answer value with color
              const answerX = 25 + doc.getTextWidth('Answer: ');
              if (answer === 'Yes') {
                doc.setTextColor(34, 197, 94); // Green
              } else if (answer === 'No') {
                doc.setTextColor(239, 68, 68); // Red
              } else {
                doc.setTextColor(0, 0, 0); // Black for other answers
              }
              doc.text(String(answer), answerX, yPos);
              doc.setTextColor(0, 0, 0); // Reset to black
              yPos += 6;
            });
          }
          yPos += 5;
        });
      } else {
        doc.setFontSize(10);
        doc.setFont('helvetica', 'italic');
        doc.setTextColor(150, 150, 150);
        doc.text('No language development data available', 20, yPos);
        doc.setTextColor(0, 0, 0);
        yPos += 5;
      }

      // Start new page for Social-Emotional Development
      addPDFFooter(doc, doc.getCurrentPageInfo().pageNumber, 1);
      addPDFWatermark(doc);
      doc.addPage();
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('COMPREHENSIVE CLINICAL REPORT (Continued)', pageWidth / 2, 20, { align: 'center' });
      yPos = 30;

      // Social-Emotional - All Questions
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 0);
      doc.text('SOCIAL-EMOTIONAL DEVELOPMENT', 20, yPos);
      yPos += 8;
      
      if (social && social.length > 0) {
        social.forEach((assessment: any, index: number) => {
          if (index > 0) {
            checkNewPage(20);
            doc.setFontSize(12);
            doc.setFont('helvetica', 'bold');
            doc.text('SOCIAL-EMOTIONAL DEVELOPMENT (Additional Assessment)', 20, yPos);
            yPos += 6;
          }
          
          doc.setFontSize(10);
          doc.setFont('helvetica', 'normal');
          doc.text(`Age: ${assessment.age} months`, 20, yPos);
          yPos += 6;
          doc.text(`Date: ${new Date(assessment.created_at).toLocaleDateString()}`, 20, yPos);
          yPos += 8;
          
          if (assessment.answers) {
            const answers = typeof assessment.answers === 'string' ? JSON.parse(assessment.answers) : assessment.answers;
            const skills = SOCIAL_EMOTIONAL[parseInt(assessment.age)] || [];
            
            skills.forEach((skill, idx) => {
              checkNewPage();
              const answer = answers[skill.id] || 'Not Answered';
              const questionText = `${idx + 1}. ${skill.text}`;
              
              // Render question text - ensure normal font
              doc.setFontSize(9);
              doc.setFont('helvetica', 'normal');
              doc.setTextColor(0, 0, 0);
              const lines = doc.splitTextToSize(questionText, pageWidth - 40);
              lines.forEach((line: string) => {
                doc.text(line, 20, yPos);
                yPos += 5;
              });
              
              // Render "Answer: " in black
              doc.setFontSize(9);
              doc.setFont('helvetica', 'normal');
              doc.setTextColor(0, 0, 0);
              doc.text('Answer: ', 25, yPos);
              
              // Render answer value with color
              const answerX = 25 + doc.getTextWidth('Answer: ');
              if (answer === 'Yes') {
                doc.setTextColor(34, 197, 94); // Green
              } else if (answer === 'No') {
                doc.setTextColor(239, 68, 68); // Red
              } else {
                doc.setTextColor(0, 0, 0); // Black for other answers
              }
              doc.text(String(answer), answerX, yPos);
              doc.setTextColor(0, 0, 0); // Reset to black
              yPos += 6;
            });
          }
          yPos += 5;
        });
      } else {
        doc.setFontSize(10);
        doc.setFont('helvetica', 'italic');
        doc.setTextColor(150, 150, 150);
        doc.text('No social-emotional development data available', 20, yPos);
        doc.setTextColor(0, 0, 0);
        yPos += 5;
      }

      // Footer and watermark on all pages
      const pageCount = doc.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        addPDFWatermark(doc);
        addPDFFooter(doc, i, pageCount);
      }

      // Save PDF
      doc.save(`${child.name}_Full_Clinical_Report_${new Date().toISOString().split('T')[0]}.pdf`);
      setToast({ message: 'Comprehensive clinical report downloaded successfully!', type: 'success' });
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
          
          {/* Download Full Clinical Data Button */}
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
