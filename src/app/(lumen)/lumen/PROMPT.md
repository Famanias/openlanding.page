# LUMEN — The AI Workflow Playbook

Build a complete, responsive, conversion-focused single-page experience for **LUMEN — The AI Workflow Playbook**. The page provides practical frameworks, real-world examples, and reusable prompts for knowledge workers designing automated and AI-assisted workflows.

## Brand and central idea

LUMEN transforms abstract, repetitive knowledge work into tangible, transparent systems. Its voice is pragmatic, encouraging, and clear—rejecting AI hype, false claims, and jargon in favor of concrete steps, review gates, and human oversight.

**Central idea:** complex workflows made luminous and clear through optical glassmorphism. Refractive glass planes, caustics, and layered translucent stages visualize inputs flowing into AI processing and structured outputs.

Mood: luminous, serene, precise, modern, architectural. Clean light canvas `#F8F9FC` with pastel refractions (Lavender `#D8D0F7`, Ice Blue `#C9DAFA`, Peach `#F6DCCA`) and crisp deep navy typography `#1E2432`.

## Assets and visuals

- Procedural WebGL2 Three.js glass backdrop with custom refraction, Fresnel reflection, and dispersion shaders.
- Six distinct optical presets: Opal Ribbon, Frosted Fold, Liquid Lens, Glass Strata, Refractive Halo, and Caustic Window.
- Dedicated full-screen Glass Studio mode (`/_glass-studio` / `?studio=1`) with real-time parameter tuning, safe area inspection, aspect ratio framing, code export, and live video capture.
- Vector and PNG playbook assets for the 16-page cover and layered 2.5D interactive excerpt stacks.

## Identity and visual system

- **Palette:** 
  - Primary Base: `#F8F9FC`, `#F0F3FA`, `#FFFFFF`
  - Deep Navy Text & Controls: `#1E2432`, `#252C43`
  - Muted Slate: `#657187`, `#CBD5E1`
  - Pastel Glass Tints: `#D8D0F7` (Lavender), `#C9DAFA` (Ice Blue), `#F6DCCA` (Peach)
  - Positive Mint Accent: `#5BA59A`
- **Typography:** Plus Jakarta Sans for balanced, human headings and body; JetBrains Mono for technical labels, code, and stage counters.
- **Glass Surfaces:** Multi-layer backdrop blur (`backdrop-filter: blur(16px)`), specular edge highlights (`inset 0 1px 0 rgba(255,255,255,0.9)`), subtle dual-drop shadows, and soft gradient borders.

## Page sections

1. **Header:** Minimal sticky bar with LUMEN tracking mark, anchor navigation (Workspace, Playbook Preview, How It Works, FAQ, Glass Studio), and primary CTA.
2. **Hero (The Glass AI Workspace):** Value proposition, email capture form with validation and cooldown protection, unboxed metadata badges, optical scene switcher, and interactive 2.5D perspective workspace stage with stepped demonstration.
3. **Trusted By:** Clean monochrome marks of forward-thinking teams using structured workflows.
4. **The Problem:** 4 tangible pain points (email triage, meeting synthesis, unstructured document processing, fragmentation) with interactive impact details.
5. **Benefits:** 3 core pillars (Practical Frameworks, Real Worked Examples, Reusable Prompts) with interactive scenario drilldowns.
6. **Inside the Playbook:** Interactive 3-card 2.5D document stack previewing sample pages with tabbed navigation and 16-page outline modal.
7. **How It Works:** 3-step operational progression (Identify Tasks, Design Workflow with Human Review Gates, Run & Refine).
8. **Practical Credibility:** Framework comparison table and methodology pillars highlighting reliability, security, and human-in-the-loop validation.
9. **FAQ:** Accordion covering formats, prerequisites, privacy, team rollout, and updates.
10. **Final Download CTA:** High-conversion conversion card with secondary email capture.
11. **Footer:** Animate an image-derived 3D glass relief mesh made from the AI-generated artwork, layered over the continuous page atmosphere with drifting light particles and glassy water drops. Particles and drops react to pointer movement; tapping or clicking the artwork releases a brief droplet burst and ripple. The mesh has estimated depth, the original image texture, and scroll-responsive drift; show the transparent image for reduced motion or unavailable WebGL. Include a closing playbook link, section navigation, studio link, and oversized LUMEN wordmark.

## Motion and interaction

- GSAP opening sequence with staggered headline reveals and 2.5D card assemblage.
- Mouse-driven 3D tilt interaction on perspective stages with spring returns.
- Smooth scroll atmosphere controller tracking global scroll progress for subtle background parallax.
- Respects `prefers-reduced-motion` with instant reveals, disabled tilt, and flattened fallback compositions.
