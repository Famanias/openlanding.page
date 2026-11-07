# Standalone template exports

The 20 templates in `scripts/standalone/config.ts` export from their current page components. React, ReactDOM, motion libraries, CSS, fonts and local artwork are embedded in a single HTML file. No CDN, Next runtime, or site-origin asset requests are required.

## Regeneration

Build the site, then export one template or the complete supported set:

```sh
npm run build
npm run export:templates -- aftercart
npm run export:templates -- --all
npm run verify:exports -- --all
```

The exporter rejects stale template source, unsupported slugs, missing media and paths outside `public/` or `.next/`. Outputs go to `public/downloads/<slug>.html`; existing templates outside the supported set are untouched. The Waypoint-specific exporter remains available as `npm run export:waypoint`.

To verify a new generation before replacing public downloads:

```sh
npm run export:templates -- --all --output .openlanding-page/standalone-exports/staging
```

Set `STANDALONE_DIRECTORY=.openlanding-page/standalone-exports/staging` in the shell, then run `npm run verify:exports -- --all`. In PowerShell use `$env:STANDALONE_DIRECTORY='.openlanding-page/standalone-exports/staging'`. Remove that variable to test the public outputs.

## Verification

`verify:exports` adapts the existing template-specific Playwright suites to navigate real `file://` URLs, preserving their query strings and hashes, and runs them offline. It also checks each template for runtime/hydration errors, attempted HTTP requests, missing images, phone overflow, reduced motion, and readable content without JavaScript. Generated suites and reports stay under the ignored `.openlanding-page/standalone-exports/verification/` directory. `--smoke` runs just the shared checks.

Compare desktop and phone screenshots with the live page when changing layout, artwork or motion. Browser verification currently uses Chromium; verify additional browser engines and physical devices when relevant.

## How it works

- `scripts/standalone/export.ts` renders the original page with React SSR and bundles the same page for hydration with esbuild.
- `document.ts` takes the compiled styles, font variables, document attributes, metadata, authored initialization scripts and no-JavaScript fallbacks from the production build. Next scripts and resource links are not copied.
- `assets.ts` embeds local CSS/font/media dependencies and rejects missing files, traversal and escaping symlinks.
- The shared JSX adapter resolves image, SVG and inline-style URLs identically during SSR and hydration. Generated responsive images use one high-resolution WebP per asset; responsive source variants are omitted in the single-file export to avoid embedding duplicate encodings.
- `runtime.ts` makes same-template links and history updates operate on the current downloaded file, preserving query/hash state and existing controls.

All local demo forms retain their current behavior; an export does not add a submission backend. TRUECUT's current video placeholders are preserved.

After publishing newly verified files, set their `hasDownload` flags, include the HTML in `COPY_METADATA`, and run `npm run prebuild` to regenerate copy bundles. `npm run check` ensures download flags match files on disk. Downloads are generated artifacts; update their source components and regenerate them rather than editing their HTML manually.
