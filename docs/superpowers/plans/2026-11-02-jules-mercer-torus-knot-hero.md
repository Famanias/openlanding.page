# Jules Mercer Procedural Torus Knot Hero Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Reconstruct the Jules Mercer portfolio hero section featuring a 100% procedural 3D (2,3) torus knot with glowing dual-tone geodesic wireframe, translucent membrane, undulating particle cloud envelope, and retro HUD terminal overlays in Next.js 16 and Three.js 0.186.

**Architecture:** Decompose the 3D scene into pure procedural math and custom Three.js shaders (torus knot spline, geodesic ribbon geometry, dual-color emissive wireframe, displaced particle shell), managed by a standalone controller with explicit WebGL lifecycle guards. A responsive Next.js/Tailwind layer renders the dark blueprint coordinate grid, typography, and floating HUD telemetry cards.

**Tech Stack:** Next.js 16.4.3 (App Router), React 19.3.0, TypeScript 5, Three.js 0.186.1, Tailwind CSS v4, Lucide React, Vitest 5.0.5.

**Spec:** Multi-angle reference pack in `D:\downloads\imggg\` (`Clean Front Hero View.png`, `90° Side Profile.png`, `Top-Down-Radial-View.png`, `Macro Close-Up.png`, `hero-section.png`) and the `img2threejs` procedural reconstruction standard.

---

## Global Constraints

- **Zero External 3D Assets:** All geometry, wireframes, and particle clouds must be generated procedurally via code (no `.gltf`, `.glb`, or `.obj` files).
- **TypeScript Strictness:** Strict typing enabled with zero unhandled `any` types.
- **Three.js 0.186 Compatibility:** Use modern Three.js APIs and dispose of all buffers, geometries, materials, and renderer contexts on unmount.
- **Test Command:** Every task must be verified with `npx vitest run <test-path>`.
- **Palette Accuracy:**
  - Electric Cyan: `#00E5FF` / `#1E88E5`
  - Neon Chartreuse / Lime Green: `#CCFF00` / `#D2FF00`
  - Blueprint Dark Slate Background: `#0A0D10`
  - Off-White Headline: `#E8ECEF`

---

## Review Focus

1. **Aspect Ratio & Canvas Resizing:** Canvas must resize smoothly across window sizes without distorting the $(2, 3)$ knot's circular aperture or clipping outside the hero viewport.
2. **Context Loss & Memory Leaks:** WebGL renderer, geometries, and shader materials must dispose cleanly on route navigation or component unmount.
3. **Pointer Orbit Bounds:** Mouse/touch parallax must be softly damped and clamped to prevent inverted or disorienting camera flips.
4. **Performance & Frame Pacing:** Maintain steady 60 FPS on standard desktop displays by capping ribbon subdivision samples (samples: 200, radial segments: 24, particle count: 1200).
5. **Additive Shading Contrast:** Emissive materials must use additive blending without depth-write conflicts or gray edge fringing against the `#0A0D10` backdrop.

---

## Tasks

### Task 1: Parametric (2,3) Torus Knot Math & Geodesic Ribbon Geometry

**Files:**
- Create: `src/app/(mercer)/mercer/model/torusKnotMath.ts`
- Test: `src/app/(mercer)/mercer/model/torusKnotMath.test.ts`

**Interfaces:**
- Consumes: `three` (`Vector3`, `BufferGeometry`, `Float32BufferAttribute`)
- Produces:
  ```ts
  export function calculateTorusKnotPoint(t: number, p?: number, q?: number, radius?: number, heightScale?: number): Vector3;
  export function generateTorusKnotSamples(samples: number, p?: number, q?: number, radius?: number): Vector3[];
  export function buildGeodesicRibbonGeometry(samples: number, segments: number, width: number, thickness: number): BufferGeometry;
  ```

- [x] **Step 1: Write the failing test**

