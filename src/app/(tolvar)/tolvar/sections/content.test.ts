import { describe, expect, it } from "vitest";
import { COMPANY, FLEET, NAV, POSITIONS, STATS, fleetTotal } from "./content";

describe("tolvar content", () => {
  it("has unique nav targets that cannot be mistaken for a hex colour by the palette guard", () => {
    const ids = NAV.map((item) => item.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const id of ids) expect(id).not.toMatch(/^[0-9a-f]{3,8}$/i);
  });

  it("uses only fictional 555-01xx phone numbers", () => {
    for (const phone of [COMPANY.cell, COMPANY.office]) {
      expect(phone.label).toMatch(/^\(218\) 555-01\d\d$/);
      expect(phone.href).toMatch(/^tel:\+1218555 ?01\d\d$/);
    }
  });

  it("carries nothing over from the business the photos came from", () => {
    const everything = JSON.stringify({ COMPANY, FLEET, NAV, POSITIONS, STATS }).toLowerCase();
    for (const word of ["menke", "dearborn", "camden", "missouri", "kansas city", "st. joseph", "yahoo"]) {
      expect(everything).not.toContain(word);
    }
  });

  it("adds the fleet up to the number quoted in the stats", () => {
    expect(fleetTotal()).toBe(10);
    expect(STATS.find((stat) => stat.label.includes("machines"))?.value).toBe(fleetTotal());
  });

  it("lists three open positions, each with requirements", () => {
    expect(POSITIONS.map((position) => position.id)).toEqual(["laborer", "operator", "foreman"]);
    for (const position of POSITIONS) expect(position.needs.length).toBeGreaterThanOrEqual(3);
  });
});
