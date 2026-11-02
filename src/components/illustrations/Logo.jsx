import React from 'react';
import clsx from 'clsx';

export function Logo({ className = '', showWordmark = true, size = 'md' }) {
  const iconSizes = {
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  }[size];

  const textSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-xl',
  }[size];

  return (
    <div className={clsx('inline-flex items-center gap-2.5 select-none shrink-0', className)}>
      {/* 3 ascending vertical bars forming a flame/circuit */}
      <svg
        className={iconSizes}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="flameGrad1" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#EA580C" />
            <stop offset="100%" stopColor="#F97316" />
          </linearGradient>
          <linearGradient id="flameGrad2" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#C2410C" />
            <stop offset="100%" stopColor="#FB923C" />
          </linearGradient>
          <linearGradient id="flameGrad3" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#EA580C" />
            <stop offset="100%" stopColor="#FDBA74" />
          </linearGradient>
        </defs>
        {/* Bar 1: Lower left */}
        <rect x="3.5" y="13" width="4" height="8.5" rx="2" fill="url(#flameGrad1)" />
        {/* Bar 2: Medium center */}
        <rect x="10" y="7.5" width="4" height="14" rx="2" fill="url(#flameGrad2)" />
        {/* Bar 3: Tall right */}
        <rect x="16.5" y="2.5" width="4" height="19" rx="2" fill="url(#flameGrad3)" />
      </svg>

      {showWordmark && (
        <span
          className={clsx(
            'font-bold tracking-tight text-tprimary uppercase font-sans',
            textSizes
          )}
        >
          CINDER
        </span>
      )}
    </div>
  );
}
