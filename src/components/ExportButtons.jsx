import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const ExportButtons = ({ remittances, onboarding }) => {
  const exportToCSV = (data, filename) => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Data');
    XLSX.writeFile(wb, `${filename}.csv`);
  };

  const exportToPDF = (data, columns, title) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(title, 14, 15);
    doc.setFontSize(10);

    const tableData = data.map(row => columns.map(col => row[col.accessor] || ''));

    doc.autoTable({
      head: [columns.map(c => c.Header)],
      body: tableData,
      startY: 20,
      theme: 'grid',
      styles: { fontSize: 8 },
      columnStyles: { 0: { cellWidth: 30 }, 1: { cellWidth: 40 } },
    });

    doc.save(`${title}.pdf`);
  };

  const remittanceCols = [
    { Header: 'Date', accessor: 'Date' },
    { Header: 'Customer', accessor: 'Customer Mobile' },
    { Header: 'Amount SAR', accessor: 'PayIN SAR' },
    { Header: 'Fee', accessor: 'FeeAmount' },
    { Header: 'Status', accessor: 'Status' },
  ];

  const onboardingCols = [
    { Header: 'Reg Date', accessor: 'Registration Date' },
    { Header: 'Name', accessor: 'Customer Name' },
    { Header: 'Phone', accessor: 'Customer Phone Number' },
    { Header: 'Nationality', accessor: 'Customer Nationality' },
    { Header: 'Status', accessor: 'Account Status' },
  ];

  return (
    <div className="flex flex-wrap gap-3 mb-6">
      <button
        onClick={() => exportToCSV(remittances, 'Remittances')}
        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm"
      >
        📥 Export Remittances (CSV)
      </button>
      <button
        onClick={() => exportToCSV(onboarding, 'Onboarding')}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
      >
        📥 Export Onboarding (CSV)
      </button>
      <button
        onClick={() => exportToPDF(remittances.slice(0, 100), remittanceCols, 'Top 100 Remittances')}
        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm"
      >
        🖨️ Export Remittances (PDF)
      </button>
      <button
        onClick={() => exportToPDF(onboarding.slice(0, 100), onboardingCols, 'Top 100 Onboardings')}
        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm"
      >
        🖨️ Export Onboarding (PDF)
      </button>
    </div>
  );
};

export default ExportButtons;