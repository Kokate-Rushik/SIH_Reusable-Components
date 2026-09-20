import React, { useState } from 'react';
import { Activity, Building2, AlertTriangle, Gauge } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ActivityInsight {
  name: string;
  category: string;
  totalEvents: number;
  sifPotentialRate: string;
  riskRating: 'High' | 'Moderate' | 'Controlled';
  primaryPrecursor: string;
  leadIndicator: string;
}

interface SiteInsight {
  siteCode: string;
  siteName: string;
  division: string;
  auditedDossiers: number;
  sifIncidents: number;
  barrierIntegrity: string;
  status: 'Critical Attention' | 'Elevated Monitoring' | 'Conforming';
}

interface HazardInsight {
  hazardCode: string;
  hazardType: string;
  energyType: string;
  exposureVolume: string;
  criticalSafeguard: string;
  containmentEfficiency: string;
}

const mockActivityInsights: ActivityInsight[] = [
  {
    name: 'Major Turnaround & Heavy Hoisting',
    category: 'Mechanical / Rigging',
    totalEvents: 428,
    sifPotentialRate: '14.2%',
    riskRating: 'High',
    primaryPrecursor: 'Suspended Load Transit over Pedestrian Walkways',
    leadIndicator: 'Crane brake slip & limit switch disengagements',
  },
  {
    name: 'High-Voltage Switchgear Servicing',
    category: 'Electrical Systems',
    totalEvents: 312,
    sifPotentialRate: '11.5%',
    riskRating: 'High',
    primaryPrecursor: 'Absence of Live-Dead-Live Zero Energy Confirmation',
    leadIndicator: 'Unverified auxiliary breaker tie-ins',
  },
  {
    name: 'Pressurized Chemical Flange Purging',
    category: 'Process Containment',
    totalEvents: 285,
    sifPotentialRate: '7.8%',
    riskRating: 'Moderate',
    primaryPrecursor: 'Gasket Degradation during High-Pressure Purge',
    leadIndicator: 'Localized vapor sensor alarms',
  },
  {
    name: 'Scaffold Cladding & Structural Rigging',
    category: 'Elevation & Heights',
    totalEvents: 520,
    sifPotentialRate: '4.2%',
    riskRating: 'Moderate',
    primaryPrecursor: 'Unclipped Static Anchor Lanyards',
    leadIndicator: 'Plank shift deviations detected in audits',
  },
  {
    name: 'Routine Warehouse Material Handling',
    category: 'Logistics Operations',
    totalEvents: 1840,
    sifPotentialRate: '0.8%',
    riskRating: 'Controlled',
    primaryPrecursor: 'Pedestrian Proximity to Forklifts',
    leadIndicator: 'Aisle blind-spot sensor triggers',
  },
];

const mockSiteInsights: SiteInsight[] = [
  {
    siteCode: 'FAC-NORTH-BAY4',
    siteName: 'Northern Heavy Fabrication Yard',
    division: 'Structural Rigging Division',
    auditedDossiers: 1240,
    sifIncidents: 4,
    barrierIntegrity: '88.4%',
    status: 'Critical Attention',
  },
  {
    siteCode: 'SUBSTATION-02',
    siteName: 'Main Power Distribution Substation 2',
    division: 'High Voltage Electrical Unit',
    auditedDossiers: 680,
    sifIncidents: 2,
    barrierIntegrity: '91.2%',
    status: 'Elevated Monitoring',
  },
  {
    siteCode: 'CHEM-PLANT-B',
    siteName: 'Refrigeration & Ammonia Unit B',
    division: 'Process Containment Group',
    auditedDossiers: 890,
    sifIncidents: 1,
    barrierIntegrity: '94.6%',
    status: 'Elevated Monitoring',
  },
  {
    siteCode: 'OFFSHORE-TERM-D',
    siteName: 'Deepwater Marine Loading Terminal',
    division: 'Offshore Logistics',
    auditedDossiers: 1540,
    sifIncidents: 0,
    barrierIntegrity: '98.5%',
    status: 'Conforming',
  },
  {
    siteCode: 'LOGISTICS-WEST',
    siteName: 'Western Central Distribution Hub',
    division: 'Supply Chain Operations',
    auditedDossiers: 2410,
    sifIncidents: 0,
    barrierIntegrity: '99.1%',
    status: 'Conforming',
  },
];

