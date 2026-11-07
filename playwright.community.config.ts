import { defineConfig, devices } from "@playwright/test";
import { existsSync } from "node:fs";
import path from "node:path";

const offlineFontMock = path.resolve(
  process.cwd(),
  ".openlanding-page/volume-zero/scratch/font-mocks.cjs",
);
const nextPort = 3200;
const baseURL = `http://localhost:${nextPort}`;
const apiOrigin = "http://localhost:8787";

export default defineConfig({
  testDir: "tests/community-e2e",
  fullyParallel: false,
  workers: 1,
  reporter: [["list"]],
  use: {
    baseURL,
    trace: "retain-on-failure",
    permissions: ["clipboard-read", "clipboard-write"],
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        channel: process.env.PLAYWRIGHT_CHROMIUM_CHANNEL,
      },
    },
  ],
  webServer: [
    {
      command: `npm run prebuild && npx next build && npx next start --port ${nextPort}`,
      url: baseURL,
      reuseExistingServer: false,
      env: {
        VOTES_ALLOW_MEMORY: "1",
        NEXT_PUBLIC_COMMUNITY_API_URL: apiOrigin,
        NEXT_PUBLIC_TURNSTILE_SITE_KEY: "1x00000000000000000000AA",
        NODE_OPTIONS: "--max-old-space-size=4096",
        ...(existsSync(offlineFontMock)
          ? { NEXT_FONT_GOOGLE_MOCKED_RESPONSES: offlineFontMock }
          : {}),
      },
      timeout: 300_000,
    },
  ],
});
