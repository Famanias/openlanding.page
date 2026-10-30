# PERIGEE — design spec

A landing page for **PERIGEE**, a fictional deep-space gravitational observatory and relativistic telemetry array in orbit around a Schwarzschild black hole ("at the edge of curved spacetime"). It is a full-screen interactive 3D relativistic scroll experience: **scrolling pilots the observer along an inbound relativistic geodesic trajectory ($r = 38.0 \rightarrow 1.0\ R_s$), culminating in a polar jet ascent.**

## Requirements

- Next.js 16.4 App Router (route group `(perigee)` with its own root layout), React 19, TypeScript, Tailwind v4.
- Zero added dependencies: reuses existing repo packages `three`, `gsap`, `lenis`. Uses Web Audio natively for synthetic gravitational telemetry audio.
- **Renderer choice: `THREE.WebGLRenderer` (WebGL2).** Chosen for full-screen raymarched relativistic Schwarzschild spacetime curvature shaders, ACES tone mapping, and analytical geodesic integration.
- **Scientific Honesty:** Relativistic Doppler beaming ($I_\text{obs} = I_0 \cdot \delta^3$), gravitational redshift ($1 + z = (1 - 1/r)^{-1/2}$), time dilation ($\gamma = (1 - 1/r)^{-1/2}$), and critical impact parameter ($b_c = 3\sqrt{3}/2 \approx 2.598\ R_s$) are computed analytically.
- **Accessibility & Fallback:** Server-rendered static telemetry sheet (`StaticFallbackPage`) visible before JavaScript runs. With `prefers-reduced-motion: reduce`, disabled JavaScript, or WebGL initialization failure, the 3D engine never mounts and the telemetry sheet is the complete page.

## Concept

| # | Chapter | Trajectory | Focus | Interactive Mechanic |
|---|---|---|---|---|
| 01 | **The Shadow** | $r = 38.0 \rightarrow 24.0\ R_s$ | Deep space orbital establisher | Hold-to-Inspect Singularity |
| 02 | **Accretion Plane** | $r = 24.0 \rightarrow 9.0\ R_s$ | Keplerian differential shear plane | Keyboard / Wheel Stepper |
| 03 | **Doppler Limb** | $r = 9.0 \rightarrow 4.8\ R_s$ | Relativistic beaming & color shift | Hold-to-Inspect Singularity |
| 04 | **The Photon Sphere** | $r = 4.8 \rightarrow 1.65\ R_s$ | Light orbits & unstable circular traps | **Geodesic Slingshot Launcher** |
| 05 | **Innermost Stable Orbit** | $r = 1.65 \rightarrow 1.18\ R_s$ | Event horizon skim & time dilation | Anatomical Structure Pins |
| 06 | **Polar Escape** | $r = 1.18 \rightarrow 18.0\ R_s$ | North polar magnetic jet ascent | Ephemeris Allocation Console |

## Palette

| Token | Hex | Role |
|---|---|---|
| void | `#000000` | deep space ground, event horizon shadow |
| starlight | `#F6F1EA` | primary typography, instrument border, readout chrome |
| amber | `#FFB36B` | accretion disk glow, photon ring accent, telemetry highlight |
| doppler-blue | `#E6F0FF` | approaching blue-shifted stellar emission |
| doppler-red | `#FF8A3D` | receding red-shifted infrared emission |

Content colours in `src/app/(perigee)/perigee/shader/` are exempt.

## Type

- Display & Body: **Inter Tight** (Google Fonts variable `--font-sans`).
- Editorial Accent: **Cormorant Garamond** (Google Fonts variable `--font-serif`).
- Monospace / Telemetry: **JetBrains Mono** (Google Fonts variable `--font-mono`).

## The mechanic (pure, tested mathematics in `physics/`)

- `progress p ∈ [0, 1]` driven by Lenis smooth-scroll over a 600vh track scrubbed by GSAP ScrollTrigger.
- Hold-to-Inspect: ~350ms pointer hold engages smooth 2D orbit and scrubs gravitational lensing mass $uLensingMass \in [0.3, 2.8]$ and disk opacity $uDiskOpacity \in [0.15, 1.0]$.
- Geodesic Slingshot: Click-and-drag computes ray-space impact parameter $b$, integrating null geodesics $\ddot{r} - r\dot{\phi}^2 + \frac{M}{r^2} = 0$, classifying paths as `CAPTURED`, `SLINGSHOT`, or `DEFLECTED`.
- Generative Audio: Sub-bass drone frequency scales with proximity to $r = 1.0\ R_s$; synthetic Geiger counter ticks intensify near the photon sphere.

## Motion

- **Personality:** austere, monumental, relativistic, clinical.
- **Verbs:** curve, accelerate.
- **Signature moment:** Chapter 04 interactive photon slingshot launcher with real-time geodesic trail and accretion plasma illumination.
