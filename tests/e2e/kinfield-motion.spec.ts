import { expect, test, type Page } from "@playwright/test";

const route = process.env.KINFIELD_TEST_PATH ?? "/templates/kinfield";

async function scrollToViewportFraction(page: Page, selector: string, fraction: number, edge: "top" | "bottom" = "top") {
  await page.locator(selector).first().evaluate((element, { position, edge }) => {
    const bounds = element.getBoundingClientRect();
    window.scrollTo({
      top: bounds[edge] + scrollY - innerHeight * position,
      behavior: "instant",
    });
  }, { position: fraction, edge });
  await page.waitForTimeout(120);
}

async function openKinfield(page: Page) {
  await page.goto(route, { waitUntil: "networkidle" });
  await expect(page.locator("#kf-date")).toHaveAttribute("min", /^\d{4}-\d{2}-\d{2}$/);
}

for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
  test.describe("movement study at " + viewport.width + "px", () => {
    test.use({ viewport });

    test("the timetable waits longer before beginning its scroll movement", async ({ page }) => {
      await openKinfield(page);
      const sheet = page.locator(".kf-schedule");
      const place = async (fraction: number) => {
        await sheet.evaluate((element, position) => {
          const transform = getComputedStyle(element).transform;
          const shift = transform === "none" ? 0 : new DOMMatrixReadOnly(transform).m42;
          const top = element.getBoundingClientRect().top + scrollY - shift;
          window.scrollTo({ top: top - innerHeight * position, behavior: "instant" });
        }, fraction);
        await page.waitForTimeout(120);
        return sheet.evaluate((element) => {
          const transform = getComputedStyle(element).transform;
          return transform === "none" ? 0 : new DOMMatrixReadOnly(transform).m42;
        });
      };
      const initial = await place(0.95);
      const beforeTrigger = await place(0.8);
      expect(Math.abs(beforeTrigger - initial)).toBeLessThan(1);
      const afterTrigger = await place(0.6);
      expect(afterTrigger).toBeLessThan(initial - 2);
    });

    test("the practice line waits longer before it starts drawing", async ({ page }) => {
      await openKinfield(page);
      const arc = page.locator(".kf-practice-arc path");
      const offset = () => arc.evaluate((element) => Number.parseFloat(getComputedStyle(element).strokeDashoffset));
      await scrollToViewportFraction(page, ".kf-practice-arc", 0.98, "bottom");
      const initial = await offset();
      await scrollToViewportFraction(page, ".kf-practice-arc", 0.9, "bottom");
      expect(Math.abs(await offset() - initial)).toBeLessThan(1);
      await scrollToViewportFraction(page, ".kf-practice-arc", 0.75, "bottom");
      expect(await offset()).toBeLessThan(initial - 20);
    });

    test("the practice annotation draws as its scene enters", async ({ page }) => {
      await openKinfield(page);
      const arc = page.locator(".kf-practice-arc path");
      await scrollToViewportFraction(page, ".kf-practice-arc", 0.85, "bottom");
      const early = await arc.evaluate((element) => Number.parseFloat(getComputedStyle(element).strokeDashoffset) || 0);
      const startPoint = await arc.evaluate((element) => {
        const path = element as SVGPathElement;
        const point = path.getPointAtLength(0);
        return new DOMPoint(point.x, point.y).matrixTransform(path.getScreenCTM()!).y;
      });
      expect(startPoint).toBeLessThan(viewport.height);
      await scrollToViewportFraction(page, ".kf-practice-arc", 0.45, "bottom");
      const later = await arc.evaluate((element) => Number.parseFloat(getComputedStyle(element).strokeDashoffset) || 0);
      expect(early).toBeGreaterThan(later + 20);
      await scrollToViewportFraction(page, ".kf-practice-arc", 0.85, "bottom");
      const reversed = await arc.evaluate((element) => Number.parseFloat(getComputedStyle(element).strokeDashoffset) || 0);
      expect(reversed).toBeGreaterThan(later + 20);
    });

    test("the atlas guides rotate into place while the figure remains usable", async ({ page }) => {
      await openKinfield(page);
      const guides = page.locator(".kf-figure-guides");
      const transform = () => guides.evaluate((element) => element.getAttribute("transform") ?? getComputedStyle(element).transform);
      await scrollToViewportFraction(page, ".kf-figure-wrap", 0.8);
      const early = await transform();
      await scrollToViewportFraction(page, ".kf-figure-wrap", 0.4);
      const later = await transform();
      expect(early).not.toBe(later);
      await scrollToViewportFraction(page, ".kf-figure-wrap", 0.8);
      expect(await transform()).not.toBe(later);
      await page.getByRole("button", { name: "Select hips" }).click();
      await expect(page.getByText("Supported hip circles")).toBeVisible();
    });

    test("timetable strips hinge into place without hiding their controls", async ({ page }) => {
      await openKinfield(page);
      const row = page.locator(".kf-schedule-item").first();
      const tilt = () => row.evaluate((element) => {
        const transform = getComputedStyle(element).transform;
        return transform === "none" ? 0 : Math.abs(new DOMMatrixReadOnly(transform).m23);
      });
      await scrollToViewportFraction(page, ".kf-schedule-item", 0.8);
      const early = await tilt();
      const control = page.getByRole("button", { name: /Groundwork/ });
      await control.focus();
      await page.keyboard.press("Enter");
      await expect(control).toHaveAttribute("aria-expanded", "true");
      await scrollToViewportFraction(page, ".kf-schedule-item", 0.4);
      const later = await tilt();
      expect(early).toBeGreaterThan(later + 0.04);
      await scrollToViewportFraction(page, ".kf-schedule-item", 0.8);
      expect(await tilt()).toBeGreaterThan(later + 0.04);
    });

    test("the first portrait opens through a directional mask", async ({ page }) => {
      await openKinfield(page);
      const image = page.locator(".kf-teacher-one .kf-teacher-image img");
      const topInset = () => image.evaluate((element) => {
        const clip = getComputedStyle(element).clipPath;
        return Number.parseFloat(clip.match(/-?\d+(?:\.\d+)?/)?.[0] ?? "0");
      });
      await scrollToViewportFraction(page, ".kf-teacher-spread", 0.8);
      const early = await topInset();
      await scrollToViewportFraction(page, ".kf-teacher-spread", 0.4);
      const later = await topInset();
      expect(early).toBeGreaterThan(later + 15);
      await scrollToViewportFraction(page, ".kf-teacher-spread", 0.8);
      expect(await topInset()).toBeGreaterThan(later + 15);
    });

    test("the session sheet turns like a page while its form remains usable", async ({ page }) => {
      await openKinfield(page);
      const sheet = page.locator(".kf-booking");
      const tilt = () => sheet.evaluate((element) => {
        const transform = getComputedStyle(element).transform;
        return transform === "none" ? 0 : Math.abs(new DOMMatrixReadOnly(transform).m13);
      });
      await scrollToViewportFraction(page, ".kf-booking", 0.8);
      const early = await tilt();
      await scrollToViewportFraction(page, ".kf-booking", 0.4);
      const later = await tilt();
      expect(early).toBeGreaterThan(later + 0.02);
      await scrollToViewportFraction(page, ".kf-booking", 0.8);
      expect(await tilt()).toBeGreaterThan(later + 0.02);
      await page.getByLabel("02 / CHOOSE A DATE").fill("2099-12-31");
      await expect(page.getByLabel("02 / CHOOSE A DATE")).toHaveValue("2099-12-31");
    });

    test("the session sheet glides across frames after a scroll step", async ({ page }) => {
      await openKinfield(page);
      const sheet = page.locator(".kf-booking");
      await sheet.evaluate((element) => {
        window.scrollTo({
          top: element.getBoundingClientRect().top + scrollY - innerHeight * 0.64,
          behavior: "instant",
        });
      });
      await page.waitForTimeout(500);
      const motion = await sheet.evaluate(async (element) => {
        const angle = () => {
          const transform = getComputedStyle(element).transform;
          return transform === "none" ? 0 : Math.abs(new DOMMatrixReadOnly(transform).m13);
        };
        const initial = angle();
        window.scrollBy({ top: innerHeight * 0.22, behavior: "instant" });
        const frames: number[] = [];
        for (let i = 0; i < 28; i++) {
          await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
          frames.push(angle());
        }
        return { initial, frames };
      });
      const changes = motion.frames.slice(1).filter((value, index) => Math.abs(value - motion.frames[index]) > 0.0001);
      expect(motion.frames.at(-1)).toBeLessThan(motion.initial - 0.005);
      expect(changes.length).toBeGreaterThanOrEqual(5);
    });

    test("the session sheet smoothly reverses without losing form input", async ({ page }) => {
      await openKinfield(page);
      const sheet = page.locator(".kf-booking");
      const date = page.getByLabel("02 / CHOOSE A DATE");
      await date.fill("2099-12-31");
      await expect(date).toBeFocused();
      await sheet.evaluate((element) => {
        window.scrollTo({
          top: element.getBoundingClientRect().top + scrollY - innerHeight * 0.64,
          behavior: "instant",
        });
      });
      await page.waitForTimeout(500);
      const motion = await sheet.evaluate(async (element) => {
        const angle = () => {
          const transform = getComputedStyle(element).transform;
          return transform === "none" ? 0 : Math.abs(new DOMMatrixReadOnly(transform).m13);
        };
        const frame = () => new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
        window.scrollBy({ top: innerHeight * 0.22, behavior: "instant" });
        for (let i = 0; i < 5; i++) await frame();
        const atReverse = angle();
        window.scrollBy({ top: -innerHeight * 0.22, behavior: "instant" });
        for (let i = 0; i < 26; i++) await frame();
        return { atReverse, afterReverse: angle() };
      });
      expect(motion.afterReverse).toBeGreaterThan(motion.atReverse + 0.005);
      await expect(date).toBeFocused();
      await expect(date).toHaveValue("2099-12-31");
    });
  });
}

