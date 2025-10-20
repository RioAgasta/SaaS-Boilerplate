'use client';

import { exportHtmlToPdf, exportToPdf } from '@/libs/PDF';

const UsersPage = () => {
  const handleExport = () => {
    exportToPdf(
      'Users Data',
      [['Name', 'Email', 'Country']],
      [
        ['David', 'david@example.com', 'Sweden'],
        ['Castille', 'castille@example.com', 'Spain'],
      ],
      'users-data',
    );
  };

  const handleExportHtml = () => {
    exportHtmlToPdf('divToPrint', 'users-html-data');
  };

  return (
    <div className="container mx-auto p-4">
      <div id="divToPrint" className="p-4 bg-gray-100 rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Users</h1>
        <p>This is a sample content that will be exported to PDF.</p>
        <ul>
          <li>User 1</li>
          <li>User 2</li>
        </ul>
      </div>
      <div className="flex space-x-2 mt-4">
        <button
          type="button"
          onClick={handleExport}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Export Table to PDF
        </button>
        <button
          type="button"
          onClick={handleExportHtml}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Export HTML to PDF
        </button>
      </div>
    </div>
  );
};

export default UsersPage;
