export type CaptureTierId = "splash" | "squeeze" | "lead-gen";

export type CompanySizeBand = "1-25" | "26-200" | "201-1000" | "1000+";

export type BuyerRoleId = "vp-growth" | "demand-gen" | "product-growth" | "founder";

export interface CaptureFormatSpec {
  id: CaptureTierId;
  stepCode: string;
  title: string;
  subtitle: string;
  funnelStage: string;
  fieldsRequired: number;
  fieldSummary: string;
  medianCvr: number;
  intentScore: number;
  frictionLabel: string;
  surfaceToken: string;
  surfaceHex: string;
  definition: string;
  payoffSummary: string;
  anatomyPoints: string[];
  idealUseCases: string[];
}

export interface CohortEdition {
  id: string;
  label: string;
  regionTag: string;
  sampleSize: number;
  headlineStat: string;
  summary: string;
}

export interface ReportChapter {
  id: string;
  number: string;
  title: string;
  pages: string;
  requiredTier: CaptureTierId;
  summary: string;
  keyFinding: string;
  chartLabel: string;
  bars: Array<{ label: string; value: number; highlight?: boolean }>;
}

export interface SocialProofItem {
  company: string;
  segment: string;
  metric: string;
  quote: string;
  author: string;
  role: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  tierTag: string;
}

export const COHORT_EDITIONS: CohortEdition[] = [
  {
    id: "na-enterprise",
    label: "North America · B2B SaaS",
    regionTag: "NA · 184 FUNNELS",
    sampleSize: 184,
    headlineStat: "41.2% squeeze-to-MQL velocity",
    summary:
      "Benchmarks across 184 SaaS teams trading calculators and executive digests for work emails.",
  },
  {
    id: "emea-privacy",
    label: "EMEA & UK · Consent-First",
    regionTag: "EMEA · 138 FUNNELS",
    sampleSize: 138,
    headlineStat: "3.6× higher trust with unblurred previews",
    summary:
      "Consent-first funnels where live chapter previews precede multi-field qualification.",
  },
  {
    id: "apac-plg",
    label: "APAC · High-Velocity PLG",
    regionTag: "APAC · 96 FUNNELS",
    sampleSize: 96,
    headlineStat: "68% splash-to-workspace continuation",
    summary:
      "High-velocity funnels routing visitors to regional cohorts and 1-field waitlists.",
  },
];

export const CAPTURE_FORMATS: CaptureFormatSpec[] = [
  {
    id: "splash",
    stepCode: "01",
    title: "Splash Page",
    subtitle: "Intermediary Threshold",
    funnelStage: "Top of Funnel",
    fieldsRequired: 0,
    fieldSummary: "Cohort selection + Enter action",
    medianCvr: 74.8,
    intentScore: 34,
    frictionLabel: "Zero form friction",
    surfaceToken: "Lavender Mist",
    surfaceHex: "#E8E0F8",
    definition:
      "An intermediary screen that routes cohorts, establishes context, or announces releases with a single Enter action.",
    payoffSummary: "Routes regional editions and frames the release without form friction.",
    anatomyPoints: [
      "Announcement headline with zero navigation clutter",
      "Optional 1-tap region or cohort selector",
      "Single high-contrast Enter button",
    ],
    idealUseCases: [
      "Annual product and research releases",
      "Regional cohort routing",
      "Age or compliance verification gates",
    ],
  },
  {
    id: "squeeze",
    stepCode: "02",
    title: "Squeeze Page",
    subtitle: "Minimalist 1-Field Capture",
    funnelStage: "Velocity Capture",
    fieldsRequired: 1,
    fieldSummary: "Work email + instant unlock",
    medianCvr: 38.4,
    intentScore: 66,
    frictionLabel: "Ultra-low friction (8 sec)",
    surfaceToken: "Pistachio Mint",
    surfaceHex: "#D9F2E6",
    definition:
      "A single-field capture page designed to collect an email in exchange for immediate content, a waitlist spot, or a tool.",
    payoffSummary: "Unlocks the 14-page Executive Digest and waitlist pass instantly.",
    anatomyPoints: [
      "Benefit-driven headline with two sentences of supporting copy",
      "Single pill email input paired with an inline action button",
      "Immediate browser-side asset delivery upon submission",
    ],
    idealUseCases: [
      "Executive summaries and benchmark digests",
      "Early-access waitlist drops",
      "Instant template and calculator downloads",
    ],
  },
  {
    id: "lead-gen",
    stepCode: "03",
    title: "Lead Capture (Lead Gen) Page",
    subtitle: "B2B Qualification Suite",
    funnelStage: "High-Consideration B2B",
    fieldsRequired: 4,
    fieldSummary: "Full Name, Work Email, Company Size, Role",
    medianCvr: 21.6,
    intentScore: 94,
    frictionLabel: "Calibrated B2B qualification",
    surfaceToken: "Peach Sorbet",
    surfaceHex: "#FCE2D5",
    definition:
      "A high-consideration capture page pairing multi-field qualification with social proof and live asset previews.",
    payoffSummary: "Unseals the complete 68-page Monograph and tailored Audit Key.",
    anatomyPoints: [
      "Four-field qualification form with instant browser validation",
      "Interactive asset preview that adapts to selected cohort",
      "Outcome-focused benefits and verified peer metrics",
    ],
    idealUseCases: [
      "Industry benchmark reports and whitepapers",
      "Tailored architecture audits and assessments",
      "Executive briefing registrations",
    ],
  },
];

