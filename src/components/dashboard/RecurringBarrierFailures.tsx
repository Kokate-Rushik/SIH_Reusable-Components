import React, { useState } from 'react';
import { ShieldAlert } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface BarrierFailureItem {
  id: string;
  barrierName: string;
  category: string;
  totalAudits: number;
  breachCount: number;
  breachRate: string;
  trendTrajectory: string;
  isIncreasing: boolean;
  severity: 'Critical' | 'High' | 'Moderate';
  primaryFailureMode: string;
  mandatedMitigation: string;
  responsibleLead: string;
}

const mockBarrierFailures: BarrierFailureItem[] = [
  {
    id: 'BARRIER-01',
    barrierName: 'Pedestrian Transit Interlocked Exclusion Gates',
    category: 'Overhead Lifting / Suspended Loads',
    totalAudits: 412,
    breachCount: 38,
    breachRate: '9.22%',
    trendTrajectory: '+2.4% vs last period',
    isIncreasing: true,
    severity: 'Critical',
    primaryFailureMode: 'Aisle gates manually propped open during active gantry traversal.',
    mandatedMitigation: 'Install automated electromagnetic interlocks tied to crane limit switches.',
    responsibleLead: 'Rigging & Yard Safety Lead',
  },
  {
    id: 'BARRIER-02',
    barrierName: 'Live-Dead-Live Zero Energy Instrument Verification',
    category: 'High-Voltage Electrical Isolation',
    totalAudits: 580,
    breachCount: 42,
    breachRate: '7.24%',
    trendTrajectory: '+1.8% vs last period',
    isIncreasing: true,
    severity: 'Critical',
    primaryFailureMode: 'Visual assumption of breaker position without multi-meter contact test.',
    mandatedMitigation: 'Mandate digital two-technician signature verification on isolation log.',
    responsibleLead: 'Chief Electrical Safety Engineer',
  },
  {
    id: 'BARRIER-03',
    barrierName: 'Secondary Auxiliary Hoist Holding Brake Redundancy',
    category: 'Mechanical Crane Hoisting',
    totalAudits: 290,
    breachCount: 16,
    breachRate: '5.51%',
    trendTrajectory: '-0.8% vs last period',
    isIncreasing: false,
    severity: 'High',
    primaryFailureMode: 'Auxiliary holding brake left in bypass mode post-maintenance shift.',
    mandatedMitigation: 'Enforce keyed captive-interlock exchange prior to hoist release.',
    responsibleLead: 'Plant Mechanical Maintenance Lead',
  },
  {
    id: 'BARRIER-04',
    barrierName: 'Category 4 Arc-Rated PPE (40 cal/cm2)',
    category: 'Electrical Switchgear Protection',
    totalAudits: 340,
    breachCount: 14,
    breachRate: '4.12%',
    trendTrajectory: '-1.2% vs last period',
    isIncreasing: false,
    severity: 'High',
    primaryFailureMode: 'Technicians wearing lower-rated (8 cal) shield for convenience in heat.',
    mandatedMitigation: 'Issue ventilated Category 4 powered-air hoods across substation units.',
    responsibleLead: 'HSE Equipment Coordinator',
  },
  {
    id: 'BARRIER-05',
    barrierName: 'High-Pressure Ammonia Double Block-and-Bleed',
    category: 'Chemical Process Containment',
    totalAudits: 620,
    breachCount: 11,
    breachRate: '1.77%',
    trendTrajectory: 'Stable tolerance',
    isIncreasing: false,
    severity: 'Moderate',
    primaryFailureMode: 'Gasket re-torque deviation during thermal expansion cycles.',
    mandatedMitigation: 'Automated acoustic leak detection sensors deployed on high-pressure manifolds.',
    responsibleLead: 'Process Safety Superintendent',
  },
];

