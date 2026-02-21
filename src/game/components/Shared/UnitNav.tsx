"use client";

/**
 * Unit navigation: previous/next and zone tabs (sandbox builder style).
 */

import { useGameStore } from "@/game/state/gameStore";
import en from "@/game/data/i18n/en.json";

const ZONE_TITLES: Record<number, string> = {
  1: en.units["1"].shortTitle,
  2: en.units["2"].shortTitle,
  3: en.units["3"].shortTitle,
  4: en.units["4"].shortTitle,
  5: en.units["5"].shortTitle,
};

export function UnitNav() {
  const { state, actions } = useGameStore();
  const current = state.currentUnit;
  const canPrev = current > 1;
  const canNext = current < 5;

  return (
    <nav aria-label="Build zones">
      <div className="d-flex flex-wrap align-items-center gap-2 mb-3">
        <button
          type="button"
          className="btn btn-outline-primary btn-sm"
          onClick={() => actions.setCurrentUnit(current - 1)}
          disabled={!canPrev}
          aria-label="Previous zone"
        >
          Previous
        </button>
        <span className="text-muted small">
          Zone {current} of 5
        </span>
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={() => actions.setCurrentUnit(current + 1)}
          disabled={!canNext}
          aria-label="Next zone"
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
              aria-label={`Zone ${unit}: ${ZONE_TITLES[unit]}`}
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
