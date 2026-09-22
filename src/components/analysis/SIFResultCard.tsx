import React from 'react';
import { ShieldAlert, AlertOctagon, Shield, Clock, FileText } from 'lucide-react';
import { SIFAnalysisResult, SIFClassification, SeverityLevel } from '../../types/analysis';
import { cn } from '../../lib/utils';

export interface SIFResultCardProps {
  analysis: SIFAnalysisResult;
  className?: string;
}

const getClassificationConfig = (classification: SIFClassification) => {
  switch (classification) {
    case 'SIF_ACTUAL':
      return {
        title: 'Serious Injury or Fatality (SIF Actual)',
        description: 'Confirmed serious injury or fatal outcome verified against high-energy taxonomy.',
        accentBorder: 'border-l-4 border-l-rose-600',
        dotColor: 'bg-rose-600',
        textColor: 'text-rose-900',
        subTextColor: 'text-rose-700',
        icon: AlertOctagon,
      };
    case 'SIF_POTENTIAL':
      return {
        title: 'SIF Potential Identified',
        description: 'High-energy release or critical barrier failure with realistic potential for catastrophic outcome.',
        accentBorder: 'border-l-4 border-l-amber-600',
        dotColor: 'bg-amber-600',
        textColor: 'text-amber-900',
        subTextColor: 'text-amber-700',
        icon: ShieldAlert,
      };
    case 'NON_SIF':
      return {
        title: 'Non-SIF Event / Standard Operational Deviation',
        description: 'Low-energy mechanism without catastrophic vector or missing critical barrier.',
        accentBorder: 'border-l-4 border-l-emerald-600',
        dotColor: 'bg-emerald-600',
        textColor: 'text-emerald-900',
        subTextColor: 'text-emerald-700',
        icon: Shield,
      };
  }
};

const getSeverityTone = (level: SeverityLevel) => {
  switch (level) {
    case 'Critical':
      return 'text-rose-700 font-semibold';
    case 'High':
      return 'text-amber-800 font-semibold';
    case 'Moderate':
      return 'text-slate-800 font-medium';
    case 'Low':
      return 'text-emerald-700 font-medium';
  }
};

export const SIFResultCard: React.FC<SIFResultCardProps> = ({ analysis, className }) => {
  const config = getClassificationConfig(analysis.sifClassification);
  const Icon = config.icon;

  return (
    <div className={cn('surface-card overflow-hidden', config.accentBorder, className)}>
      {/* Header bar */}
      <div className="p-5 border-b border-slate-200 bg-white flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded bg-slate-100 text-slate-800 shrink-0 border border-slate-200 mt-0.5">
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={cn('h-2 w-2 rounded-full', config.dotColor)} />
              <h2 className="text-base font-bold text-slate-900 tracking-tight">
                {config.title}
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {config.description}
            </p>
          </div>
        </div>

        {/* Metadata summary chips (Human-first rectangular key-values, no badges) */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <div className="border border-slate-200 rounded px-2.5 py-1.5 bg-slate-50/70">
            <span className="text-[10px] uppercase font-semibold text-slate-500 block leading-tight">
              Severity Level
            </span>
            <span className={getSeverityTone(analysis.severityLevel)}>
              {analysis.severityLevel} Risk
            </span>
          </div>

          <div className="border border-slate-200 rounded px-2.5 py-1.5 bg-slate-50/70">
            <span className="text-[10px] uppercase font-semibold text-slate-500 block leading-tight">
              Precursor Status
            </span>
            <span className={analysis.precursorIdentified ? 'text-amber-800 font-semibold' : 'text-slate-700'}>
              {analysis.precursorIdentified ? 'Precursor Detected' : 'No Precursor'}
            </span>
          </div>

          <div className="border border-slate-200 rounded px-2.5 py-1.5 bg-slate-50/70">
            <span className="text-[10px] uppercase font-semibold text-slate-500 block leading-tight">
              Report Ref
            </span>
            <span className="font-mono text-slate-800 font-medium">
              {analysis.id}
            </span>
          </div>
        </div>
      </div>

      {/* Body content */}
      <div className="p-5 space-y-5 bg-white">
        {/* Incident Summary */}
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1.5 flex items-center gap-1.5">
            <FileText className="h-3.5 w-3.5 text-slate-400" />
            Executive Incident Synthesis
          </div>
          <p className="text-sm text-slate-800 leading-relaxed bg-slate-50/80 p-3.5 rounded border border-slate-200">
            {analysis.summary}
          </p>
        </div>

        {/* SIF Detailed Rationale & Mechanism */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="surface-card-subtle p-4 border border-slate-200">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
              SIF Evaluation Rationale
            </div>
            <p className="text-xs text-slate-700 leading-normal">
              {analysis.detailedRationale}
            </p>
            {analysis.precursorType && (
              <div className="mt-3 pt-3 border-t border-slate-200/80">
                <span className="text-[11px] font-semibold text-slate-500 uppercase block">
                  Identified Precursor Vector:
                </span>
                <span className="text-xs font-medium text-slate-800">
                  {analysis.precursorType}
                </span>
              </div>
            )}
          </div>

          <div className="surface-card-subtle p-4 border border-slate-200">
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
              Mandated Barrier & Control Measures
            </div>
            <ul className="space-y-2">
              {analysis.recommendedControls.map((control, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-slate-800">
                  <span className="font-mono text-[10px] text-slate-500 font-semibold mt-0.5 shrink-0">
                    [{idx + 1}]
                  </span>
                  <span>{control}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Meta */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
          <div className="flex items-center gap-2">
            <Clock className="h-3.5 w-3.5 text-slate-400" />
            <span>Analysis rendered: <span className="font-mono text-slate-700">{analysis.uploadedAt}</span></span>
          </div>
          <div className="font-mono text-slate-600">
            Engine: {analysis.confidence.modelEngine} ({analysis.processingMetadata.rulesEngineStatus})
          </div>
        </div>
      </div>
    </div>
  );
};
