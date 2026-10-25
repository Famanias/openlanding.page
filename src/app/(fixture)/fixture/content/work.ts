export type Metric = {
  label: string;
  before: number;
  after: number;
  /** Number of decimals shown. */
  decimals: number;
  prefix?: string;
  suffix?: string;
};

export type Case = {
  id: string;
  merchant: string;
  city: string;
  trade: string;
  fitted: string[];
  quote: string;
  metrics: Metric[];
};

export const CASES: Case[] = [
  {
    id: "fennel",
    merchant: "Fennel & Clay",
    city: "Utrecht",
    trade: "Stoneware studio · 140 products",
    fitted: ["Theme build", "Speed audit", "Care: Shopfloor"],
    quote: "Kiln days used to crash the site. Last drop sold out in nine minutes and nothing broke.",
    metrics: [
      { label: "Mobile load", before: 4.6, after: 1.3, decimals: 1, suffix: " s" },
      { label: "Conversion", before: 0.8, after: 2.9, decimals: 1, suffix: "%" },
      { label: "Avg. order", before: 52, after: 71, decimals: 0, prefix: "€" },
    ],
  },
  {
    id: "ritual",
    merchant: "Ritual Roast",
    city: "Ghent",
    trade: "Coffee subscriptions · 2 roasts / month",
    fitted: ["Store setup", "App wiring", "Conversion pass"],
    quote: "Subscriptions finally sit in the same cart as the beans. Churn dropped the first month.",
    metrics: [
      { label: "Subscribers", before: 310, after: 1140, decimals: 0 },
      { label: "Monthly churn", before: 9.4, after: 4.1, decimals: 1, suffix: "%" },
      { label: "Checkout time", before: 3.2, after: 1.4, decimals: 1, suffix: " min" },
    ],
  },
  {
    id: "spokesmith",
    merchant: "Spokesmith",
    city: "Rotterdam",
    trade: "Bike repair · bookings + parts",
    fitted: ["Store setup", "App wiring", "Care: Counter"],
    quote: "People book a service slot and buy the tyres in one go. The phone rings half as much.",
    metrics: [
      { label: "Online bookings", before: 18, after: 96, decimals: 0, suffix: " / wk" },
      { label: "Parts revenue", before: 2.1, after: 6.8, decimals: 1, prefix: "€", suffix: "k / mo" },
      { label: "Phone calls", before: 140, after: 64, decimals: 0, suffix: " / wk" },
    ],
  },
];
