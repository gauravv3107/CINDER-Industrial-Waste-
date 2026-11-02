import React from 'react';
import clsx from 'clsx';
import { ChevronDown } from 'lucide-react';

export function Select({
  label,
  microLabel,
  value,
  onChange,
  options = [],
  disabled = false,
  className = '',
  selectClassName = '',
  id,
  ...props
}) {
  const selectId = id || (label ? `select-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

  return (
    <div className={clsx('flex flex-col gap-1.5', className)}>
      {label && (
        <label
          htmlFor={selectId}
          className="text-xs font-medium text-tsecondary flex items-center justify-between"
        >
          <span>{label}</span>
          {microLabel && <span className="micro-label">{microLabel}</span>}
        </label>
      )}

      <div className="relative flex items-center">
        <select
          id={selectId}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={clsx(
            'w-full bg-card border rounded-element px-3.5 py-2 pr-9 text-sm text-tprimary appearance-none cursor-pointer transition-colors duration-150',
            'border-border-subtle hover:border-border-strong',
            'focus:outline-none focus:border-thermal focus:ring-1 focus:ring-thermal',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            selectClassName
          )}
          {...props}
        >
          {options.map((opt) => {
            const optVal = typeof opt === 'object' ? opt.value : opt;
            const optLabel = typeof opt === 'object' ? opt.label : opt;
            return (
              <option key={optVal} value={optVal} className="bg-card text-tprimary py-1">
                {optLabel}
              </option>
            );
          })}
        </select>

        <ChevronDown className="w-4 h-4 text-tmuted absolute right-3 pointer-events-none" />
      </div>
    </div>
  );
}
