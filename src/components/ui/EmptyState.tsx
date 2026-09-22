import React from 'react';
import { Inbox, Plus } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No Records Found',
  description = 'There are no active records matching the selected filter criteria or time period.',
  icon: Icon = Inbox,
  actionLabel,
  onAction,
  className,
}) => {
  return (
    <div
      className={cn(
        'surface-card p-8 text-center flex flex-col items-center justify-center space-y-3.5',
        className
      )}
    >
      <div className="h-10 w-10 rounded bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500">
        <Icon className="h-5 w-5" />
      </div>

      <div className="space-y-1 max-w-sm">
        <h4 className="text-sm font-semibold text-slate-900">{title}</h4>
        <p className="text-xs text-slate-500 leading-normal">{description}</p>
      </div>

      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-2 flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-medium transition-colors shadow-xs"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>{actionLabel}</span>
        </button>
      )}
    </div>
  );
};
