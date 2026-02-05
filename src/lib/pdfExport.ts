import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Session, Child } from './localStorage';

export const generateSessionPDF = (
  session: Session,
  childName: string,
  doctorName: string,
  childDetails?: Child
) => {
  const doc = new jsPDF();
  
  // Header
  doc.setFillColor(102, 126, 234);
  doc.rect(0, 0, 210, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('Smilestones', 105, 15, { align: 'center' });
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.text('Child Development Centre', 105, 25, { align: 'center' });
  
  doc.setFontSize(12);
  doc.text('Therapy Session Report', 105, 33, { align: 'center' });
  
  // Reset text color
  doc.setTextColor(0, 0, 0);
  
  let yPos = 50;
  
  // Session Information
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Session Information', 14, yPos);
  yPos += 10;
  
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  
  const sessionInfo = [
    ['Child Name:', childName],
    ['Doctor:', doctorName],
    ['Date:', new Date(session.date).toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })],
    ['Attendance:', session.attendance ? 'Present' : 'Absent'],
    ['Overall Skill Level:', session.skill_level.charAt(0).toUpperCase() + session.skill_level.slice(1)],
  ];
  
  sessionInfo.forEach(([label, value]) => {
    doc.setFont('helvetica', 'bold');
    doc.text(label, 14, yPos);
    doc.setFont('helvetica', 'normal');
    doc.text(value, 60, yPos);
    yPos += 7;
  });
  
  yPos += 5;
  
  // Progress Indicators
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Progress Indicators', 14, yPos);
  yPos += 10;
  
  const progressData = [
    ['Eye Contact', session.eye_contact ? '✓ Yes' : '✗ No'],
    ['Follow Instructions', session.follow_instructions ? '✓ Yes' : '✗ No'],
    ['Speech Attempt', session.speech_attempt ? '✓ Yes' : '✗ No'],
    ['Motor Improvement', session.motor_improvement ? '✓ Yes' : '✗ No'],
  ];
  
  autoTable(doc, {
    startY: yPos,
    head: [['Indicator', 'Status']],
    body: progressData,
    theme: 'grid',
    headStyles: { fillColor: [102, 126, 234], textColor: 255 },
    styles: { fontSize: 10 },
    columnStyles: {
      0: { cellWidth: 80 },
      1: { cellWidth: 40, halign: 'center' },
    },
  });
  
  yPos = (doc as any).lastAutoTable.finalY + 10;
  
  // Activities
  if (session.activities.length > 0) {
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Activities Performed', 14, yPos);
    yPos += 10;
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    
    const activitiesText = session.activities.join(', ');
    const splitActivities = doc.splitTextToSize(activitiesText, 180);
    doc.text(splitActivities, 14, yPos);
    yPos += splitActivities.length * 7 + 5;
  }
  
  // Session Notes
  if (session.notes) {
    // Check if we need a new page
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }
    
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Session Notes', 14, yPos);
    yPos += 10;
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    const splitNotes = doc.splitTextToSize(session.notes, 180);
    doc.text(splitNotes, 14, yPos);
    yPos += splitNotes.length * 7 + 5;
  }
  
  // Next Goal
  if (session.next_goal) {
    // Check if we need a new page
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }
    
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Next Session Goal', 14, yPos);
    yPos += 10;
    
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    const splitGoal = doc.splitTextToSize(session.next_goal, 180);
    doc.text(splitGoal, 14, yPos);
    yPos += splitGoal.length * 7 + 5;
  }
  
  // Footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(9);
    doc.setTextColor(128, 128, 128);
    doc.text(
      `Page ${i} of ${pageCount}`,
      105,
      290,
      { align: 'center' }
    );
    doc.text(
      `Generated on ${new Date().toLocaleDateString()}`,
      14,
      290
    );
  }
  
  // Save the PDF
  const fileName = `Session_${childName.replace(/\s+/g, '_')}_${session.date}.pdf`;
  doc.save(fileName);
};

export const generateChildReportPDF = (
  child: Child,
  sessions: Session[],
  doctorName?: string
) => {
  const doc = new jsPDF();
  
  // Header
  doc.setFillColor(102, 126, 234);
  doc.rect(0, 0, 210, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('Smilestones', 105, 15, { align: 'center' });
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.text('Child Development Centre', 105, 25, { align: 'center' });
  
  doc.setFontSize(12);
  doc.text('Child Progress Report', 105, 33, { align: 'center' });
  
  // Reset text color
  doc.setTextColor(0, 0, 0);
  
  let yPos = 50;
  
  // Child Information
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Child Information', 14, yPos);
  yPos += 10;
  
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  
  const childInfo = [
    ['Name:', child.name],
    ['Age:', `${child.age} years`],
    ['Diagnosis:', child.diagnosis],
    ['Parent/Guardian:', child.parent_name],
    ['Phone:', child.phone],
    ['Assigned Doctor:', doctorName || 'Not assigned'],
    ['Total Sessions:', sessions.length.toString()],
  ];
  
  childInfo.forEach(([label, value]) => {
    doc.setFont('helvetica', 'bold');
    doc.text(label, 14, yPos);
    doc.setFont('helvetica', 'normal');
    doc.text(value, 60, yPos);
    yPos += 7;
  });
  
  yPos += 10;
  
  // Sessions Summary
  if (sessions.length > 0) {
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Sessions Summary', 14, yPos);
    yPos += 10;
    
    const sessionsData = sessions.map(session => [
      new Date(session.date).toLocaleDateString(),
      session.attendance ? 'Present' : 'Absent',
      session.skill_level.charAt(0).toUpperCase() + session.skill_level.slice(1),
      [
        session.eye_contact ? 'Eye Contact' : '',
        session.follow_instructions ? 'Instructions' : '',
        session.speech_attempt ? 'Speech' : '',
        session.motor_improvement ? 'Motor' : '',
      ].filter(Boolean).join(', ') || 'None',
    ]);
    
    autoTable(doc, {
      startY: yPos,
      head: [['Date', 'Attendance', 'Skill Level', 'Progress']],
      body: sessionsData,
      theme: 'grid',
      headStyles: { fillColor: [102, 126, 234], textColor: 255 },
      styles: { fontSize: 9 },
      columnStyles: {
        0: { cellWidth: 35 },
        1: { cellWidth: 30 },
        2: { cellWidth: 30 },
        3: { cellWidth: 85 },
      },
    });
  } else {
    doc.setFontSize(11);
    doc.setFont('helvetica', 'italic');
    doc.text('No sessions recorded yet.', 14, yPos);
  }
  
  // Footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(9);
    doc.setTextColor(128, 128, 128);
    doc.text(
      `Page ${i} of ${pageCount}`,
      105,
      290,
      { align: 'center' }
    );
    doc.text(
      `Generated on ${new Date().toLocaleDateString()}`,
      14,
      290
    );
  }
  
  // Save the PDF
  const fileName = `Report_${child.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(fileName);
};