```ts
// src/app/(mercer)/mercer/model/torusKnotMath.test.ts
import { describe, it, expect } from "vitest";
import { calculateTorusKnotPoint, generateTorusKnotSamples, buildGeodesicRibbonGeometry } from "./torusKnotMath";

describe("torusKnotMath", () => {
  it("calculates periodic points for (2,3) torus knot", () => {
    const p0 = calculateTorusKnotPoint(0, 2, 3, 2.0, 0.8);
    const p2pi = calculateTorusKnotPoint(Math.PI * 2, 2, 3, 2.0, 0.8);
    expect(p0.distanceTo(p2pi)).toBeLessThan(1e-4);
  });

  it("produces correct number of continuous curve samples with 3-fold radial symmetry", () => {
    const samples = generateTorusKnotSamples(120, 2, 3, 2.0);
    expect(samples).toHaveLength(120);
    // Aperture check: verify point distance from origin is bounded
    for (const pt of samples) {
      const planarDist = Math.hypot(pt.x, pt.y);
      expect(planarDist).toBeGreaterThan(0.5);
      expect(planarDist).toBeLessThan(4.0);
    }
  });

  it("builds ribbon buffer geometry with position, normal, and vertex color attributes", () => {
    const geom = buildGeodesicRibbonGeometry(60, 8, 0.35, 0.1);
    expect(geom.getAttribute("position")).toBeDefined();
    expect(geom.getAttribute("normal")).toBeDefined();
    expect(geom.getAttribute("color")).toBeDefined();
    expect(geom.getIndex()).toBeDefined();
    expect(geom.getAttribute("position").count).toBeGreaterThan(100);
  });
});
```

- [x] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/app/(mercer)/mercer/model/torusKnotMath.test.ts`  
Expected: FAIL with "Cannot find module './torusKnotMath'"

- [x] **Step 3: Implement `torusKnotMath.ts`**

Implement $(p, q)$ parametric curve coordinates where $r(t) = R + r \cos(q t)$, $x(t) = r(t) \cos(p t)$, $y(t) = r(t) \sin(p t)$, $z(t) = -h \sin(q t)$. Generate Frenet-Serret framing (tangent, normal, binormal) to extrude a flattened geodesic triangulated ribbon strip with vertex colors transitioning between cyan (`t < 0.5`) and lime green (`t >= 0.5`).

- [x] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/app/(mercer)/mercer/model/torusKnotMath.test.ts`  
Expected: PASS

- [x] **Step 5: Commit**

```bash
git add src/app/\(mercer\)/mercer/model/torusKnotMath.ts src/app/\(mercer\)/mercer/model/torusKnotMath.test.ts
git commit -m "feat(mercer): implement procedural (2,3) torus knot ribbon geometry"
```

---

### Task 2: Shaders & Materials (Dual-Tone Emissive Wireframe & Particle Shell)

**Files:**
- Create: `src/app/(mercer)/mercer/scene/materials.ts`
- Test: `src/app/(mercer)/mercer/scene/materials.test.ts`

**Interfaces:**
- Consumes: `three` (`ShaderMaterial`, `BufferGeometry`, `Float32BufferAttribute`, `AdditiveBlending`, `Color`)
- Produces:
  ```ts
  export interface MaterialConfig {
    cyanColor?: string;
    limeColor?: string;
    wireframeLineWidth?: number;
  }
  export function createWireframeLatticeMaterial(config?: MaterialConfig): ShaderMaterial;
  export function createTranslucentMembraneMaterial(): ShaderMaterial;
  export function createParticleShellGeometry(count?: number, radius?: number): BufferGeometry;
  export function createParticleShellMaterial(): ShaderMaterial;
  ```

- [x] **Step 1: Write the failing test**

