import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

// Helper: group by date
const groupByDay = (data, dateKey) => {
  return data.reduce((acc, item) => {
    const date = dayjs(item[dateKey]).format('YYYY-MM-DD');
    acc[date] = acc[date] || [];
    acc[date].push(item);
    return acc;
  }, {});
};

export const computeKPIs = (remittances, onboarding, period = 'daily') => {
  const now = dayjs();
  let start;

  if (period === 'daily') start = now.subtract(1, 'day');
  else if (period === 'weekly') start = now.subtract(7, 'day');
  else if (period === 'mom') start = now.subtract(1, 'month');
  else if (period === 'yoy') start = now.subtract(1, 'year');

  const filteredRemittances = remittances.filter(r => {
    const date = dayjs(r.Date);
    return date.isAfter(start) && date.isBefore(now);
  });

  const filteredOnboarding = onboarding.filter(o => {
    const date = dayjs(o['Registration Date']);
    return date.isAfter(start) && date.isBefore(now);
  });

  const successfulRemits = filteredRemittances.filter(r => r.Status === 'Success' || r.Status === 'success');

  const volume = successfulRemits.reduce((sum, r) => sum + (parseFloat(r['PayIN SAR']) || 0), 0);
  const revenue = successfulRemits.reduce((sum, r) => sum + (parseFloat(r.FeeAmount) || 0), 0);
  const trxCount = successfulRemits.length;

  const activated = filteredOnboarding.filter(o => o['Activation Timestamp']).length;
  const conversion = filteredOnboarding.filter(o => o['Has Done International Remittance'] === 'Yes').length;

  const nafathRejected = filteredOnboarding.filter(o => o['Has Nafath Rejection'] === 'Yes').length;
  const nafathRequested = filteredOnboarding.filter(o => o['Has Requested Nafath'] === 'Yes').length;
  const nafathSuccessRate = nafathRequested > 0 ? ((nafathRequested - nafathRejected) / nafathRequested) * 100 : 100;

  return {
    volume: volume.toLocaleString(),
    transactions: trxCount,
    revenue: revenue.toLocaleString(),
    onboardings: filteredOnboarding.length,
    activationRate: filteredOnboarding.length > 0 ? ((activated / filteredOnboarding.length) * 100).toFixed(1) : 0,
    conversionRate: filteredOnboarding.length > 0 ? ((conversion / filteredOnboarding.length) * 100).toFixed(1) : 0,
    nafathSuccessRate: nafathSuccessRate.toFixed(1),
  };
};

// Funnel for onboarding
export const getFunnelData = (onboarding) => {
  const total = onboarding.length;
  const idVerified = onboarding.filter(o => o['Customer Id Verified'] === 'Yes').length;
  const toppedUp = onboarding.filter(o => o['Has Topped Up'] === 'Yes').length;
  const addedBeneficiary = onboarding.filter(o => o['Has Added beneficiary'] === 'Yes').length;
  const didRemittance = onboarding.filter(o => o['Has Done International Remittance'] === 'Yes').length;

  return [
    { name: 'Registered', value: total },
    { name: 'ID Verified', value: idVerified },
    { name: 'Topped Up', value: didRemittance > 0 ? toppedUp : 0 },
    { name: 'Added Beneficiary', value: addedBeneficiary },
    { name: 'Sent Remittance', value: didRemittance },
  ];
};

// Top nationalities
export const getNationalityData = (onboarding) => {
  const counts = {};
  onboarding.forEach(o => {
    const nation = o['Customer Nationality'] || 'Unknown';
    counts[nation] = (counts[nation] || 0) + 1;
  });
  return Object.entries(counts).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value).slice(0, 10);
};