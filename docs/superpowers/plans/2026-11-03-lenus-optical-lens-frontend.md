# Lenus Optical Lens Frontend Integration Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Integrate the completed procedural 3D `lenus-optical-lens` asset into a production-ready, accessible, interactive `/lenus` Next.js 16 hero route and register it in the template gallery.

**Architecture:** Relocate the validated procedural Three.js optical lens modules into `src/app/(lenus)/lenus/model/` (with re-exports in `src/components/optical-lens/` so `.img2threejs/` tooling stays intact and `scripts/check-isolation.ts` passes). Wrap the model in a lifecycle-guarded `LenusSceneController` that renders with an alpha-transparent backdrop over the radial cosmos stage, supports damped pointer parallax, bounded `OrbitControls` inspection, interactive assembly explosion (`setExplode`), focus-ring rotation (`setFocusRing`), raycast part picking (`pickPart`), context-loss recovery, and adaptive resolution scaling. Pair the 3D stage with the reference floating glass header, stacked tri-color headline (`REALITY / IS JUST / THE START.`), progressive-enhancement SVG fallback (`LenusLensFallback`), and native accessible dialogs for navigation actions.

**Tech Stack:** Next.js 16.4.3 (App Router), React 19.3.0, TypeScript 5, Three.js 0.186.1, Tailwind CSS v4, Lucide React, Vitest 5.0.5 (`renderToStaticMarkup`), Playwright 1.64.1.

**Spec:**
- Visual & composition authority: `.img2threejs/references/lenus-hero-reference.png` (and `D:/downloads/lenus/lenus-hero-reference.png`)
- Multi-angle object references: `.img2threejs/references/front-view.png`, `.img2threejs/references/side-profile.png`, `.img2threejs/references/rear-view.png`
- Authored 3D sculpt spec: `.img2threejs/optical-lens-sculpt-spec.json` and `src/components/optical-lens/lens-spec.json`

---

## Global Constraints

- **Template Isolation (`npm run check`):** Files inside `src/app/(lenus)/` may only import npm packages or relative paths within `src/app/(lenus)/`. Never import `src/components/optical-lens/` from `src/app/(lenus)/`; instead, place the canonical model files in `src/app/(lenus)/lenus/model/` and re-export them from `src/components/optical-lens/`.
- **Zero External 3D Assets:** All geometry, physical materials, normal/roughness/emissive data textures, and HDR studio reflection maps must remain 100% procedural in code.
- **No Uninstalled Test Libraries:** Do **not** import `@testing-library/react` or `jsdom` (neither is installed in `package.json`). Use `renderToStaticMarkup` from `react-dom/server` for Vitest component tests and Playwright for live DOM/WebGL browser verification.
- **Playwright Runner Command on Windows:** Run Playwright via `node node_modules/@playwright/test/cli.js test tests/e2e/lenus.spec.ts --workers=1` (the Bun-wrapped `npx playwright` binary fails test discovery in this environment).
- **Palette Tokens (`scripts/templates.config.ts`):**
  - Midnight Obsidian Background: `#08090D`
  - Deep Cosmos Stage Surface: `#10131C`
  - Glass Pill / Card Surface: `#161924`
  - Pure Display White: `#F8FAFC`
  - Muted Technical Gray: `#9499A6`
  - Electric Lime / Chartreuse (Primary Accent & `REALITY`): `#D2F802`
  - Electric Violet / Purple (`START.` & Rim Accent): `#A855F7`
  - Optical Emerald Core: `#00E599`
  - Dark Button Ink: `#0A0B0E`
  - Exempt `src/app/(lenus)/lenus/model/` in `paletteExempt` and set `mediaExempt: true` in `scripts/templates.config.ts`.

---

## Review Focus

1. **Three-Quarter Hero Framing & Aspect Fit:** In `lenus-hero-reference.png`, the lens sits on the right half of the hero in a dramatic three-quarter oblique pose (`yaw ≈ -26°`, `pitch ≈ +8°`) where the fluted glass rings, stepped titanium collars, emerald objective, and floating glass shards read with clear depth. Resizing across wide desktop (`1440×900`), compact laptop (`900×700`), and mobile (`390×844`) viewports must fit the full outer glass ring (`radius = 2.49`) without clipping or distortion.
2. **Transparent Canvas Over Atmospheric Stage:** Unlike `.img2threejs` capture mode (`scene.background = new THREE.Color("#202125")`), the hero canvas must render with `scene.background = null` and `renderer.setClearColor(0x000000, 0)` while keeping `scene.environment = createStudioEnvironment(renderer, true).texture` so the transmissive glass refracts the studio neon strips cleanly over the CSS radial aperture rings and violet/indigo glow.
3. **Reduced Motion, No-JS, and Context-Loss Guarantees:** Under `prefers-reduced-motion: reduce`, WebGL must never mount (and toggling reduced motion on at runtime must dispose the renderer and lose its context). When JavaScript is disabled, WebGL is blocked, or `WEBGL_lose_context` fires, `<LenusLensFallback />` must remain visible with accurate status messaging.
4. **Explode, Focus Ring, and Part-Inspection Ergonomics:** The runtime hooks already built on `LensRuntime` (`setExplode`, `setFocusRing`, `pickPart`) must be wired to accessible HUD controls and pointer raycasting so visitors can explode the 16-part optical assembly (`0%` to `100%`), twist the internal focus collar, and inspect part names/materials via mouse, touch, or keyboard.
5. **Software-Renderer Frame Pacing:** Cap device pixel ratio at `1.5` and step down internal drawing-buffer resolution by 15% (to a 75% floor) after two consecutive seconds below 55 FPS so SwiftShader/software WebGL stays responsive.

---

## File Structure Map

