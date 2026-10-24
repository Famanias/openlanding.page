# Mio Hazuki — coded illustration direction

The user requested a fully coded 2D hero. No generation or purchased media is used. All page artwork is finished original inline SVG, not a placeholder. No external images or video are required.

## Shared direction
Original Japanese animation inspired 2D illustration, nostalgic seaside atmosphere, quiet everyday magic, expressive organic silhouettes, layered atmospheric planes, twilight ink, hydrangea, apricot light, paper and plum. Original characters only; no existing films, characters, logos or text. Do not reproduce a living artist's exact style.

| Artwork key | Ratio | Placement | Implementation |
|---|---|---|---|
| harbor | 16:10, responsive crop | Hero | Harbor.tsx; always coded SVG |
| last-light | 4:3 | Work one | AfterRain.tsx |
| cloud-keeper | 4:5 | Work two | CloudKeeper.tsx |
| quiet-delivery | 4:3 | Work three | NightDelivery.tsx |
| summer-room | 4:3 | Work four | SummerRoom.tsx |
| artist | 4:5 | About | ArtistPortrait.tsx |

## Optional future replacement briefs
These art directions describe the coded work as well as any eventual user-created portfolio pieces. They are not requests for generated media.

- **last-light:** A tiny coastal home overlooking a quiet inlet after rain. Windblown grasses, distant layered islands, a single person on a path, peach cloudbank. Wide composition, original 2D picture-book scenery, no text or logos.
- **cloud-keeper:** An original young traveler in a plum cloak, carrying a jar containing a tiny glowing cloud, accompanied by a small white fox. Full character composition against a hydrangea sky. Original 2D character design, no text or logos.
- **quiet-delivery:** An original red bicycle with parcels waiting outside a warmly lit hillside shop at night. Pots of flowers, curtains, moon, distant harbor. Original 2D scene, no text or logos.
- **summer-room:** An artist's open window with sea views, a tabby cat sleeping beside a sketchbook, wildflowers in a ceramic cup, late-day sunlight across the wooden desk. Original 2D interior, no text or logos.

If the owner later replaces portfolio samples with their real raster work, raw files belong in `assets/incoming/mio/`; process through `npm run images -- mio` for 800/1600px AVIF/WebP. This is optional and the delivered site is visually complete without it.
