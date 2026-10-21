import { test, expect, type Page } from "@playwright/test";

const folio = (page: Page) => page.getByTestId("folio");
const SETTLE = { timeout: 8000 };

/** Opens the page and waits until the book (or, on small screens, the flow layout) is live. */
async function open(page: Page, path = "/wowflutter", layout: "book" | "flow" = "book") {
  await page.goto(path);
  const reader = page.locator(`.wf-reader[data-layout="${layout}"]`);
  await reader.waitFor();
  if (layout === "book") await page.locator('.wf-reader[data-ready="true"]').waitFor();
}

/** The leaves box (it moves when a cover is closed), so its centre is the spine. */
async function leavesBox(page: Page) {
  const box = await page.getByTestId("book").boundingBox();
  if (!box) throw new Error("book not laid out");
  return { spineX: box.x + box.width / 2, pageWidth: box.width / 2, midY: box.y + box.height / 2 };
}

test.describe("WOWFLUTTER book layout", () => {
  test.use({ viewport: { width: 1280, height: 720 } });

  test("opens on the cover alone, with the only h1 and nothing before it", async ({ page }) => {
    await open(page);
    await expect(folio(page)).toHaveText("P. 01 / 14");
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("The Sound of Rooms");
    await expect(page.getByRole("button", { name: /^← Prev|Prev$/ })).toBeDisabled();
  });

  test("only the pages on the open spread can be reached", async ({ page }) => {
    await open(page);
    await expect(page.locator("#p1")).not.toHaveAttribute("inert", /.*/);
    await expect(page.locator("#p4")).toHaveAttribute("inert", "");
    await page.getByRole("button", { name: "Next", exact: true }).click();
    await expect(folio(page)).toHaveText("P. 02–03 / 14", SETTLE);
    await expect(page.locator("#p1")).toHaveAttribute("inert", "");
    await expect(page.locator("#p3")).not.toHaveAttribute("inert", /.*/);
  });

  test("the arrow keys, Home and End turn the book, and the spread is announced", async ({ page }) => {
    await open(page);
    await page.keyboard.press("ArrowRight");
    await expect(folio(page)).toHaveText("P. 02–03 / 14", SETTLE);
    await expect(page.getByTestId("spread-announcement")).toContainText("Pages 2 and 3 of 14");
    await page.keyboard.press("ArrowRight");
    await expect(folio(page)).toHaveText("P. 04–05 / 14", SETTLE);
    await page.keyboard.press("ArrowLeft");
    await expect(folio(page)).toHaveText("P. 02–03 / 14", SETTLE);
    await page.keyboard.press("End");
    await expect(folio(page)).toHaveText("P. 14 / 14", SETTLE);
    await expect(page.getByTestId("tape-counter")).toHaveText("999");
    await page.keyboard.press("Home");
    await expect(folio(page)).toHaveText("P. 01 / 14", SETTLE);
    await expect(page.getByTestId("tape-counter")).toHaveText("000");
  });

  test("Enter on a focused button activates it once; the book does not steal the key", async ({ page }) => {
    await open(page);
    await page.getByRole("button", { name: "Next", exact: true }).focus();
    await page.keyboard.press("Enter");
    await expect(folio(page)).toHaveText("P. 02–03 / 14", SETTLE);
    await page.waitForTimeout(900);
    await expect(folio(page)).toHaveText("P. 02–03 / 14");
  });

  test("arrows inside the radio group choose a side and do not turn the page", async ({ page }) => {
    await open(page, "/wowflutter#p13");
    await expect(folio(page)).toHaveText("P. 12–13 / 14");
    await page.getByRole("radio", { name: /Side A/ }).focus();
    await page.keyboard.press("ArrowRight");
    await expect(page.getByRole("radio", { name: /Side B/ })).toBeChecked();
    await page.waitForTimeout(900);
    await expect(folio(page)).toHaveText("P. 12–13 / 14");
  });

  test("#pN opens the book at that page and leaves the address alone", async ({ page }) => {
    await open(page, "/wowflutter#p10");
    await expect(folio(page)).toHaveText("P. 10–11 / 14");
    await expect(page.getByRole("heading", { name: "Side A" })).toBeVisible();
    expect(new URL(page.url()).hash).toBe("#p10");

    await page.goto("about:blank");
    await open(page, "/wowflutter#p5");
    await expect(folio(page)).toHaveText("P. 04–05 / 14");
    expect(new URL(page.url()).hash).toBe("#p5");
  });

  test("a contents row turns the book across several leaves and updates the address", async ({ page }) => {
    await open(page, "/wowflutter#p3");
    await expect(folio(page)).toHaveText("P. 02–03 / 14");
    await page.getByRole("link", { name: /The catalogue/ }).click();
    await expect(folio(page)).toHaveText("P. 10–11 / 14", SETTLE);
    expect(new URL(page.url()).hash).toBe("#p10");
  });

  test("a top-bar link turns the book instead of scrolling the page", async ({ page }) => {
    await open(page);
    await page.getByRole("navigation", { name: "Pages" }).getByRole("link", { name: "Subscribe" }).click();
    await expect(folio(page)).toHaveText("P. 12–13 / 14", SETTLE);
    expect(await page.evaluate(() => window.scrollY)).toBe(0);
  });

  test("dragging the page lifts the leaf under the pointer and finishing the drag turns it", async ({ page }) => {
    await open(page);
    const { spineX, pageWidth, midY } = await leavesBox(page);
    const slot = page.locator('[data-leaf="0"]');

    await page.mouse.move(spineX + pageWidth * 0.8, midY);
    await page.mouse.down();
    await page.mouse.move(spineX + pageWidth * 0.25, midY, { steps: 8 });

    // Mid-drag: the leaf is in the air, partly turned, and on top of the stack.
    const turn = Number(await slot.evaluate((el) => (el as HTMLElement).style.getPropertyValue("--turn")));
    expect(turn).toBeGreaterThan(0.3);
    expect(turn).toBeLessThan(0.8);
    await expect(slot).toHaveAttribute("data-active", "true");
    await expect(page.getByTestId("tape-counter")).not.toHaveText("000");

    await page.mouse.move(spineX - pageWidth * 0.4, midY, { steps: 6 });
    await page.mouse.up();
    await expect(folio(page)).toHaveText("P. 02–03 / 14", SETTLE);
    await expect(slot).not.toHaveAttribute("data-active", "true");
  });

  test("a short drag settles back and the cover stays", async ({ page }) => {
    await open(page);
    const { spineX, pageWidth, midY } = await leavesBox(page);
    await page.mouse.move(spineX + pageWidth * 0.8, midY);
    await page.mouse.down();
    await page.mouse.move(spineX + pageWidth * 0.7, midY, { steps: 4 });
    await page.waitForTimeout(150); // a slow release, so it is position rather than a flick that decides
    await page.mouse.up();
    await page.waitForTimeout(900);
    await expect(folio(page)).toHaveText("P. 01 / 14");
    await expect(page.getByTestId("tape-counter")).toHaveText("000");
  });

  test("a leaf can be grabbed back while it is still in the air", async ({ page }) => {
    await open(page);
    await page.keyboard.press("ArrowRight");
    await page.waitForTimeout(110); // part-way through the turn
    const { spineX, pageWidth, midY } = await leavesBox(page);
    await page.mouse.move(spineX + pageWidth * 0.2, midY);
    await page.mouse.down();
    await page.mouse.move(spineX + pageWidth * 0.9, midY, { steps: 8 });
    await page.waitForTimeout(150);
    await page.mouse.up();
    await page.waitForTimeout(1200);
    await expect(folio(page)).toHaveText("P. 01 / 14");
  });

  test("pressing a page corner turns exactly one leaf", async ({ page }) => {
    await open(page);
    await page.locator('[data-corner="next"]').click();
    await expect(folio(page)).toHaveText("P. 02–03 / 14", SETTLE);
    await page.waitForTimeout(900);
    await expect(folio(page)).toHaveText("P. 02–03 / 14");
    await page.locator('[data-corner="prev"]').click();
    await expect(folio(page)).toHaveText("P. 01 / 14", SETTLE);
  });
});

