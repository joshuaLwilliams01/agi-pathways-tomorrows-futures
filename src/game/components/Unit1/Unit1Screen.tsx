"use client";

/**
 * Unit 1 – Build Your Future.
 * Trailmakers-style: "build your week" + PPP priority blocks (tap to boost) + sliders to fine-tune.
 */

import { useGameStore } from "@/game/state/gameStore";
import { PPPMeter } from "@/game/components/Shared/PPPMeter";
import { BlockCard } from "@/game/components/Shared/BlockCard";
import en from "@/game/data/i18n/en.json";

const t = en.unit1;
const pppT = en.ppp;

const PPP_BOOST = 15;
const MAX_PPP = 100;

function clamp(v: number) {
  return Math.max(0, Math.min(MAX_PPP, v));
}

export function Unit1Screen() {
  const { state, actions } = useGameStore();
  const u1 = state.unit1;

  const setPeople = (v: number) =>
    actions.updateUnit1({
      pppPreferences: { ...u1.pppPreferences, people: clamp(v) },
    });
  const setPlanet = (v: number) =>
    actions.updateUnit1({
      pppPreferences: { ...u1.pppPreferences, planet: clamp(v) },
    });
  const setParity = (v: number) =>
    actions.updateUnit1({
      pppPreferences: { ...u1.pppPreferences, parity: clamp(v) },
    });

  const boost = (key: "people" | "planet" | "parity") => {
    const current = u1.pppPreferences[key];
    const next = clamp(current + PPP_BOOST);
    actions.updateUnit1({
      pppPreferences: { ...u1.pppPreferences, [key]: next },
    });
  };

  return (
    <div className="unit1-screen">
      <h2 className="h4 mb-3">{en.units["1"].title}</h2>
      <p className="text-muted mb-4">{en.units["1"].intro}</p>

      <section className="card mb-4 border-2 rounded-3" aria-labelledby="my-future-heading">
        <div className="card-body">
          <h3 id="my-future-heading" className="h5 card-title">
            {t.myFutureWeek}
          </h3>
          <p className="small text-muted">{t.personalFuturePrompt}</p>
          <textarea
            className="form-control border-2 rounded-3 mt-2"
            rows={3}
            placeholder="e.g. School, friends, family, hobbies, learning..."
            value={u1.personalFuture[0] ?? ""}
            onChange={(e) =>
              actions.updateUnit1({ personalFuture: [e.target.value] })
            }
            aria-label={t.personalFuturePrompt}
          />
        </div>
      </section>

      <section className="mb-4" aria-labelledby="world-welcome-heading">
        <h3 id="world-welcome-heading" className="h5 mb-2">
          {t.worldWelcomeParty}
        </h3>
        <p className="small text-muted mb-3">{t.tapToAdjust}</p>

        <div className="row g-3 mb-3">
          <div className="col-md-4">
            <BlockCard
              selected={u1.pppPreferences.people >= 60}
              onClick={() => boost("people")}
              aria-label={`Boost ${pppT.people} priority`}
            >
              <span className="fw-bold text-primary">{pppT.people}</span>
              <p className="small mb-0 mt-1 text-muted">{t.peopleHint}</p>
            </BlockCard>
          </div>
          <div className="col-md-4">
            <BlockCard
              selected={u1.pppPreferences.planet >= 60}
              onClick={() => boost("planet")}
              aria-label={`Boost ${pppT.planet} priority`}
            >
              <span className="fw-bold text-success">{pppT.planet}</span>
              <p className="small mb-0 mt-1 text-muted">{t.planetHint}</p>
            </BlockCard>
          </div>
          <div className="col-md-4">
            <BlockCard
              selected={u1.pppPreferences.parity >= 60}
              onClick={() => boost("parity")}
              aria-label={`Boost ${pppT.parity} priority`}
            >
              <span className="fw-bold text-info">{pppT.parity}</span>
              <p className="small mb-0 mt-1 text-muted">{t.parityHint}</p>
            </BlockCard>
          </div>
        </div>

        <div className="card border-2 rounded-3">
          <div className="card-body">
            <p className="small text-muted mb-3">{t.societalSliders}</p>
            <div className="mb-2">
              <label htmlFor="ppp-people" className="form-label small">
                {pppT.people} — {u1.pppPreferences.people}%
              </label>
              <input
                id="ppp-people"
                type="range"
                className="form-range"
                min={0}
                max={100}
                value={u1.pppPreferences.people}
                onChange={(e) => setPeople(Number(e.target.value))}
                aria-valuetext={`${u1.pppPreferences.people}%`}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="ppp-planet" className="form-label small">
                {pppT.planet} — {u1.pppPreferences.planet}%
              </label>
              <input
                id="ppp-planet"
                type="range"
                className="form-range"
                min={0}
                max={100}
                value={u1.pppPreferences.planet}
                onChange={(e) => setPlanet(Number(e.target.value))}
                aria-valuetext={`${u1.pppPreferences.planet}%`}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="ppp-parity" className="form-label small">
                {pppT.parity} — {u1.pppPreferences.parity}%
              </label>
              <input
                id="ppp-parity"
                type="range"
                className="form-range"
                min={0}
                max={100}
                value={u1.pppPreferences.parity}
                onChange={(e) => setParity(Number(e.target.value))}
                aria-valuetext={`${u1.pppPreferences.parity}%`}
              />
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Your build summary">
        <h3 className="h6 mb-2">{pppT.meterLabel}</h3>
        <PPPMeter scores={u1.pppPreferences} />
      </section>
    </div>
  );
}
