import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipboardCheck, CheckCircle2, ArrowRight, Save, RotateCcw } from 'lucide-react';
import { SIFClassification } from '../../types/analysis';
import { cn } from '../../lib/utils';

export type HSEReviewStatus =
  | 'PENDING_REVIEW'
  | 'UNDER_INVESTIGATION'
  | 'ACTION_REQUIRED'
  | 'CLOSED_VERIFIED';

export interface HSEReportItem {
  id: string;
  incidentRef: string;
  reportName: string;
  facilityLocation: string;
  department: string;
  sifClassification: SIFClassification;
  precursorDetected: boolean;
  precursorType: string;
  loggedAt: string;
  assignedOfficer: string;
  reviewStatus: HSEReviewStatus;
  auditorNotes: string;
  actionItemsCount: number;
}

export const initialHSEReports: HSEReportItem[] = [
  {
    id: 'RPT-2026-0922-SIF-01',
    incidentRef: 'INC-2026-8841',
    reportName: 'incident_heavy_crane_near_miss_bay4.pdf',
    facilityLocation: 'Northern Yard - Bay 4',
    department: 'Structural Assembly & Rigging',
    sifClassification: 'SIF_POTENTIAL',
    precursorDetected: true,
    precursorType: 'High-Energy Suspended Load over Pedestrian Path',
    loggedAt: '2026-09-22 09:35',
    assignedOfficer: 'Sarah Jenkins (Lead HSE Auditor)',
    reviewStatus: 'ACTION_REQUIRED',
    auditorNotes: 'Physical transit gate interlock bypass confirmed. Crane Unit 3 locked out until NDT brake inspection is signed off.',
    actionItemsCount: 4,
  },
  {
    id: 'RPT-2026-0921-SIF-02',
    incidentRef: 'INC-2026-8839',
    reportName: 'electrical_flashover_mcc_substation2.pdf',
    facilityLocation: 'Substation Building 2',
    department: 'High Voltage Electrical Services',
    sifClassification: 'SIF_ACTUAL',
    precursorDetected: true,
    precursorType: 'Energized 480V Terminal Without Zero Energy Test',
    loggedAt: '2026-09-21 14:18',
    assignedOfficer: 'Marcus Vance (Electrical Safety Lead)',
    reviewStatus: 'UNDER_INVESTIGATION',
    auditorNotes: 'Technician hospitalized with 2nd-degree burns. Stand-down in effect across all 480V switchgear operations.',
    actionItemsCount: 3,
  },
  {
    id: 'RPT-2026-0919-SIF-03',
    incidentRef: 'INC-2026-8822',
    reportName: 'office_walkway_spill_slip_q3.docx',
    facilityLocation: 'Admin HQ - 2nd Floor',
    department: 'General Office Operations',
    sifClassification: 'NON_SIF',
    precursorDetected: false,
    precursorType: 'Same-Level Slip / Trip',
    loggedAt: '2026-09-19 08:15',
    assignedOfficer: 'Elena Gomez (Facility HSE Officer)',
    reviewStatus: 'CLOSED_VERIFIED',
    auditorNotes: 'Gasket on water cooler replaced. Area inspected and dried. No lost workday cases recorded.',
    actionItemsCount: 1,
  },
  {
    id: 'RPT-2026-0918-SIF-04',
    incidentRef: 'INC-2026-8815',
    reportName: 'chemical_purge_line_flange_leak.pdf',
    facilityLocation: 'Refrigeration Unit B',
    department: 'Process Containment Division',
    sifClassification: 'SIF_POTENTIAL',
    precursorDetected: true,
    precursorType: 'Pressurized Toxic Gas Line Degradation',
    loggedAt: '2026-09-18 16:40',
    assignedOfficer: 'David Thorne (Process Safety Engineer)',
    reviewStatus: 'PENDING_REVIEW',
    auditorNotes: 'Awaiting metallurgical report on flange bolt shearing.',
    actionItemsCount: 2,
  },
];

