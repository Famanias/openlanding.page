import { expect, test, type Page } from "@playwright/test";
import path from "node:path";
import { TEMPLATES } from "../../src/app/(index)/data/templates";
import { templateDetailPath } from "../../src/lib/catalog-routes";
import { TEMPLATE_BAR_STORAGE_KEY } from "../../src/lib/template-bar";

// React templates get the bar from src/instrumentation-client.ts; rooted is a static route.ts template.
const CASES = [
  { slug: "calder", kind: "react" },
  { slug: "orrery", kind: "react" },
  { slug: "rooted", kind: "static" },
] as const;

const SCREENSHOTS = path.resolve(".openlanding-page/template-bar");

function titleOf(slug: string): string {
  const template = TEMPLATES.find(t => t.slug === slug);
  if (!template) throw new Error(`Unknown template ${slug}`);
  return template.title;
}

/** Resolves once the bar script has run (it registers its mount function even when it shows nothing). */
async function waitForBarScript(page: Page) {
  await page.waitForFunction(() => typeof (window as { __olpTemplateBar?: unknown }).__olpTemplateBar === "function", null, { timeout: 30_000 });
}

for (const { slug, kind } of CASES) {
  test(`${slug} (${kind}) shows the template bar, links out, dismisses and stays dismissed`, async ({ page }) => {
    await page.goto(`/templates/${slug}`);
    const bar = page.getByRole("region", { name: "About this template" });
    await expect(bar).toBeVisible({ timeout: 30_000 });
    await expect(page.locator("olp-template-bar[data-olp-chrome]")).toHaveCount(1);
    await expect(bar).toContainText(`This is ${titleOf(slug)}, a free MIT landing page template from openlanding.page.`);
    await expect(bar.getByRole("link", { name: "Get the code" })).toHaveAttribute("href", templateDetailPath(slug));
    await expect(bar.getByRole("link", { name: "openlanding.page" })).toHaveAttribute("href", "/");
    // Overlay, never in flow: it cannot shift the template's layout.
    expect(await page.locator("olp-template-bar").evaluate(el => getComputedStyle(el).position)).toBe("fixed");

    await bar.getByRole("button", { name: "Dismiss template info" }).click();
    await expect(page.locator("olp-template-bar")).toHaveCount(0);
    expect(await page.evaluate(key => localStorage.getItem(key), TEMPLATE_BAR_STORAGE_KEY)).toBe("1");

    await page.reload();
    await waitForBarScript(page);
    await expect(page.locator("olp-template-bar")).toHaveCount(0);
  });
}

test("the bar is keyboard dismissable with Escape", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/templates/calder");
  const bar = page.getByRole("region", { name: "About this template" });
  await expect(bar).toBeVisible({ timeout: 30_000 });
  await bar.getByRole("button", { name: "Dismiss template info" }).focus();
  await page.keyboard.press("Escape");
  await expect(page.locator("olp-template-bar")).toHaveCount(0);
});

test("React template HTML never contains the bar; it is added in the browser only", async ({ request }) => {
  const html = await (await request.get("/templates/calder")).text();
  expect(html).not.toContain("data-olp-chrome");
  expect(html).not.toContain("olp-template-bar");
});

test("the bar is absent on the gallery and catalog pages", async ({ page }) => {
  for (const url of ["/", templateDetailPath("calder")]) {
    await page.goto(url);
    await page.waitForLoadState("load");
    await page.waitForTimeout(1000);
    await expect(page.locator("olp-template-bar"), url).toHaveCount(0);
    await expect(page.locator('script[src="/olp-template-bar.js"]'), url).toHaveCount(0);
  }
});

test("screenshots at desktop and phone width", async ({ page }) => {
  for (const [name, viewport] of [["desktop", { width: 1440, height: 900 }], ["phone", { width: 390, height: 844 }]] as const) {
    await page.setViewportSize(viewport);
    await page.goto("/templates/calder");
    const bar = page.getByRole("region", { name: "About this template" });
    await expect(bar).toBeVisible({ timeout: 30_000 });
    await page.waitForTimeout(600);
    const box = await page.locator("olp-template-bar").evaluate(el => el.shadowRoot!.querySelector(".bar")!.getBoundingClientRect().toJSON());
    expect(box.left).toBeGreaterThanOrEqual(0);
    expect(box.right).toBeLessThanOrEqual(viewport.width);
    await page.screenshot({ path: path.join(SCREENSHOTS, `calder-${name}.png`) });
    await page.goto("/templates/rooted");
    await expect(page.getByRole("region", { name: "About this template" })).toBeVisible({ timeout: 30_000 });
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(SCREENSHOTS, `rooted-${name}.png`) });
  }
});
