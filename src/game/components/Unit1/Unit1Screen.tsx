"use client";

/**
 * Unit 1 – Racing to a Better Future.
 * My Future Week + World Welcome Party (societal sliders) + PPP preferences.
 * Updates unit1 state via useGameStore.
 */

import { useGameStore } from "@/game/state/gameStore";
import { PPPMeter } from "@/game/components/Shared/PPPMeter";
import en from "@/game/data/i18n/en.json";

const t = en.unit1;
const pppT = en.ppp;

export function Unit1Screen() {
  const { state, actions } = useGameStore();
  const u1 = state.unit1;

  const setPeople = (v: number) =>
    actions.updateUnit1({
      pppPreferences: { ...u1.pppPreferences, people: v },
    });
  const setPlanet = (v: number) =>
    actions.updateUnit1({
      pppPreferences: { ...u1.pppPreferences, planet: v },
    });
  const setParity = (v: number) =>
    actions.updateUnit1({
      pppPreferences: { ...u1.pppPreferences, parity: v },
    });

  return (
    <div className="unit1-screen">
      <h2 className="h4 mb-3">{en.units["1"].title}</h2>
      <p className="text-muted mb-4">{en.units["1"].intro}</p>

      <section className="card mb-4" aria-labelledby="my-future-heading">
        <div className="card-body">
          <h3 id="my-future-heading" className="h5 card-title">
            {t.myFutureWeek}
          </h3>
          <p className="small text-muted">{t.personalFuturePrompt}</p>
          <textarea
            className="form-control"
            rows={3}
            placeholder="e.g. I go to school, play with friends, help at home..."
            value={u1.personalFuture[0] ?? ""}
            onChange={(e) =>
              actions.updateUnit1({ personalFuture: [e.target.value] })
            }
            aria-label={t.personalFuturePrompt}
          />
        </div>
      </section>

      <section className="card mb-4" aria-labelledby="world-welcome-heading">
        <div className="card-body">
          <h3 id="world-welcome-heading" className="h5 card-title">
            {t.worldWelcomeParty}
          </h3>
          <p className="small text-muted mb-3">{t.societalSliders}</p>
          <div className="mb-2">
            <label htmlFor="ppp-people" className="form-label small">
              {pppT.people} — {t.peopleHint}
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
              {pppT.planet} — {t.planetHint}
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
              {pppT.parity} — {t.parityHint}
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
      </section>

      <section aria-label="Your priorities summary">
        <h3 className="h6 mb-2">{pppT.meterLabel}</h3>
        <PPPMeter scores={u1.pppPreferences} />
      </section>
    </div>
  );
}
