import { defineConfig } from "@playwright/test";
import config from "./playwright.config";

process.env.WAYPOINT_STANDALONE_FILE = "public/downloads/waypoint.html";

export default defineConfig({
  ...config,
  testMatch: "waypoint.spec.ts",
  webServer: undefined,
  use: { ...config.use, offline: true },
});
