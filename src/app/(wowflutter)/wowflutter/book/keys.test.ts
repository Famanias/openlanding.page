import { describe, expect, test } from "vitest";
import { keyAction } from "./keys";

const body = { tagName: "BODY" };

describe("keyAction", () => {
  test("arrows and page keys turn the book", () => {
    expect(keyAction("ArrowRight", body)).toBe("next");
    expect(keyAction("PageDown", body)).toBe("next");
    expect(keyAction("ArrowLeft", body)).toBe("prev");
    expect(keyAction("PageUp", body)).toBe("prev");
    expect(keyAction("Home", body)).toBe("first");
    expect(keyAction("End", body)).toBe("last");
  });

  test("never claims Space or Enter, so buttons and links keep them", () => {
    expect(keyAction(" ", body)).toBeNull();
    expect(keyAction("Enter", body)).toBeNull();
    expect(keyAction(" ", { tagName: "BUTTON" })).toBeNull();
  });

  test("leaves arrows alone inside form fields, such as the radio group", () => {
    for (const tagName of ["INPUT", "TEXTAREA", "SELECT"]) expect(keyAction("ArrowRight", { tagName })).toBeNull();
    expect(keyAction("ArrowLeft", { tagName: "DIV", isContentEditable: true })).toBeNull();
  });

  test("still turns the book from a focused button or link", () => {
    expect(keyAction("ArrowRight", { tagName: "BUTTON" })).toBe("next");
    expect(keyAction("ArrowRight", { tagName: "A" })).toBe("next");
  });

  test("ignores unrelated keys", () => {
    expect(keyAction("a", body)).toBeNull();
    expect(keyAction("ArrowUp", body)).toBeNull();
  });
});
