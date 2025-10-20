import JsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const exportToPdf = (
  title: string,
  head: string[][],
  body: any[][],
  name: string,
) => {
  const doc = new JsPDF();

  doc.text(title, 14, 15);

  autoTable(doc, {
    startY: 20,
    head,
    body,
  });

  doc.save(`${name}.pdf`);
};

export const exportHtmlToPdf = (elementId: string, fileName: string) => {
  const input = document.getElementById(elementId);
  if (input) {
    import('html2canvas-pro').then((html2canvas) => {
      html2canvas.default(input).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new JsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${fileName}.pdf`);
      });
    });
  }
};
