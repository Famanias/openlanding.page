import { defineConfig, devices } from "@playwright/test";

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
    command: "bun run build && bun run start -- -p 3100",
    url: "http://localhost:3100",
    reuseExistingServer: false,
    env: { NODE_OPTIONS: "--max-old-space-size=4096" },
    timeout: 300_000,
  },
});