test("reduced motion keeps the five scene treatments static and the atlas usable", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await openKinfield(page);
  await scrollToViewportFraction(page, ".kf-practice-stage", 0.6);
  await expect(page.locator(".kf-practice-arc path")).toHaveCSS("stroke-dashoffset", "0px");
  await scrollToViewportFraction(page, ".kf-figure-wrap", 0.6);
  await expect(page.locator(".kf-figure-guides")).toHaveCSS("transform", "none");
  await page.getByRole("button", { name: "Select spine" }).click();
  await expect(page.getByText("Seated torso turns")).toBeVisible();
  await scrollToViewportFraction(page, ".kf-schedule-item", 0.6);
  await expect(page.locator(".kf-schedule-item").first()).toHaveCSS("transform", "none");
  await scrollToViewportFraction(page, ".kf-teacher-spread", 0.6);
  await expect(page.locator(".kf-teacher-one .kf-teacher-image img")).toHaveCSS("clip-path", "none");
  await scrollToViewportFraction(page, ".kf-booking", 0.6);
  await expect(page.locator(".kf-booking")).toHaveCSS("transform", "none");
});

test("turning on reduced motion restores the static practice illustration", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openKinfield(page);
  await scrollToViewportFraction(page, ".kf-practice-arc", 0.85, "bottom");
  const arc = page.locator(".kf-practice-arc path");
  expect(await arc.evaluate((element) => Number.parseFloat(getComputedStyle(element).strokeDashoffset))).toBeGreaterThan(20);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(arc).toHaveCSS("stroke-dashoffset", "0px");
  await expect(page.getByRole("button", { name: "Range", exact: true })).toBeVisible();
});

test("turning on reduced motion stops an in-flight session transition", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openKinfield(page);
  const date = page.getByLabel("02 / CHOOSE A DATE");
  await date.fill("2099-12-31");
  const sheet = page.locator(".kf-booking");
  await sheet.evaluate((element) => {
    window.scrollTo({
      top: element.getBoundingClientRect().top + scrollY - innerHeight * 0.64,
      behavior: "instant",
    });
  });
  await page.waitForTimeout(500);
  await page.evaluate(() => window.scrollBy({ top: innerHeight * 0.22, behavior: "instant" }));
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(sheet).toHaveCSS("transform", "none");
  await expect(date).toHaveValue("2099-12-31");
});
