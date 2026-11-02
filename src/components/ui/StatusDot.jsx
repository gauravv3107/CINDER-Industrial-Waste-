import React from 'react';
import clsx from 'clsx';

export function StatusDot({
  status = 'nominal', // 'nominal' | 'warning' | 'alert' | 'inactive'
  pulse = true,
  className = '',
}) {
  const colorClasses = {
    nominal: 'bg-emerald-500',
    warning: 'bg-amber-500',
    alert: 'bg-rose-500',
    inactive: 'bg-slate-500',
  }[status] || 'bg-emerald-500';

  return (
    <span className={clsx('relative flex h-2 w-2 shrink-0', className)}>
      {pulse && (
        <span
          className={clsx(
            'animate-ping absolute inline-flex h-full w-full rounded-full opacity-75',
            colorClasses
          )}
        />
      )}
      <span className={clsx('relative inline-flex rounded-full h-2 w-2', colorClasses)} />
    </span>
  );
}