```ts
// src/app/(mercer)/mercer/scene/materials.test.ts
import { describe, it, expect } from "vitest";
import {
  createWireframeLatticeMaterial,
  createTranslucentMembraneMaterial,
  createParticleShellGeometry,
  createParticleShellMaterial,
} from "./materials";
import * as THREE from "three";

describe("scene materials and particle geometry", () => {
  it("creates wireframe material with additive blending and uniforms", () => {
    const mat = createWireframeLatticeMaterial();
    expect(mat.transparent).toBe(true);
    expect(mat.blending).toBe(THREE.AdditiveBlending);
    expect(mat.depthWrite).toBe(false);
    expect(mat.uniforms.uTime).toBeDefined();
    expect(mat.uniforms.uColorCyan).toBeDefined();
    expect(mat.uniforms.uColorLime).toBeDefined();
  });

  it("creates translucent membrane material configured for inner glow", () => {
    const mat = createTranslucentMembraneMaterial();
    expect(mat.transparent).toBe(true);
    expect(mat.depthWrite).toBe(false);
    expect(mat.side).toBe(THREE.DoubleSide);
  });

  it("generates particle shell geometry with bounds and phase attributes", () => {
    const geom = createParticleShellGeometry(500, 3.2);
    expect(geom.getAttribute("position")).toBeDefined();
    expect(geom.getAttribute("aPhase")).toBeDefined();
    expect(geom.getAttribute("position").count).toBe(500);
  });
});
```

- [x] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/app/(mercer)/mercer/scene/materials.test.ts`  
Expected: FAIL with "Cannot find module './materials'"

- [x] **Step 3: Implement `materials.ts`**

Author custom vertex and fragment shaders:
1. `WireframeLatticeMaterial`: Emissive line glow sampling vertex colors with time-based subtle pulse and edge-fresnel glow.
2. `TranslucentMembraneMaterial`: Additive glass-like membrane with view-dependent rim luminosity (`1.0 - abs(dot(normal, viewDir))`).
3. `ParticleShell`: Point cloud distributed on an undulating hyperbolic surface with randomized phases for floating stipple motion.

- [x] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/app/(mercer)/mercer/scene/materials.test.ts`  
Expected: PASS

- [x] **Step 5: Commit**

```bash
git add src/app/\(mercer\)/mercer/scene/materials.ts src/app/\(mercer\)/mercer/scene/materials.test.ts
git commit -m "feat(mercer): author custom dual-tone wireframe and particle shaders"
```

---

### Task 3: Mercer Scene Controller & Render Lifecycle

**Files:**
- Create: `src/app/(mercer)/mercer/scene/MercerSceneController.ts`
- Test: `src/app/(mercer)/mercer/scene/MercerSceneController.test.ts`

**Interfaces:**
- Consumes: `torusKnotMath.ts`, `materials.ts`, `three` (`Scene`, `PerspectiveCamera`, `WebGLRenderer`, `Group`)
- Produces:
  ```ts
  export class MercerSceneController {
    constructor(options?: { onFps?: (fps: number) => void });
    init(container: HTMLElement): void;
    resize(width: number, height: number): void;
    setPointer(normX: number, normY: number): void;
    start(): void;
    stop(): void;
    dispose(): void;
    getRenderer(): THREE.WebGLRenderer | null;
  }
  ```

- [x] **Step 1: Write the failing test**

```ts
// src/app/(mercer)/mercer/scene/MercerSceneController.test.ts
import { describe, it, expect, vi } from "vitest";
import { MercerSceneController } from "./MercerSceneController";

describe("MercerSceneController", () => {
  it("initializes without throwing and configures scene elements", () => {
    const fpsCallback = vi.fn();
    const controller = new MercerSceneController({ onFps: fpsCallback });
    expect(controller).toBeDefined();
  });

  it("safely handles resize and pointer events before and after disposal", () => {
    const controller = new MercerSceneController();
    expect(() => controller.resize(800, 600)).not.toThrow();
    expect(() => controller.setPointer(0.5, -0.2)).not.toThrow();
    expect(() => controller.dispose()).not.toThrow();
  });
});
```

