# Standalone template exports

The 59 templates in `scripts/standalone/config.ts` (20 DOM/SVG templates, 22 gallery entries tagged 3D and 17 further interactive templates) export from their current page components. React, ReactDOM, motion/rendering libraries, CSS, fonts and local artwork are embedded in a single HTML file. No CDN, Next runtime, or site-origin asset requests are required.

## Regeneration

Build the site, then export one template or the complete supported set:

```sh
npm run build
npm run export:templates -- aftercart
npm run export:templates -- --all
npm run verify:exports -- --all
npm run export:templates -- --3d
npm run verify:exports -- --3d
npm run export:templates -- --remaining
npm run verify:exports -- --remaining
```

The exporter rejects stale template source, unsupported slugs, missing media and paths outside `public/` or `.next/`. Outputs go to `public/downloads/<slug>.html`; existing templates outside the supported set are untouched. The Waypoint-specific exporter remains available as `npm run export:waypoint`.

To verify a new generation before replacing public downloads:

```sh
npm run export:templates -- --all --output .openlanding-page/standalone-exports/staging
```

Set `STANDALONE_DIRECTORY=.openlanding-page/standalone-exports/staging` in the shell, then run `npm run verify:exports -- --all`. In PowerShell use `$env:STANDALONE_DIRECTORY='.openlanding-page/standalone-exports/staging'`. Remove that variable to test the public outputs.

## Verification

`verify:exports` adapts the existing template-specific Playwright suites to navigate real `file://` URLs, preserving their query strings and hashes, and runs them offline. It also checks each template for runtime/hydration errors, attempted HTTP requests, missing images, phone overflow, reduced motion, and readable content without JavaScript. Generated suites and reports stay under the ignored `.openlanding-page/standalone-exports/verification/` directory. `--smoke` runs just the shared checks.

For 3D entries, `--graphics-only` proves real visible presentation draws from the original scene, exercises on-demand renderers with authored controls, checks LUMEN's GLB load, and checks KŌJI's decoded/seeked video. Screenshots and frame evidence are attached to the report. These checks currently validate Chromium WebGL/Canvas and the source's WebGL fallback; hardware-specific native WebGPU behavior is preserved but not certified by this software-renderer run. Orrery is tagged 3D in the gallery but uses an SVG/CSS deck, so its deck behavior is checked instead. Outside that category, ASSEMBLAGE, NIGHTLINE and KINETIC also receive native WebGL checks, and WARP & WANDER receives a native Canvas2D check.

`STANDALONE_VERIFICATION_DIRECTORY` selects an isolated report/suite directory for parallel verification runs. Legacy HTTP asset preconditions become real filesystem checks, while media-rendering assertions remain. The server-only KEYTU `/cairn` redirect is explicitly skipped for file exports; the remaining navigation assertions run against downloaded files. ASSEMBLAGE runs with one worker to avoid software-GPU competition. Original image references are retained as `data-standalone-src`/`data-standalone-background` metadata alongside the embedded URLs.

Compare desktop and phone screenshots with the live page when changing layout, artwork or motion. Browser verification currently uses Chromium; verify additional browser engines and physical devices when relevant.

## How it works

- `scripts/standalone/export.ts` renders the original page with React SSR and bundles the same page for hydration with esbuild. The hydration wrapper uses `display: contents` to preserve body flex/grid layout, including WOWFLUTTER's desktop book.
- `document.ts` takes the compiled styles, font variables, document attributes, metadata, authored initialization scripts and no-JavaScript fallbacks from the production build. It preserves font preload hints from Next's prerender `.meta` HTTP headers as embedded font links, preventing first-paint font shifts. Next scripts and resource links are not copied.
- `assets.ts` embeds local CSS/font/media dependencies and rejects missing files, traversal and escaping symlinks.
- `source-assets.ts` adapts direct JavaScript loaders, Image/video assignments, fetch calls and in-world font inputs to the same embedded registry. Asset literals are parsed without treating source comments as dependencies.
- `next-adapters.ts` replaces the specific Link/Image/client-dynamic boundaries used by these pages. Model and clip bytes stay embedded; authored renderers, shaders, audio and state remain bundled from the original source.
- The shared JSX adapter resolves image, SVG and inline-style URLs identically during SSR and hydration. Generated responsive images use one high-resolution WebP per asset; responsive source variants are omitted in the single-file export to avoid embedding duplicate encodings.
- The asset registry keeps data URLs identical for SSR and initial hydration, then caches local Blob URLs after mounting so repeated scene interactions do not repeatedly parse large embedded media. Byte-identical assets share one embedded value.
- `runtime.ts` makes same-template links and history updates operate on the current downloaded file, preserving query/hash state and existing controls.

