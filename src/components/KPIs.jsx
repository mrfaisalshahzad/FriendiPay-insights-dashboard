const KPIs = ({ kpis, period }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {[
        { label: 'Remittance Volume (SAR)', value: kpis.volume, color: 'primary' },
        { label: 'Transactions', value: kpis.transactions, color: 'secondary' },
        { label: 'Fee Revenue (SAR)', value: kpis.revenue, color: 'indigo' },
        { label: 'New Customers', value: kpis.onboardings, color: 'teal' },
      ].map((kpi, i) => (
        <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow transition-all hover:shadow-lg">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{kpi.label} <span className="text-xs">({period})</span></p>
          <p className={`text-2xl font-bold mt-1 text-${kpi.color}-600`}>{kpi.value}</p>
        </div>
      ))}
    </div>
  );
};

export default KPIs;