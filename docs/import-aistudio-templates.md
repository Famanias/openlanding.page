# Importing Google AI Studio Landing Page Templates

This guide explains how to import landing pages generated in Google AI Studio into `openlanding.page` using the automated CLI tool.

---

## Google AI Studio Prompt Guidelines

When asking Google AI Studio to build a landing page, include these two rules in your prompt:

```markdown
Important project rules:
1. Directives: Put 'use client'; at the very first line of src/App.tsx and all component files in src/components/.
2. Assets: Place all images, SVGs, and visual assets inside the public/assets/ folder and reference them via /assets/<filename>.
```

Google AI Studio's Vite preview will run completely normally, while keeping components and assets ready for instant import.

---

## 1-Command Import Workflow

Run the importer script directly using Bun or npm from the repo root:

```bash
bun run import-template <repo-name-or-path> [--slug <slug>] [--category <category>]
```

### Examples

**From a GitHub repository:**
```bash
# Using shorthand repo name under your GitHub account:
bun run import-template halo-desk-landing

# Using full GitHub repo path:
bun run import-template Famanias/riff-landing-revisions --slug riff

# Using a full URL:
bun run import-template https://github.com/Famanias/inest-vale-landing --slug inesvale
```

**From a local folder:**
```bash
bun run import-template ../path-to-downloaded-repo --slug mytemplate
```

### Options

| Option | Description |
| :--- | :--- |
| `--slug <slug>` | Override the target route slug (e.g. `halodesk`, `riff`). Defaults to normalized brand name or repo name. |
| `--title <title>` | Override the brand display name in the gallery. Defaults to the `<title>` tag from `index.html`. |
| `--category <category>` | Category for the gallery: `scroll-showcase` (default), `keynote-deck`, `3d-webgpu`, `editorial-magazine`, `conversion`. |
| `--dry-run` | Inspect and simulate the import without writing any files or editing registries. |
| `--force` | Overwrite existing template files if the target slug directory already exists. |
| `--no-register` | Copy and convert the files without updating the 6 gallery registration files. |

---

## What the Importer Automates

The importer handles all conversion steps in 2–3 seconds:

1. **Extracts Metadata & Google Fonts:** Parses `index.html` and `metadata.json` for titles, descriptions, body classes, and Google Fonts.
2. **Generates Next.js Layout:** Scaffolds `src/app/(<slug>)/layout.tsx` with `next/font/google` loaders and OpenGraph metadata.
3. **Creates Route Entry:** Creates `src/app/(<slug>)/<slug>/page.tsx` and adapts `src/App.tsx` into `<Slug>App.tsx` with `'use client';`.
4. **Copies & Adapts Components:** Recursively copies `components/`, `lib/`, `data/`, `utils/`, ensuring `'use client';` is present and rewriting `/assets/...` paths to `/templates/<slug>/...`.
5. **Migrates Tailwind Styles:** Converts `src/index.css` to `src/app/(<slug>)/<slug>/<slug>.css`.
6. **Migrates Assets:** Copies `public/assets/` into `public/templates/<slug>/` and sets up the gallery thumbnail `public/gallery/<slug>.webp`.
7. **Updates All 6 Gallery Registration Points:**
   - Adds slug to `TemplateSlug` and palette to `PALETTES` in `scripts/templates.config.ts`.
   - Adds entry to `COPY_METADATA` in `scripts/generate-copy-bundles.ts`.
   - Adds slug, prompt constant, and gallery record in `src/app/(index)/data/templates.ts`.
   - Updates template counts and slug lists in `src/app/(index)/data/templates.test.ts`.
   - Adds `/<slug>` route to `tests/e2e/templates.ts`.
   - Generates Playwright test `tests/e2e/<slug>.spec.ts`.
