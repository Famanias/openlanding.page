# WOWFLUTTER image prompts

Eight images for the Issue 07 magazine. Generate them in a **new Gemini chat**, one prompt at a time, save each as `<filename>.png` into `assets/incoming/wowflutter/`, then run `npm run images -- wowflutter`. That maps every pixel's luma onto a ramp from tape black `#14110F` to uncoated stock `#EFE6D4`, so ask for **black-and-white** now; the pink overprint behind each image is added by the page.

## Style preamble

This is already included at the start of every prompt below. It's shown here for reference.

> Black-and-white 35 mm flash-on-film photograph, photocopier-zine look. Hard on-camera flash, visible film grain, slightly lifted blacks, high contrast, a little underexposed, deep shadows. Real rooms and real objects, imperfect and tactile, never glossy or styled. No colour at all. No people looking at the camera. No text, logos or lettering anywhere in the picture. Warm, quiet, handmade.

## Images

| # | Filename | Aspect | Where it's used |
|---|---|---|---|
| 1 | `cover-portrait.png` | 3:2 | Cover (page 1), the only image above the fold |
| 2 | `feature-stairwell.png` | 4:3 | Feature opener, the black page (page 4) |
| 3 | `feature-baths.png` | 3:2 | Liner notes, part one (page 5) |
| 4 | `artist-marl.png` | 1:1 | Roster: Marl Quartet (page 7) |
| 5 | `artist-ines.png` | 1:1 | Roster: Ines Haverford (page 8) |
| 6 | `artist-dunmore.png` | 1:1 | Roster: Dunmore & Ash (page 9) |
| 7 | `sleeve-stack.png` | 16:9 | Catalogue Side A, cropped to a wide band (page 10) |
| 8 | `press-room.png` | 3:2 | The pressing plant (page 12) |

#### 1. `cover-portrait.png` (3:2)

```text
Black-and-white 35 mm flash-on-film photograph, photocopier-zine look. Hard on-camera flash, visible film grain, slightly lifted blacks, high contrast, a little underexposed, deep shadows. Real rooms and real objects, imperfect and tactile, never glossy or styled. No colour at all. No people looking at the camera. No text, logos or lettering anywhere in the picture. Warm, quiet, handmade. A cellist seen from above, face turned away, playing alone on a concrete stairwell landing, the open cello case beside her, the concrete steps spiralling down into darkness below. Aspect ratio 3:2.
```

#### 2. `feature-stairwell.png` (4:3)

```text
Black-and-white 35 mm flash-on-film photograph, photocopier-zine look. Hard on-camera flash, visible film grain, slightly lifted blacks, high contrast, a little underexposed, deep shadows. Real rooms and real objects, imperfect and tactile, never glossy or styled. No colour at all. No people looking at the camera. No text, logos or lettering anywhere in the picture. Warm, quiet, handmade. The back stairwell of a closed Victorian swimming baths: tiled walls with a dado stripe, a cast-iron handrail, a high window throwing one hard shaft of daylight onto the landing, flaked paint and damp stains, no people. Aspect ratio 4:3.
```

#### 3. `feature-baths.png` (3:2)

```text
Black-and-white 35 mm flash-on-film photograph, photocopier-zine look. Hard on-camera flash, visible film grain, slightly lifted blacks, high contrast, a little underexposed, deep shadows. Real rooms and real objects, imperfect and tactile, never glossy or styled. No colour at all. No people looking at the camera. No text, logos or lettering anywhere in the picture. Warm, quiet, handmade. The empty main pool of a closed Victorian swimming baths, drained, white glazed tiles peeling in patches, a gallery of cubicle doors along one side, a single folding chair left on the pool floor, no people. Aspect ratio 3:2.
```

#### 4. `artist-marl.png` (1:1)

```text
Black-and-white 35 mm flash-on-film photograph, photocopier-zine look. Hard on-camera flash, visible film grain, slightly lifted blacks, high contrast, a little underexposed, deep shadows. Real rooms and real objects, imperfect and tactile, never glossy or styled. No colour at all. No people looking at the camera. No text, logos or lettering anywhere in the picture. Warm, quiet, handmade. Four string players in winter coats sitting on concrete stairs inside a closed swimming baths with their instruments across their knees, all looking away from the camera at something off to one side, flash flattening the scene. Aspect ratio 1:1.
```

#### 5. `artist-ines.png` (1:1)

```text
Black-and-white 35 mm flash-on-film photograph, photocopier-zine look. Hard on-camera flash, visible film grain, slightly lifted blacks, high contrast, a little underexposed, deep shadows. Real rooms and real objects, imperfect and tactile, never glossy or styled. No colour at all. No people looking at the camera. No text, logos or lettering anywhere in the picture. Warm, quiet, handmade. A woman seen from behind and slightly from the side at an upright piano in a bare rented room, a cast-iron radiator beside her with a mug on top, one table lamp on, rumpled sheet music on the floor. Aspect ratio 1:1.
```

#### 6. `artist-dunmore.png` (1:1)

```text
Black-and-white 35 mm flash-on-film photograph, photocopier-zine look. Hard on-camera flash, visible film grain, slightly lifted blacks, high contrast, a little underexposed, deep shadows. Real rooms and real objects, imperfect and tactile, never glossy or styled. No colour at all. No people looking at the camera. No text, logos or lettering anywhere in the picture. Warm, quiet, handmade. Two musicians at a cramped kitchen table at night with a small harmonium and a battered acoustic guitar, mugs, a clutter of cables and cassettes, one of them mid-laugh with their head turned away from the camera. Aspect ratio 1:1.
```

#### 7. `sleeve-stack.png` (16:9)

```text
Black-and-white 35 mm flash-on-film photograph, photocopier-zine look. Hard on-camera flash, visible film grain, slightly lifted blacks, high contrast, a little underexposed, deep shadows. Real rooms and real objects, imperfect and tactile, never glossy or styled. No colour at all. No people looking at the camera. No text, logos or lettering anywhere in the picture. Warm, quiet, handmade. A low stack of plain black record sleeves on a workbench, each with a hand-stitched zine sticking half out of it, shot straight on at table height with generous empty space above and below the stack so it can be cropped to a wide band. Aspect ratio 16:9.
```

#### 8. `press-room.png` (3:2)

```text
Black-and-white 35 mm flash-on-film photograph, photocopier-zine look. Hard on-camera flash, visible film grain, slightly lifted blacks, high contrast, a little underexposed, deep shadows. Real rooms and real objects, imperfect and tactile, never glossy or styled. No colour at all. No people looking at the camera. No text, logos or lettering anywhere in the picture. Warm, quiet, handmade. A small two-colour offset printing press in a former print shop, ink-stained rollers, a trestle table beside it covered in folded but unstitched zine signatures, a long-arm stapler and a bone folder in the foreground, no people. Aspect ratio 3:2.
```