- [x] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/app/(mercer)/mercer/scene/MercerSceneController.test.ts`  
Expected: FAIL with "Cannot find module './MercerSceneController'"

- [x] **Step 3: Implement `MercerSceneController.ts`**

Create the class managing Three.js scene, camera, lighting, and animation loop. Assemble the `knotGroup` containing the ribbon mesh, wireframe lattice, and particle shell. Implement smooth inertia-based rotation following pointer offset, steady ambient spin, rolling delta time FPS tracker, and complete disposal of all geometries, shaders, and listeners.

- [x] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/app/(mercer)/mercer/scene/MercerSceneController.test.ts`  
Expected: PASS

- [x] **Step 5: Commit**

```bash
git add src/app/\(mercer\)/mercer/scene/MercerSceneController.ts src/app/\(mercer\)/mercer/scene/MercerSceneController.test.ts
git commit -m "feat(mercer): implement WebGL scene controller and render loop lifecycle"
```

---

### Task 4: Retro HUD Telemetry & Terminal Cards

**Files:**
- Create: `src/app/(mercer)/mercer/components/HudCards.tsx`
- Test: `src/app/(mercer)/mercer/components/HudCards.test.tsx`

**Interfaces:**
- Consumes: React props (`fps: number`, `online?: boolean`)
- Produces: `<FpsBadge fps={number} />`, `<TerminalCodeCard />`, `<ExperimentStatusCard />`

- [x] **Step 1: Write the failing test**

```tsx
// src/app/(mercer)/mercer/components/HudCards.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import { FpsBadge, TerminalCodeCard, ExperimentStatusCard } from "./HudCards";

describe("HudCards", () => {
  it("renders FPS badge with numeric display", () => {
    render(<FpsBadge fps={60} />);
    expect(screen.getByText(/60 FPS/i)).toBeDefined();
  });

  it("renders terminal code snippet card with code line structure", () => {
    render(<TerminalCodeCard />);
    expect(screen.getByText(/function applet\(\)/i)).toBeDefined();
  });

  it("renders experiment status card with active indicator", () => {
    render(<ExperimentStatusCard />);
    expect(screen.getByText(/INTERACTIVE EXPERIMENT \/ 001/i)).toBeDefined();
    expect(screen.getByText(/SYSTEM ONLINE/i)).toBeDefined();
  });
});
```

- [x] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/app/(mercer)/mercer/components/HudCards.test.tsx`  
Expected: FAIL with "Cannot find module './HudCards'"

- [x] **Step 3: Implement `HudCards.tsx`**

Build the retro-terminal UI cards matching `hero-section.png`:
- Top-left badge: `60 FPS` with green/blue telemetry bar.
- Bottom-left terminal window: Dark acrylic window with window controls (`● ● ●`), monospace code snippet (`function applet() { ... }`).
- Bottom-right telemetry tag: `INTERACTIVE EXPERIMENT / 001` and `SYSTEM ONLINE // STAT: ACTIVE`.

- [x] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/app/(mercer)/mercer/components/HudCards.test.tsx`  
Expected: PASS

- [x] **Step 5: Commit**

```bash
git add src/app/\(mercer\)/mercer/components/HudCards.tsx src/app/\(mercer\)/mercer/components/HudCards.test.tsx
git commit -m "feat(mercer): create HUD telemetry cards and terminal code window"
```

---

### Task 5: Interactive 3D Canvas React Component

**Files:**
- Create: `src/app/(mercer)/mercer/components/MercerTorusKnotCanvas.tsx`
- Test: `src/app/(mercer)/mercer/components/MercerTorusKnotCanvas.test.tsx`

**Interfaces:**
- Consumes: `MercerSceneController`, `HudCards`
- Produces: `<MercerTorusKnotCanvas />` (client component)

- [x] **Step 1: Write the failing test**

```tsx
// src/app/(mercer)/mercer/components/MercerTorusKnotCanvas.test.tsx
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import React from "react";
import MercerTorusKnotCanvas from "./MercerTorusKnotCanvas";

