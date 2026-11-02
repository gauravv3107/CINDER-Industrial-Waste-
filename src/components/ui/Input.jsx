import React from 'react';
import clsx from 'clsx';

export function Input({
  label,
  microLabel,
  value,
  onChange,
  type = 'text',
  placeholder,
  suffix,
  prefix,
  helperText,
  error,
  disabled = false,
  className = '',
  inputClassName = '',
  min,
  max,
  step,
  id,
  ...props
}) {
  const inputId = id || (label ? `input-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

  return (
    <div className={clsx('flex flex-col gap-1.5', className)}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-xs font-medium text-tsecondary flex items-center justify-between"
        >
          <span>{label}</span>
          {microLabel && <span className="micro-label">{microLabel}</span>}
        </label>
      )}

      <div className="relative flex items-center">
        {prefix && (
          <span className="absolute left-3 text-tmuted text-sm pointer-events-none select-none font-mono">
            {prefix}
          </span>
        )}

        <input
          id={inputId}
          type={type}
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
          className={clsx(
            'w-full bg-card border rounded-element px-3.5 py-2 text-sm text-tprimary placeholder:text-tmuted transition-colors duration-150',
            'border-border-subtle hover:border-border-strong',
            'focus:outline-none focus:border-thermal focus:ring-1 focus:ring-thermal',
            'disabled:opacity-50 disabled:bg-card-raised',
            prefix && 'pl-8',
            suffix && 'pr-12',
            error && 'border-rose-500 focus:border-rose-500 focus:ring-rose-500',
            inputClassName
          )}
          {...props}
        />

        {suffix && (
          <span className="absolute right-3 text-tmuted text-xs font-mono pointer-events-none select-none">
            {suffix}
          </span>
        )}
      </div>

      {helperText && !error && (
        <span className="text-[11px] text-tmuted">{helperText}</span>
      )}
      {error && <span className="text-[11px] text-rose-500">{error}</span>}
    </div>
  );
}
