"use client";

/**
 * React Context store for game state.
 * useGameStore() returns [state, actions] for the game shell and unit screens.
 */

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";
import type {
  GameState,
  Unit1State,
  Unit2State,
  Unit3State,
  Unit4State,
  Unit5State,
  ThreatCard,
  UnitId,
} from "./gameState";
import { createInitialGameState } from "./gameState";
import { loadGameState, saveGameState } from "./persistence";

type GameActions = {
  setCurrentUnit: (unit: UnitId | number) => void;
  updateUnit1: (partial: Partial<Unit1State>) => void;
  updateUnit2: (partial: Partial<Unit2State>) => void;
  updateUnit3: (partial: Partial<Unit3State>) => void;
  updateUnit4: (partial: Partial<Unit4State>) => void;
  updateUnit5: (partial: Partial<Unit5State>) => void;
  setThreatCard: (card: ThreatCard | undefined) => void;
  resetGame: () => void;
};

const GameStoreContext = createContext<{
  state: GameState;
  actions: GameActions;
} | null>(null);

export function GameStoreProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<GameState>(createInitialGameState());

  // Hydrate from localStorage on mount (client-only)
  useEffect(() => {
    setState(loadGameState());
  }, []);

  // Persist on state change
  useEffect(() => {
    saveGameState(state);
  }, [state]);

  const setCurrentUnit = useCallback((unit: UnitId | number) => {
    const u = Math.max(1, Math.min(5, Number(unit))) as UnitId;
    setState((prev) => ({ ...prev, currentUnit: u }));
  }, []);

  const updateUnit1 = useCallback((partial: Partial<Unit1State>) => {
    setState((prev) => ({
      ...prev,
      unit1: { ...prev.unit1, ...partial },
    }));
  }, []);

  const updateUnit2 = useCallback((partial: Partial<Unit2State>) => {
    setState((prev) => ({
      ...prev,
      unit2: { ...prev.unit2, ...partial },
    }));
  }, []);

  const updateUnit3 = useCallback((partial: Partial<Unit3State>) => {
    setState((prev) => ({
      ...prev,
      unit3: { ...prev.unit3, ...partial },
    }));
  }, []);

  const updateUnit4 = useCallback((partial: Partial<Unit4State>) => {
    setState((prev) => ({
      ...prev,
      unit4: { ...prev.unit4, ...partial },
    }));
  }, []);

  const updateUnit5 = useCallback((partial: Partial<Unit5State>) => {
    setState((prev) => ({
      ...prev,
      unit5: { ...prev.unit5, ...partial },
    }));
  }, []);

  const setThreatCard = useCallback((card: ThreatCard | undefined) => {
    setState((prev) => ({
      ...prev,
      unit3: { ...prev.unit3, threatCard: card },
    }));
  }, []);

  const resetGame = useCallback(() => {
    setState(createInitialGameState());
  }, []);

  const actions: GameActions = useMemo(
    () => ({
      setCurrentUnit,
      updateUnit1,
      updateUnit2,
      updateUnit3,
      updateUnit4,
      updateUnit5,
      setThreatCard,
      resetGame,
    }),
    [
      setCurrentUnit,
      updateUnit1,
      updateUnit2,
      updateUnit3,
      updateUnit4,
      updateUnit5,
      setThreatCard,
      resetGame,
    ]
  );

  const value = useMemo(
    () => ({ state, actions }),
    [state, actions]
  );

  return (
    <GameStoreContext.Provider value={value}>
      {children}
    </GameStoreContext.Provider>
  );
}

export function useGameStore(): { state: GameState; actions: GameActions } {
  const ctx = useContext(GameStoreContext);
  if (!ctx) {
    throw new Error("useGameStore must be used within GameStoreProvider");
  }
  return ctx;
}
