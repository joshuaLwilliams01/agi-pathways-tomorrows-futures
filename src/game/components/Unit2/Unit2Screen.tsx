"use client";

/**
 * Unit 2 – Triad Labs & Timeline Observatory
 * 3 scenes: Triad Assembly Bay → Scaling Chamber → Timeline Observatory
 */

import { useGameStore } from "@/game/state/gameStore";
import {
  type Unit2SceneId,
  type ComputeBlockId,
  type AlgoBlockId,
  type DataBlockId,
  type GrowthRate,
  type ParadigmReachView,
  type SelfImprovementView,
  type ToolAgentView,
  type TimelineExpectation,
  computeTriadScores,
} from "@/game/state/gameState";
import en from "@/game/data/i18n/en.json";

const t = en.unit2;
const MAX_BLOCKS_PER_SOCKET = 3;

const COMPUTE_OPTIONS: { id: ComputeBlockId; label: string }[] = [
  { id: "local_gpus", label: t.blockLocalGpus },
  { id: "cloud_farms", label: t.blockCloudFarms },
  { id: "ai_chips", label: t.blockAiChips },
];

const ALGO_OPTIONS: { id: AlgoBlockId; label: string }[] = [
  { id: "basic_training", label: t.blockBasicTraining },
  { id: "better_tricks", label: t.blockBetterTricks },
  { id: "new_architectures", label: t.blockNewArchitectures },
  { id: "self_improving", label: t.blockSelfImproving },
];

const DATA_OPTIONS: { id: DataBlockId; label: string }[] = [
  { id: "open_web", label: t.blockOpenWeb },
  { id: "curated_sets", label: t.blockCuratedSets },
  { id: "user_feedback", label: t.blockUserFeedback },
];

const GROWTH_LABELS: Record<GrowthRate, string> = {
  slow: t.growthSlow,
  medium: t.growthMedium,
  fast: t.growthFast,
};

const ALGO_GROWTH_LABELS: Record<GrowthRate, string> = {
  slow: t.algoImprovementSmall,
  medium: t.algoImprovementMedium,
  fast: t.algoImprovementBig,
};

const PARADIGM_OPTIONS: { value: ParadigmReachView; label: string }[] = [
  { value: "limited", label: t.tonerNotVeryFar },
  { value: "pretty_far", label: t.tonerPrettyFar },
  { value: "all_the_way", label: t.tonerAllTheWay },
];

const SELF_IMPROVEMENT_OPTIONS: { value: SelfImprovementView; label: string }[] = [
  { value: "low", label: t.tonerHardlyAtAll },
  { value: "medium", label: t.tonerAFairBit },
  { value: "high", label: t.tonerALot },
];

const TOOL_AGENT_OPTIONS: { value: ToolAgentView; label: string }[] = [
  { value: "mostly_tools", label: t.tonerMostlyTools },
  { value: "mixed", label: t.tonerMixed },
  { value: "mostly_agents", label: t.tonerMostlyAgents },
];

const EXPLOSION_OPTIONS: { value: SelfImprovementView; label: string }[] = [
  { value: "low", label: t.explosionSlow },
  { value: "medium", label: t.explosionSome },
  { value: "high", label: t.explosionFast },
];

const TIMELINE_BLURBS: Record<TimelineExpectation, string> = {
  short: t.timelineBlurbShort,
  medium: t.timelineBlurbMedium,
  long: t.timelineBlurbLong,
  uncertain: t.timelineBlurbUncertain,
};

const TIMELINE_LABELS: Record<TimelineExpectation, string> = {
  short: t.timelineShort,
  medium: t.timelineMedium,
  long: t.timelineLong,
  uncertain: t.timelineUncertain,
};

function deriveEfficiencyGrowth(hw: GrowthRate, algo: GrowthRate): number {
  const h = { slow: 25, medium: 50, fast: 75 }[hw];
  const a = { slow: 25, medium: 50, fast: 75 }[algo];
  return Math.min(100, Math.round((h + a) / 2));
}