```text
src/app/(lenus)/
  layout.tsx                                        Root layout for /lenus (Syne / Space Grotesk + Plus Jakarta Sans + JetBrains Mono, scoped CSS, <noscript> fallback rules)
  lenus/
    page.tsx                                        Server page entry exporting metadata and rendering <LenusApp />
    LenusApp.tsx                                    Client experience shell managing active modal dialogs and stage suspension
    LenusApp.test.tsx                               SSR unit test for full hero composition
    lenus.css                                       Scoped @theme tokens and .ln-* styles (glass pill nav, radial aperture backdrop, bloom, HUD, responsive layout)
    DESIGN.md                                       Full design & motion specification
    PROMPT.md                                       Self-contained rebuild prompt for gallery copy bundle
    icon.svg                                        Concentric emerald/lime optical aperture favicon
    opengraph-image.tsx                             1200×630 next/og social preview card
    model/
      lens-spec.json                                Authored 16-component optical lens specification
      createOpticalLensModel.ts                     Procedural Three.js Group factory + LensRuntime (setExplode, setFocusRing, pickPart, dispose)
      createOpticalLensModel.test.ts                Unit tests for hierarchy, welded seam normals, setExplode, setFocusRing, and pickPart
      lensMaterials.ts                              Procedural roughness/normal/emissive DataTextures & MeshPhysicalMaterials
      studioEnvironment.ts                          HDR PMREM studio & neon reflection card environment
      createOpticalLensScene.ts                     Standalone studio scene wrapper (used by .img2threejs preview/capture)
    scene/
      LenusSceneController.ts                       Hero WebGL controller (transparent background, perspective/ortho camera fit, damped parallax, OrbitControls, explode/focus lerping, part picking, context loss/restore, adaptive DPR)
      LenusSceneController.test.ts                  Unit tests for pointer normalization, camera distance math, explode/focus state clamping, and idempotent lifecycle
    components/
      LenusHeader.tsx                               Floating pill navbar (LENUS geometric wordmark, WORK / EXPERTISE / TECHNOLOGY / ABOUT links, GET IN TOUCH lime pill CTA, mobile menu)
      LenusHeroCopy.tsx                             Stacked tri-color headline ("REALITY / IS JUST / THE START."), subtitle, and "STEP INSIDE →" CTA
      LenusHeroCopy.test.tsx                        SSR unit test for exact copy and CTA controls
      LenusLensFallback.tsx                         Procedural SVG optical lens illustration for SSR, no-JS, reduced-motion, and WebGL-unavailable states
      LenusLensFallback.test.tsx                    SSR unit test for SVG fallback structure
      LenusHudControls.tsx                          Interactive optical telemetry HUD (Explode slider/toggle, Focus ring dial, inspected part readout, FPS/status badge, Pause/Reset controls)
      LenusHudControls.test.tsx                     SSR unit test for HUD controls and ARIA labels
      LenusOpticalLensCanvas.tsx                    Client 3D stage mounting LenusSceneController, ResizeObserver, IntersectionObserver, keyboard shortcuts, raycast hover/click, and HUD
      LenusOpticalLensCanvas.test.tsx               SSR progressive enhancement test
src/components/optical-lens/
  createOpticalLensModel.ts                         Re-exports from ../../app/(lenus)/lenus/model/createOpticalLensModel
  createOpticalLensScene.ts                         Re-exports from ../../app/(lenus)/lenus/model/createOpticalLensScene
  lensMaterials.ts                                  Re-exports from ../../app/(lenus)/lenus/model/lensMaterials
  studioEnvironment.ts                              Re-exports from ../../app/(lenus)/lenus/model/studioEnvironment
tests/e2e/
  lenus.spec.ts                                     End-to-end Playwright test suite (WebGL rendering, explode/focus controls, dialogs, context loss, reduced motion, mobile overflow, no-JS)
```

---

## Tasks

### Task 1: Relocate Optical Lens Model into `src/app/(lenus)/lenus/model/` & Add Model Unit Tests

**Files:**
- Create: `src/app/(lenus)/lenus/model/lens-spec.json`
- Create: `src/app/(lenus)/lenus/model/createOpticalLensModel.ts`
- Create: `src/app/(lenus)/lenus/model/lensMaterials.ts`
- Create: `src/app/(lenus)/lenus/model/studioEnvironment.ts`
- Create: `src/app/(lenus)/lenus/model/createOpticalLensScene.ts`
- Modify: `src/components/optical-lens/createOpticalLensModel.ts`
- Modify: `src/components/optical-lens/lensMaterials.ts`
- Modify: `src/components/optical-lens/studioEnvironment.ts`
- Modify: `src/components/optical-lens/createOpticalLensScene.ts`
- Test: `src/app/(lenus)/lenus/model/createOpticalLensModel.test.ts`

**Interfaces:**
- Consumes: `three`, `three/examples/jsm/geometries/RoundedBoxGeometry.js`
- Produces:
  ```ts
  export const BUILD_PASSES: readonly ["blockout", "structural-pass", "form-refinement", "material-pass", "surface-pass", "lighting-pass", "interaction-pass", "optimization-pass"];
  export type LensBuildPass = (typeof BUILD_PASSES)[number];
  export type OpticalLensSpec = typeof defaultSpec;
  export type OpticalLensOptions = { pass?: LensBuildPass; quality?: "high" | "low" };
  export type LensRuntime = {
    nodes: Record<string, THREE.Group>;
    meshes: Record<string, THREE.Mesh>;
    sockets: Record<string, THREE.Object3D>;
    colliders: Record<string, { type: string; radius: number; depth: number }>;
    destructionGroups: Record<string, THREE.Object3D[]>;
    setExplode: (amount: number) => void;
    setFocusRing: (radians: number) => void;
    pickPart: (object: THREE.Object3D | null) => THREE.Group | null;
    dispose: () => void;
  };
  export function createOpticalLensModel(spec?: OpticalLensSpec, options?: OpticalLensOptions): THREE.Group;
  ```

