import React from 'react';
import clsx from 'clsx';
import { Loader2 } from 'lucide-react';

export function Button({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'outline' | 'ghost'
  size = 'md', // 'sm' | 'md' | 'lg'
  isLoading = false,
  disabled = false,
  icon: Icon,
  iconRight: IconRight,
  className = '',
  type = 'button',
  onClick,
  ...props
}) {
  const baseClasses =
    'inline-flex items-center justify-center font-medium transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-thermal focus-visible:ring-offset-2 focus-visible:ring-offset-canvas disabled:opacity-50 disabled:pointer-events-none select-none';

  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5 rounded-element gap-1.5',
    md: 'text-sm px-4 py-2 rounded-element gap-2',
    lg: 'text-base px-5 py-2.5 rounded-element gap-2.5',
  }[size];

  const variantClasses = {
    primary:
      'bg-thermal text-white hover:bg-thermal-hover shadow-sm active:scale-[0.98]',
    secondary:
      'bg-card text-tprimary border border-border-subtle hover:bg-card-raised hover:border-border-strong shadow-sm active:scale-[0.98]',
    outline:
      'border border-border-subtle bg-transparent text-tprimary hover:bg-card hover:border-border-strong active:scale-[0.98]',
    ghost:
      'text-tsecondary hover:text-tprimary hover:bg-card-raised active:scale-[0.98]',
  }[variant];

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={clsx(baseClasses, sizeClasses, variantClasses, className)}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : Icon ? (
        <Icon className="w-4 h-4 shrink-0" />
      ) : null}
      {children}
      {!isLoading && IconRight ? <IconRight className="w-4 h-4 shrink-0" /> : null}
    </button>
  );
}
