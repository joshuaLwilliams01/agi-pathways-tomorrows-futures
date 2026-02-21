/**
 * GameState and unit-specific state interfaces.
 * Single source of truth for game progress and PPP calculations.
 * No React code — pure TypeScript types.
 */

/** People + Planet + Parity scores (0–100 or similar scale) */
export interface PPPScores {
  people: number;
  planet: number;
  parity: number;
}

/** Journal entry keyed by unit + topic */
export interface JournalEntry {
  unit: number;
  topic: string;
  content: string;
  timestamp?: string;
}

/** Unit 1: Racing to a Better Future */
export interface Unit1State {
  /** Personal future calendar / "My Future Week" choices */
  personalFuture: string[];
  /** Societal future sliders / "World Welcome Party" values */
  societalFuture: Record<string, number>;
  /** PPP preferences from sliders */
  pppPreferences: PPPScores;
  /** Optional character perspective for older players */
  chosenCharacterId?: string;
}

/** Unit 2: Drivers of AI Progress */
export interface Unit2State {
  /** AI triad: compute, algorithms, data choices */
  aiTriadChoices: Record<string, string>;
  /** Scaling assumptions from sliders */
  scalingAssumptions: Record<string, number>;
  /** Timeline profile: short / medium / long / uncertain */
  timelineProfile: string;
}

/** Threat pathway and asset types */
export type ThreatPathway =
  | "power_concentration"
  | "gradual_disempowerment"
  | "catastrophic_pandemics"
  | "critical_infrastructure";

/** Unit 3: Pathways to Harm */
export interface ThreatCard {
  asset: string;
  pathway: ThreatPathway;
  title: string;
  description: string;
  pppNotes: PPPScores;
}

export interface Unit3State {
  protectedAssets: string[];
  coalitionNotes: string;
  threatCard: ThreatCard | null;
}

/** Unit 4: Defence in Depth */
export interface StrategyMix {
  governmentControl: number;
  alignedSuperintelligence: number;
  diffuseAndDefend: number;
}

export interface DefenceLayerCard {
  id: string;
  layer: "prevent" | "constrain" | "withstand";
  killChainStage?: string;
  label: string;
}

export interface Unit4State {
  strategyMix: StrategyMix;
  layerMap: DefenceLayerCard[];
  focalLayer: "prevent" | "constrain" | "withstand" | null;
  focalPlanNotes: string;
}

/** Unit 5: Start Contributing */
export interface Unit5State {
  interventionId: string;
  interventionNotes: string;
  roleArchetype: string;
  shortTermPlan: string; // 3–6 month steps
  midTermPlan: string;   // 1–3 year direction
  alignmentNarrative: string;
}

export interface GameState {
  meta: {
    version: string;
    lastSaved?: string;
    language: string;
    kidMode?: boolean;
  };
  currentUnit: number; // 1–5
  journal: JournalEntry[];
  unit1: Unit1State;
  unit2: Unit2State;
  unit3: Unit3State;
  unit4: Unit4State;
  unit5: Unit5State;
}

/** Default strategy mix (equal split) */
export const DEFAULT_STRATEGY_MIX: StrategyMix = {
  governmentControl: 33,
  alignedSuperintelligence: 33,
  diffuseAndDefend: 34,
};

/** Default PPP (neutral) */
export const DEFAULT_PPP: PPPScores = {
  people: 50,
  planet: 50,
  parity: 50,
};

/** Empty threat card template */
export const EMPTY_THREAT_CARD: ThreatCard = {
  asset: "",
  pathway: "power_concentration",
  title: "",
  description: "",
  pppNotes: { ...DEFAULT_PPP },
};

export function createInitialGameState(language = "en"): GameState {
  return {
    meta: {
      version: "1.0",
      language,
      kidMode: false,
    },
    currentUnit: 1,
    journal: [],
    unit1: {
      personalFuture: [],
      societalFuture: {},
      pppPreferences: { ...DEFAULT_PPP },
    },
    unit2: {
      aiTriadChoices: {},
      scalingAssumptions: {},
      timelineProfile: "",
    },
    unit3: {
      protectedAssets: [],
      coalitionNotes: "",
      threatCard: null,
    },
    unit4: {
      strategyMix: { ...DEFAULT_STRATEGY_MIX },
      layerMap: [],
      focalLayer: null,
      focalPlanNotes: "",
    },
    unit5: {
      interventionId: "",
      interventionNotes: "",
      roleArchetype: "",
      shortTermPlan: "",
      midTermPlan: "",
      alignmentNarrative: "",
    },
  };
}
