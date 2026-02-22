"use client";

/**
 * Unit 3 – Threat Canyon & Coalition Forge
 * 4 scenes: Horizon Overlook → Coalition Forge → Pathway Gates → Threat Run & Threat Card
 */

import { useGameStore } from "@/game/state/gameStore";
import type {
  Unit3SceneId,
  AssetId,
  ThreatPathwayId,
  ActorType,
  ActorScale,
  CapabilityType,
  MotivationType,
  ThreatCard as ThreatCardType,
  PPPScore,
} from "@/game/state/gameState";
import { PPPMeter } from "@/game/components/Shared/PPPMeter";
import en from "@/game/data/i18n/en.json";

const t = en.unit3;

const ASSET_IDS: AssetId[] = [
  "democracy_trust",
  "critical_infrastructure",
  "health_biosafety",
  "economy_jobs",
  "information_culture",
  "environment_climate",
  "human_agency_dignity",
];

const ASSET_LABELS: Record<AssetId, string> = {
  democracy_trust: t.assetDemocracyTrust,
  critical_infrastructure: t.assetCriticalInfrastructure,
  health_biosafety: t.assetHealthBiosafety,
  economy_jobs: t.assetEconomyJobs,
  information_culture: t.assetInformationCulture,
  environment_climate: t.assetEnvironmentClimate,
  human_agency_dignity: t.assetHumanAgencyDignity,
};

// PPP tags per asset (for Horizon Overlook mini meter): people, planet, parity weight 0–1
const ASSET_PPP: Record<AssetId, { people: number; planet: number; parity: number }> = {
  democracy_trust: { people: 1, planet: 0, parity: 1 },
  critical_infrastructure: { people: 0.5, planet: 0.5, parity: 0.3 },
  health_biosafety: { people: 1, planet: 0, parity: 0.3 },
  economy_jobs: { people: 1, planet: 0, parity: 1 },
  information_culture: { people: 0.5, planet: 0, parity: 1 },
  environment_climate: { people: 0.3, planet: 1, parity: 0.3 },
  human_agency_dignity: { people: 1, planet: 0, parity: 1 },
};

function pppFromProtectedAssets(assetIds: AssetId[]): PPPScore {
  let p = 0, pl = 0, par = 0;
  assetIds.forEach((id) => {
    const w = ASSET_PPP[id];
    p += w.people;
    pl += w.planet;
    par += w.parity;
  });
  const sum = p + pl + par || 1;
  return {
    people: Math.round((p / sum) * 100),
    planet: Math.round((pl / sum) * 100),
    parity: Math.round((par / sum) * 100),
  };
}

const PATHWAY_IDS: ThreatPathwayId[] = [
  "power_concentration",
  "gradual_disempowerment",
  "catastrophic_pandemic",
  "critical_infrastructure_collapse",
];

const PATHWAY_GATE: Record<ThreatPathwayId, { titleKey: string; labelKey: string; summaryKey: string }> = {
  power_concentration: { titleKey: "gatePowerTitle", labelKey: "gatePowerLabel", summaryKey: "gatePowerSummary" },
  gradual_disempowerment: { titleKey: "gateDriftTitle", labelKey: "gateDriftLabel", summaryKey: "gateDriftSummary" },
  catastrophic_pandemic: { titleKey: "gateBioTitle", labelKey: "gateBioLabel", summaryKey: "gateBioSummary" },
  critical_infrastructure_collapse: { titleKey: "gateGridTitle", labelKey: "gateGridLabel", summaryKey: "gateGridSummary" },
};

const RELEVANT_ASSETS: Record<ThreatPathwayId, AssetId[]> = {
  power_concentration: ["democracy_trust", "human_agency_dignity", "information_culture"],
  gradual_disempowerment: ["economy_jobs", "human_agency_dignity"],
  catastrophic_pandemic: ["health_biosafety", "democracy_trust"],
  critical_infrastructure_collapse: ["critical_infrastructure", "economy_jobs", "health_biosafety"],
};

