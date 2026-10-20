import { describe, expect, test } from "vitest";
import { findIsolationViolations } from "../check-isolation";

describe("findIsolationViolations", () => {
  test("flags alias imports and imports that leave the template folder", () => {
    expect(
      findIsolationViolations("keytu", [
        {
          path: "src/app/(keytu)/keytu/page.tsx",
          source: `import x from '@/lib/x'; import y from '../../(orrery)/a'; import z from './z'; import gsap from 'gsap'`,
        },
      ]),
    ).toEqual([
      { path: "src/app/(keytu)/keytu/page.tsx", specifier: "@/lib/x" },
      { path: "src/app/(keytu)/keytu/page.tsx", specifier: "../../(orrery)/a" },
    ]);
  });

  test("allows relative imports that stay inside the route group, including from its layout", () => {
    expect(
      findIsolationViolations("keytu", [
        { path: "src/app/(keytu)/layout.tsx", source: `import "./keytu/keytu.css"; import { Logo } from "./keytu/brand/Logo";` },
        { path: "src/app/(keytu)/keytu/ascent/Stage.tsx", source: `import { CAMPS } from "../route";` },
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
