# TRUECUT Works media prompts

The media direction is a modern documentary field log for a small electrical and industrial commissioning crew. It borrows the useful proof structure of the reference page—visual hero, service proof, project evidence, and credential strip—while keeping the frame language cleaner, calmer, and more conversion focused.

## Shared style preamble

Use this preamble in every prompt:

> Modern documentary field engineering photography, shot with a full-frame digital cinema camera, tactile real materials, controlled daylight or practical work lights, asphalt charcoal and chalk surfaces with restrained signal-lime and oxide-teal markers, crisp industrial detail, shallow but believable depth of field, honest working environments, deliberate negative space for typography, no text, no logos, no readable private data, no fake client marks, no stock-photo posing, no glossy corporate handshake, no surreal effects.

## Asset table

| Filename | Ratio | Use |
| --- | --- | --- |
| `hero-site-walk` | 16:9 | Hero poster / still fallback for the opening reel |
| `capability-testing` | 4:3 | Testing and commissioning card |
| `capability-controls` | 4:3 | Controls and automation card |
| `capability-retrofit` | 4:3 | Retrofit and revamp card |
| `capability-design` | 4:3 | Design and engineering card |
| `project-switchyard` | 3:2 | Project proof card |
| `project-control-room` | 3:2 | Project proof card |
| `project-panel-detail` | 3:2 | Project proof card |
| `safety-hands` | 4:5 | Working-method section |
| `handoff-drawing` | 4:5 | Working-method detail / form-side image |
| `credential-grid` | 1:1 | Credential strip / supporting proof |
| `og-base` | 16:9 | Open Graph image |
| `hero-site-reel.mp4` | 16:9, 8s | Hero loop; first frame must match `hero-site-walk` |
| `process-proof.mp4` | 16:9, 6s | Pinned field-reel clip; one clear before/after handoff |

## Prompts

### `hero-site-walk`

Modern documentary field engineering photography, shot from just inside an industrial control room at early morning, a commissioning crew seen only as cropped shoulders and gloved hands, a relay cabinet and test instrument in the foreground, switchyard light through the doorway, a clear path into the site, dark asphalt shadows and chalk highlights, signal-lime inspection tag as the only bright colour, generous negative space on the left for a headline, no text, no logos, no readable private data.

### `capability-testing`

Modern documentary close view of a technician’s gloved hands checking a relay panel with a calibrated test instrument, cable leads arranged cleanly, panel doors and fasteners visible, shallow depth of field, practical work light, asphalt, galvanized steel, chalk, and one small signal-lime tag, composition leaves the upper-left corner calm for a service label, no text, no logos, no readable private data.

### `capability-controls`

Modern documentary photograph of a compact control room rack with indicator lights, neatly labelled but unreadable terminals, one operator’s hand reaching toward a control interface, oxide-teal ambient light balanced by chalk highlights, precise geometry, no screens with readable data, no text, no logos, no faces.

### `capability-retrofit`

Modern documentary photograph of an open electrical panel during a retrofit, old and new components visible in a clear before-and-after composition, copper, galvanized steel, insulated cables, an inspection checklist held at the edge of frame but unreadable, strong side light, no text, no logos, no readable private data.

### `capability-design`

Modern documentary overhead image of a field engineer’s desk with rolled site drawings, a tablet showing abstract linework with no readable text, calipers, pencil, cable sample, and a small lime survey marker, chalk paper and asphalt tools, architectural negative space, no text, no logos, no faces.

### `project-switchyard`

Modern documentary wide shot of a compact substations switchyard after commissioning, clean cable runs, safety barriers, one distant cropped crew silhouette, golden late-afternoon light, calm sky, asphalt and chalk palette with oxide teal shadows, cinematic but credible, no logos, no readable signs, no faces.

### `project-control-room`

