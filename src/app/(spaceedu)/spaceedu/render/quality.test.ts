import { describe, expect, it } from "vitest";
import { chooseQuality } from "./quality";

describe("render quality", () => {
  it("uses a cheaper tier on phones", () => expect(chooseQuality(390, 844).scale).toBe(.5));
  it("keeps the high tier on a capable desktop", () => expect(chooseQuality(1440, 900, 12).mainSteps).toBe(96));
});
