import { expect, test, type Route } from "@playwright/test";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { HTML_CONSENT, LISTING_CONSENT } from "../../src/lib/community/contracts";

const WORKER_BASE = "http://localhost:8787";

const VALID_1X1_PNG = Buffer.from([
  0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0x00, 0x00, 0x0d, 0x49, 0x48, 0x44, 0x52,
  0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01, 0x08, 0x06, 0x00, 0x00, 0x00, 0x1f, 0x15, 0xc4,
  0x89, 0x00, 0x00, 0x00, 0x0a, 0x49, 0x44, 0x41, 0x54, 0x78, 0x9c, 0x63, 0x00, 0x01, 0x00, 0x00,
  0x05, 0x00, 0x01, 0x0d, 0x0a, 0x2d, 0xb4, 0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4e, 0x44, 0xae,
  0x42, 0x60, 0x82,
]);

function corsHeaders(origin: string, extra?: Record<string, string>): Record<string, string> {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Accept, Content-Type, Idempotency-Key",
    "Access-Control-Expose-Headers": "Retry-After",
    ...extra,
  };
}

async function handleCorsPreflight(route: Route): Promise<boolean> {
  const req = route.request();
  if (req.method() === "OPTIONS") {
    const origin = req.headers()["origin"] ?? "http://localhost:3200";
    await route.fulfill({
      status: 204,
      headers: corsHeaders(origin),
    });
    return true;
  }
  return false;
}

