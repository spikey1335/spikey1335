# Bill Floor Buddy — submission status

Updated: 2026-10-03 ~12:25 AM CT

| Item | Status |
|------|--------|
| Project path | `/workspace/stack-overnight/build-with-ai-basics/` |
| Skill pack installed | YES (`npx skills add challengepost/learn-ai-basics --all -y`) |
| scope.md / prd.md / spec.md | YES — `devpost/` (+ root symlinks) |
| App runs | YES — `npm start` → http://127.0.0.1:3847 |
| Smoke test | YES — `npm test` → SMOKE OK |
| Git | YES — local `main` commit `1c533c4` |
| Public GitHub repo | **BLOCKER** |
| Demo video | YES — `demo/bill-floor-buddy-walkthrough.mp4` (~86s) |
| Devpost registration | **REGISTER_STATUS=needs_computerUse** |

## Public repo BLOCKER (exact)

- `gh auth status`: not logged in (needs `gh auth login` or `GH_TOKEN`)
- Cursor GitHub MCP connected as **spikey1335** with push on existing repos, but **no `create_repository` tool**
- Cannot invent/scrape tokens from box secrets

### Unblock (one-time on auth'd machine)

```bash
gh auth login
cd /workspace/stack-overnight/build-with-ai-basics
gh repo create bill-floor-buddy --public --source=. --remote=origin --push
```

Then paste `https://github.com/<account>/bill-floor-buddy` into Devpost.

## REGISTER_STATUS=needs_computerUse

1. Open https://learn-ai-basics.devpost.com as bradleyconger22@gmail.com
2. Enter / Submit project
3. Use paste fields in `SUBMISSION.md`
4. Upload video to YouTube/Vimeo (public/unlisted) and link it
5. Attach public repo URL after push
6. Submit before Oct 26, 2026 5:00pm EDT

## Expected $

$1250 if 1st / $750 if 2nd / $500 if 3rd (winners ~Nov 4)
