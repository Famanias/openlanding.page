import { test, expect } from "@playwright/test";

test("missing gallery captures recover to the registered preview after hydration", async ({ page }) => {
  await page.route("**/gallery/cullet.webp", (route) => route.fulfill({ status: 404, body: "Missing" }));
  await page.goto("/");
  const image = page.locator('article:has(h3 a[href="/cullet"]) img');
  await image.scrollIntoViewIfNeeded();
  await expect(image).toHaveAttribute("src", "/templates/cullet/preview-1600.webp");
  await expect.poll(() => image.evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(0);
});

test("sort choices hydrate from URLs, preserve filter resets and omit defaults", async ({ page }) => {
  await page.goto("/");
  const sort = page.getByRole("combobox", { name: "Sort by" });
  await expect(sort).toHaveValue("date-desc");
  await expect(page.locator("article h3").first()).toHaveText("LOWTIDE");
  await sort.selectOption("date-asc");
  await expect(page).toHaveURL(/dir=asc/);
  await expect(page.locator("article h3").first()).toHaveText("Orrery");
  await page.reload();
  await expect(sort).toHaveValue("date-asc");
  await page.getByRole("searchbox").fill("missing template");
  await page.getByRole("button", { name: "Reset filters", exact: true }).click();
  await expect(sort).toHaveValue("date-asc");
  await sort.selectOption("date-desc");
  expect(new URL(page.url()).search).toBe("");
});

test("likes sort reconciles late counts with latest-date ties", async ({ page }) => {
  let release!: () => void;
  const pending = new Promise<void>((resolve) => { release = resolve; });
  await page.route("**/api/votes", async (route) => {
    await pending;
    await route.fulfill({ json: { orrery: { up: 25, down: 2 }, koji: { up: 5, down: 0 } } });
  });
  await page.goto("/?sort=likes");
  await expect(page.locator("article h3").first()).toHaveText("LOWTIDE");
  release();
  await expect(page.locator("article h3").first()).toHaveText("Orrery");
  await page.getByRole("combobox", { name: "Sort by" }).selectOption("likes-asc");
  await expect(page.locator("article h3").first()).toHaveText("LOWTIDE");
});

test("server votes are final and restored when localStorage is cleared", async ({ page, context }) => {
  await page.goto("/?q=orrery");
  const card = page.locator("article");
  const like = card.getByRole("button", { name: /^Like Orrery/ });
  await expect(like).toBeEnabled();
  await like.click();
  await expect(card.getByRole("button", { name: /^You liked Orrery/ })).toBeDisabled();
  await expect(card.getByRole("button", { name: /^Dislike Orrery/ })).toBeDisabled();
  const cookie = (await context.cookies()).find((cookie) => cookie.name === "olp_vid");
  expect(cookie?.httpOnly).toBe(true);
  expect(cookie?.secure).toBe(true);
  const replay = await context.request.post("/api/votes/orrery", {
    headers: { Origin: new URL(page.url()).origin }, data: { dir: "down" },
  });
  expect(await replay.json()).toMatchObject({ accepted: false, myVote: "up" });
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await expect(card.getByRole("button", { name: /^You liked Orrery/ })).toBeDisabled();
  await expect(card.getByRole("button", { name: /^Dislike Orrery/ })).toBeDisabled();
});

test("failed optimistic votes roll back and can be retried", async ({ page }) => {
  await page.route("**/api/votes", (route) => route.fulfill({ json: { koji: { up: 7, down: 3 } } }));
  await page.route("**/api/votes/me", (route) => route.fulfill({ json: {} }));
  let release!: () => void;
  const pending = new Promise<void>((resolve) => { release = resolve; });
  await page.route("**/api/votes/koji", async (route) => {
    await pending;
    await route.fulfill({ status: 429, json: { error: "Too many votes. Please try again later." } });
  });
  await page.goto("/?q=K%C5%8CJI");
  const card = page.locator("article");
  await card.getByRole("button", { name: /^Like .*\(7\)/ }).click();
  await expect(card.getByRole("button", { name: /^Like .*\(8\)/ })).toBeDisabled();
  release();
  await expect(card.getByRole("alert")).toContainText("Too many votes");
  await expect(card.getByRole("button", { name: /^Like .*\(7\)/ })).toBeEnabled();
  await expect(card.getByRole("button", { name: /^Dislike .*\(3\)/ })).toBeEnabled();
});

test("a server replay reconciles a locally attempted switch", async ({ page }) => {
  await page.route("**/api/votes", (route) => route.fulfill({ json: { orrery: { up: 12, down: 3 } } }));
  await page.route("**/api/votes/me", (route) => route.fulfill({ json: {} }));
  await page.route("**/api/votes/orrery", (route) => route.fulfill({ json: { up: 12, down: 3, myVote: "down", accepted: false } }));
  await page.goto("/?q=orrery");
  await page.getByRole("button", { name: "Like Orrery (12)", exact: true }).click();
  await expect(page.getByRole("button", { name: "You disliked Orrery (3)", exact: true })).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByRole("button", { name: "Like Orrery (12)", exact: true })).toBeDisabled();
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem("olp-votes-v1")!))).toEqual({ orrery: "down" });
});
