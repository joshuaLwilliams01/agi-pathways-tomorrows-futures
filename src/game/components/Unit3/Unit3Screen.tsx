"use client";

/**
 * Unit 3 – Pathways to Harm.
 * Map the Threat Landscape, Prioritising pathways, Option 1–4, then Threat Blueprint builder.
 */

import { useGameStore } from "@/game/state/gameStore";
import type { ThreatCard as ThreatCardType, ThreatPathway } from "@/game/state/gameState";
import { EMPTY_THREAT_CARD } from "@/game/state/gameState";
import { BlockCard } from "@/game/components/Shared/BlockCard";
import en from "@/game/data/i18n/en.json";

const t = en.unit3;
const pathwayLabels: Record<ThreatPathway, string> = {
  power_concentration: t.powerConcentration,
  gradual_disempowerment: t.gradualDisempowerment,
  catastrophic_pandemics: t.catastrophicPandemics,
  critical_infrastructure: t.criticalInfrastructure,
};

const ASSET_OPTIONS = [
  "Democracy & elections",
  "Schools & education",
  "Hospitals & health",
  "Environment & climate",
  "Jobs & labour",
  "Critical infrastructure",
  "Privacy & safety",
  "Other (describe below)",
];

const OPTIONS = [
  { key: "power_concentration" as ThreatPathway, titleKey: "option1Title", bodyKey: "option1Body", urlKey: "option1Url" },
  { key: "gradual_disempowerment" as ThreatPathway, titleKey: "option2Title", bodyKey: "option2Body", urlKey: "option2Url" },
  { key: "catastrophic_pandemics" as ThreatPathway, titleKey: "option3Title", bodyKey: "option3Body", urlKey: "option3Url" },
  { key: "critical_infrastructure" as ThreatPathway, titleKey: "option4Title", bodyKey: "option4Body", urlKey: "option4Url" },
];

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
  const card = u3.threatCard ?? { ...EMPTY_THREAT_CARD };

  const updateCard = (partial: Partial<ThreatCardType>) => {
    actions.setThreatCard({ ...card, ...partial });
  };

  return (
    <div className="unit3-screen">
      <h2 className="h4 mb-3">{en.units["3"].title}</h2>
      <p className="text-muted mb-4">{en.units["3"].intro}</p>

      {/* Map the Threat Landscape */}
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

      {/* Prioritising Threat Pathways + Exercise */}
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
            value={u3.threatScenarioSentence ?? ""}
            onChange={(e) => actions.updateUnit3({ threatScenarioSentence: e.target.value })}
          />
        </div>
      </section>

      {/* Option 1–4: Pathway descriptions */}
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

      {/* Your Threat Blueprint: asset + pathway + form */}
      <section className="mb-4" aria-labelledby="asset-blocks-heading">
        <h3 id="asset-blocks-heading" className="h5 mb-2">
          {t.assetBlocks}
        </h3>
        <div className="row g-2 mb-3">
          {ASSET_OPTIONS.map((asset) => (
            <div key={asset} className="col-12 col-sm-6 col-md-4">
              <BlockCard
                selected={card.asset === asset}
                onClick={() => updateCard({ asset })}
                aria-label={`Protect: ${asset}`}
              >
                <span className="small fw-semibold">{asset}</span>
              </BlockCard>
            </div>
          ))}
        </div>
        <label htmlFor="threat-asset" className="form-label small text-muted">
          Or type your own:
        </label>
        <input
          id="threat-asset"
          type="text"
          className="form-control form-control-sm border-2 rounded-3 mb-3"
          placeholder="e.g. Local community, free press"
          value={ASSET_OPTIONS.includes(card.asset) ? "" : card.asset}
          onChange={(e) => updateCard({ asset: e.target.value })}
          aria-label={t.threatCardAsset}
        />
      </section>

      <section className="mb-4" aria-labelledby="pathway-blocks-heading">
        <h3 id="pathway-blocks-heading" className="h5 mb-2">
          {t.pathways}
        </h3>
        <div className="row g-2">
          {(Object.keys(pathwayLabels) as ThreatPathway[]).map((path) => (
            <div key={path} className="col-12 col-md-6">
              <BlockCard
                selected={card.pathway === path}
                onClick={() => updateCard({ pathway: path })}
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
            <label htmlFor="threat-title" className="form-label">
              Title (short)
            </label>
            <input
              id="threat-title"
              type="text"
              className="form-control border-2 rounded-3"
              placeholder="e.g. Centralised control of critical systems"
              value={card.title}
              onChange={(e) => updateCard({ title: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="threat-description" className="form-label">
              {t.threatCardDescription}
            </label>
            <textarea
              id="threat-description"
              className="form-control border-2 rounded-3"
              rows={4}
              placeholder="Describe the scenario: who is affected, how it could happen, and why it matters for People, Planet, or Parity."
              value={card.description}
              onChange={(e) => updateCard({ description: e.target.value })}
              aria-required="true"
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
