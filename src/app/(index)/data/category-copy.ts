import {
  CATEGORIES,
  TEMPLATES,
  getTemplateCategories,
  type TemplateCategory,
  type TemplateItem,
} from "./templates";

export interface CategoryCopy {
  h1: string;
  blurb: string;
  intro: string;
  metaDescription: string;
}

export const CATEGORY_COPY: Record<TemplateCategory, CategoryCopy> = {
  "3d": {
    h1: "3D landing page templates",
    blurb: "Interactive WebGL scenes, procedural sculptures, and depth-driven product showcases.",
    intro:
      "3D landing page templates pair real-time spatial geometry with responsive editorial layouts and scroll-linked camera motion. They suit hardware launches, developer tools, architectural practices, and studios that want tactile product depth right in the hero. Most templates in this set combine Next.js 16, React 19, Three.js, and Lenis or GSAP with MIT-licensed source and AI rebuild prompts.",
    metaDescription:
      "Free MIT-licensed 3D landing page templates built with Next.js, React, and Three.js. Includes full source code, live demos, and AI rebuild prompts.",
  },
  editorial: {
    h1: "Editorial landing page templates",
    blurb: "Type-led layouts with disciplined grids, long-form rhythm, and crisp visual hierarchy.",
    intro:
      "Editorial landing page templates prioritize typographic pacing, structured columns, and restrained motion to frame stories and brands clearly. They suit hospitality retreats, cultural journals, independent food makers, and design-focused products where copy and photography carry the page. Built on Next.js 16, Tailwind CSS v4, and Lenis or Motion, every template includes downloadable source and an AI prompt.",
    metaDescription:
      "Free MIT-licensed editorial landing page templates with expressive typography, clean grids, full source code, and AI rebuild prompts.",
  },
  commerce: {
    h1: "Commerce landing page templates",
    blurb: "Product storytelling, colorway switchers, and tactile storefronts built to convert.",
    intro:
      "Commerce landing page templates showcase physical goods, ceramics, footwear, and specialty retail with clear product framing and merchandising sections. They suit direct-to-consumer launches, boutique makers, and hardware or apparel drops needing strong visual proof above the fold. Stacks span Next.js 16, React 19, TypeScript, and Three.js or standalone HTML/CSS.",
    metaDescription:
      "Free MIT-licensed commerce and product landing page templates with full source code, live previews, and AI rebuild prompts.",
  },
  deck: {
    h1: "Deck landing page templates",
    blurb: "Slide-paced narratives and pitch-style landing pages for launches and storytelling.",
    intro:
      "Deck landing page templates adapt presentation pacing—focused chapters, crisp visual slides, and structured takeaways—for the browser. They suit founders, AI presentation tools, Shopify commerce teams, and cultural narratives that read best section by section. Built with lightweight HTML/CSS/JavaScript or Next.js 16 and Tailwind v4, each includes full source and an AI prompt.",
    metaDescription:
      "Free MIT-licensed deck and pitch-style landing page templates with chaptered storytelling, source code, and AI rebuild prompts.",
  },
  ai: {
    h1: "AI landing page templates",
    blurb: "Focused product pages for copilots, infrastructure, simulation, and creative AI tools.",
    intro:
      "AI landing page templates translate complex model workflows, prompt interfaces, and infrastructure capabilities into clear visual demos and concise copy. They suit conversational tools, enterprise AI platforms, simulation startups, and developer-facing copilots. Typical stacks combine Next.js 16, React 19, Motion, and Tailwind v4 or zero-dependency HTML/CSS/JS.",
    metaDescription:
      "Free MIT-licensed AI landing page templates for copilots, developer tools, and AI startups. Full source code and AI rebuild prompts included.",
  },
  saas: {
    h1: "SaaS landing page templates",
    blurb: "Conversion-ready layouts for developer platforms, fintech, analytics, and B2B software.",
    intro:
      "SaaS landing page templates balance sharp value propositions, interactive product previews, pricing or workflow sections, and credible trust signals. They suit developer tools, fintech products, workplace analytics, and B2B software teams shipping quickly. Most run on Next.js 16, React 19, TypeScript, Tailwind v4, and CSS or Three.js motion.",
    metaDescription:
      "Free MIT-licensed SaaS landing page templates for software, fintech, and developer tools. Download full source code or copy the AI prompt.",
  },
  app: {
    h1: "App landing page templates",
    blurb: "Showcase pages for mobile, desktop, audio, and consumer software applications.",
    intro:
      "App landing page templates highlight interface flows, tactile hardware-style controls, and clear feature walkthroughs for consumer and creative apps. They suit botanical care apps, audio archives, productivity utilities, and fintech mobile products. Implementations range from Next.js 16 with React 19 and Three.js to self-contained HTML, CSS, and JavaScript.",
    metaDescription:
      "Free MIT-licensed app landing page templates for web, mobile, and desktop products. Includes live demos, source code, and AI rebuild prompts.",
  },
  marketing: {
    h1: "Marketing landing page templates",
    blurb: "High-clarity campaign and service pages engineered for brand trust and lead capture.",
    intro:
      "Marketing landing page templates pair direct positioning headlines with proof-driven sections, service breakdowns, and accessible contact or waitlist forms. They suit agencies, B2B services, consumer campaigns, and trades or infrastructure brands launching fast. Built with Next.js 16, Tailwind v4, Lenis, or standalone HTML/CSS, every template is MIT licensed.",
    metaDescription:
      "Free MIT-licensed marketing landing page templates for campaigns, agencies, and product launches with full source and AI rebuild prompts.",
  },
  portfolio: {
    h1: "Portfolio landing page templates",
    blurb: "Case-study grids and index-driven showcases for engineers, directors, and creators.",
    intro:
      "Portfolio landing page templates foreground selected work, technical craft, and visual identity without cluttering the browsing flow. They suit software engineers, photographers, art directors, and independent creative technologists. Typical stacks use Next.js 16, React 19, TypeScript, Lenis, and Tailwind v4 or custom CSS motion.",
    metaDescription:
      "Free MIT-licensed portfolio landing page templates for developers, designers, and studios. Includes source code and AI rebuild prompts.",
  },
  gradient: {
    h1: "Gradient landing page templates",
    blurb: "Atmospheric color fields, ambient mesh lighting, and luminous dark or warm palettes.",
    intro:
      "Gradient landing page templates use calibrated color transitions, soft radial light fields, and subtle canvas shaders to create mood without sacrificing legibility. They suit creative tech brands, AI platforms, music collectives, and contemporary food or lifestyle launches. Most combine Next.js 16, React 19, Tailwind v4, Motion, and Canvas 2D or Three.js.",
    metaDescription:
      "Free MIT-licensed gradient landing page templates with atmospheric lighting, clean typography, full source code, and AI rebuild prompts.",
  },
  glass: {
    h1: "Glass landing page templates",
    blurb: "Translucent panels, optical refraction, and layered frosted surfaces over WebGL depth.",
    intro:
      "Glass landing page templates layer frosted translucent cards, crisp hairline borders, and refractive shader highlights over moody canvases. They suit AI productivity tools, wearables, 3D design utilities, and high-contrast software showcases. Built with Next.js 16, React 19, Tailwind v4, Three.js WebGL, and GSAP or Lenis.",
    metaDescription:
      "Free MIT-licensed glassmorphism landing page templates with translucent UI, Three.js depth, source code, and AI rebuild prompts.",
  },
  minimalistic: {
    h1: "Minimalistic landing page templates",
    blurb: "Quiet whitespace, disciplined grids, and fast-loading pages free of visual noise.",
    intro:
      "Minimalistic landing page templates strip away decorative clutter in favor of generous spacing, crisp typographic hierarchy, and purposeful interactions. They suit architecture practices, wellness brands, recruiting platforms, and product teams that value calm clarity. Stacks span lightweight HTML/CSS/JS and Next.js 16 with Tailwind v4.",
    metaDescription:
      "Free MIT-licensed minimalistic landing page templates with clean typography, fast markup, full source code, and AI rebuild prompts.",
  },
  brutalist: {
    h1: "Brutalist landing page templates",
    blurb: "Stark grids, raw monospace accents, high-contrast rules, and unapologetic typography.",
    intro:
      "Brutalist landing page templates embrace exposed grid lines, bold typographic scale jumps, and utilitarian industrial color palettes. They suit developer tools, experimental music instruments, design labs, and independent cultural platforms. Built with Next.js 16, React 19, Tailwind v4, TypeScript, and Motion or Three.js.",
    metaDescription:
      "Free MIT-licensed brutalist landing page templates with raw grids, bold type, full source code, and AI rebuild prompts.",
  },
  studio: {
    h1: "Studio landing page templates",
    blurb: "Agency and creative-practice sites highlighting craft, process, and flagship work.",
    intro:
      "Studio landing page templates present creative capabilities, interactive showreels, and curated client work with cohesive art direction from header to footer. They suit digital agencies, design studios, immersive experience teams, and boutique consultancies. Typical stacks include Next.js 16, React 19, Motion, Tailwind v4, and Three.js or GSAP.",
    metaDescription:
      "Free MIT-licensed studio and agency landing page templates with project showcases, full source code, and AI rebuild prompts.",
  },
  food: {
    h1: "Food & drink landing page templates",
    blurb: "Tactile, warm-toned pages for grocers, roasters, farms, and hospitality spots.",
    intro:
      "Food & drink landing page templates combine appetizing editorial photography, warm organic palettes, and clear menus or seasonal product lists. They suit specialty grocers, small-batch makers, restaurants, and agricultural collectives. Built with Next.js 16, React 19, Tailwind v4, Motion, and custom SVG or CSS motion.",
    metaDescription:
      "Free MIT-licensed food and drink landing page templates for hospitality, grocers, and makers. Includes source code and AI prompts.",
  },
  threejs: {
    h1: "Three.js landing page templates",
    blurb: "Production-ready React and Three.js canvases with WebGL scenes and clean lifecycle guards.",
    intro:
      "Three.js landing page templates integrate real-time WebGL scenes—procedural meshes, particle fields, and interactive camera rigs—directly into responsive landing pages. They suit 3D developer tools, creative studios, audio archives, and flagship product launches. Built on Next.js 16, React 19, Three.js, TypeScript, and Lenis or Motion.",
    metaDescription:
      "Free MIT-licensed Three.js landing page templates with WebGL scenes, Next.js 16 source code, live demos, and AI rebuild prompts.",
  },
  gsap: {
    h1: "GSAP landing page templates",
    blurb: "Choreographed ScrollTrigger timelines, pinned sequences, and kinetic entrances.",
    intro:
      "GSAP landing page templates use GreenSock timelines and ScrollTrigger choreography to pace headline reveals, pinned sections, and interactive transitions smoothly. They suit creative agencies, experiential product pages, editorial features, and interactive showcases. Most pair Next.js 16, React 19, Tailwind v4, and GSAP with Lenis smooth scrolling.",
    metaDescription:
      "Free MIT-licensed GSAP landing page templates featuring ScrollTrigger choreography, full source code, and AI rebuild prompts.",
  },
  motion: {
    h1: "Motion & Framer Motion landing page templates",
    blurb: "Physics-based layout transitions, tactile micro-interactions, and accessible spring motion.",
    intro:
      "Motion & Framer Motion landing page templates use declarative spring physics and layout animations for responsive cards, modals, and scroll-linked reveals with reduced-motion fallbacks. They suit SaaS products, hardware launches, developer portfolios, and community platforms. Built with Next.js 16, React 19, Motion, TypeScript, and Tailwind v4.",
    metaDescription:
      "Free MIT-licensed Motion and Framer Motion landing page templates with spring animations, source code, and AI rebuild prompts.",
  },
  shaders: {
    h1: "Shader landing page templates",
    blurb: "Custom GLSL fragment and vertex shaders for fluid surfaces, noise fields, and light.",
    intro:
      "Shader landing page templates run custom GLSL programs in WebGL to render iridescent surfaces, fluid distortions, and reactive backgrounds at high frame rates. They suit creative technologists, AI simulation tools, 3D design platforms, and experimental product launches. Built with Next.js 16, React 19, Three.js, and Tailwind v4.",
    metaDescription:
      "Free MIT-licensed WebGL shader landing page templates with custom GLSL effects, full source code, and AI rebuild prompts.",
  },
  "interactive-backgrounds": {
    h1: "Interactive background landing page templates",
    blurb: "Pointer-reactive canvases, dynamic wireframes, and living backdrop systems.",
    intro:
      "Interactive background landing page templates turn the page canvas itself into a responsive surface that reacts to pointer velocity, scroll position, and user focus without obscuring foreground copy. They suit developer tools, AI workspaces, and digital experience studios. Powered by Next.js 16, React 19, Three.js, GSAP, or Motion.",
    metaDescription:
      "Free MIT-licensed landing page templates with interactive WebGL and canvas backgrounds. Includes source code and AI rebuild prompts.",
  },
  "hero-background": {
    h1: "Hero background landing page templates",
    blurb: "Full-bleed 2.5D and 3D WebGL hero environments, shaders, and interactive atmospheric canvases.",
    intro:
      "Hero background landing page templates deliver self-contained, full-bleed scenic environments designed to sit behind headlines and calls to action with crisp text-safe zones and smooth pointer parallax. They span procedural Three.js worlds, GLSL shaders, layered paper-cut scenes, and generative 2D canvases built with Next.js 16, React 19, and Tailwind v4.",
    metaDescription:
      "Free MIT-licensed hero background landing page templates with interactive 2.5D/3D WebGL scenes, shaders, full source code, and AI rebuild prompts.",
  },
};

export interface CategoryHubSummary {
  id: TemplateCategory;
  label: string;
  copy: CategoryCopy;
  templates: readonly TemplateItem[];
  count: number;
  latestCreatedAt: string | undefined;
}

export function getCategoryHubSummaries(
  templates: readonly TemplateItem[] = TEMPLATES,
): CategoryHubSummary[] {
  const summaries: CategoryHubSummary[] = [];
  for (const category of CATEGORIES) {
    if (category.id === "all") continue;
    const id = category.id as TemplateCategory;
    const matching = templates.filter((t) => getTemplateCategories(t).includes(id));
    if (matching.length === 0) continue;
    const latestCreatedAt = matching.map((t) => t.createdAt).sort().at(-1);
    summaries.push({
      id,
      label: category.label,
      copy: CATEGORY_COPY[id],
      templates: matching,
      count: matching.length,
      latestCreatedAt,
    });
  }
  return summaries;
}

export function getCategoryHubById(
  id: string,
  templates: readonly TemplateItem[] = TEMPLATES,
): CategoryHubSummary | undefined {
  if (id === "all") return undefined;
  return getCategoryHubSummaries(templates).find((summary) => summary.id === id);
}
