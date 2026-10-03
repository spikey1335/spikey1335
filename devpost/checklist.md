---
doc: checklist
status: approved
---

# Build Checklist

Build mode: fast

## Slices

- [x] **1. Serve a page and show default floor numbers**
  Becomes usable: `npm start` opens a page with $2300 goal, Nov 30 2026 deadline, remaining gap and daily needed.
  Why now: Proves scaffold + math path end to end.
  PRD ref: `prd.md > The Core Journey` (steps 1-2)
  Spec ref: `spec.md > Components`, `spec.md > File Structure`
  Build: Add package.json, server.js, public HTML/CSS/JS with defaults and hero math.
  Verify (mechanical): Server starts; GET / returns 200; hero shows non-empty numbers.
  Learner check: Fast-mode — agent verified defaults render.
  Commit: `Add local server and default floor hero`

- [x] **2. Edit goal/saved/deadline and recalculate**
  Becomes usable: Changing saved cash shrinks remaining gap and daily needed.
  Why now: Core kernel math must be interactive.
  PRD ref: `prd.md > Features and Behavior` (Goal strip)
  Spec ref: `spec.md > Data Model`
  Build: Goal form wired to state + re-render.
  Verify (mechanical): Smoke test updates saved and checks gap.
  Learner check: Covered in final review path.
  Commit: `Wire editable goal floor`

- [x] **3. Add and remove bills with persistence**
  Becomes usable: Bills appear in a list, can be removed, survive refresh via localStorage.
  Why now: Completes the end-to-end checklist loop.
  PRD ref: `prd.md > Features and Behavior` (Bills panel), `prd.md > States and Boundaries`
  Spec ref: `spec.md > Data Model`, `spec.md > Components`
  Build: Bill form, list, remove, localStorage save/load.
  Verify (mechanical): Smoke test adds bills; storage key present.
  Learner check: Covered in final review path.
  Commit: `Add bill checklist with localStorage`

## Hands-on Checkpoints

- [x] Early usable behavior explored — slices 1–3 in one fast-mode session
- [x] Final kick-the-tires exploration and feedback completed

## Final Review

- [x] Final review complete — feedback resolved and learner confirms ready to ship

## Code Tour and App Map

- [x] Learning activity complete — guided route, focused alternative, prior practice connected, or brief recap
- [x] Optional edit and transfer reflection addressed — offered/declined/already covered/not applicable as appropriate
- [x] `devpost/app-map.html` generated from finished code, checked, and shown, including a project-grounded practice to reuse

Activity and evidence: Fast-mode wrap-up tied remaining-gap math in `public/app.js` (`compute`) to the hero strip in `public/index.html`.
Route and stops: `server.js` → `public/index.html` → `public/app.js#compute` → localStorage key `bill-floor-buddy-v1`.
Edit outcome: not applicable (POC complete without extra edit exercise).
Reflection: already covered in scope motivation.
Activity mode: live app + static app map.

## Revisions

- Clarified remaining gap as goal − saved (bills are checklist/sanity), after first PRD draft mixed bill-sum into gap math.
