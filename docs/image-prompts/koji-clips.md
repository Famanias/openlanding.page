# KŌJI: food-flight video clips (Veo relay)

The omakase section scrubs a continuous video "food flight" as you scroll. The camera pushes in on each dish, then pulls back and drifts to the next plinth, with no visible cuts. That takes **9 clips**: 5 dives and 4 connectors. Every join has to match frame for frame, so the clips are made as a **relay**, in order.

**Before you start:** the five flight stills from [koji.md](koji.md) must exist in `assets/incoming/koji/`:

- `flight-sakizuke.png`
- `flight-mukozuke.png`
- `flight-yakimono.png`
- `flight-nimono.png`
- `flight-shokuji.png`

## Where to generate

- **Dives** (start image + prompt): Gemini → **Video** (Veo), or Google Flow → "Frames to Video" with only a first frame. 16:9, 8 seconds.
- **Connectors** (first frame + last frame + prompt): **Google Flow → "Frames to Video"**, setting both the first and the last frame. 16:9, 8 seconds.
  - If you can only set a first frame, generate anyway. That join becomes a deliberate concrete "slab wipe" instead of a seamless cut. The page still works.

Save every clip as MP4 into `assets/incoming/koji/clips/` with the **exact filename** in the tables. Use the same video model and quality setting for all nine.

## The relay

| Step | You do | I do |
|---|---|---|
| 1 | Generate the 5 dives (`dive-1.mp4` … `dive-5.mp4`) from their stills, using the prompts below | — |
| 2 | Tell me they're in | Run `scripts/seam-frames.sh 1..4`, which writes `clips/seam-N-N+1/start.png` (the last frame of dive N) and `end.png` (the first frame of dive N+1) |
| 3 | Generate the 4 connectors. Set **first frame = `start.png`** and **last frame = `end.png`** from the matching seam folder | — |
| 4 | Tell me they're in | Run `scripts/seam-check.sh`. Each join must reach 30 dB PSNR (frame-identical to codec noise). Any join that misses: one re-roll, and if it still misses, that join becomes a slab wipe |

Always use the **extracted** `start.png` / `end.png`, never the original stills. Veo's first frame drifts slightly from its input, and the seam only holds if each clip starts on the real last frame of the one before it.

## Shared clause

This is already pasted into every prompt below. It keeps all nine clips feeling like one camera in one room.

> Single continuous cinematic camera move, no cuts. 1970s Japanese colour film look, visible film grain, slightly faded warm-neutral colours. A dish on a waist-high plinth of raw board-marked concrete in front of a flat matte concrete-grey wall, one soft light from the upper left, deep quiet shadows. Slow, weighty, deliberate camera, like a heavy dolly on rails. Absolutely no text, no captions, no people, no hands.

## Dives: wide → close (start image = the flight still)

| File | Start image | Scene |
|---|---|---|
| `dive-1.mp4` | `flight-sakizuke.png` | Sakizuke |
| `dive-2.mp4` | `flight-mukozuke.png` | Mukōzuke |
| `dive-3.mp4` | `flight-yakimono.png` | Yakimono |
| `dive-4.mp4` | `flight-nimono.png` | Nimono |
| `dive-5.mp4` | `flight-shokuji.png` | Shokuji |

### dive-1.mp4

```text
Single continuous cinematic camera move, no cuts. 1970s Japanese colour film look, visible film grain, slightly faded warm-neutral colours. A dish on a waist-high plinth of raw board-marked concrete in front of a flat matte concrete-grey wall, one soft light from the upper left, deep quiet shadows. Slow, weighty, deliberate camera, like a heavy dolly on rails. Absolutely no text, no captions, no people, no hands. Starting exactly on this frame, the camera pushes slowly and steadily forward and slightly down toward the small dark stoneware dish of sesame tofu, pickled lotus root and a shiso-wrapped morsel, ending in a close, low three-quarter view where the dish fills most of the frame and the concrete wall falls softly out of focus. In the final second, the camera almost stops, holding still on the dish.
```

### dive-2.mp4

