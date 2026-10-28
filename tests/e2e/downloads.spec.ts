import { test, expect } from "@playwright/test";
import { readdirSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

for (const file of readdirSync(path.resolve("public/downloads")).filter((name) => name.endsWith(".html"))) {
  test(`${file} opens directly from disk without framework dependencies`, async ({ page, baseURL }) => {
    const errors: string[] = [];
    const forbidden: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
    page.on("request", (request) => {
      const url = request.url();
      if (url.includes("/_next/") || url.startsWith(new URL(baseURL!).origin)) forbidden.push(url);
      if (url.startsWith("file:") && request.resourceType() !== "document") forbidden.push(url);
    });
    await page.goto(pathToFileURL(path.resolve("public/downloads", file)).href, { waitUntil: "networkidle" });
    await expect(page.locator("h1")).toHaveText(/\S/);
    // Alpine Reel's accessible heading is deliberately visually hidden.
    expect(forbidden).toEqual([]);
    expect(errors).toEqual([]);
  });
}
