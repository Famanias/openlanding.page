import { describe, expect, test } from "vitest";
import { findIsolationViolations } from "../check-isolation";

describe("findIsolationViolations", () => {
  test("flags alias imports and imports that leave the template folder", () => {
    expect(
      findIsolationViolations("cairn", [
        {
          path: "src/app/(cairn)/cairn/page.tsx",
          source: `import x from '@/lib/x'; import y from '../../(orrery)/a'; import z from './z'; import gsap from 'gsap'`,
        },
      ]),
    ).toEqual([
      { path: "src/app/(cairn)/cairn/page.tsx", specifier: "@/lib/x" },
      { path: "src/app/(cairn)/cairn/page.tsx", specifier: "../../(orrery)/a" },
    ]);
  });

  test("allows relative imports that stay inside the route group, including from its layout", () => {
    expect(
      findIsolationViolations("cairn", [
        { path: "src/app/(cairn)/layout.tsx", source: `import "./cairn/cairn.css"; import { Logo } from "./cairn/brand/Logo";` },
        { path: "src/app/(cairn)/cairn/ascent/Stage.tsx", source: `import { CAMPS } from "../route";` },
      ]),
    ).toEqual([]);
  });

  test("checks dynamic imports and export-from too", () => {
    expect(
      findIsolationViolations("koji", [
        {
          path: "src/app/(koji)/koji/page.tsx",
          source: `const D = await import("../../(index)/x"); export { y } from "@/y";`,
        },
      ]),
    ).toEqual([
      { path: "src/app/(koji)/koji/page.tsx", specifier: "../../(index)/x" },
      { path: "src/app/(koji)/koji/page.tsx", specifier: "@/y" },
    ]);
  });
});