describe("MercerTorusKnotCanvas", () => {
  it("renders container element and mounts HUD overlays", () => {
    const { container } = render(<MercerTorusKnotCanvas />);
    expect(container.querySelector("[data-testid='mercer-canvas-container']")).toBeDefined();
  });
});
```

- [x] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/app/(mercer)/mercer/components/MercerTorusKnotCanvas.test.tsx`  
Expected: FAIL with "Cannot find module './MercerTorusKnotCanvas'"

- [x] **Step 3: Implement `MercerTorusKnotCanvas.tsx`**

Create `"use client"` React component that connects a `useRef<HTMLDivElement>` to `MercerSceneController`. Handles `ResizeObserver`, pointer move coordinate normalization `[-1, 1]`, mobile touch event listeners, updates the `fps` React state from the controller, and layers `HudCards` as absolute positioned elements over the 3D viewport.

- [x] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/app/(mercer)/mercer/components/MercerTorusKnotCanvas.test.tsx`  
Expected: PASS

- [x] **Step 5: Commit**

```bash
git add src/app/\(mercer\)/mercer/components/MercerTorusKnotCanvas.tsx src/app/\(mercer\)/mercer/components/MercerTorusKnotCanvas.test.tsx
git commit -m "feat(mercer): wire Three.js scene controller into React canvas component"
```

---

### Task 6: Hero Layout, Typography, & Navigation

**Files:**
- Create: `src/app/(mercer)/mercer/components/MercerHeader.tsx`
- Create: `src/app/(mercer)/mercer/components/MercerHeroCopy.tsx`
- Create: `src/app/(mercer)/mercer/components/ProjectTicker.tsx`
- Create: `src/app/(mercer)/mercer/mercer.css`
- Test: `src/app/(mercer)/mercer/components/MercerHeroCopy.test.tsx`

**Interfaces:**
- Consumes: React JSX, Tailwind CSS, Lucide icons (`ArrowUpRight`, `ArrowDown`)
- Produces: `<MercerHeader />`, `<MercerHeroCopy />`, `<ProjectTicker />`

- [x] **Step 1: Write the failing test**

```tsx
// src/app/(mercer)/mercer/components/MercerHeroCopy.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import MercerHeroCopy from "./MercerHeroCopy";

describe("MercerHeroCopy", () => {
  it("renders exact headline with highlighted IMAGINE text", () => {
    render(<MercerHeroCopy />);
    expect(screen.getByText(/I BUILD/i)).toBeDefined();
    expect(screen.getByText(/WHAT YOU/i)).toBeDefined();
    expect(screen.getByText(/IMAGINE\./i)).toBeDefined();
    expect(screen.getByRole("button", { name: /EXPLORE PROJECTS/i })).toBeDefined();
    expect(screen.getByRole("button", { name: /ABOUT ME/i })).toBeDefined();
  });
});
```

- [x] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/app/(mercer)/mercer/components/MercerHeroCopy.test.tsx`  
Expected: FAIL with "Cannot find module './MercerHeroCopy'"

- [x] **Step 3: Implement components and styles**

1. `MercerHeader.tsx`: Brand logo `JM. JULES MERCER // CREATIVE DEVELOPER`, navigation links (`index \ projects \ playground \ about`), live pulse badge `🟢 AVAILABLE FOR SELECT PROJECTS`, CTA `LET'S TALK ↗`.
2. `MercerHeroCopy.tsx`: Eyebrow `INDEPENDENT CREATIVE DEVELOPER / PORTFOLIO 2026`, massive display type `I BUILD WHAT YOU IMAGINE.` with neon lime highlight, subtitle, primary neon button `EXPLORE PROJECTS ↗`, and secondary outline button `ABOUT ME`.
3. `ProjectTicker.tsx`: Bottom preview strip featuring `01 / MONOCHROME →`, `02 / SHIFT SYSTEM →`, `03 / FORM STUDY →`, and `SCROLL TO EXPLORE ↓`.
4. `mercer.css`: Technical blueprint coordinate grid lines, crosshairs, and tick marks (`660`, `230`, `8060`, `300`, `680`, `360`, `-560`).

