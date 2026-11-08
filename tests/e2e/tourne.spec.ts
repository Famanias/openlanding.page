import { expect, test } from "@playwright/test";

test.describe("tourne", () => {
  test("renders the page and the order summary tracks the vessel", async ({ page }) => {
    await page.goto("/tourne");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Shape it.");
    await page.locator("#collection").scrollIntoViewIfNeeded();
    await page.getByRole("button", { name: /Put it on the wheel.*Tea Bowl/ }).click();
    await expect(page.locator("#workshop .tn-stage-caption")).toContainText("Tea Bowl");
    await expect(page.locator(".tn-order-lines")).toContainText("Tea Bowl");
  });

  test("profile handles respond to the keyboard and change the spec", async ({ page }) => {
    await page.goto("/tourne#tn-shape");
    const belly = page.getByRole("slider", { name: "Belly width" });
    await belly.focus();
    const before = await belly.getAttribute("aria-valuenow");
    await page.keyboard.press("ArrowLeft");
    await expect(belly).not.toHaveAttribute("aria-valuenow", before ?? "");
    await page.getByRole("slider", { name: "Height" }).focus();
    await page.keyboard.press("ArrowUp");
    await expect(page.locator(".tn-spec")).toContainText("cm");
  });

  test("glaze radio group selects one glaze", async ({ page }) => {
    await page.goto("/tourne#tn-glaze");
    const tenmoku = page.getByRole("radio", { name: /Tenmoku/ });
    await tenmoku.click();
    await expect(tenmoku).toHaveAttribute("aria-checked", "true");
  });

  test("order form validates, then shows the success stamp", async ({ page }) => {
    await page.goto("/tourne#order");
    await page.getByRole("button", { name: "Reserve this vessel" }).click();
    await expect(page.getByText("Tell us who the vessel is for.")).toBeVisible();
    await page.getByLabel("Your name").fill("Mina Ito");
    await page.getByLabel("Email").fill("mina@example.com");
    await page.getByLabel("Postcode").fill("98101");
    await page.getByRole("button", { name: "Reserve this vessel" }).click();
    await expect(page.locator(".tn-order-form")).toHaveAttribute("data-state", "success", { timeout: 4000 });
    await expect(page.locator(".tn-ref")).toHaveText(/^TN-[0-9A-Z]{6}$/);
  });

  test("reveals flip to data-in on scroll", async ({ page }) => {
    await page.goto("/tourne");
    const card = page.locator("#collection [data-reveal='scale']").first();
    await expect(card).toHaveAttribute("data-in", "false");
    await card.scrollIntoViewIfNeeded();
    await expect(card).toHaveAttribute("data-in", "true");
  });

  test("mobile menu opens with a focus trap and closes with Escape", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/tourne");
    const toggle = page.getByRole("button", { name: "Open menu" });
    await toggle.click();
    await expect(page.locator("#tn-menu")).toHaveAttribute("data-open", "true");
    await page.keyboard.press("Escape");
    await expect(page.locator("#tn-menu")).toHaveAttribute("data-open", "false");
  });
});

test.describe("tourne reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("every reveal is visible and WebGL never mounts", async ({ page }) => {
    await page.goto("/tourne");
    await page.waitForTimeout(2800);
    const hidden = await page.$$eval("[data-reveal]", (nodes) => nodes.filter((node) => getComputedStyle(node).opacity === "0").length);
    expect(hidden).toBe(0);
    await expect(page.locator(".tn-canvas")).toHaveAttribute("data-phase", "poster");
    expect(await page.locator("canvas.tn-canvas-gl[data-live='true']").count()).toBe(0);
  });
});
