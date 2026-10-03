---
doc: scope
status: approved
---

# Bill Floor Buddy

A tiny local web app that shows how much cash you still need for a fixed bill floor, and how much to set aside each day.

## The Unique Kernel
It turns a scary lump-sum cash goal ($2300 by Nov 30 2026) into an always-visible **remaining gap** and **daily needed** number, driven by the bills you actually owe — not a generic budget spreadsheet.

## Who It's For
Bradley Conger in Lubbock, TX — someone racing a hard cash deadline for bills/food/clothes. Today he juggles the number in his head or scattered notes; he needs one calm screen that answers “how much left, and how much today?”

## The Core Loop
Open the app → see goal, days left, remaining gap, daily needed → add or remove a bill → watch the gap and daily number update → come back tomorrow and check the daily target again.

## Inspiration & Identity
Calm money dashboard energy: dark slate background, soft mint accents for “on track,” warm amber for urgency. Dense but readable — more spreadsheet clarity than fintech flash. No stock-photo stock charts; just honest numbers.

## Why This Matters to the Learner
This is Bradley’s real Nov 30 cash floor. Building it with the Devpost Learn Skill Pack proves the plan-before-code habit on a problem that actually matters to him.

## What "Working" Looks Like
One browser page. Goal and deadline set. A short bill list. Big numbers for remaining gap and daily needed. Adding a $400 rent line visibly increases the daily target. Demo beat: enter three bills and watch daily needed jump — “oh, that’s what I need each day.”

## The POC Boundary
- Single local page, no accounts
- One cash goal + deadline
- Add / list / remove bills
- Live remaining gap + daily needed
- Persist in the browser (localStorage)

## Later
- Multiple goals, paycheck calendar, export CSV, mobile install (PWA)

## Explicitly Cut
- Auth / multi-user — demo must work with zero signup
- Bank sync / paid APIs — out of scope and cost
- Charts and categories — distracts from the kernel number
- Notifications — needs device permissions; not needed to prove the loop
