import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import clsx from 'clsx';

export function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div
      className={clsx(
        'inline-flex items-center bg-card-raised border border-border-subtle rounded-element p-0.5 select-none',
        className
      )}
      role="radiogroup"
      aria-label="Theme selection"
    >
      <button
        type="button"
        role="radio"
        aria-checked={!isDark}
        onClick={() => isDark && toggleTheme()}
        title="Light theme"
        className={clsx(
          'p-1.5 rounded-lg transition-all duration-150 flex items-center justify-center',
          !isDark
            ? 'bg-card text-thermal shadow-sm'
            : 'text-tmuted hover:text-tsecondary'
        )}
      >
        <Sun className="w-4 h-4" />
      </button>

      <button
        type="button"
        role="radio"
        aria-checked={isDark}
        onClick={() => !isDark && toggleTheme()}
        title="Dark theme"
        className={clsx(
          'p-1.5 rounded-lg transition-all duration-150 flex items-center justify-center',
          isDark
            ? 'bg-card text-thermal shadow-sm'
            : 'text-tmuted hover:text-tsecondary'
        )}
      >
        <Moon className="w-4 h-4" />
      </button>
    </div>
  );
}
