import { SIFAnalysisResult } from '../types/analysis';

export const sampleAnalysisReports: SIFAnalysisResult[] = [
  {
    id: 'RPT-2026-0922-SIF-01',
    reportName: 'incident_heavy_crane_near_miss_bay4.pdf',
    fileSize: '4.8 MB',
    uploadedAt: '2026-09-22 11:42:19',
    sifClassification: 'SIF_POTENTIAL',
    sifCategory: 'Overhead Lifting & Suspended Loads',
    severityLevel: 'High',
    precursorIdentified: true,
    precursorType: 'High-Energy Source Without Direct Critical Barrier',
    summary:
      'During secondary steel girder positioning in Assembly Bay 4, a 12-ton overhead crane hoist experienced a momentary brake slip while suspended 6.5 meters above an active pedestrian crossing aisle. Personnel were in transit beneath the swing radius.',
    detailedRationale:
      'The event involves a high-energy suspended load hazard (12 metric tons at 6.5m elevation) intersecting with an unprotected pedestrian corridor. Although the load did not catastrophically drop to floor level, the absence of physical exclusion barriers and secondary positive locking mechanism means realistic potential for a fatal crushing event existed under slightly modified timing or proximity.',
    recommendedControls: [
      'Enforce physical interlocked exclusion gates across Bay 4 transit aisles during all overhead crane lift operations.',
      'Conduct urgent non-destructive testing (NDT) and friction pad clearance verification on Hoist Unit 3 electro-mechanical brake.',
      'Implement dual-independent hoist braking redundancy protocol for loads exceeding 5 metric tons.',
      'Mandate crane operator secondary spotter verification prior to entering designated transit zone airspaces.',
    ],
    confidence: {
      overallScore: 94,
      level: 'HIGH',
      modelEngine: 'SIH-SafetyEvaluator-v3.2',
      calibratedMargin: '±1.8%',
      factors: [
        {
          name: 'Hazard Energy Quantification',
          score: 98,
          weight: '35%',
          description: 'Kinetic and gravitational potential energy calculation verified from hoist capacity specs.',
        },
        {
          name: 'Direct Precursor Match',
          score: 95,
          weight: '30%',
          description: 'High correlation with OSHA / Campbell Institute SIF precursor taxonomy #04 (Suspended Loads).',
        },
        {
          name: 'Contextual Narrative Coherence',
          score: 91,
          weight: '20%',
          description: 'Clear sequence of events without contradictory timeline or mechanism descriptions.',
        },
        {
          name: 'Historical Barrier Effectiveness',
          score: 89,
          weight: '15%',
          description: 'Prior audit logs confirm lack of interlocked barrier in Bay 4 pedestrian junction.',
        },
      ],
    },
    evidence: [
      {
        id: 'EV-01',
        sourceSection: 'Incident Description (Paragraph 2)',
        textExcerpt:
          '"...the 12-ton girder slipped approximately 1.2 meters downward due to uncalibrated primary brake disengagement while hovering directly above the designated pedestrian corridor..."',
        relevanceNote: 'Establishes high gravitational potential energy release directly above human transit zone.',
        confidenceScore: 97,
      },
      {
        id: 'EV-02',
        sourceSection: 'Witness Statements (Worker ID 4082)',
        textExcerpt:
          '"Two maintenance technicians were walking through the Bay 4 walkway and had to rapidly clear the area when the cable shudder occurred."',
        relevanceNote: 'Confirms human exposure directly within the line of fire of the suspended hazard.',
        confidenceScore: 94,
      },
      {
        id: 'EV-03',
        sourceSection: 'Physical Inspection Record (Form 14B)',
        textExcerpt:
          '"Auxiliary holding brake was found in a bypass maintenance configuration following the previous shift overhaul."',
        relevanceNote: 'Demonstrates failure/absence of secondary critical barrier defending against single-point failure.',
        confidenceScore: 96,
      },
    ],
    extractedFields: {
      incidentId: 'INC-2026-8841',
      incidentDateTime: '2026-09-22 09:35:00 UTC',
      facilityLocation: 'Northern Heavy Fabrication Yard - Bay 4',
      departmentOrUnit: 'Structural Assembly & Rigging Division',
      eventType: 'Near Miss / SIF Potential Event',
      injuryMechanism: 'Crushing Hazard / Struck by Suspended Object',
      injuredPersonnelRole: 'No Physical Injury Sustained (2 Technicians Exposed)',
      equipmentInvolved: 'Overhead Gantry Crane #03 (15T Capacity)',
      ppeComplianceStatus: 'Standard Level 2 PPE active (Hard hat, safety glasses, steel-toe boots)',
      environmentalFactors: 'Indoor facility, artificial lighting 450 lux, dry floor surface',
      immediateCorrectiveActions:
        'Gantry Crane #03 red-tagged and locked out. Bay 4 aisle barricaded with physical safety cones.',
      supervisoryFollowUp:
        'Rigging supervisor and shift mechanic ordered to submit written lockout-tagout verification logs.',
    },
    processingMetadata: {
      latencyMs: 342,
      tokensEvaluated: 1840,
      parserVersion: 'Schema v2.4.1-strict',
      rulesEngineStatus: 'Deterministic SIF Ruleset v4.0 Active',
    },
  },
  {
    id: 'RPT-2026-0921-SIF-02',
    reportName: 'electrical_flashover_mcc_substation2.pdf',
    fileSize: '3.2 MB',
    uploadedAt: '2026-09-21 16:10:04',
    sifClassification: 'SIF_ACTUAL',
    sifCategory: 'Electrical Energy & Arc Flash',
    severityLevel: 'Critical',
    precursorIdentified: true,
    precursorType: 'Energized 480V Busbar Working Without Zero Energy Verification',
    summary:
      'During scheduled routine breaker replacement in Substation 2 (MCC-04), an electrical flashover occurred on the 480V 3-phase incoming terminal, causing 2nd-degree thermal burns to the technician and tripping the main feeder breaker.',
    detailedRationale:
      'High incident energy exposure (>8 cal/cm2) with documented second-degree burn injuries requiring emergency hospitalization. Zero energy state was assumed rather than instrument-verified, representing a direct compromise of the primary electrical isolation barrier.',
    recommendedControls: [
      'Mandate strict live-dead-live multi-meter verification protocol with two-person signoff before any panel penetration.',
      'Upgrade arc-rated PPE requirements to Category 4 (40 cal/cm2) for all main substation switchgear intervention.',
      'Install optical arc flash detection relays in MCC-04 to reduce fault clearance time to under 40ms.',
      'Initiate mandatory retraining on NFPA 70E / OSHA 1910.333 for all plant electricians.',
    ],
    confidence: {
      overallScore: 97,
      level: 'HIGH',
      modelEngine: 'SIH-SafetyEvaluator-v3.2',
      calibratedMargin: '±1.1%',
      factors: [
        {
          name: 'Hazard Energy Quantification',
          score: 99,
          weight: '35%',
          description: 'Direct 480V 1200A short circuit energy rating matched against arc flash tables.',
        },
        {
          name: 'Direct Precursor Match',
          score: 98,
          weight: '30%',
          description: 'Exact match with Campbell SIF Category #02 (Live Electrical Exposure).',
        },
        {
          name: 'Medical Outcome Documentation',
          score: 96,
          weight: '20%',
          description: 'Hospital burn center admission records corroborate serious injury classification.',
        },
        {
          name: 'LOTO Procedure Breach',
          score: 95,
          weight: '15%',
          description: 'Lockout tagout audit log confirmed incomplete upstream isolation sequence.',
        },
      ],
    },
    evidence: [
      {
        id: 'EV-01',
        sourceSection: 'Shift Supervisor Summary',
        textExcerpt:
          '"Technician opened panel MCC-04 assuming upstream disconnect 4B was open, but auxiliary tie breaker was actively feeding busbar B."',
        relevanceNote: 'Documents presence of unisolated live high-energy electrical system.',
        confidenceScore: 99,
      },
      {
        id: 'EV-02',
        sourceSection: 'Medical Treatment Assessment',
        textExcerpt:
          '"Worker sustained second-degree burns across bilateral forearms and facial erythema; transferred to Regional Burn Center for inpatient surgical care."',
        relevanceNote: 'Qualifies event as SIF Actual under OSHA recordable serious injury definitions.',
        confidenceScore: 98,
      },
    ],
    extractedFields: {
      incidentId: 'INC-2026-8839',
      incidentDateTime: '2026-09-21 14:18:00 UTC',
      facilityLocation: 'Substation Building 2 - Switchgear Room',
      departmentOrUnit: 'High Voltage Electrical Services',
      eventType: 'Electrical Arc Flash Event',
      injuryMechanism: 'Thermal Radiation & Arc Blast Wave',
      injuredPersonnelRole: 'Senior Electrical Technician (1 Injured)',
      equipmentInvolved: 'Motor Control Center MCC-04 (480V 3-Phase)',
      ppeComplianceStatus: 'Partial compliance: 8 cal/cm2 rated face shield worn; gloves lacked leather protector',
      environmentalFactors: 'Enclosed switchgear room, ambient temperature 28C, humidity 62%',
      immediateCorrectiveActions:
        'Substation 2 feeder completely de-energized. Lockout padlock affixed by Electrical Safety Lead.',
      supervisoryFollowUp:
        'Root cause investigation team formed; all scheduled breaker overhauls paused plant-wide pending safety stand-down.',
    },
    processingMetadata: {
      latencyMs: 298,
      tokensEvaluated: 2150,
      parserVersion: 'Schema v2.4.1-strict',
      rulesEngineStatus: 'Deterministic SIF Ruleset v4.0 Active',
    },
  },
  {
    id: 'RPT-2026-0919-SIF-03',
    reportName: 'office_walkway_spill_slip_q3.docx',
    fileSize: '1.1 MB',
    uploadedAt: '2026-09-19 08:30:15',
    sifClassification: 'NON_SIF',
    sifCategory: 'Slip / Trip on Same Level',
    severityLevel: 'Low',
    precursorIdentified: false,
    summary:
      'An administrative employee slipped on water from a leaking water dispenser in the 2nd-floor office hallway, resulting in a minor knee bruise. First aid ice pack administered; employee returned to regular duties.',
    detailedRationale:
      'Low kinetic energy mechanism occurring on flat level floor with no secondary sharp edge or elevated drop hazard. No SIF precursor vector present. The incident is classified as a minor first-aid recordable non-SIF event.',
    recommendedControls: [
      'Replace worn silicone gasket in 2nd-floor water cooler unit.',
      'Place standard yellow caution cones until floor surface is completely dry.',
      'Ensure custodial routine checks water dispensers twice daily.',
    ],
    confidence: {
      overallScore: 92,
      level: 'HIGH',
      modelEngine: 'SIH-SafetyEvaluator-v3.2',
      calibratedMargin: '±2.4%',
      factors: [
        {
          name: 'Hazard Energy Quantification',
          score: 95,
          weight: '35%',
          description: 'Kinetic energy bounded by same-level slip without machinery or height involvement.',
        },
        {
          name: 'Absence of SIF Precursors',
          score: 94,
          weight: '30%',
          description: 'Zero correlation with high-energy life-threatening hazard classifications.',
        },
        {
          name: 'Medical Classification Fit',
          score: 91,
          weight: '20%',
          description: 'First aid only with zero lost workday time or permanent impairment risk.',
        },
        {
          name: 'Environmental Context',
          score: 88,
          weight: '15%',
          description: 'Carpeted/tiled administrative area isolated from industrial processes.',
        },
      ],
    },
    evidence: [
      {
        id: 'EV-01',
        sourceSection: 'First Aid Incident Log',
        textExcerpt:
          '"Employee applied cold compress for 15 minutes; reported zero pain upon weight bearing and resumed desk duties."',
        relevanceNote: 'Confirms lack of severe musculoskeletal trauma or hospitalization.',
        confidenceScore: 94,
      },
    ],
    extractedFields: {
      incidentId: 'INC-2026-8822',
      incidentDateTime: '2026-09-19 08:15:00 UTC',
      facilityLocation: 'Administrative HQ - 2nd Floor Corridor',
      departmentOrUnit: 'General Office Operations',
      eventType: 'Slip on Same Level (First Aid)',
      injuryMechanism: 'Surface Friction Reduction (Water Spill)',
      injuredPersonnelRole: 'Office Administrator',
      equipmentInvolved: 'Drinking Water Dispenser #02',
      ppeComplianceStatus: 'Standard indoor business footwear',
      environmentalFactors: 'Smooth linoleum flooring, indoor air-conditioned corridor',
      immediateCorrectiveActions: 'Water wiped immediately with absorbent mop; cooler unplugged and tagged.',
      supervisoryFollowUp: 'Facility maintenance scheduled to replace gasket within 24 hours.',
    },
    processingMetadata: {
      latencyMs: 210,
      tokensEvaluated: 940,
      parserVersion: 'Schema v2.4.1-strict',
      rulesEngineStatus: 'Deterministic SIF Ruleset v4.0 Active',
    },
  },
];
