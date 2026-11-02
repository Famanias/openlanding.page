# Halo Desk — Desktop Productivity App Landing Page

## Requirements

Halo Desk is an isolated Next.js App Router template located at `/halodesk` representing a serene, thoughtfully engineered desktop productivity application. The landing page demonstrates focused planning, clear daily priorities, and peaceful execution without high-stimulus gamification or chaotic urgency.

Key capabilities include:
- A miniature, highly interactive desktop app in the hero with real-time task management, week navigation, Pomodoro-style focus timer, and contextual tab switching (Today, Calendar, Notes, Projects).
- An interactive Calm System section highlighting architectural pillars of focus.
- A workflow storyboard illustrating how a calm workday unfolds from morning priority alignment to evening closeout.
- An interactive Feature Lab providing deep-dive explorations into Tasks, Calendar, Focus Mode, and Notes.
- Daily rhythm templates offering pre-curated starting points that instantly populate the hero planner.
- Honest pricing preview with an accessible early-access modal with validation.

## Concept

"Organize your work without losing your calm."
The visual language avoids dark, intense software themes and loud neon alert tags. Instead, it adopts an ethereal, continuous warm-ivory atmosphere with soft pastel washes (lavender, powder blue, peach, mint, and buttercup yellow), crisp typography, and tactile physical paper cues (such as subtle sticky note shadows and gentle tilt animations).

## Palette

- Ivory Canvas: `#F8F5EE` (continuous background foundation)
- Cloud Surface: `#FCFBF7` (app window backdrop, cards)
- Ink Text: `#29313E` (high-contrast primary copy)
- Muted Slate: `#66717F` (secondary copy, captions, structural outlines)
- Powder Blue: `#CFDFEF` (calendar chip, analytical accent)
- Lavender: `#DCD5F6` (tasks chip, active selection, primary soft accent)
- Peach: `#F7D9CB` (focus chip, warm energy tint)
- Mint: `#D0EFE2` (notes chip, completed checks, success state)
- Butter Yellow: `#FFF1AE` (sticky note realism, quick task cue)
- Slate Button: `#6C798F` / `#2A3240` (primary CTA contrast)
- Hairline Border: `rgba(58, 68, 83, 0.13)`

## Type

- **Display & Body:** DM Sans (400, 500, 600, 700) for calm editorial headlines, clean navigation, and legible UI controls.
- **Tabular / Telemetry:** JetBrains Mono (400, 500) for timer displays, timestamps, and metric readouts.

## The Mechanics

1. **Miniature Hero Desktop App**:
   - Live state machine handling task completion, creation of quick tasks with title validation and category tagging, category filtering, and task reordering.
   - Interactive focus timer with countdown loop, progress computation, and audio-free calm visual state.
   - Weekday calendar scrubber with active day selection and scheduled agenda items.
   - Tactile sticky note with micro-rotation and tilt physics.
2. **Feature Lab Playground**:
   - 4 tabbed deep-dives into Tasks, Calendar, Focus, and Notes with interactive simulations for each tool.
3. **Template Presets**:
   - One-click template applicator injecting curated daily schedules (Deep Focus Sprint, Balanced Product Flow, Executive Alignment) into the interactive workspace.
4. **Early Access Validation**:
   - Client-side email validation with immediate feedback and simulated access grant.
