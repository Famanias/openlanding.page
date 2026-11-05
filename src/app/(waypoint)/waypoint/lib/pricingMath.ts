export type BillingCadence = "monthly" | "annual";
export type PlanId = "starter" | "pro" | "studio";

export interface PlanPriceResult {
  amount: number;
  formatted: string;
  cadenceText: string;
}

export function calculatePlanPrice(plan: PlanId, cadence: BillingCadence): PlanPriceResult {
  switch (plan) {
    case "starter":
      return {
        amount: 0,
        formatted: "$0",
        cadenceText: "/ permanent free",
      };
    case "pro":
      return {
        amount: cadence === "annual" ? 22 : 28,
        formatted: cadence === "annual" ? "$22" : "$28",
        cadenceText: cadence === "annual" ? "/ a month billed annually" : "/ a month",
      };
    case "studio":
      return {
        amount: cadence === "annual" ? 48 : 58,
        formatted: cadence === "annual" ? "$48" : "$58",
        cadenceText: cadence === "annual" ? "/ a month billed annually" : "/ a month",
      };
  }
}

export function formatOdometerDigits(amount: number): string[] {
  return String(amount).split("");
}
