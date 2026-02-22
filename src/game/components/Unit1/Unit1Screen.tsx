"use client";

/**
 * Unit 1 – Future Bay: Launch Docks
 * 4 scenes: Story Dock → Life Boat Builder → World Ferry Builder → AGI Race Pier → Summary
 */

import {
  useGameStore,
} from "@/game/state/gameStore";
import {
  type Unit1SceneId,
  type DayOfWeek,
  type WeekBlockType,
  type SocietalDomain,
  type AgiActorId,
  type PlayerCharacter,
  type AvatarArchetype,
  createDefaultUnit1PersonalFuture,
  createDefaultUnit1SocietalFuture,
} from "@/game/state/gameState";
import { PPPMeter } from "@/game/components/Shared/PPPMeter";
import en from "@/game/data/i18n/en.json";

const t = en.unit1;

const DAYS: DayOfWeek[] = ["day1", "day2", "day3", "day4", "day5", "day6", "day7"];

const WEEK_BLOCK_OPTIONS: { value: WeekBlockType; label: string }[] = [
  { value: "family", label: t.weekBlockFamily },
  { value: "learning", label: t.weekBlockLearning },
  { value: "work_projects", label: t.weekBlockWork },
  { value: "rest_health", label: t.weekBlockRest },
  { value: "play_hobbies", label: t.weekBlockPlay },
  { value: "helping_others", label: t.weekBlockHelping },
];

const DOMAINS: { id: SocietalDomain; label: string }[] = [
  { id: "politics", label: t.domainPolitics },
  { id: "economy", label: t.domainEconomy },
  { id: "community", label: t.domainCommunity },
  { id: "technology", label: t.domainTechnology },
  { id: "environment", label: t.domainEnvironment },
];

const DOMAIN_LEVEL_LABELS: Record<1 | 2 | 3 | 4 | 5, string> = {
  1: t.domainLevelNeedsWork,
  2: t.domainLevelOkay,
  3: t.domainLevelGood,
  4: t.domainLevelGreat,
  5: t.domainLevelThriving,
};

const AGI_ACTORS: { id: AgiActorId; label: string }[] = [
  { id: "frontier_lab", label: t.actorFrontierLab },
  { id: "national_government", label: t.actorNationalGov },
  { id: "open_source_collective", label: t.actorOpenSource },
  { id: "big_tech_platform", label: t.actorBigTech },
  { id: "civil_society", label: t.actorCivilSociety },
];

const ARCHETYPES: { value: AvatarArchetype; label: string }[] = [
  { value: "dreamer", label: t.archetypeDreamer },
  { value: "builder", label: t.archetypeBuilder },
  { value: "navigator", label: t.archetypeNavigator },
];

/** Simple PPP from domain levels (1–5). People: politics, economy, community, tech. Planet: environment. Parity: politics, economy, tech. */
function computePPPFromDomains(
  domains: Record<SocietalDomain, { level: 1 | 2 | 3 | 4 | 5 }>
): { people: number; planet: number; parity: number } {
  const scale = 20; // 1–5 → 20–100
  const people =
    (domains.politics.level + domains.economy.level + domains.community.level + domains.technology.level) / 4 * scale;
  const planet = domains.environment.level * scale;
  const parity = (domains.politics.level + domains.economy.level + domains.technology.level) / 3 * scale;
  return {
    people: Math.round(people),
    planet: Math.round(planet),
    parity: Math.round(parity),
  };
}

