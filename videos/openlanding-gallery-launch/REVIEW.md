# REVIEW.md

## Creative calls

- Chosen storyline: **Gallery as a door** — the real gallery screenshot is the opener and the cursor is the carrier from card to card.
- Built a 45-second 16:9 cut with one opener, nine named template worlds, and a return-to-gallery end card.
- The alternate triptych and endless-zoom storylines remain documented in `STORYLINES.md` but were not built.
- No voiceover or captions. Local MusicGen produced a 45-second non-lyrical instrumental bed, looped from the generated 28-second seed with a two-second fade-out.

## Verification

- `npx hyperframes@0.8.188 check --json` passed lint, runtime, layout, and contrast after the final contrast adjustment.
- `npx hyperframes@0.8.188 snapshot --review` produced the beat sheet, nine seam sheets, and the 360px phone sheet under `.hyperframes/artifacts/snapshots/432d1d2e-2fe3-4242-b991-a85d3b6c50d3/`.
- I inspected both beat contact sheets, both phone sheets, and the seam contact sheets. Titles and template identities read at desktop and the main names remain visible at phone width.
- Audio was measured by file duration (`assets/bgm/track.wav` = 45.0s); it was not auditioned in this environment.

## Notes kept on purpose

- The source gallery is intentionally held long enough for a viewer to recognize each template; HyperFrames craft warnings about stillness and small metadata labels are deliberate because those labels are secondary navigation texture.
- Four layout infos report intentional image overscan during zoom crops; the wrappers clip the overflow.

## Weakest shot

- TRUECUT Works is the quietest reveal because its source preview is lighter and less photographic than the other templates. With more time I would add a short real TRUECUT detail plate from the page capture while keeping the same measured grid treatment.