test.describe("Community public submission dialog (Task 8)", () => {
  test.beforeEach(async ({ page }) => {
    await page.route(`${WORKER_BASE}/v1/community*`, async (route) => {
      if (await handleCorsPreflight(route)) return;
      const origin = route.request().headers()["origin"] ?? "http://localhost:3200";
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        headers: corsHeaders(origin),
        body: JSON.stringify({ items: [], nextCursor: null }),
      });
    });
  });

  test("link_only_submission_needs_no_account_or_html", async ({ page }) => {
    let submittedMultipart = "";
    await page.route(`${WORKER_BASE}/v1/submissions`, async (route) => {
      if (await handleCorsPreflight(route)) return;
      const req = route.request();
      const origin = req.headers()["origin"] ?? "http://localhost:3200";
      submittedMultipart = req.postDataBuffer()?.toString("utf8") ?? "";
      await route.fulfill({
        status: 201,
        contentType: "application/json",
        headers: corsHeaders(origin),
        body: JSON.stringify({
          receiptId: "00000000-0000-4000-8000-000000000301",
          status: "pending",
        }),
      });
    });

    await page.goto("/?tab=community");
    await page.getByRole("button", { name: "Add your website", exact: true }).first().click();
    await page.getByLabel("Website URL", { exact: true }).fill("https://example.com");
    await page.getByLabel("Creator name", { exact: true }).fill("Example Studio");
    await page.getByRole("checkbox", { name: LISTING_CONSENT.text }).check();
    await page.getByRole("button", { name: "Send submission", exact: true }).click();
    await expect(
      page.getByText("Submission received. Your website is awaiting review.", { exact: true }),
    ).toBeVisible();

    const dialogText = await page.getByRole("dialog").innerText();
    expect(dialogText.toLowerCase()).not.toContain("has been published");
    expect(dialogText.toLowerCase()).not.toContain("we emailed you");
    expect(submittedMultipart).toContain("https://example.com");
    expect(submittedMultipart).toContain("Example Studio");
  });

  test("html_and_screenshot_uploads_require_explicit_html_consent_and_validate_controls", async ({
    page,
  }) => {
    await page.route(`${WORKER_BASE}/v1/submissions`, async (route) => {
      if (await handleCorsPreflight(route)) return;
      const origin = route.request().headers()["origin"] ?? "http://localhost:3200";
      await route.fulfill({
        status: 400,
        contentType: "application/json",
        headers: corsHeaders(origin),
        body: JSON.stringify({
          error: {
            code: "invalid_field",
            message: "Please check the highlighted fields.",
            fields: {
              websiteUrl: "URL must start with https://.",
            },
          },
        }),
      });
    });

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    const headerTrigger = page
      .getByRole("navigation", { name: "Main Navigation" })
      .getByRole("button", { name: "Add your website", exact: true });
    await headerTrigger.focus();
    await headerTrigger.click();

    const dialog = page.getByRole("dialog", { name: "Add your website" });
    await expect(dialog).toBeVisible();

    // Verify no horizontal overflow on 390px viewport
    const hasOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(hasOverflow).toBe(false);

    // HTML consent checkbox should NOT be visible before selecting an HTML file
    await expect(page.getByRole("checkbox", { name: HTML_CONSENT.text })).toHaveCount(0);

    // Select an HTML file -> HTML consent appears unchecked
    const htmlInput = dialog.getByLabel("Standalone HTML template (optional)");
    await htmlInput.setInputFiles({
      name: "landing.html",
      mimeType: "text/html",
      buffer: Buffer.from("<!doctype html><html><body><h1>Demo</h1></body></html>", "utf8"),
    });

    const htmlCheckbox = page.getByRole("checkbox", { name: HTML_CONSENT.text });
    await expect(htmlCheckbox).toBeVisible();
    await expect(htmlCheckbox).not.toBeChecked();

    // Check HTML consent, then remove the HTML file -> HTML consent disappears and is cleared if re-added
    await htmlCheckbox.check();
    await expect(htmlCheckbox).toBeChecked();
    await dialog.getByRole("button", { name: "Remove HTML file" }).click();
    await expect(page.getByRole("checkbox", { name: HTML_CONSENT.text })).toHaveCount(0);

    // Re-add HTML file -> must be unchecked again
    await htmlInput.setInputFiles({
      name: "landing.html",
      mimeType: "text/html",
      buffer: Buffer.from("<!doctype html><html><body><h1>Demo</h1></body></html>", "utf8"),
    });
    await expect(page.getByRole("checkbox", { name: HTML_CONSENT.text })).not.toBeChecked();

    // Client size validation on screenshot (> 2 MiB)
    const screenshotInput = dialog.getByLabel("Screenshot preview (optional)");
    await screenshotInput.setInputFiles({
      name: "too-big.png",
      mimeType: "image/png",
      buffer: Buffer.alloc(2_097_153, 1),
    });
    await expect(dialog.getByText(/Screenshot must be 2 MiB or smaller/i)).toBeVisible();

    // Replace with valid 1x1 PNG screenshot
    await screenshotInput.setInputFiles({
      name: "preview.png",
      mimeType: "image/png",
      buffer: VALID_1X1_PNG,
    });
    await expect(dialog.getByText(/Screenshot must be 2 MiB or smaller/i)).toHaveCount(0);

    // Submit with invalid non-https website URL to verify backend field error attaches to control
    await dialog.getByLabel("Website URL", { exact: true }).fill("http://insecure.example.com");
    await dialog.getByLabel("Creator name", { exact: true }).fill("Studio Two");
    await dialog.getByLabel("Title (optional)").fill("Custom Title");
    await dialog.getByLabel("Short description (optional)").fill("Short description copy.");
    await dialog.getByLabel("Creator credit URL (optional)").fill("https://example.com/studio");
    await dialog.getByLabel("Private contact email (optional)").fill("studio@example.com");
    await dialog.getByRole("checkbox", { name: LISTING_CONSENT.text }).check();
    await dialog.getByRole("checkbox", { name: HTML_CONSENT.text }).check();

    await dialog.getByRole("button", { name: "Send submission", exact: true }).click();
    await expect(dialog.getByText("URL must start with https://.")).toBeVisible();
    await expect(dialog.getByLabel("Website URL", { exact: true })).toHaveAttribute(
      "aria-invalid",
      "true",
    );

    // Escape closes dialog and restores focus to trigger
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(headerTrigger).toBeFocused();
  });

  test("network_retry_preserves_payload_and_idempotency_key", async ({ page }) => {
    await page.goto("/?tab=community");
    await page.getByRole("button", { name: "Add your website", exact: true }).first().click();

    const dialog = page.getByRole("dialog", { name: "Add your website" });
    await dialog.getByLabel("Website URL", { exact: true }).fill("https://retry.example.com");
    await dialog.getByLabel("Creator name", { exact: true }).fill("Retry Studio");
    await dialog.getByLabel("Standalone HTML template (optional)").setInputFiles({
      name: "retry.html",
      mimeType: "text/html",
      buffer: Buffer.from("<!doctype html><title>Retry</title>", "utf8"),
    });
    await dialog.getByRole("checkbox", { name: LISTING_CONSENT.text }).check();
    await dialog.getByRole("checkbox", { name: HTML_CONSENT.text }).check();

    const seenIdempotencyKeys: string[] = [];

    let mode:
      | "disabled"
      | "outcome_unknown"
      | "in_progress"
      | "rate_limited"
      | "drop_after_commit"
      | "success" = "disabled";

    await page.route(`${WORKER_BASE}/v1/submissions`, async (route) => {
      if (await handleCorsPreflight(route)) return;
      const req = route.request();
      const origin = req.headers()["origin"] ?? "http://localhost:3200";
      const key = req.headers()["idempotency-key"] ?? "";
      seenIdempotencyKeys.push(key);

      if (mode === "disabled") {
        await route.fulfill({
          status: 503,
          contentType: "application/json",
          headers: corsHeaders(origin),
          body: JSON.stringify({
            error: {
              code: "submissions_disabled",
              message: "Submissions are temporarily paused. Please try again later.",
            },
          }),
        });
        return;
      }

      if (mode === "outcome_unknown") {
        await route.fulfill({
          status: 503,
          contentType: "application/json",
          headers: corsHeaders(origin, { "Retry-After": "2" }),
          body: JSON.stringify({
            error: {
              code: "submission_outcome_unknown",
              message: "Previous submission attempt is still reconciling.",
            },
            retryAfter: 2,
          }),
        });
        return;
      }

      if (mode === "in_progress") {
        await route.fulfill({
          status: 409,
          contentType: "application/json",
          headers: corsHeaders(origin, { "Retry-After": "2" }),
          body: JSON.stringify({
            error: {
              code: "submission_in_progress",
              message: "This submission is already being processed.",
            },
            retryAfter: 2,
          }),
        });
        return;
      }

      if (mode === "rate_limited") {
        await route.fulfill({
          status: 429,
          contentType: "application/json",
          headers: corsHeaders(origin, { "Retry-After": "45" }),
          body: JSON.stringify({
            error: {
              code: "rate_limited",
              message: "Too many attempts.",
            },
            retryAfter: 45,
          }),
        });
        return;
      }

      if (mode === "drop_after_commit") {
        await route.abort("failed");
        return;
      }

      await route.fulfill({
        status: 200,
        contentType: "application/json",
        headers: corsHeaders(origin),
        body: JSON.stringify({
          receiptId: "00000000-0000-4000-8000-000000000302",
          status: "pending",
        }),
      });
    });

    // Attempt 1: 503 submissions_disabled
    await dialog.getByRole("button", { name: "Send submission", exact: true }).click();
    await expect(
      dialog.getByText("Submissions are temporarily paused. Please try again later.", {
        exact: true,
      }),
    ).toBeVisible();

    // Attempt 2: submission_outcome_unknown
    mode = "outcome_unknown";
    await dialog.getByRole("button", { name: "Send submission", exact: true }).click();
    await expect(dialog.getByText(/outcome is being checked/i)).toBeVisible();

    // Attempt 3: submission_in_progress (409)
    mode = "in_progress";
    await dialog.getByRole("button", { name: "Send submission", exact: true }).click();
    await expect(dialog.getByText(/already being processed/i)).toBeVisible();

    // Attempt 4: rate_limited (429 with Retry-After)
    mode = "rate_limited";
    await dialog.getByRole("button", { name: "Send submission", exact: true }).click();
    await expect(dialog.getByText(/45 seconds/i)).toBeVisible();

    // Attempt 5: network drop
    mode = "drop_after_commit";
    await dialog.getByRole("button", { name: "Send submission", exact: true }).click();
    await expect(dialog.getByText(/Unable to reach/i)).toBeVisible();

    // Attempt 6: retry unchanged form and files -> succeeds with same Idempotency-Key
    mode = "success";
    await dialog.getByRole("button", { name: "Send submission", exact: true }).click();
    await expect(
      dialog.getByText("Submission received. Your website is awaiting review.", { exact: true }),
    ).toBeVisible();

    expect(seenIdempotencyKeys.length).toBe(6);
    const firstKey = seenIdempotencyKeys[0];
    expect(firstKey).toBeTruthy();
    for (const key of seenIdempotencyKeys) {
      expect(key).toBe(firstKey);
    }

    // Close and reopen after success -> starts fresh with a new key on next submission
    await dialog.getByRole("button", { name: "Close", exact: true }).click();
    await expect(dialog).toBeHidden();

    await page.getByRole("button", { name: "Add your website", exact: true }).first().click();
    await expect(dialog.getByLabel("Website URL", { exact: true })).toHaveValue("");

    // Editing a payload after an attempted send generates a new Idempotency-Key
    await dialog.getByLabel("Website URL", { exact: true }).fill("https://second.example.com");
    await dialog.getByLabel("Creator name", { exact: true }).fill("Second Studio");
    await dialog.getByRole("checkbox", { name: LISTING_CONSENT.text }).check();

    mode = "rate_limited";
    await dialog.getByRole("button", { name: "Send submission", exact: true }).click();
    await expect(dialog.getByText(/45 seconds/i)).toBeVisible();
    const secondAttemptKey = seenIdempotencyKeys[seenIdempotencyKeys.length - 1];
    expect(secondAttemptKey).not.toBe(firstKey);

    await dialog.getByLabel("Creator name", { exact: true }).fill("Second Studio Edited");
    await dialog.getByRole("button", { name: "Send submission", exact: true }).click();
    await expect(dialog.getByText(/45 seconds/i)).toBeVisible();
    const editedAttemptKey = seenIdempotencyKeys[seenIdempotencyKeys.length - 1];
    expect(editedAttemptKey).not.toBe(secondAttemptKey);

    await dialog.getByRole("button", { name: "Close", exact: true }).click();

    // Commission form regression: existing POST action and options remain intact
    const commissionForm = page.locator(
      'form.request-form[action="https://formsubmit.co/famianas.dev@gmail.com"][method="POST"]',
    );
    await expect(commissionForm).toBeVisible();
    await expect(
      commissionForm.locator('input[type="radio"][name="project_type"][value="Free gallery template"]'),
    ).toBeChecked();
    await expect(
      commissionForm.locator('input[type="radio"][name="project_type"][value="Paid private commission"]'),
    ).toBeVisible();
  });

  test("community_terms_distinguish_listings_from_html_contributions", async ({ page }) => {
    const licenseBytes = readFileSync(path.resolve(process.cwd(), "LICENSE"));
    const licenseSha256 = createHash("sha256").update(licenseBytes).digest("hex");
    expect(licenseSha256).toBe("a9fb8dc126580c276ee676b93d63d7009b174f11be054afc778d4b6957e26853");

    await page.goto("/community-terms");
    await expect(
      page.getByRole("heading", { name: "Community submission terms", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByText("Linked websites keep their own terms.", { exact: true }),
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "MIT License", exact: true })).toHaveAttribute(
      "href",
      "https://opensource.org/license/mit",
    );
    await expect(page.getByText(LISTING_CONSENT.text)).toBeVisible();
    await expect(page.getByText(HTML_CONSENT.text)).toBeVisible();
    await expect(page.getByText(LISTING_CONSENT.version)).toBeVisible();
    await expect(page.getByText(HTML_CONSENT.version)).toBeVisible();
    await expect(page.getByText(/cannot be revoked after lawful download/i)).toBeVisible();

    await page.goto("/community-privacy");
    await expect(
      page.getByRole("heading", { name: "Community privacy notice", exact: true }),
    ).toBeVisible();
    await expect(page.getByText(/30 days/i)).toBeVisible();
    await expect(page.getByText(/180 days/i)).toBeVisible();
    await expect(page.getByRole("link", { name: "famianas.dev@gmail.com" })).toHaveAttribute(
      "href",
      "mailto:famianas.dev@gmail.com",
    );
  });
});
