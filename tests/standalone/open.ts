import path from "node:path";
import { pathToFileURL } from "node:url";
import type { Page } from "@playwright/test";
import { selectSlugs } from "../../scripts/standalone/config";

/** Run the original interaction suites against real file origins, including query/hash state. */
export function openStandalone(page: Page, href: string, options?: Parameters<Page["goto"]>[1]) {
  const url = new URL(href, "http://localhost:3100");
  const [slug] = selectSlugs([url.pathname.replace(/^\//, "")]);
  const file = pathToFileURL(path.resolve(process.env.STANDALONE_DIRECTORY ?? "public/downloads", `${slug}.html`));
  file.search = url.search;
  file.hash = url.hash;
  return page.goto(file.href, options);
}