export const REPORT_CHAPTERS: ReportChapter[] = [
  {
    id: "ch-01",
    number: "CH · 01",
    title: "The Value-Exchange Elasticity Curve",
    pages: "pp. 04–16",
    requiredTier: "splash",
    summary:
      "Why each unmotivated field cuts conversion by 18.5%, and how live previews recover lost completion.",
    keyFinding: "Every form field must unlock visible personalization in the previewed asset.",
    chartLabel: "Median Conversion Rate by Capture Format (%)",
    bars: [
      { label: "Splash Gate (0 fields)", value: 75, highlight: true },
      { label: "Squeeze Page (1 email)", value: 38 },
      { label: "Calibrated Lead Gen (4 fields)", value: 22 },
      { label: "Legacy Static Wall (8+ fields)", value: 6 },
    ],
  },
  {
    id: "ch-02",
    number: "CH · 02",
    title: "Squeeze Page Mechanics: Copy Compression & Micro-Proof",
    pages: "pp. 17–32",
    requiredTier: "squeeze",
    summary:
      "Analysis of 140 single-field squeeze pages: optimal headlines, inline pill inputs, and browser delivery.",
    keyFinding: "Named deliverables with explicit page counts outperform generic subscribe CTAs by 2.3×.",
    chartLabel: "Squeeze Page Completion by Value Specificity (%)",
    bars: [
      { label: "Named deliverable + page count", value: 44, highlight: true },
      { label: "Waitlist with cohort position", value: 36 },
      { label: "Standard newsletter promise", value: 19 },
      { label: "Vague 'Stay updated' prompt", value: 8 },
    ],
  },
  {
    id: "ch-03",
    number: "CH · 03",
    title: "B2B Lead Capture: Multi-Field Routing & Live Asset Tailoring",
    pages: "pp. 33–51",
    requiredTier: "lead-gen",
    summary:
      "How growth teams use Company Size and Role to re-weight whitepaper benchmarks in real time.",
    keyFinding: "When company size dynamically updates report charts, 4-field completion rises from 14.2% to 24.8%.",
    chartLabel: "Qualified Pipeline Rate by Preview Interactivity (%)",
    bars: [
      { label: "Live cohort-filtered preview", value: 68, highlight: true },
      { label: "Static PDF cover mockup", value: 31 },
      { label: "Bullet list without preview", value: 22 },
      { label: "Blind form gate", value: 11 },
    ],
  },
  {
    id: "ch-04",
    number: "CH · 04",
    title: "Progressive Chaining: Splash → Squeeze → Lead Capture",
    pages: "pp. 52–68",
    requiredTier: "lead-gen",
    summary:
      "Blueprints for chaining Splash, Squeeze, and Lead Capture stages into a progressive funnel.",
    keyFinding: "Staged funnels capture 2.9× more total emails while lifting SQL conversion by 41%.",
    chartLabel: "Net Funnel Yield Across 10,000 Visitors (Index)",
    bars: [
      { label: "Staged 3-Tier Capsule Funnel", value: 92, highlight: true },
      { label: "Squeeze-only with email nurture", value: 64 },
      { label: "Direct-to-Lead-Gen gate", value: 41 },
      { label: "Ungated without capture loop", value: 18 },
    ],
  },
];

