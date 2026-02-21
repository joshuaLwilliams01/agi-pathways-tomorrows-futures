"use client";

/**
 * Unit 5 – Start Contributing.
 * Choose Your Focus, Prioritise intervention, Go deep (research), Make a plan.
 */

import { useGameStore } from "@/game/state/gameStore";
import type { FocusSector } from "@/game/state/gameState";
import en from "@/game/data/i18n/en.json";

const t = en.unit5;

function ResourceLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="small">
      {children}
    </a>
  );
}

const defaultFocus = { sector: null as FocusSector | null, reasoningNote: "" };
const defaultIntervention = { chosenIntervention: undefined, research: undefined };

export function Unit5Screen() {
  const { state, actions } = useGameStore();
  const u5 = state.unit5;
  const focus = u5.focus ?? defaultFocus;
  const intervention = u5.intervention ?? defaultIntervention;

  return (
    <div className="unit5-screen">
      <h2 className="h4 mb-3">{en.units["5"].title}</h2>
      <p className="text-muted mb-4">{en.units["5"].intro}</p>

      <section className="card mb-4 border-2 rounded-3" aria-labelledby="section-choose-focus">
        <div className="card-body">
          <h3 id="section-choose-focus" className="h5 card-title mb-3">
            {t.sectionChooseFocus}
          </h3>
          <p className="mb-3">{t.chooseFocusIntro}</p>
          <ul className="list-unstyled small mb-0">
            <li className="mb-1">
              <ResourceLink href={t.resBecomePersonUrl}>{t.resBecomePerson}</ResourceLink>
            </li>
            <li className="mb-1">
              <ResourceLink href={t.resLongListUrl}>{t.resLongList}</ResourceLink>
            </li>
            <li className="mb-1">
              <ResourceLink href={t.resControlAiUrl}>{t.resControlAi}</ResourceLink>
            </li>
            <li className="mb-1">
              <ResourceLink href={t.resPauseAiUrl}>{t.resPauseAi}</ResourceLink>
            </li>
            <li className="mb-1">
              <ResourceLink href={t.resAisapUrl}>{t.resAisap}</ResourceLink>
            </li>
            <li>
              <ResourceLink href={t.resAisafetyUrl}>{t.resAisafety}</ResourceLink>
            </li>
          </ul>
        </div>
      </section>

      <section className="card mb-4 border-2 rounded-3" aria-labelledby="exercise-prioritise">
        <div className="card-body">
          <h3 id="exercise-prioritise" className="h6 card-title mb-2">
            {t.exercisePrioritise}
          </h3>
          <label htmlFor="intervention-notes" className="form-label small">
            Your chosen intervention and why (effective against your kill chain?)
          </label>
          <textarea
            id="intervention-notes"
            className="form-control border-2 rounded-3"
            rows={3}
            placeholder="e.g. Policy advocacy for compute governance; technical safety at a lab; field-building..."
            value={focus.reasoningNote ?? ""}
            onChange={(e) =>
              actions.updateUnit5({
                focus: { ...focus, reasoningNote: e.target.value },
              })
            }
          />
        </div>
      </section>

      <section className="card mb-4 border-2 rounded-3" aria-labelledby="section-go-deep">
        <div className="card-body">
          <h3 id="section-go-deep" className="h5 card-title mb-2">
            {t.sectionGoDeep}
          </h3>
          <p className="small mb-3">{t.exerciseResearch}</p>
          <label htmlFor="research-notes" className="form-label small">
            Your research notes (success, current status, organisations)
          </label>
          <textarea
            id="research-notes"
            className="form-control border-2 rounded-3"
            rows={4}
            placeholder="What does success look like? Who is already doing it? Which organisations could you join?"
            value={intervention.research?.currentStatus ?? ""}
            onChange={(e) =>
              actions.updateUnit5({
                intervention: {
                  ...intervention,
                  research: {
                    successPicture: intervention.research?.successPicture ?? "",
                    helpsAiGoWell: intervention.research?.helpsAiGoWell ?? "",
                    currentStatus: e.target.value,
                    orgsToWatch: intervention.research?.orgsToWatch ?? "",
                  },
                },
              })
            }
          />
        </div>
      </section>

      <section className="card mb-4 border-2 rounded-3" aria-labelledby="section-make-plan">
        <div className="card-body">
          <h3 id="section-make-plan" className="h5 card-title mb-3">
            {t.sectionMakePlan}
          </h3>
          <p className="mb-3">{t.makePlanIntro}</p>
          <div className="alert alert-light border rounded-3 small mb-3">
            {t.aspirationNote}
          </div>
          <div className="mb-3">
            <label htmlFor="short-term-plan" className="form-label">
              Short-term (3–6 months)
            </label>
            <textarea
              id="short-term-plan"
              className="form-control border-2 rounded-3"
              rows={2}
              placeholder="One or two concrete steps to get started..."
              value={u5.shortTermPlan[0]?.label ?? ""}
              onChange={(e) =>
                actions.updateUnit5({
                  shortTermPlan: [
                    {
                      id: "1",
                      label: e.target.value,
                      category: "learn",
                      timeFrame: "next_6_months",
                    },
                    ...u5.shortTermPlan.slice(1),
                  ],
                })
              }
            />
          </div>
          <div className="mb-3">
            <label htmlFor="mid-term-plan" className="form-label">
              Medium-term (1–3 years)
            </label>
            <textarea
              id="mid-term-plan"
              className="form-control border-2 rounded-3"
              rows={2}
              placeholder="Direction: skills, projects, relationships..."
              value={u5.longTermDirection?.skills ?? ""}
              onChange={(e) =>
                actions.updateUnit5({
                  longTermDirection: {
                    skills: e.target.value,
                    projects: u5.longTermDirection?.projects ?? "",
                    relationships: u5.longTermDirection?.relationships ?? "",
                  },
                })
              }
            />
          </div>
          <div>
            <label htmlFor="alignment-narrative" className="form-label">
              How your plan connects to your Threat Card and defence layer
            </label>
            <textarea
              id="alignment-narrative"
              className="form-control border-2 rounded-3"
              rows={3}
              placeholder="Link your intervention and role to the threat pathway and defence you chose..."
              value={u5.alignmentNarrative?.text ?? ""}
              onChange={(e) =>
                actions.updateUnit5({
                  alignmentNarrative: { text: e.target.value },
                })
              }
            />
          </div>
        </div>
      </section>
    </div>
  );
}
