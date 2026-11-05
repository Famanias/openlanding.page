# Transformation slider

Added a master **0–100 transformation slider** to the existing Lenus HUD:

- **0:** fully closed and sealed.
- **100:** fully transformed with the interior exposed.
- Intermediate values hold the selected deployment. Moving the slider takes manual control; **Play** resumes the loop from the current position and direction.
- The existing separation and focus controls remain available. Reset returns to the closed pose.

The automatic closing sequence now follows the opening path in reverse. The slider uses that same canonical mechanical path in both directions, with bounded easing, no overshoot, and exact endpoint settling. Large changes such as 100→0 transition through intermediate poses rather than snapping shut. Repeated input updates the latest target instead of queueing animations or resetting the render timestamp.

Manual transitions can settle while autoplay is paused, stop offscreen/behind dialogs, and retain their current progress and target across renderer reconstruction. Rendering stops once the manual target settles. The 24-second automatic loop remains available, and the slider follows its progress when manual control is released with Play.

## Verification

- **1,295 unit tests / 243 files** and **19 production native-browser tests** pass. Build, TypeScript, lint and project checks pass.
- Native controller sampling verifies intermediate poses in both directions, monotonic 100→0 movement, exact 0/100 endpoints, a held automatic clock, suspension and progress during repeated input.
- Production browser coverage checks keyboard Home/End, 0→100→0, an intermediate 50% hold, preference reconstruction and Play resuming the loop.
- Scrubbing previously caused 80 drawing-buffer width/height writes across 20 input changes. The corrected implementation performs **zero** such writes.
- Desktop/laptop HUD remains **720×108**. Phone HUD is **342×285**, with all three sliders present and no horizontal overflow.
- Model geometry/materials and the 186,992-triangle / 109-draw-call budget are unchanged.

[Controller motion samples](motion.json) · [Layout and buffer-write check](layout.json) · [Unit results](tests.log) · [Browser results](browser-tests.log)

[Desktop](desktop.png) · [Phone](phone.png)