export const RecurringBarrierFailures: React.FC = () => {
  const [selectedSeverity, setSelectedSeverity] = useState<string>('ALL');

  const filteredFailures = mockBarrierFailures.filter((item) => {
    if (selectedSeverity === 'ALL') return true;
    return item.severity.toUpperCase() === selectedSeverity;
  });

  const getSeverityStyle = (severity: 'Critical' | 'High' | 'Moderate') => {
    switch (severity) {
      case 'Critical':
        return 'text-rose-800 border-rose-300 bg-rose-50/70 font-semibold';
      case 'High':
        return 'text-amber-800 border-amber-300 bg-amber-50/70 font-semibold';
      case 'Moderate':
        return 'text-slate-800 border-slate-300 bg-slate-50 font-medium';
    }
  };

  return (
    <div className="surface-card overflow-hidden">
      {/* Header Bar */}
      <div className="p-5 border-b border-slate-200 bg-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded bg-slate-100 text-slate-800 shrink-0 border border-slate-200 mt-0.5">
            <ShieldAlert className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900 tracking-tight">
              Recurring Critical Barrier Failure Breakdown
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Systemic tracking of bypassed, compromised, or recurringly breached life-saving controls.
            </p>
          </div>
        </div>

        {/* Severity Filter */}
        <div className="flex items-center gap-2">
          <label htmlFor="barrier-filter" className="text-xs font-semibold text-slate-600 uppercase tracking-wider shrink-0">
            Criticality:
          </label>
          <select
            id="barrier-filter"
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value)}
            className="bg-white border border-slate-300 rounded px-2.5 py-1 text-xs text-slate-900 font-medium focus:outline-none focus:border-slate-500"
          >
            <option value="ALL">All Barriers ({mockBarrierFailures.length})</option>
            <option value="CRITICAL">Critical Severity</option>
            <option value="HIGH">High Severity</option>
            <option value="MODERATE">Moderate Severity</option>
          </select>
        </div>
      </div>

      {/* Barrier Cards List */}
      <div className="p-5 space-y-4 bg-slate-50/30">
        <div className="grid grid-cols-1 gap-4">
          {filteredFailures.map((barrier) => (
            <div
              key={barrier.id}
              className={cn(
                'p-4 rounded-md border border-slate-200 bg-white space-y-3 transition-shadow hover:shadow-xs',
                barrier.severity === 'Critical' && 'border-l-4 border-l-rose-600',
                barrier.severity === 'High' && 'border-l-4 border-l-amber-600',
                barrier.severity === 'Moderate' && 'border-l-4 border-l-slate-400'
              )}
            >
              {/* Top Row: Code, Name, Severity */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xs font-bold text-slate-900 bg-slate-100 px-2 py-0.5 border border-slate-200 rounded">
                    {barrier.id}
                  </span>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900">
                      {barrier.barrierName}
                    </h4>
                    <span className="text-[11px] text-slate-500 font-medium">
                      {barrier.category}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className={cn('px-2.5 py-0.5 border text-xs rounded', getSeverityStyle(barrier.severity))}>
                    {barrier.severity} Defect
                  </div>
                </div>
              </div>

              {/* Middle Metrics Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                <div className="bg-slate-50 p-2.5 rounded border border-slate-200/80">
                  <span className="text-[10px] uppercase font-semibold text-slate-500 block">
                    Audited Operations
                  </span>
                  <span className="font-mono font-medium text-slate-900">
                    {barrier.totalAudits} audits
                  </span>
                </div>

                <div className="bg-slate-50 p-2.5 rounded border border-slate-200/80">
                  <span className="text-[10px] uppercase font-semibold text-slate-500 block">
                    Bypass / Breach Count
                  </span>
                  <span className="font-mono font-bold text-rose-700">
                    {barrier.breachCount} events
                  </span>
                </div>

                <div className="bg-slate-50 p-2.5 rounded border border-slate-200/80">
                  <span className="text-[10px] uppercase font-semibold text-slate-500 block">
                    Breach Rate
                  </span>
                  <span className="font-mono font-bold text-slate-900">
                    {barrier.breachRate}
                  </span>
                </div>

                <div className="bg-slate-50 p-2.5 rounded border border-slate-200/80">
                  <span className="text-[10px] uppercase font-semibold text-slate-500 block">
                    Period Trend
                  </span>
                  <span
                    className={cn(
                      'font-mono font-medium',
                      barrier.isIncreasing ? 'text-rose-700' : 'text-emerald-700'
                    )}
                  >
                    {barrier.trendTrajectory}
                  </span>
                </div>
              </div>

              {/* Bottom Details Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1 text-xs">
                <div className="p-2.5 bg-slate-50/70 rounded border border-slate-200 space-y-1">
                  <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">
                    Identified Root Failure Mode
                  </span>
                  <p className="text-slate-800 leading-relaxed">
                    {barrier.primaryFailureMode}
                  </p>
                </div>

                <div className="p-2.5 bg-slate-50/70 rounded border border-slate-200 space-y-1">
                  <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">
                    Mandated Engineering Mitigation & Owner
                  </span>
                  <p className="text-slate-800 leading-relaxed">
                    {barrier.mandatedMitigation}
                  </p>
                  <span className="text-[11px] text-slate-500 block pt-0.5 font-mono">
                    Owner: {barrier.responsibleLead}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
