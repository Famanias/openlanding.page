# HOLLOWAY #092 — floor-plan asset kit

These files are **code-authored assets** for the modular furniture Room Arranger. This is a **demonstration layout**, not a measured architectural floor plan.

## Files

- `public/templates/holloway/holloway/12-room-floor-plan.svg`: standalone editable, scalable floor-plan drafting illustration, with grid, reserved zones, sample furniture footprint shapes and captions. This is a static graphic and DOES NOT by itself implement drag/drop or collisions.
- `public/templates/holloway/holloway/12-room-floor-plan.data.json`: canonical sample collision geometry, logical 12×8 grid, blocked cells, and initial furniture positions.
- `src/components/holloway/HollowayRoomArranger.tsx`: optional working React component with SVG-rendered furniture, keyboard movement, rotation, snap-to-cell, collision detection, bounds validation, reset, touch-friendly directional buttons, and configuration copying.

## Setup

Copy the two files from `public/templates/holloway/holloway/` into your standalone AI Studio project's equivalent folder. Optionally copy the React component into `src/components/holloway/`.

All asset URLs begin with `/templates/holloway/holloway/` — never `/public/templates/holloway/`.

The React file has `'use client';` on its first line. Keep that directive on the first line of `src/App.tsx` and all component files in `src/components/`.

Usage:

```tsx
'use client';
import HollowayRoomArranger from './components/holloway/HollowayRoomArranger';

export default function App() {
  return <HollowayRoomArranger />;
}
```

## Customization

Change grid dimensions, blocked cells and module footprints in the JSON. Keep dimensions in **logical cells**; no physical room scale is implied. Match your canonical room image and product proportions separately. The static SVG is a presentation example: regenerate its shapes if you change JSON topology. For the actual interactive arranger, treat JSON as the collision source of truth, not SVG drawing geometry.

Module dimensions are grid-aligned axis-aligned rectangles. Rotation exchanges width and height at 90°/270°. A location is legal when the entire footprint is inside the grid, avoids all blocked cells, and does not intersect other modules. Currently movement is by keyboard and on-screen directional buttons; pointer dragging can be added with pointer capture + snapped cell offsets without changing collision logic.

This kit intentionally does not claim actual interior measurements, product dimensions, availability, or pricing.
