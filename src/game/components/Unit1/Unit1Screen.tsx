"use client";

/**
 * Unit 1 – Racing to a Better Future.
 * Binds to new state: PersonalFutureEntry, SocietalFutureSnapshot, notes.
 */

import type { PPPScore, SocietalFutureSnapshot } from "@/game/state/gameState";
import { useGameStore } from "@/game/state/gameStore";
import { PPPMeter } from "@/game/components/Shared/PPPMeter";
import { BlockCard } from "@/game/components/Shared/BlockCard";
import en from "@/game/data/i18n/en.json";

const t = en.unit1;
const pppT = en.ppp;

const PPP_BOOST = 15;
const MAX = 100;
const clamp = (v: number) => Math.max(0, Math.min(MAX, v));

const defaultPPPScore: PPPScore = { people: 50, planet: 50, parity: 50 };

const defaultSocietalFuture = (): SocietalFutureSnapshot => ({
  politics: 50,
  economy: 50,
  technology: 50,
  environment: 50,
  community: 50,
  description: "",
  pppScore: { ...defaultPPPScore },
});

export function Unit1Screen() {
  const { state, actions } = useGameStore();
  const u1 = state.unit1;
  const societal = u1.societalFuture ?? defaultSocietalFuture();
  const ppp = societal.pppScore;

  const setPpp = (key: keyof PPPScore, value: number) => {
    actions.updateUnit1({
      societalFuture: {
        ...societal,
        pppScore: { ...ppp, [key]: clamp(value) },
      },
    });
  };
  const boost = (key: keyof PPPScore) =>
    setPpp(key, clamp(ppp[key] + PPP_BOOST));

  return (
    <div className="unit1-screen">
      <h2 className="h4 mb-3">{en.units["1"].title}</h2>
      <p className="text-muted mb-4">{en.units["1"].intro}</p>

      <section className="card mb-4 border-2 rounded-3" aria-labelledby="section-imagine">
        <div className="card-body">
          <h3 id="section-imagine" className="h5 card-title mb-3">
            {t.sectionImagine}
          </h3>
          <p className="mb-2">{t.sectionImaginePara1}</p>
          <p className="mb-2">{t.sectionImaginePara2}</p>
          <p className="mb-2">{t.sectionImaginePara3}</p>
          <p className="mb-3">{t.sectionImaginePara4}</p>
          <p className="small text-muted mb-3">{t.sectionImagineBullets}</p>
          <h4 className="h6 mb-2">{t.resources}</h4>
          <ul className="list-unstyled small">
            <li className="mb-1">
              <a href={t.resourcePreparingForLaunchUrl} target="_blank" rel="noopener noreferrer">
                {t.resourcePreparingForLaunch}
              </a>
            </li>
            <li>{t.resourceUtopiaPdf}</li>
          </ul>
        </div>
      </section>

      <section className="mb-4" aria-labelledby="section-what-future">
        <h3 id="section-what-future" className="h5 mb-3">
          {t.sectionWhatFuture}
        </h3>

        <div className="card border-2 rounded-3 mb-3">
          <div className="card-body">
            <h4 className="h6 card-title">{t.personalFutureHeading}</h4>
            <p className="small text-muted mb-2">{t.personalFutureIntro}</p>
            <p className="small mb-2">{t.personalFuturePrompt}</p>
            <textarea
              className="form-control border-2 rounded-3"
              rows={4}
              placeholder="Describe a week in your life, 20 years from now..."
              value={u1.personalFuture?.summary ?? ""}
              onChange={(e) =>
                actions.updateUnit1({
                  personalFuture: {
                    ageInFuture: u1.personalFuture?.ageInFuture ?? 20,
                    summary: e.target.value,
                  },
                })
              }
              aria-label={t.personalFuturePrompt}
            />
          </div>
        </div>

        <div className="card border-2 rounded-3 mb-3">
          <div className="card-body">
            <h4 className="h6 card-title">{t.societalFutureHeading}</h4>
            <p className="small text-muted mb-2">{t.societalFutureIntro}</p>
            <p className="small mb-3">{t.societalFuturePrompt}</p>
            <p className="small text-muted mb-2">{t.tapToAdjust}</p>
            <div className="row g-2 mb-3">
              <div className="col-md-4">
                <BlockCard
                  selected={ppp.people >= 60}
                  onClick={() => boost("people")}
                  aria-label={`Boost ${pppT.people} priority`}
                >
                  <span className="fw-bold text-primary">{pppT.people}</span>
                  <p className="small mb-0 mt-1 text-muted">{t.peopleHint}</p>
                </BlockCard>
              </div>
              <div className="col-md-4">
                <BlockCard
                  selected={ppp.planet >= 60}
                  onClick={() => boost("planet")}
                  aria-label={`Boost ${pppT.planet} priority`}
                >
                  <span className="fw-bold text-success">{pppT.planet}</span>
                  <p className="small mb-0 mt-1 text-muted">{t.planetHint}</p>
                </BlockCard>
              </div>
              <div className="col-md-4">
                <BlockCard
                  selected={ppp.parity >= 60}
                  onClick={() => boost("parity")}
                  aria-label={`Boost ${pppT.parity} priority`}
                >
                  <span className="fw-bold text-info">{pppT.parity}</span>
                  <p className="small mb-0 mt-1 text-muted">{t.parityHint}</p>
                </BlockCard>
              </div>
            </div>
            <div className="mb-2">
              <label htmlFor="ppp-people" className="form-label small">
                {pppT.people} — {ppp.people}%
              </label>
              <input
                id="ppp-people"
                type="range"
                className="form-range"
                min={0}
                max={100}
                value={ppp.people}
                onChange={(e) => setPpp("people", Number(e.target.value))}
                aria-valuetext={`${ppp.people}%`}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="ppp-planet" className="form-label small">
                {pppT.planet} — {ppp.planet}%
              </label>
              <input
                id="ppp-planet"
                type="range"
                className="form-range"
                min={0}
                max={100}
                value={ppp.planet}
                onChange={(e) => setPpp("planet", Number(e.target.value))}
                aria-valuetext={`${ppp.planet}%`}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="ppp-parity" className="form-label small">
                {pppT.parity} — {ppp.parity}%
              </label>
              <input
                id="ppp-parity"
                type="range"
                className="form-range"
                min={0}
                max={100}
                value={ppp.parity}
                onChange={(e) => setPpp("parity", Number(e.target.value))}
                aria-valuetext={`${ppp.parity}%`}
              />
            </div>
            <label htmlFor="societal-notes" className="form-label small">
              Your notes (politics, economy, community, tech, environment)
            </label>
            <textarea
              id="societal-notes"
              className="form-control form-control-sm border-2 rounded-3"
              rows={2}
              placeholder="What would the world look like if you felt pride welcoming 2.7 billion new people?"
              value={societal.description}
              onChange={(e) =>
                actions.updateUnit1({
                  societalFuture: { ...societal, description: e.target.value },
                })
              }
              aria-label="Notes on societal future"
            />
          </div>
        </div>

        <div aria-label="Your priorities summary">
          <h4 className="h6 mb-2">{pppT.meterLabel}</h4>
          <PPPMeter scores={ppp} />
        </div>
      </section>

      <section className="card mb-4 border-2 rounded-3" aria-labelledby="section-steering">
        <div className="card-body">
          <h3 id="section-steering" className="h5 card-title mb-3">
            {t.sectionSteering}
          </h3>
          <p className="mb-2">{t.steeringPara1}</p>
          <p className="mb-3">{t.steeringPara2}</p>
          <h4 className="h6 mb-2">{t.resources}</h4>
          <ul className="list-unstyled small">
            <li className="mb-1">
              <a href={t.resourceDynamismVsStasisUrl} target="_blank" rel="noopener noreferrer">
                {t.resourceDynamismVsStasis}
              </a>
            </li>
            <li className="mb-1">
              <a href={t.resourceArchiveUrl} target="_blank" rel="noopener noreferrer">
                Archive (archive.ph)
              </a>
            </li>
            <li>
              <a href={t.resourceRandSeekingStabilityUrl} target="_blank" rel="noopener noreferrer">
                {t.resourceRandSeekingStability}
              </a>
            </li>
          </ul>
        </div>
      </section>

      <section className="card mb-4 border-2 rounded-3" aria-labelledby="section-characters">
        <div className="card-body">
          <h3 id="section-characters" className="h5 card-title mb-3">
            {t.sectionCharacters}
          </h3>
          <p className="mb-2">{t.charactersInstruction}</p>
          <p className="small text-muted mb-3">{t.charactersNote}</p>
          <p className="mb-3">
            <a href={t.characterCardsUrl} target="_blank" rel="noopener noreferrer" className="fw-semibold">
              {t.characterCardsLinkText}
            </a>
          </p>
          <label htmlFor="character-notes" className="form-label">
            Your 2–3 paragraphs
          </label>
          <textarea
            id="character-notes"
            className="form-control border-2 rounded-3"
            rows={6}
            placeholder={t.characterNotesPlaceholder}
            value={u1.notes ?? ""}
            onChange={(e) => actions.updateUnit1({ notes: e.target.value })}
            aria-label="Character motivations, capabilities, and pressures"
          />
        </div>
      </section>
    </div>
  );
}
