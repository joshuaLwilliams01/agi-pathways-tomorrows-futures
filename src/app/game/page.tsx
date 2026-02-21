"use client";

import Link from "next/link";
import { GameStoreProvider, useGameStore } from "@/game/state/gameStore";
import { UnitNav } from "@/game/components/Shared/UnitNav";
import { PPPMeter } from "@/game/components/Shared/PPPMeter";
import { Unit1Screen } from "@/game/components/Unit1/Unit1Screen";
import { Unit2Screen } from "@/game/components/Unit2/Unit2Screen";
import { Unit3Screen } from "@/game/components/Unit3/Unit3Screen";
import { Unit4Screen } from "@/game/components/Unit4/Unit4Screen";
import { Unit5Screen } from "@/game/components/Unit5/Unit5Screen";
import en from "@/game/data/i18n/en.json";

function GameContent() {
  const { state, actions } = useGameStore();
  const unit = state.currentUnit;
  const pppScores =
    unit === 1
      ? state.unit1.pppPreferences
      : { people: 50, planet: 50, parity: 50 };

  const UnitComponent =
    unit === 1
      ? Unit1Screen
      : unit === 2
        ? Unit2Screen
        : unit === 3
          ? Unit3Screen
          : unit === 4
            ? Unit4Screen
            : Unit5Screen;

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold" href="/">
            {en.game.title}
          </Link>
          <span className="navbar-text small text-muted d-none d-md-inline">
            {en.game.unit} {unit}
          </span>
          <div className="d-flex gap-2">
            <button
              type="button"
              className="btn btn-outline-danger btn-sm"
              onClick={() => {
                if (typeof window !== "undefined" && window.confirm("Reset all progress?")) {
                  actions.resetGame();
                }
              }}
              aria-label={en.game.reset}
            >
              {en.game.reset}
            </button>
          </div>
        </div>
      </nav>

      <div className="container-fluid py-3">
        <div className="row">
          <div className="col-lg-8">
            <UnitNav />
            <UnitComponent />
          </div>
          <aside
            className="col-lg-4 mt-3 mt-lg-0"
            aria-label="Your priorities and progress"
          >
            <div className="card sticky-top">
              <div className="card-body">
                <h3 className="h6 card-title">{en.ppp.meterLabel}</h3>
                <PPPMeter scores={pppScores} />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}

export default function GamePage() {
  return (
    <GameStoreProvider>
      <GameContent />
    </GameStoreProvider>
  );
}
