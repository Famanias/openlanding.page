import { describe, expect, it } from "vitest";
import { filterWalks, makeWalkCard, type Walk } from "./walks";

const walks: Walk[] = [
  { id: "river", name: "The riverside ramble", description: "A slower route along the water.", duration: 65, distance: "4.2 km", time: "evening", when: "Wednesdays, 6:15 pm", meeting: "The old boathouse", terrain: "Mostly flat", color: "green", number: "01" },
  { id: "park", name: "Park & pastry", description: "A little green and something sweet.", duration: 50, distance: "3.1 km", time: "morning", when: "Saturdays, 9:30 am", meeting: "The park gates", terrain: "Easy paths", color: "peach", number: "02" },
  { id: "sunset", name: "The long way home", description: "Take the scenic way back.", duration: 60, distance: "3.8 km", time: "evening", when: "Fridays, 5:45 pm", meeting: "The corner kiosk", terrain: "Gentle slopes", color: "yellow", number: "03" },
];

describe("the walk finder", () => {
  it("shows all routes, including the hour-long route in the under-an-hour filter", () => {
    expect(filterWalks(walks, "all").map((walk) => walk.id)).toEqual(["river", "park", "sunset"]);
    expect(filterWalks(walks, "short").map((walk) => walk.id)).toEqual(["park", "sunset"]);
    expect(filterWalks(walks, "evening").map((walk) => walk.id)).toEqual(["river", "sunset"]);
  });

  it("does not mutate the original order or route data", () => {
    const before = JSON.stringify(walks);
    filterWalks(walks, "short");
    expect(JSON.stringify(walks)).toBe(before);
  });

  it("creates a local walk card only for a known route and a meaningful name", () => {
    expect(makeWalkCard("  Sam  ", "park", walks)).toEqual({ name: "Sam", walk: walks[1] });
    expect(makeWalkCard(" ", "park", walks)).toBeNull();
    expect(makeWalkCard("Sam", "not-a-route", walks)).toBeNull();
    expect(makeWalkCard("x".repeat(81), "park", walks)).toBeNull();
  });
});