const mockHazardInsights: HazardInsight[] = [
  {
    hazardCode: 'EN-GRAV-01',
    hazardType: 'Gravitational Potential Energy (> 5 Tons)',
    energyType: 'Kinetic / Mechanical Drop',
    exposureVolume: '4,280 lift hrs',
    criticalSafeguard: 'Dual-holding brake redundancy & transit gate interlock',
    containmentEfficiency: '91.8%',
  },
  {
    hazardCode: 'EN-ELEC-02',
    hazardType: 'High-Voltage Arc Flash (> 480V / 8 cal/cm2)',
    energyType: 'Thermal Radiation & Shock',
    exposureVolume: '1,920 service hrs',
    criticalSafeguard: 'Live-dead-live instrument test & Cat-4 PPE suit',
    containmentEfficiency: '89.4%',
  },
  {
    hazardCode: 'EN-CHEM-03',
    hazardType: 'Pressurized Toxic Gas Line (> 150 PSI)',
    energyType: 'Chemical Exposure & Asphyxiation',
    exposureVolume: '720 purge cycles',
    criticalSafeguard: 'Double block-and-bleed valve isolation',
    containmentEfficiency: '96.2%',
  },
  {
    hazardCode: 'EN-HGHT-04',
    hazardType: 'Elevated Working Fall (> 1.8m Above Floor)',
    energyType: 'Kinetic Fall Vector',
    exposureVolume: '3,840 elevated hrs',
    criticalSafeguard: '100% tie-off harness with certified static anchors',
    containmentEfficiency: '97.5%',
  },
];

