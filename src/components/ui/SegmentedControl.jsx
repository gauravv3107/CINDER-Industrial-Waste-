import React from 'react';
import clsx from 'clsx';

export function SegmentedControl({
  options = [],
  value,
  onChange,
  size = 'md',
  className = '',
}) {
  const sizeClasses = {
    sm: 'p-0.5 text-xs',
    md: 'p-1 text-xs',
    lg: 'p-1 text-sm',
  }[size];

  const itemSizeClasses = {
    sm: 'px-2 py-1 rounded-lg',
    md: 'px-3 py-1.5 rounded-element',
    lg: 'px-4 py-2 rounded-element',
  }[size];

  return (
    <div
      className={clsx(
        'inline-flex items-center bg-card-raised border border-border-subtle rounded-element select-none',
        sizeClasses,
        className
      )}
      role="tablist"
    >
      {options.map((opt) => {
        const optVal = typeof opt === 'object' ? opt.value : opt;
        const optLabel = typeof opt === 'object' ? opt.label : opt;
        const optIcon = typeof opt === 'object' ? opt.icon : null;
        const isSelected = value === optVal;

        return (
          <button
            key={optVal}
            type="button"
            role="tab"
            aria-selected={isSelected}
            onClick={() => onChange(optVal)}
            className={clsx(
              'flex items-center justify-center gap-1.5 font-medium transition-all duration-150',
              itemSizeClasses,
              isSelected
                ? 'bg-card text-tprimary shadow-sm font-semibold'
                : 'text-tmuted hover:text-tsecondary'
            )}
          >
            {optIcon}
            <span>{optLabel}</span>
          </button>
        );
      })}
    </div>
  );
}
