import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, CheckCircle2, HardDrive, RefreshCw, ArrowRight, Layers } from 'lucide-react';
import { MetricCard } from '../components/ui/MetricCard';
import { DataTable, type Column } from '../components/ui/DataTable';
import { FileUploadZone } from '../components/upload/FileUploadZone';
import { SIFAnalysisResult, UploadResponse } from '../types/analysis';

interface UploadHistoryItem {
  id: string;
  fileName: string;
  fileSize: string;
  fileFormat: string;
  recordsParsed: number;
  status: string;
  uploadedAt: string;
}

const initialUploadHistory: UploadHistoryItem[] = [
  {
    id: 'BATCH_20260922_01',
    fileName: 'incident_heavy_crane_near_miss_bay4.pdf',
    fileSize: '4.8 MB',
    fileFormat: 'PDF',
    recordsParsed: 1840,
    status: 'Processed (SIF Potential)',
    uploadedAt: '2026-09-22 11:42:19',
  },
  {
    id: 'BATCH_20260922_02',
    fileName: 'geospatial_grid_sensors_v2.json',
    fileSize: '112.5 MB',
    fileFormat: 'JSON',
    recordsParsed: 740100,
    status: 'Ready',
    uploadedAt: '2026-09-22 10:45:30',
  },
  {
    id: 'BATCH_20260922_03',
    fileName: 'node_diagnostics_raw_sept.parquet',
    fileSize: '240.8 MB',
    fileFormat: 'PARQUET',
    recordsParsed: 1540000,
    status: 'Ready',
    uploadedAt: '2026-09-22 09:12:08',
  },
  {
    id: 'BATCH_20260921_04',
    fileName: 'network_audit_log_dump.csv',
    fileSize: '18.4 MB',
    fileFormat: 'CSV',
    recordsParsed: 110900,
    status: 'Archived',
    uploadedAt: '2026-09-21 22:50:11',
  },
];

const uploadColumns: Column<UploadHistoryItem>[] = [
  {
    key: 'id',
    header: 'Batch Reference',
    render: (item) => <span className="font-mono font-medium text-slate-800">{item.id}</span>,
  },
  {
    key: 'fileName',
    header: 'File Name',
    render: (item) => (
      <div className="flex items-center gap-2">
        <FileText className="h-4 w-4 text-slate-400 shrink-0" />
        <span className="font-medium text-slate-900">{item.fileName}</span>
      </div>
    ),
  },
  {
    key: 'fileFormat',
    header: 'Format',
    render: (item) => <span className="text-xs font-mono text-slate-600">{item.fileFormat}</span>,
  },
  {
    key: 'fileSize',
    header: 'Size',
    align: 'right',
  },
  {
    key: 'recordsParsed',
    header: 'Tokens / Records',
    align: 'right',
    render: (item) => <span className="font-mono">{item.recordsParsed.toLocaleString()}</span>,
  },
  {
    key: 'status',
    header: 'Status',
    render: (item) => (
      <span
        className={
          item.status.includes('SIF') || item.status === 'Ready'
            ? 'text-emerald-700 font-medium text-xs'
            : 'text-slate-500 font-medium text-xs'
        }
      >
        {item.status}
      </span>
    ),
  },
  {
    key: 'uploadedAt',
    header: 'Timestamp',
    align: 'right',
    render: (item) => <span className="font-mono text-xs text-slate-500">{item.uploadedAt}</span>,
  },
];

