import React from 'react';
import clsx from 'clsx';
import { Check } from 'lucide-react';

export function Checkbox({
  label,
  subLabel,
  checked,
  onChange,
  disabled = false,
  className = '',
  id,
}) {
  const checkboxId = id || (label ? `check-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

  return (
    <label
      htmlFor={checkboxId}
      className={clsx(
        'inline-flex items-start gap-3 cursor-pointer select-none group',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      <div className="relative flex items-center justify-center shrink-0 mt-0.5">
        <input
          id={checkboxId}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <div
          className={clsx(
            'w-4 h-4 rounded border transition-colors duration-150 flex items-center justify-center',
            checked
              ? 'bg-thermal border-thermal text-white'
              : 'bg-card border-border-strong group-hover:border-thermal/60'
          )}
        >
          {checked && <Check className="w-3 h-3 stroke-[3]" />}
        </div>
      </div>

      {(label || subLabel) && (
        <div className="flex flex-col">
          {label && (
            <span className="text-xs font-medium text-tprimary leading-tight">
              {label}
            </span>
          )}
          {subLabel && (
            <span className="text-[11px] text-tmuted leading-normal mt-0.5">
              {subLabel}
            </span>
          )}
        </div>
      )}
    </label>
  );
}
