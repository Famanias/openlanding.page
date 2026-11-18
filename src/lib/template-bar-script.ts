import {
  TEMPLATE_BAR_DETAIL_PATH,
  TEMPLATE_BAR_GALLERY_PATH,
  TEMPLATE_BAR_HOST_TAG,
  TEMPLATE_BAR_STORAGE_KEY,
  TEMPLATE_PAGE_PATTERN,
} from "./template-bar";
import { runTemplateBar, type TemplateBarConfig } from "./template-bar-runtime";

/** slug → title only: the full registry carries every rebuild prompt and must never reach the browser. */
export function templateBarTitles(templates: readonly { slug: string; title: string }[]): Record<string, string> {
  return Object.fromEntries(templates.map(template => [template.slug, template.title]));
}

export function templateBarConfig(titles: Record<string, string>): TemplateBarConfig {
  return {
    titles,
    pathPattern: TEMPLATE_PAGE_PATTERN,
    detailPath: TEMPLATE_BAR_DETAIL_PATH,
    galleryPath: TEMPLATE_BAR_GALLERY_PATH,
    storageKey: TEMPLATE_BAR_STORAGE_KEY,
    hostTag: TEMPLATE_BAR_HOST_TAG,
  };
}

const BACKSLASH = String.fromCharCode(92);

/** JSON is valid JavaScript (U+2028/9 included since ES2019); escaping `<` means the payload can never close a <script>. */
function toScriptLiteral(value: unknown): string {
  return JSON.stringify(value).replaceAll("<", `${BACKSLASH}u003c`);
}

/** Source of `/olp-template-bar.js`: the self-contained runtime invoked with the config. */
export function buildTemplateBarScript(titles: Record<string, string>): string {
  return `/* openlanding.page live template info bar (not part of the template). */\n(${runTemplateBar.toString()})(window, ${toScriptLiteral(templateBarConfig(titles))});\n`;
}
