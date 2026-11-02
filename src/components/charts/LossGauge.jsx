import React from 'react';
import clsx from 'clsx';
import { getLossThreshold } from '../../utils/thermo';

/**
 * Reusable Thermodynamic Loss Gauge
 * @param {object} props
 * @param {number} props.lossPct Loss percentage (e.g. 7.4)
 * @param {'horizontal' | 'radial'} [props.variant='horizontal']
 * @param {number} [props.sourceMW=1.20]
 * @param {number} [props.deliveredMW=1.11]
 * @param {boolean} [props.showStatus=true]
 * @param {string} [props.footnote]
 * @param {string} [props.className]
 */
export function LossGauge({
  lossPct = 7.4,
  variant = 'horizontal',
  sourceMW = 1.20,
  deliveredMW = 1.11,
  showStatus = true,
  footnote = 'Potomac route estimate · insulated DN150 pipe · 2.4 km. Validate with a site survey.',
  className = '',
}) {
  const threshold = getLossThreshold(lossPct);
  // Cap at 30% for scale representation
  const cappedLoss = Math.min(Math.max(lossPct, 0), 30);
  const totalSegments = 24;
  const activeSegments = Math.round((cappedLoss / 30) * totalSegments);

  // Color mapping based on loss severity
  const activeBarColor =
    lossPct <= 10.0
      ? 'bg-thermal'
      : lossPct <= 15.0
      ? 'bg-amber-500'
      : 'bg-rose-500';

  if (variant === 'radial') {
    const size = 96;
    const strokeWidth = 8;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const progress = Math.min(lossPct / 30, 1);
    const strokeDashoffset = circumference - progress * circumference;

    const strokeColor =
      lossPct <= 10.0 ? '#f97316' : lossPct <= 15.0 ? '#f59e0b' : '#ef4444';

    return (
      <div className={clsx('flex flex-col items-center select-none', className)}>
        <div className="relative flex items-center justify-center">
          <svg width={size} height={size} className="transform -rotate-90">
            {/* Background ring */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke="var(--border-subtle)"
              strokeWidth={strokeWidth}
              fill="transparent"
            />
            {/* Progress ring */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-500 ease-out"
            />
          </svg>

          {/* Centered value */}
          <div className="absolute flex flex-col items-center">
            <span className="text-xl font-bold font-mono text-tprimary tabular-nums">
              {lossPct}%
            </span>
            <span className="text-[9px] uppercase tracking-wider text-tmuted font-mono -mt-1">
              LOSS
            </span>
          </div>
        </div>

        {showStatus && (
          <span
            className={clsx(
              'mt-3 text-[10px] uppercase font-mono px-2 py-0.5 rounded-full border',
              threshold.badgeClass
            )}
          >
            {threshold.label}
          </span>
        )}
      </div>
    );
  }

  // Horizontal Segmented Bar Gauge
  return (
    <div className={clsx('flex flex-col select-none', className)}>
      {/* Top Header: Value + Status Pill */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold font-mono text-tprimary tabular-nums">
            {lossPct}%
          </span>
          <span className="micro-label">THERMODYNAMIC LOSS</span>
        </div>

        {showStatus && (
          <span
            className={clsx(
              'text-[10px] uppercase font-mono px-2.5 py-0.5 rounded-full border font-medium',
              threshold.badgeClass
            )}
          >
            {threshold.label}
          </span>
        )}
      </div>

      {/* Segmented Horizontal Bar */}
      <div className="flex items-center gap-1 h-3.5 my-2">
        {Array.from({ length: totalSegments }).map((_, idx) => {
          const isActive = idx < activeSegments;
          const isLimitTick = idx === Math.round(totalSegments * 0.5); // 15% mark

          return (
            <div
              key={idx}
              className={clsx(
                'flex-1 h-full rounded-sm transition-all duration-200 relative',
                isActive
                  ? activeBarColor
                  : 'bg-card-raised border border-border-subtle/50',
                isLimitTick && 'ring-1 ring-amber-500/50'
              )}
            />
          );
        })}
      </div>

      {/* Bar Scale Labels */}
      <div className="flex justify-between items-center text-[10px] font-mono text-tmuted mt-0.5">
        <span>0% · OPTIMAL</span>
        <span className="text-amber-500/90 font-medium">15% LIMIT</span>
        <span>30%</span>
      </div>

      {/* Delivered MW Ratio line */}
      <div className="flex items-center justify-between text-xs font-mono pt-3 mt-3 border-t border-border-subtle">
        <span className="text-tmuted">NETWORK DELIVERED:</span>
        <span className="font-semibold text-tprimary">
          {sourceMW.toFixed(2)} MW source → <span className="text-emerald-500">{deliveredMW.toFixed(2)} MW delivered</span>
        </span>
      </div>

      {/* Footnote */}
      {footnote && (
        <p className="text-[11px] text-tmuted mt-2.5 leading-relaxed">
          {footnote}
        </p>
      )}
    </div>
  );
}
