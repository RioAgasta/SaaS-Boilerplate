import html2canvas from 'html2canvas-pro';

const downloadImage = (blob: string, fileName: string) => {
  const fakeLink = window.document.createElement('a');
  fakeLink.style.display = 'none';
  fakeLink.download = fileName;

  fakeLink.href = blob;

  document.body.appendChild(fakeLink);
  fakeLink.click();
  document.body.removeChild(fakeLink);

  fakeLink.remove();
};

export const exportAsImage = async (elementId: string, imageName: string) => {
  const element = document.getElementById(elementId);
  if (element) {
    const canvas = await html2canvas(element);
    const image = canvas.toDataURL('image/png', 1.0);
    downloadImage(image, imageName);
  }
};