export const ActivitySiteHazardInsights: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ACTIVITY' | 'SITE' | 'HAZARD'>('ACTIVITY');

  const getRiskStyle = (rating: 'High' | 'Moderate' | 'Controlled') => {
    switch (rating) {
      case 'High':
        return 'text-rose-800 border-rose-200 bg-rose-50/70 font-semibold';
      case 'Moderate':
        return 'text-amber-800 border-amber-200 bg-amber-50/70 font-semibold';
      case 'Controlled':
        return 'text-slate-800 border-slate-200 bg-slate-50 font-medium';
    }
  };

  const getSiteStatusStyle = (status: 'Critical Attention' | 'Elevated Monitoring' | 'Conforming') => {
    switch (status) {
      case 'Critical Attention':
        return 'text-rose-800 border-rose-300 bg-rose-50/70 font-semibold';
      case 'Elevated Monitoring':
        return 'text-amber-800 border-amber-300 bg-amber-50/70 font-semibold';
      case 'Conforming':
        return 'text-emerald-800 border-emerald-300 bg-emerald-50/70 font-medium';
    }
  };

  return (
    <div className="surface-card overflow-hidden">
      {/* Header Bar with Tab Switches */}
      <div className="p-5 border-b border-slate-200 bg-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded bg-slate-100 text-slate-800 shrink-0 border border-slate-200 mt-0.5">
            <Gauge className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900 tracking-tight">
              Operational Safety Domain Telemetry
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Multi-dimensional cross-sectional analysis across plant activities, facility sites, and high-energy vectors.
            </p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center border border-slate-300 rounded overflow-hidden text-xs bg-white">
          <button
            type="button"
            onClick={() => setActiveTab('ACTIVITY')}
            className={cn(
              'px-3 py-1.5 font-medium transition-colors flex items-center gap-1.5',
              activeTab === 'ACTIVITY'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            )}
          >
            <Activity className="h-3.5 w-3.5" />
            <span>Activity Insights</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('SITE')}
            className={cn(
              'px-3 py-1.5 font-medium transition-colors border-l border-slate-200 flex items-center gap-1.5',
              activeTab === 'SITE'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            )}
          >
            <Building2 className="h-3.5 w-3.5" />
            <span>Facility Sites</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('HAZARD')}
            className={cn(
              'px-3 py-1.5 font-medium transition-colors border-l border-slate-200 flex items-center gap-1.5',
              activeTab === 'HAZARD'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            )}
          >
            <AlertTriangle className="h-3.5 w-3.5" />
            <span>Hazard Vectors</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Activity Insights */}
      {activeTab === 'ACTIVITY' && (
        <div className="p-5 space-y-3 bg-slate-50/30">
          <div className="grid grid-cols-1 gap-3">
            {mockActivityInsights.map((act, idx) => (
              <div
                key={idx}
                className="p-4 rounded-md border border-slate-200 bg-white flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:border-slate-300 transition-colors"
              >
                <div className="space-y-1 md:max-w-md">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-slate-500 font-semibold">
                      [{act.category}]
                    </span>
                    <h4 className="text-sm font-semibold text-slate-900">
                      {act.name}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 leading-normal">
                    Precursor Vector: <span className="font-medium text-slate-800">{act.primaryPrecursor}</span>
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Lead Audit Trigger: {act.leadIndicator}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs shrink-0">
                  <div className="border border-slate-200 rounded px-2.5 py-1.5 bg-slate-50/70 text-right">
                    <span className="text-[10px] uppercase font-semibold text-slate-500 block leading-tight">
                      Evaluated Volume
                    </span>
                    <span className="font-mono text-slate-900 font-medium">
                      {act.totalEvents.toLocaleString()} tasks
                    </span>
                  </div>

                  <div className="border border-slate-200 rounded px-2.5 py-1.5 bg-slate-50/70 text-right">
                    <span className="text-[10px] uppercase font-semibold text-slate-500 block leading-tight">
                      SIF Potential Rate
                    </span>
                    <span className="font-mono font-bold text-slate-900">
                      {act.sifPotentialRate}
                    </span>
                  </div>

                  <div className={cn('border rounded px-2.5 py-1.5 text-center min-w-[90px]', getRiskStyle(act.riskRating))}>
                    <span className="text-[10px] uppercase block leading-tight opacity-75">
                      Risk Profile
                    </span>
                    <span>{act.riskRating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Site Insights */}
      {activeTab === 'SITE' && (
        <div className="p-5 space-y-3 bg-slate-50/30">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockSiteInsights.map((site) => (
              <div
                key={site.siteCode}
                className="p-4 rounded-md border border-slate-200 bg-white space-y-3 hover:border-slate-300 transition-colors flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs font-semibold text-slate-800 bg-slate-100 px-2 py-0.5 border border-slate-200 rounded">
                      {site.siteCode}
                    </span>
                    <div className={cn('px-2 py-0.5 border text-[11px] rounded', getSiteStatusStyle(site.status))}>
                      {site.status}
                    </div>
                  </div>

                  <h4 className="text-sm font-semibold text-slate-900 pt-1">
                    {site.siteName}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {site.division}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-xs">
                  <div className="bg-slate-50 p-2 rounded border border-slate-100">
                    <span className="text-[10px] font-semibold text-slate-500 uppercase block">
                      Audits
                    </span>
                    <span className="font-mono font-medium text-slate-800">
                      {site.auditedDossiers}
                    </span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded border border-slate-100">
                    <span className="text-[10px] font-semibold text-slate-500 uppercase block">
                      SIF Events
                    </span>
                    <span className="font-mono font-bold text-rose-700">
                      {site.sifIncidents}
                    </span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded border border-slate-100">
                    <span className="text-[10px] font-semibold text-slate-500 uppercase block">
                      Barrier Score
                    </span>
                    <span className="font-mono font-bold text-slate-900">
                      {site.barrierIntegrity}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Hazard Vector Insights */}
      {activeTab === 'HAZARD' && (
        <div className="p-5 space-y-3 bg-slate-50/30">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockHazardInsights.map((hazard) => (
              <div
                key={hazard.hazardCode}
                className="p-4 rounded-md border border-slate-200 bg-white space-y-3"
              >
                <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-900 bg-slate-100 px-2 py-0.5 border border-slate-200 rounded">
                      {hazard.hazardCode}
                    </span>
                    <span className="text-xs font-semibold text-slate-700">
                      {hazard.energyType}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-slate-500">
                    {hazard.exposureVolume}
                  </span>
                </div>

                <h4 className="text-sm font-semibold text-slate-900">
                  {hazard.hazardType}
                </h4>

                <div className="p-2.5 bg-slate-50 rounded border border-slate-200 space-y-1">
                  <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block">
                    Critical Defensive Barrier
                  </span>
                  <p className="text-xs text-slate-800 font-medium">
                    {hazard.criticalSafeguard}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-slate-600">Measured Barrier Containment Efficiency:</span>
                  <span className="font-mono font-bold text-slate-900">
                    {hazard.containmentEfficiency}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
