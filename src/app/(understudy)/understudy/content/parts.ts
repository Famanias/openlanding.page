/** A part is a role you rehearse: a real job, played at one of the studio's simulated companies. */
export type Field = "product" | "engineering" | "data" | "design" | "growth" | "operations";
export type PartTag = "hot" | "rising" | "new";
export type PropGlyph = "chart" | "braces" | "cursor" | "nib" | "megaphone" | "gear" | "flask" | "compass" | "bubble" | "stack";

export type Part = {
  id: string;
  title: string;
  field: Field;
  tag: PartTag | null;
  /** weeks in a run, from first brief to the finished reel */
  weeks: number;
  company: string;
  brief: string;
  ships: [string, string, string];
  tools: string[];
  prop: PropGlyph;
};

export const FIELDS: { id: Field | "all"; label: string }[] = [
  { id: "all", label: "Popular" },
  { id: "product", label: "Product" },
  { id: "engineering", label: "Engineering" },
  { id: "data", label: "Data" },
  { id: "design", label: "Design" },
  { id: "growth", label: "Growth" },
  { id: "operations", label: "Operations" },
];

export const PARTS: Part[] = [
  { id: "ai-engineer", title: "AI Engineer", field: "engineering", tag: "hot", weeks: 8, company: "quillo",
    brief: "Ship a writing assistant that cites its sources.",
    ships: ["A retrieval pipeline over 40k docs", "An eval suite with 120 cases", "A launch note for the team"], tools: ["Python", "Vector DB", "Evals"], prop: "braces" },
  { id: "product-analyst", title: "Product Analyst", field: "data", tag: "hot", weeks: 6, company: "parcelpost",
    brief: "Find why 31% of carts stall at the address step.",
    ships: ["A funnel model in SQL", "Three ranked fixes", "A readout for the director"], tools: ["SQL", "Notebooks", "Dashboards"], prop: "chart" },
  { id: "product-manager", title: "Product Manager", field: "product", tag: "rising", weeks: 8, company: "fernway",
    brief: "Cut a clinic's no-show rate with one feature.",
    ships: ["A one-page spec", "A prioritised roadmap", "A launch you run with the cast"], tools: ["Specs", "Interviews", "Roadmaps"], prop: "compass" },
  { id: "product-designer", title: "Product Designer", field: "design", tag: "hot", weeks: 7, company: "brightloop",
    brief: "Redesign onboarding so a class starts in two minutes.",
    ships: ["A tested prototype", "A small design system", "A crit you present"], tools: ["Figma", "Prototyping", "Usability tests"], prop: "cursor" },
  { id: "growth-marketer", title: "Growth Marketer", field: "growth", tag: "rising", weeks: 6, company: "sundry",
    brief: "Win back lapsed shoppers without a discount.",
    ships: ["Two live experiments", "A lifecycle email series", "A results memo"], tools: ["Experiments", "CRM", "Copy"], prop: "megaphone" },
  { id: "data-scientist", title: "Data Scientist", field: "data", tag: null, weeks: 8, company: "tidewell",
    brief: "Forecast next week's demand on a regional grid.",
    ships: ["A forecasting model", "An error budget", "A chart the board can read"], tools: ["Python", "Forecasting", "Plots"], prop: "flask" },
  { id: "frontend-engineer", title: "Frontend Engineer", field: "engineering", tag: "new", weeks: 7, company: "lumen",
    brief: "Build the store page for a game launching Friday.",
    ships: ["A fast, accessible store page", "A component library", "A code review you lead"], tools: ["TypeScript", "React", "Testing"], prop: "stack" },
  { id: "content-designer", title: "Content Designer", field: "design", tag: null, weeks: 5, company: "halcyon",
    brief: "Rewrite the overdraft flow so nobody panics.",
    ships: ["A rewritten flow", "A voice guide", "Before-and-after test results"], tools: ["UX writing", "Research", "Style guides"], prop: "nib" },
  { id: "ops-analyst", title: "Operations Analyst", field: "operations", tag: "new", weeks: 6, company: "saltbox",
    brief: "Get 14 hotels to check guests in under three minutes.",
    ships: ["A process map", "A staffing model", "A playbook the front desk uses"], tools: ["Spreadsheets", "Process maps", "SQL"], prop: "gear" },
  { id: "customer-success", title: "Customer Success Lead", field: "operations", tag: "rising", weeks: 5, company: "ledgerly",
    brief: "Save the three accounts most likely to leave this quarter.",
    ships: ["A health score", "Three rescue plans", "A renewal call you run"], tools: ["CRM", "Calls", "Playbooks"], prop: "bubble" },
];

export const partsIn = (field: Field | "all"): Part[] =>
  field === "all" ? PARTS.filter((p) => p.tag !== null).concat(PARTS.filter((p) => p.tag === null)) : PARTS.filter((p) => p.field === field);

export const partById = (id: string): Part | undefined => PARTS.find((p) => p.id === id);

export const TAG_LABEL: Record<PartTag, string> = { hot: "Hot", rising: "Rising", new: "New" };