- [x] **Step 1: Write the failing test**

```ts
// src/app/(lenus)/lenus/model/createOpticalLensModel.test.ts
import { describe, expect, it } from "vitest";
import * as THREE from "three";
import { createOpticalLensModel, type LensRuntime } from "./createOpticalLensModel";

describe("createOpticalLensModel", () => {
  it("constructs all 16 optical components with welded fluted-torus seam normals", () => {
    const model = createOpticalLensModel(undefined, { pass: "optimization-pass", quality: "low" });
    const runtime = model.userData.sculptRuntime as LensRuntime;
    expect(Object.keys(runtime.nodes)).toHaveLength(16);
    expect(Object.keys(runtime.sockets)).toHaveLength(16);

    const outerGlass = runtime.meshes["outer-glass"];
    const n = outerGlass.geometry.getAttribute("normal");
    // Tubular seam at row 12 (col 0 vs col 128 for quality="low" where tubularSegments = 128)
    const stride = 129;
    const i0 = 12 * stride;
    const i1 = i0 + 128;
    expect(Math.abs(n.getX(i0) - n.getX(i1))).toBeLessThan(1e-5);
    expect(Math.abs(n.getY(i0) - n.getY(i1))).toBeLessThan(1e-5);
    expect(Math.abs(n.getZ(i0) - n.getZ(i1))).toBeLessThan(1e-5);
    runtime.dispose();
  });

  it("supports reversible setExplode, setFocusRing, and pickPart", () => {
    const model = createOpticalLensModel(undefined, { pass: "optimization-pass", quality: "low" });
    const runtime = model.userData.sculptRuntime as LensRuntime;
    const baseZ = runtime.nodes["front-lens"].position.z;

    runtime.setExplode(1);
    expect(runtime.nodes["front-lens"].position.z).toBeGreaterThan(baseZ);
    runtime.setExplode(0);
    expect(runtime.nodes["front-lens"].position.z).toBeCloseTo(baseZ, 5);

    runtime.setFocusRing(0.45);
    expect(runtime.nodes["collar-outer"].rotation.z).toBeCloseTo(0.45, 5);

    const picked = runtime.pickPart(runtime.meshes["front-lens"]);
    expect(picked?.name).toBe("front-lens");
    expect(runtime.pickPart(new THREE.Object3D())).toBeNull();
    runtime.dispose();
  });
});
```

- [x] **Step 2: Run test to verify it fails**

Run: `npx vitest run "src/app/(lenus)/lenus/model/createOpticalLensModel.test.ts"`
Expected: FAIL with `Cannot find module './createOpticalLensModel'`

- [x] **Step 3: Copy the optical lens modules into `src/app/(lenus)/lenus/model/` and convert `src/components/optical-lens/*.ts` into thin re-exports**

Copy `lens-spec.json`, `createOpticalLensModel.ts`, `lensMaterials.ts`, `studioEnvironment.ts`, and `createOpticalLensScene.ts` from `src/components/optical-lens/` into `src/app/(lenus)/lenus/model/`. Replace the four `.ts` files in `src/components/optical-lens/` with `export * from "../../app/(lenus)/lenus/model/<file>";` so `.img2threejs/preview.ts` and `.img2threejs/capture.mjs` continue working without duplicating logic.

- [x] **Step 4: Run test to verify it passes**

Run: `npx vitest run "src/app/(lenus)/lenus/model/createOpticalLensModel.test.ts"`
Expected: PASS (2 passed)

- [x] **Step 5: Commit**

```bash
git add "src/app/(lenus)/lenus/model" src/components/optical-lens
git commit -m "feat(lenus): relocate optical lens 3D model into route-local model directory"
```

---

### Task 2: Hero 3D Scene Controller (`LenusSceneController.ts`)

**Files:**
- Create: `src/app/(lenus)/lenus/scene/LenusSceneController.ts`
- Test: `src/app/(lenus)/lenus/scene/LenusSceneController.test.ts`

**Interfaces:**
- Consumes: `createOpticalLensModel`, `createStudioEnvironment`, `OrbitControls` from `three/addons/controls/OrbitControls.js`
- Produces:
  ```ts
  export type LenusPartInfo = {
    id: string;
    label: string;
    material: string;
    role: string;
  };
  export function normalizePointer(value: number): number;
  export function fitHeroFrustumHalfHeight(width: number, height: number): number;
  export function getPartTelemetry(componentId: string | null): LenusPartInfo;

  export interface LenusSceneOptions {
    onFps?: (fps: number) => void;
    onContextChange?: (state: "lost" | "restored") => void;
    onInteractionChange?: (dragging: boolean) => void;
    onPartChange?: (part: LenusPartInfo) => void;
  }

  export class LenusSceneController {
    constructor(options?: LenusSceneOptions);
    init(container: HTMLElement): void;
    getRenderer(): THREE.WebGLRenderer | null;
    resize(width: number, height: number): void;
    setPointer(x: number, y: number): void;
    setExplodeTarget(amount: number): void;
    setFocusTarget(radians: number): void;
    pickAtNormalizedCanvas(nx: number, ny: number): LenusPartInfo;
    rotateView(deltaYaw: number, deltaPitch: number): void;
    resetView(): void;
    start(): void;
    stop(): void;
    dispose(): void;
  }
  ```

- [x] **Step 1: Write the failing test**

