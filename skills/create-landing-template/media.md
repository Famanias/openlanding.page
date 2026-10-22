# Images and video

## 1. Detect keys (Phase 1)

```bash
node .claude/skills/create-landing-template/media/detect-keys.mjs
```

It prints provider and variable **names** only. Never print, echo, log or write a key's value anywhere: not to the chat, files, commits or screenshots.

## 2. Ask who generates (Phase 2, question 7)

Word the question from the detection result:

- **Keys found:** "I found keys for **<providers>**. Should I generate the images (and video clips) myself with <provider>, or will you generate them from my prompts on whatever platform you prefer?"
- **No keys:** say exactly "**No API keys for image/video generation were detected.**" Then offer these choices:
  1. **You generate:** I'll write the prompts, and you generate the images (and clips) on any platform you like.
  2. **Double-check a key:** paste the *variable name* of your API key (not the key itself) so I can check it.
  3. **No photos:** the page uses SVG, CSS and 3D only.

  If the user gives a variable name, run `node .claude/skills/create-landing-template/media/detect-keys.mjs <NAME>`.
  - If it's set, ask which platform the key belongs to, then ask question 7 again as in the keys-found case.
  - If it isn't set, say so and offer choices 1 and 3, or adding the key to `.env.local`.

  If the user pastes what looks like a key value instead of a name, don't repeat it back or save it anywhere. Ask them to put it in `.env.local` and send only the variable name.

Either way, the prompts get written: they're the art direction and part of the template's docs.

## 3. Write the prompts (Phase 5)

Write them to `docs/image-video-prompts/<slug>.md`, platform-neutral:

- **A style preamble** pasted into every prompt: era, film or lens look, light, palette words, and "no text, no logos, no people's faces" where it applies.
- **A table of images:** exact filename, aspect ratio, and where each image is used on the page.
- **One prompt per image**, preamble included, so each prompt works when pasted alone.
- **For video:** one prompt per clip, plus the camera move, the duration, and the first-frame and last-frame rules if clips must join seamlessly.
- **Save location:** `assets/incoming/<slug>/` for images and `assets/incoming/<slug>/clips/` for video.

## 4a. The user generates

Hand over the prompt file and the exact filenames and folders, then continue the build. The page shows labelled placeholders until the files arrive. When the user says they're in, process them (step 5).

## 4b. The agent generates

1. **Confirm the spend first.** Before the first call, state the number of images and clips, the provider and model, and the estimated cost. Generation costs the user money. Wait for a yes.
2. **Call the API from a short script** that reads the key from the environment, using `process.loadEnvFile(".env.local")` in Node, or `dotenv` in Python. Put the script in `.openlanding-page/<slug>/media/`, never in the template or `scripts/`. Use the provider's current API docs; don't guess model names or endpoints.
3. **Save each result** under its exact filename in `assets/incoming/<slug>/`.
4. **Generate one image first and show it.** Get approval of the style before generating the rest. Re-roll anything off-style: wrong palette, stray text or logos, extra fingers, a cartoon look.
5. **For video**, generate stills first, then animate from them. If clips must join, generate each connecting clip with first frame = the previous clip's real last frame and last frame = the next clip's real first frame. Extract those frames with ffmpeg into `.openlanding-page/<slug>/media/`; don't reuse the original stills.

## 5. Process (either path)

- **Images:** add the slug to the allowed list in `scripts/process-images.ts`, then run `npm run images -- <slug>`. That writes 800w and 1600w AVIF and WebP to `public/templates/<slug>/` and the `assets.generated.ts` manifest. Then build a contact sheet and show the user before relying on the images.
- **Video:** encode a desktop and a phone version of each clip into `public/templates/<slug>/clips/`:

  ```bash
  ffmpeg -i in.mp4 -c:v libx264 -preset slow -crf 20 -pix_fmt yuv420p -g 8 -keyint_min 8 -sc_threshold 0 -an -movflags +faststart out.mp4
  ffmpeg -i in.mp4 -vf scale=-2:720 -c:v libx264 -preset slow -crf 23 -pix_fmt yuv420p -g 4 -keyint_min 4 -sc_threshold 0 -an -movflags +faststart out-m.mp4
  ```

  The short GOP (keyframe interval) keeps scroll-scrubbing smooth. Phones load the `-m` file.
