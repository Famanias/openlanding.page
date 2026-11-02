export interface WorkProject {
  id: string;
  title: string;
  client: string;
  category: "brand" | "campaigns" | "experiences";
  categoryLabel: string;
  year: string;
  metric: string;
  summary: string;
  challenge: string;
  outcome: string;
  deliverables: string[];
}

export interface BriefInput {
  name: string;
  email: string;
  company: string;
  scopes: string[];
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: {
    name?: string;
    email?: string;
    message?: string;
  };
}

export function filterWorkProjects<T extends WorkProject>(
  projects: T[],
  activeCategory: string
): T[] {
  if (!activeCategory || activeCategory === "all") {
    return projects;
  }
  return projects.filter((project) => project.category === activeCategory);
}

export function nextTestimonialIndex(
  currentIndex: number,
  direction: "next" | "prev",
  total: number
): number {
  if (total <= 0) return 0;
  if (direction === "next") {
    return (currentIndex + 1) % total;
  }
  return (currentIndex - 1 + total) % total;
}

export function computeProcessMilestoneState(
  scrollProgress: number,
  totalChapters: number = 4
): {
  clampedProgress: number;
  activeChapterIndex: number;
  reachedChapters: boolean[];
} {
  const clamped = Math.max(0, Math.min(1, scrollProgress));
  const thresholds = [0.08, 0.36, 0.64, 0.88].slice(0, totalChapters);
  const reachedChapters = thresholds.map((t) => clamped >= t);
  let activeChapterIndex = 0;
  for (let i = 0; i < reachedChapters.length; i++) {
    if (reachedChapters[i]) {
      activeChapterIndex = i;
    }
  }
  return {
    clampedProgress: clamped,
    activeChapterIndex,
    reachedChapters,
  };
}

export function validateBriefInput(input: BriefInput): ValidationResult {
  const errors: ValidationResult["errors"] = {};
  const trimmedName = (input.name || "").trim();
  const trimmedEmail = (input.email || "").trim();
  const trimmedMessage = (input.message || "").trim();

  if (trimmedName.length < 2) {
    errors.name = "Please share your name so we know how to address you.";
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(trimmedEmail)) {
    errors.email = "Please enter a valid email address.";
  }
  if (trimmedMessage.length < 10) {
    errors.message =
      "Please add a short note (at least 10 characters) about what you are growing.";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function formatBriefSummary(input: BriefInput): string {
  const scopeText =
    input.scopes && input.scopes.length > 0
      ? input.scopes.join(", ")
      : "General Partnership";
  return [
    `Hello nexus team,`,
    ``,
    `We would love to partner up on a new project.`,
    `Name: ${input.name.trim()}`,
    `Organization: ${input.company && input.company.trim() ? input.company.trim() : "Independent"}`,
    `Email: ${input.email.trim()}`,
    `Focus Areas: ${scopeText}`,
    ``,
    `Project Note:`,
    input.message.trim(),
  ].join("\n");
}

export function buildMailtoHref(
  input: BriefInput,
  recipient = "hello@nexus-studio.example"
): string {
  const scopeText =
    input.scopes && input.scopes.length > 0
      ? input.scopes.join(", ")
      : "General Partnership";
  const companyPart =
    input.company && input.company.trim() ? ` (${input.company.trim()})` : "";
  const subject = `Project Seed from ${input.name.trim()}${companyPart} — ${scopeText}`;
  const body = formatBriefSummary(input);
  return `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export const buildMailtoUrl = buildMailtoHref;
