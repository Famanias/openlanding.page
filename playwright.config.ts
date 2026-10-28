import { defineConfig, devices } from "@playwright/test";
import { existsSync } from "node:fs";
import path from "node:path";

const offlineFontMock = path.resolve(process.cwd(), ".openlanding-page/volume-zero/scratch/font-mocks.cjs");
const port = Number(process.env.PLAYWRIGHT_PORT ?? "3100");
if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error("PLAYWRIGHT_PORT must be a valid port number");
const baseURL = `http://localhost:${port}`;

export default defineConfig({
  testDir: "tests/e2e",
  fullyParallel: true,
  // Several Chromium pages render WebGL at once; cap parallelism so shared machines don't run out of memory.
  workers: 3,
  reporter: [["list"]],
  use: {
    baseURL,
    trace: "retain-on-failure",
    permissions: ["clipboard-read", "clipboard-write"],
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    // Tailwind is wired through turbopack.rules in next.config.ts, so build with Turbopack: `--webpack` skips
    // it and drops every utility class (overflow-hidden, overflow-x-auto, ...) from templates that use them.
    command: `npm run prebuild && npx next build && npx next start --port ${port}`,
    url: baseURL,
    reuseExistingServer: true,
    env: {
      VOTES_ALLOW_MEMORY: "1",
      NODE_OPTIONS: "--max-old-space-size=4096",
      ...(existsSync(offlineFontMock) ? { NEXT_FONT_GOOGLE_MOCKED_RESPONSES: offlineFontMock } : {}),
    },
    timeout: 300_000,
  },
});
