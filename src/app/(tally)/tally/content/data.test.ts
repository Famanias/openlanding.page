import { describe, expect, it } from "vitest";
import {
  ARCHETYPES,
  FAQS,
  MERCHANT_STORIES,
  PLANS,
  SERVICE_MODES,
  TICKET_STOPS,
} from "./data";

describe("tally typed content data", () => {
  it("defines four service archetypes with slots and add-ons", () => {
    expect(ARCHETYPES).toHaveLength(4);
    expect(ARCHETYPES.map((a) => a.id)).toEqual(["tailor", "cycle", "kiln", "watch"]);
    for (const archetype of ARCHETYPES) {
      expect(archetype.basePrice).toBeGreaterThan(0);
      expect(archetype.slots.length).toBeGreaterThanOrEqual(3);
      expect(archetype.addOns.length).toBeGreaterThanOrEqual(2);
    }
  });

  it("defines four sequential ticket stops from checkout to pickup", () => {
    expect(TICKET_STOPS).toHaveLength(4);
    expect(TICKET_STOPS.map((s) => s.step)).toEqual(["01", "02", "03", "04"]);
  });

  it("defines four service modes with storefront and POS views", () => {
    expect(SERVICE_MODES).toHaveLength(4);
    for (const mode of SERVICE_MODES) {
      expect(mode.storefrontLine.title).toBeTruthy();
      expect(mode.posBenchLine.station).toBeTruthy();
    }
  });

  it("defines three merchant dossiers with numerical stats and receipt items", () => {
    expect(MERCHANT_STORIES).toHaveLength(3);
    for (const story of MERCHANT_STORIES) {
      expect(story.metricValue).toBeGreaterThan(0);
      expect(story.receipt.items.length).toBeGreaterThanOrEqual(3);
    }
  });

  it("defines three merchant plans and five FAQs", () => {
    expect(PLANS).toHaveLength(3);
    expect(PLANS.map((p) => p.id)).toEqual(["counter", "workshop", "guild"]);
    expect(FAQS).toHaveLength(5);
  });
});
