import { CALLBACKS, COMPANIES, type Company } from "./companies";
import { FAQ, type Faq } from "./faq";
import { PARTS, type Field, type Part } from "./parts";

export type WeekStep = {
  week: string;
  phase: string;
  deliverable: string;
  directorNote: string;
};

export type PartSyllabus = {
  part: Part;
  company: Company;
  isCallbackPartner: boolean;
  weeklyHours: number;
  castSize: number;
  castRoles: string[];
  syllabus: WeekStep[];
  directorSummary: string;
};

export type CompanyProfile = Company & {
  castOpenings: number;
  typicalBrief: string;
  isCallbackPartner: boolean;
};

const CAST_ROLES_BY_FIELD: Record<Field, string[]> = {
  product: ["Director (VP Product)", "Product Manager (you)", "Product Designer", "Frontend Engineer", "Product Analyst"],
  engineering: ["Director (Staff Eng)", "Engineer (you)", "Product Manager", "Design Partner", "QA Peer"],
  data: ["Director (Head of Data)", "Analyst / DS (you)", "Product Manager", "Growth Lead", "Backend Engineer"],
  design: ["Director (Design Lead)", "Designer (you)", "Product Manager", "Frontend Engineer", "Content Strategist"],
  growth: ["Director (Growth Lead)", "Growth Marketer (you)", "Product Analyst", "Content Designer", "CRM Partner"],
  operations: ["Director (COO Lead)", "Operations Lead (you)", "Finance Partner", "Customer Success", "Product Ops"],
};

export function filterParts(query: string, field: Field | "all"): Part[] {
  const q = query.trim().toLowerCase();
  const base = field === "all" ? PARTS : PARTS.filter((p) => p.field === field);
  if (!q) return base;
  return base.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.brief.toLowerCase().includes(q) ||
      p.company.toLowerCase().includes(q) ||
      p.tools.some((t) => t.toLowerCase().includes(q)),
  );
}

export function getPartSyllabus(id: string): PartSyllabus | null {
  const part = PARTS.find((p) => p.id === id);
  if (!part) return null;
  const company = COMPANIES.find((c) => c.id === part.company) ?? COMPANIES[0];
  const midWeek = Math.max(2, Math.ceil(part.weeks / 2));
  return {
    part,
    company,
    isCallbackPartner: (CALLBACKS as readonly string[]).includes(company.id),
    weeklyHours: 10,
    castSize: 5,
    castRoles: CAST_ROLES_BY_FIELD[part.field],
    directorSummary: `Every draft at ${company.name} gets async line notes within 24 hours and a live weekly table read before shipping to your reel.`,
    syllabus: [
      {
        week: "Week 01 · Opening night",
        phase: "Table read & Lot orientation",
        deliverable: `Audit the ${company.name} workspace brief and publish your scoping note.`,
        directorNote: "Don't jump straight to polish — prove you understand the constraint first.",
      },
      {
        week: `Weeks 02–0${midWeek}`,
        phase: "First draft with the cast",
        deliverable: part.ships[0],
        directorNote: "Share rough work early in the cast channel so engineering and design react live.",
      },
      {
        week: `Weeks 0${midWeek + 1}–0${part.weeks - 1}`,
        phase: "Critique & iteration",
        deliverable: part.ships[1],
        directorNote: "Tighten edge cases and annotate every tradeoff in plain language.",
      },
      {
        week: `Week 0${part.weeks} · Curtain call`,
        phase: "Sign-off & reel publication",
        deliverable: part.ships[2],
        directorNote: "Package the finished work with before/after metrics for casting studios.",
      },
    ],
  };
}

export function getAdjacentParts(id: string): { prev: Part; next: Part } | null {
  const idx = PARTS.findIndex((p) => p.id === id);
  if (idx < 0) return null;
  return {
    prev: PARTS[(idx - 1 + PARTS.length) % PARTS.length],
    next: PARTS[(idx + 1) % PARTS.length],
  };
}

export function getCompanyProfiles(sector: string = "all"): CompanyProfile[] {
  const normalized = sector.trim().toLowerCase();
  return COMPANIES.map((co, i) => {
    const linkedPart = PARTS.find((p) => p.company === co.id);
    return {
      ...co,
      castOpenings: 2 + (i % 4),
      typicalBrief: linkedPart ? linkedPart.brief : `Cross-functional ${co.sector.toLowerCase()} sprint across product, data, and design.`,
      isCallbackPartner: (CALLBACKS as readonly string[]).includes(co.id),
    };
  }).filter((co) => normalized === "all" || co.sector.toLowerCase() === normalized);
}

export function getCompanySectors(): string[] {
  return [...new Set(COMPANIES.map((c) => c.sector))].sort((a, b) => a.localeCompare(b));
}

export function filterFaq(query: string): Faq[] {
  const q = query.trim().toLowerCase();
  if (!q) return FAQ;
  return FAQ.filter(
    (item) =>
      item.question.toLowerCase().includes(q) ||
      item.answer.toLowerCase().includes(q) ||
      item.keywords.some((k) => k.toLowerCase().includes(q)),
  );
}
