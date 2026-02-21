"use client";

import en from "@/game/data/i18n/en.json";

export function Unit5Screen() {
  return (
    <div className="unit5-screen">
      <h2 className="h4 mb-3">{en.units["5"].title}</h2>
      <p className="text-muted">{en.units["5"].intro}</p>
      <p className="small text-muted mt-3">(Full content coming in Milestone 2)</p>
    </div>
  );
}
