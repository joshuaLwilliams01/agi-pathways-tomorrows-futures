"use client";

/**
 * Unit 5 – Launchpad Agora: Mission Outfitters
 * 5 scenes: Contribution Radar → Intervention Dock → Role Hangar → Mission Planner → Launch & Mission Brief
 */

import { useGameStore } from "@/game/state/gameStore";
import type {
  Unit5SceneId,
  FocusSector,
  InterventionChoice,
  InterventionResearch,
  RoleArchetype,
  RoleChoice,
  ShortTermAction,
  ShortTermActionCategory,
  ShortTermActionTimeFrame,
  LongTermDirection,
} from "@/game/state/gameState";
import en from "@/game/data/i18n/en.json";

const t = en.unit5;
const tUnits = en.units;

const FOCUS_SECTORS: { id: FocusSector; labelKey: string; descKey: string }[] = [
  { id: "policy_governance", labelKey: "sectorPolicy", descKey: "sectorPolicyDesc" },
  { id: "technical_safety", labelKey: "sectorTechnical", descKey: "sectorTechnicalDesc" },
  { id: "field_building", labelKey: "sectorFieldBuilding", descKey: "sectorFieldBuildingDesc" },
  { id: "community_access", labelKey: "sectorCommunity", descKey: "sectorCommunityDesc" },
];

// Interventions by sector; optional threat pathway and layer for filtering
const INTERVENTIONS: (Omit<InterventionChoice, "name"> & { nameKey: string })[] = [
  { id: "frontier_eval", nameKey: "intvFrontierEval", focusSector: "policy_governance", relatedThreatPathway: "power_concentration", strengthensLayer: "prevent" },
  { id: "national_agency", nameKey: "intvNationalAgency", focusSector: "policy_governance", relatedThreatPathway: "power_concentration", strengthensLayer: "prevent" },
  { id: "city_guidelines", nameKey: "intvCityGuidelines", focusSector: "policy_governance", strengthensLayer: "constrain" },
  { id: "red_team_eval", nameKey: "intvRedTeamEval", focusSector: "technical_safety", strengthensLayer: "constrain" },
  { id: "open_source_safety", nameKey: "intvOpenSourceSafety", focusSector: "technical_safety", strengthensLayer: "constrain" },
  { id: "alignment_research", nameKey: "intvAlignmentResearch", focusSector: "technical_safety", strengthensLayer: "constrain" },
  { id: "reading_groups", nameKey: "intvReadingGroups", focusSector: "field_building", strengthensLayer: "withstand" },
  { id: "fellowship_pipelines", nameKey: "intvFellowshipPipelines", focusSector: "field_building", strengthensLayer: "withstand" },
  { id: "explainable_guides", nameKey: "intvExplainableGuides", focusSector: "field_building", strengthensLayer: "withstand" },
  { id: "literacy_workshops", nameKey: "intvLiteracyWorkshops", focusSector: "community_access", strengthensLayer: "withstand" },
  { id: "responsible_toolkits", nameKey: "intvResponsibleToolkits", focusSector: "community_access", strengthensLayer: "constrain" },
  { id: "digital_equity_gov", nameKey: "intvDigitalEquityGov", focusSector: "community_access", strengthensLayer: "prevent" },
  { id: "tech_society_hub", nameKey: "intvTechSocietyHub", focusSector: "community_access", relatedThreatPathway: "power_concentration", strengthensLayer: "prevent" },
];

const ROLES: { id: RoleArchetype; titleKey: string; workKey: string }[] = [
  { id: "policy_pilot", titleKey: "rolePolicyPilot", workKey: "rolePolicyPilotWork" },
  { id: "safety_engineer", titleKey: "roleSafetyEngineer", workKey: "roleSafetyEngineerWork" },
  { id: "field_builder", titleKey: "roleFieldBuilder", workKey: "roleFieldBuilderWork" },
  { id: "tech_society_partnerships", titleKey: "roleTechSociety", workKey: "roleTechSocietyWork" },
  { id: "community_navigator", titleKey: "roleCommunityNavigator", workKey: "roleCommunityNavigatorWork" },
];