const ATTACK_PATHS: Record<ThreatPathwayId, { value: string; labelKey: string }[]> = {
  power_concentration: [
    { value: "power_1", labelKey: "powerAttack1" },
    { value: "power_2", labelKey: "powerAttack2" },
  ],
  gradual_disempowerment: [
    { value: "drift_1", labelKey: "driftAttack1" },
    { value: "drift_2", labelKey: "driftAttack2" },
  ],
  catastrophic_pandemic: [
    { value: "bio_1", labelKey: "bioAttack1" },
    { value: "bio_2", labelKey: "bioAttack2" },
  ],
  critical_infrastructure_collapse: [
    { value: "grid_1", labelKey: "gridAttack1" },
    { value: "grid_2", labelKey: "gridAttack2" },
  ],
};

const OBJECTIVE_OPTIONS: { value: string; labelKey: string }[] = [
  { value: "obj1", labelKey: "objSeizePower" },
  { value: "obj2", labelKey: "objWeakenRivals" },
  { value: "obj3", labelKey: "objCauseChaos" },
  { value: "obj4", labelKey: "objMaximizeProfit" },
  { value: "obj5", labelKey: "objPushIdeology" },
];

const ACTOR_SCALE_OPTIONS: { id: ActorScale; labelKey: string }[] = [
  { id: "small_team", labelKey: "scaleSmallTeam" },
  { id: "medium_org", labelKey: "scaleMediumOrg" },
  { id: "large_state", labelKey: "scaleLargeState" },
];

const ACTOR_TYPE_OPTIONS: { id: ActorType; labelKey: string }[] = [
  { id: "misaligned_ai", labelKey: "actorMisalignedAi" },
  { id: "powerful_humans", labelKey: "actorPowerfulHumans" },
  { id: "malevolent_state", labelKey: "actorMalevolentState" },
  { id: "terror_group", labelKey: "actorTerrorGroup" },
];

const CAPABILITY_OPTIONS: { id: CapabilityType; labelKey: string }[] = [
  { id: "info_warfare", labelKey: "capInfoWarfare" },
  { id: "cyber_operations", labelKey: "capCyber" },
  { id: "bioengineering", labelKey: "capBio" },
  { id: "military_force", labelKey: "capMilitary" },
  { id: "economic_pressure", labelKey: "capEconomic" },
];

const MOTIVATION_OPTIONS: { id: MotivationType; labelKey: string }[] = [
  { id: "power_control", labelKey: "motPowerControl" },
  { id: "profit_resources", labelKey: "motProfitResources" },
  { id: "chaos_destruction", labelKey: "motChaosDestruction" },
  { id: "ideology_belief", labelKey: "motIdeologyBelief" },
  { id: "default_incentives", labelKey: "motDefaultIncentives" },
];

const ACTOR_LABELS: Record<ActorType, string> = {
  misaligned_ai: t.actorMisalignedAi,
  powerful_humans: t.actorPowerfulHumans,
  malevolent_state: t.actorMalevolentState,
  terror_group: t.actorTerrorGroup,
};

const SCALE_LABELS: Record<ActorScale, string> = {
  small_team: t.scaleSmallTeam,
  medium_org: t.scaleMediumOrg,
  large_state: t.scaleLargeState,
};

const CAP_LABELS: Record<CapabilityType, string> = {
  info_warfare: t.capInfoWarfare,
  cyber_operations: t.capCyber,
  bioengineering: t.capBio,
  military_force: t.capMilitary,
  economic_pressure: t.capEconomic,
};

const MOT_LABELS: Record<MotivationType, string> = {
  power_control: t.motPowerControl,
  profit_resources: t.motProfitResources,
  chaos_destruction: t.motChaosDestruction,
  ideology_belief: t.motIdeologyBelief,
  default_incentives: t.motDefaultIncentives,
};

