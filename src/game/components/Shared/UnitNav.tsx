"use client";

/**
 * Unit navigation: previous/next and unit tabs.
 * Updates currentUnit in GameState via useGameStore.
 */

import { useGameStore } from "@/game/state/gameStore";

const UNIT_TITLES: Record<number, string> = {
  1: "Better Future",
  2: "AI Progress",
  3: "Pathways to Harm",
  4: "Defence in Depth",
  5: "Start Contributing",
};

export function UnitNav() {
  const { state, actions } = useGameStore();
  const current = state.currentUnit;
  const canPrev = current > 1;
  const canNext = current < 5;

  return (
    <nav aria-label="Game units">
      <div className="d-flex flex-wrap align-items-center gap-2 mb-3">
        <button
          type="button"
          className="btn btn-outline-primary btn-sm"
          onClick={() => actions.setCurrentUnit(current - 1)}
          disabled={!canPrev}
          aria-label="Previous unit"
        >
          Previous
        </button>
        <span className="text-muted small">
          Unit {current} of 5
        </span>
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={() => actions.setCurrentUnit(current + 1)}
          disabled={!canNext}
          aria-label="Next unit"
        >
          Next
        </button>
      </div>
      <ul className="nav nav-pills flex-wrap gap-1" role="tablist">
        {[1, 2, 3, 4, 5].map((unit) => (
          <li key={unit} className="nav-item" role="presentation">
            <button
              type="button"
              role="tab"
              aria-selected={current === unit}
              aria-label={`Unit ${unit}: ${UNIT_TITLES[unit]}`}
              className={`nav-link py-1 px-2 ${current === unit ? "active" : ""}`}
              onClick={() => actions.setCurrentUnit(unit)}
            >
              {unit}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
