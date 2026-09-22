import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { MetricCard } from '../components/ui/MetricCard';
import { ChartContainer } from '../components/ui/ChartContainer';
import { LoadingSkeleton } from '../components/ui/LoadingSkeleton';
import { ErrorState } from '../components/ui/ErrorState';
import { ActivitySiteHazardInsights } from '../components/dashboard/ActivitySiteHazardInsights';
import { RecurringBarrierFailures } from '../components/dashboard/RecurringBarrierFailures';
import { HSEReviewSection } from '../components/dashboard/HSEReviewSection';
import { fetchDashboardMetrics, DashboardMetricsResponse } from '../services/api';
import {
  ShieldAlert,
  Activity,
  AlertTriangle,
  Layers,
  RefreshCw,
} from 'lucide-react';

const mockSifTrendData = [
  { month: 'Jan', totalIncidents: 142, sifPotential: 18, sifActual: 3, targetLimit: 5 },
  { month: 'Feb', totalIncidents: 128, sifPotential: 14, sifActual: 2, targetLimit: 5 },
  { month: 'Mar', totalIncidents: 165, sifPotential: 22, sifActual: 4, targetLimit: 5 },
  { month: 'Apr', totalIncidents: 139, sifPotential: 15, sifActual: 1, targetLimit: 5 },
  { month: 'May', totalIncidents: 152, sifPotential: 19, sifActual: 2, targetLimit: 5 },
  { month: 'Jun', totalIncidents: 131, sifPotential: 12, sifActual: 1, targetLimit: 5 },
  { month: 'Jul', totalIncidents: 118, sifPotential: 11, sifActual: 1, targetLimit: 5 },
  { month: 'Aug', totalIncidents: 140, sifPotential: 16, sifActual: 2, targetLimit: 5 },
  { month: 'Sep', totalIncidents: 104, sifPotential: 8, sifActual: 1, targetLimit: 5 },
];

const mockPrecursorBarData = [
  { category: 'Suspended Loads', events: 85, controlled: 72, critical: 13 },
  { category: 'Electrical Arc', events: 42, controlled: 31, critical: 11 },
  { category: 'Work at Heights', events: 58, controlled: 52, critical: 6 },
  { category: 'Toxic Line Purge', events: 26, controlled: 22, critical: 4 },
  { category: 'Mobile Plant', events: 94, controlled: 81, critical: 13 },
];

