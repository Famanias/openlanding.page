import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { AssetStore } from "./assets";
import { collectAssets } from "./export";
import { createHash } from "node:crypto";

describe("authored media collection", () => {
  it("embeds dynamically constructed HIYAS clips outside the 3D gallery category", async () => {
    const root = process.cwd();
    const assets = new AssetStore(root);
    await collectAssets("hiyas", root, assets);
    for (const clip of ["camp-wind", "camp-wind-m", "route-dawn", "route-dawn-m"]) {
      const url = `/templates/hiyas/clips/${clip}.mp4`;
      expect(assets.entries[url], url).toMatch(/^data:video\/mp4;base64,/);
      const embedded = Buffer.from(assets.entries[url].split(",")[1], "base64");
      const sha256 = (bytes: Buffer) => createHash("sha256").update(bytes).digest("hex");
      expect(sha256(embedded)).toBe(sha256(fs.readFileSync(path.join(root, "public", url))));
    }
    expect(assets.entries["/templates/hiyas/mountains/everest.svg"]).toMatch(/^data:image\/svg\+xml;base64,/);
    expect(assets.aliases["/templates/hiyas/hero-route-800.avif"]).toBe("/templates/hiyas/hero-route-1600.webp");
  });
});
