import { test, expect, type Page } from "@playwright/test";

/** The next Tuesday at least two days out, as YYYY-MM-DD (Tuesdays always run to 19:20). */
function nextTuesday(): string {
  const d = new Date();
  d.setDate(d.getDate() + 2);
  while (d.getDay() !== 2) d.setDate(d.getDate() + 1);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

const railRoom = (page: Page) => page.locator(".nl-rail-room");

test.describe("noctiluca — a house you walk through", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("opens in the foyer as a 3D corridor", async ({ page }) => {
    await page.goto("/noctiluca");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("A house made of moving light.");
    await expect(page.locator("html")).toHaveAttribute("data-nl-mode", "corridor");
    await expect(page.getByRole("navigation", { name: "Rooms" })).toBeVisible();
    // Every plaque and doorway lives in one 3D world, moved by one transform.
    await expect(page.locator(".nl-world [data-station]")).toHaveCount(8);
    await expect(page.locator(".nl-door")).toHaveCount(7);
    await expect(railRoom(page)).toHaveText("Foyer");
  });

  test("scrolling walks the camera into the next room", async ({ page }) => {
    await page.goto("/noctiluca");
    const before = await page.locator(".nl-world").evaluate((el) => el.style.transform);
    await page.mouse.wheel(0, 1600);
    await expect(railRoom(page)).toHaveText("I · Blue Hour");
    const after = await page.locator(".nl-world").evaluate((el) => el.style.transform);
    expect(after).not.toBe(before);
    await expect(page.getByText("Room I, Blue Hour")).toBeAttached();
  });

  test("room links travel down the corridor and update the hash", async ({ page }) => {
    await page.goto("/noctiluca");
    await page.getByRole("navigation", { name: "Rooms" }).getByRole("link", { name: /Noctiluca/ }).click();
    await expect(railRoom(page)).toHaveText("III · Noctiluca");
    await expect(page).toHaveURL(/#nl-noctiluca$/);
    await expect(page.getByRole("heading", { name: "The sea, lit from inside." })).toBeVisible();
  });

  test("a deep link lands on its station", async ({ page }) => {
    await page.goto("/noctiluca#nl-alpenglow");
    await expect(railRoom(page)).toHaveText("IV · Alpenglow");
    await expect(page.locator(".nl-rail-depth")).toHaveText("28.8 m");
  });

  test("the Score Room's dials compose the light", async ({ page }) => {
    await page.goto("/noctiluca#nl-score");
    await expect(railRoom(page)).toHaveText("V · Score");
    const readout = page.getByTestId("score-readout");
    await expect(readout).toHaveText("420 nm · drift 0.35 · bloom 55%");
    await page.getByRole("button", { name: "Moss" }).click();
    await expect(readout).toHaveText("528 nm · drift 0.30 · bloom 46%");
    await expect(page.getByRole("button", { name: "Moss" })).toHaveAttribute("aria-pressed", "true");
    const hue = page.getByLabel("Hue");
    await hue.focus();
    await page.keyboard.press("End");
    await expect(readout).toContainText("purple line");
    await expect(page.getByRole("button", { name: "Moss" })).toHaveAttribute("aria-pressed", "false");
  });

  test("timed entry validates, then holds without a network request", async ({ page }) => {
    // Headless WebGL is software-rendered, so each action waits on slow frames.
    test.setTimeout(60_000);
    let external = false;
    page.on("request", (req) => {
      if (!req.url().startsWith("http://localhost")) external = true;
    });
    await page.goto("/noctiluca#nl-visit");
    await expect(railRoom(page)).toHaveText("VI · Visit");

    await page.getByRole("button", { name: "Hold my entry" }).click();
    await expect(page.getByText("Pick a day to visit.")).toBeVisible();
    await expect(page.getByText("Enter an email for your tickets.")).toBeVisible();

    await page.getByLabel("Day").fill(nextTuesday());
    await page.getByRole("radio", { name: "12:00" }).check();
    await page.getByRole("button", { name: "One more guest" }).click();
    await page.getByLabel("Email for the tickets").fill("ines@example.pt");
    await expect(page.locator(".nl-total")).toHaveText("3 × €18 = €54, paid at the door");
    await page.getByRole("button", { name: "Hold my entry" }).click();

    const held = page.getByRole("status").filter({ hasText: "Held:" });
    await expect(held).toContainText("Held: 3 guests");
    await expect(held).toContainText("at 12:00, €54 at the door");
    await expect(held).toBeFocused();
    expect(external).toBe(false);
  });

  test("tabbing into a far room walks the camera there", async ({ page }) => {
    await page.goto("/noctiluca");
    await page.getByLabel("Email for the tickets").focus();
    await expect(railRoom(page)).toHaveText("VI · Visit");
  });

  test("the live light starts on its own on desktop", async ({ page }) => {
    await page.goto("/noctiluca");
    await expect(page.locator("canvas.nl-light")).toBeAttached({ timeout: 8000 });
    await expect(page.getByRole("button", { name: "Turn the lights on" })).toHaveCount(0);
  });
});

test.describe("noctiluca on a phone", () => {
  test.use({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });

  test("stacks the rooms and waits for a tap before lighting them", async ({ page }) => {
    await page.goto("/noctiluca");
    await expect(page.locator("html")).toHaveAttribute("data-nl-mode", "flow");
    await page.waitForTimeout(1500);
    await expect(page.locator("canvas.nl-light")).toHaveCount(0);
    const toggle = page.getByRole("button", { name: "Turn the lights on" });
    await toggle.tap();
    await expect(page.locator("canvas.nl-light")).toBeAttached();
    await expect(page.getByRole("button", { name: "Lights down" })).toHaveAttribute("aria-pressed", "true");
  });

  test("every room heading is reachable by scrolling", async ({ page }) => {
    await page.goto("/noctiluca");
    for (const name of ["The twenty minutes after the sun.", "Compose the next room.", "Come in from the street."]) {
      const heading = page.getByRole("heading", { name });
      await heading.scrollIntoViewIfNeeded();
      await expect(heading).toBeVisible();
    }
  });
});

test.describe("noctiluca with reduced motion", () => {
  test.use({ reducedMotion: "reduce", viewport: { width: 1440, height: 900 } });

  test("never mounts the light and never builds the corridor", async ({ page }) => {
    await page.goto("/noctiluca");
    await expect(page.locator("html")).toHaveAttribute("data-nl-mode", "flow");
    await page.waitForTimeout(3000);
    await expect(page.locator("canvas.nl-light")).toHaveCount(0);
    await expect(page.getByRole("button", { name: "Turn the lights on" })).toHaveCount(0);
    await expect(page.locator(".nl-door").first()).toBeHidden();
  });
});
