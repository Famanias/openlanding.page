import { afterEach, describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

afterEach(() => {
  vi.restoreAllMocks();
  vi.resetModules();
});

async function renderFallback() {
  const { default: TorusKnotFallback } = await import("./TorusKnotFallback");
  return renderToStaticMarkup(<TorusKnotFallback />);
}

describe("fallback SVG hydration", () => {
  it.each([-1, 1])("emits identical server/client markup with direction %i floating-point drift", async (direction) => {
    vi.resetModules();
    const serverMarkup = await renderFallback();
    const originalSin = Math.sin;
    const originalCos = Math.cos;
    // Model the tiny Math implementation differences between Node and browser runtimes.
    vi.spyOn(Math, "sin").mockImplementation((angle) => originalSin(angle) + direction * Number.EPSILON);
    vi.spyOn(Math, "cos").mockImplementation((angle) => originalCos(angle) + direction * Number.EPSILON);
    vi.resetModules();
    const clientMarkup = await renderFallback();
    expect(clientMarkup.split("><")).toEqual(serverMarkup.split("><"));
  });
});