```ts
// src/app/(lenus)/lenus/scene/LenusSceneController.test.ts
import { describe, expect, it, vi } from "vitest";
import {
  fitHeroFrustumHalfHeight,
  getPartTelemetry,
  LenusSceneController,
  normalizePointer,
} from "./LenusSceneController";

describe("LenusSceneController", () => {
  it("guards all methods before init and after idempotent disposal", () => {
    const controller = new LenusSceneController({ onFps: vi.fn() });
    expect(controller.getRenderer()).toBeNull();
    expect(() => {
      controller.resize(1200, 800);
      controller.setPointer(0.4, -0.3);
      controller.setExplodeTarget(0.8);
      controller.setFocusTarget(1.2);
      controller.rotateView(1, -1);
      controller.resetView();
      controller.start();
      controller.stop();
      controller.dispose();
      controller.dispose();
      controller.setPointer(NaN, Infinity);
      controller.setExplodeTarget(NaN);
    }).not.toThrow();
    expect(controller.getRenderer()).toBeNull();
  });

  it("normalizes pointer coordinates and computes frustration-free orthographic half-height across aspect ratios", () => {
    expect(normalizePointer(3.5)).toBe(1);
    expect(normalizePointer(-2)).toBe(-1);
    expect(normalizePointer(NaN)).toBe(0);

    const landscape = fitHeroFrustumHalfHeight(1200, 800);
    const portrait = fitHeroFrustumHalfHeight(360, 640);
    expect(landscape).toBeCloseTo(2.75, 2);
    expect(portrait).toBeGreaterThan(landscape);
    expect(portrait * (360 / 640)).toBeGreaterThanOrEqual(2.75);
  });

  it("maps optical component IDs to human-readable telemetry metadata", () => {
    expect(getPartTelemetry("front-lens")).toEqual({
      id: "front-lens",
      label: "EMERALD OBJECTIVE CORE",
      material: "DOPED FLUORITE / N=1.52",
      role: "Primary chromatic-dispersion singlet with internal 520nm fluorescence",
    });
    expect(getPartTelemetry(null).id).toBe("assembly");
  });
});
```

- [x] **Step 2: Run test to verify it fails**

Run: `npx vitest run "src/app/(lenus)/lenus/scene/LenusSceneController.test.ts"`
Expected: FAIL with `Cannot find module './LenusSceneController'`

- [x] **Step 3: Implement `LenusSceneController.ts`**

Implement `LenusSceneController` with:
- `WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" })`, `setClearColor(0x000000, 0)`, `outputColorSpace = THREE.SRGBColorSpace`, `toneMapping = THREE.ACESFilmicToneMapping`, and `canvas.dataset.lenusRenderer = "true"`.
- `scene.background = null` and `scene.environment = createStudioEnvironment(renderer, true).texture`.
- Studio lighting matching `createOpticalLensScene.ts`: `HemisphereLight(0xe5eeff, 0x282631, 2)`, key `DirectionalLight(0xffffff, 3)` at `[-3, 5, 4]`, fill `DirectionalLight(0xdde4ff, 1.4)` at `[3, 0, -4]`, lime rim `DirectionalLight("#D2F802", 1.8)` at `[-4, 4, -0.4]`, purple rim `DirectionalLight("#A855F7", 1.5)` at `[4, -3, -0.4]`.
- Default three-quarter hero orientation matching `lenus-hero-reference.png`: base camera orbit at `azimuth = -0.46 rad (-26.4°)`, `polar = Math.PI / 2 - 0.14 rad (+8°)` at radius `12`, with `OrthographicCamera` half-height computed by `fitHeroFrustumHalfHeight(width, height)` (`Math.max(2.75, 2.75 / aspect)`) so the `2.49`-radius outer glass ring never clips on portrait viewports.
- Smooth delta-time damped pointer parallax (`±0.14 rad`), smooth lerping of `explodeAmount` (`runtime.setExplode`) and `focusRadians` (`runtime.setFocusRing`), subtle ambient float on the `shards` group, `OrbitControls` with `enableZoom = false` and `touchAction = "pan-y pinch-zoom"`, `Raycaster` part picking via `runtime.pickPart`, `webglcontextlost` / `webglcontextrestored` listeners, and DPR capped at `1.5` with adaptive step-down to `0.75` if FPS stays below 55 for 2 seconds.

- [x] **Step 4: Run test to verify it passes**

Run: `npx vitest run "src/app/(lenus)/lenus/scene/LenusSceneController.test.ts"`
Expected: PASS (3 passed)

- [x] **Step 5: Commit**

```bash
git add "src/app/(lenus)/lenus/scene/LenusSceneController.ts" "src/app/(lenus)/lenus/scene/LenusSceneController.test.ts"
git commit -m "feat(lenus): add hero 3D scene controller with parallax, explode, and part picking"
```

---

### Task 3: Procedural SVG Fallback (`LenusLensFallback.tsx`) & Optical Telemetry HUD (`LenusHudControls.tsx`)

**Files:**
- Create: `src/app/(lenus)/lenus/components/LenusLensFallback.tsx`
- Create: `src/app/(lenus)/lenus/components/LenusHudControls.tsx`
- Test: `src/app/(lenus)/lenus/components/LenusLensFallback.test.tsx`
- Test: `src/app/(lenus)/lenus/components/LenusHudControls.test.tsx`

**Interfaces:**
- Consumes: `LenusPartInfo` from `../scene/LenusSceneController`, `lucide-react` (`Layers`, `RotateCw`, `Pause`, `Play`, `RotateCcw`, `Sparkles`)
- Produces:
  ```tsx
  export default function LenusLensFallback(): React.JSX.Element;
  export function LenusHudControls(props: {
    state: "preview" | "running" | "paused" | "static" | "unavailable" | "lost";
    fps: number;
    exploded: boolean;
    explodeAmount: number;
    focusAngle: number;
    activePart: LenusPartInfo;
    paused: boolean;
    onToggleExplode: () => void;
    onExplodeChange: (value: number) => void;
    onFocusChange: (radians: number) => void;
    onResetView: () => void;
    onTogglePause: () => void;
  }): React.JSX.Element;
  ```

