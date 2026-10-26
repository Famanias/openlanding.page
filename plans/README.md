# Assemblage animation plans

| Plan | Title | Severity | Status |
| --- | --- | --- | --- |
| [001](001-button-feedback-timing.md) | Tighten button feedback timing | HIGH | DONE |
| [002](002-gate-pointer-hover-motion.md) | Gate pointer hover motion | MEDIUM | DONE |
| [003](003-stagger-tagline-words.md) | Stagger tagline word activation | MEDIUM | DONE |
| [004](004-form-success-transition.md) | Give form success a tactile handoff | MEDIUM | DONE |
| [005](005-tactile-surface-interactions.md) | Add tactile surface interactions | MEDIUM | DONE |
| [006](006-scroll-linked-motion-and-progress.md) | Add scroll linked collage movement and progress | MEDIUM | DONE |
| [007](007-stateful-tabs-and-faq-motion.md) | Animate tab, FAQ and error states | LOW | DONE |

Recommended execution order: 001, 002, 005, 003, 006, 004, then 007. Plans 001 and 002 are independent CSS changes. Plan 005 depends on the pointer gating in 002. Plan 003 depends on the existing `data-as-word` observer remaining intact. Plan 006 should land after 005 so direct scroll transforms do not fight the surface hover transforms. Plan 004 is independent. Plan 007 should land after 004 so form state selectors remain clearly separated.
