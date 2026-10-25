# Template Gallery Architecture & Ordering

This document describes the structure, ordering rules, and registration lifecycle of templates in the openlandingpage gallery.

## Template Ordering: Reverse Chronological Order

The gallery displays templates in reverse chronological order: **the most recently created templates appear at the beginning of the gallery grid**, while earlier templates appear towards the end.

### Implementation

1. In `src/app/(index)/data/templates.ts`, `RAW_TEMPLATES` preserves the chronological order in which templates are created (append-only list from oldest to newest).
2. The public `TEMPLATES` export reverses `RAW_TEMPLATES`:
   ```ts
   export const TEMPLATES: TemplateItem[] = RAW_TEMPLATES.slice().reverse().map((template) => ({
     ...template,
     videoClip: template.videoClip ?? (/* fallback check */),
   }));
   ```
3. Whenever a new template is created and appended to `RAW_TEMPLATES`, it automatically appears at index `0` in `TEMPLATES`, positioning it at the very top-left of the gallery grid on the landing page.

## Registration Points for New Templates

When registering a newly built template, ensure the following steps are performed:

1. **`scripts/templates.config.ts`**: Register the slug in `TemplateSlug` and configure its palette tokens.
2. **`scripts/process-images.ts`**: Add the slug to the CLI allowed slugs list.
3. **`scripts/generate-copy-bundles.ts`**: Register metadata for prompt bundle generation.
4. **`src/app/(index)/data/templates.ts`**:
   - Add the slug to `TemplateSlug`.
   - Add `<SLUG>_PROMPT` containing PROMPT.md text.
   - Append the template item to `RAW_TEMPLATES`.
5. **`src/app/(index)/data/templates.test.ts`**:
   - Update the expected slug list (with the newest template at index 0) and total count.
6. **`tests/e2e/templates.ts`**: Append `"/<slug>"` to `TEMPLATE_PATHS`.
