import React from 'react';
import { AlertTriangle, RefreshCw, ArrowLeft } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface ErrorStateProps {
  title?: string;
  message?: string;
  errorCode?: string | number;
  onRetry?: () => void;
  onBack?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Unable to Load Data',
  message = 'An unexpected error occurred while communicating with the SIF analysis service.',
  errorCode,
  onRetry,
  onBack,
  className,
}) => {
  return (
    <div
      className={cn(
        'surface-card p-8 text-center flex flex-col items-center justify-center border-slate-300 space-y-4 max-w-lg mx-auto my-6',
        className
      )}
    >
      <div className="h-11 w-11 rounded bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-700">
        <AlertTriangle className="h-5 w-5" />
      </div>

      <div className="space-y-1">
        <h3 className="text-base font-bold text-slate-900 tracking-tight">
          {title}
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed max-w-md">
          {message}
        </p>
      </div>

      {errorCode && (
        <div className="font-mono text-[11px] text-slate-500 bg-slate-100 px-2.5 py-1 rounded border border-slate-200">
          Diagnostic Code: {errorCode}
        </div>
      )}

      <div className="flex items-center gap-2 pt-2">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-medium transition-colors border border-slate-200"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Return</span>
          </button>
        )}

        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-medium transition-colors shadow-xs"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Retry Connection</span>
          </button>
        )}
      </div>
    </div>
  );
};
