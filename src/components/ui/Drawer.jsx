import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';
import { X } from 'lucide-react';
import { IconButton } from './IconButton';

export function Drawer({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  width = 'md', // 'sm' | 'md' | 'lg' | 'xl'
  className = '',
  ariaLabel,
}) {
  const drawerRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    const orig = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = orig;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const widthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-2xl',
  }[width];

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel || title}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div
          ref={drawerRef}
          className={clsx(
            'w-screen bg-card border-l border-border-strong shadow-2xl flex flex-col h-full transform transition ease-in-out duration-200',
            widthClasses,
            className
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 md:p-6 border-b border-border-subtle shrink-0">
            <div>
              {title && (
                <h2 className="text-lg font-semibold text-tprimary tracking-tight">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="text-xs text-tsecondary mt-0.5">{subtitle}</p>
              )}
            </div>
            <IconButton
              icon={X}
              label="Close drawer"
              size="sm"
              onClick={onClose}
              className="text-tmuted hover:text-tprimary"
            />
          </div>

          {/* Content */}
          <div className="p-5 md:p-6 overflow-y-auto flex-1">{children}</div>
        </div>
      </div>
    </div>
  );
}
