# Prompt: rebuild “TRACE” (spatial-intelligence landing page)

Build a one-page landing site in Next.js App Router + React + TypeScript + Tailwind CSS v4 for TRACE, a spatial-intelligence studio that helps teams read what a city is becoming.

Use ink `#081115`, paper `#E7ECE7`, acid signal `#C9F458` and muted steel `#849694`. Use Space Grotesk for display and DM Mono for labels, coordinates and interface metadata. The visual language is a dark observatory: precise hairlines, large coordinates, paper panels and one signal-green accent. Avoid gradients, glass cards and generic SaaS patterns.

The hero says “Read what the city is becoming.” A fixed Three.js canvas sits behind the page with a wireframe icosahedral signal orb, nested torus rings, three satellites and a sparse particle field. Scroll progress smoothly rotates the orb, shifts it vertically and changes the ring rotation. Pointer position gives the scene a small camera bias. Respect `prefers-reduced-motion`.

Use ordinary document scrolling and anchor navigation through these chapters:

1. Signal — “The invisible becomes legible.” Show a large `4.8m` readout and observed/resolved/latency metrics.
2. Shape — “A map is a choice about attention.” Show three numbered methods: Find the pulse, Model the friction, Make the next move.
3. System — “The future is a field.” Show Observe, Simulate and Align rows.
4. Contact — “Make the next move visible.” Use a mailto CTA and a small footer.

Oversized type, contour labels, coordinate marks and section copy move at different parallax depths via requestAnimationFrame and CSS custom properties. Reveal copy with IntersectionObserver. Keep keyboard focus visible and all anchor links semantic.
