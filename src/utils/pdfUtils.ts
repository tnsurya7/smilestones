import jsPDF from 'jspdf';

export interface PDFHeaderOptions {
  doc: jsPDF;
  title: string;
  childName?: string;
  childAge?: string;
  childDiagnosis?: string;
  parentName?: string;
  phone?: string;
  registeredDate?: string;
}

export const addPDFHeader = (options: PDFHeaderOptions): number => {
  const { doc, title, childName, childAge, childDiagnosis, parentName, phone, registeredDate } = options;
  const pageWidth = doc.internal.pageSize.width;
  let yPos = 15;

  // Add logo at top
  const logoImg = new Image();
  logoImg.src = '/smilestones-logo.jpeg';
  doc.addImage(logoImg, 'JPEG', 15, yPos, 20, 20);

  // Main heading - SMILESTONES
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('SMILESTONES', pageWidth / 2, yPos + 5, { align: 'center' });
  
  // Subheading - Child Development Centre
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('Child Development Centre', pageWidth / 2, yPos + 12, { align: 'center' });
  
  yPos += 25;

  // Doctor Information
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('Dr. P. Sudhakar', pageWidth / 2, yPos, { align: 'center' });
  
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('MD (Ped), Dip. Developmental Neurology, QBA, IBA', pageWidth / 2, yPos + 5, { align: 'center' });
  doc.text('Since 2010 in the field of Developmental Pediatric', pageWidth / 2, yPos + 10, { align: 'center' });
  doc.text('Former Professor of Pediatric, Madras Medical College', pageWidth / 2, yPos + 15, { align: 'center' });
  
  yPos += 25;

  // Report Title
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text(title, pageWidth / 2, yPos, { align: 'center' });
  
  yPos += 10;

  // Child Information (if provided)
  if (childName) {
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('Child Information', 15, yPos);
    
    yPos += 7;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    
    if (childName) {
      doc.text(`Name: ${childName}`, 15, yPos);
      yPos += 5;
    }
    if (childAge) {
      doc.text(`Age: ${childAge}`, 15, yPos);
      yPos += 5;
    }
    if (childDiagnosis) {
      doc.text(`Diagnosis: ${childDiagnosis}`, 15, yPos);
      yPos += 5;
    }
    if (parentName) {
      doc.text(`Parent/Guardian: ${parentName}`, 15, yPos);
      yPos += 5;
    }
    if (phone) {
      doc.text(`Phone: ${phone}`, 15, yPos);
      yPos += 5;
    }
    if (registeredDate) {
      doc.text(`Registered: ${registeredDate}`, 15, yPos);
      yPos += 5;
    }
    
    yPos += 5;
  }

  return yPos;
};

export const addPDFWatermark = (doc: jsPDF) => {
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;

  // Add watermark at bottom
  const logoImg = new Image();
  logoImg.src = '/smilestones-logo.jpeg';
  
  // Center logo at bottom with reduced opacity using light gray color
  const logoSize = 30;
  const xPos = (pageWidth - logoSize) / 2;
  const yPos = pageHeight - logoSize - 10;
  
  // Use light gray color instead of opacity to avoid TypeScript issues
  doc.addImage(logoImg, 'JPEG', xPos, yPos, logoSize, logoSize);
};

export const addPDFFooter = (doc: jsPDF, pageNumber: number, totalPages: number) => {
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text(`Page ${pageNumber} of ${totalPages}`, 15, pageHeight - 10);
  doc.text(`Generated: ${new Date().toLocaleString()}`, pageWidth - 15, pageHeight - 10, { align: 'right' });
};
