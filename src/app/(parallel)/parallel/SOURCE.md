Source: https://github.com/Famanias/parrallel-3d-exploration.git

Imported from commit 981194809e5f7287b17d8fe090466cbe112e61b4.

Section 04 (Side-by-side reality comparison) updated from commit
fb4dbd912cb0f95d5de062cfba400d8d0ed9bba1, including its 2.5D SVG city,
deterministic simulation, state caching, paired inspection, and timeline controls.
The rest of the template retains the existing import and local GPU optimizations.
Local adaptations cap split replay at 24 fps, pause replay and playback while
offscreen or hidden, and finish replay immediately for reduced motion.
