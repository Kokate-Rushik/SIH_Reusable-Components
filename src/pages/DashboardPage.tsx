import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { MetricCard } from '../components/ui/MetricCard';
import { DataTable, type Column } from '../components/ui/DataTable';
import { ChartContainer } from '../components/ui/ChartContainer';
import { Database, Activity, Clock, FileCheck } from 'lucide-react';

const mockThroughputData = [
  { time: '00:00', throughput: 420, baseline: 380 },
  { time: '04:00', throughput: 310, baseline: 350 },
  { time: '08:00', throughput: 780, baseline: 600 },
  { time: '12:00', throughput: 950, baseline: 820 },
  { time: '16:00', throughput: 890, baseline: 790 },
  { time: '20:00', throughput: 640, baseline: 580 },
  { time: '24:00', throughput: 510, baseline: 460 },
];

interface RecentJob {
  id: string;
  source: string;
  recordsCount: number;
  duration: string;
  status: string;
  timestamp: string;
}

const mockRecentJobs: RecentJob[] = [
  {
    id: 'JOB_9041',
    source: 'Telemetry Datafeed Alpha',
    recordsCount: 142500,
    duration: '42s',
    status: 'Completed',
    timestamp: '2026-09-22 11:45:10',
  },
  {
    id: 'JOB_9040',
    source: 'Sensor Batch North Node',
    recordsCount: 88400,
    duration: '28s',
    status: 'Completed',
    timestamp: '2026-09-22 11:30:04',
  },
  {
    id: 'JOB_9039',
    source: 'Registry Sync Gateway',
    recordsCount: 12400,
    duration: '06s',
    status: 'Completed',
    timestamp: '2026-09-22 11:15:22',
  },
  {
    id: 'JOB_9038',
    source: 'Diagnostic Dump Delta',
    recordsCount: 65100,
    duration: '19s',
    status: 'Processing',
    timestamp: '2026-09-22 11:02:18',
  },
  {
    id: 'JOB_9037',
    source: 'Archive Validator West',
    recordsCount: 210000,
    duration: '64s',
    status: 'Completed',
    timestamp: '2026-09-22 10:48:55',
  },
];

const jobColumns: Column<RecentJob>[] = [
  {
    key: 'id',
    header: 'Job Identifier',
    render: (item) => <span className="font-mono font-medium text-slate-800">{item.id}</span>,
  },
  {
    key: 'source',
    header: 'Source Stream',
    render: (item) => <span className="font-medium text-slate-900">{item.source}</span>,
  },
  {
    key: 'recordsCount',
    header: 'Records',
    align: 'right',
    render: (item) => <span>{item.recordsCount.toLocaleString()}</span>,
  },
  {
    key: 'duration',
    header: 'Duration',
    align: 'right',
  },
  {
    key: 'status',
    header: 'Ingestion Status',
    render: (item) => (
      <span
        className={
          item.status === 'Completed'
            ? 'text-emerald-700 font-medium text-xs'
            : 'text-amber-700 font-medium text-xs'
        }
      >
        {item.status}
      </span>
    ),
  },
  {
    key: 'timestamp',
    header: 'Executed At',
    align: 'right',
    render: (item) => <span className="text-slate-500 font-mono text-xs">{item.timestamp}</span>,
  },
];

export const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">System Overview</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Operational metrics, system ingestion rates, and real-time activity logs.
          </p>
        </div>
        <div className="text-xs text-slate-500 font-mono bg-white border border-slate-200 px-3 py-1.5 rounded">
          Cluster Node 01 / Active
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Total Ingestion Volume"
          value="4,821,900"
          secondaryText="past 24 hours"
          trend={{ value: "+8.4%", positive: true }}
          icon={Database}
        />
        <MetricCard
          label="Pipeline Throughput"
          value="1,420 rps"
          secondaryText="target: 1,200 rps"
          trend={{ value: "+18.3%", positive: true }}
          icon={Activity}
        />
        <MetricCard
          label="Median Latency"
          value="18.2 ms"
          secondaryText="benchmark: 25.0 ms"
          trend={{ value: "-3.1 ms", positive: true }}
          icon={Clock}
        />
        <MetricCard
          label="Processing Success Rate"
          value="99.94%"
          secondaryText="4 errors recorded"
          trend={{ value: "Stable", positive: undefined }}
          icon={FileCheck}
        />
      </div>

      {/* Chart Section */}
      <ChartContainer
        title="Ingestion Throughput vs. Baseline"
        subtitle="Hourly record volume aggregated across ingestion nodes (thousands/hour)"
      >
        <AreaChart
          data={mockThroughputData}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorThroughput" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0f172a" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#0f172a" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis
            dataKey="time"
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
          <Area
            type="monotone"
            dataKey="throughput"
            stroke="#0f172a"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorThroughput)"
            name="Current Throughput"
          />
        </AreaChart>
      </ChartContainer>

      {/* Recent Jobs Table */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-900">Recent Ingestion Jobs</h2>
          <span className="text-xs text-slate-500 font-mono">Showing latest 5 jobs</span>
        </div>
        <DataTable
          columns={jobColumns}
          data={mockRecentJobs}
          keyExtractor={(item) => item.id}
        />
      </div>
    </div>
  );
};
