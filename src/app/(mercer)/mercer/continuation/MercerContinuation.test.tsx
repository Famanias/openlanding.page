import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import MercerContinuation from "./MercerContinuation";

describe("authored Mercer continuation", () => {
  it("starts at Selected Work and includes the supplied three studies, contact and footer", () => {
    const html = renderToStaticMarkup(<MercerContinuation />);
    expect(html).toContain("02 / SELECTED WORK");
    expect(html).toContain('id="jm-work"');
    for (const id of ["jm-project-one", "jm-project-two", "jm-project-three", "jm-contact", "jm-footer"]) expect(html).toContain(`id="${id}"`);
    expect(html.match(/<canvas/g)).toHaveLength(3);
    expect(html).toContain("COPY EMAIL");
    expect(html).not.toContain('id="jm-about"');
    expect(html).not.toContain('href="#jm-about"');
    expect(html).not.toContain("<h1");
    expect(html).not.toContain("<iframe");
    expect(html).not.toContain("<script");
  });
});
