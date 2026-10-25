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
      "Benchmarks across 184 North American SaaS & AI infrastructure teams trading interactive calculators and executive digests for work emails.",
  },
  {
    id: "emea-privacy",
    label: "EMEA & UK · Consent-First",
    regionTag: "EMEA · 138 FUNNELS",
    sampleSize: 138,
    headlineStat: "3.6× higher trust with unblurred previews",
    summary:
      "GDPR-calibrated capture architectures where live chapter previews precede multi-field qualification.",
  },
  {
    id: "apac-plg",
    label: "APAC · High-Velocity PLG",
    regionTag: "APAC · 96 FUNNELS",
    sampleSize: 96,
    headlineStat: "68% splash-to-workspace continuation",
    summary:
      "Product-led growth teams using regional splash routing and 1-field waitlist squeeze pages before enterprise handoff.",
  },
];

export const CAPTURE_FORMATS: CaptureFormatSpec[] = [
  {
    id: "splash",
    stepCode: "01",
    title: "Splash Page",
    subtitle: "The Intermediary Threshold & Launch Teaser",
    funnelStage: "Top of Funnel · Pre-Arrival Gate",
    fieldsRequired: 0,
    fieldSummary: "Cohort or region choice + single Enter action",
    medianCvr: 74.8,
    intentScore: 34,
    frictionLabel: "Zero form friction",
    surfaceToken: "Lavender Mist",
    surfaceHex: "#E8E0F8",
    definition:
      "An intermediary page shown before a visitor reaches the main experience. It serves a gatekeeping, cohort-routing, or high-impact product launch announcement function with a single 'Enter' or 'Continue' button.",
    payoffSummary: "Sets context, routes regional editions, and frames the annual release as an event.",
    anatomyPoints: [
      "Single dominant announcement headline with zero navigation clutter",
      "Optional 1-tap cohort, region, or verification pill selector",
      "One high-contrast 'Enter' or 'Continue' action button that unlatches the experience",
    ],
    idealUseCases: [
      "Annual flagship product or research drop",
      "Regional / language / compliance cohort routing",
      "Age or accreditation verification gates",
    ],
  },
  {
    id: "squeeze",
    stepCode: "02",
    title: "Squeeze Page",
    subtitle: "The Minimalist 1-Field Email Capture",
    funnelStage: "Top-to-Mid Funnel · Velocity Capture",
    fieldsRequired: 1,
    fieldSummary: "Single email input field + instant action",
    medianCvr: 38.4,
    intentScore: 66,
    frictionLabel: "Ultra-low friction (8 sec)",
    surfaceToken: "Pistachio Mint",
    surfaceHex: "#D9F2E6",
    definition:
      "The most distilled capture format. Its sole objective is to collect an email address—using a bold headline, one or two sentences of focused value copy, and a single input field—in exchange for a newsletter, waitlist spot, or instant synthesis download.",
    payoffSummary: "Unlocks the 14-page Executive Synthesis PDF and priority waitlist pass immediately.",
    anatomyPoints: [
      "Bold benefit-driven headline and at most two sentences of supporting copy",
      "Single pill input field (Email Address) paired inline with the submit button",
      "Immediate, verifiable value delivery (Executive Digest pass code on submit)",
    ],
    idealUseCases: [
      "Executive newsletter & benchmark digest signups",
      "Early-access product waitlist drops",
      "Instant template, checklist, or synthesis downloads",
    ],
  },
  {
    id: "lead-gen",
    stepCode: "03",
    title: "Lead Capture (Lead Gen) Page",
    subtitle: "The Comprehensive B2B Qualification Suite",
    funnelStage: "Middle of Funnel · High-Consideration B2B",
    fieldsRequired: 4,
    fieldSummary: "Full Name, Work Email, Company Size, Role",
    medianCvr: 21.6,
    intentScore: 94,
    frictionLabel: "Calibrated B2B qualification",
    surfaceToken: "Peach Sorbet",
    surfaceHex: "#FCE2D5",
    definition:
      "A comprehensive value-exchange page built for B2B SaaS, executive briefings, and high-consideration services. It pairs a multi-field form (Name, Work Email, Company Size, Role) with enterprise social proof, benefit bullets, and a live preview of the gated asset.",
    payoffSummary: "Unseals the complete 68-page Monograph, raw dataset, and a tailored Funnel Audit Key.",
    anatomyPoints: [
      "Multi-field qualification form (Name, Work Email, Company Size, Role) with live validation",
      "Tangible preview of the gated asset that adapts to the visitor's selected cohort",
      "Outcome-oriented benefit bullets and verified peer social proof alongside the form",
    ],
    idealUseCases: [
      "Gated industry benchmark reports & whitepapers",
      "Custom B2B architecture audits & ROI assessments",
      "Executive webinars and technical workshop registrations",
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
      "Why conversion drops 18.5% per unmotivated form field—and how showing the gated asset up front recovers 82% of lost completion.",
    keyFinding: "Every form field must correspond to a visible personalization in the previewed asset.",
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
      "Deconstructing 140 high-converting single-field squeeze pages: optimal headline length (6–9 words), inline pill inputs, and instant browser-side asset delivery.",
    keyFinding: "Inline pill forms with specific page counts ('14-page synthesis') outperform generic 'Subscribe' CTAs by 2.3×.",
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
      "How top revenue teams use Company Size and Role inputs to dynamically re-weight whitepaper benchmarks while qualifying pipeline in real time.",
    keyFinding: "When selecting 'Company Size' visibly updates the report preview, 4-field completion rises from 14.2% to 24.8%.",
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
      "Architectural blueprints for chaining all three capture formats so visitors never face a cold 6-field wall on their first touch.",
    keyFinding: "Staged capture funnels capture 2.9× more total emails while lifting SQL conversion by 41%.",
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
      "Splitting our cold whitepaper wall into a Pistachio Squeeze fast-lane and a live-filtered Lead-Gen Dossier doubled our executive demo pipeline in six weeks.",
    author: "Mara Lindqvist",
    role: "VP of Growth & Demand",
  },
  {
    company: "Vespera Pay",
    segment: "B2B FinTech · 1,200 employees",
    metric: "39.4% Squeeze CVR",
    quote:
      "The Splash cohort selector let us route EMEA compliance leaders straight to GDPR-specific benchmark charts before asking for a single form field.",
    author: "Julian Vance",
    role: "Head of Revenue Architecture",
  },
  {
    company: "Kinetix AI",
    segment: "Applied AI · 140 employees",
    metric: "3.1× report completion",
    quote:
      "When prospects see the benchmark bars shift as they pick their company size, filling out the 4-field Lead Capture form feels like configuring a tool, not paying a toll.",
    author: "Sora Takahashi",
    role: "Director of Product Growth",
  },
  {
    company: "Helios Lattice",
    segment: "Data Infrastructure · 320 employees",
    metric: "78% Splash pass-through",
    quote:
      "Valence gave our growth and design teams a shared vocabulary for when to deploy a 0-field Splash, a 1-field Squeeze, or a full B2B Dossier.",
    author: "Devon Mercer",
    role: "Co-Founder & COO",
  },
];

export const VALENCE_FAQS: FaqItem[] = [
  {
    id: "faq-difference",
    question: "When should we deploy a Splash Page versus a Squeeze Page or a full Lead Capture Page?",
    answer:
      "Use a Splash Page when you need zero-friction context setting, regional/cohort routing, or a high-impact launch threshold before the main site. Use a Squeeze Page at the top of the funnel when a single email address is enough to deliver an instant digest, newsletter, or waitlist spot. Use a full Lead Capture Page in mid-funnel B2B journeys where multi-field qualification (Name, Work Email, Company Size, Role) is justified by a high-value whitepaper, benchmark dataset, or custom audit.",
    tierTag: "ARCHITECTURE",
  },
  {
    id: "faq-progressive",
    question: "Can a single funnel combine all three capture formats without fatiguing the visitor?",
    answer:
      "Yes—when each step immediately rewards the visitor. Passing the Splash Gate personalizes the regional edition; the 1-field Squeeze unlocks the 14-page Executive Synthesis; and the 4-field Lead Capture form pre-fills the email address already entered and unlocks the tailored 68-page Monograph and custom audit scorecard.",
    tierTag: "PROGRESSIVE UNLOCK",
  },
  {
    id: "faq-fields",
    question: "Why does Valence cap the B2B Lead Capture form at four core fields?",
    answer:
      "Across 418 analyzed B2B funnels, four fields (Full Name, Work Email, Company Size, Role) captured 94% of the routing and scoring signal needed by sales teams while maintaining a 21.6% median conversion rate. Adding phone numbers or open-text budget requirements dropped conversion by 46%.",
    tierTag: "EMPIRICAL BENCHMARK",
  },
  {
    id: "faq-preview",
    question: "How does the live Gated Asset Preview improve lead quality?",
    answer:
      "Static mockup covers force visitors to guess whether a report is relevant. Letting visitors switch chapters and filter live SVG charts by Company Size and Role proves the asset's rigor upfront, ensuring that submitted leads have genuine intent.",
    tierTag: "ASSET PREVIEW",
  },
  {
    id: "faq-privacy",
    question: "Does this template send form submissions to an external server?",
    answer:
      "No. All validation, cohort filtering, Squeeze pass codes (SQ-26-XXXX), and Dossier Access Keys (VL-2026-XXXX) run 100% locally in your browser with zero network requests.",
    tierTag: "LOCAL & PRIVATE",
  },
];
