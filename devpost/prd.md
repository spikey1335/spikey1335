---
doc: prd
status: approved
---

# Bill Floor Buddy — Product Requirements

A one-screen local cash-floor tracker for Bradley: enter bills, see remaining gap to $2300 by Nov 30 2026, and the daily amount still needed.
Source: `scope.md > The Unique Kernel`, `scope.md > The Core Loop`.

## The Core Journey
1. Open the app in a browser (local server).
2. See default goal **$2300** and deadline **Nov 30, 2026**, plus days remaining.
3. Optionally edit the goal amount or deadline.
4. Add a bill: name + amount due.
5. See the bill appear in the list; remaining gap and daily needed recalculate instantly.
6. Remove a paid/cancelled bill; numbers update.
7. Refresh the page — bills and goal settings are still there.
8. Success = knowing today’s daily number without mental math.

## Screens and Layout
One screen, three bands top-to-bottom:
1. **Header** — title + short tagline
2. **Goal strip** — goal $, deadline, days left, remaining gap, daily needed (hero numbers)
3. **Bills panel** — add form (name, amount) + list with remove buttons

No navigation. No second page.

## Look and Feel
- Dark slate background (`#0f172a`), card surfaces slightly lighter
- Accent: mint (`#34d399`) for positive/on-track numbers; amber (`#fbbf24`) when daily needed is high
- Typography: system UI / Inter-like sans; large tabular numbers for money
- Calm, dense, honest — no illustrations, no marketing fluff
- Copy tone: plain and direct (“Daily needed”, “Remaining gap”)

## Features and Behavior

### Goal strip
- Default goal: 2300 USD; default deadline: 2026-11-30
- Editable goal amount and deadline via inline fields; Save applies
- Days left = calendar days from today (America/Chicago sense: local browser date) through deadline inclusive of today as a day you can still earn
- Remaining gap = max(0, goal − sum of bill amounts) **wait**: re-read kernel

**Correct math (kernel):**
- Bills are amounts Bradley still needs to cover.
- **Total bills** = sum of entered bill amounts
- **Remaining gap** = max(0, cash goal − cash on hand). For the POC, “cash on hand” is an editable field defaulting to 0; bills inform what the goal must cover.
- Simpler POC framing agreed: the **cash goal** is the floor he must hit. **Bills** itemize what that floor is made of. **Remaining gap** = max(0, goal − saved). **Daily needed** = remaining gap ÷ max(1, days left).
- Bills list is the checklist of obligations; changing the goal or saved amount drives the hero math. Bill total is shown as a sanity check vs goal.

### Bills panel
- Fields: Bill name (text), Amount (number ≥ 0)
- Add appends to list; empty name or invalid amount blocked with inline message
- Each row: name, formatted $, Remove
- Empty state: “No bills yet — add rent, utilities, food…”

### Hero calculations
- `daysLeft` = max(0, floor((deadlineDate − todayDate) / 1 day) + 1) while before/on deadline; 0 after
- `remainingGap` = max(0, goal − saved)
- `dailyNeeded` = daysLeft > 0 ? remainingGap / daysLeft : remainingGap
- Display currency with 2 decimals

## States and Boundaries
- **First use** — defaults filled; empty bill list; saved = 0; gap = full goal
- **Normal use** — bills listed; numbers live
- **Empty bills** — hero math still works from goal/saved
- **Invalid input** — form shows short error; nothing added
- **Past deadline** — days left 0; daily needed shows full remaining gap (pay now)
- **Persistence** — goal, deadline, saved, bills stored in `localStorage` key `bill-floor-buddy-v1`
- **No auth** — single local user assumed

## Product Decisions
- localStorage only — zero setup for demo
- Saved-cash field included — otherwise remaining gap can’t move without editing the goal
- Bills are a checklist totaling against the goal (sanity), not a second math engine
- No categories — keeps the POC to one loop

## What We're Building
- Runnable local web app (Node static server)
- Goal / deadline / saved editors
- Bill add/list/remove
- Live remaining gap + daily needed
- Persistence across refresh
- README with one-line start command

## Deferred From the POC
- Accounts / sync — needs auth
- Recurring bills — complexity
- Paycheck planner — second feature

## Possible Later Enhancements
- CSV export, PWA install, multiple floors, reminder email

## Non-Goals
- Bank APIs — paid/fragile
- Multi-user — out of POC
- Native mobile apps — web is enough

## Open Questions
- None blocking; timezone = browser local date is fine for POC.