- [x] **Step 1: Write the failing tests**

```tsx
// src/app/(lenus)/lenus/components/LenusLensFallback.test.tsx
import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import LenusLensFallback from "./LenusLensFallback";

describe("LenusLensFallback", () => {
  it("renders a layered SVG representation of the fluted glass rings, titanium collars, emerald core, and shards", () => {
    const html = renderToStaticMarkup(<LenusLensFallback />);
    expect(html).toContain('class="ln-lens-fallback"');
    expect(html).toContain("<svg");
    expect(html).toContain("#00E599");
    expect(html).toContain("#D2F802");
    expect(html).toContain("#A855F7");
  });
});
```

```tsx
// src/app/(lenus)/lenus/components/LenusHudControls.test.tsx
import { describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { LenusHudControls } from "./LenusHudControls";
import { getPartTelemetry } from "../scene/LenusSceneController";

describe("LenusHudControls", () => {
  it("renders optical telemetry readout, explode toggle, focus ring slider, and playback controls", () => {
    const html = renderToStaticMarkup(
      <LenusHudControls
        state="running"
        fps={60}
        exploded={false}
        explodeAmount={0}
        focusAngle={0}
        activePart={getPartTelemetry("front-lens")}
        paused={false}
        onToggleExplode={vi.fn()}
        onExplodeChange={vi.fn()}
        onFocusChange={vi.fn()}
        onResetView={vi.fn()}
        onTogglePause={vi.fn()}
      />
    );
    expect(html).toContain("EMERALD OBJECTIVE CORE");
    expect(html).toContain("60 FPS");
    expect(html).toContain("EXPLODE ASSEMBLY");
    expect(html).toContain('aria-label="Explode optical assembly"');
    expect(html).toContain('aria-label="Focus ring rotation"');
  });
});
```

- [x] **Step 2: Run tests to verify they fail**

Run: `npx vitest run "src/app/(lenus)/lenus/components/LenusLensFallback.test.tsx" "src/app/(lenus)/lenus/components/LenusHudControls.test.tsx"`
Expected: FAIL with `Cannot find module`

- [x] **Step 3: Implement `LenusLensFallback.tsx` and `LenusHudControls.tsx`**

- `LenusLensFallback.tsx`: Pure inline SVG (`viewBox="-280 -280 560 560"`) rotated into a subtle three-quarter ellipse showing the double fluted glass rings with lime (`#D2F802`) and violet (`#A855F7`) specular arcs, dark brushed titanium concentric collars, glowing `#00E599` emerald center lens, and floating geometric glass shards.
- `LenusHudControls.tsx`: Compact dark-glass HUD overlay positioned at the bottom-right of the 3D stage with:
  - Active part telemetry chip (`activePart.label`, `activePart.material`, `activePart.role`) + live FPS/status pill.
  - `EXPLODE ASSEMBLY` button (`aria-pressed={exploded}`) + range slider (`0` to `1`, step `0.01`, `aria-label="Explode optical assembly"`).
  - `FOCUS COLLAR` range slider (`-1.57` to `1.57` rad, `aria-label="Focus ring rotation"`).
  - Reset view (`R`) and Pause/Play (`aria-label={paused ? "Play animation" : "Pause animation"}`) icon buttons.

- [x] **Step 4: Run tests to verify they pass**

Run: `npx vitest run "src/app/(lenus)/lenus/components/LenusLensFallback.test.tsx" "src/app/(lenus)/lenus/components/LenusHudControls.test.tsx"`
Expected: PASS (2 passed)

- [x] **Step 5: Commit**

```bash
git add "src/app/(lenus)/lenus/components/LenusLensFallback.tsx" "src/app/(lenus)/lenus/components/LenusLensFallback.test.tsx" "src/app/(lenus)/lenus/components/LenusHudControls.tsx" "src/app/(lenus)/lenus/components/LenusHudControls.test.tsx"
git commit -m "feat(lenus): add procedural SVG lens fallback and optical HUD controls"
```

---

### Task 4: Interactive 3D Stage Component (`LenusOpticalLensCanvas.tsx`)

**Files:**
- Create: `src/app/(lenus)/lenus/components/LenusOpticalLensCanvas.tsx`
- Test: `src/app/(lenus)/lenus/components/LenusOpticalLensCanvas.test.tsx`

**Interfaces:**
- Consumes: `LenusSceneController`, `getPartTelemetry`, `LenusLensFallback`, `LenusHudControls`
- Produces:
  ```tsx
  export default function LenusOpticalLensCanvas(props: {
    suspended?: boolean;
    externalExplodeRequest?: number;
  }): React.JSX.Element;
  ```

- [x] **Step 1: Write the failing test**

```tsx
// src/app/(lenus)/lenus/components/LenusOpticalLensCanvas.test.tsx
import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import LenusOpticalLensCanvas from "./LenusOpticalLensCanvas";

describe("LenusOpticalLensCanvas progressive enhancement", () => {
  it("server-renders the SVG fallback, keyboard instructions, and HUD before WebGL mounts", () => {
    const html = renderToStaticMarkup(<LenusOpticalLensCanvas />);
    expect(html).toContain('data-testid="lenus-canvas-container"');
    expect(html).toContain('data-state="preview"');
    expect(html).toContain('class="ln-lens-fallback"');
    expect(html).toContain('aria-label="Interactive Lenus optical lens assembly"');
    expect(html).toContain("EXPLODE ASSEMBLY");
    expect(html).not.toContain("<canvas");
  });
});
```

- [x] **Step 2: Run test to verify it fails**

Run: `npx vitest run "src/app/(lenus)/lenus/components/LenusOpticalLensCanvas.test.tsx"`
Expected: FAIL with `Cannot find module './LenusOpticalLensCanvas'`

