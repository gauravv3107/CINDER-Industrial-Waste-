/**
 * Seeded deterministic time series data for the AreaChart and live pipeline table
 */

// Generate 30-day October 2026 data
const generate30DayData = () => {
  const days = [];
  const baseOutput = 35.0;
  const baseDemand = 38.0;

  for (let i = 2; i <= 31; i++) {
    const dayStr = String(i).padStart(2, '0');
    // Deterministic pseudo-random variation trending upward
    const trend = (i - 2) * 0.42;
    const sinNoise = Math.sin(i * 0.8) * 3.2;
    const cosNoise = Math.cos(i * 1.1) * 2.1;

    const recovered = Number((baseOutput + trend + sinNoise).toFixed(1));
    const demand = Number((baseDemand + trend * 0.95 + cosNoise).toFixed(1));

    days.push({
      date: `${dayStr} OCT`,
      fullDate: `${dayStr} Oct 2026`,
      recoveredMWh: recovered,
      demandMWh: demand,
      efficiencyPct: Math.round((recovered / demand) * 100),
    });
  }
  return days;
};

// Generate 7-day data (25 Oct - 31 Oct)
const generate7DayData = () => {
  return [
    { date: '25 OCT', fullDate: '25 Oct 2026', recoveredMWh: 43.1, demandMWh: 45.0, efficiencyPct: 96 },
    { date: '26 OCT', fullDate: '26 Oct 2026', recoveredMWh: 44.8, demandMWh: 46.2, efficiencyPct: 97 },
    { date: '27 OCT', fullDate: '27 Oct 2026', recoveredMWh: 46.2, demandMWh: 47.5, efficiencyPct: 97 },
    { date: '28 OCT', fullDate: '28 Oct 2026', recoveredMWh: 45.4, demandMWh: 46.8, efficiencyPct: 97 },
    { date: '29 OCT', fullDate: '29 Oct 2026', recoveredMWh: 47.9, demandMWh: 48.9, efficiencyPct: 98 },
    { date: '30 OCT', fullDate: '30 Oct 2026', recoveredMWh: 48.6, demandMWh: 49.5, efficiencyPct: 98 },
    { date: '31 OCT', fullDate: '31 Oct 2026', recoveredMWh: 51.2, demandMWh: 52.0, efficiencyPct: 98 },
  ];
};

// Generate 90-day data (sample bi-daily for smooth curve)
const generate90DayData = () => {
  const points = [];
  const months = ['AUG', 'SEP', 'OCT'];
  for (let m = 0; m < 3; m++) {
    for (let d = 2; d <= 30; d += 3) {
      const dayStr = String(d).padStart(2, '0');
      const recovered = Number((28 + m * 6 + (d / 30) * 5 + Math.sin(d + m) * 2.5).toFixed(1));
      const demand = Number((31 + m * 5.8 + (d / 30) * 4.8 + Math.cos(d) * 2.0).toFixed(1));
      points.push({
        date: `${dayStr} ${months[m]}`,
        fullDate: `${dayStr} ${months[m]} 2026`,
        recoveredMWh: recovered,
        demandMWh: demand,
        efficiencyPct: Math.round((recovered / demand) * 100),
      });
    }
  }
  return points;
};

export const TIME_SERIES_MAP = {
  '30d': generate30DayData(),
  '7d': generate7DayData(),
  '90d': generate90DayData(),
};

/**
 * Seed data for the live pipeline activity table
 */
export const INITIAL_PIPELINE_FEED = [
  {
    id: 'pipe-1',
    utc: '09:42:15',
    route: 'ASH-01 → Potomac loop',
    source: 'ASH-01',
    destination: 'Potomac District Energy',
    outputMW: 1.11,
    tempSupplyC: 64.0,
    status: 'Delivering',
    statusClass: 'emerald',
    note: 'Steady base hydronic exchange',
  },
  {
    id: 'pipe-2',
    utc: '09:41:50',
    route: 'ASH-01 → Blue Ridge Growers',
    source: 'ASH-01',
    destination: 'Blue Ridge Growers',
    outputMW: 0.84,
    tempSupplyC: 63.8,
    status: 'Delivering',
    statusClass: 'emerald',
    note: 'Greenhouse root-zone loop nominal',
  },
  {
    id: 'pipe-3',
    utc: '09:40:22',
    route: 'ASH-01 → Dulles Aquatics',
    source: 'ASH-01',
    destination: 'Dulles Aquatics Center',
    outputMW: 0.62,
    tempSupplyC: 64.2,
    status: 'Contracting',
    statusClass: 'orange',
    note: 'Offtake agreement PPA signing stage',
  },
  {
    id: 'pipe-4',
    utc: '09:38:10',
    route: 'ASH-02 → Loudoun Civic',
    source: 'ASH-02',
    destination: 'Loudoun Civic Center',
    outputMW: 0.46,
    tempSupplyC: 61.5,
    status: 'Review',
    statusClass: 'slate',
    note: 'Engineering hydraulic simulation review',
  },
  {
    id: 'pipe-5',
    utc: '09:35:44',
    route: 'IAD-12 → Cascades Agtech',
    source: 'IAD-12',
    destination: 'Cascades Controlled Agtech',
    outputMW: 0.58,
    tempSupplyC: 60.1,
    status: 'Delivering',
    statusClass: 'emerald',
    note: 'Vertical farm nutrient tempering active',
  },
];

/**
 * Rotating incoming pipeline events for real-time simulation
 */
export const ROTATING_PIPELINE_EVENTS = [
  {
    route: 'ASH-01 → Inova Loudoun Substation',
    source: 'ASH-01',
    destination: 'Inova Hospital Complex',
    outputMW: 1.35,
    tempSupplyC: 64.1,
    status: 'Review',
    statusClass: 'slate',
    note: 'Hospital thermal redundancy validation initiated',
  },
  {
    route: 'IAD-12 → Reston District Trunk',
    source: 'IAD-12',
    destination: 'Reston Town Center District',
    outputMW: 1.80,
    tempSupplyC: 60.5,
    status: 'Contracting',
    statusClass: 'orange',
    note: 'Transit corridor interconnection approved',
  },
  {
    route: 'LEE-02 → Broad Run Digesters',
    source: 'LEE-02',
    destination: 'Broad Run WRF Digesters',
    outputMW: 0.95,
    tempSupplyC: 56.4,
    status: 'Delivering',
    statusClass: 'emerald',
    note: 'Biomethane digester temperature target reached',
  },
  {
    route: 'MAN-03 → Occoquan Paper Mill',
    source: 'MAN-03',
    destination: 'Occoquan Regional Paper Mill',
    outputMW: 2.40,
    tempSupplyC: 62.0,
    status: 'Review',
    statusClass: 'slate',
    note: 'Industrial steam displacement baseline verified',
  },
];
