import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { MetricCard } from '../components/ui/MetricCard';
import { DataTable, type Column } from '../components/ui/DataTable';
import { ChartContainer } from '../components/ui/ChartContainer';
import { SIFResultCard } from '../components/analysis/SIFResultCard';
import { ConfidenceEvidenceDisplay } from '../components/analysis/ConfidenceEvidenceDisplay';
import { ExtractedFieldsContainer } from '../components/analysis/ExtractedFieldsContainer';
import { sampleAnalysisReports } from '../services/sampleData';
import {
  FileSpreadsheet,
  PieChart,
  TrendingUp,
  AlertTriangle,
} from 'lucide-react';

const mockCategoryData = [
  { category: 'Overhead Lifting', regular: 4200, anomalous: 85 },
  { category: 'Electrical Isolation', regular: 6800, anomalous: 42 },
  { category: 'Heights & Scaffolding', regular: 5100, anomalous: 28 },
  { category: 'Mobile Equipment', regular: 3900, anomalous: 94 },
  { category: 'Chemical Containment', regular: 2400, anomalous: 12 },
];

const mockVarianceTrend = [
  { interval: 'W1', variance: 1.2, limit: 3.0 },
  { interval: 'W2', variance: 1.8, limit: 3.0 },
  { interval: 'W3', variance: 2.4, limit: 3.0 },
  { interval: 'W4', variance: 1.6, limit: 3.0 },
  { interval: 'W5', variance: 0.9, limit: 3.0 },
  { interval: 'W6', variance: 1.4, limit: 3.0 },
];

interface AnalysisReportRow {
  segmentId: string;
  category: string;
  totalEvaluated: number;
  deviationsFound: number;
  deviationRate: string;
  criticalityScore: string;
  auditConclusion: string;
}

const mockAnalysisRows: AnalysisReportRow[] = [
  {
    segmentId: 'SEG_LIFT_01',
    category: 'Overhead Lifting',
    totalEvaluated: 4285,
    deviationsFound: 85,
    deviationRate: '1.98%',
    criticalityScore: '0.42',
    auditConclusion: 'Conforms to baseline tolerance',
  },
  {
    segmentId: 'SEG_ELEC_02',
    category: 'Electrical Isolation',
    totalEvaluated: 6842,
    deviationsFound: 42,
    deviationRate: '0.61%',
    criticalityScore: '0.18',
    auditConclusion: 'Optimal isolation profile',
  },
  {
    segmentId: 'SEG_HGHT_03',
    category: 'Heights & Scaffolding',
    totalEvaluated: 5128,
    deviationsFound: 28,
    deviationRate: '0.55%',
    criticalityScore: '0.12',
    auditConclusion: 'Optimal fall restraint profile',
  },
  {
    segmentId: 'SEG_MOBL_04',
    category: 'Mobile Equipment',
    totalEvaluated: 3994,
    deviationsFound: 94,
    deviationRate: '2.35%',
    criticalityScore: '0.58',
    auditConclusion: 'Elevated pedestrian proximity alert',
  },
  {
    segmentId: 'SEG_CHEM_05',
    category: 'Chemical Containment',
    totalEvaluated: 2412,
    deviationsFound: 12,
    deviationRate: '0.50%',
    criticalityScore: '0.08',
    auditConclusion: 'Fully conforming barrier state',
  },
];

const analysisColumns: Column<AnalysisReportRow>[] = [
  {
    key: 'segmentId',
    header: 'Segment Code',
    render: (item) => <span className="font-mono font-medium text-slate-800">{item.segmentId}</span>,
  },
  {
    key: 'category',
    header: 'Analysis Dimension',
    render: (item) => <span className="font-medium text-slate-900">{item.category}</span>,
  },
  {
    key: 'totalEvaluated',
    header: 'Evaluated Units',
    align: 'right',
    render: (item) => <span>{item.totalEvaluated.toLocaleString()}</span>,
  },
  {
    key: 'deviationsFound',
    header: 'Deviations',
    align: 'right',
    render: (item) => <span className="font-mono">{item.deviationsFound}</span>,
  },
  {
    key: 'deviationRate',
    header: 'Deviation Rate',
    align: 'right',
    render: (item) => <span className="font-mono text-slate-700">{item.deviationRate}</span>,
  },
  {
    key: 'criticalityScore',
    header: 'Criticality Index',
    align: 'right',
    render: (item) => <span className="font-mono text-slate-700">{item.criticalityScore}</span>,
  },
  {
    key: 'auditConclusion',
    header: 'System Finding',
    render: (item) => (
      <span
        className={
          item.deviationsFound > 80
            ? 'text-amber-800 font-medium text-xs'
            : 'text-slate-600 text-xs'
        }
      >
        {item.auditConclusion}
      </span>
    ),
  },
];

