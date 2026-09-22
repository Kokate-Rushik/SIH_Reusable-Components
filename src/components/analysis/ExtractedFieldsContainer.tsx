import React, { useState } from 'react';
import { Database, Edit2, Check, RotateCcw, Building2, Calendar, UserCheck, Wrench, ShieldCheck, AlertTriangle } from 'lucide-react';
import { ExtractedIncidentFields } from '../../types/analysis';
import { cn } from '../../lib/utils';

export interface ExtractedFieldsContainerProps {
  initialFields: ExtractedIncidentFields;
  onSave?: (fields: ExtractedIncidentFields) => void;
  className?: string;
}

const defaultEmptyFields: ExtractedIncidentFields = {
  incidentId: 'INC-UNASSIGNED',
  incidentDateTime: '—',
  facilityLocation: '—',
  departmentOrUnit: '—',
  eventType: '—',
  injuryMechanism: '—',
  injuredPersonnelRole: '—',
  equipmentInvolved: '—',
  ppeComplianceStatus: '—',
  environmentalFactors: '—',
  immediateCorrectiveActions: '—',
  supervisoryFollowUp: '—',
};

export const ExtractedFieldsContainer: React.FC<ExtractedFieldsContainerProps> = ({
  initialFields,
  onSave,
  className,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [fields, setFields] = useState<ExtractedIncidentFields>({
    ...defaultEmptyFields,
    ...(initialFields || {}),
  });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleInputChange = (key: keyof ExtractedIncidentFields, value: string) => {
    setFields((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
    if (onSave) {
      onSave(fields);
    }
  };

  const handleReset = () => {
    setFields(initialFields);
    setIsEditing(false);
  };

  return (
    <div className={cn('surface-card overflow-hidden', className)}>
      {/* Header Bar */}
      <div className="p-5 border-b border-slate-200 bg-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
            <Database className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900 tracking-tight">
              Extracted Incident Parameters & Metadata
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Structured entity attributes extracted directly by deterministic NLP tokenization.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {savedSuccess && (
            <span className="text-xs text-emerald-700 font-medium flex items-center gap-1">
              <Check className="h-3.5 w-3.5" />
              Verified & Saved
            </span>
          )}

          {!isEditing ? (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded text-xs font-medium transition-colors border border-slate-200"
            >
              <Edit2 className="h-3.5 w-3.5" />
              Edit / Verify Fields
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-medium transition-colors border border-slate-200"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="flex items-center gap-1 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-medium transition-colors shadow-xs"
              >
                <Check className="h-3.5 w-3.5" />
                Commit Changes
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Grid / Form Layout */}
      <div className="p-5 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Incident ID & Reference */}
          <div className="space-y-1">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 uppercase tracking-wider">
              <Calendar className="h-3.5 w-3.5 text-slate-400" />
              Incident Identifier
            </label>
            {isEditing ? (
              <input
                type="text"
                value={fields.incidentId}
                onChange={(e) => handleInputChange('incidentId', e.target.value)}
                className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-900 font-mono focus:outline-none focus:border-slate-600"
              />
            ) : (
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded text-xs font-mono text-slate-900 font-medium">
                {fields.incidentId}
              </div>
            )}
          </div>

          {/* Incident Date & Time */}
          <div className="space-y-1">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 uppercase tracking-wider">
              <Calendar className="h-3.5 w-3.5 text-slate-400" />
              Timestamp Recorded
            </label>
            {isEditing ? (
              <input
                type="text"
                value={fields.incidentDateTime}
                onChange={(e) => handleInputChange('incidentDateTime', e.target.value)}
                className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-slate-600"
              />
            ) : (
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded text-xs text-slate-900">
                {fields.incidentDateTime}
              </div>
            )}
          </div>

          {/* Facility / Location */}
          <div className="space-y-1">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 uppercase tracking-wider">
              <Building2 className="h-3.5 w-3.5 text-slate-400" />
              Facility & Location
            </label>
            {isEditing ? (
              <input
                type="text"
                value={fields.facilityLocation}
                onChange={(e) => handleInputChange('facilityLocation', e.target.value)}
                className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-slate-600"
              />
            ) : (
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded text-xs text-slate-900">
                {fields.facilityLocation}
              </div>
            )}
          </div>

          {/* Department / Unit */}
          <div className="space-y-1">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 uppercase tracking-wider">
              <Building2 className="h-3.5 w-3.5 text-slate-400" />
              Department / Operational Unit
            </label>
            {isEditing ? (
              <input
                type="text"
                value={fields.departmentOrUnit}
                onChange={(e) => handleInputChange('departmentOrUnit', e.target.value)}
                className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-slate-600"
              />
            ) : (
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded text-xs text-slate-900">
                {fields.departmentOrUnit}
              </div>
            )}
          </div>

          {/* Event Classification Type */}
          <div className="space-y-1">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 uppercase tracking-wider">
              <AlertTriangle className="h-3.5 w-3.5 text-slate-400" />
              Event Classification
            </label>
            {isEditing ? (
              <input
                type="text"
                value={fields.eventType}
                onChange={(e) => handleInputChange('eventType', e.target.value)}
                className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-slate-600"
              />
            ) : (
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded text-xs text-slate-900 font-medium">
                {fields.eventType}
              </div>
            )}
          </div>

          {/* Injury Mechanism */}
          <div className="space-y-1">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 uppercase tracking-wider">
              <AlertTriangle className="h-3.5 w-3.5 text-slate-400" />
              Injury / Hazard Mechanism
            </label>
            {isEditing ? (
              <input
                type="text"
                value={fields.injuryMechanism}
                onChange={(e) => handleInputChange('injuryMechanism', e.target.value)}
                className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-slate-600"
              />
            ) : (
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded text-xs text-slate-900">
                {fields.injuryMechanism}
              </div>
            )}
          </div>

          {/* Personnel Involved */}
          <div className="space-y-1">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 uppercase tracking-wider">
              <UserCheck className="h-3.5 w-3.5 text-slate-400" />
              Exposed Personnel / Role
            </label>
            {isEditing ? (
              <input
                type="text"
                value={fields.injuredPersonnelRole}
                onChange={(e) => handleInputChange('injuredPersonnelRole', e.target.value)}
                className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-slate-600"
              />
            ) : (
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded text-xs text-slate-900">
                {fields.injuredPersonnelRole}
              </div>
            )}
          </div>

          {/* Equipment Involved */}
          <div className="space-y-1">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 uppercase tracking-wider">
              <Wrench className="h-3.5 w-3.5 text-slate-400" />
              Equipment / Asset ID
            </label>
            {isEditing ? (
              <input
                type="text"
                value={fields.equipmentInvolved}
                onChange={(e) => handleInputChange('equipmentInvolved', e.target.value)}
                className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-slate-600"
              />
            ) : (
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded text-xs text-slate-900">
                {fields.equipmentInvolved}
              </div>
            )}
          </div>

          {/* PPE Status */}
          <div className="space-y-1">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 uppercase tracking-wider">
              <ShieldCheck className="h-3.5 w-3.5 text-slate-400" />
              PPE Compliance Condition
            </label>
            {isEditing ? (
              <input
                type="text"
                value={fields.ppeComplianceStatus}
                onChange={(e) => handleInputChange('ppeComplianceStatus', e.target.value)}
                className="w-full bg-white border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:border-slate-600"
              />
            ) : (
              <div className="p-2.5 bg-slate-50 border border-slate-200 rounded text-xs text-slate-900">
                {fields.ppeComplianceStatus}
              </div>
            )}
          </div>
        </div>

        {/* Full-width sections for text areas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5 pt-5 border-t border-slate-100">
          {/* Immediate Actions */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">
              Immediate Containment & Corrective Actions
            </label>
            {isEditing ? (
              <textarea
                rows={3}
                value={fields.immediateCorrectiveActions}
                onChange={(e) => handleInputChange('immediateCorrectiveActions', e.target.value)}
                className="w-full bg-white border border-slate-300 rounded p-2.5 text-xs text-slate-900 focus:outline-none focus:border-slate-600 leading-normal"
              />
            ) : (
              <div className="p-3 bg-slate-50 border border-slate-200 rounded text-xs text-slate-800 leading-normal">
                {fields.immediateCorrectiveActions}
              </div>
            )}
          </div>

          {/* Supervisory Follow-up */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider">
              Supervisory Review & Verification
            </label>
            {isEditing ? (
              <textarea
                rows={3}
                value={fields.supervisoryFollowUp}
                onChange={(e) => handleInputChange('supervisoryFollowUp', e.target.value)}
                className="w-full bg-white border border-slate-300 rounded p-2.5 text-xs text-slate-900 focus:outline-none focus:border-slate-600 leading-normal"
              />
            ) : (
              <div className="p-3 bg-slate-50 border border-slate-200 rounded text-xs text-slate-800 leading-normal">
                {fields.supervisoryFollowUp}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
