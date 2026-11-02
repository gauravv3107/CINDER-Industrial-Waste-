import React, { useRef, useEffect } from 'react';
import { useSearch } from '../../context/SearchContext';
import { useHotkey } from '../../hooks/useHotkey';
import { Search, X, Building, Cpu, Briefcase, ArrowRight } from 'lucide-react';
import clsx from 'clsx';

export function GlobalSearch() {
  const {
    isOpen,
    query,
    setQuery,
    openSearch,
    closeSearch,
    results,
    selectResult,
  } = useSearch();

  const inputRef = useRef(null);

  // Global hotkeys: ⌘K or Ctrl+K to open, Esc to close
  useHotkey('k', openSearch, { metaKey: true, preventDefault: true });
  useHotkey('Escape', closeSearch);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  return (
    <>
      {/* Header Search Trigger Button */}
      <button
        type="button"
        onClick={openSearch}
        className="flex items-center gap-2.5 px-3 py-1.5 rounded-element bg-card border border-border-subtle hover:border-border-strong text-xs text-tmuted hover:text-tsecondary transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-thermal select-none"
        aria-label="Open search"
      >
        <Search className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Search network, hardware, jobs...</span>
        <span className="sm:hidden">Search...</span>
        <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded bg-card-raised border border-border-subtle font-mono text-[10px] text-tmuted font-medium">
          ⌘K
        </kbd>
      </button>

      {/* Modal Dialog Overlay when open */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
            onClick={closeSearch}
            aria-hidden="true"
          />

          {/* Search Box */}
          <div className="relative w-full max-w-xl bg-card border border-border-strong rounded-panel shadow-2xl z-10 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-100">
            {/* Input Bar */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border-subtle">
              <Search className="w-4 h-4 text-tmuted shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search facilities, GPUs, cooling rigs, or jobs..."
                className="w-full bg-transparent text-sm text-tprimary placeholder:text-tmuted focus:outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="p-1 text-tmuted hover:text-tprimary"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <kbd className="font-mono text-[10px] text-tmuted px-1.5 py-0.5 rounded bg-card-raised border border-border-subtle select-none">
                ESC
              </kbd>
            </div>

            {/* Results Popover Body */}
            <div className="max-h-96 overflow-y-auto p-3 text-xs">
              {!query.trim() ? (
                <div className="py-8 text-center text-tmuted">
                  <p>Type to search across the Northern Virginia circular network</p>
                  <div className="flex items-center justify-center gap-2 mt-2 font-mono text-[10px]">
                    <span className="px-2 py-0.5 rounded bg-card-raised border border-border-subtle">H100</span>
                    <span className="px-2 py-0.5 rounded bg-card-raised border border-border-subtle">Potomac</span>
                    <span className="px-2 py-0.5 rounded bg-card-raised border border-border-subtle">HVAC Retrofit</span>
                  </div>
                </div>
              ) : results.total === 0 ? (
                <div className="py-8 text-center text-tmuted">
                  No matching facilities, hardware, or contracts found.
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Facilities Group */}
                  {results.facilities.length > 0 && (
                    <div>
                      <div className="micro-label px-2 mb-1 flex items-center gap-1.5">
                        <Building className="w-3 h-3 text-thermal" />
                        <span>Compatible Facilities ({results.facilities.length})</span>
                      </div>
                      <div className="space-y-0.5">
                        {results.facilities.map((fac) => (
                          <button
                            key={fac.id}
                            type="button"
                            onClick={() => selectResult('facility', fac)}
                            className="w-full flex items-center justify-between p-2 rounded-element hover:bg-card-raised text-left transition-colors group"
                          >
                            <div>
                              <div className="font-medium text-tprimary group-hover:text-thermal">
                                {fac.name}
                              </div>
                              <div className="text-[11px] text-tmuted">
                                {fac.type} · {fac.city} ({fac.distanceKm} km)
                              </div>
                            </div>
                            <span className="font-mono text-[11px] text-emerald-500 font-semibold">
                              {fac.heatDemandMW} MW
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Hardware Group */}
                  {results.hardware.length > 0 && (
                    <div>
                      <div className="micro-label px-2 mb-1 flex items-center gap-1.5">
                        <Cpu className="w-3 h-3 text-sky-400" />
                        <span>Hardware Listings ({results.hardware.length})</span>
                      </div>
                      <div className="space-y-0.5">
                        {results.hardware.map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => selectResult('hardware', item)}
                            className="w-full flex items-center justify-between p-2 rounded-element hover:bg-card-raised text-left transition-colors group"
                          >
                            <div>
                              <div className="font-medium text-tprimary group-hover:text-thermal">
                                {item.title}
                              </div>
                              <div className="font-mono text-[10px] text-tmuted">
                                {item.id} · {item.condition} · {item.seller}
                              </div>
                            </div>
                            <span className="font-mono text-[11px] text-thermal font-semibold">
                              ${item.currentBid.toLocaleString()}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Contracts Group */}
                  {results.jobs.length > 0 && (
                    <div>
                      <div className="micro-label px-2 mb-1 flex items-center gap-1.5">
                        <Briefcase className="w-3 h-3 text-emerald-400" />
                        <span>Green Infrastructure Contracts ({results.jobs.length})</span>
                      </div>
                      <div className="space-y-0.5">
                        {results.jobs.map((job) => (
                          <button
                            key={job.id}
                            type="button"
                            onClick={() => selectResult('job', job)}
                            className="w-full flex items-center justify-between p-2 rounded-element hover:bg-card-raised text-left transition-colors group"
                          >
                            <div>
                              <div className="font-medium text-tprimary group-hover:text-thermal">
                                {job.title}
                              </div>
                              <div className="text-[11px] text-tmuted">
                                {job.company} · {job.city}
                              </div>
                            </div>
                            <span className="font-mono text-[11px] text-emerald-500 font-semibold">
                              ${job.rateMin}–${job.rateMax}/hr
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Modal Footer Key Navigation Helper */}
            <div className="flex items-center justify-between px-4 py-2 border-t border-border-subtle text-[10px] font-mono text-tmuted bg-card-raised select-none">
              <span>Navigation: Tab to cycle</span>
              <span>Enter to view</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
