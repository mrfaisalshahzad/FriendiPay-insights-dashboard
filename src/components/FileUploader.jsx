import { useState } from 'react';
import { parseExcelFile } from '../utils/parser';

const FileUploader = ({ onRemittances, onOnboarding }) => {
  const [remittanceFile, setRemittanceFile] = useState('');
  const [onboardingFile, setOnboardingFile] = useState('');

  const handleFile = (file, parser, setter, callback) => {
    if (!file) return;
    setter(file.name);
    parseExcelFile(file, (data) => {
      callback(data);
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md mb-6 transition-all">
      <h2 className="text-xl font-semibold mb-4">Upload Excel Files</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">International Remittances</label>
          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={(e) => handleFile(e.target.files[0], null, setRemittanceFile, onRemittances)}
            className="block w-full text-sm border border-gray-300 rounded-lg cursor-pointer dark:border-gray-600"
          />
          {remittanceFile && <p className="text-sm text-green-600 mt-1">✅ {remittanceFile}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Onboarding Data</label>
          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={(e) => handleFile(e.target.files[0], null, setOnboardingFile, onOnboarding)}
            className="block w-full text-sm border border-gray-300 rounded-lg cursor-pointer dark:border-gray-600"
          />
          {onboardingFile && <p className="text-sm text-green-600 mt-1">✅ {onboardingFile}</p>}
        </div>
      </div>
    </div>
  );
};

export default FileUploader;