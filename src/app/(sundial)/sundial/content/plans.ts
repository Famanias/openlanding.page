/** Subscriptions, in a roastery's terms: bags per delivery, priced per delivery. */

export interface Plan {
  id: string;
  name: string;
  bagsPerDelivery: number;
  bagG: number;
  /** Price per delivery, not per month — a roastery sells bags, not subscriptions. */
  priceUsd: number;
  cadence: string;
  daysBetween: number;
  perks: string[];
  featured: boolean;
}

export const PLANS: readonly Plan[] = [
  {
    id: "one-bag",
    name: "One bag",
    bagsPerDelivery: 1,
    bagG: 340,
    priceUsd: 17,
    cadence: "Every 2 weeks",
    daysBetween: 14,
    perks: ["Roaster's pick or your choice", "Curve card in every bag", "Skip or cancel any time"],
    featured: false,
  },
  {
    id: "two-bags",
    name: "Two bags",
    bagsPerDelivery: 2,
    bagG: 340,
    priceUsd: 32,
    cadence: "Every 2 weeks",
    daysBetween: 14,
    perks: [
      "One filter, one espresso roast",
      "First crack at micro-lots",
      "Free local delivery",
      "Save 20% a bag vs. the counter",
    ],
    featured: true,
  },
  {
    id: "counter-refill",
    name: "Counter refill",
    bagsPerDelivery: 4,
    bagG: 340,
    priceUsd: 52,
    cadence: "Every 4 weeks",
    daysBetween: 28,
    perks: [
      "Refill your tin at the bar for $12",
      "Two micro-lot previews a year",
      "Named on the counter board",
      "Save 25% a bag",
    ],
    featured: false,
  },
];

/** What a subscriber pays per 340 g bag: $19, $17, $13. */
export const pricePerBagUsd = (plan: Plan): number => plan.priceUsd / plan.bagsPerDelivery;
