import type { StageId } from "../fitout/scene";

export type Service = {
  sku: string;
  stage: StageId;
  name: string;
  price: string;
  unit: string;
  blurb: string;
  lead: string;
};

/** The price list. Every service is a shelf tag, and every fit-out stage has at least one. */
export const SERVICES: Service[] = [
  { sku: "FX-01", stage: "shell", name: "Store setup", price: "€1,800", unit: "flat", blurb: "Domain, payments, shipping, tax and the legal pages, set up properly once.", lead: "5 days" },
  { sku: "FX-02", stage: "fixtures", name: "Theme build", price: "€6,500", unit: "from", blurb: "A theme cut for your catalogue and your customers, not a demo store's.", lead: "2–3 weeks" },
  { sku: "FX-03", stage: "wiring", name: "App wiring", price: "€450", unit: "per app", blurb: "Reviews, subscriptions, bookings or email, installed, styled and tested.", lead: "2 days" },
  { sku: "FX-04", stage: "signage", name: "Speed audit", price: "€750", unit: "flat", blurb: "A line-by-line report and the fixes, measured before and after.", lead: "4 days" },
  { sku: "FX-05", stage: "signage", name: "Conversion pass", price: "€1,200", unit: "flat", blurb: "Copy, cart and checkout, rewritten around what your buyers ask.", lead: "1 week" },
  { sku: "FX-06", stage: "open", name: "Care plan", price: "€240", unit: "/ month", blurb: "Updates, fixes and a monthly tune-up, so it stays as fast as launch day.", lead: "ongoing" },
];
