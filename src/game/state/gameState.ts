// src/game/state/gameState.ts
// Core game state types for "AGI Pathways: Tomorrow's Futures"
// Designed to be AI-assistant-friendly (Cursor, Copilot, etc.)

// -----------------------------
// Shared / global types
// -----------------------------

export type UnitId = 1 | 2 | 3 | 4 | 5;

export interface PPPScore {
  people: number; // 0–100
  planet: number; // 0–100
  parity: number; // 0–100
}

export type AvatarArchetype = "dreamer" | "builder" | "navigator";

export interface PlayerCharacter {
  name: string;
  nickname?: string;
  archetype: AvatarArchetype;
  colors: string[]; // hex or CSS colors
}

export type ThreatPathwayId =
  | "power_concentration"
  | "gradual_disempowerment"
  | "catastrophic_pandemic"
  | "critical_infrastructure_collapse";

export type DefenceLayer = "prevent" | "constrain" | "withstand";

// -----------------------------
// Unit 1 – Racing to a Better Future
// -----------------------------

export type AgiActorChoice =
  | "labs"
  | "governments"
  | "open_source"
  | "criminals"
  | "everyone"
  | "unsure";

export interface PersonalFutureEntry {
  ageInFuture: number; // e.g. current age + 20
  summary: string; // short description of a "good week" in that future
}

export interface SocietalFutureSnapshot {
  politics: number; // 0–100
  economy: number; // 0–100
  technology: number; // 0–100
  environment: number; // 0–100
  community: number; // 0–100
  description: string; // "What the world looks like"
  pppScore: PPPScore;
}

export interface Unit1State {
  introSeen: boolean;
  personalFuture?: PersonalFutureEntry;
  societalFuture?: SocietalFutureSnapshot;
  agiActorChoice?: AgiActorChoice;
  notes?: string;
  completed: boolean;
}

// -----------------------------
// Unit 2 – Drivers of AI Progress
// Triad Labs & Timeline Observatory
// -----------------------------

export type ComputeBlockId = "local_gpus" | "cloud_farms" | "ai_chips";
export type AlgoBlockId =
  | "basic_training"
  | "better_tricks"
  | "new_architectures"
  | "self_improving";
export type DataBlockId = "open_web" | "curated_sets" | "user_feedback";

export interface TriadConfig {
  computeBlocks: ComputeBlockId[];
  algoBlocks: AlgoBlockId[];
  dataBlocks: DataBlockId[];
}

export interface Unit2TriadState {
  triadConfig: TriadConfig;
  computePowerScore: number; // 0–100
  algoEfficiencyScore: number; // 0–100
  dataRichnessScore: number; // 0–100
  overallCapabilityScore: number; // 0–100
}

export type GrowthRate = "slow" | "medium" | "fast";

export interface Unit2ScalingState {
  hardwareGrowthRate: GrowthRate;
  algoGrowthRate: GrowthRate;
  computedEfficiencyGrowth: number; // 0–100
  capabilityLevel: number; // 0–100
  diffusionLevel: number; // 0–100 (how widely capabilities spread)
  tooCheapToMeter: boolean;
}

export type TimelineExpectation = "short" | "medium" | "long" | "uncertain";
export type SelfImprovementView = "low" | "medium" | "high";
export type ParadigmReachView = "limited" | "pretty_far" | "all_the_way";
export type ToolAgentView = "mostly_tools" | "mixed" | "mostly_agents";

export interface Unit2TimelineState {
  paradigmReach: ParadigmReachView;
  selfImprovement: SelfImprovementView;
  toolVsAgent: ToolAgentView;
  timelineExpectation: TimelineExpectation;
  notes?: string;
}

export interface Unit2State {
  triad: Unit2TriadState;
  scaling: Unit2ScalingState;
  timeline: Unit2TimelineState;
  completed: boolean;
}

// -----------------------------
// Unit 3 – Pathways to Harm
// Threat Canyon & Coalition Forge
// -----------------------------

