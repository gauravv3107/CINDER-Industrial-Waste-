import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { SegmentedControl } from '../ui/SegmentedControl';
import { TIME_SERIES_MAP } from '../../data/timeseries';
import { KPI_DATA_BY_RANGE } from '../../data/kpis';

// Custom Tooltip Card
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-slate-900 border border-slate-700 text-slate-100 p-3 rounded-card shadow-xl text-xs backdrop-blur-md">
        <div className="font-mono text-[10px] text-slate-400 uppercase tracking-wider mb-1.5">
          {data.fullDate}
        </div>
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full bg-thermal" />
          <span className="text-slate-300">Recovered Output:</span>
          <span className="font-mono font-semibold text-white tabular-nums">
            {data.recoveredMWh} MWh
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-slate-400" />
          <span className="text-slate-400">Off-taker Demand:</span>
          <span className="font-mono text-slate-300 tabular-nums">
            {data.demandMWh} MWh
          </span>
        </div>
        <div className="mt-2 pt-1.5 border-t border-slate-800 flex justify-between font-mono text-[10px] text-emerald-400">
          <span>Match Efficiency</span>
          <span>{data.efficiencyPct}%</span>
        </div>
      </div>
    );
  }
  return null;
};

export function ThermalAreaChart({ activeRange = '30d', onRangeChange }) {
  const [internalRange, setInternalRange] = useState('30d');
  const currentRange = onRangeChange ? activeRange : internalRange;
  const setRange = onRangeChange || setInternalRange;

  const chartData = TIME_SERIES_MAP[currentRange] || TIME_SERIES_MAP['30d'];
  const summary = KPI_DATA_BY_RANGE[currentRange]?.chartSummary || KPI_DATA_BY_RANGE['30d'].chartSummary;

  return (
    <div className="flex flex-col h-full">
      {/* Chart Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h2 className="text-base md:text-lg font-semibold text-tprimary tracking-tight">
            From waste heat to working energy.
          </h2>
          <p className="text-xs text-tsecondary mt-0.5">
            Recaptured server coolant heat flow vs. verified off-taker hydronic demand.
          </p>
        </div>

        <SegmentedControl
          size="sm"
          value={currentRange}
          onChange={setRange}
          options={[
            { value: '7d', label: '7D' },
            { value: '30d', label: '30D' },
            { value: '90d', label: '90D' },
          ]}
        />
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 mb-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="w-3 h-1 rounded-full bg-thermal" />
          <span className="text-tsecondary font-medium">Recaptured output (MWh)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-0.5 border-b border-dashed border-slate-400" />
          <span className="text-tmuted font-medium">Baseline demand (MWh)</span>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-64 sm:h-72 w-full select-none">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="thermalGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#f97316" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="var(--border-subtle)"
              opacity={0.6}
            />

            <XAxis
              dataKey="date"
              stroke="var(--text-muted)"
              fontSize={10}
              tickLine={false}
              axisLine={{ stroke: 'var(--border-subtle)' }}
              fontFamily="JetBrains Mono, monospace"
            />

            <YAxis
              stroke="var(--text-muted)"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              fontFamily="JetBrains Mono, monospace"
              tickFormatter={(v) => `${v}`}
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: '#f97316', strokeWidth: 1.5, strokeDasharray: '4 4' }}
            />

            {/* Demand baseline (dashed) */}
            <Line
              type="monotone"
              dataKey="demandMWh"
              stroke="#94a3b8"
              strokeDasharray="4 4"
              strokeWidth={1.5}
              dot={false}
            />

            {/* Recovered Output (solid area with gradient) */}
            <Area
              type="monotone"
              dataKey="recoveredMWh"
              stroke="#f97316"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#thermalGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Footer Metrics Row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-4 border-t border-border-subtle mt-4 text-xs font-mono">
        <div className="text-tsecondary flex items-center gap-1.5">
          <span className="text-tmuted">AVERAGE:</span>
          <span className="font-semibold text-tprimary">{summary.averageMwhPerDay}</span>
        </div>
        <div className="text-emerald-500 font-medium">
          {summary.gainOverPrevious}
        </div>
      </div>
    </div>
  );
}
