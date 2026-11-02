import React from 'react';
import clsx from 'clsx';

export function Skeleton({ className = '', variant = 'rect' }) {
  const variantClasses = {
    rect: 'rounded-lg',
    circle: 'rounded-full',
    text: 'rounded h-3.5 w-full',
  }[variant];

  return (
    <div
      className={clsx(
        'bg-card-raised/70 animate-pulse',
        variantClasses,
        className
      )}
      aria-hidden="true"
    />
  );
}
