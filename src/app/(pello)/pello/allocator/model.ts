import { clamp } from "../motion/math";

export const BALANCE = 240000;
export const PLANS = [
  { id: "balanced", label: "A little of both", note: "Today and tomorrow, together.", rainy: 72000, goal: 48000 },
  { id: "steady", label: "A softer landing", note: "A little more breathing room.", rainy: 108000, goal: 24000 },
  { id: "adventure", label: "Something to look forward to", note: "Bring that weekend a little closer.", rainy: 48000, goal: 84000 },
] as const;
export type PlanId = typeof PLANS[number]["id"];
export const getPlan = (id: string | null) => PLANS.find(plan => plan.id === id) ?? PLANS[0];
export function allocate(id: string, goal: number) {
  const plan = getPlan(id);
  const weekend = Math.round(clamp(Number.isFinite(goal) ? goal : plan.goal, 0, 120000));
  return { everyday: BALANCE - plan.rainy - weekend, rainy: plan.rainy, weekend };
}
export function readPlan(params: URLSearchParams): { plan: PlanId; goal: number } {
  const plan = getPlan(params.get("plan"));
  const raw = params.get("goal");
  const goal = raw !== null && raw.trim() !== "" ? Number(raw) * 100 : plan.goal;
  return { plan: plan.id, goal: allocate(plan.id, goal).weekend };
}
export function signupHref(id: string, goal: number) {
  return "/templates/pello?plan=" + getPlan(id).id + "&goal=" + allocate(id, goal).weekend / 100 + "#begin";
}
export const money = (cents: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(cents / 100);
