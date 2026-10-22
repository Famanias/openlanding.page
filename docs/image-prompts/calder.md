# Calder & Rowe: image prompts

Two optional portraits. The page is complete without them: until the files exist, each portrait renders as a labelled 4:5 placeholder.

Save the raw files to `assets/incoming/calder/`, then run `npm run images -- calder`. That writes 800w and 1600w AVIF and WebP to `public/templates/calder/` and fills `src/app/(calder)/calder/assets.generated.ts`.

## Style preamble (paste at the start of every prompt)

> Editorial portrait photograph, medium format film look, soft north-facing window light with a gentle falloff to deep shadow, a muted palette of midnight navy, warm ivory and a touch of antique brass, natural skin texture, shallow depth of field, quiet and composed, a hint of film grain. A real working professional, not a model: relaxed, direct and unposed. Plain dark wall or a softly out-of-focus wood-panelled library behind. No text, no logos, no watermarks, no props that read as stock-photo law clichés (no gavels, no scales of justice, no handshake).

## Images

| File (`assets/incoming/calder/`) | Aspect | Used on the page |
|---|---|---|
| `partner-calder.jpg` | 4:5 portrait | Counsel section, left card: Mara Calder, founding partner |
| `partner-rowe.jpg` | 4:5 portrait | Counsel section, right card: Daniel Rowe, partner |

Keep the face in the upper-middle of the frame with headroom: the card crops at 4:5 and zooms 4.5% on hover.

## partner-calder (4:5)

> Editorial portrait photograph, medium format film look, soft north-facing window light with a gentle falloff to deep shadow, a muted palette of midnight navy, warm ivory and a touch of antique brass, natural skin texture, shallow depth of field, quiet and composed, a hint of film grain. A real working professional, not a model: relaxed, direct and unposed. Plain dark wall or a softly out-of-focus wood-panelled library behind. No text, no logos, no watermarks, no props that read as stock-photo law clichés (no gavels, no scales of justice, no handshake).
>
> Subject: a woman in her late fifties, silver-streaked dark hair worn back, a dark navy tailored jacket over an ivory blouse, small brass earrings. She looks just past the camera with a calm, attentive half-smile. Head and shoulders, three-quarter turn, framed with generous headroom, in a 4:5 vertical frame.

## partner-rowe (4:5)

> Editorial portrait photograph, medium format film look, soft north-facing window light with a gentle falloff to deep shadow, a muted palette of midnight navy, warm ivory and a touch of antique brass, natural skin texture, shallow depth of field, quiet and composed, a hint of film grain. A real working professional, not a model: relaxed, direct and unposed. Plain dark wall or a softly out-of-focus wood-panelled library behind. No text, no logos, no watermarks, no props that read as stock-photo law clichés (no gavels, no scales of justice, no handshake).
>
> Subject: a man in his early fifties, short dark hair greying at the temples, light stubble, a charcoal suit and an open-collared ivory shirt, no tie. He looks straight at the camera with a steady, warm expression. Head and shoulders, shoulders squared, framed with generous headroom, in a 4:5 vertical frame.

## Checking the result

- Palette: cool navy and warm ivory with brass accents; reject anything with saturated colour casts.
- No text, signage or logos in the background.
- Both portraits should feel like the same photographer on the same day: matching light direction, grain and background depth.
