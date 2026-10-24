# Studio Kazeko — artwork prompts

You chose to generate the artwork. The template currently uses original illustrated SVG placeholders, clearly labelled as concept artwork. No external generation has been run.

Save these files in `assets/incoming/kazeko/`:

| File | Ratio | Use |
|---|---|---|
| the-last-light.png | 16:10 | First film: village at dusk |
| where-the-river-goes.png | 16:10 | Second film: summer river |
| a-pocketful-of-spring.png | 16:10 | Third film: botanical still life |
| studio-window.png | 4:5 | Studio story |

The interactive landscape remains SVG so its pencil and colour layers always align precisely. These four stills are optional replacements for the labelled concept artwork.

## 1. the-last-light.png
Original Japanese-inspired 2D animation background art, dreamlike quiet countryside, hand-painted gouache and delicate pencil edges on softly grained paper, restrained palette of warm ivory, deep forest ink, sage green, pale leaf green, powder blue, butter yellow and tiny clay-red details. Wide cinematic composition, natural imperfect contours, no recognisable existing film or studio style, no text, logos, watermarks or people's faces. A tiny rural house with a clay roof nestles among rolling sage hills, winding footpath, summer grasses and a pale butter-yellow sun descending behind the hills; a single illuminated window suggests someone is home. Quiet anticipation and late-afternoon warmth. Compose a readable focal point near the lower centre. 16:10 aspect ratio, at least 1600px wide.

## 2. where-the-river-goes.png
Original Japanese-inspired 2D animation background art, dreamlike quiet countryside, hand-painted gouache and delicate pencil edges on softly grained paper, restrained palette of warm ivory, deep forest ink, sage green, pale leaf green, powder blue, butter yellow and tiny clay-red details. Wide cinematic composition, natural imperfect contours, no recognisable existing film or studio style, no text, logos, watermarks or people's faces. A pale blue river winds through layered green rice fields, a simple wooden footbridge spans the foreground, tall reeds frame the edges, distant rounded mountains dissolve into a summer sky and two small paper birds float above the water. Airy, spacious, gentle. 16:10 aspect ratio, at least 1600px wide.

## 3. a-pocketful-of-spring.png
Original Japanese-inspired 2D animation background art, dreamlike quiet countryside, hand-painted gouache and delicate pencil edges on softly grained paper, restrained palette of warm ivory, deep forest ink, sage green, pale leaf green, powder blue, butter yellow and tiny clay-red details. Wide cinematic composition, natural imperfect contours, no recognisable existing film or studio style, no text, logos, watermarks or people's faces. A close-up botanical scene with a terracotta flowerpot on an old country windowsill, tall butter-yellow cosmos flowers and delicate wild leaves bending toward an open pale-blue sky; one tiny folded-paper bird rests by the pot. Intimate, optimistic, handcrafted. 16:10 aspect ratio, at least 1600px wide.

## 4. studio-window.png
Original Japanese-inspired 2D animation background art, dreamlike quiet countryside, hand-painted gouache and delicate pencil edges on softly grained paper, restrained palette of warm ivory, deep forest ink, sage green, pale leaf green, powder blue, butter yellow and tiny clay-red details. Natural imperfect contours, no recognisable existing film or studio style, no text, logos, watermarks or people's faces. View from inside a small rural animation studio: an oak drawing desk with loose paper, pencils in a ceramic cup, a folded paper bird, a plant, and an open wooden window framing green hills. Midmorning light falls across the desk. Human presence without people. Portrait 4:5 aspect ratio, at least 1600px tall.

## Process the files
Run `npm run images -- kazeko` after saving the four named PNGs. This creates 800w/1600w WebP and AVIF files in `public/templates/kazeko/` and updates `assets.generated.ts`. Review a contact sheet before relying on the final images. No video is required; all motion is live SVG/CSS.
