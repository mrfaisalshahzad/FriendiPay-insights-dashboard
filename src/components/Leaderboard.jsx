import { useState } from 'react';

const Leaderboard = ({ onboarding }) => {
  const [view, setView] = useState('agent');

  const computeLeaderboard = () => {
    const key = view === 'agent' ? 'Agent Id' : 'Promoter Id';
    const map = {};

    onboarding.forEach(o => {
      const id = o[key];
      if (!id) return;
      if (!map[id]) map[id] = { id, count: 0, conversions: 0, commission: 0 };
      map[id].count += 1;
      if (o['Has Done International Remittance'] === 'Yes') map[id].conversions += 1;
      map[id].commission += parseFloat(o['Agent Commission']) || 0;
    });

    return Object.values(map)
      .map(a => ({ ...a, conversionRate: a.count ? ((a.conversions / a.count) * 100).toFixed(1) : 0 }))
      .sort((a, b) => b.count - a.count);
  };

  const data = computeLeaderboard();

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow mb-6">
      <h3 className="text-lg font-semibold mb-4">🏆 {view === 'agent' ? 'Agent' : 'Promoter'} Leaderboard</h3>
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setView('agent')}
          className={`px-3 py-1 text-sm rounded ${view === 'agent' ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
        >
          By Agent
        </button>
        <button
          onClick={() => setView('promoter')}
          className={`px-3 py-1 text-sm rounded ${view === 'promoter' ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
        >
          By Promoter
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b dark:border-gray-700">
              <th className="text-left py-2">ID</th>
              <th className="text-left py-2">Onboardings</th>
              <th className="text-left py-2">Conversion %</th>
              <th className="text-left py-2">Commission (SAR)</th>
            </tr>
          </thead>
          <tbody>
            {data.slice(0, 10).map((row, i) => (
              <tr key={i} className="border-b dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                <td className="py-2 font-mono text-xs">{row.id}</td>
                <td>{row.count}</td>
                <td>{row.conversionRate}%</td>
                <td>{row.commission.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;