# Arc & Signal — Google AI Studio one-shot implementation pack

## Contents

- `ARC_AND_SIGNAL_FULL_IMPLEMENTATION_MASTER_PROMPT.md` — complete detailed implementation instructions.
- `references/arc-signal-01-hero.jpg` — approved hero reference.
- `references/arc-signal-02-capabilities.jpg` — approved capabilities reference.
- `references/arc-signal-03-platform.jpg` — approved product walkthrough reference.
- `references/arc-signal-04-cta-footer.jpg` — approved CTA/footer reference.

## How to use

1. Extract this ZIP into your Google AI Studio project, keeping the `references/` directory intact.
2. Make sure your coding agent can see all four images as **image references** (some AI Studio sessions require attaching them to the conversation even if they exist in the project filesystem).
3. Paste the **entire** `ARC_AND_SIGNAL_FULL_IMPLEMENTATION_MASTER_PROMPT.md` into the coding agent.
4. Say: "Implement this entire Arc & Signal website now. The images are approved reference designs, not backgrounds. Recreate the hero core as procedural Three.js 2.5D and make the purple route mathematically continuous across all four sections."
5. Ask the agent to run the project and verify the desktop/mobile scroll and the demo controls before declaring completion.

## Important

The four provided references contain disconnected purple trails. The master prompt *intentionally* overrides them: build one continuous live SVG signal with a projected handoff to the procedural Three.js hero core. Do **not** stitch the JPGs together as full-width page backgrounds.

The brand is a **fictional demonstration**. Real API integrations, actual demo bookings, external company links, and customer claims are not configured. Working local interactive demo behavior is required, and any unconnected external action should be clearly identified as such.
