import type { ArchetypeId, PlanId } from "../counter/ticket";

export type CounterFormInput = {
  shopName: string;
  email: string;
  archetype: ArchetypeId;
  plan: PlanId;
  depositPct: number;
  serviceNote: string;
};

export type CounterFormErrors = Partial<Record<keyof CounterFormInput, string>>;

const VALID_ARCHETYPES = new Set<ArchetypeId>(["tailor", "cycle", "kiln", "watch"]);
const VALID_PLANS = new Set<PlanId>(["counter", "workshop", "guild"]);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateCounterForm(input: CounterFormInput): {
  valid: boolean;
  errors: CounterFormErrors;
} {
  const errors: CounterFormErrors = {};
  const shopName = (input.shopName ?? "").trim();
  const email = (input.email ?? "").trim();
  const serviceNote = (input.serviceNote ?? "").trim();

  if (shopName.length < 2 || shopName.length > 80) {
    errors.shopName = "Enter your Shopify store or workshop name.";
  }

  if (!EMAIL_RE.test(email) || email.length > 120) {
    errors.email = "Enter a valid merchant email address.";
  }

  if (!VALID_ARCHETYPES.has(input.archetype)) {
    errors.archetype = "Choose a service counter archetype.";
  }

  if (!VALID_PLANS.has(input.plan)) {
    errors.plan = "Select a merchant ledger tier.";
  }

  if (serviceNote.length < 10 || serviceNote.length > 500) {
    errors.serviceNote = "Describe your primary service (at least 10 characters).";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export type TrialPass = {
  passCode: string;
  shopName: string;
  email: string;
  archetypeLabel: string;
  planLabel: string;
  depositPct: number;
  serviceNote: string;
  summaryText: string;
};

const ARCHETYPE_LABELS: Record<ArchetypeId, string> = {
  tailor: "Denim & Garment Atelier",
  cycle: "Bicycle Repair Bay",
  kiln: "Ceramic Kiln & Classes",
  watch: "Watch & Instrument Bench",
};

const PLAN_LABELS: Record<PlanId, string> = {
  counter: "Counter ($19/mo)",
  workshop: "Workshop ($49/mo)",
  guild: "Guild ($99/mo)",
};

export function buildTrialPass(input: CounterFormInput): TrialPass {
  const shopName = input.shopName.trim();
  const email = input.email.trim();
  const serviceNote = input.serviceNote.trim();
  const seedStr = `${shopName.toLowerCase()}|${email.toLowerCase()}|${input.archetype}|${input.plan}`;
  let hash = 0;
  for (let i = 0; i < seedStr.length; i++) {
    hash = (hash * 31 + seedStr.charCodeAt(i)) % 9000;
  }
  const num = 1000 + Math.abs(hash);
  const passCode = `TLY-26-${num}`;
  const archetypeLabel = ARCHETYPE_LABELS[input.archetype] ?? "Service Counter";
  const planLabel = PLAN_LABELS[input.plan] ?? "Workshop ($49/mo)";

  const summaryText = [
    `TALLY MERCHANT TRIAL PASS · ${passCode}`,
    `Storefront: ${shopName} (${email})`,
    `Counter Kit: ${archetypeLabel}`,
    `Ledger Tier: ${planLabel} · ${input.depositPct}% Deposit at Checkout`,
    `Service Workflow: ${serviceNote}`,
  ].join("\n");

  return {
    passCode,
    shopName,
    email,
    archetypeLabel,
    planLabel,
    depositPct: input.depositPct,
    serviceNote,
    summaryText,
  };
}
