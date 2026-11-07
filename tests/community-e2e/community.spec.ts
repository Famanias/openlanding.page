import { expect, test, type Page } from "@playwright/test";

const API_ORIGIN = "http://localhost:8787";

const MOCK_ITEMS = [
  {
    id: "00000000-0000-4000-8000-000000000201",
    title: "Aurora Studio",
    description: "Interactive architecture portfolio with downloadable HTML.",
    websiteUrl: "https://aurora.example.com/",
    creatorName: "Aurora Design",
    creditUrl: "https://aurora.example.com/credits",
    approvedAt: "2026-11-07T11:00:00.000Z",
    imageUrl: `${API_ORIGIN}/v1/community/00000000-0000-4000-8000-000000000201/image`,
    downloadUrl: `${API_ORIGIN}/v1/community/00000000-0000-4000-8000-000000000201/download`,
  },
  {
    id: "00000000-0000-4000-8000-000000000202",
    title: "Beacon Field",
    description: "Minimal typography showcase submitted as a live link.",
    websiteUrl: "https://beacon.example.com/",
    creatorName: "Beacon Collective",
    creditUrl: "https://beacon.example.com/about",
    approvedAt: "2026-11-07T10:30:00.000Z",
    imageUrl: null,
    downloadUrl: null,
  },
];

async function mockCommunityGalleryApi(page: Page): Promise<void> {
  await page.route(`${API_ORIGIN}/v1/community*`, async (route) => {
    const req = route.request();
    const origin = req.headers()["origin"] ?? "http://localhost:3200";
    const url = new URL(req.url());
    const q = (url.searchParams.get("q") ?? "").trim().toLowerCase();
    const downloadsOnly = url.searchParams.get("downloads") === "1";

    const filtered = MOCK_ITEMS.filter((item) => {
      if (downloadsOnly && !item.downloadUrl) return false;
      if (!q) return true;
      return (
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.creatorName.toLowerCase().includes(q)
      );
    });

    await route.fulfill({
      status: 200,
      contentType: "application/json",
      headers: {
        "Access-Control-Allow-Origin": origin,
      },
      body: JSON.stringify({
        items: filtered,
        nextCursor: null,
      }),
    });
  });
}

