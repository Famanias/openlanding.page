import { defineConfig, devices } from "@playwright/test";
import { existsSync } from "node:fs";
import path from "node:path";

const offlineFontMock = path.resolve(process.cwd(), ".openlanding-page/volume-zero/scratch/font-mocks.cjs");

export default defineConfig({
  testDir: "tests/e2e",
  fullyParallel: true,
  // Several Chromium pages render WebGL at once; cap parallelism so shared machines don't run out of memory.
  workers: 3,
  reporter: [["list"]],
  use: {
    baseURL: "http://localhost:3100",
    trace: "retain-on-failure",
    permissions: ["clipboard-read", "clipboard-write"],
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "bunx next build --webpack && bun run start -- -p 3100",
    url: "http://localhost:3100",
    reuseExistingServer: false,
    env: {
      NODE_OPTIONS: "--max-old-space-size=4096",
      ...(existsSync(offlineFontMock) ? { NEXT_FONT_GOOGLE_MOCKED_RESPONSES: offlineFontMock } : {}),
    },
    timeout: 300_000,
  },
});
