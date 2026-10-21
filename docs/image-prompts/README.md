# Generating the template images in Gemini

There is one prompt file per template:

- [orrery.md](orrery.md): 8 images
- [keytu.md](keytu.md): 15 images
- [koji.md](koji.md): 11 images
- [wowflutter.md](wowflutter.md): 8 images (black-and-white; processed onto an ink-to-stock ramp)

KŌJI's 9 video clips have their own relay file, `koji-clips.md`. It's written later, once the 5 KŌJI flight stills exist.

## How to generate

1. Open [gemini.google.com](https://gemini.google.com) and start a **new chat for each template**, so one brand's style doesn't bleed into another.
2. Paste **one prompt at a time**, exactly as written. Each prompt already includes the template's style preamble, so the set stays consistent.
3. Ask for the aspect ratio given in the table if Gemini doesn't follow it the first time, for example "make it 16:9".
4. Download the **largest size** Gemini offers, as PNG if possible. JPG is fine too.
5. **Rename the file to the exact filename in the table** and save it into the template's folder:
   - `assets/incoming/orrery/`
   - `assets/incoming/keytu/`
   - `assets/incoming/koji/`
   - `assets/incoming/wowflutter/`
6. **Re-roll anything off-style.** Typical reasons are a different colour palette, visible text or logos, extra fingers, a cartoon look, or (for Orrery) anything that looks like a robot, a brain, neon or purple.

## What happens next

When a template's folder is complete, I process the images. That means sizing, WebP/AVIF, and for KEYTU the navy tritone that removes all colour. I then show you a contact sheet to approve before the images go into the page.

Until then, the pages show labelled placeholder blocks, so nothing is blocked while you generate.

## Tips

- Gemini sometimes adds text or watermarks. Ask it to "remove all text and lettering" and regenerate.
- If a series drifts in style (KŌJI's five flight stills in particular), upload the best one back into the chat and say "match this framing, lighting and camera angle exactly", then paste the next prompt.
