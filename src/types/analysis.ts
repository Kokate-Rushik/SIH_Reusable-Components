export type SIFClassification = 'SIF_ACTUAL' | 'SIF_POTENTIAL' | 'NON_SIF';

export type ConfidenceLevel = 'HIGH' | 'MEDIUM' | 'LOW';

export type SeverityLevel = 'Critical' | 'High' | 'Moderate' | 'Low';

export type LSRStatus = 'BREACHED' | 'AT_RISK' | 'COMPLIANT' | 'NOT_APPLICABLE';

export interface LifeSavingRule {
  id: string;
  ruleCode: string;
  name: string;
  category: string;
  description: string;
  status: LSRStatus;
  criticalBarrier: string;
  deviationObserved: string;
  mitigationAction: string;
  riskScore: number;
}

export interface EvidenceItem {
  id: string;
  sourceSection: string;
  textExcerpt: string;
  relevanceNote: string;
  confidenceScore: number;
  categoryTag?: string;
  pageNumber?: number;
  lineNumber?: number;
  contextBefore?: string;
  highlightedPhrase?: string;
  contextAfter?: string;
}

export interface ConfidenceFactor {
  name: string;
  score: number;
  weight: string;
  description: string;
}

export interface ConfidenceAssessment {
  overallScore: number;
  level: ConfidenceLevel;
  modelEngine: string;
  calibratedMargin: string;
  factors: ConfidenceFactor[];
}

export interface ExtractedIncidentFields {
  incidentId: string;
  incidentDateTime: string;
  facilityLocation: string;
  departmentOrUnit: string;
  eventType: string;
  injuryMechanism: string;
  injuredPersonnelRole: string;
  equipmentInvolved: string;
  ppeComplianceStatus: string;
  environmentalFactors: string;
  immediateCorrectiveActions: string;
  supervisoryFollowUp: string;
}

export interface SIFAnalysisResult {
  id: string;
  reportName: string;
  fileSize: string;
  uploadedAt: string;
  sifClassification: SIFClassification;
  sifCategory: string;
  severityLevel: SeverityLevel;
  precursorIdentified: boolean;
  precursorType?: string;
  summary: string;
  detailedRationale: string;
  recommendedControls: string[];
  lifeSavingRules: LifeSavingRule[];
  confidence: ConfidenceAssessment;
  evidence: EvidenceItem[];
  extractedFields: ExtractedIncidentFields;
  fullIncidentText?: string;
  processingMetadata: {
    latencyMs: number;
    tokensEvaluated: number;
    parserVersion: string;
    rulesEngineStatus: string;
  };
}

export interface UploadResponse {
  success: boolean;
  message: string;
  fileId: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  analysis?: SIFAnalysisResult;
}

