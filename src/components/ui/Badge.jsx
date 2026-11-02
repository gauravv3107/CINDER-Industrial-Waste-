import React from 'react';
import clsx from 'clsx';

export function Badge({
  children,
  variant = 'neutral', // 'delivering' | 'contracting' | 'review' | 'urgent' | 'bestfit' | 'thermal' | 'sustainability' | 'neutral'
  size = 'sm',
  className = '',
  dot = false,
  dotColor,
}) {
  const sizeClasses = {
    xs: 'text-[9px] px-2 py-0.5 tracking-wider uppercase font-mono',
    sm: 'text-[11px] px-2.5 py-0.5 font-medium',
    md: 'text-xs px-3 py-1 font-medium',
  }[size];

  const variantClasses = {
    delivering:
      'bg-emerald-500/15 text-emerald-400 dark:text-emerald-400 border border-emerald-500/25',
    contracting:
      'bg-orange-500/15 text-orange-400 dark:text-orange-400 border border-orange-500/25',
    review:
      'bg-slate-500/15 text-slate-400 dark:text-slate-400 border border-slate-500/25',
    urgent:
      'bg-orange-500/15 text-orange-400 border border-orange-500/30',
    bestfit:
      'bg-thermal text-white font-semibold shadow-sm',
    thermal:
      'bg-thermal/15 text-thermal border border-thermal/30',
    sustainability:
      'bg-emerald-500/15 text-emerald-500 border border-emerald-500/25',
    neutral:
      'bg-card-raised text-tsecondary border border-border-subtle',
  }[variant] || 'bg-card-raised text-tsecondary border border-border-subtle';

  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 rounded-full select-none shrink-0',
        sizeClasses,
        variantClasses,
        className
      )}
    >
      {dot && (
        <span
          className={clsx(
            'w-1.5 h-1.5 rounded-full shrink-0',
            dotColor ||
              (variant === 'delivering'
                ? 'bg-emerald-400'
                : variant === 'contracting'
                ? 'bg-orange-400'
                : variant === 'urgent'
                ? 'bg-orange-500 animate-pulse'
                : 'bg-current')
          )}
        />
      )}
      {children}
    </span>
  );
}
