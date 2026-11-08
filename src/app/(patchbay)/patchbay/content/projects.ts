import type { RoleId } from "./roles";

export type Project = {
  id: string;
  title: string;
  kind: string;
  year: number;
  blurb: string;
  tags: readonly string[];
  /** The headline number shown on the card. */
  proof: string;
  /** 0 hides the project for that role; higher sorts earlier. */
  weights: Record<RoleId, number>;
};

export const PROJECTS: readonly Project[] = [
  {
    id: "tidegrid",
    title: "Tidegrid",
    kind: "Retail analytics dashboard",
    year: 2025,
    blurb: "Virtualised tables and charts for 1,800 stores, keyboard-first and fast on a five-year-old laptop.",
    tags: ["React", "Next.js", "A11y"],
    proof: "6.4 s → 1.7 s to interactive",
    weights: { web: 10, fullstack: 6, ai: 0, design: 4 },
  },
  {
    id: "ledgerline",
    title: "Ledgerline",
    kind: "Marketplace payouts platform",
    year: 2025,
    blurb: "An event-sourced payout ledger with replayable webhooks and a reconciliation UI finance trusts.",
    tags: ["Postgres", "TypeScript", "Queues"],
    proof: "2 days → 9 min reconciliation",
    weights: { web: 3, fullstack: 10, ai: 2, design: 0 },
  },
  {
    id: "marginalia",
    title: "Marginalia",
    kind: "Grounded support assistant",
    year: 2026,
    blurb: "Hybrid retrieval, citation enforcement and a 340-case eval suite that gates every deploy.",
    tags: ["RAG", "Evals", "LLM routing"],
    proof: "63% → 91% grounded accuracy",
    weights: { web: 0, fullstack: 5, ai: 10, design: 2 },
  },
  {
    id: "fieldnote",
    title: "Fieldnote",
    kind: "Field-service mobile app",
    year: 2024,
    blurb: "Onboarding and job flows redesigned for gloves, glare and patchy signal after 23 site interviews.",
    tags: ["Research", "Figma", "Prototyping"],
    proof: "+38% onboarding completion",
    weights: { web: 2, fullstack: 0, ai: 0, design: 10 },
  },
  {
    id: "quillbase",
    title: "Quillbase",
    kind: "Design system and component kit",
    year: 2024,
    blurb: "41 accessible components with tokens, docs and visual regression tests, shared by six product teams.",
    tags: ["Design tokens", "Storybook", "CSS"],
    proof: "41 components, 0 a11y regressions",
    weights: { web: 9, fullstack: 2, ai: 0, design: 8 },
  },
  {
    id: "driftwatch",
    title: "Driftwatch",
    kind: "LLM cost and latency tracing",
    year: 2026,
    blurb: "Per-request traces, budget alerts and a cheap-model router that cut inference spend by more than half.",
    tags: ["Observability", "Python", "Routing"],
    proof: "62% lower cost per query",
    weights: { web: 0, fullstack: 6, ai: 9, design: 0 },
  },
  {
    id: "kerbside",
    title: "Kerbside",
    kind: "Parking permits web app",
    year: 2023,
    blurb: "A city permit flow rebuilt from a 14-field form into a four-step journey that works on any phone.",
    tags: ["Next.js", "Forms", "Payments"],
    proof: "3× faster checkout",
    weights: { web: 7, fullstack: 9, ai: 0, design: 6 },
  },
  {
    id: "paperplane",
    title: "Paperplane",
    kind: "Prototype-to-code agent",
    year: 2026,
    blurb: "An agent that turns annotated Figma frames into reviewed pull requests, with a human in the loop.",
    tags: ["Agents", "Figma API", "TypeScript"],
    proof: "70% of frames merged unedited",
    weights: { web: 5, fullstack: 4, ai: 8, design: 7 },
  },
];

export function getProject(id: string): Project | undefined {
  return PROJECTS.find((project) => project.id === id);
}
