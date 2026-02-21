/**
 * LocalStorage load/save for game state.
 * MVP: single key "agi-pathways-game-state".
 */

import type { GameState } from "./gameState";
import { createInitialGameState } from "./gameState";

const STORAGE_KEY = "agi-pathways-game-state";

export function loadGameState(): GameState {
  if (typeof window === "undefined") {
    return createInitialGameState();
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return createInitialGameState();
    const parsed = JSON.parse(raw) as GameState;
    // Basic validation: ensure required keys exist
    if (
      parsed &&
      typeof parsed.currentUnit === "number" &&
      parsed.meta &&
      parsed.unit1 &&
      parsed.unit2 &&
      parsed.unit3 &&
      parsed.unit4 &&
      parsed.unit5
    ) {
      return parsed;
    }
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
        lastSaved: new Date().toISOString(),
      },
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  } catch {
    // ignore
  }
}
