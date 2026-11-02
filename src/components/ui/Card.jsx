import React from 'react';
import clsx from 'clsx';

export function Card({
  children,
  className = '',
  variant = 'default', // 'default' | 'raised' | 'tinted-amber' | 'tinted-mint' | 'outline'
  padding = 'default', // 'none' | 'sm' | 'default' | 'lg'
  onClick,
  ...props
}) {
  const variantClasses = {
    default: 'bg-card border border-border-subtle shadow-sm',
    raised: 'bg-card-raised border border-border-strong shadow-md',
    'tinted-amber':
      'bg-orange-500/10 border border-orange-500/25 text-tprimary',
    'tinted-mint':
      'bg-emerald-500/10 border border-emerald-500/25 text-tprimary',
    outline:
      'bg-transparent border border-border-subtle',
  }[variant];

  const paddingClasses = {
    none: 'p-0',
    sm: 'p-4',
    default: 'p-5 md:p-6',
    lg: 'p-6 md:p-8',
  }[padding];

  return (
    <div
      onClick={onClick}
      className={clsx(
        'rounded-card transition-all duration-150',
        variantClasses,
        paddingClasses,
        onClick && 'cursor-pointer hover:border-border-strong',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
