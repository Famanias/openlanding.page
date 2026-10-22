# Image Prompts — KINETIC Megamarket

You generate these on any platform you like (Midjourney, Flux, Stable Diffusion, DALL-E). Drop the finished files into `assets/incoming/kinetic/` under the exact filenames, then run `npm run images -- kinetic`.

## Style Preamble (paste into every prompt)

Modern high-end e-commerce and industrial design photography with a warm, tactile, organic aesthetic (inspired by Satsuma and Fallow): warm cream and soft apricot paper surfaces, velvety charcoal shadows, energetic accents of juicy satsuma orange (#FF6B2B) and soft mint glow, soft natural daylight mixed with raking architectural floodlights, tactile matte surfaces, crisp squircle packaging, rounded pill badges, shallow depth of field (50mm, f/2.4). Airy, confident, premium, effortless — never dystopian cyberpunk, never muddy, never noisy. No text, no logos, no typography, no brand marks, no human faces, no watermarks.

## Images

| Filename | Aspect | Used on the page |
|---|---|---|
| `hero-journey.png` | 16:9 | Hero background fallback frame (desktop and mobile) |
| `sortation-chute.png` | 4:3 | Chapter 02 Sortation scanning stage fallback |
| `highway-transit.png` | 16:9 | Chapter 03 Arterial high-speed route fallback |
| `metro-hub.png` | 4:3 | Chapter 04 Metropolitan catalog billboard backdrop |
| `arrival-unboxing.png` | 4:3 | Chapter 05 Doorstep delivery unboxing card |
| `product-headphones.png` | 1:1 | Flash Drop 01: Audio essential item card |
| `product-jacket.png` | 1:1 | Flash Drop 02: Linen field jacket item card |
| `product-battery.png` | 1:1 | Flash Drop 03: Solid-state battery pack card |

### 1. `hero-journey.png`
{preamble}
An aerodynamic electric delivery vehicle idling at a clean, modern distribution center loading gate at golden morning light. Warm cream concrete ground, soft orange livery accents, glowing headlights on the pavement, long soft shadows, clean architectural lines with vast open headroom.

### 2. `sortation-chute.png`
{preamble}
An automated high-speed sorting cell with smooth matte-black conveyor rollers, soft mint laser scanning bar glowing overhead, a clean unbranded kraft parcel box gliding smoothly past an optical guide. Warm studio rim lighting.

### 3. `highway-transit.png`
{preamble}
An autonomous electric delivery truck cruising smoothly along a modern curved highway bridge over a tranquil river at twilight. Gentle horizon glow, glowing taillights casting soft red trails on the smooth asphalt, cinematic landscape, mist in the distance.

### 4. `metro-hub.png`
{preamble}
A metropolitan micro-distribution hub with illuminated modern architectural columns, warm diffused daylight, high-speed parcel chutes, and sleek minimalist interior aesthetic.

### 5. `arrival-unboxing.png`
{preamble}
A premium kraft unboxing parcel sitting on a warm cream porch counter in morning sunlight. A tamper-evident pull strip with a delicate satsuma orange tab, clean squircle box geometry, soft tactile paper grain.

### 6. `product-headphones.png`
{preamble}
Minimalist over-ear studio headphones resting on a sculpted matte ceramic pedestal. Soft warm cream finish, subtle satsuma orange fabric detail on the ear cushions, crisp architectural product lighting.

### 7. `product-jacket.png`
{preamble}
A modern lightweight botanical linen field jacket neatly folded on an apricot-toned wooden surface. Delicate stitching, natural fibers, soft natural window light.

### 8. `product-battery.png`
{preamble}
A sleek solid-state portable power bank with rounded pill corners, matte anodized aluminum shell, soft mint LED battery status indicator, clean studio backdrop.

## Video

None required — the core journey mechanic is rendered in real-time procedural WebGL / Three.js via `JourneyExperience.tsx`.