test.describe("Community gallery browsing (Task 7)", () => {
  test.beforeEach(async ({ page }) => {
    await mockCommunityGalleryApi(page);
  });

  test("community_is_a_distinct_shareable_gallery", async ({ page }) => {
    let communityRequestsOnTemplates = 0;
    page.on("request", (req) => {
      if (req.url().includes("/v1/community")) {
        communityRequestsOnTemplates += 1;
      }
    });

    await page.goto("/");
    await expect(page.getByRole("tab", { name: "Templates", exact: true })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(communityRequestsOnTemplates).toBe(0);

    await page.goto("/?tab=community&model=gemini");
    await expect(page.getByRole("tab", { name: "Community", exact: true })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    await expect(page.getByRole("button", { name: "Copy prompt", exact: true })).toHaveCount(0);
    await expect(page.getByRole("group", { name: "Filter by AI model" })).toHaveCount(0);

    const auroraCard = page.locator("article").filter({ hasText: "Aurora Studio" });
    const beaconCard = page.locator("article").filter({ hasText: "Beacon Field" });
    await expect(auroraCard).toBeVisible();
    await expect(beaconCard).toBeVisible();

    await expect(
      auroraCard.getByRole("link", { name: "Download HTML", exact: true }),
    ).toHaveAttribute(
      "href",
      "http://localhost:8787/v1/community/00000000-0000-4000-8000-000000000201/download",
    );
    await expect(
      beaconCard.getByRole("link", { name: "Download HTML", exact: true }),
    ).toHaveCount(0);

    const downloadsToggle = page.getByRole("checkbox", {
      name: "HTML downloads only",
      exact: true,
    });
    await downloadsToggle.check();
    await expect(page).toHaveURL(/downloads=1/);
    await expect(page).toHaveURL(/model=gemini/);
    await expect(auroraCard).toBeVisible();
    await expect(beaconCard).toHaveCount(0);

    await downloadsToggle.uncheck();
    await expect(beaconCard).toBeVisible();

    await page.getByRole("searchbox").fill("Beacon");
    await expect(beaconCard).toBeVisible();
    await expect(auroraCard).toHaveCount(0);
  });

  test("stale_search_response_cannot_replace_current_results", async ({ page }) => {
    let releaseStale!: () => void;
    const staleGate = new Promise<void>((resolve) => {
      releaseStale = resolve;
    });

    await page.route("**/v1/community*", async (route) => {
      const req = route.request();
      const origin = req.headers()["origin"] ?? "http://localhost:3200";
      const url = new URL(req.url());
      const q = url.searchParams.get("q") ?? "";
      if (q === "slow") {
        await staleGate;
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          headers: { "Access-Control-Allow-Origin": origin },
          body: JSON.stringify({
            items: [
              {
                id: "stale-id",
                title: "Stale Slow Result",
                description: "From old query",
                websiteUrl: "https://stale.example.com/",
                creatorName: "Stale Creator",
                creditUrl: "https://stale.example.com/",
                approvedAt: "2026-11-07T10:00:00.000Z",
                imageUrl: null,
                downloadUrl: null,
              },
            ],
            nextCursor: null,
          }),
        });
        return;
      }
      await route.fallback();
    });

    await page.goto("/?tab=community");
    await expect(page.locator("article").filter({ hasText: "Aurora Studio" })).toBeVisible();

    const searchbox = page.getByRole("searchbox");
    await searchbox.fill("slow");
    await searchbox.fill("Beacon");

    await expect(page.locator("article").filter({ hasText: "Beacon Field" })).toBeVisible();
    releaseStale();
    await page.waitForTimeout(150);

    await expect(page.locator("article").filter({ hasText: "Beacon Field" })).toBeVisible();
    await expect(page.locator("article").filter({ hasText: "Stale Slow Result" })).toHaveCount(0);
  });

  test("supports keyboard tab switching, history navigation, outage recovery, pagination and 390px layout", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/?model=gemini&q=Aurora");

    const templatesTab = page.getByRole("tab", { name: "Templates", exact: true });
    const communityTab = page.getByRole("tab", { name: "Community", exact: true });

    await templatesTab.focus();
    await page.keyboard.press("ArrowRight");
    await expect(communityTab).toHaveAttribute("aria-selected", "true");
    await expect(page).toHaveURL(/tab=community/);
    await expect(page).toHaveURL(/model=gemini/);
    await expect(page.locator("article").filter({ hasText: "Aurora Studio" })).toBeVisible();

    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(hasHorizontalOverflow).toBe(false);

    await page.goBack();
    await expect(templatesTab).toHaveAttribute("aria-selected", "true");
    await expect(page).not.toHaveURL(/tab=community/);
    await expect(page).toHaveURL(/model=gemini/);

    await page.goForward();
    await expect(communityTab).toHaveAttribute("aria-selected", "true");
    await expect(page.locator("article").filter({ hasText: "Aurora Studio" })).toBeVisible();

    let failCount = 0;
    await page.route("**/v1/community*", async (route) => {
      const origin = route.request().headers()["origin"] ?? "http://localhost:3200";
      if (failCount === 0) {
        failCount += 1;
        await route.fulfill({
          status: 503,
          contentType: "application/json",
          headers: { "Access-Control-Allow-Origin": origin },
          body: JSON.stringify({
            error: { code: "service_unavailable", message: "Community is temporarily offline." },
          }),
        });
        return;
      }
      await route.fallback();
    });

    await page.getByRole("searchbox").fill("Beacon");
    await expect(page.getByText("Community is temporarily offline.")).toBeVisible();

    await templatesTab.click();
    await expect(templatesTab).toHaveAttribute("aria-selected", "true");
    await communityTab.click();
    await expect(page.locator("article").filter({ hasText: "Beacon Field" })).toBeVisible();
  });
});