function getObjectiveLabel(value: string): string {
  const opt = OBJECTIVE_OPTIONS.find((o) => o.value === value);
  return opt ? (t as Record<string, string>)[opt.labelKey] : value;
}

function defaultCoalition() {
  return {
    primaryActor: "powerful_humans" as ActorType,
    scale: "medium_org" as ActorScale,
    capabilities: [] as CapabilityType[],
    motivations: [] as MotivationType[],
  };
}

function defaultThreatCard(pathway: ThreatPathwayId): ThreatCardType {
  const attackOpts = ATTACK_PATHS[pathway];
  const attackVal = attackOpts[0]?.value ?? "";
  const attackDesc = attackOpts[0] ? (t as Record<string, string>)[attackOpts[0].labelKey] : "";
  return {
    actor: "powerful_humans",
    scale: "medium_org",
    capabilities: [],
    motivations: [],
    targetAsset: RELEVANT_ASSETS[pathway][0] ?? "democracy_trust",
    attackPathway: pathway,
    attackPathDescription: attackDesc,
    objective: (t as Record<string, string>).objSeizePower ?? "Seize and keep power",
    pppImpactEstimate: { people: 50, planet: 20, parity: 50 },
  };
}

function buildSummary(card: ThreatCardType): string {
  const actor = ACTOR_LABELS[card.actor];
  const scale = SCALE_LABELS[card.scale];
  const caps = card.capabilities.length ? card.capabilities.map((c) => CAP_LABELS[c]).join(", ") : "capabilities";
  const mots = card.motivations.length ? card.motivations.map((m) => MOT_LABELS[m]).join(", ") : "motivations";
  const asset = ASSET_LABELS[card.targetAsset];
  const pathDesc = card.attackPathDescription || (t as Record<string, string>).gatePowerSummary;
  const obj = card.objective;
  return `The ${scale} (${actor}) with ${caps} and ${mots} attacks ${asset} by ${pathDesc} in order to ${obj}.`;
}

