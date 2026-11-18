import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("next/font/google", () => ({
  Geist: () => ({ variable: "--font-geist-sans" }),
  Geist_Mono: () => ({ variable: "--font-geist-mono" }),
}));

vi.mock("./index.css", () => ({}));

vi.mock("@/lib/site", () => ({
  SITE_URL: "https://www.openlanding.page",
  SITE_NAME: "OpenLandingPage",
  SITE_NAME_SPACED: "Open Landing Page",
}));

describe("IndexLayout metadata verification", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it("omits verification when env vars are unset or whitespace", async () => {
    vi.stubEnv("GOOGLE_SITE_VERIFICATION", "");
    vi.stubEnv("BING_SITE_VERIFICATION", "   ");
    vi.resetModules();

    const { metadata } = await import("./layout");
    expect(metadata.verification).toBeUndefined();
  });

  it("sets verification.google and verification.other['msvalidate.01'] when env vars are set", async () => {
    vi.stubEnv("GOOGLE_SITE_VERIFICATION", "google-token-123");
    vi.stubEnv("BING_SITE_VERIFICATION", "bing-token-456");
    vi.resetModules();

    const { metadata } = await import("./layout");
    expect(metadata.verification).toEqual({
      google: "google-token-123",
      other: { "msvalidate.01": "bing-token-456" },
    });
  });

  it("supports setting only one verification token without emitting empty tags for the other", async () => {
    vi.stubEnv("GOOGLE_SITE_VERIFICATION", "google-only");
    vi.stubEnv("BING_SITE_VERIFICATION", "");
    vi.resetModules();

    const { metadata } = await import("./layout");
    expect(metadata.verification).toEqual({ google: "google-only" });
  });
});
