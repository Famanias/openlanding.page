# Prompt: rebuild "PERIGEE"

Build a single-page, full-screen 3D relativistic scroll experience in React + TypeScript using WebGL / three.js, GSAP ScrollTrigger, and Lenis smooth scroll. It is the landing page for **PERIGEE**, a fictional deep-space gravitational observatory and relativistic telemetry array positioned in bound orbit around a Schwarzschild black hole. Tagline: *"At the edge of curved spacetime."*

## Stack

Next.js 16 App Router (own route group `(perigee)` with its own root layout), React 19, TypeScript, Tailwind v4. Three.js WebGL2 renderer (`three`), GSAP (`gsap`), Lenis (`lenis`), and Web Audio API for generative gravitational telemetry audio. Zero added dependencies.

## Structure

- **One fixed full-viewport `<canvas>`** behind a minimal, austere astrophysics instrument overlay.
- **An invisible tall scroll track (600vh)** drives one master GSAP timeline from scroll progress `0 → 1`. All scene state (camera orbital radius `r`, inclination `pitch`, azimuth `yaw`, bank `roll`, focal length `fov`, disk opacity, Doppler boost, and polar jet emission) is a deterministic function of scroll progress.
- **Minimal Instrument Overlay:**
  - Top-left: small `"PERIGEE"` wordmark and live Schwarzschild radial distance readout (`r = 38.00 Rs | z = 0.014 | γ = 1.01×`).
  - Bottom-left: chapter marker (`01 — The Shadow`) and chapter navigation buttons `01` to `06`.
  - Top-right: sound toggle (synthesized Web Audio API gravitational sub-bass drone + Geiger-like photon clicks, muted by default).
  - Keyboard: Arrow keys / Space / Shift+Space step cleanly between chapters.

## Six Chapters

1. **THE SHADOW (`r = 38.0 → 24.0 Rs`)**: Wide orbital establisher in deep space. The black hole sits slightly off-center with a rolled horizon (`roll = -0.15`), bending background starlight around the Einstein ring. Headline `"PERIGEE"` and `"Light does not travel in straight lines."`
2. **ACCRETION PLANE (`r = 24.0 → 9.0 Rs`)**: The camera levels roll and descends above the equatorial plane of the accretion disk (`pitch → 0.03`). Keplerian differential rotation shears past the lens. Copy: `"Matter in terminal orbit. Superheated plasma shearing at forty percent the speed of light."`
3. **DOPPLER LIMB (`r = 9.0 → 4.8 Rs`)**: The camera banks sharply (`roll → -0.32`) into the approaching left wing. Relativistic Doppler beaming shifts plasma to blue-white brilliance while the receding wing fades to infrared. Copy: `"Relativistic beaming. What approaches blinds; what recedes fades into infrared."`
4. **THE PHOTON SPHERE (`r = 4.8 → 1.65 Rs`, Signature Interactive Moment)**: Camera hovers at the razor-thin glowing Photon Ring (`r = 1.5 Rs`). The user can drag in space to launch test-photon geodesics into the gravity well—watching them spiral across the horizon, execute a 180° hairpin gravitational slingshot, or deflect into deep space. Copy: `"The photon sphere. Where gravity traps light in a closed circular mirror."`
5. **INNERMOST STABLE ORBIT (`r = 1.65 → 1.18 Rs`)**: Camera skims above the Event Horizon shadow (`r = 1.0 Rs`). Extreme gravitational time dilation. Four crisp architectural callout labels pin around the anatomy of the hole: `"Event Horizon (1.0 Rs)"`, `"Photon Sphere (1.5 Rs)"`, `"ISCO Boundary (3.0 Rs)"`, and `"Secondary Lensed Image"`.
6. **POLAR ESCAPE (`r = 1.18 → 18.0 Rs` North Polar Ascent)**: Camera arcs over the north pole looking down into the spinning vortex as a collimated Relativistic Polar Jet ignites upward. Displays a `"Request Observation Window / Telemetry Feed"` console with client-side validation and animated ephemeris lock.

## Hold-To-Inspect: Singularity Lensing Inspector

In Chapters 1, 3, and 5, holding on the black hole shadow for `~350ms` engages Singularity Inspection Mode:
- Vernier ring fills around pointer during hold.
- Horizontal drag orbits azimuth and scrubs Gravitational Lensing Mass (`uLensingMass` from 0.3 to 2.8).
- Vertical drag scrubs inclination and strips disk opacity (`1.0 → 0.15`) to inspect the naked Photon Ring.
- 3D-projected anatomical labels pin to key relativistic structures.
- Release springs smoothly back to trajectory.

## Palette & Typography

Palette: void `#000000`, starlight `#F6F1EA`, accretion amber `#FFB36B`, Doppler blue `#E6F0FF`, Doppler red `#FF8A3D`. Display & Body: **Inter Tight**, Editorial: **Cormorant Garamond**, Monospace: **JetBrains Mono**.

## Accessibility & Fallback

Server-rendered static telemetry sheet (`StaticFallbackPage`) visible before JavaScript runs. Under `prefers-reduced-motion: reduce`, disabled JavaScript, or WebGL initialization failure, the 3D engine never mounts.
