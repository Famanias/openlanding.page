# Deploy record

- Vercel project: `team-e2117dad/templateflow` (CLI account `famanias`)
- Production URL: https://templateflow-blond.vercel.app
  (`templateflow.vercel.app` is someone else's project)
- Deploy: `npx vercel deploy --prod --yes` from the repo root (`.vercelignore` excludes incoming assets and scratch dirs)

| Date | Commit | Notes |
|---|---|---|
| 2026-10-20 | Task 5 | Index + heavy-deps smoke; Next.js 16.4.2 builds on Vercel; `/` → 200 |
| 2026-10-20 | Task 9 | Orrery live at /orrery (placeholders until images arrive) → 200 |
| 2026-10-20 | Task 13 | Cairn live at /cairn (placeholders until images arrive) → 200 |
| 2026-10-20 | Task 18 | All three templates live; `/`, `/orrery`, `/cairn`, `/koji` → 200 |

## Lighthouse (mobile, simulated Slow 4G + 4× CPU, 2026-10-20)

| Template | Performance | Accessibility | Best practices | LCP | TBT | CLS |
|---|---|---|---|---|---|---|
| Orrery | 93 | 92 | 100 | 2.7 s | 200 ms | 0 |
| Cairn | 95 | 100 | 100 | 2.8 s | 130 ms | 0 |
| KŌJI | 89 | 93 | 100 | 2.9 s | 270 ms | 0.018 |

KŌJI first measured 31 (LCP 19.3 s, TBT 9.5 s). Fixes:
- 3D starts only after the page is idle on desktop, and on request ("View the dish in 3D") on phones or touch screens.
- The PMREM environment map was dropped.
- Japanese font slices are no longer preloaded (260 files / 3 MB → 24 files / 199 KB).

All scores were measured with placeholder images. Re-measure once the owner's images and clips are in.