test.describe("WOWFLUTTER subscribe form", () => {
  test.use({ viewport: { width: 1280, height: 720 } });

  test("rejects a bad email, then confirms a good one without any network request", async ({ page }) => {
    await open(page, "/wowflutter#p13");
    await page.getByRole("button", { name: "Get the next issue" }).last().click();
    await expect(page.getByText("Enter a valid email")).toBeVisible();
    await expect(page.locator("#wf-email")).toBeFocused();

    const requests: string[] = [];
    page.on("request", (r) => {
      if (!/\.(woff2?|png|webp|avif|svg|css|js)(\?|$)/.test(r.url())) requests.push(r.url());
    });
    await page.locator("#wf-email").fill("reader@yourroom.com");
    await page.getByRole("radio", { name: /Side B/ }).check();
    await page.getByRole("button", { name: "Get the next issue" }).last().click();
    await expect(page.getByText("You're on the list.")).toBeVisible();
    await expect(page.getByText("Issue 08 will arrive by email.")).toBeVisible();
    expect(requests).toEqual([]);
  });
});

test.describe("WOWFLUTTER on a phone", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("pages are a normal scroll: nothing is inert and no turning machinery shows", async ({ page }) => {
    await open(page, "/wowflutter", "flow");
    await expect(page.locator("[inert]")).toHaveCount(0);
    await expect(page.locator(".wf-reader[data-ready]")).toHaveCount(0);
    await expect(page.locator(".wf-bar")).toBeHidden();
    await expect(page.locator('[data-corner="next"]')).toBeHidden();
    // The turn engine never mounts, so the keys do nothing and the page keeps its scroll.
    await page.keyboard.press("ArrowRight");
    await page.keyboard.press("End");
    await expect(page.getByTestId("tape-counter")).toHaveText("000");
  });

  test("#pN scrolls to that page", async ({ page }) => {
    await open(page, "/wowflutter#p10", "flow");
    await page.waitForLoadState("networkidle");
    await expect(page.getByRole("heading", { name: "Side A" })).toBeInViewport();
  });

  test("the form works on a phone", async ({ page }) => {
    await open(page, "/wowflutter#p13", "flow");
    await page.locator("#wf-email").fill("reader@yourroom.com");
    await page.getByRole("button", { name: "Get the next issue" }).last().click();
    await expect(page.getByText("You're on the list.")).toBeVisible();
  });
});

test.describe("WOWFLUTTER with reduced motion", () => {
  test.use({ viewport: { width: 1280, height: 720 }, reducedMotion: "reduce" });

  test("turns are instant: no leaf is ever put in the air", async ({ page }) => {
    await open(page);
    await page.getByRole("button", { name: "Next", exact: true }).click();
    await expect(folio(page)).toHaveText("P. 02–03 / 14", { timeout: 400 });
    await expect(page.locator("[data-active]")).toHaveCount(0);
    await page.keyboard.press("End");
    await expect(folio(page)).toHaveText("P. 14 / 14", { timeout: 400 });
  });

  test("the leaf cannot be dragged", async ({ page }) => {
    await open(page);
    const { spineX, pageWidth, midY } = await leavesBox(page);
    await page.mouse.move(spineX + pageWidth * 0.8, midY);
    await page.mouse.down();
    await page.mouse.move(spineX - pageWidth * 0.4, midY, { steps: 8 });
    await expect(page.locator("[data-active]")).toHaveCount(0);
    await page.mouse.up();
    await page.waitForTimeout(300);
    await expect(folio(page)).toHaveText("P. 01 / 14");
  });
});
