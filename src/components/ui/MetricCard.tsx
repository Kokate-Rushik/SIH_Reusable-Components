import React from 'react';
import { cn } from '../../lib/utils';

export interface MetricCardProps {
  label: string;
  value: string | number;
  secondaryText?: string;
  trend?: {
    value: string;
    positive?: boolean;
  };
  icon?: React.ComponentType<{ className?: string }>;
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  secondaryText,
  trend,
  icon: Icon,
  className,
}) => {
  return (
    <div className={cn('surface-card p-5 flex flex-col justify-between', className)}>
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          {label}
        </span>
        {Icon && (
          <span className="text-slate-400">
            <Icon className="h-4 w-4" />
          </span>
        )}
      </div>

      <div className="mt-3">
        <div className="text-2xl font-bold tracking-tight text-slate-900">
          {value}
        </div>

        {(secondaryText || trend) && (
          <div className="mt-2 flex items-center gap-2 text-xs text-slate-600">
            {trend && (
              <span
                className={cn(
                  'font-medium',
                  trend.positive === true && 'text-emerald-700',
                  trend.positive === false && 'text-rose-700',
                  trend.positive === undefined && 'text-slate-600'
                )}
              >
                {trend.value}
              </span>
            )}
            {secondaryText && <span>{secondaryText}</span>}
          </div>
        )}
      </div>
    </div>
  );
};
