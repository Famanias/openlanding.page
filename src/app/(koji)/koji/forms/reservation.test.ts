import { describe, expect, test } from "vitest";
import { validateReservation, type Reservation } from "./reservation";

const today = new Date("2026-10-20T12:00:00");
const valid: Reservation = { date: "2026-10-24", time: "18:00", guests: 2, name: "Aiko", email: "aiko@example.jp" };

describe("validateReservation", () => {
  test("accepts a valid booking", () => {
    expect(validateReservation(valid, today)).toEqual({});
  });

  test("the counter takes parties of one to four", () => {
    expect(validateReservation({ ...valid, guests: 5 }, today)).toEqual({ guests: "Parties of 1–4 only" });
    expect(validateReservation({ ...valid, guests: 0 }, today)).toEqual({ guests: "Parties of 1–4 only" });
  });

  test("only the four seatings are bookable", () => {
    expect(validateReservation({ ...valid, time: "19:00" }, today)).toEqual({ time: "Choose one of the four seatings" });
    for (const time of ["18:00", "18:30", "20:45", "21:15"]) {
      expect(validateReservation({ ...valid, time }, today)).toEqual({});
    }
  });

  test("dates in the past are rejected, today is allowed", () => {
    expect(validateReservation({ ...valid, date: "2026-10-19" }, today)).toEqual({ date: "Choose a date from today" });
    expect(validateReservation({ ...valid, date: "2026-10-20" }, today)).toEqual({});
    expect(validateReservation({ ...valid, date: "" }, today)).toEqual({ date: "Choose a date from today" });
  });

  test("name and email are required", () => {
    expect(validateReservation({ ...valid, name: " ", email: "nope" }, today)).toEqual({
      name: "Add your name",
      email: "Enter a valid email",
    });
  });
});
