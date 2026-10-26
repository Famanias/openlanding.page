# AMAOTO

## Concept

The umbrella opens like a flower as you scroll, so each chapter reveals one making decision.

## Brand

AMAOTO (雨音, “the sound of rain”) is a fictional wagasa atelier in Kurokawa, Nagano. The palette is sumi `#1A1613`, washi cream `#F4ECDD`, sakura `#F2B8C6`, deep sakura `#D9748F`, vermilion `#C8412B`, gold `#B8923A`, and indigo `#2B3A55`. Type is Shippori Mincho, Zen Kaku Gothic New and DM Mono.

## Mechanic

`createWagasaModel.ts` builds a 40-rib procedural umbrella with a pure `setOpen(0..1)` state for pleats, ribs, stretchers and runner translation, plus pure `setExplode(0..1)` offsets. Repeated rib and stretcher geometry uses deterministic loops and fixed seeds. The model is an approximate, browser-ready prop: the hidden canopy paint and exact manufactured hinge geometry are inferred from the supplied views.

## Motion

Personality: soft / luxurious. Verbs: drift and unfurl. Scroll progress drives open, explode, section handoffs and the indigo thread-line. The signature moment is the first 18% scroll where the folded umbrella unfurls into a taut dome. Reduced motion keeps the scene still and leaves every section visible.

## Files

The model lives in `model/`; the only Three.js client leaf is `scene/WagasaCanvas.tsx`. Sections are split by story chapter, form validation is pure and local, and no network request is made by the commission form.