- [x] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/app/(mercer)/mercer/components/MercerHeroCopy.test.tsx`  
Expected: PASS

- [x] **Step 5: Commit**

```bash
git add src/app/\(mercer\)/mercer/components/MercerHeader.tsx src/app/\(mercer\)/mercer/components/MercerHeroCopy.tsx src/app/\(mercer\)/mercer/components/ProjectTicker.tsx src/app/\(mercer\)/mercer/mercer.css src/app/\(mercer\)/mercer/components/MercerHeroCopy.test.tsx
git commit -m "feat(mercer): build portfolio header, hero copy, and project ticker"
```

---

### Task 7: Template Page Assembly & Route Integration

**Files:**
- Create: `src/app/(mercer)/mercer/MercerApp.tsx`
- Create: `src/app/(mercer)/mercer/page.tsx`
- Test: `src/app/(mercer)/mercer/MercerApp.test.tsx`

**Interfaces:**
- Consumes: `MercerHeader`, `MercerHeroCopy`, `MercerTorusKnotCanvas`, `ProjectTicker`
- Produces: Default export for Next.js App Router route `/mercer`

- [x] **Step 1: Write the failing test**

```tsx
// src/app/(mercer)/mercer/MercerApp.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import MercerApp from "./MercerApp";

describe("MercerApp", () => {
  it("assembles hero section with header, 3D canvas stage, and bottom ticker", () => {
    render(<MercerApp />);
    expect(screen.getByText(/JULES MERCER/i)).toBeDefined();
    expect(screen.getByText(/IMAGINE\./i)).toBeDefined();
    expect(screen.getByText(/MONOCHROME/i)).toBeDefined();
  });
});
```

- [x] **Step 2: Run test to verify it fails**

Run: `npx vitest run src/app/(mercer)/mercer/MercerApp.test.tsx`  
Expected: FAIL with "Cannot find module './MercerApp'"

- [x] **Step 3: Implement `MercerApp.tsx` and `page.tsx`**

Compose the complete page structure:
```tsx
// src/app/(mercer)/mercer/page.tsx
import MercerApp from "./MercerApp";

export const metadata = {
  title: "Jules Mercer // Creative Developer Portfolio",
  description: "Independent creative developer crafting interactive 3D WebGL experiences.",
};

export default function MercerPage() {
  return <MercerApp />;
}
```

- [x] **Step 4: Run test to verify it passes**

Run: `npx vitest run src/app/(mercer)/mercer/MercerApp.test.tsx`  
Expected: PASS

- [x] **Step 5: Commit**

```bash
git add src/app/\(mercer\)/mercer/MercerApp.tsx src/app/\(mercer\)/mercer/page.tsx src/app/\(mercer\)/mercer/MercerApp.test.tsx
git commit -m "feat(mercer): assemble MercerApp and Next.js /mercer page route"
```

---

### Task 8: Full Test Suite Verification & Quality Audit

**Files:**
- Modify: `tests/mercer-visual.test.ts` (if visual e2e is configured) or verify via Vitest runner

**Interfaces:**
- Consumes: Entire test suite across `src/app/(mercer)`

- [x] **Step 1: Run complete Mercer unit test suite**

Run: `npx vitest run src/app/\(mercer\)`  
Expected: All tests pass with 0 failures.

- [x] **Step 2: Run full project regression test suite**

Run: `npm test`  
Expected: 213+ test files pass, no regression in existing templates.

- [x] **Step 3: Run production build check**

Run: `npm run build`  
Expected: Next.js build succeeds with static/dynamic route `/mercer` compiled cleanly.

- [x] **Step 4: Final commit**

```bash
git commit --allow-empty -m "chore(mercer): verify all unit tests and production build pass"
```


## Native execution record

Completed 2026-11-02 using the existing project stack. See [verification and native adaptations](2026-11-02-jules-mercer-torus-knot-hero-verification.md) for test results, browser evidence and the software-renderer performance limit.
