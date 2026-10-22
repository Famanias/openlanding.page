/** Facts about the fictional firm, kept in one place so the header, hero, footer and form agree. */
export const FIRM = {
  name: "Calder & Rowe",
  legalName: "Calder & Rowe LLP",
  founded: 1987,
  phone: "212 555 0187",
  phoneHref: "tel:+12125550187",
  email: "hello@calderrowe.com",
  addressLines: ["130 Madison Avenue, 12th Floor", "New York, NY 10016"],
  offices: "Manhattan · Brooklyn · Westchester",
} as const;

export type Matter = {
  numeral: string;
  id: string;
  title: string;
  summary: string;
  typical: string[];
};

/** Practice areas, written as the counts of a brief. */
export const MATTERS: Matter[] = [
  {
    numeral: "I",
    id: "formation",
    title: "Business formation & contracts",
    summary: "Entities, founder and shareholder agreements, and the commercial contracts a company lives or dies by, written to be read in a crisis.",
    typical: ["Operating & shareholder agreements", "Founder and equity splits", "Vendor and customer contracts"],
  },
  {
    numeral: "II",
    id: "disputes",
    title: "Commercial disputes",
    summary: "Contract, partnership and shareholder disputes, settled on the merits when that is best, tried when it is not.",
    typical: ["Shareholder and partner disputes", "Breach of contract", "Business torts & injunctions"],
  },
  {
    numeral: "III",
    id: "employment",
    title: "Employment & executive matters",
    summary: "Agreements, exits and workplace risk, for executives and for the companies that employ them.",
    typical: ["Executive agreements", "Separations & severance", "Restrictive covenants"],
  },
  {
    numeral: "IV",
    id: "estates",
    title: "Trusts & estates",
    summary: "Planning for the people and property you are responsible for, and administration when the time comes.",
    typical: ["Wills & trusts", "Succession of a family business", "Estate administration"],
  },
];

export const MATTER_TITLES: string[] = MATTERS.map((m) => m.title);

export type Partner = {
  id: string;
  name: string;
  role: string;
  asset: string;
  summary: string;
  credentials: string[];
};

export const PARTNERS: Partner[] = [
  {
    id: "calder",
    name: "Mara Calder",
    role: "Founding partner · Commercial disputes",
    asset: "partner-calder",
    summary: "Mara has tried commercial cases in New York for thirty-one years. She takes the first call on every dispute and stays on the matter until it closes.",
    credentials: ["J.D., Columbia Law School", "Admitted: New York, 1992", "Former clerk, S.D.N.Y."],
  },
  {
    id: "rowe",
    name: "Daniel Rowe",
    role: "Partner · Corporate & estates",
    asset: "partner-rowe",
    summary: "Daniel builds the agreements and structures that keep owner-managed companies, and the families behind them, out of court in the first place.",
    credentials: ["J.D., NYU School of Law", "Admitted: New York, 2001", "Trustee, a family foundation"],
  },
];

export type Fact = { value: number; suffix: string; label: string };

export const FACTS: Fact[] = [
  { value: 38, suffix: "", label: "Years in practice" },
  { value: 11, suffix: "", label: "Attorneys, all in one office" },
  { value: 2, suffix: "", label: "Partners on every matter" },
  { value: 1, suffix: "", label: "Business day to reply" },
];

export type Authority = { cite: string; title: string; outcome: string };

/** Anonymised matters, written like citations. */
export const AUTHORITIES: Authority[] = [
  { cite: "No. 21-0388", title: "Founder buy-out", outcome: "Resolved by agreement in eleven weeks, without a filing." },
  { cite: "No. 23-0142", title: "Shareholder dispute", outcome: "A seven-figure claim settled the week before trial." },
  { cite: "No. 24-0275", title: "Executive separation", outcome: "Terms agreed in nine days, with the restrictive covenant narrowed." },
];

export const MARQUEE_ITEMS: string[] = [
  "Shareholder disputes",
  "Founder exits",
  "Executive agreements",
  "Operating agreements",
  "Estate administration",
  "Restrictive covenants",
  "Commercial litigation",
  "Family businesses",
];

export type Faq = { q: string; a: string };

export const FAQS: Faq[] = [
  {
    q: "What happens in a first consultation?",
    a: "A partner listens to the facts, asks for the few documents that matter, and tells you plainly what your options are. You leave with a clearer sense of the decision, whether or not you hire us.",
  },
  {
    q: "How are your fees structured?",
    a: "Most matters are quoted as a fixed fee or a capped budget after the first meeting. Litigation is billed hourly against an estimate we update as the matter moves. There are no surprises on the invoice.",
  },
  {
    q: "Do you work with individuals as well as businesses?",
    a: "Both. Our clients are founders, owner-managers, executives and the families behind them, which is why trusts and estates sit beside our commercial work.",
  },
  {
    q: "Is what I tell you confidential?",
    a: "From the first call, yes. We treat what you share as privileged, and the form on this page is for general enquiries only until we have confirmed that we can act for you.",
  },
  {
    q: "Where do you meet clients?",
    a: "At 130 Madison Avenue in Midtown, or by video. We also meet clients in Brooklyn and Westchester when that is easier for you.",
  },
];
