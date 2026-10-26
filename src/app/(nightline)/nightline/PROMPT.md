# Prompt: rebuild "NIGHTLINE"

Build a Next.js 16 App Router landing page for NIGHTLINE, a fictional European sleeper-train booking brand. The whole site is a train window at night: a raw WebGL2 full-screen fragment shader renders rain, condensation, deep-blue glass, and defocused amber city lights. Scroll moves the train through four chapters: Departure, Midnight, Border crossing, and Dawn. The DOM remains accessible and carries all copy; the shader is atmospheric support.

Use only the six palette colours in `scripts/templates.config.ts`: ink `#081423`, deep `#0D2238`, paper `#F4E8C1`, amber `#F4B65E`, mist `#A7B4C7`, rose `#C97972`. Use Instrument Serif, DM Sans, and IBM Plex Mono through `next/font/google`. Build sections for hero, journey rail, cabins, midnight service, border route, dawn statistics, booking form, and footer.

Motion identity is technical/cinematic: scan and settle. Use mask-rise, clip wipes, cascades, drawn rules, count-ups, pointer tilt and a hero load sequence. Animate transforms, opacity and clip-path only. Reduced motion, no-JS, and touch must keep all content visible and complete; WebGL never mounts when reduced motion is requested. The booking form validates locally and replaces itself with a success card.

Run `npm run check`, `npm test`, `npx tsc --noEmit`, and `npx playwright test` before handoff.
