import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';
import { LifeSavingRule, LSRStatus } from '../../types/analysis';
import { cn } from '../../lib/utils';

export interface LifeSavingRulesSectionProps {
  rules: LifeSavingRule[];
  className?: string;
}

export const LifeSavingRulesSection: React.FC<LifeSavingRulesSectionProps> = ({
  rules = [],
  className,
}) => {
  const safeRules = Array.isArray(rules) ? rules : [];
  const [filter, setFilter] = useState<'ALL' | 'ACTIONABLE' | 'COMPLIANT'>('ALL');

  const filteredRules = safeRules.filter((rule) => {
    if (filter === 'ACTIONABLE') {
      return rule.status === 'BREACHED' || rule.status === 'AT_RISK';
    }
    if (filter === 'COMPLIANT') {
      return rule.status === 'COMPLIANT';
    }
    return true;
  });

  const breachedCount = safeRules.filter((r) => r.status === 'BREACHED').length;
  const atRiskCount = safeRules.filter((r) => r.status === 'AT_RISK').length;
  const compliantCount = safeRules.filter((r) => r.status === 'COMPLIANT').length;

  const getStatusDisplay = (status: LSRStatus) => {
    switch (status) {
      case 'BREACHED':
        return {
          label: 'CRITICAL BREACH',
          boxStyle: 'text-rose-900 border-rose-300 bg-rose-50/60',
          accentBorder: 'border-l-4 border-l-rose-600',
          icon: XCircle,
          iconColor: 'text-rose-600',
        };
      case 'AT_RISK':
        return {
          label: 'BARRIER COMPROMISED / AT RISK',
          boxStyle: 'text-amber-900 border-amber-300 bg-amber-50/60',
          accentBorder: 'border-l-4 border-l-amber-600',
          icon: AlertTriangle,
          iconColor: 'text-amber-600',
        };
      case 'COMPLIANT':
        return {
          label: 'BARRIER VERIFIED / ADHERED',
          boxStyle: 'text-emerald-900 border-emerald-300 bg-emerald-50/60',
          accentBorder: 'border-l-4 border-l-emerald-600',
          icon: CheckCircle2,
          iconColor: 'text-emerald-600',
        };
      case 'NOT_APPLICABLE':
      default:
        return {
          label: 'NOT APPLICABLE',
          boxStyle: 'text-slate-700 border-slate-200 bg-slate-50',
          accentBorder: 'border-l-4 border-l-slate-300',
          icon: ShieldCheck,
          iconColor: 'text-slate-400',
        };
    }
  };

  return (
    <div className={cn('surface-card overflow-hidden', className)}>
      {/* Header Bar */}
      <div className="p-5 border-b border-slate-200 bg-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded bg-slate-100 text-slate-800 shrink-0 border border-slate-200 mt-0.5">
            <ShieldAlert className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900 tracking-tight">
              Life-Saving Rules (LSR) Protocol Audit
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Deterministic evaluation against plant-mandated critical life-saving barrier standards.
            </p>
          </div>
        </div>

        {/* Status Counters & Filter Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Summary counters */}
          <div className="flex items-center gap-1.5 border border-slate-200 rounded px-2.5 py-1 bg-slate-50/80 text-xs">
            <span className="font-semibold text-rose-700">{breachedCount} Breached</span>
            <span className="text-slate-300">•</span>
            <span className="font-semibold text-amber-700">{atRiskCount} At Risk</span>
            <span className="text-slate-300">•</span>
            <span className="font-semibold text-emerald-700">{compliantCount} Compliant</span>
          </div>

          {/* Filter button group */}
          <div className="flex items-center border border-slate-300 rounded overflow-hidden text-xs bg-white">
            <button
              type="button"
              onClick={() => setFilter('ALL')}
              className={cn(
                'px-2.5 py-1 font-medium transition-colors',
                filter === 'ALL'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              )}
            >
              All ({rules.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter('ACTIONABLE')}
              className={cn(
                'px-2.5 py-1 font-medium transition-colors border-l border-slate-200',
                filter === 'ACTIONABLE'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              )}
            >
              Actionable ({breachedCount + atRiskCount})
            </button>
            <button
              type="button"
              onClick={() => setFilter('COMPLIANT')}
              className={cn(
                'px-2.5 py-1 font-medium transition-colors border-l border-slate-200',
                filter === 'COMPLIANT'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              )}
            >
              Compliant ({compliantCount})
            </button>
          </div>
        </div>
      </div>

      {/* Rules list */}
      <div className="p-5 space-y-4 bg-slate-50/30">
        {filteredRules.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-500 bg-white border border-slate-200 rounded">
            No Life-Saving Rules match the selected filter criterion.
          </div>
        ) : (
          filteredRules.map((rule) => {
            const statusConfig = getStatusDisplay(rule.status);
            const StatusIcon = statusConfig.icon;

            return (
              <div
                key={rule.id}
                className={cn(
                  'bg-white rounded-md border border-slate-200 p-4 space-y-3.5 transition-shadow hover:shadow-xs',
                  statusConfig.accentBorder
                )}
              >
                {/* Top row: Rule ID, Title, Status */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-2.5 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-xs font-bold text-slate-900 bg-slate-100 px-2 py-0.5 border border-slate-200 rounded">
                      {rule.ruleCode}
                    </span>
                    <h4 className="text-sm font-semibold text-slate-900">
                      {rule.name}
                    </h4>
                    <span className="text-[11px] text-slate-500 font-medium">
                      ({rule.category})
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        'px-2 py-0.5 border text-[11px] font-semibold rounded flex items-center gap-1.5',
                        statusConfig.boxStyle
                      )}
                    >
                      <StatusIcon className={cn('h-3.5 w-3.5', statusConfig.iconColor)} />
                      <span>{statusConfig.label}</span>
                    </div>
                  </div>
                </div>

                {/* Core description */}
                <p className="text-xs text-slate-600 leading-relaxed">
                  {rule.description}
                </p>

                {/* Details Breakdown Matrix */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                  <div className="p-2.5 rounded bg-slate-50/70 border border-slate-200/80 space-y-1">
                    <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">
                      Required Critical Barrier
                    </span>
                    <p className="text-xs text-slate-800 leading-normal font-medium">
                      {rule.criticalBarrier}
                    </p>
                  </div>

                  <div className="p-2.5 rounded bg-slate-50/70 border border-slate-200/80 space-y-1">
                    <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">
                      Observed Operational Deviation
                    </span>
                    <p className="text-xs text-slate-800 leading-normal">
                      {rule.deviationObserved}
                    </p>
                  </div>

                  <div className="p-2.5 rounded bg-slate-50/70 border border-slate-200/80 space-y-1">
                    <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">
                      Mandated Corrective Action
                    </span>
                    <p className="text-xs text-slate-800 leading-normal">
                      {rule.mitigationAction}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
