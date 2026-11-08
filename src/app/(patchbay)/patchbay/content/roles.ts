export const ROLE_IDS = ["web", "fullstack", "ai", "design"] as const;
export type RoleId = (typeof ROLE_IDS)[number];

export type Metric = { value: number; suffix: string; label: string };
export type ProcessStep = { title: string; body: string };

export type Role = {
  id: RoleId;
  /** Label on the jack. */
  label: string;
  /** Three-letter code stamped under the jack. */
  code: string;
  eyebrow: string;
  headline: readonly [string, string];
  sub: string;
  cta: string;
  metrics: readonly Metric[];
  stack: { inputs: readonly string[]; core: readonly string[]; outputs: readonly string[] };
  process: readonly ProcessStep[];
  caseStudy: {
    projectId: string;
    problem: string;
    approach: readonly string[];
    result: readonly Metric[];
  };
};

/**
 * Owners edit this map to retarget the template: delete a role to remove its
 * jack, or add a role id to ROLE_IDS and give it an entry here.
 */
export const ROLES: Record<RoleId, Role> = {
  web: {
    id: "web",
    label: "Web",
    code: "WEB",
    eyebrow: "Front-end engineer",
    headline: ["Interfaces that feel", "finished at 60 fps."],
    sub: "I build fast, accessible front-ends: design systems, marketing sites and app shells that score 98 on Lighthouse and still look expensive.",
    cta: "See the front-end work",
    metrics: [
      { value: 98, suffix: "", label: "Median Lighthouse score" },
      { value: 0, suffix: "", label: "Layout shift, shipped" },
      { value: 41, suffix: "", label: "Components in my kit" },
    ],
    stack: {
      inputs: ["Figma files", "Brand tokens", "Content models"],
      core: ["TypeScript", "React / Next.js", "CSS & Tailwind", "Playwright"],
      outputs: ["Design system", "Core Web Vitals report", "Deployed site"],
    },
    process: [
      { title: "Audit", body: "Measure the current page: vitals, a11y tree, bundle map. Numbers first, opinions second." },
      { title: "Tokenise", body: "Colour, type, spacing and motion become tokens, so every later decision is a lookup." },
      { title: "Build", body: "Server-first components, client leaves only where the browser must act." },
      { title: "Prove", body: "Keyboard pass, reduced-motion pass, throttled-CPU trace, then ship." },
    ],
    caseStudy: {
      projectId: "tidegrid",
      problem: "A retail dashboard took 6.4 s to become interactive and failed keyboard use on every table.",
      approach: ["Rebuilt tables as server-rendered, virtualised grids.", "Split the chart bundle behind an intersection trigger.", "Added a roving-tabindex grid pattern with tests."],
      result: [
        { value: 74, suffix: "%", label: "Faster interactive" },
        { value: 100, suffix: "", label: "Accessibility score" },
      ],
    },
  },
  fullstack: {
    id: "fullstack",
    label: "Full-stack",
    code: "FUL",
    eyebrow: "Full-stack engineer",
    headline: ["One engineer from", "schema to pixel."],
    sub: "I own features end to end: the data model, the API, the interface and the on-call page at 3 a.m. Small team, short loops, boring infrastructure.",
    cta: "See the shipped systems",
    metrics: [
      { value: 12, suffix: "", label: "Products taken to production" },
      { value: 99.95, suffix: "%", label: "Uptime on my longest-run service" },
      { value: 3, suffix: "×", label: "Faster checkout after rewrite" },
    ],
    stack: {
      inputs: ["Product briefs", "Legacy databases", "Third-party APIs"],
      core: ["TypeScript", "Postgres", "Next.js & tRPC", "Docker"],
      outputs: ["Typed API", "Migrations that roll back", "Dashboards & alerts"],
    },
    process: [
      { title: "Model", body: "Start with the schema and the invariants. If the data is right the code is short." },
      { title: "Slice", body: "Ship a thin vertical slice, database to button, in the first week." },
      { title: "Harden", body: "Idempotent writes, rate limits, structured logs and a rollback for every migration." },
      { title: "Operate", body: "Dashboards before launch, a runbook after it, and a retro with numbers." },
    ],
    caseStudy: {
      projectId: "ledgerline",
      problem: "A marketplace reconciled payouts by hand in spreadsheets, a two-day job with a 4% error rate.",
      approach: ["Event-sourced the payout ledger in Postgres.", "Built idempotent webhook consumers with a replay tool.", "Shipped a reconciliation UI finance could trust."],
      result: [
        { value: 2, suffix: " days → 9 min", label: "Reconciliation time" },
        { value: 0, suffix: "", label: "Errors in the first quarter" },
      ],
    },
  },
  ai: {
    id: "ai",
    label: "AI",
    code: "AI",
    eyebrow: "AI engineer",
    headline: ["Models in production,", "with receipts."],
    sub: "I turn prototypes into AI features that are measured, cheap to run and safe to ship: retrieval, agents and evals that catch regressions before users do.",
    cta: "See the evals and agents",
    metrics: [
      { value: 91, suffix: "%", label: "Answer accuracy on my eval set" },
      { value: 62, suffix: "%", label: "Lower inference cost per query" },
      { value: 340, suffix: "", label: "Eval cases in CI" },
    ],
    stack: {
      inputs: ["Raw documents", "User queries", "Human labels"],
      core: ["Python & TypeScript", "Vector search", "LLM routing", "Eval harness"],
      outputs: ["Grounded answers", "Cost & latency traces", "Regression reports"],
    },
    process: [
      { title: "Frame", body: "Write the failure modes down and turn each into an eval case before touching a prompt." },
      { title: "Retrieve", body: "Chunking, hybrid search and reranking, measured against labelled questions." },
      { title: "Route", body: "Small model first, big model on low confidence. Cost is a feature." },
      { title: "Guard", body: "Evals run in CI, traces run in prod, and a human review queue catches the rest." },
    ],
    caseStudy: {
      projectId: "marginalia",
      problem: "A support team's assistant hallucinated policy answers, and nobody could say how often.",
      approach: ["Built a 340-case eval set from real tickets.", "Added hybrid retrieval with citation enforcement.", "Routed easy queries to a small model."],
      result: [
        { value: 91, suffix: "%", label: "Grounded accuracy (from 63%)" },
        { value: 62, suffix: "%", label: "Cost reduction" },
      ],
    },
  },
  design: {
    id: "design",
    label: "UX/UI",
    code: "UX",
    eyebrow: "Product designer",
    headline: ["Clear flows,", "then a sharp finish."],
    sub: "I design product experiences from research to polished handoff: user flows, interface systems and prototypes that engineers can build without a meeting.",
    cta: "See the design work",
    metrics: [
      { value: 23, suffix: "", label: "User interviews per project, median" },
      { value: 38, suffix: "%", label: "Higher onboarding completion" },
      { value: 6, suffix: "", label: "Design systems shipped" },
    ],
    stack: {
      inputs: ["User interviews", "Analytics funnels", "Stakeholder goals"],
      core: ["Figma & variables", "Prototyping", "Accessibility audits", "Front-end code"],
      outputs: ["Flows & wireframes", "Component library", "Specs devs can build"],
    },
    process: [
      { title: "Listen", body: "Interviews and funnel data until the real problem is a single sentence." },
      { title: "Map", body: "Flows before screens. Every state, empty, error and loading included." },
      { title: "Prototype", body: "Test a clickable prototype with five users, then fix what they stumbled on." },
      { title: "Hand off", body: "Tokens, components and written specs, plus a review of the built result." },
    ],
    caseStudy: {
      projectId: "fieldnote",
      problem: "Only 41% of new users finished onboarding in a field-service app used on cracked phone screens.",
      approach: ["Interviewed 23 technicians on site.", "Cut onboarding from 9 steps to 4.", "Designed for gloves: bigger targets, fewer gestures."],
      result: [
        { value: 38, suffix: "%", label: "Completion lift" },
        { value: 9, suffix: " → 4", label: "Steps in onboarding" },
      ],
    },
  },
};

export const ROLE_LIST: readonly Role[] = ROLE_IDS.map((id) => ROLES[id]);
