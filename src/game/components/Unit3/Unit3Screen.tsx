"use client";

/**
 * Unit 3 – Pathways to Harm.
 * Uses new state: assets, pathwayChoice, threatCard (ThreatPathwayId, AssetId, ThreatCard).
 */

import {
  useGameStore,
} from "@/game/state/gameStore";
import type {
  ThreatCard as ThreatCardType,
  ThreatPathwayId,
  AssetId,
} from "@/game/state/gameState";
import { BlockCard } from "@/game/components/Shared/BlockCard";
import en from "@/game/data/i18n/en.json";

const t = en.unit3;

const PATHWAY_IDS: ThreatPathwayId[] = [
  "power_concentration",
  "gradual_disempowerment",
  "catastrophic_pandemic",
  "critical_infrastructure_collapse",
];

const pathwayLabels: Record<ThreatPathwayId, string> = {
  power_concentration: t.powerConcentration,
  gradual_disempowerment: t.gradualDisempowerment,
  catastrophic_pandemic: t.catastrophicPandemics,
  critical_infrastructure_collapse: t.criticalInfrastructure,
};

const ASSET_IDS: AssetId[] = [
  "democracy_trust",
  "critical_infrastructure",
  "health_biosafety",
  "economy_jobs",
  "information_culture",
  "environment_climate",
  "human_agency_dignity",
];

const assetLabels: Record<AssetId, string> = {
  democracy_trust: "Democracy & trust",
  critical_infrastructure: "Critical infrastructure",
  health_biosafety: "Health & biosafety",
  economy_jobs: "Economy & jobs",
  information_culture: "Information & culture",
  environment_climate: "Environment & climate",
  human_agency_dignity: "Human agency & dignity",
};

const OPTIONS: { key: ThreatPathwayId; titleKey: string; bodyKey: string; urlKey: string }[] = [
  { key: "power_concentration", titleKey: "option1Title", bodyKey: "option1Body", urlKey: "option1Url" },
  { key: "gradual_disempowerment", titleKey: "option2Title", bodyKey: "option2Body", urlKey: "option2Url" },
  { key: "catastrophic_pandemic", titleKey: "option3Title", bodyKey: "option3Body", urlKey: "option3Url" },
  { key: "critical_infrastructure_collapse", titleKey: "option4Title", bodyKey: "option4Body", urlKey: "option4Url" },
];

const defaultThreatCard = (): ThreatCardType => ({
  actor: "powerful_humans",
  scale: "medium_org",
  capabilities: [],
  motivations: [],
  targetAsset: "democracy_trust",
  attackPathway: "power_concentration",
  objective: "",
});

function ResourceLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="small">
      {children}
    </a>
  );
}

