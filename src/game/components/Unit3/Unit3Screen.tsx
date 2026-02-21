"use client";

/**
 * Unit 3 – Pathways to Harm.
 * Choose asset, pathway, and write a Threat Card. Updates unit3 state via useGameStore.
 */

import { useGameStore } from "@/game/state/gameStore";
import type { ThreatCard as ThreatCardType, ThreatPathway } from "@/game/state/gameState";
import { EMPTY_THREAT_CARD } from "@/game/state/gameState";
import en from "@/game/data/i18n/en.json";

const t = en.unit3;
const pathwayLabels: Record<ThreatPathway, string> = {
  power_concentration: t.powerConcentration,
  gradual_disempowerment: t.gradualDisempowerment,
  catastrophic_pandemics: t.catastrophicPandemics,
  critical_infrastructure: t.criticalInfrastructure,
};

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

      <section className="card mb-4" aria-labelledby="threat-card-heading">
        <div className="card-body">
          <h3 id="threat-card-heading" className="h5 card-title">
            {t.threatCardTitle}
          </h3>

          <div className="mb-3">
            <label htmlFor="threat-asset" className="form-label">
              {t.threatCardAsset}
            </label>
            <input
              id="threat-asset"
              type="text"
              className="form-control"
              placeholder="e.g. Democracy, schools, hospitals"
              value={card.asset}
              onChange={(e) => updateCard({ asset: e.target.value })}
              aria-required="true"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">{t.threatCardPathway}</label>
            <div className="d-flex flex-wrap gap-2" role="group" aria-label={t.pathways}>
              {(Object.keys(pathwayLabels) as ThreatPathway[]).map((path) => (
                <button
                  key={path}
                  type="button"
                  className={`btn btn-sm ${card.pathway === path ? "btn-primary" : "btn-outline-secondary"}`}
                  onClick={() => updateCard({ pathway: path })}
                  aria-pressed={card.pathway === path}
                >
                  {pathwayLabels[path]}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="threat-title" className="form-label">
              Title (short)
            </label>
            <input
              id="threat-title"
              type="text"
              className="form-control"
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
              className="form-control"
              rows={4}
              value={card.description}
              onChange={(e) => updateCard({ description: e.target.value })}
              aria-required="true"
            />
          </div>

          <button
            type="button"
            className="btn btn-primary"
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
