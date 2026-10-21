# Design questions

Ask these in **two rounds at most**, through your question tool if you have one (multiple choice with an "Other" option), otherwise as a short numbered list. Every question has a "you decide" option. Skip anything the user has already answered.

## Round 1: what it is

1. **Business.** What does the brand sell, and to whom?
 *Examples: a restaurant, an outdoor-gear label, an AI company, a law firm, a record label.*
 You decide: pick an industry the gallery doesn't have yet (check `src/app/(index)/data/templates.ts`).
2. **Theme: the page's signature mechanic.** How should the page *behave*?
   - 3D-focused: a real-time WebGPU object, or scroll-scrubbed 3D video
   - Presentation: a keynote deck, slide by slide
   - Showcase: scroll storytelling with product interactions
   - Something new: a map, a timeline, a configurator, an editorial magazine, a game-like interaction…
   - You decide
3. **Brand name.** Does the user have one, or should you invent it?

## Round 2: how it looks

4. **Era and mood.** For example "1960–90s brutalist", "Swiss editorial", "warm analog", "clinical future", "luxury quiet".
5. **Colour rules.** Any must-use or never-use colours, or a limit such as "three colours only"?
6. **References.** Sites, films, objects or places that feel right.
7. **Corner geometry.** Sharp (zero-radius, brutalist/utilitarian) or rounded (soft, modern, squircle)? Specify a preference like strict 0px, subtle 4–8px rounding, or heavily curved/pill shapes.
8. **Motion personality.** How should the page move? Options from `motion-system.md` §1: precise/clockwork, soft/luxurious, kinetic/bold, organic/analog, technical/cinematic. Also ask how intense: refined (subtle, quiet), expressive (clearly animated everywhere) or showpiece (maximal, scroll-driven set pieces). Motion is always on every section, interaction and scroll; this only sets its character. You decide: derive it from the mood and the mechanic, defaulting to expressive.
9. **Images and video: who generates them?** Word this from the key-detection result, following `media.md` §2:
   - Keys found: should the agent generate with the detected provider, or will the user generate from the prompts on any platform they choose?
   - No keys: say "No API keys for image/video generation were detected." Then offer: the user generates from your prompts on any platform, they paste the key's *variable name* so you can double-check it, or the page goes without photos (SVG, CSS and 3D only).
10. **Background treatment**. What style should the canvas use? For example: plain solid/neutral, organic decorative blobs, subtle gradients or patterns, custom graphic assets, or layered mixed media?

## After the answers

Play back a summary: business, mechanic, name, mood, motion personality, and colour and media plan. Then go to the Phase 3 concept. Mark each choice the user didn't make as **your call**.