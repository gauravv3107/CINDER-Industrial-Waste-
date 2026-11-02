import React from 'react';
import clsx from 'clsx';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function Pagination({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  totalItems,
  pageSize = 6,
  itemNoun = 'listings',
  disclaimer = 'Bids in USD, excluding logistics',
}) {
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  // Generate page numbers
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 border-t border-border-subtle mt-8 text-xs text-tsecondary">
      <div>
        Showing <span className="font-semibold text-tprimary">{startItem}–{endItem}</span> of{' '}
        <span className="font-semibold text-tprimary">{totalItems}</span> {itemNoun}
        {disclaimer && <span className="text-tmuted"> · {disclaimer}</span>}
      </div>

      <div className="flex items-center gap-1.5 select-none">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="p-1.5 rounded-lg border border-border-subtle hover:bg-card-raised disabled:opacity-40 disabled:pointer-events-none transition-colors"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {pages.map((p) => {
          const isCurrent = p === currentPage;
          return (
            <button
              key={p}
              type="button"
              onClick={() => onPageChange(p)}
              className={clsx(
                'min-w-8 h-8 rounded-lg font-mono text-xs font-medium transition-colors flex items-center justify-center',
                isCurrent
                  ? 'bg-thermal text-white font-semibold shadow-sm'
                  : 'hover:bg-card-raised text-tsecondary hover:text-tprimary border border-transparent hover:border-border-subtle'
              )}
            >
              {p}
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="p-1.5 rounded-lg border border-border-subtle hover:bg-card-raised disabled:opacity-40 disabled:pointer-events-none transition-colors"
          aria-label="Next page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
