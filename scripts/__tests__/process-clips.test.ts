import { mkdtempSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { describe, expect, test } from "vitest";
import { processClips } from "../process-clips";

function fixture() {
  const root = mkdtempSync(path.join(tmpdir(), "truecut-clips-"));
  const incoming = path.join(root, "incoming");
  const publicDir = path.join(root, "public");
  mkdirSync(incoming);
  mkdirSync(publicDir);
  return { incoming, publicDir, assetsModule: path.join(root, "videos.generated.ts") };
}

describe("processClips", () => {
  test("empty input stays a placeholder and does not require ffmpeg", async () => {
    const paths = fixture();
    const assets = await processClips(paths, async () => { throw new Error("must not encode"); });
    expect(assets).toEqual({});
    expect(readFileSync(paths.assetsModule, "utf8")).toContain("= {};");
    expect(readdirSync(paths.publicDir)).toEqual([]);
  });

  test("publishes both variants and retains existing pairs for partial deliveries", async () => {
    const paths = fixture();
    writeFileSync(path.join(paths.incoming, "hero-site-reel.mp4"), "source fixture");
    for (const file of ["process-proof.mp4", "process-proof-m.mp4"]) writeFileSync(path.join(paths.publicDir, file), "existing fixture");
    const calls: string[][] = [];
    const assets = await processClips(paths, async (args) => {
      calls.push(args);
      writeFileSync(args.at(-1)!, "encoded fixture");
    });
    expect(Object.keys(assets)).toEqual(["hero-site-reel", "process-proof"]);
    expect(calls).toHaveLength(2);
    expect(calls[0]).toEqual(expect.arrayContaining(["libx264", "yuv420p", "-an", "+faststart", "8"]));
    expect(calls[1]).toEqual(expect.arrayContaining(["scale=-2:min(720\\,trunc(ih/2)*2),setsar=1", "4"]));
    expect(readdirSync(paths.publicDir).sort()).toEqual(["hero-site-reel-m.mp4", "hero-site-reel.mp4", "process-proof-m.mp4", "process-proof.mp4"]);
    expect(readFileSync(paths.assetsModule, "utf8")).toContain('"mobile": "hero-site-reel-m.mp4"');
  });

  test("encoding failure preserves published files and manifest and cleans staging", async () => {
    const paths = fixture();
    writeFileSync(path.join(paths.incoming, "hero-site-reel.mp4"), "source fixture");
    writeFileSync(path.join(paths.publicDir, "hero-site-reel.mp4"), "original");
    writeFileSync(paths.assetsModule, "original manifest");
    let calls = 0;
    await expect(processClips(paths, async (args) => {
      if (++calls === 2) throw new Error("bad input");
      writeFileSync(args.at(-1)!, "new fixture");
    })).rejects.toThrow("bad input");
    expect(readFileSync(path.join(paths.publicDir, "hero-site-reel.mp4"), "utf8")).toBe("original");
    expect(readFileSync(paths.assetsModule, "utf8")).toBe("original manifest");
    expect(readdirSync(paths.publicDir)).toEqual(["hero-site-reel.mp4"]);
  });

  test("does not register an incomplete existing pair", async () => {
    const paths = fixture();
    writeFileSync(path.join(paths.publicDir, "hero-site-reel.mp4"), "existing fixture");
    expect(await processClips(paths)).toEqual({});
  });
});
