import React from 'react';
import clsx from 'clsx';

export function Sparkline({
  data = [],
  color = 'thermal', // 'thermal' | 'sustainability'
  height = 32,
  className = '',
}) {
  if (!data.length) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const colorClasses = {
    thermal: 'bg-thermal/30 group-hover:bg-thermal/50 [&.last]:bg-thermal',
    sustainability: 'bg-emerald-500/30 group-hover:bg-emerald-500/50 [&.last]:bg-emerald-500',
  }[color];

  return (
    <div
      className={clsx('flex items-end gap-1 h-8 group select-none', className)}
      style={{ height }}
      aria-hidden="true"
    >
      {data.map((val, idx) => {
        const heightPct = Math.max(Math.round(((val - min) / range) * 85 + 15), 15);
        const isLast = idx === data.length - 1;

        return (
          <div
            key={idx}
            className={clsx(
              'w-1.5 rounded-t-sm transition-all duration-300',
              colorClasses,
              isLast && 'last shadow-sm'
            )}
            style={{ height: `${heightPct}%` }}
            title={`${val}`}
          />
        );
      })}
    </div>
  );
}