- [x] **Step 3: Implement `LenusOpticalLensCanvas.tsx`**

Build the `"use client"` stage component:
- Dynamically imports `LenusSceneController` inside `useEffect` only when `!window.matchMedia("(prefers-reduced-motion: reduce)").matches`.
- Listens for `matchMedia("change")` to dispose the controller and transition to `data-state="static"` if reduced motion is enabled at runtime.
- Wires `ResizeObserver`, `IntersectionObserver`, and `document.addEventListener("visibilitychange")` so rendering automatically pauses when offscreen, tab-hidden, modal-suspended (`suspended = true`), or manually paused.
- Normalizes pointer hover coordinates (`onPointerMove`) for damped parallax and raycast part hover, and triggers `pickAtNormalizedCanvas` on click/tap to lock/inspect individual optical components.
- Supports keyboard interaction on the focusable `data-testid="lenus-canvas-container"` (`ArrowLeft/Right/Up/Down` to rotate view, `E` to toggle exploded assembly, `R` or `Home` to reset view).

- [x] **Step 4: Run test to verify it passes**

Run: `npx vitest run "src/app/(lenus)/lenus/components/LenusOpticalLensCanvas.test.tsx"`
Expected: PASS (1 passed)

- [x] **Step 5: Commit**

```bash
git add "src/app/(lenus)/lenus/components/LenusOpticalLensCanvas.tsx" "src/app/(lenus)/lenus/components/LenusOpticalLensCanvas.test.tsx"
git commit -m "feat(lenus): wire LenusSceneController and progressive enhancement into React stage"
```

---

### Task 5: Floating Pill Header (`LenusHeader.tsx`), Hero Copy (`LenusHeroCopy.tsx`), and Styles (`lenus.css`)

**Files:**
- Create: `src/app/(lenus)/lenus/components/LenusHeader.tsx`
- Create: `src/app/(lenus)/lenus/components/LenusHeroCopy.tsx`
- Create: `src/app/(lenus)/lenus/lenus.css`
- Test: `src/app/(lenus)/lenus/components/LenusHeroCopy.test.tsx`

**Interfaces:**
- Consumes: `lucide-react` (`ArrowRight`, `Menu`, `X`)
- Produces:
  ```tsx
  export type LenusDialogSection = "work" | "expertise" | "technology" | "about" | "contact" | null;
  export default function LenusHeader(props: {
    onNavigate: (section: Exclude<LenusDialogSection, null>) => void;
  }): React.JSX.Element;
  export default function LenusHeroCopy(props: {
    onStepInside: () => void;
  }): React.JSX.Element;
  ```

- [x] **Step 1: Write the failing test**

```tsx
// src/app/(lenus)/lenus/components/LenusHeroCopy.test.tsx
import { describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import LenusHeroCopy from "./LenusHeroCopy";
import LenusHeader from "./LenusHeader";

describe("LenusHeader and LenusHeroCopy", () => {
  it("renders the LENUS floating header with WORK, EXPERTISE, TECHNOLOGY, ABOUT, and GET IN TOUCH", () => {
    const html = renderToStaticMarkup(<LenusHeader onNavigate={vi.fn()} />);
    expect(html).toContain("LENUS");
    expect(html).toContain("WORK");
    expect(html).toContain("EXPERTISE");
    expect(html).toContain("TECHNOLOGY");
    expect(html).toContain("ABOUT");
    expect(html).toContain("GET IN TOUCH");
  });

  it("renders the exact tri-color stacked headline, subheadline, and STEP INSIDE button", () => {
    const html = renderToStaticMarkup(<LenusHeroCopy onStepInside={vi.fn()} />);
    expect(html).toContain("REALITY");
    expect(html).toContain("IS JUST");
    expect(html).toContain("THE");
    expect(html).toContain("START.");
    expect(html).toContain("We build experiences that move brands");
    expect(html).toContain("beyond the expected.");
    expect(html).toContain("STEP INSIDE");
  });
});
```

- [x] **Step 2: Run test to verify it fails**

Run: `npx vitest run "src/app/(lenus)/lenus/components/LenusHeroCopy.test.tsx"`
Expected: FAIL with `Cannot find module './LenusHeroCopy'`

- [x] **Step 3: Implement `LenusHeader.tsx`, `LenusHeroCopy.tsx`, and `lenus.css`**

Match `.img2threejs/references/lenus-hero-reference.png`:
1. `LenusHeader.tsx`:
   - Top floating rounded pill bar (`ln-header`) with inline SVG geometric `LENUS` wordmark on the left, four centered uppercase links (`WORK`, `EXPERTISE`, `TECHNOLOGY`, `ABOUT`), and a right-aligned `#D2F802` lime pill button `GET IN TOUCH`. Includes a responsive mobile navigation disclosure drawer (`aria-label="Toggle navigation"`).
2. `LenusHeroCopy.tsx`:
   - Stacked 3-line display `<h1>`:
     - `<span className="ln-headline-lime">REALITY</span>` (`#D2F802`)
     - `<span className="ln-headline-white">IS JUST</span>` (`#F8FAFC`)
     - `<span className="ln-headline-white">THE </span><span className="ln-headline-violet">START.</span>` (`#A855F7` with purple optical bloom)
   - Subtitle: `We build experiences that move brands beyond the expected.` (`#9499A6`)
   - Primary CTA button: `STEP INSIDE` + `<ArrowRight />` in a `#D2F802` rounded-full pill that triggers `onStepInside()` (which smoothly explodes the 3D optical lens assembly and opens the interactive optical architecture inspector or scrolls/focuses the stage).
