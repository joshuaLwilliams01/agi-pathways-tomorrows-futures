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
// Unit 1 – Future Bay / Launch Docks (Racing to a Better Future)
// -----------------------------

/** Scene order: 1=Story Dock, 2=Life Boat Builder, 3=World Ferry Builder, 4=AGI Race Pier, 5=Summary */
export type Unit1SceneId = 1 | 2 | 3 | 4 | 5;

export type DayOfWeek = "day1" | "day2" | "day3" | "day4" | "day5" | "day6" | "day7";

export type WeekBlockType =
  | "family"
  | "learning"
  | "work_projects"
  | "rest_health"
  | "play_hobbies"
  | "helping_others";

export interface FutureDayPlan {
  dominantBlock: WeekBlockType;
  note: string;
}

export interface Unit1PersonalFuture {
  ageInFuture: number; // e.g. current age + 20
  days: Record<DayOfWeek, FutureDayPlan>;
}

export type SocietalDomain =
  | "politics"
  | "economy"
  | "community"
  | "technology"
  | "environment";

export interface DomainSetting {
  level: 1 | 2 | 3 | 4 | 5; // how "good" the future is in this domain
  notes?: string;
}

export interface Unit1SocietalFuture {
  domains: Record<SocietalDomain, DomainSetting>;
  pppScore: PPPScore;
}

export type AgiActorId =
  | "frontier_lab"
  | "national_government"
  | "open_source_collective"
  | "big_tech_platform"
  | "civil_society";

export interface AgiActorChoice {
  selectedActorId: AgiActorId;
  notes?: string; // 2–3 sentence reflection from player
}

export interface Unit1State {
  introSeen: boolean;
  currentScene: Unit1SceneId;
  character?: PlayerCharacter;
  personalFuture?: Unit1PersonalFuture;
  societalFuture?: Unit1SocietalFuture;
  agiActorChoice?: AgiActorChoice;
  completed: boolean;
}

const DAYS: DayOfWeek[] = ["day1", "day2", "day3", "day4", "day5", "day6", "day7"];
const SOCIETAL_DOMAINS: SocietalDomain[] = ["politics", "economy", "community", "technology", "environment"];

function defaultFutureDayPlan(): FutureDayPlan {
  return { dominantBlock: "family", note: "" };
}

export function createDefaultUnit1PersonalFuture(ageInFuture = 20): Unit1PersonalFuture {
  return {
    ageInFuture,
    days: Object.fromEntries(DAYS.map((d) => [d, defaultFutureDayPlan()])) as Record<DayOfWeek, FutureDayPlan>,
  };
}

export function createDefaultUnit1SocietalFuture(): Unit1SocietalFuture {
  return {
    domains: Object.fromEntries(
      SOCIETAL_DOMAINS.map((d) => [d, { level: 3 as const, notes: "" }])
    ) as Record<SocietalDomain, DomainSetting>,
    pppScore: { people: 50, planet: 50, parity: 50 },
  };
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

/** Scene order: 1 = Triad Assembly Bay, 2 = Scaling Chamber, 3 = Timeline Observatory */
export type Unit2SceneId = 1 | 2 | 3;

export interface Unit2State {
  currentScene: Unit2SceneId;
  triad: Unit2TriadState;
  scaling: Unit2ScalingState;
  timeline: Unit2TimelineState;
  completed: boolean;
}

// Block power values (1–5 dots → contribute to 0–100 category score)
const COMPUTE_POWER: Record<ComputeBlockId, number> = {
  local_gpus: 20,
  cloud_farms: 35,
  ai_chips: 50,
};
const ALGO_EFFICIENCY: Record<AlgoBlockId, number> = {
  basic_training: 15,
  better_tricks: 30,
  new_architectures: 45,
  self_improving: 60,
};
const DATA_RICHNESS: Record<DataBlockId, number> = {
  open_web: 20,
  curated_sets: 40,
  user_feedback: 50,
};

const MAX_COMPUTE = 150;
const MAX_ALGO = 180;
const MAX_DATA = 150;

export function computeTriadScores(config: TriadConfig): Pick<
  Unit2TriadState,
  "computePowerScore" | "algoEfficiencyScore" | "dataRichnessScore" | "overallCapabilityScore"
> {
  const computeSum = config.computeBlocks.reduce((s, id) => s + COMPUTE_POWER[id], 0);
  const algoSum = config.algoBlocks.reduce((s, id) => s + ALGO_EFFICIENCY[id], 0);
  const dataSum = config.dataBlocks.reduce((s, id) => s + DATA_RICHNESS[id], 0);
  const computePowerScore = Math.min(100, Math.round((computeSum / MAX_COMPUTE) * 100));
  const algoEfficiencyScore = Math.min(100, Math.round((algoSum / MAX_ALGO) * 100));
  const dataRichnessScore = Math.min(100, Math.round((dataSum / MAX_DATA) * 100));
  const overallCapabilityScore = Math.round(
    (computePowerScore + algoEfficiencyScore + dataRichnessScore) / 3
  );
  return {
    computePowerScore,
    algoEfficiencyScore,
    dataRichnessScore,
    overallCapabilityScore,
  };
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

/** Scene order: 1 = Horizon Overlook, 2 = Coalition Forge, 3 = Pathway Gates, 4 = Threat Run & Threat Card */
export type Unit3SceneId = 1 | 2 | 3 | 4;

export interface ThreatCard {
  actor: ActorType;
  scale: ActorScale;
  capabilities: CapabilityType[];
  motivations: MotivationType[];
  targetAsset: AssetId;
  attackPathway: ThreatPathwayId;
  /** Human-readable attack method for the sentence, e.g. "Manipulate elections with deepfakes" */
  attackPathDescription: string;
  objective: string; // e.g. "Seize and keep power"
  pppImpactEstimate?: PPPScore;
  summary?: string; // optional final sentence version
}

export interface Unit3State {
  currentScene: Unit3SceneId;
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

/** Scene order: 1 = Strategy Skyport, 2 = Kill Chain Dock, 3 = Defence Ring Builder, 4 = Focal Layer Workshop */
export type Unit4SceneId = 1 | 2 | 3 | 4;

export interface Unit4State {
  currentScene: Unit4SceneId;
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

/** Scene order: 1 = Contribution Radar, 2 = Intervention Dock, 3 = Role Hangar, 4 = Mission Planner, 5 = Launch & Mission Brief */
export type Unit5SceneId = 1 | 2 | 3 | 4 | 5;

export interface Unit5State {
  currentScene: Unit5SceneId;
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
      currentScene: 1,
      character: undefined,
      personalFuture: undefined,
      societalFuture: undefined,
      agiActorChoice: undefined,
      completed: false,
    },
    unit2: {
      currentScene: 1,
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
      currentScene: 1,
      assets: { protectedAssets: [] },
      coalition: null,
      pathwayChoice: { chosenPathway: null, reasoningNote: "" },
      threatCard: undefined,
      completed: false,
    },
    unit4: {
      currentScene: 1,
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
      currentScene: 1,
      focus: { sector: null, reasoningNote: "" },
      intervention: { chosenIntervention: undefined, research: undefined },
      role: undefined,
      shortTermPlan: [],
      longTermDirection: { skills: "", projects: "", relationships: "" },
      alignmentNarrative: undefined,
      completed: false,
    },
  };
};

export const initialGameState: GameState = createInitialGameState();