export function Unit1Screen() {
  const { state, actions } = useGameStore();
  const u1 = state.unit1;
  const scene = u1.currentScene;

  const goTo = (next: Unit1SceneId) => {
    actions.updateUnit1({ currentScene: next });
  };

  // —— Scene 1: Story Dock ——
  if (scene === 1) {
    return (
      <div className="unit1-screen future-bay">
        <div className="card border-2 rounded-3 shadow-sm" style={{ background: "linear-gradient(135deg, #fef3c7 0%, #e0f2fe 100%)" }}>
          <div className="card-body py-5 px-4">
            <h2 className="h3 mb-4">{t.futureBayTitle}</h2>
            <h3 className="h5 mb-3">{t.storyDockTitle}</h3>
            <p className="mb-2">{t.storyDockPara1}</p>
            <p className="mb-2">{t.storyDockPara2}</p>
            <p className="mb-2">{t.storyDockPara3}</p>
            <p className="mb-4">{t.storyDockPara4}</p>
            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={() => actions.updateUnit1({ introSeen: true, currentScene: 2 })}
            >
              {t.storyDockCta}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // —— Scene 2: Life Boat Builder ——
  if (scene === 2) {
    const personal = u1.personalFuture ?? createDefaultUnit1PersonalFuture();
    const char = u1.character;

    return (
      <div className="unit1-screen future-bay">
        <h2 className="h4 mb-3">{t.lifeBoatTitle}</h2>
        <p className="text-muted mb-4">{t.lifeBoatPrompt}</p>

        <section className="card border-2 rounded-3 mb-4" aria-labelledby="character-creator">
          <div className="card-body">
            <h3 id="character-creator" className="h5 mb-3">{t.characterCreatorTitle}</h3>
            <div className="row g-2 mb-2">
              <div className="col-md-6">
                <label className="form-label small">{t.characterName}</label>
                <input
                  type="text"
                  className="form-control"
                  value={char?.name ?? ""}
                  onChange={(e) =>
                    actions.updateUnit1({
                      character: {
                        name: e.target.value,
                        nickname: char?.nickname,
                        archetype: char?.archetype ?? "dreamer",
                        colors: char?.colors ?? [],
                      },
                    })
                  }
                />
              </div>
              <div className="col-md-6">
                <label className="form-label small">{t.characterNickname}</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Optional"
                  value={char?.nickname ?? ""}
                  onChange={(e) =>
                    actions.updateUnit1({
                      character: {
                        name: char?.name ?? "",
                        nickname: e.target.value || undefined,
                        archetype: char?.archetype ?? "dreamer",
                        colors: char?.colors ?? [],
                      },
                    })
                  }
                />
              </div>
            </div>
            <div className="mb-2">
              <label className="form-label small">{t.characterArchetype}</label>
              <div className="d-flex flex-wrap gap-2">
                {ARCHETYPES.map((a) => (
                  <button
                    key={a.value}
                    type="button"
                    className={`btn btn-sm ${(char?.archetype ?? "dreamer") === a.value ? "btn-primary" : "btn-outline-secondary"}`}
                    onClick={() =>
                      actions.updateUnit1({
                        character: {
                          name: char?.name ?? "",
                          nickname: char?.nickname,
                          archetype: a.value,
                          colors: char?.colors ?? [],
                        },
                      })
                    }
                  >
                    {a.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="card border-2 rounded-3 mb-4" aria-label="Build your week">
          <div className="card-body">
            <p className="small text-muted mb-3">Drag a block type to each day and add a short note.</p>
            {DAYS.map((day, i) => (
              <div key={day} className="row align-items-center mb-3 border-bottom pb-2">
                <div className="col-12 col-md-2">
                  <label className="form-label small mb-0">{t.dayLabel} {i + 1}</label>
                </div>
                <div className="col-12 col-md-4">
                  <select
                    className="form-select form-select-sm"
                    value={personal.days[day].dominantBlock}
                    onChange={(e) => {
                      const next = { ...personal.days[day], dominantBlock: e.target.value as WeekBlockType };
                      actions.updateUnit1({
                        personalFuture: {
                          ...personal,
                          days: { ...personal.days, [day]: next },
                        },
                      });
                    }}
                  >
                    {WEEK_BLOCK_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>
                <div className="col-12 col-md-6">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder={t.dayNotePlaceholder}
                    value={personal.days[day].note}
                    onChange={(e) => {
                      const next = { ...personal.days[day], note: e.target.value };
                      actions.updateUnit1({
                        personalFuture: {
                          ...personal,
                          days: { ...personal.days, [day]: next },
                        },
                      });
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="d-flex justify-content-between">
          <button type="button" className="btn btn-outline-secondary" onClick={() => goTo(1)}>{t.back}</button>
          <button type="button" className="btn btn-primary" onClick={() => goTo(3)}>{t.saveAndContinue}</button>
        </div>
      </div>
    );
  }

  // —— Scene 3: World Ferry Builder ——
  if (scene === 3) {
    const societal = u1.societalFuture ?? createDefaultUnit1SocietalFuture();
    const ppp = computePPPFromDomains(societal.domains);

    return (
      <div className="unit1-screen future-bay">
        <h2 className="h4 mb-3">{t.worldFerryTitle}</h2>
        <p className="text-muted mb-4">{t.worldFerryIntro}</p>

        <section className="card border-2 rounded-3 mb-4" aria-label="Societal domains">
          <div className="card-body">
            {DOMAINS.map((d) => (
              <div key={d.id} className="mb-3">
                <label className="form-label small">{d.label}</label>
                <div className="d-flex align-items-center gap-2 flex-wrap">
                  {([1, 2, 3, 4, 5] as const).map((level) => (
                    <button
                      key={level}
                      type="button"
                      className={`btn btn-sm ${societal.domains[d.id].level === level ? "btn-success" : "btn-outline-secondary"}`}
                      onClick={() => {
                        const nextDomains = { ...societal.domains, [d.id]: { level, notes: societal.domains[d.id].notes } };
                        const nextPPP = computePPPFromDomains(nextDomains);
                        actions.updateUnit1({
                          societalFuture: {
                            domains: nextDomains,
                            pppScore: nextPPP,
                          },
                        });
                      }}
                    >
                      {level}: {DOMAIN_LEVEL_LABELS[level]}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="card border-2 rounded-3 mb-4" aria-label="People, Planet, Parity">
          <div className="card-body">
            <h3 className="h6 mb-2">{en.ppp.meterLabel}</h3>
            <PPPMeter scores={societal.pppScore} />
          </div>
        </section>

        <div className="d-flex justify-content-between">
          <button type="button" className="btn btn-outline-secondary" onClick={() => goTo(2)}>{t.back}</button>
          <button type="button" className="btn btn-primary" onClick={() => goTo(4)}>{t.saveAndContinue}</button>
        </div>
      </div>
    );
  }

  // —— Scene 4: AGI Race Pier ——
  if (scene === 4) {
    const choice = u1.agiActorChoice;

    return (
      <div className="unit1-screen future-bay">
        <h2 className="h4 mb-3">{t.agiRacePierTitle}</h2>
        <p className="text-muted mb-4">{t.agiRacePierPrompt}</p>

        <div className="row g-3 mb-4">
          {AGI_ACTORS.map((actor) => (
            <div key={actor.id} className="col-12 col-md-6 col-lg-4">
              <div
                className={`card border-2 rounded-3 h-100 ${choice?.selectedActorId === actor.id ? "border-primary bg-light" : ""}`}
                style={{ cursor: "pointer" }}
                onClick={() =>
                  actions.updateUnit1({
                    agiActorChoice: { selectedActorId: actor.id, notes: choice?.notes },
                  })
                }
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    actions.updateUnit1({
                      agiActorChoice: { selectedActorId: actor.id, notes: choice?.notes },
                    });
                  }
                }}
              >
                <div className="card-body">
                  <h4 className="h6 mb-0">{actor.label}</h4>
                  {choice?.selectedActorId === actor.id && (
                    <span className="badge bg-primary mt-2">{t.chooseThisPerspective}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-3">
          <label className="form-label">{t.actorReflectionPrompt}</label>
          <textarea
            className="form-control border-2 rounded-3"
            rows={3}
            value={choice?.notes ?? ""}
            onChange={(e) =>
              actions.updateUnit1({
                agiActorChoice: choice
                  ? { ...choice, notes: e.target.value }
                  : { selectedActorId: "frontier_lab", notes: e.target.value },
              })
            }
          />
        </div>

        <div className="d-flex justify-content-between">
          <button type="button" className="btn btn-outline-secondary" onClick={() => goTo(3)}>{t.back}</button>
          <button type="button" className="btn btn-primary" onClick={() => goTo(5)}>{t.saveAndContinue}</button>
        </div>
      </div>
    );
  }

  // —— Scene 5: Summary ——
  const actorLabel = AGI_ACTORS.find((a) => a.id === u1.agiActorChoice?.selectedActorId)?.label ?? "—";

  return (
    <div className="unit1-screen future-bay">
      <h2 className="h4 mb-3">{t.unit1SummaryTitle}</h2>

      <div className="card border-2 rounded-3 mb-3">
        <div className="card-body">
          <p className="mb-1"><strong>Character:</strong> {u1.character?.name ?? "—"} {u1.character?.nickname ? `(${u1.character.nickname})` : ""}</p>
          <p className="mb-1"><strong>Archetype:</strong> {u1.character?.archetype ?? "—"}</p>
        </div>
      </div>
      <div className="card border-2 rounded-3 mb-3">
        <div className="card-body">
          <p className="mb-1"><strong>Life Boat:</strong> Your future week ({u1.personalFuture ? "7 days" : "—"} planned)</p>
        </div>
      </div>
      <div className="card border-2 rounded-3 mb-3">
        <div className="card-body">
          <p className="mb-2"><strong>World Ferry:</strong> Your priorities (People, Planet, Parity)</p>
          {u1.societalFuture && <PPPMeter scores={u1.societalFuture.pppScore} />}
        </div>
      </div>
      <div className="card border-2 rounded-3 mb-4">
        <div className="card-body">
          <p className="mb-0"><strong>Chosen AGI actor:</strong> {actorLabel}</p>
        </div>
      </div>

      <div className="d-flex justify-content-between">
        <button type="button" className="btn btn-outline-secondary" onClick={() => goTo(4)}>{t.back}</button>
        <button
          type="button"
          className="btn btn-success"
          onClick={() => {
            actions.updateUnit1({ completed: true });
            actions.setCurrentUnit(2);
          }}
        >
          {t.continueToUnit2}
        </button>
      </div>
    </div>
  );
}
