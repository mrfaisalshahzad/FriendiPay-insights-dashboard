import { useState } from 'react';
import FileUploader from './components/FileUploader';
import KPIs from './components/KPIs';
import Charts from './components/Charts';
import ThemeToggle from './components/ThemeToggle';
import { computeKPIs } from './utils/kpis';

function App() {
  const [remittances, setRemittances] = useState([]);
  const [onboarding, setOnboarding] = useState([]);
  const [period, setPeriod] = useState('weekly');

  const kpis = computeKPIs(remittances, onboarding, period);

  return (
    <div className="min-h-screen p-6 max-w-7xl mx-auto">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-primary">GlobalPay Insights Dashboard</h1>
        <div className="flex gap-4 items-center">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 rounded px-3 py-1 bg-white dark:bg-gray-800"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="mom">MoM</option>
            <option value="yoy">YoY</option>
          </select>
          <ThemeToggle />
        </div>
      </header>

      <FileUploader
        onRemittances={setRemittances}
        onOnboarding={setOnboarding}
      />

      {remittances.length > 0 && onboarding.length > 0 ? (
  <>
    <ExportButtons remittances={remittances} onboarding={onboarding} />

    <KPIs kpis={kpis} period={period} />

    <Charts remittances={remittances} onboarding={onboarding} />

    <Leaderboard onboarding={onboarding} />

    <DataTable
      data={remittances}
      title="Remittance Transactions"
      columns={[
        { Header: 'Date', accessor: 'Date' },
        { Header: 'Mobile', accessor: 'Customer Mobile' },
        { Header: 'Amount (SAR)', accessor: 'PayIN SAR' },
        { Header: 'Fee', accessor: 'FeeAmount' },
        { Header: 'Status', accessor: 'Status' },
        { Header: 'Channel', accessor: 'Channel Name' },
      ]}
    />

    <DataTable
      data={onboarding}
      title="Onboarding Records"
      columns={[
        { Header: 'Reg Date', accessor: 'Registration Date' },
        { Header: 'Name', accessor: 'Customer Name' },
        { Header: 'Phone', accessor: 'Customer Phone Number' },
        { Header: 'Nationality', accessor: 'Customer Nationality' },
        { Header: 'Status', accessor: 'Account Status' },
        { Header: 'Agent ID', accessor: 'Agent Id' },
      ]}
    />
  </>
) : (
  <div className="bg-white dark:bg-gray-800 p-12 rounded-xl shadow text-center">
    <p className="text-xl text-gray-500">📤 Upload both files to see insights</p>
  </div>
)}

export default App;