export const DashboardPage: React.FC = () => {
  const [trendInterval, setTrendInterval] = useState<'MONTHLY' | 'WEEKLY'>('MONTHLY');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<DashboardMetricsResponse | null>(null);

  const loadData = async (isManual = false) => {
    if (isManual) setIsRefreshing(true);
    else setIsLoading(true);
    setErrorMessage(null);

    try {
      const data = await fetchDashboardMetrics();
      setMetrics(data);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to retrieve telemetry metrics from telemetry gateway.');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (errorMessage) {
    return (
      <ErrorState
        title="Dashboard Telemetry Offline"
        message={errorMessage}
        errorCode="DASHBOARD_SYNC_ERR_503"
        onRetry={() => loadData()}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Safety Intelligence & SIF Governance Dashboard
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Operational safety analytics, precursor monitoring, critical barrier stability, and HSE review workflow.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => loadData(true)}
            disabled={isRefreshing || isLoading}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded text-xs font-medium transition-colors shadow-xs disabled:opacity-60"
            title="Refresh dashboard telemetry"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Sync Telemetry</span>
          </button>

          <div className="text-xs text-slate-600 font-mono bg-white border border-slate-200 px-3 py-1.5 rounded shadow-xs flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span>Deterministic Rules v4.0 Active</span>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <LoadingSkeleton variant="metric" count={4} />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <LoadingSkeleton variant="chart" />
            <LoadingSkeleton variant="chart" />
          </div>
          <LoadingSkeleton variant="card" height={240} />
        </div>
      ) : (
        <>
          {/* Top Metric Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              label="Total Dossiers Audited"
              value={metrics?.totalAudited.toLocaleString() || '22,661'}
              secondaryText="across 5 facility divisions"
              trend={{ value: "+342 this month", positive: true }}
              icon={Layers}
            />
            <MetricCard
              label="SIF Precursor Rate"
              value={metrics?.sifPrecursorRate || '1.19%'}
              secondaryText="plant safety limit: < 3.0%"
              trend={{ value: "-0.4% YoY", positive: true }}
              icon={Activity}
            />
            <MetricCard
              label="Barrier Integrity Index"
              value={metrics?.barrierIntegrityIndex.toString() || '0.94'}
              secondaryText="composite barrier reliability"
              trend={{ value: "Stable", positive: undefined }}
              icon={ShieldAlert}
            />
            <MetricCard
              label="Open HSE Actions"
              value={metrics?.openHSEActions || '7'}
              secondaryText="2 high priority under review"
              trend={{ value: "Action Required", positive: false }}
              icon={AlertTriangle}
            />
          </div>

          {/* Analytical Visualizations Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Chart 1: SIF Trajectory Trend Line Chart */}
            <ChartContainer
              title="SIF Event Trajectory & Precursor Rate"
              subtitle="Monthly breakdown of total incident volume, potential flags, and actual SIF outcomes"
              action={
                <div className="flex items-center border border-slate-300 rounded overflow-hidden text-[11px] bg-white">
                  <button
                    type="button"
                    onClick={() => setTrendInterval('MONTHLY')}
                    className={`px-2 py-0.5 font-medium transition-colors ${
                      trendInterval === 'MONTHLY' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    type="button"
                    onClick={() => setTrendInterval('WEEKLY')}
                    className={`px-2 py-0.5 font-medium transition-colors border-l border-slate-200 ${
                      trendInterval === 'WEEKLY' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    Weekly
                  </button>
                </div>
              }
            >
              <LineChart
                data={mockSifTrendData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis
                  dataKey="month"
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
                <Legend
                  wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }}
                  iconType="plainline"
                />
                <Line
                  type="monotone"
                  dataKey="sifPotential"
                  stroke="#d97706"
                  strokeWidth={2}
                  dot={{ r: 3, fill: '#d97706' }}
                  name="SIF Potential Flags"
                />
                <Line
                  type="monotone"
                  dataKey="sifActual"
                  stroke="#dc2626"
                  strokeWidth={2}
                  dot={{ r: 3, fill: '#dc2626' }}
                  name="SIF Actual Events"
                />
                <Line
                  type="monotone"
                  dataKey="targetLimit"
                  stroke="#94a3b8"
                  strokeDasharray="4 4"
                  strokeWidth={1.5}
                  dot={false}
                  name="Tolerance Threshold"
                />
              </LineChart>
            </ChartContainer>

            {/* Chart 2: Precursor Category Bar Chart */}
            <ChartContainer
              title="Precursor Distribution by High-Energy Mechanism"
              subtitle="Identified energy vectors comparing controlled instances vs critical deviations"
            >
              <BarChart
                data={mockPrecursorBarData}
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
                <Legend
                  wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }}
                  iconType="square"
                />
                <Bar
                  dataKey="controlled"
                  stackId="a"
                  fill="#334155"
                  name="Safeguard Verified"
                />
                <Bar
                  dataKey="critical"
                  stackId="a"
                  fill="#dc2626"
                  name="Critical Deviation / Bypass"
                />
              </BarChart>
            </ChartContainer>
          </div>

          {/* Deliverable 1B: Activity, Site, and Hazard Insights */}
          <section aria-label="Activity, Site, and Hazard Insights">
            <ActivitySiteHazardInsights />
          </section>

          {/* Deliverable 1C: Recurring Barrier Failure Breakdown */}
          <section aria-label="Recurring Barrier Failures">
            <RecurringBarrierFailures />
          </section>

          {/* Deliverable 2: Workflow & Review UI (Report History & HSE Review) */}
          <section aria-label="HSE Workflow Review Console">
            <HSEReviewSection />
          </section>
        </>
      )}
    </div>
  );
};


