# BATHYS 3D Deep-Sea Creatures Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate authentic procedural 3D deep-sea creatures into the BATHYS WebGL submersible scene, appearing at their accurate biological ocean depth zones (Mesopelagic, Bathypelagic, Abyssopelagic, and Hadalpelagic) as the user scrolls.

**Architecture:** Shared Three.js WebGL scene with the existing submersible, maintaining a single canvas/context for peak performance and visual depth coherence. Four procedural low-poly biomechanically animated organisms built from pure geometry with bioluminescent shaders: Siphonophore (twilight), Anglerfish (midnight), Dumbo Octopus (abyss), and Mariana Snailfish (hadal trench). Managed via a centralized `CreatureManager` that performs scroll-depth culling, path traversal, and unified disposal.

**Tech Stack:** Three.js, Next.js 16 (React 19), Vitest (TDD), Playwright E2E.

**Spec:** `src/app/(bathys)/bathys/DESIGN.md`

## Global Constraints

- Zero external raster model assets (.gltf/.glb/.obj) — all creatures procedural to maintain zero network payload overhead.
- Strict palette compliance: colors strictly derived from registered palette tokens (`trench`, `navy`, `titanium`, `cyan`, `amber`, `glass`, `slate`, `mist`).
- Module isolation: all code self-contained within `src/app/(bathys)/bathys/scene/creatures/`.
- Strict accessibility & performance: respect `useReducedMotion()`, low-poly budget on mobile (`detail: "low"`), zero long animation frames.

---

### Task 1: Creature Motion & Depth Range Math (TDD)

- [ ] **Step 1: Write tests for creature math in `src/app/(bathys)/bathys/scene/creatures/math.test.ts`**
  - Test `computeCreatureVisibility(dive, range, fadeMargin)`: returns 0 outside, 1 inside, smooth hermite ramp.
  - Test `computeSpineWave(t, segmentIndex, totalSegments, wavelength, frequency)`: returns lateral and vertical offsets for undulating tails and colonial stems.
  - Test `computeWingFlap(time, frequency, minAngle, maxAngle)`: returns smooth harmonic flap angle.
- [ ] **Step 2: Run tests to verify failure**
- [ ] **Step 3: Implement `src/app/(bathys)/bathys/scene/creatures/math.ts`**
- [ ] **Step 4: Run tests to verify pass**

---

### Task 2: Procedural Creature Builders

- [ ] **Step 1: Define types in `src/app/(bathys)/bathys/scene/creatures/types.ts`**
  - `CreatureKit`, `CreatureInstance`, `DepthRange`, `update(time: number, dive: number, speed: number): void`, `dispose(): void`.
- [ ] **Step 2: Build Mesopelagic Siphonophore (`buildSiphonophore.ts`)**
  - Nectophore bells, chain of gastrozooid nodes with cyan bioluminescence (`#00E5FF`), trailing bract tentacles.
- [ ] **Step 3: Build Bathypelagic Anglerfish (`buildAnglerfish.ts`)**
  - Bulbous body, needle fangs, spiky fins, arching illicium with glowing esca lure (cyan/amber).
- [ ] **Step 4: Build Abyssopelagic Dumbo Octopus (`buildDumboOctopus.ts`)**
  - Bell mantle, flapping ear fins, translucent webbed arms, reflective deep-sea eyes.
- [ ] **Step 5: Build Hadalpelagic Mariana Snailfish (`buildHadalSnailfish.ts`)**
  - Translucent gelatinous body, bulbous head, fan pectoral fins, undulating ribbon fin.

---

### Task 3: Creature Manager & Scene Integration

- [ ] **Step 1: Implement `CreatureManager.ts`**
  - Instantiates the 4 creatures in the Three.js scene.
  - Updates creature positions, swim trajectories, and depth visibility based on scroll `dive`.
  - Disposes geometries and materials cleanly.
- [ ] **Step 2: Wire `CreatureManager` into `SubmersibleScene.tsx`**
  - Add creature group to the Three.js scene.
  - Call `creatures.update(time, dive)` inside the main `requestAnimationFrame` loop.
  - Ensure disposal on component unmount or context lost.

---

### Task 4: Verification & Quality Gate

- [ ] **Step 1: Run unit tests (`bun run test`)**
- [ ] **Step 2: Run isolation and palette checks (`bun run check`)**
- [ ] **Step 3: Run TypeScript typecheck (`npx tsc --noEmit`)**
- [ ] **Step 4: Run Playwright E2E tests (`bun run test:e2e tests/e2e/bathys.spec.ts`)**
- [ ] **Step 5: Capture updated visual screenshots & verify 60fps performance**
