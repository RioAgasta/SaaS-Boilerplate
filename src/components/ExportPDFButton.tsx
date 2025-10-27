'use client';

import { Download } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';

type ExportPDFButtonProps = {
  postId: string;
  postTitle: string;
  postContent: string;
  authorName: string;
  tags: string[];
  createdAt?: Date;
};

export function ExportPDFButton({
  postTitle,
  postContent,
  authorName,
  tags,
  createdAt,
}: ExportPDFButtonProps) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);

    try {
      // Dynamic import to reduce bundle size
      const [jsPDF, html2canvas] = await Promise.all([
        import('jspdf').then(mod => mod.default),
        import('html2canvas').then(mod => mod.default),
      ]);

      // Create a temporary container for PDF content
      const container = document.createElement('div');
      container.style.position = 'absolute';
      container.style.left = '-9999px';
      container.style.width = '210mm'; // A4 width
      container.style.padding = '20mm';
      container.style.backgroundColor = 'white';
      container.style.fontFamily = 'Arial, sans-serif';
      container.style.color = '#000';

      // Build HTML content
      container.innerHTML = `
        <div style="margin-bottom: 30px;">
          <h1 style="font-size: 32px; font-weight: bold; margin-bottom: 20px; color: #000; line-height: 1.2;">
            ${postTitle}
          </h1>
          <div style="font-size: 14px; color: #666; margin-bottom: 15px;">
            <p style="margin: 5px 0;">Author: <strong>${authorName}</strong></p>
            ${createdAt ? `<p style="margin: 5px 0;">Date: ${new Date(createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>` : ''}
          </div>
          ${tags.length > 0
            ? `
          <div style="margin-bottom: 20px;">
            ${tags.map(tag => `<span style="display: inline-block; background: #f0f0f0; padding: 5px 12px; border-radius: 15px; margin-right: 8px; font-size: 12px; color: #333;">${tag}</span>`).join('')}
          </div>
          `
            : ''}
        </div>
        <div style="font-size: 16px; line-height: 1.8; color: #333;">
          ${postContent.split('\n').map(para => `<p style="margin-bottom: 15px;">${para}</p>`).join('')}
        </div>
        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #999; text-align: center;">
          <p>Exported from Arisu.Blog</p>
        </div>
      `;

      document.body.appendChild(container);

      // Convert to canvas
      const canvas = await html2canvas(container, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });

      // Remove temporary container
      document.body.removeChild(container);

      // Create PDF
      const imgData = canvas.toDataURL('image/png');
      // eslint-disable-next-line new-cap
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      // Add first page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Add more pages if needed
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Save PDF
      const fileName = `${postTitle.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`;
      pdf.save(fileName);
    } catch (error) {
      console.error('Failed to export PDF:', error);
      // eslint-disable-next-line no-alert
      window.alert('Failed to export PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button
      onClick={handleExport}
      disabled={isExporting}
      variant="outline"
      className="w-full"
    >
      <Download className="mr-2 size-4" />
      {isExporting ? 'Exporting...' : 'Export to PDF'}
    </Button>
  );
}
