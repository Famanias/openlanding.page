# Closed → reveal → closed correction

**Latest addition:** [0-100 transformation slider with smooth reverse motion](../lenus-transformation-slider/README.md).

The user's clarification was that the assembled lens must **conceal its interior**, then visibly transform to reveal it and close again automatically. The earlier assembly exposed its optics even when its rear housing was closed.

The corrected asset has four solid, beveled titanium shutter petals in front of the optics. They unfold on fixed mounting posts while the existing housing opens, hold the interior view, and close after the optical train reseats. The same geometry remains present throughout; no opacity, visibility or scale trick hides the interior. The original floating glass moves clear of the petal sweep.

- **0–3 seconds:** sealed exterior hold.
- **3.5–10 seconds:** front shutter unfolds, housing opens and optics separate.
- **10–15 seconds:** fully revealed interior hold.
- **15–21.5 seconds:** optics/housing reassemble, then the shutter closes.
- **22–24 seconds:** sealed hold and seamless loop return.

Manual inspection and static fallbacks retain their controls. The default reduced-motion/no-JS preview is also closed. Automatic framing stays unchanged; manual inspection uses a larger conservative frame for the opened petals at maximum separation.

## Verified results

- **1,291 unit tests** and **18 production browser tests** pass; build, TypeScript, lint and isolation/palette/media checks pass.
- Actual component-hidden rendering at both 0 and 24 seconds: **zero optical-train difference pixels** and zero core-green pixels. Hiding all seven optical groups makes no visible difference, proving the closed cover conceals them.
- During the reveal, the green core and layered optical train visibly reappear. The production browser regression checks green visibility rises when open and returns to its closed baseline afterward.
- **42 semantic parts, 186,992 model triangles, 109 total PBR draw calls**, including transmission. The posts are baked into the front-shell geometry and the four petals share one instanced submission.
- Closed shutter surfaces have welded boundaries and outward normals; their instance transforms return exactly at 24 seconds. Actual mounting-post vertices remain within 1e-6 of all four hinge pivots throughout travel. Exterior glass stays at least .02 ahead of the moving cover.
- Full automatic framing was checked at eight phases and 1440×900, 900×700 and 390×844. Maximum extra inspection separation is also contained for any orbit: model radius 4.1318 versus minimum frustum half-extent 4.3.
- A complete 24-second native-controller cycle was recorded on the local RTX 2060 / D3D11 renderer. This is local verification, not a device-independent performance guarantee.

## Evidence

[Closed](closed.png) · [Revealed](revealed.png) · [Closed again](closed-again.png) · [Complete recording](cycle.webm)

[Visibility and frame measurements](visibility.json) · [Inspection bounds](inspection.json) · [Loop timing](loop.json) · [Unit tests](tests.log) · [Production browser tests](browser-tests.log)

The earlier interior reconstruction evidence is preserved as history. Its requirement to keep the green core visible in the closed pose is superseded by this explicit user clarification. The current closed-state visibility check requires concealment; opening/deployed views still require visible green optics. No runtime dependency was added.
