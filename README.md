# OpenLandingPage

> **Landing Pages your Agent can build.**  
> An open-source collection of 17 artisanal, production-grade landing page templates engineered for modern AI coding agents and human designers.

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8)
![Bun](https://img.shields.io/badge/Bun-1.3+-fbf0df)

---

## What is OpenLandingPage?

**OpenLandingPage** is a gallery of production-ready, highly tailored landing page templates built with **Next.js (App Router)**, **React 19**, **Tailwind CSS v4**, and modern web animation libraries.

Rather than generic component kits or repetitive SaaS layouts, each template is designed as a standalone, narrative-driven experience with:

- **Strict isolated route architecture:** Every template lives independently in its own route group (`src/app/(template_name)/`) with zero cross-contamination.
- **Bespoke motion systems:** Fluid transitions using CSS-first animations, Motion, GSAP (ScrollTrigger &amp; Observer), and Lenis smooth scrolling.
- **Advanced graphics &amp; 3D:** Interactive Three.js (WebGPU/TSL) procedural rendering and scroll-scrubbed video engines.
- **AI-Agent Ready:** Each template includes full prompt files (`docs/prompts/` and `public/copy/`) and design specifications so AI coding agents (Claude Code, Antigravity, Cursor, Codex) or developers can rebuild, adapt, or one-shot them from scratch.
- **Built-in accessibility:** Automatic fallbacks and adaptations for `prefers-reduced-motion` across every template.

---

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org) (App Router, Server Components)
- **Runtime &amp; Package Manager:** [Bun](https://bun.sh) (`1.3.11`+)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com)
- **Animation &amp; Motion:** [Motion](https://motion.dev), [GSAP](https://gsap.com) (ScrollTrigger, Observer), [Lenis](https://lenis.darkroom.engineering)
- **3D &amp; Shaders:** [Three.js](https://threejs.org) (`three/webgpu`, TSL)
- **Icons:** [@phosphor-icons/react](https://phosphoricons.com)
- **Testing:** [Vitest](https://vitest.dev) &amp; [Playwright](https://playwright.dev)

---

## Getting Started

### Prerequisites

Ensure you have [**Bun**](https://bun.sh) installed (`v1.3.11` or later).

### Installation

```bash
# Clone the repository
git clone https://github.com/Famanias/openlanding.page.git
cd openlanding.page

# Install dependencies
bun install
```

### Running Locally

```bash
# Start the local development server
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the gallery index and navigate between templates.

### Verification &amp; Testing

```bash
# Run architecture isolation and color palette checks
bun run check

# Run unit tests
bun run test

# Run end-to-end tests
bun run test:e2e

# Run linter
bun run lint

# Build for production
bun run build
```

---

## Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) before submitting pull requests.

---

## License

This project is licensed under the [MIT License](LICENSE).

### Third-Party Notices &amp; GSAP License

This repository includes dependencies and integrations that are subject to their own respective licenses:

- **GSAP (GreenSock Animation Platform):** GSAP is developed by GreenSock, Inc. ([https://gsap.com](https://gsap.com)). The code in this repository uses standard public GSAP modules (`gsap`, `gsap/ScrollTrigger`, `gsap/Observer`), which are subject to the [GreenSock Standard License](https://gsap.com/standard-license/).
  - GSAP is free to use for websites and digital products that do not charge users access fees.
  - If you use these templates to build a commercial product, SaaS application, or digital product that charges multiple end-users, you may require a paid commercial license from GreenSock ([Club GreenSock Business License](https://gsap.com/pricing/)).
  - This repository does **not** bundle or distribute proprietary Club GreenSock plugins (such as `SplitText`, `MorphSVG`, or `ScrollSmoother`).
- **Three.js, Motion, Lenis, &amp; Phosphor Icons:** Licensed under their respective MIT/ISC licenses.
- **Fonts:** Loaded via `next/font/google` and licensed under the SIL Open Font License (OFL) or Apache 2.0.

### Trademark Notice

All product and company names, logos, and brands (including Webflow, Vercel, and Next.js) are trademarks or registered trademarks of their respective holders. Use of them does not imply any affiliation with or endorsement by them.