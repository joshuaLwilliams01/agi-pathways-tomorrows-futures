# AGI Pathways: Tomorrow's Futures

A web-based, sandbox-style strategy game about AI safety and governance. Players imagine futures worth protecting, explore pathways to harm, build defences, and create a simple action plan.

**Stack:** Next.js (App Router) + TypeScript + Bootstrap 5  
**Deployment:** Vercel  
**Author:** Joshua Williams (BlueDot Impact AGI Strategy Course capstone)

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Use **Start the game** to go to `/game`.

## Project structure

- `src/app/` – Next.js routes (landing `page.tsx`, game `game/page.tsx`)
- `src/game/state/` – Game state types, React Context store, localStorage persistence
- `src/game/components/` – Unit screens (Unit1–Unit5), Shared (PPPMeter, UnitNav), Hero
- `src/game/data/` – i18n (`en.json`), character cards, defence cards, interventions

## Game state

Progress is stored in the browser under `agi-pathways-game-state`. No login required. Reset via the **Reset game** button in the game navbar.

## Accessibility

Aim is WCAG 2.1 AA for key flows: keyboard navigation, visible focus, labels and ARIA where needed. Validate with [WAVE](https://wave.webaim.org/).

## License

Private / capstone project. See PRD.md for full product requirements.
