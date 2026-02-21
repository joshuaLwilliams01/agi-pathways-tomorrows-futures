# Product Requirements Document

**Title:** AGI Pathways: Tomorrow's Futures  
**Type:** Web-based, sandbox-style strategy game  
**Tech:** Next.js (App Router) + TypeScript + Bootstrap 5  
**Deployment:** Vercel, with public code on GitHub, dev-friendly for Cursor  

---

## 1. Product Overview

**AGI Pathways: Tomorrow's Futures** is a web-based strategy game inspired by BlueDot Impact's AGI Strategy course. Players shape the future of AGI by creating safety policies, simulating risks, and developing action plans for AI safety and governance.

**Disclaimer:** This is an independent capstone project by **Joshua Williams** for the BlueDot Impact AGI Strategy Course; it is **not associated with BlueDot Impact or its staff**.

## 2. Core Game Units (MVP)

1. **Racing to a Better Future** – Personal/societal futures, PPP sliders  
2. **Drivers of AI Progress** – AI triad, scaling, timelines  
3. **Pathways to Harm** – Assets, threat pathways, Threat Card  
4. **Defence in Depth** – Strategy camps, LayerMap, focal plan  
5. **Start Contributing** – Intervention, role, action plan  

## 3. Tech Stack

- **Frontend:** Next.js (App Router) + React + TypeScript  
- **Styles:** Bootstrap 5 + globals.css  
- **State:** React Context + useGameStore  
- **Persistence:** localStorage (key: `agi-pathways-game-state`)  
- **Hosting:** Vercel  

## 4. File Structure

```
src/
  app/
    layout.tsx
    page.tsx          # landing
    game/page.tsx     # game shell
  game/
    state/
      gameState.ts
      gameStore.ts
      persistence.ts
    components/
      Hero/, Unit1–Unit5/, Shared/
    data/
      i18n/en.json
      characterCards.json, defenceCards.json, interventions.json
```

## 5. Roadmap

- **Milestone 1 (MVP):** Landing, game shell, Unit 1 + minimal Unit 3, localStorage, en.json, basic accessibility  
- **Milestone 2:** Full Units 1–3, PPP viz, Unit 4 defence placement, Unit 5 intervention, one-page summary export  
- **Milestone 3:** Complete Units 4–5, Kid Mode, Weglot (2+ languages), facilitator mode  

Full PRD details (personas, UX, accessibility, i18n) are in the original product requirements.