export function Unit3Screen() {
  const { state, actions } = useGameStore();
  const u3 = state.unit3;
  const card: ThreatCardType = u3.threatCard ?? defaultThreatCard();

  const pathwayChoice = u3.pathwayChoice ?? { chosenPathway: null, reasoningNote: "" };

  const updatePathway = (path: ThreatPathwayId) => {
    actions.updateUnit3({
      pathwayChoice: { ...pathwayChoice, chosenPathway: path },
    });
    actions.setThreatCard({ ...card, attackPathway: path });
  };

  const updateCard = (partial: Partial<ThreatCardType>) => {
    actions.setThreatCard({ ...card, ...partial });
  };

  return (
    <div className="unit3-screen">
      <h2 className="h4 mb-3">{en.units["3"].title}</h2>
      <p className="text-muted mb-4">{en.units["3"].intro}</p>

      <section className="card mb-4 border-2 rounded-3" aria-labelledby="section-map-threat">
        <div className="card-body">
          <h3 id="section-map-threat" className="h5 card-title mb-3">
            {t.sectionMapThreat}
          </h3>
          <p className="mb-2">{t.mapThreatPara1}</p>
          <p className="mb-3">{t.mapThreatPara2}</p>
          <p className="small text-muted mb-2">{t.reframingNote}</p>
          <h4 className="h6 mb-2">{t.resources}</h4>
          <ul className="list-unstyled small">
            <li className="mb-1">
              <ResourceLink href={t.resCatastrophicScenariosUrl}>{t.resCatastrophicScenarios}</ResourceLink>
            </li>
            <li className="mb-1">
              <ResourceLink href={t.resArtificialEscalationUrl}>{t.resArtificialEscalation}</ResourceLink>
            </li>
            <li className="mb-1">
              <ResourceLink href={t.resColdTakesUrl}>{t.resColdTakes}</ResourceLink>
            </li>
            <li className="mb-1">
              <ResourceLink href={t.resBioterrorismUrl}>{t.resBioterrorism}</ResourceLink>
            </li>
            <li>
              <ResourceLink href={t.resAiEnabledCoupsUrl}>{t.resAiEnabledCoups}</ResourceLink>
            </li>
          </ul>
        </div>
      </section>

      <section className="card mb-4 border-2 rounded-3" aria-labelledby="section-prioritising">
        <div className="card-body">
          <h3 id="section-prioritising" className="h5 card-title mb-3">
            {t.sectionPrioritising}
          </h3>
          <p className="mb-2">{t.prioritisingIntro}</p>
          <p className="small mb-3">{t.howCauseHarm}</p>
          <p className="small mb-2">
            <ResourceLink href={t.resSchneierUrl}>{t.resSchneier}</ResourceLink>
          </p>
          <p className="mb-2">{t.exerciseZoom}</p>
          <label htmlFor="threat-scenario-sentence" className="form-label small">
            {t.threatScenarioTemplate}
          </label>
          <textarea
            id="threat-scenario-sentence"
            className="form-control form-control-sm border-2 rounded-3 mb-2"
            rows={2}
            placeholder="The [ACTOR] with [CAPABILITY] and [MOTIVATION] attacks [ASSET] by [ATTACK PATHWAY] in order to [OBJECTIVE]."
            value={card.summary ?? ""}
            onChange={(e) => updateCard({ summary: e.target.value })}
          />
        </div>
      </section>

      <section className="mb-4" aria-labelledby="pathway-options-heading">
        <h3 id="pathway-options-heading" className="h5 mb-3">
          Threat pathway options
        </h3>
        {OPTIONS.map((opt) => (
          <div key={opt.key} className="card border-2 rounded-3 mb-3">
            <div className="card-body">
              <h4 className="h6 card-title">
                {(t as Record<string, string>)[opt.titleKey]}
              </h4>
              <p className="small mb-2">{(t as Record<string, string>)[opt.bodyKey]}</p>
              <p className="small mb-0">
                <ResourceLink href={(t as Record<string, string>)[opt.urlKey]}>
                  Read more
                </ResourceLink>
              </p>
            </div>
          </div>
        ))}
      </section>

      <section className="mb-4" aria-labelledby="asset-blocks-heading">
        <h3 id="asset-blocks-heading" className="h5 mb-2">
          {t.assetBlocks}
        </h3>
        <div className="row g-2 mb-3">
          {ASSET_IDS.map((id) => (
            <div key={id} className="col-12 col-sm-6 col-md-4">
              <BlockCard
                selected={card.targetAsset === id}
                onClick={() => updateCard({ targetAsset: id })}
                aria-label={`Protect: ${assetLabels[id]}`}
              >
                <span className="small fw-semibold">{assetLabels[id]}</span>
              </BlockCard>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-4" aria-labelledby="pathway-blocks-heading">
        <h3 id="pathway-blocks-heading" className="h5 mb-2">
          {t.pathways}
        </h3>
        <div className="row g-2">
          {PATHWAY_IDS.map((path) => (
            <div key={path} className="col-12 col-md-6">
              <BlockCard
                selected={card.attackPathway === path}
                onClick={() => updatePathway(path)}
                aria-label={`Pathway: ${pathwayLabels[path]}`}
              >
                <span className="fw-semibold">{pathwayLabels[path]}</span>
              </BlockCard>
            </div>
          ))}
        </div>
      </section>

      <section className="card border-2 rounded-3 mb-4" aria-labelledby="threat-card-heading">
        <div className="card-body">
          <h3 id="threat-card-heading" className="h5 card-title">
            {t.threatCardTitle}
          </h3>
          <p className="small text-muted mb-3">{t.realWorldNote}</p>
          <div className="mb-3">
            <label htmlFor="threat-objective" className="form-label">
              Objective (short)
            </label>
            <input
              id="threat-objective"
              type="text"
              className="form-control border-2 rounded-3"
              placeholder="e.g. Seize and keep power"
              value={card.objective}
              onChange={(e) => updateCard({ objective: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="threat-summary" className="form-label">
              {t.threatCardDescription}
            </label>
            <textarea
              id="threat-summary"
              className="form-control border-2 rounded-3"
              rows={4}
              placeholder="Describe the scenario: who is affected, how it could happen, and why it matters."
              value={card.summary ?? ""}
              onChange={(e) => updateCard({ summary: e.target.value })}
            />
          </div>
          <button
            type="button"
            className="btn btn-warning btn-lg"
            onClick={() => actions.setThreatCard({ ...card })}
            aria-label={t.saveThreatCard}
          >
            {t.saveThreatCard}
          </button>
        </div>
      </section>
    </div>
  );
}
