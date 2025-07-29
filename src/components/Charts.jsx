import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, FunnelChart, Funnel } from 'recharts';

const Charts = ({ remittances, onboarding }) => {
  const funnelData = getFunnelData(onboarding);
  const nationalityData = getNationalityData(onboarding);

  const COLORS = ['#4F46E5', '#06B6D4', '#10B981', '#F59E0B', '#EF4444'];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      {/* Funnel */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-4">Onboarding Funnel</h3>
        <ResponsiveContainer width="100%" height={300}>
          <FunnelChart>
            <Tooltip />
            <Funnel
              data={funnelData}
              dataKey="value"
              nameKey="name"
              isAnimationActive
              label
              stroke="#fff"
            >
              {funnelData.map((item, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Funnel>
          </FunnelChart>
        </ResponsiveContainer>
      </div>

      {/* Nationality */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-4">Top Customer Nationalities</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={nationalityData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {nationalityData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Charts;