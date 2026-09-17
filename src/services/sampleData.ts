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
    lifeSavingRules: [
      {
        id: 'LSR-04',
        ruleCode: 'LSR-04',
        name: 'Suspended Loads & Rigging',
        category: 'Mechanical / Gravitational',
        description: 'Never walk, position oneself, or permit transit under a suspended or unanchored load.',
        status: 'BREACHED',
        criticalBarrier: 'Physical pedestrian exclusion zone and active interlocked transit barrier.',
        deviationObserved: 'Pedestrian walkway remained open without barrier gates while 12T girder was suspended 6.5m overhead.',
        mitigationAction: 'Install automated electromagnetic gate interlocks tied directly to crane trolley limit switches.',
        riskScore: 96,
      },
      {
        id: 'LSR-06',
        ruleCode: 'LSR-06',
        name: 'Bypassing Safety Controls & Interlocks',
        category: 'System Integrity',
        description: 'Obtain authorization and verify redundant safeguards before overriding or bypassing safety devices.',
        status: 'BREACHED',
        criticalBarrier: 'Secondary holding brake redundancy and calibrated brake limit sensors.',
        deviationObserved: 'Auxiliary holding brake was left in mechanical bypass following shift maintenance without supervisory signoff.',
        mitigationAction: 'Mandate digital LOTO key-exchange protocol prior to releasing crane for production lifts.',
        riskScore: 92,
      },
      {
        id: 'LSR-03',
        ruleCode: 'LSR-03',
        name: 'Line of Fire & Exclusion Zones',
        category: 'Operational Discipline',
        description: 'Maintain verified buffer distance from high-energy drop, swing, and pinch zones.',
        status: 'AT_RISK',
        criticalBarrier: 'Dedicated spotter communication and high-visibility perimeter demarcation.',
        deviationObserved: 'Crane operator initiated travel traversal across Bay 4 corridor without spotter confirmation.',
        mitigationAction: 'Implement RFID zone beacons with automatic hoist speed throttling upon proximity violation.',
        riskScore: 84,
      },
      {
        id: 'LSR-01',
        ruleCode: 'LSR-01',
        name: 'Work at Heights & Fall Protection',
        category: 'Elevation Safety',
        description: 'Utilize 100% tie-off fall restraint systems when working above designated heights.',
        status: 'COMPLIANT',
        criticalBarrier: 'Permanent gantry cat-walk guardrails and lifeline anchor points.',
        deviationObserved: 'Maintenance personnel remained on rated walkways with harness tie-off attached.',
        mitigationAction: 'Continue scheduled 6-month visual inspection of static anchor lanyards.',
        riskScore: 12,
      },
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
        sourceSection: 'Incident Description (Section 2.1)',
        pageNumber: 1,
        lineNumber: 42,
        categoryTag: 'Precursor Vector',
        textExcerpt:
          'The 12-ton girder slipped approximately 1.2 meters downward due to uncalibrated primary brake disengagement while hovering directly above the designated pedestrian corridor.',
        contextBefore: 'During final crane alignment over Bay 4 structural jigs,',
        highlightedPhrase: 'the 12-ton girder slipped approximately 1.2 meters downward due to uncalibrated primary brake disengagement',
        contextAfter: 'while hovering directly above the designated pedestrian corridor.',
        relevanceNote: 'Establishes high gravitational potential energy release directly above human transit zone.',
        confidenceScore: 97,
      },
      {
        id: 'EV-02',
        sourceSection: 'Witness Statements (Worker ID 4082)',
        pageNumber: 2,
        lineNumber: 18,
        categoryTag: 'Human Exposure',
        textExcerpt:
          'Two maintenance technicians were walking through the Bay 4 walkway and had to rapidly clear the area when the cable shudder occurred.',
        contextBefore: 'According to floor safety observations,',
        highlightedPhrase: 'Two maintenance technicians were walking through the Bay 4 walkway and had to rapidly clear the area',
        contextAfter: 'when the cable shudder occurred.',
        relevanceNote: 'Confirms human exposure directly within the line of fire of the suspended hazard.',
        confidenceScore: 94,
      },
      {
        id: 'EV-03',
        sourceSection: 'Physical Inspection Record (Form 14B)',
        pageNumber: 3,
        lineNumber: 8,
        categoryTag: 'Barrier Failure',
        textExcerpt:
          'Auxiliary holding brake was found in a bypass maintenance configuration following the previous shift overhaul.',
        contextBefore: 'Upon post-incident technical tear-down of Hoist Gearbox Unit 3,',
        highlightedPhrase: 'Auxiliary holding brake was found in a bypass maintenance configuration',
        contextAfter: 'following the previous shift overhaul.',
        relevanceNote: 'Demonstrates failure and bypass of secondary critical barrier defending against single-point failure.',
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
    fullIncidentText: `INCIDENT DOSSIER REF: INC-2026-8841
DATE OF REPORT: 2026-09-22 09:35:00 UTC
FACILITY: Northern Heavy Fabrication Yard - Bay 4
DIVISION: Structural Assembly & Rigging Division

1. EXECUTIVE SYNOPSIS
At approximately 09:35 UTC during secondary steel girder positioning in Assembly Bay 4, Overhead Gantry Crane #03 (15T capacity) carrying an asymmetrical 12-ton fabricated bridge chord experienced sudden uncommanded vertical descent while traversing over main corridor B.

2. DETAILED NARRATIVE & CHRONOLOGY
During final crane alignment over Bay 4 structural jigs, the 12-ton girder slipped approximately 1.2 meters downward due to uncalibrated primary brake disengagement while hovering directly above the designated pedestrian corridor. The operator immediately engaged emergency counter-torque, halting descent approximately 5.3 meters above floor level.

3. WITNESS TESTIMONY & HUMAN EXPOSURE
Worker ID 4082 & 4109 were walking through the Bay 4 walkway and had to rapidly clear the area when the cable shudder occurred. Neither technician was struck, but both were located within the 6-meter collapse radius.

4. MECHANICAL & ELECTRICAL INSPECTION
Post-incident tear-down of Hoist Gearbox Unit 3 revealed that the auxiliary holding brake was found in a bypass maintenance configuration following the previous shift overhaul. The primary electromagnetic disc brake showed friction liner glazing.

5. REGULATORY DETERMINATION
Evaluated under SIF Precursor Taxonomy #04 (Suspended High-Energy Load). Classification: SIF POTENTIAL.`,
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
    lifeSavingRules: [
      {
        id: 'LSR-02',
        ruleCode: 'LSR-02',
        name: 'Energy & Electrical Isolation (LOTO)',
        category: 'Electrical Safety',
        description: 'Verify zero energy state using calibrated test instruments prior to commencing work on any electrical circuit.',
        status: 'BREACHED',
        criticalBarrier: 'Lockout/Tagout (LOTO) isolation on upstream disconnect and calibrated multi-meter probe test.',
        deviationObserved: 'Technician penetrated MCC-04 assuming breaker 4B was opened without conducting live-dead-live instrument test.',
        mitigationAction: 'Enforce two-electrician sign-off verification requirement on zero-energy test certificates.',
        riskScore: 98,
      },
      {
        id: 'LSR-05',
        ruleCode: 'LSR-05',
        name: 'Personal Protective Equipment Compliance',
        category: 'Personal Defense',
        description: 'Wear arc-rated clothing and full-face protective shield matched to incident energy calculation.',
        status: 'AT_RISK',
        criticalBarrier: 'Category 4 Arc Flash suit (40 cal/cm2) and leather-insulated lineman gloves.',
        deviationObserved: 'Technician wore 8 cal/cm2 face shield but operated without outer leather protective gloves.',
        mitigationAction: 'Mandate calibrated arc flash PPE inspections prior to unlocking substation enclosures.',
        riskScore: 89,
      },
      {
        id: 'LSR-07',
        ruleCode: 'LSR-07',
        name: 'Permit to Work & Authorization',
        category: 'Administrative Controls',
        description: 'Execute high-voltage electrical work strictly under active Energized Electrical Work Permit (EEWP).',
        status: 'BREACHED',
        criticalBarrier: 'Approved EEWP signed by Chief Electrical Safety Engineer.',
        deviationObserved: 'Work was initiated under routine maintenance work order rather than high-risk electrical permit.',
        mitigationAction: 'Implement software-locked work order release requiring digital permit verification.',
        riskScore: 94,
      },
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
        pageNumber: 1,
        lineNumber: 22,
        categoryTag: 'Barrier Breach',
        textExcerpt:
          'Technician opened panel MCC-04 assuming upstream disconnect 4B was open, but auxiliary tie breaker was actively feeding busbar B.',
        contextBefore: 'At 14:15 UTC, the',
        highlightedPhrase: 'Technician opened panel MCC-04 assuming upstream disconnect 4B was open, but auxiliary tie breaker was actively feeding busbar B',
        contextAfter: 'resulting in direct contact with live 480V energized busbars.',
        relevanceNote: 'Documents presence of unisolated live high-energy electrical system.',
        confidenceScore: 99,
      },
      {
        id: 'EV-02',
        sourceSection: 'Medical Treatment Assessment',
        pageNumber: 2,
        lineNumber: 14,
        categoryTag: 'Injury Grounding',
        textExcerpt:
          'Worker sustained second-degree burns across bilateral forearms and facial erythema; transferred to Regional Burn Center for inpatient surgical care.',
        contextBefore: 'Following initial triage by on-site paramedical team,',
        highlightedPhrase: 'Worker sustained second-degree burns across bilateral forearms and facial erythema; transferred to Regional Burn Center',
        contextAfter: 'for inpatient surgical care.',
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
    fullIncidentText: `INCIDENT DOSSIER REF: INC-2026-8839
DATE OF REPORT: 2026-09-21 14:18:00 UTC
FACILITY: Substation Building 2 - Switchgear Room
DIVISION: High Voltage Electrical Services

1. OVERVIEW
On September 21, 2026 at 14:18 UTC, a severe electrical arc flash incident occurred at Motor Control Center MCC-04 during routine contactor maintenance.

2. SEQUENCE OF EVENTS
At 14:15 UTC, the technician opened panel MCC-04 assuming upstream disconnect 4B was open, but auxiliary tie breaker was actively feeding busbar B. When the technician applied a torque wrench to terminal 2C, an arc flash discharged with an estimated incident energy exceeding 12 cal/cm2.

3. MEDICAL & EMERGENCY RESPONSE
Worker sustained second-degree burns across bilateral forearms and facial erythema; transferred to Regional Burn Center for inpatient surgical care. Paramedics administered saline burn dressing on site.

4. INVESTIGATION FINDINGS
Absence of verified zero-energy state via live-dead-live testing. Inadequate arc-rated PPE utilized for the specific task hazard boundary. Classification: SIF ACTUAL.`,
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
    lifeSavingRules: [
      {
        id: 'LSR-GEN',
        ruleCode: 'LSR-GEN',
        name: 'Housekeeping & Walkway Maintenance',
        category: 'General Workplace Safety',
        description: 'Maintain walking and working surfaces free from wet substances or slip hazards.',
        status: 'COMPLIANT',
        criticalBarrier: 'Prompt spill cleanup and cautionary signage placement.',
        deviationObserved: 'Minor localized liquid spill on office floor; immediate wipe down performed.',
        mitigationAction: 'Routine custodial inspection logs updated for office corridors.',
        riskScore: 10,
      },
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
        pageNumber: 1,
        lineNumber: 12,
        categoryTag: 'Medical Severity Grounding',
        textExcerpt:
          'Employee applied cold compress for 15 minutes; reported zero pain upon weight bearing and resumed desk duties.',
        contextBefore: 'Upon reporting to building medical station,',
        highlightedPhrase: 'Employee applied cold compress for 15 minutes; reported zero pain upon weight bearing and resumed desk duties',
        contextAfter: 'with no further intervention required.',
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
    fullIncidentText: `INCIDENT DOSSIER REF: INC-2026-8822
DATE OF REPORT: 2026-09-19 08:15:00 UTC
FACILITY: Administrative HQ - 2nd Floor Corridor
DIVISION: General Office Operations

1. REPORT OVERVIEW
At 08:15 UTC, an administrative employee encountered water on the linoleum floor outside meeting room 204 from a slow-dripping water cooler.

2. IMPACT & TRIAGE
Employee slipped and landed on one knee. Employee applied cold compress for 15 minutes; reported zero pain upon weight bearing and resumed desk duties.

3. RESOLUTION
Custodial staff dried area immediately and placed caution sign. Plumbing work order #331 issued for seal replacement. Classification: NON-SIF.`,
    processingMetadata: {
      latencyMs: 210,
      tokensEvaluated: 940,
      parserVersion: 'Schema v2.4.1-strict',
      rulesEngineStatus: 'Deterministic SIF Ruleset v4.0 Active',
    },
  },
];