export type AssetId =
  | "democracy_trust"
  | "critical_infrastructure"
  | "health_biosafety"
  | "economy_jobs"
  | "information_culture"
  | "environment_climate"
  | "human_agency_dignity";

export interface ProtectedAsset {
  id: AssetId;
  priority: 1 | 2 | 3; // 1 = highest priority
}

export interface Unit3AssetsState {
  protectedAssets: ProtectedAsset[];
}

export type ActorType =
  | "misaligned_ai"
  | "powerful_humans"
  | "malevolent_state"
  | "terror_group";

export type ActorScale = "small_team" | "medium_org" | "large_state";

export type CapabilityType =
  | "info_warfare"
  | "cyber_operations"
  | "bioengineering"
  | "military_force"
  | "economic_pressure";

export type MotivationType =
  | "power_control"
  | "profit_resources"
  | "chaos_destruction"
  | "ideology_belief"
  | "default_incentives";

export interface MisalignedCoalition {
  primaryActor: ActorType;
  scale: ActorScale;
  capabilities: CapabilityType[];
  motivations: MotivationType[];
}

export interface Unit3PathwayChoice {
  chosenPathway: ThreatPathwayId | null;
  reasoningNote?: string;
}

export interface ThreatCard {
  actor: ActorType;
  scale: ActorScale;
  capabilities: CapabilityType[];
  motivations: MotivationType[];
  targetAsset: AssetId;
  attackPathway: ThreatPathwayId;
  objective: string; // free text like "seize and keep power"
  pppImpactEstimate?: PPPScore;
  summary?: string; // optional final sentence version
}

export interface Unit3State {
  assets: Unit3AssetsState;
  coalition: MisalignedCoalition | null;
  pathwayChoice: Unit3PathwayChoice;
  threatCard?: ThreatCard;
  completed: boolean;
}

// -----------------------------
// Unit 4 – Defence in Depth
// Strategy Skyport & Defence Ring
// -----------------------------

export interface StrategyMix {
  govControl: number; // 0–100
  alignedSuperintelligence: number; // 0–100
  defencesAndDiffusion: number; // 0–100
  notes?: string; // why this mix
}

export type DefenceCardId =
  | "compute_controls"
  | "ai_treaty"
  | "safe_by_design"
  | "research_norms"
  | "red_teaming"
  | "alignment_research"
  | "capability_evals"
  | "kill_switches"
  | "monitoring_use"
  | "pandemic_early_warning"
  | "resilient_infrastructure"
  | "cyber_defence"
  | "democracy_health"
  | "crisis_response";

export interface DefencePlacement {
  cardId: DefenceCardId;
  layer: DefenceLayer;
  killChainStepIndex?: number;
}

export interface LayerMap {
  prevent: DefencePlacement[];
  constrain: DefencePlacement[];
  withstand: DefencePlacement[];
}

export interface FocalLayerPlan {
  layer: DefenceLayer;
  upgradedCards: DefenceCardId[];
  notes: string;
}

export interface Unit4State {
  strategyMix: StrategyMix;
  layerMap: LayerMap;
  focalLayerPlan?: FocalLayerPlan;
  completed: boolean;
}

// -----------------------------
// Unit 5 – Start Contributing
// Launchpad Agora – Mission Outfitters
// -----------------------------

export type FocusSector =
  | "policy_governance"
  | "technical_safety"
  | "field_building"
  | "community_access";

export interface Unit5FocusState {
  sector: FocusSector | null;
  reasoningNote?: string;
}

export interface InterventionChoice {
  id: string;
  name: string;
  focusSector: FocusSector;
  relatedThreatPathway?: ThreatPathwayId;
  strengthensLayer?: DefenceLayer;
}

export interface InterventionResearch {
  successPicture: string;
  helpsAiGoWell: string;
  currentStatus: string;
  orgsToWatch: string;
}

