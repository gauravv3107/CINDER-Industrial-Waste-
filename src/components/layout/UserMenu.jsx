import React, { useState, useRef, useEffect } from 'react';
import { User, Settings, LogOut, Shield, ChevronDown } from 'lucide-react';
import clsx from 'clsx';

export function UserMenu({ className = '' }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={clsx('relative', className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1 pl-1.5 pr-2 rounded-full bg-card border border-border-subtle hover:border-border-strong transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-thermal select-none"
        aria-label="User account menu"
      >
        {/* Avatar Initials AM */}
        <div className="w-6 h-6 rounded-full bg-thermal/20 text-thermal font-mono font-bold text-xs flex items-center justify-center shrink-0">
          AM
        </div>
        <span className="text-xs font-medium text-tprimary hidden md:inline">
          Alex Morgan
        </span>
        <ChevronDown className="w-3 h-3 text-tmuted" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-card border border-border-strong rounded-card shadow-2xl z-50 p-1.5 animate-in fade-in zoom-in-95 duration-100 text-xs">
          <div className="px-3 py-2.5 border-b border-border-subtle mb-1">
            <div className="font-semibold text-tprimary">Alex Morgan</div>
            <div className="text-[11px] text-tmuted font-mono">alex.morgan@thermalops.io</div>
            <div className="text-[10px] text-emerald-500 font-mono mt-0.5">Role: Mechanical Systems Lead</div>
          </div>

          <div className="space-y-0.5">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-element hover:bg-card-raised text-tsecondary hover:text-tprimary transition-colors text-left"
            >
              <User className="w-4 h-4 text-tmuted" />
              <span>Profile & Credentials</span>
            </button>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-element hover:bg-card-raised text-tsecondary hover:text-tprimary transition-colors text-left"
            >
              <Settings className="w-4 h-4 text-tmuted" />
              <span>Network Settings</span>
            </button>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-element hover:bg-card-raised text-tsecondary hover:text-tprimary transition-colors text-left"
            >
              <Shield className="w-4 h-4 text-tmuted" />
              <span>API Keys & Webhooks</span>
            </button>
          </div>

          <div className="border-t border-border-subtle mt-1 pt-1">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-element hover:bg-rose-500/10 text-rose-500 transition-colors text-left font-medium"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
