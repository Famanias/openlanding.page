import { clamp } from "../motion/math";

export type PlanId = "pup" | "grown" | "golden";
export type Billing = "monthly" | "yearly";

export type Plan = {
  id: PlanId;
  name: string;
  who: string;
  /** Price per pet per month, in pounds. */
  monthly: number;
  includes: string[];
};

export const PLANS: Plan[] = [
  {
    id: "pup",
    name: "Pup & Kit",
    who: "Under one year",
    monthly: 16,
    includes: ["Full vaccine course", "Microchip and first passport", "Neutering at 20% off", "Unlimited nurse visits", "Puppy and kitten classes"],
  },
  {
    id: "grown",
    name: "Grown-up",
    who: "One to eight years",
    monthly: 21,
    includes: ["Two nose-to-tail check-ups", "Annual boosters", "Flea, tick and worm cover", "10% off everything else", "Free claw trims"],
  },
  {
    id: "golden",
    name: "Golden Years",
    who: "Eight and over",
    monthly: 29,
    includes: ["Three check-ups a year", "Senior bloods and urine test", "Heart and joint screening", "15% off medication", "Home visits for end of life"],
  },
];

export const MAX_PETS = 4;
const SIBLING_DISCOUNT = 0.15;
const MONTHS_CHARGED_PER_YEAR = 10;

export type Quote = { pets: number; billing: Billing; perMonth: number; dueNow: number; saving: number };

export function quote(planId: PlanId, petsInput: number, billing: Billing): Quote {
  const plan = PLANS.find((p) => p.id === planId) ?? PLANS[0];
  const pets = clamp(Math.round(petsInput), 1, MAX_PETS);
  const monthly = Math.round(plan.monthly + (pets - 1) * plan.monthly * (1 - SIBLING_DISCOUNT));
  const list = plan.monthly * pets;
  if (billing === "monthly") {
    return { pets, billing, perMonth: monthly, dueNow: monthly, saving: Math.round(list - monthly) };
  }
  const year = monthly * MONTHS_CHARGED_PER_YEAR;
  return { pets, billing, perMonth: Math.round(year / 12), dueNow: year, saving: Math.round(list * 12 - year) };
}
