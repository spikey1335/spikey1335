---
doc: spec
status: approved
---

# Bill Floor Buddy — Technical Spec

## How This Works, In Plain Language
The browser shows one HTML page. A tiny Node server just serves that page (and its CSS/JS). All of the smart stuff — bills, goal, math — lives in the browser and is saved in localStorage so a refresh doesn’t wipe it. No database, no accounts, no paid APIs.

## The Core Journey Through the System
1. User runs `npm start` → Node serves `public/index.html`.
2. Browser loads `app.js`, which reads localStorage (or seeds defaults).
3. User edits goal/saved/deadline → `app.js` recalculates and re-renders hero numbers.
4. User submits a bill → list updates, totals refresh, state saved.
5. User removes a bill → same path.
6. Refresh → `app.js` reloads state from localStorage → same screen.
PRD ref: `prd.md > The Core Journey`.

## Stack
- **Node.js** 18+ (built-in `http` + `fs` only — no npm runtime deps required to serve)
- **Vanilla HTML/CSS/JS** in `public/`
- Rationale: zero install friction for judges/demo; proves one end-to-end loop without a framework tax.
- Docs: https://nodejs.org/docs/latest/api/http.html

## Where It Runs and How Someone Tries It
- Runtime: local Node process + any modern browser
- Start: `npm start` (serves http://127.0.0.1:3847)
- Demo recording: open that URL, add three sample bills, show gap + daily needed update
- Public GitHub repo required for Devpost; deployment optional

## Look and Feel
- Background `#0f172a`, cards `#1e293b`, text `#e2e8f0`
- Accent mint `#34d399`; warn amber `#fbbf24`
- Large mono-ish figures for money (`font-variant-numeric: tabular-nums`)
- Spacious cards, short labels, no icons-as-decoration

## Components

### `server.js`
Static file server for `public/`. Spec ref for start command.

### `public/index.html`
Markup for header, goal strip, bills panel.
PRD ref: `prd.md > Screens and Layout`.

### `public/styles.css`
Dark calm dashboard styling.
PRD ref: `prd.md > Look and Feel`.

### `public/app.js`
State, localStorage, render, calculations.
PRD ref: `prd.md > Features and Behavior`.

## Data Model
```
State {
  goal: number,          // default 2300
  deadline: "YYYY-MM-DD", // default "2026-11-30"
  saved: number,         // default 0
  bills: [{ id: string, name: string, amount: number }]
}
```
- Lives in `localStorage["bill-floor-buddy-v1"]` as JSON
- Updated on every successful edit; loaded on page start

## File Structure
```
bill-floor-buddy/
├── package.json
├── server.js
├── public/
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── devpost/
│   ├── scope.md
│   ├── prd.md
│   ├── spec.md
│   ├── checklist.md
│   └── app-map.html
├── LICENSE
├── README.md
└── .gitignore
```

## External Services and Dependencies
None. No API keys. No paid services.

## Important Failure Modes
- **Invalid amount / empty name** → inline form error; state unchanged
- **Corrupt localStorage JSON** → reset to defaults and show a quiet notice
- **Past deadline** → daysLeft = 0; daily needed = full remaining gap

## What Was Simplified and Why
- **Static + localStorage** instead of a database — proves the kernel without ops
- **One page** instead of multi-route SPA — demo fits in 60 seconds
- **No framework** instead of React — fewer moving parts for a POC

## Decisions and Open Issues
- Learner choice: local-only Node + vanilla JS for fastest honest demo
- Uncertainty cleared: remaining gap uses goal − saved; bills are the obligation checklist whose total is shown beside the goal for sanity
- No open blockers
