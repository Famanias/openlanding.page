# MORTA — website implementation brief

Build a complete, responsive, polished scroll-driven landing page for **MORTA**, a fictional gothic jewellery house. Use the attached images listed below. This document is the implementation brief; the imagery is supplied separately. Make the result feel like an actual editorial luxury house, not a generic jewellery store or a fantasy game interface.

## Brand and central idea

MORTA creates sculptural sterling-silver rings, pendants and earrings, with small editions and bespoke commissions. Its voice is intimate, precise and ceremonial. It speaks about permanence and craft without invented historical claims or melodramatic lore.

**Central idea:** jewellery is metal shaped around an absence. As the visitor scrolls, separated ornamental contours gather around an empty centre and lock together into the silhouette of a ring. This is the signature mechanic and connects the page's chapters. It should be beautiful, legible, and subordinate to content and commerce.

Mood: gothic, sculptural, stark, intimate, ceremonial. The site is mostly black, punctuated by white typography, rules, ornament and monochrome photographs. The overall impression is high-contrast and graphic, with careful quiet space.

## Assets

Use these attached files by filename. The supplied extension may differ; retain the filename stem and use the actual extension. Place them in an appropriate public assets directory, use responsive image sizing and reserve their dimensions to prevent layout shift.

| File | Purpose |
|---|---|
| `morta-hero.png` | Hero image; preserve the dark area for readable text. |
| `morta-reliquary-ring.png` | Collection: Reliquary signet ring. |
| `morta-thorn-pendant.png` | Collection: Thorn pendant. |
| `morta-vigil-earrings.png` | Collection: Vigil drop earrings. |
| `morta-craft.png` | Craft section. |
| `morta-bespoke.png` | Bespoke commissions. |

Use the provided images rather than substituting stock, inventing remote image URLs or generating new assets. If an attachment is absent, render a clearly labelled, dimensionally stable placeholder and identify the missing filename; do not silently substitute it. The photography and graphic treatment must remain monochrome.

## Identity and visual system

- **Palette:** black `#000000` and white `#FFFFFF` only. Grayscale may appear through the supplied photographs, transparency and mixes of black and white. No coloured accents, gradients, coloured shadows or tinted photography.
- **Logo:** create an original inline SVG mark: a pointed jewel shape above an M-like set of fine lines, held inside a circular ring. Pair it with a widely tracked MORTA wordmark. Keep the small mark recognisable at favicon size; do not copy existing luxury logos.
- **Typography:** Cormorant Garamond for expressive display headings, DM Sans for readable body and controls, DM Mono for object numbers and small utility labels. Use locally available or framework-supported font loading with sensible fallbacks. Keep body copy comfortable to read; large, high-contrast editorial headings should have intentional line breaks and never obscure images.
- **Geometry:** mostly square corners; fine rules, pointed-arch motifs, concentric ring contours and engraved hatching. Use graphics as an architectural background layer, not a noisy overlay. Avoid gothic clichés such as skulls, blood, occult symbols or unreadable blackletter.
- **Recurring details:** pointed seal, object catalogue numbers, fine engraved rules and ring contours. Use generous negative space, a disciplined grid and subtle variation between section layouts. Keep a clear hierarchy and strong text contrast.

## Page and copy

Use one semantic `h1`, logical heading order, landmarks and accessible controls. Copy below is a starting point; refine rhythm without introducing unverified claims, fake testimonials, false scarcity or fabricated provenance. Prices and purchasing flows are optional; do not invent a functional checkout.

1. **The Oath / hero.** An elegant header with the mark, Collection, House, Craft and Commissions anchors and a prominent commission link. Use `morta-hero` as a cinematic image with a dark text-safe region. Headline: “Wear what remains.” Supporting copy: “Sculptural silver for the stories we carry.” Primary CTA: “Discover the collection.” Add a restrained object label and a scroll cue.
2. **The House.** Introduce MORTA: “Objects of devotion, made to endure.” Describe sculptural silver, attentive finishing and pieces intended to gather their own history. Pair an oversized editorial statement with the first separated ring contours and fine graphic linework.
3. **The Collection.** Present the three supplied product images as distinct, large editorial product cards, numbered 01–03: Reliquary / signet ring; Thorn / pendant; Vigil / drop earrings. Show product names and concise descriptive copy. Cards can reveal more detail on interaction, but names and essential information must remain visible on touch and keyboard. If purchase links have no destination, use in-page exploration rather than dead links.
4. **The Craft.** Pair `morta-craft` with copy about shaping, casting and finishing silver. This section hosts the signature assembly: a pinned or otherwise scroll-linked graphic progressively gathers fragments into a complete ring. The finished image frames a statement such as “Formed slowly. Worn for years.” The graphic is an original SVG/CSS drawing, not a replacement for the real product photography.
5. **Bespoke commissions.** Pair `morta-bespoke` with an invitation to create a personal piece. Provide a usable enquiry form with name, email and a short description. Include labels, helpful validation, keyboard access and a clear success state. If no backend is specified, implement a transparent demonstration-only success state and do not claim that an enquiry was sent.
6. **Footer.** Reprise the mark and phrase “Made to outlast the moment.” Include working in-page navigation, a short brand line and contact/enquiry access. Avoid fabricated addresses, social profiles or contact information.

## Motion and interaction

The motion personality is technical/cinematic, expressed through **unfurl** and **lock**. The hero has an intentional load sequence: ornamental lines settle, navigation and mark appear, the headline rises through a mask, then supporting copy and CTA arrive. Reserve space for all elements so the sequence causes no layout shift.

Use scroll to advance the assembly mechanic and provide a discreet progress indicator. Give section handoffs visible continuity through lines, masks or graphic shapes. Vary reveals: masked headline rises, image wipes, drawn rules and staggered content entrances. Keep motion measured; one signature assembly is the main event. Make interactions responsive and interruptible: links and buttons have distinct hover, focus and pressed states; product cards respond on hover and focus without hiding essential information; the form has error and success states. Avoid animations that make reading or navigation difficult.

Use transform, opacity, clip-path and SVG drawing where practical; keep scroll updates smooth and avoid unnecessary layout work. On touch, use natural scrolling and ensure no essential content depends on hover. Respect `prefers-reduced-motion`: show all content immediately, replace scroll-linked assembly with a finished static ring, and disable continuous movement. With JavaScript disabled or unavailable, the content, images and navigation remain visible and usable. Never gate the page behind a preloader.

## Implementation and quality

Adapt to the existing project and its framework, conventions and dependencies. Inspect local project instructions before coding. If the project uses Next.js, consult its installed documentation before using framework APIs. Build reusable, focused components for the identity, navigation, sections, ring mechanic and form rather than a single monolith. Use semantic HTML, accessible names and visible keyboard focus. Give product and workshop images concise meaningful alt text; decorative ornaments should be hidden from assistive technology.

Optimize supplied images for responsive delivery; load the hero eagerly and defer below-the-fold imagery. Maintain strong text contrast and test desktop and narrow mobile widths, keyboard navigation, reduced motion and disabled JavaScript. Verify the form's error and demo-success behaviour and inspect the page by scrolling through the ring assembly. Run the project's relevant checks and report any missing assets or limitations. Do not deploy or commit unless explicitly requested.
