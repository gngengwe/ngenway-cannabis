// Types mirror the JSON schemas in /schema (study.schema.json, claim.schema.json,
// mechanism.schema.json) at the repo root. Keep these in sync by hand -- there are only
// 3 studies and ~16 claims right now, so a generator would be premature.

export type EvidenceType =
  | "controlled experiment"
  | "naturalistic experiment"
  | "observational"
  | "systematic review"
  | "meta-analysis";

export type ClaimStatus = "supported" | "mixed" | "speculative" | "unknown";

export type Provenance = "exact" | "calculated" | "digitized" | "estimated" | "unavailable";

export interface Citation {
  authors: string;
  title: string;
  journal: string;
  year: number;
  doi?: string;
  pmid?: string;
  pmcid?: string | null;
  url?: string;
}

export interface Study {
  id: string;
  citation: Citation;
  design: string;
  population: string;
  conditions: string[];
  [key: string]: unknown;
}

export type StudiesById = Record<string, Study>;

export interface Claim {
  id: string;
  study_id: string;
  variable: string;
  unit?: string;
  relationship: string;
  significance?: unknown;
  evidence_type: EvidenceType;
  claim_status: ClaimStatus;
  interpretation_source: string;
  direction_provenance?: Provenance;
  magnitude_provenance?: Provenance;
  magnitude_note?: string;
  source_ref?: string;
  mechanism_link?: string;
}

export interface Mechanism {
  id: string;
  name: string;
  description: string;
  interpretation_source: "demonstrated mechanism" | "author interpretation" | "NGenWay hypothesis";
  supporting_claims: string[];
  study_id: string;
  source_ref?: string;
}

// --- Ramesh 2013 digitized/estimated figure shapes ---

export interface VasSeriesPoint {
  t: number;
  v: number;
}

export interface Figure2VasEstimate {
  figure_id: "F2";
  study_id: "ramesh-2013";
  provenance: "estimated";
  confidence: string;
  panels: Array<{
    variable: "high" | "stimulated";
    unit: string;
    confidence: string;
    series: {
      "0_puffs": VasSeriesPoint[];
      "2_puffs": VasSeriesPoint[];
      "4_puffs": VasSeriesPoint[];
      "6_puffs": VasSeriesPoint[];
    };
  }>;
  claim_id: string;
}

export interface DoseBarValue {
  condition: string;
  mean_est: number;
  sem_est: number;
  significance_marker: string | null;
}

export interface Figure3CravingEstimate {
  figure_id: "F3";
  study_id: "ramesh-2013";
  provenance: "estimated";
  unit: string;
  values: DoseBarValue[];
  claim_id: string;
}

export interface Figure4HrCoEstimate {
  figure_id: "F4";
  study_id: "ramesh-2013";
  provenance: "estimated";
  series: Array<{
    variable: "expired CO" | "heart rate";
    unit: string;
    axis_range: [number, number];
    values: DoseBarValue[];
  }>;
  claim_ids: string[];
}

export type DoseCondition = "0_puffs" | "2_puffs" | "4_puffs" | "6_puffs";
export const DOSE_CONDITIONS: DoseCondition[] = ["0_puffs", "2_puffs", "4_puffs", "6_puffs"];
export const DOSE_LABELS: Record<DoseCondition, string> = {
  "0_puffs": "0 puffs",
  "2_puffs": "2 puffs",
  "4_puffs": "4 puffs",
  "6_puffs": "6 puffs",
};

export const TIME_POINTS = [15, 30, 60, 90, 120, 180, 210] as const;
export type TimePoint = (typeof TIME_POINTS)[number];
