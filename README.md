# spikey1335

A minimal, modern **Task Board** web app used to bootstrap and demonstrate the Cloud Agent
development environment for this repository.

> This app was scaffolded to give the repo something real to build, run, and demonstrate
> end-to-end. Replace it with your actual application whenever you're ready — the Cloud Agent
> environment config in `.cursor/environment.json` will keep working for any Vite/React project.

## Stack

- [Vite](https://vite.dev/) 8 (dev server + build)
- [React](https://react.dev/) 19 + TypeScript
- [oxlint](https://oxc.rs/docs/guide/usage/linter) for linting
- State persisted to `localStorage`

## Getting started

```bash
npm install     # install dependencies
npm run dev     # start the dev server at http://localhost:5173
```

## Scripts

| Command             | Description                                  |
| ------------------- | -------------------------------------------- |
| `npm run dev`       | Start the Vite dev server (HMR) on port 5173 |
| `npm run build`     | Type-check (`tsc -b`) and build for production |
| `npm run preview`   | Preview the production build on port 4173    |
| `npm run lint`      | Lint the codebase with oxlint                |
| `npm run typecheck` | Type-check without emitting output           |

## Project structure

```
src/
  App.tsx                    # App shell
  components/TaskBoard.tsx   # Add / complete / delete / filter tasks
  hooks/useLocalStorage.ts   # Persist state across reloads
  types.ts                   # Shared types
```

## Cloud Agent environment

`.cursor/environment.json` configures the Cloud Agent dev environment:

- `install` runs `npm ci` to install dependencies from the lockfile.
- A `dev` terminal runs `npm run dev` so the app is available while the agent works.