Modern documentary photograph inside a finished control room, rack doors aligned, test instruments packed away, a single lime status light, two cropped operators reviewing the handoff from behind, deep charcoal and chalk surfaces, a quiet sense of completion, no text, no logos, no readable data, no faces.

### `project-panel-detail`

Modern documentary macro photograph of a finished relay panel detail, clean ferrules, cable labels intentionally out of focus, brushed metal, fastening points, a subtle oxide-teal tag, high clarity and honest wear, no text, no logos, no readable private data.

### `safety-hands`

Modern documentary portrait crop of gloved hands checking a safety harness and test lead before a site walk, torso only, no face, chalk safety vest, asphalt tools, galvanized buckle, small signal-lime tab, soft directional light, vertical composition with room for a short caption, no text, no logos.

### `handoff-drawing`

Modern documentary vertical photograph of a field engineer’s hand pointing at a printed site drawing beside a completed panel, drawing text blurred beyond recognition, a second hand holding a pen, clean handoff moment, chalk paper and oxide-teal shadow, no logos, no readable private data, no faces.

### `credential-grid`

Modern documentary flat lay of blank certification folders, hard hat edge, calibrated meter case, and a folded site map arranged as a quiet evidence grid, no official logos or readable text, asphalt, chalk, galvanized steel, and rare rust tab, square composition.

### `og-base`

Modern documentary wide landscape photograph of an industrial commissioning switchyard at dawn, clean high-voltage racks, cable conduits, and galvanized steel structural frames receding into soft morning mist, dark asphalt ground with chalk highlights, oxide-teal shadows balanced by cool overcast sky, a single crisp signal-lime inspection marker on a foreground terminal box providing the focal accent, expansive negative space across the center and left for typography, cinematic 16:9 composition, shallow depth of field, no text, no logos, no readable private data, no people, no faces.

### `hero-site-reel.mp4`

8-second silent documentary motion clip. Begin on the exact still composition of `hero-site-walk`: dark control-room threshold, gloved hand and test instrument in the foreground. Make one slow forward camera move toward the relay cabinet, let a small lime status light change from idle to ready near the end, then settle on the same framing and brightness as the poster. No whip pan, no text, no logos, no faces. Export a desktop master and a 720p mobile variant.

### `process-proof.mp4`

6-second silent documentary motion clip. Start on an open relay panel before the handoff, one gloved hand checks a lead, a second hand closes and secures the panel, end on the completed clean panel with one lime status marker. Locked camera, tiny human motion, no readable labels, no logos, no faces. Export a desktop master and a 720p mobile variant.

## Save and process

You generate the source media. Save stills with the exact base names above and a `.png`, `.jpg`, or `.webp` extension to `assets/incoming/truecut/`. Save the two MP4 masters as `assets/incoming/truecut/clips/hero-site-reel.mp4` and `assets/incoming/truecut/clips/process-proof.mp4`.

With FFmpeg installed on PATH, run:

```sh
npm run media:truecut
```

This runs `npm run images -- truecut` followed by `npm run clips -- truecut`. The first command writes 800/1600 AVIF and WebP files and `assets.generated.ts`. The second encodes silent H.264 desktop and up-to-720p phone versions, using the short GOP and fast-start settings from `skills/create-landing-template/media.md`. Outputs are `public/templates/truecut/clips/<key>.mp4` and `<key>-m.mp4`; `videos.generated.ts` registers them automatically. No manual edit to `VIDEO_ASSETS` is needed. Keep the source stills in the incoming folder when rerunning the image command: its manifest is rebuilt from that folder.

Missing media retains its labelled placeholder. Supplied stills and successfully processed clips replace placeholders automatically on the next development refresh or build. Phone and reduced-motion visitors see posters until they choose Play; desktop clips play only while in view and include a pause control. No media-generation service is called by either command.

Once the media arrives, inspect the images and both video sizes, then run:

```sh
npm run build
npm test
npm run check
npx tsc --noEmit
npx playwright test
```