export const HSEReviewSection: React.FC = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState<HSEReportItem[]>(initialHSEReports);
  const [selectedReportId, setSelectedReportId] = useState<string>(initialHSEReports[0].id);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  // Form state for selected review
  const activeReport = reports.find((r) => r.id === selectedReportId) || reports[0];
  const [reviewStatus, setReviewStatus] = useState<HSEReviewStatus>(activeReport.reviewStatus);
  const [auditorNotes, setAuditorNotes] = useState<string>(activeReport.auditorNotes);
  const [assignedOfficer, setAssignedOfficer] = useState<string>(activeReport.assignedOfficer);
  const [barrierVerified, setBarrierVerified] = useState<boolean>(true);
  const [actionPriority, setActionPriority] = useState<string>('Engineering Redesign & Interlock');

  // Switch active item
  const handleSelectReport = (report: HSEReportItem) => {
    setSelectedReportId(report.id);
    setReviewStatus(report.reviewStatus);
    setAuditorNotes(report.auditorNotes);
    setAssignedOfficer(report.assignedOfficer);
  };

  const handleSaveReview = () => {
    setReports((prev) =>
      prev.map((r) =>
        r.id === selectedReportId
          ? {
              ...r,
              reviewStatus,
              auditorNotes,
              assignedOfficer,
            }
          : r
      )
    );
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const getReviewStatusStyle = (status: HSEReviewStatus) => {
    switch (status) {
      case 'ACTION_REQUIRED':
        return 'text-rose-800 border-rose-300 bg-rose-50/70 font-semibold';
      case 'UNDER_INVESTIGATION':
        return 'text-amber-800 border-amber-300 bg-amber-50/70 font-semibold';
      case 'PENDING_REVIEW':
        return 'text-slate-800 border-slate-300 bg-slate-100 font-medium';
      case 'CLOSED_VERIFIED':
        return 'text-emerald-800 border-emerald-300 bg-emerald-50/70 font-medium';
    }
  };

  const getSifClassificationStyle = (sif: SIFClassification) => {
    switch (sif) {
      case 'SIF_ACTUAL':
        return 'text-rose-800 border-rose-300 bg-rose-50 font-bold';
      case 'SIF_POTENTIAL':
        return 'text-amber-800 border-amber-300 bg-amber-50 font-bold';
      case 'NON_SIF':
        return 'text-emerald-800 border-emerald-300 bg-emerald-50 font-medium';
    }
  };

  return (
    <div className="surface-card overflow-hidden">
      {/* Header Bar */}
      <div className="p-5 border-b border-slate-200 bg-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded bg-slate-100 text-slate-800 shrink-0 border border-slate-200 mt-0.5">
            <ClipboardCheck className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900 tracking-tight">
              HSE Workflow & Investigation Review Console
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Auditor sign-off, SIF determination confirmation, and corrective action governance.
            </p>
          </div>
        </div>

        {saveSuccess && (
          <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-medium bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>HSE Review Audit Committed</span>
          </div>
        )}
      </div>

      {/* Main Master-Detail Review Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 bg-white">
        {/* Left Column: Report History / Queue (5 cols) */}
        <div className="lg:col-span-5 p-4 space-y-2.5 max-h-[520px] overflow-y-auto bg-slate-50/40">
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-1">
            <span>Incident Dossier Queue ({reports.length})</span>
            <span>Review State</span>
          </div>

          {reports.map((item) => {
            const isSelected = item.id === selectedReportId;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelectReport(item)}
                className={cn(
                  'w-full text-left p-3.5 rounded-md border transition-all space-y-2',
                  isSelected
                    ? 'bg-white border-slate-900 shadow-xs ring-1 ring-slate-900'
                    : 'bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white'
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] font-bold text-slate-900 bg-slate-100 px-1.5 py-0.5 border border-slate-200 rounded">
                      {item.incidentRef}
                    </span>
                    <span className="text-xs font-semibold text-slate-800 truncate max-w-[180px]">
                      {item.facilityLocation}
                    </span>
                  </div>

                  <div className={cn('px-2 py-0.5 border text-[10px] rounded font-mono', getReviewStatusStyle(item.reviewStatus))}>
                    {item.reviewStatus.replace('_', ' ')}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div className={cn('px-1.5 py-0.5 border text-[11px] rounded', getSifClassificationStyle(item.sifClassification))}>
                    {item.sifClassification}
                  </div>
                  <span className="text-[11px] text-slate-500 font-mono">
                    {item.loggedAt}
                  </span>
                </div>

                <p className="text-xs text-slate-600 line-clamp-1 leading-normal">
                  {item.precursorType}
                </p>
              </button>
            );
          })}
        </div>

        {/* Right Column: HSE Review Editor & Signoff (7 cols) */}
        <div className="lg:col-span-7 p-5 space-y-5 bg-white">
          {/* Active dossier header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-3 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-slate-900 bg-slate-100 px-2 py-0.5 border border-slate-200 rounded">
                  {activeReport.incidentRef}
                </span>
                <span className="text-xs text-slate-500 font-mono">
                  Dossier: {activeReport.id}
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-900 mt-1">
                {activeReport.reportName}
              </h4>
            </div>

            <button
              type="button"
              onClick={() => navigate('/analysis')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 rounded text-xs font-medium transition-colors shrink-0"
            >
              <span>Inspect Full AI Dossier</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Review Status Decision */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                HSE Review Governance Status
              </label>
              <select
                value={reviewStatus}
                onChange={(e) => setReviewStatus(e.target.value as HSEReviewStatus)}
                className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-900 font-medium focus:outline-none focus:border-slate-600"
              >
                <option value="ACTION_REQUIRED">ACTION_REQUIRED (Mandatory Barrier Repair)</option>
                <option value="UNDER_INVESTIGATION">UNDER_INVESTIGATION (Root Cause Active)</option>
                <option value="PENDING_REVIEW">PENDING_REVIEW (Awaiting Evidence)</option>
                <option value="CLOSED_VERIFIED">CLOSED_VERIFIED (Safeguard Approved)</option>
              </select>
            </div>

            {/* Assigned Safety Officer */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Assigned HSE Lead Auditor
              </label>
              <input
                type="text"
                value={assignedOfficer}
                onChange={(e) => setAssignedOfficer(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-slate-600"
              />
            </div>
          </div>

          {/* Corrective Action Priority & Safeguard Verification */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Mandated Corrective Vector
              </label>
              <select
                value={actionPriority}
                onChange={(e) => setActionPriority(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-slate-600"
              >
                <option value="Engineering Redesign & Interlock">Engineering Redesign & Physical Interlock</option>
                <option value="Immediate Stop-Work & Lockout">Immediate Stop-Work & Red-Tag Lockout</option>
                <option value="Standard Operating Procedure Revision">Standard Operating Procedure Revision</option>
                <option value="Retraining & Crew Verification">Retraining & Competency Re-evaluation</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Critical Safeguard Condition
              </label>
              <div className="flex items-center gap-2 p-2 border border-slate-200 rounded bg-slate-50 text-xs">
                <input
                  type="checkbox"
                  id="barrier-checkbox"
                  checked={barrierVerified}
                  onChange={(e) => setBarrierVerified(e.target.checked)}
                  className="rounded border-slate-300 text-slate-900 focus:ring-slate-900 h-4 w-4"
                />
                <label htmlFor="barrier-checkbox" className="text-slate-800 font-medium cursor-pointer">
                  Physical Barrier Exclusion Verified Active
                </label>
              </div>
            </div>
          </div>

          {/* Auditor Verification Notes */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
              HSE Investigation Rationale & Verification Sign-Off Notes
            </label>
            <textarea
              rows={4}
              value={auditorNotes}
              onChange={(e) => setAuditorNotes(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded p-2.5 text-xs text-slate-900 focus:outline-none focus:border-slate-600 leading-normal"
              placeholder="Enter official HSE technical determination rationale..."
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center justify-between border-t border-slate-100">
            <div className="text-[11px] text-slate-500 font-mono">
              Audit log will record current timestamp & reviewer identity.
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setAuditorNotes(activeReport.auditorNotes)}
                className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-medium transition-colors border border-slate-200"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Reset
              </button>
              <button
                type="button"
                onClick={handleSaveReview}
                className="flex items-center gap-1.5 px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-medium transition-colors shadow-xs"
              >
                <Save className="h-3.5 w-3.5" />
                <span>Commit HSE Review</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
