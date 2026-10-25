import { describe, expect, it } from "vitest";
import { studioStatus } from "./hours";

describe("FIXTURE studio hours (Rotterdam)", () => {
  it("is open on a weekday afternoon", () => {
    // Wed 21 Oct 2026, 10:00 UTC = 12:00 in Rotterdam (CEST)
    expect(studioStatus(new Date("2026-10-21T10:00:00Z"))).toEqual({ open: true, label: "Open · closes 18:00" });
  });

  it("is closed after hours and names the next opening", () => {
    // Wed 21 Oct 2026, 17:30 UTC = 19:30 local
    expect(studioStatus(new Date("2026-10-21T17:30:00Z"))).toEqual({ open: false, label: "Closed · opens Thu 09:00" });
  });

  it("is closed before opening on the same day", () => {
    // Thu 22 Oct 2026, 05:00 UTC = 07:00 local
    expect(studioStatus(new Date("2026-10-22T05:00:00Z"))).toEqual({ open: false, label: "Closed · opens 09:00" });
  });

  it("skips the weekend", () => {
    // Fri 23 Oct 2026, 16:30 UTC = 18:30 local, and Sat 24 Oct midday
    expect(studioStatus(new Date("2026-10-23T16:30:00Z")).label).toBe("Closed · opens Mon 09:00");
    expect(studioStatus(new Date("2026-10-24T11:00:00Z")).label).toBe("Closed · opens Mon 09:00");
  });

  it("follows winter time", () => {
    // Mon 2 Nov 2026, 08:30 UTC = 09:30 local (CET)
    expect(studioStatus(new Date("2026-11-02T08:30:00Z")).open).toBe(true);
    // Mon 2 Nov 2026, 07:30 UTC = 08:30 local
    expect(studioStatus(new Date("2026-11-02T07:30:00Z")).open).toBe(false);
  });
});
