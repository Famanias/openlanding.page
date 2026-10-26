# Skill diagnostic run: `/create-landing-template`

Paste the prompt below into GPT 6 Astra. It runs the skill on a fixed brief and makes the agent keep a log while it works, so the report isn't a guess made after the fact.

## Prompt

````text
Use the $create-landing-template skill to build one new template. Follow the skill exactly as written. Do not shortcut it, and do not ask me questions. This is a one-shot test run, so where the skill says to ask me, decide yourself and record "your call".

BRIEF
- Brand: NIGHTLINE, a European sleeper-train booking brand.
- Mechanic: the whole page is a train window at night. Rain beads and runs down the glass, condensation fog gets wiped by the cursor and slowly re-fogs, and out-of-focus city lights move past in parallax layers. Scroll equals train speed and moves through stations: departure, midnight, border crossing, dawn.
- Tech: raw WebGL2 only. No three.js and no other 3D library.
- Mood: warm amber on deep blue, quiet and cinematic.
- Motion personality: technical/cinematic, showpiece intensity.

RUN LOG (mandatory)
Before doing anything else, create `.openlanding-page/nightline/RUN-LOG.md`. Append to it as you work, in real time, never retroactively. Use this format:

## Files read
One line per file, appended the moment you open it: `<path> | <phase you were in> | why`.
Include every SKILL.md, quality-bar.md, motion-system.md, repo-wiring.md, questions.md, and media.md you open, and any existing template you read.

## Phase trace
For each phase, 1 through 8, append: `Phase N | started | finished or SKIPPED | reason`.
If you skip or merge a phase, say so plainly. Do not mark a phase done unless its output exists on disk.

## Decisions
Every point where the skill said to ask, gate, or get approval, and what you did instead.

## Things I could not do
Missing tools, missing skills (for example webgpu-threejs-tsl, improve-animations, scroll-world, superpowers:*), missing paths (for example `.claude/skills/...`), commands that failed, and anything you improvised because the skill had no instruction for it.

## Stop reason
Why you stopped, in one sentence.

RULES
- Do not stop after the concept message. Continue until Phase 8, or until you hit a real blocker. If you hit a blocker, log it and stop there.
- Never write TODO, "rest similar", or placeholder sections.
- If the skill has no guidance for something I asked for (raw WebGL2 is the likely one), say so in the log, then make a reasonable choice and continue.
- Do not deploy or commit.

FINAL REPORT
When finished, reply with only:
1. The last phase you completed, and the last file you wrote.
2. The output of `ls -R src/app/(nightline)` and the line count (`wc -l`) of the whole folder.
3. The result of `npm run check`, `npm test`, `npx tsc --noEmit`, and `npx playwright test`. Say "not run" for any you did not run.
4. Whether you opened `motion-system.md` and `quality-bar.md` both before building and before verifying.
5. A self-rating from 1 to 5 on: structure (25–40 files), motion (4+ reveal types, hover/press states), WebGL scene quality, and originality compared with the existing gallery. Give one sentence of evidence each.
6. Where the skill's instructions were unclear, contradictory, or missing, so I can fix them.
````

## How to read the result

| What you see | Cause | Fix |
|---|---|---|
| Stopped after the concept message, or waiting for approval | The skill's approval gates | **1** one-shot mode, **9** stop rule |
| Never opened `motion-system.md` or `quality-bar.md` | Too much reading, or it skipped | **8** short checklist in `SKILL.md` |
| "Could not find" `.claude/skills/...` or a missing skill | Paths and skill dependencies | Fix the paths, make the dependencies optional |
| Under 15 files, or one big `page.tsx` | No code to copy | **3** starter kit, **4** exemplar templates |
| Used three.js despite "raw WebGL2" | No WebGL guidance | **2** `webgl.md` |
| Full structure but generic scene and copy | Weak concept divergence | **7** concept seeds, **4** exemplars |
| Claims checks pass, but they weren't run | No enforcement | **6** `check-template.mjs` |
| Registration errors, wrong counts | Manual wiring | **5** scaffold script |

Fix numbers refer to the revision list below.

## Revision list

1. One-shot mode in `SKILL.md`: skip Phases 2 and 4 and record every decision as "your call".
2. `webgl.md`: raw WebGL2 boilerplate, a ping-pong FBO helper, a scroll-uniform loop, and reduced-motion and fallback rules.
3. Starter kit: real `motion/` primitives (`Reveal`, `SplitText`, `SmoothScroll`, `useScrollProgress`, `math.ts` with tests) to copy from.
4. Exemplar templates: name one or two finished templates to read first per mechanic type.
5. Scaffold script: `scripts/new-template.mjs <slug> <prefix>` creates the folders and all six registration points.
6. `scripts/check-template.mjs <slug>`: fails on too few files, raw `cubic-bezier(` or `\d+ms` in components, fewer than 4 reveal types, hidden states outside `no-preference`, an empty motion-map cell, or a missing e2e spec.
7. `concepts.json`: a script picks a random subject, technique, scroll story, palette, and era that the gallery doesn't have yet.
8. A short non-negotiables checklist in `SKILL.md`, with the long files as reference.
9. A stop rule: no handoff until `check-template.mjs`, `npm run check`, tests, and Playwright pass, and no TODOs or placeholders.

## Caveat

The agent writes its own log, so it can be wrong or flattering. Cross-check "Files read" against the agent's tool-call history, and run `ls` and `wc -l` on `src/app/(nightline)` yourself.