export const SOCIAL_PROOF_LOGOS: SocialProofItem[] = [
  {
    company: "Linearity Cloud",
    segment: "Enterprise DevTools · 650 employees",
    metric: "+42% MQL velocity",
    quote:
      "Splitting our cold report wall into a 1-field Squeeze and a live-filtered Dossier doubled demo pipeline.",
    author: "Mara Lindqvist",
    role: "VP of Growth & Demand",
  },
  {
    company: "Vespera Pay",
    segment: "B2B FinTech · 1,200 employees",
    metric: "39.4% Squeeze CVR",
    quote:
      "The Splash selector routed EMEA leaders directly to GDPR benchmarks before requesting any data.",
    author: "Julian Vance",
    role: "Head of Revenue Architecture",
  },
  {
    company: "Kinetix AI",
    segment: "Applied AI · 140 employees",
    metric: "3.1× report completion",
    quote:
      "Seeing benchmark bars shift by company size makes the 4-field form feel like a tool, not a gate.",
    author: "Sora Takahashi",
    role: "Director of Product Growth",
  },
  {
    company: "Helios Lattice",
    segment: "Data Infrastructure · 320 employees",
    metric: "78% Splash pass-through",
    quote:
      "Valence gave our team a clear framework for deploying Splash, Squeeze, or full Dossier pages.",
    author: "Devon Mercer",
    role: "Co-Founder & COO",
  },
];

export const VALENCE_FAQS: FaqItem[] = [
  {
    id: "faq-difference",
    question: "When should we deploy a Splash Page versus a Squeeze or Lead Capture Page?",
    answer:
      "Use Splash for zero-friction routing or launch thresholds. Use Squeeze when one email suffices for an instant download or waitlist. Use Lead Capture when multi-field qualification is justified by high-value research or custom audits.",
    tierTag: "ARCHITECTURE",
  },
  {
    id: "faq-progressive",
    question: "Can a funnel chain all three formats without fatiguing visitors?",
    answer:
      "Yes, when each step delivers immediate value. Splash sets the cohort, Squeeze unlocks the 14-page digest, and Lead Capture carries the email forward to unlock the complete 68-page monograph.",
    tierTag: "PROGRESSIVE UNLOCK",
  },
  {
    id: "faq-fields",
    question: "Why cap the B2B Lead Capture form at four fields?",
    answer:
      "Four fields (Name, Work Email, Company Size, Role) capture 94% of qualification signal while keeping median conversion at 21.6%. Adding phone numbers or open fields cut conversion by 46%.",
    tierTag: "EMPIRICAL BENCHMARK",
  },
  {
    id: "faq-preview",
    question: "How does the live Gated Asset Preview improve conversion?",
    answer:
      "Static covers make visitors guess content quality. Letting visitors filter live data charts by company size and role demonstrates value upfront and attracts higher-intent leads.",
    tierTag: "ASSET PREVIEW",
  },
  {
    id: "faq-privacy",
    question: "Does this template send form data to an external server?",
    answer:
      "No. All validation, pass codes (SQ-26-XXXX), and Dossier keys (VL-2026-XXXX) run locally in the browser with zero network requests.",
    tierTag: "LOCAL & PRIVATE",
  },
];
