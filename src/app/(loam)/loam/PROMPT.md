# Prompt: rebuild "LOAM"

Build a landing page for **LOAM**, a fictional biotechnology materials studio that grows custom compostable packaging from living mycelium networks and agricultural hemp hurd ("grown, not made"). It is an experience-grade, full-screen three.js macro world: **a mushroom is only the visible fruiting body of something far larger, so scrolling descends beneath the forest floor to reveal the living network that LOAM turns into protective materials.**

## Stack

Next.js 16 App Router (own route group `(loam)` with its own root layout), React 19, TypeScript, Tailwind v4. Three.js WebGL2 renderer (`three`), GSAP (`gsap`), Lenis (`lenis`), and Web Audio API for generative subterranean sound. Zero added dependencies.

## Story (six chapters, two rest points in Chapter 4)

1. **The fruit (hook):** One parasol mushroom (*Macrolepiota procera*) on dark, mossy forest floor in macro framing with drifting spore motes. "What you see is the smallest part." (Inspectable: mushroom).
2. **Under the cap (insight):** Camera tilts up beneath the gills; spores fall past the lens. "A mushroom is only the fruit. The organism lives underground."
3. **Breaking ground (transition):** Ant-farm soil cross-section descent through leaf litter, humus, topsoil with thick tree roots, into subsoil clay.
4. **The network (signature):**
   - **4a (close clump):** Close on a fist-sized mycelium clump binding soil and bark. (Inspectable: clump).
   - **4b (wide network):** Camera pulls back into a vast cavern; over 1,200 foxfire green-gold filaments ignite. Pointer proximity brightens threads; clicking sends traveling light pulses that illuminate neighboring mushrooms.
5. **The material (product):** Subterranean threads converge and resolve into LOAM's molded packaging tray. Studio lighting lifts; supporting product forms slide into view; 3-step lifecycle strip ("Grown in 7 days", "Protects in transit", "Composts back to soil"). (Inspectable: tray with broken corner).
6. **Return (conversion):** Camera ascends back through the soil to the surface; a ring of newly fruited mushrooms surrounds the first. Request a sample kit form with local validation and animated sprouting mushroom success.

## Interaction vocabulary

- **Hold-to-inspect:** ~350ms pointer hold fills a circular progress ring, then unlocks weighted quaternion rotation. Releasing springs smoothly home.
- **Keyboard inspect:** Focusable button in header/footer ("Inspect specimen"); Enter toggles, arrow keys rotate, Escape exits.
- **Time-of-day slider:** Header slider smoothly adjusts sunlight angle, color temperature (warm dusk amber #ff8a3d -> midday daylight #f4f8fb), and background CSS variables.
- **Generative sound:** Off by default; toggle starts Web Audio oscillators producing damp forest air tones and subterranean drone harmonics.
- **Chapter snapping:** Stopping scroll eases to the nearest chapter rest point (including 4a and 4b).

## Palette & type

loam `#080604`, spore `#F0E8D8`, cap `#7A5C43`, foxfire `#C8E64C` (the signature accent). Google Fonts: display **EB Garamond**, body **Host Grotesk**, monospace **Sono**.

## Accessibility & fallback

Server-rendered static specimen sheet (`StaticFallbackPage`) with all chapter copy in order, product facts, reference photo plates, and sample kit form. With `prefers-reduced-motion: reduce`, disabled JavaScript, or WebGL initialization failure, the 3D engine never mounts.
