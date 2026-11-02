import React from 'react';
import clsx from 'clsx';

export function IconButton({
  icon: Icon,
  label,
  size = 'md',
  variant = 'ghost',
  className = '',
  onClick,
  ...props
}) {
  const sizeClasses = {
    sm: 'p-1.5 rounded-lg text-xs',
    md: 'p-2 rounded-element text-sm',
    lg: 'p-2.5 rounded-xl text-base',
  }[size];

  const variantClasses = {
    ghost: 'text-tsecondary hover:text-tprimary hover:bg-card-raised',
    secondary: 'bg-card text-tsecondary border border-border-subtle hover:text-tprimary hover:bg-card-raised',
    thermal: 'bg-thermal/10 text-thermal hover:bg-thermal/20',
  }[variant];

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={clsx(
        'inline-flex items-center justify-center transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-thermal focus-visible:ring-offset-2 focus-visible:ring-offset-canvas active:scale-95 shrink-0',
        sizeClasses,
        variantClasses,
        className
      )}
      {...props}
    >
      <Icon className="w-4 h-4 shrink-0" />
    </button>
  );
}