3. `lenus.css`:
   - `@import "tailwindcss";` and `@theme` variables using only the registered palette hex tokens (`#08090D`, `#10131C`, `#161924`, `#F8FAFC`, `#9499A6`, `#D2F802`, `#A855F7`, `#00E599`, `#0A0B0E`).
   - Architectural radial aperture ring lines and starry indigo/violet volumetric glow behind the right-hand 3D stage.
   - Desktop 12-column asymmetric hero grid (`44%` copy left, `56%` 3D optical stage right) collapsing cleanly to single-column stacked layout on `< 960px` with zero horizontal overflow at `390px`.

- [x] **Step 4: Run test to verify it passes**

Run: `npx vitest run "src/app/(lenus)/lenus/components/LenusHeroCopy.test.tsx"`
Expected: PASS (2 passed)

- [x] **Step 5: Commit**

```bash
git add "src/app/(lenus)/lenus/components/LenusHeader.tsx" "src/app/(lenus)/lenus/components/LenusHeroCopy.tsx" "src/app/(lenus)/lenus/lenus.css" "src/app/(lenus)/lenus/components/LenusHeroCopy.test.tsx"
git commit -m "feat(lenus): implement floating glass header, tri-color hero copy, and stage styles"
```

---

### Task 6: Route Layout (`layout.tsx`), App Assembly (`LenusApp.tsx`), Metadata Assets (`icon.svg`, `opengraph-image.tsx`), and Docs (`DESIGN.md`, `PROMPT.md`)

**Files:**
- Create: `src/app/(lenus)/layout.tsx`
- Create: `src/app/(lenus)/lenus/LenusApp.tsx`
- Create: `src/app/(lenus)/lenus/page.tsx`
- Create: `src/app/(lenus)/lenus/icon.svg`
- Create: `src/app/(lenus)/lenus/opengraph-image.tsx`
- Create: `src/app/(lenus)/lenus/DESIGN.md`
- Create: `src/app/(lenus)/lenus/PROMPT.md`
- Test: `src/app/(lenus)/lenus/LenusApp.test.tsx`

**Interfaces:**
- Consumes: `LenusHeader`, `LenusHeroCopy`, `LenusOpticalLensCanvas`
- Produces: Next.js App Router `/lenus` route, accessible `<dialog>` modals for `WORK`, `EXPERTISE`, `TECHNOLOGY`, `ABOUT`, and `GET IN TOUCH` (with contact form validation & success state)

- [x] **Step 1: Write the failing test**

```tsx
// src/app/(lenus)/lenus/LenusApp.test.tsx
import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import LenusApp from "./LenusApp";

describe("LenusApp", () => {
  it("renders complete hero composition with header, headline, 3D stage, and dialog shell", () => {
    const html = renderToStaticMarkup(<LenusApp />);
    expect(html).toContain("LENUS");
    expect(html).toContain("REALITY");
    expect(html).toContain("START.");
    expect(html).toContain("STEP INSIDE");
    expect(html).toContain('data-testid="lenus-canvas-container"');
  });
});
```

- [x] **Step 2: Run test to verify it fails**

Run: `npx vitest run "src/app/(lenus)/lenus/LenusApp.test.tsx"`
Expected: FAIL with `Cannot find module './LenusApp'`

- [x] **Step 3: Implement `layout.tsx`, `LenusApp.tsx`, `page.tsx`, `icon.svg`, `opengraph-image.tsx`, `DESIGN.md`, and `PROMPT.md`**

1. `src/app/(lenus)/layout.tsx`:
   - Configure `Archivo` (or `Syne` / `Space_Grotesk` weight 800) for `--font-ln-display`, `Plus_Jakarta_Sans` for `--font-ln-sans`, and `JetBrains_Mono` for `--font-ln-mono`.
   - Include `<noscript>` style override ensuring `.ln-lens-fallback { visibility: visible !important; opacity: 1 !important; }` and all copy is visible without JavaScript.
2. `src/app/(lenus)/lenus/LenusApp.tsx`:
   - Manages `activeDialog: LenusDialogSection` (`"work" | "expertise" | "technology" | "about" | "contact" | null`) and `explodeFromCta` counter.
   - Clicking `STEP INSIDE →` toggles/triggers the exploded optical view on the 3D stage and scrolls/focuses the interactive stage.
   - Clicking `WORK`, `EXPERTISE`, `TECHNOLOGY`, `ABOUT`, or `GET IN TOUCH` opens a native `<dialog>` with focus trapping, `Escape` / backdrop dismissal, focus restoration, and suspends the WebGL render loop while open.
3. `src/app/(lenus)/lenus/icon.svg` & `opengraph-image.tsx`:
   - Use only palette hex values (`#08090D`, `#10131C`, `#D2F802`, `#A855F7`, `#00E599`, `#F8FAFC`).
4. `src/app/(lenus)/lenus/DESIGN.md` & `PROMPT.md`:
   - Document the brand concept, palette, typography, 16-component procedural optical lens architecture, and motion/accessibility contract.

- [x] **Step 4: Run test to verify it passes**

Run: `npx vitest run "src/app/(lenus)/lenus/LenusApp.test.tsx"`
Expected: PASS (1 passed)

- [x] **Step 5: Commit**

```bash
git add "src/app/(lenus)"
git commit -m "feat(lenus): assemble /lenus route, dialogs, metadata, and design docs"
```

---

### Task 7: Six-Point Gallery Registration & Repo Guardrail Verification (`npm run check`)

**Files:**
- Modify: `scripts/templates.config.ts`
- Modify: `scripts/process-images.ts`
- Modify: `scripts/generate-copy-bundles.ts`
- Modify: `src/app/(index)/data/templates.ts`
- Modify: `src/app/(index)/data/templates.test.ts`
- Modify: `tests/e2e/templates.ts`

**Interfaces:**
- Consumes: `src/app/(lenus)/lenus/PROMPT.md`
- Produces: Registered `"lenus"` slug across all 6 repository registration points

