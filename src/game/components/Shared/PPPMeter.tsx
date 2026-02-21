"use client";

/**
 * Renders PPP (People, Planet, Parity) priorities as progress bars.
 * Used in game sidebar; supports keyboard and screen readers.
 */

import type { PPPScores } from "@/game/state/gameState";

const LABELS = {
  people: "People",
  planet: "Planet",
  parity: "Parity",
} as const;

const COLORS = {
  people: "primary",
  planet: "success",
  parity: "info",
} as const;

interface PPPMeterProps {
  /** Current PPP scores (0–100) */
  scores: PPPScores;
  /** Optional aria-label for the whole group */
  ariaLabel?: string;
}

export function PPPMeter({ scores, ariaLabel = "Your priorities: People, Planet, Parity" }: PPPMeterProps) {
  return (
    <div
      className="ppp-meter"
      role="group"
      aria-label={ariaLabel}
    >
      {(Object.keys(LABELS) as Array<keyof PPPScores>).map((key) => (
        <div key={key} className="mb-2">
          <label htmlFor={`ppp-${key}`} className="form-label small mb-0">
            {LABELS[key]} <span className="visually-hidden">({scores[key]}%)</span>
          </label>
          <div
            id={`ppp-${key}`}
            className={`progress bg-light`}
            role="progressbar"
            aria-valuenow={scores[key]}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${LABELS[key]}: ${scores[key]}%`}
          >
            <div
              className={`progress-bar bg-${COLORS[key]}`}
              style={{ width: `${Math.max(0, Math.min(100, scores[key]))}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
