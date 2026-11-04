# KHORA: Design Specification & Motion System

A fictional subterranean thermal sanctuary and biospheric architectural complex carved directly into volcanic basalt in the Reykjanes rift valley of Iceland.

---

## Architectural Direction

KHORA translates the geological violence of volcanic formation and the quiet eternity of deep geothermal time into a spatial, interactive web journey.

Key structural mechanisms:
1. **Vertical Geological Stratum Descent:** Rather than standard horizontal section stacks, page scroll translates directly to subterranean depth (0m at surface down to −84m into the bedrock thermal vaults).
2. **Geological Aperture Iris Entrance:** A central basalt fissure in the hero opens via dynamic SVG `clip-path` polygon interpolation, drawing the visitor from cold surface mist into subterranean basalt black.
3. **Endless Drifting Monolith Ring:** Horizontal carousel of tall architectural monolith cards drifting with subtle arc distortion, 1:1 touch/pointer drag, and inertia squashing.
4. **Three Depths Pinned Walkthrough:** 280svh pinned scroll sequence transitioning across three geothermal thermal tiers, culminating in an explosive deconstruction of 8 isometric SVG basalt blocks.
5. **Real-time 3D Projection & Raycasting:** A background Three.js WebGL canvas displaying a raymarched signed distance field (SDF) geothermal mist shader, with 3D locator bounding boxes projected into screen-space pixel coordinates for interactive HTML buttons.
6. **Tactile Magnetic Interactions:** Interactive pill triggers with 12px radius magnetic cursor pull, inertia-smoothed follow cursor, and text-reveal line wraps.

---

## Technical Stack & Dependencies

```bash
npm i next react react-dom lenis three @types/three
```

- **Framework:** Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4.
- **Scroll Engine:** Lenis v1 (delegated to custom animation ticker for 60fps synchronous locking).
- **3D Graphics:** Three.js r176 (custom GLSL shaders, camera projection, procedural geometry).
- **Isolation:** Everything lives in `src/app/(khora)/khora/`. Zero cross-template imports or shared runtime state.

---

## Design Tokens & Palette

Registered in `scripts/templates.config.ts`. All tints derived via CSS `color-mix()` in OKLab.

| Token | Hex | Role | Contrast / Usage |
|---|---|---|---|
| `moss` | `#E8EAE3` | Surface background, lichen highlights | Pale ground, light mode base |
| `paper` | `#F7F8F5` | Text on dark, floating cards, dialogs | Primary light typography |
| `basalt` | `#0F1012` | Subterranean bedrock, primary ink | 16.2:1 against paper |
| `obsidian` | `#17181C` | Monolith cards, deep pool containers | Elevated dark surfaces |
| `ash` | `#63666E` | Technical readouts, borders, muted text | 4.8:1 against basalt |
| `magma` | `#E25822` | Geothermal heat indicator, active temperature | Accent on dark and light |
| `silica` | `#7FA4A6` | Mineral water wash, pool waterline | Secondary cool accent |
| `steam` | `#D2D9D9` | Atmospheric mist, raycast button text | Frosted glass highlights |

---

## Typography

Loaded via `next/font/google` with dedicated CSS variable bindings:

- **Editorial Serif:** `--font-kh-serif` (Cormorant Garamond, weights 300, 400, italic). Used for philosophical statements, Latin mineral definitions, and large hero contemplation.
- **Monolithic Sans:** `--font-kh-sans` (Neue Montreal / Inter, weights 400, 500, tracking −0.035em). Used for chamber titles, navigation links, and primary UI headings.
- **Technical Mono:** `--font-kh-mono` (JetBrains Mono, weight 400, tracking +0.06em uppercase). Used for real-time depth odometers, temperatures, water salinities, and coordinate telemetry.

### Typographic Scale
- **Hero Title:** `clamp(3.2rem, 1.5rem + 5.5vw, 7.5rem)`
- **Section Headings (h2):** `clamp(2.2rem, 1.2rem + 3.2vw, 4.8rem)`
- **Subheadings (h3):** `clamp(1.6rem, 1.1rem + 1.8vw, 2.8rem)`
- **Body Large:** `1.25rem / 1.6`
- **Technical Readouts:** `0.75rem / 1.4` (mono, uppercase)

---

## Mathematical Specifications

### 1. Geological Aperture (`archInset`)
```typescript
function apertureInset(p: number, vw: number, vh: number) {
  // p is clamped scroll progress [0, 1] through the hero held stage
  const t = Math.pow(Math.min(Math.max((p - 0.15) / 0.65, 0), 1), 3);
  const w = (1 - t) * Math.min(vw * 0.12, 140);
  const h = (1 - t) * Math.min(vh * 0.45, 360);
  return `polygon(
    0% 0%, 0% 100%,
    calc(50% - ${w}px) 100%,
    calc(50% - ${w}px) calc(50% - ${h}px),
    calc(50% + ${w}px) calc(50% - ${h}px),
    calc(50% + ${w}px) calc(50% + ${h}px),
    calc(50% - ${w}px) calc(50% + ${h}px),
    calc(50% - ${w}px) 100%,
    100% 100%, 100% 0%
  )`;
}
```

### 2. Monolith Ring Cylindrical Perspective Arc (`ringArc`)
```typescript
function cardArc(xDistFromCenter: number, viewportHalfWidth: number) {
  const d = Math.max(-1.5, Math.min(1.5, xDistFromCenter / viewportHalfWidth));
  return {
    y: 32 * d * d,
    rotateY: 6 * d,
    scale: 1 - 0.04 * d * d
  };
}
```

### 3. Magnetic Button Vector Dampening
```typescript
function magneticDisplacement(mouseX: number, mouseY: number, rect: DOMRect) {
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const dx = mouseX - cx;
  const dy = mouseY - cy;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const maxRadius = 12;
  const angle = Math.atan2(dy, dx);
  const clamped = Math.min(dist, maxRadius);
  return {
    buttonX: clamped * Math.cos(angle),
    buttonY: clamped * Math.sin(angle),
    textX: 0.4 * clamped * Math.cos(angle),
    textY: 0.4 * clamped * Math.sin(angle)
  };
}
```

---

## 3D WebGL Shader Pipeline

- **Mist Raymarcher:** Full-screen fragment shader sampling a Matcap texture (`matcap-volcanic.png`) combined with a 3D noise octave loop.
- **Dynamic Mouse Boolean:** A floating sphere in the shader follows mouse coordinates, carving out a viewing aperture in the mist when hovering over the baths.
- **3D-to-2D Screen Projection:**
  ```typescript
  // Synchronous loop in requestAnimationFrame
  vector3.copy(anchor3D.position);
  vector3.project(camera); // Maps to [-1, 1] normalized device coordinates
  const screenX = ((vector3.x + 1) * width) / 2;
  const screenY = ((-vector3.y + 1) * height) / 2;
  domButton.style.transform = `translate3d(${screenX}px, ${screenY}px, 0)`;
  ```

---

## Accessibility & Reduced Motion

- **Motion Preference Override:** When `prefers-reduced-motion: reduce` is detected:
  - 3D canvas is replaced with a high-resolution, static ambient photographic backdrop.
  - Aperture aperture wipe is replaced with clean instant CSS section transitions.
  - Draggable ring becomes an accessible native horizontal snap-scroll container (`overflow-x: auto; scroll-snap-type: x mandatory`).
- **Screen Reader Support:** Full ARIA landmarks, `aria-live="polite"` depth telemetry, descriptive button titles, and strict semantic HTML hierarchy.
