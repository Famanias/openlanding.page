# LENUS footer artwork

Generated a new decorative optical macro with the built-in image_gen tool, following the user's request for artwork related to LENUS's existing visual design. It uses dark titanium, curved iridescent glass and restrained violet, acid-lime and emerald reflections, with no lettering or baked-in interface.

- [Final image](../../../../public/templates/lenus/footer-optical-v1.webp): 1672 x 941, 83,706 bytes, WebP.
- [Exact generation prompt and provenance](../../references/lenus-footer-optical-v1-prompt.md).
- Production captures: [desktop](footer-art-1440.webp), [phone](footer-art-390.webp).
- [Native browser observations](footer-art-report.json).

The artwork is a CSS decorative background in the native footer only. A directional dark layer and vertical mask keep the heading, contact button and navigation readable. Mobile uses a quieter treatment and enough top spacing for the fixed header. Story layers now have a bounded paint area and stacking context, so the lens, HUD and chapter index cannot bleed into the footer. The existing intersection observer correctly pauses the retained renderer when the footer occupies the viewport; reversing back into the story retains the same scene.

Production build and its TypeScript check passed. Isolation, palette and media checks passed. Four existing native Chromium tests passed: chapter/footer stepping, resize and reduced motion, phone touch/controls, and initial reduced-motion/no-JavaScript content. At 1440px and 390px, the footer had no horizontal overflow or console/page errors, the scene paused, and the project-brief dialog opened successfully. Physical-device and non-Chromium coverage were not repeated for this decorative change.
