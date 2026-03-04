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
      
      if (caseSheetData && Object.keys(caseSheetData).length > 0) {
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        
        // Add all case sheet fields
        const fields = Object.keys(caseSheetData);
        fields.forEach(field => {
          if (field !== 'id' && field !== 'child_id' && field !== 'created_at' && field !== 'updated_at' && field !== 'data' && field !== 'auto_section') {
            checkNewPage();
            const label = field.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            const value = caseSheetData[field];
            
            // Skip if value is null or undefined
            if (value === null || value === undefined) {
              return;
            }
            
            // Handle different value types
            let displayValue;
            if (Array.isArray(value)) {
              displayValue = value.join(', ');
            } else if (typeof value === 'object') {
              displayValue = JSON.stringify(value);
            } else {
              displayValue = String(value);
            }
            
            // Skip if empty
            if (!displayValue || displayValue === '{}' || displayValue === '[]') {
              return;
            }
            
            const lines = doc.splitTextToSize(`${label}: ${displayValue}`, pageWidth - 40);
            lines.forEach((line: string) => {
              doc.text(line, 20, yPos);
              yPos += 5;
            });
          }
        });
      } else {
        doc.setFontSize(10);
        doc.setFont('helvetica', 'italic');
        doc.setTextColor(150, 150, 150);
        doc.text('No case sheet data available', 20, yPos);
        doc.setTextColor(0, 0, 0);
        yPos += 5;
      }
      yPos += 10;

      // M-CHAT - All Questions
      checkNewPage(30);
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 0);
      doc.text('M-CHAT SCREENING', 20, yPos);
      yPos += 8;
      
      // Handle both array and single object responses
      const mchatData = Array.isArray(mchat) ? mchat[0] : mchat;
      
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
              doc.setFontSize(9);
              doc.setFont('helvetica', 'normal');
              const lines = doc.splitTextToSize(questionText, pageWidth - 40);
            lines.forEach((line: string) => {
              doc.text(line, 20, yPos);
              yPos += 5;
            });
              doc.text('Answer: ', 25, yPos);
              const answerX = 25 + doc.getTextWidth('Answer: ');
              // Color code only the answer value
              if (answer === 'Yes') {
                doc.setTextColor(34, 197, 94); // Green
              } else if (answer === 'No') {
                doc.setTextColor(239, 68, 68); // Red
              }
              doc.text(answer, answerX, yPos);
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
      yPos += 10;

      // DSM - All Criteria
      checkNewPage(30);
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 0);
      doc.text('DSM-5 CHECKLIST', 20, yPos);
      yPos += 8;

      // Handle both array and single object responses
      const dsmData = Array.isArray(dsm) ? dsm[0] : dsm;

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
              doc.setFontSize(9);
              doc.setFont('helvetica', 'normal');
              const lines = doc.splitTextToSize(questionText, pageWidth - 45);
                lines.forEach((line: string) => {
                  doc.text(line, 25, yPos);
                  yPos += 5;
                });
              doc.text('Answer: ', 30, yPos);
              const answerX = 30 + doc.getTextWidth('Answer: ');
              // Color code only the answer value
              if (answer === 'Yes') {
                doc.setTextColor(34, 197, 94); // Green
              } else if (answer === 'No') {
                doc.setTextColor(239, 68, 68); // Red
              }
              doc.text(answer, answerX, yPos);
              doc.setTextColor(0, 0, 0); // Reset to black
                yPos += 6;
              } else {
                checkNewPage();
                doc.setFont('helvetica', 'bold');
                doc.text(question.text, 25, yPos);
                doc.setFont('helvetica', 'normal');
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
      yPos += 10;

      // Cognitive Milestones - All Questions
      checkNewPage(30);
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
              doc.setFontSize(9);
              doc.setFont('helvetica', 'normal');
              const lines = doc.splitTextToSize(questionText, pageWidth - 40);
              lines.forEach((line: string) => {
                doc.text(line, 20, yPos);
                yPos += 5;
              });
              doc.text('Answer: ', 25, yPos);
              const answerX = 25 + doc.getTextWidth('Answer: ');
              // Color code only the answer value
              if (answer === 'Yes') {
                doc.setTextColor(34, 197, 94); // Green
              } else if (answer === 'No') {
                doc.setTextColor(239, 68, 68); // Red
              }
              doc.text(answer, answerX, yPos);
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
      yPos += 10;

      // Fine Motor Skills - All Questions
      checkNewPage(30);
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
              doc.setFontSize(9);
              doc.setFont('helvetica', 'normal');
              const lines = doc.splitTextToSize(questionText, pageWidth - 40);
              lines.forEach((line: string) => {
                doc.text(line, 20, yPos);
                yPos += 5;
              });
              doc.text('Answer: ', 25, yPos);
              const answerX = 25 + doc.getTextWidth('Answer: ');
              // Color code only the answer value
              if (answer === 'Yes') {
                doc.setTextColor(34, 197, 94); // Green
              } else if (answer === 'No') {
                doc.setTextColor(239, 68, 68); // Red
              }
              doc.text(answer, answerX, yPos);
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
      yPos += 10;

      // Gross Motor Skills - All Questions
      checkNewPage(30);
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
              doc.setFontSize(9);
              doc.setFont('helvetica', 'normal');
              const lines = doc.splitTextToSize(questionText, pageWidth - 40);
              lines.forEach((line: string) => {
                doc.text(line, 20, yPos);
                yPos += 5;
              });
              doc.text('Answer: ', 25, yPos);
              const answerX = 25 + doc.getTextWidth('Answer: ');
              // Color code only the answer value
              if (answer === 'Yes') {
                doc.setTextColor(34, 197, 94); // Green
              } else if (answer === 'No') {
                doc.setTextColor(239, 68, 68); // Red
              }
              doc.text(answer, answerX, yPos);
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
      yPos += 10;

      // Language Development - All Questions
      checkNewPage(30);
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
              doc.setFontSize(9);
              doc.setFont('helvetica', 'normal');
              const lines = doc.splitTextToSize(questionText, pageWidth - 40);
              lines.forEach((line: string) => {
                doc.text(line, 20, yPos);
                yPos += 5;
              });
              doc.text('Answer: ', 25, yPos);
              const answerX = 25 + doc.getTextWidth('Answer: ');
              // Color code only the answer value
              if (answer === 'Yes') {
                doc.setTextColor(34, 197, 94); // Green
              } else if (answer === 'No') {
                doc.setTextColor(239, 68, 68); // Red
              }
              doc.text(answer, answerX, yPos);
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
      yPos += 10;

      // Social-Emotional - All Questions
      checkNewPage(30);
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
              doc.setFontSize(9);
              doc.setFont('helvetica', 'normal');
              const lines = doc.splitTextToSize(questionText, pageWidth - 40);
              lines.forEach((line: string) => {
                doc.text(line, 20, yPos);
                yPos += 5;
              });
              doc.text('Answer: ', 25, yPos);
              const answerX = 25 + doc.getTextWidth('Answer: ');
              // Color code only the answer value
              if (answer === 'Yes') {
                doc.setTextColor(34, 197, 94); // Green
              } else if (answer === 'No') {
                doc.setTextColor(239, 68, 68); // Red
              }
              doc.text(answer, answerX, yPos);
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
