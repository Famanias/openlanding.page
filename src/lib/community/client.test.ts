import { afterEach, describe, expect, it, vi } from "vitest";
import { getCommunityPage, submitCommunityWebsite } from "./client";

describe("community browser client (Task 7)", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("rejects missing or non-http(s) baseUrl configuration before fetching", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");

    await expect(
      getCommunityPage("", { query: "", downloadsOnly: false }),
    ).rejects.toMatchObject({
      code: "missing_config",
    });

    await expect(
      getCommunityPage("javascript:alert(1)", { query: "", downloadsOnly: false }),
    ).rejects.toMatchObject({
      code: "invalid_config",
    });

    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("rejects malformed pagination cursors before making a request", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");

    await expect(
      getCommunityPage("https://community.example.test", {
        query: "",
        downloadsOnly: false,
        cursor: "not valid base64url!!!",
      }),
    ).rejects.toMatchObject({
      code: "invalid_cursor",
    });

    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("validates public response URLs and rejects unsafe websiteUrl, creditUrl, or asset URLs", async () => {
    const validItem = {
      id: "sub-1",
      title: "Studio Alpha",
      description: "Clean editorial site.",
      websiteUrl: "https://alpha.example.com/",
      creatorName: "Alpha Team",
      creditUrl: "https://alpha.example.com/team",
      approvedAt: "2026-11-07T10:00:00.000Z",
      imageUrl: "https://community.example.test/v1/community/sub-1/image",
      downloadUrl: "https://community.example.test/v1/community/sub-1/download",
    };

    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      new Response(JSON.stringify({ items: [validItem], nextCursor: null }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );

    const page = await getCommunityPage("https://community.example.test", {
      query: "alpha",
      downloadsOnly: true,
    });
    expect(page.items).toHaveLength(1);
    expect(page.items[0]).toEqual(validItem);

    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          items: [{ ...validItem, websiteUrl: "javascript:alert(1)" }],
          nextCursor: null,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      ),
    );

    await expect(
      getCommunityPage("https://community.example.test", {
        query: "",
        downloadsOnly: false,
      }),
    ).rejects.toMatchObject({
      code: "invalid_response",
    });

    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          items: [{ ...validItem, creditUrl: "http://insecure.example.com/" }],
          nextCursor: null,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      ),
    );

    await expect(
      getCommunityPage("https://community.example.test", {
        query: "",
        downloadsOnly: false,
      }),
    ).rejects.toMatchObject({
      code: "invalid_response",
    });

    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          items: [{ ...validItem, downloadUrl: "https://evil.example.com/payload.html" }],
          nextCursor: null,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      ),
    );

    await expect(
      getCommunityPage("https://community.example.test", {
        query: "",
        downloadsOnly: false,
      }),
    ).rejects.toMatchObject({
      code: "invalid_response",
    });
  });

  it("submits multipart FormData with Idempotency-Key and no credentials or forced Content-Type", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          receiptId: "sub-receipt-1",
          status: "pending",
        }),
        { status: 201, headers: { "Content-Type": "application/json" } },
      ),
    );

    const form = new FormData();
    form.set("websiteUrl", "https://example.com");
    form.set("creatorName", "Example Studio");

    const receipt = await submitCommunityWebsite(
      "https://community.example.test",
      form,
      "11111111-1111-4111-8111-111111111111",
    );

    expect(receipt).toEqual({
      receiptId: "sub-receipt-1",
      status: "pending",
    });

    expect(fetchSpy).toHaveBeenCalledTimes(1);
    const [url, init] = fetchSpy.mock.calls[0];
    expect(url).toBe("https://community.example.test/v1/submissions");
    expect(init?.method).toBe("POST");
    expect(init?.credentials).toBe("omit");
    expect(init?.body).toBe(form);
    const headers = init?.headers as Record<string, string>;
    expect(headers["Idempotency-Key"]).toBe("11111111-1111-4111-8111-111111111111");
    expect(headers["Content-Type"]).toBeUndefined();
  });

  it("maps submission error responses with field errors and Retry-After metadata", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          error: {
            code: "invalid_input",
            message: "websiteUrl must use HTTPS.",
            fields: { websiteUrl: "URL must start with https://." },
          },
        }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      ),
    );

    await expect(
      submitCommunityWebsite(
        "https://community.example.test",
        new FormData(),
        "11111111-1111-4111-8111-111111111111",
      ),
    ).rejects.toMatchObject({
      code: "invalid_input",
      status: 400,
      fields: { websiteUrl: "URL must start with https://." },
    });

    vi.spyOn(globalThis, "fetch").mockResolvedValueOnce(
      new Response(
        JSON.stringify({
          error: {
            code: "rate_limited",
            message: "Too many submission attempts.",
          },
          retryAfter: 120,
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": "120",
          },
        },
      ),
    );

    await expect(
      submitCommunityWebsite(
        "https://community.example.test",
        new FormData(),
        "11111111-1111-4111-8111-111111111111",
      ),
    ).rejects.toMatchObject({
      code: "rate_limited",
      status: 429,
      retryAfter: 120,
    });
  });
});
