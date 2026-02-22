"use client";

/**
 * Unit 4 – Strategy Skyport & Defence Ring
 * 4 scenes: Strategy Skyport → Kill Chain Dock → Defence Ring Builder → Focal Layer Workshop
 */

import { useState } from "react";
import { useGameStore } from "@/game/state/gameStore";
import type {
  Unit4SceneId,
  StrategyMix,
  DefenceLayer,
  DefenceCardId,
  DefencePlacement,
  LayerMap,
  FocalLayerPlan,
} from "@/game/state/gameState";
import { PPPMeter } from "@/game/components/Shared/PPPMeter";
import en from "@/game/data/i18n/en.json";

const t = en.unit4;

const MAX_CARDS_PER_LAYER = 5;

const PREVENT_CARDS: DefenceCardId[] = [
  "compute_controls",
  "ai_treaty",
  "safe_by_design",
  "research_norms",
];

const CONSTRAIN_CARDS: DefenceCardId[] = [
  "red_teaming",
  "alignment_research",
  "capability_evals",
  "kill_switches",
  "monitoring_use",
];

const WITHSTAND_CARDS: DefenceCardId[] = [
  "pandemic_early_warning",
  "resilient_infrastructure",
  "cyber_defence",
  "democracy_health",
  "crisis_response",
];

const CARD_LABELS: Record<DefenceCardId, string> = {
  compute_controls: t.cardComputeControls,
  ai_treaty: t.cardAiTreaty,
  safe_by_design: t.cardSafeByDesign,
  research_norms: t.cardResearchNorms,
  red_teaming: t.cardRedTeaming,
  alignment_research: t.cardAlignmentResearch,
  capability_evals: t.cardCapabilityEvals,
  kill_switches: t.cardKillSwitches,
  monitoring_use: t.cardMonitoringUse,
  pandemic_early_warning: t.cardPandemicEarlyWarning,
  resilient_infrastructure: t.cardResilientInfrastructure,
  cyber_defence: t.cardCyberDefence,
  democracy_health: t.cardDemocracyHealth,
  crisis_response: t.cardCrisisResponse,
};

const LAYER_LABELS: Record<DefenceLayer, string> = {
  prevent: t.layerPrevent,
  constrain: t.layerConstrain,
  withstand: t.layerWithstand,
};

const KILL_CHAIN_STAGES = [
  t.killChainStage1,
  t.killChainStage2,
  t.killChainStage3,
  t.killChainStage4,
];

/** Normalize three numbers so they sum to 100 (round to integers). */
function normalizeMix(gov: number, aligned: number, defences: number): StrategyMix {
  const total = gov + aligned + defences || 1;
  return {
    govControl: Math.round((gov / total) * 100),
    alignedSuperintelligence: Math.round((aligned / total) * 100),
    defencesAndDiffusion: Math.round((defences / total) * 100),
  };
}

/** Simple PPP from placed defences: prevent/constrain lean people/parity, withstand spreads. */
function pppFromLayerMap(layerMap: LayerMap): { people: number; planet: number; parity: number } {
  let people = 0, planet = 0, parity = 0;
  [...layerMap.prevent, ...layerMap.constrain, ...layerMap.withstand].forEach((p) => {
    if (["democracy_health", "pandemic_early_warning"].includes(p.cardId)) people += 1;
    if (["resilient_infrastructure", "cyber_defence"].includes(p.cardId)) planet += 0.5;
    if (["ai_treaty", "compute_controls", "democracy_health"].includes(p.cardId)) parity += 1;
    people += 0.3;
    planet += 0.2;
    parity += 0.3;
  });
  const sum = people + planet + parity || 1;
  return {
    people: Math.min(100, Math.round((people / sum) * 100)),
    planet: Math.min(100, Math.round((planet / sum) * 100)),
    parity: Math.min(100, Math.round((parity / sum) * 100)),
  };
}

function getCardsForLayer(layer: DefenceLayer): DefenceCardId[] {
  return layer === "prevent" ? PREVENT_CARDS : layer === "constrain" ? CONSTRAIN_CARDS : WITHSTAND_CARDS;
}

