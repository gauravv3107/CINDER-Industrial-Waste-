import React from 'react';
import { Button } from './Button';
import { Inbox } from 'lucide-react';

export function EmptyState({
  icon: Icon = Inbox,
  title = 'No items found',
  description = 'Try adjusting your filters or search criteria.',
  actionLabel,
  onAction,
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-12 border border-dashed border-border-subtle rounded-card bg-card/50 my-6">
      <div className="w-12 h-12 rounded-full bg-card-raised border border-border-subtle flex items-center justify-center text-tmuted mb-4">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-sm font-semibold text-tprimary mb-1">{title}</h3>
      <p className="text-xs text-tmuted max-w-sm mb-6">{description}</p>
      {actionLabel && onAction && (
        <Button variant="secondary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
