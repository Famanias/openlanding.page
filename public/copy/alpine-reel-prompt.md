# Prompt: rebuild “Alpine Reel” (horizontal eight-thousander landing page)

Build a Next.js 16 App Router page for the fictional editorial brand **Alpine Reel**. The page is a full viewport horizontal reel of the fourteen eight-thousanders from `slides/data.ts`. Its central idea is: the peaks are a film reel, so lateral movement is the navigation.

Use a cold palette: abyss `#040B16`, navy `#08162A`, ice `#6EA8D2`, snow `#FFFFFF`. Load Playfair Display for peak titles and dossier copy, Geist for body, and Geist Mono for metadata. Keep all colours tokenized in `alpine-reel.css` and use `overflow-x: clip` on `html` and `body`.

Desktop uses 80vw slides with 5vw gaps, a seven-point-five viewport-height frame, five loop copies, and a three-second cubic fast-forward that sweeps 13 slides from K2 to Everest with a velocity-driven horizontal blur and vertical scanlines, content hidden until it lands. Scroll, wheel, drag, edge-zone taps, arrow keys and the 14-pip counter snap the deck. Images move at 1/1.2 of slide speed. The 104px cursor changes from “Scroll” to edge chevrons. Explore opens a right-side dossier, tilts the frame as a door, and keeps its own vertical scroll.

The page must render all content with scripting disabled, support a 390px touch viewport, and become still and fully readable under `prefers-reduced-motion: reduce`. Add pure tests for wrapping, target positions, spring steps, drag threshold, parallax and content progress. Keep the frame data in a typed module and use no invented testimonials, logos or marketing metrics.