function deriveCapabilityAndDiffusion(
  triadOverall: number,
  efficiencyGrowth: number
): { capabilityLevel: number; diffusionLevel: number; tooCheapToMeter: boolean } {
  const capabilityLevel = Math.min(100, Math.round(triadOverall * 0.6 + efficiencyGrowth * 0.4));
  const diffusionLevel = Math.min(100, Math.round(capabilityLevel * 1.1));
  const tooCheapToMeter = capabilityLevel >= 70;
  return { capabilityLevel, diffusionLevel, tooCheapToMeter };
}

function deriveTimelineExpectation(
  paradigm: ParadigmReachView,
  selfImprovement: SelfImprovementView,
  toolAgent: ToolAgentView
): TimelineExpectation {
  if (paradigm === "all_the_way" && selfImprovement === "high" && toolAgent === "mostly_agents") return "short";
  if (paradigm === "limited" && selfImprovement === "low") return "long";
  if (paradigm === "pretty_far" && selfImprovement === "medium") return "medium";
  return "uncertain";
}

function efficiencyMultiplier(growth: GrowthRate): number {
  return { slow: 1.5, medium: 4, fast: 8 }[growth];
}

export function Unit2Screen() {
  const { state, actions } = useGameStore();
  const u2 = state.unit2;
  const scene = u2?.currentScene ?? 1;

  const goTo = (next: Unit2SceneId) => {
    actions.updateUnit2({ currentScene: next });
  };

  const addBlock = (
    kind: "compute" | "algo" | "data",
    id: ComputeBlockId | AlgoBlockId | DataBlockId
  ) => {
    const config = u2.triad.triadConfig;
    if (kind === "compute") {
      const next = [...config.computeBlocks, id as ComputeBlockId].slice(0, MAX_BLOCKS_PER_SOCKET);
      const scores = computeTriadScores({ ...config, computeBlocks: next });
      actions.updateUnit2({
        triad: { ...u2.triad, triadConfig: { ...config, computeBlocks: next }, ...scores },
      });
    } else if (kind === "algo") {
      const next = [...config.algoBlocks, id as AlgoBlockId].slice(0, MAX_BLOCKS_PER_SOCKET);
      const scores = computeTriadScores({ ...config, algoBlocks: next });
      actions.updateUnit2({
        triad: { ...u2.triad, triadConfig: { ...config, algoBlocks: next }, ...scores },
      });
    } else {
      const next = [...config.dataBlocks, id as DataBlockId].slice(0, MAX_BLOCKS_PER_SOCKET);
      const scores = computeTriadScores({ ...config, dataBlocks: next });
      actions.updateUnit2({
        triad: { ...u2.triad, triadConfig: { ...config, dataBlocks: next }, ...scores },
      });
    }
  };

  const removeBlock = (
    kind: "compute" | "algo" | "data",
    index: number
  ) => {
    const config = u2.triad.triadConfig;
    if (kind === "compute") {
      const next = config.computeBlocks.filter((_, i) => i !== index);
      const scores = computeTriadScores({ ...config, computeBlocks: next });
      actions.updateUnit2({
        triad: { ...u2.triad, triadConfig: { ...config, computeBlocks: next }, ...scores },
      });
    } else if (kind === "algo") {
      const next = config.algoBlocks.filter((_, i) => i !== index);
      const scores = computeTriadScores({ ...config, algoBlocks: next });
      actions.updateUnit2({
        triad: { ...u2.triad, triadConfig: { ...config, algoBlocks: next }, ...scores },
      });
    } else {
      const next = config.dataBlocks.filter((_, i) => i !== index);
      const scores = computeTriadScores({ ...config, dataBlocks: next });
      actions.updateUnit2({
        triad: { ...u2.triad, triadConfig: { ...config, dataBlocks: next }, ...scores },
      });
    }
  };

  // —— Scene 1: Triad Assembly Bay ——
  if (scene === 1) {
    const config = u2.triad.triadConfig;
    return (
      <div className="unit2-screen triad-labs">
        <h2 className="h4 mb-3">{en.units["2"].title}</h2>
        <p className="text-muted mb-2">{t.zoneTitle}</p>
        <h3 className="h5 mb-2">{t.triadAssemblyTitle}</h3>
        <p className="mb-4">{t.triadIntro}</p>

        <section className="card border-2 rounded-3 mb-3" aria-label={t.computeCore}>
          <div className="card-body">
            <h4 className="h6 mb-2">{t.computeCore}</h4>
            <p className="small text-muted mb-2">{t.powerRating}</p>
            <ul className="list-unstyled mb-2">
              {config.computeBlocks.map((id, i) => (
                <li key={`${id}-${i}`} className="d-flex align-items-center gap-2 mb-1">
                  <span>{COMPUTE_OPTIONS.find((o) => o.id === id)?.label ?? id}</span>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => removeBlock("compute", i)}
                  >
                    {t.removeBlock}
                  </button>
                </li>
              ))}
            </ul>
            {config.computeBlocks.length < MAX_BLOCKS_PER_SOCKET &&
              COMPUTE_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  className="btn btn-sm btn-outline-primary me-1 mb-1"
                  onClick={() => addBlock("compute", opt.id)}
                >
                  {t.addBlock} {opt.label}
                </button>
              ))}
          </div>
        </section>

        <section className="card border-2 rounded-3 mb-3" aria-label={t.algorithmEngine}>
          <div className="card-body">
            <h4 className="h6 mb-2">{t.algorithmEngine}</h4>
            <p className="small text-muted mb-2">{t.efficiencyRating}</p>
            <ul className="list-unstyled mb-2">
              {config.algoBlocks.map((id, i) => (
                <li key={`${id}-${i}`} className="d-flex align-items-center gap-2 mb-1">
                  <span>{ALGO_OPTIONS.find((o) => o.id === id)?.label ?? id}</span>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => removeBlock("algo", i)}
                  >
                    {t.removeBlock}
                  </button>
                </li>
              ))}
            </ul>
            {config.algoBlocks.length < MAX_BLOCKS_PER_SOCKET &&
              ALGO_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  className="btn btn-sm btn-outline-primary me-1 mb-1"
                  onClick={() => addBlock("algo", opt.id)}
                >
                  {t.addBlock} {opt.label}
                </button>
              ))}
          </div>
        </section>

        <section className="card border-2 rounded-3 mb-4" aria-label={t.dataReservoir}>
          <div className="card-body">
            <h4 className="h6 mb-2">{t.dataReservoir}</h4>
            <p className="small text-muted mb-2">{t.richnessRating}</p>
            <ul className="list-unstyled mb-2">
              {config.dataBlocks.map((id, i) => (
                <li key={`${id}-${i}`} className="d-flex align-items-center gap-2 mb-1">
                  <span>{DATA_OPTIONS.find((o) => o.id === id)?.label ?? id}</span>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => removeBlock("data", i)}
                  >
                    {t.removeBlock}
                  </button>
                </li>
              ))}
            </ul>
            {config.dataBlocks.length < MAX_BLOCKS_PER_SOCKET &&
              DATA_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  className="btn btn-sm btn-outline-primary me-1 mb-1"
                  onClick={() => addBlock("data", opt.id)}
                >
                  {t.addBlock} {opt.label}
                </button>
              ))}
          </div>
        </section>

        <div className="d-flex justify-content-end">
          <button type="button" className="btn btn-primary" onClick={() => goTo(2)}>
            Continue to Scaling Chamber
          </button>
        </div>
      </div>
    );
  }

  // —— Scene 2: Scaling Chamber ——
  if (scene === 2) {
    const scaling = u2.scaling;
    const triadOverall = u2.triad.overallCapabilityScore;
    const efficiencyGrowth = deriveEfficiencyGrowth(scaling.hardwareGrowthRate, scaling.algoGrowthRate);
    const { capabilityLevel, diffusionLevel, tooCheapToMeter } = deriveCapabilityAndDiffusion(
      triadOverall,
      efficiencyGrowth
    );
    const mult = efficiencyMultiplier(scaling.hardwareGrowthRate) * efficiencyMultiplier(scaling.algoGrowthRate);

    // Persist derived scaling when we're on this scene (optional: could do on continue)
    const updateScaling = (partial: Partial<typeof scaling>) => {
      const next = { ...scaling, ...partial };
      const eff = deriveEfficiencyGrowth(next.hardwareGrowthRate, next.algoGrowthRate);
      const derived = deriveCapabilityAndDiffusion(u2.triad.overallCapabilityScore, eff);
      actions.updateUnit2({
        scaling: {
          ...next,
          computedEfficiencyGrowth: eff,
          capabilityLevel: derived.capabilityLevel,
          diffusionLevel: derived.diffusionLevel,
          tooCheapToMeter: derived.tooCheapToMeter,
        },
      });
    };

    const diffusionNodes = [
      { key: "labs", label: t.diffusionBigLabs, threshold: 20 },
      { key: "gov", label: t.diffusionGovernments, threshold: 35 },
      { key: "startups", label: t.diffusionStartups, threshold: 50 },
      { key: "open", label: t.diffusionOpenSource, threshold: 65 },
      { key: "small", label: t.diffusionSmallGroups, threshold: 80 },
    ];

    return (
      <div className="unit2-screen triad-labs">
        <h2 className="h4 mb-3">{t.scalingChamberTitle}</h2>

        <div className="card border-2 rounded-3 mb-3">
          <div className="card-body">
            <label className="form-label small">{t.hardwareGrowthLabel}</label>
            <div className="d-flex gap-2 flex-wrap">
              {(["slow", "medium", "fast"] as const).map((rate) => (
                <button
                  key={rate}
                  type="button"
                  className={`btn btn-sm ${scaling.hardwareGrowthRate === rate ? "btn-primary" : "btn-outline-secondary"}`}
                  onClick={() => updateScaling({ hardwareGrowthRate: rate })}
                >
                  {GROWTH_LABELS[rate]}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="card border-2 rounded-3 mb-3">
          <div className="card-body">
            <label className="form-label small">{t.algoGrowthLabel}</label>
            <div className="d-flex gap-2 flex-wrap">
              {(["slow", "medium", "fast"] as const).map((rate) => (
                <button
                  key={rate}
                  type="button"
                  className={`btn btn-sm ${scaling.algoGrowthRate === rate ? "btn-primary" : "btn-outline-secondary"}`}
                  onClick={() => updateScaling({ algoGrowthRate: rate })}
                >
                  {ALGO_GROWTH_LABELS[rate]}
                </button>
              ))}
            </div>
            <p className="small text-muted mt-2 mb-0">
              {t.timesBetterPerDollar.replace("{{count}}", String(mult))}
            </p>
          </div>
        </div>

        <div className="card border-2 rounded-3 mb-3">
          <div className="card-body">
            <label className="form-label small">{t.capabilityMeterLabel}</label>
            <div className="progress mb-2" style={{ height: "1.5rem" }}>
              <div
                className={`progress-bar ${tooCheapToMeter ? "bg-warning" : "bg-primary"}`}
                role="progressbar"
                style={{ width: `${capabilityLevel}%` }}
                aria-valuenow={capabilityLevel}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
            {tooCheapToMeter && (
              <p className="small text-warning-emphasis mb-0">{t.tooCheapToMeterWarning}</p>
            )}
          </div>
        </div>

        <div className="card border-2 rounded-3 mb-4">
          <div className="card-body">
            <h4 className="h6 mb-2">{t.diffusionMapLabel}</h4>
            <ul className="list-unstyled mb-0">
              {diffusionNodes.map((node) => (
                <li
                  key={node.key}
                  className={`small py-1 ${diffusionLevel >= node.threshold ? "text-primary fw-bold" : "text-muted"}`}
                >
                  {diffusionLevel >= node.threshold ? "● " : "○ "}
                  {node.label}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="d-flex justify-content-between">
          <button type="button" className="btn btn-outline-secondary" onClick={() => goTo(1)}>
            {t.back}
          </button>
          <button type="button" className="btn btn-primary" onClick={() => goTo(3)}>
            Continue to Timeline Observatory
          </button>
        </div>
      </div>
    );
  }

  // —— Scene 3: Timeline Observatory ——
  const timeline = u2.timeline;
  const derivedExpectation = deriveTimelineExpectation(
    timeline.paradigmReach,
    timeline.selfImprovement,
    timeline.toolVsAgent
  );

  const setTimeline = (partial: Partial<typeof timeline>) => {
    const next = { ...timeline, ...partial };
    const expectation = deriveTimelineExpectation(
      next.paradigmReach,
      next.selfImprovement,
      next.toolVsAgent
    );
    actions.updateUnit2({
      timeline: { ...next, timelineExpectation: expectation },
    });
  };

  return (
    <div className="unit2-screen triad-labs">
      <h2 className="h4 mb-3">{t.timelineObservatoryTitle}</h2>

      <div className="card border-2 rounded-3 mb-3">
        <div className="card-body">
          <label className="form-label">{t.explosionQuestion}</label>
          <div className="d-flex gap-2 flex-wrap">
            {EXPLOSION_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                className={`btn btn-sm ${timeline.selfImprovement === opt.value ? "btn-primary" : "btn-outline-secondary"}`}
                onClick={() => setTimeline({ selfImprovement: opt.value })}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <p className="small text-muted mt-2 mb-0">{t.explosionCaption}</p>
        </div>
      </div>

      <div className="card border-2 rounded-3 mb-3">
        <div className="card-body">
          <label className="form-label">{t.tonerQuestion1}</label>
          <div className="d-flex gap-2 flex-wrap">
            {PARADIGM_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                className={`btn btn-sm ${timeline.paradigmReach === opt.value ? "btn-primary" : "btn-outline-secondary"}`}
                onClick={() => setTimeline({ paradigmReach: opt.value })}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="card border-2 rounded-3 mb-3">
        <div className="card-body">
          <label className="form-label">{t.tonerQuestion2}</label>
          <div className="d-flex gap-2 flex-wrap">
            {SELF_IMPROVEMENT_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                className={`btn btn-sm ${timeline.selfImprovement === opt.value ? "btn-primary" : "btn-outline-secondary"}`}
                onClick={() => setTimeline({ selfImprovement: opt.value })}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="card border-2 rounded-3 mb-3">
        <div className="card-body">
          <label className="form-label">{t.tonerQuestion3}</label>
          <div className="d-flex gap-2 flex-wrap">
            {TOOL_AGENT_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                className={`btn btn-sm ${timeline.toolVsAgent === opt.value ? "btn-primary" : "btn-outline-secondary"}`}
                onClick={() => setTimeline({ toolVsAgent: opt.value })}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="card border-2 rounded-3 mb-3 bg-light">
        <div className="card-body">
          <h4 className="h6 mb-2">{t.timelineProfileLabel}: {TIMELINE_LABELS[derivedExpectation]}</h4>
          <p className="mb-0">{TIMELINE_BLURBS[derivedExpectation]}</p>
        </div>
      </div>

      <div className="mb-3">
        <label className="form-label small">{t.timelineProfileLabel} (optional notes)</label>
        <textarea
          className="form-control border-2 rounded-3"
          rows={2}
          value={timeline.notes ?? ""}
          onChange={(e) => setTimeline({ notes: e.target.value })}
        />
      </div>

      <div className="d-flex justify-content-between">
        <button type="button" className="btn btn-outline-secondary" onClick={() => goTo(2)}>
          {t.back}
        </button>
        <button
          type="button"
          className="btn btn-success"
          onClick={() => {
            actions.updateUnit2({ completed: true, timeline: { ...timeline, timelineExpectation: derivedExpectation } });
            actions.setCurrentUnit(3);
          }}
        >
          {t.continueToUnit3}
        </button>
      </div>
    </div>
  );
}
