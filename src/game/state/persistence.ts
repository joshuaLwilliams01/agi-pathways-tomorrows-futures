/**
 * LocalStorage load/save for game state.
 * Single key "agi-pathways-game-state".
 * Invalid or legacy state resets to createInitialGameState().
 */

import type { GameState } from "./gameState";
import { createInitialGameState } from "./gameState";

const STORAGE_KEY = "agi-pathways-game-state";

/** Detect new state shape (post-refactor). Legacy saves lack unit5.focus, unit3.pathwayChoice, etc. */
function isValidNewState(parsed: unknown): parsed is GameState {
  if (!parsed || typeof parsed !== "object") return false;
  const s = parsed as Record<string, unknown>;
  const meta = s.meta as Record<string, unknown> | undefined;
  if (!meta?.version || typeof s.currentUnit !== "number") return false;
  const u1 = s.unit1 as Record<string, unknown> | undefined;
  const u3 = s.unit3 as Record<string, unknown> | undefined;
  const u5 = s.unit5 as Record<string, unknown> | undefined;
  if (!u1 || !u3 || !u5) return false;
  // New Unit5 has .focus and .intervention; legacy has .interventionNotes, .shortTermPlan (string)
  if (!("focus" in u5) || !("intervention" in u5)) return false;
  // New Unit3 has .pathwayChoice and .assets
  if (!("pathwayChoice" in u3) || !("assets" in u3)) return false;
  return true;
}

export function loadGameState(): GameState {
  if (typeof window === "undefined") {
    return createInitialGameState();
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createInitialGameState();
    const parsed = JSON.parse(raw) as unknown;
    if (isValidNewState(parsed)) return parsed;
  } catch {
    // ignore
  }
  return createInitialGameState();
}

export function saveGameState(state: GameState): void {
  if (typeof window === "undefined") return;
  try {
    const toSave: GameState = {
      ...state,
      meta: {
        ...state.meta,
        updatedAt: new Date().toISOString(),
      },
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  } catch {
    // ignore
  }
}