export const UploadPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedFormat, setSelectedFormat] = useState('pdf');
  const [partitionNamespace, setPartitionNamespace] = useState('incident_sif_eval_partition');
  const [uploadHistory, setUploadHistory] = useState<UploadHistoryItem[]>(initialUploadHistory);
  const [latestAnalysis, setLatestAnalysis] = useState<SIFAnalysisResult | null>(null);

  const handleUploadSuccess = (response: UploadResponse, analysis?: SIFAnalysisResult) => {
    if (analysis) {
      setLatestAnalysis(analysis);
    }

    const newHistoryItem: UploadHistoryItem = {
      id: response.fileId,
      fileName: response.fileName,
      fileSize: `${(response.fileSize / (1024 * 1024)).toFixed(1)} MB`,
      fileFormat: response.fileName.split('.').pop()?.toUpperCase() || 'DAT',
      recordsParsed: analysis?.processingMetadata.tokensEvaluated || 1200,
      status: analysis ? `Evaluated (${analysis.sifClassification})` : 'Ingested',
      uploadedAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
    };

    setUploadHistory((prev) => [newHistoryItem, ...prev]);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Dataset & Report Ingestion</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Stage incident reports, safety telemetry batches, and trigger automated SIF classification pipelines.
          </p>
        </div>
      </div>

      {/* Storage & Queue Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MetricCard
          label="Staging Storage Used"
          value="424.7 MB"
          secondaryText="capacity limit: 20.0 GB"
          icon={HardDrive}
        />
        <MetricCard
          label="Queued Batches"
          value="0"
          secondaryText="all jobs synchronized"
          trend={{ value: "Operational", positive: true }}
          icon={CheckCircle2}
        />
        <MetricCard
          label="Deterministic SIF Parser"
          value="Schema v2.4.1"
          secondaryText="strict type coercion active"
          icon={RefreshCw}
        />
      </div>

      {/* Upload Zone */}
      <div className="surface-card p-6 space-y-5">
        <div>
          <h2 className="text-sm font-semibold text-slate-900 mb-1">Batch Ingestion Area</h2>
          <p className="text-xs text-slate-500">
            Transmit incident narrative files, sensor dumps, or structured safety logs directly to the POST /upload endpoint.
          </p>
        </div>

        {/* Functional Drag-and-Drop + File Picker */}
        <FileUploadZone
          onUploadSuccess={handleUploadSuccess}
          sourceFormat={selectedFormat}
          partitionNamespace={partitionNamespace}
          acceptedFileTypes={['.pdf', '.csv', '.json', '.parquet', '.txt', '.docx']}
          maxSizeMB={50}
        />

        {/* Schema and Partition Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Source Format Definition
            </label>
            <select
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-slate-500"
            >
              <option value="pdf">Incident Report Document (.PDF / .DOCX)</option>
              <option value="csv">Delimited Incident Stream (.CSV / .TSV)</option>
              <option value="json">Structured JSON Records</option>
              <option value="parquet">Apache Parquet Columnar Data</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Target Partition Namespace
            </label>
            <input
              type="text"
              value={partitionNamespace}
              onChange={(e) => setPartitionNamespace(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-800 focus:outline-none focus:border-slate-500 font-mono"
            />
          </div>
        </div>

        {/* Post-upload banner leading to Analysis Page */}
        {latestAnalysis && (
          <div className="p-4 rounded-md border border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded bg-slate-900 text-white shrink-0">
                <Layers className="h-4 w-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">
                  SIF Assessment Available for &quot;{latestAnalysis.reportName}&quot;
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  Classification: <span className="font-semibold text-slate-800">{latestAnalysis.sifClassification}</span> • Model Confidence: <span className="font-semibold text-slate-800">{latestAnalysis.confidence.overallScore}%</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate('/analysis', { state: { analysis: latestAnalysis } })}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-900 text-white rounded text-xs font-medium hover:bg-slate-800 transition-colors shadow-xs shrink-0"
            >
              <span>View SIF Analysis Report</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Upload History Table */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-900">Ingestion Audit History</h2>
          <span className="text-xs text-slate-500 font-mono">{uploadHistory.length} Recorded Batches</span>
        </div>
        <DataTable
          columns={uploadColumns}
          data={uploadHistory}
          keyExtractor={(item) => item.id}
        />
      </div>
    </div>
  );
};
