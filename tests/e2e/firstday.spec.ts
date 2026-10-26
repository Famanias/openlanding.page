import { test, expect } from "@playwright/test";

test("FIRSTDAY filters paths, reveals fresh cards, and opens an accessible project brief", async ({
  page,
}) => {
  await page.goto("/firstday");
  await page.getByRole("button", { name: "Data", exact: true }).click();
  await expect(page.locator(".fd-project-card")).toHaveCount(1);
  await expect(page.locator(".fd-project-grid [data-reveal]")).toHaveAttribute(
    "data-in",
    "true",
  );
  await page.locator(".fd-project-card").click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByRole("dialog")).toContainText(
    "city cycling collective",
  );
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(page.locator(".fd-project-card")).toBeFocused();
  await page.getByRole("button", { name: "All06", exact: true }).click();
  await expect(page.locator(".fd-project-card")).toHaveCount(6);
});

test("FIRSTDAY project stages follow actual scroll offsets and allow direct selection", async ({
  page,
}) => {
  await page.goto("/firstday");
  await page
    .locator(".fd-story")
    .evaluate((el) =>
      scrollTo(
        0,
        el.getBoundingClientRect().top +
          scrollY +
          (el.clientHeight - innerHeight) * 0.5,
      ),
    );
  await expect(page.locator(".fd-story")).toHaveAttribute("data-stage", "1");
  await expect(page.locator(".fd-scene-1")).toHaveCSS("opacity", "1");
  await expect(page.locator('[data-stage-button="1"]')).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await page.locator('[data-stage-button="2"]').click();
  await expect(page.locator(".fd-story")).toHaveAttribute("data-manual", "2");
  await expect(page.locator(".fd-scene-2")).toHaveCSS("opacity", "1");
});

test("FIRSTDAY validates, announces a local receipt and sends no signup request", async ({
  page,
}) => {
  const posts: string[] = [];
  page.on("request", (r) => {
    if (r.method() === "POST") posts.push(r.url());
  });
  await page.goto("/firstday?path=data-story#begin");
  await expect(page.getByLabel("What are you curious about?")).toHaveValue(
    "data-story",
  );
  await page
    .getByRole("button", { name: "Let’s find your first day", exact: true })
    .click();
  await expect(page.getByLabel("Your first name")).toBeFocused();
  await expect(page.getByText("Enter a valid email address.")).toBeVisible();
  await page.getByLabel("Your first name").fill("Ada");
  await page.getByLabel("Your email").fill("ada@example.com");
  await page
    .getByRole("button", { name: "Let’s find your first day", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "Opening your next chapter…" }),
  ).toBeDisabled();
  await expect(page.getByText("You’re at the door, Ada.")).toBeVisible();
  await expect(page.locator(".fd-success")).toBeFocused();
  await expect(page.locator(".fd-success")).toContainText("Data storytelling");
  expect(posts).toEqual([]);
});

test("FIRSTDAY has role-specific reveal, hover and press feedback", async ({
  page,
}) => {
  await page.goto("/firstday");
  const card = page.locator(".fd-project-card").first();
  await card.scrollIntoViewIfNeeded();
  await expect(card.locator("..")).toHaveAttribute("data-in", "true");
  await card.hover();
  await expect
    .poll(() => card.evaluate((el) => getComputedStyle(el).transform))
    .not.toBe("none");
  const pause = page.getByRole("button", { name: "Pause motion" });
  await pause.click();
  await expect(page.locator("html")).toHaveAttribute("data-fd-paused", "true");
  await expect(page.locator(".fd-campus-note")).toHaveCSS(
    "animation-play-state",
    "paused",
  );
  const cta = page.locator(".fd-header-cta");
  await cta.hover();
  await page.mouse.down();
  await expect
    .poll(() => cta.evaluate((el) => getComputedStyle(el).transform))
    .not.toBe("none");
  await page.mouse.up();
});

test("FIRSTDAY mobile navigation, project selection and FAQ work without overflow", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/firstday");
  await page.getByLabel("Open navigation").click();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "Find your path" })
    .click();
  await expect(page.locator(".fd-mobile-menu")).not.toHaveAttribute("open", "");
  await page.getByRole("button", { name: "Design", exact: true }).click();
  await expect(page.locator(".fd-project-card")).toHaveCount(2);
  await page.locator(".fd-project-card").first().click();
  await page.getByRole("link", { name: "This feels like me" }).click();
  await expect(page.getByLabel("What are you curious about?")).toHaveValue(
    "design-studio",
  );
  await page.locator(".fd-faq summary").first().click();
  await expect(page.locator(".fd-faq").first()).toHaveAttribute("open", "");
  await expect(page.locator(".fd-faq-answer p").first()).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});

test("FIRSTDAY reduced motion keeps every scene and reveal visible without Lenis", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/firstday");
  await expect(page.locator("html")).toHaveAttribute(
    "data-fd-motion",
    "reduced",
  );
  for (const scene of await page.locator(".fd-scene").all())
    await expect(scene).toHaveCSS("opacity", "1");
  for (const item of await page.locator("[data-reveal]").all())
    await expect(item).toHaveCSS("opacity", "1");
  expect(
    await page.evaluate(() =>
      document.documentElement.classList.contains("lenis"),
    ),
  ).toBe(false);
  expect(
    await page.evaluate(
      () =>
        document.getAnimations().filter((a) => a.playState === "running")
          .length,
    ),
  ).toBe(0);
});

test("FIRSTDAY no-JavaScript browsing retains all project scenes and native disclosures", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto("/firstday");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  for (const scene of await page.locator(".fd-scene").all()) {
    await expect(scene).toHaveCSS("opacity", "1");
    await expect(scene).toHaveCSS("position", "relative");
  }
  await page.locator(".fd-faq summary").first().click();
  await expect(page.locator(".fd-faq").first()).toHaveAttribute("open", "");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.setViewportSize({ width: 1440, height: 900 });
  const desktopFlow = await page.evaluate(() => {
    const story = document.querySelector(".fd-story")!.getBoundingClientRect();
    const lastScene = document
      .querySelector(".fd-scene-2")!
      .getBoundingClientRect();
    return lastScene.bottom <= story.bottom;
  });
  expect(desktopFlow).toBe(true);
  await context.close();
});
