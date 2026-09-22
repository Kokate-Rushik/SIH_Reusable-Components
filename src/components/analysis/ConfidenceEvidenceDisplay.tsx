import React, { useState } from 'react';
import { Target, Copy, Check } from 'lucide-react';
import { ConfidenceAssessment, EvidenceItem } from '../../types/analysis';
import { cn } from '../../lib/utils';

export interface ConfidenceEvidenceDisplayProps {
  confidence: ConfidenceAssessment;
  evidence: EvidenceItem[];
  className?: string;
}

export const ConfidenceEvidenceDisplay: React.FC<ConfidenceEvidenceDisplayProps> = ({
  confidence,
  evidence = [],
  className,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getConfidenceLevelStyle = (level: string) => {
    switch (level) {
      case 'HIGH':
        return 'text-emerald-800 border-emerald-300 bg-emerald-50/50';
      case 'MEDIUM':
        return 'text-amber-800 border-amber-300 bg-amber-50/50';
      case 'LOW':
        return 'text-rose-800 border-rose-300 bg-rose-50/50';
      default:
        return 'text-slate-800 border-slate-300 bg-slate-50';
    }
  };

  const factors = confidence?.factors || [];
  const safeEvidence = Array.isArray(evidence) ? evidence : [];

  return (
    <div className={cn('space-y-6', className)}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Overall Confidence & Factor Weights */}
        <div className="surface-card p-5 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-slate-700" />
              <h3 className="text-sm font-semibold text-slate-900 tracking-tight">
                Confidence Assessment
              </h3>
            </div>
            <div className={cn('px-2 py-0.5 border text-xs font-semibold rounded', getConfidenceLevelStyle(confidence?.level || 'MEDIUM'))}>
              {confidence?.level || 'MEDIUM'} CONFIDENCE
            </div>
          </div>

          {/* Primary Score Dial / Gauge Representation */}
          <div className="flex items-baseline gap-3">
            <div className="text-4xl font-bold tracking-tight text-slate-900 font-mono">
              {confidence?.overallScore ?? 0}%
            </div>
            <div className="text-xs text-slate-500">
              Calibration error: <span className="font-mono text-slate-700">{confidence?.calibratedMargin || '±2.0%'}</span>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
              Confidence Factor Breakdown
            </span>
            <div className="space-y-3">
              {factors.length === 0 ? (
                <div className="text-xs text-slate-500 py-2">No individual factor scores available.</div>
              ) : (
                factors.map((factor, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-800 font-medium truncate pr-2">
                        {factor.name}
                      </span>
                      <span className="font-mono text-slate-600 text-[11px] shrink-0">
                        {factor.score}% ({factor.weight})
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-slate-800 rounded-full"
                        style={{ width: `${factor.score}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-slate-500 leading-tight">
                      {factor.description}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Column (2 spans): Documentary Evidence Extraction */}
        <div className="lg:col-span-2 surface-card p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-semibold text-slate-900 tracking-tight">
                Documentary Evidence & Grounding
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Exact text spans and citations extracted from the submitted incident report.
              </p>
            </div>
            <div className="text-xs text-slate-500 font-mono">
              {safeEvidence.length} Cited Excerpts
            </div>
          </div>

          <div className="space-y-3">
            {safeEvidence.length === 0 ? (
              <div className="text-xs text-slate-500 p-6 text-center border border-slate-200 rounded">
                No citations or documentary excerpts referenced in this report.
              </div>
            ) : (
              safeEvidence.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-md border border-slate-200 bg-slate-50/60 hover:bg-slate-50 transition-colors space-y-2.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-semibold text-slate-900 bg-white px-2 py-0.5 border border-slate-200 rounded">
                        {item.id}
                      </span>
                      <span className="text-xs font-semibold text-slate-700">
                        {item.sourceSection}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-[11px] text-slate-500 font-mono">
                        Match: <span className="font-semibold text-slate-800">{item.confidenceScore}%</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopy(item.id, item.textExcerpt)}
                        className="p-1 text-slate-400 hover:text-slate-700 rounded transition-colors"
                        title="Copy excerpt"
                      >
                        {copiedId === item.id ? (
                          <Check className="h-3.5 w-3.5 text-emerald-700" />
                        ) : (
                          <Copy className="h-3.5 w-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="relative pl-3 border-l-2 border-slate-400 italic text-xs text-slate-800 leading-relaxed font-serif bg-white/70 p-2.5 rounded-r">
                    {item.textExcerpt}
                  </div>

                  <div className="text-xs text-slate-600 flex items-start gap-1.5 pt-1">
                    <span className="font-semibold text-slate-500 shrink-0 text-[11px] uppercase">
                      Audit Relevance:
                    </span>
                    <span>{item.relevanceNote}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