```text
Single continuous cinematic camera move, no cuts. 1970s Japanese colour film look, visible film grain, slightly faded warm-neutral colours. A dish on a waist-high plinth of raw board-marked concrete in front of a flat matte concrete-grey wall, one soft light from the upper left, deep quiet shadows. Slow, weighty, deliberate camera, like a heavy dolly on rails. Absolutely no text, no captions, no people, no hands. Starting exactly on this frame, the camera pushes slowly and steadily forward and slightly down toward the grey stoneware plate of glistening sashimi slices and grated daikon, ending in a close, low three-quarter view where the fish fills most of the frame, light catching its wet surface. In the final second, the camera almost stops, holding still on the dish.
```

### dive-3.mp4

```text
Single continuous cinematic camera move, no cuts. 1970s Japanese colour film look, visible film grain, slightly faded warm-neutral colours. A dish on a waist-high plinth of raw board-marked concrete in front of a flat matte concrete-grey wall, one soft light from the upper left, deep quiet shadows. Slow, weighty, deliberate camera, like a heavy dolly on rails. Absolutely no text, no captions, no people, no hands. Starting exactly on this frame, the camera pushes slowly and steadily forward and slightly down toward the long black stoneware plate of miso-lacquered black cod, ending in a close, low three-quarter view along the fillet where the caramelised glaze fills the frame. In the final second, the camera almost stops, holding still on the dish.
```

### dive-4.mp4

```text
Single continuous cinematic camera move, no cuts. 1970s Japanese colour film look, visible film grain, slightly faded warm-neutral colours. A dish on a waist-high plinth of raw board-marked concrete in front of a flat matte concrete-grey wall, one soft light from the upper left, deep quiet shadows. Slow, weighty, deliberate camera, like a heavy dolly on rails. Absolutely no text, no captions, no people, no hands. Starting exactly on this frame, the camera pushes slowly and steadily forward and slightly down toward the deep stoneware bowl of daikon simmered in golden dashi, a thin wisp of steam rising and drifting through the light, ending in a close, low three-quarter view into the bowl. In the final second, the camera almost stops, holding still on the dish.
```

### dive-5.mp4

```text
Single continuous cinematic camera move, no cuts. 1970s Japanese colour film look, visible film grain, slightly faded warm-neutral colours. A dish on a waist-high plinth of raw board-marked concrete in front of a flat matte concrete-grey wall, one soft light from the upper left, deep quiet shadows. Slow, weighty, deliberate camera, like a heavy dolly on rails. Absolutely no text, no captions, no people, no hands. Starting exactly on this frame, the camera pushes slowly and steadily forward and slightly down toward the black clay donabe of koji rice beside its bowl of miso soup and dish of pickles, steam rising from the rice, ending in a close, low three-quarter view over the open donabe. In the final second, the camera almost stops, holding still on the dish.
```

## Connectors: close on dish N → wide on dish N+1

First frame = `clips/seam-N-N+1/start.png`. Last frame = `clips/seam-N-N+1/end.png`.

| File | First frame | Last frame |
|---|---|---|
| `conn-1-2.mp4` | `seam-1-2/start.png` | `seam-1-2/end.png` |
| `conn-2-3.mp4` | `seam-2-3/start.png` | `seam-2-3/end.png` |
| `conn-3-4.mp4` | `seam-3-4/start.png` | `seam-3-4/end.png` |
| `conn-4-5.mp4` | `seam-4-5/start.png` | `seam-4-5/end.png` |

### conn-1-2.mp4 (and the same prompt for 2-3, 3-4, 4-5)

```text
Single continuous cinematic camera move, no cuts. 1970s Japanese colour film look, visible film grain, slightly faded warm-neutral colours. A dish on a waist-high plinth of raw board-marked concrete in front of a flat matte concrete-grey wall, one soft light from the upper left, deep quiet shadows. Slow, weighty, deliberate camera, like a heavy dolly on rails. Absolutely no text, no captions, no people, no hands. Starting exactly on the first frame, the camera eases back and rises a little away from the dish, then glides sideways to the right along the concrete wall, passing a plain concrete pillar, and arrives at the next plinth, settling into exactly the composition of the last frame. The move is one smooth arc, never reversing, never cutting.
```

## Quality notes

- **Re-roll** any clip that adds text, people, hands, a second dish where it shouldn't be, or a sudden change of lighting.
- If a dive's last second keeps moving fast, re-roll it. Connectors start more cleanly from a near-still frame.
- The page plays clips silently and scrubs them by scroll, so audio doesn't matter. Turn it off if Veo offers.
