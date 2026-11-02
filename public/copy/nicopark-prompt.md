# Prompt: rebuild Nico Park — Product Design Portfolio

Build an isolated Next.js 16 App Router + React 19 + TypeScript + Tailwind CSS v4 landing template for an independent industrial and digital product designer named Nico Park.

Brand and central idea:
Nico Park designs physical objects and tactile digital interfaces. The core thesis is "Design Should Feel Good." The landing page is built like a precision machined device: tactile panels with 2px solid outlines, spring physics, an 8-spoke asterisk mark, interactive exploded hardware schematics, and an interactive audio companion demo.

Visual system and typography:
Palette: warm canvas #F8F7F2, ink black #191919, signature cobalt #3049F0, signal coral #FF735D, butter yellow #F7E36B, lavender mist #D5C8FC, muted slate #515151, and outline #222222.
Typography: Anton and Barlow Condensed for impactful condensed headers (font-display), Barlow Condensed for badges and labels (font-condensed), JetBrains Mono for engineering specs (font-mono-tech), and Plus Jakarta Sans for body text.

Sections:
1. Sticky Header with wordmark, spinning 8-spoke asterisk on hover, nav items (Work, Playground, About, Notes), magnetic Connect button, and mobile menu drawer.
2. Hero section featuring "DESIGN SHOULD FEEL GOOD" headline, interactive 3D pointer-tilt stage, mini music player, modular tactile switches, and direct inspection links.
3. Selected Work (01–03) showcasing LOOP audio hardware, FORMA workspace, and KINDRED brand system, with interactive full-screen case study modal.
4. LOOP Anatomy featuring an exploded assembly stage with custom slider control (0 to 100% explode factor) and layer inspector (Cover, Dial, PCB, Buttons, USB-C).
5. LOOP App preview featuring interactive software audio demo with waveform visualizer, playback controls, and track selector.
6. Process section with 4-phase tactile design methodology and sketch artifacts.
7. Playground section with parametric 8-pointed asterisk geometry generator and dial lab.
8. About & Notes section with studio workspace illustration and editorial articles.
9. Contact & Footer section with scope selector, validated inquiry form, mailto generator, and back-to-top navigation.

Mechanic and motion:
Pure tested logic in portfolioData.ts for exploded view coordinate transforms, cyclic navigation, asterisk geometry calculation, and contact form validation. Motion identity is tactile and mechanical with spring easing cubic-bezier(0.16, 1, 0.3, 1) and overshoot ease cubic-bezier(0.34, 1.56, 0.64, 1), accompanied by specular highlight sweeps and full reduced-motion accessibility.
