import { test, expect } from "@playwright/test";

test.describe("KINETIC — Autonomous Freight & Megamarket Operations", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("loads the landing page with one h1, navigation, telemetry rail, and five presentation chapters", async ({
    page,
  }) => {
    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto("/kinetic");

    // Single semantic h1
    const h1 = page.getByRole("heading", { level: 1 });
    await expect(h1).toHaveCount(1);
    await expect(h1).toContainText("Keep every load moving from one clear console");

    // Navigation and Brand
    await expect(page.locator("nav[aria-label='Primary navigation']")).toBeVisible();
    await expect(page.locator("nav[aria-label='Primary navigation']").getByText("kinetic.")).toBeVisible();

    // Verify all five presentation chapters exist
    await expect(page.locator("#depart")).toBeAttached();
    await expect(page.locator("#prepare")).toBeAttached();
    await expect(page.locator("#connected")).toBeAttached();
    await expect(page.locator("#workspace")).toBeAttached();
    await expect(page.locator("#arrive")).toBeAttached();

    // Verify slide navigation controller
    await expect(page.locator("nav[aria-label='Slide navigation']")).toBeVisible();

    // Verify zero DOM property console errors
    const invalidDomErrors = consoleErrors.filter((e) =>
      e.includes("Invalid DOM property"),
    );
    expect(invalidDomErrors).toHaveLength(0);
  });

  test("interacts with prepare load demo", async ({ page }) => {
    await page.goto("/kinetic");

    const prepareChapter = page.locator("#prepare");
    await prepareChapter.scrollIntoViewIfNeeded();

    await expect(prepareChapter.getByText("784932")).toBeVisible();
    await expect(prepareChapter.getByText("D. Alvarez")).toBeVisible();
    await expect(prepareChapter.getByText("Chicago, IL")).toBeVisible();
    await expect(prepareChapter.getByText("Dallas, TX")).toBeVisible();
  });

  test("interacts with on the road record tabs", async ({ page }) => {
    await page.goto("/kinetic");

    const connectedChapter = page.locator("#connected");
    await connectedChapter.scrollIntoViewIfNeeded();

    // Tabs for Truck, Driver, Load
    const tabs = connectedChapter.locator("ol[aria-label='Records in this chapter']");
    await expect(tabs).toBeVisible();
    await expect(tabs.getByText("Truck")).toBeVisible();
    await expect(tabs.getByText("Driver")).toBeVisible();
    await expect(tabs.getByText("Load")).toBeVisible();
  });

  test("interacts with command center role switcher", async ({ page }) => {
    await page.goto("/kinetic");

    const workspaceChapter = page.locator("#workspace");
    await workspaceChapter.scrollIntoViewIfNeeded();

    // Command Center Console
    await expect(workspaceChapter.getByText("Command Center")).toBeVisible();

    // Toggle between Admin and Dispatcher roles
    const dispatcherBtn = workspaceChapter.getByRole("button", { name: "Dispatcher" });
    const adminBtn = workspaceChapter.getByRole("button", { name: "Admin" });

    await expect(dispatcherBtn).toBeVisible();
    await expect(adminBtn).toBeVisible();

    // Switch to Dispatcher role
    await dispatcherBtn.click();
    await expect(workspaceChapter.getByText("Hidden for this role")).toBeVisible();

    // Switch back to Admin role
    await adminBtn.click();
    await expect(workspaceChapter.getByText("$42.8K")).toBeVisible();
  });

  test("interacts with arrival closeout demo and finale", async ({ page }) => {
    await page.goto("/kinetic");

    const arriveChapter = page.locator("#arrive");
    await arriveChapter.scrollIntoViewIfNeeded();

    // Proof of delivery, invoice ready, driver pay steps
    await expect(arriveChapter.getByText("Proof of delivery received")).toBeVisible();
    await expect(arriveChapter.getByText("Invoice ready")).toBeVisible();
    await expect(arriveChapter.getByText("Driver pay")).toBeVisible();
  });

  test("renders cleanly in reduced motion mode with static fallback", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/kinetic");

    // Semantic content still renders fully
    const h1 = page.getByRole("heading", { level: 1 });
    await expect(h1).toBeVisible();
    await expect(h1).toContainText("Keep every load moving from one clear console");

    // Five chapters are still reachable
    await expect(page.locator("#depart")).toBeAttached();
    await expect(page.locator("#arrive")).toBeAttached();
  });
});
