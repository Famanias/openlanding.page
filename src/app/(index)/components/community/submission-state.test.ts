import { describe, expect, it } from "vitest";
import {
  HTML_CONSENT,
  HTML_MAX_BYTES,
  LISTING_CONSENT,
  REQUEST_MAX_BYTES,
  SCREENSHOT_MAX_BYTES,
} from "../../../../lib/community/contracts";
import { CommunityClientError } from "../../../../lib/community/client";
import {
  applySubmissionError,
  applySubmissionSuccess,
  beginSubmissionAttempt,
  buildSubmissionFormData,
  cancelSubmissionAttempt,
  createInitialSubmissionState,
  setHtmlConsent,
  setHtmlFile,
  setListingConsent,
  setScreenshotFile,
  setSubmissionField,
  setTurnstileToken,
} from "./submission-state";

describe("community submission state machine (Task 8)", () => {
  it("keeps the same idempotencyKey across retries when only turnstileToken changes, and rotates idempotencyKey when payload changes after an attempt", () => {
    let state = createInitialSubmissionState(() => "11111111-1111-4111-8111-111111111111");
    state = setSubmissionField(state, "websiteUrl", "https://example.com");
    state = setSubmissionField(state, "creatorName", "Example Studio");
    state = setListingConsent(state, true);
    state = setTurnstileToken(state, "token-1");

    const firstKey = state.idempotencyKey;
    expect(firstKey).toBe("11111111-1111-4111-8111-111111111111");

    // Start first attempt and fail with network error
    state = beginSubmissionAttempt(state);
    state = applySubmissionError(
      state,
      new CommunityClientError("network_error", "Network connection lost."),
    );

    // Refresh Turnstile token for retry without editing payload
    state = setTurnstileToken(state, "token-2");
    expect(state.idempotencyKey).toBe(firstKey);

    // Retry unchanged payload: still uses the exact same idempotencyKey
    state = beginSubmissionAttempt(state);
    expect(state.idempotencyKey).toBe(firstKey);

    // Fail again, then edit a payload field: must generate a new idempotencyKey
    state = applySubmissionError(
      state,
      new CommunityClientError("storage_unavailable", "Temporary storage failure."),
    );
    state = setSubmissionField(
      state,
      "creatorName",
      "Example Studio Updated",
      () => "22222222-2222-4222-8222-222222222222",
    );
    expect(state.idempotencyKey).toBe("22222222-2222-4222-8222-222222222222");
  });

  it("clears HTML consent when the selected HTML file is removed and only includes consent versions after explicit acceptance", () => {
    let state = createInitialSubmissionState(() => "11111111-1111-4111-8111-111111111111");
    state = setSubmissionField(state, "websiteUrl", "https://example.com");
    state = setSubmissionField(state, "creatorName", "Example Studio");
    state = setTurnstileToken(state, "token-1");

    // Without listing consent checked, listingConsentVersion is omitted
    const unconsentedForm = buildSubmissionFormData(state);
    expect(unconsentedForm.get("listingConsentVersion")).toBeNull();
    expect(unconsentedForm.get("htmlConsentVersion")).toBeNull();

    state = setListingConsent(state, true);
    const htmlFile = new File(["<!doctype html><title>Demo</title>"], "index.html", {
      type: "text/html",
    });
    state = setHtmlFile(state, htmlFile);
    expect(state.htmlConsentAccepted).toBe(false);

    // HTML file selected but HTML consent not yet checked
    const htmlUnconsentedForm = buildSubmissionFormData(state);
    expect(htmlUnconsentedForm.get("listingConsentVersion")).toBe(LISTING_CONSENT.version);
    expect(htmlUnconsentedForm.get("htmlConsentVersion")).toBeNull();

    // Check HTML consent
    state = setHtmlConsent(state, true);
    const htmlConsentedForm = buildSubmissionFormData(state);
    expect(htmlConsentedForm.get("htmlConsentVersion")).toBe(HTML_CONSENT.version);

    // Removing the HTML file clears htmlConsentAccepted
    state = setHtmlFile(state, null);
    expect(state.htmlFile).toBeNull();
    expect(state.htmlConsentAccepted).toBe(false);
    const afterRemoveForm = buildSubmissionFormData(state);
    expect(afterRemoveForm.get("htmlConsentVersion")).toBeNull();
  });

  it("reports client file size errors immediately for oversized HTML, screenshot, or total payload", () => {
    let state = createInitialSubmissionState();

    const oversizedScreenshot = new File(
      [new Uint8Array(SCREENSHOT_MAX_BYTES + 1)],
      "huge.png",
      { type: "image/png" },
    );
    state = setScreenshotFile(state, oversizedScreenshot);
    expect(state.fieldErrors.screenshot).toContain("2 MiB");

    const oversizedHtml = new File([new Uint8Array(HTML_MAX_BYTES + 1)], "huge.html", {
      type: "text/html",
    });
    state = setHtmlFile(state, oversizedHtml);
    expect(state.fieldErrors.html).toContain("5 MiB");

    // Combined size exceeding REQUEST_MAX_BYTES check
    const maxHtml = new File([new Uint8Array(HTML_MAX_BYTES)], "ok.html", {
      type: "text/html",
    });
    const largeScreenshot = new File(
      [new Uint8Array(REQUEST_MAX_BYTES - HTML_MAX_BYTES + 1024)],
      "large.png",
      { type: "image/png" },
    );
    state = setHtmlFile(state, maxHtml);
    state = setScreenshotFile(state, largeScreenshot);
    expect(state.fieldErrors.screenshot || state.errorBanner).toBeTruthy();
  });

  it("maps submissions_disabled, submission_outcome_unknown, submission_in_progress, 429 retryAfter, and cancellation honestly without losing input or rotating idempotencyKey", () => {
    let state = createInitialSubmissionState(() => "33333333-3333-4333-8333-333333333333");
    state = setSubmissionField(state, "websiteUrl", "https://example.com");
    state = setSubmissionField(state, "creatorName", "Studio Three");
    state = setListingConsent(state, true);
    state = setTurnstileToken(state, "token-1");
    state = beginSubmissionAttempt(state);

    // 1. submissions_disabled
    state = applySubmissionError(
      state,
      new CommunityClientError(
        "submissions_disabled",
        "Backend disabled message",
        { status: 503 },
      ),
    );
    expect(state.idempotencyKey).toBe("33333333-3333-4333-8333-333333333333");
    expect(state.errorBanner).toBe(
      "Submissions are temporarily paused. Please try again later.",
    );
    expect(state.websiteUrl).toBe("https://example.com");

    // 2. submission_outcome_unknown
    state = applySubmissionError(
      state,
      new CommunityClientError(
        "submission_outcome_unknown",
        "Previous submission attempt is still reconciling.",
        { status: 503, retryAfter: 2 },
      ),
    );
    expect(state.idempotencyKey).toBe("33333333-3333-4333-8333-333333333333");
    expect(state.errorBanner).toContain("being checked");
    expect(state.errorBanner?.toLowerCase()).not.toContain("rejected");

    // 3. submission_in_progress (409)
    state = applySubmissionError(
      state,
      new CommunityClientError(
        "submission_in_progress",
        "This submission is already being processed.",
        { status: 409, retryAfter: 2 },
      ),
    );
    expect(state.idempotencyKey).toBe("33333333-3333-4333-8333-333333333333");
    expect(state.errorBanner).toContain("already being processed");

    // 4. 429 rate_limited with retryAfter
    state = applySubmissionError(
      state,
      new CommunityClientError("rate_limited", "Too many submission attempts.", {
        status: 429,
        retryAfter: 90,
      }),
    );
    expect(state.errorBanner).toContain("90 seconds");

    // 5. Cancellation does not claim server rejection
    state = beginSubmissionAttempt(state);
    state = cancelSubmissionAttempt(state);
    expect(state.status).toBe("idle");
    expect(state.errorBanner?.toLowerCase() ?? "").not.toContain("rejected");
    expect(state.idempotencyKey).toBe("33333333-3333-4333-8333-333333333333");

    // 6. Success transitions to succeeded and stores receipt
    state = beginSubmissionAttempt(state);
    state = applySubmissionSuccess(state, {
      receiptId: "sub-receipt-3",
      status: "pending",
    });
    expect(state.status).toBe("succeeded");
    expect(state.receipt).toEqual({
      receiptId: "sub-receipt-3",
      status: "pending",
    });
  });
});