const CATEGORIES: { value: ShortTermActionCategory; labelKey: string }[] = [
  { value: "learn", labelKey: "categoryLearn" },
  { value: "connect", labelKey: "categoryConnect" },
  { value: "build", labelKey: "categoryBuild" },
  { value: "share", labelKey: "categoryShare" },
];

const TIME_FRAMES: { value: ShortTermActionTimeFrame; labelKey: string }[] = [
  { value: "this_month", labelKey: "timeFrameThisMonth" },
  { value: "next_3_months", labelKey: "timeFrameNext3Months" },
  { value: "next_6_months", labelKey: "timeFrameNext6Months" },
];

function interventionToChoice(
  item: (typeof INTERVENTIONS)[0]
): InterventionChoice {
  return {
    id: item.id,
    name: (t as Record<string, string>)[item.nameKey] ?? item.id,
    focusSector: item.focusSector,
    relatedThreatPathway: item.relatedThreatPathway,
    strengthensLayer: item.strengthensLayer,
  };
}

function defaultResearch(): InterventionResearch {
  return {
    successPicture: "",
    helpsAiGoWell: "",
    currentStatus: "",
    orgsToWatch: "",
  };
}

export function Unit5Screen() {
  const { state, actions } = useGameStore();
  const u5 = state.unit5;
  const scene = u5?.currentScene ?? 1;
  const focus = u5.focus ?? { sector: null, reasoningNote: "" };
  const intervention = u5.intervention ?? { chosenIntervention: undefined, research: undefined };
  const threatPathway = state.unit3?.pathwayChoice?.chosenPathway ?? null;
  const focalLayer = state.unit4?.focalLayerPlan?.layer ?? null;

  const goTo = (next: Unit5SceneId) => {
    actions.updateUnit5({ currentScene: next });
  };

  const sector = focus.sector;
  const filteredInterventions = sector
    ? INTERVENTIONS.filter((i) => i.focusSector === sector)
    : INTERVENTIONS;

  // —— Scene 1: Contribution Radar ——
  if (scene === 1) {
    return (
      <div className="unit5-screen launchpad-agora">
        <h2 className="h4 mb-3">{tUnits["5"].title}</h2>
        <p className="text-muted mb-2">{t.zoneTitle}</p>
        <h3 className="h5 mb-2">{t.contributionRadarTitle}</h3>
        <p className="mb-4">{t.contributionRadarPrompt}</p>

        <div className="row g-3 mb-3">
          {FOCUS_SECTORS.map((s) => (
            <div key={s.id} className="col-12 col-md-6">
              <div
                className={`card border-2 rounded-3 h-100 ${sector === s.id ? "border-primary bg-light" : ""}`}
                style={{ cursor: "pointer" }}
                onClick={() => actions.updateUnit5({ focus: { ...focus, sector: s.id } })}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    actions.updateUnit5({ focus: { ...focus, sector: s.id } });
                  }
                }}
              >
                <div className="card-body">
                  <h4 className="h6">{(t as Record<string, string>)[s.labelKey]}</h4>
                  <p className="small text-muted mb-0">{(t as Record<string, string>)[s.descKey]}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="card border-2 rounded-3 mb-4">
          <div className="card-body">
            <label className="form-label small">{t.focusReasoningPrompt}</label>
            <textarea
              className="form-control form-control-sm border-2 rounded-3"
              rows={2}
              value={focus.reasoningNote ?? ""}
              onChange={(e) => actions.updateUnit5({ focus: { ...focus, reasoningNote: e.target.value } })}
            />
          </div>
        </div>

        <div className="d-flex justify-content-end">
          <button type="button" className="btn btn-primary" disabled={!sector} onClick={() => goTo(2)}>
            Continue to Intervention Dock
          </button>
        </div>
      </div>
    );
  }

  // —— Scene 2: Intervention Dock ——
  if (scene === 2) {
    const chosen = intervention.chosenIntervention;
    const research = intervention.research ?? defaultResearch();

    const setResearch = (partial: Partial<InterventionResearch>) => {
      actions.updateUnit5({
        intervention: {
          ...intervention,
          research: { ...research, ...partial },
        },
      });
    };

    return (
      <div className="unit5-screen launchpad-agora">
        <h3 className="h5 mb-2">{t.interventionDockTitle}</h3>
        <p className="mb-4">{t.interventionDockPrompt}</p>

        <div className="d-flex flex-wrap gap-2 mb-3">
          {filteredInterventions.map((item) => {
            const choice = interventionToChoice(item);
            const selected = chosen?.id === item.id;
            return (
              <button
                key={item.id}
                type="button"
                className={`btn btn-sm ${selected ? "btn-primary" : "btn-outline-secondary"}`}
                onClick={() =>
                  actions.updateUnit5({
                    intervention: {
                      chosenIntervention: choice,
                      research: chosen?.id === item.id ? research : defaultResearch(),
                    },
                  })
                }
              >
                {(t as Record<string, string>)[item.nameKey]}
              </button>
            );
          })}
        </div>

        {chosen && (
          <div className="card border-2 rounded-3 mb-4">
            <div className="card-body">
              <h4 className="h6 mb-3">{t.goDeepTitle}</h4>
              <div className="mb-2">
                <label className="form-label small">{t.researchSuccessPicture}</label>
                <textarea
                  className="form-control form-control-sm border-2 rounded-3"
                  rows={2}
                  value={research.successPicture}
                  onChange={(e) => setResearch({ successPicture: e.target.value })}
                />
              </div>
              <div className="mb-2">
                <label className="form-label small">{t.researchHelpsAi}</label>
                <textarea
                  className="form-control form-control-sm border-2 rounded-3"
                  rows={2}
                  value={research.helpsAiGoWell}
                  onChange={(e) => setResearch({ helpsAiGoWell: e.target.value })}
                />
              </div>
              <div className="mb-2">
                <label className="form-label small">{t.researchCurrentStatus}</label>
                <textarea
                  className="form-control form-control-sm border-2 rounded-3"
                  rows={2}
                  value={research.currentStatus}
                  onChange={(e) => setResearch({ currentStatus: e.target.value })}
                />
              </div>
              <div className="mb-0">
                <label className="form-label small">{t.researchOrgsToWatch}</label>
                <textarea
                  className="form-control form-control-sm border-2 rounded-3"
                  rows={2}
                  value={research.orgsToWatch}
                  onChange={(e) => setResearch({ orgsToWatch: e.target.value })}
                />
              </div>
            </div>
          </div>
        )}

        <div className="d-flex justify-content-between">
          <button type="button" className="btn btn-outline-secondary" onClick={() => goTo(1)}>{t.back}</button>
          <button type="button" className="btn btn-primary" onClick={() => goTo(3)}>
            Continue to Role Hangar
          </button>
        </div>
      </div>
    );
  }

  // —— Scene 3: Role Hangar ——
  if (scene === 3) {
    const role = u5.role;
    const defaultTitles: Record<RoleArchetype, string> = {
      policy_pilot: "Policy Pilot",
      safety_engineer: "Safety Engineer",
      field_builder: "Field-Builder",
      tech_society_partnerships: "Head of Tech & Society Partnerships",
      community_navigator: "Community Navigator",
    };

    return (
      <div className="unit5-screen launchpad-agora">
        <h3 className="h5 mb-2">{t.roleHangarTitle}</h3>

        <div className="row g-3 mb-3">
          {ROLES.map((r) => (
            <div key={r.id} className="col-12 col-md-6">
              <div
                className={`card border-2 rounded-3 h-100 ${role?.archetype === r.id ? "border-primary bg-light" : ""}`}
                style={{ cursor: "pointer" }}
                onClick={() =>
                  actions.updateUnit5({
                    role: {
                      archetype: r.id,
                      displayTitle: role?.archetype === r.id ? (role.displayTitle || defaultTitles[r.id]) : defaultTitles[r.id],
                      level: role?.archetype === r.id ? role.level : "starter",
                      personalTagline: role?.archetype === r.id ? role.personalTagline : undefined,
                    },
                  })
                }
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    actions.updateUnit5({
                      role: {
                        archetype: r.id,
                        displayTitle: role?.archetype === r.id ? role.displayTitle : defaultTitles[r.id],
                        level: role?.level ?? "starter",
                        personalTagline: role?.personalTagline,
                      },
                    });
                  }
                }}
              >
                <div className="card-body">
                  <h4 className="h6">{(t as Record<string, string>)[r.titleKey]}</h4>
                  <p className="small text-muted mb-0">{(t as Record<string, string>)[r.workKey]}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {role && (
          <div className="card border-2 rounded-3 mb-4">
            <div className="card-body">
              <div className="mb-2">
                <label className="form-label small">{t.roleDisplayTitleLabel}</label>
                <input
                  type="text"
                  className="form-control form-control-sm border-2 rounded-3"
                  value={role.displayTitle}
                  onChange={(e) => actions.updateUnit5({ role: { ...role, displayTitle: e.target.value } })}
                />
              </div>
              <div className="mb-2">
                <label className="form-label small">{t.roleLevelLabel}</label>
                <div className="d-flex gap-2 flex-wrap">
                  {(["starter", "mid", "senior"] as const).map((level) => (
                    <button
                      key={level}
                      type="button"
                      className={`btn btn-sm ${role.level === level ? "btn-primary" : "btn-outline-secondary"}`}
                      onClick={() => actions.updateUnit5({ role: { ...role, level } })}
                    >
                      {(t as Record<string, string>)[level === "starter" ? "roleLevelStarter" : level === "mid" ? "roleLevelMid" : "roleLevelSenior"]}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="form-label small">{t.roleTaglineLabel}</label>
                <input
                  type="text"
                  className="form-control form-control-sm border-2 rounded-3"
                  placeholder="e.g. Future Head of Tech & Society Partnerships"
                  value={role.personalTagline ?? ""}
                  onChange={(e) => actions.updateUnit5({ role: { ...role, personalTagline: e.target.value || undefined } })}
                />
              </div>
            </div>
          </div>
        )}

        <div className="d-flex justify-content-between">
          <button type="button" className="btn btn-outline-secondary" onClick={() => goTo(2)}>{t.back}</button>
          <button type="button" className="btn btn-primary" onClick={() => goTo(4)}>
            Continue to Mission Planner
          </button>
        </div>
      </div>
    );
  }

  // —— Scene 4: Mission Planner ——
  if (scene === 4) {
    const shortTerm = u5.shortTermPlan ?? [];
    const longTerm = u5.longTermDirection ?? { skills: "", projects: "", relationships: "" };

    const addShortTerm = () => {
      const id = `st-${Date.now()}`;
      actions.updateUnit5({
        shortTermPlan: [
          ...shortTerm,
          { id, label: "", category: "learn", timeFrame: "next_6_months" },
        ],
      });
    };

    const updateShortTerm = (index: number, partial: Partial<ShortTermAction>) => {
      const next = [...shortTerm];
      next[index] = { ...next[index], ...partial };
      actions.updateUnit5({ shortTermPlan: next });
    };

    const removeShortTerm = (index: number) => {
      actions.updateUnit5({ shortTermPlan: shortTerm.filter((_, i) => i !== index) });
    };

    return (
      <div className="unit5-screen launchpad-agora">
        <h3 className="h5 mb-2">{t.missionPlannerTitle}</h3>
        <p className="mb-3">{t.shortTermPrompt}</p>

        <div className="card border-2 rounded-3 mb-3">
          <div className="card-body">
            {shortTerm.map((item, i) => (
              <div key={item.id} className="d-flex flex-wrap gap-2 align-items-center mb-2 border-bottom pb-2">
                <input
                  type="text"
                  className="form-control form-control-sm flex-grow-1"
                  style={{ maxWidth: "20rem" }}
                  placeholder="e.g. Join an online AGI safety community"
                  value={item.label}
                  onChange={(e) => updateShortTerm(i, { label: e.target.value })}
                />
                <select
                  className="form-select form-select-sm"
                  style={{ width: "auto" }}
                  value={item.category}
                  onChange={(e) => updateShortTerm(i, { category: e.target.value as ShortTermActionCategory })}
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.value} value={c.value}>{(t as Record<string, string>)[c.labelKey]}</option>
                  ))}
                </select>
                <select
                  className="form-select form-select-sm"
                  style={{ width: "auto" }}
                  value={item.timeFrame}
                  onChange={(e) => updateShortTerm(i, { timeFrame: e.target.value as ShortTermActionTimeFrame })}
                >
                  {TIME_FRAMES.map((tf) => (
                    <option key={tf.value} value={tf.value}>{(t as Record<string, string>)[tf.labelKey]}</option>
                  ))}
                </select>
                <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => removeShortTerm(i)}>×</button>
              </div>
            ))}
            <button type="button" className="btn btn-sm btn-outline-primary" onClick={addShortTerm}>
              {t.shortTermAdd}
            </button>
          </div>
        </div>

        <p className="mb-2">{t.longTermPrompt}</p>
        <div className="card border-2 rounded-3 mb-3">
          <div className="card-body">
            <div className="mb-2">
              <label className="form-label small">{t.longTermSkills}</label>
              <input
                type="text"
                className="form-control form-control-sm border-2 rounded-3"
                placeholder={t.longTermSkillsPlaceholder}
                value={longTerm.skills}
                onChange={(e) =>
                  actions.updateUnit5({
                    longTermDirection: { ...longTerm, skills: e.target.value },
                  })
                }
              />
            </div>
            <div className="mb-2">
              <label className="form-label small">{t.longTermProjects}</label>
              <input
                type="text"
                className="form-control form-control-sm border-2 rounded-3"
                placeholder={t.longTermProjectsPlaceholder}
                value={longTerm.projects}
                onChange={(e) =>
                  actions.updateUnit5({
                    longTermDirection: { ...longTerm, projects: e.target.value },
                  })
                }
              />
            </div>
            <div>
              <label className="form-label small">{t.longTermRelationships}</label>
              <input
                type="text"
                className="form-control form-control-sm border-2 rounded-3"
                placeholder={t.longTermRelationshipsPlaceholder}
                value={longTerm.relationships}
                onChange={(e) =>
                  actions.updateUnit5({
                    longTermDirection: { ...longTerm, relationships: e.target.value },
                  })
                }
              />
            </div>
          </div>
        </div>

        <div className="card border-2 rounded-3 mb-4">
          <div className="card-body">
            <label className="form-label small">{t.alignmentNarrativePrompt}</label>
            <textarea
              className="form-control border-2 rounded-3"
              rows={4}
              value={u5.alignmentNarrative?.text ?? ""}
              onChange={(e) =>
                actions.updateUnit5({
                  alignmentNarrative: { text: e.target.value },
                })
              }
            />
          </div>
        </div>

        <div className="d-flex justify-content-between">
          <button type="button" className="btn btn-outline-secondary" onClick={() => goTo(3)}>{t.back}</button>
          <button type="button" className="btn btn-primary" onClick={() => goTo(5)}>
            Continue to Launch
          </button>
        </div>
      </div>
    );
  }

  // —— Scene 5: Launch & Mission Brief ——
  const buildMissionBrief = (): string => {
    const lines: string[] = [];
    lines.push(`# ${t.missionBriefHeading}`);
    lines.push("");
    lines.push(`## ${t.missionBriefFuture}`);
    const u1 = state.unit1;
    if (u1?.character?.name) lines.push(`Character: ${u1.character.name}`);
    if (u1?.societalFuture?.pppScore) {
      lines.push(`PPP: People ${u1.societalFuture.pppScore.people}, Planet ${u1.societalFuture.pppScore.planet}, Parity ${u1.societalFuture.pppScore.parity}`);
    }
    lines.push("");
    lines.push(`## ${t.missionBriefProgress}`);
    const u2 = state.unit2;
    if (u2?.timeline?.timelineExpectation) lines.push(`Timeline view: ${u2.timeline.timelineExpectation}`);
    lines.push("");
    lines.push(`## ${t.missionBriefThreat}`);
    const tc = state.unit3?.threatCard;
    if (tc?.summary) lines.push(tc.summary);
    lines.push("");
    lines.push(`## ${t.missionBriefDefence}`);
    const u4 = state.unit4;
    if (u4?.strategyMix) {
      lines.push(`Strategy mix: Gov ${u4.strategyMix.govControl}%, Aligned ${u4.strategyMix.alignedSuperintelligence}%, Defences ${u4.strategyMix.defencesAndDiffusion}%`);
    }
    if (u4?.focalLayerPlan?.layer) lines.push(`Focal layer: ${u4.focalLayerPlan.layer}`);
    lines.push("");
    lines.push(`## ${t.missionBriefIntervention}`);
    if (u5.intervention?.chosenIntervention) {
      lines.push(`Intervention: ${u5.intervention.chosenIntervention.name}`);
    }
    if (u5.role) {
      lines.push(`Role: ${u5.role.displayTitle} (${u5.role.level})`);
      if (u5.role.personalTagline) lines.push(`Tagline: ${u5.role.personalTagline}`);
    }
    if (u5.shortTermPlan?.length) {
      lines.push("Short-term:");
      u5.shortTermPlan.forEach((a) => lines.push(`- ${a.label} (${a.category}, ${a.timeFrame})`));
    }
    if (u5.longTermDirection) {
      lines.push("Long-term: Skills / Projects / Relationships");
      if (u5.longTermDirection.skills) lines.push(`Skills: ${u5.longTermDirection.skills}`);
      if (u5.longTermDirection.projects) lines.push(`Projects: ${u5.longTermDirection.projects}`);
      if (u5.longTermDirection.relationships) lines.push(`Relationships: ${u5.longTermDirection.relationships}`);
    }
    if (u5.alignmentNarrative?.text) {
      lines.push("");
      lines.push("Alignment narrative:");
      lines.push(u5.alignmentNarrative.text);
    }
    return lines.join("\n");
  };

  const handleCopyBrief = () => {
    const text = buildMissionBrief();
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
    }
  };

  return (
    <div className="unit5-screen launchpad-agora">
      <h3 className="h5 mb-2">{t.launchTitle}</h3>
      <p className="mb-4">{t.launchMessage}</p>

      <div className="card border-2 rounded-3 mb-4">
        <div className="card-body">
          <h4 className="h6 mb-3">{t.missionBriefHeading}</h4>
          <pre className="small bg-light p-3 rounded-3 overflow-auto" style={{ maxHeight: "20rem", whiteSpace: "pre-wrap" }}>
            {buildMissionBrief()}
          </pre>
          <button type="button" className="btn btn-outline-primary btn-sm" onClick={handleCopyBrief}>
            {t.exportBrief}
          </button>
        </div>
      </div>

      <div className="d-flex justify-content-between">
        <button type="button" className="btn btn-outline-secondary" onClick={() => goTo(4)}>{t.back}</button>
        <button
          type="button"
          className="btn btn-success"
          onClick={() => actions.updateUnit5({ completed: true })}
        >
          Finish
        </button>
      </div>
    </div>
  );
}
