import { describe, it, expect } from "vitest";
import { boxReducer, initialBox, jarCount, slots, totals, money, nextOrderNumber, type BoxState } from "./logic";

const add = (s: BoxState, id: string) => boxReducer(s, { type: "add", id });

describe("pipkin box logic", () => {
  it("adds and removes jars", () => {
    let s = add(initialBox, "plum-lavender");
    s = add(s, "plum-lavender");
    s = add(s, "meyer-lemon");
    expect(jarCount(s.jars)).toBe(3);
    s = boxReducer(s, { type: "remove", id: "plum-lavender" });
    expect(s.jars["plum-lavender"]).toBe(1);
    expect(boxReducer(s, { type: "remove", id: "pear-vanilla" })).toBe(s);
  });

  it("ignores unknown flavours", () => {
    expect(add(initialBox, "gravy")).toBe(initialBox);
  });

  it("grows the box when a full one gets another jar, until 12", () => {
    let s: BoxState = { size: 3, jars: { "meyer-lemon": 3 }, notice: null };
    s = add(s, "pear-vanilla");
    expect(s.size).toBe(6);
    expect(s.notice).toBe("grew");
    s = { size: 12, jars: { "meyer-lemon": 12 }, notice: null };
    const full = add(s, "pear-vanilla");
    expect(full.notice).toBe("full");
    expect(jarCount(full.jars)).toBe(12);
  });

  it("trims jars from the end of the shelf when the box shrinks", () => {
    const s: BoxState = { size: 6, jars: { "strawberry-basil": 2, "plum-lavender": 2, "peach-chamomile": 2 }, notice: null };
    const smaller = boxReducer(s, { type: "size", size: 3 });
    expect(smaller.size).toBe(3);
    expect(jarCount(smaller.jars)).toBe(3);
    expect(smaller.jars["strawberry-basil"]).toBe(2);
    expect(smaller.jars["peach-chamomile"]).toBe(0);
    expect(smaller.notice).toBe("shrank");
    expect(boxReducer(s, { type: "size", size: 6 })).toBe(s);
  });

  it("lists slots in shelf order", () => {
    expect(slots({ "plum-lavender": 1, "strawberry-basil": 2 })).toEqual(["strawberry-basil", "strawberry-basil", "plum-lavender"]);
  });

  it("prices tiers and shipping", () => {
    expect(totals({})).toMatchObject({ count: 0, total: 0, shipping: 0 });
    expect(totals({ "meyer-lemon": 1 })).toMatchObject({ subtotal: 9, discount: 0, shipping: 6, total: 15 });
    expect(totals({ "meyer-lemon": 3 })).toMatchObject({ discount: 1, shipping: 6, total: 32 });
    expect(totals({ "meyer-lemon": 6 })).toMatchObject({ discount: 4, shipping: 0, total: 50, freeShipping: true });
    expect(totals({ "meyer-lemon": 12 })).toMatchObject({ discount: 12, total: 96 });
  });

  it("formats money and order numbers", () => {
    expect(money(50)).toBe("$50");
    expect(nextOrderNumber()).toBe("#0413");
    expect(nextOrderNumber(412, 3)).toBe("#0416");
  });
});
