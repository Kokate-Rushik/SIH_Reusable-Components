import React, { useState } from 'react';
import { FileText, Copy, Check, Search, BookOpen } from 'lucide-react';
import { EvidenceItem } from '../../types/analysis';
import { cn } from '../../lib/utils';

export interface EvidenceSnippetsCardProps {
  evidence: EvidenceItem[];
  fullIncidentText?: string;
  className?: string;
}

export const EvidenceSnippetsCard: React.FC<EvidenceSnippetsCardProps> = ({
  evidence = [],
  fullIncidentText,
  className,
}) => {
  const safeEvidence = Array.isArray(evidence) ? evidence : [];
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedEvidenceId, setSelectedEvidenceId] = useState<string>(
    safeEvidence[0]?.id || ''
  );
  const [showFullContextModal, setShowFullContextModal] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const activeSnippet =
    safeEvidence.find((e) => e.id === selectedEvidenceId) || safeEvidence[0];

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredEvidence = safeEvidence.filter((item) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      item.id?.toLowerCase().includes(query) ||
      item.sourceSection?.toLowerCase().includes(query) ||
      item.textExcerpt?.toLowerCase().includes(query) ||
      item.relevanceNote?.toLowerCase().includes(query) ||
      (item.categoryTag && item.categoryTag.toLowerCase().includes(query))
    );
  });

  const renderHighlightedExcerpt = (item: EvidenceItem) => {
    if (item.contextBefore !== undefined && item.highlightedPhrase && item.contextAfter !== undefined) {
      return (
        <span className="leading-relaxed">
          <span>{item.contextBefore} </span>
          <mark className="bg-amber-100 text-slate-950 font-medium px-1.5 py-0.5 rounded-xs border-b-2 border-amber-500">
            {item.highlightedPhrase}
          </mark>
          <span> {item.contextAfter}</span>
        </span>
      );
    }

    // Default formatting if exact context chunks are not separated
    return <span>{item.textExcerpt || 'No excerpt available.'}</span>;
  };

  return (
    <div className={cn('surface-card overflow-hidden', className)}>
      {/* Header Bar */}
      <div className="p-5 border-b border-slate-200 bg-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded bg-slate-100 text-slate-800 shrink-0 border border-slate-200 mt-0.5">
            <FileText className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900 tracking-tight">
              Evidence Snippets & Contextual Grounding
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Exact documentary citations extracted from source report with high-energy phrase highlighting.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Search filter */}
          <div className="relative">
            <Search className="h-3.5 w-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search citations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1 bg-slate-50 border border-slate-300 rounded text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-500 w-40 sm:w-48"
            />
          </div>

          {fullIncidentText && (
            <button
              type="button"
              onClick={() => setShowFullContextModal(true)}
              className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 rounded text-xs font-medium transition-colors"
            >
              <BookOpen className="h-3.5 w-3.5" />
              <span>Full Narrative View</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Snippet Container: Interactive Master-Detail Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 bg-white">
        {/* Left column: Snippet Index List (5 cols) */}
        <div className="lg:col-span-5 p-4 space-y-2.5 max-h-[480px] overflow-y-auto bg-slate-50/40">
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-1">
            <span>Extracted Evidence Citations ({filteredEvidence.length})</span>
            <span>Match %</span>
          </div>

          {filteredEvidence.length === 0 ? (
            <div className="p-6 text-center text-xs text-slate-500 bg-white border border-slate-200 rounded">
              No citations matching &quot;{searchQuery}&quot;.
            </div>
          ) : (
            filteredEvidence.map((item) => {
              const isSelected = item.id === (activeSnippet?.id || '');
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedEvidenceId(item.id)}
                  className={cn(
                    'w-full text-left p-3 rounded-md border transition-all space-y-1.5',
                    isSelected
                      ? 'bg-white border-slate-900 shadow-xs ring-1 ring-slate-900'
                      : 'bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white'
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="font-mono text-[11px] font-bold text-slate-900 bg-slate-100 px-1.5 py-0.5 border border-slate-200 rounded shrink-0">
                        {item.id}
                      </span>
                      <span className="text-xs font-semibold text-slate-800 truncate">
                        {item.sourceSection}
                      </span>
                    </div>

                    <span className="font-mono text-[11px] text-slate-600 font-semibold shrink-0">
                      {item.confidenceScore}%
                    </span>
                  </div>

                  {item.categoryTag && (
                    <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                      Tag: <span className="text-slate-800 font-medium">{item.categoryTag}</span>
                    </div>
                  )}

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {item.textExcerpt ? item.textExcerpt.replace(/^["']|["']$/g, '') : 'No excerpt available.'}
                  </p>
                </button>
              );
            })
          )}
        </div>

        {/* Right column: Active Snippet Detail & Grounding Inspector (7 cols) */}
        <div className="lg:col-span-7 p-5 space-y-4">
          {activeSnippet ? (
            <>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-slate-900 bg-slate-100 px-2 py-0.5 border border-slate-200 rounded">
                    {activeSnippet.id}
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">
                      {activeSnippet.sourceSection}
                    </h4>
                    {(activeSnippet.pageNumber || activeSnippet.lineNumber) && (
                      <span className="text-[11px] text-slate-500 font-mono">
                        {activeSnippet.pageNumber && `Page ${activeSnippet.pageNumber}`}
                        {activeSnippet.pageNumber && activeSnippet.lineNumber && ' • '}
                        {activeSnippet.lineNumber && `Line ${activeSnippet.lineNumber}`}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {activeSnippet.categoryTag && (
                    <div className="border border-slate-200 rounded px-2 py-0.5 bg-slate-50 text-[11px] font-mono text-slate-700">
                      {activeSnippet.categoryTag}
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => handleCopy(activeSnippet.id, activeSnippet.textExcerpt)}
                    className="flex items-center gap-1 px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded text-xs font-medium transition-colors"
                    title="Copy exact cited text"
                  >
                    {copiedId === activeSnippet.id ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-700" />
                        <span className="text-emerald-700">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy Quote</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Highlighted text container */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">
                  Grounding Text Excerpt (With Key Precursor Span)
                </span>
                <div className="p-4 rounded border border-slate-200 bg-slate-50/60 font-serif text-sm text-slate-800 leading-relaxed">
                  &ldquo;{renderHighlightedExcerpt(activeSnippet)}&rdquo;
                </div>
              </div>

              {/* Relevance to SIF Matrix */}
              <div className="p-3.5 rounded bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">
                  Determinant Relevance for SIF Classification
                </span>
                <p className="text-xs text-slate-800 leading-normal">
                  {activeSnippet.relevanceNote}
                </p>
              </div>

              {/* Extraction Confidence Telemetry */}
              <div className="grid grid-cols-2 gap-3 pt-1 text-xs">
                <div className="p-2.5 rounded border border-slate-200 bg-white">
                  <span className="text-[10px] uppercase font-semibold text-slate-500 block">
                    Extraction Confidence
                  </span>
                  <span className="font-mono text-sm font-bold text-slate-900">
                    {activeSnippet.confidenceScore}% Match
                  </span>
                </div>
                <div className="p-2.5 rounded border border-slate-200 bg-white">
                  <span className="text-[10px] uppercase font-semibold text-slate-500 block">
                    Verification State
                  </span>
                  <span className="text-slate-800 font-medium">
                    Grounding Trace Verified
                  </span>
                </div>
              </div>
            </>
          ) : (
            <div className="p-8 text-center text-xs text-slate-500">
              Select an evidence snippet on the left to inspect detailed grounding.
            </div>
          )}
        </div>
      </div>

      {/* Optional Full Narrative Modal */}
      {showFullContextModal && fullIncidentText && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg border border-slate-300 shadow-xl max-w-3xl w-full max-h-[85vh] flex flex-col overflow-hidden">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-slate-700" />
                <h3 className="text-sm font-bold text-slate-900">
                  Full Source Incident Narrative & Contextual Stream
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowFullContextModal(false)}
                className="px-2.5 py-1 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-200 rounded"
              >
                Close
              </button>
            </div>

            <div className="p-6 overflow-y-auto font-mono text-xs text-slate-800 leading-relaxed bg-white whitespace-pre-wrap">
              {fullIncidentText}
            </div>

            <div className="p-3 border-t border-slate-200 bg-slate-50 text-[11px] text-slate-500 flex items-center justify-between">
              <span>Source Document Audited by Determinant SIF Engine</span>
              <button
                type="button"
                onClick={() => setShowFullContextModal(false)}
                className="px-3 py-1 bg-slate-900 text-white rounded text-xs font-medium"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