- [x] **Step 1: Register `"lenus"` across the 6 registration files**

1. `scripts/templates.config.ts`:
   - Add `"lenus"` to `TemplateSlug`.
   - Add `lenus` to `PALETTES`:
     ```ts
     lenus: {
       palette: [
         "#08090D", "#10131C", "#161924", "#F8FAFC", "#9499A6",
         "#D2F802", "#A855F7", "#00E599", "#0A0B0E",
       ],
       paletteExempt: ["src/app/(lenus)/lenus/model/"],
       mediaExempt: true,
     },
     ```
2. `scripts/process-images.ts`: Add `"lenus"` to the allowed slug list.
3. `scripts/generate-copy-bundles.ts`: Add `lenus: { name: "LENUS", dependencies: ["three", "lucide-react"] }` to `COPY_METADATA`.
4. `src/app/(index)/data/templates.ts`:
   - Add `"lenus"` to `TemplateSlug`.
   - Add `LENUS_PROMPT` and append the `lenus` entry to `RAW_TEMPLATES` (`category: "3d-webgpu"`, `previewImage: "/templates/lenus/preview-1600.webp"`, `stack: ["Next.js", "Three.js", "TypeScript", "Tailwind CSS"]`).
5. `src/app/(index)/data/templates.test.ts`: Update the expected slug array (`"lenus"` at index 0) and template count assertion.
6. `tests/e2e/templates.ts`: Prepend `"/lenus"` to `TEMPLATE_PATHS`.

- [x] **Step 2: Generate copy bundles and run isolation, palette, and media checks**

Run: `npx tsx scripts/generate-copy-bundles.ts && npm run check`
Expected:
```text
isolation: ok
palette: ok
media: ok
```

- [x] **Step 3: Commit**

```bash
git add scripts/ "src/app/(index)/data/" tests/e2e/templates.ts public/registry/
git commit -m "feat(lenus): register lenus template in gallery and pass repo checks"
```

---

### Task 8: End-to-End Playwright Verification & Preview Image Capture

**Files:**
- Create: `tests/e2e/lenus.spec.ts`
- Create: `public/templates/lenus/preview-1600.webp`

**Interfaces:**
- Consumes: Production build of `/lenus` served at `http://localhost:3100/lenus`

- [x] **Step 1: Write `tests/e2e/lenus.spec.ts`**

Cover the 8 mandatory browser guarantees (modeled on `tests/e2e/mercer.spec.ts`):
1. **WebGL Compilation & Palette Verification (`1440×900`):** Zero `pageerror` or `console.error`, `canvas[data-lenus-renderer]` mounted with `webgl2` `getError() === 0`, DPR `<= 1.51`, and rendered pixels contain emerald (`#00E599`), lime (`#D2F802`), and violet (`#A855F7`) highlights.
2. **Interactive Explode & Focus Ring Controls:** Clicking `EXPLODE ASSEMBLY` (or `STEP INSIDE`) transitions the stage to exploded state and changes the rendered canvas bitmap; adjusting the focus ring slider rotates the collar assembly.
3. **Pause/Resume & Responsive Resize (`900×700`):** Pausing holds an identical bitmap across pointer moves; resizing updates the drawing buffer aspect ratio within `0.01` tolerance.
4. **Native Navigation Dialogs & Focus Restoration:** Clicking `WORK`, `TECHNOLOGY`, or `GET IN TOUCH` opens `<dialog>`, pauses the 3D stage (`data-state="paused"`), traps `Tab` focus, and `Escape` closes the dialog, restores focus, and resumes rendering (`data-state="running"`).
5. **WebGL Context Loss & Restoration:** Triggering `WEBGL_lose_context.loseContext()` transitions `.ln-stage` to `data-state="lost"` and reveals `.ln-lens-fallback`; `restoreContext()` restores `data-state="running"`.
6. **Reduced Motion Compliance:** Emulating `reducedMotion: "reduce"` never mounts a `<canvas>`, displays `.ln-lens-fallback` with `data-state="static"`, and switching from `no-preference` to `reduce` disposes the live WebGL context.
7. **Mobile Layout (`390×844`):** `document.documentElement.scrollWidth <= window.innerWidth`, mobile navigation menu opens and closes cleanly.
8. **No-JS & Blocked-WebGL Fallbacks:** With `javaScriptEnabled: false` or blocked `getContext("webgl2")`, the `REALITY IS JUST THE START.` headline and `.ln-lens-fallback` SVG are visible.

- [x] **Step 2: Build the production app, capture `public/templates/lenus/preview-1600.webp`, and run Playwright + Vitest suites**

Run:
```bash
npm run build
node node_modules/@playwright/test/cli.js test tests/e2e/lenus.spec.ts --workers=1
```
Capture `public/templates/lenus/preview-1600.webp` from the `1440×900` desktop hero screenshot using `sharp('.openlanding-page/lenus/shots/desktop-1440.png').resize(1600).webp({ quality: 82 }).toFile('public/templates/lenus/preview-1600.webp')`, then run:
```bash
npm test
npm run check
npx tsc --noEmit
npx eslint "src/app/(lenus)" tests/e2e/lenus.spec.ts
```
Expected: All unit tests, e2e browser tests, isolation/palette/media checks, TypeScript checks, and ESLint checks pass with 0 errors.

- [x] **Step 3: Final Commit**

```bash
git add tests/e2e/lenus.spec.ts public/templates/lenus/preview-1600.webp
git commit -m "test(lenus): add Playwright e2e verification suite and gallery preview image"
```


## Implementation outcome

All eight tasks are complete. The finished asset contains 19 parts; image CLI registration is derived from the central registry. Mobile activates 3D on explicit intent, and the contact form prepares a local brief. See [verification and implementation decisions](./2026-11-03-lenus-optical-lens-frontend-verification.md).