export function Unit3Screen() {
  const { state, actions } = useGameStore();
  const u3 = state.unit3;
  const scene = u3?.currentScene ?? 1;

  const goTo = (next: Unit3SceneId) => {
    actions.updateUnit3({ currentScene: next });
  };

  const pathway = u3.pathwayChoice?.chosenPathway ?? null;
  const coalition = u3.coalition ?? defaultCoalition();
  const card: ThreatCardType = u3.threatCard ?? (pathway ? defaultThreatCard(pathway) : defaultThreatCard("power_concentration"));

  // Ensure card has attackPathDescription for legacy saves
  const safeCard: ThreatCardType = "attackPathDescription" in card && card.attackPathDescription != null
    ? card
    : { ...card, attackPathDescription: card.attackPathDescription ?? "" };

  // —— Scene 1: Horizon Overlook ——
  if (scene === 1) {
    const protectedAssets = u3.assets?.protectedAssets ?? [];
    const selectedIds = protectedAssets.map((a) => a.id);
    const ppp = pppFromProtectedAssets(selectedIds);

    const toggleAsset = (id: AssetId) => {
      const next = selectedIds.includes(id)
        ? protectedAssets.filter((a) => a.id !== id)
        : [...protectedAssets, { id, priority: Math.min(3, protectedAssets.length + 1) as 1 | 2 | 3 }];
      if (next.length > 5) return;
      const withPriority = next.map((a, i) => ({ ...a, priority: (Math.min(i + 1, 3) as 1 | 2 | 3) }));
      actions.updateUnit3({ assets: { protectedAssets: withPriority } });
    };

    const setPriority = (index: number, priority: 1 | 2 | 3) => {
      const next = [...protectedAssets];
      next[index] = { ...next[index], priority };
      actions.updateUnit3({ assets: { protectedAssets: next } });
    };

    return (
      <div className="unit3-screen threat-canyon">
        <h2 className="h4 mb-3">{en.units["3"].title}</h2>
        <p className="text-muted mb-2">{t.zoneTitle}</p>
        <h3 className="h5 mb-2">{t.horizonOverlookTitle}</h3>
        <p className="mb-2">{t.horizonIntro}</p>
        <p className="mb-3">{t.horizonPrompt}</p>

        <div className="row">
          <div className="col-12 col-lg-8">
            <div className="card border-2 rounded-3 mb-3">
              <div className="card-body">
                <p className="small text-muted mb-2">{t.shieldBoardHint}</p>
                <div className="d-flex flex-wrap gap-2">
                  {ASSET_IDS.map((id) => {
                    const selected = selectedIds.includes(id);
                    const disabled = !selected && selectedIds.length >= 5;
                    return (
                      <button
                        key={id}
                        type="button"
                        className={`btn btn-sm ${selected ? "btn-primary" : "btn-outline-secondary"}`}
                        disabled={disabled}
                        onClick={() => toggleAsset(id)}
                      >
                        {ASSET_LABELS[id]}
                      </button>
                    );
                  })}
                </div>
                {protectedAssets.length > 0 && (
                  <div className="mt-3">
                    <p className="small mb-2">{t.priorityLabel}</p>
                    {protectedAssets.map((a, i) => (
                      <div key={a.id} className="d-flex align-items-center gap-2 mb-1">
                        <span>{ASSET_LABELS[a.id]}</span>
                        <select
                          className="form-select form-select-sm w-auto"
                          value={a.priority}
                          onChange={(e) => setPriority(i, Number(e.target.value) as 1 | 2 | 3)}
                        >
                          <option value={1}>{t.priorityHigh}</option>
                          <option value={2}>{t.priorityMedium}</option>
                          <option value={3}>{t.priorityLow}</option>
                        </select>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-4">
            {selectedIds.length > 0 && (
              <div className="card border-2 rounded-3">
                <div className="card-body">
                  <p className="small text-muted mb-2">{t.shieldBoardHint}</p>
                  <PPPMeter scores={ppp} />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="d-flex justify-content-end mt-3">
          <button
            type="button"
            className="btn btn-primary"
            disabled={protectedAssets.length < 3 || protectedAssets.length > 5}
            onClick={() => goTo(2)}
          >
            Continue to Coalition Forge
          </button>
        </div>
      </div>
    );
  }

  // —— Scene 2: Coalition Forge ——
  if (scene === 2) {
    const updateCoalition = (partial: Partial<typeof coalition>) => {
      actions.updateUnit3({ coalition: { ...coalition, ...partial } });
    };

    const toggleCapability = (id: CapabilityType) => {
      const next = coalition.capabilities.includes(id)
        ? coalition.capabilities.filter((c) => c !== id)
        : [...coalition.capabilities, id];
      updateCoalition({ capabilities: next });
    };

    const toggleMotivation = (id: MotivationType) => {
      const next = coalition.motivations.includes(id)
        ? coalition.motivations.filter((m) => m !== id)
        : [...coalition.motivations, id];
      updateCoalition({ motivations: next });
    };

    return (
      <div className="unit3-screen threat-canyon">
        <h3 className="h5 mb-2">{t.coalitionForgeTitle}</h3>
        <p className="mb-3">{t.coalitionIntro}</p>
        <div className="alert alert-light border rounded-3 mb-3 small">
          {t.governanceInsight}
        </div>

        <div className="card border-2 rounded-3 mb-3">
          <div className="card-body">
            <label className="form-label small">{t.actorScaleLabel}</label>
            <div className="d-flex gap-2 flex-wrap">
              {ACTOR_SCALE_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  className={`btn btn-sm ${coalition.scale === opt.id ? "btn-primary" : "btn-outline-secondary"}`}
                  onClick={() => updateCoalition({ scale: opt.id })}
                >
                  {(t as Record<string, string>)[opt.labelKey]}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="card border-2 rounded-3 mb-3">
          <div className="card-body">
            <label className="form-label small">{t.actorTypeLabel}</label>
            <div className="d-flex gap-2 flex-wrap">
              {ACTOR_TYPE_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  className={`btn btn-sm ${coalition.primaryActor === opt.id ? "btn-primary" : "btn-outline-secondary"}`}
                  onClick={() => updateCoalition({ primaryActor: opt.id })}
                >
                  {(t as Record<string, string>)[opt.labelKey]}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="card border-2 rounded-3 mb-3">
          <div className="card-body">
            <label className="form-label small">{t.capabilityLabel}</label>
            <div className="d-flex gap-2 flex-wrap">
              {CAPABILITY_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  className={`btn btn-sm ${coalition.capabilities.includes(opt.id) ? "btn-warning" : "btn-outline-secondary"}`}
                  onClick={() => toggleCapability(opt.id)}
                >
                  {(t as Record<string, string>)[opt.labelKey]}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="card border-2 rounded-3 mb-4">
          <div className="card-body">
            <label className="form-label small">{t.motivationLabel}</label>
            <div className="d-flex gap-2 flex-wrap">
              {MOTIVATION_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  className={`btn btn-sm ${coalition.motivations.includes(opt.id) ? "btn-warning" : "btn-outline-secondary"}`}
                  onClick={() => toggleMotivation(opt.id)}
                >
                  {(t as Record<string, string>)[opt.labelKey]}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-between">
          <button type="button" className="btn btn-outline-secondary" onClick={() => goTo(1)}>{t.back}</button>
          <button type="button" className="btn btn-primary" onClick={() => goTo(3)}>Continue to Pathway Gates</button>
        </div>
      </div>
    );
  }

  // —— Scene 3: Pathway Gates ——
  if (scene === 3) {
    const selectPathway = (path: ThreatPathwayId) => {
      actions.updateUnit3({
        pathwayChoice: { chosenPathway: path, reasoningNote: u3.pathwayChoice?.reasoningNote },
      });
      const newCard = defaultThreatCard(path);
      newCard.actor = coalition.primaryActor;
      newCard.scale = coalition.scale;
      newCard.capabilities = [...coalition.capabilities];
      newCard.motivations = [...coalition.motivations];
      actions.setThreatCard(newCard);
    };

    return (
      <div className="unit3-screen threat-canyon">
        <h3 className="h5 mb-2">{t.pathwayGatesTitle}</h3>
        <p className="mb-4">{t.pathwayPrompt}</p>

        <div className="row g-3">
          {PATHWAY_IDS.map((path) => {
            const gate = PATHWAY_GATE[path];
            const selected = pathway === path;
            return (
              <div key={path} className="col-12 col-md-6">
                <div
                  className={`card border-2 rounded-3 h-100 ${selected ? "border-primary bg-light" : ""}`}
                  style={{ cursor: "pointer" }}
                  onClick={() => selectPathway(path)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); selectPathway(path); } }}
                >
                  <div className="card-body">
                    <h4 className="h6">{(t as Record<string, string>)[gate.titleKey]}</h4>
                    <p className="small text-muted mb-0">{(t as Record<string, string>)[gate.summaryKey]}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="d-flex justify-content-between mt-4">
          <button type="button" className="btn btn-outline-secondary" onClick={() => goTo(2)}>{t.back}</button>
          <button type="button" className="btn btn-primary" disabled={!pathway} onClick={() => goTo(4)}>
            Continue to Threat Run
          </button>
        </div>
      </div>
    );
  }

  // —— Scene 4: Threat Run & Threat Card ——
  const path = pathway ?? "power_concentration";
  const relevantAssets = RELEVANT_ASSETS[path];
  const attackOpts = ATTACK_PATHS[path];
  const assetOptions = relevantAssets.filter((id) => u3.assets?.protectedAssets?.some((a) => a.id === id)).length
    ? relevantAssets.filter((id) => u3.assets?.protectedAssets?.some((a) => a.id === id))
    : relevantAssets;

  const updateCard = (partial: Partial<ThreatCardType>) => {
    actions.setThreatCard({ ...safeCard, ...partial } as ThreatCardType);
  };

  const setAttackPath = (value: string) => {
    const desc = attackOpts.find((o) => o.value === value);
    updateCard({
      attackPathDescription: desc ? (t as Record<string, string>)[desc.labelKey] : safeCard.attackPathDescription,
    });
  };

  const setObjective = (value: string) => {
    updateCard({ objective: getObjectiveLabel(value) });
  };

  const summary = safeCard.summary ?? buildSummary(safeCard);

  return (
    <div className="unit3-screen threat-canyon">
      <h3 className="h5 mb-2">{t.threatRunTitle}</h3>
      <p className="mb-4">{t.threatRunPrompt}</p>

      <div className="card border-2 rounded-3 mb-3">
        <div className="card-body">
          <label className="form-label small">{t.threatCardAsset}</label>
          <div className="d-flex flex-wrap gap-2">
            {assetOptions.map((id) => (
              <button
                key={id}
                type="button"
                className={`btn btn-sm ${safeCard.targetAsset === id ? "btn-primary" : "btn-outline-secondary"}`}
                onClick={() => updateCard({ targetAsset: id })}
              >
                {ASSET_LABELS[id]}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="card border-2 rounded-3 mb-3">
        <div className="card-body">
          <label className="form-label small">{t.attackPathLabel}</label>
          <div className="d-flex flex-wrap gap-2">
            {attackOpts.map((opt) => (
              <button
                key={opt.value}
                type="button"
                className={`btn btn-sm ${safeCard.attackPathDescription === (t as Record<string, string>)[opt.labelKey] ? "btn-primary" : "btn-outline-secondary"}`}
                onClick={() => setAttackPath(opt.value)}
              >
                {(t as Record<string, string>)[opt.labelKey]}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="card border-2 rounded-3 mb-3">
        <div className="card-body">
          <label className="form-label small">{t.objectiveLabel}</label>
          <div className="d-flex flex-wrap gap-2">
            {OBJECTIVE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                className={`btn btn-sm ${safeCard.objective === (t as Record<string, string>)[opt.labelKey] ? "btn-primary" : "btn-outline-secondary"}`}
                onClick={() => setObjective(opt.value)}
              >
                {(t as Record<string, string>)[opt.labelKey]}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="card border-2 rounded-3 mb-3 bg-light">
        <div className="card-body">
          <h4 className="h6 mb-2">{t.threatCardTitle}</h4>
          <p className="small text-muted mb-2">{t.threatCardTemplate}</p>
          <p className="mb-2 fw-semibold">{summary}</p>
          <label className="form-label small">{t.editBlueprint}</label>
          <textarea
            className="form-control form-control-sm border-2 rounded-3"
            rows={3}
            value={safeCard.summary ?? summary}
            onChange={(e) => updateCard({ summary: e.target.value })}
          />
        </div>
      </div>

      {safeCard.pppImpactEstimate && (
        <div className="card border-2 rounded-3 mb-3">
          <div className="card-body">
            <p className="small text-muted mb-2">Impact on People, Planet, Parity</p>
            <PPPMeter scores={safeCard.pppImpactEstimate} />
          </div>
        </div>
      )}

      <div className="d-flex justify-content-between">
        <button type="button" className="btn btn-outline-secondary" onClick={() => goTo(3)}>{t.back}</button>
        <button
          type="button"
          className="btn btn-success"
          onClick={() => {
            actions.setThreatCard({ ...safeCard, summary: safeCard.summary ?? summary });
            actions.updateUnit3({ completed: true });
            actions.setCurrentUnit(4);
          }}
        >
          {t.saveAndContinueToUnit4}
        </button>
      </div>
    </div>
  );
}
