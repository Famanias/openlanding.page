import { describe, expect, it } from "vitest";
import { HOURS, clinicStatus } from "./hours";

// 16 Nov 2026 is a Monday. Months are zero-based in the Date constructor.
const at = (day: number, h: number, m = 0) => new Date(2026, 10, day, h, m);

describe("clinic opening status", () => {
  it("lists a schedule for all seven days", () => {
    expect(HOURS).toHaveLength(7);
  });

  it("is open on a weekday morning and says when it closes", () => {
    const s = clinicStatus(at(17, 10)); // Tuesday
    expect(s.open).toBe(true);
    expect(s.label).toBe("Open now");
    expect(s.detail).toBe("Doors close at 20:00");
  });

  it("warns when closing within 45 minutes", () => {
    const s = clinicStatus(at(17, 19, 30));
    expect(s.open).toBe(true);
    expect(s.label).toBe("Closing soon");
  });

  it("hands over to the night vet after hours and names tomorrow's opening", () => {
    const s = clinicStatus(at(17, 21));
    expect(s.open).toBe(false);
    expect(s.label).toBe("Night vet on call");
    expect(s.detail).toBe("Doors open 08:00 tomorrow");
  });

  it("names today's opening before the doors open", () => {
    const s = clinicStatus(at(17, 6, 15));
    expect(s.open).toBe(false);
    expect(s.detail).toBe("Doors open 08:00 today");
  });

  it("names the weekday when the next opening is not tomorrow", () => {
    // Sunday closes 14:00; Monday opens 08:00 (tomorrow). Saturday 18:00 → Sunday 10:00 (tomorrow).
    expect(clinicStatus(at(21, 18)).detail).toBe("Doors open 10:00 tomorrow");
    expect(clinicStatus(at(22, 15)).detail).toBe("Doors open 08:00 tomorrow");
  });
});