export interface Unit5InterventionState {
  chosenIntervention?: InterventionChoice;
  research?: InterventionResearch;
}

export type RoleArchetype =
  | "policy_pilot"
  | "safety_engineer"
  | "field_builder"
  | "tech_society_partnerships"
  | "community_navigator";

export type RoleLevel = "starter" | "mid" | "senior";

export interface RoleChoice {
  archetype: RoleArchetype;
  displayTitle: string;
  level: RoleLevel;
  personalTagline?: string;
}

export type ShortTermActionCategory = "learn" | "connect" | "build" | "share";
export type ShortTermActionTimeFrame =
  | "this_month"
  | "next_3_months"
  | "next_6_months";

export interface ShortTermAction {
  id: string;
  label: string;
  category: ShortTermActionCategory;
  timeFrame: ShortTermActionTimeFrame;
  done?: boolean;
}

export interface LongTermDirection {
  skills: string;
  projects: string;
  relationships: string;
}

export interface AlignmentNarrative {
  text: string;
}

export interface Unit5State {
  focus: Unit5FocusState;
  intervention: Unit5InterventionState;
  role?: RoleChoice;
  shortTermPlan: ShortTermAction[];
  longTermDirection?: LongTermDirection;
  alignmentNarrative?: AlignmentNarrative;
  completed: boolean;
}

// -----------------------------
// Global GameState
// -----------------------------

export interface GameMeta {
  version: string;
  language: string;
  createdAt: string;
  updatedAt: string;
}

export interface GameState {
  meta: GameMeta;
  currentUnit: UnitId;
  language: string;
  kidMode: boolean;
  character?: PlayerCharacter;
  unit1: Unit1State;
  unit2: Unit2State;
  unit3: Unit3State;
  unit4: Unit4State;
  unit5: Unit5State;
}

export const createInitialGameState = (): GameState => {
  const now = new Date().toISOString();
  return {
    meta: {
      version: "0.1.0",
      language: "en",
      createdAt: now,
      updatedAt: now,
    },
    currentUnit: 1,
    language: "en",
    kidMode: false,
    character: undefined,
    unit1: {
      introSeen: false,
      personalFuture: undefined,
      societalFuture: undefined,
      agiActorChoice: undefined,
      notes: undefined,
      completed: false,
    },
    unit2: {
      triad: {
        triadConfig: {
          computeBlocks: [],
          algoBlocks: [],
          dataBlocks: [],
        },
        computePowerScore: 0,
        algoEfficiencyScore: 0,
        dataRichnessScore: 0,
        overallCapabilityScore: 0,
      },
      scaling: {
        hardwareGrowthRate: "medium",
        algoGrowthRate: "medium",
        computedEfficiencyGrowth: 0,
        capabilityLevel: 0,
        diffusionLevel: 0,
        tooCheapToMeter: false,
      },
      timeline: {
        paradigmReach: "pretty_far",
        selfImprovement: "medium",
        toolVsAgent: "mixed",
        timelineExpectation: "uncertain",
        notes: "",
      },
      completed: false,
    },
    unit3: {
      assets: { protectedAssets: [] },
      coalition: null,
      pathwayChoice: { chosenPathway: null, reasoningNote: "" },
      threatCard: undefined,
      completed: false,
    },
    unit4: {
      strategyMix: {
        govControl: 33,
        alignedSuperintelligence: 33,
        defencesAndDiffusion: 34,
        notes: "",
      },
      layerMap: {
        prevent: [],
        constrain: [],
        withstand: [],
      },
      focalLayerPlan: undefined,
      completed: false,
    },
    unit5: {
      focus: { sector: null, reasoningNote: "" },
      intervention: { chosenIntervention: undefined, research: undefined },
      role: undefined,
      shortTermPlan: [],
      longTermDirection: undefined,
      alignmentNarrative: undefined,
      completed: false,
    },
  };
};

export const initialGameState: GameState = createInitialGameState();
