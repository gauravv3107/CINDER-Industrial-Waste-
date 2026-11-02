import React from 'react';
import clsx from 'clsx';

export function Slider({
  label,
  microLabel,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  minLabel,
  maxLabel,
  disabled = false,
  className = '',
  id,
}) {
  const percentage = Math.min(Math.max(((value - min) / (max - min)) * 100, 0), 100);
  const sliderId = id || (label ? `slider-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

  return (
    <div className={clsx('flex flex-col gap-2', className)}>
      <div className="flex items-center justify-between text-xs">
        <label htmlFor={sliderId} className="font-medium text-tsecondary">
          {label}
        </label>
        <div className="flex items-center gap-1.5 font-mono">
          {microLabel && <span className="micro-label mr-1">{microLabel}</span>}
          <span className="text-sm font-semibold text-thermal tabular-nums">
            {value}
            {unit}
          </span>
        </div>
      </div>

      <div className="relative flex items-center h-6 select-none">
        {/* Track background */}
        <div className="absolute w-full h-2 bg-card-raised border border-border-subtle rounded-full overflow-hidden">
          {/* Active fill */}
          <div
            className="h-full bg-thermal transition-all duration-75"
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Real HTML input overlay for accessible keyboard and drag interactions */}
        <input
          id={sliderId}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
        />

        {/* Custom Thumb */}
        <div
          className="absolute w-4 h-4 bg-white dark:bg-slate-900 border-2 border-thermal rounded-full shadow-md pointer-events-none -ml-2 transition-all duration-75"
          style={{ left: `${percentage}%` }}
        />
      </div>

      {(minLabel || maxLabel) && (
        <div className="flex justify-between items-center text-[10px] font-mono text-tmuted px-0.5">
          <span>{minLabel || `${min}${unit}`}</span>
          <span>{maxLabel || `${max}${unit}`}</span>
        </div>
      )}
    </div>
  );
}
