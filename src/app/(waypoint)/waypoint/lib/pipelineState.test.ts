import { describe, expect, it } from "vitest";
import {
  advanceCardStage,
  countByStage,
  INITIAL_PIPELINE,
} from "./pipelineState";

describe("pipelineState logic", () => {
  it("initializes with four stages and accurate starter cards", () => {
    const counts = countByStage(INITIAL_PIPELINE);
    expect(counts.pitched).toBe(2);
    expect(counts.in_review).toBe(1);
    expect(counts.panel_round).toBe(1);
    expect(counts.offer_stage).toBe(1);
  });

  it("advances a card sequentially to the next stage", () => {
    const cardId = "linear";
    const initialCard = INITIAL_PIPELINE.find((c) => c.id === cardId);
    expect(initialCard?.stage).toBe("pitched");

    const updated = advanceCardStage(INITIAL_PIPELINE, cardId);
    const movedCard = updated.find((c) => c.id === cardId);
    expect(movedCard?.stage).toBe("in_review");

    const movedAgain = advanceCardStage(updated, cardId);
    expect(movedAgain.find((c) => c.id === cardId)?.stage).toBe("panel_round");
  });

  it("wraps around from offer_stage back to pitched stage cleanly", () => {
    const cardId = "anthropic";
    const initialCard = INITIAL_PIPELINE.find((c) => c.id === cardId);
    expect(initialCard?.stage).toBe("offer_stage");

    const updated = advanceCardStage(INITIAL_PIPELINE, cardId);
    expect(updated.find((c) => c.id === cardId)?.stage).toBe("pitched");
  });

  it("does not mutate original pipeline array", () => {
    const originalLength = INITIAL_PIPELINE.length;
    advanceCardStage(INITIAL_PIPELINE, "linear");
    expect(INITIAL_PIPELINE.length).toBe(originalLength);
    expect(INITIAL_PIPELINE.find((c) => c.id === "linear")?.stage).toBe("pitched");
  });
});
