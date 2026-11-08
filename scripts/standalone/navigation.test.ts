import { it, expect } from "vitest";
import { chromium } from "@playwright/test";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { openStandalone } from "../../tests/standalone/open";

it("resets to about:blank between original deep-link checks and retains each file hash", async () => {
  const directory = await fs.mkdtemp(path.join(os.tmpdir(), "standalone-navigation-"));
  const previous = process.env.STANDALONE_DIRECTORY;
  const browser = await chromium.launch();
  try {
    process.env.STANDALONE_DIRECTORY = directory;
    await fs.writeFile(path.join(directory, "wowflutter.html"), "<!doctype html><h1>Issue</h1>");
    const page = await browser.newPage();
    await openStandalone(page, "/wowflutter#p10");
    expect(new URL(page.url()).hash).toBe("#p10");
    await openStandalone(page, "about:blank");
    expect(page.url()).toBe("about:blank");
    await openStandalone(page, "/wowflutter#p5");
    expect(new URL(page.url()).hash).toBe("#p5");
  } finally {
    await browser.close();
    if (previous === undefined) delete process.env.STANDALONE_DIRECTORY;
    else process.env.STANDALONE_DIRECTORY = previous;
    await fs.rm(directory, { recursive: true, force: true });
  }
});
