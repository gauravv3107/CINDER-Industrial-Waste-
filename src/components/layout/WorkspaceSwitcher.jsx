import React, { useState, useRef, useEffect } from 'react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { Building2, ChevronDown, Check, Server } from 'lucide-react';
import clsx from 'clsx';

export function WorkspaceSwitcher({ className = '' }) {
  const { activeSite, sites, selectSite, regionLabel } = useWorkspace();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Close when clicking outside
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
        className="flex items-center gap-2.5 px-3 py-1.5 rounded-element bg-card border border-border-subtle hover:border-border-strong text-xs transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-thermal"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <Server className="w-3.5 h-3.5 text-thermal shrink-0" />
        <div className="flex flex-col text-left">
          <span className="font-semibold text-tprimary leading-tight">
            {activeSite.name}
          </span>
          <span className="text-[10px] font-mono text-tmuted leading-none">
            {activeSite.code} · {regionLabel}
          </span>
        </div>
        <ChevronDown className="w-3.5 h-3.5 text-tmuted ml-1 shrink-0" />
      </button>

      {/* Dropdown Popover */}
      {isOpen && (
        <div className="absolute left-0 mt-2 w-72 bg-card border border-border-strong rounded-card shadow-xl z-50 p-1.5 animate-in fade-in zoom-in-95 duration-100">
          <div className="px-3 py-2 text-[10px] font-mono uppercase text-tmuted tracking-wider border-b border-border-subtle mb-1">
            DATA CENTER SITES · {regionLabel}
          </div>

          <div className="space-y-1">
            {sites.map((site) => {
              const isSelected = site.id === activeSite.id;

              return (
                <button
                  key={site.id}
                  type="button"
                  onClick={() => {
                    selectSite(site.id);
                    setIsOpen(false);
                  }}
                  className={clsx(
                    'w-full flex items-center justify-between p-2.5 rounded-element text-xs transition-colors text-left',
                    isSelected
                      ? 'bg-card-raised text-thermal font-semibold'
                      : 'hover:bg-card-raised text-tprimary'
                  )}
                >
                  <div className="flex flex-col">
                    <span className="font-medium text-tprimary">{site.name}</span>
                    <span className="font-mono text-[10px] text-tmuted">
                      {site.code} · {site.ratedThermalMW} MW Thermal · {site.coolingMedium}
                    </span>
                  </div>

                  {isSelected && <Check className="w-4 h-4 text-thermal shrink-0 ml-2" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
