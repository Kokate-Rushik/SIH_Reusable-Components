import React from 'react';
import { cn } from '../../lib/utils';

export interface LoadingSkeletonProps {
  variant?: 'card' | 'metric' | 'table' | 'chart' | 'text' | 'custom';
  count?: number;
  className?: string;
  height?: string | number;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  variant = 'card',
  count = 1,
  className,
  height,
}) => {
  const renderItem = (key: number) => {
    switch (variant) {
      case 'metric':
        return (
          <div key={key} className="surface-card p-5 space-y-3 animate-pulse">
            <div className="flex justify-between items-center">
              <div className="h-3 w-24 bg-slate-200 rounded" />
              <div className="h-4 w-4 bg-slate-200 rounded" />
            </div>
            <div className="h-7 w-32 bg-slate-200 rounded" />
            <div className="h-3 w-40 bg-slate-100 rounded" />
          </div>
        );

      case 'chart':
        return (
          <div key={key} className="surface-card p-5 space-y-4 animate-pulse">
            <div className="space-y-1.5">
              <div className="h-4 w-48 bg-slate-200 rounded" />
              <div className="h-3 w-72 bg-slate-100 rounded" />
            </div>
            <div
              className="w-full bg-slate-100 rounded flex items-end p-4 gap-3"
              style={{ height: height || 260 }}
            >
              <div className="w-full bg-slate-200/80 rounded-t h-3/5" />
              <div className="w-full bg-slate-200/80 rounded-t h-4/5" />
              <div className="w-full bg-slate-200/80 rounded-t h-2/5" />
              <div className="w-full bg-slate-200/80 rounded-t h-5/6" />
              <div className="w-full bg-slate-200/80 rounded-t h-1/2" />
            </div>
          </div>
        );

      case 'table':
        return (
          <div key={key} className="surface-card overflow-hidden animate-pulse">
            <div className="p-4 border-b border-slate-100 flex justify-between">
              <div className="h-4 w-36 bg-slate-200 rounded" />
              <div className="h-3 w-20 bg-slate-100 rounded" />
            </div>
            <div className="divide-y divide-slate-100">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="p-3.5 flex items-center justify-between gap-4">
                  <div className="h-3.5 w-28 bg-slate-200 rounded" />
                  <div className="h-3.5 w-44 bg-slate-100 rounded" />
                  <div className="h-3.5 w-16 bg-slate-200 rounded" />
                  <div className="h-3.5 w-20 bg-slate-100 rounded" />
                </div>
              ))}
            </div>
          </div>
        );

      case 'text':
        return (
          <div key={key} className="space-y-2 animate-pulse">
            <div className="h-3.5 w-full bg-slate-200 rounded" />
            <div className="h-3.5 w-5/6 bg-slate-100 rounded" />
            <div className="h-3.5 w-4/6 bg-slate-100 rounded" />
          </div>
        );

      case 'card':
      default:
        return (
          <div
            key={key}
            className={cn('surface-card p-5 space-y-3.5 animate-pulse', className)}
            style={{ height }}
          >
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <div className="h-4 w-40 bg-slate-200 rounded" />
              <div className="h-4 w-20 bg-slate-100 rounded" />
            </div>
            <div className="space-y-2 pt-1">
              <div className="h-3 w-full bg-slate-200/80 rounded" />
              <div className="h-3 w-4/5 bg-slate-100 rounded" />
            </div>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="h-12 bg-slate-100 rounded" />
              <div className="h-12 bg-slate-100 rounded" />
            </div>
          </div>
        );
    }
  };

  return (
    <div className={cn('w-full', count > 1 && 'space-y-4', className)}>
      {[...Array(count)].map((_, i) => renderItem(i))}
    </div>
  );
};
