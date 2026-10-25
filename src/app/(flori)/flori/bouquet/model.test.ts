import { describe, expect, it } from "vitest";
import { selectionFromSearch } from "./model";

describe("a bouquet carried into signup", () => {
  it("restores the chosen flowers and bunch size from the signup link", () => {
    expect(selectionFromSearch("?feeling=sunbeam&size=lovely")).toEqual({ feeling: "sunbeam", size: "lovely" });
  });
  it("rejects unrecognized selections from an edited URL", () => {
    expect(selectionFromSearch("?feeling=unknown&size=huge")).toEqual({ feeling: "daydream", size: "little" });
    expect(selectionFromSearch("")).toEqual({ feeling: "daydream", size: "little" });
  });
});