All local demo forms retain their current behavior; an export does not add a submission backend. TRUECUT's current video placeholders are preserved.

Some supplied image files have misleading extensions; the exporter detects their actual MIME type. Large JPEG artwork in SAVEPOINT, Synapxe and Xibalba is encoded as high-quality WebP in the export without changing source files. Media-heavy exports can still be large (up to about 90 MB). The gallery checks file availability with HEAD and lets the browser stream the download directly, avoiding a full JavaScript text/Blob copy.

After publishing newly verified files, set their `hasDownload` flags, include the HTML in `COPY_METADATA`, and run `npm run prebuild` to regenerate copy bundles. `npm run check` ensures download flags match files on disk. Downloads are generated artifacts; update their source components and regenerate them rather than editing their HTML manually.

## 3D rollout verification (2026-11-08)

All 22 current 3D-category downloads are enabled, bringing the gallery to 61 downloads out of 78 templates. The original 39 download files retain their SHA-256 hashes. Each published 3D HTML file matches the staged artifact tested offline.

The final staged runs passed 22 real graphics/model/video checks and 44 offline, responsive, reduced-motion and no-JavaScript checks. All 42 exporter-supported gallery downloads passed streamed SHA-256 comparisons, and the six gallery index and five gallery motion checks passed. The full unit suite passed 1,453 tests across 266 files; the production build, TypeScript, targeted ESLint and isolation/palette/media guards also passed. Evidence, screenshots and per-template media inventories are retained locally under `.openlanding-page/3d-exports/`.

These results cover the export checks and selected template interaction regressions. The entire legacy interaction suite is not certified as passing: some software-GPU animation timing checks exceeded their original budgets. Hardware-native WebGPU and browser engines other than Chromium remain outside this verification run.

## Remaining-template rollout (2026-11-08)

The remaining 17 templates now have verified single-file exports. All 78 gallery entries have an enabled HTML download. The previous 61 public HTML files are unchanged; each new public file matches its verified staged SHA-256 hash.

The source NOISE CLUB waveform bars now shrink to fit phone widths, including without JavaScript. WARP & WANDER uses its existing Pixelify Sans face through `next/font`, removing its runtime Google Fonts dependency. Original procedural audio, optional microphone behavior, games, CSS/SVG effects and authored placeholder media remain intact; HIYAS clips and mountain artwork are embedded.

Final artifact verification covers offline requests/images, phone layouts, reduced motion, no JavaScript, real graphics, forms, keyboard controls, audio scheduling, video decode/play/seek and page turns. The 16-template interaction run passed 188 cases with one explicit server-redirect skip. ASSEMBLAGE's ten interaction cases passed across isolated runs, together with its dedicated native-rendering and two offline/fallback checks. Its initial simultaneous software-GPU and one workshop startup runs failed; those timing failures and subsequent passing checks remain recorded in the local ledger. Hardware-native WebGPU, other browser engines and physical devices are outside this run.

All 17 new gallery downloads passed streamed SHA-256 comparisons, and all 11 gallery index/motion regressions passed. The final unit run passed 1,475 tests across 268 files; production build, TypeScript, targeted ESLint and project guards passed. Large-artifact unit tests used a temporary directory on the workspace volume. The largest new export is HIYAS at 89.84 MB.
