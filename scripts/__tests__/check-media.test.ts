import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, test } from "vitest";
import { findMediaViolations } from "../check-media";
import type { SourceFile } from "../templates.config";

describe("findMediaViolations", () => {
  let tempDir: string;
  let originalCwd: string;

  beforeEach(() => {
    originalCwd = process.cwd();
    tempDir = mkdtempSync(path.join(tmpdir(), "media-test-"));
    process.chdir(tempDir);
  });

  afterEach(() => {
    process.chdir(originalCwd);
    rmSync(tempDir, { recursive: true, force: true });
  });

  test("returns empty when assets.generated.ts does not exist", () => {
    const files: SourceFile[] = [
      { path: "src/app/(test)/test/page.tsx", source: "export default function Page() { return <div>Hi</div>; }" },
    ];
    expect(findMediaViolations("test", files)).toEqual([]);
  });

  test("returns empty when assets.generated.ts has no registered keys", () => {
    const genDir = "src/app/(test)/test";
    mkdirSync(genDir, { recursive: true });
    writeFileSync(path.join(genDir, "assets.generated.ts"), "export const ASSETS = {};\n");

    const files: SourceFile[] = [
      { path: "src/app/(test)/test/page.tsx", source: "export default function Page() { return <div>Hi</div>; }" },
    ];
    expect(findMediaViolations("test", files)).toEqual([]);
  });

  test("flags missing public directory when assets are registered", () => {
    const genDir = "src/app/(test)/test";
    mkdirSync(genDir, { recursive: true });
    writeFileSync(
      path.join(genDir, "assets.generated.ts"),
      'export const ASSETS = {\n  "hero": { "w": 800, "h": 600 },\n};\n',
    );

    const files: SourceFile[] = [
      {
        path: "src/app/(test)/test/page.tsx",
        source: 'import { Picture } from "./assets";\nexport default function Page() { return <Picture assetKey="hero" alt="hero" />; }',
      },
    ];
    const violations = findMediaViolations("test", files);
    expect(violations.some((v) => v.type === "missing_file" && v.message.includes("public directory"))).toBe(true);
  });

  test("flags missing generated webp files on disk", () => {
    const genDir = "src/app/(test)/test";
    const pubDir = "public/templates/test";
    mkdirSync(genDir, { recursive: true });
    mkdirSync(pubDir, { recursive: true });
    writeFileSync(
      path.join(genDir, "assets.generated.ts"),
      'export const ASSETS = {\n  "hero": { "w": 800, "h": 600 },\n};\n',
    );
    // Only write 800w, omit 1600w or omit both
    writeFileSync(path.join(pubDir, "other-800.webp"), "fake");

    const files: SourceFile[] = [
      {
        path: "src/app/(test)/test/page.tsx",
        source: 'import { Picture } from "./assets";\nexport default function Page() { return <Picture assetKey="hero" alt="hero" />; }',
      },
    ];
    const violations = findMediaViolations("test", files);
    expect(violations.some((v) => v.type === "missing_file" && v.message.includes("hero-800.webp"))).toBe(true);
  });

  test("flags templates with registered assets that never use Picture or ASSETS in code", () => {
    const genDir = "src/app/(test)/test";
    const pubDir = "public/templates/test";
    mkdirSync(genDir, { recursive: true });
    mkdirSync(pubDir, { recursive: true });
    writeFileSync(
      path.join(genDir, "assets.generated.ts"),
      'export const ASSETS = {\n  "hero": { "w": 800, "h": 600 },\n};\n',
    );
    writeFileSync(path.join(pubDir, "hero-800.webp"), "fake");
    writeFileSync(path.join(pubDir, "hero-1600.webp"), "fake");

    const files: SourceFile[] = [
      {
        path: "src/app/(test)/test/page.tsx",
        source: "export default function Page() { return <div className='hero'>No images used</div>; }",
      },
    ];
    const violations = findMediaViolations("test", files);
    expect(violations.some((v) => v.type === "missing_picture_usage")).toBe(true);
  });

  test("flags components referencing an assetKey not in assets.generated.ts", () => {
    const genDir = "src/app/(test)/test";
    const pubDir = "public/templates/test";
    mkdirSync(genDir, { recursive: true });
    mkdirSync(pubDir, { recursive: true });
    writeFileSync(
      path.join(genDir, "assets.generated.ts"),
      'export const ASSETS = {\n  "hero": { "w": 800, "h": 600 },\n};\n',
    );
    writeFileSync(path.join(pubDir, "hero-800.webp"), "fake");
    writeFileSync(path.join(pubDir, "hero-1600.webp"), "fake");

    const files: SourceFile[] = [
      {
        path: "src/app/(test)/test/sections/Hero.tsx",
        source: 'import { Picture } from "../assets";\nexport function Hero() { return <Picture assetKey="missing-key" alt="test" />; }',
      },
    ];
    const violations = findMediaViolations("test", files);
    expect(violations.some((v) => v.type === "unregistered_asset_key" && v.message.includes("missing-key"))).toBe(true);
  });

  test("passes cleanly when assets exist on disk and are correctly referenced", () => {
    const genDir = "src/app/(test)/test";
    const pubDir = "public/templates/test";
    mkdirSync(genDir, { recursive: true });
    mkdirSync(pubDir, { recursive: true });
    writeFileSync(
      path.join(genDir, "assets.generated.ts"),
      'export const ASSETS = {\n  "hero": { "w": 800, "h": 600 },\n};\n',
    );
    writeFileSync(path.join(pubDir, "hero-800.webp"), "fake");
    writeFileSync(path.join(pubDir, "hero-1600.webp"), "fake");

    const files: SourceFile[] = [
      {
        path: "src/app/(test)/test/page.tsx",
        source: 'import { Picture } from "./assets";\nexport default function Page() { return <Picture assetKey="hero" alt="hero" />; }',
      },
    ];
    expect(findMediaViolations("test", files)).toEqual([]);
  });
});