export function Unit4Screen() {
  const { state, actions } = useGameStore();
  const u4 = state.unit4;
  const scene = u4?.currentScene ?? 1;
  const threatCard = state.unit3?.threatCard;

  const goTo = (next: Unit4SceneId) => {
    actions.updateUnit4({ currentScene: next });
  };

  const mix = u4.strategyMix;
  const layerMap = u4.layerMap ?? { prevent: [], constrain: [], withstand: [] };

  // —— Scene 1: Strategy Skyport ——
  if (scene === 1) {
    const setMix = (key: keyof StrategyMix, value: number) => {
      if (key === "notes") return;
      const next = { ...mix, [key]: Math.max(0, Math.min(100, value)) };
      const normalized = normalizeMix(next.govControl, next.alignedSuperintelligence, next.defencesAndDiffusion);
      actions.updateUnit4({ strategyMix: { ...normalized, notes: mix.notes } });
    };

    return (
      <div className="unit4-screen strategy-skyport">
        <h2 className="h4 mb-3">{en.units["4"].title}</h2>
        <p className="text-muted mb-2">{t.zoneTitle}</p>
        <h3 className="h5 mb-3">{t.strategySkyportTitle}</h3>

        <div className="row g-3 mb-3">
          <div className="col-12 col-md-4">
            <div className="card border-2 rounded-3 h-100">
              <div className="card-body">
                <h4 className="h6">{t.fleetGovGuard}</h4>
                <p className="small text-muted mb-0">{t.fleetGovGuardDesc}</p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="card border-2 rounded-3 h-100">
              <div className="card-body">
                <h4 className="h6">{t.fleetCrownIntellect}</h4>
                <p className="small text-muted mb-0">{t.fleetCrownIntellectDesc}</p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="card border-2 rounded-3 h-100">
              <div className="card-body">
                <h4 className="h6">{t.fleetShieldNet}</h4>
                <p className="small text-muted mb-0">{t.fleetShieldNetDesc}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card border-2 rounded-3 mb-3">
          <div className="card-body">
            <p className="small fw-semibold mb-2">{t.strategyMixLabel}</p>
            <div className="row g-2">
              <div className="col-12 col-md-4">
                <label className="form-label small">{t.govControlLabel}</label>
                <input
                  type="range"
                  className="form-range"
                  min={0}
                  max={100}
                  value={mix.govControl}
                  onChange={(e) => setMix("govControl", Number(e.target.value))}
                />
                <span className="small">{mix.govControl}%</span>
              </div>
              <div className="col-12 col-md-4">
                <label className="form-label small">{t.alignedSuperintelligenceLabel}</label>
                <input
                  type="range"
                  className="form-range"
                  min={0}
                  max={100}
                  value={mix.alignedSuperintelligence}
                  onChange={(e) => setMix("alignedSuperintelligence", Number(e.target.value))}
                />
                <span className="small">{mix.alignedSuperintelligence}%</span>
              </div>
              <div className="col-12 col-md-4">
                <label className="form-label small">{t.defencesAndDiffusionLabel}</label>
                <input
                  type="range"
                  className="form-range"
                  min={0}
                  max={100}
                  value={mix.defencesAndDiffusion}
                  onChange={(e) => setMix("defencesAndDiffusion", Number(e.target.value))}
                />
                <span className="small">{mix.defencesAndDiffusion}%</span>
              </div>
            </div>
            <p className="small text-muted mt-2 mb-0">
              Total: {mix.govControl + mix.alignedSuperintelligence + mix.defencesAndDiffusion}%
            </p>
          </div>
        </div>

        <div className="card border-2 rounded-3 mb-4">
          <div className="card-body">
            <label className="form-label small">{t.strategyNotesPrompt}</label>
            <textarea
              className="form-control form-control-sm border-2 rounded-3"
              rows={2}
              value={mix.notes ?? ""}
              onChange={(e) => actions.updateUnit4({ strategyMix: { ...mix, notes: e.target.value } })}
            />
          </div>
        </div>

        <div className="d-flex justify-content-end">
          <button type="button" className="btn btn-primary" onClick={() => goTo(2)}>
            Continue to Kill Chain Dock
          </button>
        </div>
      </div>
    );
  }

  // —— Scene 2: Kill Chain Dock ——
  if (scene === 2) {
    return (
      <div className="unit4-screen strategy-skyport">
        <h3 className="h5 mb-2">{t.killChainTitle}</h3>
        <p className="mb-4">{t.killChainIntro}</p>

        <div className="card border-2 rounded-3 mb-4">
          <div className="card-body">
            {threatCard?.summary && (
              <p className="small text-muted mb-3">&ldquo;{threatCard.summary}&rdquo;</p>
            )}
            <div className="d-flex flex-wrap gap-2 align-items-center">
              {KILL_CHAIN_STAGES.map((label, i) => (
                <div key={i} className="d-flex align-items-center gap-2">
                  <span className="badge bg-secondary rounded-pill">{i + 1}</span>
                  <span className="small">{label}</span>
                  {i < KILL_CHAIN_STAGES.length - 1 && <span className="text-muted">→</span>}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-between">
          <button type="button" className="btn btn-outline-secondary" onClick={() => goTo(1)}>{t.back}</button>
          <button type="button" className="btn btn-primary" onClick={() => goTo(3)}>
            Continue to Defence Ring
          </button>
        </div>
      </div>
    );
  }

  // —— Scene 3: Defence Ring Builder ——
  if (scene === 3) {
    const addCard = (layer: DefenceLayer, cardId: DefenceCardId) => {
      const list = layerMap[layer];
      if (list.length >= MAX_CARDS_PER_LAYER) return;
      if (list.some((p) => p.cardId === cardId)) return;
      const next: DefencePlacement = { cardId, layer };
      actions.updateUnit4({
        layerMap: { ...layerMap, [layer]: [...list, next] },
      });
    };

    const removeCard = (layer: DefenceLayer, index: number) => {
      const list = layerMap[layer].filter((_, i) => i !== index);
      actions.updateUnit4({ layerMap: { ...layerMap, [layer]: list } });
    };

    const ppp = pppFromLayerMap(layerMap);
    const totalPlaced =
      layerMap.prevent.length + layerMap.constrain.length + layerMap.withstand.length;

    return (
      <div className="unit4-screen strategy-skyport">
        <h3 className="h5 mb-2">{t.defenceRingTitle}</h3>
        <p className="mb-3">{t.defenceRingIntro}</p>
        <p className="small text-muted mb-3">{t.maxPerLayer}</p>

        {(["prevent", "constrain", "withstand"] as const).map((layer) => (
          <div key={layer} className="card border-2 rounded-3 mb-3">
            <div className="card-body">
              <h4 className="h6 mb-2">{LAYER_LABELS[layer]}</h4>
              <div className="d-flex flex-wrap gap-2 mb-2">
                {layerMap[layer].map((p, i) => (
                  <span key={`${p.cardId}-${i}`} className="badge bg-primary rounded-pill d-inline-flex align-items-center gap-1">
                    {CARD_LABELS[p.cardId]}
                    <button
                      type="button"
                      className="btn btn-link btn-sm p-0 text-white"
                      aria-label="Remove"
                      onClick={() => removeCard(layer, i)}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <p className="small text-muted mb-2">{t.defenceDeckLabel}</p>
              <div className="d-flex flex-wrap gap-1">
                {getCardsForLayer(layer)
                  .filter((id) => !layerMap[layer].some((p) => p.cardId === id))
                  .map((id) => (
                    <button
                      key={id}
                      type="button"
                      className="btn btn-sm btn-outline-secondary"
                      disabled={layerMap[layer].length >= MAX_CARDS_PER_LAYER}
                      onClick={() => addCard(layer, id)}
                    >
                      + {CARD_LABELS[id]}
                    </button>
                  ))}
              </div>
            </div>
          </div>
        ))}

        <div className="card border-2 rounded-3 mb-3">
          <div className="card-body">
            <p className="small fw-semibold mb-2">{t.testMyDefences}</p>
            <p className="small text-muted mb-0">
              {totalPlaced === 0
                ? "Place cards on the rings above, then test to see where the threat pulse is stopped or slowed."
                : `You've placed ${totalPlaced} defence cards. Strong defences at each layer slow or stop the threat; gaps let it through.`}
            </p>
          </div>
        </div>

        {totalPlaced > 0 && (
          <div className="card border-2 rounded-3 mb-4">
            <div className="card-body">
              <p className="small fw-semibold mb-2">{t.pppFeedbackLabel}</p>
              <PPPMeter scores={ppp} />
            </div>
          </div>
        )}

        <div className="d-flex justify-content-between">
          <button type="button" className="btn btn-outline-secondary" onClick={() => goTo(2)}>{t.back}</button>
          <button type="button" className="btn btn-primary" onClick={() => goTo(4)}>
            Continue to Focal Layer Workshop
          </button>
        </div>
      </div>
    );
  }

  // —— Scene 4: Focal Layer Workshop ——
  const focalPlan = u4.focalLayerPlan;
  const [focalLayer, setFocalLayer] = useState<DefenceLayer | null>(focalPlan?.layer ?? null);
  const [focalNotes, setFocalNotes] = useState(focalPlan?.notes ?? "");
  const [focalUpgraded, setFocalUpgraded] = useState<DefenceCardId[]>(focalPlan?.upgradedCards ?? []);

  const toggleUpgrade = (cardId: DefenceCardId) => {
    if (!focalLayer) return;
    const next = focalUpgraded.includes(cardId)
      ? focalUpgraded.filter((c) => c !== cardId)
      : focalUpgraded.length >= 2
        ? focalUpgraded
        : [...focalUpgraded, cardId];
    setFocalUpgraded(next);
  };

  const saveFocalAndContinue = () => {
    if (!focalLayer) return;
    const plan: FocalLayerPlan = {
      layer: focalLayer,
      upgradedCards: focalUpgraded,
      notes: focalNotes,
    };
    actions.updateUnit4({ focalLayerPlan: plan, completed: true });
    actions.setCurrentUnit(5);
  };

  return (
    <div className="unit4-screen strategy-skyport">
      <h3 className="h5 mb-2">{t.focalLayerTitle}</h3>
      <p className="mb-3">{t.focalLayerPrompt}</p>

      <div className="card border-2 rounded-3 mb-3">
        <div className="card-body">
          <div className="d-flex flex-wrap gap-2">
            {(["prevent", "constrain", "withstand"] as const).map((layer) => (
              <button
                key={layer}
                type="button"
                className={`btn ${focalLayer === layer ? "btn-primary" : "btn-outline-secondary"}`}
                onClick={() => {
                  setFocalLayer(layer);
                  const existing = u4.focalLayerPlan?.layer === layer ? u4.focalLayerPlan : undefined;
                  setFocalUpgraded(existing?.upgradedCards ?? []);
                  setFocalNotes(existing?.notes ?? "");
                }}
              >
                {layer === "prevent" ? t.focalPrevent : layer === "constrain" ? t.focalConstrain : t.focalWithstand}
              </button>
            ))}
          </div>
        </div>
      </div>

      {focalLayer && (
        <>
          <div className="card border-2 rounded-3 mb-3">
            <div className="card-body">
              <p className="small fw-semibold mb-2">{t.focalUpgradePrompt}</p>
              <div className="d-flex flex-wrap gap-2">
                {getCardsForLayer(focalLayer).map((id) => (
                  <button
                    key={id}
                    type="button"
                    className={`btn btn-sm ${focalUpgraded.includes(id) ? "btn-success" : "btn-outline-secondary"}`}
                    disabled={!focalUpgraded.includes(id) && focalUpgraded.length >= 2}
                    onClick={() => toggleUpgrade(id)}
                  >
                    {CARD_LABELS[id]}
                    {focalUpgraded.includes(id) ? " ✓" : ""}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="card border-2 rounded-3 mb-4">
            <div className="card-body">
              <label className="form-label small">{t.focalReflectionPrompt}</label>
              <textarea
                className="form-control form-control-sm border-2 rounded-3"
                rows={3}
                placeholder={t.focalNotesPlaceholder}
                value={focalNotes}
                onChange={(e) => setFocalNotes(e.target.value)}
              />
            </div>
          </div>
        </>
      )}

      <div className="d-flex justify-content-between">
        <button type="button" className="btn btn-outline-secondary" onClick={() => goTo(3)}>{t.back}</button>
        <button
          type="button"
          className="btn btn-success"
          disabled={!focalLayer}
          onClick={saveFocalAndContinue}
        >
          {t.continueToUnit5}
        </button>
      </div>
    </div>
  );
}
