import { describe, expect, it } from "vitest";
import { answer, match, tokens } from "./answer";
import { FALLBACK } from "../content/faq";

describe("tokens", () => {
  it("lowercases, strips punctuation and the dollar sign", () => {
    expect(tokens("Is it $89/month?!")).toEqual(["is", "it", "89", "month"]);
  });
});

describe("match", () => {
  it("routes typed questions to the right answer", () => {
    expect(match("how much does it cost per month")?.id).toBe("price");
    expect(match("I have zero experience, can I start?")?.id).toBe("experience");
    expect(match("how many hours each week")?.id).toBe("time");
    expect(match("will I get a job offer")?.id).toBe("hired");
    expect(match("who gives feedback on my work")?.id).toBe("director");
  });

  it("tolerates plurals", () => {
    expect(match("what do directors do")?.id).toBe("director");
  });

  it("returns null when nothing matches", () => {
    expect(match("what's the weather in Lisbon")).toBeNull();
  });
});

describe("answer", () => {
  it("falls back politely", () => {
    expect(answer("tell me a joke")).toBe(FALLBACK);
  });
});
