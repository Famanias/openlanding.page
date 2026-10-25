export type Cycle = "monthly" | "annual";

export type CarePlan = {
  id: "counter" | "shopfloor" | "flagship";
  name: string;
  monthly: number;
  hours: string;
  pitch: string;
  includes: string[];
  featured?: boolean;
};

export const CARE_PLANS: CarePlan[] = [
  {
    id: "counter",
    name: "Counter",
    monthly: 240,
    hours: "4 h / month",
    pitch: "For shops that mostly run themselves and want someone on call.",
    includes: ["App and theme updates", "Monthly speed check", "Fixes within 2 working days"],
  },
  {
    id: "shopfloor",
    name: "Shopfloor",
    monthly: 420,
    hours: "8 h / month",
    pitch: "For growing shops with a launch, a sale or a new range every month.",
    includes: ["Everything in Counter", "One landing page a month", "Same-day fixes", "Quarterly conversion review"],
    featured: true,
  },
  {
    id: "flagship",
    name: "Flagship",
    monthly: 780,
    hours: "16 h / month",
    pitch: "For busy stores that treat the shop like a second storefront team.",
    includes: ["Everything in Shopfloor", "A/B test every month", "Seasonal theme refresh", "Named lead, weekly call"],
  },
];

/** Monthly price for a cycle; annual billing gives two months free. */
export function planPrice(plan: CarePlan, cycle: Cycle): number {
  return cycle === "monthly" ? plan.monthly : Math.round((plan.monthly * 10) / 12);
}

export function formatEuro(amount: number): string {
  return `€${amount.toLocaleString("en-US")}`;
}
