# Prompt: rebuild "SEREIN Bureau" (vertical weather landing page)

Build an isolated landing page in Next.js 16 App Router, React 19, TypeScript and Tailwind CSS v4 for a fictional atmospheric desk called SEREIN Bureau. The tagline is "Small weather, closely observed." SEREIN publishes precise, human weather reports for ordinary places.

The page is a continuous paper landing page from header to footer. It contains Today’s Outlook, The Bureau Note, Instruments, The Forecast, Field Notes, Dispatch Index, Subscribe and a footer. The signature interaction lives inside the forecast section: three forecast windows switch in place while a pressure line redraws from first light to last light. The page itself always scrolls normally; it is not a slideshow or deck.

Use four colours only: ink `#24343A`, paper `#F6F0E5`, seafoam `#A8D6CC` and lavender `#C7BCE6`. Derive tints with `color-mix()`. Use Lora for display, Public Sans for body and IBM Plex Mono for station labels.

The header has the SR-07 mark, section links and a Join the dispatch CTA. The hero headline is “Small weather, closely observed.” Use original SVG isobars, clouds, wind roses, barometer geometry and a paper texture. The bureau section explains the observation practice. Instruments show pressure, wind direction and cloud ceiling. The forecast section has accessible tabs for First light, High front and Last light; each tab updates copy, readings and a coded SVG trace. Field notes contain three observations. Dispatch rows point to the signup section. The signup form validates `Add your name` and `Enter a valid email`, then shows a stamped `DISPATCHED` success state without a network request.

Motion is organic/analog with verbs unfurl and settle. Use masked headline rises, clip-path SVG wipes, drawn rules, staggered cards, restrained cloud drift and tab underline motion. Animate transform, opacity and clip-path only. Use 90/180/420/800/1200ms tokens, visible focus rings, keyboard-safe controls, no hover-only information and a complete no-JS state. Reduced motion keeps the document flow and makes tab changes instant.

Keep code isolated under `src/app/(serein)/serein/`, include `DESIGN.md`, `docs/image-prompts/serein.md`, pure logic tests for forecast/form/motion math, the six gallery registration points, and a Playwright spec covering anchors, forecast tabs, form success, phone flow and reduced motion.
