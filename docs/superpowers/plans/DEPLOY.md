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
| 2026-10-20 | 81b7e0d | Real images for all three; KŌJI food flight live with all 9 clips |

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

All scores above were measured with placeholder images.

### With the real images and KŌJI's clips (live, 2026-10-20)

| Template | Performance | Accessibility | Best practices | LCP | TBT | CLS |
|---|---|---|---|---|---|---|
| Orrery | 95 | 96 | 100 | 2.5 s | 130 ms | 0 |
| Cairn | 90 | 100 | 100 | 2.9 s | 180 ms | 0 |
| KŌJI | 88 | 93 | 100 | 3.3 s | 90 ms | 0 |

KŌJI first measured 66 locally with the clips in. Fixes: the flight engine mounts only when the flight is a viewport away (it fetched every clip at load), phones get 720p "-m" clips (39 MB → 17 MB), route dots got an aria-label, and the hero poster got fetchpriority="high". What remains on KŌJI is first paint: a 95 KB stylesheet and about 25 Japanese font slices share the slow connection with the hero image.