export const ReportAnalysisPage: React.FC = () => {
  const [selectedReportId, setSelectedReportId] = useState<string>(sampleAnalysisReports[0].id);

  const activeReport =
    sampleAnalysisReports.find((r) => r.id === selectedReportId) || sampleAnalysisReports[0];

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Incident Analysis & SIF Assessment
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Automated Serious Injury or Fatality (SIF) determination, documentary evidence grounding, and entity extraction.
          </p>
        </div>

        {/* Report Selector Switcher */}
        <div className="flex items-center gap-2">
          <label htmlFor="report-selector" className="text-xs font-semibold text-slate-600 uppercase tracking-wider shrink-0">
            Active Dossier:
          </label>
          <select
            id="report-selector"
            value={selectedReportId}
            onChange={(e) => setSelectedReportId(e.target.value)}
            className="bg-white border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-900 font-medium focus:outline-none focus:border-slate-500 shadow-xs"
          >
            {sampleAnalysisReports.map((report) => (
              <option key={report.id} value={report.id}>
                {report.id} — {report.reportName} ({report.sifClassification})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Deliverable 2A: SIF Result Card Component */}
      <section aria-label="SIF Result Classification">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            SIF Classification Matrix
          </h2>
          <span className="text-[11px] font-mono text-slate-500">
            Dossier: {activeReport.reportName}
          </span>
        </div>
        <SIFResultCard analysis={activeReport} />
      </section>

      {/* Deliverable 2B: Confidence & Evidence Display Container */}
      <section aria-label="Confidence and Evidence Grounding">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Confidence & Documentary Evidence Grounding
          </h2>
          <span className="text-[11px] font-mono text-slate-500">
            {activeReport.evidence.length} Cited Spans
          </span>
        </div>
        <ConfidenceEvidenceDisplay
          confidence={activeReport.confidence}
          evidence={activeReport.evidence}
        />
      </section>

      {/* Deliverable 2C: Extracted Fields Display Container */}
      <section aria-label="Extracted Structured Incident Fields">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Extracted Incident Variables & Operational Metadata
          </h2>
          <span className="text-[11px] font-mono text-slate-500">
            Schema v2.4.1 Compliant
          </span>
        </div>
        <ExtractedFieldsContainer
          key={activeReport.id}
          initialFields={activeReport.extractedFields}
        />
      </section>

      {/* High-Level Analytical Overview Metrics */}
      <div className="pt-4 border-t border-slate-200">
        <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
          Aggregate Plant Safety Telemetry
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            label="Total Dossiers Audited"
            value="22,661"
            secondaryText="across 5 facility divisions"
            icon={FileSpreadsheet}
          />
          <MetricCard
            label="Mean SIF Correlation"
            value="1.19%"
            secondaryText="acceptable threshold: < 3.0%"
            trend={{ value: "Controlled", positive: true }}
            icon={PieChart}
          />
          <MetricCard
            label="Barrier Stability Score"
            value="0.94"
            secondaryText="scale from 0.00 to 1.00"
            trend={{ value: "+0.03 pts", positive: true }}
            icon={TrendingUp}
          />
          <MetricCard
            label="Active Precursor Flags"
            value="3"
            secondaryText="monitored in current period"
            icon={AlertTriangle}
          />
        </div>
      </div>

      {/* Analytical Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartContainer
          title="Component Record Distribution"
          subtitle="Regular operational volume compared to anomalous events by dimension"
        >
          <BarChart
            data={mockCategoryData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis
              dataKey="category"
              tick={{ fill: '#64748b', fontSize: 11 }}
              axisLine={{ stroke: '#cbd5e1' }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: '#64748b', fontSize: 11 }}
              axisLine={{ stroke: '#cbd5e1' }}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                borderColor: '#e2e8f0',
                borderRadius: '6px',
                fontSize: '12px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              }}
            />
            <Bar dataKey="regular" fill="#334155" name="Standard Records" />
            <Bar dataKey="anomalous" fill="#94a3b8" name="Flagged Events" />
          </BarChart>
        </ChartContainer>

        <ChartContainer
          title="Variance Trajectory Over Time"
          subtitle="Weekly deviation coefficient plotted against tolerance threshold"
        >
          <LineChart
            data={mockVarianceTrend}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis
              dataKey="interval"
              tick={{ fill: '#64748b', fontSize: 11 }}
              axisLine={{ stroke: '#cbd5e1' }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: '#64748b', fontSize: 11 }}
              axisLine={{ stroke: '#cbd5e1' }}
              tickLine={false}
              domain={[0, 4]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                borderColor: '#e2e8f0',
                borderRadius: '6px',
                fontSize: '12px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
              }}
            />
            <Line
              type="monotone"
              dataKey="variance"
              stroke="#0f172a"
              strokeWidth={2}
              dot={{ r: 3, fill: '#0f172a' }}
              name="Measured Variance %"
            />
            <Line
              type="monotone"
              dataKey="limit"
              stroke="#94a3b8"
              strokeDasharray="4 4"
              strokeWidth={1.5}
              dot={false}
              name="Tolerance Threshold"
            />
          </LineChart>
        </ChartContainer>
      </div>

      {/* Segment Evaluation Matrix Table */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-900">Segment Evaluation Matrix</h2>
          <span className="text-xs text-slate-500 font-mono">5 dimensions audited</span>
        </div>
        <DataTable
          columns={analysisColumns}
          data={mockAnalysisRows}
          keyExtractor={(item) => item.segmentId}
        />
      </div>
    </div>
  );
};
