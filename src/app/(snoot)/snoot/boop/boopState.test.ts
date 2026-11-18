import { describe, expect, it } from "vitest";
import { BOOPS_TODAY, REACTIONS, SNEEZE_EVERY, boop, initialBoop } from "./boopState";

describe("booping Frank's nose", () => {
  it("starts from today's running total with no reaction yet", () => {
    const s = initialBoop();
    expect(s.count).toBe(BOOPS_TODAY);
    expect(s.mine).toBe(0);
    expect(s.sneeze).toBe(false);
    expect(s.reaction).toBe("");
  });

  it("counts each boop and cycles through reactions", () => {
    let s = initialBoop();
    s = boop(s);
    expect(s.count).toBe(BOOPS_TODAY + 1);
    expect(s.mine).toBe(1);
    expect(s.reaction).toBe(REACTIONS[0]);
    s = boop(s);
    expect(s.reaction).toBe(REACTIONS[1]);
  });

  it("sneezes on every fifth boop of yours", () => {
    let s = initialBoop();
    const sneezes: boolean[] = [];
    for (let i = 0; i < SNEEZE_EVERY * 2; i++) {
      s = boop(s);
      sneezes.push(s.sneeze);
    }
    expect(SNEEZE_EVERY).toBe(5);
    expect(sneezes.filter(Boolean)).toHaveLength(2);
    expect(sneezes[SNEEZE_EVERY - 1]).toBe(true);
    expect(s.reaction).toBe("Achoo!");
  });

  it("never mutates the previous state", () => {
    const s = initialBoop();
    boop(s);
    expect(s.mine).toBe(0);
  });
});
